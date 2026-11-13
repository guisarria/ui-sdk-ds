"use client"

import * as React from "react"
import {
  OTPInput as OTPInputPrimitive,
  OTPInputGroup as OTPInputGroupPrimitive,
  OTPInputSeparator as OTPInputSeparatorPrimitive,
  OTPInputSlot as OTPInputSlotPrimitive,
} from "@ui-sdk/react/otp-input"
import { cn } from "cn"
import { MinusIcon } from "lucide-react"

function InputOTP({
  className,
  containerClassName,
  ...props
}: Omit<
  Omit<React.ComponentProps<typeof OTPInputPrimitive>, "className"> & { className?: string },
  "className"
> & {
  className?: string
  containerClassName?: string
}) {
  return (
    <OTPInputPrimitive
      className={cn(
        "flex items-center data-disabled:cursor-not-allowed data-disabled:opacity-50",
        containerClassName,
        className,
      )}
      {...props}
    />
  )
}

function InputOTPGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof OTPInputGroupPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <OTPInputGroupPrimitive
      className={cn(
        "flex items-center rounded-2xl has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  className,
  ...props
}: Omit<
  Omit<React.ComponentProps<typeof OTPInputSlotPrimitive>, "className"> & { className?: string },
  "children"
>) {
  return (
    <OTPInputSlotPrimitive
      className={cn(
        "relative flex size-8 items-center justify-center border-y border-r border-input bg-input/50 text-sm transition-[color,box-shadow] duration-200 outline-none first:rounded-l-2xl first:border-l last:rounded-r-2xl aria-invalid:border-destructive data-active:z-10 data-active:border-ring data-active:ring-3 data-active:ring-ring/30 data-active:aria-invalid:ring-destructive/20 dark:data-active:aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    >
      {(state) => (
        <>
          {state.char}
          {state.hasFakeCaret && (
            <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
              <div className="h-4 w-px animate-caret-blink bg-foreground duration-1000" />
            </div>
          )}
        </>
      )}
    </OTPInputSlotPrimitive>
  )
}

function InputOTPSeparator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof OTPInputSeparatorPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <OTPInputSeparatorPrimitive
      className={cn("flex items-center [&_svg:not([class*='size-'])]:size-4", className)}
      {...props}
    >
      <MinusIcon aria-hidden="true" />
    </OTPInputSeparatorPrimitive>
  )
}

export { InputOTP, InputOTPGroup, InputOTPSlot, InputOTPSeparator }
export { createOTPInputController } from "@ui-sdk/react/otp-input"
