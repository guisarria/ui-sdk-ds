"use client"

import * as React from "react"
import {
  Select as SelectPrimitive,
  SelectContent as SelectContentPrimitive,
  SelectGroup as SelectGroupPrimitive,
  SelectGroupLabel as SelectGroupLabelPrimitive,
  SelectItem as SelectItemPrimitive,
  SelectItemIndicator as SelectItemIndicatorPrimitive,
  SelectItemText as SelectItemTextPrimitive,
  SelectSeparator as SelectSeparatorPrimitive,
  SelectTrigger as SelectTriggerPrimitive,
  SelectValue as SelectValuePrimitive,
  SelectClear as SelectClearPrimitive,
  SelectEmpty as SelectEmptyPrimitive,
  SelectInput as SelectInputPrimitive,
  SelectItemIcon as SelectItemIconPrimitive,
  SelectList as SelectListPrimitive,
  SelectSelectAll as SelectSelectAllPrimitive,
  SelectStatus as SelectStatusPrimitive,
} from "@ui-sdk/react/select"
import { cn } from "cn"
import { CheckIcon, ChevronDownIcon, SearchIcon, XIcon } from "lucide-react"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"
import type { ListData, SelectProps } from "@ui-sdk/react/select"

// With `items`, ui-sdk only recognizes a SelectContent that is the select's own child, so ours is swapped for the primitive here.
function Select<T = string, Multiple extends boolean | undefined = false>(
  props: SelectProps<T, Multiple>,
) {
  return (
    <SelectPrimitive<T, Multiple> {...props}>
      {React.Children.map(props.children, (child) =>
        React.isValidElement<PrimitiveProps<typeof SelectContentPrimitive>>(child) &&
        child.type === SelectContent ? (
          <SelectContentPrimitive key={child.key} {...selectContentProps(child.props)} />
        ) : (
          child
        ),
      )}
    </SelectPrimitive>
  )
}

function SelectGroup({ className, ...props }: PrimitiveProps<typeof SelectGroupPrimitive>) {
  return <SelectGroupPrimitive className={cn("scroll-my-1.5 p-1", className)} {...props} />
}

// oxlint-disable-next-line typescript/no-unnecessary-type-parameters -- the primitive types the value as unknown; this lets callers name it
function SelectValue<Value = unknown>({
  className,
  children,
  ...props
}: Omit<PrimitiveProps<typeof SelectValuePrimitive>, "children"> & {
  children?: React.ReactNode | ((value: Value) => React.ReactNode)
}) {
  return (
    <SelectValuePrimitive className={cn("flex flex-1 text-start", className)} {...props}>
      {typeof children === "function" ? (state) => children(state.value as Value) : children}
    </SelectValuePrimitive>
  )
}

