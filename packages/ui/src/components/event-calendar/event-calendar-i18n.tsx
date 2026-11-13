import type {
  CalendarView,
  EventCalendarDateRange,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-types"
import { format, isSameMonth, isSameYear, subMilliseconds, type Locale } from "date-fns"

interface EventCalendarI18nConfig {
  labels: {
    today: string
    previous: string
    next: string
    addEvent: string
    allDay: string
    more: (count: number) => string
    noEvents: string
    loading: string
    event: string
    events: (count: number) => string
    selectView: string
    week: (weekNumber: number) => string
    resources: string
    goToDate: string
    dropNotAllowed: string
    continues: string
    timeFrom: (time: string) => string
    timeUntil: (time: string) => string
    viewShortcuts: Record<CalendarView, string>
    toggleDayEvents: (count: number, expanded: boolean) => string
    eventDetails: (title: string) => string
    moreCompact: (count: number) => string
    timeRange: (from: string, to: string) => string
  }
  viewNames: {
    month: string
    week: string
    day: string
    days: (count: number) => string
    agenda: string
    resource: string
  }
  formats: {
    monthTitle: string
    weekTitle?: string
    dayTitle: string
    agendaTitle?: string
    monthDayHeader: string
    monthDayHeaderNarrow: string
    timeGridDayHeader: string
    agendaDayHeader: string
    agendaDayNumber: string
    agendaWeekday: string
    moreDayHeader: string
    monthCellAriaLabel: string
    dayAria: string
    resourceTitle?: string
    timeGutter: string
    timeGutterMinute: string
    eventTime: string
    monthCellDay: string
  }
  functions: {
    formatTitle: (
      view: CalendarView,
      ctx: {
        date: Date
        activeRange: EventCalendarDateRange
        visibleRange: EventCalendarDateRange
        locale?: Locale
      },
    ) => string
    formatEventTime: (start: Date, end: Date, allDay: boolean, opts?: { locale?: Locale }) => string
    formatDayRange: (range: EventCalendarDateRange, opts?: { locale?: Locale }) => string
    formatEventLabel?: (title: string, timeLabel: string) => string | undefined
    formatEventAriaLabel?: (title: string, timeLabel: string, continues: boolean) => string
  }
}

const DEFAULT_LABELS: EventCalendarI18nConfig["labels"] = {
  today: "Today",
  previous: "Previous",
  next: "Next",
  addEvent: "Add event",
  allDay: "All day",
  more: (count) => `+${count} more`,
  noEvents: "No events",
  loading: "Loading events",
  event: "event",
  events: (count) => (count === 1 ? "1 event" : `${count} events`),
  selectView: "Select view",
  week: (weekNumber) => `W${weekNumber}`,
  resources: "Resources",
  goToDate: "Go to date",
  dropNotAllowed: "Can't place here",
  continues: "continues",
  timeFrom: (time) => `From ${time}`,
  timeUntil: (time) => `Until ${time}`,
  viewShortcuts: {
    month: "M",
    week: "W",
    day: "D",
    days: "5",
    agenda: "A",
    resource: "G",
  },
  toggleDayEvents: (count) => (count === 1 ? "1 event" : `${count} events`),
  eventDetails: (title) => title,
  moreCompact: (count) => `+${count}`,
  timeRange: (from, to) => `${from} - ${to}`,
}

const DEFAULT_VIEW_NAMES: EventCalendarI18nConfig["viewNames"] = {
  month: "Month",
  week: "Week",
  day: "Day",
  days: (count) => (count === 1 ? "1 day" : `${count} days`),
  agenda: "Agenda",
  resource: "Time Grid",
}

const DEFAULT_FORMATS: EventCalendarI18nConfig["formats"] = {
  monthTitle: "MMMM yyyy",
  weekTitle: undefined,
  dayTitle: "EEEE, MMMM d, yyyy",
  agendaTitle: undefined,
  monthDayHeader: "EEE",
  monthDayHeaderNarrow: "EEEEE",
  timeGridDayHeader: "EEE d",
  agendaDayHeader: "EEEE, MMMM d",
  agendaDayNumber: "d",
  agendaWeekday: "EEE",
  moreDayHeader: "EEEE, MMMM d",
  monthCellAriaLabel: "PPPP",
  dayAria: "PPPP",
  resourceTitle: undefined,
  timeGutter: "h a",
  timeGutterMinute: "h:mm a",
  eventTime: "h:mm a",
  monthCellDay: "d",
}

function makeDefaultFunctions(
  cfg: Pick<EventCalendarI18nConfig, "labels" | "formats">,
): EventCalendarI18nConfig["functions"] {
  return {
    formatTitle: (view, { date, activeRange, locale }) => {
      const opts = { locale }
      if (view === "month") {
        return format(date, cfg.formats.monthTitle, opts)
      }
      if (view === "resource") {
        return format(date, cfg.formats.resourceTitle ?? cfg.formats.dayTitle, opts)
      }
      if (view === "day") {
        return format(date, cfg.formats.dayTitle, opts)
      }
      if (view === "week" && cfg.formats.weekTitle) {
        return format(date, cfg.formats.weekTitle, opts)
      }
      if (view === "agenda" && cfg.formats.agendaTitle) {
        return format(date, cfg.formats.agendaTitle, opts)
      }
      const rangeEnd = subMilliseconds(activeRange.end, 1)
      const start = activeRange.start
      if (isSameMonth(start, rangeEnd)) {
        return `${format(start, "MMMM d", opts)} - ${format(rangeEnd, "d, yyyy", opts)}`
      }
      if (isSameYear(start, rangeEnd)) {
        return `${format(start, "MMM d", opts)} - ${format(rangeEnd, "MMM d, yyyy", opts)}`
      }
      return `${format(start, "MMM d, yyyy", opts)} - ${format(rangeEnd, "MMM d, yyyy", opts)}`
    },
    formatEventTime: (start, end, allDay, opts) => {
      if (allDay) return cfg.labels.allDay
      const fmt = cfg.formats.eventTime
      const lastInstant = end.getTime() - 1 >= start.getTime() ? subMilliseconds(end, 1) : start
      if (format(start, "yyyy-MM-dd") !== format(lastInstant, "yyyy-MM-dd")) {
        return `${format(start, `MMM d, ${fmt}`, opts)} - ${format(end, `MMM d, ${fmt}`, opts)}`
      }
      return `${format(start, fmt, opts)} - ${format(end, fmt, opts)}`
    },
    formatDayRange: (range, opts) => {
      const rangeEnd = subMilliseconds(range.end, 1)
      return `${format(range.start, "MMM d", opts)} - ${format(rangeEnd, "MMM d", opts)}`
    },
  }
}

const DEFAULT_EVENT_CALENDAR_I18N: EventCalendarI18nConfig = {
  labels: DEFAULT_LABELS,
  viewNames: DEFAULT_VIEW_NAMES,
  formats: DEFAULT_FORMATS,
  functions: makeDefaultFunctions({
    labels: DEFAULT_LABELS,
    formats: DEFAULT_FORMATS,
  }),
}

type EventCalendarI18nOverrides = {
  [K in keyof EventCalendarI18nConfig]?: Partial<EventCalendarI18nConfig[K]>
}

function mergeEventCalendarI18n(overrides?: EventCalendarI18nOverrides): EventCalendarI18nConfig {
  if (!overrides) return DEFAULT_EVENT_CALENDAR_I18N
  const labels = { ...DEFAULT_LABELS, ...overrides.labels }
  const viewNames = { ...DEFAULT_VIEW_NAMES, ...overrides.viewNames }
  const formats = { ...DEFAULT_FORMATS, ...overrides.formats }
  return {
    labels,
    viewNames,
    formats,
    functions: {
      ...makeDefaultFunctions({ labels, formats }),
      ...overrides.functions,
    },
  }
}

export { DEFAULT_EVENT_CALENDAR_I18N, mergeEventCalendarI18n }
export type { EventCalendarI18nConfig, EventCalendarI18nOverrides }
