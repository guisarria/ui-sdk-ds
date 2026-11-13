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

type ButtonVariantProps = NonNullable<Parameters<typeof buttonVariants>[0]>

function Toolbar({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToolbarPrimitive>, "className"> & { className?: string }) {
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
}: Omit<React.ComponentProps<typeof ToolbarButtonPrimitive>, "className"> & {
  className?: string
} & Pick<ButtonVariantProps, "variant" | "size">) {
  return (
    <ToolbarButtonPrimitive
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size }), "data-disabled:opacity-50", className)}
      {...props}
    />
  )
}

function ToolbarLink({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToolbarLinkPrimitive>, "className"> & { className?: string }) {
  return (
    <ToolbarLinkPrimitive
      className={cn(buttonVariants({ variant: "link", size: "sm" }), className)}
      {...props}
    />
  )
}

function ToolbarInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToolbarInputPrimitive>, "className"> & { className?: string }) {
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

function ToolbarGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToolbarGroupPrimitive>, "className"> & { className?: string }) {
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
}: Omit<React.ComponentProps<typeof ToolbarSeparatorPrimitive>, "className"> & {
  className?: string
}) {
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
