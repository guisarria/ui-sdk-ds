"use client"

import * as React from "react"
import Image from "next/image"
import {
  ArrowUpIcon,
  DownloadIcon,
  FileCodeIcon,
  FileTextIcon,
  GitPullRequestIcon,
  HistoryIcon,
  ImageIcon,
  PaperclipIcon,
  RotateCcwIcon,
  SparklesIcon,
  UploadIcon,
  UserPlusIcon,
} from "lucide-react"

import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentGroup,
  AttachmentMedia,
  AttachmentTitle,
  AttachmentTrigger,
} from "@ui-sdk-ds/ui/components/attachment"
import { Avatar, AvatarFallback, AvatarImage } from "@ui-sdk-ds/ui/components/avatar"
import {
  Bubble,
  BubbleButton,
  BubbleContent,
  BubbleGroup,
  BubbleReactions,
} from "@ui-sdk-ds/ui/components/bubble"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@ui-sdk-ds/ui/components/card"
import { InputGroup, InputGroupAddon, InputGroupButton } from "@ui-sdk-ds/ui/components/input"
import { Textarea } from "@ui-sdk-ds/ui/components/textarea"
import { Marker, MarkerContent, MarkerIcon } from "@ui-sdk-ds/ui/components/marker"
import {
  Message,
  MessageAvatar,
  MessageContent,
  MessageFooter,
  MessageGroup,
  MessageHeader,
} from "@ui-sdk-ds/ui/components/message"
import {
  MessageScroller,
  MessageScrollerButton,
  MessageScrollerContent,
  MessageScrollerItem,
  MessageScrollerViewport,
} from "@ui-sdk-ds/ui/components/message-scroller"
import {
  Questionnaire,
  QuestionnaireActions,
  QuestionnaireChoice,
  QuestionnaireChoiceDescription,
  QuestionnaireChoices,
  QuestionnaireDescription,
  QuestionnaireError,
  QuestionnaireInput,
  QuestionnaireItem,
  QuestionnaireNext,
  QuestionnairePrevious,
  QuestionnaireProgress,
  QuestionnaireSkip,
  QuestionnaireSubmit,
  QuestionnaireTitle,
} from "@ui-sdk-ds/ui/components/questionnaire"
import { Spinner } from "@ui-sdk-ds/ui/components/spinner"
import { toast } from "@ui-sdk-ds/ui/components/toast"

import { avatarSrc, coverSrc } from "./data"
import { Block, Example, Section } from "./showcase"

type Turn =
  | { id: string; kind: "divider"; text: string }
  | { id: string; kind: "note"; text: string }
  | {
      id: string
      kind: "message"
      role: "user" | "assistant"
      texts: Array<string>
      time: string
      attachment?: boolean
      reaction?: string
      read?: boolean
    }

const initialTurns: Array<Turn> = [
  { id: "t1", kind: "divider", text: "Today" },
  {
    id: "t2",
    kind: "message",
    role: "assistant",
    texts: [
      "dpl_6Jm1 built, but its health check failed: /api/search returns 500 in Production.",
      "SEARCH_API_KEY is set for Preview but not for Production, which is why the preview deployment passed.",
    ],
    time: "10:41",
  },
  { id: "t3", kind: "note", text: "Priya Raman joined the conversation" },
  {
    id: "t4",
    kind: "message",
    role: "user",
    texts: ["Can you copy it to Production and redeploy?"],
    time: "10:43",
  },
  {
    id: "t5",
    kind: "message",
    role: "assistant",
    texts: ["Done. dpl_7Kp2 passes its health check on a preview URL. The check log is attached."],
    time: "10:44",
    attachment: true,
  },
  {
    id: "t6",
    kind: "message",
    role: "user",
    texts: ["Great. Promote it once the checks pass."],
    time: "10:45",
    reaction: "👍 1",
    read: true,
  },
]

const replies = [
  "Will do. I’ll post here as soon as dpl_7Kp2 is live in production.",
  "Noted. Next time I’ll flag variables that exist in Preview but not in Production before the deploy.",
  "Got it. Rolling out to 25% of traffic first, then the rest after 10 minutes.",
]

