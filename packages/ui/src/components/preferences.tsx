"use client"

import * as React from "react"
import { createColorScheme, createLocalStorage, createPreference } from "@ui-sdk/core"
import { Preferences } from "@ui-sdk/react/preferences"

function pauseTransitions() {
  const style = document.createElement("style")
  style.textContent = "*,*::before,*::after{transition:none!important}"
  document.head.append(style)
  requestAnimationFrame(() => requestAnimationFrame(() => style.remove()))
}

const colorScheme = createColorScheme({
  storage: createLocalStorage("color-scheme"),
  global: true,
  onValueChange: pauseTransitions,
})

const palettes = [
  { value: "claude", label: "Claude" },
  { value: "fizzy-lake", label: "Fizzy-lake" },
] as const

const palette = createPreference({
  values: palettes.map((item) => item.value),
  defaultValue: "claude",
  attribute: "data-palette",
  global: true,
  storage: createLocalStorage("palette"),
})

function ThemePreferences({ children }: { children?: React.ReactNode }) {
  return <Preferences preferences={[colorScheme, palette]}>{children}</Preferences>
}

export { colorScheme, palette, palettes, ThemePreferences }
export { usePreference } from "@ui-sdk/react/preferences"
