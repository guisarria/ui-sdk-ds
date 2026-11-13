export const team = {
  name: "Acme",
  seats: { used: 5, total: 10 },
}

export type Member = {
  name: string
  email: string
  initials: string
  role: "Owner" | "Admin" | "Member" | "Viewer"
}

export const members: Array<Member> = [
  {
    name: "Ana Souza",
    email: "ana@example.com",
    initials: "AS",
    role: "Owner",
  },
  {
    name: "Kenji Watanabe",
    email: "kenji@example.com",
    initials: "KW",
    role: "Admin",
  },
  {
    name: "Priya Raman",
    email: "priya@example.com",
    initials: "PR",
    role: "Member",
  },
  {
    name: "Leo Martin",
    email: "leo@example.com",
    initials: "LM",
    role: "Member",
  },
  {
    name: "Sofia Rossi",
    email: "sofia@example.com",
    initials: "SR",
    role: "Viewer",
  },
]

export const roleItems = [
  { label: "Owner", value: "owner" },
  { label: "Admin", value: "admin" },
  { label: "Member", value: "member" },
  { label: "Viewer", value: "viewer" },
]

export type DeploymentStatus = "Ready" | "Building" | "Queued" | "Error" | "Canceled"

export type Deployment = {
  id: string
  project: string
  branch: string
  commit: string
  status: DeploymentStatus
  environment: "Production" | "Preview"
  duration: string
  author: string
  age: string
}

export const deployments: Array<Deployment> = [
  {
    id: "dpl_8Kq2",
    project: "dashboard",
    branch: "main",
    commit: "Retry failed webhooks with backoff",
    status: "Ready",
    environment: "Production",
    duration: "1m 42s",
    author: "Ana Souza",
    age: "4m ago",
  },
  {
    id: "dpl_7Hn5",
    project: "dashboard",
    branch: "feat/invoice-export",
    commit: "Add PDF export to the invoices table",
    status: "Building",
    environment: "Preview",
    duration: "52s",
    author: "Kenji Watanabe",
    age: "9m ago",
  },
  {
    id: "dpl_6Jm1",
    project: "api",
    branch: "main",
    commit: "Raise the rate limit for /v1/search",
    status: "Error",
    environment: "Production",
    duration: "38s",
    author: "Priya Raman",
    age: "1h ago",
  },
  {
    id: "dpl_5Gt9",
    project: "marketing-site",
    branch: "copy/annual-pricing",
    commit:
      "Rewrite the pricing page for the annual plan launch, including the comparison table and FAQ",
    status: "Ready",
    environment: "Preview",
    duration: "2m 05s",
    author: "Leo Martin",
    age: "3h ago",
  },
  {
    id: "dpl_4Fx3",
    project: "docs",
    branch: "main",
    commit: "Document the new CLI login flow",
    status: "Queued",
    environment: "Production",
    duration: "—",
    author: "Sofia Rossi",
    age: "3h ago",
  },
]

export const regionGroups = [
  {
    label: "Americas",
    items: [
      { label: "Washington, D.C. (iad1)", value: "iad1" },
      { label: "San Francisco (sfo1)", value: "sfo1" },
      { label: "São Paulo (gru1)", value: "gru1" },
    ],
  },
  {
    label: "Europe",
    items: [
      { label: "Frankfurt (fra1)", value: "fra1" },
      { label: "London (lhr1)", value: "lhr1" },
    ],
  },
  {
    label: "Asia Pacific",
    items: [
      { label: "Tokyo (hnd1)", value: "hnd1" },
      { label: "Sydney (syd1)", value: "syd1" },
    ],
  },
]

export const regionItems = regionGroups.flatMap((group) => group.items)

export const timezones = [
  "America/Los_Angeles",
  "America/New_York",
  "America/Sao_Paulo",
  "Europe/London",
  "Europe/Berlin",
  "Europe/Lisbon",
  "Africa/Lagos",
  "Asia/Dubai",
  "Asia/Kolkata",
  "Asia/Singapore",
  "Asia/Tokyo",
  "Australia/Sydney",
]

