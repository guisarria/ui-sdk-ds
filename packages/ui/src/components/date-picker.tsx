"use client"

import * as React from "react"
import {
  CalendarDay,
  CalendarGrid,
  CalendarHeading,
  CalendarNext,
  CalendarPrevious,
  CalendarWeekday,
  CalendarWeekdays,
  CalendarWeeks,
  DatePicker as DatePickerPrimitive,
  DatePickerClear as DatePickerClearPrimitive,
  DatePickerContent as DatePickerContentPrimitive,
  DatePickerHint as DatePickerHintPrimitive,
  DatePickerInput as DatePickerInputPrimitive,
  DatePickerPreset as DatePickerPresetPrimitive,
  DatePickerTrigger as DatePickerTriggerPrimitive,
} from "@ui-sdk/react/date-picker"
import { cn } from "cn"
import { CalendarIcon, ChevronLeftIcon, ChevronRightIcon, XIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"
import {
  calendarDayClassName,
  calendarHeadingClassName,
  calendarWeekdayClassName,
  navButtonClassName,
} from "@ui-sdk-ds/ui/components/calendar"
import type { PrimitiveProps, WithNodeChildren, RenderProps } from "@ui-sdk-ds/ui/lib/parts"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"

const iconButtonClassName = cn(
  buttonVariants({ variant: "ghost", size: "icon-xs" }),
  "size-6 rounded-xl p-0",
)

function DatePicker({
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: WithNodeChildren<React.ComponentProps<typeof DatePickerPrimitive>>) {
  const named = children === undefined
  return (
    <DatePickerPrimitive
      aria-label={named ? undefined : ariaLabel}
      aria-labelledby={named ? undefined : ariaLabelledBy}
      {...props}
    >
      {children ?? (
        <>
          <DatePickerGroup>
            <DatePickerInput aria-label={ariaLabel} aria-labelledby={ariaLabelledBy} />
            <DatePickerTrigger />
          </DatePickerGroup>
          <DatePickerContent />
        </>
      )}
    </DatePickerPrimitive>
  )
}

function DatePickerGroup({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "date-picker-group",
        className: cn(
          "flex h-8 w-full min-w-0 items-center gap-1 rounded-2xl border border-transparent bg-input/50 ps-2.5 pe-1 transition-[color,box-shadow] duration-200 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 has-data-invalid:border-destructive has-data-invalid:ring-3 has-data-invalid:ring-destructive/20 has-data-disabled:opacity-50 dark:has-data-invalid:border-destructive/50 dark:has-data-invalid:ring-destructive/40",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function DatePickerInput({ className, ...props }: PrimitiveProps<typeof DatePickerInputPrimitive>) {
  return (
    <DatePickerInputPrimitive
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent py-1 text-base tabular-nums outline-none placeholder:text-muted-foreground disabled:pointer-events-none md:text-sm",
        className,
      )}
      {...props}
    />
  )
}

function DatePickerTrigger({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof DatePickerTriggerPrimitive>>) {
  return (
    <DatePickerTriggerPrimitive
      aria-label="Choose date"
      className={cn(iconButtonClassName, className)}
      {...props}
    >
      {children ?? <CalendarIcon aria-hidden="true" />}
    </DatePickerTriggerPrimitive>
  )
}

function DatePickerClear({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof DatePickerClearPrimitive>>) {
  return (
    <DatePickerClearPrimitive
      aria-label="Clear date"
      className={cn(iconButtonClassName, "data-empty:hidden", className)}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </DatePickerClearPrimitive>
  )
}

function DatePickerHint({ className, ...props }: PrimitiveProps<typeof DatePickerHintPrimitive>) {
  return (
    <DatePickerHintPrimitive
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function DatePickerPreset({
  className,
  ...props
}: PrimitiveProps<typeof DatePickerPresetPrimitive>) {
  return (
    <DatePickerPresetPrimitive
      className={cn(
        buttonVariants({ variant: "ghost", size: "sm" }),
        "justify-start data-selected:bg-muted",
        className,
      )}
      {...props}
    />
  )
}

function DatePickerCalendar() {
  return (
    <div className="relative [--cell-radius:var(--radius-2xl)] [--cell-size:--spacing(8)]">
      <div className="absolute inset-x-0 top-0 flex items-center justify-between gap-1">
        <CalendarPrevious className={cn(buttonVariants({ variant: "ghost" }), navButtonClassName)}>
          <ChevronLeftIcon aria-hidden="true" />
        </CalendarPrevious>
        <CalendarNext className={cn(buttonVariants({ variant: "ghost" }), navButtonClassName)}>
          <ChevronRightIcon aria-hidden="true" />
        </CalendarNext>
      </div>
      <CalendarHeading className={calendarHeadingClassName} />
      <CalendarGrid className="mt-4 w-full border-collapse">
        <CalendarWeekdays>
          {(index) => <CalendarWeekday index={index} className={calendarWeekdayClassName} />}
        </CalendarWeekdays>
        <CalendarWeeks>
          {(cell) =>
            cell.hidden ? (
              <td className="size-(--cell-size) p-0" />
            ) : (
              <CalendarDay value={cell.date} className={calendarDayClassName} />
            )
          }
        </CalendarWeeks>
      </CalendarGrid>
    </div>
  )
}

function DatePickerContent({
  className,
  children,
  sideOffset = 6,
  align = "start",
  ...props
}: WithNodeChildren<PrimitiveProps<typeof DatePickerContentPrimitive>>) {
  return (
    <DatePickerContentPrimitive
      sideOffset={sideOffset}
      align={align}
      className={cn(
        "max-h-(--available-height) origin-(--transform-origin) overflow-auto rounded-2xl bg-popover p-3 text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale] duration-100 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none dark:ring-foreground/10",
        className,
      )}
      {...props}
    >
      {children ?? <DatePickerCalendar />}
    </DatePickerContentPrimitive>
  )
}

export {
  DatePicker,
  DatePickerCalendar,
  DatePickerClear,
  DatePickerContent,
  DatePickerGroup,
  DatePickerHint,
  DatePickerInput,
  DatePickerPreset,
  DatePickerTrigger,
}
export { createDatePickerController } from "@ui-sdk/react/date-picker"
