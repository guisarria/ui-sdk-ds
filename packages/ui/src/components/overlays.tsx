"use client"

import type * as React from "react"
import { OverlayHost as OverlayHostPrimitive } from "@ui-sdk/react/overlays"
import { cn } from "cn"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  confirm,
  type ConfirmOptions,
} from "@ui-sdk-ds/ui/components/alert-dialog"
import { type ToastViewport, toastViewportProps } from "@ui-sdk-ds/ui/components/toast"

function ConfirmDialog() {
  return (
    <AlertDialog controller={confirm.controller}>
      <AlertDialogContent<ConfirmOptions>>
        {({ payload }) => (
          <>
            <AlertDialogHeader>
              <AlertDialogTitle>{payload?.title}</AlertDialogTitle>
              {payload?.description ? (
                <AlertDialogDescription>{payload.description}</AlertDialogDescription>
              ) : null}
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>{payload?.cancelLabel ?? "Cancel"}</AlertDialogCancel>
              <AlertDialogAction>{payload?.confirmLabel ?? "Continue"}</AlertDialogAction>
            </AlertDialogFooter>
          </>
        )}
      </AlertDialogContent>
    </AlertDialog>
  )
}

function OverlayHost({
  toast,
}: {
  toast?: Omit<React.ComponentProps<typeof ToastViewport>, "toaster">
}) {
  return (
    <>
      <OverlayHostPrimitive
        toast={{
          ...toastViewportProps,
          ...toast,
          className: cn(toastViewportProps.className, toast?.className),
        }}
      />
      <ConfirmDialog />
    </>
  )
}

export { OverlayHost }
