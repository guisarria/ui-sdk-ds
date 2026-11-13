import { act, fireEvent, render } from "@testing-library/react"
import { afterEach, beforeEach, expect, test, vi } from "vitest"

import { EventCalendar } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar"
import { EventCalendarContent } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-content"

const at = (hour: number, minute = 0) => new Date(2026, 0, 14, hour, minute)
const events = [{ id: "standup", title: "Standup", start: at(9), end: at(10) }]

beforeEach(() => {
  vi.spyOn(Element.prototype, "getBoundingClientRect").mockImplementation(function (
    this: HTMLElement,
  ) {
    const { ecBoundsStart, ecBoundsEnd, ecDay } = this.dataset
    if (ecBoundsStart !== undefined && ecBoundsEnd !== undefined) {
      const height = Number(ecBoundsEnd) - Number(ecBoundsStart)
      return DOMRect.fromRect({ x: 0, y: -Number(ecBoundsStart), width: 100, height })
    }
    if (this.dataset.slot === "scroll-area-viewport") {
      return DOMRect.fromRect({ x: 0, y: 0, width: 100, height: 2000 })
    }
    if (ecDay !== undefined) {
      return DOMRect.fromRect({ x: 0, y: -10_000, width: 100, height: 20 })
    }
    return new DOMRect()
  })
})
afterEach(() => {
  vi.restoreAllMocks()
})

const frame = () =>
  act(async () => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 40)
    })
  })

async function renderDay(
  calendarEvents: Array<(typeof events)[number] & { readOnly?: boolean }> = events,
) {
  const onEventUpdate = vi.fn(() => true)
  const onSelectSlot = vi.fn()
  const onDragBlocked = vi.fn()
  const view = render(
    <EventCalendar
      events={calendarEvents}
      onDragBlocked={onDragBlocked}
      defaultView="day"
      defaultDate={at(9)}
      onEventUpdate={onEventUpdate}
      onSelectSlot={onSelectSlot}
    >
      <EventCalendarContent />
    </EventCalendar>,
  )
  await frame()
  const chip = view.container.querySelector<HTMLElement>(`[aria-label^="Standup"]`)!
  const column = view.container.querySelector<HTMLElement>("[data-ec-bounds-start]")!
  return { ...view, chip, column, onEventUpdate, onSelectSlot, onDragBlocked }
}

const minutes = (hour: number, minute = 0) => hour * 60 + minute

async function drag(target: HTMLElement, from: number, to: number, end = true) {
  const point = (y: number) => ({ pointerId: 1, clientX: 50, clientY: y, button: 0 })
  fireEvent.pointerDown(target, point(from))
  for (const y of [from + 2, from + (to - from) / 2, to]) {
    fireEvent.pointerMove(document.body, point(y))
    await frame()
  }
  if (end) {
    fireEvent.pointerUp(document.body, point(to))
    await frame()
  }
}

const lastUpdate = (fn: ReturnType<typeof vi.fn>) => {
  const [update] = fn.mock.calls.at(-1) as [{ start: Date; end: Date }]
  return [update.start, update.end]
}

test("dragging an event moves it, snapped", async () => {
  const { chip, onEventUpdate } = await renderDay()
  await drag(chip, minutes(9, 10), minutes(10, 12))
  expect(lastUpdate(onEventUpdate)).toEqual([at(10), at(11)])
})

test("dragging an event's end resizes it", async () => {
  const { container, onEventUpdate } = await renderDay()
  const handle = container.querySelector<HTMLElement>(
    `[data-slot="event-calendar-resize-handle"][data-edge="end"]`,
  )!
  await drag(handle, minutes(10), minutes(10, 30))
  expect(lastUpdate(onEventUpdate)).toEqual([at(9), at(10, 30)])
})

test("dragging on an empty column proposes a slot", async () => {
  const { column, onSelectSlot } = await renderDay()
  await drag(column, minutes(14), minutes(15))
  expect(onSelectSlot).toHaveBeenCalledWith(
    expect.objectContaining({ start: at(14), end: at(15), allDay: false }),
  )
})

test("Escape cancels a drag", async () => {
  const { chip, onEventUpdate } = await renderDay()
  await drag(chip, minutes(9, 10), minutes(11), false)
  fireEvent.keyDown(document.body, { key: "Escape" })
  fireEvent.pointerUp(document.body, { pointerId: 1, clientX: 50, clientY: minutes(11) })
  await frame()
  expect(onEventUpdate).not.toHaveBeenCalled()
})

test("a press without movement is not a drag", async () => {
  const { chip, onEventUpdate } = await renderDay()
  fireEvent.pointerDown(chip, { pointerId: 1, clientX: 50, clientY: minutes(9, 10), button: 0 })
  fireEvent.pointerUp(document.body, { pointerId: 1, clientX: 50, clientY: minutes(9, 10) })
  await frame()
  expect(onEventUpdate).not.toHaveBeenCalled()
})

test("dragging a read-only event reports it as blocked", async () => {
  const { chip, onEventUpdate, onDragBlocked } = await renderDay([
    { ...events[0]!, readOnly: true },
  ])
  await drag(chip, minutes(9, 10), minutes(11))
  expect(onDragBlocked).toHaveBeenCalledWith(expect.objectContaining({ eventId: "standup" }), {
    gesture: "move",
    reason: "readOnly",
  })
  expect(onEventUpdate).not.toHaveBeenCalled()
  expect(document.body.classList.contains("ec-drag-blocked")).toBe(false)
})
