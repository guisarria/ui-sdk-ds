"use client"

import * as React from "react"
import {
  MenuCheckboxItem as MenuPrimitiveMenuCheckboxItem,
  MenuContent as MenuPrimitiveMenuContent,
  MenuGroup as MenuPrimitiveMenuGroup,
  MenuRadioGroup as MenuPrimitiveMenuRadioGroup,
  MenuSub as MenuPrimitiveMenuSub,
  MenuGroupLabel as MenuPrimitiveMenuGroupLabel,
  MenuItem as MenuPrimitiveMenuItem,
  MenuItemIndicator as MenuPrimitiveMenuItemIndicator,
  MenuRadioItem as MenuPrimitiveMenuRadioItem,
  MenuSeparator as MenuPrimitiveMenuSeparator,
  MenuShortcut as MenuPrimitiveMenuShortcut,
  MenuItemIcon as MenuPrimitiveMenuItemIcon,
  MenuSubContent as MenuPrimitiveMenuSubContent,
  MenuSubTrigger as MenuPrimitiveMenuSubTrigger,
} from "@ui-sdk/react/menu"
import { cn } from "cn"
import { ChevronRightIcon, CheckIcon } from "lucide-react"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"
import type { MenuData } from "@ui-sdk/react/menu"

function DropdownMenuContent({
  align = "start",
  alignOffset = 0,
  side = "bottom",
  sideOffset = 4,
  className,
  ...props
}: PrimitiveProps<typeof MenuPrimitiveMenuContent>) {
  return (
    <MenuPrimitiveMenuContent
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      className={cn(
        "max-h-(--available-height) w-(--anchor-width) min-w-32 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-100 outline-none data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=bottom]:data-starting-style:-translate-y-2 data-[side=end]:data-starting-style:-translate-x-2 data-[side=left]:data-starting-style:translate-x-2 data-[side=right]:data-starting-style:-translate-x-2 data-[side=start]:data-starting-style:translate-x-2 data-[side=top]:data-starting-style:translate-y-2 motion-reduce:transition-none rtl:data-[side=end]:data-starting-style:translate-x-2 rtl:data-[side=start]:data-starting-style:-translate-x-2 dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuLabel({
  className,
  inset,
  ...props
}: PrimitiveProps<typeof MenuPrimitiveMenuGroupLabel> & {
  inset?: boolean
}) {
  return (
    <MenuPrimitiveMenuGroupLabel
      data-inset={inset}
      className={cn("px-2 py-1 text-xs text-muted-foreground data-inset:ps-7", className)}
      {...props}
    />
  )
}

function DropdownMenuItem({
  className,
  inset,
  variant = "default",
  ...props
}: PrimitiveProps<typeof MenuPrimitiveMenuItem> & {
  inset?: boolean
  variant?: "default" | "destructive"
}) {
  return (
    <MenuPrimitiveMenuItem
      data-inset={inset}
      data-variant={variant}
      className={cn(
        "group/dropdown-menu-item relative flex min-h-7 cursor-default items-center gap-2 rounded-xl px-2 py-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-7 data-[variant=destructive]:text-destructive data-[variant=destructive]:data-highlighted:bg-destructive/10 data-[variant=destructive]:data-highlighted:text-destructive dark:data-[variant=destructive]:data-highlighted:bg-destructive/20 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-[variant=destructive]:*:[svg]:text-destructive",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuSubTrigger({
  className,
  inset,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof MenuPrimitiveMenuSubTrigger>> & {
  inset?: boolean
}) {
  return (
    <MenuPrimitiveMenuSubTrigger
      data-inset={inset}
      className={cn(
        "flex min-h-7 cursor-default items-center gap-2 rounded-xl px-2 py-1.5 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-inset:ps-7 data-open:bg-accent data-open:text-accent-foreground [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronRightIcon className="ms-auto" />
    </MenuPrimitiveMenuSubTrigger>
  )
}

function DropdownMenuSubContent({
  align = "start",
  alignOffset = -3,
  side = "right",
  sideOffset = 0,
  className,
  ...props
}: React.ComponentProps<typeof DropdownMenuContent>) {
  return (
    <MenuPrimitiveMenuSubContent
      className={cn(
        "w-auto min-w-24 rounded-2xl bg-popover p-1 text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[side=bottom]:data-starting-style:-translate-y-2 data-[side=left]:data-starting-style:translate-x-2 data-[side=right]:data-starting-style:-translate-x-2 data-[side=top]:data-starting-style:translate-y-2 motion-reduce:transition-none dark:ring-foreground/10",
        className,
      )}
      align={align}
      alignOffset={alignOffset}
      side={side}
      sideOffset={sideOffset}
      {...props}
    />
  )
}

function DropdownMenuCheckboxItem({
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
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      value={value ?? generatedValue}
      checked={checked}
      {...props}
    >
      <span
        className="pointer-events-none absolute end-2 flex items-center justify-center"
        data-slot="dropdown-menu-checkbox-item-indicator"
      >
        <MenuPrimitiveMenuItemIndicator>
          <CheckIcon />
        </MenuPrimitiveMenuItemIndicator>
      </span>
      {children}
    </MenuPrimitiveMenuCheckboxItem>
  )
}

function DropdownMenuRadioItem({
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
        "relative flex min-h-7 cursor-default items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-highlighted:**:text-accent-foreground data-inset:ps-7 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      <span
        className="pointer-events-none absolute end-2 flex items-center justify-center"
        data-slot="dropdown-menu-radio-item-indicator"
      >
        <MenuPrimitiveMenuItemIndicator>
          <CheckIcon />
        </MenuPrimitiveMenuItemIndicator>
      </span>
      {children}
    </MenuPrimitiveMenuRadioItem>
  )
}

function DropdownMenuSeparator({
  className,
  ...props
}: PrimitiveProps<typeof MenuPrimitiveMenuSeparator>) {
  return (
    <MenuPrimitiveMenuSeparator
      className={cn("-mx-1 my-1 h-px bg-border/50", className)}
      {...props}
    />
  )
}

function DropdownMenuShortcut({
  className,
  ...props
}: PrimitiveProps<typeof MenuPrimitiveMenuShortcut>) {
  return (
    <MenuPrimitiveMenuShortcut
      className={cn(
        "ms-auto text-xs tracking-widest text-muted-foreground group-data-highlighted/dropdown-menu-item:text-accent-foreground",
        className,
      )}
      {...props}
    />
  )
}

function DropdownMenuItemIcon({
  className,
  ...props
}: PrimitiveProps<typeof MenuPrimitiveMenuItemIcon>) {
  return (
    <MenuPrimitiveMenuItemIcon
      className={cn("flex size-4 shrink-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

function DropdownMenuItems({ items }: { items: MenuData }) {
  return items.map((entry, index) => {
    if (typeof entry === "string") {
      return (
        <DropdownMenuItem key={entry} value={entry}>
          {entry}
        </DropdownMenuItem>
      )
    }
    switch (entry.type) {
      case "separator":
        return <DropdownMenuSeparator key={`separator-${index}`} />
      case "group":
        return (
          <MenuPrimitiveMenuGroup key={entry.label ?? `group-${index}`}>
            {entry.label ? <DropdownMenuLabel>{entry.label}</DropdownMenuLabel> : null}
            <DropdownMenuItems items={entry.items} />
          </MenuPrimitiveMenuGroup>
        )
      case "checkbox":
        return (
          <DropdownMenuCheckboxItem
            key={entry.value}
            value={entry.value}
            checked={entry.checked}
            defaultChecked={entry.defaultChecked}
            disabled={entry.disabled}
            closeOnSelect={entry.closeOnSelect}
          >
            {entry.label}
          </DropdownMenuCheckboxItem>
        )
      case "radio-group":
        return (
          <MenuPrimitiveMenuGroup key={entry.name}>
            {entry.label ? <DropdownMenuLabel>{entry.label}</DropdownMenuLabel> : null}
            <MenuPrimitiveMenuRadioGroup
              name={entry.name}
              value={entry.value}
              defaultValue={entry.defaultValue}
            >
              {entry.items.map((item) => (
                <DropdownMenuRadioItem key={item.value} value={item.value} disabled={item.disabled}>
                  {item.label}
                </DropdownMenuRadioItem>
              ))}
            </MenuPrimitiveMenuRadioGroup>
          </MenuPrimitiveMenuGroup>
        )
      case "submenu":
        return (
          <MenuPrimitiveMenuSub key={`submenu-${index}`}>
            <DropdownMenuSubTrigger disabled={entry.disabled}>{entry.label}</DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              <DropdownMenuItems items={entry.items} />
            </DropdownMenuSubContent>
          </MenuPrimitiveMenuSub>
        )
      default:
        return (
          <DropdownMenuItem
            key={entry.value}
            value={entry.value}
            label={entry.label}
            disabled={entry.disabled}
            shortcut={entry.shortcut}
            closeOnSelect={entry.closeOnSelect}
            variant={entry.destructive ? "destructive" : "default"}
          >
            {entry.label}
            {entry.shortcut ? <DropdownMenuShortcut /> : null}
          </DropdownMenuItem>
        )
    }
  })
}

export {
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSubTrigger,
  DropdownMenuSubContent,
  DropdownMenuItemIcon,
  DropdownMenuItems,
}
export {
  Menu as DropdownMenu,
  MenuGroup as DropdownMenuGroup,
  MenuRadioGroup as DropdownMenuRadioGroup,
  MenuSub as DropdownMenuSub,
  MenuTrigger as DropdownMenuTrigger,
  createMenuController,
} from "@ui-sdk/react/menu"
export type { MenuData } from "@ui-sdk/react/menu"
