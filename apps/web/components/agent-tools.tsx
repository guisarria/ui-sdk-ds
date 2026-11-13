"use client"

import * as React from "react"
import { confirm } from "@ui-sdk-ds/ui/components/alert-dialog"
import { createAgent, registerTools } from "@ui-sdk-ds/ui/lib/agent"

function askThePerson(action: string, signal: AbortSignal) {
  signal.addEventListener("abort", () => confirm.controller.close(), { once: true })
  return confirm({
    title: "Let the assistant do this?",
    description: action,
    confirmLabel: "Allow",
    cancelLabel: "Don’t allow",
  })
}

let agent: ReturnType<typeof createAgent> | undefined

function AgentTools() {
  React.useEffect(() => {
    agent ??= createAgent({
      allow: (step, { signal }) => (step.confirm ? askThePerson(step.confirm, signal) : true),
    })
    return registerTools(agent, { allow: () => true })
  }, [])

  return null
}

export { AgentTools }
