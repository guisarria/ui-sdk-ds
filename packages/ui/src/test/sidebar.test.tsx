import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { renderToString } from "react-dom/server"
import { afterEach, expect, test, vi } from "vitest"

import { Sidebar, SidebarProvider, SidebarTrigger } from "@ui-sdk-ds/ui/components/sidebar"

afterEach(() => {
  document.cookie = "sidebar_state=; max-age=0; path=/"
  vi.restoreAllMocks()
})

function App({ cookie }: { cookie?: string | null }) {
  return (
    <SidebarProvider cookie={cookie}>
      <Sidebar collapsible="icon">Projects</Sidebar>
      <SidebarTrigger />
    </SidebarProvider>
  )
}

function sidebarState(container: HTMLElement) {
  return container.querySelector("[data-slot=sidebar]")?.getAttribute("data-state")
}

test("a sidebar saved as collapsed hydrates collapsed, with no mismatch", () => {
  document.cookie = "sidebar_state=collapsed; path=/"
  const error = vi.spyOn(console, "error")
  const container = document.createElement("div")
  document.body.append(container)
  container.innerHTML = renderToString(<App cookie="sidebar_state=collapsed" />)

  render(<App cookie="sidebar_state=collapsed" />, { container, hydrate: true })

  expect(sidebarState(container)).toBe("collapsed")
  expect(error).not.toHaveBeenCalled()
})

test("toggling the sidebar saves its state in the cookie", async () => {
  const user = userEvent.setup()
  const { container } = render(<App cookie={null} />)

  await user.click(screen.getByRole("button", { name: "Toggle Sidebar" }))

  expect(sidebarState(container)).toBe("collapsed")
  expect(document.cookie).toContain("sidebar_state=collapsed")
})

test("without a cookie the sidebar keeps its state in memory", async () => {
  const user = userEvent.setup()
  const { container } = render(<App />)

  await user.click(screen.getByRole("button", { name: "Toggle Sidebar" }))

  expect(sidebarState(container)).toBe("collapsed")
  expect(document.cookie).not.toContain("sidebar_state")
})
