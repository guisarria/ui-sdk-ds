"use client"

import {
  Pagination as PaginationPrimitive,
  PaginationEllipsis as PaginationEllipsisPrimitive,
  PaginationFirst as PaginationFirstPrimitive,
  PaginationLast as PaginationLastPrimitive,
  PaginationLink as PaginationLinkPrimitive,
  PaginationList as PaginationListPrimitive,
  PaginationNext as PaginationNextPrimitive,
  PaginationPrevious as PaginationPreviousPrimitive,
} from "@ui-sdk/react/pagination"
import { cn } from "cn"
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  MoreHorizontalIcon,
} from "lucide-react"

import { buttonVariants, type ButtonVariants } from "@ui-sdk-ds/ui/components/button"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

const stepClassName =
  "data-disabled:cursor-not-allowed data-disabled:opacity-50 data-disabled:hover:bg-transparent"

function Pagination({ className, ...props }: PrimitiveProps<typeof PaginationPrimitive>) {
  return (
    <PaginationPrimitive
      aria-label="Pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  )
}

function PaginationList({ className, ...props }: PrimitiveProps<typeof PaginationListPrimitive>) {
  return <PaginationListPrimitive className={cn("flex items-center gap-1", className)} {...props} />
}

function PaginationLink({
  className,
  size = "icon",
  ...props
}: PrimitiveProps<typeof PaginationLinkPrimitive> & Pick<ButtonVariants, "size">) {
  return (
    <PaginationLinkPrimitive
      className={(state) =>
        cn(buttonVariants({ variant: state.current ? "outline" : "ghost", size }), className)
      }
      {...props}
    />
  )
}

function PaginationPrevious({
  className,
  text = "Previous",
  children,
  ...props
}: PrimitiveProps<typeof PaginationPreviousPrimitive> & { text?: string }) {
  return (
    <PaginationPreviousPrimitive
      className={cn(buttonVariants({ variant: "ghost" }), "ps-1.5!", stepClassName, className)}
      {...props}
    >
      {children ?? (
        <>
          <ChevronLeftIcon data-icon="inline-start" />
          <span className="sr-only sm:not-sr-only">{text}</span>
        </>
      )}
    </PaginationPreviousPrimitive>
  )
}

function PaginationNext({
  className,
  text = "Next",
  children,
  ...props
}: PrimitiveProps<typeof PaginationNextPrimitive> & { text?: string }) {
  return (
    <PaginationNextPrimitive
      className={cn(buttonVariants({ variant: "ghost" }), "pe-1.5!", stepClassName, className)}
      {...props}
    >
      {children ?? (
        <>
          <span className="sr-only sm:not-sr-only">{text}</span>
          <ChevronRightIcon data-icon="inline-end" />
        </>
      )}
    </PaginationNextPrimitive>
  )
}

function PaginationFirst({
  className,
  text = "First",
  children,
  ...props
}: PrimitiveProps<typeof PaginationFirstPrimitive> & { text?: string }) {
  return (
    <PaginationFirstPrimitive
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), stepClassName, className)}
      {...props}
    >
      {children ?? (
        <>
          <ChevronsLeftIcon />
          <span className="sr-only">{text}</span>
        </>
      )}
    </PaginationFirstPrimitive>
  )
}

function PaginationLast({
  className,
  text = "Last",
  children,
  ...props
}: PrimitiveProps<typeof PaginationLastPrimitive> & { text?: string }) {
  return (
    <PaginationLastPrimitive
      className={cn(buttonVariants({ variant: "ghost", size: "icon" }), stepClassName, className)}
      {...props}
    >
      {children ?? (
        <>
          <ChevronsRightIcon />
          <span className="sr-only">{text}</span>
        </>
      )}
    </PaginationLastPrimitive>
  )
}

function PaginationEllipsis({
  className,
  children,
  ...props
}: PrimitiveProps<typeof PaginationEllipsisPrimitive>) {
  return (
    <PaginationEllipsisPrimitive
      className={cn(
        "flex size-8 items-center justify-center [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children ?? <MoreHorizontalIcon />}
    </PaginationEllipsisPrimitive>
  )
}

export {
  Pagination,
  PaginationEllipsis,
  PaginationFirst,
  PaginationLast,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
}
export {
  createPaginationController,
  PaginationItem,
  paginationRange,
} from "@ui-sdk/react/pagination"