export function Conversation() {
  return (
    <Section
      id="conversation"
      eyebrow="09 · Components · Conversation"
      title="Conversation"
      description="Chat and assistant surfaces. Threads compose MessageScroller, Message and Bubble; files are Attachments and system notes are Markers."
    >
      <ThreadBlock />
      <BubbleBlock />
      <AttachmentBlock />
      <MarkerBlock />
      <QuestionnaireBlock />
    </Section>
  )
}

function AssistantAvatar() {
  return (
    <Avatar role="img" aria-label="Workspace assistant">
      <AvatarFallback>
        <SparklesIcon className="size-4" aria-hidden="true" />
      </AvatarFallback>
    </Avatar>
  )
}

function PriyaAvatar() {
  return (
    <Avatar>
      <AvatarImage src={avatarSrc(340)} alt="Priya Raman" />
      <AvatarFallback>PR</AvatarFallback>
    </Avatar>
  )
}

function CheckLogAttachment() {
  return (
    <Attachment state="done">
      <AttachmentMedia>
        <FileTextIcon />
      </AttachmentMedia>
      <AttachmentContent>
        <AttachmentTitle>health-check.log</AttachmentTitle>
        <AttachmentDescription>Log · 42 lines · 3.1 KB</AttachmentDescription>
      </AttachmentContent>
      <AttachmentActions>
        <AttachmentAction aria-label="Download health-check.log">
          <DownloadIcon />
        </AttachmentAction>
      </AttachmentActions>
    </Attachment>
  )
}

function ThreadBlock() {
  const [turns, setTurns] = React.useState(initialTurns)
  const [draft, setDraft] = React.useState("")
  const [thinking, setThinking] = React.useState(false)
  const timeout = React.useRef<number | undefined>(undefined)
  const replyIndex = React.useRef(0)

  React.useEffect(() => () => window.clearTimeout(timeout.current), [])

  function send() {
    const text = draft.trim()
    if (!text || thinking) {
      return
    }
    const now = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    setTurns((current) => [
      ...current,
      {
        id: `user-${current.length}`,
        kind: "message",
        role: "user",
        texts: [text],
        time: now,
      },
    ])
    setDraft("")
    setThinking(true)
    timeout.current = window.setTimeout(() => {
      const reply = replies[replyIndex.current % replies.length]!
      replyIndex.current += 1
      setTurns((current) => [
        ...current,
        {
          id: `assistant-${current.length}`,
          kind: "message",
          role: "assistant",
          texts: [reply],
          time: now,
        },
      ])
      setThinking(false)
    }, 1400)
  }

  return (
    <Block
      id="message-scroller"
      title="Thread"
      description="A complete conversation. MessageScroller follows new messages while you’re at the bottom and offers a jump back when you scroll up."
      className="lg:grid-cols-1"
    >
      <Example
        title="Typical · assistant thread with a composer"
        className="block border-0 p-0 sm:p-0"
      >
        <Card className="h-144">
          <CardHeader className="border-b">
            <CardTitle>Build assistant</CardTitle>
            <CardDescription>api · dpl_6Jm1 · main</CardDescription>
          </CardHeader>
          <CardContent className="min-h-0 flex-1 overflow-hidden p-0">
            <MessageScroller>
              <MessageScrollerViewport aria-label="Build assistant thread">
                <MessageScrollerContent className="mx-auto max-w-3xl gap-6 p-(--card-spacing)">
                  {turns.map((turn) => (
                    <MessageScrollerItem key={turn.id}>
                      <ThreadTurn turn={turn} />
                    </MessageScrollerItem>
                  ))}
                  {thinking && (
                    <MessageScrollerItem>
                      <Marker role="status">
                        <MarkerIcon>
                          <Spinner aria-hidden="true" />
                        </MarkerIcon>
                        <MarkerContent className="shimmer">Thinking…</MarkerContent>
                      </Marker>
                    </MessageScrollerItem>
                  )}
                </MessageScrollerContent>
              </MessageScrollerViewport>
              <MessageScrollerButton />
            </MessageScroller>
          </CardContent>
          <CardFooter className="border-t">
            <form
              className="mx-auto w-full max-w-3xl"
              onSubmit={(event) => {
                event.preventDefault()
                send()
              }}
            >
              <InputGroup>
                <Textarea
                  name="message-the-build-assistant"
                  aria-label="Message the build assistant"
                  placeholder="Ask about this deployment…"
                  value={draft}
                  onValueChange={setDraft}
                  onKeyDown={(event) => {
                    if (event.key === "Enter" && !event.shiftKey) {
                      event.preventDefault()
                      event.currentTarget.form?.requestSubmit()
                    }
                  }}
                />
                <InputGroupAddon align="block-end">
                  <InputGroupButton size="icon-xs" aria-label="Attach a file">
                    <PaperclipIcon />
                  </InputGroupButton>
                  <InputGroupButton
                    type="submit"
                    size="icon-xs"
                    variant="brand"
                    className="ms-auto"
                    aria-label="Send message"
                    disabled={!draft.trim() || thinking}
                  >
                    <ArrowUpIcon />
                  </InputGroupButton>
                </InputGroupAddon>
              </InputGroup>
            </form>
          </CardFooter>
        </Card>
      </Example>
    </Block>
  )
}

