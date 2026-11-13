"use client"

import {
  CircleCheckIcon,
  CircleXIcon,
  FolderPlusIcon,
  GitBranchIcon,
  InfoIcon,
  KeyRoundIcon,
  RocketIcon,
  TriangleAlertIcon,
} from "lucide-react"

import { Alert, AlertAction, AlertDescription, AlertTitle } from "@ui-sdk-ds/ui/components/alert"
import { Badge } from "@ui-sdk-ds/ui/components/badge"
import { Button } from "@ui-sdk-ds/ui/components/button"
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@ui-sdk-ds/ui/components/empty"
import { Item, ItemContent, ItemGroup, ItemMedia } from "@ui-sdk-ds/ui/components/item"
import { Progress, ProgressLabel, ProgressValue } from "@ui-sdk-ds/ui/components/progress"
import { Skeleton } from "@ui-sdk-ds/ui/components/skeleton"
import { Spinner } from "@ui-sdk-ds/ui/components/spinner"
import { toast } from "@ui-sdk-ds/ui/components/toast"

import { Block, Example, Section } from "./showcase"

export function Feedback() {
  return (
    <Section
      id="feedback"
      eyebrow="07 · Components · Feedback"
      title="Feedback"
      description="Tells people what just happened and what is still happening. Say what changed and what to do next, in that order."
    >
      <AlertBlock />
      <ToastBlock />
      <ProgressBlock />
      <SkeletonBlock />
      <EmptyBlock />
    </Section>
  )
}

function AlertBlock() {
  return (
    <Block
      id="alert"
      title="Alert"
      description="An inline message that stays until the situation changes. Use it for conditions, not for confirming an action; that’s a toast."
    >
      <Example title="Default · with an action" className="block">
        <Alert>
          <KeyRoundIcon />
          <AlertTitle>Environment variables changed</AlertTitle>
          <AlertDescription>
            Redeploy to apply them. Running deployments keep the old values.
          </AlertDescription>
          <AlertAction>
            <Button variant="outline" size="xs">
              Redeploy
            </Button>
          </AlertAction>
        </Alert>
      </Example>
      <Example title="Destructive · long text" className="block">
        <Alert variant="destructive">
          <CircleXIcon />
          <AlertTitle>The last production deployment failed</AlertTitle>
          <AlertDescription>
            <p>
              The build ran out of memory after 6 minutes while optimizing 2,400 images in
              public/gallery. Visitors still see dpl_8Kq2, the last ready deployment.
            </p>
          </AlertDescription>
        </Alert>
      </Example>
      <Example title="Status · success, info, warning" wide className="grid gap-3">
        <Alert variant="success">
          <CircleCheckIcon />
          <AlertTitle>status.example.com is verified</AlertTitle>
          <AlertDescription>
            It now serves dashboard over HTTPS. The certificate renews on its own.
          </AlertDescription>
        </Alert>
        <Alert variant="info">
          <InfoIcon />
          <AlertTitle>Builds in fra1 pause on October 14</AlertTitle>
          <AlertDescription>
            Maintenance runs from 02:00 to 02:30 UTC. Live deployments keep serving traffic.
          </AlertDescription>
        </Alert>
        <Alert variant="warning">
          <TriangleAlertIcon />
          <AlertTitle>Node.js 20 reaches end of life on April 30</AlertTitle>
          <AlertDescription>
            3 projects still build on it. Switch them to 22.x in Settings.
          </AlertDescription>
          <AlertAction>
            <Button variant="outline" size="xs">
              Review
            </Button>
          </AlertAction>
        </Alert>
      </Example>
    </Block>
  )
}

function ToastBlock() {
  function showPromise() {
    void toast.promise(
      new Promise<{ id: string }>((resolve) => {
        window.setTimeout(() => resolve({ id: "dpl_9Lr4" }), 2200)
      }),
      {
        loading: {
          title: "Deploying dashboard…",
          description: "main · 3f2a91c",
        },
        success: (data) => ({
          title: "Deployment ready",
          description: `${data.id} is live on dashboard.example.com.`,
        }),
        error: { title: "Deployment failed" },
      },
    )
  }

  function showUndo() {
    toast({
      title: "Project archived",
      description: "marketing-site stops serving traffic in 24 hours.",
      action: {
        label: "Undo",
        onAction() {
          toast({ title: "marketing-site restored" })
        },
      },
    })
  }

  return (
    <Block
      id="toast"
      title="Toast"
      description="A brief confirmation that floats in and leaves on its own."
    >
      <Example title="Types · success, warning, info, error">
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Domain added",
              description: "status.example.com points at dashboard.",
              type: "success",
            })
          }
        >
          Success toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Usage at 80%",
              description: "You’ve used 820 GB of 1 TB this month.",
              type: "warning",
            })
          }
        >
          Warning toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Maintenance on October 14",
              description: "Builds in fra1 pause from 02:00 to 02:30 UTC.",
              type: "info",
            })
          }
        >
          Info toast
        </Button>
        <Button
          variant="outline"
          onClick={() =>
            toast({
              title: "Couldn’t remove member",
              description: "Teams need at least one owner.",
              type: "error",
            })
          }
        >
          Error toast
        </Button>
      </Example>
      <Example title="With an action · loading to success">
        <Button variant="outline" onClick={showUndo}>
          Archive with undo
        </Button>
        <Button onClick={showPromise}>
          <RocketIcon data-icon="inline-start" />
          Deploy
        </Button>
      </Example>
    </Block>
  )
}