export const labels = ["bug", "design", "infra", "billing", "docs", "performance", "security"]

export const deploysPerDay = [
  { day: "Sep 26", production: 4, preview: 11 },
  { day: "Sep 27", production: 2, preview: 6 },
  { day: "Sep 28", production: 1, preview: 3 },
  { day: "Sep 29", production: 6, preview: 14 },
  { day: "Sep 30", production: 5, preview: 17 },
  { day: "Oct 1", production: 7, preview: 15 },
  { day: "Oct 2", production: 3, preview: 12 },
  { day: "Oct 3", production: 8, preview: 19 },
  { day: "Oct 4", production: 2, preview: 5 },
  { day: "Oct 5", production: 1, preview: 4 },
  { day: "Oct 6", production: 6, preview: 16 },
  { day: "Oct 7", production: 9, preview: 21 },
  { day: "Oct 8", production: 5, preview: 13 },
  { day: "Oct 9", production: 4, preview: 10 },
]

export const buildMinutes = [
  { week: "Aug 18", minutes: 412 },
  { week: "Aug 25", minutes: 468 },
  { week: "Sep 1", minutes: 391 },
  { week: "Sep 8", minutes: 523 },
  { week: "Sep 15", minutes: 610 },
  { week: "Sep 22", minutes: 574 },
  { week: "Sep 29", minutes: 655 },
  { week: "Oct 6", minutes: 702 },
]

const auditActions = [
  "promoted dpl_8Kq2 to production",
  "added the domain status.example.com",
  "rotated the API key “CI deploys”",
  "changed Kenji Watanabe's role to Admin",
  "turned on preview deployments for api",
  "redeployed docs with the build cache cleared",
  "invited sofia@example.com as Viewer",
  "rolled back dashboard to dpl_3Bv7",
]

export const auditLog = Array.from({ length: 24 }, (_, index) => ({
  id: `evt_${(index + 1).toString().padStart(2, "0")}`,
  actor: members[index % members.length]!.name,
  action: auditActions[index % auditActions.length]!,
  time: `${index * 7 + 2}m ago`,
}))

export const releaseNotes = [
  {
    version: "2026.10",
    title: "Instant rollbacks",
    body: "Roll production back to any ready deployment in one click. No rebuild, no cache misses.",
  },
  {
    version: "2026.09",
    title: "Build cache v2",
    body: "Dependencies are cached per lockfile hash. Median install time dropped from 41s to 9s.",
  },
  {
    version: "2026.08",
    title: "Preview comments",
    body: "Reviewers can pin comments to any element on a preview URL and resolve them from the PR.",
  },
  {
    version: "2026.07",
    title: "Usage alerts",
    body: "Set a monthly budget per project and get an email at 50%, 80% and 100% of it.",
  },
  {
    version: "2026.06",
    title: "Regional failover",
    body: "Functions fail over to the nearest healthy region when a primary region degrades.",
  },
]

export const faqs = [
  {
    question: "What counts as a build minute?",
    answer:
      "Time spent installing dependencies and running your build command. Queued time and cache restores are free.",
  },
  {
    question: "Do preview deployments use production data?",
    answer:
      "Only if you point them at it. Previews get their own environment variables, so most teams connect a staging database.",
  },
  {
    question: "How long are preview deployments kept?",
    answer:
      "Previews stay up for 30 days after their last visit. Production deployments are kept until you delete them.",
  },
]

export const environmentVariables = [
  { key: "DATABASE_URL", value: "postgres://••••••••@db.example.com/acme" },
  { key: "NEXT_PUBLIC_APP_URL", value: "https://dashboard.example.com" },
  { key: "STRIPE_SECRET_KEY", value: "sk_test_••••••••••••" },
  { key: "SENTRY_DSN", value: "https://••••@o42.ingest.example.com/7" },
  { key: "FEATURE_FLAGS", value: "billing-v2,preview-comments" },
]

