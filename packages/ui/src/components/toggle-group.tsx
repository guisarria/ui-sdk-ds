"use client"

import * as React from "react"
import {
  Toggle as TogglePrimitive,
  ToggleGroup as ToggleGroupPrimitive,
} from "@ui-sdk/react/toggle"
import { cn } from "cn"

import { toggleVariants, type ToggleVariants } from "@ui-sdk-ds/ui/components/toggle"
import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

const ToggleGroupContext = React.createContext<
  ToggleVariants & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }
>({
  size: "default",
  variant: "default",
  spacing: 2,
  orientation: "horizontal",
})

function ToggleGroup({
  className,
  variant,
  size,
  spacing = 2,
  orientation = "horizontal",
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof ToggleGroupPrimitive>> &
  ToggleVariants & {
    spacing?: number
    orientation?: "horizontal" | "vertical"
  }) {
  const context = React.useMemo(
    () => ({ variant, size, spacing, orientation }),
    [variant, size, spacing, orientation],
  )

  return (
    <ToggleGroupPrimitive
      data-variant={variant}
      data-size={size}
      data-spacing={spacing}
      orientation={orientation}
      style={{ "--gap": spacing } as React.CSSProperties}
      className={cn(
        "group/toggle-group flex w-fit flex-row items-center gap-[--spacing(var(--gap))] data-[orientation=vertical]:flex-col data-[orientation=vertical]:items-stretch data-[spacing=0]:data-[variant=outline]:rounded-2xl",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext value={context}>{children}</ToggleGroupContext>
    </ToggleGroupPrimitive>
  )
}

function ToggleGroupItem({
  className,
  children,
  variant = "default",
  size = "default",
  ...props
}: PrimitiveProps<typeof TogglePrimitive> & ToggleVariants) {
  const context = React.use(ToggleGroupContext)

  return (
    <TogglePrimitive
      data-variant={context.variant || variant}
      data-size={context.size || size}
      data-spacing={context.spacing}
      className={cn(
        "shrink-0 group-data-[spacing=0]/toggle-group:rounded-none group-data-[spacing=0]/toggle-group:px-2 group-data-[spacing=0]/toggle-group:shadow-none focus:z-10 focus-visible:z-10 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-end]:pe-1.5 group-data-[spacing=0]/toggle-group:has-data-[icon=inline-start]:ps-1.5 data-pressed:bg-muted group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:first:rounded-s-2xl group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:first:rounded-t-2xl group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:last:rounded-e-2xl group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:last:rounded-b-2xl group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-s-0 group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:border-t-0 group-data-[orientation=horizontal]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-s group-data-[orientation=vertical]/toggle-group:data-[spacing=0]:data-[variant=outline]:first:border-t",
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        className,
      )}
      {...props}
    >
      {children}
    </TogglePrimitive>
  )
}

export { ToggleGroup, ToggleGroupItem }
export { createToggleGroupController } from "@ui-sdk/react/toggle"
