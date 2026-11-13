"use client"

import * as React from "react"
import {
  Tabs as TabsPrimitive,
  TabsList as TabsListPrimitive,
  TabsPanel as TabsPanelPrimitive,
  TabsTab as TabsTabPrimitive,
  TabsIndicator as TabsIndicatorPrimitive,
  TabsTabIcon as TabsTabIconPrimitive,
} from "@ui-sdk/react/tabs"
import { cn } from "cn"

function Tabs({
  className,
  orientation = "horizontal",
  ...props
}: Omit<React.ComponentProps<typeof TabsPrimitive>, "className"> & { className?: string }) {
  return (
    <TabsPrimitive
      orientation={orientation}
      className={cn("group/tabs flex gap-2 data-[orientation=horizontal]:flex-col", className)}
      {...props}
    />
  )
}

const variants = {
  default: "bg-muted",
  line: "gap-1 bg-transparent",
}

type TabsListVariants = {
  variant?: keyof typeof variants
}

function tabsListVariants({ variant = "default" }: TabsListVariants = {}) {
  return cn(
    "group/tabs-list relative isolate inline-flex w-fit items-center justify-center rounded-2xl p-0.75 text-muted-foreground group-data-[orientation=horizontal]/tabs:h-8 group-data-[orientation=vertical]/tabs:h-fit group-data-[orientation=vertical]/tabs:flex-col group-data-[orientation=vertical]/tabs:p-1 has-data-[slot=tabs-indicator]:*:data-[slot=tabs-tab]:border-transparent! has-data-[slot=tabs-indicator]:*:data-[slot=tabs-tab]:bg-transparent! has-data-[slot=tabs-indicator]:*:data-[slot=tabs-tab]:after:hidden data-[variant=line]:rounded-none",
    variants[variant],
  )
}

function TabsList({
  className,
  variant = "default",
  ...props
}: Omit<React.ComponentProps<typeof TabsListPrimitive>, "className"> & {
  className?: string
} & TabsListVariants) {
  return (
    <TabsListPrimitive
      data-variant={variant}
      className={cn(tabsListVariants({ variant }), className)}
      {...props}
    />
  )
}

function TabsTrigger({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsTabPrimitive>, "className"> & { className?: string }) {
  return (
    <TabsTabPrimitive
      className={cn(
        "relative inline-flex h-[calc(100%-1px)] flex-1 items-center justify-center gap-1.5 rounded-2xl border border-transparent! px-1.5 py-0.5 text-sm font-medium whitespace-nowrap text-foreground/60 transition-all group-data-[orientation=vertical]/tabs:w-full group-data-[orientation=vertical]/tabs:justify-start group-data-[orientation=vertical]/tabs:px-3 group-data-[orientation=vertical]/tabs:py-0.5 hover:text-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-1 focus-visible:outline-ring disabled:pointer-events-none disabled:opacity-50 dark:text-muted-foreground dark:hover:text-foreground data-disabled:pointer-events-none data-disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        "group-data-[variant=line]/tabs-list:bg-transparent group-data-[variant=line]/tabs-list:data-selected:bg-transparent dark:group-data-[variant=line]/tabs-list:data-selected:border-transparent dark:group-data-[variant=line]/tabs-list:data-selected:bg-transparent",
        "data-selected:bg-background data-selected:text-foreground dark:data-selected:border-input dark:data-selected:bg-input/30 dark:data-selected:text-foreground",
        "after:absolute after:bg-foreground after:opacity-0 after:transition-opacity group-data-[orientation=horizontal]/tabs:after:inset-x-0 group-data-[orientation=horizontal]/tabs:after:-bottom-1.25 group-data-[orientation=horizontal]/tabs:after:h-0.5 group-data-[orientation=vertical]/tabs:after:inset-y-0 group-data-[orientation=vertical]/tabs:after:-right-1 group-data-[orientation=vertical]/tabs:after:w-0.5 group-data-[variant=line]/tabs-list:data-selected:after:opacity-100",
        className,
      )}
      {...props}
    />
  )
}

function TabsContent({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsPanelPrimitive>, "className"> & { className?: string }) {
  return <TabsPanelPrimitive className={cn("flex-1 text-sm outline-none", className)} {...props} />
}

function TabsIndicator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsIndicatorPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <TabsIndicatorPrimitive
      className={cn(
        "pointer-events-none absolute top-(--active-tab-top) left-(--active-tab-left) -z-10 h-(--active-tab-height) w-(--active-tab-width) rounded-2xl bg-background transition-[left,top,width,height] duration-200 ease-out group-data-[variant=line]/tabs-list:top-auto group-data-[variant=line]/tabs-list:bottom-0 group-data-[variant=line]/tabs-list:h-0.5 group-data-[variant=line]/tabs-list:rounded-none group-data-[variant=line]/tabs-list:bg-foreground motion-reduce:transition-none dark:bg-input/30",
        className,
      )}
      {...props}
    />
  )
}

function TabsTabIcon({
  className,
  ...props
}: Omit<React.ComponentProps<typeof TabsTabIconPrimitive>, "className"> & { className?: string }) {
  return <TabsTabIconPrimitive className={cn("flex size-4 shrink-0", className)} {...props} />
}

export { Tabs, TabsList, TabsTrigger, TabsContent, tabsListVariants, TabsIndicator, TabsTabIcon }
export { createTabsController } from "@ui-sdk/react/tabs"
export type { TabsListVariants }
