"use client"

import * as React from "react"
import {
  ArrowUpIcon,
  CalendarIcon,
  CopyIcon,
  GlobeIcon,
  PaperclipIcon,
  SearchIcon,
} from "lucide-react"

import { Badge } from "@ui-sdk-ds/ui/components/badge"
import { Button } from "@ui-sdk-ds/ui/components/button"
import { Calendar } from "@ui-sdk-ds/ui/components/calendar"
import { Checkbox } from "@ui-sdk-ds/ui/components/checkbox"
import {
  Combobox,
  ComboboxChip,
  ComboboxChips,
  ComboboxClear,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxStatus,
  ComboboxTrigger,
  ComboboxValue,
  useComboboxAnchor,
} from "@ui-sdk-ds/ui/components/combobox"
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldTitle,
} from "@ui-sdk-ds/ui/components/field"
import {
  Input,
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
} from "@ui-sdk-ds/ui/components/input"
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@ui-sdk-ds/ui/components/input-otp"
import { Kbd } from "@ui-sdk-ds/ui/components/kbd"
import { Label } from "@ui-sdk-ds/ui/components/label"
import { Popover, PopoverContent, PopoverTrigger } from "@ui-sdk-ds/ui/components/popover"
import { RadioGroup, RadioGroupItem } from "@ui-sdk-ds/ui/components/radio-group"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk-ds/ui/components/select"
import { Slider } from "@ui-sdk-ds/ui/components/slider"
import { Spinner } from "@ui-sdk-ds/ui/components/spinner"
import { Switch } from "@ui-sdk-ds/ui/components/switch"
import { Textarea } from "@ui-sdk-ds/ui/components/textarea"
import { toast } from "@ui-sdk-ds/ui/components/toast"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui-sdk-ds/ui/components/tooltip"
import { type AsyncOptionsContext, useAsyncOptions } from "@ui-sdk-ds/ui/hooks/use-async-options"

import { labels, members, regionGroups, regionItems, roleItems, timezones } from "./data"
import { MoreInputs } from "./inputs-more"
import { Block, Example, Section } from "./showcase"
import { previewState, StateMatrix } from "./state-matrix"

type DateRange = { from: Date | undefined; to?: Date | undefined }

export function Inputs() {
  return (
    <Section
      id="inputs"
      eyebrow="04 · Components · Inputs"
      title="Inputs"
      description="Every control sits in a Field with a visible label. Fields are filled, not outlined, and share one 32px height so they line up in any row."
    >
      <FieldBlock />
      <FieldStatesBlock />
      <InputGroupBlock />
      <SelectBlock />
      <ComboboxBlock />
      <SelectionBlock />
      <SwitchBlock />
      <SliderBlock />
      <OtpBlock />
      <CalendarBlock />
      <MoreInputs />
      <LabelBlock />
    </Section>
  )
}

