import * as React from "react"
import {
  NavigationMenu as NavigationMenuPrimitive,
  NavigationMenuContent as NavigationMenuContentPrimitive,
  NavigationMenuIndicator as NavigationMenuIndicatorPrimitive,
  NavigationMenuItem as NavigationMenuItemPrimitive,
  NavigationMenuLink as NavigationMenuLinkPrimitive,
  NavigationMenuList as NavigationMenuListPrimitive,
  NavigationMenuTrigger as NavigationMenuTriggerPrimitive,
  NavigationMenuViewport as NavigationMenuViewportPrimitive,
} from "@ui-sdk/react/navigation-menu"
import { cn } from "cn"
import { ChevronDownIcon } from "lucide-react"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function NavigationMenu({
  align = "start",
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof NavigationMenuPrimitive>> &
  Pick<PrimitiveProps<typeof NavigationMenuViewportPrimitive>, "align">) {
  return (
    <NavigationMenuPrimitive
      className={cn(
        "group/navigation-menu relative flex max-w-max flex-1 items-center justify-center",
        className,
      )}
      {...props}
    >
      {children}
      <NavigationMenuPositioner align={align} />
    </NavigationMenuPrimitive>
  )
}

function NavigationMenuList({
  className,
  ...props
}: PrimitiveProps<typeof NavigationMenuListPrimitive>) {
  return (
    <NavigationMenuListPrimitive
      className={cn("group flex flex-1 list-none items-center justify-center gap-0", className)}
      {...props}
    />
  )
}

function NavigationMenuItem({
  className,
  ...props
}: PrimitiveProps<typeof NavigationMenuItemPrimitive>) {
  return <NavigationMenuItemPrimitive className={cn("relative", className)} {...props} />
}

function navigationMenuTriggerStyle() {
  return "group/navigation-menu-trigger inline-flex h-9 w-max items-center justify-center rounded-2xl px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1 disabled:pointer-events-none disabled:opacity-50 data-open:bg-muted/50 data-open:hover:bg-muted data-open:focus:bg-muted"
}

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof NavigationMenuTriggerPrimitive>>) {
  return (
    <NavigationMenuTriggerPrimitive
      className={cn(navigationMenuTriggerStyle(), "group", className)}
      {...props}
    >
      {children}{" "}
      <ChevronDownIcon
        className="relative top-px ms-1 size-3 transition duration-300 group-data-open/navigation-menu-trigger:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuTriggerPrimitive>
  )
}

function NavigationMenuContent({
  className,
  ...props
}: PrimitiveProps<typeof NavigationMenuContentPrimitive>) {
  return (
    <NavigationMenuContentPrimitive
      className={cn(
        "absolute inset-s-0 top-0 max-h-(--panel-height) w-max overflow-y-auto p-1.5 transition-[opacity,translate] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] data-ending-style:opacity-0 data-starting-style:opacity-0 data-[motion=from-end]:data-starting-style:translate-x-12 data-[motion=from-start]:data-starting-style:-translate-x-12 data-[motion=to-end]:data-ending-style:translate-x-12 data-[motion=to-start]:data-ending-style:-translate-x-12 **:data-[slot=navigation-menu-link]:focus:ring-0 **:data-[slot=navigation-menu-link]:focus:outline-none motion-reduce:transition-none rtl:data-[motion=from-end]:data-starting-style:-translate-x-12 rtl:data-[motion=from-start]:data-starting-style:translate-x-12 rtl:data-[motion=to-end]:data-ending-style:-translate-x-12 rtl:data-[motion=to-start]:data-ending-style:translate-x-12",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuPositioner({
  className,
  side = "bottom",
  sideOffset = 8,
  align = "start",
  alignOffset = 0,
  ...props
}: PrimitiveProps<typeof NavigationMenuViewportPrimitive>) {
  return (
    <NavigationMenuViewportPrimitive
      side={side}
      sideOffset={sideOffset}
      align={align}
      alignOffset={alignOffset}
      className={cn(
        "h-(--viewport-height) w-(--viewport-width) max-w-(--available-width) origin-(--transform-origin) overflow-hidden rounded-3xl bg-popover text-popover-foreground shadow-lg ring-1 ring-foreground/5 transition-[opacity,scale,width,height,left,top] duration-[0.35s] ease-[cubic-bezier(0.22,1,0.36,1)] outline-none [--panel-height:var(--available-height)] data-ending-style:scale-90 data-ending-style:opacity-0 data-ending-style:duration-150 data-starting-style:scale-90 data-starting-style:opacity-0 motion-reduce:transition-none dark:ring-foreground/10",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuLink({
  className,
  ...props
}: PrimitiveProps<typeof NavigationMenuLinkPrimitive>) {
  return (
    <NavigationMenuLinkPrimitive
      className={cn(
        "flex items-center gap-2 rounded-2xl px-2.5 py-1.5 text-sm font-medium transition-all outline-none hover:bg-muted focus:bg-muted focus-visible:ring-3 focus-visible:ring-ring/30 focus-visible:outline-1 in-data-[slot=navigation-menu-content]:w-full in-data-[slot=navigation-menu-content]:rounded-xl in-data-[slot=navigation-menu-content]:p-2 in-data-[slot=navigation-menu-content]:font-normal data-current:bg-muted/50 data-current:hover:bg-muted data-current:focus:bg-muted [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    />
  )
}

function NavigationMenuIndicator({
  className,
  ...props
}: PrimitiveProps<typeof NavigationMenuIndicatorPrimitive>) {
  return (
    <NavigationMenuIndicatorPrimitive
      className={cn(
        "absolute bottom-(--active-item-bottom) left-(--active-item-left) z-1 flex h-1.5 w-(--active-item-width) translate-y-full items-end justify-center overflow-hidden opacity-0 transition-opacity data-visible:opacity-100",
        className,
      )}
      {...props}
    >
      <div className="relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-md" />
    </NavigationMenuIndicatorPrimitive>
  )
}

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuPositioner,
}
export {
  NavigationMenuLinkIcon,
  createNavigationMenuController,
} from "@ui-sdk/react/navigation-menu"
