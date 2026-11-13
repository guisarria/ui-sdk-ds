"use client"

import * as React from "react"
import {
  ArchiveIcon,
  ChevronDownIcon,
  CopyIcon,
  CreditCardIcon,
  ExternalLinkIcon,
  GitBranchIcon,
  GlobeIcon,
  KeyRoundIcon,
  LogOutIcon,
  RocketIcon,
  RotateCcwIcon,
  SettingsIcon,
  ShareIcon,
  SlidersHorizontalIcon,
  Trash2Icon,
  UserIcon,
} from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui-sdk-ds/ui/components/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@ui-sdk-ds/ui/components/avatar"
import { Button } from "@ui-sdk-ds/ui/components/button"
import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@ui-sdk-ds/ui/components/command"
import {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from "@ui-sdk-ds/ui/components/context-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui-sdk-ds/ui/components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui-sdk-ds/ui/components/drawer"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@ui-sdk-ds/ui/components/dropdown-menu"
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldTitle,
} from "@ui-sdk-ds/ui/components/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui-sdk-ds/ui/components/hover-card"
import { Input } from "@ui-sdk-ds/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@ui-sdk-ds/ui/components/input-group"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemMedia,
  ItemTitle,
} from "@ui-sdk-ds/ui/components/item"
import { Kbd, KbdGroup } from "@ui-sdk-ds/ui/components/kbd"
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@ui-sdk-ds/ui/components/popover"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@ui-sdk-ds/ui/components/sheet"
import { Switch } from "@ui-sdk-ds/ui/components/switch"
import { Textarea } from "@ui-sdk-ds/ui/components/textarea"
import { toast } from "@ui-sdk-ds/ui/components/toast"
import { ToggleGroup, ToggleGroupItem } from "@ui-sdk-ds/ui/components/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui-sdk-ds/ui/components/tooltip"

import { avatarSrc } from "./data"
import { Block, Example, Section } from "./showcase"
import { StatusBadge } from "./status-badge"

export function Overlays() {
  return (
    <Section
      id="overlays"
      eyebrow="08 · Components · Overlays"
      title="Overlays"
      description="Layers that open above the page. Each one has a title, closes with Escape and returns focus to its trigger."
    >
      <DialogBlock />
      <SheetBlock />
      <PopoverBlock />
      <MenuBlock />
      <CommandBlock />
    </Section>
  )
}

function DialogBlock() {
  return (
    <Block
      id="dialog"
      title="Dialog and alert dialog"
      description="Dialogs hold a focused task. Alert dialogs confirm something destructive and name exactly what will be lost."
    >
      <Example title="Dialog · opens a form">
        <Dialog>
          <DialogTrigger render={<Button variant="outline" />}>
            <SettingsIcon data-icon="inline-start" />
            Edit project
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit project</DialogTitle>
              <DialogDescription>Changes apply from the next deployment.</DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field name="dialog-project-name">
                <FieldLabel>Name</FieldLabel>
                <Input defaultValue="dashboard" />
              </Field>
              <Field name="dialog-root-directory">
                <FieldLabel>Root directory</FieldLabel>
                <Input defaultValue="apps/dashboard" />
                <FieldDescription>Relative to the repository root.</FieldDescription>
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose render={<Button variant="outline" />}>Cancel</DialogClose>
              <DialogClose render={<Button />} onClick={() => toast({ title: "Project saved" })}>
                Save changes
              </DialogClose>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </Example>
      <Example title="Alert dialog · default and sm">
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="destructive" />}>
            <Trash2Icon data-icon="inline-start" />
            Delete project
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogMedia>
                <Trash2Icon />
              </AlertDialogMedia>
              <AlertDialogTitle>Delete marketing-site?</AlertDialogTitle>
              <AlertDialogDescription>
                This deletes 48 deployments and detaches 2 domains. You can’t undo it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Keep project</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => {
                  toast({ title: "marketing-site deleted", type: "error" })
                }}
              >
                Delete project
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
        <AlertDialog>
          <AlertDialogTrigger render={<Button variant="outline" />}>
            <KeyRoundIcon data-icon="inline-start" />
            Revoke token
          </AlertDialogTrigger>
          <AlertDialogContent size="sm">
            <AlertDialogHeader>
              <AlertDialogTitle>Revoke “CI deploys”?</AlertDialogTitle>
              <AlertDialogDescription>
                Pipelines using it will fail on their next run.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                variant="destructive"
                onClick={() => {
                  toast({ title: "Token revoked" })
                }}
              >
                Revoke
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Example>
    </Block>
  )
}