function ProgressBlock() {
  return (
    <Block
      id="progress"
      title="Progress and spinner"
      description="Progress shows how much of a known amount is done. A spinner says work is happening when you can’t tell how long it will take."
    >
      <Example title="Progress · with label and value" className="block">
        <div className="flex flex-col gap-6">
          <Progress value={64}>
            <ProgressLabel>Uploading build output</ProgressLabel>
            <ProgressValue />
          </Progress>
          <Progress value={100}>
            <ProgressLabel>Static pages</ProgressLabel>
            <ProgressValue>{() => "42 of 42"}</ProgressValue>
          </Progress>
          <Progress value={8}>
            <ProgressLabel>Monthly build minutes</ProgressLabel>
            <ProgressValue>{() => "702 of 6,000"}</ProgressValue>
          </Progress>
        </div>
      </Example>
      <Example title="Spinner · alone, in a button, in a badge, in a row" className="block">
        <div className="flex flex-col gap-5">
          <div className="flex flex-wrap items-center gap-3">
            <Spinner />
            <Spinner className="size-6" />
            <Button disabled>
              <Spinner data-icon="inline-start" />
              Deploying…
            </Button>
            <Badge variant="outline">
              <Spinner data-icon="inline-start" aria-hidden="true" />
              Building
            </Badge>
          </div>
          <Item variant="muted" size="sm">
            <ItemMedia>
              <Spinner />
            </ItemMedia>
            <ItemContent className="min-w-0">
              <span className="truncate text-sm">Cloning acme/dashboard at 3f2a91c…</span>
            </ItemContent>
          </Item>
        </div>
      </Example>
    </Block>
  )
}

function SkeletonBlock() {
  return (
    <Block
      id="skeleton"
      title="Skeleton"
      description="Holds the shape of content while it loads, so the layout doesn’t jump. Match the real content’s size."
    >
      <Example title="Card" className="block">
        <div className="flex flex-col gap-4" aria-busy="true">
          <Skeleton className="aspect-video w-full rounded-3xl" />
          <div className="flex flex-col gap-2">
            <Skeleton className="h-4 w-1/2" />
            <Skeleton className="h-3.5 w-3/4" />
          </div>
        </div>
      </Example>
      <Example title="List rows" className="block">
        <ItemGroup className="gap-2" aria-busy="true">
          {[0, 1, 2].map((row) => (
            <Item key={row} size="sm" variant="outline">
              <ItemMedia>
                <Skeleton className="size-8 rounded-full" />
              </ItemMedia>
              <ItemContent>
                <Skeleton className="h-3.5 w-32" />
                <Skeleton className="h-3 w-48" />
              </ItemContent>
            </Item>
          ))}
        </ItemGroup>
      </Example>
    </Block>
  )
}

function EmptyBlock() {
  return (
    <Block
      id="empty"
      title="Empty"
      description="Explains why there’s nothing here and offers the next step. Never leave a blank region or a bare “No data”."
    >
      <Example title="Typical · first run" className="block">
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <FolderPlusIcon />
            </EmptyMedia>
            <EmptyTitle>No projects yet</EmptyTitle>
            <EmptyDescription>
              Import a Git repository to deploy it. Every push gets its own preview URL.
            </EmptyDescription>
          </EmptyHeader>
          <EmptyContent>
            <div className="flex flex-wrap justify-center gap-2">
              <Button>Import repository</Button>
              <Button variant="outline">Start from a template</Button>
            </div>
          </EmptyContent>
        </Empty>
      </Example>
      <Example title="Muted band · no results" className="block">
        <Empty className="bg-muted/50">
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <GitBranchIcon />
            </EmptyMedia>
            <EmptyTitle>No preview deployments</EmptyTitle>
            <EmptyDescription>
              Open a pull request against main and it will appear here. See{" "}
              <a href="#patterns">branch settings</a>.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      </Example>
    </Block>
  )
}
