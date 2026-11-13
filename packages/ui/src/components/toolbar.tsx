"use client"

import * as React from "react"
import {
  Toolbar as ToolbarPrimitive,
  ToolbarButton as ToolbarButtonPrimitive,
  ToolbarGroup as ToolbarGroupPrimitive,
  ToolbarInput as ToolbarInputPrimitive,
  ToolbarLink as ToolbarLinkPrimitive,
  ToolbarSeparator as ToolbarSeparatorPrimitive,
} from "@ui-sdk/react/toolbar"
import { cn } from "cn"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

type ButtonVariantProps = NonNullable<Parameters<typeof buttonVariants>[0]>

function Toolbar({ className, ...props }: PrimitiveProps<typeof ToolbarPrimitive>) {
  return (
    <ToolbarPrimitive
      className={cn(
        "flex w-fit items-center gap-1 rounded-2xl border bg-background p-1 data-[orientation=vertical]:flex-col",
        className,
      )}
      {...props}
    />
  )
}

function ToolbarButton({
  className,
  variant = "ghost",
  size = "sm",
  ...props
}: PrimitiveProps<typeof ToolbarButtonPrimitive> & Pick<ButtonVariantProps, "variant" | "size">) {
  return (
    <ToolbarButtonPrimitive
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), "data-disabled:opacity-50", className)}
      {...props}
    />
  )
}

function ToolbarLink({ className, ...props }: PrimitiveProps<typeof ToolbarLinkPrimitive>) {
  return (
    <ToolbarLinkPrimitive
      className={cn(buttonVariants({ variant: "link", size: "sm" }), className)}
      {...props}
    />
  )
}

function ToolbarInput({ className, ...props }: PrimitiveProps<typeof ToolbarInputPrimitive>) {
  return (
    <ToolbarInputPrimitive
      className={cn(
        "h-7 min-w-0 rounded-xl border border-transparent bg-input/50 px-2 text-sm outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30",
        className,
      )}
      {...props}
    />
  )
}

function ToolbarGroup({ className, ...props }: PrimitiveProps<typeof ToolbarGroupPrimitive>) {
  return (
    <ToolbarGroupPrimitive
      className={cn(
        "flex items-center gap-1 in-data-[orientation=vertical]:flex-col data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

function ToolbarSeparator({
  className,
  ...props
}: PrimitiveProps<typeof ToolbarSeparatorPrimitive>) {
  return (
    <ToolbarSeparatorPrimitive
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:mx-1 data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-5 data-[orientation=vertical]:w-px",
        className,
      )}
      {...props}
    />
  )
}

export { Toolbar, ToolbarButton, ToolbarGroup, ToolbarInput, ToolbarLink, ToolbarSeparator }
export { createToolbarController } from "@ui-sdk/react/toolbar"
