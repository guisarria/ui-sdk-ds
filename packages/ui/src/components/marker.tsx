import * as React from "react"
import { mergeProps, renderElement, type RenderProp } from "@ui-sdk/react/primitive"
import { cn } from "cn"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

const variants = {
  default: "",
  separator:
    "before:me-1 before:h-px before:min-w-0 before:flex-1 before:bg-border after:ms-1 after:h-px after:min-w-0 after:flex-1 after:bg-border",
  border: "border-b border-border pb-2",
}

type MarkerVariants = {
  variant?: keyof typeof variants
}

function markerVariants({ variant }: MarkerVariants = {}) {
  return cn(
    "group/marker relative flex min-h-4 w-full items-center gap-2 text-start text-sm text-muted-foreground [&_svg:not([class*='size-'])]:size-4 [a]:underline [a]:underline-offset-3 [a]:hover:text-foreground",
    variant && variants[variant],
  )
}

function Marker({
  className,
  variant = "default",
  render,
  ...props
}: React.ComponentProps<"div"> & { render?: RenderProp } & MarkerVariants) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "marker",
        "data-variant": variant,
        className: cn(markerVariants({ variant }), className),
      },
      props,
    ),
    render,
  )
}

function MarkerIcon({ className, render, ...props }: RenderProps<"span">) {
  return renderElement(
    "span",
    mergeProps(
      {
        "data-slot": "marker-icon",
        "aria-hidden": "true",
        className: cn("size-4 shrink-0 [&_svg:not([class*='size-'])]:size-4", className),
      },
      props,
    ),
    render,
  )
}

function MarkerContent({ className, render, ...props }: RenderProps<"span">) {
  return renderElement(
    "span",
    mergeProps(
      {
        "data-slot": "marker-content",
        className: cn(
          "min-w-0 wrap-break-word group-data-[variant=separator]/marker:flex-none group-data-[variant=separator]/marker:text-center *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

export { Marker, MarkerIcon, MarkerContent, markerVariants }
export type { MarkerVariants }
