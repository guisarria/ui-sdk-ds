"use client"

import * as React from "react"
import {
  ActivityIcon,
  BarChart3Icon,
  BookOpenIcon,
  BoxesIcon,
  ChevronsUpDownIcon,
  CreditCardIcon,
  FolderIcon,
  GlobeIcon,
  HomeIcon,
  LifeBuoyIcon,
  LogOutIcon,
  PlusIcon,
  RocketIcon,
  SettingsIcon,
  UsersIcon,
} from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@ui-sdk-ds/ui/components/avatar"
import { Badge } from "@ui-sdk-ds/ui/components/badge"
import { Button } from "@ui-sdk-ds/ui/components/button"
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@ui-sdk-ds/ui/components/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui-sdk-ds/ui/components/dropdown-menu"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemTitle,
} from "@ui-sdk-ds/ui/components/item"
import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "@ui-sdk-ds/ui/components/menubar"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@ui-sdk-ds/ui/components/navigation-menu"
import {
  Pagination,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationList,
  PaginationNext,
  PaginationPrevious,
} from "@ui-sdk-ds/ui/components/pagination"
import { ScrollArea, ScrollBar } from "@ui-sdk-ds/ui/components/scroll-area"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupAction,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarInput,
  SidebarInset,
  SidebarMenu,
  SidebarMenuAction,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarSeparator,
} from "@ui-sdk-ds/ui/components/sidebar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui-sdk-ds/ui/components/tabs"

import { avatarSrc, deployments } from "./data"
import { MoreNavigation } from "./display-more"
import { Block, Example, Section } from "./showcase"
import { previewState, StateMatrix } from "./state-matrix"
import { StatusBadge } from "./status-badge"

export function Navigation() {
  return (
    <Section
      id="navigation"
      eyebrow="05 · Components · Navigation"
      title="Navigation"
      description="How people find their place and move between views. The current location is always marked, never only implied."
    >
      <TabsBlock />
      <BreadcrumbBlock />
      <PaginationBlock />
      <NavigationMenuBlock />
      <MenubarBlock />
      <SidebarBlock />
      <MoreNavigation />
    </Section>
  )
}

function TabsBlock() {
  return (
    <Block
      id="tabs"
      title="Tabs"
      description="Switches between views of the same object without leaving the page. Use the line variant under page headers."
    >
      <Example title="Typical · default list" className="block">
        <Tabs defaultValue="overview">
          <TabsList aria-label="Project">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="deployments">Deployments</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="overview" className="pt-2 text-muted-foreground">
            dashboard serves 1.2M requests a day from 3 regions.
          </TabsContent>
          <TabsContent value="deployments" className="pt-2 text-muted-foreground">
            5 deployments in the last 24 hours. The latest is ready.
          </TabsContent>
          <TabsContent value="settings" className="pt-2 text-muted-foreground">
            Build, domains, environment variables and members.
          </TabsContent>
        </Tabs>
      </Example>
      <Example title="Line · with icons and a count · scrolls when narrow" className="block">
        <Tabs defaultValue="activity">
          <ScrollArea aria-label="Team sections">
            <div className="pb-3">
              <TabsList variant="line" aria-label="Team">
                <TabsTrigger value="activity">
                  <ActivityIcon />
                  Activity
                </TabsTrigger>
                <TabsTrigger value="analytics">
                  <BarChart3Icon />
                  Analytics
                </TabsTrigger>
                <TabsTrigger value="members">
                  <UsersIcon />
                  Members <Badge variant="secondary">5</Badge>
                </TabsTrigger>
                <TabsTrigger value="billing" disabled>
                  <CreditCardIcon />
                  Billing
                </TabsTrigger>
              </TabsList>
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </Tabs>
      </Example>
      <Example title="Vertical" className="block">
        <Tabs defaultValue="general" orientation="vertical">
          <TabsList aria-label="Settings">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="domains">Domains</TabsTrigger>
            <TabsTrigger value="variables">Environment variables</TabsTrigger>
          </TabsList>
          <TabsContent value="general" className="text-muted-foreground">
            Project name, framework preset and root directory.
          </TabsContent>
          <TabsContent value="domains" className="text-muted-foreground">
            dashboard.example.com and 2 redirects.
          </TabsContent>
          <TabsContent value="variables" className="text-muted-foreground">
            12 variables across 3 environments.
          </TabsContent>
        </Tabs>
      </Example>
      <Example title="States" className="block p-2 sm:p-4">
        <StateMatrix
          rows={["default", "line"] as const}
          states={["default", "hover", "focus", "disabled"]}
          render={(variant, state) => (
            <Tabs defaultValue="logs">
              <TabsList variant={variant} aria-label="Log views">
                <TabsTrigger value="logs">Logs</TabsTrigger>
                <TabsTrigger value="usage" {...previewState(state)}>
                  Usage
                </TabsTrigger>
              </TabsList>
            </Tabs>
          )}
        />
      </Example>
    </Block>
  )
}

