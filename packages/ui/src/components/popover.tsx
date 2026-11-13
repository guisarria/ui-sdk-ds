"use client"

import * as React from "react"
import {
  PopoverContent as PopoverContentPrimitive,
  PopoverDescription as PopoverDescriptionPrimitive,
  PopoverTitle as PopoverTitlePrimitive,
  PopoverArrow as PopoverArrowPrimitive,
  PopoverShortcut as PopoverShortcutPrimitive,
} from "@ui-sdk/react/popover"
import { cn } from "cn"
import { kbdClassName } from "@ui-sdk-ds/ui/components/kbd"

function PopoverContent({
  className,
  align = "center",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  ...props
}: Omit<React.ComponentProps<typeof PopoverContentPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <PopoverContentPrimitive
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        "flex w-72 origin-(--transform-origin) flex-col gap-4 rounded-3xl bg-popover p-4 text-sm text-popover-foreground shadow-lg ring-1 ring-foreground/5 outline-hidden transition-[opacity,scale,translate] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=bottom]:data-starting-style:-translate-y-2 data-[side=end]:data-starting-style:-translate-x-2 data-[side=left]:data-starting-style:translate-x-2 data-[side=right]:data-starting-style:-translate-x-2 data-[side=start]:data-starting-style:translate-x-2 data-[side=top]:data-starting-style:translate-y-2 motion-reduce:transition-none rtl:data-[side=end]:data-starting-style:translate-x-2 rtl:data-[side=start]:data-starting-style:-translate-x-2 dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

function PopoverHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="popover-header"
      className={cn("flex flex-col gap-1 text-sm", className)}
      {...props}
    />
  )
}

function PopoverTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PopoverTitlePrimitive>, "className"> & { className?: string }) {
  return <PopoverTitlePrimitive className={cn("text-base font-medium", className)} {...props} />
}

function PopoverDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PopoverDescriptionPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <PopoverDescriptionPrimitive className={cn("text-muted-foreground", className)} {...props} />
  )
}

function PopoverArrow({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PopoverArrowPrimitive>, "className"> & { className?: string }) {
  return (
    <PopoverArrowPrimitive
      className={cn(
        "size-2.5 rotate-45 rounded-xs bg-popover data-[side=bottom]:-top-1 data-[side=left]:-right-1 data-[side=right]:-left-1 data-[side=top]:-bottom-1",
        className,
      )}
      {...props}
    />
  )
}

function PopoverShortcut({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PopoverShortcutPrimitive>, "className"> & {
  className?: string
}) {
  return <PopoverShortcutPrimitive className={cn(kbdClassName, className)} {...props} />
}

export {
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverArrow,
  PopoverShortcut,
}
export {
  Popover,
  PopoverClose,
  PopoverTrigger,
  createPopoverController,
} from "@ui-sdk/react/popover"
