"use client"

import * as React from "react"
import {
  ColorPicker as ColorPickerPrimitive,
  ColorPickerArea as ColorPickerAreaPrimitive,
  ColorPickerAreaCanvas as ColorPickerAreaCanvasPrimitive,
  ColorPickerAreaThumb as ColorPickerAreaThumbPrimitive,
  ColorPickerChannelInput as ColorPickerChannelInputPrimitive,
  ColorPickerEyeDropper as ColorPickerEyeDropperPrimitive,
  ColorPickerInput as ColorPickerInputPrimitive,
  ColorPickerSlider as ColorPickerSliderPrimitive,
  ColorPickerSliderThumb as ColorPickerSliderThumbPrimitive,
  ColorPickerSwatch as ColorPickerSwatchPrimitive,
  ColorPickerSwatchItem as ColorPickerSwatchItemPrimitive,
  ColorPickerSwatches as ColorPickerSwatchesPrimitive,
} from "@ui-sdk/react/color-picker"
import { cn } from "cn"
import { PipetteIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"
import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

const thumbClassName =
  "size-4 -translate-1/2 rounded-full border-2 border-white bg-(--color-picker-color) shadow-md ring-1 ring-black/10 transition-shadow duration-200 outline-none focus-visible:ring-4 focus-visible:ring-ring/30"

const fieldClassName =
  "h-8 min-w-0 rounded-2xl border border-transparent bg-input/50 px-2.5 py-1 text-base transition-[color,box-shadow] duration-200 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 md:text-sm"

function ColorPicker({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ColorPickerPrimitive>, "className"> & { className?: string }) {
  return (
    <ColorPickerPrimitive
      className={cn("flex w-full max-w-64 flex-col gap-3 data-disabled:opacity-50", className)}
      {...props}
    />
  )
}

function ColorPickerArea({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof ColorPickerAreaPrimitive>, "className"> & { className?: string }
>) {
  return (
    <ColorPickerAreaPrimitive
      className={cn(
        "relative h-40 w-full touch-none rounded-xl select-none [background:var(--color-area-background)] data-readonly:pointer-events-none data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      {children ?? <ColorPickerAreaThumb />}
    </ColorPickerAreaPrimitive>
  )
}

function ColorPickerAreaCanvas({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ColorPickerAreaCanvasPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ColorPickerAreaCanvasPrimitive
      className={cn("absolute inset-0 size-full rounded-xl", className)}
      {...props}
    />
  )
}

function ColorPickerAreaThumb({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ColorPickerAreaThumbPrimitive>, "className"> & {
  className?: string
}) {
  return <ColorPickerAreaThumbPrimitive className={cn(thumbClassName, className)} {...props} />
}

function ColorPickerSlider({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof ColorPickerSliderPrimitive>, "className"> & {
    className?: string
  }
>) {
  return (
    <ColorPickerSliderPrimitive
      className={cn(
        "relative h-3 w-full touch-none rounded-full select-none [background:var(--color-slider-background)] data-readonly:pointer-events-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-32 data-[orientation=vertical]:w-3 data-disabled:pointer-events-none",
        className,
      )}
      {...props}
    >
      {children ?? <ColorPickerSliderThumb />}
    </ColorPickerSliderPrimitive>
  )
}

function ColorPickerSliderThumb({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ColorPickerSliderThumbPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ColorPickerSliderThumbPrimitive
      className={cn(
        thumbClassName,
        "data-[orientation=horizontal]:top-1/2 data-[orientation=vertical]:left-1/2",
        className,
      )}
      {...props}
    />
  )
}

function ColorPickerSwatch({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ColorPickerSwatchPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ColorPickerSwatchPrimitive
      className={cn(
        "size-8 shrink-0 rounded-xl bg-(--color-picker-color) ring-1 ring-foreground/10 ring-inset",
        className,
      )}
      {...props}
    />
  )
}

function ColorPickerInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ColorPickerInputPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ColorPickerInputPrimitive className={cn(fieldClassName, "w-full", className)} {...props} />
  )
}

function ColorPickerChannelInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ColorPickerChannelInputPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ColorPickerChannelInputPrimitive
      className={cn(fieldClassName, "w-16 tabular-nums", className)}
      {...props}
    />
  )
}

function ColorPickerEyeDropper({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof ColorPickerEyeDropperPrimitive>, "className"> & {
    className?: string
  }
>) {
  return (
    <ColorPickerEyeDropperPrimitive
      aria-label="Pick a color from the screen"
      className={cn(
        buttonVariants({ variant: "outline", size: "icon" }),
        "data-unsupported:hidden",
        className,
      )}
      {...props}
    >
      {children ?? <PipetteIcon aria-hidden="true" />}
    </ColorPickerEyeDropperPrimitive>
  )
}

function ColorPickerSwatches({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ColorPickerSwatchesPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ColorPickerSwatchesPrimitive className={cn("flex flex-wrap gap-1.5", className)} {...props} />
  )
}

function ColorPickerSwatchItem({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ColorPickerSwatchItemPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ColorPickerSwatchItemPrimitive
      className={cn(
        "size-6 rounded-lg bg-(--color-picker-color) ring-1 ring-foreground/10 outline-none ring-inset focus-visible:ring-3 focus-visible:ring-ring/50 data-selected:ring-2 data-selected:ring-ring data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}

export {
  ColorPicker,
  ColorPickerArea,
  ColorPickerAreaCanvas,
  ColorPickerAreaThumb,
  ColorPickerChannelInput,
  ColorPickerEyeDropper,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSliderThumb,
  ColorPickerSwatch,
  ColorPickerSwatchItem,
  ColorPickerSwatches,
}
export { createColorPickerController } from "@ui-sdk/react/color-picker"
