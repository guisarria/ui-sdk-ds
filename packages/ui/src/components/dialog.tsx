"use client"

import * as React from "react"
import {
  DialogBackdrop as DialogPrimitiveBackdrop,
  DialogClose as DialogPrimitiveClose,
  DialogContent as DialogPrimitiveContent,
  DialogDescription as DialogPrimitiveDescription,
  DialogTitle as DialogPrimitiveTitle,
  DialogShortcut as DialogShortcutPrimitive,
} from "@ui-sdk/react/dialog"
import { cn } from "cn"
import { kbdClassName } from "@ui-sdk-ds/ui/components/kbd"

import { Button } from "@ui-sdk-ds/ui/components/button"
import { XIcon } from "lucide-react"
import type { PrimitiveProps, RenderProps } from "@ui-sdk-ds/ui/lib/parts"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"

function DialogOverlay({ className, ...props }: PrimitiveProps<typeof DialogPrimitiveBackdrop>) {
  return (
    <DialogPrimitiveBackdrop
      className={cn(
        "fixed inset-0 isolate bg-black/30 transition-opacity duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-sm motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

function DialogContent<Payload = unknown>({
  className,
  children,
  showCloseButton = true,
  ...props
}: PrimitiveProps<typeof DialogPrimitiveContent<Payload>> & {
  showCloseButton?: boolean
}) {
  const closeButton = showCloseButton ? (
    <DialogPrimitiveClose
      render={<Button variant="ghost" className="absolute inset-e-4 top-4 bg-secondary" size="icon-sm" />}
    >
      <XIcon />
      <span className="sr-only">Close</span>
    </DialogPrimitiveClose>
  ) : null

  return (
    <>
      <DialogOverlay />
      <DialogPrimitiveContent<Payload>
        className={cn(
          "fixed inset-0 m-auto grid h-fit max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] gap-6 rounded-[min(var(--radius-4xl),24px)] bg-popover p-6 text-sm text-popover-foreground shadow-xl ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-100 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none sm:max-w-md dark:ring-foreground/10",
          className,
        )}
        {...props}
      >
        {typeof children === "function" ? (
          (state) => (
            <>
              {children(state)}
              {closeButton}
            </>
          )
        ) : (
          <>
            {children}
            {closeButton}
          </>
        )}
      </DialogPrimitiveContent>
    </>
  )
}

function DialogHeader({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "dialog-header", className: cn("flex flex-col gap-1.5", className) },
      props,
    ),
    render,
  )
}

function DialogFooter({
  className,
  showCloseButton = false,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  showCloseButton?: boolean
}) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    >
      {children}
      {showCloseButton && (
        <DialogPrimitiveClose render={<Button variant="outline" />}>Close</DialogPrimitiveClose>
      )}
    </div>
  )
}

function DialogTitle({ className, ...props }: PrimitiveProps<typeof DialogPrimitiveTitle>) {
  return (
    <DialogPrimitiveTitle
      className={cn("font-heading text-base leading-none font-medium", className)}
      {...props}
    />
  )
}

function DialogDescription({
  className,
  ...props
}: PrimitiveProps<typeof DialogPrimitiveDescription>) {
  return (
    <DialogPrimitiveDescription
      className={cn(
        "text-sm text-muted-foreground *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

function DialogShortcut({ className, ...props }: PrimitiveProps<typeof DialogShortcutPrimitive>) {
  return <DialogShortcutPrimitive className={cn(kbdClassName, className)} {...props} />
}

export {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
  DialogShortcut,
}
export { Dialog, DialogClose, DialogTrigger, createDialogController } from "@ui-sdk/react/dialog"
