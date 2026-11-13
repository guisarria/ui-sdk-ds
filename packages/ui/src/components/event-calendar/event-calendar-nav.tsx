"use client"

import type * as React from "react"
import { useState, type ReactNode } from "react"
import {
  useEventCalendarNavigation,
  useEventCalendarSelector,
  useEventCalendarSettings,
  useEventCalendarView,
  useEventCalendarViewConfig,
} from "@ui-sdk-ds/ui/components/event-calendar/event-calendar"
import { toZoned } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-lib"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"
import type { CalendarView } from "@ui-sdk-ds/ui/components/event-calendar/event-calendar-types"
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import { addDays, format } from "date-fns"

import { cn } from "cn"
import { Button } from "@ui-sdk-ds/ui/components/button"
import { Calendar } from "@ui-sdk-ds/ui/components/calendar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@ui-sdk-ds/ui/components/dropdown-menu"
import { Popover, PopoverContent, PopoverTrigger } from "@ui-sdk-ds/ui/components/popover"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui-sdk-ds/ui/components/tooltip"
import { ChevronLeftIcon, ChevronRightIcon, ChevronDownIcon, CalendarIcon } from "lucide-react"

interface NavButtonPropsResult {
  variant: "ghost" | "outline" | "secondary" | "default"
  size: "sm" | "default"
  iconSize: "icon-sm" | "icon"
  className: string | undefined
}

function useNavButtonProps(): NavButtonPropsResult {
  const viewConfig = useEventCalendarViewConfig()
  return {
    variant: viewConfig.navButtonVariant,
    size: viewConfig.navButtonSize,
    iconSize: viewConfig.navButtonSize === "sm" ? "icon-sm" : "icon",
    className: viewConfig.classNames?.navButton,
  }
}

interface NavTooltipConfigResult {
  disabled: boolean
  side: "top" | "bottom" | "left" | "right"
  delay: number
  closeDelay: number
  timeout: number
  className: string | undefined
}

function useNavTooltipConfig(): NavTooltipConfigResult {
  const viewConfig = useEventCalendarViewConfig()
  const config = viewConfig.navTooltips === false ? undefined : viewConfig.navTooltips
  return {
    disabled: viewConfig.navTooltips === false,
    side: config?.side ?? "top",
    delay: config?.delay ?? 600,
    closeDelay: config?.closeDelay ?? 0,
    timeout: config?.timeout ?? 300,
    className: viewConfig.classNames?.navTooltip,
  }
}

type NavButtonProps = Omit<React.ComponentProps<typeof Button>, "children"> & {
  children?: ReactNode
  tooltip?: ReactNode | null
}

function NavTooltip({
  content,
  children,
}: {
  content: ReactNode | null
  children: React.ReactElement<Record<string, unknown>>
}) {
  const tooltips = useNavTooltipConfig()
  if (tooltips.disabled || content === null || content === undefined) return children
  return (
    <Tooltip delay={tooltips.delay} closeDelay={tooltips.closeDelay}>
      <TooltipTrigger render={children} />
      <TooltipContent side={tooltips.side} className={tooltips.className}>
        {content}
      </TooltipContent>
    </Tooltip>
  )
}

function EventCalendarNavToday({ className, render, children, tooltip, ...props }: NavButtonProps) {
  const { today, isToday } = useEventCalendarNavigation()
  const settings = useEventCalendarSettings()
  const nav = useNavButtonProps()
  const defaultTooltip = useEventCalendarSelector(() =>
    format(toZoned(new Date(), settings.timeZone), settings.i18n.formats.dayTitle, {
      locale: settings.locale,
    }),
  )
  return (
    <NavTooltip content={tooltip === undefined ? defaultTooltip : tooltip}>
      <Button
        variant={nav.variant}
        size={nav.size}
        data-slot="event-calendar-nav-today"
        data-active={isToday || undefined}
        className={cn(nav.className, className)}
        onClick={today}
        render={render}
        {...props}
      >
        {children ?? settings.i18n.labels.today}
      </Button>
    </NavTooltip>
  )
}

function EventCalendarNavPrev({ className, render, children, tooltip, ...props }: NavButtonProps) {
  const { prev } = useEventCalendarNavigation()
  const settings = useEventCalendarSettings()
  const nav = useNavButtonProps()
  return (
    <NavTooltip content={tooltip === undefined ? settings.i18n.labels.previous : tooltip}>
      <Button
        variant={nav.variant}
        size={nav.iconSize}
        data-slot="event-calendar-nav-prev"
        aria-label={settings.i18n.labels.previous}
        className={cn(nav.className, className)}
        onClick={prev}
        render={render}
        {...props}
      >
        {children ?? <ChevronLeftIcon className="size-4" aria-hidden="true" />}
      </Button>
    </NavTooltip>
  )
}

