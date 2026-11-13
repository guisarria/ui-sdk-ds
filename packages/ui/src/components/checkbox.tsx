"use client"

import * as React from "react"
import {
  Checkbox as CheckboxPrimitive,
  CheckboxIndicator as CheckboxIndicatorPrimitive,
  CheckboxGroup as CheckboxGroupPrimitive,
} from "@ui-sdk/react/checkbox"
import { cn } from "cn"
import { CheckIcon } from "lucide-react"

function Checkbox({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CheckboxPrimitive>, "className"> & { className?: string }) {
  return (
    <CheckboxPrimitive
      className={cn(
        "peer relative flex size-4 shrink-0 items-center justify-center rounded-[5px] border border-transparent bg-input/90 transition-shadow outline-none group-has-disabled/field:opacity-50 group-has-[:focus-visible]/field-label:ring-0 group-has-[:focus-visible]/field-label:not-data-checked:border-transparent after:absolute after:-inset-x-3 after:-inset-y-2 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 data-checked:border-primary data-checked:bg-primary data-checked:text-primary-foreground group-has-[:focus-visible]/field-label:data-checked:border-primary aria-invalid:data-checked:border-primary dark:data-checked:bg-primary",
        className,
      )}
      {...props}
    >
      <CheckboxIndicatorPrimitive className="grid place-content-center text-current transition-none [&>svg]:size-3.5">
        <CheckIcon />
      </CheckboxIndicatorPrimitive>
    </CheckboxPrimitive>
  )
}

function CheckboxGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CheckboxGroupPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <CheckboxGroupPrimitive
      className={cn("flex flex-col gap-3 data-disabled:opacity-50", className)}
      {...props}
    />
  )
}

export { Checkbox, CheckboxGroup }
export { createCheckboxController, createCheckboxGroupController } from "@ui-sdk/react/checkbox"
