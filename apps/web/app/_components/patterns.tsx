"use client"

import * as React from "react"
import {
  CircleCheckIcon,
  CircleXIcon,
  ClockIcon,
  ExternalLinkIcon,
  FolderIcon,
  GlobeIcon,
  InfoIcon,
  MoreHorizontalIcon,
  ReceiptIcon,
  RocketIcon,
  TriangleAlertIcon,
  UserPlusIcon,
} from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@ui-sdk-ds/ui/components/alert"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui-sdk-ds/ui/components/alert-dialog"
import { Avatar, AvatarFallback, AvatarImage } from "@ui-sdk-ds/ui/components/avatar"
import { Badge } from "@ui-sdk-ds/ui/components/badge"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui-sdk-ds/ui/components/breadcrumb"
import { Button } from "@ui-sdk-ds/ui/components/button"
import { ButtonGroup } from "@ui-sdk-ds/ui/components/button-group"
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
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
  FieldTitle,
} from "@ui-sdk-ds/ui/components/field"
import { Input } from "@ui-sdk-ds/ui/components/input"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@ui-sdk-ds/ui/components/input-group"
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk-ds/ui/components/select"
import { Spinner } from "@ui-sdk-ds/ui/components/spinner"
import { Switch } from "@ui-sdk-ds/ui/components/switch"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@ui-sdk-ds/ui/components/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui-sdk-ds/ui/components/tabs"
import { toast } from "@ui-sdk-ds/ui/components/toast"

import { avatarSrc, members, regionGroups, regionItems, roleItems, team } from "./data"
import { Block, Example, Section } from "./showcase"

export function Patterns() {
  return (
    <Section
      id="patterns"
      eyebrow="11 · Patterns"
      title="Recipes and a full screen"
      description="Components composed into the pieces teams rebuild most, then one complete screen."
    >
      <RecipesBlock />
      <SettingsScreenBlock />
    </Section>
  )
}

const stats = [
  {
    title: "Requests",
    period: "Last 24 hours",
    value: "1.24M",
    change: "+8.2%",
    variant: "secondary",
  },
  {
    title: "P95 latency",
    period: "Last 24 hours",
    value: "182 ms",
    change: "−14 ms",
    variant: "success",
  },
  {
    title: "Error rate",
    period: "Last 24 hours",
    value: "0.31%",
    change: "+0.08 pp",
    variant: "destructive",
  },
] as const

