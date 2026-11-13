import { act, render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { expect, test } from "vitest"

import { Checkbox, CheckboxGroup } from "@ui-sdk-ds/ui/components/checkbox"
import { Command, CommandInput, CommandItems, CommandList } from "@ui-sdk-ds/ui/components/command"
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItems,
  ComboboxList,
} from "@ui-sdk-ds/ui/components/combobox"
import { Dialog, DialogShortcut, DialogTrigger } from "@ui-sdk-ds/ui/components/dialog"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItems,
  DropdownMenuTrigger,
} from "@ui-sdk-ds/ui/components/dropdown-menu"
import { Field, FieldLabel } from "@ui-sdk-ds/ui/components/field"
import { InputGroup, InputGroupClear, InputGroupInput } from "@ui-sdk-ds/ui/components/input-group"
import {
  Popover,
  PopoverArrow,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@ui-sdk-ds/ui/components/popover"
import { ScrollArea, ScrollAreaScrollToEnd } from "@ui-sdk-ds/ui/components/scroll-area"
import {
  Select,
  SelectClear,
  SelectContent,
  SelectInput,
  SelectItems,
  SelectList,
  SelectTrigger,
  SelectValue,
  type SelectData,
} from "@ui-sdk-ds/ui/components/select"
import { Slider, SliderValue } from "@ui-sdk-ds/ui/components/slider"
import {
  Tabs,
  TabsContent,
  TabsIndicator,
  TabsList,
  TabsTrigger,
} from "@ui-sdk-ds/ui/components/tabs"
import { TriggerMenu, TriggerMenuInput } from "@ui-sdk-ds/ui/components/trigger-menu"

test("a popover shows its arrow and closes from a close part", async () => {
  const user = userEvent.setup()
  render(
    <Popover defaultOpen>
      <PopoverTrigger>Open</PopoverTrigger>
      <PopoverContent>
        <PopoverArrow />
        <PopoverClose>Done</PopoverClose>
      </PopoverContent>
    </Popover>,
  )
  expect(document.querySelector("[data-slot=popover-arrow]")).not.toBeNull()
  await user.click(screen.getByRole("button", { name: "Done" }))
  expect(screen.getByRole("button", { name: "Open" }).getAttribute("aria-expanded")).toBe("false")
})

test("a dialog shortcut shows its trigger's keys as a kbd", () => {
  render(
    <Dialog>
      <DialogTrigger shortcut="mod+j">
        Open <DialogShortcut />
      </DialogTrigger>
    </Dialog>,
  )
  const shortcut = document.querySelector("[data-slot=dialog-shortcut]")
  expect(shortcut?.textContent).toMatch(/J/)
  expect(shortcut?.className).toContain("rounded-lg")
})

test("select data renders our styled rows, and search filters them", async () => {
  const user = userEvent.setup()
  render(
    <Select defaultValue="pear" defaultOpen>
      <SelectTrigger aria-label="Fruit">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectInput aria-label="Search fruit" />
        <SelectList>
          <SelectItems
            items={[
              "apple",
              { type: "separator" },
              { type: "group", label: "Pears", items: [{ value: "pear", label: "Pear" }] },
            ]}
          />
        </SelectList>
      </SelectContent>
    </Select>,
  )
  const pear = screen.getByRole("option", { name: "Pear" })
  expect(pear.className).toContain("rounded-xl")
  expect(pear.querySelector("[data-slot=select-item-indicator]")).not.toBeNull()
  expect(screen.getByText("Pears").className).toContain("text-muted-foreground")
  await user.type(screen.getByRole("combobox", { name: "Search fruit" }), "app")
  expect(screen.queryByRole("option", { name: "Pear" })).toBeNull()
})

test("a select's clear button empties its value", async () => {
  const user = userEvent.setup()
  render(
    <Select defaultValue="pear" items={[{ value: "pear", label: "Pear" }]}>
      <SelectTrigger aria-label="Fruit">
        <SelectValue placeholder="Pick one" />
      </SelectTrigger>
      <SelectClear />
    </Select>,
  )
  await user.click(await screen.findByRole("button", { name: "Clear" }))
  expect(screen.getByRole("combobox", { name: "Fruit" }).textContent).toBe("Pick one")
})

test("combobox data renders our styled rows", () => {
  render(
    <Combobox defaultOpen>
      <ComboboxInput aria-label="Framework" />
      <ComboboxContent>
        <ComboboxList>
          <ComboboxItems items={[{ value: "next", label: "Next.js" }, "Remix"]} />
        </ComboboxList>
      </ComboboxContent>
    </Combobox>,
  )
  expect(screen.getByRole("option", { name: "Next.js" }).className).toContain("rounded-xl")
  expect(screen.getByRole("option", { name: "Remix" })).not.toBeNull()
})

test("command data shows shortcuts and opens pages", async () => {
  const user = userEvent.setup()
  const items = [
    { value: "inbox", label: "Open inbox", shortcut: "mod+i" },
    { value: "theme", label: "Change theme", items: ["Light", "Dark"] },
  ]
  render(
    <Command items={items}>
      <CommandInput placeholder="Search" />
      <CommandList>{(state) => <CommandItems items={state.items} />}</CommandList>
    </Command>,
  )
  expect(screen.getByRole("option", { name: /Open inbox/ }).textContent).toMatch(/I/)
  await user.click(screen.getByRole("option", { name: "Change theme" }))
  expect(screen.getByRole("option", { name: "Light" })).not.toBeNull()
  expect(screen.queryByRole("option", { name: /Open inbox/ })).toBeNull()
})

test("dropdown menu data renders items, checkboxes, radios and submenus", () => {
  render(
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger>Menu</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItems
          items={[
            { value: "copy", label: "Copy", shortcut: "mod+c" },
            { type: "separator" },
            { type: "checkbox", value: "wrap", label: "Wrap", defaultChecked: true },
            {
              type: "radio-group",
              name: "size",
              label: "Size",
              defaultValue: "m",
              items: [
                { value: "s", label: "Small" },
                { value: "m", label: "Medium" },
              ],
            },
            { type: "submenu", label: "Share", items: ["Email"] },
            { value: "delete", label: "Delete", destructive: true },
          ]}
        />
      </DropdownMenuContent>
    </DropdownMenu>,
  )
  expect(screen.getByRole("menuitem", { name: /Copy/ }).textContent).toMatch(/C/)
  expect(screen.getByRole("menuitemcheckbox", { name: "Wrap" }).getAttribute("aria-checked")).toBe(
    "true",
  )
  expect(screen.getByRole("menuitemradio", { name: "Medium" }).getAttribute("aria-checked")).toBe(
    "true",
  )
  expect(screen.getByRole("menuitem", { name: "Share" }).getAttribute("aria-haspopup")).toBe("menu")
  expect(screen.getByRole("menuitem", { name: "Delete" }).getAttribute("data-variant")).toBe(
    "destructive",
  )
})

test("an input group's clear button empties its input", async () => {
  const user = userEvent.setup()
  render(
    <InputGroup>
      <InputGroupInput aria-label="Search" defaultValue="query" />
      <InputGroupClear />
    </InputGroup>,
  )
  await user.click(await screen.findByRole("button", { name: "Clear" }))
  expect(screen.getByRole("textbox", { name: "Search" })).toHaveProperty("value", "")
})

test("tabs host an indicator", () => {
  render(
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
        <TabsIndicator />
      </TabsList>
      <TabsContent value="a">Panel</TabsContent>
    </Tabs>,
  )
  expect(document.querySelector("[data-slot=tabs-indicator]")).not.toBeNull()
})

test("a checkbox group tracks its checked values", async () => {
  const user = userEvent.setup()
  render(
    <CheckboxGroup aria-label="Toppings" defaultValue={["cheese"]}>
      <Checkbox value="cheese" aria-label="Cheese" />
      <Checkbox value="olives" aria-label="Olives" />
    </CheckboxGroup>,
  )
  await user.click(screen.getByRole("checkbox", { name: "Olives" }))
  expect(screen.getByRole("checkbox", { name: "Cheese" }).getAttribute("aria-checked")).toBe("true")
  expect(screen.getByRole("checkbox", { name: "Olives" }).getAttribute("aria-checked")).toBe("true")
})

test("a slider renders its value beside the track", () => {
  render(
    <Slider aria-label="Volume" defaultValue={30}>
      <SliderValue />
    </Slider>,
  )
  expect(document.querySelector("[data-slot=slider-value]")?.textContent).toBe("30")
})

test("a scroll area keeps scroll-to-end outside its content", async () => {
  render(
    <ScrollArea>
      <p>Content</p>
      <ScrollAreaScrollToEnd />
    </ScrollArea>,
  )
  await act(async () => {})
  const button = document.querySelector("[data-slot=scroll-area-scroll-to-end]")
  expect(button).not.toBeNull()
  expect(button?.closest("[data-slot=scroll-area-content]")).toBeNull()
})

test("a trigger menu input joins the field around it", () => {
  render(
    <Field name="comment">
      <FieldLabel>Comment</FieldLabel>
      <TriggerMenu triggers={[{ char: "@" }]}>
        <TriggerMenuInput />
      </TriggerMenu>
    </Field>,
  )
  const input = screen.getByRole("textbox", { name: "Comment" })
  expect(input.getAttribute("name")).toBe("comment")
  expect(document.querySelector("label")?.htmlFor).toBe(input.id)
})

test("a data select with search lists each item once and filters", async () => {
  const user = userEvent.setup()
  const regions: SelectData = [
    { type: "group", label: "Europe", items: [{ value: "fra", label: "Frankfurt" }] },
    { type: "group", label: "Asia", items: [{ value: "hnd", label: "Tokyo" }] },
  ]
  render(
    <Select items={regions} defaultOpen>
      <SelectTrigger aria-label="Region">
        <SelectValue />
      </SelectTrigger>
      <SelectContent>
        <SelectInput aria-label="Search regions" />
        <SelectList>{(state) => <SelectItems items={state.items} />}</SelectList>
      </SelectContent>
    </Select>,
  )
  expect(screen.getAllByRole("option", { name: "Tokyo" })).toHaveLength(1)
  await user.type(screen.getByRole("combobox", { name: "Search regions" }), "fra")
  expect(screen.queryByRole("option", { name: "Tokyo" })).toBeNull()
  expect(screen.getAllByRole("option", { name: "Frankfurt" })).toHaveLength(1)
  await user.keyboard("{ArrowDown}{Enter}")
  expect(screen.getByRole("combobox", { name: "Region" }).textContent).toBe("Frankfurt")
})
