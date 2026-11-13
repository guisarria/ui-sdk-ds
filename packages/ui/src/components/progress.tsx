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

import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function Progress({
  className,
  children,
  value,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof ProgressPrimitive>, "className"> & { className?: string }
>) {
  return (
    <ProgressPrimitive value={value} className={cn("flex flex-wrap gap-3", className)} {...props}>
      {children}
      <ProgressTrack>
        <ProgressIndicator />
      </ProgressTrack>
    </ProgressPrimitive>
  )
}

function ProgressTrack({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ProgressTrackPrimitive>, "className"> & {
  className?: string
}) {
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
}: Omit<React.ComponentProps<typeof ProgressIndicatorPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ProgressIndicatorPrimitive
      className={cn("h-full bg-primary transition-all", className)}
      {...props}
    />
  )
}

function ProgressLabel({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ProgressLabelPrimitive>, "className"> & {
  className?: string
}) {
  return <ProgressLabelPrimitive className={cn("text-sm font-medium", className)} {...props} />
}

function ProgressValue({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ProgressValuePrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ProgressValuePrimitive
      className={cn("ml-auto text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

export { Progress, ProgressTrack, ProgressIndicator, ProgressLabel, ProgressValue }