function ThreadTurn({ turn }: { turn: Turn }) {
  if (turn.kind === "divider") {
    return (
      <Marker variant="separator">
        <MarkerContent>{turn.text}</MarkerContent>
      </Marker>
    )
  }

  if (turn.kind === "note") {
    return (
      <Marker className="justify-center">
        <MarkerIcon>
          <UserPlusIcon />
        </MarkerIcon>
        <MarkerContent>{turn.text}</MarkerContent>
      </Marker>
    )
  }

  const isUser = turn.role === "user"

  return (
    <Message align={isUser ? "end" : "start"}>
      <MessageAvatar>{isUser ? <PriyaAvatar /> : <AssistantAvatar />}</MessageAvatar>
      <MessageContent>
        <MessageHeader>{isUser ? "Priya Raman" : "Workspace assistant"}</MessageHeader>
        <BubbleGroup>
          {turn.texts.map((text, index) => (
            <Bubble
              key={text}
              variant={isUser ? "muted" : "ghost"}
              align={isUser ? "end" : "start"}
            >
              <BubbleContent>{text}</BubbleContent>
              {turn.reaction && index === turn.texts.length - 1 && (
                <BubbleReactions side="bottom" align={isUser ? "start" : "end"}>
                  {turn.reaction}
                </BubbleReactions>
              )}
            </Bubble>
          ))}
        </BubbleGroup>
        {turn.attachment && <CheckLogAttachment />}
        <MessageFooter>
          {turn.time}
          {turn.read && " · Read"}
        </MessageFooter>
      </MessageContent>
    </Message>
  )
}

const bubbleVariants = [
  { name: "default", text: "Promote it once the checks pass." },
  { name: "secondary", text: "Promote it once the checks pass." },
  { name: "muted", text: "The health check failed on /api/search." },
  { name: "tinted", text: "The health check failed on /api/search." },
  { name: "outline", text: "Quoted from #deploys: “staging looks good”." },
  { name: "ghost", text: "Long-form answers read best without a surface." },
  {
    name: "destructive",
    text: "I couldn’t reach the build server. Try again.",
  },
] as const

function BubbleBlock() {
  return (
    <Block
      id="bubble"
      title="Message and bubble"
      description="Message lays out a row: avatar, header, content, footer. Bubble is the surface. The current user’s messages align to the end."
    >
      <Example title="Bubble variants" className="block">
        <div className="flex flex-col gap-4">
          {bubbleVariants.map((variant) => (
            <div key={variant.name} className="flex flex-col gap-1.5">
              <span className="font-mono text-xs text-muted-foreground">{variant.name}</span>
              <Bubble variant={variant.name}>
                <BubbleContent>{variant.text}</BubbleContent>
              </Bubble>
            </div>
          ))}
        </div>
      </Example>
      <div className="flex min-w-0 flex-col gap-6">
        <Example title="Grouped messages · one sender" className="block">
          <MessageGroup>
            <Message>
              <MessageAvatar>
                <AssistantAvatar />
              </MessageAvatar>
              <MessageContent>
                <MessageHeader>Workspace assistant</MessageHeader>
                <BubbleGroup>
                  <Bubble variant="muted">
                    <BubbleContent>Cache hit rate dropped to 12%.</BubbleContent>
                  </Bubble>
                  <Bubble variant="muted">
                    <BubbleContent>
                      The lockfile changed in every commit today, so each build reinstalled from
                      scratch.
                    </BubbleContent>
                  </Bubble>
                </BubbleGroup>
                <MessageFooter>10:52</MessageFooter>
              </MessageContent>
            </Message>
          </MessageGroup>
        </Example>
        <Example title="As buttons · suggested replies" className="block">
          <div className="flex flex-col gap-2">
            {["Show the diff", "Roll back production", "Open build logs"].map((reply) => (
              <Bubble key={reply} variant="outline">
                <BubbleButton onClick={() => toast({ title: reply })}>{reply}</BubbleButton>
              </Bubble>
            ))}
          </div>
        </Example>
      </div>
    </Block>
  )
}

