"use client"

import * as React from "react"
import {
  TimeInput as TimeInputPrimitive,
  TimeInputSegment as TimeInputSegmentPrimitive,
} from "@ui-sdk/react/time-input"
import { cn } from "cn"

import { segmentClassName, segmentFieldClassName } from "@ui-sdk-ds/ui/components/date-input"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

function TimeInputSegment({
  className,
  ...props
}: PrimitiveProps<typeof TimeInputSegmentPrimitive>) {
  const id = React.useId()
  return (
    <TimeInputSegmentPrimitive id={id} className={cn(segmentClassName, className)} {...props} />
  )
}

function TimeInput({ className, children, ...props }: PrimitiveProps<typeof TimeInputPrimitive>) {
  return (
    <TimeInputPrimitive className={cn(segmentFieldClassName, className)} {...props}>
      {children ??
        (({ segments }) =>
          segments.map((segment) => <TimeInputSegment key={segment.key} segment={segment} />))}
    </TimeInputPrimitive>
  )
}

export { TimeInput, TimeInputSegment }
export { createTimeInputController } from "@ui-sdk/react/time-input"
