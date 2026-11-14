"use client"

import {
  Autocomplete,
  AutocompleteClear,
  AutocompleteContent,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompleteTrigger,
} from "@ui-sdk-ds/ui/components/autocomplete"
import { Input, InputGroup } from "@ui-sdk-ds/ui/components/input"
import { Checkbox, CheckboxGroup } from "@ui-sdk-ds/ui/components/checkbox"
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
import {
  Field,
  FieldDescription,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@ui-sdk-ds/ui/components/field"
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
  ImageCropperZoom,
} from "@ui-sdk-ds/ui/components/image-cropper"
import { Label } from "@ui-sdk-ds/ui/components/label"
import {
  Listbox,
  ListboxGroup,
  ListboxGroupLabel,
  ListboxItem,
} from "@ui-sdk-ds/ui/components/listbox"
import { NumberInput } from "@ui-sdk-ds/ui/components/number-input"
import { PasswordInput } from "@ui-sdk-ds/ui/components/password-input"
import { Rating } from "@ui-sdk-ds/ui/components/rating"
import { SegmentedControl, SegmentedControlItem } from "@ui-sdk-ds/ui/components/segmented-control"
import {
  Select,
  SelectContent,
  SelectEmpty,
  SelectInput,
  SelectItems,
  SelectList,
  SelectTrigger,
  SelectValue,
  type SelectData,
} from "@ui-sdk-ds/ui/components/select"
import { TimeInput } from "@ui-sdk-ds/ui/components/time-input"
import { TokenInput, TokenInputEditor } from "@ui-sdk-ds/ui/components/token-input"
import {
  TriggerMenu,
  TriggerMenuContent,
  TriggerMenuEmpty,
  TriggerMenuInput,
  TriggerMenuItem,
  TriggerMenuList,
} from "@ui-sdk-ds/ui/components/trigger-menu"
import { CloudUploadIcon } from "lucide-react"

import { regionGroups } from "./data"
import { Block, Example } from "./showcase"

const people = [
  { value: "hollis", label: "Hollis Grant" },
  { value: "ines", label: "Inès Moreau" },
  { value: "kofi", label: "Kofi Mensah" },
]

const regionData: SelectData = regionGroups.map((group) => ({
  type: "group",
  label: group.label,
  items: group.items,
}))

const frameworks = ["Astro", "Next.js", "Nuxt", "Remix", "SvelteKit"]

const landscape = `data:image/svg+xml;utf8,${encodeURIComponent(
  `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 400"><defs><linearGradient id="s" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#fde68a"/><stop offset="1" stop-color="#f97316"/></linearGradient></defs><rect width="640" height="400" fill="url(#s)"/><circle cx="460" cy="150" r="56" fill="#fff7ed"/><path d="M0 300 L160 180 L280 280 L400 200 L640 330 V400 H0Z" fill="#7c2d12"/><path d="M0 340 L220 250 L380 330 L520 280 L640 350 V400 H0Z" fill="#431407"/></svg>`,
)}`

export function MoreInputs() {
  return (
    <>
      <NumberAndPasswordBlock />
      <DateTimeBlock />
      <SearchableSelectBlock />
      <AutocompleteBlock />
      <MentionsBlock />
      <ChoiceBlock />
      <ColorPickerBlock />
      <FileBlock />
    </>
  )
}

function NumberAndPasswordBlock() {
  return (
    <Block
      id="number-input"
      title="Number and password input"
      description="Number inputs step with buttons, arrow keys and the wheel, and clamp to their range. Password inputs carry a toggle to show what was typed."
    >
      <Example title="Number · stepper with a range" className="block">
        <Field name="replicas">
          <FieldLabel>Replicas</FieldLabel>
          <NumberInput defaultValue={3} min={1} max={12} />
          <FieldDescription>Between 1 and 12.</FieldDescription>
        </Field>
      </Example>
      <Example title="Password · with a visibility toggle" className="block">
        <form>
          <Field name="username" className="sr-only">
            <FieldLabel>Username</FieldLabel>
            <Input autoComplete="new-password" />
            <FieldDescription>At least 12 characters.</FieldDescription>
            </Field>

        <Field name="new-password">
          <FieldLabel>New password</FieldLabel>
          <PasswordInput autoComplete="new-password" />
          <FieldDescription>At least 12 characters.</FieldDescription>
          </Field>
        </form>
      </Example>
    </Block>
  )
}

