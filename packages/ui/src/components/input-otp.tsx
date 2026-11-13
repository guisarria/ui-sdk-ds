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
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

function InputOTP({
  className,
  containerClassName,
  ...props
}: PrimitiveProps<typeof OTPInputPrimitive> & { containerClassName?: string }) {
  return (
    <OTPInputPrimitive
      className={cn(
        "group/otp flex items-center data-disabled:cursor-not-allowed data-disabled:opacity-50",
        containerClassName,
        className,
      )}
      {...props}
    />
  )
}

function InputOTPGroup({ className, ...props }: PrimitiveProps<typeof OTPInputGroupPrimitive>) {
  return (
    <OTPInputGroupPrimitive
      className={cn(
        "flex items-center rounded-2xl group-has-aria-invalid/otp:ring-3 group-has-aria-invalid/otp:ring-destructive/20 dark:group-has-aria-invalid/otp:ring-destructive/40",
        className,
      )}
      {...props}
    />
  )
}

function InputOTPSlot({
  className,
  ...props
}: Omit<PrimitiveProps<typeof OTPInputSlotPrimitive>, "children">) {
  return (
    <OTPInputSlotPrimitive
      className={cn(
        "relative flex size-8 items-center justify-center border-y border-e border-input bg-input/50 text-sm transition-[color,box-shadow] duration-200 outline-none group-has-aria-invalid/otp:border-destructive first:rounded-s-2xl first:border-s last:rounded-e-2xl data-active:z-10 data-active:border-ring data-active:ring-3 data-active:ring-ring/30 group-has-aria-invalid/otp:data-active:ring-destructive/20 dark:group-has-aria-invalid/otp:data-active:ring-destructive/40",
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
}: PrimitiveProps<typeof OTPInputSeparatorPrimitive>) {
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
