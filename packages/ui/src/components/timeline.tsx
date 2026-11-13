"use client"

import * as React from "react"
import {
  Timeline as TimelinePrimitive,
  TimelineConnector as TimelineConnectorPrimitive,
  TimelineDescription as TimelineDescriptionPrimitive,
  TimelineItem as TimelineItemPrimitive,
  TimelineMarker as TimelineMarkerPrimitive,
  TimelineTime as TimelineTimePrimitive,
  TimelineTitle as TimelineTitlePrimitive,
} from "@ui-sdk/react/timeline"
import { cn } from "cn"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

function Timeline({ className, ...props }: PrimitiveProps<typeof TimelinePrimitive>) {
  return (
    <TimelinePrimitive
      className={cn(
        "flex flex-col data-[orientation=horizontal]:grid data-[orientation=horizontal]:grid-cols-[repeat(var(--timeline-count),minmax(0,1fr))]",
        className,
      )}
      {...props}
    />
  )
}

function TimelineItem({ className, ...props }: PrimitiveProps<typeof TimelineItemPrimitive>) {
  return (
    <TimelineItemPrimitive
      className={cn(
        "group/timeline-item relative grid grid-cols-[--spacing(3)_1fr] gap-x-3 gap-y-0.5 rounded-xl pb-6 outline-none last:pb-0 focus-visible:ring-3 focus-visible:ring-ring/30 data-last:pb-0 data-[orientation=horizontal]:grid-cols-1 data-[orientation=horizontal]:grid-rows-[--spacing(3)] data-[orientation=horizontal]:pe-4 data-[orientation=horizontal]:pb-0",
        className,
      )}
      {...props}
    />
  )
}

function TimelineMarker({ className, ...props }: PrimitiveProps<typeof TimelineMarkerPrimitive>) {
  return (
    <TimelineMarkerPrimitive
      className={cn(
        "relative z-10 col-start-1 row-start-1 mt-1 flex size-3 items-center justify-center rounded-full border-2 border-muted-foreground/40 bg-background data-complete:border-primary data-complete:bg-primary data-current:border-primary data-[orientation=horizontal]:mt-0 [&_svg]:size-2",
        className,
      )}
      {...props}
    />
  )
}

function TimelineConnector({
  className,
  ...props
}: PrimitiveProps<typeof TimelineConnectorPrimitive>) {
  return (
    <TimelineConnectorPrimitive
      className={cn(
        "absolute inset-s-[calc(--spacing(1.5)-0.5px)] top-5 bottom-1 w-px bg-border group-last/timeline-item:hidden group-data-last/timeline-item:hidden data-complete:bg-primary data-[orientation=horizontal]:inset-s-5 data-[orientation=horizontal]:inset-e-1 data-[orientation=horizontal]:top-1.5 data-[orientation=horizontal]:bottom-auto data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-auto",
        className,
      )}
      {...props}
    />
  )
}

function TimelineTitle({ className, ...props }: PrimitiveProps<typeof TimelineTitlePrimitive>) {
  return (
    <TimelineTitlePrimitive
      className={cn(
        "col-start-2 text-sm font-medium group-data-[orientation=horizontal]/timeline-item:col-start-1 group-data-[orientation=horizontal]/timeline-item:mt-2",
        className,
      )}
      {...props}
    />
  )
}

function TimelineTime({ className, ...props }: PrimitiveProps<typeof TimelineTimePrimitive>) {
  return (
    <TimelineTimePrimitive
      className={cn(
        "col-start-2 text-xs text-muted-foreground tabular-nums group-data-[orientation=horizontal]/timeline-item:col-start-1",
        className,
      )}
      {...props}
    />
  )
}

function TimelineDescription({
  className,
  ...props
}: PrimitiveProps<typeof TimelineDescriptionPrimitive>) {
  return (
    <TimelineDescriptionPrimitive
      className={cn(
        "col-start-2 text-sm text-muted-foreground group-data-[orientation=horizontal]/timeline-item:col-start-1",
        className,
      )}
      {...props}
    />
  )
}

export {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
}
export { createTimelineController } from "@ui-sdk/react/timeline"
