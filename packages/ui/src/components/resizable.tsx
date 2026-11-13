"use client"

import * as React from "react"
import {
  Resizable as ResizablePrimitive,
  ResizableHandle as ResizableHandlePrimitive,
} from "@ui-sdk/react/resizable"
import { cn } from "cn"

function ResizablePanelGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ResizablePrimitive>, "className"> & { className?: string }) {
  return (
    <ResizablePrimitive
      className={cn("flex size-full data-[orientation=vertical]:flex-col", className)}
      {...props}
    />
  )
}

function ResizableHandle({
  withHandle,
  className,
  ...props
}: Omit<
  Omit<React.ComponentProps<typeof ResizableHandlePrimitive>, "className"> & { className?: string },
  "children"
> & {
  withHandle?: boolean
}) {
  return (
    <ResizableHandlePrimitive
      aria-label="Resize"
      className={cn(
        "relative flex w-px items-center justify-center bg-border ring-offset-background after:absolute after:inset-y-0 after:left-1/2 after:w-1 after:-translate-x-1/2 focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-hidden data-dragging:bg-ring data-hovering:bg-ring data-[orientation=vertical]:h-px data-[orientation=vertical]:w-full data-[orientation=vertical]:*:rotate-90 data-[orientation=vertical]:after:left-0 data-[orientation=vertical]:after:h-1 data-[orientation=vertical]:after:w-full data-[orientation=vertical]:after:translate-x-0 data-[orientation=vertical]:after:-translate-y-1/2",
        className,
      )}
      {...props}
    >
      {withHandle && <div className="z-10 flex h-6 w-1 shrink-0 rounded-lg bg-border" />}
    </ResizableHandlePrimitive>
  )
}

export { ResizableHandle, ResizablePanelGroup }
export {
  ResizablePanel,
  createResizableController,
  resizableStorageKey,
} from "@ui-sdk/react/resizable"
