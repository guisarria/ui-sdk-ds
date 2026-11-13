"use client"

import * as React from "react"
import {
  TimeInput as TimeInputPrimitive,
  TimeInputSegment as TimeInputSegmentPrimitive,
} from "@ui-sdk/react/time-input"
import { cn } from "cn"

import { segmentClassName, segmentFieldClassName } from "@ui-sdk-ds/ui/components/date-input"

function TimeInputSegment({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TimeInputSegmentPrimitive>, "className"> & {
  className?: string
}) {
  const id = React.useId()
  return (
    <TimeInputSegmentPrimitive id={id} className={cn(segmentClassName, className)} {...props} />
  )
}

function TimeInput({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof TimeInputPrimitive>, "className"> & { className?: string }) {
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
