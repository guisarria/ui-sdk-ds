"use client"

import * as React from "react"
import {
  MenuCheckboxItem as MenuPrimitiveMenuCheckboxItem,
  MenuItemIndicator as MenuPrimitiveMenuItemIndicator,
  MenuRadioItem as MenuPrimitiveMenuRadioItem,
} from "@ui-sdk/react/menu"
import { Menubar as MenubarPrimitive } from "@ui-sdk/react/menubar"
import { cn } from "cn"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@ui-sdk-ds/ui/components/dropdown-menu"
import { CheckIcon } from "lucide-react"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function Menubar({ className, ...props }: PrimitiveProps<typeof MenubarPrimitive>) {
  return (
    <MenubarPrimitive
      className={cn("flex h-8 items-center rounded-2xl border p-0.75", className)}
      {...props}
    />
  )
}

function MenubarMenu({ ...props }: React.ComponentProps<typeof DropdownMenu>) {
  return <DropdownMenu {...props} />
}

function MenubarGroup({ ...props }: React.ComponentProps<typeof DropdownMenuGroup>) {
  return <DropdownMenuGroup {...props} />
}

function MenubarTrigger({ className, ...props }: React.ComponentProps<typeof DropdownMenuTrigger>) {
  return (
    <DropdownMenuTrigger
      className={cn(
        "flex items-center rounded-2xl px-1.5 py-0.5 text-sm font-medium outline-hidden select-none hover:bg-muted data-open:bg-muted",
        className,
      )}
      {...props}
    />
  )
}

function MenubarContent({
  className,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <DropdownMenuContent
      align={align}
      alignOffset={alignOffset}
      sideOffset={sideOffset}
      className={cn(
        "min-w-36 rounded-2xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=bottom]:data-starting-style:-translate-y-2 data-[side=end]:data-starting-style:-translate-x-2 data-[side=left]:data-starting-style:translate-x-2 data-[side=right]:data-starting-style:-translate-x-2 data-[side=start]:data-starting-style:translate-x-2 data-[side=top]:data-starting-style:translate-y-2 motion-reduce:transition-none rtl:data-[side=end]:data-starting-style:translate-x-2 rtl:data-[side=start]:data-starting-style:-translate-x-2 dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

function MenubarItem({
  className,
  inset,
  variant = "default",
  ...props
}: React.ComponentProps<typeof DropdownMenuItem>) {
  return (
    <DropdownMenuItem
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/menubar-item min-h-7 gap-2 rounded-xl px-2 py-1.5 text-sm data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive!",
        className,
      )}
      {...props}
    />
  )
}

function MenubarCheckboxItem({
  className,
  children,
  checked,
  value,
  inset,
  ...props
}: Omit<PrimitiveProps<typeof MenuPrimitiveMenuCheckboxItem>, "value" | "children"> & {
  inset?: boolean
  value?: string
  children?: React.ReactNode
}) {
  const generatedValue = React.useId()
  return (
    <MenuPrimitiveMenuCheckboxItem
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-xl py-1.5 ps-7 pe-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0",
        className,
      )}
      value={value ?? generatedValue}
      checked={checked}
      {...props}
    >
      <span className="pointer-events-none absolute inset-e-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
        <MenuPrimitiveMenuItemIndicator>
          <CheckIcon />
        </MenuPrimitiveMenuItemIndicator>
      </span>
      {children}
    </MenuPrimitiveMenuCheckboxItem>
  )
}

function MenubarRadioGroup({ ...props }: React.ComponentProps<typeof DropdownMenuRadioGroup>) {
  return <DropdownMenuRadioGroup {...props} />
}

function MenubarRadioItem({
  className,
  children,
  inset,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof MenuPrimitiveMenuRadioItem>> & {
  inset?: boolean
}) {
  return (
    <MenuPrimitiveMenuRadioItem
      data-inset={inset}
      className={cn(
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-xl py-1.5 ps-7 pe-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span className="pointer-events-none absolute inset-e-1.5 flex size-4 items-center justify-center [&_svg:not([class*='size-'])]:size-4">
        <MenuPrimitiveMenuItemIndicator>
          <CheckIcon />
        </MenuPrimitiveMenuItemIndicator>
      </span>
      {children}
    </MenuPrimitiveMenuRadioItem>
  )
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuLabel> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuLabel
      data-inset={inset}
      className={cn("px-2 py-1 text-sm text-muted-foreground data-inset:ps-7", className)}
      {...props}
    />
  )
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSeparator>) {
  return (
    <DropdownMenuSeparator className={cn("-mx-1 my-1 h-px bg-border/50", className)} {...props} />
  )
}

function MenubarShortcut({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuShortcut>) {
  return (
    <DropdownMenuShortcut
      className={cn(
        "ms-auto text-xs tracking-widest text-muted-foreground group-data-highlighted/menubar-item:text-accent-foreground",
        className,
      )}
      {...props}
    />
  )
}

function MenubarSub({ ...props }: React.ComponentProps<typeof DropdownMenuSub>) {
  return <DropdownMenuSub {...props} />
}

function MenubarSubTrigger({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubTrigger> & {
  inset?: boolean
}) {
  return (
    <DropdownMenuSubTrigger
      data-inset={inset}
      className={cn(
        "min-h-7 gap-2 rounded-xl px-2 py-1.5 text-sm data-highlighted:bg-accent data-highlighted:text-accent-foreground data-inset:ps-7 data-open:bg-accent data-open:text-accent-foreground [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuSubContent>) {
  return (
    <DropdownMenuSubContent
      className={cn(
        "min-w-32 rounded-2xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=bottom]:data-starting-style:-translate-y-2 data-[side=left]:data-starting-style:translate-x-2 data-[side=right]:data-starting-style:-translate-x-2 data-[side=top]:data-starting-style:translate-y-2 motion-reduce:transition-none dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarGroup,
  MenubarSeparator,
  MenubarLabel,
  MenubarItem,
  MenubarShortcut,
  MenubarCheckboxItem,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSub,
  MenubarSubTrigger,
  MenubarSubContent,
}
export { createMenubarController } from "@ui-sdk/react/menubar"
export {
  DropdownMenuItemIcon as MenubarItemIcon,
  DropdownMenuItems as MenubarItems,
} from "@ui-sdk-ds/ui/components/dropdown-menu"
