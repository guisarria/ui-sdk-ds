"use client"

import * as React from "react"
import {
  Listbox as ListboxPrimitive,
  ListboxGroup as ListboxGroupPrimitive,
  ListboxGroupLabel as ListboxGroupLabelPrimitive,
  ListboxItem as ListboxItemPrimitive,
  ListboxItemIcon as ListboxItemIconPrimitive,
  ListboxItemIndicator as ListboxItemIndicatorPrimitive,
  ListboxSeparator as ListboxSeparatorPrimitive,
  type ListboxProps,
} from "@ui-sdk/react/listbox"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function Listbox({ className, ...props }: ListboxProps & { className?: string }) {
  return (
    <ListboxPrimitive
      className={cn(
        "group/listbox flex max-h-72 w-full flex-col overflow-y-auto rounded-2xl border p-1 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/30 data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

function ListboxItem({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof ListboxItemPrimitive>>) {
  return (
    <ListboxItemPrimitive
      className={cn(
        "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 outline-none select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-selected:font-medium data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ListboxItemIndicator />
    </ListboxItemPrimitive>
  )
}

function ListboxItemIndicator({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof ListboxItemIndicatorPrimitive>>) {
  return (
    <ListboxItemIndicatorPrimitive
      className={cn("absolute inset-e-2 flex size-4 items-center justify-center", className)}
      {...props}
    >
      {children ?? <CheckIcon aria-hidden="true" />}
    </ListboxItemIndicatorPrimitive>
  )
}

function ListboxItemIcon({ className, ...props }: PrimitiveProps<typeof ListboxItemIconPrimitive>) {
  return (
    <ListboxItemIconPrimitive
      className={cn("flex size-4 shrink-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

function ListboxGroup({ className, ...props }: PrimitiveProps<typeof ListboxGroupPrimitive>) {
  return <ListboxGroupPrimitive className={cn(className)} {...props} />
}

function ListboxGroupLabel({
  className,
  ...props
}: PrimitiveProps<typeof ListboxGroupLabelPrimitive>) {
  return (
    <ListboxGroupLabelPrimitive
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function ListboxSeparator({
  className,
  ...props
}: PrimitiveProps<typeof ListboxSeparatorPrimitive>) {
  return (
    <ListboxSeparatorPrimitive className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
  )
}

export {
  Listbox,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
  ListboxItemIcon,
  ListboxItemIndicator,
  ListboxSeparator,
}
export { ListboxItems, createListboxController } from "@ui-sdk/react/listbox"
