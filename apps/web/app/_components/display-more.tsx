"use client"

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItems,
  CommandList,
  type CommandData,
} from "@ui-sdk-ds/ui/components/command"
import { InputGroup, InputGroupAddon } from "@ui-sdk-ds/ui/components/input"
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@ui-sdk-ds/ui/components/meter"
import {
  Timeline,
  TimelineConnector,
  TimelineDescription,
  TimelineItem,
  TimelineMarker,
  TimelineTime,
  TimelineTitle,
} from "@ui-sdk-ds/ui/components/timeline"
import {
  Toolbar,
  ToolbarButton,
  ToolbarGroup,
  ToolbarSeparator,
} from "@ui-sdk-ds/ui/components/toolbar"
import {
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemIndicator,
  TreeItemLabel,
} from "@ui-sdk-ds/ui/components/tree"
import {
  Waterfall,
  WaterfallAxis,
  WaterfallBar,
  WaterfallCell,
  WaterfallColumnHeader,
  WaterfallHeaderRow,
  WaterfallRow,
  WaterfallRowHeader,
} from "@ui-sdk-ds/ui/components/waterfall"
import {
  AlignCenterIcon,
  AlignLeftIcon,
  AlignRightIcon,
  BoldIcon,
  FileIcon,
  FolderIcon,
  ItalicIcon,
  Redo2Icon,
  SearchIcon,
  UnderlineIcon,
  Undo2Icon,
} from "lucide-react"

import { Block, Example } from "./showcase"

const commands: CommandData = [
  {
    type: "group",
    label: "Project",
    items: [
      { value: "deploy-prod", label: "Deploy to production", shortcut: "alt+shift+d" },
      { value: "logs", label: "Open logs", shortcut: "alt+shift+l" },
    ],
  },
  { type: "separator" },
  {
    type: "group",
    label: "Preferences",
    items: [
      { value: "theme", label: "Change theme…", items: ["Light", "Dark", "System"] },
      {
        value: "region",
        label: "Switch region…",
        items: ["Frankfurt", "São Paulo", "Tokyo", "Virginia"],
      },
    ],
  },
]

const requests = [
  { value: "document", label: "/", start: 0, duration: 182, size: "14 kB" },
  { value: "styles", label: "app.css", start: 190, duration: 96, size: "8 kB" },
  { value: "script", label: "app.js", start: 192, duration: 410, size: "212 kB" },
  { value: "font", label: "inter.woff2", start: 300, duration: 220, size: "48 kB" },
  { value: "user", label: "api/user", start: 610, duration: 240, size: "1 kB" },
]

const events = [
  {
    title: "Deployed to production",
    dateTime: "2026-11-10T14:32",
    time: "Nov 10, 2:32 PM",
    description: "Version 2.4.1 is live in every region.",
  },
  {
    title: "Checks passed",
    dateTime: "2026-11-10T14:20",
    time: "Nov 10, 2:20 PM",
    description: "312 tests and the bundle size budget.",
  },
  {
    title: "Pull request merged",
    dateTime: "2026-11-10T13:58",
    time: "Nov 10, 1:58 PM",
    description: "Cache search results landed in main.",
  },
]

export function MoreNavigation() {
  return (
    <>
      <ToolbarBlock />
      <TreeBlock />
      <CommandDataBlock />
    </>
  )
}

export function MoreDataDisplay() {
  return (
    <>
      <MeterBlock />
      <TimelineBlock />
      <WaterfallBlock />
    </>
  )
}

function ToolbarBlock() {
  return (
    <Block
      id="toolbar"
      title="Toolbar"
      description="Groups controls into one tab stop. Arrow keys move between them, so a long row of buttons costs a keyboard user one Tab, not twelve."
    >
      <Example title="Typical · text formatting" wide>
        <Toolbar aria-label="Formatting">
          <ToolbarGroup>
            <ToolbarButton aria-label="Undo">
              <Undo2Icon />
            </ToolbarButton>
            <ToolbarButton aria-label="Redo">
              <Redo2Icon />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup>
            <ToolbarButton aria-label="Bold">
              <BoldIcon />
            </ToolbarButton>
            <ToolbarButton aria-label="Italic">
              <ItalicIcon />
            </ToolbarButton>
            <ToolbarButton aria-label="Underline">
              <UnderlineIcon />
            </ToolbarButton>
          </ToolbarGroup>
          <ToolbarSeparator />
          <ToolbarGroup>
            <ToolbarButton aria-label="Align left">
              <AlignLeftIcon />
            </ToolbarButton>
            <ToolbarButton aria-label="Align center">
              <AlignCenterIcon />
            </ToolbarButton>
            <ToolbarButton aria-label="Align right">
              <AlignRightIcon />
            </ToolbarButton>
          </ToolbarGroup>
        </Toolbar>
      </Example>
    </Block>
  )
}

