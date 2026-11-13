"use client"

import * as React from "react"
import {
  Combobox as ComboboxPrimitive,
  ComboboxChip as ComboboxChipPrimitive,
  ComboboxChipRemove as ComboboxChipRemovePrimitive,
  ComboboxChips as ComboboxChipsPrimitive,
  ComboboxClear as ComboboxClearPrimitive,
  ComboboxContent as ComboboxContentPrimitive,
  ComboboxEmpty as ComboboxEmptyPrimitive,
  ComboboxGroup as ComboboxGroupPrimitive,
  ComboboxGroupLabel as ComboboxGroupLabelPrimitive,
  ComboboxInput as ComboboxInputPrimitive,
  ComboboxItem as ComboboxItemPrimitive,
  ComboboxItemIndicator as ComboboxItemIndicatorPrimitive,
  ComboboxList as ComboboxListPrimitive,
  ComboboxSeparator as ComboboxSeparatorPrimitive,
  ComboboxTrigger as ComboboxTriggerPrimitive,
  ComboboxValue as ComboboxValuePrimitive,
  type ComboboxContentState,
  type ListData,
  ComboboxChipsOverflow as ComboboxChipsOverflowPrimitive,
  ComboboxCreate as ComboboxCreatePrimitive,
  ComboboxItemIcon as ComboboxItemIconPrimitive,
  ComboboxSelectAll as ComboboxSelectAllPrimitive,
  ComboboxStatus as ComboboxStatusPrimitive,
} from "@ui-sdk/react/combobox"
import { cn } from "cn"
import { ChevronDownIcon, XIcon, CheckIcon, PlusIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"
import { inputClassName } from "@ui-sdk-ds/ui/components/input"
import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

const Combobox = ComboboxPrimitive

const iconButtonClassName = cn(
  buttonVariants({ variant: "ghost", size: "icon-xs" }),
  "size-6 rounded-xl p-0 in-data-[slot=input-group]:me-1",
)

// oxlint-disable-next-line typescript/no-unnecessary-type-parameters -- the primitive types the value as unknown; this lets callers name it
function ComboboxValue<Value = unknown>({
  children,
  ...props
}: Omit<React.ComponentProps<typeof ComboboxValuePrimitive>, "children"> & {
  children?: React.ReactNode | ((value: Value) => React.ReactNode)
}) {
  return (
    <ComboboxValuePrimitive {...props}>
      {typeof children === "function" ? (state) => children(state.value as Value) : children}
    </ComboboxValuePrimitive>
  )
}

function ComboboxTrigger({
  className,
  children,
  ...props
}: PrimitiveProps<typeof ComboboxTriggerPrimitive>) {
  return (
    <ComboboxTriggerPrimitive
      aria-label="Show options"
      className={cn(
        iconButtonClassName,
        "group-has-data-[slot=combobox-clear]/input-group:hidden",
        className,
      )}
      {...props}
    >
      {children ?? <ChevronDownIcon aria-hidden="true" className="text-muted-foreground" />}
    </ComboboxTriggerPrimitive>
  )
}

function ComboboxClear({
  className,
  children,
  ...props
}: PrimitiveProps<typeof ComboboxClearPrimitive>) {
  return (
    <ComboboxClearPrimitive
      aria-label="Clear"
      className={cn(iconButtonClassName, className)}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ComboboxClearPrimitive>
  )
}

function ComboboxInput({ className, ...props }: PrimitiveProps<typeof ComboboxInputPrimitive>) {
  return (
    <ComboboxInputPrimitive
      className={cn(
        inputClassName,
        "in-data-[slot=combobox-chips]:h-auto in-data-[slot=combobox-chips]:w-auto in-data-[slot=combobox-chips]:min-w-16 in-data-[slot=combobox-chips]:flex-1 in-data-[slot=combobox-chips]:rounded-none in-data-[slot=combobox-chips]:border-0 in-data-[slot=combobox-chips]:bg-transparent in-data-[slot=combobox-chips]:p-0 in-data-[slot=combobox-chips]:ring-0 in-data-[slot=combobox-chips]:focus-visible:ring-0",
        className,
      )}
      {...props}
    />
  )
}

function ComboboxContent({
  className,
  side = "bottom",
  sideOffset = 6,
  align = "start",
  alignOffset = 0,
  anchor,
  ...props
}: Omit<PrimitiveProps<typeof ComboboxContentPrimitive>, "anchor"> & {
  anchor?:
    | React.ComponentProps<typeof ComboboxContentPrimitive>["anchor"]
    | React.RefObject<HTMLElement | null>
}) {
  const resolvedAnchor = React.useMemo(
    () =>
      anchor && typeof anchor === "object" && "current" in anchor
        ? {
            getBoundingClientRect: () => anchor.current?.getBoundingClientRect() ?? new DOMRect(),
          }
        : anchor,
    [anchor],
  )

  return (
    <ComboboxContentPrimitive
      data-chips={!!anchor}
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      anchor={resolvedAnchor}
      className={cn(
        "group/combobox-content max-h-(--available-height) w-(--anchor-width) max-w-(--available-width) min-w-[calc(var(--anchor-width)+(--spacing(7)))] origin-(--transform-origin) overflow-hidden rounded-2xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale] duration-100 [--list-height:var(--available-height)] data-ending-style:scale-95 data-ending-style:opacity-0 data-starting-style:scale-95 data-starting-style:opacity-0 data-[chips=true]:min-w-(--anchor-width) *:data-[slot=input-group]:m-1 *:data-[slot=input-group]:mb-0 *:data-[slot=input-group]:h-8 *:data-[slot=input-group]:border-input/30 *:data-[slot=input-group]:bg-input/50 *:data-[slot=input-group]:shadow-none motion-reduce:transition-none dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

// oxlint-disable-next-line typescript/no-unnecessary-type-parameters -- the primitive types items loosely; this lets callers name them
function ComboboxList<Item = ComboboxContentState["items"][number]>({
  className,
  children,
  ...props
}: Omit<PrimitiveProps<typeof ComboboxListPrimitive>, "children"> & {
  children?: React.ReactNode | ((item: Item, index: number) => React.ReactNode)
}) {
  return (
    <ComboboxListPrimitive
      className={cn(
        "no-scrollbar max-h-[min(calc(--spacing(72)-(--spacing(9))),calc(var(--list-height)-(--spacing(9))))] scroll-py-1 overflow-y-auto overscroll-contain p-1",
        className,
      )}
      {...props}
    >
      {typeof children === "function"
        ? (state) => <>{(state.items as Array<Item>).map(children)}</>
        : children}
    </ComboboxListPrimitive>
  )
}

function ComboboxItem({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof ComboboxItemPrimitive>>) {
  return (
    <ComboboxItemPrimitive
      className={cn(
        "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground not-data-[variant=destructive]:data-highlighted:**:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ComboboxItemIndicatorPrimitive className="pointer-events-none absolute end-2 flex size-4 items-center justify-center">
        <CheckIcon aria-hidden="true" className="pointer-events-none" />
      </ComboboxItemIndicatorPrimitive>
    </ComboboxItemPrimitive>
  )
}

function ComboboxGroup({ className, ...props }: PrimitiveProps<typeof ComboboxGroupPrimitive>) {
  return <ComboboxGroupPrimitive className={cn(className)} {...props} />
}

function ComboboxLabel({
  className,
  ...props
}: PrimitiveProps<typeof ComboboxGroupLabelPrimitive>) {
  return (
    <ComboboxGroupLabelPrimitive
      className={cn("px-2 py-1.5 text-xs text-muted-foreground", className)}
      {...props}
    />
  )
}

function ComboboxEmpty({ className, ...props }: PrimitiveProps<typeof ComboboxEmptyPrimitive>) {
  return (
    <ComboboxEmptyPrimitive
      className={cn(
        "flex w-full justify-center py-2 text-center text-sm text-muted-foreground empty:hidden",
        className,
      )}
      {...props}
    />
  )
}

function ComboboxSeparator({
  className,
  ...props
}: PrimitiveProps<typeof ComboboxSeparatorPrimitive>) {
  return (
    <ComboboxSeparatorPrimitive className={cn("-mx-1 my-1 h-px bg-border", className)} {...props} />
  )
}

function ComboboxChips({ className, ...props }: PrimitiveProps<typeof ComboboxChipsPrimitive>) {
  return (
    <ComboboxChipsPrimitive
      className={cn(
        "flex min-h-8 flex-wrap items-center gap-1 rounded-2xl border border-transparent bg-input/50 bg-clip-padding px-2.5 py-1 text-sm transition-[color,box-shadow] duration-200 focus-within:border-ring focus-within:ring-3 focus-within:ring-ring/30 has-aria-invalid:border-destructive has-aria-invalid:ring-3 has-aria-invalid:ring-destructive/20 has-data-[slot=combobox-chip]:px-1 dark:has-aria-invalid:border-destructive/50 dark:has-aria-invalid:ring-destructive/40",
        className,
      )}
      {...props}
    />
  )
}

function ComboboxChip({
  className,
  children,
  showRemove = true,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof ComboboxChipPrimitive>> & {
  showRemove?: boolean
}) {
  const label = typeof children === "string" ? children : String(props.value)

  return (
    <ComboboxChipPrimitive
      className={cn(
        "flex h-[calc(--spacing(5.25))] w-fit items-center justify-center gap-1 rounded-2xl bg-input px-1.5 text-xs font-medium whitespace-nowrap text-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring/30 has-data-[slot=combobox-chip-remove]:pe-0.5 dark:bg-input/60 data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:opacity-50",
        className,
      )}
      {...props}
    >
      {children}
      {showRemove && (
        <ComboboxChipRemovePrimitive
          aria-label={`Remove ${label}`}
          className={cn(
            iconButtonClassName,
            "-ms-0.5 size-4.5 opacity-50 hover:opacity-100 data-disabled:pointer-events-none",
          )}
        >
          <XIcon aria-hidden="true" className="pointer-events-none" />
        </ComboboxChipRemovePrimitive>
      )}
    </ComboboxChipPrimitive>
  )
}

function useComboboxAnchor() {
  return React.useRef<HTMLDivElement | null>(null)
}

function ComboboxStatus({ className, ...props }: PrimitiveProps<typeof ComboboxStatusPrimitive>) {
  return (
    <ComboboxStatusPrimitive
      className={cn("px-2 py-1.5 text-xs text-muted-foreground empty:hidden", className)}
      {...props}
    />
  )
}

function ComboboxCreate({
  className,
  children,
  ...props
}: PrimitiveProps<typeof ComboboxCreatePrimitive>) {
  return (
    <ComboboxCreatePrimitive
      className={cn(
        "relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-sm outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-pending:opacity-60 data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children ??
        ((state) => (
          <>
            <PlusIcon aria-hidden="true" />
            Create “{state.query}”
          </>
        ))}
    </ComboboxCreatePrimitive>
  )
}

function ComboboxSelectAll({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof ComboboxSelectAllPrimitive>>) {
  return (
    <ComboboxSelectAllPrimitive
      className={cn(
        "group/select-all relative flex min-h-7 w-full cursor-default items-center gap-2 rounded-xl py-1.5 ps-2 pe-8 text-sm font-medium outline-hidden select-none data-highlighted:bg-accent data-highlighted:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children ?? "Select all"}
      <CheckIcon
        aria-hidden="true"
        className="pointer-events-none absolute end-2 size-4 group-data-unchecked/select-all:hidden"
      />
    </ComboboxSelectAllPrimitive>
  )
}

function ComboboxChipsOverflow({
  className,
  ...props
}: PrimitiveProps<typeof ComboboxChipsOverflowPrimitive>) {
  return (
    <ComboboxChipsOverflowPrimitive
      className={cn(
        "flex h-[calc(--spacing(5.25))] items-center rounded-xl bg-muted px-1.5 text-xs font-medium text-foreground empty:hidden",
        className,
      )}
      {...props}
    />
  )
}

function ComboboxItemIcon({
  className,
  ...props
}: PrimitiveProps<typeof ComboboxItemIconPrimitive>) {
  return (
    <ComboboxItemIconPrimitive
      className={cn("flex size-4 shrink-0 text-muted-foreground", className)}
      {...props}
    />
  )
}

function ComboboxItems({ items }: { items: ListData<unknown> }) {
  return items.map((item, index) => {
    if (typeof item === "string") {
      return (
        <ComboboxItem key={item} value={item}>
          {item}
        </ComboboxItem>
      )
    }
    if ("type" in item && item.type === "separator") {
      return <ComboboxSeparator key={`separator-${index}`} />
    }
    if ("type" in item && item.type === "group") {
      return (
        <ComboboxGroup key={`group-${index}`}>
          {item.label ? <ComboboxLabel>{item.label}</ComboboxLabel> : null}
          <ComboboxItems items={item.items} />
        </ComboboxGroup>
      )
    }
    return (
      <ComboboxItem
        key={typeof item.value === "string" ? item.value : index}
        value={item.value}
        disabled={item.disabled}
        label={item.label}
      >
        {item.label}
      </ComboboxItem>
    )
  })
}

export {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
  ComboboxGroup,
  ComboboxLabel,
  ComboboxEmpty,
  ComboboxSeparator,
  ComboboxChips,
  ComboboxChip,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
  ComboboxChipsOverflow,
  ComboboxClear,
  ComboboxCreate,
  ComboboxItemIcon,
  ComboboxItems,
  ComboboxSelectAll,
  ComboboxStatus,
}
export { ComboboxValueIcon, createComboboxController } from "@ui-sdk/react/combobox"
export type { ListData as ComboboxData } from "@ui-sdk/react/combobox"
