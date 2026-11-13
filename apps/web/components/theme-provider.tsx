"use client"

import type * as React from "react"
import { colorScheme, ThemePreferences } from "@ui-sdk-ds/ui/components/preferences"
import { useShortcut } from "@ui-sdk-ds/ui/hooks/use-shortcut"

function ThemeProvider({ children }: { children: React.ReactNode }) {
  useShortcut(
    "d",
    (event) => {
      colorScheme.set(colorScheme.get().resolved === "dark" ? "light" : "dark", { event })
    },
    { description: "Toggle dark mode" },
  )

  return <ThemePreferences>{children}</ThemePreferences>
}

export { ThemeProvider }
