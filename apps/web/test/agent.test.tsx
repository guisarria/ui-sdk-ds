import { render, screen, waitFor } from "@testing-library/react"
import { type AgentComponent, createAgent } from "@ui-sdk-ds/ui/lib/agent"
import { expect, test } from "vitest"

import { Actions } from "@/app/_components/actions"
import { Conversation } from "@/app/_components/conversation"
import { DataDisplay } from "@/app/_components/data-display"
import { Feedback } from "@/app/_components/feedback"
import { Foundations } from "@/app/_components/foundations"
import { Guidelines } from "@/app/_components/guidelines"
import { Inputs } from "@/app/_components/inputs"
import { Navigation } from "@/app/_components/navigation"
import { Overlays } from "@/app/_components/overlays"
import { Overview } from "@/app/_components/overview"
import { Patterns } from "@/app/_components/patterns"
import { SiteFooter } from "@/app/_components/site-footer"
import { SiteHeader } from "@/app/_components/site-header"

let approve = false
const agent = createAgent({ allow: (step) => !step.confirm || approve })

const sections = {
  "the header": () => <SiteHeader />,
  Overview: () => <Overview componentCount={80} />,
  Foundations: () => <Foundations />,
  Actions: () => <Actions />,
  Inputs: () => <Inputs />,
  Navigation: () => <Navigation />,
  "Data display": () => <DataDisplay />,
  Feedback: () => <Feedback />,
  Overlays: () => <Overlays />,
  Conversation: () => <Conversation />,
  Guidelines: () => <Guidelines />,
  Patterns: () => <Patterns />,
  "the footer": () => <SiteFooter componentCount={80} />,
}

// ui-sdk lists an InputGroup as an unnamed input whose only action is clear. The Input inside it
// carries the name and the same clear action.
function isInputGroup(entry: AgentComponent) {
  return entry.component === "input" && !("value" in entry) && entry.actions.join() === "clear"
}

// A trigger rendered as a Button is listed as a button too, under the same name, so steps on the
// popup it opens use the popup's ref.
async function refOf(kind: string, label: string) {
  const found = await agent.query({ text: label, kind })
  const matches = Array.isArray(found)
    ? found.filter((entry) => !entry.offPage && entry.label === label)
    : []
  expect(matches, `${kind} "${label}": ${JSON.stringify(found)}`).toHaveLength(1)
  return matches[0]!.ref
}

test.each(Object.entries(sections))("an agent can name every component in %s", (name, Section) => {
  const { container } = render(<Section />)
  const blocks = [...container.querySelectorAll("article[id]")]

  // A snapshot lists 100 components, so read the page one block at a time.
  for (const shown of [null, ...blocks]) {
    for (const block of blocks) block.toggleAttribute("data-agent-hidden", block !== shown)
    const where = shown ? `${name} › #${shown.id}` : name
    const components = agent.snapshot().filter((entry) => !entry.offPage)

    expect(
      components.map((entry) => entry.component),
      `${where} has more than 100`,
    ).not.toContain("more")
    for (const entry of components.filter((entry) => !isInputGroup(entry))) {
      expect(entry.label, `${where}: ${entry.component} ${entry.ref} has no name`).toBeTruthy()
    }
  }
})

test("an agent fills a form and picks from groups", async () => {
  render(<Inputs />)

  const disabled = await agent.act({
    steps: [{ ref: "Rollout strategy", action: "setValue", args: ["Canary (Enterprise plan)"] }],
  })
  expect(disabled.ok).toBe(false)

  const result = await agent.act({
    steps: [
      { ref: "Repository", action: "setValue", args: ["https://github.com/acme/atlas"] },
      { ref: "Rollout strategy", action: "setValue", args: ["Blue-green, switch all at once"] },
      { ref: "Notify me about", action: "setValue", args: [["deploys", "billing"]] },
    ],
  })
  expect(result.ok, result.error?.message).toBe(true)
  expect(screen.getByLabelText<HTMLInputElement>("Repository").value).toBe(
    "https://github.com/acme/atlas",
  )
  expect(screen.getByRole("radio", { name: "Blue-green, switch all at once" }).ariaChecked).toBe(
    "true",
  )
  expect(screen.getByRole("checkbox", { name: "Billing" }).ariaChecked).toBe("true")
})

test("a delete the person hasn't approved doesn't run", async () => {
  render(<Overlays />)
  const dialog = await refOf("alert-dialog", "Delete project")
  const remove = { steps: [{ ref: dialog, action: "press", args: ["Delete forever"] }] }

  approve = false
  const refused = await agent.act(remove)
  expect(refused.ok).toBe(false)
  expect(refused.error?.message).toMatch(/48 deployments/)
  expect(screen.queryByRole("alertdialog")).toBeNull()

  approve = true
  const approved = await agent.act(remove)
  expect(approved.ok, approved.error?.message).toBe(true)
  await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull())
  approve = false
})

test("an agent removes a domain from its row's menu once the person approves", async () => {
  render(<Patterns />)
  const tab = await agent.act({
    steps: [{ ref: "Project settings", action: "setValue", args: ["domains"] }],
  })
  expect(tab.ok, tab.error?.message).toBe(true)
  const menu = await refOf("menu", "Actions for app.example.org")
  const steps = [{ ref: menu, action: "press", args: ["Remove"] }]

  approve = false
  expect((await agent.act({ steps })).ok).toBe(false)
  expect(screen.getByText("app.example.org")).toBeDefined()

  approve = true
  const result = await agent.act({ steps })
  expect(result.ok, result.error?.message).toBe(true)
  await waitFor(() => expect(screen.queryByText("app.example.org")).toBeNull())
  approve = false
})
