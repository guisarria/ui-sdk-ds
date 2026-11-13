"use client"

import * as React from "react"
import {
  DateInput as DateInputPrimitive,
  DateInputSegment as DateInputSegmentPrimitive,
} from "@ui-sdk/react/date-input"
import { cn } from "cn"

const segmentFieldClassName =
  "flex h-8 w-full min-w-0 items-center rounded-2xl border border-transparent bg-input/50 px-2.5 py-1 text-base tabular-nums transition-[color,box-shadow] duration-200 outline-none focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 data-disabled:pointer-events-none data-disabled:opacity-50 data-invalid:border-destructive data-invalid:ring-3 data-invalid:ring-destructive/20 md:text-sm dark:data-invalid:border-destructive/50 dark:data-invalid:ring-destructive/40"

const segmentClassName =
  "rounded-md bg-transparent px-0.5 text-center caret-transparent outline-none field-sizing-content focus:bg-accent focus:text-accent-foreground data-empty:text-muted-foreground data-[type=literal]:px-0 data-[type=literal]:text-muted-foreground"

function DateInputSegment({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DateInputSegmentPrimitive>, "className"> & {
  className?: string
}) {
  const id = React.useId()
  return (
    <DateInputSegmentPrimitive id={id} className={cn(segmentClassName, className)} {...props} />
  )
}

function DateInput({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DateInputPrimitive>, "className"> & { className?: string }) {
  return (
    <DateInputPrimitive className={cn(segmentFieldClassName, className)} {...props}>
      {children ??
        (({ segments }) =>
          segments.map((segment) => <DateInputSegment key={segment.key} segment={segment} />))}
    </DateInputPrimitive>
  )
}

export { DateInput, DateInputSegment, segmentClassName, segmentFieldClassName }
export { createDateInputController } from "@ui-sdk/react/date-input"
