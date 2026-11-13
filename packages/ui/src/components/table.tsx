"use client"

import * as React from "react"
import { cn } from "cn"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function Table({ className, ...props }: React.ComponentProps<"table">) {
  return (
    <div data-slot="table-container" className="relative w-full overflow-x-auto">
      <table
        data-slot="table"
        className={cn("w-full caption-bottom text-sm", className)}
        {...props}
      />
    </div>
  )
}

function TableHeader({ className, render, ...props }: RenderProps<"thead">) {
  return renderElement(
    "thead",
    mergeProps({ "data-slot": "table-header", className: cn("[&_tr]:border-b", className) }, props),
    render,
  )
}

function TableBody({ className, render, ...props }: RenderProps<"tbody">) {
  return renderElement(
    "tbody",
    mergeProps(
      { "data-slot": "table-body", className: cn("[&_tr:last-child]:border-0", className) },
      props,
    ),
    render,
  )
}

function TableFooter({ className, render, ...props }: RenderProps<"tfoot">) {
  return renderElement(
    "tfoot",
    mergeProps(
      {
        "data-slot": "table-footer",
        className: cn("border-t bg-muted/50 font-medium [&>tr]:last:border-b-0", className),
      },
      props,
    ),
    render,
  )
}

function TableRow({ className, render, ...props }: RenderProps<"tr">) {
  return renderElement(
    "tr",
    mergeProps(
      {
        "data-slot": "table-row",
        className: cn(
          "border-b transition-colors hover:bg-muted/50 has-aria-expanded:bg-muted/50 data-[state=selected]:bg-muted",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function TableHead({ className, render, ...props }: RenderProps<"th">) {
  return renderElement(
    "th",
    mergeProps(
      {
        "data-slot": "table-head",
        className: cn(
          "h-10 px-2 text-start align-middle font-medium whitespace-nowrap text-foreground has-[[role=checkbox]]:pe-0",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function TableCell({ className, render, ...props }: RenderProps<"td">) {
  return renderElement(
    "td",
    mergeProps(
      {
        "data-slot": "table-cell",
        className: cn("p-2 align-middle whitespace-nowrap has-[[role=checkbox]]:pe-0", className),
      },
      props,
    ),
    render,
  )
}

function TableCaption({ className, render, ...props }: RenderProps<"caption">) {
  return renderElement(
    "caption",
    mergeProps(
      {
        "data-slot": "table-caption",
        className: cn("mt-4 text-sm text-muted-foreground", className),
      },
      props,
    ),
    render,
  )
}

export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
