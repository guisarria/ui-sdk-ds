"use client"

import * as React from "react"
import {
  Command as CommandPrimitive,
  CommandEmpty as CommandEmptyPrimitive,
  CommandGroup as CommandGroupPrimitive,
  CommandGroupLabel as CommandGroupLabelPrimitive,
  CommandInput as CommandInputPrimitive,
  CommandItem as CommandItemPrimitive,
  CommandList as CommandListPrimitive,
  CommandSeparator as CommandSeparatorPrimitive,
  CommandShortcut as CommandShortcutPrimitive,
  CommandItemIcon as CommandItemIconPrimitive,
  CommandStatus as CommandStatusPrimitive,
} from "@ui-sdk/react/command"
import { cn } from "cn"
import { SearchIcon, CheckIcon } from "lucide-react"

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@ui-sdk-ds/ui/components/dialog"
import { InputGroup, InputGroupAddon } from "@ui-sdk-ds/ui/components/input-group"
import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"
import type { CommandData, CommandDataItem } from "@ui-sdk/react/command"

function Command({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CommandPrimitive>, "className"> & { className?: string }) {
  return (
    <CommandPrimitive
      className={cn(
        "flex size-full flex-col overflow-hidden rounded-3xl bg-popover p-1 text-popover-foreground",
        className,
      )}
      {...props}
    />
  )
}

function CommandDialog({
  title = "Command Palette",
  description = "Search for a command to run...",
  children,
  className,
  showCloseButton = false,
  ...props
}: Omit<React.ComponentProps<typeof Dialog>, "children"> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
  children: React.ReactNode
}) {
  return (
    <Dialog {...props}>
      <DialogContent
        className={cn("top-1/3 mt-0 translate-y-0 overflow-hidden rounded-3xl! p-0", className)}
        showCloseButton={showCloseButton}
      >
        <DialogHeader className="sr-only">
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  )
}

function CommandInput({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CommandInputPrimitive>, "className"> & { className?: string }) {
  return (
    <div data-slot="command-input-wrapper" className="p-1 pb-0">
      <InputGroup className="h-8! bg-input/50">
        <CommandInputPrimitive
          aria-label={props.placeholder}
          className={cn(
            "w-full bg-transparent px-2.5 text-sm outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
            className,
          )}
          {...props}
        />
        <InputGroupAddon>
          <SearchIcon aria-hidden="true" className="size-4 shrink-0 opacity-50" />
        </InputGroupAddon>
      </InputGroup>
    </div>
  )
}

function CommandList({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CommandListPrimitive>, "className"> & { className?: string }) {
  return (
    <CommandListPrimitive
      className={cn(
        "no-scrollbar max-h-72 scroll-py-1 overflow-x-hidden overflow-y-auto outline-none",
        className,
      )}
      {...props}
    />
  )
}

function CommandEmpty({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CommandEmptyPrimitive>, "className"> & { className?: string }) {
  return <CommandEmptyPrimitive className={cn("py-6 text-center text-sm", className)} {...props} />
}

function CommandGroup({
  className,
  heading,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof CommandGroupPrimitive>, "className"> & { className?: string }
> & {
  heading?: React.ReactNode
}) {
  return (
    <CommandGroupPrimitive
      className={cn("overflow-hidden p-1 text-foreground", className)}
      {...props}
    >
      {heading && (
        <CommandGroupLabelPrimitive className="px-2 py-1.5 text-xs font-medium text-muted-foreground">
          {heading}
        </CommandGroupLabelPrimitive>
      )}
      {children}
    </CommandGroupPrimitive>
  )
}

function CommandSeparator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CommandSeparatorPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <CommandSeparatorPrimitive className={cn("my-1 h-px bg-border/50", className)} {...props} />
  )
}

function CommandItem({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof CommandItemPrimitive>, "className"> & { className?: string }
>) {
  return (
    <CommandItemPrimitive
      className={cn(
        "group/command-item relative flex min-h-7 cursor-default items-center gap-2 rounded-xl px-2 py-1.5 text-sm outline-hidden select-none in-data-[slot=dialog-content]:rounded-2xl data-highlighted:bg-muted data-highlighted:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 data-highlighted:*:[svg]:text-foreground",
        className,
      )}
      {...props}
    >
      {children}
      <CheckIcon
        aria-hidden="true"
        className="ml-auto opacity-0 group-has-data-[slot=command-shortcut]/command-item:hidden group-data-[checked=true]/command-item:opacity-100"
      />
    </CommandItemPrimitive>
  )
}

function CommandShortcut({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CommandShortcutPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <CommandShortcutPrimitive
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground group-data-highlighted/command-item:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

function CommandItemIcon({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CommandItemIconPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <CommandItemIconPrimitive
      className={cn("flex size-4 shrink-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

function CommandStatus({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CommandStatusPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <CommandStatusPrimitive
      className={cn("px-3 py-2 text-xs text-muted-foreground empty:hidden", className)}
      {...props}
    />
  )
}

function CommandItems({ items }: { items: CommandData }) {
  return items.map((entry, index) => {
    if (typeof entry !== "string" && "type" in entry) {
      if (entry.type === "separator") return <CommandSeparator key={`separator-${index}`} />
      return (
        <CommandGroup key={entry.label ?? `group-${index}`} heading={entry.label}>
          <CommandItems items={entry.items} />
        </CommandGroup>
      )
    }
    const command: CommandDataItem =
      typeof entry === "string" ? { value: entry, label: entry } : entry
    return (
      <CommandItem
        key={command.value}
        value={command.value}
        label={command.label}
        keywords={command.keywords}
        disabled={command.disabled}
        shortcut={command.shortcut}
      >
        {command.label}
        {command.shortcut ? <CommandShortcut /> : null}
      </CommandItem>
    )
  })
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
  CommandItemIcon,
  CommandItems,
  CommandStatus,
}
export { CommandPage, createCommandController } from "@ui-sdk/react/command"
export type { CommandData, CommandDataItem } from "@ui-sdk/react/command"
