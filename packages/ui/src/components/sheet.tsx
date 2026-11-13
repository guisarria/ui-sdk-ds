"use client"

import * as React from "react"
import {
  DialogBackdrop as SheetPrimitiveBackdrop,
  DialogClose as SheetPrimitiveClose,
  DialogContent as SheetPrimitiveContent,
  DialogDescription as SheetPrimitiveDescription,
  DialogTitle as SheetPrimitiveTitle,
  DialogShortcut as DialogShortcutPrimitive,
} from "@ui-sdk/react/dialog"
import { cn } from "cn"
import { kbdClassName } from "@ui-sdk-ds/ui/components/kbd"

import { Button } from "@ui-sdk-ds/ui/components/button"
import { XIcon } from "lucide-react"
import type { PrimitiveProps, WithNodeChildren, RenderProps } from "@ui-sdk-ds/ui/lib/parts"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"

function SheetOverlay({ className, ...props }: PrimitiveProps<typeof SheetPrimitiveBackdrop>) {
  return (
    <SheetPrimitiveBackdrop
      className={cn(
        "fixed inset-0 bg-black/30 transition-opacity duration-150 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  )
}

function SheetContent({
  className,
  children,
  side = "right",
  showCloseButton = true,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof SheetPrimitiveContent>> & {
  side?: "top" | "right" | "bottom" | "left"
  showCloseButton?: boolean
}) {
  return (
    <>
      <SheetOverlay />
      <SheetPrimitiveContent
        data-side={side}
        className={cn(
          "fixed m-0 flex flex-col bg-popover bg-clip-padding text-sm text-popover-foreground shadow-xl transition duration-200 ease-in-out data-ending-style:opacity-0 data-starting-style:opacity-0 data-[side=bottom]:inset-x-0 data-[side=bottom]:top-auto data-[side=bottom]:bottom-0 data-[side=bottom]:h-auto data-[side=bottom]:border-t data-[side=bottom]:data-ending-style:translate-y-10 data-[side=bottom]:data-starting-style:translate-y-10 data-[side=left]:inset-y-0 data-[side=left]:right-auto data-[side=left]:left-0 data-[side=left]:h-full data-[side=left]:w-3/4 data-[side=left]:border-r data-[side=left]:data-ending-style:-translate-x-10 data-[side=left]:data-starting-style:-translate-x-10 data-[side=right]:inset-y-0 data-[side=right]:right-0 data-[side=right]:left-auto data-[side=right]:h-full data-[side=right]:w-3/4 data-[side=right]:border-l data-[side=right]:data-ending-style:translate-x-10 data-[side=right]:data-starting-style:translate-x-10 data-[side=top]:inset-x-0 data-[side=top]:top-0 data-[side=top]:bottom-auto data-[side=top]:h-auto data-[side=top]:border-b data-[side=top]:data-ending-style:-translate-y-10 data-[side=top]:data-starting-style:-translate-y-10 data-[side=left]:sm:max-w-sm data-[side=right]:sm:max-w-sm",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <SheetPrimitiveClose
            render={
              <Button
                variant="ghost"
                className="absolute end-4 top-4 bg-secondary"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </SheetPrimitiveClose>
        )}
      </SheetPrimitiveContent>
    </>
  )
}

function SheetHeader({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "sheet-header", className: cn("flex flex-col gap-1.5 p-6", className) },
      props,
    ),
    render,
  )
}

function SheetFooter({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "sheet-footer", className: cn("mt-auto flex flex-col gap-2 p-6", className) },
      props,
    ),
    render,
  )
}

function SheetTitle({ className, ...props }: PrimitiveProps<typeof SheetPrimitiveTitle>) {
  return (
    <SheetPrimitiveTitle
      className={cn("font-heading text-base font-medium text-foreground", className)}
      {...props}
    />
  )
}

function SheetDescription({
  className,
  ...props
}: PrimitiveProps<typeof SheetPrimitiveDescription>) {
  return (
    <SheetPrimitiveDescription
      className={cn("text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function SheetShortcut({ className, ...props }: PrimitiveProps<typeof DialogShortcutPrimitive>) {
  return <DialogShortcutPrimitive className={cn(kbdClassName, className)} {...props} />
}

export { SheetContent, SheetHeader, SheetFooter, SheetTitle, SheetDescription, SheetShortcut }
export {
  Dialog as Sheet,
  DialogClose as SheetClose,
  DialogTrigger as SheetTrigger,
  createDialogController,
} from "@ui-sdk/react/dialog"
