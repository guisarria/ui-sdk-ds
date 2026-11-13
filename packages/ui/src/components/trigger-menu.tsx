"use client"

import * as React from "react"
import {
  TriggerMenuContent as TriggerMenuContentPrimitive,
  TriggerMenuEmpty as TriggerMenuEmptyPrimitive,
  TriggerMenuGroup as TriggerMenuGroupPrimitive,
  TriggerMenuGroupLabel as TriggerMenuGroupLabelPrimitive,
  TriggerMenuHint as TriggerMenuHintPrimitive,
  TriggerMenuInput as TriggerMenuInputPrimitive,
  TriggerMenuItem as TriggerMenuItemPrimitive,
  TriggerMenuItemIcon as TriggerMenuItemIconPrimitive,
  TriggerMenuList as TriggerMenuListPrimitive,
  TriggerMenuSeparator as TriggerMenuSeparatorPrimitive,
  TriggerMenuStatus as TriggerMenuStatusPrimitive,
} from "@ui-sdk/react/trigger-menu"
import { useFieldControl } from "@ui-sdk/react/field"
import { cn } from "cn"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

function TriggerMenuInput({
  className,
  ...props
}: PrimitiveProps<typeof TriggerMenuInputPrimitive>) {
  const field = useFieldControl()
  const input = {
    name: field?.name,
    ...props,
    className: cn(
      "w-full min-w-0 rounded-2xl border border-transparent bg-input/50 px-2.5 py-1.5 text-base transition-[color,box-shadow] duration-200 outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm",
      className,
    ),
  }
  return <TriggerMenuInputPrimitive {...(field ? field.props(input) : input)} />
}

function TriggerMenuContent({
  className,
  sideOffset = 6,
  align = "start",
  ...props
}: PrimitiveProps<typeof TriggerMenuContentPrimitive>) {
  return (
    <TriggerMenuContentPrimitive
      sideOffset={sideOffset}
      align={align}
      className={cn(
        "group/trigger-menu-content max-h-(--available-height) w-64 max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale] duration-100 [--list-height:var(--available-height)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[trigger=/]:font-mono motion-reduce:transition-none dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

function TriggerMenuList({ className, ...props }: PrimitiveProps<typeof TriggerMenuListPrimitive>) {
  return (
    <TriggerMenuListPrimitive
      className={cn(
        "no-scrollbar max-h-[min(--spacing(72),var(--list-height))] scroll-py-1 overflow-y-auto overscroll-contain p-1 aria-busy:opacity-60",
        className,
      )}
      {...props}
    />
  )
}

function TriggerMenuItem({ className, ...props }: PrimitiveProps<typeof TriggerMenuItemPrimitive>) {
  return (
    <TriggerMenuItemPrimitive
      className={cn(
        "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-xl px-2 py-1.5 text-sm outline-hidden select-none in-data-has-icons:not-data-has-icon:ps-8 data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function TriggerMenuItemIcon({
  className,
  ...props
}: PrimitiveProps<typeof TriggerMenuItemIconPrimitive>) {
  return (
    <TriggerMenuItemIconPrimitive
      className={cn("flex size-4 shrink-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

function TriggerMenuGroup({
  className,
  ...props
}: PrimitiveProps<typeof TriggerMenuGroupPrimitive>) {
  return <TriggerMenuGroupPrimitive className={cn(className)} {...props} />
}

function TriggerMenuGroupLabel({
  className,
  ...props
}: PrimitiveProps<typeof TriggerMenuGroupLabelPrimitive>) {
  return (
    <TriggerMenuGroupLabelPrimitive
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function TriggerMenuEmpty({
  className,
  ...props
}: PrimitiveProps<typeof TriggerMenuEmptyPrimitive>) {
  return (
    <TriggerMenuEmptyPrimitive
      className={cn(
        "flex w-full justify-center py-2 text-center text-sm text-muted-foreground empty:hidden",
        className,
      )}
      {...props}
    />
  )
}

function TriggerMenuStatus({
  className,
  ...props
}: PrimitiveProps<typeof TriggerMenuStatusPrimitive>) {
  return (
    <TriggerMenuStatusPrimitive
      className={cn("px-2 py-1.5 text-sm text-muted-foreground empty:hidden", className)}
      {...props}
    />
  )
}

function TriggerMenuHint({ className, ...props }: PrimitiveProps<typeof TriggerMenuHintPrimitive>) {
  return (
    <TriggerMenuHintPrimitive
      className={cn("pointer-events-none text-muted-foreground/70", className)}
      {...props}
    />
  )
}

function TriggerMenuSeparator({
  className,
  ...props
}: PrimitiveProps<typeof TriggerMenuSeparatorPrimitive>) {
  return (
    <TriggerMenuSeparatorPrimitive
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  TriggerMenuContent,
  TriggerMenuEmpty,
  TriggerMenuGroup,
  TriggerMenuGroupLabel,
  TriggerMenuHint,
  TriggerMenuInput,
  TriggerMenuItem,
  TriggerMenuItemIcon,
  TriggerMenuList,
  TriggerMenuSeparator,
  TriggerMenuStatus,
}
export {
  TriggerMenu,
  TriggerMenuItems,
  createTriggerMenuController,
  textFieldAdapter,
} from "@ui-sdk/react/trigger-menu"
