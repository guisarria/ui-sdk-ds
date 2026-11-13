import { BanIcon, CircleCheckIcon, CircleXIcon, ClockIcon } from "lucide-react"

import { Badge } from "@ui-sdk-ds/ui/components/badge"
import { Spinner } from "@ui-sdk-ds/ui/components/spinner"

import type { DeploymentStatus } from "./data"

export function StatusBadge({ status }: { status: DeploymentStatus }) {
  switch (status) {
    case "Ready":
      return (
        <Badge variant="success">
          <CircleCheckIcon data-icon="inline-start" />
          Ready
        </Badge>
      )
    case "Building":
      return (
        <Badge variant="info">
          <Spinner data-icon="inline-start" aria-hidden="true" />
          Building
        </Badge>
      )
    case "Queued":
      return (
        <Badge variant="outline">
          <ClockIcon data-icon="inline-start" />
          Queued
        </Badge>
      )
    case "Error":
      return (
        <Badge variant="destructive">
          <CircleXIcon data-icon="inline-start" />
          Error
        </Badge>
      )
    case "Canceled":
      return (
        <Badge variant="ghost">
          <BanIcon data-icon="inline-start" />
          Canceled
        </Badge>
      )
  }
}
