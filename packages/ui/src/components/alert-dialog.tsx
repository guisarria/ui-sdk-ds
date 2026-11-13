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
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import { cn } from "cn"

import { Button } from "@ui-sdk-ds/ui/components/button"
import { kbdClassName } from "@ui-sdk-ds/ui/components/kbd"
import type { PrimitiveProps, RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function AlertDialogOverlay({
  className,
  ...props
}: PrimitiveProps<typeof AlertDialogPrimitiveBackdrop>) {
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

function AlertDialogContent<Payload = unknown>({
  className,
  size = "default",
  ...props
}: PrimitiveProps<typeof AlertDialogPrimitiveContent<Payload>> & {
  size?: "default" | "sm"
}) {
  return (
    <>
      <AlertDialogOverlay />
      <AlertDialogPrimitiveContent<Payload>
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

function AlertDialogHeader({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "alert-dialog-header",
        className: cn(
          "grid grid-rows-[auto_1fr] place-items-center gap-1.5 text-center has-data-[slot=alert-dialog-media]:grid-rows-[auto_auto_1fr] has-data-[slot=alert-dialog-media]:gap-x-6 sm:group-data-[size=default]/alert-dialog-content:place-items-start sm:group-data-[size=default]/alert-dialog-content:text-start sm:group-data-[size=default]/alert-dialog-content:has-data-[slot=alert-dialog-media]:grid-rows-[auto_1fr]",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function AlertDialogFooter({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "alert-dialog-footer",
        className: cn(
          "flex flex-col-reverse gap-2 group-data-[size=sm]/alert-dialog-content:grid group-data-[size=sm]/alert-dialog-content:grid-cols-2 sm:flex-row sm:justify-end",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function AlertDialogMedia({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "alert-dialog-media",
        className: cn(
          "mb-2 inline-flex size-16 items-center justify-center rounded-full bg-muted sm:group-data-[size=default]/alert-dialog-content:row-span-2 *:[svg:not([class*='size-'])]:size-8",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function AlertDialogTitle({
  className,
  ...props
}: PrimitiveProps<typeof AlertDialogPrimitiveTitle>) {
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
}: PrimitiveProps<typeof AlertDialogPrimitiveDescription>) {
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
}: PrimitiveProps<typeof AlertDialogPrimitiveClose> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitiveClose
      value="confirm"
      className={className}
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
}: PrimitiveProps<typeof AlertDialogPrimitiveClose> &
  Pick<React.ComponentProps<typeof Button>, "variant" | "size">) {
  return (
    <AlertDialogPrimitiveClose
      className={className}
      render={<Button variant={variant} size={size} />}
      {...props}
    />
  )
}

function AlertDialogShortcut({
  className,
  ...props
}: PrimitiveProps<typeof AlertDialogShortcutPrimitive>) {
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
  AlertDialogTitle,
  AlertDialogShortcut,
}
export {
  AlertDialog,
  AlertDialogTrigger,
  confirm,
  createAlertDialogController,
  createConfirm,
  type ConfirmOptions,
} from "@ui-sdk/react/alert-dialog"
