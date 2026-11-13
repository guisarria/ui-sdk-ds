import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { useState } from "react"
import { expect, test } from "vitest"

import { Button } from "@ui-sdk-ds/ui/components/button"
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandItem,
  CommandList,
} from "@ui-sdk-ds/ui/components/command"
import {
  createDialogController,
  DialogShortcut,
  DialogTrigger,
} from "@ui-sdk-ds/ui/components/dialog"
import { Sidebar, SidebarProvider } from "@ui-sdk-ds/ui/components/sidebar"

test("mod+b toggles the sidebar, and plain b doesn't", async () => {
  const user = userEvent.setup()
  const changes: Array<boolean> = []
  const { container } = render(
    <SidebarProvider onOpenChange={(open) => changes.push(open)} open>
      <Sidebar>Navigation</Sidebar>
    </SidebarProvider>,
  )
  expect(container.querySelector("[data-slot=sidebar]")).toHaveProperty("dataset.state", "expanded")

  await user.keyboard("b")
  expect(changes).toEqual([])

  await user.keyboard("{Control>}b{/Control}")
  expect(changes).toEqual([false])
})

function Palette() {
  const [palette] = useState(() => createDialogController())
  const [open, setOpen] = useState(false)
  return (
    <>
      <DialogTrigger controller={palette} shortcut="mod+k" render={<Button />}>
        Open command palette
        <DialogShortcut />
      </DialogTrigger>
      <CommandDialog controller={palette} open={open} onOpenChange={setOpen}>
        <Command>
          <CommandInput aria-label="Search commands" placeholder="Search" />
          <CommandList>
            <CommandItem onSelect={() => setOpen(false)}>Deployments</CommandItem>
          </CommandList>
        </Command>
      </CommandDialog>
    </>
  )
}

test("a trigger outside the command dialog opens it with its shortcut and returns focus", async () => {
  const user = userEvent.setup()
  render(<Palette />)
  const trigger = screen.getByRole("button", { name: /Open command palette/ })
  expect(trigger.getAttribute("aria-keyshortcuts")).toBe("Control+K")
  expect(trigger.textContent).toContain("Ctrl+K")

  await user.keyboard("{Control>}k{/Control}")
  const dialog = await screen.findByRole("dialog", { name: "Command Palette" })

  await user.click(screen.getByRole("option", { name: "Deployments" }))
  await waitFor(() => expect(dialog.isConnected).toBe(false))
  expect(document.activeElement).toBe(trigger)
})
