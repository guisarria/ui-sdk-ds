"use client"

import * as React from "react"
import {
  Calendar as CalendarPrimitive,
  CalendarDay as CalendarDayPrimitive,
  CalendarGrid as CalendarGridPrimitive,
  CalendarHeading as CalendarHeadingPrimitive,
  CalendarNext as CalendarNextPrimitive,
  CalendarPrevious as CalendarPreviousPrimitive,
  CalendarWeekday as CalendarWeekdayPrimitive,
  CalendarWeekdays as CalendarWeekdaysPrimitive,
  CalendarWeeks as CalendarWeeksPrimitive,
} from "@ui-sdk/react/calendar"
import { cn } from "cn"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"

type DateRange = { from: Date | undefined; to?: Date | undefined }

type SharedProps = Omit<
  React.ComponentProps<typeof CalendarPrimitive>,
  | "mode"
  | "value"
  | "defaultValue"
  | "onValueChange"
  | "month"
  | "defaultMonth"
  | "locale"
  | "months"
  | "children"
  | "onSelect"
> & {
  defaultMonth?: Date
  month?: Date
  onMonthChange?: (month: Date) => void
  numberOfMonths?: number
  locale?: string | { code?: string }
  onDayClick?: (date: Date) => void
  buttonVariant?: Parameters<typeof buttonVariants>[0] extends infer V
    ? V extends { variant?: infer T }
      ? T
      : never
    : never
}

type CalendarProps =
  | (SharedProps & {
      mode?: "single"
      selected?: Date | undefined
      onSelect?: (date: Date | undefined) => void
    })
  | (SharedProps & {
      mode: "multiple"
      selected?: Array<Date> | undefined
      onSelect?: (dates: Array<Date> | undefined) => void
    })
  | (SharedProps & {
      mode: "range"
      selected?: DateRange | undefined
      onSelect?: (range: DateRange | undefined) => void
    })

const pad = (value: number) => String(value).padStart(2, "0")

function toISODate(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`
}

function toISOMonth(date: Date) {
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}`
}

function fromISO(value: string) {
  const [year, month, day = 1] = value.split("-").map(Number)
  return new Date(year!, month! - 1, day)
}

function toValue(props: CalendarProps) {
  if (!("selected" in props)) {
    return undefined
  }
  if (props.mode === "range") {
    const { from, to } = props.selected ?? {}
    return from ? [toISODate(from), toISODate(to ?? from)] : null
  }
  if (props.mode === "multiple") {
    return props.selected?.map(toISODate) ?? []
  }
  return props.selected ? toISODate(props.selected) : null
}

const calendarHeadingClassName =
  "flex h-(--cell-size) w-full items-center justify-center px-(--cell-size) text-sm font-medium select-none"

const calendarWeekdayClassName =
  "w-(--cell-size) pb-2 text-[0.8rem] font-normal text-muted-foreground select-none"

const calendarDayClassName =
  "relative size-(--cell-size) cursor-default rounded-(--cell-radius) p-0 text-center text-sm outline-none select-none hover:bg-muted focus-visible:z-10 focus-visible:ring-[3px] focus-visible:ring-ring/50 data-outside:text-muted-foreground data-preview:bg-muted data-range-end:rounded-s-none data-range-middle:rounded-none data-range-middle:bg-muted data-range-middle:text-foreground data-range-start:rounded-e-none data-range-start:data-range-end:rounded-(--cell-radius) data-today:bg-muted data-today:text-foreground data-unavailable:line-through data-selected:bg-primary data-selected:text-primary-foreground data-disabled:pointer-events-none data-disabled:text-muted-foreground data-disabled:opacity-50"

const navButtonClassName =
  "size-(--cell-size) p-0 select-none data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:size-4 rtl:[&_svg]:rotate-180"

function Calendar(props: CalendarProps) {
  const {
    className,
    mode = "single",
    selected: _selected,
    onSelect,
    defaultMonth,
    month,
    onMonthChange,
    numberOfMonths = 1,
    locale,
    onDayClick,
    buttonVariant = "ghost",
    showOutsideDays = true,
    ...rest
  } = props

  const value = toValue(props)
  const grids = Array.from({ length: numberOfMonths }, (_, offset) => offset)

  return (
    <CalendarPrimitive
      mode={mode}
      value={value}
      onValueChange={(next) => {
        if (mode === "range") {
          const [from, to] = (next as Array<string> | null) ?? []
          ;(onSelect as (range: DateRange | undefined) => void)?.(
            from ? { from: fromISO(from), to: to ? fromISO(to) : undefined } : undefined,
          )
        } else if (mode === "multiple") {
          ;(onSelect as (dates: Array<Date> | undefined) => void)?.(
            ((next as Array<string> | null) ?? []).map(fromISO),
          )
        } else {
          ;(onSelect as (date: Date | undefined) => void)?.(
            next ? fromISO(next as string) : undefined,
          )
        }
      }}
      defaultMonth={defaultMonth ? toISOMonth(defaultMonth) : undefined}
      month={month ? toISOMonth(month) : undefined}
      onMonthChange={onMonthChange ? (next) => onMonthChange(fromISO(next)) : undefined}
      months={numberOfMonths}
      locale={typeof locale === "string" ? locale : locale?.code}
      showOutsideDays={showOutsideDays}
      className={cn(
        "group/calendar relative w-fit bg-background p-3 [--cell-radius:var(--radius-2xl)] [--cell-size:--spacing(8)] in-data-[slot=card-content]:bg-transparent in-data-[slot=popover-content]:bg-transparent",
        typeof className === "string" ? className : undefined,
      )}
      {...rest}
    >
      <div className="absolute inset-x-3 top-3 flex items-center justify-between gap-1">
        <CalendarPreviousPrimitive
          className={cn(buttonVariants({ variant: buttonVariant }), navButtonClassName)}
        >
          <ChevronLeftIcon aria-hidden="true" />
        </CalendarPreviousPrimitive>
        <CalendarNextPrimitive
          className={cn(buttonVariants({ variant: buttonVariant }), navButtonClassName)}
        >
          <ChevronRightIcon aria-hidden="true" />
        </CalendarNextPrimitive>
      </div>
      <CalendarHeadingPrimitive className={calendarHeadingClassName} />
      <div className="mt-4 flex flex-col gap-4 md:flex-row">
        {grids.map((offset) => (
          <CalendarGridPrimitive key={offset} offset={offset} className="w-full border-collapse">
            <CalendarWeekdaysPrimitive>
              {(index) => (
                <CalendarWeekdayPrimitive index={index} className={calendarWeekdayClassName} />
              )}
            </CalendarWeekdaysPrimitive>
            <CalendarWeeksPrimitive>
              {(cell) =>
                cell.hidden ? (
                  <td className="size-(--cell-size) p-0" />
                ) : (
                  <CalendarDayPrimitive
                    value={cell.date}
                    onClick={onDayClick ? () => onDayClick(fromISO(cell.date)) : undefined}
                    className={calendarDayClassName}
                  />
                )
              }
            </CalendarWeeksPrimitive>
          </CalendarGridPrimitive>
        ))}
      </div>
    </CalendarPrimitive>
  )
}

export {
  Calendar,
  calendarDayClassName,
  calendarHeadingClassName,
  calendarWeekdayClassName,
  navButtonClassName,
}
export type { CalendarProps, DateRange }
export { createCalendarController } from "@ui-sdk/react/calendar"
