"use client"

import {
  ScrollArea as ScrollAreaPrimitive,
  ScrollAreaContent as ScrollAreaContentPrimitive,
  ScrollAreaScrollToEnd as ScrollAreaScrollToEndPrimitive,
  ScrollAreaViewport as ScrollAreaViewportPrimitive,
} from "@ui-sdk/react/scroll-area"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import { cn } from "cn"
import { ArrowDownIcon } from "lucide-react"

import { buttonVariants, type ButtonVariants } from "@ui-sdk-ds/ui/components/button"
import type { PrimitiveProps, RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function MessageScroller({
  className,
  stickToEnd = true,
  ...props
}: PrimitiveProps<typeof ScrollAreaPrimitive>) {
  return (
    <ScrollAreaPrimitive
      stickToEnd={stickToEnd}
      className={cn(
        "group/message-scroller relative flex size-full min-h-0 flex-col overflow-hidden",
        className,
      )}
      {...props}
    />
  )
}

function MessageScrollerViewport({
  className,
  ...props
}: PrimitiveProps<typeof ScrollAreaViewportPrimitive>) {
  return (
    <ScrollAreaViewportPrimitive
      role="log"
      className={cn(
        "size-full min-h-0 min-w-0 scroll-fade-b scrollbar-thin scrollbar-gutter-stable overscroll-contain rounded-[inherit] contain-content outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50",
        className,
      )}
      {...props}
    />
  )
}

function MessageScrollerContent({
  className,
  ...props
}: PrimitiveProps<typeof ScrollAreaContentPrimitive>) {
  return (
    <ScrollAreaContentPrimitive
      className={cn("flex h-max min-h-full flex-col gap-8", className)}
      {...props}
    />
  )
}

function MessageScrollerItem({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "message-scroller-item",
        className: cn(
          "min-w-0 shrink-0 [contain-intrinsic-size:auto_10rem] [content-visibility:auto]",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function MessageScrollerButton({
  className,
  children,
  variant = "secondary",
  size = "icon-sm",
  ...props
}: PrimitiveProps<typeof ScrollAreaScrollToEndPrimitive> & ButtonVariants) {
  return (
    <ScrollAreaScrollToEndPrimitive
      aria-label="Scroll to end"
      className={cn(
        buttonVariants({ variant, size }),
        "absolute bottom-4 left-1/2 z-10 -translate-x-1/2 rounded-full border-border bg-background text-foreground shadow-md transition-[translate,scale,opacity] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] not-data-visible:pointer-events-none not-data-visible:translate-y-full not-data-visible:scale-95 not-data-visible:opacity-0 hover:bg-muted hover:text-foreground motion-reduce:transition-none",
        className,
      )}
      {...props}
    >
      {children ?? <ArrowDownIcon />}
    </ScrollAreaScrollToEndPrimitive>
  )
}

export {
  MessageScroller,
  MessageScrollerViewport,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerButton,
}
