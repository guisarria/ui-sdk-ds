"use client"

import * as React from "react"
import {
  AutocompleteClear as AutocompleteClearPrimitive,
  AutocompleteContent as AutocompleteContentPrimitive,
  AutocompleteEmpty as AutocompleteEmptyPrimitive,
  AutocompleteGroup as AutocompleteGroupPrimitive,
  AutocompleteGroupLabel as AutocompleteGroupLabelPrimitive,
  AutocompleteInput as AutocompleteInputPrimitive,
  AutocompleteItem as AutocompleteItemPrimitive,
  AutocompleteItemIcon as AutocompleteItemIconPrimitive,
  AutocompleteItemText as AutocompleteItemTextPrimitive,
  AutocompleteLabel as AutocompleteLabelPrimitive,
  AutocompleteList as AutocompleteListPrimitive,
  AutocompleteSeparator as AutocompleteSeparatorPrimitive,
  AutocompleteStatus as AutocompleteStatusPrimitive,
  AutocompleteTrigger as AutocompleteTriggerPrimitive,
} from "@ui-sdk/react/autocomplete"
import { cn } from "cn"
import { ChevronDownIcon, XIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"
import { InputGroup, InputGroupAddon } from "@ui-sdk-ds/ui/components/input-group"
import { labelClassName } from "@ui-sdk-ds/ui/components/label"
import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

const iconButtonClassName = cn(
  buttonVariants({ variant: "ghost", size: "icon-xs" }),
  "size-6 rounded-xl p-0",
)

function AutocompleteLabel({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteLabelPrimitive>, "className"> & {
  className?: string
}) {
  return <AutocompleteLabelPrimitive className={cn(labelClassName, className)} {...props} />
}

function AutocompleteTrigger({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof AutocompleteTriggerPrimitive>, "className"> & {
    className?: string
  }
>) {
  return (
    <AutocompleteTriggerPrimitive
      aria-label="Show suggestions"
      className={cn(iconButtonClassName, className)}
      {...props}
    >
      {children ?? <ChevronDownIcon aria-hidden="true" className="text-muted-foreground" />}
    </AutocompleteTriggerPrimitive>
  )
}

function AutocompleteClear({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof AutocompleteClearPrimitive>, "className"> & {
    className?: string
  }
>) {
  return (
    <AutocompleteClearPrimitive
      aria-label="Clear"
      className={cn(iconButtonClassName, className)}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </AutocompleteClearPrimitive>
  )
}

function AutocompleteInput({
  className,
  children,
  showTrigger = false,
  showClear = false,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteInputPrimitive>, "className"> & {
  className?: string
} & {
  children?: React.ReactNode
  showTrigger?: boolean
  showClear?: boolean
}) {
  return (
    <InputGroup className={cn("w-auto", className)}>
      <AutocompleteInputPrimitive
        data-input-group-control=""
        className="h-8 w-full min-w-0 flex-1 rounded-none border-0 bg-transparent px-2.5 py-1 text-base shadow-none outline-none placeholder:text-muted-foreground disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        {...props}
      />
      {(showTrigger || showClear) && (
        <InputGroupAddon align="inline-end">
          {showClear && <AutocompleteClear />}
          {showTrigger && <AutocompleteTrigger />}
        </InputGroupAddon>
      )}
      {children}
    </InputGroup>
  )
}

function AutocompleteContent({
  className,
  sideOffset = 6,
  align = "start",
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteContentPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <AutocompleteContentPrimitive
      sideOffset={sideOffset}
      align={align}
      className={cn(
        "group/autocomplete-content max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale] duration-100 [--list-height:var(--available-height)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 motion-reduce:transition-none dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

function AutocompleteList({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteListPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <AutocompleteListPrimitive
      className={cn(
        "no-scrollbar max-h-[min(--spacing(72),var(--list-height))] scroll-py-1 overflow-y-auto overscroll-contain p-1 empty:hidden",
        className,
      )}
      {...props}
    />
  )
}

function AutocompleteItem({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteItemPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <AutocompleteItemPrimitive
      className={cn(
        "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-xl px-2 py-1.5 text-sm outline-hidden select-none group-data-has-icons/autocomplete-content:not-data-has-icon:ps-8 data-highlighted:bg-accent data-highlighted:text-accent-foreground group-data-[modality=keyboard]/autocomplete-content:data-highlighted:ring-2 group-data-[modality=keyboard]/autocomplete-content:data-highlighted:ring-ring/50 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function AutocompleteItemText({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteItemTextPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <AutocompleteItemTextPrimitive
      className={cn(
        "truncate [&_mark]:bg-transparent [&_mark]:font-semibold [&_mark]:text-foreground",
        className,
      )}
      {...props}
    />
  )
}

function AutocompleteItemIcon({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteItemIconPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <AutocompleteItemIconPrimitive
      className={cn("flex size-4 shrink-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

function AutocompleteGroup({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteGroupPrimitive>, "className"> & {
  className?: string
}) {
  return <AutocompleteGroupPrimitive className={cn(className)} {...props} />
}

function AutocompleteGroupLabel({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteGroupLabelPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <AutocompleteGroupLabelPrimitive
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function AutocompleteEmpty({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteEmptyPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <AutocompleteEmptyPrimitive
      className={cn(
        "flex w-full justify-center py-2 text-center text-sm text-muted-foreground empty:hidden",
        className,
      )}
      {...props}
    />
  )
}

function AutocompleteStatus({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteStatusPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <AutocompleteStatusPrimitive
      className={cn("px-2 py-1.5 text-sm text-muted-foreground empty:hidden", className)}
      {...props}
    />
  )
}

function AutocompleteSeparator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof AutocompleteSeparatorPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <AutocompleteSeparatorPrimitive
      className={cn("-mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

export {
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteGroup,
  AutocompleteGroupLabel,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteItemIcon,
  AutocompleteItemText,
  AutocompleteLabel,
  AutocompleteList,
  AutocompleteSeparator,
  AutocompleteStatus,
  AutocompleteTrigger,
}
export {
  Autocomplete,
  AutocompleteArrow,
  AutocompleteItems,
  createAutocompleteController,
} from "@ui-sdk/react/autocomplete"