function EventCalendarNavNext({ className, render, children, tooltip, ...props }: NavButtonProps) {
  const { next } = useEventCalendarNavigation()
  const settings = useEventCalendarSettings()
  const nav = useNavButtonProps()
  return (
    <NavTooltip content={tooltip === undefined ? settings.i18n.labels.next : tooltip}>
      <Button
        variant={nav.variant}
        size={nav.iconSize}
        data-slot="event-calendar-nav-next"
        aria-label={settings.i18n.labels.next}
        className={cn(nav.className, className)}
        onClick={next}
        render={render}
        {...props}
      >
        {children ?? <ChevronRightIcon className="size-4" aria-hidden="true" />}
      </Button>
    </NavTooltip>
  )
}

interface EventCalendarTitleProps extends RenderProps<"div"> {
  format?: (ctx: { title: string }) => ReactNode
}

function EventCalendarTitle({
  className,
  render,
  format: formatTitle,
  ...props
}: EventCalendarTitleProps) {
  const { title } = useEventCalendarNavigation()
  const viewConfig = useEventCalendarViewConfig()
  const defaultProps = {
    "data-slot": "event-calendar-title",
    "aria-live": "polite" as const,
    className: cn(
      "min-w-0 truncate text-sm font-semibold",
      viewConfig.classNames?.title,
      className,
    ),
    children: formatTitle?.({ title }) ?? title,
  }
  return renderElement("div", mergeProps(defaultProps, props), render)
}

interface EventCalendarViewSwitcherProps extends Omit<RenderProps<"button">, "children"> {
  children?: ReactNode
  tooltip?: ReactNode | null
}

