import { act, render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { afterEach, expect, test } from "vitest"

import { confirm } from "@ui-sdk-ds/ui/components/alert-dialog"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "@ui-sdk-ds/ui/components/message-scroller"
import { OverlayHost } from "@ui-sdk-ds/ui/components/overlays"
import { toast } from "@ui-sdk-ds/ui/components/toast"

afterEach(() => {
  act(() => toast.dismiss())
})

test("the overlay host renders toast() in the styled region", async () => {
  render(<OverlayHost />)
  act(() => {
    toast.success("Project saved", { description: "Deploying to production." })
  })

  const title = await screen.findByText("Project saved")
  const item = title.closest("[data-slot=toast]")
  expect(item?.querySelector("[data-slot=toast-icon]")).not.toBeNull()
  expect(item?.closest("section")?.className).toContain("w-[min(24rem,calc(100vw-2rem))]")
  expect(item?.closest("section")?.hasAttribute("data-agent-hidden")).toBe(true)
  expect(screen.getByRole("button", { name: "Close toast" })).toBeDefined()
})

test("the overlay host asks confirm() questions in the styled alert dialog", async () => {
  const user = userEvent.setup()
  render(<OverlayHost />)

  let answer: Promise<boolean> | undefined
  act(() => {
    answer = confirm({
      title: "Delete marketing-site?",
      description: "Its deployments and domains are removed.",
      confirmLabel: "Delete",
    })
  })

  const dialog = await screen.findByRole("alertdialog", { name: "Delete marketing-site?" })
  expect(dialog.getAttribute("data-slot")).toBe("alert-dialog-content")
  expect(screen.getByText("Its deployments and domains are removed.")).toBeDefined()
  await user.click(screen.getByRole("button", { name: "Delete" }))
  await expect(answer).resolves.toBe(true)

  act(() => {
    answer = confirm({ title: "Revoke the token?" })
  })
  await screen.findByRole("alertdialog", { name: "Revoke the token?" })
  await user.click(screen.getByRole("button", { name: "Cancel" }))
  await expect(answer).resolves.toBe(false)
  await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull())
})

test("a message scroller is a named log with a scroll to end button", () => {
  render(
    <MessageScroller>
      <MessageScrollerViewport aria-label="Build assistant thread">
        <MessageScrollerContent>
          <MessageScrollerItem>Deploy finished.</MessageScrollerItem>
        </MessageScrollerContent>
      </MessageScrollerViewport>
      <MessageScrollerButton />
    </MessageScroller>,
  )

  expect(screen.getByRole("log", { name: "Build assistant thread" })).toBeDefined()
  expect(screen.getByRole("button", { name: "Scroll to end", hidden: true })).toBeDefined()
})