function AttachmentBlock() {
  return (
    <Block
      id="attachment"
      title="Attachment"
      description="A file in a message or composer. Its state follows the real upload: idle, uploading, processing, error, done."
    >
      <Example title="States" className="block">
        <div className="flex flex-col gap-3">
          <Attachment state="idle">
            <AttachmentMedia>
              <UploadIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>Drop a file to attach</AttachmentTitle>
              <AttachmentDescription>Logs, PNG or PDF up to 25 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment state="uploading">
            <AttachmentMedia>
              <FileTextIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>build-output.log</AttachmentTitle>
              <AttachmentDescription>Uploading · 2.1 of 5.6 MB</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment state="processing">
            <AttachmentMedia>
              <FileCodeIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>trace.json</AttachmentTitle>
              <AttachmentDescription>Scanning for secrets…</AttachmentDescription>
            </AttachmentContent>
          </Attachment>
          <Attachment state="error">
            <AttachmentMedia>
              <ImageIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>error-screenshot.png</AttachmentTitle>
              <AttachmentDescription>Too large. Files must be under 25 MB.</AttachmentDescription>
            </AttachmentContent>
            <AttachmentActions>
              <AttachmentAction aria-label="Retry upload">
                <RotateCcwIcon />
              </AttachmentAction>
            </AttachmentActions>
          </Attachment>
          <Attachment state="done">
            <AttachmentMedia>
              <GitPullRequestIcon />
            </AttachmentMedia>
            <AttachmentContent>
              <AttachmentTitle>invoice-export.diff</AttachmentTitle>
              <AttachmentDescription>Diff · 1.2 KB</AttachmentDescription>
            </AttachmentContent>
            <AttachmentTrigger
              aria-label="Open invoice-export.diff"
              onClick={() => toast({ title: "Opening the diff" })}
            />
          </Attachment>
        </div>
      </Example>
      <div className="flex min-w-0 flex-col gap-6">
        <Example title="Sizes · default, sm, xs" className="block">
          <div className="flex flex-col items-start gap-3">
            {(["default", "sm", "xs"] as const).map((size) => (
              <Attachment key={size} size={size}>
                <AttachmentMedia>
                  <FileTextIcon />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>release-notes.pdf</AttachmentTitle>
                  <AttachmentDescription>PDF · 340 KB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            ))}
          </div>
        </Example>
        <Example title="Vertical with images · in a scrolling group" className="block">
          <AttachmentGroup>
            {[210, 30, 160].map((hue, index) => (
              <Attachment key={hue} orientation="vertical">
                <AttachmentMedia variant="image">
                  <Image src={coverSrc(hue)} alt="" width={320} height={180} unoptimized />
                </AttachmentMedia>
                <AttachmentContent>
                  <AttachmentTitle>screen-{index + 1}.png</AttachmentTitle>
                  <AttachmentDescription>PNG · 1.4 MB</AttachmentDescription>
                </AttachmentContent>
              </Attachment>
            ))}
          </AttachmentGroup>
        </Example>
      </div>
    </Block>
  )
}

