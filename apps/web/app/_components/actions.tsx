"use client"

import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  ArchiveIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  BoldIcon,
  CalendarDaysIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  CopyIcon,
  ExternalLinkIcon,
  GitBranchIcon,
  ItalicIcon,
  KanbanIcon,
  ListIcon,
  MinusIcon,
  PlusIcon,
  RotateCcwIcon,
  StarIcon,
  Trash2Icon,
  UnderlineIcon,
} from "lucide-react"

import { Badge } from "@ui-sdk-ds/ui/components/badge"
import { Button } from "@ui-sdk-ds/ui/components/button"
import {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
} from "@ui-sdk-ds/ui/components/button-group"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@ui-sdk-ds/ui/components/dropdown-menu"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@ui-sdk-ds/ui/components/input-group"
import { Kbd, KbdGroup } from "@ui-sdk-ds/ui/components/kbd"
import { Spinner } from "@ui-sdk-ds/ui/components/spinner"
import { Toggle } from "@ui-sdk-ds/ui/components/toggle"
import { ToggleGroup, ToggleGroupItem } from "@ui-sdk-ds/ui/components/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui-sdk-ds/ui/components/tooltip"

import type { DeploymentStatus } from "./data"
import { Block, Example, Section, Variant } from "./showcase"
import { previewState, StateMatrix } from "./state-matrix"
import { StatusBadge } from "./status-badge"

const buttonVariants = [
  {
    name: "default",
    when: "The one primary action in a view or group.",
  },
  {
    name: "secondary",
    when: "Supporting actions that sit next to a primary.",
  },
  {
    name: "outline",
    when: "Neutral actions in toolbars, forms and cards.",
  },
  {
    name: "ghost",
    when: "Low-emphasis actions in dense rows, menus and headers.",
  },
  {
    name: "destructive",
    when: "Deletes or revokes something. Confirm before it runs.",
  },
  {
    name: "link",
    when: "Navigation that reads like inline text.",
  },
  {
    name: "brand",
    when: "The composer’s send button. Keep it rare so clay stays special.",
  },
] as const

const buttonVariantNames = buttonVariants.map((variant) => variant.name)

export function Actions() {
  return (
    <Section
      id="actions"
      eyebrow="03 · Components · Actions"
      title="Actions"
      description="Things people click to make something happen. Every view has at most one primary action; everything else steps down in emphasis."
    >
      <ButtonBlock />
      <ButtonGroupBlock />
      <ToggleBlock />
      <ToggleGroupBlock />
      <BadgeBlock />
      <KbdBlock />
    </Section>
  )
}

