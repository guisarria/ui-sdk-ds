"use client"

import * as React from "react"
import {
  FileInputDropzone as FileInputDropzonePrimitive,
  FileInputItem as FileInputItemPrimitive,
  FileInputItemRemove as FileInputItemRemovePrimitive,
  FileInputList as FileInputListPrimitive,
  FileInputTrigger as FileInputTriggerPrimitive,
} from "@ui-sdk/react/file-input"
import { cn } from "cn"
import { XIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"
import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function FileInputTrigger({
  className,
  variant = "outline",
  size = "sm",
  ...props
}: Omit<React.ComponentProps<typeof FileInputTriggerPrimitive>, "className"> & {
  className?: string
} & Parameters<typeof buttonVariants>[0]) {
  return (
    <FileInputTriggerPrimitive
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
}

function FileInputDropzone({
  className,
  ...props
}: Omit<React.ComponentProps<typeof FileInputDropzonePrimitive>, "className"> & {
  className?: string
}) {
  return (
    <FileInputDropzonePrimitive
      className={cn(
        "flex flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-input p-6 text-center text-sm text-muted-foreground transition-colors outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 data-drag-accept:border-primary data-drag-accept:bg-primary/5 data-drag-reject:border-destructive data-drag-reject:bg-destructive/5 data-dragging:bg-muted",
        className,
      )}
      {...props}
    />
  )
}

function FileInputList({
  className,
  ...props
}: Omit<React.ComponentProps<typeof FileInputListPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <FileInputListPrimitive
      className={cn("flex flex-col gap-1.5 empty:hidden", className)}
      {...props}
    />
  )
}

function FileInputItem({
  className,
  ...props
}: Omit<React.ComponentProps<typeof FileInputItemPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <FileInputItemPrimitive
      className={cn(
        "flex min-h-9 items-center gap-2 rounded-xl border px-3 py-1.5 text-sm [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function FileInputItemRemove({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof FileInputItemRemovePrimitive>, "className"> & {
    className?: string
  }
>) {
  return (
    <FileInputItemRemovePrimitive
      aria-label="Remove file"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-xs" }),
        "ms-auto size-6 rounded-xl",
        className,
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </FileInputItemRemovePrimitive>
  )
}

export { FileInputDropzone, FileInputItem, FileInputItemRemove, FileInputList, FileInputTrigger }
export {
  FileInput,
  formatFileSize,
  createFileInputController,
  relativePath,
} from "@ui-sdk/react/file-input"
