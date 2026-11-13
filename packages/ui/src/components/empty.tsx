import { cn } from "cn"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function Empty({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "empty",
        className: cn(
          "flex w-full min-w-0 flex-1 flex-col items-center justify-center gap-4 rounded-3xl border-dashed p-12 text-center text-balance",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function EmptyHeader({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "empty-header",
        className: cn("flex max-w-sm flex-col items-center gap-2", className),
      },
      props,
    ),
    render,
  )
}

const variants = {
  default: "bg-transparent",
  icon: "flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-foreground [&_svg:not([class*='size-'])]:size-5",
}

type EmptyMediaVariants = {
  variant?: keyof typeof variants
}

function emptyMediaVariants({ variant = "default" }: EmptyMediaVariants = {}) {
  return cn(
    "mb-2 flex shrink-0 items-center justify-center [&_svg]:pointer-events-none [&_svg]:shrink-0",
    variants[variant],
  )
}

function EmptyMedia({
  className,
  variant = "default",
  render,
  ...props
}: RenderProps<"div"> & EmptyMediaVariants) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "empty-icon",
        "data-variant": variant,
        className: cn(emptyMediaVariants({ variant }), className),
      },
      props,
    ),
    render,
  )
}

function EmptyTitle({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "empty-title",
        className: cn("font-heading text-lg font-medium tracking-tight", className),
      },
      props,
    ),
    render,
  )
}

function EmptyDescription({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "empty-description",
        className: cn(
          "text-sm/relaxed text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function EmptyContent({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "empty-content",
        className: cn(
          "flex w-full max-w-sm min-w-0 flex-col items-center gap-4 text-sm text-balance",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia }
export type { EmptyMediaVariants }
