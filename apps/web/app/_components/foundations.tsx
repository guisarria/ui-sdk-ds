"use client"

import * as React from "react"
import {
  BellIcon,
  GitBranchIcon,
  RocketIcon,
  SearchIcon,
  SettingsIcon,
  ShieldCheckIcon,
} from "lucide-react"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui-sdk-ds/ui/components/table"
import { cn } from "@ui-sdk-ds/ui/lib/utils"

import { ColorPair } from "./color-pair"
import { Block, Example, Section } from "./showcase"

const colorRoles = [
  {
    name: "Canvas",
    description: "Page floor and default text.",
    background: "background",
    foreground: "foreground",
  },
  {
    name: "Card",
    description: "Cards and attachments.",
    background: "card",
    foreground: "card-foreground",
  },
  {
    name: "Popover",
    description: "Menus, dialogs, sheets, toasts.",
    background: "popover",
    foreground: "popover-foreground",
  },
  {
    name: "Primary",
    description: "The one main action, checked controls.",
    background: "primary",
    foreground: "primary-foreground",
  },
  {
    name: "Brand",
    description: "Logo marks and the send button. Nothing else.",
    background: "brand",
    foreground: "brand-foreground",
  },
  {
    name: "Secondary",
    description: "Supporting buttons and badges.",
    background: "secondary",
    foreground: "secondary-foreground",
  },
  {
    name: "Muted",
    description: "Tab lists, skeletons, soft bands.",
    background: "muted",
    foreground: "muted-foreground",
  },
  {
    name: "Accent",
    description: "Highlighted menu and select items.",
    background: "accent",
    foreground: "accent-foreground",
  },
  {
    name: "Destructive",
    description: "Errors and destructive actions.",
    background: "background",
    foreground: "destructive",
  },
  {
    name: "Success",
    description: "Finished and healthy states.",
    background: "background",
    foreground: "success",
  },
  {
    name: "Info",
    description: "Running work and notices.",
    background: "background",
    foreground: "info",
  },
  {
    name: "Warning",
    description: "Things that need attention soon.",
    background: "background",
    foreground: "warning",
  },
  {
    name: "Supporting text",
    description: "Descriptions and captions on the canvas.",
    background: "background",
    foreground: "muted-foreground",
  },
  {
    name: "Sidebar",
    description: "Navigation rail surface.",
    background: "sidebar",
    foreground: "sidebar-foreground",
  },
  {
    name: "Sidebar primary",
    description: "Brand mark in the rail.",
    background: "sidebar-primary",
    foreground: "sidebar-primary-foreground",
  },
  {
    name: "Sidebar accent",
    description: "Hovered and active rail items.",
    background: "sidebar-accent",
    foreground: "sidebar-accent-foreground",
  },
]

const palette = [
  {
    group: "Surfaces",
    tokens: ["background", "card", "popover", "secondary", "muted", "accent"],
  },
  {
    group: "Ink",
    tokens: [
      "foreground",
      "muted-foreground",
      "primary-foreground",
      "brand-foreground",
      "secondary-foreground",
      "success-foreground",
      "info-foreground",
      "warning-foreground",
    ],
  },
  {
    group: "Action, brand and status",
    tokens: ["primary", "brand", "destructive", "success", "info", "warning"],
  },
  { group: "Lines and focus", tokens: ["border", "input", "ring"] },
  {
    group: "Charts",
    tokens: ["chart-1", "chart-2", "chart-3", "chart-4", "chart-5"],
  },
  {
    group: "Sidebar",
    tokens: [
      "sidebar",
      "sidebar-foreground",
      "sidebar-primary",
      "sidebar-primary-foreground",
      "sidebar-accent",
      "sidebar-accent-foreground",
      "sidebar-border",
      "sidebar-ring",
    ],
  },
]