function DateTimeBlock() {
  return (
    <Block
      id="date-input"
      title="Date, time and date picker"
      description="Segmented fields type a date or a time a part at a time, in the reader's own order. The picker adds a calendar for when the day matters more than the digits."
    >
      <Example title="Date and time · segments" className="block">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field name="start-date">
            <FieldLabel>Start date</FieldLabel>
            <DateInput defaultValue="2026-11-16" />
          </Field>
          <Field name="start-time">
            <FieldLabel>Start time</FieldLabel>
            <TimeInput defaultValue="09:30" />
          </Field>
        </div>
      </Example>
      <Example title="Date picker · input and calendar" className="block">
        <Field name="due-date">
          <FieldLabel>Due date</FieldLabel>
          <DatePicker defaultValue="2026-11-20" />
          <FieldDescription>Type it, or pick it from the calendar.</FieldDescription>
        </Field>
      </Example>
    </Block>
  )
}

function SearchableSelectBlock() {
  return (
    <Block
      id="select-search"
      title="Select with search and checkbox group"
      description="A long select gets a search field and renders from data. A checkbox group submits every checked value under one name."
    >
      <Example title="Select · searchable, from data" className="block">
        <Field name="region-search">
          <FieldLabel>Region</FieldLabel>
          <Select items={regionData} placeholder="Choose a region">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              <SelectInput aria-label="Search regions" placeholder="Search…" />
              <SelectList>{(state) => <SelectItems items={state.items} />}</SelectList>
              <SelectEmpty>No region matches.</SelectEmpty>
            </SelectContent>
          </Select>
        </Field>
      </Example>
      <Example title="Checkbox group · one name, many values" className="block">
        <FieldSet>
          <FieldLegend variant="label">Notify me about</FieldLegend>
          <CheckboxGroup name="notify" aria-label="Notify me about" defaultValue={["deploys"]}>
            {[
              ["deploys", "Deploys"],
              ["incidents", "Incidents"],
              ["billing", "Billing"],
            ].map(([value, label]) => (
              <Label key={value} className="gap-3 font-normal">
                <Checkbox value={value} />
                {label}
              </Label>
            ))}
          </CheckboxGroup>
        </FieldSet>
      </Example>
    </Block>
  )
}

function AutocompleteBlock() {
  return (
    <Block
      id="autocomplete"
      title="Autocomplete"
      description="Suggests values while leaving the text free. Use it when any answer is allowed; use a combobox when the answer must come from the list."
    >
      <Example title="Typical · free text with suggestions" className="block">
        <Field name="framework">
          <FieldLabel>Framework</FieldLabel>
          <Autocomplete>
            <InputGroup>
              <AutocompleteInput placeholder="Type or choose" />
              <AutocompleteClear />
              <AutocompleteTrigger />
            </InputGroup>
            <AutocompleteContent>
              <AutocompleteList>
                {frameworks.map((framework) => (
                  <AutocompleteItem key={framework} value={framework}>
                    {framework}
                  </AutocompleteItem>
                ))}
              </AutocompleteList>
              <AutocompleteEmpty>Nothing matches. Keep typing to use your own.</AutocompleteEmpty>
            </AutocompleteContent>
          </Autocomplete>
        </Field>
      </Example>
    </Block>
  )
}

function MentionsBlock() {
  return (
    <Block
      id="trigger-menu"
      title="Mentions and tokens"
      description="A trigger menu opens suggestions when a character like @ is typed. A token input holds text with inline chips, like files attached to a prompt."
    >
      <Example title="Trigger menu · type @ to mention" className="block">
        <Field name="comment">
          <FieldLabel>Comment</FieldLabel>
          <TriggerMenu triggers={[{ char: "@" }]}>
            <TriggerMenuInput placeholder="Ask @hollis to review…" rows={3} />
            <TriggerMenuContent>
              <TriggerMenuList>
                {people.map((person) => (
                  <TriggerMenuItem key={person.value} value={person.value} label={person.label}>
                    {person.label}
                  </TriggerMenuItem>
                ))}
              </TriggerMenuList>
              <TriggerMenuEmpty>No one by that name.</TriggerMenuEmpty>
            </TriggerMenuContent>
          </TriggerMenu>
        </Field>
      </Example>
      <Example title="Token input · text with chips" className="block">
        <Field name="prompt">
          <FieldLabel>Prompt</FieldLabel>
          <TokenInput
            defaultValue={[
              "Explain what ",
              { type: "file", value: "src/cache.ts", label: "cache.ts" },
              " does and how it expires entries.",
            ]}
          >
            <TokenInputEditor />
          </TokenInput>
        </Field>
      </Example>
    </Block>
  )
}

