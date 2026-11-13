"use client"

import * as React from "react"
import {
  Avatar as AvatarPrimitive,
  AvatarFallback as AvatarFallbackPrimitive,
  AvatarImage as AvatarImagePrimitive,
} from "@ui-sdk/react/avatar"
import { cn } from "cn"
import type { PrimitiveProps, RenderProps } from "@ui-sdk-ds/ui/lib/parts"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"

function Avatar({
  className,
  size = "default",
  ...props
}: PrimitiveProps<typeof AvatarPrimitive> & {
  size?: "default" | "sm" | "lg"
}) {
  return (
    <AvatarPrimitive
      data-size={size}
      className={cn(
        "group/avatar relative flex size-8 shrink-0 rounded-full select-none after:absolute after:inset-0 after:rounded-full after:border after:border-border after:mix-blend-darken data-[size=lg]:size-10 data-[size=sm]:size-6 dark:after:mix-blend-lighten",
        className,
      )}
      {...props}
    />
  )
}

function AvatarImage({ className, ...props }: PrimitiveProps<typeof AvatarImagePrimitive>) {
  return (
    <AvatarImagePrimitive
      className={cn("aspect-square size-full rounded-full object-cover", className)}
      {...props}
    />
  )
}

function AvatarFallback({ className, ...props }: PrimitiveProps<typeof AvatarFallbackPrimitive>) {
  return (
    <AvatarFallbackPrimitive
      className={cn(
        "flex size-full items-center justify-center rounded-full bg-muted text-sm text-muted-foreground group-data-[size=sm]/avatar:text-xs",
        className,
      )}
      {...props}
    />
  )
}

function AvatarBadge({ className, render, ...props }: RenderProps<"span">) {
  return renderElement(
    "span",
    mergeProps(
      {
        "data-slot": "avatar-badge",
        className: cn(
          "absolute end-0 bottom-0 z-10 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground bg-blend-color ring-2 ring-background select-none",
          "group-data-[size=sm]/avatar:size-2 group-data-[size=sm]/avatar:[&>svg]:hidden",
          "group-data-[size=default]/avatar:size-2.5 group-data-[size=default]/avatar:[&>svg]:size-2",
          "group-data-[size=lg]/avatar:size-3 group-data-[size=lg]/avatar:[&>svg]:size-2",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function AvatarGroup({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "avatar-group",
        className: cn(
          "group/avatar-group flex -space-x-2 *:data-[slot=avatar]:ring-2 *:data-[slot=avatar]:ring-background",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function AvatarGroupCount({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "avatar-group-count",
        className: cn(
          "relative flex size-8 shrink-0 items-center justify-center rounded-full bg-muted text-sm text-muted-foreground ring-2 ring-background group-has-data-[size=lg]/avatar-group:size-10 group-has-data-[size=sm]/avatar-group:size-6 [&>svg]:size-4 group-has-data-[size=lg]/avatar-group:[&>svg]:size-5 group-has-data-[size=sm]/avatar-group:[&>svg]:size-3",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

export { Avatar, AvatarImage, AvatarFallback, AvatarGroup, AvatarGroupCount, AvatarBadge }