const typeScale = [
  {
    token: "type-display",
    spec: "36–60 / 1.05 / 600 / −4%",
    use: "Page titles",
    sample: "Ship every branch to its own URL",
    className: "type-display",
  },
  {
    token: "type-heading",
    spec: "24–30 / 1.2 / 600 / −3%",
    use: "Section heads",
    sample: "Deployments",
    className: "type-heading",
  },
  {
    token: "type-subheading",
    spec: "18 / 1.4 / 500 / −1%",
    use: "Block titles",
    sample: "Preview deployments",
    className: "type-subheading",
  },
  {
    token: "font-heading text-base font-medium",
    spec: "16 / 1.5 / 500",
    use: "Card, dialog and sheet titles",
    sample: "Invite your team",
    className: "font-heading text-base font-medium",
  },
  {
    token: "text-sm",
    spec: "14 / 1.43 / 400",
    use: "Body, descriptions, inputs",
    sample: "Every push to a branch gets its own preview URL.",
    className: "text-sm",
  },
  {
    token: "text-sm font-medium",
    spec: "14 / 1.43 / 500",
    use: "Buttons, labels, tabs",
    sample: "Redeploy without cache",
    className: "text-sm font-medium",
  },
  {
    token: "text-xs font-medium",
    spec: "12 / 1.33 / 500",
    use: "Badges, Kbd, menu labels",
    sample: "Production · Ready",
    className: "text-xs font-medium",
  },
  {
    token: "type-eyebrow",
    spec: "12 / 1.33 / 500 / +6% · mono caps",
    use: "Eyebrows above headings",
    sample: "02 · Foundations",
    className: "type-eyebrow",
  },
  {
    token: "font-mono text-xs",
    spec: "12 / 1.33 / 400 · mono",
    use: "IDs, tokens, values",
    sample: "dpl_8Kq2 · oklch(0.205 0 0)",
    className: "font-mono text-xs",
  },
]

const spacingScale = [1, 1.5, 2, 3, 4, 5, 6, 8, 12, 16, 24]

const spacingLadder = [
  {
    step: "6px",
    token: "gap-1.5",
    name: "Icon to label",
    use: "Button, Badge, Tabs",
  },
  {
    step: "12px",
    token: "gap-3",
    name: "Label to control",
    use: "Field",
  },
  {
    step: "16–20px",
    token: "--card-spacing",
    name: "Inside a card",
    use: "Card (16px when size is sm)",
  },
  {
    step: "24px",
    token: "gap-6",
    name: "Field to field",
    use: "FieldGroup, dialog body",
  },
  {
    step: "64px",
    token: "gap-16",
    name: "Block to block",
    use: "Stacked content blocks",
  },
  {
    step: "96px",
    token: "py-24",
    name: "Section to section",
    use: "Full-width page bands",
  },
]

const radii = [
  {
    token: "rounded-md",
    value: "0.36rem · 5.8px",
    use: "Extra-small attachment media",
    className: "rounded-md",
  },
  {
    token: "rounded-lg",
    value: "0.45rem · 7.2px",
    use: "Kbd, attachment media",
    className: "rounded-lg",
  },
  {
    token: "rounded-xl",
    value: "0.63rem · 10.1px",
    use: "Menu, select and command items, tooltips, sidebar items",
    className: "rounded-xl",
  },
  {
    token: "rounded-2xl",
    value: "0.81rem · 13px",
    use: "Buttons, inputs, selects, badges, tabs, alerts, menus, toasts",
    className: "rounded-2xl",
  },
  {
    token: "rounded-3xl",
    value: "0.99rem · 15.8px",
    use: "Popovers, hover cards, command, empty states, bubbles",
    className: "rounded-3xl",
  },
  {
    token: "min(rounded-4xl, 24px)",
    value: "1.17rem · 18.7px",
    use: "Cards, dialogs, alert dialogs, drawers",
    className: "rounded-[min(var(--radius-4xl),24px)]",
  },
  {
    token: "rounded-full",
    value: "pill",
    use: "Avatars, radios, scrollbar thumbs",
    className: "rounded-full",
  },
]

const elevations = [
  {
    name: "Flat",
    token: "none",
    use: "Canvas, sections, filled inputs, tab lists",
    className: "",
  },
  {
    name: "Card",
    token: "shadow-sm ring-1 ring-foreground/5",
    use: "Cards",
    className: "shadow-sm ring-1 ring-foreground/5 dark:ring-foreground/10",
  },
  {
    name: "Raised",
    token: "shadow-lg ring-1 ring-foreground/5",
    use: "Popovers, menus, selects, comboboxes, hover cards, toasts",
    className: "shadow-lg ring-1 ring-foreground/5 dark:ring-foreground/10",
  },
  {
    name: "Overlay",
    token: "shadow-xl ring-1 ring-foreground/5",
    use: "Dialogs, alert dialogs, sheets, drawers",
    className: "shadow-xl ring-1 ring-foreground/5 dark:ring-foreground/10",
  },
]

const motion = [
  {
    token: "duration-100",
    time: "100ms",
    easing: "ease · fade + zoom from 95%",
    use: "Popover, menu, select, dialog open and close",
  },
  {
    token: "duration-200",
    time: "200ms",
    easing: "ease · ease-in-out for sheets",
    use: "Field focus ring, sheet slide, sidebar width",
  },
  {
    token: "h-(--accordion-panel-height)",
    time: "200ms",
    easing: "ease-out",
    use: "Accordion panels",
  },
  {
    token: "duration-[0.35s]",
    time: "350ms",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    use: "Navigation menu viewport",
  },
  {
    token: "duration-450",
    time: "450ms",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    use: "Drawer",
  },
  {
    token: "toast",
    time: "500ms",
    easing: "cubic-bezier(0.22, 1, 0.36, 1)",
    use: "Toast stack",
  },
]

