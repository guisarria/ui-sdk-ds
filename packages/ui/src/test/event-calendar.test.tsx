import { act, render } from "@testing-library/react"
import { expect, test } from "vitest"

import { EventCalendar } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar"
import { EventCalendarContent } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-content"

const day = (hour: number) => new Date(2026, 0, 14, hour)
const events = ["Standup", "Review", "Planning", "Retro"].map((title, index) => ({
  id: title,
  title,
  start: day(9 + index),
  end: day(10 + index),
}))

async function renderMonth(eventTooltip: boolean) {
  const view = render(
    <EventCalendar
      events={events}
      defaultView="month"
      defaultDate={day(9)}
      maxEventsPerCell={2}
      eventTooltip={eventTooltip}
    >
      <EventCalendarContent />
    </EventCalendar>,
  )
  await act(async () => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0)
    })
  })
  return view
}

test.each([false, true])(
  "event chips keep their hook with eventTooltip=%s",
  async (eventTooltip) => {
    const { container } = await renderMonth(eventTooltip)
    const chip = container.querySelector(`[aria-label^="Standup"]`)
    expect(chip?.getAttribute("data-slot")).toBe("event-calendar-event")
  },
)

test("the more indicator is found by the month cell's pointer guard", async () => {
  const { getByText } = await renderMonth(false)
  const more = getByText(/more/i).closest("button")
  expect(more?.closest("[data-event-calendar-more]")).not.toBeNull()
})
