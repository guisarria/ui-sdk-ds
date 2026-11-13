import { render } from "@testing-library/react"
import { expect, test } from "vitest"

import { ChartContainer } from "@ui-sdk-ds/ui/components/chart"

test("themed chart colors follow the color scheme in one rule", () => {
  const { container } = render(
    <ChartContainer
      id="sales"
      config={{
        revenue: { theme: { light: "red", dark: "blue" } },
        cost: { color: "green" },
      }}
    >
      <svg />
    </ChartContainer>,
  )

  expect(container.querySelector("style")?.textContent).toBe(
    "[data-chart=chart-sales] {\n  --color-revenue: light-dark(red, blue);\n  --color-cost: green;\n}",
  )
})
