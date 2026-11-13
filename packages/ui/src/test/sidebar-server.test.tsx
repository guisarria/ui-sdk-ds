// @vitest-environment node
import { renderToString } from "react-dom/server"
import { expect, test } from "vitest"

import { Sidebar, SidebarProvider } from "@ui-sdk-ds/ui/components/sidebar"

function renderSidebar(cookie?: string | null) {
  return renderToString(
    <SidebarProvider cookie={cookie}>
      <Sidebar collapsible="icon">Projects</Sidebar>
    </SidebarProvider>,
  )
}

test("the server renders the sidebar state saved in the request's cookie", () => {
  expect(renderSidebar("theme=dark; sidebar_state=collapsed")).toContain('data-state="collapsed"')
  expect(renderSidebar("sidebar_state=expanded")).toContain('data-state="expanded"')
})

test("without a saved state the sidebar starts open", () => {
  expect(renderSidebar(null)).toContain('data-state="expanded"')
  expect(renderSidebar()).toContain('data-state="expanded"')
  expect(renderSidebar("sidebar_state=sideways")).toContain('data-state="expanded"')
})