function ButtonBlock() {
  return (
    <Block
      id="button"
      title="Button"
      description="Starts an action. Label it with a verb that says what happens: “Deploy”, not “OK”."
    >
      <Example title="Typical · one primary, one supporting">
        <Button>Deploy to production</Button>
        <Button variant="outline">View build logs</Button>
      </Example>
      <Example title="Sizes · xs, sm, default, lg">
        <Button size="xs">Redeploy</Button>
        <Button size="sm">Redeploy</Button>
        <Button>Redeploy</Button>
        <Button size="lg">Redeploy</Button>
      </Example>
      <Example title="Variants · in priority order" wide className="grid gap-4 sm:grid-cols-2">
        {buttonVariants.map((variant) => (
          <Variant key={variant.name} name={variant.name} when={variant.when}>
            {variant.name === "brand" ? (
              <Button variant="brand" size="icon" aria-label="Send message">
                <ArrowUpIcon />
              </Button>
            ) : (
              <Button variant={variant.name}>
                {variant.name === "destructive" ? "Delete project" : "Redeploy"}
              </Button>
            )}
          </Variant>
        ))}
      </Example>
      <Example title="With icon · leading, trailing, icon only">
        <Button variant="outline">
          <GitBranchIcon data-icon="inline-start" />
          New branch
        </Button>
        <Button>
          Continue
          <ArrowRightIcon data-icon="inline-end" />
        </Button>
        <Tooltip>
          <TooltipTrigger
            render={<Button variant="outline" size="icon" aria-label="Copy deployment URL" />}
          >
            <CopyIcon />
          </TooltipTrigger>
          <TooltipContent>Copy deployment URL</TooltipContent>
        </Tooltip>
      </Example>
      <Example title="Icon sizes · icon-xs, icon-sm, icon, icon-lg">
        {(["icon-xs", "icon-sm", "icon", "icon-lg"] as const).map((size) => (
          <Button key={size} variant="secondary" size={size} aria-label="Add to favorites">
            <StarIcon />
          </Button>
        ))}
      </Example>
      <Example title="States" wide className="block p-2 sm:p-4">
        <StateMatrix
          rows={buttonVariantNames}
          states={["default", "hover", "focus", "active", "disabled", "loading"]}
          render={(variant, state) =>
            state === "loading" ? (
              <Button variant={variant} disabled>
                <Spinner data-icon="inline-start" />
                Redeploying…
              </Button>
            ) : (
              <Button variant={variant} {...previewState(state)}>
                Redeploy
              </Button>
            )
          }
        />
      </Example>
      <Example title="Edge case · long label in a narrow column">
        <div className="flex w-56 flex-col gap-2">
          <Button className="max-w-full">
            <span className="truncate">Promote dpl_7Hn5 to production and notify reviewers</span>
          </Button>
          <p className="text-xs text-muted-foreground">
            Labels never wrap. Cap the width and truncate, and keep the verb first so it survives.
          </p>
        </div>
      </Example>
      <Example title="Edge case · as a link">
        <Button variant="link" render={<a href="#patterns" />}>
          See the settings screen
        </Button>
        <Button
          variant="outline"
          render={
            <a href="https://ui-sdk.dev/docs/components/button" target="_blank" rel="noreferrer" />
          }
        >
          ui-sdk docs
          <ExternalLinkIcon data-icon="inline-end" />
        </Button>
      </Example>
    </Block>
  )
}

function ButtonGroupBlock() {
  return (
    <Block
      id="button-group"
      title="Button group"
      description="Joins related actions into one control, like a split button or a stepper."
    >
      <Example title="Typical · split button">
        <ButtonGroup>
          <Button variant="outline">
            <RotateCcwIcon data-icon="inline-start" />
            Redeploy
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger
              render={<Button variant="outline" size="icon" aria-label="More redeploy options" />}
            >
              <ChevronDownIcon />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuItem>Redeploy without cache</DropdownMenuItem>
                <DropdownMenuItem>Redeploy to preview</DropdownMenuItem>
                <DropdownMenuItem>Schedule redeploy…</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </Example>
      <Example title="With text and an input">
        <ButtonGroup className="w-full max-w-sm">
          <ButtonGroupText>https://</ButtonGroupText>
          <InputGroup>
            <InputGroupInput name="subdomain" aria-label="Subdomain" defaultValue="dashboard" />
            <InputGroupAddon align="inline-end">.example.com</InputGroupAddon>
          </InputGroup>
        </ButtonGroup>
      </Example>
      <Example title="Nested groups · pager and zoom">
        <ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Previous deployment">
              <ChevronLeftIcon />
            </Button>
            <Button variant="outline" size="icon" aria-label="Next deployment">
              <ChevronRightIcon />
            </Button>
          </ButtonGroup>
          <ButtonGroup>
            <Button variant="outline" size="icon" aria-label="Zoom out">
              <MinusIcon />
            </Button>
            <Button variant="outline">100%</Button>
            <Button variant="outline" size="icon" aria-label="Zoom in">
              <PlusIcon />
            </Button>
          </ButtonGroup>
        </ButtonGroup>
      </Example>
      <Example title="Vertical · with separators on filled buttons">
        <ButtonGroup orientation="vertical">
          <Button variant="outline" size="icon" aria-label="Zoom in">
            <PlusIcon />
          </Button>
          <Button variant="outline" size="icon" aria-label="Zoom out">
            <MinusIcon />
          </Button>
        </ButtonGroup>
        <ButtonGroup>
          <Button variant="secondary">Archive</Button>
          <ButtonGroupSeparator />
          <Button variant="secondary">Snooze</Button>
          <ButtonGroupSeparator />
          <Button variant="secondary" size="icon" aria-label="More actions">
            <ChevronDownIcon />
          </Button>
        </ButtonGroup>
      </Example>
    </Block>
  )
}