function ChoiceBlock() {
  return (
    <Block
      id="segmented-control"
      title="Segmented control, listbox and rating"
      description="A segmented control switches between a few views in place. A listbox keeps every option on screen. A rating picks a score, with half steps when asked."
    >
      <Example title="Segmented control · view switcher" className="block">
        <div className="flex flex-col gap-2">
          <FieldTitle>Layout</FieldTitle>
          <SegmentedControl aria-label="Layout" name="layout" defaultValue="list">
            <SegmentedControlItem value="list">List</SegmentedControlItem>
            <SegmentedControlItem value="board">Board</SegmentedControlItem>
            <SegmentedControlItem value="calendar">Calendar</SegmentedControlItem>
          </SegmentedControl>
        </div>
      </Example>
      <Example title="Rating · read and set" className="block">
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <Rating aria-label="Your rating" name="rating" defaultValue={4} />
            <span className="text-sm text-muted-foreground">Your rating</span>
          </div>
          <div className="flex items-center gap-3">
            <Rating
              aria-label="Average, 3.5 of 5"
              name="average-rating"
              defaultValue={3.5}
              step={0.5}
              readOnly
            />
            <span className="text-sm text-muted-foreground">Average · 3.5 of 5</span>
          </div>
        </div>
      </Example>
      <Example title="Listbox · always visible, grouped" wide className="block">
        <Listbox aria-label="Plan" name="plan" defaultValue="pro" className="max-w-sm">
          <ListboxGroup>
            <ListboxGroupLabel>Monthly</ListboxGroupLabel>
            <ListboxItem value="hobby">Hobby · free</ListboxItem>
            <ListboxItem value="pro">Pro · $20</ListboxItem>
          </ListboxGroup>
          <ListboxGroup>
            <ListboxGroupLabel>Yearly</ListboxGroupLabel>
            <ListboxItem value="team">Team · $480</ListboxItem>
            <ListboxItem value="enterprise" disabled>
              Enterprise · talk to us
            </ListboxItem>
          </ListboxGroup>
        </Listbox>
      </Example>
    </Block>
  )
}

function ColorPickerBlock() {
  return (
    <Block
      id="color-picker"
      title="Color picker and image cropper"
      description="The color picker pairs a 2D area and a hue slider with a hex field and swatches. The image cropper drags, resizes and zooms a selection over a photo."
    >
      <Example title="Color picker · area, hue, hex and swatches" className="block">
        <ColorPicker aria-label="Accent color" name="accent" defaultValue="#f97316">
          <div className="flex max-w-xs flex-col gap-3">
            <ColorPickerArea />
            <ColorPickerSlider channel="hue" />
            <div className="flex items-center gap-2">
              <ColorPickerSwatch />
              <ColorPickerInput aria-label="Hex" name="accent-hex" />
            </div>
            <ColorPickerSwatches>
              {["#ef4444", "#f97316", "#eab308", "#22c55e", "#0ea5e9", "#8b5cf6"].map((color) => (
                <ColorPickerSwatchItem key={color} value={color} />
              ))}
            </ColorPickerSwatches>
          </div>
        </ColorPicker>
      </Example>
      <Example title="Image cropper · square avatar" className="block">
        <ImageCropper aria-label="Crop photo" src={landscape} aspectRatio={1}>
          <div className="flex flex-col gap-3">
            <ImageCropperViewport className="aspect-16/10 w-full">
              <ImageCropperImage alt="An orange sunset over hills" />
              <ImageCropperSelection />
            </ImageCropperViewport>
            <ImageCropperZoom aria-label="Zoom" name="avatar-zoom" />
          </div>
        </ImageCropper>
      </Example>
    </Block>
  )
}

function FileBlock() {
  return (
    <Block
      id="file-input"
      title="File input"
      description="Drop files or browse for them. The list shows each file's name and size, and removes it before upload."
    >
      <Example title="Typical · dropzone with a list" wide className="block">
        <FileInput name="attachments" multiple accept="image/*,.pdf">
          <FileInputDropzone>
            <CloudUploadIcon aria-hidden="true" className="size-6 text-muted-foreground" />
            <span className="text-sm">Drop images or PDFs here</span>
            <FileInputTrigger>Browse files</FileInputTrigger>
          </FileInputDropzone>
          <FileInputList aria-label="Attachments" />
        </FileInput>
      </Example>
    </Block>
  )
}
