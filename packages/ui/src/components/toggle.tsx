"use client"

import * as React from "react"
import { Toggle as TogglePrimitive } from "@ui-sdk/react/toggle"
import { cn } from "cn"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

const variants = {
  default: "bg-transparent",
  outline: "border border-input bg-transparent hover:bg-muted",
}

const sizes = {
  default: "h-8 min-w-8 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
  sm: "h-7 min-w-7 px-2.5 has-data-[icon=inline-end]:pe-1.5 has-data-[icon=inline-start]:ps-1.5",
  lg: "h-9 min-w-9 px-2.5 has-data-[icon=inline-end]:pe-2 has-data-[icon=inline-start]:ps-2",
}

type ToggleVariants = {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

function toggleVariants({ variant = "default", size = "default" }: ToggleVariants = {}) {
  return cn(
    "group/toggle inline-flex items-center justify-center gap-1 rounded-2xl text-sm font-medium whitespace-nowrap transition-colors outline-none hover:bg-muted hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-pressed:bg-muted dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
    variants[variant],
    sizes[size],
  )
}

function Toggle({
  className,
  variant = "default",
  size = "default",
  ...props
}: PrimitiveProps<typeof TogglePrimitive> & ToggleVariants) {
  return (
    <TogglePrimitive
      data-variant={variant}
      data-size={size}
      className={cn(toggleVariants({ variant, size }), className)}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }
export { ToggleIcon, createToggleController } from "@ui-sdk/react/toggle"
export type { ToggleVariants }
