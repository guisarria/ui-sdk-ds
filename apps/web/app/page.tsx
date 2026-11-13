import { readdirSync } from "node:fs"
import { join } from "node:path"
import type { Metadata } from "next"

import { Actions } from "./_components/actions"
import { Conversation } from "./_components/conversation"
import { DataDisplay } from "./_components/data-display"
import { Feedback } from "./_components/feedback"
import { Foundations } from "./_components/foundations"
import { Guidelines } from "./_components/guidelines"
import { Inputs } from "./_components/inputs"
import { Navigation } from "./_components/navigation"
import { Overlays } from "./_components/overlays"
import { Overview } from "./_components/overview"
import { Patterns } from "./_components/patterns"
import { SiteFooter } from "./_components/site-footer"
import { SiteHeader } from "./_components/site-header"

export const metadata: Metadata = {
  title: "Design system · Workspace UI",
  description:
    "Foundations, components and patterns for every app in the monorepo, built on shadcn/ui and ui-sdk.",
}

function countComponents() {
  const directory = join(process.cwd(), "../../packages/ui/src/components")
  return readdirSync(directory).filter((file) => file.endsWith(".tsx")).length
}

export default function DesignSystemPage() {
  const componentCount = countComponents()

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <SiteHeader />
      <main className="flex-1">
        <Overview componentCount={componentCount} />
        <Foundations />
        <Actions />
        <Inputs />
        <Navigation />
        <DataDisplay />
        <Feedback />
        <Overlays />
        <Conversation />
        <Guidelines />
        <Patterns />
      </main>
      <SiteFooter componentCount={componentCount} />
    </div>
  )
}
