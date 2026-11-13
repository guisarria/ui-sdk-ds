"use client"

import * as React from "react"
import { Label as LabelPrimitive } from "@ui-sdk/react/label"
import { cn } from "cn"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

const labelClassName =
  "flex items-center gap-2 text-sm leading-none font-medium select-none group-data-disabled:pointer-events-none group-data-disabled:opacity-50 peer-disabled:cursor-not-allowed peer-disabled:opacity-50"

function Label({ className, ...props }: PrimitiveProps<typeof LabelPrimitive>) {
  return <LabelPrimitive className={cn(labelClassName, className)} {...props} />
}

export { Label, labelClassName }