function ToggleBlock() {
  return (
    <Block
      id="toggle"
      title="Toggle"
      description="A button that stays pressed. Use it for a setting that applies while it’s on, like bold text or a filter."
    >
      <Example title="Typical · formatting">
        <Toggle aria-label="Bold" defaultPressed>
          <BoldIcon />
        </Toggle>
        <Toggle aria-label="Italic">
          <ItalicIcon />
        </Toggle>
        <Toggle aria-label="Underline">
          <UnderlineIcon />
        </Toggle>
      </Example>
      <Example title="Variants and sizes · default, outline × sm, default, lg">
        <Toggle size="sm" aria-label="Star project">
          <StarIcon />
        </Toggle>
        <Toggle aria-label="Star project">
          <StarIcon />
        </Toggle>
        <Toggle size="lg" aria-label="Star project">
          <StarIcon />
        </Toggle>
        <Toggle variant="outline" size="sm">
          <ArchiveIcon data-icon="inline-start" />
          Archived
        </Toggle>
        <Toggle variant="outline">
          <ArchiveIcon data-icon="inline-start" />
          Archived
        </Toggle>
      </Example>
      <Example title="States" wide className="block p-2 sm:p-4">
        <StateMatrix
          rows={["default", "outline"] as const}
          states={["off", "hover", "focus", "on", "disabled"]}
          render={(variant, state) => (
            <Toggle variant={variant} defaultPressed={state === "on"} {...previewState(state)}>
              <ArchiveIcon data-icon="inline-start" />
              Archived
            </Toggle>
          )}
        />
      </Example>
    </Block>
  )
}

function ToggleGroupBlock() {
  return (
    <Block
      id="toggle-group"
      title="Toggle group"
      description="Picks one or several options from a short set of two to seven. Don’t rebuild it from buttons with an active state."
    >
      <Example title="Typical · view switcher, joined">
        <ToggleGroup
          aria-label="Deployment view"
          variant="outline"
          spacing={0}
          defaultValue={["list"]}
        >
          <ToggleGroupItem value="list">
            <ListIcon data-icon="inline-start" />
            List
          </ToggleGroupItem>
          <ToggleGroupItem value="board">
            <KanbanIcon data-icon="inline-start" />
            Board
          </ToggleGroupItem>
          <ToggleGroupItem value="calendar">
            <CalendarDaysIcon data-icon="inline-start" />
            Calendar
          </ToggleGroupItem>
        </ToggleGroup>
      </Example>
      <Example title="Spaced · single choice">
        <ToggleGroup aria-label="Report frequency" defaultValue={["weekly"]}>
          <ToggleGroupItem value="daily">Daily</ToggleGroupItem>
          <ToggleGroupItem value="weekly">Weekly</ToggleGroupItem>
          <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
        </ToggleGroup>
      </Example>
      <Example title="Multiple · formatting">
        <ToggleGroup
          aria-label="Text formatting"
          multiple
          variant="outline"
          spacing={0}
          defaultValue={["bold", "italic"]}
        >
          <ToggleGroupItem value="bold" aria-label="Bold">
            <BoldIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="italic" aria-label="Italic">
            <ItalicIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="underline" aria-label="Underline">
            <UnderlineIcon />
          </ToggleGroupItem>
        </ToggleGroup>
        <ToggleGroup
          aria-label="Alignment"
          size="sm"
          variant="outline"
          spacing={0}
          defaultValue={["left"]}
          disabled
        >
          <ToggleGroupItem value="left" aria-label="Align left">
            <AlignLeftIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="center" aria-label="Align center">
            <AlignCenterIcon />
          </ToggleGroupItem>
          <ToggleGroupItem value="right" aria-label="Align right">
            <AlignRightIcon />
          </ToggleGroupItem>
        </ToggleGroup>
      </Example>
      <Example title="Vertical">
        <ToggleGroup
          aria-label="Environment"
          orientation="vertical"
          variant="outline"
          spacing={0}
          defaultValue={["production"]}
        >
          <ToggleGroupItem value="production">Production</ToggleGroupItem>
          <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
          <ToggleGroupItem value="development">Development</ToggleGroupItem>
        </ToggleGroup>
      </Example>
    </Block>
  )
}

