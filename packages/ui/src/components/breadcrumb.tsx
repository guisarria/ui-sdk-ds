import * as React from "react"
import { mergeProps, renderElement, type RenderProp } from "@ui-sdk/react/primitive"
import { cn } from "cn"
import { ChevronRightIcon, MoreHorizontalIcon } from "lucide-react"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function Breadcrumb({ className, render, ...props }: RenderProps<"nav">) {
  return renderElement(
    "nav",
    mergeProps(
      { "aria-label": "breadcrumb", "data-slot": "breadcrumb", className: cn(className) },
      props,
    ),
    render,
  )
}

function BreadcrumbList({ className, render, ...props }: RenderProps<"ol">) {
  return renderElement(
    "ol",
    mergeProps(
      {
        "data-slot": "breadcrumb-list",
        className: cn(
          "flex flex-wrap items-center gap-1.5 text-sm wrap-break-word text-muted-foreground sm:gap-2.5",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function BreadcrumbItem({ className, render, ...props }: RenderProps<"li">) {
  return renderElement(
    "li",
    mergeProps(
      {
        "data-slot": "breadcrumb-item",
        className: cn("inline-flex items-center gap-1.5", className),
      },
      props,
    ),
    render,
  )
}

function BreadcrumbLink({
  className,
  render,
  ...props
}: React.ComponentProps<"a"> & { render?: RenderProp }) {
  return renderElement(
    "a",
    mergeProps(
      {
        "data-slot": "breadcrumb-link",
        className: cn("transition-colors hover:text-foreground", className),
      },
      props,
    ),
    render,
  )
}

function BreadcrumbPage({ className, render, ...props }: RenderProps<"span">) {
  return renderElement(
    "span",
    mergeProps(
      {
        "data-slot": "breadcrumb-page",
        role: "link",
        "aria-disabled": "true",
        "aria-current": "page",
        className: cn("font-normal text-foreground", className),
      },
      props,
    ),
    render,
  )
}

function BreadcrumbSeparator({ children, className, ...props }: React.ComponentProps<"li">) {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={cn("[&>svg]:size-3.5", className)}
      {...props}
    >
      {children ?? <ChevronRightIcon />}
    </li>
  )
}

function BreadcrumbEllipsis({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={cn("flex size-5 items-center justify-center [&>svg]:size-4", className)}
      {...props}
    >
      <MoreHorizontalIcon />
      <span className="sr-only">More</span>
    </span>
  )
}

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
