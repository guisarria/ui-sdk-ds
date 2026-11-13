"use client"

import * as React from "react"
import {
  HoverCardContent as HoverCardContentPrimitive,
  HoverCardArrow as HoverCardArrowPrimitive,
} from "@ui-sdk/react/hover-card"
import { cn } from "cn"

function HoverCardContent({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 4,
  ...props
}: Omit<React.ComponentProps<typeof HoverCardContentPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <HoverCardContentPrimitive
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      className={cn(
        "w-72 origin-(--transform-origin) rounded-3xl bg-popover p-4 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/5 outline-hidden transition-[opacity,scale,translate] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=bottom]:data-starting-style:-translate-y-2 data-[side=end]:data-starting-style:-translate-x-2 data-[side=left]:data-starting-style:translate-x-2 data-[side=right]:data-starting-style:-translate-x-2 data-[side=start]:data-starting-style:translate-x-2 data-[side=top]:data-starting-style:translate-y-2 motion-reduce:transition-none rtl:data-[side=end]:data-starting-style:translate-x-2 rtl:data-[side=start]:data-starting-style:-translate-x-2 dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

function HoverCardArrow({
  className,
  ...props
}: Omit<React.ComponentProps<typeof HoverCardArrowPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <HoverCardArrowPrimitive
      className={cn(
        "size-2.5 rotate-45 rounded-xs bg-popover data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-bottom-1",
        className,
      )}
      {...props}
    />
  )
}

export { HoverCardContent, HoverCardArrow }
export { HoverCard, HoverCardTrigger, createHoverCardController } from "@ui-sdk/react/hover-card"
