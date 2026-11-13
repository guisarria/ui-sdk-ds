import { act, render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { expect, test } from "vitest"

import { Listbox, ListboxItem } from "@ui-sdk-ds/ui/components/listbox"
import {
  Meter,
  MeterIndicator,
  MeterLabel,
  MeterTrack,
  MeterValue,
} from "@ui-sdk-ds/ui/components/meter"
import { NumberInput } from "@ui-sdk-ds/ui/components/number-input"
import { Rating, RatingItem } from "@ui-sdk-ds/ui/components/rating"
import { SegmentedControl, SegmentedControlItem } from "@ui-sdk-ds/ui/components/segmented-control"
import { Toolbar, ToolbarButton, ToolbarSeparator } from "@ui-sdk-ds/ui/components/toolbar"
import {
  TriggerMenu,
  TriggerMenuContent,
  TriggerMenuInput,
  TriggerMenuItem,
  TriggerMenuList,
  createTriggerMenuController,
} from "@ui-sdk-ds/ui/components/trigger-menu"

test("a listbox selects an option", async () => {
  const user = userEvent.setup()
  render(
    <Listbox aria-label="Fruit">
      <ListboxItem value="apple">Apple</ListboxItem>
      <ListboxItem value="pear">Pear</ListboxItem>
    </Listbox>,
  )
  await user.click(screen.getByRole("option", { name: "Pear" }))
  expect(screen.getByRole("option", { name: "Pear" }).getAttribute("aria-selected")).toBe("true")
})

test("a meter reports its value", () => {
  render(
    <Meter value={40}>
      <MeterLabel>Storage</MeterLabel>
      <MeterValue />
      <MeterTrack>
        <MeterIndicator />
      </MeterTrack>
    </Meter>,
  )
  expect(screen.getByRole("meter", { name: "Storage" }).getAttribute("aria-valuenow")).toBe("40")
})

test("a number input steps with its buttons", async () => {
  const user = userEvent.setup()
  render(<NumberInput aria-label="Instances" defaultValue={2} />)
  await user.click(screen.getByRole("button", { name: "Increase" }))
  expect(screen.getByRole("textbox", { name: "Instances" })).toHaveProperty("value", "3")
})

test("a rating renders one styled star per value, wrapped or not", () => {
  const { container } = render(
    <>
      <Rating aria-label="Default" defaultValue={3} />
      <Rating aria-label="Wrapped" defaultValue={2}>
        <RatingItem />
      </Rating>
    </>,
  )
  for (const name of ["Default", "Wrapped"]) {
    expect(
      screen.getByRole("radiogroup", { name }).querySelectorAll("[data-slot=rating-item]"),
    ).toHaveLength(5)
  }
  expect(container.querySelector("[data-slot=rating-item] svg")).not.toBeNull()
})

test("a segmented control checks an item and draws its indicator", async () => {
  const user = userEvent.setup()
  const { container } = render(
    <SegmentedControl aria-label="View" defaultValue="list">
      <SegmentedControlItem value="list">List</SegmentedControlItem>
      <SegmentedControlItem value="grid">Grid</SegmentedControlItem>
    </SegmentedControl>,
  )
  await user.click(screen.getByRole("radio", { name: "Grid" }))
  expect(screen.getByRole("radio", { name: "Grid" }).getAttribute("aria-checked")).toBe("true")
  expect(container.querySelectorAll("[data-slot=segmented-control-indicator]")).toHaveLength(1)
})

test("toolbar arrows move focus between buttons", async () => {
  const user = userEvent.setup()
  render(
    <Toolbar aria-label="Formatting">
      <ToolbarButton>Undo</ToolbarButton>
      <ToolbarSeparator />
      <ToolbarButton>Redo</ToolbarButton>
    </Toolbar>,
  )
  await user.tab()
  await user.keyboard("{ArrowRight}")
  expect(document.activeElement).toBe(screen.getByRole("button", { name: "Redo" }))
})

test("a trigger menu shows our styled list once, not a second built-in one", async () => {
  const menu = createTriggerMenuController()
  render(
    <TriggerMenu triggers={[{ char: "@" }]} controller={menu}>
      <TriggerMenuInput aria-label="Message" />
      <TriggerMenuContent>
        <TriggerMenuList>
          <TriggerMenuItem value="hollis" label="Hollis Grant">
            Hollis Grant
          </TriggerMenuItem>
        </TriggerMenuList>
      </TriggerMenuContent>
    </TriggerMenu>,
  )
  screen.getByRole("textbox", { name: "Message" }).focus()
  await act(async () => {
    void menu.open({ trigger: "@" })
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 20)
    })
  })
  expect(document.querySelectorAll("[data-slot=trigger-menu-content]")).toHaveLength(1)
  expect(screen.getAllByRole("option", { name: "Hollis Grant" })).toHaveLength(1)
})
