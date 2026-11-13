import * as React from "react"
import { cn } from "cn"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function MessageGroup({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "message-group", className: cn("flex min-w-0 flex-col gap-2", className) },
      props,
    ),
    render,
  )
}

function Message({
  className,
  align = "start",
  render,
  ...props
}: RenderProps<"div"> & { align?: "start" | "end" }) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "message",
        "data-align": align,
        className: cn(
          "group/message relative flex w-full min-w-0 gap-2 text-sm data-[align=end]:flex-row-reverse",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function MessageAvatar({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "message-avatar",
        className: cn(
          "flex w-fit min-w-8 shrink-0 items-center justify-center self-end overflow-hidden rounded-full bg-muted group-has-data-[slot=message-footer]/message:-translate-y-8",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function MessageContent({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "message-content",
        className: cn(
          "flex w-full min-w-0 flex-col gap-2.5 wrap-break-word group-data-[align=end]/message:*:data-slot:self-end",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function MessageHeader({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "message-header",
        className: cn(
          "flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function MessageFooter({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "message-footer",
        className: cn(
          "flex max-w-full min-w-0 items-center px-3 text-xs font-medium text-muted-foreground group-has-data-[variant=ghost]/message:px-0 group-data-[align=end]/message:justify-end",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

export { MessageGroup, Message, MessageAvatar, MessageContent, MessageFooter, MessageHeader }
