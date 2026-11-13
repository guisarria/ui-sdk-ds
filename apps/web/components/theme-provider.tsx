"use client"

import * as React from "react"
import { colorScheme, ThemePreferences } from "@ui-sdk-ds/ui/components/preferences"

function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <ThemePreferences>
      <ThemeHotkey />
      {children}
    </ThemePreferences>
  )
}

function isTypingTarget(target: EventTarget | null) {
  if (!(target instanceof HTMLElement)) {
    return false
  }

  return (
    target.isContentEditable ||
    target.tagName === "INPUT" ||
    target.tagName === "TEXTAREA" ||
    target.tagName === "SELECT"
  )
}

function ThemeHotkey() {
  React.useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.defaultPrevented || event.repeat) {
        return
      }

      if (event.metaKey || event.ctrlKey || event.altKey) {
        return
      }

      if (event.key.toLowerCase() !== "d" || isTypingTarget(event.target)) {
        return
      }

      const next = colorScheme.get().resolved === "dark" ? "light" : "dark"
      colorScheme.set(next, { event })
    }

    window.addEventListener("keydown", onKeyDown)

    return () => {
      window.removeEventListener("keydown", onKeyDown)
    }
  }, [])

  return null
}

export { ThemeProvider }
