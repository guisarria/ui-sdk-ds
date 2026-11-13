import * as React from "react"
import {
  InputClear as InputClearPrimitive,
  InputGroup as InputGroupPrimitive,
  Input as InputPrimitive,
} from "@ui-sdk/react/input"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import { cn } from "cn"
import { XIcon } from "lucide-react"

import { Button } from "@ui-sdk-ds/ui/components/button"
import type { PrimitiveProps, RenderProps } from "@ui-sdk-ds/ui/lib/parts"

const inputClassName = cn(
  "h-8 w-full min-w-0 rounded-2xl border border-transparent bg-input/50 px-2.5 py-1 text-base transition-[color,box-shadow] duration-200 outline-none file:inline-flex file:h-6 file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
  "in-data-[slot=input-group]:flex-1 in-data-[slot=input-group]:rounded-none in-data-[slot=input-group]:border-0 in-data-[slot=input-group]:bg-transparent in-data-[slot=input-group]:shadow-none in-data-[slot=input-group]:ring-0 in-data-[slot=input-group]:focus-visible:ring-0 in-data-[slot=input-group]:aria-invalid:ring-0 in-data-[slot=input-group]:dark:bg-transparent",
)

function Input({ className, ...props }: PrimitiveProps<typeof InputPrimitive>) {
  return <InputPrimitive className={cn(inputClassName, className)} {...props} />
}

function InputGroup({ className, ...props }: PrimitiveProps<typeof InputGroupPrimitive>) {
  return (
    <InputGroupPrimitive
      className={cn(
        "group/input-group relative flex h-8 w-full min-w-0 items-center rounded-2xl border border-transparent bg-input/50 transition-[color,box-shadow] duration-200 outline-none in-data-[slot=combobox-content]:focus-within:border-inherit in-data-[slot=combobox-content]:focus-within:ring-0 has-[:is(input,textarea):focus-visible]:border-ring has-[:is(input,textarea):focus-visible]:ring-3 has-[:is(input,textarea):focus-visible]:ring-ring/30 has-[[data-slot][aria-invalid=true]]:border-destructive has-[[data-slot][aria-invalid=true]]:ring-3 has-[[data-slot][aria-invalid=true]]:ring-destructive/20 has-[>[data-align=block-end]]:h-auto has-[>[data-align=block-end]]:flex-col has-[>[data-align=block-start]]:h-auto has-[>[data-align=block-start]]:flex-col has-[>textarea]:h-auto dark:has-[[data-slot][aria-invalid=true]]:ring-destructive/40 has-[>[data-align=block-end]]:[&>input]:pt-3 has-[>[data-align=block-start]]:[&>input]:pb-3 has-[>[data-align=inline-end]]:[&>input]:pe-1.5 has-[>[data-align=inline-start]]:[&>input]:ps-1.5",
        className,
      )}
      {...props}
    />
  )
}

function InputClear({ className, children, ...props }: PrimitiveProps<typeof InputClearPrimitive>) {
  return (
    <InputClearPrimitive
      aria-label="Clear"
      className={cn(
        "me-1 inline-flex size-6 shrink-0 items-center justify-center rounded-xl text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </InputClearPrimitive>
  )
}

const addonAligns = {
  "inline-start": "order-first ps-2 has-[>button]:ms-[-0.3rem] has-[>kbd]:ms-[-0.15rem]",
  "inline-end": "order-last pe-2 has-[>button]:me-[-0.3rem] has-[>kbd]:me-[-0.15rem]",
  "block-start":
    "order-first w-full justify-start px-2.5 pt-2 group-has-[>input]/input-group:pt-2 [.border-b]:pb-2",
  "block-end":
    "order-last w-full justify-start px-2.5 pb-2 group-has-[>input]/input-group:pb-2 [.border-t]:pt-2",
}

type InputGroupAddonVariants = {
  align?: keyof typeof addonAligns
}

function InputGroupAddon({
  className,
  align = "inline-start",
  render,
  ...props
}: RenderProps<"div"> & InputGroupAddonVariants) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "input-group-addon",
        "data-align": align,
        className: cn(
          "flex h-auto cursor-text items-center justify-center gap-2 py-1.5 text-sm font-medium text-muted-foreground select-none group-data-disabled/input-group:opacity-50 **:data-[slot=kbd]:rounded-2xl **:data-[slot=kbd]:bg-muted-foreground/10 **:data-[slot=kbd]:px-1.5 [&>svg:not([class*='size-'])]:size-4",
          addonAligns[align],
          className,
        ),
      },
      props,
    ),
    render,
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

function InputGroupButton({
  className,
  variant = "ghost",
  size = "xs",
  ...props
}: Omit<React.ComponentProps<typeof Button>, "size"> & InputGroupButtonVariants) {
  return (
    <Button
      data-size={size}
      variant={variant}
      className={cn(
        "flex items-center gap-2 rounded-2xl text-sm shadow-none",
        buttonSizes[size],
        className,
      )}
      {...props}
    />
  )
}

function InputGroupText({ className, render, ...props }: RenderProps<"span">) {
  return renderElement(
    "span",
    mergeProps(
      {
        className: cn(
          "flex items-center gap-2 text-sm text-muted-foreground [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

export {
  Input,
  InputClear,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  inputClassName,
}
export type { InputGroupAddonVariants, InputGroupButtonVariants }
export { createInputController } from "@ui-sdk/react/input"
