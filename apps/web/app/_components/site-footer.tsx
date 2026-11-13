"use client"

import * as React from "react"
import { ArrowUpRightIcon, BoxesIcon } from "lucide-react"

import { Button } from "@ui-sdk-ds/ui/components/button"
import { ButtonGroup } from "@ui-sdk-ds/ui/components/button-group"
import { Field, FieldDescription, FieldError, FieldLabel } from "@ui-sdk-ds/ui/components/field"
import { Input } from "@ui-sdk-ds/ui/components/input"
import { Kbd } from "@ui-sdk-ds/ui/components/kbd"
import { Separator } from "@ui-sdk-ds/ui/components/separator"
import { toast } from "@ui-sdk-ds/ui/components/toast"

import { sections } from "./sections"

const references = [
  { label: "shadcn/ui", href: "https://ui.shadcn.com/docs" },
  { label: "ui-sdk", href: "https://ui-sdk.dev/docs" },
  { label: "Lucide icons", href: "https://lucide.dev/icons" },
  { label: "Tailwind CSS", href: "https://tailwindcss.com/docs" },
  {
    label: "The rhea preset",
    href: "https://ui.shadcn.com/create?preset=b27Gcu92",
  },
]

export function SiteFooter({ componentCount }: { componentCount: number }) {
  return (
    <footer className="dark border-t bg-background text-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div className="flex max-w-sm flex-col gap-6 md:col-span-2 lg:col-span-1">
            <div className="flex flex-col gap-3">
              <a href="#overview" className="flex w-fit items-center gap-2 text-sm font-medium">
                <span className="flex size-7 items-center justify-center rounded-xl bg-brand text-brand-foreground">
                  <BoxesIcon className="size-4" aria-hidden="true" />
                </span>
                Workspace UI
              </a>
              <p className="text-sm text-pretty text-muted-foreground">
                Foundations, components and patterns for every app in this monorepo.
              </p>
            </div>
            <ReleaseNotesForm />
          </div>
          <nav aria-labelledby="footer-sections" className="flex flex-col gap-4">
            <h2 id="footer-sections" className="text-sm font-medium">
              On this page
            </h2>
            <ul className="grid grid-flow-col grid-rows-6 gap-x-6 gap-y-3 text-sm">
              {sections.map((section) => (
                <li key={section.id}>
                  <a
                    href={`#${section.id}`}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {section.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="flex flex-col gap-4">
            <h2 className="text-sm font-medium">Built on</h2>
            <ul className="flex flex-col gap-3 text-sm">
              {references.map((reference) => (
                <li key={reference.href}>
                  <a
                    href={reference.href}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {reference.label}
                    <ArrowUpRightIcon className="size-3.5" aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <Separator />
        <div className="flex flex-col gap-3 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>{componentCount} components · base-rhea · claude</p>
          <p className="flex items-center gap-2">
            Press <Kbd>D</Kbd> to switch the page theme
          </p>
        </div>
      </div>
    </footer>
  )
}

function ReleaseNotesForm() {
  const [email, setEmail] = React.useState("")
  const [error, setError] = React.useState<string | null>(null)

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter an email address like name@example.com.")
      return
    }
    setError(null)
    setEmail("")
    toast({
      title: "Subscribed to release notes",
      description: `${email} gets one email per release.`,
      type: "success",
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      <Field name="footer-email" invalid={error ? true : undefined}>
        <FieldLabel>Release notes by email</FieldLabel>
        <ButtonGroup className="w-full">
          <Input
            type="email"
            placeholder="name@example.com"
            value={email}
            aria-invalid={error ? true : undefined}
            onChange={(event) => setEmail(event.target.value)}
          />
          <Button type="submit" variant="outline">
            Subscribe
          </Button>
        </ButtonGroup>
        {error ? (
          <FieldError>{error}</FieldError>
        ) : (
          <FieldDescription>One email per release. Breaking changes come first.</FieldDescription>
        )}
      </Field>
    </form>
  )
}
