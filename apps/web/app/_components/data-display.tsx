"use client"

import * as React from "react"
import Image from "next/image"
import {
  ChevronRightIcon,
  ChevronsUpDownIcon,
  FileCodeIcon,
  FolderIcon,
  MoreHorizontalIcon,
  RocketIcon,
  SearchXIcon,
  TerminalIcon,
} from "lucide-react"
import { Area, AreaChart, Bar, BarChart, CartesianGrid, XAxis } from "recharts"

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui-sdk-ds/ui/components/accordion"
import { AspectRatio } from "@ui-sdk-ds/ui/components/aspect-ratio"
import {
  Avatar,
  AvatarBadge,
  AvatarFallback,
  AvatarGroup,
  AvatarGroupCount,
  AvatarImage,
} from "@ui-sdk-ds/ui/components/avatar"
import { Badge } from "@ui-sdk-ds/ui/components/badge"
import { Button } from "@ui-sdk-ds/ui/components/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui-sdk-ds/ui/components/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselIndicators,
  CarouselNext,
  CarouselPrevious,
} from "@ui-sdk-ds/ui/components/carousel"
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@ui-sdk-ds/ui/components/chart"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui-sdk-ds/ui/components/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui-sdk-ds/ui/components/dropdown-menu"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@ui-sdk-ds/ui/components/empty"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemSeparator,
  ItemTitle,
} from "@ui-sdk-ds/ui/components/item"
import { Progress, ProgressLabel, ProgressValue } from "@ui-sdk-ds/ui/components/progress"
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@ui-sdk-ds/ui/components/resizable"
import { ScrollArea, ScrollBar } from "@ui-sdk-ds/ui/components/scroll-area"
import { Separator } from "@ui-sdk-ds/ui/components/separator"
import { Skeleton } from "@ui-sdk-ds/ui/components/skeleton"
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui-sdk-ds/ui/components/table"
import {
  EventCalendar,
  type EventCalendarProps,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar"
import { EventCalendarContent } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-content"
import { EventCalendarNav } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-nav"
import type { CalendarEvent } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-types"

import {
  auditLog,
  avatarSrc,
  buildMinutes,
  coverSrc,
  deployments,
  deploysPerDay,
  environmentVariables,
  faqs,
  members,
  releaseNotes,
  teamCalendar,
} from "./data"
import { MoreDataDisplay } from "./display-more"
import { Block, Example, Section } from "./showcase"
import { StatusBadge } from "./status-badge"

export function DataDisplay() {
  return (
    <Section
      id="data-display"
      eyebrow="06 · Components · Data display"
      title="Data display"
      description="Ways to present records, numbers and media. Lead with the value people came for; push metadata to muted text."
    >
      <CardBlock />
      <TableBlock />
      <ChartBlock />
      <ItemBlock />
      <AvatarBlock />
      <AccordionBlock />
      <CarouselBlock />
      <ScrollAreaBlock />
      <ResizableBlock />
      <EventCalendarBlock />
      <AspectRatioBlock />
      <MoreDataDisplay />
    </Section>
  )
}

function CardBlock() {
  return (
    <Block
      id="card"
      title="Card"
      description="Groups one topic’s content and actions. Use the full anatomy: header, content, footer, and an action slot in the header."
      className="lg:grid-cols-3"
    >
      <Example title="Typical" className="block">
        <Card>
          <CardHeader>
            <CardTitle>Bandwidth</CardTitle>
            <CardDescription>October 1–9</CardDescription>
            <CardAction>
              <Badge variant="secondary">Pro</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <Progress value={41}>
              <ProgressLabel>412 GB of 1 TB</ProgressLabel>
              <ProgressValue />
            </Progress>
          </CardContent>
          <CardFooter>
            <Button variant="outline" size="sm">
              Set a budget
            </Button>
          </CardFooter>
        </Card>
      </Example>
      <Example title="With media · size sm" className="block">
        <Card size="sm">
          <Image
            src={coverSrc(210)}
            alt="Preview of the dashboard deployment"
            width={640}
            height={360}
            unoptimized
            className="aspect-video w-full object-cover"
          />
          <CardHeader>
            <CardTitle>dashboard</CardTitle>
            <CardDescription>dashboard.example.com</CardDescription>
          </CardHeader>
          <CardFooter className="justify-between gap-2">
            <StatusBadge status="Ready" />
            <span className="text-xs text-muted-foreground">4m ago</span>
          </CardFooter>
        </Card>
      </Example>
      <Example title="Loading" className="block">
        <Card aria-busy="true">
          <CardHeader>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3.5 w-40" />
          </CardHeader>
          <CardContent className="flex flex-col gap-2">
            <Skeleton className="h-3.5 w-full" />
            <Skeleton className="h-2 w-full" />
          </CardContent>
          <CardFooter>
            <Skeleton className="h-7 w-28" />
          </CardFooter>
        </Card>
      </Example>
    </Block>
  )
}

function TableBlock() {
  return (
    <Block
      id="table"
      title="Table"
      description="Compares records across the same columns. Right-align numbers, keep one action menu per row, and truncate long text."
      className="lg:grid-cols-1"
    >
      <Example title="Typical · status, truncation, row actions" className="block p-2 sm:p-4">
        <Table>
          <TableCaption>The latest deployment from each branch.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Project</TableHead>
              <TableHead>Commit</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Environment</TableHead>
              <TableHead className="text-end">Duration</TableHead>
              <TableHead>
                <span className="sr-only">Actions</span>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {deployments.map((deployment) => (
              <TableRow key={deployment.id}>
                <TableCell className="font-medium">{deployment.project}</TableCell>
                <TableCell>
                  <div className="flex max-w-72 flex-col">
                    <span className="truncate">{deployment.commit}</span>
                    <span className="truncate font-mono text-xs text-muted-foreground">
                      {deployment.branch} · {deployment.author}
                    </span>
                  </div>
                </TableCell>
                <TableCell>
                  <StatusBadge status={deployment.status} />
                </TableCell>
                <TableCell className="text-muted-foreground">{deployment.environment}</TableCell>
                <TableCell className="text-end font-mono text-xs tabular-nums">
                  {deployment.duration}
                </TableCell>
                <TableCell className="text-end">
                  <DeploymentActions id={deployment.id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Example>
      <div className="grid gap-6 lg:grid-cols-2">
        <Example title="Footer · totals" className="block p-2 sm:p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Invoice</TableHead>
                <TableHead>Period</TableHead>
                <TableHead className="text-end">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {[
                ["INV-2026-0912", "September", "$412.00"],
                ["INV-2026-0811", "August", "$388.50"],
                ["INV-2026-0710", "July", "$356.25"],
              ].map(([invoice, period, amount]) => (
                <TableRow key={invoice}>
                  <TableCell className="font-mono text-xs">{invoice}</TableCell>
                  <TableCell>{period}</TableCell>
                  <TableCell className="text-end tabular-nums">{amount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={2}>Total, Q3</TableCell>
                <TableCell className="text-end tabular-nums">$1,156.75</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </Example>
        <Example title="Empty · no rows match" className="block p-2 sm:p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Project</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-end">Duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="hover:bg-transparent">
                <TableCell colSpan={3} className="whitespace-normal">
                  <Empty className="p-6">
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <SearchXIcon />
                      </EmptyMedia>
                      <EmptyTitle>No canceled deployments</EmptyTitle>
                      <EmptyDescription>
                        Nothing matches status:canceled in the last 30 days.
                      </EmptyDescription>
                    </EmptyHeader>
                    <EmptyContent>
                      <Button variant="outline" size="sm">
                        Clear filters
                      </Button>
                    </EmptyContent>
                  </Empty>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Example>
      </div>
    </Block>
  )
}

function DeploymentActions({ id }: { id: string }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="ghost" size="icon-sm" aria-label={`Actions for ${id}`} />}
      >
        <MoreHorizontalIcon />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuGroup>
          <DropdownMenuItem>View build logs</DropdownMenuItem>
          <DropdownMenuItem>Copy URL</DropdownMenuItem>
          <DropdownMenuItem>Redeploy</DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem variant="destructive" data-agent-confirm={`Cancels deployment ${id}`}>
            Cancel deployment
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

const deploysConfig = {
  production: { label: "Production", color: "var(--chart-2)" },
  preview: { label: "Preview", color: "var(--chart-1)" },
} satisfies ChartConfig

const minutesConfig = {
  minutes: { label: "Build minutes", color: "var(--chart-2)" },
} satisfies ChartConfig

function ChartBlock() {
  return (
    <Block
      id="chart"
      title="Chart"
      description="Recharts wrapped with theme-aware colors, tooltips and legends. Colors come from chart-1 to chart-5, never hard-coded."
    >
      <Example title="Bar · stacked, with legend" className="block">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Deployments per day</CardTitle>
            <CardDescription>Last 14 days, all projects</CardDescription>
          </CardHeader>
          <CardContent>
            <ChartContainer config={deploysConfig} className="aspect-auto h-56 w-full">
              <BarChart data={deploysPerDay} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="day"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={16}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <ChartLegend content={<ChartLegendContent />} />
                <Bar
                  dataKey="production"
                  stackId="deploys"
                  fill="var(--color-production)"
                  radius={[0, 0, 4, 4]}
                />
                <Bar
                  dataKey="preview"
                  stackId="deploys"
                  fill="var(--color-preview)"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Example>
      <Example title="Area · single series" className="block">
        <Card size="sm">
          <CardHeader>
            <CardTitle>Build minutes</CardTitle>
            <CardDescription>Weekly, up 70% since August</CardDescription>
            <CardAction>
              <Badge variant="secondary">702 min</Badge>
            </CardAction>
          </CardHeader>
          <CardContent>
            <ChartContainer config={minutesConfig} className="aspect-auto h-56 w-full">
              <AreaChart data={buildMinutes} accessibilityLayer>
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="week"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  minTickGap={16}
                />
                <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                <Area
                  dataKey="minutes"
                  type="monotone"
                  fill="var(--color-minutes)"
                  fillOpacity={0.2}
                  stroke="var(--color-minutes)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ChartContainer>
          </CardContent>
        </Card>
      </Example>
    </Block>
  )
}

function ItemBlock() {
  return (
    <Block
      id="item"
      title="Item"
      description="A flexible row: media, a title, a description and actions. Lists of people, files and settings are built from it."
    >
      <Example title="Typical · member list" className="block">
        <ItemGroup className="gap-0">
          {members.slice(0, 4).map((member, index) => (
            <React.Fragment key={member.email}>
              {index > 0 && <ItemSeparator className="my-0" />}
              <Item size="sm">
                <ItemMedia>
                  <Avatar aria-hidden="true">
                    <AvatarImage src={avatarSrc(index * 70 + 200)} alt="" />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent>
                  <ItemTitle>{member.name}</ItemTitle>
                  <ItemDescription>{member.email}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Badge variant="ghost">{member.role}</Badge>
                  <Button variant="ghost" size="icon-sm" aria-label={`Manage ${member.name}`}>
                    <MoreHorizontalIcon />
                  </Button>
                </ItemActions>
              </Item>
            </React.Fragment>
          ))}
        </ItemGroup>
      </Example>
      <Example title="Variants · default, outline, muted" className="block">
        <ItemGroup>
          {(["default", "outline", "muted"] as const).map((variant) => (
            <Item key={variant} variant={variant}>
              <ItemMedia variant="icon">
                <RocketIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>Production is up to date</ItemTitle>
                <ItemDescription>dpl_8Kq2 has served traffic for 4 minutes.</ItemDescription>
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </Example>
      <Example title="As a link · sizes default, sm, xs" className="block">
        <ItemGroup>
          {(["default", "sm", "xs"] as const).map((size) => (
            <Item key={size} size={size} variant="outline" render={<a href="#item" />}>
              <ItemMedia variant="icon">
                <FolderIcon />
              </ItemMedia>
              <ItemContent>
                <ItemTitle>marketing-site</ItemTitle>
              </ItemContent>
              <ItemActions>
                <ChevronRightIcon className="size-4 text-muted-foreground" />
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </Example>
      <Example title="Edge cases · long title, loading" className="block">
        <ItemGroup>
          <Item variant="outline">
            <ItemMedia variant="icon">
              <FileCodeIcon />
            </ItemMedia>
            <ItemContent className="min-w-0">
              <ItemTitle className="max-w-full">
                <span className="truncate">
                  apps/marketing-site/app/(marketing)/pricing/annual/compare/page.tsx
                </span>
              </ItemTitle>
              <ItemDescription>
                Changed in dpl_5Gt9. Long titles truncate and descriptions clamp to two lines, so
                rows keep their height in long lists.
              </ItemDescription>
            </ItemContent>
          </Item>
          <Item variant="outline" aria-busy="true">
            <ItemMedia>
              <Skeleton className="size-8 rounded-full" />
            </ItemMedia>
            <ItemContent>
              <Skeleton className="h-3.5 w-32" />
              <Skeleton className="h-3 w-48" />
            </ItemContent>
          </Item>
        </ItemGroup>
      </Example>
    </Block>
  )
}

function AvatarBlock() {
  return (
    <Block
      id="avatar"
      title="Avatar"
      description="A person or team. Every avatar has initials to fall back on when the image is missing or still loading."
    >
      <Example title="Sizes · sm, default, lg · with status">
        {(["sm", "default", "lg"] as const).map((size) => (
          <Avatar key={size} size={size}>
            <AvatarImage src={avatarSrc(200)} alt="Ana Souza" />
            <AvatarFallback>AS</AvatarFallback>
          </Avatar>
        ))}
        <Avatar size="lg">
          <AvatarImage src={avatarSrc(140)} alt="Kenji Watanabe" />
          <AvatarFallback>KW</AvatarFallback>
          <AvatarBadge>
            <span className="sr-only">Online</span>
          </AvatarBadge>
        </Avatar>
      </Example>
      <Example title="Edge cases · missing image, many people">
        <Avatar size="lg">
          <AvatarImage src="data:image/png;base64," alt="Leo Martin" />
          <AvatarFallback>LM</AvatarFallback>
        </Avatar>
        <AvatarGroup>
          {members.map((member, index) => (
            <Avatar key={member.email}>
              <AvatarImage src={avatarSrc(index * 70 + 200)} alt={member.name} />
              <AvatarFallback>{member.initials}</AvatarFallback>
            </Avatar>
          ))}
          <AvatarGroupCount>+7</AvatarGroupCount>
        </AvatarGroup>
      </Example>
    </Block>
  )
}

function AccordionBlock() {
  const [open, setOpen] = React.useState(false)
  const [visible, hidden] = [environmentVariables.slice(0, 2), environmentVariables.slice(2)]

  return (
    <Block
      id="accordion"
      title="Accordion and collapsible"
      description="Accordions stack sections people open one at a time, like FAQs. Collapsible hides a single overflow region behind a toggle."
    >
      <Example title="Accordion · first item open" className="block">
        <Accordion aria-label="Frequently asked questions" defaultValue={["faq-0"]}>
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`faq-${index}`}>
              <AccordionTrigger>{faq.question}</AccordionTrigger>
              <AccordionContent>
                <p className="text-muted-foreground">{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </Example>
      <Example title="Collapsible · show more" className="block">
        <Collapsible open={open} onOpenChange={setOpen}>
          <div className="flex items-center justify-between gap-4">
            <p className="text-sm font-medium">
              Environment variables
              <span className="ms-2 font-normal text-muted-foreground">
                {environmentVariables.length}
              </span>
            </p>
            <CollapsibleTrigger render={<Button variant="ghost" size="sm" />}>
              {open ? "Show less" : `Show ${hidden.length} more`}
              <ChevronsUpDownIcon data-icon="inline-end" />
            </CollapsibleTrigger>
          </div>
          <ItemGroup className="mt-3 gap-2">
            {visible.map((variable) => (
              <EnvironmentVariable key={variable.key} name={variable.key} value={variable.value} />
            ))}
          </ItemGroup>
          <CollapsibleContent>
            <ItemGroup className="mt-2 gap-2">
              {hidden.map((variable) => (
                <EnvironmentVariable
                  key={variable.key}
                  name={variable.key}
                  value={variable.value}
                />
              ))}
            </ItemGroup>
          </CollapsibleContent>
        </Collapsible>
      </Example>
    </Block>
  )
}

function EnvironmentVariable({ name, value }: { name: string; value: string }) {
  return (
    <Item variant="muted" size="xs">
      <ItemContent className="min-w-0">
        <ItemTitle className="font-mono text-xs/snug">{name}</ItemTitle>
        <ItemDescription className="truncate font-mono text-xs">{value}</ItemDescription>
      </ItemContent>
    </Item>
  )
}

function CarouselBlock() {
  return (
    <Block
      id="carousel"
      title="Carousel"
      description="Pages through a set of peers when there’s room for only a few. Arrow keys work once it has focus."
      className="lg:grid-cols-1"
    >
      <Example title="Typical · release notes, two per view" className="block px-14 sm:px-16">
        <Carousel aria-label="Release notes" opts={{ align: "start" }}>
          <CarouselContent>
            {releaseNotes.map((note) => (
              <CarouselItem key={note.version} className="sm:basis-1/2 lg:basis-1/3">
                <Card size="sm" className="h-full">
                  <CardHeader>
                    <CardDescription className="font-mono text-xs">{note.version}</CardDescription>
                    <CardTitle>{note.title}</CardTitle>
                  </CardHeader>
                  <CardContent className="text-muted-foreground">{note.body}</CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
          <CarouselIndicators />
        </Carousel>
      </Example>
    </Block>
  )
}

function ScrollAreaBlock() {
  return (
    <Block
      id="scroll-area"
      title="Scroll area"
      description="Scrolls a region inside the page with a styled scrollbar. Give it a fixed height or width."
    >
      <Example title="Vertical · audit log, 24 events" className="block">
        <ScrollArea aria-label="Audit log" className="h-72 rounded-2xl border">
          <div className="flex flex-col p-4">
            {auditLog.map((event, index) => (
              <React.Fragment key={event.id}>
                {index > 0 && <Separator className="my-3" />}
                <div className="flex flex-col gap-0.5 text-sm">
                  <span>
                    <span className="font-medium">{event.actor}</span> {event.action}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {event.id} · {event.time}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </div>
        </ScrollArea>
      </Example>
      <Example title="Horizontal · preview thumbnails" className="block">
        <ScrollArea
          aria-label="Preview thumbnails"
          className="w-full rounded-2xl border whitespace-nowrap"
        >
          <div className="flex w-max gap-4 p-4">
            {[210, 250, 30, 160, 330, 90].map((hue, index) => (
              <figure key={hue} className="flex w-44 shrink-0 flex-col gap-2">
                <Image
                  src={coverSrc(hue)}
                  alt={`Preview ${index + 1}`}
                  width={640}
                  height={360}
                  unoptimized
                  className="aspect-video w-full rounded-xl object-cover"
                />
                <figcaption className="font-mono text-xs text-muted-foreground">
                  preview-{index + 1}.example.com
                </figcaption>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </Example>
    </Block>
  )
}

function ResizableBlock() {
  return (
    <Block
      id="resizable"
      title="Resizable"
      description="Panels people can resize by dragging the handle or using the arrow keys on it."
      className="lg:grid-cols-1"
    >
      <Example title="Typical · nested, with handles" className="block">
        <ResizablePanelGroup
          role="group"
          aria-label="Files and preview"
          orientation="horizontal"
          className="min-h-72 rounded-2xl border"
        >
          <ResizablePanel defaultSize="28%" minSize="18%">
            <div className="flex h-full flex-col gap-1 p-3 text-sm">
              <span className="px-2 pb-1 text-xs font-medium text-muted-foreground">Files</span>
              {["app/page.tsx", "app/layout.tsx", "lib/deploy.ts"].map((file) => (
                <span
                  key={file}
                  className="flex items-center gap-2 truncate rounded-lg px-2 py-1 font-mono text-xs"
                >
                  <FileCodeIcon className="size-3.5 shrink-0 text-muted-foreground" />
                  {file}
                </span>
              ))}
            </div>
          </ResizablePanel>
          <ResizableHandle withHandle aria-label="Resize files" />
          <ResizablePanel defaultSize="72%">
            <ResizablePanelGroup
              role="group"
              aria-label="Preview and build output"
              orientation="vertical"
            >
              <ResizablePanel defaultSize="65%">
                <div className="flex h-full items-center justify-center p-6 text-sm text-muted-foreground">
                  Preview of dashboard.example.com
                </div>
              </ResizablePanel>
              <ResizableHandle withHandle aria-label="Resize build output" />
              <ResizablePanel defaultSize="35%">
                <div className="flex h-full flex-col gap-1 p-3 font-mono text-xs text-muted-foreground">
                  <span className="flex items-center gap-2 text-foreground">
                    <TerminalIcon className="size-3.5" />
                    Build output
                  </span>
                  <span>✓ Compiled in 4.1s</span>
                  <span>✓ 42 static pages generated</span>
                </div>
              </ResizablePanel>
            </ResizablePanelGroup>
          </ResizablePanel>
        </ResizablePanelGroup>
      </Example>
    </Block>
  )
}

function AspectRatioBlock() {
  return (
    <Block
      id="aspect-ratio"
      title="Aspect ratio and separator"
      description="Aspect ratio reserves space for media before it loads, so nothing jumps. Separator divides content where spacing alone isn’t enough."
    >
      <Example title="Aspect ratio · 16:9 and 1:1" className="items-start">
        <div className="w-full max-w-72">
          <AspectRatio ratio={16 / 9} className="overflow-hidden rounded-2xl border">
            <Image
              src={coverSrc(250)}
              alt="Open graph image for the pricing page"
              fill
              unoptimized
              className="object-cover"
            />
          </AspectRatio>
        </div>
        <div className="w-24">
          <AspectRatio ratio={1} className="overflow-hidden rounded-2xl border">
            <Image src={avatarSrc(30)} alt="Team logo" fill unoptimized className="object-cover" />
          </AspectRatio>
        </div>
      </Example>
      <Example title="Separator · horizontal and vertical" className="block">
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">Workspace CLI</span>
          <span className="text-sm text-muted-foreground">
            Deploy, roll back and tail logs from your terminal.
          </span>
        </div>
        <Separator className="my-4" />
        <div className="flex h-5 items-center gap-4 text-sm">
          <a href="#aspect-ratio" className="hover:underline">
            Docs
          </a>
          <Separator orientation="vertical" />
          <a href="#aspect-ratio" className="hover:underline">
            Changelog
          </a>
          <Separator orientation="vertical" />
          <a href="#aspect-ratio" className="hover:underline">
            Status
          </a>
        </div>
      </Example>
    </Block>
  )
}

function EventCalendarBlock() {
  const [events, setEvents] = React.useState<Array<CalendarEvent>>(teamCalendar.events)

  const createEvent: EventCalendarProps["onSelectSlot"] = (slot) => {
    setEvents((current) => [
      ...current,
      {
        id: `evt_${current.length + 1}`,
        title: "New event",
        start: slot.start,
        end: slot.end,
        allDay: slot.allDay,
        color: "var(--chart-2)",
      },
    ])
  }

  return (
    <Block
      id="event-calendar"
      title="Event calendar"
      description="Schedules across month, week, day and agenda views. Drag an event to move it, drag its edge to resize it, and drag across empty time to create one."
      className="lg:grid-cols-1"
    >
      <Example title="Typical · team week, all views" className="block p-0 sm:p-0">
        <EventCalendar
          events={events}
          onEventsChange={setEvents}
          onSelectSlot={createEvent}
          defaultView="week"
          defaultDate={teamCalendar.defaultDate}
          timeZone={teamCalendar.timeZone}
          weekStartsOn={1}
          dayStartHour={8}
          dayEndHour={19}
          className="h-160"
        >
          <EventCalendarNav className="border-b p-3" />
          <EventCalendarContent />
        </EventCalendar>
      </Example>
    </Block>
  )
}