function FieldBlock() {
  return (
    <Block
      id="field"
      title="Field"
      description="Wraps a control with its label, description and error. Group fields with FieldGroup and related choices with FieldSet."
    >
      <Example title="Typical · label, control, description" className="block">
        <Field name="project-name">
          <FieldLabel>Project name</FieldLabel>
          <Input defaultValue="dashboard" />
          <FieldDescription>Used in preview URLs and the dashboard.</FieldDescription>
        </Field>
      </Example>
      <Example title="Error" className="block">
        <Field name="custom-domain" invalid>
          <FieldLabel>Custom domain</FieldLabel>
          <Input defaultValue="my site.com" />
          <FieldError>Domains can’t contain spaces.</FieldError>
        </Field>
      </Example>
      <Example title="Disabled" className="block">
        <Field name="team-id" disabled>
          <FieldLabel>Team ID</FieldLabel>
          <Input defaultValue="team_4f8a2c91" disabled />
          <FieldDescription>Generated when the team was created.</FieldDescription>
        </Field>
      </Example>
      <Example title="Required" className="block">
        <Field name="billing-email">
          <FieldLabel>
            Billing email
            <Badge variant="secondary">Required</Badge>
          </FieldLabel>
          <Input type="email" placeholder="billing@example.com" required />
          <FieldDescription>Invoices and receipts go here.</FieldDescription>
        </Field>
      </Example>
      <Example title="FieldSet · related checkboxes" className="block">
        <FieldSet>
          <FieldLegend variant="label">Email me when</FieldLegend>
          <FieldDescription>Sent to ana@example.com.</FieldDescription>
          <FieldGroup className="gap-3">
            <Field name="notify-failed" orientation="horizontal">
              <Checkbox defaultChecked />
              <FieldLabel className="font-normal">A production deployment fails</FieldLabel>
            </Field>
            <Field name="notify-usage" orientation="horizontal">
              <Checkbox defaultChecked />
              <FieldLabel className="font-normal">Usage passes 80% of the budget</FieldLabel>
            </Field>
            <Field name="notify-product" orientation="horizontal">
              <Checkbox />
              <FieldLabel className="font-normal">There’s a product update</FieldLabel>
            </Field>
          </FieldGroup>
        </FieldSet>
      </Example>
      <Example title="Horizontal · settings rows" className="block">
        <FieldGroup>
          <Field name="preview-deploys" orientation="horizontal">
            <FieldContent>
              <FieldLabel>Preview deployments</FieldLabel>
              <FieldDescription>Build every pull request at its own URL.</FieldDescription>
            </FieldContent>
            <Switch defaultChecked />
          </Field>
          <FieldSeparator />
          <Field name="skew-protection" orientation="horizontal">
            <FieldContent>
              <FieldLabel>Skew protection</FieldLabel>
              <FieldDescription>Keep old clients on the version they loaded.</FieldDescription>
            </FieldContent>
            <Switch />
          </Field>
        </FieldGroup>
      </Example>
    </Block>
  )
}

const fieldRows = ["input", "textarea", "select"] as const

