import type * as React from "react"
import type { RenderProp } from "@ui-sdk/react/primitive"

// Wrappers take string classes and style state with data-* variants. A className function would
// still typecheck against `cn`, which takes it for a class dictionary and silently drops it.
type PrimitiveProps<T extends React.ElementType> = Omit<React.ComponentProps<T>, "className"> & {
  className?: string
}

type WithNodeChildren<P> = Omit<P, "children"> & { children?: React.ReactNode }

type RenderProps<T extends keyof React.JSX.IntrinsicElements> = React.ComponentProps<T> & {
  render?: RenderProp
}

export type { PrimitiveProps, RenderProps, WithNodeChildren }
