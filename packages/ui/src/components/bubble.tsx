import { Button as ButtonPrimitive } from "@ui-sdk/react/button"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import { cn } from "cn"
import type { PrimitiveProps, RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function BubbleGroup({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "bubble-group", className: cn("flex min-w-0 flex-col gap-2", className) },
      props,
    ),
    render,
  )
}

const variants = {
  default:
    "[--bubble-bg:var(--primary)] [--bubble-fg:var(--primary-foreground)] [--bubble-hover-bg:color-mix(in_oklab,var(--primary)_80%,transparent)]",
  secondary:
    "[--bubble-bg:var(--secondary)] [--bubble-fg:var(--secondary-foreground)] [--bubble-hover-bg:color-mix(in_oklch,var(--secondary),var(--foreground)_5%)]",
  muted:
    "[--bubble-bg:var(--muted)] [--bubble-hover-bg:color-mix(in_oklch,var(--muted),var(--foreground)_5%)]",
  tinted:
    "[--bubble-bg:oklch(from_var(--primary)_0.93_calc(c*0.4)_h)] [--bubble-fg:var(--foreground)] [--bubble-hover-bg:oklch(from_var(--primary)_0.88_calc(c*0.5)_h)] dark:[--bubble-bg:oklch(from_var(--primary)_0.3_calc(c*0.4)_h)] dark:[--bubble-hover-bg:oklch(from_var(--primary)_0.35_calc(c*0.5)_h)]",
  outline:
    "[--bubble-bg:var(--background)] [--bubble-border:var(--border)] [--bubble-hover-bg:var(--muted)] [--bubble-hover-fg:var(--foreground)] dark:[--bubble-hover-bg:color-mix(in_oklab,var(--input)_30%,transparent)]",
  ghost:
    "[--bubble-bg:transparent] [--bubble-hover-bg:var(--muted)] [--bubble-hover-fg:var(--foreground)] dark:[--bubble-hover-bg:color-mix(in_oklab,var(--muted)_50%,transparent)]",
  destructive:
    "[--bubble-bg:color-mix(in_oklab,var(--destructive)_10%,transparent)] [--bubble-fg:var(--destructive)] [--bubble-hover-bg:color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:[--bubble-bg:color-mix(in_oklab,var(--destructive)_20%,transparent)] dark:[--bubble-hover-bg:color-mix(in_oklab,var(--destructive)_30%,transparent)]",
}

type BubbleVariants = {
  variant?: keyof typeof variants
}

function bubbleVariants({ variant = "default" }: BubbleVariants = {}) {
  return cn(
    "group/bubble relative flex w-fit max-w-[80%] min-w-0 flex-col gap-1 [--bubble-border:transparent] [--bubble-fg:currentColor] [--bubble-hover-fg:var(--bubble-fg)] group-data-[align=end]/message:self-end data-[align=end]:self-end data-[variant=ghost]:max-w-full",
    variants[variant],
  )
}

const bubbleContentClassName =
  "w-fit max-w-full min-w-0 overflow-hidden rounded-3xl border border-(--bubble-border) bg-(--bubble-bg) px-3 py-2.5 text-start text-sm/relaxed wrap-break-word text-(--bubble-fg) outline-none group-data-[align=end]/bubble:self-end group-data-[variant=ghost]/bubble:rounded-none group-data-[variant=ghost]/bubble:p-0 [a,button]:transition-colors [a,button]:hover:bg-(--bubble-hover-bg) [a,button]:hover:text-(--bubble-hover-fg) [a,button]:focus-visible:border-ring [a,button]:focus-visible:ring-3 [a,button]:focus-visible:ring-ring/30"

function Bubble({
  variant = "default",
  align = "start",
  className,
  render,
  ...props
}: RenderProps<"div"> &
  BubbleVariants & {
    align?: "start" | "end"
  }) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "bubble",
        "data-variant": variant,
        "data-align": align,
        className: cn(bubbleVariants({ variant }), className),
      },
      props,
    ),
    render,
  )
}

function BubbleContent({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "bubble-content", className: cn(bubbleContentClassName, className) },
      props,
    ),
    render,
  )
}

function BubbleButton({ className, ...props }: PrimitiveProps<typeof ButtonPrimitive>) {
  return <ButtonPrimitive className={cn(bubbleContentClassName, className)} {...props} />
}

const reactionSides = {
  top: "top-0 -translate-y-3/4",
  bottom: "bottom-0 translate-y-3/4",
}

const reactionAligns = {
  start: "start-3",
  end: "end-3",
}

type BubbleReactionsVariants = {
  side?: keyof typeof reactionSides
  align?: keyof typeof reactionAligns
}

function bubbleReactionsVariants({ side = "bottom", align = "end" }: BubbleReactionsVariants = {}) {
  return cn(
    "absolute z-10 flex w-fit shrink-0 items-center justify-center gap-1 rounded-full bg-muted px-1.5 py-0.5 text-sm ring-3 ring-card has-[button]:p-0",
    reactionSides[side],
    reactionAligns[align],
  )
}

function BubbleReactions({
  side = "bottom",
  align = "end",
  className,
  render,
  ...props
}: RenderProps<"div"> & {
  align?: "start" | "end"
  side?: "top" | "bottom"
}) {
  return renderElement(
    "div",
    mergeProps(
      {
        "data-slot": "bubble-reactions",
        "data-align": align,
        "data-side": side,
        className: cn(bubbleReactionsVariants({ side, align }), className),
      },
      props,
    ),
    render,
  )
}

export { BubbleGroup, Bubble, BubbleButton, BubbleContent, BubbleReactions }
export type { BubbleVariants, BubbleReactionsVariants }