const sheetSides = [
  { side: "top", label: "Top" },
  { side: "right", label: "Right" },
  { side: "bottom", label: "Bottom" },
  { side: "left", label: "Left" },
] as const

function SheetBlock() {
  return (
    <Block
      id="sheet"
      title="Sheet and drawer"
      description="Sheets slide in from an edge for side tasks like filters or details. Drawers rise from the bottom and can be swiped away, which suits touch."
    >
      <Example title="Sheet · filters">
        <Sheet>
          <SheetTrigger render={<Button variant="outline" />}>
            <SlidersHorizontalIcon data-icon="inline-start" />
            Filter deployments
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Filter deployments</SheetTitle>
              <SheetDescription>
                Narrow the list. Filters stay until you clear them.
              </SheetDescription>
            </SheetHeader>
            <FieldGroup className="px-6">
              <Field name="filter-branch">
                <FieldLabel>Branch</FieldLabel>
                <Input placeholder="main" />
              </Field>
              <Field>
                <FieldTitle id="filter-environment-label">Environment</FieldTitle>
                <ToggleGroup
                  aria-labelledby="filter-environment-label"
                  variant="outline"
                  spacing={0}
                  defaultValue={["production"]}
                >
                  <ToggleGroupItem value="production">Production</ToggleGroupItem>
                  <ToggleGroupItem value="preview">Preview</ToggleGroupItem>
                </ToggleGroup>
              </Field>
              <Field name="filter-failed" orientation="horizontal">
                <FieldLabel>Only failed</FieldLabel>
                <Switch />
              </Field>
            </FieldGroup>
            <SheetFooter>
              <SheetClose render={<Button />}>Show 25 deployments</SheetClose>
              <SheetClose render={<Button variant="outline" />}>Cancel</SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      </Example>
      <Example title="Sheet · sides">
        {sheetSides.map(({ side, label }) => (
          <Sheet key={side}>
            <SheetTrigger render={<Button variant="secondary" size="sm" />}>{label}</SheetTrigger>
            <SheetContent side={side}>
              <SheetHeader>
                <SheetTitle>Deployment details</SheetTitle>
                <SheetDescription>dpl_8Kq2 · main · ready in 1m 42s</SheetDescription>
              </SheetHeader>
            </SheetContent>
          </Sheet>
        ))}
      </Example>
      <Example title="Drawer · share a preview">
        <Drawer showSwipeHandle>
          <DrawerTrigger render={<Button variant="outline" />}>
            <ShareIcon data-icon="inline-start" />
            Share preview
          </DrawerTrigger>
          <DrawerContent>
            <div className="mx-auto flex w-full max-w-md flex-col">
              <DrawerHeader>
                <DrawerTitle>Share this preview</DrawerTitle>
                <DrawerDescription>Anyone with the link can view it for 7 days.</DrawerDescription>
              </DrawerHeader>
              <div className="p-4">
                <InputGroup>
                  <InputGroupInput
                    name="preview-link"
                    aria-label="Preview link"
                    readOnly
                    defaultValue="https://dashboard-git-feat-invoice.example.com"
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      size="icon-xs"
                      aria-label="Copy link"
                      onClick={() => toast({ title: "Link copied" })}
                    >
                      <CopyIcon />
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
              </div>
              <DrawerFooter>
                <DrawerClose render={<Button />}>Done</DrawerClose>
              </DrawerFooter>
            </div>
          </DrawerContent>
        </Drawer>
      </Example>
    </Block>
  )
}

const tooltipSides = ["top", "right", "bottom", "left"] as const

