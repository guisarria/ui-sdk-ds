"use client"

import * as React from "react"
import {
  NumberInput as NumberInputPrimitive,
  NumberInputControl as NumberInputControlPrimitive,
  NumberInputDecrement as NumberInputDecrementPrimitive,
  NumberInputGroup as NumberInputGroupPrimitive,
  NumberInputIncrement as NumberInputIncrementPrimitive,
  NumberInputScrubArea as NumberInputScrubAreaPrimitive,
  NumberInputScrubAreaCursor as NumberInputScrubAreaCursorPrimitive,
} from "@ui-sdk/react/number-input"
import { cn } from "cn"
import { MinusIcon, MoveHorizontalIcon, PlusIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"
import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

const stepClassName = cn(
  buttonVariants({ variant: "ghost", size: "icon-xs" }),
  "size-6 shrink-0 rounded-xl",
)

function NumberInput({
  className,
  children,
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  ...props
}: PrimitiveProps<typeof NumberInputPrimitive>) {
  const named = children === undefined
  return (
    <NumberInputPrimitive
      className={cn("flex w-full flex-col gap-2", className)}
      aria-label={named ? undefined : ariaLabel}
      aria-labelledby={named ? undefined : ariaLabelledBy}
      {...props}
    >
      {children ?? (
        <NumberInputGroup>
          <NumberInputDecrement />
          <NumberInputControl aria-label={ariaLabel} aria-labelledby={ariaLabelledBy} />
          <NumberInputIncrement />
        </NumberInputGroup>
      )}
    </NumberInputPrimitive>
  )
}

function NumberInputGroup({
  className,
  ...props
}: PrimitiveProps<typeof NumberInputGroupPrimitive>) {
  return (
    <NumberInputGroupPrimitive
      className={cn(
        "flex h-8 w-full min-w-0 items-center gap-0.5 rounded-2xl border border-transparent bg-input/50 px-1 transition-[color,box-shadow] duration-200 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40 data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

function NumberInputControl({
  className,
  ...props
}: PrimitiveProps<typeof NumberInputControlPrimitive>) {
  return (
    <NumberInputControlPrimitive
      className={cn(
        "h-full min-w-0 flex-1 bg-transparent px-1.5 text-center text-base tabular-nums outline-none placeholder:text-muted-foreground md:text-sm",
        className,
      )}
      {...props}
    />
  )
}

function NumberInputDecrement({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof NumberInputDecrementPrimitive>>) {
  return (
    <NumberInputDecrementPrimitive
      aria-label="Decrease"
      className={cn(stepClassName, className)}
      {...props}
    >
      {children ?? <MinusIcon aria-hidden="true" />}
    </NumberInputDecrementPrimitive>
  )
}

function NumberInputIncrement({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof NumberInputIncrementPrimitive>>) {
  return (
    <NumberInputIncrementPrimitive
      aria-label="Increase"
      className={cn(stepClassName, className)}
      {...props}
    >
      {children ?? <PlusIcon aria-hidden="true" />}
    </NumberInputIncrementPrimitive>
  )
}

function NumberInputScrubArea({
  className,
  ...props
}: PrimitiveProps<typeof NumberInputScrubAreaPrimitive>) {
  return (
    <NumberInputScrubAreaPrimitive
      className={cn("w-fit cursor-ew-resize text-sm font-medium select-none", className)}
      {...props}
    />
  )
}

function NumberInputScrubAreaCursor({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof NumberInputScrubAreaCursorPrimitive>>) {
  return (
    <NumberInputScrubAreaCursorPrimitive
      className={cn("pointer-events-none text-foreground drop-shadow-sm [&_svg]:size-4", className)}
      {...props}
    >
      {children ?? <MoveHorizontalIcon aria-hidden="true" />}
    </NumberInputScrubAreaCursorPrimitive>
  )
}

export {
  NumberInput,
  NumberInputControl,
  NumberInputDecrement,
  NumberInputGroup,
  NumberInputIncrement,
  NumberInputScrubArea,
  NumberInputScrubAreaCursor,
}
export { createNumberInputController } from "@ui-sdk/react/number-input"
