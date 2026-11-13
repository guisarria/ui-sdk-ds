"use client"

import * as React from "react"
import {
  TreeItemCheckbox as TreeItemCheckboxPrimitive,
  TreeItemIndicator as TreeItemIndicatorPrimitive,
  TreeItemLabel as TreeItemLabelPrimitive,
  Tree as TreePrimitive,
} from "@ui-sdk/react/tree"
import { cn } from "cn"
import { CheckIcon, ChevronRightIcon, MinusIcon } from "lucide-react"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function Tree({ className, ...props }: PrimitiveProps<typeof TreePrimitive>) {
  return (
    <TreePrimitive
      className={cn(
        "flex flex-col text-sm outline-none [--tree-indent:--spacing(4)] **:data-[slot=tree-group]:h-(--tree-group-height) **:data-[slot=tree-group]:overflow-hidden **:data-[slot=tree-group]:transition-[height] **:data-[slot=tree-group]:duration-200 **:data-[slot=tree-group]:ease-out motion-reduce:**:data-[slot=tree-group]:transition-none",
        className,
      )}
      {...props}
    />
  )
}

function TreeItemLabel({ className, ...props }: PrimitiveProps<typeof TreeItemLabelPrimitive>) {
  return (
    <TreeItemLabelPrimitive
      className={cn(
        "flex min-h-7 cursor-default items-center gap-1.5 rounded-xl py-1 ps-[calc((var(--tree-level,1)-1)*var(--tree-indent)+(--spacing(2)))] pe-2 select-none not-data-branch:ps-[calc((var(--tree-level,1)-1)*var(--tree-indent)+(--spacing(7.5)))] hover:bg-muted in-focus-visible:ring-2 in-focus-visible:ring-ring/50 data-current:font-medium data-failed:text-destructive data-pending:opacity-60 data-selected:bg-accent data-selected:text-accent-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function TreeItemIndicator({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof TreeItemIndicatorPrimitive>>) {
  return (
    <TreeItemIndicatorPrimitive
      className={cn(
        "flex size-4 items-center justify-center text-muted-foreground transition-transform duration-150 data-expanded:rotate-90 data-loading:animate-pulse motion-reduce:transition-none rtl:-scale-x-100",
        className,
      )}
      {...props}
    >
      {children ?? <ChevronRightIcon aria-hidden="true" />}
    </TreeItemIndicatorPrimitive>
  )
}

function TreeItemCheckbox({
  className,
  ...props
}: PrimitiveProps<typeof TreeItemCheckboxPrimitive>) {
  return (
    <TreeItemCheckboxPrimitive
      className={cn(
        "group/tree-checkbox flex size-4 shrink-0 items-center justify-center rounded-[6px] border border-input text-primary-foreground data-indeterminate:border-primary data-indeterminate:bg-primary data-checked:border-primary data-checked:bg-primary [&_svg]:size-3.5",
        className,
      )}
      {...props}
    >
      <CheckIcon aria-hidden="true" className="hidden group-data-checked/tree-checkbox:block" />
      <MinusIcon
        aria-hidden="true"
        className="hidden group-data-indeterminate/tree-checkbox:block"
      />
    </TreeItemCheckboxPrimitive>
  )
}

export { Tree, TreeItemCheckbox, TreeItemIndicator, TreeItemLabel }
export {
  TreeGroup,
  TreeItem,
  TreeItems,
  createTreeController,
  toggleTreeChecked,
  treeCheckedStates,
  treeFromPaths,
  visibleTreeRows,
} from "@ui-sdk/react/tree"