function BreadcrumbBlock() {
  return (
    <Block
      id="breadcrumb"
      title="Breadcrumb"
      description="Shows where a page sits in the hierarchy. The last item is the current page and isn’t a link."
    >
      <Example title="Typical">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#navigation">Acme</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#navigation">Projects</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#navigation">dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Settings</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Example>
      <Example title="Collapsed middle · long current page" className="block">
        <Breadcrumb>
          <BreadcrumbList className="flex-nowrap">
            <BreadcrumbItem>
              <BreadcrumbLink href="#navigation">Acme</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <DropdownMenu>
                <DropdownMenuTrigger
                  render={<Button variant="ghost" size="icon-xs" aria-label="Show hidden pages" />}
                >
                  <BreadcrumbEllipsis />
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                  <DropdownMenuGroup>
                    <DropdownMenuItem>Projects</DropdownMenuItem>
                    <DropdownMenuItem>marketing-site</DropdownMenuItem>
                    <DropdownMenuItem>Deployments</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem className="min-w-0">
              <BreadcrumbPage className="truncate">
                dpl_5Gt9 · Rewrite the pricing page for the annual plan launch
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </Example>
    </Block>
  )
}

function PaginationBlock() {
  const [page, setPage] = React.useState(1)
  const total = 593
  const pageSize = 25

  return (
    <Block
      id="pagination"
      title="Pagination"
      description="Moves through long lists one page at a time. Keep the first and last page reachable."
    >
      <Example title="Typical · with ellipses">
        <Pagination pageCount={24} defaultPage={5}>
          <PaginationList>
            {({ items }) => (
              <>
                <PaginationItem>
                  <PaginationPrevious />
                </PaginationItem>
                {items.map((item) => (
                  <PaginationItem key={item}>
                    {typeof item === "number" ? (
                      <PaginationLink page={item} />
                    ) : (
                      <PaginationEllipsis />
                    )}
                  </PaginationItem>
                ))}
                <PaginationItem>
                  <PaginationNext />
                </PaginationItem>
              </>
            )}
          </PaginationList>
        </Pagination>
      </Example>
      <Example title="Compact · previous and next only">
        <Pagination
          className="justify-between"
          total={total}
          pageSize={pageSize}
          page={page}
          onPageChange={setPage}
        >
          <p className="text-sm text-muted-foreground">
            Showing {(page - 1) * pageSize + 1}–{Math.min(page * pageSize, total)} of {total} events
          </p>
          <PaginationList>
            <PaginationItem>
              <PaginationPrevious text="Newer" />
            </PaginationItem>
            <PaginationItem>
              <PaginationNext text="Older" />
            </PaginationItem>
          </PaginationList>
        </Pagination>
      </Example>
    </Block>
  )
}

const resources = [
  {
    title: "Getting started",
    href: "#navigation",
    description: "Import a repository and ship your first deployment.",
  },
  {
    title: "CLI reference",
    href: "#navigation",
    description: "Every command and flag in the workspace CLI.",
  },
  {
    title: "Build configuration",
    href: "#navigation",
    description: "Framework presets, root directories and output settings.",
  },
  {
    title: "Status",
    href: "#navigation",
    description: "Live uptime for builds, functions and the dashboard.",
  },
]