const statuses: Array<DeploymentStatus> = ["Ready", "Building", "Queued", "Error", "Canceled"]

const badgeVariants = [
  {
    name: "default",
    when: "Counts and the one label that matters most.",
    label: "Production",
  },
  { name: "secondary", when: "Neutral metadata like a role.", label: "Admin" },
  {
    name: "success",
    when: "Finished and healthy: ready, verified, paid.",
    label: "Ready",
  },
  {
    name: "info",
    when: "Running or worth knowing: building, scheduled.",
    label: "Building",
  },
  {
    name: "warning",
    when: "Needs attention soon: pending, expiring.",
    label: "Pending",
  },
  { name: "destructive", when: "Errors and failed states.", label: "Failed" },
  { name: "outline", when: "Waiting states like queued.", label: "Queued" },
  { name: "ghost", when: "Quiet metadata in dense rows.", label: "Preview" },
  { name: "link", when: "A label that navigates.", label: "dashboard" },
] as const

function BadgeBlock() {
  return (
    <Block
      id="badge"
      title="Badge"
      description="A short, non-interactive label for status or metadata. Status always pairs an icon with a word, never color alone."
    >
      <Example title="Typical · deployment status">
        {statuses.map((status) => (
          <StatusBadge key={status} status={status} />
        ))}
      </Example>
      <Example title="Counts and environments">
        <Badge>12</Badge>
        <Badge variant="secondary" className="tabular-nums">
          99+
        </Badge>
        <Badge variant="outline">Production</Badge>
        <Badge variant="outline">Preview</Badge>
        <Badge variant="secondary">
          <Trash2Icon data-icon="inline-start" />
          Scheduled for deletion
        </Badge>
      </Example>
      <Example title="Variants" wide className="grid gap-4 sm:grid-cols-2">
        {badgeVariants.map((variant) => (
          <Variant key={variant.name} name={variant.name} when={variant.when}>
            {variant.name === "link" ? (
              <Badge variant="link" render={<a href="#data-display" />}>
                {variant.label}
              </Badge>
            ) : (
              <Badge variant={variant.name}>{variant.label}</Badge>
            )}
          </Variant>
        ))}
      </Example>
      <Example title="Edge case · long label">
        <div className="flex w-48 flex-col gap-2">
          <Badge variant="secondary" className="max-w-full">
            <span className="truncate">copy/annual-pricing-launch-v2</span>
          </Badge>
          <p className="text-xs text-muted-foreground">
            Badges don’t wrap. Cap the width and truncate branch names.
          </p>
        </div>
      </Example>
    </Block>
  )
}

function KbdBlock() {
  return (
    <Block
      id="kbd"
      title="Kbd"
      description="Shows a keyboard key or shortcut. Use the symbols people see on their keyboard."
    >
      <Example title="Typical · keys and combinations">
        <Kbd>Esc</Kbd>
        <KbdGroup>
          <Kbd>⌘</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
        <KbdGroup>
          <Kbd>Shift</Kbd>
          <span className="text-xs text-muted-foreground">+</span>
          <Kbd>Enter</Kbd>
        </KbdGroup>
      </Example>
      <Example title="In context · text, tooltip, input">
        <p className="text-sm text-muted-foreground">
          Press <Kbd>/</Kbd> to search deployments.
        </p>
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Archive" />}>
            <ArchiveIcon />
          </TooltipTrigger>
          <TooltipContent>
            Archive <Kbd>E</Kbd>
          </TooltipContent>
        </Tooltip>
        <InputGroup className="max-w-48">
          <InputGroupInput name="search" aria-label="Search" placeholder="Search…" />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </Example>
    </Block>
  )
}