function MarkerBlock() {
  return (
    <Block
      id="marker"
      title="Marker"
      description="Status lines, date dividers and labeled breaks inside a thread. Never a Separator with a span on top."
    >
      <Example title="Variants · default, separator, border" className="block">
        <div className="flex flex-col gap-6">
          <Marker>
            <MarkerIcon>
              <UserPlusIcon />
            </MarkerIcon>
            <MarkerContent>Sofia Rossi joined the conversation</MarkerContent>
          </Marker>
          <Marker variant="separator">
            <MarkerContent>Yesterday</MarkerContent>
          </Marker>
          <Marker variant="border">
            <MarkerIcon>
              <HistoryIcon />
            </MarkerIcon>
            <MarkerContent>
              12 earlier messages. <a href="#marker">Load them</a>
            </MarkerContent>
          </Marker>
        </div>
      </Example>
      <Example title="Live status" className="block">
        <Marker role="status">
          <MarkerIcon>
            <Spinner aria-hidden="true" />
          </MarkerIcon>
          <MarkerContent className="shimmer">Reading 214 lines of build output…</MarkerContent>
        </Marker>
      </Example>
    </Block>
  )
}

const setupItems = [
  {
    name: "framework",
    required: true,
    choices: [{ value: "next" }, { value: "vite" }, { value: "astro" }],
  },
  {
    name: "environments",
    choices: [{ value: "production" }, { value: "preview" }, { value: "dev" }],
  },
  {
    name: "region",
    required: true,
    choices: [{ value: "americas" }, { value: "europe" }, { value: "apac" }],
  },
] as const

function QuestionnaireBlock() {
  function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const text = (value: FormDataEntryValue | null) => (typeof value === "string" ? value : null)
    const environments = data.getAll("environments").map(text).filter(Boolean).join(", ") || "none"
    toast({
      title: "Project configured",
      description: `${text(data.get("framework")) ?? "Custom"} · deploys: ${environments} · region: ${text(data.get("region")) ?? "none"}`,
      type: "success",
    })
  }

  return (
    <Block
      id="questionnaire"
      title="Questionnaire"
      description="Asks a few questions one at a time, like an assistant collecting what it needs. Number keys pick choices."
      className="lg:grid-cols-1"
    >
      <Example title="Typical · project setup, three questions" className="block">
        <Questionnaire
          className="mx-auto max-w-lg"
          defaultItem="framework"
          items={setupItems}
          shortcuts="numbers"
          onSubmit={handleSubmit}
        >
          <QuestionnaireProgress />
          <QuestionnaireItem name="framework" required>
            <QuestionnaireTitle>Which framework does this repo use?</QuestionnaireTitle>
            <QuestionnaireDescription>
              We detected a package.json in apps/dashboard.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="next">
                <span className="font-medium">Next.js</span>
                <QuestionnaireChoiceDescription>
                  Server rendering and functions included.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="vite">
                <span className="font-medium">Vite</span>
                <QuestionnaireChoiceDescription>
                  A static single-page app.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireChoice value="astro">
                <span className="font-medium">Astro</span>
                <QuestionnaireChoiceDescription>
                  Content sites with islands.
                </QuestionnaireChoiceDescription>
              </QuestionnaireChoice>
              <QuestionnaireInput aria-label="Another framework" placeholder="Something else…" />
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="environments" multiple>
            <QuestionnaireTitle>What should deploy automatically?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Pick any, or skip and deploy by hand.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="production">
                Production, on every push to main
              </QuestionnaireChoice>
              <QuestionnaireChoice value="preview">
                Previews, on every pull request
              </QuestionnaireChoice>
              <QuestionnaireChoice value="dev">Development branches</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireItem name="region" required>
            <QuestionnaireTitle>Where are most of your users?</QuestionnaireTitle>
            <QuestionnaireDescription>
              Functions run in the closest region.
            </QuestionnaireDescription>
            <QuestionnaireChoices>
              <QuestionnaireChoice value="americas">Americas</QuestionnaireChoice>
              <QuestionnaireChoice value="europe">Europe</QuestionnaireChoice>
              <QuestionnaireChoice value="apac">Asia Pacific</QuestionnaireChoice>
            </QuestionnaireChoices>
            <QuestionnaireError />
          </QuestionnaireItem>
          <QuestionnaireActions>
            <QuestionnairePrevious />
            <QuestionnaireSkip />
            <QuestionnaireNext />
            <QuestionnaireSubmit>Create project</QuestionnaireSubmit>
          </QuestionnaireActions>
        </Questionnaire>
      </Example>
    </Block>
  )
}