export function avatarSrc(hue: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 70% 72%)"/><stop offset="1" stop-color="hsl(${(hue + 50) % 360} 65% 48%)"/></linearGradient></defs><rect width="64" height="64" fill="url(#g)"/><circle cx="32" cy="26" r="11" fill="rgb(255 255 255 / 0.85)"/><path d="M12 60c3-12 11-18 20-18s17 6 20 18" fill="rgb(255 255 255 / 0.85)"/></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

export function coverSrc(hue: number) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 360"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="hsl(${hue} 60% 86%)"/><stop offset="1" stop-color="hsl(${(hue + 40) % 360} 55% 62%)"/></linearGradient></defs><rect width="640" height="360" fill="url(#g)"/><rect x="64" y="56" width="512" height="304" rx="18" fill="rgb(255 255 255 / 0.9)"/><rect x="96" y="92" width="180" height="14" rx="7" fill="hsl(${hue} 30% 30% / 0.55)"/><rect x="96" y="124" width="320" height="10" rx="5" fill="hsl(${hue} 20% 40% / 0.25)"/><rect x="96" y="146" width="280" height="10" rx="5" fill="hsl(${hue} 20% 40% / 0.25)"/><rect x="96" y="190" width="140" height="110" rx="12" fill="hsl(${hue} 50% 70% / 0.45)"/><rect x="250" y="190" width="140" height="110" rx="12" fill="hsl(${(hue + 40) % 360} 50% 70% / 0.45)"/><rect x="404" y="190" width="140" height="110" rx="12" fill="hsl(${(hue + 80) % 360} 50% 70% / 0.45)"/></svg>`
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`
}

const lisbon = (day: string, time: string) => new Date(`2026-10-${day}T${time}:00+01:00`)

export const teamCalendar = {
  timeZone: "Europe/Lisbon",
  defaultDate: lisbon("14", "09:00"),
  events: [
    {
      id: "standup",
      title: "Standup",
      start: lisbon("12", "09:15"),
      end: lisbon("12", "09:30"),
      recurrence: {
        freq: "weekly" as const,
        byWeekday: ["MO" as const, "TU" as const, "WE" as const, "TH" as const, "FR" as const],
        count: 15,
      },
      color: "var(--chart-1)",
    },
    {
      id: "dashboard-beta",
      title: "Dashboard v3 beta",
      start: lisbon("12", "00:00"),
      end: lisbon("15", "00:00"),
      allDay: true,
      color: "var(--chart-3)",
    },
    {
      id: "on-call",
      title: "On call · Priya Raman",
      start: lisbon("15", "00:00"),
      end: lisbon("19", "00:00"),
      allDay: true,
      color: "var(--chart-5)",
    },
    {
      id: "planning",
      title: "Sprint planning",
      start: lisbon("12", "10:00"),
      end: lisbon("12", "11:30"),
      color: "var(--chart-1)",
    },
    {
      id: "design-review",
      title: "Design review · invoice export",
      start: lisbon("13", "14:00"),
      end: lisbon("13", "15:00"),
      color: "var(--chart-2)",
    },
    {
      id: "release-cut",
      title: "Cut release 2026.10",
      start: lisbon("14", "10:00"),
      end: lisbon("14", "10:30"),
      color: "var(--chart-4)",
    },
    {
      id: "incident-review",
      title: "Incident review · api 502s",
      start: lisbon("14", "11:00"),
      end: lisbon("14", "12:00"),
      color: "var(--chart-2)",
    },
    {
      id: "customer-call",
      title: "Customer call · Northwind",
      start: lisbon("14", "11:30"),
      end: lisbon("14", "12:15"),
      color: "var(--chart-3)",
    },
    {
      id: "load-test",
      title: "Load test /v1/search",
      start: lisbon("15", "13:00"),
      end: lisbon("15", "15:00"),
      color: "var(--chart-4)",
    },
    {
      id: "deploy-window",
      title: "Production deploy window",
      start: lisbon("16", "14:00"),
      end: lisbon("16", "16:00"),
      color: "var(--chart-5)",
    },
    {
      id: "demo",
      title: "Weekly demo",
      start: lisbon("16", "16:30"),
      end: lisbon("16", "17:15"),
      color: "var(--chart-1)",
    },
  ],
}
