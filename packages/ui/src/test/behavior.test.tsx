import { render, screen, waitFor } from "@testing-library/react"
import { userEvent } from "@testing-library/user-event"
import { createAgent } from "@ui-sdk/react/agent"
import { useState } from "react"
import { expect, test } from "vitest"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui-sdk-ds/ui/components/alert-dialog"
import { Button } from "@ui-sdk-ds/ui/components/button"
import { Checkbox } from "@ui-sdk-ds/ui/components/checkbox"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogTitle,
  DialogTrigger,
} from "@ui-sdk-ds/ui/components/dialog"
import { Field, FieldLabel } from "@ui-sdk-ds/ui/components/field"
import { Input } from "@ui-sdk-ds/ui/components/input"
import { Switch } from "@ui-sdk-ds/ui/components/switch"
import { Toggle } from "@ui-sdk-ds/ui/components/toggle"

const agent = createAgent()

test("the dialog's close buttons close it and return focus to the trigger", async () => {
  const user = userEvent.setup()
  render(
    <Dialog>
      <DialogTrigger render={<Button />}>Edit profile</DialogTrigger>
      <DialogContent>
        <DialogTitle>Profile</DialogTitle>
        <DialogFooter showCloseButton />
      </DialogContent>
    </Dialog>,
  )
  const trigger = screen.getByRole("button", { name: "Edit profile" })

  for (const pick of [0, -1]) {
    await user.click(trigger)
    const dialog = await screen.findByRole("dialog", { name: "Profile" })
    const closers = screen.getAllByRole("button", { name: "Close" })
    expect(closers).toHaveLength(2)
    await user.click(closers.at(pick)!)
    await waitFor(() => expect(dialog.isConnected).toBe(false))
    expect(document.activeElement).toBe(trigger)
  }
})

test("an alert dialog's action closes it with the confirm answer, and Cancel closes without it", async () => {
  const user = userEvent.setup()
  const answers: Array<unknown> = []
  render(
    <AlertDialog
      onOpenChange={(open, details) => {
        if (!open) answers.push(details.returnValue)
      }}
    >
      <AlertDialogTrigger render={<Button variant="destructive" />}>
        Delete project
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogTitle>Delete project?</AlertDialogTitle>
        <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        <AlertDialogCancel>Cancel</AlertDialogCancel>
        <AlertDialogAction variant="destructive">Delete forever</AlertDialogAction>
      </AlertDialogContent>
    </AlertDialog>,
  )
  const trigger = screen.getByRole("button", { name: "Delete project" })

  await user.click(trigger)
  expect(document.activeElement).toBe(await screen.findByRole("button", { name: "Cancel" }))
  await user.keyboard("{Enter}")
  await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull())
  expect(document.activeElement).toBe(trigger)

  await user.click(trigger)
  const action = await screen.findByRole("button", { name: "Delete forever" })
  expect(action.getAttribute("data-variant")).toBe("destructive")
  await user.click(action)
  await waitFor(() => expect(screen.queryByRole("alertdialog")).toBeNull())
  expect(answers.map((answer) => answer ?? null)).toEqual([null, "confirm"])
})

test("Button and Toggle expose their variant and size as attributes", () => {
  render(
    <>
      <Button variant="outline" size="sm">
        Share
      </Button>
      <Toggle variant="outline" size="lg" aria-label="Bold">
        B
      </Toggle>
    </>,
  )
  for (const name of ["Share", "Bold"]) {
    expect(screen.getByRole("button", { name }).getAttribute("data-variant")).toBe("outline")
  }
  expect(screen.getByRole("button", { name: "Share" }).getAttribute("data-size")).toBe("sm")
  expect(screen.getByRole("button", { name: "Bold" }).getAttribute("data-size")).toBe("lg")
})

test("Space toggles every checkbox and switch", async () => {
  const user = userEvent.setup()
  render(
    <>
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
  for (const control of [
    screen.getByRole("checkbox", { name: "Accept terms" }),
    screen.getByRole("switch", { name: "Email updates" }),
  ]) {
    control.focus()
    expect(control.getAttribute("aria-checked")).toBe("false")
    await user.keyboard(" ")
    expect(control.getAttribute("aria-checked")).toBe("true")
    await user.keyboard(" ")
    expect(control.getAttribute("aria-checked")).toBe("false")
  }
})

function SettingsForm() {
  const [name, setName] = useState("")
  return (
    <>
      <Field>
        <FieldLabel>Project name</FieldLabel>
        <Input value={name} onValueChange={setName} />
      </Field>
      <Field orientation="horizontal">
        <Switch />
        <FieldLabel>Weekly digest</FieldLabel>
      </Field>
      <Button>Save settings</Button>
      <output aria-label="Saved name">{name}</output>
    </>
  )
}

test("an agent can find and change the wrapped controls", async () => {
  render(<SettingsForm />)

  const components = agent
    .snapshot()
    .filter((entry) => !entry.offPage && entry.component !== "more")
  for (const entry of components) {
    expect(entry.label, `${entry.component} ${entry.ref} has no name`).toBeTruthy()
  }
  const labels = components.map((entry) => entry.label)
  for (const label of ["Project name", "Weekly digest", "Save settings"]) {
    expect(labels, `${label} is missing from the snapshot`).toContain(label)
  }

  const result = await agent.act({
    steps: [
      { ref: "Project name", action: "setValue", args: ["Atlas"] },
      { ref: "Weekly digest", action: "setChecked", args: [true] },
    ],
  })
  expect(result.ok, result.error?.message).toBe(true)
  expect(screen.getByLabelText<HTMLInputElement>("Project name").value).toBe("Atlas")
  expect(screen.getByRole("switch", { name: "Weekly digest" }).getAttribute("aria-checked")).toBe(
    "true",
  )
})
