import type {
  CalendarEvent,
  EventCalendarDateRange,
  EventCalendarOccurrence,
  EventCalendarRecurrenceRule,
  EventCalendarWeekday,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-types"
import { TZDate } from "@date-fns/tz"
import { addDays, addMonths, addWeeks, addYears } from "date-fns"

const MAX_OCCURRENCES = 1000

const MAX_ITERATIONS = 10000

function hasItems(list: ReadonlyArray<unknown> | undefined): boolean {
  return (list?.length ?? 0) > 0
}

const PERIOD_MS = {
  daily: 86400000,
  weekly: 604800000,
  monthly: 2629746000,
  yearly: 31556952000,
} satisfies Record<EventCalendarRecurrenceRule["freq"], number>

const WEEKDAYS: Array<EventCalendarWeekday> = ["SU", "MO", "TU", "WE", "TH", "FR", "SA"]

class EventCalendarRecurrenceError extends Error {
  constructor(part: string) {
    super(
      `Unsupported recurrence part: ${part}. Use the getOccurrences prop to plug a full RRULE engine for exotic rules.`,
    )
    this.name = "EventCalendarRecurrenceError"
  }
}

function parseRRuleString(input: string, timeZone?: string): EventCalendarRecurrenceRule {
  const body = input.trim().replace(/^RRULE:/i, "")
  const rule: Partial<EventCalendarRecurrenceRule> = {}

  for (const pair of body.split(";")) {
    if (!pair) continue
    const [rawKey, rawValue] = pair.split("=")
    const key = rawKey?.toUpperCase()
    const value = rawValue ?? ""

    switch (key) {
      case "FREQ": {
        const freq = value.toLowerCase()
        if (freq !== "daily" && freq !== "weekly" && freq !== "monthly" && freq !== "yearly") {
          throw new EventCalendarRecurrenceError(`FREQ=${value}`)
        }
        rule.freq = freq
        break
      }
      case "INTERVAL":
        rule.interval = Math.max(1, Number.parseInt(value, 10) || 1)
        break
      case "COUNT":
        rule.count = Math.max(1, Number.parseInt(value, 10) || 1)
        break
      case "UNTIL":
        rule.until = parseRRuleDate(value, timeZone)
        break
      case "BYDAY":
        rule.byWeekday = value.split(",").map((token) => {
          const match = /^(-?\d+)?(SU|MO|TU|WE|TH|FR|SA)$/.exec(token.trim().toUpperCase())
          if (!match) throw new EventCalendarRecurrenceError(`BYDAY=${token}`)
          const day = match[2] as EventCalendarWeekday
          return match[1] ? { day, ordinal: Number.parseInt(match[1], 10) } : day
        })
        break
      case "BYMONTHDAY":
        rule.byMonthDay = value.split(",").map((v) => {
          const day = Number.parseInt(v, 10)
          if (Number.isNaN(day)) {
            throw new EventCalendarRecurrenceError(`BYMONTHDAY=${v}`)
          }
          return day
        })
        break
      case "BYMONTH":
        rule.byMonth = value.split(",").map((v) => Number.parseInt(v, 10))
        break
      case "WKST": {
        const day = value.trim().toUpperCase() as EventCalendarWeekday
        if (!WEEKDAYS.includes(day)) {
          throw new EventCalendarRecurrenceError(`WKST=${value}`)
        }
        rule.weekStart = day
        break
      }
      default:
        throw new EventCalendarRecurrenceError(key ?? pair)
    }
  }

  if (!rule.freq) throw new EventCalendarRecurrenceError("missing FREQ")
  return rule as EventCalendarRecurrenceRule
}

function parseRRuleDate(value: string, timeZone?: string): Date {
  const match = /^(\d{4})(\d{2})(\d{2})(?:T(\d{2})(\d{2})(\d{2})(Z)?)?$/.exec(
    value.trim().toUpperCase(),
  )
  if (!match) throw new EventCalendarRecurrenceError(`UNTIL=${value}`)
  const [, y = "", m = "", d = "", hh = "23", mm = "59", ss = "59", z] = match
  const date = z
    ? new Date(`${y}-${m}-${d}T${hh}:${mm}:${ss}Z`)
    : timeZone
      ? new Date(new TZDate(+y, +m - 1, +d, +hh, +mm, +ss, timeZone).getTime())
      : new Date(`${y}-${m}-${d}T${hh}:${mm}:${ss}`)
  if (Number.isNaN(date.getTime())) {
    throw new EventCalendarRecurrenceError(`UNTIL=${value}`)
  }
  return date
}

function formatRRuleString(rule: EventCalendarRecurrenceRule): string {
  const parts: Array<string> = [`FREQ=${rule.freq.toUpperCase()}`]
  if (rule.interval && rule.interval > 1) parts.push(`INTERVAL=${rule.interval}`)
  if (rule.count) parts.push(`COUNT=${rule.count}`)
  if (rule.until) {
    const u = rule.until
    const pad = (n: number) => String(n).padStart(2, "0")
    parts.push(
      `UNTIL=${u.getUTCFullYear()}${pad(u.getUTCMonth() + 1)}${pad(u.getUTCDate())}T${pad(u.getUTCHours())}${pad(u.getUTCMinutes())}${pad(u.getUTCSeconds())}Z`,
    )
  }
  if (rule.byWeekday?.length) {
    parts.push(
      `BYDAY=${rule.byWeekday
        .map((d) => (typeof d === "string" ? d : `${d.ordinal}${d.day}`))
        .join(",")}`,
    )
  }
  if (rule.byMonthDay?.length) parts.push(`BYMONTHDAY=${rule.byMonthDay.join(",")}`)
  if (rule.byMonth?.length) parts.push(`BYMONTH=${rule.byMonth.join(",")}`)
  if (rule.weekStart) parts.push(`WKST=${rule.weekStart}`)
  return parts.join(";")
}

function resolveRule(
  recurrence: EventCalendarRecurrenceRule | string,
  timeZone?: string,
): EventCalendarRecurrenceRule {
  return typeof recurrence === "string" ? parseRRuleString(recurrence, timeZone) : recurrence
}

function expandRecurrence<TData>(
  event: CalendarEvent<TData>,
  range: EventCalendarDateRange,
  ctx: { timeZone: string },
): Array<EventCalendarOccurrence<TData>> {
  const allDay = event.allDay ?? false

  if (!event.recurrence) {
    const isPoint = event.end.getTime() === event.start.getTime()
    if (
      event.start < range.end &&
      (event.end > range.start || (isPoint && event.start >= range.start))
    ) {
      return [
        {
          key: `${event.id}::${event.start.toISOString()}`,
          eventId: event.id,
          event,
          start: event.start,
          end: event.end,
          allDay,
          isRecurring: false,
        },
      ]
    }
    return []
  }

  const rule = resolveRule(event.recurrence, ctx.timeZone)
  const interval = Math.max(1, rule.interval ?? 1)
  const durationMs = event.end.getTime() - event.start.getTime()
  const zonedStart = new TZDate(event.start.getTime(), ctx.timeZone)
  const daySpan = Math.round(durationMs / 86400000)
  const wallDaySpan =
    daySpan > 0 && addDays(zonedStart, daySpan).getTime() === event.end.getTime() ? daySpan : null
  const endFor = (start: Date): Date =>
    wallDaySpan === null
      ? new Date(start.getTime() + durationMs)
      : new Date(addDays(new TZDate(start.getTime(), ctx.timeZone), wallDaySpan).getTime())
  const exTimes = new Set((rule.exDates ?? []).map((d) => d.getTime()))

  const weeklyDays: Array<number> | null =
    rule.freq === "weekly" && rule.byWeekday?.length
      ? [
          ...new Set(
            rule.byWeekday.map((d) => {
              if (typeof d !== "string") {
                throw new EventCalendarRecurrenceError("BYDAY ordinal outside monthly/yearly")
              }
              return WEEKDAYS.indexOf(d)
            }),
          ),
        ]
      : null

  const monthlyByDay =
    (rule.freq === "monthly" || rule.freq === "yearly") && rule.byWeekday?.length
      ? rule.byWeekday
      : null

  const weekStartIndex = WEEKDAYS.indexOf(rule.weekStart ?? "MO")
  const fromWeekStart = (day: number) => (day - weekStartIndex + 7) % 7

  const validByMonth = rule.byMonth?.filter((m) => m >= 1 && m <= 12) ?? []
  const yearlyMonths: Array<number> =
    validByMonth.length > 0
      ? [...new Set(validByMonth)].sort((a, b) => a - b)
      : [zonedStart.getMonth() + 1]

  const hasMonthDayParts =
    (rule.freq === "monthly" && (hasItems(rule.byMonthDay) || Boolean(monthlyByDay))) ||
    (rule.freq === "yearly" &&
      (hasItems(rule.byMonth) || hasItems(rule.byMonthDay) || Boolean(monthlyByDay)))

  const daysInMonth = (year: number, month: number) => new Date(year, month + 1, 0).getDate()

  const limitByMonth = rule.freq !== "yearly" && validByMonth.length > 0 ? validByMonth : null
  const limitByMonthDay = rule.freq === "daily" && rule.byMonthDay?.length ? rule.byMonthDay : null
  const limitByWeekday =
    rule.freq === "daily" && rule.byWeekday?.length
      ? rule.byWeekday.map((d) => WEEKDAYS.indexOf(typeof d === "string" ? d : d.day))
      : null
  const hasLimits = Boolean(limitByMonth ?? limitByMonthDay ?? limitByWeekday)

  const passesLimits = (candidate: TZDate): boolean => {
    if (limitByMonth && !limitByMonth.includes(candidate.getMonth() + 1)) {
      return false
    }
    if (limitByWeekday && !limitByWeekday.includes(candidate.getDay())) {
      return false
    }
    if (limitByMonthDay) {
      const total = daysInMonth(candidate.getFullYear(), candidate.getMonth())
      const day = candidate.getDate()
      if (!limitByMonthDay.some((n) => (n < 0 ? total + 1 + n : n) === day)) {
        return false
      }
    }
    return true
  }

  const zonedDate = (year: number, month: number, day: number) =>
    new TZDate(
      year,
      month,
      day,
      zonedStart.getHours(),
      zonedStart.getMinutes(),
      zonedStart.getSeconds(),
      zonedStart.getMilliseconds(),
      ctx.timeZone,
    )

  const monthDays = (year: number, month: number): Array<number> => {
    const total = daysInMonth(year, month)
    let days: Array<number> | null = null
    if (rule.byMonthDay?.length) {
      days = rule.byMonthDay
        .map((n) => (n < 0 ? total + 1 + n : n))
        .filter((n) => n >= 1 && n <= total)
    }
    if (monthlyByDay) {
      const byDayMatches: Array<number> = []
      for (const entry of monthlyByDay) {
        const day = typeof entry === "string" ? entry : entry.day
        const ordinal = typeof entry === "string" ? 0 : entry.ordinal
        const weekday = WEEKDAYS.indexOf(day)
        const matches: Array<number> = []
        for (let d = 1; d <= total; d++) {
          if (new Date(year, month, d).getDay() === weekday) matches.push(d)
        }
        if (ordinal === 0) {
          byDayMatches.push(...matches)
        } else {
          const pick = ordinal > 0 ? matches[ordinal - 1] : matches[matches.length + ordinal]
          if (pick !== undefined) byDayMatches.push(pick)
        }
      }
      days = days ? days.filter((n) => byDayMatches.includes(n)) : byDayMatches
    }
    days ??= [Math.min(zonedStart.getDate(), total)]
    return [...new Set(days)].sort((a, b) => a - b)
  }

  const periodCandidates = (period: number): Array<TZDate> => {
    if (rule.freq === "daily") return [addDays(zonedStart, period * interval)]
    if (rule.freq === "weekly") {
      const base = addWeeks(zonedStart, period * interval)
      if (!weeklyDays) return [base]
      const week: Array<TZDate> = []
      const baseOffset = fromWeekStart(base.getDay())
      for (let offset = 0; offset < 7; offset++) {
        const candidate = addDays(base, offset - baseOffset)
        if (!weeklyDays.includes(candidate.getDay())) continue
        if (candidate.getTime() < zonedStart.getTime()) continue
        week.push(candidate)
      }
      return week
    }
    if (rule.freq === "monthly") {
      const anchor = addMonths(zonedStart, period * interval)
      const year = anchor.getFullYear()
      const month = anchor.getMonth()
      return monthDays(year, month)
        .map((day) => zonedDate(year, month, day))
        .filter((c) => c.getTime() >= zonedStart.getTime())
    }
    const year = addYears(zonedStart, period * interval).getFullYear()
    const dates: Array<TZDate> = []
    for (const month of yearlyMonths) {
      for (const day of monthDays(year, month - 1)) {
        dates.push(zonedDate(year, month - 1, day))
      }
    }
    return dates.filter((c) => c.getTime() >= zonedStart.getTime())
  }

  const candidatesFor = (period: number): Array<TZDate> =>
    hasLimits ? periodCandidates(period).filter(passesLimits) : periodCandidates(period)

  const periodEdge = (period: number, edge: "first" | "last"): TZDate => {
    if (rule.freq === "daily") return addDays(zonedStart, period * interval)
    if (rule.freq === "weekly") {
      const base = addWeeks(zonedStart, period * interval)
      if (!weeklyDays) return base
      return addDays(base, (edge === "first" ? 0 : 6) - fromWeekStart(base.getDay()))
    }
    if (rule.freq === "monthly") {
      const anchor = addMonths(zonedStart, period * interval)
      const year = anchor.getFullYear()
      const month = anchor.getMonth()
      return zonedDate(year, month, edge === "first" ? 1 : daysInMonth(year, month))
    }
    const year = addYears(zonedStart, period * interval).getFullYear()
    const month = (edge === "first" ? yearlyMonths[0] : yearlyMonths.at(-1))! - 1
    return zonedDate(year, month, edge === "first" ? 1 : daysInMonth(year, month))
  }

  const aheadMs = range.start.getTime() - durationMs - zonedStart.getTime()
  const stepMs = PERIOD_MS[rule.freq] * interval
  let startPeriod = aheadMs > 0 ? Math.max(0, Math.floor(aheadMs / stepMs) - 2) : 0
  while (periodEdge(startPeriod, "last").getTime() + durationMs <= range.start.getTime()) {
    startPeriod++
  }

  let index = 0
  if (startPeriod > 0) {
    if (hasMonthDayParts || hasLimits) {
      for (let period = 0; period < startPeriod; period++) {
        index += candidatesFor(period).length
      }
    } else if (weeklyDays) {
      const anchorOffset = fromWeekStart(zonedStart.getDay())
      const firstWeek = weeklyDays.filter((d) => fromWeekStart(d) >= anchorOffset).length
      index = firstWeek + (startPeriod - 1) * weeklyDays.length
    } else {
      index = startPeriod
    }
  }

  const occurrences: Array<EventCalendarOccurrence<TData>> = []

  const pushIfVisible = (rawStart: Date) => {
    const start = new Date(rawStart.getTime())
    if (exTimes.has(start.getTime())) return
    const end = endFor(start)
    if (start < range.end && end > range.start) {
      occurrences.push({
        key: `${event.id}::${start.toISOString()}`,
        eventId: event.id,
        event,
        start,
        end,
        allDay,
        isRecurring: true,
        recurrenceIndex: index,
      })
    }
  }

  let iterations = 0
  let period = startPeriod
  while (iterations < MAX_ITERATIONS && occurrences.length < MAX_OCCURRENCES) {
    iterations++
    if (rule.count !== undefined && index >= rule.count) break
    const earliest = periodEdge(period, "first")
    if (earliest.getTime() >= range.end.getTime()) break
    if (rule.until && earliest.getTime() > rule.until.getTime()) break

    let ended = false
    for (const candidate of candidatesFor(period)) {
      if (rule.count !== undefined && index >= rule.count) {
        ended = true
        break
      }
      if (rule.until && candidate.getTime() > rule.until.getTime()) {
        ended = true
        break
      }
      pushIfVisible(candidate)
      index++
      if (occurrences.length >= MAX_OCCURRENCES) {
        ended = true
        break
      }
    }
    if (ended) break
    period++
  }

  if (rule.rDates?.length) {
    const seen = new Set(occurrences.map((o) => o.start.getTime()))
    for (const rDate of rule.rDates) {
      const start = new Date(rDate.getTime())
      if (seen.has(start.getTime()) || exTimes.has(start.getTime())) continue
      const end = endFor(start)
      if (start >= range.end || end <= range.start) continue
      seen.add(start.getTime())
      occurrences.push({
        key: `${event.id}::${start.toISOString()}`,
        eventId: event.id,
        event,
        start,
        end,
        allDay,
        isRecurring: true,
        recurrenceIndex: index++,
      })
    }
    occurrences.sort((a, b) => a.start.getTime() - b.start.getTime())
  }

  return occurrences
}

export {
  EventCalendarRecurrenceError,
  expandRecurrence,
  formatRRuleString,
  MAX_OCCURRENCES,
  parseRRuleString,
}
