"use client"

import * as React from "react"
import {
  Waterfall as WaterfallPrimitive,
  WaterfallAxis as WaterfallAxisPrimitive,
  WaterfallBar as WaterfallBarPrimitive,
  WaterfallCell as WaterfallCellPrimitive,
  WaterfallColumnHeader as WaterfallColumnHeaderPrimitive,
  WaterfallHeaderRow as WaterfallHeaderRowPrimitive,
  WaterfallIndicator as WaterfallIndicatorPrimitive,
  WaterfallMark as WaterfallMarkPrimitive,
  WaterfallRow as WaterfallRowPrimitive,
  WaterfallRowHeader as WaterfallRowHeaderPrimitive,
  WaterfallTick as WaterfallTickPrimitive,
} from "@ui-sdk/react/waterfall"
import { cn } from "cn"
import { ChevronRightIcon } from "lucide-react"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function Waterfall({ className, ...props }: PrimitiveProps<typeof WaterfallPrimitive>) {
  return (
    <WaterfallPrimitive
      className={cn(
        "flex w-full flex-col overflow-hidden rounded-2xl border text-sm [--waterfall-header-width:--spacing(48)]",
        className,
      )}
      {...props}
    />
  )
}

function WaterfallHeaderRow({
  className,
  ...props
}: PrimitiveProps<typeof WaterfallHeaderRowPrimitive>) {
  return (
    <WaterfallHeaderRowPrimitive
      className={cn("flex border-b bg-muted/50 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function WaterfallColumnHeader({
  className,
  ...props
}: PrimitiveProps<typeof WaterfallColumnHeaderPrimitive>) {
  return (
    <WaterfallColumnHeaderPrimitive
      className={cn(
        "relative flex w-(--waterfall-header-width) shrink-0 items-center px-3 py-2 font-medium last:w-auto last:flex-1",
        className,
      )}
      {...props}
    />
  )
}

function WaterfallAxis({ className, ...props }: PrimitiveProps<typeof WaterfallAxisPrimitive>) {
  return <WaterfallAxisPrimitive className={cn("relative h-4 w-full", className)} {...props} />
}

function WaterfallTick({ className, ...props }: PrimitiveProps<typeof WaterfallTickPrimitive>) {
  return (
    <WaterfallTickPrimitive
      className={cn(
        "absolute inset-s-(--waterfall-tick) -translate-x-1/2 text-[0.7rem] whitespace-nowrap tabular-nums first:translate-x-0 last:-translate-x-full rtl:translate-x-1/2",
        className,
      )}
      {...props}
    />
  )
}

function WaterfallMark({ className, ...props }: PrimitiveProps<typeof WaterfallMarkPrimitive>) {
  return (
    <WaterfallMarkPrimitive
      className={cn(
        "pointer-events-none absolute inset-y-0 inset-s-(--waterfall-mark) w-px bg-primary/60",
        className,
      )}
      {...props}
    />
  )
}

function WaterfallRow({ className, ...props }: PrimitiveProps<typeof WaterfallRowPrimitive>) {
  return (
    <WaterfallRowPrimitive
      className={cn(
        "flex min-h-8 outline-none not-last:border-b hover:bg-muted/50 focus-visible:bg-muted focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset data-selected:bg-accent data-selected:text-accent-foreground",
        className,
      )}
      {...props}
    />
  )
}

function WaterfallRowHeader({
  className,
  ...props
}: PrimitiveProps<typeof WaterfallRowHeaderPrimitive>) {
  return (
    <WaterfallRowHeaderPrimitive
      className={cn(
        "flex w-(--waterfall-header-width) shrink-0 items-center gap-1 truncate py-1.5 ps-[calc((var(--waterfall-level,1)-1)*(--spacing(4))+(--spacing(3)))] pe-3 outline-none not-data-branch:ps-[calc((var(--waterfall-level,1)-1)*(--spacing(4))+(--spacing(8)))] focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset",
        className,
      )}
      {...props}
    />
  )
}

function WaterfallIndicator({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof WaterfallIndicatorPrimitive>>) {
  return (
    <WaterfallIndicatorPrimitive
      className={cn(
        "flex size-4 shrink-0 items-center justify-center text-muted-foreground transition-transform duration-150 data-expanded:rotate-90 motion-reduce:transition-none rtl:-scale-x-100 [&_svg]:size-4",
        className,
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon aria-hidden="true" />}
    </WaterfallIndicatorPrimitive>
  )
}

function WaterfallCell({ className, ...props }: PrimitiveProps<typeof WaterfallCellPrimitive>) {
  return (
    <WaterfallCellPrimitive
      className={cn(
        "flex w-20 shrink-0 items-center px-3 text-muted-foreground tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset",
        className,
      )}
      {...props}
    />
  )
}

function WaterfallBar({ className, ...props }: PrimitiveProps<typeof WaterfallBarPrimitive>) {
  return (
    <WaterfallBarPrimitive
      className={cn(
        "relative min-w-0 flex-1 outline-none before:absolute before:inset-y-2 before:inset-s-(--waterfall-start) before:w-(--waterfall-size) before:min-w-px before:rounded-sm before:bg-primary/70 focus-visible:ring-2 focus-visible:ring-ring/50 focus-visible:ring-inset",
        className,
      )}
      {...props}
    />
  )
}

export {
  Waterfall,
  WaterfallAxis,
  WaterfallBar,
  WaterfallCell,
  WaterfallColumnHeader,
  WaterfallHeaderRow,
  WaterfallIndicator,
  WaterfallMark,
  WaterfallRow,
  WaterfallRowHeader,
  WaterfallTick,
}
export type { WaterfallData } from "@ui-sdk/react/waterfall"
export { createWaterfallController, visibleWaterfallRows } from "@ui-sdk/react/waterfall"
