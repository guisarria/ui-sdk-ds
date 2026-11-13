"use client"

import * as React from "react"
import {
  Slider as SliderPrimitive,
  SliderControl as SliderControlPrimitive,
  SliderIndicator as SliderIndicatorPrimitive,
  SliderThumb as SliderThumbPrimitive,
  SliderTrack as SliderTrackPrimitive,
  SliderValue as SliderValuePrimitive,
} from "@ui-sdk/react/slider"
import { cn } from "cn"
import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function Slider({
  className,
  defaultValue,
  value,
  min = 0,
  max = 100,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof SliderPrimitive>>) {
  const _values = Array.isArray(value)
    ? value
    : Array.isArray(defaultValue)
      ? defaultValue
      : typeof (value ?? defaultValue) === "number"
        ? [value ?? defaultValue]
        : [min, max]

  return (
    <SliderPrimitive
      className={cn(
        "data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full",
        className,
      )}
      defaultValue={defaultValue}
      value={value}
      min={min}
      max={max}
      {...props}
    >
      {children}
      <SliderControlPrimitive className="relative flex w-full touch-none items-center py-1.5 select-none data-[orientation=vertical]:h-full data-[orientation=vertical]:min-h-40 data-[orientation=vertical]:w-auto data-[orientation=vertical]:flex-col data-[orientation=vertical]:px-1.5 data-[orientation=vertical]:py-0 data-disabled:opacity-50">
        <SliderTrackPrimitive className="relative grow rounded-2xl bg-input/90 select-none data-[orientation=horizontal]:h-1 data-[orientation=horizontal]:w-full data-[orientation=vertical]:h-full data-[orientation=vertical]:w-1">
          <SliderIndicatorPrimitive className="rounded-2xl bg-primary select-none data-[orientation=horizontal]:h-full data-[orientation=vertical]:w-full" />
          {_values.map((_, index) => (
            <SliderThumbPrimitive
              key={index}
              index={index}
              className="block size-4 shrink-0 rounded-2xl bg-white bg-clip-padding shadow-md ring-1 ring-black/10 transition-[color,box-shadow] duration-200 select-none hover:ring-4 hover:ring-ring/30 has-focus-visible:ring-4 has-focus-visible:ring-ring/30 dark:bg-clip-border data-disabled:pointer-events-none data-disabled:opacity-50"
            />
          ))}
        </SliderTrackPrimitive>
      </SliderControlPrimitive>
    </SliderPrimitive>
  )
}

function SliderValue({ className, ...props }: PrimitiveProps<typeof SliderValuePrimitive>) {
  return (
    <SliderValuePrimitive
      className={cn("text-sm text-muted-foreground tabular-nums", className)}
      {...props}
    />
  )
}

export { Slider, SliderValue }
export { createSliderController } from "@ui-sdk/react/slider"
