"use client"

import * as React from "react"
import {
  ImageCropperFlip as ImageCropperFlipPrimitive,
  ImageCropperGrid as ImageCropperGridPrimitive,
  ImageCropperHandle as ImageCropperHandlePrimitive,
  ImageCropperImage as ImageCropperImagePrimitive,
  ImageCropperRotate as ImageCropperRotatePrimitive,
  ImageCropperSelection as ImageCropperSelectionPrimitive,
  ImageCropperViewport as ImageCropperViewportPrimitive,
  ImageCropperZoom as ImageCropperZoomPrimitive,
} from "@ui-sdk/react/image-cropper"
import { cn } from "cn"
import { FlipHorizontal2Icon, FlipVertical2Icon, RotateCwIcon } from "lucide-react"

import { buttonVariants } from "@ui-sdk-ds/ui/components/button"
import type { WithNodeChildren } from "@ui-sdk-ds/ui/lib/parts"

const toolClassName = cn(buttonVariants({ variant: "outline", size: "icon" }))

function ImageCropperViewport({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ImageCropperViewportPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ImageCropperViewportPrimitive
      className={cn(
        "aspect-(--image-cropper-aspect-ratio) w-full touch-none overflow-hidden rounded-2xl bg-muted select-none",
        className,
      )}
      {...props}
    />
  )
}

function ImageCropperImage({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ImageCropperImagePrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ImageCropperImagePrimitive
      className={cn("pointer-events-none max-w-none", className)}
      {...props}
    />
  )
}

function ImageCropperSelection({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof ImageCropperSelectionPrimitive>, "className"> & {
    className?: string
  }
>) {
  return (
    <ImageCropperSelectionPrimitive
      className={cn(
        "cursor-move shadow-[0_0_0_9999px_rgb(0_0_0/0.5)] outline-2 outline-white/90 focus-visible:outline-ring data-loading:hidden data-[shape=circle]:rounded-full",
        className,
      )}
      {...props}
    >
      {children ?? (
        <>
          <ImageCropperGrid />
          {(["nw", "ne", "sw", "se"] as const).map((position) => (
            <ImageCropperHandle key={position} position={position} />
          ))}
        </>
      )}
    </ImageCropperSelectionPrimitive>
  )
}

function ImageCropperGrid({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ImageCropperGridPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ImageCropperGridPrimitive
      className={cn(
        "pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent_calc(100%/3-0.5px),rgb(255_255_255/0.5)_calc(100%/3-0.5px)_calc(100%/3+0.5px),transparent_calc(100%/3+0.5px)_calc(200%/3-0.5px),rgb(255_255_255/0.5)_calc(200%/3-0.5px)_calc(200%/3+0.5px),transparent_calc(200%/3+0.5px)),linear-gradient(to_bottom,transparent_calc(100%/3-0.5px),rgb(255_255_255/0.5)_calc(100%/3-0.5px)_calc(100%/3+0.5px),transparent_calc(100%/3+0.5px)_calc(200%/3-0.5px),rgb(255_255_255/0.5)_calc(200%/3-0.5px)_calc(200%/3+0.5px),transparent_calc(200%/3+0.5px))] opacity-0 transition-opacity duration-150 data-dragging:opacity-100 data-[shape=circle]:rounded-full motion-reduce:transition-none",
        className,
      )}
      {...props}
    />
  )
}

function ImageCropperHandle({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ImageCropperHandlePrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ImageCropperHandlePrimitive
      className={cn(
        "absolute size-3 -translate-1/2 rounded-full border-2 border-white bg-primary shadow-sm data-[position=e]:top-1/2 data-[position=e]:left-full data-[position=e]:cursor-ew-resize data-[position=n]:top-0 data-[position=n]:left-1/2 data-[position=n]:cursor-ns-resize data-[position=ne]:top-0 data-[position=ne]:left-full data-[position=ne]:cursor-nesw-resize data-[position=nw]:top-0 data-[position=nw]:left-0 data-[position=nw]:cursor-nwse-resize data-[position=s]:top-full data-[position=s]:left-1/2 data-[position=s]:cursor-ns-resize data-[position=se]:top-full data-[position=se]:left-full data-[position=se]:cursor-nwse-resize data-[position=sw]:top-full data-[position=sw]:left-0 data-[position=sw]:cursor-nesw-resize data-[position=w]:top-1/2 data-[position=w]:left-0 data-[position=w]:cursor-ew-resize",
        className,
      )}
      {...props}
    />
  )
}

function ImageCropperZoom({
  className,
  ...props
}: Omit<React.ComponentProps<typeof ImageCropperZoomPrimitive>, "className"> & {
  className?: string
}) {
  return (
    <ImageCropperZoomPrimitive
      aria-label="Zoom"
      className={cn("w-full accent-primary disabled:opacity-50", className)}
      {...props}
    />
  )
}

function ImageCropperRotate({
  className,
  children,
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof ImageCropperRotatePrimitive>, "className"> & {
    className?: string
  }
>) {
  return (
    <ImageCropperRotatePrimitive
      aria-label="Rotate"
      className={cn(toolClassName, className)}
      {...props}
    >
      {children ?? <RotateCwIcon aria-hidden="true" />}
    </ImageCropperRotatePrimitive>
  )
}

function ImageCropperFlip({
  className,
  children,
  direction = "horizontal",
  ...props
}: WithNodeChildren<
  Omit<React.ComponentProps<typeof ImageCropperFlipPrimitive>, "className"> & { className?: string }
>) {
  const Icon = direction === "vertical" ? FlipVertical2Icon : FlipHorizontal2Icon
  return (
    <ImageCropperFlipPrimitive
      aria-label={direction === "vertical" ? "Flip vertically" : "Flip horizontally"}
      direction={direction}
      className={cn(toolClassName, className)}
      {...props}
    >
      {children ?? <Icon aria-hidden="true" />}
    </ImageCropperFlipPrimitive>
  )
}

export {
  ImageCropperFlip,
  ImageCropperGrid,
  ImageCropperHandle,
  ImageCropperImage,
  ImageCropperRotate,
  ImageCropperSelection,
  ImageCropperViewport,
  ImageCropperZoom,
}
export { ImageCropper, createImageCropperController } from "@ui-sdk/react/image-cropper"
