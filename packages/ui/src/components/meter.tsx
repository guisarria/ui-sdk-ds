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

function Meter({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof MeterPrimitive>, "className"> & { className?: string }) {
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

function MeterTrack({
  className,
  ...props
}: Omit<React.ComponentProps<typeof MeterTrackPrimitive>, "className"> & { className?: string }) {
  return (
    <MeterTrackPrimitive
      className={cn("relative h-1.5 w-full overflow-hidden rounded-full bg-muted", className)}
      {...props}
    />
  )
}

function MeterIndicator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof MeterIndicatorPrimitive>, "className"> & {
  className?: string
}) {
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

function MeterLabel({
  className,
  ...props
}: Omit<React.ComponentProps<typeof MeterLabelPrimitive>, "className"> & { className?: string }) {
  return <MeterLabelPrimitive className={cn("text-sm font-medium", className)} {...props} />
}

function MeterValue({
  className,
  ...props
}: Omit<React.ComponentProps<typeof MeterValuePrimitive>, "className"> & { className?: string }) {
  return (
    <MeterValuePrimitive
      className={cn("ms-auto text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

export { Meter, MeterIndicator, MeterLabel, MeterTrack, MeterValue }
