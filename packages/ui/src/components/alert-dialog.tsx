"use client"

import * as React from "react"
import {
  AlertDialogBackdrop as AlertDialogPrimitiveBackdrop,
  AlertDialogClose as AlertDialogPrimitiveClose,
  AlertDialogContent as AlertDialogPrimitiveContent,
  AlertDialogDescription as AlertDialogPrimitiveDescription,
  AlertDialogTitle as AlertDialogPrimitiveTitle,
  AlertDialogShortcut as AlertDialogShortcutPrimitive,
} from "@ui-sdk/react/alert-dialog"
import { cn } from "cn"
import { kbdClassName } from "@ui-sdk-ds/ui/components/kbd"

import { Button } from "@ui-sdk-ds/ui/components/button"

function AlertDialogPortal({ children }: { children?: React.ReactNode }) {
  return children
}

function AlertDialogOverlay({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AlertDialogPrimitiveBackdrop>, "className"> & {
  className?: string
}) {
  return (
    <AlertDialogPrimitiveBackdrop
      className={cn(
        "fixed inset-0 isolate bg-black/30 transition-opacity duration-100 data-ending-style:opacity-0 data-starting-style:opacity-0 supports-backdrop-filter:backdrop-blur-sm motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogContent({
  className,
  size = "default",
  ...props
}: Omit<React.ComponentProps<typeof AlertDialogPrimitiveContent>, "className"> & {
  className?: string
} & {
  size?: "default" | "sm"
}) {
  return (
    <>
      <AlertDialogOverlay />
      <AlertDialogPrimitiveContent
        data-size={size}
        className={cn(
          "group/alert-dialog-content fixed inset-0 m-auto grid h-fit max-h-[calc(100%-2rem)] w-full gap-6 rounded-[min(var(--radius-4xl),24px)] bg-popover p-6 text-popover-foreground shadow-xl ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-100 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[size=default]:max-w-xs data-[size=sm]:max-w-xs motion-reduce:transition-none data-[size=default]:sm:max-w-md dark:ring-foreground/10",
          className,
        )}
        {...props}
      />
    </>
  )
}

function AlertDialogHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn(
        "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-left sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn(
        "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogMedia({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="alert-dialog-media"
      className={cn(
        "mb-2 inline-flex size-16 items-center justify-center rounded-full bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AlertDialogPrimitiveTitle>, "className"> & {
  className?: string
}) {
  return (
    <AlertDialogPrimitiveTitle
      className={cn(
        "font-heading text-lg font-medium sm:group-data-[size=default]/alert-dialog-content:group-has-data-[slot=alert-dialog-media]/alert-dialog-content:col-start-2",
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AlertDialogPrimitiveDescription>, "className"> & {
  className?: string
}) {
  return (
    <AlertDialogPrimitiveDescription
      className={cn(
        "text-sm text-balance text-muted-foreground md:text-pretty *:[a]:underline *:[a]:underline-offset-3 *:[a]:hover:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

function AlertDialogAction({
  className,
  variant = "default",
  size = "default",
  ...props
}: Omit<React.ComponentProps<typeof AlertDialogPrimitiveClose>, "className"> & {
  className?: string
} & Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitiveClose
      value="confirm"
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

function AlertDialogCancel({
  className,
  variant = "outline",
  size = "default",
  ...props
}: Omit<React.ComponentProps<typeof AlertDialogPrimitiveClose>, "className"> & {
  className?: string
} & Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitiveClose
      className={cn(className)}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

function AlertDialogShortcut({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AlertDialogShortcutPrimitive>, "className"> & {
  className?: string
}) {
  return <AlertDialogShortcutPrimitive className={cn(kbdClassName, className)} {...props} />
}

export {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogShortcut,
}
export {
  AlertDialog,
  AlertDialogTrigger,
  confirm,
  createAlertDialogController,
  createConfirm,
} from "@ui-sdk/react/alert-dialog"
