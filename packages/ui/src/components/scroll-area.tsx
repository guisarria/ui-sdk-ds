"use client"

import * as React from "react"
import {
  ScrollArea as ScrollAreaPrimitive,
  ScrollAreaContent as ScrollAreaContentPrimitive,
  ScrollAreaCorner as ScrollAreaCornerPrimitive,
  ScrollAreaScrollbar as ScrollAreaScrollbarPrimitive,
  ScrollAreaThumb as ScrollAreaThumbPrimitive,
  ScrollAreaViewport as ScrollAreaViewportPrimitive,
  ScrollAreaScrollToEnd as ScrollAreaScrollToEndPrimitive,
} from "@ui-sdk/react/scroll-area"
import { cn } from "cn"
import { ArrowDownIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"

import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function ScrollArea({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof ScrollAreaPrimitive>, "className"> & { className?: string }
>) {
  const nodes = React.Children.toArray(children)
  const isScrollBar = (node: React.ReactNode) =>
    React.isValidElement(node) && (node.type === ScrollBar || node.type === ScrollAreaScrollToEnd)
  const scrollBars = nodes.filter(isScrollBar)
  const content = nodes.filter((node) => !isScrollBar(node))

  return (
    <ScrollAreaPrimitive className={cn("relative overflow-hidden", className)} {...props}>
      <ScrollAreaViewportPrimitive className="size-full rounded-[inherit] transition-[color,box-shadow] outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1">
        <ScrollAreaContentPrimitive data-slot="scroll-area-content">
          {content}
        </ScrollAreaContentPrimitive>
      </ScrollAreaViewportPrimitive>
      <ScrollBar />
      {scrollBars}
      <ScrollAreaCornerPrimitive />
    </ScrollAreaPrimitive>
  )
}

function ScrollBar({
  className,
  orientation = "vertical",
  ...props
}: Omit<React.ComponentProps<typeof ScrollAreaScrollbarPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ScrollAreaScrollbarPrimitive
      orientation={orientation}
      className={cn(
        "invisible flex touch-none p-px transition-colors select-none data-visible:visible data-[orientation=horizontal]:h-2.5 data-[orientation=horizontal]:border-t data-[orientation=horizontal]:border-t-transparent data-[orientation=vertical]:w-2.5 data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-l data-[orientation=vertical]:border-l-transparent",
        className,
      )}
      {...props}
    >
      <ScrollAreaThumbPrimitive className="relative rounded-full bg-border" />
    </ScrollAreaScrollbarPrimitive>
  )
}

function ScrollAreaScrollToEnd({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof ScrollAreaScrollToEndPrimitive>, "className"> & {
    className?: string
  }
>) {
  return (
    <ScrollAreaScrollToEndPrimitive
      aria-label="Scroll to end"
      className={cn(
        buttonVariants({ variant: "outline", size: "icon-sm" }),
        "absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full opacity-0 shadow-md transition-opacity duration-150 not-data-visible:pointer-events-none data-visible:opacity-100 motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children ?? <ArrowDownIcon />}
    </ScrollAreaScrollToEndPrimitive>
  )
}

export { ScrollArea, ScrollBar, ScrollAreaScrollToEnd }
export { createScrollAreaController } from "@ui-sdk/react/scroll-area"
