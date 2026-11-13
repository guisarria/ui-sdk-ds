import { cn } from "cn"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function AspectRatio({
  ratio,
  className,
  render,
  ...props
}: RenderProps<"div"> & { ratio: number }) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "aspect-ratio",
        style: {
          "--ratio": ratio,
        } as React.CSSProperties,
        className: cn("relative aspect-(--ratio)", className),
      },
      props,
    ),
    render,
  )
}

export { AspectRatio }