const iconSizes = [
  { size: "size-3", px: 12, use: "xs buttons, badges" },
  { size: "size-3.5", px: 14, use: "checkbox, breadcrumb" },
  { size: "size-4", px: 16, use: "default in controls" },
  { size: "size-5", px: 20, use: "empty state media" },
  { size: "size-6", px: 24, use: "vertical attachments" },
  { size: "size-8", px: 32, use: "alert dialog media" },
]

const iconSet = [RocketIcon, GitBranchIcon, SearchIcon, BellIcon, ShieldCheckIcon, SettingsIcon]

function subscribeToTheme(callback: () => void) {
  const observer = new MutationObserver(callback)
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["style", "data-palette", "data-color-scheme"],
  })
  const media = matchMedia("(prefers-color-scheme: dark)")
  media.addEventListener("change", callback)
  return () => {
    observer.disconnect()
    media.removeEventListener("change", callback)
  }
}

function useTokenValue(token: string) {
  return React.useSyncExternalStore(
    subscribeToTheme,
    () => getComputedStyle(document.documentElement).getPropertyValue(`--${token}`).trim(),
    () => "",
  )
}

function Swatch({ token }: { token: string }) {
  const value = useTokenValue(token)

  return (
    <div className="flex min-w-0 items-center gap-3">
      <div
        className="size-11 shrink-0 rounded-xl border"
        style={{ background: `var(--${token})` }}
      />
      <div className="flex min-w-0 flex-col">
        <span className="truncate font-mono text-xs">--{token}</span>
        <span className="truncate font-mono text-xs text-muted-foreground">{value || " "}</span>
      </div>
    </div>
  )
}

