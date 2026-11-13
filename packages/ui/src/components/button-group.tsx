import type * as React from "react"
import { mergeProps, renderElement, type RenderProp } from "@ui-sdk/react/primitive"
import { cn } from "cn"

import { Separator } from "@ui-sdk-ds/ui/components/separator"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

const orientations = {
  horizontal:
    "*:data-slot:rounded-e-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-e-2xl! [&>[data-slot]~[data-slot]]:rounded-s-none [&>[data-slot]~[data-slot]]:border-s-0",
  vertical:
    "flex-col *:data-slot:rounded-b-none [&>[data-slot]:not(:has(~[data-slot]))]:rounded-b-2xl! [&>[data-slot]~[data-slot]]:rounded-t-none [&>[data-slot]~[data-slot]]:border-t-0",
}

type ButtonGroupVariants = {
  orientation?: keyof typeof orientations
}

function buttonGroupVariants({ orientation = "horizontal" }: ButtonGroupVariants = {}) {
  return cn(
    "flex w-fit items-stretch *:focus-visible:relative *:focus-visible:z-10 has-[>[data-slot=button-group]]:gap-2 has-[>[data-variant=outline]]:*:data-[slot=input-group]:border-border has-[>[data-variant=outline]]:*:data-[slot=select-trigger]:border-border has-[>[data-variant=outline]]:[&>[data-slot=input-group]:has(:focus-visible)]:border-ring has-[>[data-variant=outline]]:[&>[data-slot=select-trigger]:focus-visible]:border-ring has-[select[aria-hidden=true]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-2xl has-[>[data-slot=select-form-input]:last-child]:[&>[data-slot=select-trigger]:last-of-type]:rounded-e-2xl [&>[data-slot=select-trigger]:not([class*='w-'])]:w-fit [&>input]:flex-1 has-[>[data-variant=outline]]:[&>input]:border-border has-[>[data-variant=outline]]:[&>input:focus-visible]:border-ring",
    orientations[orientation],
  )
}

function ButtonGroup({
  className,
  orientation,
  render,
  ...props
}: RenderProps<"div"> & ButtonGroupVariants) {
  return renderElement(
    "div",
    mergeProps(
      {
        role: "group",
        "data-slot": "button-group",
        "data-orientation": orientation,
        className: cn(buttonGroupVariants({ orientation }), className),
      },
      props,
    ),
    render,
  )
}

function ButtonGroupText({
  className,
  render,
  ...props
}: React.ComponentProps<"div"> & { render?: RenderProp }) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "button-group-text",
        className: cn(
          "flex items-center gap-2 rounded-2xl border bg-muted px-2.5 text-sm font-medium [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4",
          className,
        ),
      },
      props,
    ),
    render,
  )
}

function ButtonGroupSeparator({
  className,
  orientation = "vertical",
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      orientation={orientation}
      className={cn(
        "relative self-stretch bg-input data-horizontal:mx-px data-horizontal:w-auto data-vertical:my-px data-vertical:h-auto",
        className,
      )}
      {...props}
    />
  )
}

export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants }
export type { ButtonGroupVariants }
