"use client"

import type { ComponentType, ReactNode } from "react"
import {
  useEventCalendarSelector,
  useEventCalendarViewConfig,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar"
import { EventCalendarAgendaView } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-agenda-view"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"
import { EventCalendarMonthView } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-month-view"
import { EventCalendarResourceView } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-resource-view"
import {
  EventCalendarDaysView,
  EventCalendarDayView,
  EventCalendarWeekView,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-time-grid"
import type { CalendarView } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-types"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"

import { cn } from "cn"

const DEFAULT_VIEW_COMPONENTS = {
  month: EventCalendarMonthView,
  week: EventCalendarWeekView,
  day: EventCalendarDayView,
  days: EventCalendarDaysView,
  agenda: EventCalendarAgendaView,
  resource: EventCalendarResourceView,
} satisfies Record<CalendarView, ComponentType>

interface EventCalendarContentProps extends Omit<RenderProps<"div">, "children"> {
  components?: Partial<Record<CalendarView, ComponentType>>
  children?: ReactNode
}

function EventCalendarContent({
  className,
  render,
  components,
  children,
  ...props
}: EventCalendarContentProps) {
  const viewConfig = useEventCalendarViewConfig()
  const view = useEventCalendarSelector((state) => state.view)
  const loading = useEventCalendarSelector((state) => state.loading)

  const resolved = {
    ...DEFAULT_VIEW_COMPONENTS,
    ...viewConfig.components,
    ...components,
  }
  const ActiveView = resolved[view] ?? DEFAULT_VIEW_COMPONENTS[view]

  const defaultProps = {
    "data-slot": "event-calendar-content",
    "data-view": view,
    "data-loading": loading || undefined,
    className: cn(
      "relative flex min-h-0 min-w-0 flex-1 flex-col",
      "data-loading:pointer-events-none data-loading:opacity-60",
      viewConfig.classNames?.content,
      className,
    ),
    children: children ?? <ActiveView />,
  }

  return renderElement("div", mergeProps(defaultProps, props), render)
}

export { DEFAULT_VIEW_COMPONENTS, EventCalendarContent }
export type { EventCalendarContentProps }