function NavigationMenuBlock() {
  return (
    <Block
      id="navigation-menu"
      title="Navigation menu"
      description="Top-level site navigation with optional rich panels. For app chrome, use the Sidebar instead."
    >
      <Example title="Typical · panels and a plain link" wide className="pb-6">
        <NavigationMenu aria-label="Product">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Product</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-72 gap-1">
                  <li>
                    <NavigationMenuLink href="#navigation">
                      <RocketIcon />
                      Deployments
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#navigation">
                      <GlobeIcon />
                      Domains
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink href="#navigation">
                      <BarChart3Icon />
                      Analytics
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid w-[min(32rem,calc(100vw-3rem))] gap-1 sm:grid-cols-2">
                  {resources.map((resource) => (
                    <li key={resource.title}>
                      <NavigationMenuLink href={resource.href}>
                        <div className="flex flex-col gap-1">
                          <span className="font-medium">{resource.title}</span>
                          <span className="line-clamp-2 text-muted-foreground">
                            {resource.description}
                          </span>
                        </div>
                      </NavigationMenuLink>
                    </li>
                  ))}
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <NavigationMenuLink href="#navigation" className={navigationMenuTriggerStyle()}>
                Pricing
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </Example>
    </Block>
  )
}

function MenubarBlock() {
  const [showMinimap, setShowMinimap] = React.useState(true)
  const [panel, setPanel] = React.useState("logs")

  return (
    <Block
      id="menubar"
      title="Menubar"
      description="Desktop-style menus for editor-like tools. Every item needs a keyboard shortcut or a good reason not to have one."
    >
      <Example title="Typical · items, checkboxes, radios, submenu" wide>
        <Menubar aria-label="Editor">
          <MenubarMenu>
            <MenubarTrigger>File</MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarItem>
                  New project <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Import repository… <MenubarShortcut>⌘I</MenubarShortcut>
                </MenubarItem>
              </MenubarGroup>
              <MenubarSeparator />
              <MenubarGroup>
                <MenubarSub>
                  <MenubarSubTrigger>Export logs</MenubarSubTrigger>
                  <MenubarSubContent>
                    <MenubarGroup>
                      <MenubarItem>As JSON</MenubarItem>
                      <MenubarItem>As CSV</MenubarItem>
                    </MenubarGroup>
                  </MenubarSubContent>
                </MenubarSub>
              </MenubarGroup>
              <MenubarSeparator />
              <MenubarGroup>
                <MenubarItem variant="destructive" data-agent-confirm="Deletes the project">
                  Delete project <MenubarShortcut>⌘⌫</MenubarShortcut>
                </MenubarItem>
              </MenubarGroup>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>View</MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarCheckboxItem checked={showMinimap} onCheckedChange={setShowMinimap}>
                  Show minimap
                </MenubarCheckboxItem>
              </MenubarGroup>
              <MenubarSeparator />
              <MenubarRadioGroup value={panel} onValueChange={setPanel}>
                <MenubarRadioItem value="logs">Build logs</MenubarRadioItem>
                <MenubarRadioItem value="functions">Function logs</MenubarRadioItem>
                <MenubarRadioItem value="requests">Requests</MenubarRadioItem>
              </MenubarRadioGroup>
            </MenubarContent>
          </MenubarMenu>
          <MenubarMenu>
            <MenubarTrigger>Deploy</MenubarTrigger>
            <MenubarContent>
              <MenubarGroup>
                <MenubarItem>
                  Redeploy <MenubarShortcut>⌘R</MenubarShortcut>
                </MenubarItem>
                <MenubarItem>
                  Promote to production <MenubarShortcut>⇧⌘P</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>Roll back</MenubarItem>
              </MenubarGroup>
            </MenubarContent>
          </MenubarMenu>
        </Menubar>
      </Example>
    </Block>
  )
}

const projects = [
  { name: "dashboard", deployments: 12 },
  { name: "api", deployments: 4 },
  { name: "marketing-site", deployments: 7 },
  { name: "docs", deployments: 2 },
]

