"use client"

import * as React from "react"
import {
  Radio as RadioPrimitive,
  RadioGroup as RadioGroupPrimitive,
  RadioIndicator as RadioIndicatorPrimitive,
} from "@ui-sdk/react/radio"
import { cn } from "cn"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

function RadioGroup({ className, ...props }: PrimitiveProps<typeof RadioGroupPrimitive>) {
  return <RadioGroupPrimitive className={cn("grid w-full gap-3", className)} {...props} />
}

function RadioGroupItem({ className, ...props }: PrimitiveProps<typeof RadioPrimitive>) {
  return (
    <RadioPrimitive
      className={cn(
        "group/radio-group-item peer relative flex aspect-square size-4 shrink-0 rounded-2xl border border-transparent bg-input/90 outline-none group-has-[:focus-visible]/field-label:border-transparent group-has-[:focus-visible]/field-label:ring-0 after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:bg-primary data-checked:text-primary-foreground dark:data-checked:bg-primary",
        className,
      )}
      {...props}
    >
      <RadioIndicatorPrimitive className="flex size-4 items-center justify-center">
        <span className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-primary-foreground dark:size-2.5" />
      </RadioIndicatorPrimitive>
    </RadioPrimitive>
  )
}

export { RadioGroup, RadioGroupItem }
export { createRadioGroupController } from "@ui-sdk/react/radio"