function SelectTrigger({
  className,
  size = "default",
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof SelectTriggerPrimitive>> & {
  children?: React.ReactNode
  size?: "sm" | "default"
}) {
  return (
    <SelectTriggerPrimitive
      data-size={size}
      className={cn(
        "flex w-fit items-center justify-between gap-1.5 rounded-2xl border border-transparent bg-input/50 px-3 py-2 text-sm whitespace-nowrap transition-[color,box-shadow] duration-200 outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 data-placeholder:text-muted-foreground data-[size=default]:h-8 data-[size=sm]:h-7 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-1.5 dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon
        aria-hidden="true"
        className="pointer-events-none size-4 text-muted-foreground"
      />
    </SelectTriggerPrimitive>
  )
}

function selectContentProps({
  className,
  side = "bottom",
  sideOffset = 4,
  align = "center",
  alignOffset = 0,
  alignItemWithTrigger = true,
  ...props
}: PrimitiveProps<typeof SelectContentPrimitive>) {
  return {
    "data-align-trigger": alignItemWithTrigger,
    side,
    sideOffset,
    align,
    alignOffset,
    alignItemWithTrigger,
    className: cn(
      "max-h-(--available-height) w-(--anchor-width) min-w-36 origin-(--transform-origin) overflow-x-hidden overflow-y-auto rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale,translate] duration-100 data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[align-trigger=true]:transition-none data-[side=bottom]:data-starting-style:-translate-y-2 data-[side=end]:data-starting-style:-translate-x-2 data-[side=left]:data-starting-style:translate-x-2 data-[side=right]:data-starting-style:-translate-x-2 data-[side=start]:data-starting-style:translate-x-2 data-[side=top]:data-starting-style:translate-y-2 motion-reduce:transition-none rtl:data-[side=end]:data-starting-style:translate-x-2 rtl:data-[side=start]:data-starting-style:-translate-x-2 dark:ring-foreground/10",
      // ui-sdk slides a sheet with `translate`, so a transition here would lag the drag.
      "data-[presentation=sheet]:max-h-[85dvh] data-[presentation=sheet]:w-full data-[presentation=sheet]:rounded-b-none data-[presentation=sheet]:pb-[env(safe-area-inset-bottom)] data-[presentation=sheet]:transition-none data-[presentation=sheet]:data-ending-style:scale-100 data-[presentation=sheet]:data-ending-style:opacity-100 data-[presentation=sheet]:data-starting-style:scale-100 data-[presentation=sheet]:data-starting-style:opacity-100",
      className,
    ),
    ...props,
  }
}

function SelectContent(props: PrimitiveProps<typeof SelectContentPrimitive>) {
  return <SelectContentPrimitive {...selectContentProps(props)} />
}

function SelectLabel({ className, ...props }: PrimitiveProps<typeof SelectGroupLabelPrimitive>) {
  return (
    <SelectGroupLabelPrimitive
      className={cn("px-2 py-1 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItem({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof SelectItemPrimitive>>) {
  return (
    <SelectItemPrimitive
      className={cn(
        "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <SelectItemTextPrimitive className="flex flex-1 shrink-0 gap-2 whitespace-nowrap">
        {children}
      </SelectItemTextPrimitive>
      <SelectItemIndicatorPrimitive className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
        <CheckIcon className="pointer-events-none" />
      </SelectItemIndicatorPrimitive>
    </SelectItemPrimitive>
  )
}

function SelectSeparator({ className, ...props }: PrimitiveProps<typeof SelectSeparatorPrimitive>) {
  return (
    <SelectSeparatorPrimitive
      className={cn("pointer-events-none -mx-1 my-1 h-px bg-border", className)}
      {...props}
    />
  )
}

function SelectInput({ className, ...props }: PrimitiveProps<typeof SelectInputPrimitive>) {
  return (
    <div
      data-slot="select-input-wrapper"
      className="sticky top-0 z-10 flex items-center gap-2 border-b bg-popover px-2.5 text-muted-foreground"
    >
      <SearchIcon aria-hidden="true" className="size-4 shrink-0 opacity-60" />
      <SelectInputPrimitive
        className={cn(
          "h-9 w-full min-w-0 bg-transparent text-sm text-foreground outline-hidden placeholder:text-muted-foreground disabled:opacity-50",
          className,
        )}
        {...props}
      />
    </div>
  )
}

function SelectList({ className, ...props }: PrimitiveProps<typeof SelectListPrimitive>) {
  return (
    <SelectListPrimitive
      className={cn("scroll-py-1 p-1 outline-none aria-busy:opacity-60", className)}
      {...props}
    />
  )
}

function SelectEmpty({ className, ...props }: PrimitiveProps<typeof SelectEmptyPrimitive>) {
  return (
    <SelectEmptyPrimitive
      className={cn("py-6 text-center text-sm text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectStatus({ className, ...props }: PrimitiveProps<typeof SelectStatusPrimitive>) {
  return (
    <SelectStatusPrimitive
      className={cn("px-2 py-1.5 text-xs text-muted-foreground empty:hidden", className)}
      {...props}
    />
  )
}

function SelectClear({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof SelectClearPrimitive>>) {
  return (
    <SelectClearPrimitive
      aria-label="Clear"
      className={cn(
        "inline-flex size-6 shrink-0 items-center justify-center rounded-xl text-muted-foreground outline-none hover:bg-muted hover:text-foreground focus-visible:ring-3 focus-visible:ring-ring/30 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg:not([class*='size-'])]:size-3.5",
        className,
      )}
      {...props}
    >
      {children ?? <XIcon />}
    </SelectClearPrimitive>
  )
}

function SelectSelectAll({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof SelectSelectAllPrimitive>>) {
  return (
    <SelectSelectAllPrimitive
      className={cn(
        "group/select-all relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-sm font-medium outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children ?? "Select all"}
      <CheckIcon
        aria-hidden="true"
        className="pointer-events-none absolute end-2 size-4 group-data-unchecked/select-all:hidden"
      />
    </SelectSelectAllPrimitive>
  )
}

function SelectItemIcon({ className, ...props }: PrimitiveProps<typeof SelectItemIconPrimitive>) {
  return (
    <SelectItemIconPrimitive
      className={cn("flex size-4 shrink-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

function SelectItems({ items }: { items: ListData<unknown> }) {
  return items.map((item, index) => {
    if (typeof item === "string") {
      return (
        <SelectItem key={item} value={item}>
          {item}
        </SelectItem>
      )
    }
    if ("type" in item && item.type === "separator")
      return <SelectSeparator key={`separator-${index}`} />
    if ("type" in item && item.type === "group") {
      return (
        <SelectGroup key={`group-${index}`}>
          {item.label ? <SelectLabel>{item.label}</SelectLabel> : null}
          <SelectItems items={item.items} />
        </SelectGroup>
      )
    }
    return (
      <SelectItem
        key={typeof item.value === "string" ? item.value : index}
        value={item.value}
        disabled={item.disabled}
        label={item.label}
      >
        {item.label}
      </SelectItem>
    )
  })
}

export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
  SelectClear,
  SelectEmpty,
  SelectInput,
  SelectItemIcon,
  SelectItems,
  SelectList,
  SelectSelectAll,
  SelectStatus,
}
export { SelectValueIcon, createSelectController } from "@ui-sdk/react/select"
export type { ListData as SelectData } from "@ui-sdk/react/select"
