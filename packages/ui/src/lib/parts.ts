import type * as React from "react"
import type { RenderProp } from "@ui-sdk/react/primitive"

type WithNodeChildren<P> = Omit<P, "children"> & { children?: React.ReactNode }

export type { WithNodeChildren }

type RenderProps<T extends keyof React.JSX.IntrinsicElements> = React.ComponentProps<T> & {
  render?: RenderProp
}

export type { RenderProps }
