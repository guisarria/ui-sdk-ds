"use client"

import * as React from "react"
import {
  Meter as MeterPrimitive,
  MeterIndicator as MeterIndicatorPrimitive,
  MeterLabel as MeterLabelPrimitive,
  MeterTrack as MeterTrackPrimitive,
  MeterValue as MeterValuePrimitive,
} from "@ui-sdk/react/meter"
import { cn } from "cn"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

function Meter({ className, children, ...props }: PrimitiveProps<typeof MeterPrimitive>) {
  return (
    <MeterPrimitive className={cn("flex w-full flex-wrap gap-x-3 gap-y-2", className)} {...props}>
      {children ?? (
        <MeterTrack>
          <MeterIndicator />
        </MeterTrack>
      )}
    </MeterPrimitive>
  )
}

function MeterTrack({ className, ...props }: PrimitiveProps<typeof MeterTrackPrimitive>) {
  return (
    <MeterTrackPrimitive
      className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    />
  )
}

function MeterIndicator({ className, ...props }: PrimitiveProps<typeof MeterIndicatorPrimitive>) {
  return (
    <MeterIndicatorPrimitive
      className={cn(
        "h-full rounded-full bg-primary transition-[width] duration-300 motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

function MeterLabel({ className, ...props }: PrimitiveProps<typeof MeterLabelPrimitive>) {
  return <MeterLabelPrimitive className={cn("text-sm font-medium", className)} {...props} />
}

function MeterValue({ className, ...props }: PrimitiveProps<typeof MeterValuePrimitive>) {
  return (
    <MeterValuePrimitive
      className={cn("ms-auto text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

export { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue }
