import { cn } from "cn"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function Skeleton({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "skeleton", className: cn("animate-pulse rounded-2xl bg-muted", className) },
      props,
    ),
    render,
  )
}

export { Skeleton }