export function Foundations() {
  return (
    <Section
      id="foundations"
      eyebrow="02 · Foundations"
      title="Foundations"
      description="The tokens every component is built from: color, type, spacing, radius, elevation, motion and icons."
    >
      <Block
        id="color-roles"
        title="Color roles"
        description="Surfaces and the text that sits on them. Body text needs at least 4.5:1."
        className="sm:grid-cols-2 lg:grid-cols-4"
      >
        {colorRoles.map((role) => (
          <ColorPair key={role.name} {...role} />
        ))}
      </Block>

      <Block
        id="palette"
        title="Palette"
        description="Every color variable in the theme, grouped by job."
        className="lg:grid-cols-3"
      >
        {palette.map((group) => (
          <div key={group.group} className="flex min-w-0 flex-col gap-4">
            <h4 className="text-sm font-medium">{group.group}</h4>
            <div className="grid gap-3">
              {group.tokens.map((token) => (
                <Swatch key={token} token={token} />
              ))}
            </div>
          </div>
        ))}
      </Block>

      <Block
        id="typography"
        title="Typography"
        description="Geist for everything, Geist Mono for code and values. Page headings use the type-* roles; components set their own text sizes."
        className="lg:grid-cols-1"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Size / line / weight / tracking</TableHead>
              <TableHead>Use</TableHead>
              <TableHead>Specimen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {typeScale.map((row) => (
              <TableRow key={row.token}>
                <TableCell className="font-mono text-xs">{row.token}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {row.spec}
                </TableCell>
                <TableCell className="text-muted-foreground">{row.use}</TableCell>
                <TableCell className="w-full max-w-0 min-w-64">
                  <span className={cn("block truncate", row.className)}>{row.sample}</span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Example title="Running text · text-sm, 65 characters per line">
          <p className="max-w-[65ch] text-sm/relaxed text-pretty">
            Preview deployments build every pull request in its own environment, so reviewers open a
            link instead of checking out a branch. When CI has already built the app, run{" "}
            <code className="rounded-md bg-muted px-1 py-0.5 font-mono text-xs">
              acme deploy --prebuilt
            </code>{" "}
            to upload the output in{" "}
            <code className="rounded-md bg-muted px-1 py-0.5 font-mono text-xs">.acme/output</code>{" "}
            and skip the build step. Turn on the{" "}
            <a
              href="#example-screen"
              className="font-medium underline underline-offset-4 hover:text-muted-foreground"
            >
              build cache
            </a>{" "}
            to make the next build faster.
          </p>
        </Example>
      </Block>

      <Block
        id="spacing"
        title="Spacing"
        description="A 4px base unit (--spacing: 0.25rem). Components only use steps from this scale."
      >
        <Example title="Scale" className="flex-col items-stretch gap-2.5">
          {spacingScale.map((step) => (
            <div key={step} className="flex items-center gap-4">
              <span className="w-14 shrink-0 font-mono text-xs text-muted-foreground">
                {step * 4}px
              </span>
              <div
                className="h-3 rounded-sm bg-primary"
                style={{ width: `calc(var(--spacing) * ${step})` }}
              />
              <span className="font-mono text-xs text-muted-foreground">{step}</span>
            </div>
          ))}
        </Example>
        <Example title="Semantic ladder" className="flex-col items-stretch gap-0 p-0 sm:p-0">
          {spacingLadder.map((rung) => (
            <div
              key={rung.name}
              className="flex items-center gap-4 border-b px-4 py-3 last:border-b-0 sm:px-6"
            >
              <span className="w-16 shrink-0 font-mono text-xs">{rung.step}</span>
              <div className="flex min-w-0 flex-1 flex-col">
                <span className="text-sm font-medium">{rung.name}</span>
                <span className="truncate text-xs text-muted-foreground">{rung.use}</span>
              </div>
              <span className="shrink-0 font-mono text-xs text-muted-foreground">{rung.token}</span>
            </div>
          ))}
        </Example>
      </Block>

      <Block
        id="radius"
        title="Radius"
        description="--radius is 0.45rem. Every step multiplies it, so one change rescales the whole system."
      >
        <Example
          title="Ladder"
          wide
          className="grid grid-cols-2 items-start gap-6 sm:grid-cols-4 lg:grid-cols-7"
        >
          {radii.map((radius) => (
            <div key={radius.token} className="flex min-w-0 flex-col gap-3">
              <div
                className={cn("aspect-square w-full max-w-24 border bg-muted", radius.className)}
              />
              <div className="flex flex-col gap-0.5">
                <span className="font-mono text-xs">{radius.token}</span>
                <span className="font-mono text-xs text-muted-foreground">{radius.value}</span>
                <span className="text-xs text-pretty text-muted-foreground">{radius.use}</span>
              </div>
            </div>
          ))}
        </Example>
        <p className="text-sm text-muted-foreground lg:col-span-2">
          Checkboxes are the one exception, with a fixed 5px radius.
        </p>
      </Block>

      <Block
        id="elevation"
        title="Elevation"
        description="Hairline rings do most of the work; shadows grow with how far a layer floats above the page."
      >
        <Example
          title="Levels"
          wide
          className="grid gap-6 bg-muted/40 sm:grid-cols-2 lg:grid-cols-4"
        >
          {elevations.map((level) => (
            <div
              key={level.name}
              className={cn(
                "flex min-h-36 flex-col justify-between gap-4 rounded-2xl bg-background p-4",
                level.className,
              )}
            >
              <span className="text-sm font-medium">{level.name}</span>
              <div className="flex flex-col gap-1">
                <span className="font-mono text-xs">{level.token}</span>
                <span className="text-xs text-pretty text-muted-foreground">{level.use}</span>
              </div>
            </div>
          ))}
        </Example>
      </Block>

      <Block
        id="motion"
        title="Motion"
        description="Short and functional. Overlays appear in 100ms; only large surfaces like drawers and toasts take longer."
        className="lg:grid-cols-1"
      >
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Token</TableHead>
              <TableHead>Duration</TableHead>
              <TableHead>Easing</TableHead>
              <TableHead>Use</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {motion.map((row) => (
              <TableRow key={row.token}>
                <TableCell className="font-mono text-xs">{row.token}</TableCell>
                <TableCell className="font-mono text-xs">{row.time}</TableCell>
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {row.easing}
                </TableCell>
                <TableCell className="text-muted-foreground">{row.use}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Block>

      <Block
        id="icons"
        title="Icons"
        description="Lucide at a 2px stroke. Controls size their own icons, so icons inside components never take a size class."
        className="lg:grid-cols-1"
      >
        <Example
          title="Sizes in foreground and muted-foreground"
          className="grid grid-cols-2 items-end gap-6 sm:grid-cols-3 lg:grid-cols-6"
        >
          {iconSizes.map((item, index) => {
            const Icon = iconSet[index] ?? RocketIcon
            return (
              <div key={item.size} className="flex flex-col gap-3">
                <div className="flex items-end gap-3">
                  <Icon className={item.size} aria-hidden="true" />
                  <Icon className={cn(item.size, "text-muted-foreground")} aria-hidden="true" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="font-mono text-xs">
                    {item.size} · {item.px}px
                  </span>
                  <span className="text-xs text-muted-foreground">{item.use}</span>
                </div>
              </div>
            )
          })}
        </Example>
      </Block>
    </Section>
  )
}
