import * as React from "react"
import { cn } from "cn"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

const variants = {
  default: "bg-card text-card-foreground",
  destructive:
    "bg-card text-destructive *:data-[slot=alert-description]:text-destructive/90 *:[svg]:text-current",
  success: "bg-card text-success *:data-[slot=alert-description]:text-success *:[svg]:text-current",
  info: "bg-card text-info *:data-[slot=alert-description]:text-info *:[svg]:text-current",
  warning: "bg-card text-warning *:data-[slot=alert-description]:text-warning *:[svg]:text-current",
}

type AlertVariants = {
  variant?: keyof typeof variants
}

function alertVariants({ variant = "default" }: AlertVariants = {}) {
  return cn(
    "group/alert relative grid w-full gap-0.5 rounded-2xl border px-4 py-3 text-start text-sm has-data-[slot=alert-action]:relative has-data-[slot=alert-action]:pe-18 has-[>svg]:grid-cols-[auto_1fr] has-[>svg]:gap-x-2.5 *:[svg]:row-span-2 *:[svg]:translate-y-0.5 *:[svg]:text-current *:[svg:not([class*='size-'])]:size-4",
    variants[variant],
  )
}

function Alert({ className, variant, render, ...props }: RenderProps<"div"> & AlertVariants) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "alert", role: "alert", className: cn(alertVariants({ variant }), className) },
      props,
    ),
    render,
  )
}

function AlertTitle({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "alert-title",
        className: cn(
          "font-medium group-has-[>svg]/alert:col-start-2 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function AlertDescription({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "alert-description",
        className: cn(
          "text-sm text-balance text-muted-foreground md:text-pretty [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function AlertAction({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "alert-action", className: cn("absolute end-3 top-2.5", className) },
      props,
    ),
    render,
  )
}

export { Alert, AlertTitle, AlertDescription, AlertAction }
export type { AlertVariants }
