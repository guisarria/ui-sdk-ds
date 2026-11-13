"use client"

import * as React from "react"
import {
  Progress as ProgressPrimitive,
  ProgressIndicator as ProgressIndicatorPrimitive,
  ProgressLabel as ProgressLabelPrimitive,
  ProgressTrack as ProgressTrackPrimitive,
  ProgressValue as ProgressValuePrimitive,
} from "@ui-sdk/react/progress"
import { cn } from "cn"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function Progress({
  className,
  children,
  value,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof ProgressPrimitive>>) {
  return (
    <ProgressPrimitive value={value} className={cn("flex flex-wrap gap-3", className)} {...props}>
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive>
  )
}

function ProgressTrack({ className, ...props }: PrimitiveProps<typeof ProgressTrackPrimitive>) {
  return (
    <ProgressTrackPrimitive
      className={cn(
        "relative flex h-2 w-full items-center overflow-x-hidden rounded-2xl bg-muted",
        className,
      )}
      {...props}
    />
  )
}

function ProgressIndicator({
  className,
  ...props
}: PrimitiveProps<typeof ProgressIndicatorPrimitive>) {
  return (
    <ProgressIndicatorPrimitive
      className={cn("h-full bg-primary transition-all", className)}
      {...props}
    />
  )
}

function ProgressLabel({ className, ...props }: PrimitiveProps<typeof ProgressLabelPrimitive>) {
  return <ProgressLabelPrimitive className={cn("text-sm font-medium", className)} {...props} />
}

function ProgressValue({ className, ...props }: PrimitiveProps<typeof ProgressValuePrimitive>) {
  return (
    <ProgressValuePrimitive
      className={cn("ms-auto text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue }
