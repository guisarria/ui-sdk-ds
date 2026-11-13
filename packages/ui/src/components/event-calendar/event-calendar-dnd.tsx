"use client"

import { useCallback, useEffect, useMemo } from "react"
import { bindDrag, createAutoScroll } from "@ui-sdk/core"
import {
  useEventCalendar,
  useEventCalendarViewConfig,
  type EventCalendarInstance,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar"
import {
  snapMinutes,
  toZoned,
  zonedStartOfDay,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-lib"
import type {
  EventCalendarProposedUpdate,
  EventCalendarSegment,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-types"
import { addDays, addMinutes, differenceInCalendarDays } from "date-fns"

const EVENT_CALENDAR_ACTIVATION = {
  moveDistancePx: 5,
  createDistancePx: 4,
  touchDelayMs: 250,
  touchTolerancePx: 5,
  autoScrollEdgePx: 48,
  autoScrollMaxStepPx: 15,
} as const

type GestureKind = "move" | "resize-start" | "resize-end" | "create"

interface TimeColumnRect {
  day: Date
  rect: DOMRect
  boundsStartMin: number
  boundsEndMin: number
  resourceId?: string
}

interface DayCellRect {
  day: Date
  rect: DOMRect
}

interface Surface {
  columns: Array<TimeColumnRect>
  cells: Array<DayCellRect>
}

let lastGestureEndedAt = 0
function wasRecentDrag(): boolean {
  return performance.now() - lastGestureEndedAt < 250
}

let lastChipPressAt = 0
function markChipPress(): void {
  lastChipPressAt = performance.now()
  window.addEventListener(
    "pointerup",
    () => {
      lastChipPressAt = performance.now()
    },
    { once: true, capture: true },
  )
}
function wasRecentChipPress(): boolean {
  return performance.now() - lastChipPressAt < 300
}

const activeGestureCancels = new Set<() => void>()

function cancelActiveEventCalendarGestures(): void {
  // oxlint-disable-next-line unicorn/no-useless-spread -- a cancel can start a new gesture, which must not be cancelled too
  for (const cancel of [...activeGestureCancels]) cancel()
}

let gestureConsumers = 0

function snapToPixel(value: number): number {
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1
  return Math.round(value * dpr) / dpr
}

function surfaceRoot(origin: HTMLElement, fallbackRoot?: HTMLElement | null) {
  return (
    origin.closest<HTMLElement>("[data-slot=event-calendar-time-grid]") ??
    origin.closest<HTMLElement>("[data-slot=event-calendar-resource-view]") ??
    origin.closest<HTMLElement>("[data-slot=event-calendar-month-view]") ??
    origin.closest<HTMLElement>("[data-slot=event-calendar]") ??
    fallbackRoot ??
    null
  )
}

function collectSurface(root: HTMLElement | null): Surface {
  const columns: Array<TimeColumnRect> = []
  const cells: Array<DayCellRect> = []
  if (root) {
    for (const el of root.querySelectorAll<HTMLElement>("[data-ec-day]")) {
      const day = new Date(Number(el.dataset.ecDay))
      if (el.dataset.ecBoundsStart !== undefined) {
        columns.push({
          day,
          rect: el.getBoundingClientRect(),
          boundsStartMin: Number(el.dataset.ecBoundsStart),
          boundsEndMin: Number(el.dataset.ecBoundsEnd),
          resourceId: el.dataset.ecResource,
        })
      } else {
        cells.push({ day, rect: el.getBoundingClientRect() })
      }
    }
  }
  return { columns, cells }
}

function findColumn(surface: Surface, clientX: number): TimeColumnRect | undefined {
  const scrollAdjusted = surface.columns
  let best: TimeColumnRect | undefined
  for (const col of scrollAdjusted) {
    if (clientX >= col.rect.left && clientX < col.rect.right) return col
    best ??= col
    const bestDist = Math.min(
      Math.abs(clientX - best.rect.left),
      Math.abs(clientX - best.rect.right),
    )
    const dist = Math.min(Math.abs(clientX - col.rect.left), Math.abs(clientX - col.rect.right))
    if (dist < bestDist) best = col
  }
  return best
}

function findCell(surface: Surface, x: number, y: number): DayCellRect | undefined {
  return surface.cells.find(
    (cell) =>
      x >= cell.rect.left && x < cell.rect.right && y >= cell.rect.top && y < cell.rect.bottom,
  )
}

function pointerMinutes(col: TimeColumnRect, clientY: number): number {
  const boundsMinutes = col.boundsEndMin - col.boundsStartMin
  const pxPerMinute = col.rect.height / Math.max(1, boundsMinutes)
  return col.boundsStartMin + (clientY - col.rect.top) / pxPerMinute
}

interface BeginGestureConfig<TData> {
  instance: EventCalendarInstance<TData>
  kind: GestureKind
  origin: HTMLElement
  startEvent: PointerEvent
  segment?: EventCalendarSegment<TData>
  createDay?: Date
  createAllDay?: boolean
  ui?: {
    dragCarry?: string
    dragCarryInvalid?: string
    dropHint?: string
  }
}

function beginBlockedGesture<TData>(
  instance: EventCalendarInstance<TData>,
  origin: HTMLElement,
  startEvent: PointerEvent,
  segment: EventCalendarSegment<TData>,
  gesture: "move" | "resize",
) {
  const activation = {
    ...EVENT_CALENDAR_ACTIVATION,
    ...instance.settings.activation,
  }
  const event = segment.occurrence.event
  const reason: "readOnly" | "disabled" | "interactions-off" = event.readOnly
    ? "readOnly"
    : (gesture === "move" ? event.draggable : event.resizable) === false
      ? "disabled"
      : "interactions-off"
  let activated = false
  const cleanup = () => {
    stop()
    window.removeEventListener("blur", cleanup)
    if (activated) {
      document.body.style.cursor = ""
      document.body.classList.remove("ec-drag-blocked")
      lastGestureEndedAt = performance.now()
    }
  }
  const stop = bindDrag(origin, startEvent, {
    threshold: activation.moveDistancePx,
    onStart: () => {
      activated = true
      document.body.style.cursor = "not-allowed"
      document.body.classList.add("ec-drag-blocked")
      window.addEventListener("blur", cleanup)
      instance.settings.onDragBlocked?.(segment.occurrence, { gesture, reason })
    },
    onMove: () => {},
    onEnd: cleanup,
  })
}

function beginGesture<TData>(config: BeginGestureConfig<TData>) {
  const { instance, kind, origin, startEvent, segment, ui } = config
  const { settings, internals, api } = instance
  const timeZone = settings.timeZone
  const snap = settings.snapDuration
  const activation = { ...EVENT_CALENDAR_ACTIVATION, ...settings.activation }
  const startX = startEvent.clientX
  const startY = startEvent.clientY
  const announcer =
    origin
      .closest<HTMLElement>("[data-slot=event-calendar]")
      ?.querySelector<HTMLElement>("[data-slot=event-calendar-announcer]") ??
    internals.getRootEl()?.querySelector<HTMLElement>("[data-slot=event-calendar-announcer]") ??
    null

  const isTouch = startEvent.pointerType === "touch"
  const root = surfaceRoot(origin, internals.getRootEl())
  let active = kind.startsWith("resize") && !isTouch
  let surface: Surface | null = active ? collectSurface(root) : null
  let lastProposalKey = ""
  let touchTimer: ReturnType<typeof setTimeout> | null = null
  let hintEl: HTMLDivElement | null = null
  let lastValid = true
  let createAnchorMin: number | null = null
  let lastPointer: PointerEvent = startEvent

  const occurrence = segment?.occurrence
  const isBar = occurrence
    ? occurrence.allDay ||
      occurrence.end.getTime() - occurrence.start.getTime() > 24 * 60 * 60 * 1000
    : false

  let grabOffsetMin = 0
  let grabLeadMs = 0
  let grabSegDurationMs = occurrence ? occurrence.end.getTime() - occurrence.start.getTime() : 0
  let grabDayOffset = 0

  const activationDistance =
    kind === "create" ? activation.createDistancePx : activation.moveDistancePx

  const gestureCursor = kind.startsWith("resize") ? (isBar ? "ew-resize" : "ns-resize") : "grabbing"
  const setBodyDragging = (on: boolean, invalid = false) => {
    document.body.classList.toggle("ec-dragging", on)
    document.body.style.cursor = on ? (invalid ? "not-allowed" : gestureCursor) : ""
    document.body.style.userSelect = on ? "none" : ""
    if (!on) document.body.style.removeProperty("-webkit-user-select")
  }

  const activate = () => {
    if (active) return
    active = true
    surface = collectSurface(root)
    if (kind === "move" && occurrence) {
      const grabCell = findCell(surface, startX, startY)
      if (grabCell) {
        const originDay = zonedStartOfDay(occurrence.start, timeZone)
        const lastDay = zonedStartOfDay(
          new Date(Math.max(occurrence.end.getTime() - 1, occurrence.start.getTime())),
          timeZone,
        )
        const offset = differenceInCalendarDays(zonedStartOfDay(grabCell.day, timeZone), originDay)
        if (offset >= 0 && offset <= differenceInCalendarDays(lastDay, originDay)) {
          grabDayOffset = offset
        }
      }
      if (surface.columns.length > 0 && !isBar) {
        const col = findColumn(surface, startX)
        if (col) {
          const colDayStart = zonedStartOfDay(col.day, timeZone)
          const segStartMs = Math.max(occurrence.start.getTime(), colDayStart.getTime())
          grabLeadMs = segStartMs - occurrence.start.getTime()
          grabSegDurationMs =
            Math.min(occurrence.end.getTime(), addDays(colDayStart, 1).getTime()) - segStartMs
          grabOffsetMin = pointerMinutes(col, startY) - (segStartMs - colDayStart.getTime()) / 60000
        }
      }
    }
    setBodyDragging(true)
    createCarry()
  }

  const computeProposal = (
    e: PointerEvent,
  ): {
    start: Date
    end: Date
    allDay: boolean
    dayGranular?: boolean
    resourceId?: string
  } | null => {
    if (!surface) return null

    if (kind === "create") {
      if (config.createAllDay || surface.columns.length === 0) {
        const anchor = zonedStartOfDay(config.createDay!, timeZone)
        const cell = findCell(surface, e.clientX, e.clientY)
        const target = cell ? zonedStartOfDay(cell.day, timeZone) : anchor
        const start = anchor <= target ? anchor : target
        const end = addDays(anchor <= target ? target : anchor, 1)
        return { start, end, allDay: true, dayGranular: true }
      }
      const col = findColumn(surface, startX)
      if (!col) return null
      createAnchorMin ??= snapMinutes(pointerMinutes(col, startY), snap)
      const anchorMin = createAnchorMin
      const curMin = snapMinutes(pointerMinutes(col, e.clientY), snap)
      const lo = Math.max(col.boundsStartMin, Math.min(anchorMin, curMin))
      const hi = Math.min(col.boundsEndMin, Math.max(anchorMin, curMin, lo + snap))
      const dayStart = zonedStartOfDay(col.day, timeZone)
      return {
        start: addMinutes(dayStart, lo),
        end: addMinutes(dayStart, hi),
        allDay: false,
        resourceId: col.resourceId,
      }
    }

    if (!occurrence) return null
    const durationMs = occurrence.end.getTime() - occurrence.start.getTime()

    const overCell = findCell(surface, e.clientX, e.clientY)

    if (kind === "move" && !isBar && surface.columns.length > 0 && overCell !== undefined) {
      const targetDay = zonedStartOfDay(overCell.day, timeZone)
      return {
        start: targetDay,
        end: addDays(targetDay, 1),
        allDay: true,
        dayGranular: true,
      }
    }

    const useCells = surface.columns.length === 0 || (isBar && overCell !== undefined)

    if (useCells) {
      const cell = overCell ?? findCell(surface, startX, startY)
      if (!cell) return null
      const targetDay = zonedStartOfDay(cell.day, timeZone)
      if (kind === "move") {
        const originDay = zonedStartOfDay(occurrence.start, timeZone)
        const delta = differenceInCalendarDays(targetDay, originDay) - grabDayOffset
        const start = addDays(toZoned(occurrence.start, timeZone), delta)
        return {
          start,
          end: new Date(start.getTime() + durationMs),
          allDay: occurrence.allDay,
          dayGranular: true,
        }
      }
      if (kind === "resize-start") {
        const time =
          occurrence.start.getTime() - zonedStartOfDay(occurrence.start, timeZone).getTime()
        const start = new Date(targetDay.getTime() + time)
        if (start >= occurrence.end) return null
        return {
          start,
          end: occurrence.end,
          allDay: occurrence.allDay,
          dayGranular: true,
        }
      }
      const time = occurrence.allDay
        ? 0
        : occurrence.end.getTime() - zonedStartOfDay(occurrence.end, timeZone).getTime()
      const end = occurrence.allDay
        ? addDays(targetDay, 1)
        : new Date(addDays(targetDay, time > 0 ? 0 : 1).getTime() + time)
      if (end <= occurrence.start) return null
      return {
        start: occurrence.start,
        end,
        allDay: occurrence.allDay,
        dayGranular: true,
      }
    }

    const col = findColumn(surface, e.clientX)
    if (!col) return null
    const dayStart = zonedStartOfDay(col.day, timeZone)
    const rawMin = pointerMinutes(col, e.clientY)

    if (kind === "move") {
      const newStartMin = snapMinutes(rawMin - grabOffsetMin, snap)
      const chipDurationMin = Math.round(grabSegDurationMs / 60000)
      const clamped = Math.min(
        Math.max(newStartMin, col.boundsStartMin),
        col.boundsEndMin - chipDurationMin,
      )
      const start = new Date(addMinutes(dayStart, clamped).getTime() - grabLeadMs)
      return {
        start,
        end: new Date(start.getTime() + durationMs),
        allDay: false,
        resourceId: col.resourceId,
      }
    }

    const min = snapMinutes(rawMin, snap)
    const occStartMinInCol = Math.round((occurrence.start.getTime() - dayStart.getTime()) / 60000)
    const occEndMinInCol = Math.round((occurrence.end.getTime() - dayStart.getTime()) / 60000)
    if (kind === "resize-start") {
      const clamped = Math.min(
        Math.max(min, col.boundsStartMin),
        Math.min(occEndMinInCol - snap, col.boundsEndMin),
      )
      const start = addMinutes(dayStart, clamped)
      if (start >= occurrence.end) return null
      return { start, end: occurrence.end, allDay: false }
    }
    const clamped = Math.max(
      Math.min(min, col.boundsEndMin),
      Math.max(occStartMinInCol + snap, col.boundsStartMin),
    )
    const end = addMinutes(dayStart, clamped)
    if (end <= occurrence.start) return null
    return { start: occurrence.start, end, allDay: false }
  }

  const applyProposal = (e: PointerEvent) => {
    const proposal = computeProposal(e)
    if (!proposal) return
    const key = `${proposal.start.getTime()}-${proposal.end.getTime()}-${proposal.allDay}-${proposal.resourceId ?? ""}`
    if (key === lastProposalKey) return
    lastProposalKey = key

    if (kind === "create") {
      const draft = { ...proposal, view: instance.getState().view }
      if (settings.canSelectSlot && !settings.canSelectSlot(draft)) return
      internals.setSlotDraft(draft)
      return
    }
    const update: EventCalendarProposedUpdate<TData> = {
      event: occurrence!.event,
      occurrence: occurrence!,
      ...proposal,
      source: kind as "drag" | "resize-start" | "resize-end",
    }
    if (kind === "move") update.source = "drag"
    const valid = settings.canDropEvent ? settings.canDropEvent(update) : true
    lastValid = valid
    setBodyDragging(true, !valid)
    internals.setDrag({
      kind: kind === "move" ? "move" : kind,
      occurrence: occurrence!,
      proposedStart: proposal.start,
      proposedEnd: proposal.end,
      proposedAllDay: proposal.allDay,
      proposedDayGranular: proposal.dayGranular ?? false,
      proposedResourceId: proposal.resourceId,
      valid,
    })
  }

  let carryEl: HTMLDivElement | null = null
  let carryDX = 0
  let carryDY = 0
  const CARRY_CLASS = `bg-background pointer-events-none fixed top-0 left-0 z-100 overflow-hidden rounded-sm opacity-90 shadow-md will-change-transform${
    ui?.dragCarry ? ` ${ui.dragCarry}` : ""
  }`
  const CARRY_INVALID_CLASS = `${CARRY_CLASS} ring-destructive/60 ring-1${
    ui?.dragCarryInvalid ? ` ${ui.dragCarryInvalid}` : ""
  }`

  const createCarry = () => {
    if (kind !== "move") return
    const chip = origin.closest<HTMLElement>("[data-slot=event-calendar-event]") ?? origin
    const rect = chip.getBoundingClientRect()
    const chipFont = getComputedStyle(chip)
    carryDX = startX - rect.left
    carryDY = startY - rect.top
    carryEl = document.createElement("div")
    carryEl.setAttribute("data-slot", "event-calendar-drag-carry")
    carryEl.setAttribute("aria-hidden", "true")
    carryEl.className = CARRY_CLASS
    carryEl.style.width = `${rect.width}px`
    carryEl.style.height = `${rect.height}px`
    carryEl.style.fontSize = chipFont.fontSize
    carryEl.style.lineHeight = chipFont.lineHeight
    carryEl.style.transform = `translate3d(${snapToPixel(rect.left)}px, ${snapToPixel(rect.top)}px, 0)`
    const clone = chip.cloneNode(true) as HTMLElement
    clone.removeAttribute("data-dragging")
    clone.style.width = "100%"
    clone.style.height = "100%"
    carryEl.append(clone)
    document.body.append(carryEl)
  }

  const positionCarry = (e: PointerEvent) => {
    if (!carryEl) return
    carryEl.style.transform = `translate3d(${snapToPixel(e.clientX - carryDX)}px, ${snapToPixel(e.clientY - carryDY)}px, 0)`
    const cls = lastValid ? CARRY_CLASS : CARRY_INVALID_CLASS
    if (carryEl.className !== cls) carryEl.className = cls
  }

  const updateHint = (e: PointerEvent) => {
    if (lastValid || !active) {
      hintEl?.remove()
      hintEl = null
      return
    }
    if (!hintEl) {
      hintEl = document.createElement("div")
      hintEl.setAttribute("data-slot", "event-calendar-drop-hint")
      hintEl.className = `bg-background text-destructive border-destructive/40 pointer-events-none fixed top-0 left-0 z-100 rounded-md border px-2 py-0.5 text-xs font-medium shadow-sm${
        ui?.dropHint ? ` ${ui.dropHint}` : ""
      }`
      hintEl.textContent = settings.i18n.labels.dropNotAllowed
      document.body.append(hintEl)
    }
    hintEl.style.transform = `translate3d(${snapToPixel(e.clientX + 12)}px, ${snapToPixel(e.clientY + 16)}px, 0)`
  }

  const scroller = createAutoScroll({
    edge: activation.autoScrollEdgePx,
    speed: activation.autoScrollMaxStepPx,
    ignore: () => carryEl,
    onScroll: () => {
      surface = collectSurface(root)
      applyProposal(lastPointer)
    },
  })

  let finished = false
  const cleanup = () => {
    if (finished) return
    finished = true
    activeGestureCancels.delete(cancel)
    stopDrag()
    window.removeEventListener("blur", cancel)
    scroller.stop()
    if (touchTimer) clearTimeout(touchTimer)
    hintEl?.remove()
    hintEl = null
    carryEl?.remove()
    carryEl = null
    setBodyDragging(false)
  }

  const cancel = () => {
    cleanup()
    if (active) {
      lastGestureEndedAt = performance.now()
      internals.setDrag(null)
      internals.setSlotDraft(null)
    }
  }

  const finish = () => {
    cleanup()
    if (!active) return
    lastGestureEndedAt = performance.now()

    const state = instance.getState()
    if (kind === "create") {
      const draft = state.slotDraft
      internals.setSlotDraft(null)
      if (draft) {
        api.select({
          slot: { start: draft.start, end: draft.end, allDay: draft.allDay },
        })
        settings.onSelectSlot?.(draft)
      }
      return
    }
    const drag = state.drag
    internals.setDrag(null)
    if (!drag || !occurrence) return
    const unchanged =
      drag.proposedStart.getTime() === occurrence.start.getTime() &&
      drag.proposedEnd.getTime() === occurrence.end.getTime() &&
      (drag.proposedResourceId === undefined ||
        drag.proposedResourceId === occurrence.event.resourceId)
    if (unchanged) return
    const committed = internals.applyProposedUpdate({
      event: occurrence.event,
      occurrence,
      start: drag.proposedStart,
      end: drag.proposedEnd,
      allDay: drag.proposedAllDay,
      resourceId: drag.proposedResourceId,
      source: kind === "move" ? "drag" : kind,
    })
    if (committed && announcer) {
      announcer.textContent = `${occurrence.event.title}, ${settings.i18n.functions.formatEventTime(
        toZoned(committed.start, timeZone),
        toZoned(committed.end, timeZone),
        committed.allDay,
        { locale: settings.locale },
      )}`
    }
  }

  const stopDrag = bindDrag(origin, startEvent, {
    threshold: isTouch ? activation.touchTolerancePx : active ? 0 : activationDistance,
    cancelOnEscape: true,
    onStart: () => {
      if (isTouch && !active) {
        cancel()
        return false
      }
      activate()
    },
    onMove: ({ event }) => {
      lastPointer = event
      applyProposal(event)
      scroller.update(event.clientX, event.clientY)
      updateHint(event)
      positionCarry(event)
    },
    onEnd: (_event, canceled) => (canceled ? cancel() : finish()),
  })
  window.addEventListener("blur", cancel)
  activeGestureCancels.add(cancel)

  if (isTouch && !active) {
    touchTimer = setTimeout(() => {
      activate()
      applyProposal(lastPointer)
    }, activation.touchDelayMs)
  }
}

function useEventCalendarGestures<TData = unknown>() {
  const instance = useEventCalendar<TData>()
  const { classNames } = useEventCalendarViewConfig<TData>()
  const ui = useMemo(
    () => ({
      dragCarry: classNames?.dragCarry,
      dragCarryInvalid: classNames?.dragCarryInvalid,
      dropHint: classNames?.dropHint,
    }),
    [classNames],
  )

  useEffect(() => {
    gestureConsumers += 1
    return () => {
      gestureConsumers -= 1
      if (gestureConsumers === 0) cancelActiveEventCalendarGestures()
    }
  }, [])

  const canDrag = useCallback(
    (segment: EventCalendarSegment<TData>) => {
      const { interactions } = instance.getState()
      const event = segment.occurrence.event
      return interactions.drag && !event.readOnly && event.draggable !== false
    },
    [instance],
  )

  const canResize = useCallback(
    (segment: EventCalendarSegment<TData>) => {
      const { interactions } = instance.getState()
      const event = segment.occurrence.event
      return interactions.resize && !event.readOnly && event.resizable !== false
    },
    [instance],
  )

  const beginMove = useCallback(
    (e: React.PointerEvent, segment: EventCalendarSegment<TData>) => {
      if (e.button !== 0) return
      if (!canDrag(segment)) {
        beginBlockedGesture(
          instance,
          e.currentTarget as HTMLElement,
          e.nativeEvent,
          segment,
          "move",
        )
        return
      }
      beginGesture({
        instance,
        kind: "move",
        origin: e.currentTarget as HTMLElement,
        startEvent: e.nativeEvent,
        segment,
        ui,
      })
    },
    [instance, canDrag, ui],
  )

  const beginResize = useCallback(
    (e: React.PointerEvent, segment: EventCalendarSegment<TData>, edge: "start" | "end") => {
      if (e.button !== 0) return
      if (!canResize(segment)) {
        e.stopPropagation()
        beginBlockedGesture(
          instance,
          e.currentTarget as HTMLElement,
          e.nativeEvent,
          segment,
          "resize",
        )
        return
      }
      e.stopPropagation()
      e.preventDefault()
      beginGesture({
        instance,
        kind: edge === "start" ? "resize-start" : "resize-end",
        origin: e.currentTarget as HTMLElement,
        startEvent: e.nativeEvent,
        segment,
        ui,
      })
    },
    [instance, canResize, ui],
  )

  const beginCreate = useCallback(
    (e: React.PointerEvent, day: Date, allDay: boolean) => {
      if (e.button !== 0) return
      if (!instance.getState().interactions.selectSlot) return
      beginGesture({
        instance,
        kind: "create",
        origin: e.currentTarget as HTMLElement,
        startEvent: e.nativeEvent,
        createDay: day,
        createAllDay: allDay,
        ui,
      })
    },
    [instance, ui],
  )

  return { beginMove, beginResize, beginCreate, canDrag, canResize }
}

export {
  EVENT_CALENDAR_ACTIVATION,
  cancelActiveEventCalendarGestures,
  markChipPress,
  useEventCalendarGestures,
  wasRecentChipPress,
  wasRecentDrag,
}
