"use client"

import { useMemo } from "react"
import {
  EventCalendarViewContext,
  useEventCalendar,
  useEventCalendarSelector,
  useEventCalendarSettings,
  useEventCalendarViewConfig,
  useTodayKey,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar"
import { EventCalendarEvent } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-event"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"
import {
  getDayKey,
  getRangeKey,
  toZoned,
  zonedStartOfDay,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-lib"
import type {
  EventCalendarDateRange,
  EventCalendarSegment,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-types"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import { addDays, format } from "date-fns"

import { cn } from "cn"
import { EmptyMedia } from "@ui-sdk-ds/ui/components/empty"
import { ScrollArea } from "@ui-sdk-ds/ui/components/scroll-area"
import { CalendarIcon } from "lucide-react"

type EventCalendarAgendaViewProps = RenderProps<"div">

function EventCalendarAgendaView({ className, render, ...props }: EventCalendarAgendaViewProps) {
  const instance = useEventCalendar()
  const settings = useEventCalendarSettings()
  const todayKey = useTodayKey(settings.timeZone)
  const viewConfig = useEventCalendarViewConfig()
  const visibleRange = useEventCalendarSelector<unknown, EventCalendarDateRange>(
    (state) => state.visibleRange,
    {
      isEqual: (a, b) => getRangeKey(a) === getRangeKey(b),
    },
  )
  const index = useEventCalendarSelector(() => instance.internals.getIndex())

  const days = useMemo(() => {
    const result: Array<Date> = []
    let cursor = zonedStartOfDay(visibleRange.start, settings.timeZone)
    while (cursor < visibleRange.end) {
      result.push(cursor)
      cursor = zonedStartOfDay(addDays(toZoned(cursor, settings.timeZone), 1), settings.timeZone)
    }
    return result
  }, [visibleRange, settings.timeZone])

  const groups = days
    .map((day) => ({
      day,
      bucket: index.byDay.get(getDayKey(day, settings.timeZone)),
    }))
    .filter((group) => {
      const total = (group.bucket?.allDay.length ?? 0) + (group.bucket?.timed.length ?? 0)
      return total > 0
    })

  const isToday = (day: Date) => getDayKey(day, settings.timeZone) === todayKey

  const native = viewConfig.scrollbars === "native"

  const body =
    groups.length === 0 ? (
      <div
        data-slot="event-calendar-no-events"
        className={cn(
          "flex min-h-72 flex-col items-center justify-center gap-4 py-16",
          viewConfig.classNames?.noEvents,
        )}
      >
        {viewConfig.renderNoEvents?.() ?? (
          <>
            <EmptyMedia variant="icon" className="mb-0">
              <CalendarIcon aria-hidden="true" />
            </EmptyMedia>
            <span className="text-sm text-muted-foreground">{settings.i18n.labels.noEvents}</span>
          </>
        )}
      </div>
    ) : (
      <div className="flex flex-col [&>*:last-child>*:last-child]:border-b-0">
        {groups.map(({ day, bucket }) => {
          const items = [...(bucket?.allDay ?? []), ...(bucket?.timed ?? [])]
          const zoned = toZoned(day, settings.timeZone)
          const weekday = format(zoned, "EEEE", { locale: settings.locale })
          const dayDate = format(zoned, "MMMM d, yyyy", {
            locale: settings.locale,
          })
          return (
            <div
              key={day.getTime()}
              data-slot="event-calendar-agenda-day"
              data-today={isToday(day) || undefined}
              role="group"
              aria-label={`${weekday}, ${dayDate}, ${settings.i18n.labels.events(items.length)}`}
            >
              <div
                data-slot="event-calendar-agenda-day-header"
                role="heading"
                aria-level={3}
                className={cn(
                  "sticky top-0 z-10 flex items-baseline justify-between gap-4 border-b bg-muted/60 px-4 py-2",
                  !native && "me-2.5",
                  viewConfig.classNames?.agendaDayHeader,
                )}
              >
                <span
                  className={cn("font-semibold text-foreground", isToday(day) && "text-primary")}
                >
                  {weekday}
                </span>
                <span className="font-medium text-muted-foreground tabular-nums">{dayDate}</span>
              </div>
              {items.map((segment) => (
                <EventCalendarAgendaItem key={segment.occurrence.key} segment={segment} />
              ))}
            </div>
          )
        })}
      </div>
    )

  const defaultProps = {
    "data-slot": "event-calendar-agenda-view",
    "data-view": "agenda",
    role: "group",
    "aria-label": settings.i18n.functions.formatDayRange(visibleRange, {
      locale: settings.locale,
    }),
    className: cn(
      "flex min-h-0 flex-1 flex-col overflow-hidden border-t",
      viewConfig.classNames?.agendaView,
      className,
    ),
    children: native ? (
      <div
        data-slot="scroll-area-viewport"
        data-ec-native-scroll=""
        className="h-full overflow-y-auto"
      >
        {body}
      </div>
    ) : (
      <ScrollArea className="h-full">{body}</ScrollArea>
    ),
  }

  return (
    <EventCalendarViewContext.Provider value={{ view: "agenda" }}>
      {renderElement("div", mergeProps(defaultProps, props), render)}
    </EventCalendarViewContext.Provider>
  )
}

function EventCalendarAgendaItem({ segment }: { segment: EventCalendarSegment }) {
  const viewConfig = useEventCalendarViewConfig()
  return (
    <EventCalendarEvent
      segment={segment}
      className={cn(
        "gap-3 rounded-none border-b px-4 py-2.5 transition-colors hover:bg-accent/40",
        viewConfig.classNames?.agendaItem,
      )}
    />
  )
}

export { EventCalendarAgendaView }
export type { EventCalendarAgendaViewProps }
