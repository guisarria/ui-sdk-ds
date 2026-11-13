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
  type ToastData,
  type ToastRegionProps,
  type ToastType,
} from "@ui-sdk/react/toast"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
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
import type { PrimitiveProps, WithNodeChildren, RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function ToastViewport({ className, ...props }: PrimitiveProps<typeof ToastRegionPrimitive>) {
  return (
    <ToastRegionPrimitive
      {...toastViewportProps}
      {...props}
      className={cn(toastViewportClassName, className)}
    />
  )
}

function Toast({ className, ...props }: PrimitiveProps<typeof ToastPrimitive>) {
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

function ToastContent({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "toast-content",
        className: cn(
          "flex h-full items-center gap-3 overflow-hidden p-4 transition-opacity duration-250 ease-[cubic-bezier(0.22,1,0.36,1)] group-not-data-front/toast:group-not-data-expanded/toast:opacity-0",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function ToastTitle({ className, ...props }: PrimitiveProps<typeof ToastTitlePrimitive>) {
  return <ToastTitlePrimitive className={cn("text-sm font-medium", className)} {...props} />
}

function ToastDescription({
  className,
  ...props
}: PrimitiveProps<typeof ToastDescriptionPrimitive>) {
  return (
    <ToastDescriptionPrimitive
      className={cn("text-sm text-muted-foreground empty:hidden", className)}
      {...props}
    />
  )
}

function ToastAction({ className, ...props }: PrimitiveProps<typeof ToastActionPrimitive>) {
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
}: WithNodeChildren<PrimitiveProps<typeof ToastClosePrimitive>>) {
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

const toastIcons = {
  default: null,
  success: <CircleCheckIcon className="text-success" />,
  info: <InfoIcon className="text-info" />,
  warning: <TriangleAlertIcon className="text-warning" />,
  error: <OctagonXIcon className="text-destructive" />,
  loading: <Loader2Icon className="animate-spin" />,
} satisfies Record<ToastType, React.ReactNode>

function ToastIcon({ type }: { type: ToastType }) {
  const icon = toastIcons[type]
  if (!icon) {
    return null
  }
  return (
    <span
      data-slot="toast-icon"
      aria-hidden="true"
      className="shrink-0 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4"
    >
      {icon}
    </span>
  )
}

function renderToast({ type, action }: ToastData<React.ReactNode>) {
  return (
    <Toast>
      <ToastContent>
        <ToastIcon type={type} />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <ToastTitle />
          <ToastDescription />
        </div>
        {action ? <ToastAction /> : null}
        <ToastClose />
      </ToastContent>
    </Toast>
  )
}

const toastViewportClassName = cn(
  "m-4 h-(--toast-front-height) w-[min(24rem,calc(100vw-2rem))] overflow-visible bg-transparent outline-none [--dir:-1] data-expanded:h-[calc(var(--toast-stack-height)+(var(--toast-count)-1)*0.75rem)] data-[side=top]:[--dir:1]",
)

const toastViewportProps: ToastRegionProps & { "data-agent-hidden": boolean } = {
  "data-agent-hidden": true,
  side: "bottom",
  align: "end",
  className: toastViewportClassName,
  children: renderToast,
}

export {
  Toast,
  ToastAction,
  ToastClose,
  ToastContent,
  ToastDescription,
  ToastTitle,
  ToastViewport,
  toastViewportProps,
  createToaster,
  toast,
}
