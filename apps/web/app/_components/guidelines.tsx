"use client"

import { ArrowUpIcon } from "lucide-react"

import { Button } from "@ui-sdk-ds/ui/components/button"
import { Field, FieldDescription, FieldLabel } from "@ui-sdk-ds/ui/components/field"
import { Input } from "@ui-sdk-ds/ui/components/input"

import { Guideline, Section } from "./showcase"
import { StatusBadge } from "./status-badge"

export function Guidelines() {
  return (
    <Section
      id="guidelines"
      eyebrow="10 · Do and don’t"
      title="Do and don’t"
      description="The rules that are easiest to break, with what to do instead."
    >
      <div className="grid gap-16">
        <Guideline
          rule="One primary action per group"
          detail="When everything is primary, nothing is. Step the rest down to outline, ghost or link."
          good={
            <>
              <Button>Deploy to production</Button>
              <Button variant="outline">Cancel</Button>
            </>
          }
          bad={
            <>
              <Button>Deploy to production</Button>
              <Button>Cancel</Button>
            </>
          }
        />
        <Guideline
          rule="Save clay for the brand"
          detail="Clay marks the logo and the send button. Every other action is ink, so clay still stands out when it appears."
          good={
            <>
              <Button>Deploy to production</Button>
              <Button variant="brand" size="icon" aria-label="Send message">
                <ArrowUpIcon />
              </Button>
            </>
          }
          bad={
            <>
              <Button variant="brand">Deploy to production</Button>
              <Button variant="brand">Invite team</Button>
            </>
          }
        />
        <Guideline
          rule="Every field has a visible label"
          detail="Placeholders disappear as soon as people type and are too faint to read. Use them for examples, never as the label."
          good={
            <Field name="guideline-domain" className="max-w-xs">
              <FieldLabel>Custom domain</FieldLabel>
              <Input placeholder="status.example.com" />
              <FieldDescription>Add the CNAME record after saving.</FieldDescription>
            </Field>
          }
          bad={
            <Input
              name="custom-domain"
              aria-label="Custom domain"
              placeholder="Custom domain"
              className="max-w-xs"
            />
          }
        />
        <Guideline
          rule="Status colors mark state, not actions"
          detail="Success, info and warning describe what happened or what needs attention. Buttons say what happens next, so they keep the button hierarchy; destructive is the only status color on an action."
          good={
            <>
              <StatusBadge status="Ready" />
              <Button>Promote to production</Button>
            </>
          }
          bad={
            <>
              <Button className="bg-success text-success-foreground">Promote to production</Button>
              <Button className="bg-warning text-warning-foreground">Roll back</Button>
            </>
          }
        />
        <Guideline
          rule="Status is never color alone"
          detail="Pair the color with an icon and a word. About 1 in 12 men can’t tell red from green, and screen readers can’t see color at all."
          good={
            <>
              <StatusBadge status="Ready" />
              <StatusBadge status="Error" />
            </>
          }
          bad={
            <>
              <span aria-hidden="true" className="size-2.5 rounded-full bg-success" />
              <span aria-hidden="true" className="size-2.5 rounded-full bg-destructive" />
            </>
          }
        />
      </div>
    </Section>
  )
}
