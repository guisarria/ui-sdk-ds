"use client"

import * as React from "react"
import {
  Toast as ToastPrimitive,
  ToastAction as ToastActionPrimitive,
  ToastClose as ToastClosePrimitive,
  ToastDescription as ToastDescriptionPrimitive,
  ToastRegion as ToastRegionPrimitive,
  ToastTitle as ToastTitlePrimitive,
  createToaster,
  toast,
} from "@ui-sdk/react/toast"
import { cn } from "cn"
import {
  XIcon,
  CircleCheckIcon,
  InfoIcon,
  TriangleAlertIcon,
  OctagonXIcon,
  Loader2Icon,
} from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"
import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function ToastViewport({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToastRegionPrimitive>, "className"> & { className?: string }) {
  return (
    <ToastRegionPrimitive
      side="bottom"
      align="end"
      className={cn(
        "m-4 h-(--toast-front-height) w-[min(24rem,calc(100vw-2rem))] overflow-visible bg-transparent outline-none [--dir:-1] data-expanded:h-[calc(var(--toast-stack-height)+(var(--toast-count)-1)*0.75rem)] data-[side=top]:[--dir:1]",
        className,
      )}
      {...props}
    />
  )
}

function Toast({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToastPrimitive>, "className"> & { className?: string }) {
  return (
    <ToastPrimitive
      className={cn(
        "group/toast absolute inset-x-0 z-[calc(100-var(--toast-index))] h-(--toast-height) overflow-hidden rounded-2xl border bg-popover text-popover-foreground shadow-lg outline-none select-none focus-visible:ring-3 focus-visible:ring-ring/30 in-data-[side=bottom]:bottom-0 in-data-[side=top]:top-0",
        "[translate:calc(var(--toast-swipe-x,0px)+var(--exit-x,0px))_calc(var(--y)+var(--toast-swipe-y,0px)+var(--exit-y,0px)*var(--slide,1))] scale-[calc(1-var(--toast-index)*0.05)] transition-[translate,scale,opacity,height] duration-400 ease-[ease] [--y:calc(var(--dir)*var(--toast-index)*0.75rem)]",
        "not-data-front:not-data-expanded:h-(--toast-front-height) data-expanded:scale-100 data-expanded:duration-200 data-expanded:ease-out data-expanded:[--y:calc(var(--dir)*(var(--toast-offset)+var(--toast-index)*0.75rem))]",
        "data-starting-style:transition-none not-data-front:data-starting-style:opacity-0 data-front:data-starting-style:[--y:calc(var(--dir)*-100%)]",
        "data-ending-style:opacity-0 data-ending-style:duration-200 data-ending-style:ease-out not-data-front:not-data-expanded:data-ending-style:[--exit-y:0px] motion-safe:data-ending-style:[--exit-y:calc(var(--dir)*-100%)]",
        "data-swiping:transition-none data-[swipe-direction=left]:[--slide:0] data-[swipe-direction=right]:[--slide:0] motion-safe:data-[swipe-direction=left]:[--exit-x:-100%] motion-safe:data-[swipe-direction=right]:[--exit-x:100%]",
        "motion-reduce:transition-opacity",
        className,
      )}
      {...props}
    />
  )
}

function ToastContent({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="toast-content"
      className={cn(
        "flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-not-data-front/toast:group-not-data-expanded/toast:opacity-0",
        className,
      )}
      {...props}
    />
  )
}

function ToastTitle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToastTitlePrimitive>, "className"> & { className?: string }) {
  return <ToastTitlePrimitive className={cn("text-sm font-medium", className)} {...props} />
}

function ToastDescription({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToastDescriptionPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ToastDescriptionPrimitive
      className={cn("text-sm text-muted-foreground empty:hidden", className)}
      {...props}
    />
  )
}

function ToastAction({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ToastActionPrimitive>, "className"> & { className?: string }) {
  return (
    <ToastActionPrimitive
      className={cn(buttonVariants({ variant: "outline", size: "sm" }), "shrink-0", className)}
      {...props}
    />
  )
}

function ToastClose({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof ToastClosePrimitive>, "className"> & { className?: string }
>) {
  return (
    <ToastClosePrimitive
      aria-label="Close toast"
      className={cn(
        buttonVariants({ variant: "ghost", size: "icon-sm" }),
        "relative shrink-0 text-muted-foreground after:absolute after:-inset-2 after:content-[''] hover:text-foreground",
        className,
      )}
      {...props}
    >
      {children ?? <XIcon aria-hidden="true" />}
    </ToastClosePrimitive>
  )
}

function ToastIcon({ type }: { type: string | undefined }) {
  let icon: React.ReactNode = null

  if (type === "success") {
    icon = <CircleCheckIcon className="text-success" aria-hidden="true" />
  }
  if (type === "info") {
    icon = <InfoIcon className="text-info" aria-hidden="true" />
  }
  if (type === "warning") {
    icon = <TriangleAlertIcon className="text-warning" aria-hidden="true" />
  }
  if (type === "error") {
    icon = <OctagonXIcon className="text-destructive" aria-hidden="true" />
  }
  if (type === "loading") {
    icon = <Loader2Icon className="animate-spin" aria-hidden="true" />
  }

  if (!icon) {
    return null
  }

  return (
    <span
      data-slot="toast-icon"
      className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
    >
      {icon}
    </span>
  )
}

function Toaster({
  children,
  ...props
}: Omit<React.ComponentProps<typeof ToastViewport>, "children"> & {
  children?: React.ReactNode
}) {
  return (
    <>
      {children}
      <ToastViewport {...props}>
        {(item) => (
          <Toast>
            <ToastContent>
              <ToastIcon type={item.type} />
              <div className="flex min-w-0 flex-1 flex-col gap-1">
                <ToastTitle />
                <ToastDescription />
              </div>
              {item.action && <ToastAction />}
              <ToastClose />
            </ToastContent>
          </Toast>
        )}
      </ToastViewport>
    </>
  )
}

export {
  Toaster,
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastTitle,
  ToastViewport,
  createToaster,
  toast,
}