function FieldStatesBlock() {
  return (
    <Block
      id="input"
      title="Input, Textarea and field states"
      description="Text controls share one fill, one focus ring and one error treatment. Hover doesn’t change a field; focus and errors do."
    >
      <Example title="Typical · input and textarea" className="block">
        <FieldGroup>
          <Field name="repo-url">
            <FieldLabel>Repository</FieldLabel>
            <Input type="url" placeholder="https://github.com/acme/dashboard" />
          </Field>
          <Field name="release-notes">
            <FieldLabel>Release notes</FieldLabel>
            <Textarea placeholder="What changed in this release?" />
            <FieldDescription>Markdown is supported.</FieldDescription>
          </Field>
        </FieldGroup>
      </Example>
      <Example title="Types · password, number, file, search" className="block">
        <FieldGroup className="gap-4">
          <Field name="db-password">
            <FieldLabel>Database password</FieldLabel>
            <Input type="password" defaultValue="correct-horse-battery" />
          </Field>
          <div className="grid gap-4 sm:grid-cols-2">
            <Field name="max-retries">
              <FieldLabel>Max retries</FieldLabel>
              <Input type="number" defaultValue="3" min={0} />
            </Field>
            <Field name="env-file">
              <FieldLabel>Import .env</FieldLabel>
              <Input type="file" accept=".env,text/plain" />
            </Field>
          </div>
        </FieldGroup>
      </Example>
      <Example title="States" wide className="block p-2 sm:p-4">
        <StateMatrix
          rows={fieldRows}
          states={["default", "hover", "focus", "disabled", "invalid"]}
          render={(row, state) => {
            const invalid = state === "invalid" || undefined
            const props = previewState(state)
            if (row === "textarea") {
              return (
                <Textarea
                  name="release-notes"
                  aria-label="Release notes"
                  placeholder="What changed?"
                  aria-invalid={invalid}
                  className="min-w-40"
                  {...props}
                />
              )
            }
            if (row === "select") {
              return (
                <Select name="role" items={roleItems} placeholder="Choose a role">
                  <SelectTrigger
                    aria-label="Role"
                    aria-invalid={invalid}
                    className="min-w-40"
                    {...props}
                  >
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {roleItems.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                          {item.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              )
            }
            return (
              <Input
                name="email"
                aria-label="Email"
                placeholder="name@example.com"
                aria-invalid={invalid}
                className="min-w-40"
                {...props}
              />
            )
          }}
        />
      </Example>
    </Block>
  )
}

function InputGroupBlock() {
  return (
    <Block
      id="input-group"
      title="Input group"
      description="An input with attached icons, text, buttons or keyboard hints. Pressing its text focuses the input, and InputClear empties it."
    >
      <Example title="Typical · search with a shortcut" className="block">
        <InputGroup>
          <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <Input
            name="search-projects"
            aria-label="Search projects"
            placeholder="Search projects…"
          />
          <InputGroupAddon align="inline-end">
            <Kbd>⌘K</Kbd>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example title="Text on both sides" className="block">
        <InputGroup>
          <InputGroupAddon>
            <InputGroupText>https://</InputGroupText>
          </InputGroupAddon>
          <Input name="subdomain" aria-label="Subdomain" defaultValue="status" />
          <InputGroupAddon align="inline-end">
            <InputGroupText>.example.com</InputGroupText>
          </InputGroupAddon>
        </InputGroup>
      </Example>
      <Example title="With a button and a pending state" className="block">
        <div className="flex flex-col gap-4">
          <InputGroup>
            <Input
              name="deploy-hook-url"
              aria-label="Deploy hook URL"
              readOnly
              defaultValue="https://api.example.com/v1/hooks/dpl_7Hn5"
            />
            <InputGroupAddon align="inline-end">
              <Tooltip>
                <TooltipTrigger
                  render={
                    <InputGroupButton
                      size="icon-xs"
                      aria-label="Copy deploy hook URL"
                      onClick={() => toast({ title: "Deploy hook copied" })}
                    />
                  }
                >
                  <CopyIcon />
                </TooltipTrigger>
                <TooltipContent>Copy</TooltipContent>
              </Tooltip>
            </InputGroupAddon>
          </InputGroup>
          <InputGroup>
            <InputGroupAddon>
              <GlobeIcon />
            </InputGroupAddon>
            <Input name="domain" aria-label="Domain" defaultValue="status.example.com" />
            <InputGroupAddon align="inline-end">
              <Spinner aria-hidden="true" />
              Checking DNS
            </InputGroupAddon>
          </InputGroup>
        </div>
      </Example>
      <Example title="Textarea with a toolbar · invalid" className="block">
        <div className="flex flex-col gap-4">
          <InputGroup>
            <Textarea
              name="message"
              aria-label="Message"
              placeholder="Ask about this deployment…"
            />
            <InputGroupAddon align="block-end">
              <InputGroupButton size="icon-xs" aria-label="Attach a file">
                <PaperclipIcon />
              </InputGroupButton>
              <InputGroupButton
                size="icon-xs"
                variant="brand"
                className="ms-auto"
                aria-label="Send"
              >
                <ArrowUpIcon />
              </InputGroupButton>
            </InputGroupAddon>
          </InputGroup>
          <Field name="webhook-url" invalid>
            <FieldLabel>Webhook URL</FieldLabel>
            <InputGroup>
              <InputGroupAddon>
                <InputGroupText>https://</InputGroupText>
              </InputGroupAddon>
              <Input defaultValue="hooks.example.com/ deploy" />
            </InputGroup>
            <FieldError>URLs can’t contain spaces.</FieldError>
          </Field>
        </div>
      </Example>
    </Block>
  )
}

function SelectBlock() {
  return (
    <Block
      id="select"
      title="Select"
      description="Picks one option from a list that doesn’t need searching. Past about ten options, use a Combobox."
    >
      <Example title="Typical · a sheet on small touch screens" className="block">
        <Field name="invite-role">
          <FieldLabel>Invite as</FieldLabel>
          <Select
            items={roleItems}
            placeholder="Choose a role"
            presentation="auto"
            onValueChange={(role, details) => {
              if (details.source === "agent" && role === "owner") details.cancel()
            }}
          >
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {roleItems.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
          <FieldDescription>
            Viewers can’t trigger deployments. Only a person can invite an owner.
          </FieldDescription>
        </Field>
      </Example>
      <Example title="Groups and separators · below the trigger" className="block">
        <Field name="function-region">
          <FieldLabel>Function region</FieldLabel>
          <Select items={regionItems} defaultValue="fra1" placeholder="Choose a region">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent alignItemWithTrigger={false}>
              {regionGroups.map((group, index) => (
                <React.Fragment key={group.label}>
                  {index > 0 && <SelectSeparator />}
                  <SelectGroup>
                    <SelectLabel>{group.label}</SelectLabel>
                    {group.items.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </React.Fragment>
              ))}
            </SelectContent>
          </Select>
        </Field>
      </Example>
      <Example title="Sizes · sm, default · multiple">
        <Select name="role" items={roleItems} defaultValue="member">
          <SelectTrigger size="sm" aria-label="Role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {roleItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select name="role" items={roleItems} defaultValue="member">
          <SelectTrigger aria-label="Role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {roleItems.map((item) => (
                <SelectItem key={item.value} value={item.value}>
                  {item.label}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
        <Select name="regions" items={regionItems} multiple defaultValue={["iad1", "fra1"]}>
          <SelectTrigger aria-label="Regions" className="w-48">
            <SelectValue>
              {(value: Array<string>) =>
                value.length === 0 ? "Choose regions" : `${value.length} regions`
              }
            </SelectValue>
          </SelectTrigger>
          <SelectContent alignItemWithTrigger={false}>
            <SelectGroup>
              {regionGroups
                .flatMap((group) => group.items)
                .map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </Example>
      <Example title="Invalid and disabled" className="block">
        <FieldGroup>
          <Field name="owner-role" invalid>
            <FieldLabel>Role</FieldLabel>
            <Select items={roleItems} placeholder="Choose a role">
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {roleItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldError>Choose a role before sending the invite.</FieldError>
          </Field>
          <Field name="owner-role-locked" disabled>
            <FieldLabel>Your role</FieldLabel>
            <Select items={roleItems} defaultValue="owner" disabled>
              <SelectTrigger className="w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {roleItems.map((item) => (
                    <SelectItem key={item.value} value={item.value}>
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
            <FieldDescription>Transfer ownership to change it.</FieldDescription>
          </Field>
        </FieldGroup>
      </Example>
    </Block>
  )
}

type Reviewer = { value: string; label: string }

function searchReviewers(query: string, { signal }: AsyncOptionsContext) {
  return new Promise<Array<Reviewer>>((resolve, reject) => {
    const timer = setTimeout(() => {
      const needle = query.trim().toLowerCase()
      resolve(
        members
          .filter((member) => member.name.toLowerCase().includes(needle))
          .map((member) => ({ value: member.email, label: member.name })),
      )
    }, 300)
    signal.addEventListener(
      "abort",
      () => {
        clearTimeout(timer)
        reject(signal.reason)
      },
      { once: true },
    )
  })
}

function ReviewerSearch() {
  const reviewers = useAsyncOptions(searchReviewers, { immediate: true })

  return (
    <Field name="reviewer">
      <FieldLabel>Reviewer</FieldLabel>
      <Combobox
        items={reviewers.items}
        filter={false}
        status={reviewers.status}
        onQueryChange={reviewers.setQuery}
      >
        <InputGroup>
          <ComboboxInput placeholder="Search the team" />
          <ComboboxTrigger />
        </InputGroup>
        <ComboboxContent>
          <ComboboxStatus>
            {(state) =>
              state.status === "error"
                ? "Couldn’t load the team."
                : state.loading
                  ? "Searching…"
                  : `${state.count} ${state.count === 1 ? "person" : "people"}`
            }
          </ComboboxStatus>
          <ComboboxEmpty>
            {(state) => (state.empty && !state.loading ? `No one matches “${state.query}”.` : null)}
          </ComboboxEmpty>
          <ComboboxList>
            {(item: Reviewer) => (
              <ComboboxItem key={item.value} value={item.value} label={item.label}>
                {item.label}
              </ComboboxItem>
            )}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
      <FieldDescription>Search runs on the server, so the list doesn’t filter itself.</FieldDescription>
    </Field>
  )
}

function ComboboxBlock() {
  const anchor = useComboboxAnchor()

  return (
    <Block
      id="combobox"
      title="Combobox"
      description="A searchable select. Use it when the list is long or people know what they’re looking for."
    >
      <Example title="Typical · single, with clear" className="block">
        <Field name="timezone">
          <FieldLabel>Timezone</FieldLabel>
          <Combobox items={timezones} defaultValue="Europe/Lisbon">
            <InputGroup>
              <ComboboxInput placeholder="Search timezones" />
              <ComboboxClear />
              <ComboboxTrigger />
            </InputGroup>
            <ComboboxContent>
              <ComboboxEmpty>No timezones match.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
          <FieldDescription>Try “Mars” to see the empty state.</FieldDescription>
        </Field>
      </Example>
      <Example title="Multiple · chips" className="block">
        <Field name="issue-labels">
          <FieldLabel>Labels</FieldLabel>
          <Combobox items={labels} multiple autoHighlight defaultValue={["bug", "performance"]}>
            <ComboboxChips ref={anchor}>
              <ComboboxValue>
                {(values: Array<string>) => (
                  <>
                    {values.map((value) => (
                      <ComboboxChip key={value} value={value}>
                        {value}
                      </ComboboxChip>
                    ))}
                    <ComboboxInput placeholder={values.length ? "" : "Add labels"} />
                  </>
                )}
              </ComboboxValue>
            </ComboboxChips>
            <ComboboxContent anchor={anchor}>
              <ComboboxEmpty>No labels match.</ComboboxEmpty>
              <ComboboxList>
                {(item: string) => (
                  <ComboboxItem key={item} value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </Field>
      </Example>
      <Example title="Async · results load as you type" className="block">
        <ReviewerSearch />
      </Example>
      <Example title="Invalid and disabled" className="block">
        <FieldGroup>
          <Field name="owner-timezone" invalid>
            <FieldLabel>Team timezone</FieldLabel>
            <Combobox items={timezones}>
              <InputGroup>
                <ComboboxInput placeholder="Search timezones" />
                <ComboboxTrigger />
              </InputGroup>
              <ComboboxContent>
                <ComboboxEmpty>No timezones match.</ComboboxEmpty>
                <ComboboxList>
                  {(item: string) => (
                    <ComboboxItem key={item} value={item}>
                      {item}
                    </ComboboxItem>
                  )}
                </ComboboxList>
              </ComboboxContent>
            </Combobox>
            <FieldError>Pick the timezone your on-call schedule uses.</FieldError>
          </Field>
          <Field name="locked-timezone" disabled>
            <FieldLabel>Billing timezone</FieldLabel>
            <Combobox items={timezones} defaultValue="America/New_York" disabled>
              <InputGroup>
                <ComboboxInput />
                <ComboboxTrigger />
              </InputGroup>
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
          </Field>
        </FieldGroup>
      </Example>
    </Block>
  )
}

const selectionRows = ["checkbox", "radio", "switch"] as const

function SelectionBlock() {
  return (
    <Block
      id="checkbox"
      title="Checkbox and radio group"
      description="Checkboxes turn independent options on and off. Radios pick exactly one from a short list that should stay visible."
    >
      <Example title="Typical · checkbox with a description" className="block">
        <Field name="terms" orientation="horizontal">
          <Checkbox />
          <FieldContent>
            <FieldLabel>Accept the data processing terms</FieldLabel>
            <FieldDescription>Required before you deploy to an EU region.</FieldDescription>
          </FieldContent>
        </Field>
      </Example>
      <Example title="Typical · radio group" className="block">
        <FieldSet>
          <FieldLegend variant="label">Rollout strategy</FieldLegend>
          <RadioGroup name="rollout-strategy" aria-label="Rollout strategy" defaultValue="rolling">
            <Field name="strategy-rolling" orientation="horizontal">
              <RadioGroupItem value="rolling" />
              <FieldLabel className="font-normal">Rolling, 25% at a time</FieldLabel>
            </Field>
            <Field name="strategy-blue-green" orientation="horizontal">
              <RadioGroupItem value="blue-green" />
              <FieldLabel className="font-normal">Blue-green, switch all at once</FieldLabel>
            </Field>
            <Field name="strategy-canary" orientation="horizontal" data-disabled>
              <RadioGroupItem value="canary" disabled />
              <FieldLabel className="font-normal">Canary (Enterprise plan)</FieldLabel>
            </Field>
          </RadioGroup>
        </FieldSet>
      </Example>
      <Example title="Choice cards" wide className="block">
        <FieldSet>
          <FieldLegend variant="label">Plan</FieldLegend>
          <RadioGroup
            name="plan"
            aria-label="Plan"
            defaultValue="pro"
            className="grid gap-3 md:grid-cols-3"
          >
            {[
              {
                value: "hobby",
                title: "Hobby",
                description: "Personal projects. 100 GB bandwidth.",
              },
              {
                value: "pro",
                title: "Pro · $20 per seat",
                description: "Teams. 1 TB bandwidth and usage alerts.",
              },
              {
                value: "enterprise",
                title: "Enterprise",
                description: "SSO, audit logs and a 99.99% SLA.",
              },
            ].map((plan) => (
              <FieldLabel key={plan.value} htmlFor={`plan-${plan.value}`}>
                <Field orientation="horizontal">
                  <FieldContent>
                    <FieldTitle>{plan.title}</FieldTitle>
                    <FieldDescription>{plan.description}</FieldDescription>
                  </FieldContent>
                  <RadioGroupItem value={plan.value} id={`plan-${plan.value}`} />
                </Field>
              </FieldLabel>
            ))}
          </RadioGroup>
        </FieldSet>
      </Example>
      <Example title="States · checkbox, radio and switch" wide className="block p-2 sm:p-4">
        <StateMatrix
          rows={selectionRows}
          states={["off", "on", "focus", "disabled", "invalid"]}
          render={(row, state) => {
            const shared = {
              "aria-invalid": state === "invalid" || undefined,
              ...previewState(state),
            }
            const checked = state === "on"
            if (row === "radio") {
              return (
                <RadioGroup
                  name="rollout-strategy"
                  aria-label="Rollout strategy"
                  defaultValue={checked ? "rolling" : undefined}
                >
                  <RadioGroupItem value="rolling" aria-label="Rolling" {...shared} />
                </RadioGroup>
              )
            }
            if (row === "switch") {
              return (
                <Switch
                  name="preview-deployments"
                  aria-label="Preview deployments"
                  defaultChecked={checked}
                  {...shared}
                />
              )
            }
            return (
              <Checkbox
                name="email-me-when-a-deployment-fails"
                aria-label="Email me when a deployment fails"
                defaultChecked={checked}
                {...shared}
              />
            )
          }}
        />
      </Example>
    </Block>
  )
}

function SwitchBlock() {
  return (
    <Block
      id="switch"
      title="Switch"
      description="Turns a setting on or off right away, with no save step. If the change waits for a Save button, use a checkbox."
    >
      <Example title="Typical · settings" className="block">
        <FieldGroup>
          <Field name="build-cache" orientation="horizontal">
            <FieldContent>
              <FieldLabel>Build cache</FieldLabel>
              <FieldDescription>Reuse dependencies between builds.</FieldDescription>
            </FieldContent>
            <Switch defaultChecked />
          </Field>
          <Field name="sso-only" orientation="horizontal" data-disabled>
            <FieldContent>
              <FieldLabel>Require SSO</FieldLabel>
              <FieldDescription>Available on the Enterprise plan.</FieldDescription>
            </FieldContent>
            <Switch disabled />
          </Field>
        </FieldGroup>
      </Example>
      <Example title="Sizes · sm, default">
        <Switch name="compact-rows" size="sm" aria-label="Compact rows" defaultChecked />
        <Switch name="compact-rows" aria-label="Compact rows" defaultChecked />
      </Example>
    </Block>
  )
}

function SliderBlock() {
  const [instances, setInstances] = React.useState(6)

  return (
    <Block
      id="slider"
      title="Slider"
      description="Sets a value or a range where the exact number matters less than its position. Always show the number next to it."
    >
      <Example title="Typical · with its value" className="block">
        <Field>
          <div className="flex items-center justify-between gap-4">
            <FieldTitle>Max instances</FieldTitle>
            <span className="font-mono text-sm text-muted-foreground tabular-nums">
              {instances}
            </span>
          </div>
          <Slider
            name="max-instances"
            min={1}
            max={20}
            value={instances}
            onValueChange={(value) => setInstances(value as number)}
            aria-label="Max instances"
          />
          <FieldDescription>Scale out to this many under load.</FieldDescription>
        </Field>
      </Example>
      <Example title="Range and disabled" className="block">
        <FieldGroup>
          <Field>
            <FieldTitle>Memory, GB</FieldTitle>
            <Slider
              name="memory-range"
              defaultValue={[2, 8]}
              min={1}
              max={16}
              aria-label="Memory range"
            />
          </Field>
          <Field disabled>
            <FieldTitle>Timeout, seconds</FieldTitle>
            <Slider name="timeout" defaultValue={30} max={60} disabled aria-label="Timeout" />
          </Field>
        </FieldGroup>
      </Example>
    </Block>
  )
}

function OtpBlock() {
  const [expiredCode, setExpiredCode] = React.useState("418207")

  return (
    <Block
      id="input-otp"
      title="Input OTP"
      description="Enters a one-time code. Pastes fill every slot at once."
    >
      <Example title="Typical · six digits" className="block">
        <Field name="otp-verify">
          <FieldLabel>Verification code</FieldLabel>
          <InputOTP maxLength={6} pattern="digits">
            <InputOTPGroup>
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator />
            <InputOTPGroup>
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>We sent it to ana@example.com.</FieldDescription>
        </Field>
      </Example>
      <Example title="Invalid and disabled" className="block">
        <FieldGroup>
          <Field name="otp-expired" invalid>
            <FieldLabel>Verification code</FieldLabel>
            <InputOTP
              maxLength={6}
              value={expiredCode}
              onValueChange={setExpiredCode}
              pattern="digits"
            >
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <FieldError>That code expired. Request a new one.</FieldError>
          </Field>
          <Field name="otp-locked" disabled>
            <FieldLabel>Recovery code</FieldLabel>
            <InputOTP maxLength={6} value="550913" disabled>
              <InputOTPGroup>
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot key={index} index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </Field>
        </FieldGroup>
      </Example>
    </Block>
  )
}

function CalendarBlock() {
  const [date, setDate] = React.useState<Date | undefined>(new Date(2026, 9, 14))
  const [range, setRange] = React.useState<DateRange | undefined>({
    from: new Date(2026, 9, 12),
    to: new Date(2026, 9, 18),
  })
  const [launch, setLaunch] = React.useState<Date | undefined>()

  return (
    <Block
      id="calendar"
      title="Calendar"
      description="Picks a date or a range. In forms, open it from a button in a Popover."
    >
      <Example title="Typical · single date" className="justify-center">
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          defaultMonth={new Date(2026, 9)}
          className="rounded-2xl border"
        />
      </Example>
      <Example title="In a popover · date picker" className="block">
        <Field>
          <FieldTitle id="launch-date-label">Scheduled launch</FieldTitle>
          <Popover>
            <PopoverTrigger
              aria-labelledby="launch-date-label launch-date-value"
              render={<Button variant="outline" className="w-full justify-start font-normal" />}
            >
              <CalendarIcon data-icon="inline-start" />
              {launch ? (
                <span id="launch-date-value">
                  {launch.toLocaleDateString("en-US", { dateStyle: "long" })}
                </span>
              ) : (
                <span id="launch-date-value" className="text-muted-foreground">
                  Pick a date
                </span>
              )}
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={launch}
                onSelect={setLaunch}
                defaultMonth={new Date(2026, 9)}
              />
            </PopoverContent>
          </Popover>
          <FieldDescription>
            Production deploys go out at 09:00 in the team timezone.
          </FieldDescription>
        </Field>
      </Example>
      <Example title="Range · two months" wide className="justify-center">
        <Calendar
          mode="range"
          selected={range}
          onSelect={setRange}
          numberOfMonths={2}
          defaultMonth={new Date(2026, 9)}
          className="rounded-2xl border"
        />
      </Example>
    </Block>
  )
}

function LabelBlock() {
  return (
    <Block
      id="label"
      title="Label"
      description="Names a control outside of a form. Inside forms, FieldLabel does the same job and also handles invalid and disabled states."
    >
      <Example title="Typical · with a checkbox and an input">
        <div className="flex items-center gap-2">
          <Checkbox id="label-remember" name="remember" defaultChecked />
          <Label htmlFor="label-remember">Remember this device</Label>
        </div>
        <div className="flex w-full max-w-64 flex-col gap-2">
          <Label htmlFor="label-search">Filter logs</Label>
          <Input id="label-search" placeholder="status:500" />
        </div>
      </Example>
    </Block>
  )
}