function RecipesBlock() {
  return (
    <Block
      id="recipes"
      title="Recipes"
      description="Stat card: Card + Badge. Member list: Card + Item + Avatar + Select. Danger zone: Card + Field + AlertDialog."
    >
      <Example title="Stat cards" wide className="grid gap-4 md:grid-cols-3">
        {stats.map((stat) => (
          <Card key={stat.title} size="sm">
            <CardHeader>
              <CardTitle>{stat.title}</CardTitle>
              <CardDescription>{stat.period}</CardDescription>
              <CardAction>
                <Badge variant={stat.variant}>{stat.change}</Badge>
              </CardAction>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-semibold tracking-tight tabular-nums">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </Example>
      <Example title="Member list" className="block">
        <MemberList />
      </Example>
      <Example title="Danger zone" className="block">
        <DangerZone />
      </Example>
    </Block>
  )
}

function MemberList() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Members</CardTitle>
        <CardDescription>
          {team.seats.used} of {team.seats.total} seats used
        </CardDescription>
        <CardAction>
          <Button variant="outline" size="sm">
            <UserPlusIcon data-icon="inline-start" />
            Invite
          </Button>
        </CardAction>
      </CardHeader>
      <CardContent>
        <ItemGroup className="gap-0">
          {members.map((member, index) => (
            <React.Fragment key={member.email}>
              {index > 0 && <ItemSeparator className="my-0" />}
              <Item size="xs" className="px-0 py-2.5">
                <ItemMedia>
                  <Avatar size="sm">
                    <AvatarImage src={avatarSrc(index * 70 + 200)} alt="" />
                    <AvatarFallback>{member.initials}</AvatarFallback>
                  </Avatar>
                </ItemMedia>
                <ItemContent className="min-w-0">
                  <ItemTitle>{member.name}</ItemTitle>
                  <ItemDescription className="truncate">{member.email}</ItemDescription>
                </ItemContent>
                <ItemActions>
                  <Select
                    name="role"
                    items={roleItems}
                    defaultValue={member.role.toLowerCase()}
                    disabled={member.role === "Owner"}
                  >
                    <SelectTrigger
                      size="sm"
                      aria-label={`Role for ${member.name}`}
                      className="w-26"
                    >
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent alignItemWithTrigger={false} align="end">
                      <SelectGroup>
                        {roleItems.map((item) => (
                          <SelectItem key={item.value} value={item.value}>
                            {item.label}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </ItemActions>
              </Item>
            </React.Fragment>
          ))}
        </ItemGroup>
      </CardContent>
    </Card>
  )
}

function DangerZone() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Danger zone</CardTitle>
        <CardDescription>These affect every deployment of dashboard.</CardDescription>
      </CardHeader>
      <CardContent>
        <FieldGroup>
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Transfer project</FieldTitle>
              <FieldDescription>Move dashboard and its domains to another team.</FieldDescription>
            </FieldContent>
            <Button variant="outline" size="sm">
              Transfer
            </Button>
          </Field>
          <FieldSeparator />
          <Field orientation="horizontal">
            <FieldContent>
              <FieldTitle>Delete project</FieldTitle>
              <FieldDescription>Removes 48 deployments and detaches 2 domains.</FieldDescription>
            </FieldContent>
            <AlertDialog>
              <AlertDialogTrigger render={<Button variant="destructive" size="sm" />}>
                Delete
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Delete dashboard?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Visitors to dashboard.example.com will get a 404 right away. You can’t undo
                    this.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Keep project</AlertDialogCancel>
                  <AlertDialogAction
                    variant="destructive"
                    onClick={() => {
                      toast({
                        title: "dashboard scheduled for deletion",
                        type: "error",
                      })
                    }}
                  >
                    Delete dashboard
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </Field>
        </FieldGroup>
      </CardContent>
    </Card>
  )
}

const frameworkItems = [
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
  { label: "Other", value: "other" },
]

type Domain = {
  name: string
  status: "valid" | "pending" | "invalid"
  redirect?: string
}

const initialDomains: Array<Domain> = [
  { name: "dashboard.example.com", status: "valid" },
  {
    name: "www.dashboard.example.com",
    status: "valid",
    redirect: "dashboard.example.com",
  },
  { name: "app.example.org", status: "invalid" },
]

const savedSettings = {
  name: "dashboard",
  framework: "next",
  root: "apps/dashboard",
}

function SettingsScreenBlock() {
  return (
    <Block
      id="example-screen"
      title="Example screen · project settings"
      description="A project settings page made of Breadcrumb, Tabs, Card, FieldGroup, InputGroup, Select, Switch, Table, Badge, Alert, Empty and toasts."
      className="lg:grid-cols-1"
    >
      <SettingsScreen />
    </Block>
  )
}

function SettingsScreen() {
  const [saved, setSaved] = React.useState(savedSettings)
  const [form, setForm] = React.useState(savedSettings)
  const [saving, setSaving] = React.useState(false)
  const [region, setRegion] = React.useState<string | null>("fra1")
  const [domains, setDomains] = React.useState(initialDomains)
  const [newDomain, setNewDomain] = React.useState("")

  const nameError = /^[a-z0-9-]+$/.test(form.name)
    ? null
    : "Use lowercase letters, numbers and hyphens only."
  const dirty =
    form.name !== saved.name || form.framework !== saved.framework || form.root !== saved.root

  function save() {
    setSaving(true)
    window.setTimeout(() => {
      setSaved(form)
      setSaving(false)
      toast({ title: "Settings saved", type: "success" })
    }, 900)
  }

  function addDomain(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const name = newDomain.trim().toLowerCase()
    if (!name) {
      return
    }
    setDomains((current) => [...current, { name, status: "pending" }])
    setNewDomain("")
    toast({
      title: `${name} added`,
      description: "Point a CNAME record at cname.example.com to verify it.",
      type: "info",
    })
  }

  return (
    <div className="min-w-0 overflow-hidden rounded-3xl border bg-background">
      <Tabs defaultValue="general" className="gap-0">
        <header className="flex flex-col gap-5 border-b px-4 pt-5 pb-1.5 sm:px-8 sm:pt-8">
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink href="#example-screen">Acme</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink href="#example-screen">Projects</BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbPage>{saved.name}</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex min-w-0 items-center gap-3">
              <span className="flex size-10 shrink-0 items-center justify-center rounded-2xl bg-muted">
                <FolderIcon className="size-5" aria-hidden="true" />
              </span>
              <div className="flex min-w-0 flex-col">
                <h4 className="truncate type-subheading">{saved.name}</h4>
                <p className="truncate text-sm text-muted-foreground">{domains[0]?.name}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" render={<a href="#example-screen" />}>
                Visit
                <ExternalLinkIcon data-icon="inline-end" />
              </Button>
              <Button
                onClick={() =>
                  toast({
                    title: "Deploying dashboard",
                    description: "main · 3f2a91c",
                    type: "info",
                  })
                }
              >
                <RocketIcon data-icon="inline-start" />
                Deploy
              </Button>
            </div>
          </div>
          <TabsList variant="line">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="domains">
              Domains
              <Badge variant="secondary">{domains.length}</Badge>
            </TabsTrigger>
            <TabsTrigger value="members">Members</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
          </TabsList>
        </header>

        <div className="bg-muted/30">
          <TabsContent value="general" className="flex flex-col gap-6 p-4 sm:p-8">
            <Card>
              <CardHeader>
                <CardTitle>Project</CardTitle>
                <CardDescription>How dashboard builds and where its code lives.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field name="settings-name" invalid={nameError ? true : undefined}>
                    <FieldLabel>Project name</FieldLabel>
                    <Input
                      className="sm:max-w-sm"
                      value={form.name}
                      aria-invalid={nameError ? true : undefined}
                      onChange={(event) => setForm({ ...form, name: event.target.value })}
                    />
                    {nameError ? (
                      <FieldError>{nameError}</FieldError>
                    ) : (
                      <FieldDescription>
                        Used in preview URLs like {form.name}
                        -git-main.example.com.
                      </FieldDescription>
                    )}
                  </Field>
                  <Field name="settings-framework">
                    <FieldLabel>Framework preset</FieldLabel>
                    <Select
                      items={frameworkItems}
                      value={form.framework}
                      onValueChange={(value) => setForm({ ...form, framework: value ?? "other" })}
                    >
                      <SelectTrigger className="w-full sm:max-w-sm">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {frameworkItems.map((item) => (
                            <SelectItem key={item.value} value={item.value}>
                              {item.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </Field>
                  <Field name="settings-root">
                    <FieldLabel>Root directory</FieldLabel>
                    <InputGroup className="sm:max-w-sm">
                      <InputGroupAddon>
                        <InputGroupText>acme/platform/</InputGroupText>
                      </InputGroupAddon>
                      <InputGroupInput
                        value={form.root}
                        onChange={(event) => setForm({ ...form, root: event.target.value })}
                      />
                    </InputGroup>
                  </Field>
                </FieldGroup>
              </CardContent>
              <CardFooter className="flex-wrap justify-between gap-3 border-t">
                <p className="text-sm text-muted-foreground" aria-live="polite">
                  {dirty ? "You have unsaved changes." : "All changes saved."}
                </p>
                <div className="flex gap-2">
                  {dirty && (
                    <Button variant="ghost" disabled={saving} onClick={() => setForm(saved)}>
                      Discard
                    </Button>
                  )}
                  <Button disabled={!dirty || saving || Boolean(nameError)} onClick={save}>
                    {saving && <Spinner data-icon="inline-start" />}
                    {saving ? "Saving…" : "Save changes"}
                  </Button>
                </div>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Deployments</CardTitle>
                <CardDescription>Switches apply right away, to every branch.</CardDescription>
              </CardHeader>
              <CardContent>
                <FieldGroup>
                  <Field name="settings-previews" orientation="horizontal">
                    <FieldContent>
                      <FieldLabel>Preview deployments</FieldLabel>
                      <FieldDescription>Build every pull request at its own URL.</FieldDescription>
                    </FieldContent>
                    <Switch
                      defaultChecked
                      onCheckedChange={(checked) =>
                        toast({
                          title: checked ? "Preview deployments on" : "Preview deployments off",
                        })
                      }
                    />
                  </Field>
                  <FieldSeparator />
                  <Field name="settings-cache" orientation="horizontal">
                    <FieldContent>
                      <FieldLabel>Build cache</FieldLabel>
                      <FieldDescription>
                        Reuse dependencies between builds of the same lockfile.
                      </FieldDescription>
                    </FieldContent>
                    <Switch
                      defaultChecked
                      onCheckedChange={(checked) =>
                        toast({
                          title: checked ? "Build cache on" : "Build cache off",
                        })
                      }
                    />
                  </Field>
                  <FieldSeparator />
                  <Field name="settings-region" orientation="responsive">
                    <FieldContent>
                      <FieldLabel>Function region</FieldLabel>
                      <FieldDescription>Put it next to your database.</FieldDescription>
                    </FieldContent>
                    <Select
                      items={regionItems}
                      value={region}
                      onValueChange={(value) => {
                        setRegion(value)
                        toast({ title: "Function region updated" })
                      }}
                    >
                      <SelectTrigger className="sm:w-60">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent alignItemWithTrigger={false} align="end">
                        {regionGroups.map((group, index) => (
                          <React.Fragment key={group.label}>
                            {index > 0 && <SelectSeparator />}
                            <SelectGroup>
                              <SelectLabel>{group.label}</SelectLabel>
                              {group.items.map((item) => (
                                <SelectItem key={item.value} value={item.value}>
                                  {item.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </React.Fragment>
                        ))}
                      </SelectContent>
                    </Select>
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            <DangerZone />
          </TabsContent>

          <TabsContent value="domains" className="p-4 sm:p-8">
            <Card>
              <CardHeader>
                <CardTitle>Domains</CardTitle>
                <CardDescription>
                  Point a CNAME record at cname.example.com, then add it here.
                </CardDescription>
              </CardHeader>
              <CardContent className="flex flex-col gap-4">
                <form onSubmit={addDomain}>
                  <ButtonGroup className="w-full sm:max-w-md">
                    <InputGroup>
                      <InputGroupAddon>
                        <GlobeIcon />
                      </InputGroupAddon>
                      <InputGroupInput
                        name="domain"
                        aria-label="Domain"
                        placeholder="status.example.com"
                        value={newDomain}
                        onChange={(event) => setNewDomain(event.target.value)}
                      />
                    </InputGroup>
                    <Button type="submit" variant="outline">
                      Add
                    </Button>
                  </ButtonGroup>
                </form>
                {domains.some((domain) => domain.status === "pending") && (
                  <Alert variant="info">
                    <InfoIcon />
                    <AlertTitle>DNS changes can take up to 48 hours</AlertTitle>
                    <AlertDescription>
                      Pending domains verify on their own once the CNAME record resolves.
                    </AlertDescription>
                  </Alert>
                )}
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Domain</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>
                        <span className="sr-only">Actions</span>
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {domains.map((domain) => (
                      <TableRow key={domain.name}>
                        <TableCell>
                          <div className="flex flex-col">
                            <span className="font-medium">{domain.name}</span>
                            {domain.redirect && (
                              <span className="text-xs text-muted-foreground">
                                Redirects to {domain.redirect}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <DomainStatus status={domain.status} />
                        </TableCell>
                        <TableCell className="text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger
                              render={
                                <Button
                                  variant="ghost"
                                  size="icon-sm"
                                  aria-label={`Actions for ${domain.name}`}
                                />
                              }
                            >
                              <MoreHorizontalIcon />
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-44">
                              <DropdownMenuGroup>
                                <DropdownMenuItem>Refresh status</DropdownMenuItem>
                                <DropdownMenuItem>Set as primary</DropdownMenuItem>
                              </DropdownMenuGroup>
                              <DropdownMenuSeparator />
                              <DropdownMenuGroup>
                                <DropdownMenuItem
                                  variant="destructive"
                                  onClick={() =>
                                    setDomains((current) =>
                                      current.filter((item) => item.name !== domain.name),
                                    )
                                  }
                                >
                                  Remove
                                </DropdownMenuItem>
                              </DropdownMenuGroup>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="members" className="p-4 sm:p-8">
            <MemberList />
          </TabsContent>

          <TabsContent value="billing" className="flex flex-col gap-6 p-4 sm:p-8">
            <Alert variant="warning">
              <TriangleAlertIcon />
              <AlertTitle>82% of this month’s build minutes are used</AlertTitle>
              <AlertDescription>
                At this pace Acme reaches the limit on October 26. New builds wait in the queue
                after that.
              </AlertDescription>
              <AlertAction>
                <Button variant="outline" size="xs">
                  Upgrade
                </Button>
              </AlertAction>
            </Alert>
            <Card>
              <CardContent>
                <Empty>
                  <EmptyHeader>
                    <EmptyMedia variant="icon">
                      <ReceiptIcon />
                    </EmptyMedia>
                    <EmptyTitle>No invoices yet</EmptyTitle>
                    <EmptyDescription>
                      dashboard bills to Acme’s Pro plan. The first invoice arrives on November 1.
                    </EmptyDescription>
                  </EmptyHeader>
                  <EmptyContent>
                    <Button variant="outline">Add a payment method</Button>
                  </EmptyContent>
                </Empty>
              </CardContent>
            </Card>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

function DomainStatus({ status }: { status: Domain["status"] }) {
  if (status === "valid") {
    return (
      <Badge variant="success">
        <CircleCheckIcon data-icon="inline-start" />
        Valid configuration
      </Badge>
    )
  }
  if (status === "pending") {
    return (
      <Badge variant="warning">
        <ClockIcon data-icon="inline-start" />
        Pending verification
      </Badge>
    )
  }
  return (
    <Badge variant="destructive">
      <CircleXIcon data-icon="inline-start" />
      Invalid configuration
    </Badge>
  )
}
