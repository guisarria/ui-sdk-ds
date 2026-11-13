"use client"

import * as React from "react"
import {
  MenuCheckboxItem as ContextMenuPrimitiveMenuCheckboxItem,
  MenuContent as ContextMenuPrimitiveMenuContent,
  MenuContextTrigger as ContextMenuPrimitiveMenuContextTrigger,
  MenuGroupLabel as ContextMenuPrimitiveMenuGroupLabel,
  MenuItem as ContextMenuPrimitiveMenuItem,
  MenuItemIndicator as ContextMenuPrimitiveMenuItemIndicator,
  MenuRadioItem as ContextMenuPrimitiveMenuRadioItem,
  MenuSeparator as ContextMenuPrimitiveMenuSeparator,
  MenuShortcut as ContextMenuPrimitiveMenuShortcut,
  MenuItemIcon as ContextMenuPrimitiveMenuItemIcon,
  MenuSubContent as ContextMenuPrimitiveMenuSubContent,
  MenuSubTrigger as ContextMenuPrimitiveMenuSubTrigger,
} from "@ui-sdk/react/menu"
import { cn } from "cn"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function ContextMenuTrigger({
  className,
  ...props
}: PrimitiveProps<typeof ContextMenuPrimitiveMenuContextTrigger>) {
  return (
    <ContextMenuPrimitiveMenuContextTrigger className={cn("select-none", className)} {...props} />
  )
}

function ContextMenuContent({
  className,
  align = "start",
  alignOffset = 4,
  side = "right",
  sideOffset = 0,
  ...props
}: PrimitiveProps<typeof ContextMenuPrimitiveMenuContent>) {
  return (
    <ContextMenuPrimitiveMenuContent
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        "max-h-(--available-height) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-100 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=bottom]:data-starting-style:-translate-y-2 data-[side=end]:data-starting-style:-translate-x-2 data-[side=left]:data-starting-style:translate-x-2 data-[side=right]:data-starting-style:-translate-x-2 data-[side=start]:data-starting-style:translate-x-2 data-[side=top]:data-starting-style:translate-y-2 motion-reduce:transition-none rtl:data-[side=end]:data-starting-style:translate-x-2 rtl:data-[side=start]:data-starting-style:-translate-x-2 dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: PrimitiveProps<typeof ContextMenuPrimitiveMenuGroupLabel> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitiveMenuGroupLabel
      data-inset={inset}
      className={cn("px-2 py-1 text-xs text-muted-foreground data-inset:ps-7", className)}
      {...props}
    />
  )
}

function ContextMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: PrimitiveProps<typeof ContextMenuPrimitiveMenuItem> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <ContextMenuPrimitiveMenuItem
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/context-menu-item relative flex min-h-7 cursor-default items-center gap-2 rounded-xl px-2 py-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-highlighted:*:[svg]:text-accent-foreground data-[variant=destructive]:*:[svg]:text-destructive",
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof ContextMenuPrimitiveMenuSubTrigger>> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitiveMenuSubTrigger
      data-inset={inset}
      className={cn(
        "flex min-h-7 cursor-default items-center rounded-xl px-2 py-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto" />
    </ContextMenuPrimitiveMenuSubTrigger>
  )
}

function ContextMenuSubContent({
  className,
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  ...props
}: PrimitiveProps<typeof ContextMenuPrimitiveMenuSubContent>) {
  return (
    <ContextMenuPrimitiveMenuSubContent
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        "max-h-(--available-height) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-100 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=bottom]:data-starting-style:-translate-y-2 data-[side=end]:data-starting-style:-translate-x-2 data-[side=left]:data-starting-style:translate-x-2 data-[side=right]:data-starting-style:-translate-x-2 data-[side=start]:data-starting-style:translate-x-2 data-[side=top]:data-starting-style:translate-y-2 motion-reduce:transition-none rtl:data-[side=end]:data-starting-style:translate-x-2 rtl:data-[side=start]:data-starting-style:-translate-x-2 dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuCheckboxItem({
  className,
  children,
  checked,
  value,
  inset,
  ...props
}: Omit<PrimitiveProps<typeof ContextMenuPrimitiveMenuCheckboxItem>, "value" | "children"> & {
  inset?: boolean
  value?: string
  children?: React.ReactNode
}) {
  const generatedValue = React.useId()
  return (
    <ContextMenuPrimitiveMenuCheckboxItem
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      value={value ?? generatedValue}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute end-2">
        <ContextMenuPrimitiveMenuItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitiveMenuItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitiveMenuCheckboxItem>
  )
}

function ContextMenuRadioItem({
  className,
  children,
  inset,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof ContextMenuPrimitiveMenuRadioItem>> & {
  inset?: boolean
}) {
  return (
    <ContextMenuPrimitiveMenuRadioItem
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute end-2">
        <ContextMenuPrimitiveMenuItemIndicator>
          <CheckIcon />
        </ContextMenuPrimitiveMenuItemIndicator>
      </span>
      {children}
    </ContextMenuPrimitiveMenuRadioItem>
  )
}

function ContextMenuSeparator({
  className,
  ...props
}: PrimitiveProps<typeof ContextMenuPrimitiveMenuSeparator>) {
  return (
    <ContextMenuPrimitiveMenuSeparator
      className={cn("-mx-1 my-1 h-px bg-border/50", className)}
      {...props}
    />
  )
}

function ContextMenuShortcut({
  className,
  ...props
}: PrimitiveProps<typeof ContextMenuPrimitiveMenuShortcut>) {
  return (
    <ContextMenuPrimitiveMenuShortcut
      className={cn(
        "ms-auto text-xs tracking-widest text-muted-foreground group-data-highlighted/context-menu-item:text-accent-foreground",
        className,
      )}
      {...props}
    />
  )
}

function ContextMenuItemIcon({
  className,
  ...props
}: PrimitiveProps<typeof ContextMenuPrimitiveMenuItemIcon>) {
  return (
    <ContextMenuPrimitiveMenuItemIcon
      className={cn("flex size-4 shrink-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

export {
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuItemIcon,
}
export {
  Menu as ContextMenu,
  MenuGroup as ContextMenuGroup,
  MenuRadioGroup as ContextMenuRadioGroup,
  MenuSub as ContextMenuSub,
  createMenuController,
} from "@ui-sdk/react/menu"
export { DropdownMenuItems as ContextMenuItems } from "@ui-sdk-ds/ui/components/dropdown-menu"
