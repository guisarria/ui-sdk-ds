"use client"

import * as React from "react"
import { ArrowUpRightIcon, BoxesIcon, MonitorIcon, MoonIcon, SunIcon } from "lucide-react"

import { Badge } from "@ui-sdk-ds/ui/components/badge"
import { Button } from "@ui-sdk-ds/ui/components/button"
import { colorScheme, palette, palettes, usePreference } from "@ui-sdk-ds/ui/components/preferences"
import { ToggleGroup, ToggleGroupItem } from "@ui-sdk-ds/ui/components/toggle-group"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui-sdk-ds/ui/components/tooltip"

import { sections } from "./sections"

const themes = [
  { value: "light", label: "Light theme", icon: SunIcon },
  { value: "dark", label: "Dark theme", icon: MoonIcon },
  { value: "system", label: "Match system", icon: MonitorIcon },
] as const

function useActiveSection() {
  const [active, setActive] = React.useState("overview")

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) {
          setActive(visible[0].target.id)
        }
      },
      { rootMargin: "-120px 0px -60% 0px" },
    )
    for (const section of sections) {
      const element = document.getElementById(section.id)
      if (element) {
        observer.observe(element)
      }
    }
    return () => observer.disconnect()
  }, [])

  return active
}

export function SiteHeader() {
  const { value: scheme } = usePreference(colorScheme)
  const { value: paletteValue } = usePreference(palette)
  const active = useActiveSection()
  const navRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const nav = navRef.current
    const link = nav?.querySelector("[aria-current]")
    if (!nav || !link) {
      return
    }
    const navRect = nav.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    nav.scrollBy({
      left: linkRect.left - navRect.left - (navRect.width - linkRect.width) / 2,
      behavior: "smooth",
    })
  }, [active])

  return (
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-14 w-full max-w-6xl items-center gap-3 px-4 sm:px-6 lg:px-8">
        <a href="#overview" className="flex items-center gap-2 text-sm font-medium">
          <span className="flex size-7 items-center justify-center rounded-xl bg-brand text-brand-foreground">
            <BoxesIcon className="size-4" aria-hidden="true" />
          </span>
          <span className="max-sm:sr-only">Workspace UI</span>
        </a>
        <Badge variant="secondary" className="max-sm:hidden">
          base-rhea · {paletteValue}
        </Badge>
        <div className="ml-auto flex items-center gap-2">
          <ToggleGroup
            aria-label="Color palette"
            size="sm"
            spacing={0}
            variant="outline"
            value={[paletteValue]}
            onValueChange={(value, details) => {
              const next = palettes.find((item) => item.value === value[0])
              if (next) {
                palette.set(next.value, { event: details.event })
              }
            }}
          >
            {palettes.map((item) => (
              <ToggleGroupItem key={item.value} value={item.value}>
                {item.label}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
          <ToggleGroup
            aria-label="Color theme"
            size="sm"
            spacing={0}
            variant="outline"
            value={[scheme]}
            onValueChange={(value, details) => {
              const next = themes.find((item) => item.value === value[0])
              if (next) {
                colorScheme.set(next.value, { event: details.event })
              }
            }}
          >
            {themes.map((item) => (
              <Tooltip key={item.value}>
                <TooltipTrigger
                  render={<ToggleGroupItem value={item.value} aria-label={item.label} />}
                >
                  <item.icon />
                </TooltipTrigger>
                <TooltipContent side="bottom">{item.label}</TooltipContent>
              </Tooltip>
            ))}
          </ToggleGroup>
          <Button
            size="sm"
            render={
              <a
                href="https://ui.shadcn.com/create?preset=b27Gcu92"
                target="_blank"
                rel="noreferrer"
              />
            }
          >
            <span className="max-sm:sr-only">Open preset</span>
            <ArrowUpRightIcon data-icon="inline-end" />
          </Button>
        </div>
      </div>
      <nav aria-label="Sections" className="mx-auto w-full max-w-6xl px-2 sm:px-4 lg:px-6">
        <div ref={navRef} className="no-scrollbar flex h-11 items-center gap-1 overflow-x-auto">
          {sections.map((section) => (
            <Button
              key={section.id}
              variant={active === section.id ? "secondary" : "ghost"}
              size="sm"
              render={
                <a
                  href={`#${section.id}`}
                  aria-current={active === section.id ? "true" : undefined}
                />
              }
            >
              {section.label}
            </Button>
          ))}
        </div>
      </nav>
    </header>
  )
}