function PopoverBlock() {
  return (
    <Block
      id="popover"
      title="Popover, hover card and tooltip"
      description="Popovers open on click and can hold controls. Hover cards preview a link. Tooltips name an icon button and never hold anything interactive."
    >
      <Example title="Popover · small form">
        <Popover>
          <PopoverTrigger render={<Button variant="outline" />}>Send feedback</PopoverTrigger>
          <PopoverContent align="start">
            <PopoverHeader>
              <PopoverTitle>Feedback</PopoverTitle>
              <PopoverDescription>Goes straight to the team.</PopoverDescription>
            </PopoverHeader>
            <Textarea
              name="feedback"
              aria-label="Feedback"
              placeholder="What would make deploys easier?"
            />
            <Button
              size="sm"
              className="self-end"
              onClick={() => toast({ title: "Thanks, feedback sent" })}
            >
              Send
            </Button>
          </PopoverContent>
        </Popover>
      </Example>
      <Example title="Hover card · user preview">
        <p className="text-sm text-muted-foreground">
          Last deployed by{" "}
          <HoverCard>
            <HoverCardTrigger
              href="#popover"
              className="font-medium text-foreground underline underline-offset-4"
            >
              Kenji Watanabe
            </HoverCardTrigger>
            <HoverCardContent>
              <div className="flex gap-3">
                <Avatar size="lg">
                  <AvatarImage src={avatarSrc(140)} alt="" />
                  <AvatarFallback>KW</AvatarFallback>
                </Avatar>
                <div className="flex min-w-0 flex-col gap-1">
                  <span className="text-sm font-medium">Kenji Watanabe</span>
                  <span className="text-sm text-muted-foreground">
                    Admin · Tokyo · joined in March
                  </span>
                  <span className="text-xs text-muted-foreground">
                    142 deployments this quarter
                  </span>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>{" "}
          9 minutes ago.
        </p>
      </Example>
      <Example title="Tooltip · four sides, with a shortcut" wide>
        {tooltipSides.map((side) => (
          <Tooltip key={side}>
            <TooltipTrigger render={<Button variant="outline" size="sm" />}>{side}</TooltipTrigger>
            <TooltipContent side={side}>Opens on the {side}</TooltipContent>
          </Tooltip>
        ))}
        <Tooltip>
          <TooltipTrigger render={<Button variant="outline" size="icon" aria-label="Archive" />}>
            <ArchiveIcon />
          </TooltipTrigger>
          <TooltipContent>
            Archive <Kbd>E</Kbd>
          </TooltipContent>
        </Tooltip>
      </Example>
    </Block>
  )
}

function MenuBlock() {
  const [showPreviews, setShowPreviews] = React.useState(true)
  const [environment, setEnvironment] = React.useState("production")

  return (
    <Block
      id="dropdown-menu"
      title="Dropdown menu and context menu"
      description="Menus list actions for one object. Put destructive items last, after a separator."
    >
      <Example title="Dropdown menu · account">
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="outline" />}>
            <Avatar size="sm">
              <AvatarImage src={avatarSrc(200)} alt="" />
              <AvatarFallback>AS</AvatarFallback>
            </Avatar>
            Ana Souza
            <ChevronDownIcon data-icon="inline-end" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60">
            <DropdownMenuGroup>
              <DropdownMenuLabel>ana@example.com</DropdownMenuLabel>
              <DropdownMenuItem>
                <UserIcon />
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <CreditCardIcon />
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>
                  <GlobeIcon />
                  Switch team
                </DropdownMenuSubTrigger>
                <DropdownMenuSubContent>
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Acme</DropdownMenuItem>
                    <DropdownMenuItem>Acme Labs</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuSubContent>
              </DropdownMenuSub>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuCheckboxItem checked={showPreviews} onCheckedChange={setShowPreviews}>
                Show preview deployments
              </DropdownMenuCheckboxItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Default environment</DropdownMenuLabel>
              <DropdownMenuRadioGroup value={environment} onValueChange={setEnvironment}>
                <DropdownMenuRadioItem value="production">Production</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="preview">Preview</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem variant="destructive">
                <LogOutIcon />
                Log out
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Example>
      <Example title="Context menu · right-click or long-press the row" className="block">
        <ContextMenu>
          <ContextMenuTrigger render={<Item variant="outline" />}>
            <ItemMedia variant="icon">
              <RocketIcon />
            </ItemMedia>
            <ItemContent className="min-w-0">
              <ItemTitle>dpl_8Kq2 · dashboard</ItemTitle>
              <ItemDescription>Retry failed webhooks with backoff</ItemDescription>
            </ItemContent>
            <StatusBadge status="Ready" />
          </ContextMenuTrigger>
          <ContextMenuContent className="w-56">
            <ContextMenuGroup>
              <ContextMenuLabel>dpl_8Kq2</ContextMenuLabel>
              <ContextMenuItem>
                <ExternalLinkIcon />
                Visit
              </ContextMenuItem>
              <ContextMenuItem>
                <CopyIcon />
                Copy URL
                <ContextMenuShortcut>⌘C</ContextMenuShortcut>
              </ContextMenuItem>
              <ContextMenuItem>
                <RotateCcwIcon />
                Redeploy
              </ContextMenuItem>
              <ContextMenuSub>
                <ContextMenuSubTrigger>
                  <GitBranchIcon />
                  Promote to
                </ContextMenuSubTrigger>
                <ContextMenuSubContent>
                  <ContextMenuGroup>
                    <ContextMenuItem>Production</ContextMenuItem>
                    <ContextMenuItem>Staging</ContextMenuItem>
                  </ContextMenuGroup>
                </ContextMenuSubContent>
              </ContextMenuSub>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuCheckboxItem defaultChecked>Pin to overview</ContextMenuCheckboxItem>
            </ContextMenuGroup>
            <ContextMenuSeparator />
            <ContextMenuGroup>
              <ContextMenuItem variant="destructive">
                <Trash2Icon />
                Delete deployment
              </ContextMenuItem>
            </ContextMenuGroup>
          </ContextMenuContent>
        </ContextMenu>
      </Example>
    </Block>
  )
}

