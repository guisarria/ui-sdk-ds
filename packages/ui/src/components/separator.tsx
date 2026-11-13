"use client"

import * as React from "react"
import { Separator as SeparatorPrimitive } from "@ui-sdk/react/separator"
import { cn } from "cn"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

function Separator({
  className,
  orientation = "horizontal",
  ...props
}: PrimitiveProps<typeof SeparatorPrimitive>) {
  return (
    <SeparatorPrimitive
      orientation={orientation}
      className={cn(
        "shrink-0 bg-border data-[orientation=horizontal]:h-px data-[orientation=horizontal]:w-full data-[orientation=vertical]:w-px data-[orientation=vertical]:self-stretch",
        className,
      )}
      {...props}
    />
  )
}

export { Separator }
