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
import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function DialogPortal({ children }: { children?: React.ReactNode }) {
  return children
}

function DialogOverlay({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitiveBackdrop>, "className"> & {
  className?: string
}) {
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

function DialogContent({
  className,
  children,
  showCloseButton = true,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof DialogPrimitiveContent>, "className"> & { className?: string }
> & {
  showCloseButton?: boolean
}) {
  return (
    <>
      <DialogOverlay />
      <DialogPrimitiveContent
        className={cn(
          "fixed inset-0 m-auto grid h-fit max-h-[calc(100%-2rem)] w-full max-w-[calc(100%-2rem)] gap-6 rounded-[min(var(--radius-4xl),24px)] bg-popover p-6 text-sm text-popover-foreground shadow-xl ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-100 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none sm:max-w-md dark:ring-foreground/10",
          className,
        )}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitiveClose
            render={
              <Button
                variant="ghost"
                className="absolute top-4 right-4 bg-secondary"
                size="icon-sm"
              />
            }
          >
            <XIcon />
            <span className="sr-only">Close</span>
          </DialogPrimitiveClose>
        )}
      </DialogPrimitiveContent>
    </>
  )
}

function DialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div data-slot="dialog-header" className={cn("flex flex-col gap-1.5", className)} {...props} />
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

function DialogTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DialogPrimitiveTitle>, "className"> & { className?: string }) {
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
}: Omit<React.ComponentProps<typeof DialogPrimitiveDescription>, "className"> & {
  className?: string
}) {
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

function DialogShortcut({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DialogShortcutPrimitive>, "className"> & {
  className?: string
}) {
  return <DialogShortcutPrimitive className={cn(kbdClassName, className)} {...props} />
}

export {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogShortcut,
}
export { Dialog, DialogClose, DialogTrigger, createDialogController } from "@ui-sdk/react/dialog"
