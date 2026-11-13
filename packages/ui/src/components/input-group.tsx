"use client"

import * as React from "react"
import {
  InputClear as InputClearPrimitive,
  InputGroup as InputGroupPrimitive,
} from "@ui-sdk/react/input"
import { cn } from "cn"
import { XIcon } from "lucide-react"

import { Button } from "@ui-sdk-ds/ui/components/button"
import { Input } from "@ui-sdk-ds/ui/components/input"
import { Textarea } from "@ui-sdk-ds/ui/components/textarea"
import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function InputGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof InputGroupPrimitive>, "className"> & { className?: string }) {
  return (
    <InputGroupPrimitive
      role="group"
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-2xl border border-transparent bg-input/50 transition-[color,box-shadow] duration-200 outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[[data-input-group-control]:focus-visible]:border-ring has-[[data-input-group-control]:focus-visible]:ring-3 has-[[data-input-group-control]:focus-visible]:ring-ring/30 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pr-1.5 has-[>[data-align=inline-start]]:[&>input]:pl-1.5",
        className,
      )}
      {...props}
    />
  )
}

const addonAligns = {
  "inline-start": "order-first pl-2 has-[>button]:ml-[-0.3rem] has-[>kbd]:ml-[-0.15rem]",
  "inline-end": "order-last pr-2 has-[>button]:mr-[-0.3rem] has-[>kbd]:mr-[-0.15rem]",
  "block-start":
    "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
  "block-end":
    "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
}

type InputGroupAddonVariants = {
  align?: keyof typeof addonAligns
}

function inputGroupAddonVariants({ align = "inline-start" }: InputGroupAddonVariants = {}) {
  return cn(
    "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-disabled/input-group:opacity-50 **:data-[slot=kbd]:rounded-2xl **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1.5 [&>svg:not([class*='size-'])]:size-4",
    addonAligns[align],
  )
}

function InputGroupAddon({
  className,
  align = "inline-start",
  ...props
}: React.ComponentProps<"div"> & InputGroupAddonVariants) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={cn(inputGroupAddonVariants({ align }), className)}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest("button")) {
          return
        }
        e.currentTarget.parentElement?.querySelector("input")?.focus()
      }}
      {...props}
    />
  )
}

const buttonSizes = {
  xs: "h-6 gap-1 rounded-xl px-1.5 [&>svg:not([class*='size-'])]:size-3.5",
  sm: "",
  "icon-xs": "size-6 rounded-xl p-0 has-[>svg]:p-0",
  "icon-sm": "size-8 p-0 has-[>svg]:p-0",
}

type InputGroupButtonVariants = {
  size?: keyof typeof buttonSizes
}

function inputGroupButtonVariants({ size = "xs" }: InputGroupButtonVariants = {}) {
  return cn("flex items-center gap-2 rounded-2xl text-sm shadow-none", buttonSizes[size])
}

function InputGroupButton({
  className,
  type = "button",
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size" | "type"> &
  InputGroupButtonVariants & {
    type?: "button" | "submit" | "reset"
  }) {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={cn(inputGroupButtonVariants({ size }), className)}
      {...props}
    />
  )
}

function InputGroupText({ className, ...props }: React.ComponentProps<"span">) {
  return (
    <span
      className={cn(
        "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function InputGroupInput({ className, ...props }: React.ComponentProps<typeof Input>) {
  return (
    <Input
      data-input-group-control=""
      className={cn(
        "flex-1 rounded-none border-0 bg-transparent shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  )
}

function InputGroupTextarea({ className, ...props }: React.ComponentProps<typeof Textarea>) {
  return (
    <Textarea
      data-input-group-control=""
      className={cn(
        "flex-1 resize-none rounded-none border-0 bg-transparent py-2 shadow-none ring-0 focus-visible:ring-0 aria-invalid:ring-0 dark:bg-transparent",
        className,
      )}
      {...props}
    />
  )
}

function InputGroupClear({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof InputClearPrimitive>, "className"> & { className?: string }
>) {
  return (
    <InputGroupAddon align="inline-end">
      <InputClearPrimitive
        aria-label="Clear"
        className={cn(
          "inline-flex size-6 items-center justify-center rounded-xl text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 [&_svg:not([class*='size-'])]:size-3.5",
          className,
        )}
        {...props}
      >
        {children ?? <XIcon />}
      </InputClearPrimitive>
    </InputGroupAddon>
  )
}

export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
  InputGroupClear,
}
export type { InputGroupAddonVariants, InputGroupButtonVariants }
