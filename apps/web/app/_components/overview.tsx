"use client"

import * as React from "react"
import { ArrowDownIcon, LinkIcon, MailIcon } from "lucide-react"

import { Avatar, AvatarFallback, AvatarImage } from "@ui-sdk-ds/ui/components/avatar"
import { Badge } from "@ui-sdk-ds/ui/components/badge"
import { Button } from "@ui-sdk-ds/ui/components/button"
import { ButtonGroup } from "@ui-sdk-ds/ui/components/button-group"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui-sdk-ds/ui/components/card"
import { Field, FieldDescription, FieldError, FieldLabel } from "@ui-sdk-ds/ui/components/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@ui-sdk-ds/ui/components/input-group"
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemMedia,
  ItemTitle,
} from "@ui-sdk-ds/ui/components/item"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk-ds/ui/components/select"
import { toast } from "@ui-sdk-ds/ui/components/toast"

import { avatarSrc, members, roleItems, team } from "./data"

const facts = [
  { term: "Style", value: "rhea" },
  { term: "Primitives", value: "ui-sdk" },
  { term: "Color", value: "claude" },
  { term: "Radius", value: "0.45rem" },
  { term: "Type", value: "Geist, Geist Mono" },
  { term: "Icons", value: "Lucide" },
]

export function Overview({ componentCount }: { componentCount: number }) {
  return (
    <section
      id="overview"
      aria-labelledby="overview-title"
      className="scroll-mt-28 bg-background text-foreground"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 sm:py-24 lg:grid-cols-[1.15fr_1fr] lg:px-8">
        <div className="flex min-w-0 flex-col gap-8">
          <div className="flex flex-col gap-5">
            <p className="type-eyebrow text-muted-foreground">Design system · @ui-sdk-ds/ui</p>
            <h1 id="overview-title" className="type-display">
              Workspace UI
            </h1>
            <p className="max-w-xl text-lg text-pretty text-muted-foreground">
              One kit for every screen in this monorepo: {componentCount} shadcn/ui components on
              ui-sdk, set in Geist, rounded and softly raised by the rhea preset.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Button size="lg" render={<a href="#foundations" />}>
              Start with foundations
              <ArrowDownIcon data-icon="inline-end" />
            </Button>
            <Button size="lg" variant="outline" render={<a href="#patterns" />}>
              See it composed
            </Button>
          </div>
          <dl className="grid grid-cols-2 gap-x-6 gap-y-4 sm:grid-cols-3">
            {facts.map((fact) => (
              <div key={fact.term} className="flex flex-col gap-1">
                <dt className="text-xs text-muted-foreground">{fact.term}</dt>
                <dd className="font-mono text-sm">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
        <InviteCard />
      </div>
    </section>
  )
}

const roleSelectItems = roleItems.filter((item) => item.value !== "owner")

function InviteCard() {
  const [email, setEmail] = React.useState("")
  const [role, setRole] = React.useState<string | null>("member")
  const [error, setError] = React.useState<string | null>(null)

  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Enter an email address like name@example.com.")
      return
    }
    setError(null)
    setEmail("")
    toast({
      title: "Invite sent",
      description: `${email} joins ${team.name} as ${role ?? "member"} once they accept.`,
      type: "success",
    })
  }

  return (
    <Card className="w-full max-w-md justify-self-center lg:justify-self-end">
      <CardHeader>
        <CardTitle>Invite your team</CardTitle>
        <CardDescription>Teammates get access to every project in {team.name}.</CardDescription>
        <CardAction>
          <Badge variant="secondary">
            {team.seats.used} of {team.seats.total} seats
          </Badge>
        </CardAction>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <form id="invite-form" onSubmit={handleSubmit} noValidate>
          <Field name="invite-email" invalid={error ? true : undefined}>
            <FieldLabel>Email address</FieldLabel>
            <ButtonGroup className="w-full">
              <InputGroup>
                <InputGroupAddon>
                  <MailIcon />
                </InputGroupAddon>
                <InputGroupInput
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  aria-invalid={error ? true : undefined}
                  onChange={(event) => setEmail(event.target.value)}
                />
              </InputGroup>
              <Select
                items={roleSelectItems}
                value={role}
                onValueChange={(value) => setRole(value)}
              >
                <SelectTrigger aria-label="Role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end" alignItemWithTrigger={false}>
                  <SelectGroup>
                    {roleSelectItems.map((item) => (
                      <SelectItem key={item.value} value={item.value}>
                        {item.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </ButtonGroup>
            {error ? (
              <FieldError>{error}</FieldError>
            ) : (
              <FieldDescription>Invites expire after 7 days.</FieldDescription>
            )}
          </Field>
        </form>
        <ItemGroup className="gap-2">
          {members.slice(0, 3).map((member, index) => (
            <Item key={member.email} size="xs" className="px-0">
              <ItemMedia>
                <Avatar>
                  <AvatarImage src={avatarSrc(index * 70 + 200)} alt="" />
                  <AvatarFallback>{member.initials}</AvatarFallback>
                </Avatar>
              </ItemMedia>
              <ItemContent>
                <ItemTitle>{member.name}</ItemTitle>
                <ItemDescription>{member.email}</ItemDescription>
              </ItemContent>
              <ItemActions>
                <Badge variant={member.role === "Owner" ? "outline" : "ghost"}>{member.role}</Badge>
              </ItemActions>
            </Item>
          ))}
        </ItemGroup>
      </CardContent>
      <CardFooter className="justify-between gap-2">
        <Button
          variant="ghost"
          onClick={() => {
            void navigator.clipboard?.writeText("https://app.example.com/join/acme-7Qx2")
            toast({ title: "Invite link copied" })
          }}
        >
          <LinkIcon data-icon="inline-start" />
          Copy invite link
        </Button>
        <Button type="submit" form="invite-form">
          Send invite
        </Button>
      </CardFooter>
    </Card>
  )
}