function CommandBlock() {
  const [search, setSearch] = React.useState("kubernetes")
  const [open, setOpen] = React.useState(false)

  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key.toLowerCase() === "k" && (event.metaKey || event.ctrlKey)) {
        event.preventDefault()
        setOpen((current) => !current)
      }
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <Block
      id="command"
      title="Command"
      description="Search across actions and pages from the keyboard. Inline it in a popover, or open it as a palette with ⌘K."
    >
      <Example title="Inline · groups and shortcuts" className="block">
        <Command className="rounded-3xl border">
          <CommandInput placeholder="Type a command or search…" />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandList>
            <CommandGroup heading="Suggestions">
              <CommandItem>
                <RocketIcon />
                Deploy dashboard
              </CommandItem>
              <CommandItem>
                <GitBranchIcon />
                Create a preview branch
              </CommandItem>
              <CommandItem>
                <GlobeIcon />
                Add a domain
              </CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>
                <UserIcon />
                Profile
                <CommandShortcut>⇧⌘P</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <CreditCardIcon />
                Billing
                <CommandShortcut>⌘B</CommandShortcut>
              </CommandItem>
              <CommandItem>
                <SettingsIcon />
                Settings
                <CommandShortcut>⌘,</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </Example>
      <Example title="Empty · no matches, and the palette" className="block">
        <div className="flex flex-col gap-4">
          <Command query={search} onQueryChange={setSearch} className="rounded-3xl border">
            <CommandInput placeholder="Search projects…" />
            <CommandEmpty>No projects match “{search}”.</CommandEmpty>
            <CommandList>
              <CommandGroup heading="Projects">
                {["dashboard", "api", "marketing-site", "docs"].map((project) => (
                  <CommandItem key={project}>{project}</CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
          <Button variant="outline" className="self-start" onClick={() => setOpen(true)}>
            Open command palette
            <KbdGroup>
              <Kbd>⌘</Kbd>
              <Kbd>K</Kbd>
            </KbdGroup>
          </Button>
        </div>
        <CommandDialog open={open} onOpenChange={setOpen}>
          <Command>
            <CommandInput placeholder="Type a command or search…" />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandList>
              <CommandGroup heading="Go to">
                <CommandItem onSelect={() => setOpen(false)}>
                  <RocketIcon />
                  Deployments
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <GlobeIcon />
                  Domains
                </CommandItem>
                <CommandItem onSelect={() => setOpen(false)}>
                  <SettingsIcon />
                  Settings
                </CommandItem>
              </CommandGroup>
              <CommandSeparator />
              <CommandGroup heading="Actions">
                <CommandItem
                  onSelect={() => {
                    setOpen(false)
                    toast({ title: "Redeploying dashboard" })
                  }}
                >
                  <RotateCcwIcon />
                  Redeploy dashboard
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </CommandDialog>
      </Example>
    </Block>
  )
}
