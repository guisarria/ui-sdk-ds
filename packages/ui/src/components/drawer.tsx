"use client"

import * as React from "react"
import {
  Drawer as DrawerPrimitive,
  DrawerBackdrop as DrawerBackdropPrimitive,
  DrawerContent as DrawerContentPrimitive,
  DrawerDescription as DrawerDescriptionPrimitive,
  DrawerHandle as DrawerHandlePrimitive,
  DrawerTitle as DrawerTitlePrimitive,
  DrawerShortcut as DrawerShortcutPrimitive,
} from "@ui-sdk/react/drawer"
import { cn } from "cn"
import { kbdClassName } from "@ui-sdk-ds/ui/components/kbd"

import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

type SwipeDirection = "up" | "down" | "left" | "right"

const sideFromSwipe = {
  down: "bottom",
  up: "top",
  left: "left",
  right: "right",
} as const

type DrawerContextProps = {
  modal: React.ComponentProps<typeof DrawerPrimitive>["modal"]
  showSwipeHandle: boolean
}

const DrawerContext = React.createContext<DrawerContextProps>({
  modal: true,
  showSwipeHandle: false,
})

function Drawer({
  modal = true,
  showSwipeHandle = false,
  swipeDirection,
  side,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive> & {
  showSwipeHandle?: boolean
  swipeDirection?: SwipeDirection
}) {
  const contextValue = React.useMemo(() => ({ modal, showSwipeHandle }), [modal, showSwipeHandle])

  return (
    <DrawerContext.Provider value={contextValue}>
      <DrawerPrimitive
        modal={modal}
        side={side ?? (swipeDirection ? sideFromSwipe[swipeDirection] : "bottom")}
        {...props}
      />
    </DrawerContext.Provider>
  )
}

function DrawerPortal({ children }: { children?: React.ReactNode }) {
  return children
}

function DrawerOverlay({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DrawerBackdropPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <DrawerBackdropPrimitive
      className={cn(
        "fixed inset-0 bg-black/30 select-none supports-backdrop-filter:backdrop-blur-sm",
        className,
      )}
      {...props}
    />
  )
}

function DrawerSwipeHandle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DrawerHandlePrimitive>, "className"> & { className?: string }) {
  return (
    <DrawerHandlePrimitive
      className={cn(
        "relative z-10 flex shrink-0 cursor-grab items-center justify-center group-data-[side=bottom]/drawer-popup:h-3 group-data-[side=bottom]/drawer-popup:w-full group-data-[side=bottom]/drawer-popup:items-end group-data-[side=left]/drawer-popup:order-last group-data-[side=left]/drawer-popup:h-full group-data-[side=left]/drawer-popup:w-3 group-data-[side=right]/drawer-popup:h-full group-data-[side=right]/drawer-popup:w-3 group-data-[side=top]/drawer-popup:order-last group-data-[side=top]/drawer-popup:h-3 group-data-[side=top]/drawer-popup:w-full group-data-[side=top]/drawer-popup:items-start after:block after:shrink-0 after:rounded-full after:bg-muted group-data-[side=bottom]/drawer-popup:after:h-1.5 group-data-[side=bottom]/drawer-popup:after:w-25 group-data-[side=left]/drawer-popup:after:h-25 group-data-[side=left]/drawer-popup:after:w-1.5 group-data-[side=right]/drawer-popup:after:h-25 group-data-[side=right]/drawer-popup:after:w-1.5 group-data-[side=top]/drawer-popup:after:h-1.5 group-data-[side=top]/drawer-popup:after:w-25 active:cursor-grabbing",
        className,
      )}
      {...props}
    />
  )
}

function DrawerContent({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof DrawerContentPrimitive>, "className"> & { className?: string }
>) {
  const { modal, showSwipeHandle } = React.useContext(DrawerContext)

  return (
    <>
      {modal !== false && <DrawerOverlay />}
      <DrawerContentPrimitive
        className={cn(
          "group/drawer-popup m-2 flex min-h-0 flex-col rounded-[min(var(--radius-4xl),24px)] border border-popover bg-popover text-sm text-popover-foreground shadow-xl outline-none dark:border-border",
          "data-[side=bottom]:max-h-[calc(100dvh-6rem)] data-[side=top]:max-h-[calc(100dvh-6rem)]",
          "data-[side=left]:h-[calc(100%-1rem)] data-[side=left]:w-3/4 data-[side=left]:flex-row data-[side=right]:h-[calc(100%-1rem)] data-[side=right]:w-3/4 data-[side=right]:flex-row data-[side=left]:sm:w-96 data-[side=right]:sm:w-96",
          "after:pointer-events-none after:absolute after:bg-popover data-[side=bottom]:after:inset-x-0 data-[side=bottom]:after:top-full data-[side=bottom]:after:h-12 data-[side=left]:after:inset-y-0 data-[side=left]:after:right-full data-[side=left]:after:w-12 data-[side=right]:after:inset-y-0 data-[side=right]:after:left-full data-[side=right]:after:w-12 data-[side=top]:after:inset-x-0 data-[side=top]:after:bottom-full data-[side=top]:after:h-12",
          className,
        )}
        {...props}
      >
        {showSwipeHandle && <DrawerSwipeHandle />}
        <div
          data-slot="drawer-content"
          className="flex min-h-0 flex-1 flex-col overflow-hidden overscroll-contain rounded-[inherit] select-text"
        >
          {children}
        </div>
      </DrawerContentPrimitive>
    </>
  )
}

function DrawerHeader({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-header"
      className={cn(
        "flex shrink-0 flex-col gap-0.5 p-4 pb-0 group-data-[side=bottom]/drawer-popup:text-center group-data-[side=top]/drawer-popup:text-center md:gap-1.5 md:text-left",
        className,
      )}
      {...props}
    />
  )
}

function DrawerFooter({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="drawer-footer"
      className={cn("mt-auto flex shrink-0 flex-col gap-2 p-4 pt-0", className)}
      {...props}
    />
  )
}

function DrawerTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DrawerTitlePrimitive>, "className"> & { className?: string }) {
  return (
    <DrawerTitlePrimitive
      className={cn("font-heading text-base font-medium text-foreground", className)}
      {...props}
    />
  )
}

function DrawerDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DrawerDescriptionPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <DrawerDescriptionPrimitive
      className={cn("text-sm text-balance text-muted-foreground", className)}
      {...props}
    />
  )
}

function DrawerShortcut({
  className,
  ...props
}: Omit<React.ComponentProps<typeof DrawerShortcutPrimitive>, "className"> & {
  className?: string
}) {
  return <DrawerShortcutPrimitive className={cn(kbdClassName, className)} {...props} />
}

export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerSwipeHandle,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
  DrawerShortcut,
}
export {
  DrawerClose,
  DrawerTrigger,
  DrawerOutlet,
  createDrawerController,
  sheetPhysics,
} from "@ui-sdk/react/drawer"