function SidebarBlock() {
  return (
    <Block
      id="sidebar"
      title="Sidebar"
      description="The app’s primary navigation. It stays fixed to the side, collapses to icons, and becomes a sheet on mobile."
    >
      <Example title="Typical · app shell" wide className="block p-0 sm:p-0">
        <div className="h-136 overflow-hidden rounded-2xl">
          <SidebarProvider className="h-full min-h-0">
            <Sidebar collapsible="none" className="border-e">
              <SidebarHeader>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <DropdownMenu>
                      <DropdownMenuTrigger render={<SidebarMenuButton size="lg" />}>
                        <span className="flex size-8 items-center justify-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
                          <BoxesIcon />
                        </span>
                        <span className="flex min-w-0 flex-col leading-tight">
                          <span className="truncate font-medium">Acme</span>
                          <span className="truncate text-xs text-muted-foreground">Pro plan</span>
                        </span>
                        <ChevronsUpDownIcon className="ms-auto" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-56">
                        <DropdownMenuGroup>
                          <DropdownMenuLabel>Teams</DropdownMenuLabel>
                          <DropdownMenuItem>Acme</DropdownMenuItem>
                          <DropdownMenuItem>Acme Labs</DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuGroup>
                          <DropdownMenuItem>
                            <PlusIcon />
                            Create team
                          </DropdownMenuItem>
                        </DropdownMenuGroup>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </SidebarMenuItem>
                </SidebarMenu>
                <SidebarInput name="search" aria-label="Search" placeholder="Search…" />
              </SidebarHeader>
              <SidebarContent>
                <SidebarGroup>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive
                          render={<a href="#sidebar" aria-current="page" />}
                        >
                          <HomeIcon />
                          <span>Overview</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton render={<a href="#sidebar" />}>
                          <RocketIcon />
                          <span>Deployments</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>25</SidebarMenuBadge>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton render={<a href="#sidebar" />}>
                          <BarChart3Icon />
                          <span>Analytics</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton render={<a href="#sidebar" />}>
                          <SettingsIcon />
                          <span>Settings</span>
                        </SidebarMenuButton>
                        <SidebarMenuSub>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href="#sidebar" isActive>
                              <span>General</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href="#sidebar">
                              <span>Members</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                          <SidebarMenuSubItem>
                            <SidebarMenuSubButton href="#sidebar">
                              <span>Billing</span>
                            </SidebarMenuSubButton>
                          </SidebarMenuSubItem>
                        </SidebarMenuSub>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
                <SidebarSeparator />
                <SidebarGroup>
                  <SidebarGroupLabel>Projects</SidebarGroupLabel>
                  <SidebarGroupAction aria-label="Add project">
                    <PlusIcon />
                  </SidebarGroupAction>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      {projects.map((project) => (
                        <SidebarMenuItem key={project.name}>
                          <SidebarMenuButton render={<a href="#sidebar" />}>
                            <FolderIcon />
                            <span>{project.name}</span>
                          </SidebarMenuButton>
                          <SidebarMenuAction
                            showOnHover
                            aria-label={`Open ${project.name} settings`}
                          >
                            <SettingsIcon />
                          </SidebarMenuAction>
                        </SidebarMenuItem>
                      ))}
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href="#sidebar" />}>
                      <BookOpenIcon />
                      <span>Documentation</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton render={<a href="#sidebar" />}>
                      <LifeBuoyIcon />
                      <span>Support</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton size="lg">
                      <Avatar size="sm" aria-hidden="true">
                        <AvatarImage src={avatarSrc(200)} alt="" />
                        <AvatarFallback>AS</AvatarFallback>
                      </Avatar>
                      <span className="flex min-w-0 flex-col leading-tight">
                        <span className="truncate font-medium">Ana Souza</span>
                        <span className="truncate text-xs text-muted-foreground">
                          ana@example.com
                        </span>
                      </span>
                      <LogOutIcon className="ms-auto" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
            </Sidebar>
            <SidebarInset className="min-w-0 max-sm:hidden">
              <header className="flex h-12 items-center gap-2 border-b px-4">
                <Breadcrumb>
                  <BreadcrumbList>
                    <BreadcrumbItem>
                      <BreadcrumbLink href="#sidebar">Acme</BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      <BreadcrumbPage>Overview</BreadcrumbPage>
                    </BreadcrumbItem>
                  </BreadcrumbList>
                </Breadcrumb>
              </header>
              <div className="flex flex-col gap-3 p-4">
                <p className="text-sm font-medium">Latest deployments</p>
                <ItemGroup className="gap-2">
                  {deployments.slice(0, 4).map((deployment) => (
                    <Item key={deployment.id} variant="muted" size="sm">
                      <ItemContent className="min-w-0">
                        <ItemTitle>{deployment.project}</ItemTitle>
                        <ItemDescription className="line-clamp-1">
                          {deployment.commit}
                        </ItemDescription>
                      </ItemContent>
                      <ItemActions>
                        <StatusBadge status={deployment.status} />
                      </ItemActions>
                    </Item>
                  ))}
                </ItemGroup>
              </div>
            </SidebarInset>
          </SidebarProvider>
        </div>
      </Example>
    </Block>
  )
}
