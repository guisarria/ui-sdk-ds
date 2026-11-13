"use client"

import * as React from "react"
import {
  Switch as SwitchPrimitive,
  SwitchThumb as SwitchThumbPrimitive,
} from "@ui-sdk/react/switch"
import { cn } from "cn"

function Switch({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<typeof SwitchPrimitive>, "className"> & { className?: string } & {
  size?: "sm" | "default"
}) {
  return (
    <SwitchPrimitive
      data-size={size}
      className={cn(
        "peer group/switch relative inline-flex shrink-0 items-center rounded-2xl border-2 transition-all outline-none group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-[size=default]:h-5 data-[size=default]:w-8 data-[size=sm]:h-4 data-[size=sm]:w-6 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary group-has-[:focus-visible]/field-label:data-checked:border-primary data-unchecked:border-transparent data-unchecked:bg-input/90 group-has-[:focus-visible]/field-label:data-unchecked:border-transparent data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      <SwitchThumbPrimitive className="pointer-events-none block rounded-2xl bg-background bg-clip-padding shadow-sm ring-0 transition-transform group-data-[size=default]/switch:size-4 group-data-[size=sm]/switch:size-3 dark:bg-clip-border data-checked:translate-x-[calc(100%-4px)] dark:data-checked:bg-primary-foreground data-unchecked:translate-x-0 dark:data-unchecked:bg-foreground" />
    </SwitchPrimitive>
  )
}

export { Switch }
export { createSwitchController } from "@ui-sdk/react/switch"
