import { cleanup } from "@testing-library/react"
import { afterEach, vi } from "vitest"

declare global {
  var __UI_SDK_STRICT__: boolean | undefined
}
globalThis.__UI_SDK_STRICT__ = true

function stubWhatJsdomLacks() {
  HTMLElement.prototype.showPopover = function () {}
  HTMLElement.prototype.hidePopover = function () {}
  Element.prototype.getAnimations = () => []
  Element.prototype.scrollIntoView = function () {}
  Element.prototype.scrollTo = function () {}
  Element.prototype.checkVisibility = () => true
  const noRects = document.createElement("div").getClientRects()
  Element.prototype.getClientRects = () => noRects
  document.elementFromPoint = () => null
  document.elementsFromPoint = () => []
  vi.stubGlobal("matchMedia", (media: string) =>
    Object.assign(new EventTarget(), { media, matches: false, onchange: null }),
  )
  globalThis.ResizeObserver ??= class {
    observe() {}
    unobserve() {}
    disconnect() {}
  }
  document.head.append(
    Object.assign(document.createElement("style"), {
      textContent: "[popover] { display: block !important }",
    }),
  )
}

if (typeof document !== "undefined") {
  stubWhatJsdomLacks()
  afterEach(cleanup)
}
