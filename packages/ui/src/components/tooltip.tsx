"use client"

import {
  TooltipArrow as TooltipArrowPrimitive,
  TooltipContent as TooltipContentPrimitive,
  TooltipShortcut as TooltipShortcutPrimitive,
} from "@ui-sdk/react/tooltip"
import { cn } from "cn"
import { kbdClassName } from "@ui-sdk-ds/ui/components/kbd"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function TooltipContent({
  className,
  side = "top",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof TooltipContentPrimitive>>) {
  return (
    <TooltipContentPrimitive
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      className={cn(
        "inline-flex w-fit max-w-xs origin-(--transform-origin) items-center gap-1.5 overflow-visible rounded-xl bg-foreground px-3 py-1.5 text-xs text-background transition-[opacity,scale,translate] has-data-[slot=kbd]:pe-1.5 data-ending-style:scale-95 data-ending-style:opacity-0 data-instant:transition-none data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=bottom]:data-starting-style:-translate-y-2 data-[side=end]:data-starting-style:-translate-x-2 data-[side=left]:data-starting-style:translate-x-2 data-[side=right]:data-starting-style:-translate-x-2 data-[side=start]:data-starting-style:translate-x-2 data-[side=top]:data-starting-style:translate-y-2 **:data-[slot=kbd]:relative **:data-[slot=kbd]:isolate **:data-[slot=kbd]:z-50 **:data-[slot=kbd]:rounded-lg motion-reduce:transition-none rtl:data-[side=end]:data-starting-style:translate-x-2 rtl:data-[side=start]:data-starting-style:-translate-x-2",
        className,
      )}
      {...props}
    >
      {children}
      <TooltipArrowPrimitive className="size-2.5 rotate-45 rounded-xs bg-foreground data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-bottom-1" />
    </TooltipContentPrimitive>
  )
}

function TooltipShortcut({ className, ...props }: PrimitiveProps<typeof TooltipShortcutPrimitive>) {
  return <TooltipShortcutPrimitive className={cn(kbdClassName, className)} {...props} />
}

export { TooltipContent, TooltipShortcut }
export { Tooltip, TooltipTrigger, createTooltipController } from "@ui-sdk/react/tooltip"
