"use client"

import * as React from "react"
import {
  SegmentedControl as SegmentedControlPrimitive,
  SegmentedControlIndicator as SegmentedControlIndicatorPrimitive,
  SegmentedControlItem as SegmentedControlItemPrimitive,
} from "@ui-sdk/react/segmented-control"
import { cn } from "cn"

import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function SegmentedControl({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof SegmentedControlPrimitive>, "className"> & { className?: string }
>) {
  return (
    <SegmentedControlPrimitive
      className={cn(
        "relative inline-flex h-8 w-fit items-center rounded-2xl bg-muted p-0.75 text-muted-foreground data-[orientation=vertical]:h-fit data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch",
        className,
      )}
      {...props}
    >
      <SegmentedControlIndicator />
      {children}
    </SegmentedControlPrimitive>
  )
}

function SegmentedControlIndicator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof SegmentedControlIndicatorPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <SegmentedControlIndicatorPrimitive
      className={cn(
        "absolute top-(--segmented-control-indicator-top) left-(--segmented-control-indicator-left) h-(--segmented-control-indicator-height) w-(--segmented-control-indicator-width) rounded-2xl bg-background shadow-sm transition-[left,top,width,height] duration-200 ease-out motion-reduce:transition-none dark:border dark:border-input dark:bg-input/30",
        className,
      )}
      {...props}
    />
  )
}

function SegmentedControlItem({
  className,
  ...props
}: Omit<React.ComponentProps<typeof SegmentedControlItemPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <SegmentedControlItemPrimitive
      className={cn(
        "relative z-10 inline-flex h-full flex-1 items-center justify-center gap-1.5 rounded-2xl px-2.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-colors outline-none hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/50 dark:text-muted-foreground data-checked:text-foreground dark:data-checked:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

export { SegmentedControl, SegmentedControlIndicator, SegmentedControlItem }
export { createSegmentedControlController } from "@ui-sdk/react/segmented-control"
