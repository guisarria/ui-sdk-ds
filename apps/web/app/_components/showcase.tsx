import * as React from "react"
import { CheckIcon, XIcon } from "lucide-react"

import { cn } from "@ui-sdk-ds/ui/lib/utils"

export function Section({
  id,
  eyebrow,
  title,
  description,
  className,
  children,
}: {
  id: string
  eyebrow: string
  title: string
  description?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-title`}
      className={cn("scroll-mt-28 border-t bg-background text-foreground", className)}
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-16 px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <header className="flex max-w-2xl flex-col gap-3">
          <p className="type-eyebrow text-muted-foreground">{eyebrow}</p>
          <h2 id={`${id}-title`} className="type-heading">
            {title}
          </h2>
          {description && (
            <p className="text-base text-pretty text-muted-foreground">{description}</p>
          )}
        </header>
        {children}
      </div>
    </section>
  )
}

export function Block({
  id,
  title,
  description,
  className,
  children,
}: {
  id: string
  title: string
  description?: React.ReactNode
  className?: string
  children: React.ReactNode
}) {
  return (
    <article
      id={id}
      aria-labelledby={`${id}-title`}
      className="flex min-w-0 scroll-mt-28 flex-col gap-5"
    >
      <header className="flex max-w-2xl flex-col gap-1">
        <h3 id={`${id}-title`} className="type-subheading">
          {title}
        </h3>
        {description && <p className="text-sm text-pretty text-muted-foreground">{description}</p>}
      </header>
      <div className={cn("grid min-w-0 gap-6 lg:grid-cols-2", className)}>{children}</div>
    </article>
  )
}

export function Example({
  title,
  wide = false,
  className,
  children,
}: {
  title: string
  wide?: boolean
  className?: string
  children: React.ReactNode
}) {
  return (
    <figure className={cn("flex min-w-0 flex-col gap-2", wide && "lg:col-span-2")}>
      <figcaption className="font-mono text-xs text-muted-foreground">{title}</figcaption>
      <div
        className={cn(
          "flex min-w-0 flex-1 flex-wrap items-center gap-3 rounded-2xl border p-4 sm:p-6",
          className,
        )}
      >
        {children}
      </div>
    </figure>
  )
}

export function Variant({
  name,
  when,
  children,
}: {
  name: string
  when: string
  children: React.ReactNode
}) {
  return (
    <div className="flex min-w-0 items-center gap-4">
      <div className="flex w-36 shrink-0 justify-start">{children}</div>
      <div className="flex min-w-0 flex-col gap-0.5">
        <span className="font-mono text-xs">{name}</span>
        <span className="text-sm text-pretty text-muted-foreground">{when}</span>
      </div>
    </div>
  )
}

export function Guideline({
  rule,
  detail,
  good,
  bad,
}: {
  rule: string
  detail: string
  good: React.ReactNode
  bad: React.ReactNode
}) {
  return (
    <article className="flex min-w-0 flex-col gap-4">
      <header className="flex max-w-2xl flex-col gap-1">
        <h3 className="type-subheading">{rule}</h3>
        <p className="text-sm text-pretty text-muted-foreground">{detail}</p>
      </header>
      <div className="grid min-w-0 gap-4 md:grid-cols-2">
        <figure className="flex min-w-0 flex-col gap-2">
          <figcaption className="flex items-center gap-1.5 text-sm font-medium">
            <CheckIcon className="size-4" aria-hidden="true" />
            Do
          </figcaption>
          <div className="flex min-h-36 min-w-0 flex-1 flex-wrap items-center justify-center gap-3 rounded-2xl border p-6">
            {good}
          </div>
        </figure>
        <figure className="flex min-w-0 flex-col gap-2">
          <figcaption className="flex items-center gap-1.5 text-sm font-medium text-destructive">
            <XIcon className="size-4" aria-hidden="true" />
            Don&apos;t
          </figcaption>
          <div className="flex min-h-36 min-w-0 flex-1 flex-wrap items-center justify-center gap-3 rounded-2xl border border-dashed p-6">
            {bad}
          </div>
        </figure>
      </div>
    </article>
  )
}
