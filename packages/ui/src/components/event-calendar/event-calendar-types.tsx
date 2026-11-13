type EventCalendarEventId = string

type CalendarView = "month" | "week" | "day" | "days" | "agenda" | "resource"

interface EventCalendarResource {
  id: string
  title: string
  color?: string
  children?: Array<EventCalendarResource>
}

interface EventCalendarDateRange {
  start: Date
  end: Date
}

type EventCalendarWeekday = "MO" | "TU" | "WE" | "TH" | "FR" | "SA" | "SU"

interface EventCalendarRecurrenceRule {
  freq: "daily" | "weekly" | "monthly" | "yearly"
  interval?: number
  count?: number
  until?: Date
  byWeekday?: Array<EventCalendarWeekday | { day: EventCalendarWeekday; ordinal: number }>
  byMonthDay?: Array<number>
  byMonth?: Array<number>
  weekStart?: EventCalendarWeekday
  exDates?: Array<Date>
  rDates?: Array<Date>
}

interface CalendarEvent<TData = unknown> {
  id: EventCalendarEventId
  title: string
  start: Date
  end: Date
  allDay?: boolean
  recurrence?: EventCalendarRecurrenceRule | string
  recurringEventId?: EventCalendarEventId
  originalStart?: Date
  color?: string
  readOnly?: boolean
  draggable?: boolean
  resizable?: boolean
  priority?: number
  zIndex?: number
  resourceId?: string
  data?: TData
}

interface EventCalendarOccurrence<TData = unknown> {
  key: string
  eventId: EventCalendarEventId
  event: CalendarEvent<TData>
  start: Date
  end: Date
  allDay: boolean
  isRecurring: boolean
  recurrenceIndex?: number
}

interface EventCalendarSegment<TData = unknown> {
  occurrence: EventCalendarOccurrence<TData>
  day: Date
  isStart: boolean
  isEnd: boolean
  continuesBefore: boolean
  continuesAfter: boolean
  startMin?: number
  endMin?: number
  lane?: number
  column?: number
  columnCount?: number
  columnSpan?: number
  rowIndex?: number
  colStart?: number
  colSpan?: number
}

interface EventCalendarSelection {
  eventKeys: Array<string>
  slot: { start: Date; end: Date; allDay: boolean } | null
}

interface EventCalendarInteractions {
  drag: boolean
  resize: boolean
  selectSlot: boolean
}

interface EventCalendarDragState<TData = unknown> {
  kind: "move" | "resize-start" | "resize-end"
  occurrence: EventCalendarOccurrence<TData>
  proposedStart: Date
  proposedEnd: Date
  proposedAllDay: boolean
  proposedDayGranular: boolean
  proposedResourceId?: string
  valid: boolean
}

interface EventCalendarSlotDraft {
  start: Date
  end: Date
  allDay: boolean
  view: CalendarView
  resourceId?: string
}

interface EventCalendarViewSettings {
  weekends?: boolean
  weekNumbers?: boolean
  nowIndicator?: boolean
  offDays?: boolean
}

interface EventCalendarState<TData = unknown> {
  view: CalendarView
  date: Date
  dayCount: number
  visibleRange: EventCalendarDateRange
  activeRange: EventCalendarDateRange
  events: Array<CalendarEvent<TData>>
  selection: EventCalendarSelection
  interactions: EventCalendarInteractions
  loading: boolean
  drag: EventCalendarDragState<TData> | null
  slotDraft: EventCalendarSlotDraft | null
  viewSettings: EventCalendarViewSettings
}

interface EventCalendarRangeInfo {
  range: EventCalendarDateRange
  activeRange: EventCalendarDateRange
  view: CalendarView
  date: Date
  timeZone: string
}

interface EventCalendarProposedUpdate<TData = unknown> {
  event: CalendarEvent<TData>
  occurrence: EventCalendarOccurrence<TData> | null
  start: Date
  end: Date
  allDay: boolean
  resourceId?: string
  source: "drag" | "resize-start" | "resize-end" | "keyboard" | "api"
}

type EventCalendarUpdateResult = boolean | void | { start?: Date; end?: Date; allDay?: boolean }

interface EventCalendarSlotInfo {
  date: Date
  end?: Date
  allDay: boolean
  view: CalendarView
  resourceId?: string
}

interface EventCalendarOffDaysConfig {
  weekendDays?: Array<number>
  dates?: Array<Date>
  isOffDay?: (day: Date) => boolean
  className?: string
}

interface EventCalendarDataAdapter<TData = unknown> {
  getEvents(
    range: EventCalendarDateRange,
    signal?: AbortSignal,
  ): Promise<Array<CalendarEvent<TData>>>
}

export type {
  CalendarEvent,
  CalendarView,
  EventCalendarDataAdapter,
  EventCalendarDateRange,
  EventCalendarDragState,
  EventCalendarEventId,
  EventCalendarInteractions,
  EventCalendarOccurrence,
  EventCalendarOffDaysConfig,
  EventCalendarProposedUpdate,
  EventCalendarRangeInfo,
  EventCalendarRecurrenceRule,
  EventCalendarResource,
  EventCalendarSegment,
  EventCalendarSelection,
  EventCalendarSlotDraft,
  EventCalendarSlotInfo,
  EventCalendarState,
  EventCalendarViewSettings,
  EventCalendarUpdateResult,
  EventCalendarWeekday,
}