function EventCalendarViewSwitcher({
  className,
  render,
  children,
  tooltip,
  ...props
}: EventCalendarViewSwitcherProps) {
  const { view, dayCount, availableViews, setView } = useEventCalendarView()
  const settings = useEventCalendarSettings()
  const viewConfig = useEventCalendarViewConfig()
  const nav = useNavButtonProps()
  const tooltips = useNavTooltipConfig()
  const labels = settings.i18n.labels
  const [open, setOpen] = useState(false)
  const [tipOpen, setTipOpen] = useState(false)

  const selectView = (v: CalendarView, opts?: { dayCount?: number }) => {
    setOpen(false)
    setView(v, opts)
  }

  const viewLabel = (v: CalendarView) =>
    v === "days" ? settings.i18n.viewNames.days(dayCount) : settings.i18n.viewNames[v]

  return (
    <DropdownMenu
      open={open}
      onOpenChange={(next: boolean) => {
        setOpen(next)
        if (next) setTipOpen(false)
      }}
    >
      <Tooltip
        delay={tooltips.delay}
        closeDelay={tooltips.closeDelay}
        open={tipOpen && !open}
        onOpenChange={(next: boolean, details: { reason?: string }) => {
          if (next && details?.reason !== "trigger-hover") return
          setTipOpen(next)
        }}
      >
        <DropdownMenuTrigger
          render={
            <TooltipTrigger
              render={
                <Button
                  variant={nav.variant}
                  size={nav.size}
                  data-slot="event-calendar-view-switcher"
                  aria-label={labels.selectView}
                  className={cn("gap-1", nav.className, className)}
                  render={render}
                />
              }
            />
          }
          {...props}
        >
          {children ?? (
            <>
              {viewLabel(view)}
              <ChevronDownIcon className="size-4 opacity-60" aria-hidden="true" />
            </>
          )}
        </DropdownMenuTrigger>
        {tipOpen && !open && tooltip !== null && !tooltips.disabled && (
          <TooltipContent side={tooltips.side} className={tooltips.className}>
            {tooltip ?? labels.selectView}
          </TooltipContent>
        )}
      </Tooltip>
      <DropdownMenuContent
        align="start"
        className={cn("min-w-44", viewConfig.classNames?.viewSwitcherContent)}
      >
        <DropdownMenuGroup>
          <DropdownMenuLabel
            className={cn(
              "font-normal text-muted-foreground",
              viewConfig.classNames?.viewSwitcherLabel,
            )}
          >
            {settings.i18n.labels.selectView}
          </DropdownMenuLabel>
          {availableViews.map((v) =>
            v === "days" ? (
              viewConfig.dayCountPresets.map((count) => (
                <DropdownMenuItem
                  key={`days-${count}`}
                  data-active={(view === "days" && dayCount === count) || undefined}
                  onClick={() => selectView("days", { dayCount: count })}
                >
                  {settings.i18n.viewNames.days(count)}
                  {viewConfig.enableShortcuts && (
                    <EventCalendarViewShortcut>{count}</EventCalendarViewShortcut>
                  )}
                </DropdownMenuItem>
              ))
            ) : (
              <DropdownMenuItem
                key={v}
                data-active={view === v || undefined}
                onClick={() => selectView(v)}
              >
                {viewLabel(v)}
                {viewConfig.enableShortcuts && (
                  <EventCalendarViewShortcut>{labels.viewShortcuts[v]}</EventCalendarViewShortcut>
                )}
              </DropdownMenuItem>
            ),
          )}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

function EventCalendarViewShortcut({ children }: { children: ReactNode }) {
  const viewConfig = useEventCalendarViewConfig()
  return (
    <kbd
      data-slot="event-calendar-view-shortcut"
      className={cn(
        "ms-auto inline-flex size-5 shrink-0 items-center justify-center rounded-sm border font-sans text-xs text-muted-foreground",
        viewConfig.classNames?.viewShortcut,
      )}
    >
      {children}
    </kbd>
  )
}

interface EventCalendarDatePickerProps extends Omit<RenderProps<"button">, "children"> {
  children?: ReactNode
  mode?: "auto" | "single" | "range"
  tooltip?: ReactNode | null
}

const RANGE_VIEWS = new Set<CalendarView>(["week", "days", "agenda"])

function EventCalendarDatePicker({
  className,
  render,
  children,
  tooltip = null,
  mode,
  ...props
}: EventCalendarDatePickerProps) {
  const { date, goTo, activeRange } = useEventCalendarNavigation()
  const { view } = useEventCalendarView()
  const settings = useEventCalendarSettings()
  const viewConfig = useEventCalendarViewConfig()
  const nav = useNavButtonProps()
  const [open, setOpen] = useState(false)
  const zoned = toZoned(date, settings.timeZone)

  const configured = mode ?? "auto"
  const resolved = configured === "auto" ? (RANGE_VIEWS.has(view) ? "range" : "single") : configured

  const pick = (next: Date | undefined) => {
    if (!next) return
    goTo(next)
    setOpen(false)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <NavTooltip content={tooltip}>
        <PopoverTrigger
          render={
            <Button
              variant={nav.variant}
              size={nav.iconSize}
              data-slot="event-calendar-date-picker"
              data-mode={resolved}
              aria-label={settings.i18n.labels.goToDate}
              className={cn(nav.className, className)}
              render={render}
            />
          }
          {...props}
        >
          {children ?? <CalendarIcon className="size-4" aria-hidden="true" />}
        </PopoverTrigger>
      </NavTooltip>
      <PopoverContent
        align="start"
        className={cn("w-auto p-0!", viewConfig.classNames?.datePickerContent)}
      >
        {resolved === "range" ? (
          <Calendar
            mode="range"
            selected={{
              from: toZoned(activeRange.start, settings.timeZone),
              to: toZoned(addDays(activeRange.end, -1), settings.timeZone),
            }}
            defaultMonth={zoned}
            onDayClick={pick}
            locale={settings.locale}
            weekStartsOn={settings.weekStartsOn}
          />
        ) : (
          <Calendar
            mode="single"
            selected={zoned}
            defaultMonth={zoned}
            onSelect={pick}
            locale={settings.locale}
            weekStartsOn={settings.weekStartsOn}
          />
        )}
      </PopoverContent>
    </Popover>
  )
}

type EventCalendarToolbarProps = RenderProps<"div">

function EventCalendarToolbar({ className, render, ...props }: EventCalendarToolbarProps) {
  const viewConfig = useEventCalendarViewConfig()
  const defaultProps = {
    "data-slot": "event-calendar-toolbar",
    className: cn("flex items-center gap-2", viewConfig.classNames?.toolbar, className),
    children: props.children,
  }
  return renderElement("div", mergeProps(defaultProps, props), render)
}

interface EventCalendarNavProps extends RenderProps<"div"> {
  showViewSwitcher?: boolean
}

function EventCalendarNav({
  className,
  render,
  children,
  showViewSwitcher = true,
  ...props
}: EventCalendarNavProps) {
  const viewConfig = useEventCalendarViewConfig()
  const defaultProps = {
    "data-slot": "event-calendar-nav",
    className: cn(
      "flex min-w-0 flex-wrap items-center gap-1 px-2 py-2",
      viewConfig.stickyNav && "sticky top-0 z-30 bg-background",
      viewConfig.classNames?.nav,
      className,
    ),
    children: children ?? (
      <>
        <EventCalendarNavToday />
        {showViewSwitcher && <EventCalendarViewSwitcher />}
        <div className="flex items-center">
          <EventCalendarNavPrev />
          <EventCalendarNavNext />
        </div>
        <EventCalendarTitle className="ms-3" />
        <div className="grow" />
      </>
    ),
  }
  return renderElement("div", mergeProps(defaultProps, props), render)
}

export {
  EventCalendarDatePicker,
  EventCalendarNav,
  EventCalendarNavNext,
  EventCalendarNavPrev,
  EventCalendarNavToday,
  EventCalendarTitle,
  EventCalendarToolbar,
  EventCalendarViewSwitcher,
}
export type {
  EventCalendarNavProps,
  EventCalendarTitleProps,
  EventCalendarToolbarProps,
  EventCalendarViewSwitcherProps,
}
