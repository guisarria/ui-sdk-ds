import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import type { ReactNode } from "react"
import { expect, test } from "vitest"

import { Checkbox } from "@ui-sdk-ds/ui/components/checkbox"
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@ui-sdk-ds/ui/components/combobox"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@ui-sdk-ds/ui/components/field"
import { Input, InputGroup } from "@ui-sdk-ds/ui/components/input"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@ui-sdk-ds/ui/components/input-otp"
import { RadioGroup, RadioGroupItem } from "@ui-sdk-ds/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk-ds/ui/components/select"
import { Slider } from "@ui-sdk-ds/ui/components/slider"
import { Switch } from "@ui-sdk-ds/ui/components/switch"
import { Textarea } from "@ui-sdk-ds/ui/components/textarea"

const labelled: Array<[string, string, () => ReactNode]> = [
  ["Input", "textbox", () => <Input />],
  [
    "Input in an InputGroup",
    "textbox",
    () => (
      <InputGroup>
        <Input />
      </InputGroup>
    ),
  ],
  ["Textarea", "textbox", () => <Textarea />],
  [
    "Select",
    "combobox",
    () => (
      <Select defaultValue="a">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="a">A</SelectItem>
        </SelectContent>
      </Select>
    ),
  ],
  [
    "ComboboxInput",
    "combobox",
    () => (
      <Combobox items={["A"]}>
        <ComboboxInput />
        <ComboboxContent>
          <ComboboxList>
            {(item: string) => (
              <ComboboxItem key={item} value={item}>
                {item}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    ),
  ],
  ["Slider", "slider", () => <Slider defaultValue={[20]} />],
  [
    "RadioGroup",
    "radiogroup",
    () => (
      <RadioGroup defaultValue="a">
        <RadioGroupItem value="a" aria-label="A" />
      </RadioGroup>
    ),
  ],
  [
    "InputOTP",
    "textbox",
    () => (
      <InputOTP maxLength={2}>
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
        </InputOTPGroup>
      </InputOTP>
    ),
  ],
]

test.each(labelled)("a Field names %s from its label without ids", (_, role, control) => {
  render(
    <Field>
      <FieldLabel>Project setting</FieldLabel>
      {control()}
      <FieldDescription>Applies to every deploy.</FieldDescription>
    </Field>,
  )
  const element = screen.getByRole(role, { name: "Project setting" })
  expect(element.getAttribute("aria-describedby") ?? "").not.toBe("")
})

test("clicking a label focuses a text control and toggles a checkbox or switch", async () => {
  const user = userEvent.setup()
  render(
    <>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input />
      </Field>
      <Field orientation="horizontal">
        <Checkbox />
        <FieldLabel>Accept terms</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch />
        <FieldLabel>Email updates</FieldLabel>
      </Field>
    </>,
  )
  await user.click(screen.getByText("Name"))
  expect(document.activeElement).toBe(screen.getByRole("textbox", { name: "Name" }))
  await user.click(screen.getByText("Accept terms"))
  expect(screen.getByRole("checkbox", { name: "Accept terms" }).getAttribute("aria-checked")).toBe(
    "true",
  )
  await user.click(screen.getByText("Email updates"))
  expect(screen.getByRole("switch", { name: "Email updates" }).getAttribute("aria-checked")).toBe(
    "true",
  )
})

test("an invalid Field shows its error and describes the control with it", () => {
  render(
    <Field invalid>
      <FieldLabel>Domain</FieldLabel>
      <Input defaultValue="my site.com" />
      <FieldError>Domains can’t contain spaces.</FieldError>
    </Field>,
  )
  const input = screen.getByRole("textbox", { name: "Domain" })
  const error = screen.getByText("Domains can’t contain spaces.")
  expect(input.getAttribute("aria-invalid")).toBe("true")
  expect(error.dataset.slot).toBe("field-error")
  expect(input.getAttribute("aria-describedby")?.split(" ")).toContain(error.id)
})

test("a FieldError stays hidden until its field is invalid, and lists unique errors", () => {
  const { rerender } = render(
    <Field>
      <FieldLabel>Email</FieldLabel>
      <Input />
      <FieldError>Enter an email.</FieldError>
    </Field>,
  )
  expect(screen.queryByText("Enter an email.")).toBeNull()
  expect(screen.getByRole("textbox", { name: "Email" }).hasAttribute("aria-invalid")).toBe(false)

  rerender(
    <Field invalid>
      <FieldLabel>Email</FieldLabel>
      <Input />
      <FieldError
        errors={[{ message: "Required" }, { message: "Too short" }, { message: "Required" }]}
      />
    </Field>,
  )
  expect(screen.getAllByRole("listitem").map((item) => item.textContent)).toEqual([
    "Required",
    "Too short",
  ])
})

test("a disabled Field disables its control, and a disabled FieldSet disables every field", () => {
  render(
    <>
      <Field disabled>
        <FieldLabel>Team ID</FieldLabel>
        <Input defaultValue="team_4f8a2c91" />
      </Field>
      <FieldSet disabled>
        <FieldLegend>Billing</FieldLegend>
        <Field>
          <FieldLabel>Street</FieldLabel>
          <Input />
        </Field>
      </FieldSet>
    </>,
  )
  expect(screen.getByRole<HTMLInputElement>("textbox", { name: "Team ID" }).disabled).toBe(true)
  expect(screen.getByRole("group", { name: "Billing" })).toBeTruthy()
  expect(
    screen.getByRole<HTMLInputElement>("textbox", { name: "Street" }).matches(":disabled"),
  ).toBe(true)
})

test("a Field's label points at its control and its name reaches the native input", () => {
  const { container } = render(
    <>
      <Field name="project-name">
        <FieldLabel>Project name</FieldLabel>
        <Input />
      </Field>
      <Field name="terms" orientation="horizontal">
        <Checkbox />
        <FieldLabel>Accept terms</FieldLabel>
      </Field>
    </>,
  )
  const input = screen.getByRole("textbox", { name: "Project name" })
  const label = screen.getByText("Project name")
  expect(label.getAttribute("for")).toBe(input.id)
  expect(input.getAttribute("name")).toBe("project-name")
  expect(container.querySelector("[data-slot=checkbox-input]")?.getAttribute("name")).toBe("terms")
})
