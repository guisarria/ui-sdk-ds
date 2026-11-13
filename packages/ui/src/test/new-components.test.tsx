import { render, screen } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { expect, test } from "vitest"

import {
  Autocomplete,
  AutocompleteContent,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
} from "@ui-sdk-ds/ui/components/autocomplete"
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerInput,
  ColorPickerSlider,
  ColorPickerSwatch,
  ColorPickerSwatchItem,
  ColorPickerSwatches,
} from "@ui-sdk-ds/ui/components/color-picker"
import { DateInput } from "@ui-sdk-ds/ui/components/date-input"
import { DatePicker } from "@ui-sdk-ds/ui/components/date-picker"
import { Field, FieldLabel } from "@ui-sdk-ds/ui/components/field"
import {
  FileInput,
  FileInputDropzone,
  FileInputList,
  FileInputTrigger,
} from "@ui-sdk-ds/ui/components/file-input"
import {
  ImageCropper,
  ImageCropperImage,
  ImageCropperSelection,
  ImageCropperViewport,
} from "@ui-sdk-ds/ui/components/image-cropper"
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputToggle,
} from "@ui-sdk-ds/ui/components/password-input"
import { TimeInput } from "@ui-sdk-ds/ui/components/time-input"
import {
  Timeline,
  TimelineConnector,
  TimelineItem,
  TimelineMarker,
  TimelineTitle,
} from "@ui-sdk-ds/ui/components/timeline"
import { TokenInput, TokenInputEditor } from "@ui-sdk-ds/ui/components/token-input"
import {
  Tree,
  TreeGroup,
  TreeItem,
  TreeItemIndicator,
  TreeItemLabel,
} from "@ui-sdk-ds/ui/components/tree"
import {
  Waterfall,
  WaterfallBar,
  WaterfallRow,
  WaterfallRowHeader,
} from "@ui-sdk-ds/ui/components/waterfall"

test("the color picker renders its parts and swatches", () => {
  const { container } = render(
    <ColorPicker aria-label="Brand color" defaultValue="#0ea5e9">
      <ColorPickerArea />
      <ColorPickerSlider channel="hue" />
      <ColorPickerSwatch />
      <ColorPickerInput aria-label="Hex" />
      <ColorPickerSwatches>
        <ColorPickerSwatchItem value="#ef4444" />
      </ColorPickerSwatches>
    </ColorPicker>,
  )
  expect(container.querySelector("[data-slot=color-picker-area-thumb]")).not.toBeNull()
  expect(container.querySelector("[data-slot=color-picker-slider-thumb]")).not.toBeNull()
  expect(screen.getByRole("textbox", { name: "Hex" })).toHaveProperty("value", "#0ea5e9")
})

test("date and time inputs render styled segments inside a Field", () => {
  const { container } = render(
    <>
      <Field>
        <FieldLabel>Start date</FieldLabel>
        <DateInput defaultValue="2026-11-02" />
      </Field>
      <Field>
        <FieldLabel>Meeting time</FieldLabel>
        <TimeInput defaultValue="09:30" />
      </Field>
    </>,
  )
  const segments = container.querySelectorAll(
    "[data-slot=date-input-segment], [data-slot=time-input-segment]",
  )
  expect(segments.length).toBeGreaterThan(3)
  for (const segment of segments) expect(segment.className).toContain("rounded-md")
})

test("the password toggle shows the password", async () => {
  const user = userEvent.setup()
  render(
    <PasswordInput name="password">
      <PasswordInputControl aria-label="Password" />
      <PasswordInputToggle />
    </PasswordInput>,
  )
  const input = screen.getByLabelText("Password")
  expect(input.getAttribute("type")).toBe("password")
  await user.click(screen.getByRole("button", { name: "Show password" }))
  expect(input.getAttribute("type")).toBe("text")
})

test("an empty date picker renders the input and trigger", () => {
  render(<DatePicker aria-label="Due date" defaultValue="2026-10-16" />)
  expect(screen.getByRole("button", { name: "Choose date" })).not.toBeNull()
  expect(
    document.querySelector("[data-slot=date-picker-group] [data-slot=date-picker-input]"),
  ).not.toBeNull()
})

test("autocomplete, file input and token input render", () => {
  const { container } = render(
    <>
      <Autocomplete>
        <AutocompleteInput aria-label="Fruit" showTrigger />
        <AutocompleteContent>
          <AutocompleteList>
            <AutocompleteItem value="Apple">Apple</AutocompleteItem>
          </AutocompleteList>
        </AutocompleteContent>
      </Autocomplete>
      <FileInput name="attachments" multiple>
        <FileInputDropzone>
          <FileInputTrigger>Browse files</FileInputTrigger>
        </FileInputDropzone>
        <FileInputList aria-label="Files" />
      </FileInput>
      <TokenInput defaultValue={["Explain ", { type: "file", value: "a.ts", label: "a.ts" }]}>
        <TokenInputEditor aria-label="Prompt" />
      </TokenInput>
    </>,
  )
  expect(screen.getByRole("combobox", { name: "Fruit" })).not.toBeNull()
  expect(screen.getByRole("button", { name: "Browse files" })).not.toBeNull()
  expect(container.querySelector("[data-slot=token-input-editor]")?.textContent).toContain("a.ts")
})

test("tree, timeline, waterfall and image cropper render", async () => {
  const user = userEvent.setup()
  const { container } = render(
    <>
      <Tree aria-label="Files">
        <TreeItem value="src">
          <TreeItemLabel>
            <TreeItemIndicator />
            src
          </TreeItemLabel>
          <TreeGroup>
            <TreeItem value="src/index.ts">
              <TreeItemLabel>index.ts</TreeItemLabel>
            </TreeItem>
          </TreeGroup>
        </TreeItem>
      </Tree>
      <Timeline aria-label="Activity">
        <TimelineItem>
          <TimelineMarker />
          <TimelineConnector />
          <TimelineTitle>Deployed</TimelineTitle>
        </TimelineItem>
      </Timeline>
      <Waterfall
        aria-label="Requests"
        items={[{ value: "doc", label: "/", start: 0, duration: 100 }]}
      >
        <WaterfallRow value="doc">
          <WaterfallRowHeader>/</WaterfallRowHeader>
          <WaterfallBar />
        </WaterfallRow>
      </Waterfall>
      <ImageCropper aria-label="Photo" src="data:image/gif;base64,R0lGODlhAQABAAAAACw=">
        <ImageCropperViewport>
          <ImageCropperImage alt="" />
          <ImageCropperSelection />
        </ImageCropperViewport>
      </ImageCropper>
    </>,
  )
  const branch = screen.getByRole("treeitem", { name: "src" })
  await user.click(screen.getByText("src"))
  expect(branch.getAttribute("aria-expanded")).toBe("true")
  expect(screen.getByRole("list", { name: "Activity" })).not.toBeNull()
  expect(container.querySelector("[data-slot=waterfall-bar]")).not.toBeNull()
  expect(container.querySelectorAll("[data-slot=image-cropper-handle]")).toHaveLength(4)
})
