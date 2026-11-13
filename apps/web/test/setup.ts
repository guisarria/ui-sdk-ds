import "@ui-sdk-ds/ui/test/setup"

globalThis.IntersectionObserver ??= class {
  readonly root = null
  readonly rootMargin = "0px"
  readonly scrollMargin = "0px"
  readonly thresholds = [0]
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return []
  }
}
HTMLCanvasElement.prototype.getContext = () => null
Element.prototype.scrollBy = function () {}
