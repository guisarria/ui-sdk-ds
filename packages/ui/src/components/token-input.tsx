"use client"

import * as React from "react"
import {
  TokenInputEditor as TokenInputEditorPrimitive,
  TokenInputToken as TokenInputTokenPrimitive,
  TokenInputTokenRemove as TokenInputTokenRemovePrimitive,
} from "@ui-sdk/react/token-input"
import { cn } from "cn"
import { XIcon } from "lucide-react"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

const tokenClassName =
  "inline-flex items-center gap-0.5 rounded-lg bg-muted px-1.5 align-baseline text-sm font-medium text-foreground data-pending:opacity-60 data-selected:bg-primary data-selected:text-primary-foreground data-unresolved:text-muted-foreground data-unresolved:line-through"

function TokenInputEditor({
  className,
  ...props
}: PrimitiveProps<typeof TokenInputEditorPrimitive>) {
  return (
    <TokenInputEditorPrimitive
      className={cn(
        "min-h-16 w-full min-w-0 rounded-2xl border border-transparent bg-input/50 px-2.5 py-2 text-base wrap-break-word whitespace-pre-wrap transition-[color,box-shadow] duration-200 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 aria-disabled:pointer-events-none aria-disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-empty:before:pointer-events-none data-empty:before:text-muted-foreground data-empty:before:content-[attr(aria-placeholder)] md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        "**:data-[slot=token-input-host]:inline-flex **:data-[slot=token-input-host]:rounded-lg **:data-[slot=token-input-host]:bg-muted **:data-[slot=token-input-host]:px-1.5 **:data-[slot=token-input-host]:font-medium **:data-[slot=token-input-host]:data-selected:bg-primary **:data-[slot=token-input-host]:data-selected:text-primary-foreground",
        className,
      )}
      {...props}
    />
  )
}

function TokenInputToken({ className, ...props }: PrimitiveProps<typeof TokenInputTokenPrimitive>) {
  return <TokenInputTokenPrimitive className={cn(tokenClassName, className)} {...props} />
}

function TokenInputTokenRemove({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof TokenInputTokenRemovePrimitive>>) {
  return (
    <TokenInputTokenRemovePrimitive
      aria-label="Remove"
      className={cn(
        "-me-0.5 inline-flex size-4 items-center justify-center rounded-md opacity-60 outline-none hover:opacity-100 focus-visible:ring-2 focus-visible:ring-ring/50 [&_svg]:size-3",
        className,
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </TokenInputTokenRemovePrimitive>
  )
}

export { TokenInputEditor, TokenInputToken, TokenInputTokenRemove }
export {
  TokenInput,
  createTokenInputController,
  defaultCodec,
  fromText,
  toLabel,
  toText,
} from "@ui-sdk/react/token-input"
export type { TokenInputValue } from "@ui-sdk/react/token-input"
