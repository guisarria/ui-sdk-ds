import { act, render } from "@testing-library/react"
import { afterEach, expect, test } from "vitest"

import { colorScheme, palette, ThemePreferences } from "@ui-sdk-ds/ui/components/preferences"

afterEach(() => {
  colorScheme.set("system")
  palette.set("claude")
  localStorage.clear()
})

test("color scheme and palette land on <html> and are saved", async () => {
  render(<ThemePreferences />)
  const root = document.documentElement

  await act(async () => {})
  expect(root.dataset.colorScheme).toBe("system")
  expect(root.dataset.palette).toBe("claude")

  await act(async () => {
    colorScheme.set("dark")
    palette.set("fizzy-lake")
  })
  expect(root.dataset.colorScheme).toBe("dark")
  expect(root.dataset.palette).toBe("fizzy-lake")
  expect(localStorage.getItem("color-scheme")).toBe("dark")
  expect(localStorage.getItem("palette")).toBe("fizzy-lake")
  expect(colorScheme.get().resolved).toBe("dark")
})

test("switching the color scheme pauses transitions for a frame", async () => {
  render(<ThemePreferences />)
  const paused = () =>
    [...document.head.querySelectorAll("style")].some((style) =>
      style.textContent.includes("transition:none"),
    )

  await act(async () => {
    colorScheme.set("dark")
  })
  expect(paused()).toBe(true)

  await new Promise((resolve) => {
    requestAnimationFrame(() => requestAnimationFrame(() => requestAnimationFrame(resolve)))
  })
  expect(paused()).toBe(false)
})
