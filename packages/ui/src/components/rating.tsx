"use client"

import * as React from "react"
import { Rating as RatingPrimitive, RatingItem as RatingItemPrimitive } from "@ui-sdk/react/rating"
import { cn } from "cn"
import { StarIcon } from "lucide-react"

import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function Rating({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof RatingPrimitive>, "className"> & { className?: string }) {
  return (
    <RatingPrimitive
      className={cn("inline-flex items-center gap-0.5 data-disabled:opacity-50", className)}
      {...props}
    >
      {children ?? <RatingItem />}
    </RatingPrimitive>
  )
}

function RatingItem({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof RatingItemPrimitive>, "className"> & { className?: string }
>) {
  return (
    <RatingItemPrimitive
      className={cn(
        "relative inline-flex size-5 cursor-pointer items-center justify-center rounded-md text-muted-foreground/40 outline-none focus-visible:ring-3 focus-visible:ring-ring/50 data-readonly:cursor-default data-disabled:cursor-default [&_svg]:size-full",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <StarIcon aria-hidden="true" />
          <span
            aria-hidden="true"
            className="absolute inset-0 overflow-hidden text-amber-400 [clip-path:inset(0_calc((1-var(--rating-fill,0))*100%)_0_0)] rtl:[clip-path:inset(0_0_0_calc((1-var(--rating-fill,0))*100%))]"
          >
            <StarIcon className="fill-current" />
          </span>
        </>
      )}
    </RatingItemPrimitive>
  )
}

export { Rating, RatingItem }
export { createRatingController } from "@ui-sdk/react/rating"
