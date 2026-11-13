"use client"

import * as React from "react"
import {
  PasswordInput as PasswordInputPrimitive,
  PasswordInputControl as PasswordInputControlPrimitive,
  PasswordInputToggle as PasswordInputTogglePrimitive,
} from "@ui-sdk/react/password-input"
import { cn } from "cn"
import { EyeIcon, EyeOffIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"
import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function PasswordInput({
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof PasswordInputPrimitive>, "className"> & { className?: string }
>) {
  const named = children === undefined
  return (
    <PasswordInputPrimitive
      aria-label={named ? undefined : ariaLabel}
      aria-labelledby={named ? undefined : ariaLabelledBy}
      className={cn(
        "flex h-8 w-full min-w-0 items-center rounded-2xl border border-transparent bg-input/50 ps-2.5 pe-1 transition-[color,box-shadow] duration-200 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40 data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <PasswordInputControl aria-label={ariaLabel} aria-labelledby={ariaLabelledBy} />
          <PasswordInputToggle />
        </>
      )}
    </PasswordInputPrimitive>
  )
}

function PasswordInputControl({
  className,
  ...props
}: Omit<React.ComponentProps<typeof PasswordInputControlPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <PasswordInputControlPrimitive
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent py-1 text-base outline-none placeholder:text-muted-foreground md:text-sm",
        className,
      )}
      {...props}
    />
  )
}

function PasswordInputToggle({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof PasswordInputTogglePrimitive>, "className"> & {
    className?: string
  }
>) {
  return (
    <PasswordInputTogglePrimitive
      aria-label="Show password"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-xs" }),
        "group/password-toggle size-6 rounded-xl",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <EyeIcon aria-hidden="true" className="group-data-visible/password-toggle:hidden" />
          <EyeOffIcon
            aria-hidden="true"
            className="hidden group-data-visible/password-toggle:block"
          />
        </>
      )}
    </PasswordInputTogglePrimitive>
  )
}

export { PasswordInput, PasswordInputControl, PasswordInputToggle }
export { createPasswordInputController } from "@ui-sdk/react/password-input"
