"use client"

import * as React from "react"
import {
  Carousel as CarouselPrimitive,
  CarouselContent as CarouselContentPrimitive,
  CarouselIndicator as CarouselIndicatorPrimitive,
  CarouselIndicatorGroup as CarouselIndicatorGroupPrimitive,
  CarouselPlayToggle as CarouselPlayTogglePrimitive,
  CarouselItem as CarouselItemPrimitive,
  CarouselNext as CarouselNextPrimitive,
  CarouselPrevious as CarouselPreviousPrimitive,
  CarouselViewport as CarouselViewportPrimitive,
  createCarouselController,
} from "@ui-sdk/react/carousel"
import { cn } from "cn"
import { ChevronLeftIcon, ChevronRightIcon, PauseIcon, PlayIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"

type CarouselOptions = Pick<
  React.ComponentProps<typeof CarouselPrimitive>,
  "align" | "loop" | "dragFree" | "skipSnaps" | "slidesPerPage" | "drag"
>

function Carousel({
  opts,
  className,
  ...props
}: Omit<React.ComponentProps<typeof CarouselPrimitive>, "className"> & { className?: string } & {
  opts?: CarouselOptions
}) {
  return (
    <CarouselPrimitive className={cn("group/carousel relative", className)} {...opts} {...props} />
  )
}

function CarouselContent({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CarouselContentPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <CarouselViewportPrimitive className="scrollbar-none">
      <CarouselContentPrimitive
        className={cn(
          "flex data-[orientation=horizontal]:-ml-4 data-[orientation=vertical]:-mt-4 data-[orientation=vertical]:flex-col",
          className,
        )}
        {...props}
      />
    </CarouselViewportPrimitive>
  )
}

function CarouselItem({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CarouselItemPrimitive>, "className"> & { className?: string }) {
  return (
    <CarouselItemPrimitive
      className={cn(
        "min-w-0 shrink-0 grow-0 basis-full data-[orientation=horizontal]:pl-4 data-[orientation=vertical]:pt-4",
        className,
      )}
      {...props}
    />
  )
}

const carouselButtonClassName = cn(
  buttonVariants({ variant: "outline", size: "icon-sm" }),
  "absolute touch-manipulation rounded-2xl data-disabled:pointer-events-none data-disabled:opacity-50",
)

function CarouselPrevious({
  className,
  ...props
}: Omit<
  Omit<React.ComponentProps<typeof CarouselPreviousPrimitive>, "className"> & {
    className?: string
  },
  "children"
>) {
  return (
    <CarouselPreviousPrimitive
      aria-label="Previous slide"
      className={cn(
        carouselButtonClassName,
        "group-data-[orientation=horizontal]/carousel:inset-y-0 group-data-[orientation=horizontal]/carousel:-left-12 group-data-[orientation=horizontal]/carousel:my-auto group-data-[orientation=vertical]/carousel:-top-12 group-data-[orientation=vertical]/carousel:left-1/2 group-data-[orientation=vertical]/carousel:-translate-x-1/2 group-data-[orientation=vertical]/carousel:rotate-90",
        className,
      )}
      {...props}
    >
      <ChevronLeftIcon aria-hidden="true" />
    </CarouselPreviousPrimitive>
  )
}

function CarouselNext({
  className,
  ...props
}: Omit<
  Omit<React.ComponentProps<typeof CarouselNextPrimitive>, "className"> & { className?: string },
  "children"
>) {
  return (
    <CarouselNextPrimitive
      aria-label="Next slide"
      className={cn(
        carouselButtonClassName,
        "group-data-[orientation=horizontal]/carousel:inset-y-0 group-data-[orientation=horizontal]/carousel:-right-12 group-data-[orientation=horizontal]/carousel:my-auto group-data-[orientation=vertical]/carousel:-bottom-12 group-data-[orientation=vertical]/carousel:left-1/2 group-data-[orientation=vertical]/carousel:-translate-x-1/2 group-data-[orientation=vertical]/carousel:rotate-90",
        className,
      )}
      {...props}
    >
      <ChevronRightIcon aria-hidden="true" />
    </CarouselNextPrimitive>
  )
}

function CarouselIndicators({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CarouselIndicatorGroupPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <CarouselIndicatorGroupPrimitive
      aria-label="Choose a slide"
      className={cn("flex items-center justify-center gap-1.5 py-3", className)}
      {...props}
    >
      {children ??
        ((state) =>
          Array.from({ length: state.pageCount ?? 0 }, (_, index) => (
            <CarouselIndicator key={index} page={index + 1} aria-label={`Slide ${index + 1}`} />
          )))}
    </CarouselIndicatorGroupPrimitive>
  )
}

function CarouselIndicator({
  className,
  ...props
}: Omit<React.ComponentProps<typeof CarouselIndicatorPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <CarouselIndicatorPrimitive
      className={cn(
        "relative size-2 rounded-full bg-foreground/20 transition-[width,background-color] duration-200 outline-none after:absolute after:-inset-2 hover:bg-foreground/40 focus-visible:ring-3 focus-visible:ring-ring/30 motion-reduce:transition-none data-selected:w-5 data-selected:bg-foreground",
        className,
      )}
      {...props}
    />
  )
}

function CarouselPlayToggle({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof CarouselPlayTogglePrimitive>, "className"> & {
  className?: string
}) {
  return (
    <CarouselPlayTogglePrimitive
      aria-label="Autoplay"
      className={cn(
        buttonVariants({ variant: "outline", size: "icon-sm" }),
        "rounded-2xl",
        className,
      )}
      {...props}
    >
      {children ?? ((state) => (state.playing ? <PauseIcon /> : <PlayIcon />))}
    </CarouselPlayTogglePrimitive>
  )
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  createCarouselController,
  CarouselIndicators,
  CarouselIndicator,
  CarouselPlayToggle,
}
