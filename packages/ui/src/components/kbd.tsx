import { cn } from "cn"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

const kbdClassName =
  "pointer-events-none inline-flex h-5 w-fit min-w-5 items-center justify-center gap-1 rounded-lg bg-muted px-1 font-sans text-xs font-medium text-muted-foreground select-none in-data-[slot=input-group]:bg-input in-data-[slot=tooltip-content]:bg-background/20 in-data-[slot=tooltip-content]:text-background dark:in-data-[slot=tooltip-content]:bg-background/10 [&_svg:not([class*='size-'])]:size-3"

function Kbd({ className, render, ...props }: RenderProps<"kbd">) {
  return renderElement(
    "kbd",
    mergeProps({ "data-slot": "kbd", className: cn(kbdClassName, className) }, props),
    render,
  )
}

function KbdGroup({ className, render, ...props }: RenderProps<"kbd">) {
  return renderElement(
    "kbd",
    mergeProps(
      { "data-slot": "kbd-group", className: cn("inline-flex items-center gap-1", className) },
      props,
    ),
    render,
  )
}

export { Kbd, KbdGroup, kbdClassName }
