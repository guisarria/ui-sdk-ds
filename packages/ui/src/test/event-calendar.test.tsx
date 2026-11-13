import { act, render, screen, within } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { expect, test, vi } from "vitest"

import { EventCalendar } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar"
import { EventCalendarContent } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-content"

const day = (hour: number) => new Date(2026, 0, 14, hour)
const events = ["Standup", "Review", "Planning", "Retro"].map((title, index) => ({
  id: title,
  title,
  start: day(9 + index),
  end: day(10 + index),
}))

async function renderMonth(
  eventTooltip: boolean,
  props: Partial<React.ComponentProps<typeof EventCalendar>> = {},
) {
  const view = render(
    <EventCalendar
      events={events}
      defaultView="month"
      defaultDate={day(9)}
      maxEventsPerCell={2}
      eventTooltip={eventTooltip}
      {...props}
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

test("the month is a group of days, each named by its date", async () => {
  const { container } = await renderMonth(false)

  const month = screen.getByRole("group", { name: "January 2026" })
  const wednesday = within(month).getByRole("group", { name: "Wednesday, January 14th, 2026" })

  expect(within(wednesday).getByRole("button", { name: /^Standup/ })).toBeTruthy()
  expect(
    within(wednesday).getByRole("button", { name: "+2 more, Wednesday, January 14th, 2026" }),
  ).toBeTruthy()
  expect(container.querySelector("[role=grid], [role=row], [role=gridcell]")).toBeNull()
})

test("each day's add button names the day it adds to", async () => {
  const user = userEvent.setup()
  const onSlotClick = vi.fn()
  await renderMonth(false, { showDayAddButton: true, onSlotClick })

  await user.click(screen.getByRole("button", { name: "Add event on Friday, January 16th, 2026" }))

  expect(onSlotClick).toHaveBeenCalledOnce()
  expect(onSlotClick.mock.calls[0]![0]).toMatchObject({ date: new Date(2026, 0, 16), allDay: true })
})
