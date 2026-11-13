"use client"

import * as React from "react"
import {
  Accordion as AccordionPrimitive,
  AccordionHeader as AccordionHeaderPrimitive,
  AccordionItem as AccordionItemPrimitive,
  AccordionPanel as AccordionPanelPrimitive,
  AccordionTrigger as AccordionTriggerPrimitive,
} from "@ui-sdk/react/accordion"
import { cn } from "cn"
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react"

import type { PrimitiveProps, WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

function Accordion({ className, ...props }: PrimitiveProps<typeof AccordionPrimitive>) {
  return (
    <AccordionPrimitive
      className={cn("flex w-full flex-col overflow-hidden rounded-2xl border", className)}
      {...props}
    />
  )
}

function AccordionItem({ className, ...props }: PrimitiveProps<typeof AccordionItemPrimitive>) {
  return (
    <AccordionItemPrimitive
      className={cn("not-last:border-b data-open:bg-muted/50", className)}
      {...props}
    />
  )
}

function AccordionTrigger({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof AccordionTriggerPrimitive>>) {
  return (
    <AccordionHeaderPrimitive className="flex">
      <AccordionTriggerPrimitive
        className={cn(
          "group/accordion-trigger relative flex flex-1 items-start justify-between gap-6 border border-transparent p-4 text-start text-sm font-medium transition-all outline-none hover:underline **:data-[slot=accordion-trigger-icon]:ms-auto **:data-[slot=accordion-trigger-icon]:size-4 **:data-[slot=accordion-trigger-icon]:text-muted-foreground data-disabled:pointer-events-none data-disabled:opacity-50",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDownIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none shrink-0 group-data-open/accordion-trigger:hidden"
        />
        <ChevronUpIcon
          data-slot="accordion-trigger-icon"
          className="pointer-events-none hidden shrink-0 group-data-open/accordion-trigger:inline"
        />
      </AccordionTriggerPrimitive>
    </AccordionHeaderPrimitive>
  )
}

function AccordionContent({
  className,
  children,
  ...props
}: WithNodeChildren<PrimitiveProps<typeof AccordionPanelPrimitive>>) {
  return (
    <AccordionPanelPrimitive
      className="h-(--accordion-panel-height) overflow-hidden px-4 text-sm transition-[height] duration-200 ease-out data-ending-style:h-0 data-starting-style:h-0 motion-reduce:transition-none"
      {...props}
    >
      <div
        className={cn(
          "pt-0 pb-4 [&_a]:underline [&_a]:underline-offset-3 [&_a]:hover:text-foreground [&_p:not(:last-child)]:mb-4",
          className,
        )}
      >
        {children}
      </div>
    </AccordionPanelPrimitive>
  )
}

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
export { createAccordionController } from "@ui-sdk/react/accordion"