function TreeBlock() {
  return (
    <Block
      id="tree"
      title="Tree"
      description="Shows nested items that open and close, like files in a repository. Arrow keys walk it: Right opens a branch, Left closes it or goes to its parent."
    >
      <Example title="Typical · a file tree" className="block">
        <Tree aria-label="Files" defaultExpanded={["src", "src/components"]} className="max-w-xs">
          <TreeItem value="src">
            <TreeItemLabel>
              <TreeItemIndicator />
              <FolderIcon aria-hidden="true" />
              src
            </TreeItemLabel>
            <TreeGroup>
              <TreeItem value="src/components">
                <TreeItemLabel>
                  <TreeItemIndicator />
                  <FolderIcon aria-hidden="true" />
                  components
                </TreeItemLabel>
                <TreeGroup>
                  {["button.tsx", "dialog.tsx", "tree.tsx"].map((file) => (
                    <TreeItem key={file} value={`src/components/${file}`}>
                      <TreeItemLabel>
                        <FileIcon aria-hidden="true" />
                        {file}
                      </TreeItemLabel>
                    </TreeItem>
                  ))}
                </TreeGroup>
              </TreeItem>
              <TreeItem value="src/index.ts">
                <TreeItemLabel>
                  <FileIcon aria-hidden="true" />
                  index.ts
                </TreeItemLabel>
              </TreeItem>
            </TreeGroup>
          </TreeItem>
          <TreeItem value="package.json">
            <TreeItemLabel>
              <FileIcon aria-hidden="true" />
              package.json
            </TreeItemLabel>
          </TreeItem>
        </Tree>
      </Example>
    </Block>
  )
}

function CommandDataBlock() {
  return (
    <Block
      id="command-pages"
      title="Command palette from data"
      description="Commands as data render with the same styled rows. A command with its own items opens a page; Backspace in the empty search goes back."
    >
      <Example title="Pages and shortcuts" className="block">
        <Command items={commands} className="rounded-2xl border">
          <InputGroup>
            <InputGroupAddon>
              <SearchIcon />
            </InputGroupAddon>
            <CommandInput aria-label="Search commands" placeholder="Type a command…" />
          </InputGroup>
          <CommandList>{(state) => <CommandItems items={state.items} />}</CommandList>
          <CommandEmpty>No commands found.</CommandEmpty>
        </Command>
      </Example>
    </Block>
  )
}

function MeterBlock() {
  return (
    <Block
      id="meter"
      title="Meter"
      description="Shows a measurement within a known range, like storage used. Use a progress bar for a task that finishes instead."
    >
      <Example title="Typical · with label and value" className="block">
        <div className="flex flex-col gap-5">
          <Meter value={62}>
            <MeterLabel>Storage</MeterLabel>
            <MeterValue />
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
          <Meter value={91}>
            <MeterLabel>Build minutes</MeterLabel>
            <MeterValue />
            <MeterTrack>
              <MeterIndicator />
            </MeterTrack>
          </Meter>
        </div>
      </Example>
    </Block>
  )
}

function TimelineBlock() {
  return (
    <Block
      id="timeline"
      title="Timeline"
      description="Lists events in order, newest first. Each event gets a title, a machine-readable time and an optional description."
    >
      <Example title="Typical · deploy activity" className="block">
        <Timeline aria-label="Activity">
          {events.map((event) => (
            <TimelineItem key={event.title}>
              <TimelineMarker />
              <TimelineConnector />
              <TimelineTitle>{event.title}</TimelineTitle>
              <TimelineTime dateTime={event.dateTime}>{event.time}</TimelineTime>
              <TimelineDescription>{event.description}</TimelineDescription>
            </TimelineItem>
          ))}
        </Timeline>
      </Example>
    </Block>
  )
}

function WaterfallBlock() {
  return (
    <Block
      id="waterfall"
      title="Waterfall"
      description="Lays out timed spans on one axis, like network requests or a trace. Rows stay a grid, so arrow keys move between them and each bar reads out its timing."
    >
      <Example title="Typical · network requests" wide className="block">
        <Waterfall aria-label="Network requests" items={requests}>
          <WaterfallHeaderRow>
            <WaterfallColumnHeader>Name</WaterfallColumnHeader>
            <WaterfallColumnHeader>Size</WaterfallColumnHeader>
            <WaterfallColumnHeader aria-label="Timeline">
              <WaterfallAxis maxTicks={5} />
            </WaterfallColumnHeader>
          </WaterfallHeaderRow>
          {requests.map((request) => (
            <WaterfallRow key={request.value} value={request.value}>
              <WaterfallRowHeader>{request.label}</WaterfallRowHeader>
              <WaterfallCell>{request.size}</WaterfallCell>
              <WaterfallBar />
            </WaterfallRow>
          ))}
        </Waterfall>
      </Example>
    </Block>
  )
}
