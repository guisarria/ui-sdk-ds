import * as React from "react"
import { mergeProps, renderElement, type RenderProp } from "@ui-sdk/react/primitive"
import { cn } from "cn"

import { Separator } from "@ui-sdk-ds/ui/components/separator"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function ItemGroup({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        role: "list",
        "data-slot": "item-group",
        className: cn(
          "group/item-group flex w-full flex-col gap-4 has-data-[size=sm]:gap-2.5 has-data-[size=xs]:gap-2",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function ItemSeparator({ className, ...props }: React.ComponentProps<typeof Separator>) {
  return <Separator orientation="horizontal" className={cn("my-2", className)} {...props} />
}

const variants = {
  default: "border-transparent",
  outline: "border-border",
  muted: "border-transparent bg-muted/50",
}

const sizes = {
  default: "gap-3.5 px-4 py-3.5",
  sm: "gap-3.5 px-3.5 py-3",
  xs: "gap-2 px-2.5 py-2 in-data-[slot=menu-content]:p-0",
}

type ItemVariants = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

function itemVariants({ variant = "default", size = "default" }: ItemVariants = {}) {
  return cn(
    "group/item flex w-full flex-wrap items-center rounded-2xl border text-sm transition-colors duration-100 outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 [a]:transition-colors [a]:hover:bg-muted",
    variants[variant],
    sizes[size],
  )
}

function Item({
  className,
  variant = "default",
  size = "default",
  render,
  ...props
}: React.ComponentProps<"div"> & { render?: RenderProp } & ItemVariants) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "item",
        "data-variant": variant,
        "data-size": size,
        className: cn(itemVariants({ variant, size }), className),
      },
      props,
    ),
    render,
  )
}

const mediaVariants = {
  default: "bg-transparent",
  icon: "[&_svg:not([class*='size-'])]:size-4",
  image:
    "size-10 overflow-hidden rounded-xl group-data-[size=sm]/item:size-8 group-data-[size=xs]/item:size-6 group-data-[size=xs]/item:rounded-lg [&_img]:size-full [&_img]:object-cover",
}

type ItemMediaVariants = {
  variant?: keyof typeof mediaVariants
}

function itemMediaVariants({ variant = "default" }: ItemMediaVariants = {}) {
  return cn(
    "flex shrink-0 items-center justify-center gap-2 group-has-data-[slot=item-description]/item:translate-y-0.5 group-has-data-[slot=item-description]/item:self-start [&_svg]:pointer-events-none",
    mediaVariants[variant],
  )
}

function ItemMedia({
  className,
  variant = "default",
  render,
  ...props
}: RenderProps<"div"> & ItemMediaVariants) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "item-media",
        "data-variant": variant,
        className: cn(itemMediaVariants({ variant }), className),
      },
      props,
    ),
    render,
  )
}

function ItemContent({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "item-content",
        className: cn(
          "flex flex-1 flex-col gap-1 group-data-[size=xs]/item:gap-0.5 [&+[data-slot=item-content]]:flex-none",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function ItemTitle({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "item-title",
        className: cn(
          "line-clamp-1 flex w-fit items-center gap-2 text-sm/snug font-medium underline-offset-4",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function ItemDescription({ className, render, ...props }: RenderProps<"p">) {
  return renderElement(
    "p",
    mergeProps(
      {
        "data-slot": "item-description",
        className: cn(
          "line-clamp-2 text-start text-sm font-normal text-muted-foreground [&>a]:underline [&>a]:underline-offset-4 [&>a:hover]:text-primary",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function ItemActions({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "item-actions", className: cn("flex items-center gap-2", className) },
      props,
    ),
    render,
  )
}

function ItemHeader({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "item-header",
        className: cn("flex basis-full items-center justify-between gap-2", className),
      },
      props,
    ),
    render,
  )
}

function ItemFooter({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "item-footer",
        className: cn("flex basis-full items-center justify-between gap-2", className),
      },
      props,
    ),
    render,
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}
export type { ItemVariants, ItemMediaVariants }
