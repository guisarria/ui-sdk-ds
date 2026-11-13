import * as React from "react"
import { cn } from "cn"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function Card({
  className,
  size = "default",
  render,
  ...props
}: RenderProps<"div"> & { size?: "default" | "sm" }) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "card",
        "data-size": size,
        className: cn(
          "group/card flex flex-col gap-(--card-spacing) overflow-hidden rounded-[min(var(--radius-4xl),24px)] bg-card py-(--card-spacing) text-sm text-card-foreground shadow-sm ring-1 ring-foreground/5 [--card-spacing:--spacing(5)] has-[>img:first-child]:pt-0 data-[size=sm]:[--card-spacing:--spacing(4)] dark:ring-foreground/10 *:[img:first-child]:rounded-t-[min(var(--radius-4xl),24px)] *:[img:last-child]:rounded-b-[min(var(--radius-4xl),24px)]",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function CardHeader({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "card-header",
        className: cn(
          "group/card-header @container/card-header grid auto-rows-min items-start gap-1.5 rounded-t-[min(var(--radius-4xl),24px)] px-(--card-spacing) has-data-[slot=card-action]:grid-cols-[1fr_auto] has-data-[slot=card-description]:grid-rows-[auto_auto] [.border-b]:pb-(--card-spacing)",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function CardTitle({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "card-title", className: cn("font-heading text-base font-medium", className) },
      props,
    ),
    render,
  )
}

function CardDescription({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "card-description",
        className: cn("text-sm text-muted-foreground", className),
      },
      props,
    ),
    render,
  )
}

function CardAction({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "card-action",
        className: cn("col-start-2 row-span-2 row-start-1 self-start justify-self-end", className),
      },
      props,
    ),
    render,
  )
}

function CardContent({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "card-content", className: cn("px-(--card-spacing)", className) },
      props,
    ),
    render,
  )
}

function CardFooter({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "card-footer",
        className: cn(
          "flex items-center rounded-b-[min(var(--radius-4xl),24px)] px-(--card-spacing) [.border-t]:pt-(--card-spacing)",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

export { Card, CardHeader, CardFooter, CardTitle, CardAction, CardDescription, CardContent }
