"use client"

import {
  createContext,
  useCallback,
  use,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ComponentType,
  type ReactNode,
  type RefObject,
} from "react"
import {
  mergeEventCalendarI18n,
  type EventCalendarI18nConfig,
  type EventCalendarI18nOverrides,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-i18n"
import {
  buildEventIndex,
  defaultEventOrder,
  eventsOverlap,
  getDayKey,
  getRangeKey,
  getViewDateRange,
  stepDate,
  toZoned,
  zonedStartOfDay,
  type EventCalendarDayBucket,
  type EventCalendarIndex,
  type WeekStartsOn,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-lib"
import type {
  CalendarEvent,
  CalendarView,
  EventCalendarDateRange,
  EventCalendarDragState,
  EventCalendarEventId,
  EventCalendarInteractions,
  EventCalendarOccurrence,
  EventCalendarOffDaysConfig,
  EventCalendarProposedUpdate,
  EventCalendarRangeInfo,
  EventCalendarResource,
  EventCalendarSegment,
  EventCalendarSelection,
  EventCalendarSlotDraft,
  EventCalendarSlotInfo,
  EventCalendarState,
  EventCalendarUpdateResult,
  EventCalendarViewSettings,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-types"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"
import { addDays, type Locale } from "date-fns"

import { cn } from "cn"

const BASE_VIEWS: Array<CalendarView> = ["month", "week", "day", "days", "agenda"]
const ALL_VIEWS: Array<CalendarView> = [...BASE_VIEWS, "resource"]

const DEFAULT_INTERACTIONS: EventCalendarInteractions = {
  drag: true,
  resize: true,
  selectSlot: true,
}

const EMPTY_SELECTION: EventCalendarSelection = { eventKeys: [], slot: null }

const DEFAULT_WEEKEND_DAYS: Array<number> = [0, 6]
const EMPTY_RESOURCES: Array<EventCalendarResource> = []
const DEFAULT_EVENT_PRIORITY = (event: CalendarEvent<never>) => event.priority ?? 0

const priorityOrderCache = new WeakMap<object, unknown>()
type EventOrder<TData> = (
  a: EventCalendarOccurrence<TData>,
  b: EventCalendarOccurrence<TData>,
) => number
function priorityEventOrder<TData>(
  getEventPriority: (event: CalendarEvent<TData>) => number,
): EventOrder<TData> {
  const cached = priorityOrderCache.get(getEventPriority)
  if (cached) return cached as EventOrder<TData>
  const order: EventOrder<TData> = (a, b) =>
    getEventPriority(b.event) - getEventPriority(a.event) || defaultEventOrder(a, b)
  priorityOrderCache.set(getEventPriority, order)
  return order
}

interface EventCalendarCallbacks<TData = unknown> {
  onEventClick?: (occurrence: EventCalendarOccurrence<TData>, e: React.MouseEvent) => void
  onEventDoubleClick?: (occurrence: EventCalendarOccurrence<TData>, e: React.MouseEvent) => void
  onEventUpdate?: (update: EventCalendarProposedUpdate<TData>) => EventCalendarUpdateResult
  canDropEvent?: (update: EventCalendarProposedUpdate<TData>) => boolean
  onDragBlocked?: (
    occurrence: EventCalendarOccurrence<TData>,
    info: {
      gesture: "move" | "resize"
      reason: "readOnly" | "disabled" | "interactions-off"
    },
  ) => void
  onSlotClick?: (slot: EventCalendarSlotInfo, e: React.MouseEvent) => void
  onSelectSlot?: (slot: EventCalendarSlotDraft) => void
  canSelectSlot?: (slot: EventCalendarSlotDraft) => boolean
  onRangeChange?: (info: EventCalendarRangeInfo) => void
  onViewChange?: (view: CalendarView) => void
  onDateChange?: (date: Date) => void
  onDayCountChange?: (count: number) => void
  onSelectionChange?: (selection: EventCalendarSelection) => void
  onInteractionsChange?: (interactions: EventCalendarInteractions) => void
  onViewSettingsChange?: (viewSettings: EventCalendarViewSettings) => void
  onEventsChange?: (events: Array<CalendarEvent<TData>>) => void
  onMoreClick?: (
    day: Date,
    segments: Array<EventCalendarOccurrence<TData>>,
    e: React.MouseEvent,
  ) => void | false
}

interface UseEventCalendarStateOptions<TData = unknown> extends EventCalendarCallbacks<TData> {
  events?: Array<CalendarEvent<TData>>
  defaultEvents?: Array<CalendarEvent<TData>>
  view?: CalendarView
  defaultView?: CalendarView
  date?: Date
  defaultDate?: Date
  dayCount?: number
  defaultDayCount?: number
  selection?: EventCalendarSelection
  defaultSelection?: EventCalendarSelection
  interactions?: Partial<EventCalendarInteractions>
  defaultInteractions?: Partial<EventCalendarInteractions>
  viewSettings?: EventCalendarViewSettings
  defaultViewSettings?: EventCalendarViewSettings
  loading?: boolean
  views?: Array<CalendarView>
  timeZone?: string
  locale?: Locale
  weekStartsOn?: WeekStartsOn
  dayStartHour?: number
  dayEndHour?: number
  slotDuration?: number
  snapDuration?: number
  agendaDayCount?: number
  fixedWeeks?: boolean
  showOutsideDays?: boolean
  i18n?: EventCalendarI18nOverrides
  resources?: Array<EventCalendarResource>
  getEventPriority?: (event: CalendarEvent<TData>) => number
  eventOrder?: (a: EventCalendarOccurrence<TData>, b: EventCalendarOccurrence<TData>) => number
  getOccurrences?: (
    event: CalendarEvent<TData>,
    range: EventCalendarDateRange,
    ctx: { timeZone: string },
  ) => Array<{ start: Date; end: Date }> | null
  weekendDays?: Array<number>
  activation?: Partial<EventCalendarActivationConfig>
}

interface EventCalendarActivationConfig {
  moveDistancePx: number
  createDistancePx: number
  touchDelayMs: number
  touchTolerancePx: number
  autoScrollEdgePx: number
  autoScrollMaxStepPx: number
}

interface EventCalendarSettings<TData = unknown> extends EventCalendarCallbacks<TData> {
  timeZone: string
  locale?: Locale
  weekStartsOn: WeekStartsOn
  views: Array<CalendarView>
  dayStartHour: number
  dayEndHour: number
  slotDuration: number
  snapDuration: number
  agendaDayCount: number
  fixedWeeks: boolean
  showOutsideDays: boolean
  i18n: EventCalendarI18nConfig
  resources: Array<EventCalendarResource>
  weekendDays: Array<number>
  activation?: Partial<EventCalendarActivationConfig>
  getEventPriority: (event: CalendarEvent<TData>) => number
  eventOrder: (a: EventCalendarOccurrence<TData>, b: EventCalendarOccurrence<TData>) => number
  getOccurrences?: (
    event: CalendarEvent<TData>,
    range: EventCalendarDateRange,
    ctx: { timeZone: string },
  ) => Array<{ start: Date; end: Date }> | null
}

interface EventCalendarApi<TData = unknown> {
  next: () => void
  prev: () => void
  today: () => void
  goTo: (date: Date) => void
  setView: (view: CalendarView, opts?: { dayCount?: number }) => void
  setDayCount: (count: number) => void
  getEvents: () => Array<CalendarEvent<TData>>
  getEvent: (id: EventCalendarEventId) => CalendarEvent<TData> | undefined
  setEvents: (events: Array<CalendarEvent<TData>>) => void
  addEvent: (event: CalendarEvent<TData>) => void
  updateEvent: (id: EventCalendarEventId, patch: Partial<CalendarEvent<TData>>) => void
  removeEvent: (id: EventCalendarEventId) => void
  getOccurrences: (range?: EventCalendarDateRange) => Array<EventCalendarOccurrence<TData>>
  getOccurrencesForDay: (day: Date) => Array<EventCalendarOccurrence<TData>>
  findOverlapping: (candidate: {
    start: Date
    end: Date
    excludeEventId?: string
  }) => Array<EventCalendarOccurrence<TData>>
  select: (selection: Partial<EventCalendarSelection>) => void
  selectEvent: (key: string, opts?: { additive?: boolean }) => void
  clearSelection: () => void
  setInteractions: (patch: Partial<EventCalendarInteractions>) => void
  setViewSettings: (patch: EventCalendarViewSettings) => void
  getVisibleRange: () => EventCalendarDateRange
  getActiveRange: () => EventCalendarDateRange
  toZoned: (date: Date) => Date
  scrollToTime: (time: Date | number) => void
}

type EventCalendarCommittedTiming = { start: Date; end: Date; allDay: boolean }

interface EventCalendarInternals<TData = unknown> {
  getIndex: () => EventCalendarIndex<TData>
  setDrag: (drag: EventCalendarDragState<TData> | null) => void
  setSlotDraft: (draft: EventCalendarSlotDraft | null) => void
  registerScrollHandler: (handler: ((time: Date | number) => void) | null) => void
  applyProposedUpdate: (
    update: EventCalendarProposedUpdate<TData>,
    extraPatch?: Partial<CalendarEvent<TData>>,
  ) => EventCalendarCommittedTiming | null
  getSettingsVersion: () => number
  getRootEl: () => HTMLElement | null
  setRootEl: (el: HTMLElement | null) => void
}

interface EventCalendarInstance<TData = unknown> {
  getState: () => EventCalendarState<TData>
  subscribe: (listener: () => void) => () => void
  api: EventCalendarApi<TData>
  settings: EventCalendarSettings<TData>
  internals: EventCalendarInternals<TData>
}

function resolveSettings<TData>(
  options: UseEventCalendarStateOptions<TData>,
): EventCalendarSettings<TData> {
  const {
    events: _e,
    defaultEvents: _de,
    view: _v,
    defaultView: _dv,
    date: _d,
    defaultDate: _dd,
    dayCount: _dc,
    defaultDayCount: _ddc,
    selection: _s,
    defaultSelection: _ds,
    interactions: _i,
    defaultInteractions: _di,
    viewSettings: _vs,
    defaultViewSettings: _dvs,
    loading: _l,
    ...rest
  } = options
  const getEventPriority =
    options.getEventPriority ?? (DEFAULT_EVENT_PRIORITY as (event: CalendarEvent<TData>) => number)
  return {
    ...rest,
    timeZone: options.timeZone ?? Intl.DateTimeFormat().resolvedOptions().timeZone,
    locale: options.locale,
    weekStartsOn: options.weekStartsOn ?? options.locale?.options?.weekStartsOn ?? 0,
    views: options.views ?? (options.resources?.length ? ALL_VIEWS : BASE_VIEWS),
    dayStartHour: options.dayStartHour ?? 0,
    dayEndHour: options.dayEndHour ?? 24,
    slotDuration: options.slotDuration ?? 30,
    snapDuration: options.snapDuration ?? 15,
    agendaDayCount: options.agendaDayCount ?? 30,
    fixedWeeks: options.fixedWeeks ?? true,
    showOutsideDays: options.showOutsideDays ?? true,
    i18n: mergeEventCalendarI18n(options.i18n),
    resources: options.resources ?? EMPTY_RESOURCES,
    getEventPriority,
    eventOrder: options.eventOrder ?? priorityEventOrder(getEventPriority),
    getOccurrences: options.getOccurrences,
    weekendDays: options.weekendDays ?? DEFAULT_WEEKEND_DAYS,
    activation: options.activation,
  }
}

const warned = new Set<string>()
function warnOnce(key: string, message: string) {
  if (process.env.NODE_ENV !== "production" && !warned.has(key)) {
    warned.add(key)
    console.warn(`[event-calendar] ${message}`)
  }
}

interface EventCalendarStore<TData> {
  instance: EventCalendarInstance<TData>
  setOptions(next: UseEventCalendarStateOptions<TData>): void
  flush(): void
  emitRangeIfChanged(): void
}

function createEventCalendarStore<TData>(
  initial: UseEventCalendarStateOptions<TData>,
): EventCalendarStore<TData> {
  let options = initial
  let settings = resolveSettings(initial)
  let settingsVersion = 0

  const listeners = new Set<() => void>()

  const resolveView = (view: CalendarView): CalendarView => {
    if (settings.views.includes(view)) return view
    const fallback = settings.views[0] ?? "month"
    warnOnce(
      `view-${view}`,
      `view "${view}" is not in views [${settings.views.join(", ")}]; falling back to "${fallback}".`,
    )
    return fallback
  }

  const internal: Pick<
    EventCalendarState<TData>,
    | "view"
    | "date"
    | "dayCount"
    | "events"
    | "selection"
    | "interactions"
    | "viewSettings"
    | "drag"
    | "slotDraft"
  > = {
    view: resolveView(initial.defaultView ?? "month"),
    date: initial.defaultDate ?? new Date(),
    dayCount: initial.defaultDayCount ?? 3,
    events: initial.defaultEvents ?? [],
    selection: initial.defaultSelection ?? EMPTY_SELECTION,
    interactions: { ...DEFAULT_INTERACTIONS, ...initial.defaultInteractions },
    viewSettings: initial.defaultViewSettings ?? {},
    drag: null,
    slotDraft: null,
  }

  let snapshot: EventCalendarState<TData> | null = null
  let indexCache: {
    events: Array<CalendarEvent<TData>>
    rangeKey: string
    timeZone: string
    weekStartsOn: WeekStartsOn
    eventOrder: EventCalendarSettings<TData>["eventOrder"]
    getOccurrences: EventCalendarSettings<TData>["getOccurrences"]
    index: EventCalendarIndex<TData>
  } | null = null
  let rangeCache: {
    events: Array<CalendarEvent<TData>>
    rangeKey: string
    timeZone: string
    weekStartsOn: WeekStartsOn
    eventOrder: EventCalendarSettings<TData>["eventOrder"]
    getOccurrences: EventCalendarSettings<TData>["getOccurrences"]
    occurrences: Array<EventCalendarOccurrence<TData>>
  } | null = null
  let scrollHandler: ((time: Date | number) => void) | null = null
  let rootEl: HTMLElement | null = null
  let lastEmittedRangeKey: string | null = null

  let interactionsCache: {
    input: Partial<EventCalendarInteractions>
    merged: EventCalendarInteractions
  } | null = null
  const mergedInteractions = (
    input: Partial<EventCalendarInteractions>,
  ): EventCalendarInteractions => {
    if (interactionsCache?.input !== input) {
      interactionsCache = {
        input,
        merged: { ...DEFAULT_INTERACTIONS, ...input },
      }
    }
    return interactionsCache.merged
  }

  let pending = false
  const invalidate = () => {
    snapshot = null
  }

  const notify = () => {
    listeners.forEach((listener) => listener())
    emitRangeIfChanged()
  }

  const getState = (): EventCalendarState<TData> => {
    if (snapshot) return snapshot
    const view = resolveView(options.view ?? internal.view)
    const date = options.date ?? internal.date
    const dayCount = Math.max(1, options.dayCount ?? internal.dayCount)
    const { visibleRange, activeRange } = getViewDateRange(view, date, {
      timeZone: settings.timeZone,
      weekStartsOn: settings.weekStartsOn,
      dayCount,
      agendaDayCount: settings.agendaDayCount,
      fixedWeeks: settings.fixedWeeks,
    })
    snapshot = {
      view,
      date,
      dayCount,
      visibleRange,
      activeRange,
      events: options.events ?? internal.events,
      selection: options.selection ?? internal.selection,
      interactions: options.interactions
        ? mergedInteractions(options.interactions)
        : internal.interactions,
      loading: options.loading ?? false,
      drag: internal.drag,
      slotDraft: internal.slotDraft,
      viewSettings: options.viewSettings ?? internal.viewSettings,
    }
    return snapshot
  }

  const emitRangeIfChanged = () => {
    if (!settings.onRangeChange) return
    const state = getState()
    const key = `${state.view}:${getRangeKey(state.visibleRange)}:${settings.timeZone}`
    if (key === lastEmittedRangeKey) return
    lastEmittedRangeKey = key
    settings.onRangeChange({
      range: state.visibleRange,
      activeRange: state.activeRange,
      view: state.view,
      date: state.date,
      timeZone: settings.timeZone,
    })
  }

  type ControlledKey =
    | "view"
    | "date"
    | "dayCount"
    | "events"
    | "selection"
    | "interactions"
    | "viewSettings"

  const setField = <K extends ControlledKey>(key: K, value: EventCalendarState<TData>[K]) => {
    const controlled = options[key] !== undefined
    if (!controlled) {
      internal[key] = value
      invalidate()
    }
    const callbacks = {
      view: settings.onViewChange,
      date: settings.onDateChange,
      dayCount: settings.onDayCountChange,
      events: settings.onEventsChange,
      selection: settings.onSelectionChange,
      interactions: settings.onInteractionsChange,
      viewSettings: settings.onViewSettingsChange,
    } satisfies Record<ControlledKey, ((v: never) => void) | undefined>
    callbacks[key]?.(value as never)
    if (!controlled) notify()
  }

  const remapSelectionKey = (id: EventCalendarEventId, oldKey: string, nextStart: Date) => {
    const newKey = `${id}::${nextStart.toISOString()}`
    if (newKey === oldKey) return
    const selection = getState().selection
    if (!selection.eventKeys.includes(oldKey)) return
    setField("selection", {
      ...selection,
      eventKeys: selection.eventKeys.map((key) => (key === oldKey ? newKey : key)),
    })
  }

  const applyProposedUpdate = (
    update: EventCalendarProposedUpdate<TData>,
    extraPatch?: Partial<CalendarEvent<TData>>,
  ): EventCalendarCommittedTiming | null => {
    const result = settings.onEventUpdate?.(update)
    if (result === false) return null
    const timing: EventCalendarCommittedTiming =
      result && typeof result === "object"
        ? {
            start: result.start ?? update.start,
            end: result.end ?? update.end,
            allDay: result.allDay ?? update.allDay,
          }
        : { start: update.start, end: update.end, allDay: update.allDay }
    const adjusted: Partial<CalendarEvent<TData>> = { ...timing }
    if (update.resourceId !== undefined) adjusted.resourceId = update.resourceId
    const stored = getState().events.find((event) => event.id === update.event.id)
    const oldKey =
      update.occurrence?.key ?? (stored ? `${stored.id}::${stored.start.toISOString()}` : null)
    if (oldKey) {
      remapSelectionKey(update.event.id, oldKey, adjusted.start ?? update.start)
    }
    const events = getState().events
    const next = events.map((event) =>
      event.id === update.event.id ? { ...event, ...extraPatch, ...adjusted } : event,
    )
    setField("events", next)
    return timing
  }

  const getIndex = (): EventCalendarIndex<TData> => {
    const state = getState()
    const rangeKey = getRangeKey(state.visibleRange)
    if (
      indexCache &&
      indexCache.events === state.events &&
      indexCache.rangeKey === rangeKey &&
      indexCache.timeZone === settings.timeZone &&
      indexCache.weekStartsOn === settings.weekStartsOn &&
      indexCache.eventOrder === settings.eventOrder &&
      indexCache.getOccurrences === settings.getOccurrences
    ) {
      return indexCache.index
    }
    const index = buildEventIndex(state.events, state.visibleRange, {
      timeZone: settings.timeZone,
      weekStartsOn: settings.weekStartsOn,
      eventOrder: settings.eventOrder,
      getOccurrences: settings.getOccurrences,
    })
    indexCache = {
      events: state.events,
      rangeKey,
      timeZone: settings.timeZone,
      weekStartsOn: settings.weekStartsOn,
      eventOrder: settings.eventOrder,
      getOccurrences: settings.getOccurrences,
      index,
    }
    return index
  }

  const api: EventCalendarApi<TData> = {
    next() {
      const state = getState()
      setField(
        "date",
        stepDate(state.view, state.date, 1, {
          timeZone: settings.timeZone,
          dayCount: state.dayCount,
          agendaDayCount: settings.agendaDayCount,
        }),
      )
    },
    prev() {
      const state = getState()
      setField(
        "date",
        stepDate(state.view, state.date, -1, {
          timeZone: settings.timeZone,
          dayCount: state.dayCount,
          agendaDayCount: settings.agendaDayCount,
        }),
      )
    },
    today() {
      setField("date", new Date())
    },
    goTo(date) {
      setField("date", date)
    },
    setView(view, opts) {
      if (opts?.dayCount !== undefined) {
        setField("dayCount", Math.max(1, opts.dayCount))
      }
      setField("view", resolveView(view))
    },
    setDayCount(count) {
      setField("dayCount", Math.max(1, count))
    },
    getEvents() {
      return getState().events
    },
    getEvent(id) {
      return getState().events.find((event) => event.id === id)
    },
    setEvents(events) {
      setField("events", events)
    },
    addEvent(event) {
      setField("events", [...getState().events, event])
    },
    updateEvent(id, patch) {
      const event = api.getEvent(id)
      if (!event) return
      const merged = { ...event, ...patch }
      const timingChanged =
        patch.start !== undefined || patch.end !== undefined || patch.allDay !== undefined
      if (timingChanged && settings.onEventUpdate) {
        const rest = { ...patch }
        delete rest.start
        delete rest.end
        delete rest.allDay
        applyProposedUpdate(
          {
            event: merged,
            occurrence: null,
            start: merged.start,
            end: merged.end,
            allDay: merged.allDay ?? false,
            source: "api",
          },
          rest,
        )
        return
      }
      if (timingChanged) {
        remapSelectionKey(id, `${id}::${event.start.toISOString()}`, merged.start)
      }
      setField(
        "events",
        getState().events.map((e) => (e.id === id ? merged : e)),
      )
    },
    removeEvent(id) {
      setField(
        "events",
        getState().events.filter((event) => event.id !== id),
      )
    },
    getOccurrences(range) {
      if (!range) return getIndex().occurrences
      const state = getState()
      const within = range.start >= state.visibleRange.start && range.end <= state.visibleRange.end
      if (within) {
        return getIndex().occurrences.filter((occ) => eventsOverlap(occ, range))
      }
      const rangeKey = getRangeKey(range)
      if (
        rangeCache &&
        rangeCache.events === state.events &&
        rangeCache.rangeKey === rangeKey &&
        rangeCache.timeZone === settings.timeZone &&
        rangeCache.weekStartsOn === settings.weekStartsOn &&
        rangeCache.eventOrder === settings.eventOrder &&
        rangeCache.getOccurrences === settings.getOccurrences
      ) {
        return rangeCache.occurrences
      }
      const { occurrences } = buildEventIndex(state.events, range, {
        timeZone: settings.timeZone,
        weekStartsOn: settings.weekStartsOn,
        eventOrder: settings.eventOrder,
        getOccurrences: settings.getOccurrences,
      })
      rangeCache = {
        events: state.events,
        rangeKey,
        timeZone: settings.timeZone,
        weekStartsOn: settings.weekStartsOn,
        eventOrder: settings.eventOrder,
        getOccurrences: settings.getOccurrences,
        occurrences,
      }
      return occurrences
    },
    getOccurrencesForDay(day) {
      const bucket = getIndex().byDay.get(getDayKey(day, settings.timeZone))
      if (!bucket) return []
      const seen = new Set<string>()
      const result: Array<EventCalendarOccurrence<TData>> = []
      for (const seg of [...bucket.allDay, ...bucket.timed]) {
        if (seen.has(seg.occurrence.key)) continue
        seen.add(seg.occurrence.key)
        result.push(seg.occurrence)
      }
      return result
    },
    findOverlapping({ start, end, excludeEventId }) {
      return api.getOccurrences({ start, end }).filter((occ) => occ.eventId !== excludeEventId)
    },
    select(partial) {
      const current = getState().selection
      setField("selection", {
        eventKeys: partial.eventKeys ?? current.eventKeys,
        slot: partial.slot !== undefined ? partial.slot : current.slot,
      })
    },
    selectEvent(key, opts) {
      const current = getState().selection
      const eventKeys = opts?.additive
        ? current.eventKeys.includes(key)
          ? current.eventKeys.filter((k) => k !== key)
          : [...current.eventKeys, key]
        : [key]
      setField("selection", { ...current, eventKeys })
    },
    clearSelection() {
      setField("selection", EMPTY_SELECTION)
    },
    setInteractions(patch) {
      setField("interactions", { ...getState().interactions, ...patch })
    },
    setViewSettings(patch) {
      setField("viewSettings", { ...getState().viewSettings, ...patch })
    },
    getVisibleRange() {
      return getState().visibleRange
    },
    getActiveRange() {
      return getState().activeRange
    },
    toZoned(date) {
      return toZoned(date, settings.timeZone)
    },
    scrollToTime(time) {
      scrollHandler?.(time)
    },
  }

  const internals: EventCalendarInternals<TData> = {
    getIndex,
    setDrag(drag) {
      internal.drag = drag
      invalidate()
      notify()
    },
    setSlotDraft(draft) {
      internal.slotDraft = draft
      invalidate()
      notify()
    },
    registerScrollHandler(handler) {
      scrollHandler = handler
    },
    applyProposedUpdate,
    getSettingsVersion() {
      return settingsVersion
    },
    getRootEl() {
      return rootEl
    },
    setRootEl(el) {
      rootEl = el
    },
  }

  const instance: EventCalendarInstance<TData> = {
    getState,
    subscribe(listener) {
      listeners.add(listener)
      return () => listeners.delete(listener)
    },
    api,
    get settings() {
      return settings
    },
    internals,
  }

  const STATE_KEYS = [
    "events",
    "view",
    "date",
    "dayCount",
    "selection",
    "interactions",
    "viewSettings",
    "loading",
  ] as const
  const SETTINGS_KEYS = [
    "timeZone",
    "locale",
    "weekStartsOn",
    "views",
    "dayStartHour",
    "dayEndHour",
    "slotDuration",
    "snapDuration",
    "agendaDayCount",
    "fixedWeeks",
    "showOutsideDays",
    "i18n",
    "resources",
    "getEventPriority",
    "eventOrder",
    "getOccurrences",
    "weekendDays",
    "activation",
  ] as const

  return {
    instance,
    setOptions(next) {
      const prev = options
      options = next
      let changed = false
      for (const key of STATE_KEYS) {
        if (prev[key] !== next[key]) {
          changed = true
          break
        }
      }
      let settingsChanged = false
      for (const key of SETTINGS_KEYS) {
        if (prev[key] !== next[key]) {
          settingsChanged = true
          break
        }
      }
      settings = resolveSettings(next)
      if (settingsChanged) {
        settingsVersion++
        changed = true
      }
      if (changed) {
        invalidate()
        pending = true
      }
    },
    flush() {
      if (!pending) return
      pending = false
      notify()
    },
    emitRangeIfChanged,
  }
}

function useEventCalendarState<TData = unknown>(
  options: UseEventCalendarStateOptions<TData> = {},
): EventCalendarInstance<TData> {
  const [store] = useState(() => createEventCalendarStore<TData>(options))
  store.setOptions(options)
  useLayoutEffect(() => store.flush())
  useEffect(() => {
    store.emitRangeIfChanged()
  }, [store])
  return store.instance
}

const EventCalendarContext = createContext<EventCalendarInstance | null>(null)

function useEventCalendar<TData = unknown>(): EventCalendarInstance<TData> {
  const instance = use(EventCalendarContext)
  if (!instance) {
    throw new Error("useEventCalendar must be used within <EventCalendar>")
  }
  return instance as EventCalendarInstance<TData>
}

interface UseEventCalendarSelectorOptions<TData, TSelected> {
  calendar?: EventCalendarInstance<TData>
  isEqual?: (a: TSelected, b: TSelected) => boolean
}

function useEventCalendarSelector<TData = unknown, TSelected = unknown>(
  selector: (state: EventCalendarState<TData>) => TSelected,
  options?: UseEventCalendarSelectorOptions<TData, TSelected>,
): TSelected {
  const contextInstance = use(EventCalendarContext)
  const instance = options?.calendar ?? contextInstance
  if (!instance) {
    throw new Error(
      "useEventCalendarSelector needs an <EventCalendar> ancestor or an explicit `calendar` option",
    )
  }
  const isEqual = options?.isEqual ?? Object.is
  const lastRef = useRef<{ value: TSelected } | null>(null)
  const getSnapshot = () => {
    const next = selector(instance.getState() as EventCalendarState<TData>)
    if (lastRef.current && isEqual(lastRef.current.value, next)) {
      return lastRef.current.value
    }
    lastRef.current = { value: next }
    return next
  }

  return useSyncExternalStore(instance.subscribe, getSnapshot, getSnapshot)
}

interface EventCalendarViewResult {
  view: CalendarView
  dayCount: number
  availableViews: Array<CalendarView>
  setView: (view: CalendarView, opts?: { dayCount?: number }) => void
}

function useEventCalendarView(): EventCalendarViewResult {
  const instance = useEventCalendar()
  const view = useEventCalendarSelector((state) => state.view)
  const dayCount = useEventCalendarSelector((state) => state.dayCount)
  useEventCalendarSettingsVersion(instance)
  return {
    view,
    dayCount,
    availableViews: instance.settings.views,
    setView: instance.api.setView,
  }
}

const midnightTicker = (() => {
  const zones = new Map<
    string,
    { listeners: Set<() => void>; timer: ReturnType<typeof setTimeout> | null }
  >()

  const arm = (timeZone: string) => {
    const entry = zones.get(timeZone)
    if (!entry) return
    const now = new Date()
    const next = zonedStartOfDay(addDays(toZoned(now, timeZone), 1), timeZone).getTime()
    entry.timer = setTimeout(
      () => {
        entry.listeners.forEach((listener) => listener())
        arm(timeZone)
      },
      Math.max(1000, next - now.getTime()),
    )
  }

  return {
    subscribe(timeZone: string, listener: () => void) {
      let entry = zones.get(timeZone)
      if (!entry) {
        entry = { listeners: new Set(), timer: null }
        zones.set(timeZone, entry)
        entry.listeners.add(listener)
        arm(timeZone)
      } else {
        entry.listeners.add(listener)
      }
      const current = entry
      return () => {
        current.listeners.delete(listener)
        if (current.listeners.size > 0) return
        if (current.timer) clearTimeout(current.timer)
        zones.delete(timeZone)
      }
    },
  }
})()

const minuteTicker = (() => {
  const listeners = new Set<() => void>()
  let timer: ReturnType<typeof setInterval> | null = null
  return (listener: () => void) => {
    listeners.add(listener)
    timer ??= setInterval(() => listeners.forEach((each) => each()), 60_000)
    return () => {
      listeners.delete(listener)
      if (listeners.size > 0 || !timer) return
      clearInterval(timer)
      timer = null
    }
  }
})()

function useIsPast(time: number): boolean {
  return useSyncExternalStore(
    minuteTicker,
    () => time < Date.now(),
    () => false,
  )
}

function useTodayKey(timeZone: string): string {
  const subscribe = useCallback(
    (listener: () => void) => midnightTicker.subscribe(timeZone, listener),
    [timeZone],
  )
  const getSnapshot = useCallback(() => getDayKey(new Date(), timeZone), [timeZone])
  return useSyncExternalStore(subscribe, getSnapshot, getSnapshot)
}

interface EventCalendarNavigationResult {
  date: Date
  title: string
  visibleRange: EventCalendarDateRange
  activeRange: EventCalendarDateRange
  next: () => void
  prev: () => void
  today: () => void
  goTo: (date: Date) => void
  isToday: boolean
}

function useEventCalendarNavigation(): EventCalendarNavigationResult {
  const instance = useEventCalendar()
  const { settings } = instance
  const slice = useEventCalendarSelector(
    (state) => ({
      date: state.date,
      view: state.view,
      visibleRange: state.visibleRange,
      activeRange: state.activeRange,
    }),
    {
      isEqual: (a, b) =>
        a.date.getTime() === b.date.getTime() &&
        a.view === b.view &&
        getRangeKey(a.visibleRange) === getRangeKey(b.visibleRange),
    },
  )
  useEventCalendarSettingsVersion(instance)
  useTodayKey(settings.timeZone)
  const isToday = useEventCalendarSelector((state) => {
    const now = new Date()
    return now >= state.activeRange.start && now < state.activeRange.end
  })
  return {
    date: slice.date,
    title: settings.i18n.functions.formatTitle(slice.view, {
      date: toZoned(slice.date, settings.timeZone),
      activeRange: slice.activeRange,
      visibleRange: slice.visibleRange,
      locale: settings.locale,
    }),
    visibleRange: slice.visibleRange,
    activeRange: slice.activeRange,
    next: instance.api.next,
    prev: instance.api.prev,
    today: instance.api.today,
    goTo: instance.api.goTo,
    isToday,
  }
}

interface EventCalendarSelectionResult {
  selection: EventCalendarSelection
  select: (selection: Partial<EventCalendarSelection>) => void
  selectEvent: (key: string, opts?: { additive?: boolean }) => void
  clearSelection: () => void
}

function useEventCalendarSelection(): EventCalendarSelectionResult {
  const instance = useEventCalendar()
  const selection = useEventCalendarSelector((state) => state.selection)
  return {
    selection,
    select: instance.api.select,
    selectEvent: instance.api.selectEvent,
    clearSelection: instance.api.clearSelection,
  }
}

interface EventCalendarInteractionsResult {
  interactions: EventCalendarInteractions
  setInteractions: (patch: Partial<EventCalendarInteractions>) => void
}

function useEventCalendarInteractions(): EventCalendarInteractionsResult {
  const instance = useEventCalendar()
  const interactions = useEventCalendarSelector((state) => state.interactions)
  return { interactions, setInteractions: instance.api.setInteractions }
}

function useEventCalendarOccurrences<TData = unknown>(
  range?: EventCalendarDateRange,
): Array<EventCalendarOccurrence<TData>> {
  const instance = useEventCalendar<TData>()
  return useEventCalendarSelector<TData, Array<EventCalendarOccurrence<TData>>>(
    () => instance.api.getOccurrences(range),
    {
      calendar: instance,
      isEqual: (a, b) => a === b || (a.length === b.length && a.every((occ, i) => occ === b[i])),
    },
  )
}

const EMPTY_BUCKET: EventCalendarDayBucket = { allDay: [], timed: [] }

interface EventCalendarDayResult<TData = unknown> {
  segments: EventCalendarDayBucket<TData>
  isToday: boolean
  isOutside: boolean
}

function useEventCalendarDay<TData = unknown>(day: Date): EventCalendarDayResult<TData> {
  const instance = useEventCalendar<TData>()
  const { timeZone } = instance.settings
  const dayKey = getDayKey(day, timeZone)

  const bucket = useEventCalendarSelector<TData, EventCalendarDayBucket<TData>>(
    () =>
      instance.internals.getIndex().byDay.get(dayKey) ??
      (EMPTY_BUCKET as EventCalendarDayBucket<TData>),
    {
      calendar: instance,
      isEqual: (a, b) =>
        a === b ||
        (a.allDay.length === b.allDay.length &&
          a.timed.length === b.timed.length &&
          a.allDay.every((segment, i) => segment === b.allDay[i]) &&
          a.timed.every((segment, i) => segment === b.timed[i])),
    },
  )
  const activeRange = useEventCalendarSelector<TData, EventCalendarDateRange>(
    (state) => state.activeRange,
    {
      calendar: instance,
      isEqual: (a, b) => getRangeKey(a) === getRangeKey(b),
    },
  )
  const todayKey = useTodayKey(timeZone)
  const dayStart = zonedStartOfDay(day, timeZone)
  return {
    segments: bucket,
    isToday: todayKey === dayKey,
    isOutside: dayStart < activeRange.start || dayStart >= activeRange.end,
  }
}

const EMPTY_BARS: Array<EventCalendarSegment> = []

interface EventCalendarWeekResult<TData = unknown> {
  bars: Array<EventCalendarSegment<TData>>
  laneCount: number
  rowStart: Date | null
}

function useEventCalendarWeek<TData = unknown>(day: Date): EventCalendarWeekResult<TData> {
  const instance = useEventCalendar<TData>()
  const { timeZone } = instance.settings
  const dayStartMs = zonedStartOfDay(day, timeZone).getTime()

  const row = useEventCalendarSelector<
    TData,
    { bars: Array<EventCalendarSegment<TData>>; rowStart: Date | null }
  >(
    () => {
      const index = instance.internals.getIndex()
      const match = index.weekRows.find((r) => {
        const startMs = zonedStartOfDay(r.rowStart, timeZone).getTime()
        const endMs = zonedStartOfDay(addDays(toZoned(r.rowStart, timeZone), 7), timeZone).getTime()
        return dayStartMs >= startMs && dayStartMs < endMs
      })
      return {
        bars: match?.bars ?? (EMPTY_BARS as Array<EventCalendarSegment<TData>>),
        rowStart: match?.rowStart ?? null,
      }
    },
    {
      calendar: instance,
      isEqual: (a, b) =>
        (a.rowStart?.getTime() ?? 0) === (b.rowStart?.getTime() ?? 0) &&
        (a.bars === b.bars ||
          (a.bars.length === b.bars.length && a.bars.every((segment, i) => segment === b.bars[i]))),
    },
  )
  const laneCount = row.bars.reduce((m, s) => Math.max(m, (s.lane ?? 0) + 1), 0)
  return { bars: row.bars, laneCount, rowStart: row.rowStart }
}

interface EventCalendarViewSettingsResult {
  viewSettings: EventCalendarViewSettings
  setViewSettings: (patch: EventCalendarViewSettings) => void
  effective: Required<EventCalendarViewSettings>
}

function useEventCalendarViewSettings(): EventCalendarViewSettingsResult {
  const instance = useEventCalendar()
  const viewConfig = useEventCalendarViewConfig()
  const viewSettings = useEventCalendarSelector((state) => state.viewSettings)
  return {
    viewSettings,
    setViewSettings: instance.api.setViewSettings,
    effective: {
      weekends: viewSettings.weekends ?? true,
      weekNumbers: viewSettings.weekNumbers ?? viewConfig.showWeekNumbers,
      nowIndicator: viewSettings.nowIndicator ?? viewConfig.nowIndicator,
      offDays:
        viewSettings.offDays ?? (viewConfig.offDays !== undefined && viewConfig.offDays !== false),
    },
  }
}

function useEventCalendarSettingsVersion<TData>(instance: EventCalendarInstance<TData>): number {
  return useSyncExternalStore(
    instance.subscribe,
    instance.internals.getSettingsVersion,
    instance.internals.getSettingsVersion,
  )
}

function useEventCalendarSettings<TData = unknown>(): EventCalendarSettings<TData> {
  const instance = useEventCalendar<TData>()
  useEventCalendarSettingsVersion(instance)
  return instance.settings
}

const EventCalendarViewContext = createContext<CalendarView | null>(null)

interface EventCalendarClassNames {
  nav?: string
  toolbar?: string
  content?: string
  monthView?: string
  monthCell?: string
  timeGrid?: string
  timeGutter?: string
  dayColumn?: string
  allDaySection?: string
  agendaView?: string
  event?: string
  eventTooltip?: string
  moreIndicator?: string
  morePopover?: string
  morePopoverHeader?: string
  navButton?: string
  title?: string
  navTooltip?: string
  viewSwitcherContent?: string
  viewSwitcherLabel?: string
  viewShortcut?: string
  datePickerContent?: string
  monthHeader?: string
  monthDayHeader?: string
  monthBody?: string
  monthRow?: string
  weekNumber?: string
  monthBarOverlay?: string
  monthBar?: string
  monthCellContent?: string
  monthCellFooter?: string
  monthDayNumber?: string
  dayAddButton?: string
  timeGridHeader?: string
  timeGutterLabel?: string
  allDayLabel?: string
  allDayCell?: string
  timedChip?: string
  resourceHeader?: string
  dragGhost?: string
  dragCarry?: string
  dragCarryInvalid?: string
  dropHint?: string
  dropIndicator?: string
  slotDraft?: string
  resizeHandle?: string
  resizeGrip?: string
  noEvents?: string
  agendaDay?: string
  agendaDayHeader?: string
  agendaDayGutter?: string
  agendaDate?: string
  agendaDayToggle?: string
  agendaDayContent?: string
  agendaItem?: string
  agendaItemSurface?: string
  agendaItemToggle?: string
  agendaDaySummary?: string
  agendaSummaryDot?: string
}

interface EventCalendarRenderEventProps<TData = unknown> {
  occurrence: EventCalendarOccurrence<TData>
  segment: EventCalendarSegment<TData>
  view: CalendarView
  isDragging: boolean
  isSelected: boolean
}

interface EventCalendarViewConfig<TData = unknown> {
  scrollToHour: number
  nowIndicator: boolean
  interval: number
  maxEventsPerCell: number | "auto"
  showWeekNumbers: boolean
  enableShortcuts: boolean
  shortcutsScope: "focus-within" | "global"
  scrollMode: "contained" | "page"
  stickyNav: boolean
  dayClassName?: (day: Date) => string | undefined
  todayClassName?: string
  showDayAddButton: boolean
  scrollbars: "custom" | "native"
  navButtonVariant: "ghost" | "outline" | "secondary" | "default"
  navButtonSize: "sm" | "default"
  offDays?: boolean | EventCalendarOffDaysConfig
  classNames?: EventCalendarClassNames
  components?: Partial<Record<CalendarView, ComponentType>>
  renderEvent?: (props: EventCalendarRenderEventProps<TData>) => ReactNode
  renderAgendaEvent?: (props: EventCalendarRenderEventProps<TData>) => ReactNode
  renderEventTooltip?: (props: {
    occurrence: EventCalendarOccurrence<TData>
    segment: EventCalendarSegment<TData>
    view: CalendarView
    label: string | undefined
  }) => ReactNode
  renderDragPreview?: (props: { drag: EventCalendarDragState<TData> }) => ReactNode
  renderMonthCell?: (props: {
    day: Date
    segments: EventCalendarDayBucket<TData>
    isToday: boolean
    isOutside: boolean
    overflowCount: number
    defaultContent: ReactNode
  }) => ReactNode
  renderDayColumnBackground?: (props: {
    day: Date
    boundsStartMin: number
    boundsEndMin: number
    totalMinutes: number
  }) => ReactNode
  renderDayHeader?: (props: { day: Date; view: CalendarView; isToday: boolean }) => ReactNode
  renderTimeGutterSlot?: (props: { time: Date; hour: number; minute: number }) => ReactNode
  renderAllDaySection?: (props: {
    days: Array<Date>
    segments: Array<EventCalendarSegment<TData>>
  }) => ReactNode
  renderMoreIndicator?: (props: {
    day: Date
    count: number
    segments: Array<EventCalendarSegment<TData>>
  }) => ReactNode
  renderMoreContent?: (props: {
    day: Date
    segments: Array<EventCalendarSegment<TData>>
    close: () => void
  }) => ReactNode
  renderAgendaEventDetails?: (occurrence: EventCalendarOccurrence<TData>) => ReactNode
  renderNowIndicator?: (props: { time: Date }) => ReactNode
  renderNoEvents?: () => ReactNode
  renderResourceHeader?: (props: { resource: EventCalendarResource }) => ReactNode
  renderAgendaDayHeader?: (props: {
    day: Date
    collapsed: boolean
    count: number
    toggle: () => void
    defaultContent: ReactNode
  }) => ReactNode
  renderAgendaDaySummary?: (props: {
    day: Date
    occurrences: Array<EventCalendarOccurrence<TData>>
    count: number
    expand: () => void
    defaultContent: ReactNode
  }) => ReactNode
  dayCountPresets: Array<number>
  navTooltips?:
    | false
    | {
        side?: "top" | "bottom" | "left" | "right"
        delay?: number
        closeDelay?: number
        timeout?: number
      }
  eventTooltip?:
    | boolean
    | {
        side?: "top" | "bottom" | "left" | "right"
        delay?: number
      }
  compactEventMinutes: number
  morePopoverAlign: "start" | "center" | "end"
  nowIndicatorInterval: number
  agendaSummaryMaxDots: number
}

const DEFAULT_VIEW_CONFIG: EventCalendarViewConfig = {
  scrollToHour: 7,
  nowIndicator: true,
  interval: 60,
  maxEventsPerCell: "auto",
  showWeekNumbers: false,
  enableShortcuts: true,
  shortcutsScope: "focus-within",
  scrollMode: "contained",
  stickyNav: false,
  showDayAddButton: false,
  scrollbars: "custom",
  navButtonVariant: "ghost",
  navButtonSize: "sm",
  dayCountPresets: [5],
  eventTooltip: false,
  compactEventMinutes: 45,
  morePopoverAlign: "start",
  nowIndicatorInterval: 30_000,
  agendaSummaryMaxDots: 6,
}

const EventCalendarViewConfigContext = createContext<EventCalendarViewConfig>(DEFAULT_VIEW_CONFIG)

function useEventCalendarViewConfig<TData = unknown>(): EventCalendarViewConfig<TData> {
  return use(EventCalendarViewConfigContext)
}

const VIEW_CONFIG_KEYS: Array<keyof EventCalendarViewConfig> = [
  "scrollToHour",
  "nowIndicator",
  "interval",
  "maxEventsPerCell",
  "showWeekNumbers",
  "enableShortcuts",
  "shortcutsScope",
  "scrollMode",
  "stickyNav",
  "dayClassName",
  "todayClassName",
  "showDayAddButton",
  "scrollbars",
  "navButtonVariant",
  "navButtonSize",
  "offDays",
  "classNames",
  "components",
  "renderEvent",
  "renderAgendaEvent",
  "renderEventTooltip",
  "renderDragPreview",
  "renderMonthCell",
  "renderDayColumnBackground",
  "renderDayHeader",
  "renderTimeGutterSlot",
  "renderAllDaySection",
  "renderMoreIndicator",
  "renderMoreContent",
  "renderNowIndicator",
  "renderNoEvents",
  "renderAgendaEventDetails",
  "renderResourceHeader",
  "renderAgendaDayHeader",
  "renderAgendaDaySummary",
  "dayCountPresets",
  "navTooltips",
  "eventTooltip",
  "compactEventMinutes",
  "morePopoverAlign",
  "nowIndicatorInterval",
  "agendaSummaryMaxDots",
]

function useEventCalendarViewContext() {
  const view = use(EventCalendarViewContext)
  if (!view) {
    throw new Error("useEventCalendarViewContext must be used inside a calendar view")
  }
  return { view }
}

interface EventCalendarProps<TData = unknown>
  extends
    UseEventCalendarStateOptions<TData>,
    Partial<EventCalendarViewConfig<TData>>,
    Omit<RenderProps<"div">, "children" | "defaultValue"> {
  calendar?: EventCalendarInstance<TData>
  apiRef?: RefObject<EventCalendarApi<TData> | null>
  children?: ReactNode
}

const OPTION_KEYS: Array<keyof UseEventCalendarStateOptions> = [
  "events",
  "defaultEvents",
  "view",
  "defaultView",
  "date",
  "defaultDate",
  "dayCount",
  "defaultDayCount",
  "selection",
  "defaultSelection",
  "interactions",
  "defaultInteractions",
  "viewSettings",
  "defaultViewSettings",
  "loading",
  "views",
  "timeZone",
  "locale",
  "weekStartsOn",
  "dayStartHour",
  "dayEndHour",
  "slotDuration",
  "snapDuration",
  "agendaDayCount",
  "fixedWeeks",
  "showOutsideDays",
  "i18n",
  "resources",
  "getEventPriority",
  "eventOrder",
  "getOccurrences",
  "weekendDays",
  "activation",
  "onEventClick",
  "onEventDoubleClick",
  "onEventUpdate",
  "canDropEvent",
  "onDragBlocked",
  "onSlotClick",
  "onSelectSlot",
  "canSelectSlot",
  "onRangeChange",
  "onViewChange",
  "onDateChange",
  "onDayCountChange",
  "onSelectionChange",
  "onInteractionsChange",
  "onViewSettingsChange",
  "onEventsChange",
  "onMoreClick",
]

interface SplitOptionsResult<TData> {
  options: UseEventCalendarStateOptions<TData>
  viewConfig: EventCalendarViewConfig<TData>
  rest: Record<string, unknown>
}

function splitOptions<TData>(props: Record<string, unknown>): SplitOptionsResult<TData> {
  const options: Record<string, unknown> = {}
  const viewOverrides: Record<string, unknown> = {}
  const rest: Record<string, unknown> = {}
  for (const [key, value] of Object.entries(props)) {
    if ((OPTION_KEYS as Array<string>).includes(key)) options[key] = value
    else if ((VIEW_CONFIG_KEYS as Array<string>).includes(key)) {
      if (value !== undefined) viewOverrides[key] = value
    } else rest[key] = value
  }
  return {
    options,
    viewConfig: {
      ...DEFAULT_VIEW_CONFIG,
      ...viewOverrides,
    },
    rest,
  }
}

function EventCalendar<TData = unknown>({
  calendar,
  apiRef,
  className,
  render,
  children,
  ...props
}: EventCalendarProps<TData>) {
  const { options, viewConfig, rest } = splitOptions<TData>(props)

  if (calendar && Object.keys(options).length > 0) {
    warnOnce(
      "calendar-and-options",
      "both `calendar` and option props were passed; option props are ignored when adopting an instance.",
    )
  }

  const own = useEventCalendarState<TData>(calendar ? {} : options)
  const instance = calendar ?? own

  useEffect(() => {
    if (apiRef) apiRef.current = instance.api
  }, [apiRef, instance])

  const registerRoot = useCallback(
    (el: HTMLElement | null) => instance.internals.setRootEl(el),
    [instance],
  )

  const defaultProps = {
    "data-slot": "event-calendar",
    ref: registerRoot,
    className: cn("flex min-h-0 min-w-0 flex-col text-xs", className),
    children: (
      <>
        {children}
        <div data-slot="event-calendar-announcer" aria-live="polite" className="sr-only" />
      </>
    ),
  }

  return (
    <EventCalendarContext value={instance as EventCalendarInstance}>
      <EventCalendarViewConfigContext value={viewConfig as EventCalendarViewConfig}>
        {renderElement("div", mergeProps(defaultProps, rest), render)}
      </EventCalendarViewConfigContext>
    </EventCalendarContext>
  )
}

export {
  ALL_VIEWS,
  BASE_VIEWS,
  DEFAULT_VIEW_CONFIG,
  EventCalendar,
  EventCalendarContext,
  EventCalendarViewConfigContext,
  EventCalendarViewContext,
  useEventCalendar,
  useEventCalendarDay,
  useEventCalendarWeek,
  useEventCalendarInteractions,
  useEventCalendarNavigation,
  useEventCalendarOccurrences,
  useEventCalendarSelection,
  useEventCalendarSelector,
  useEventCalendarSettings,
  useEventCalendarSettingsVersion,
  useEventCalendarState,
  useEventCalendarView,
  useEventCalendarViewConfig,
  useEventCalendarViewContext,
  useEventCalendarViewSettings,
  useIsPast,
  useTodayKey,
}
export type {
  EventCalendarActivationConfig,
  EventCalendarApi,
  EventCalendarCallbacks,
  EventCalendarClassNames,
  EventCalendarInstance,
  EventCalendarInternals,
  EventCalendarProps,
  EventCalendarRenderEventProps,
  EventCalendarSettings,
  EventCalendarViewConfig,
  UseEventCalendarStateOptions,
}
