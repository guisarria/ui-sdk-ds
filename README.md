# ui-sdk-ds

A design system built on [ui-sdk](https://ui-sdk.dev/docs). ui-sdk supplies each component's behavior: keyboard navigation, focus, selection, dismissal, popups and the ARIA they need. This repo adds the look, with Tailwind CSS, and a reference page that renders every component.

## What's inside

| Path                         | What it is                                                                          |
| ---------------------------- | ----------------------------------------------------------------------------------- |
| `packages/ui`                | `@ui-sdk-ds/ui`: the styled components, hooks and global stylesheet                 |
| `apps/web`                   | A Next.js app that shows every component, its states and the patterns built from it |
| `packages/typescript-config` | Shared TypeScript configuration                                                     |
| `tools/oxlint/anti-slop`     | Custom lint rules, loaded by `.oxlintrc.json`                                       |

## Getting started

You need Node 20.9 or newer and pnpm 11.

```bash
pnpm install
pnpm dev
```

`pnpm dev` starts the reference app at http://localhost:3000.

## Commands

Run these from the repo root.

| Command                            | What it does                                                         |
| ---------------------------------- | -------------------------------------------------------------------- |
| `pnpm dev`                         | Starts the reference app                                             |
| `pnpm build`                       | Builds every package                                                 |
| `pnpm typecheck`                   | Type-checks every package                                            |
| `pnpm lint`                        | Runs oxlint with type-aware rules; `pnpm lint:fix` fixes what it can |
| `pnpm format`                      | Formats with oxfmt, which also sorts Tailwind classes inside `cn()`  |
| `pnpm format:check`                | Checks formatting without writing                                    |
| `pnpm --filter @ui-sdk-ds/ui test` | Runs the component tests                                             |

## Using the components

Each component has its own entry. Import the parts you need from it:

```tsx
import { Button } from "@ui-sdk-ds/ui/components/button"
import { Input, InputClear, InputGroup } from "@ui-sdk-ds/ui/components/input"
```

An app needs two things once, at its root:

- **The global stylesheet**, `@ui-sdk-ds/ui/globals.css`. It declares `@layer ui-sdk;` above `@import "tailwindcss"`, so these styles win over the little CSS ui-sdk adds for its behaviors.
- **`OverlayHost`**, which renders `toast()` and `confirm()` from anywhere in the app.

```tsx
import "@ui-sdk-ds/ui/globals.css"
import { OverlayHost } from "@ui-sdk-ds/ui/components/overlays"

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        <OverlayHost />
      </body>
    </html>
  )
}
```

Put parts together as the component's Composition section in the ui-sdk docs shows. A combobox with clear and open buttons, for example, places them next to the input inside a group:

```tsx
<Combobox items={timezones}>
  <InputGroup>
    <ComboboxInput aria-label="Timezone" />
    <ComboboxClear />
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
```

Apps import only from `@ui-sdk-ds/ui`. Lint rejects `@ui-sdk/*`, `@shadcn/react` and `class-variance-authority` in `apps/web`. If an app needs a part that isn't wrapped yet, add it to `packages/ui`.

## Building a component

A file in `packages/ui/src/components` styles one ui-sdk entry when there is one: `input.tsx` wraps `@ui-sdk/react/input` and exports its parts under the same names. A component comes in one of two shapes.

**A ui-sdk part.** Pass the part's props through and merge the caller's classes with `cn`. Style state with the attributes the part sets, like `data-pressed` or `data-disabled`:

```tsx
import { Toggle as TogglePrimitive } from "@ui-sdk/react/toggle"
import { cn } from "cn"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

function Toggle({ className, ...props }: PrimitiveProps<typeof TogglePrimitive>) {
  return (
    <TogglePrimitive
      className={cn(
        "inline-flex h-8 items-center rounded-2xl px-2.5 data-pressed:bg-muted data-disabled:opacity-50",
        className,
      )}
      {...props}
    />
  )
}
```

**A plain element**, for layout and presentation that ui-sdk doesn't ship, like a card. `renderElement` gives it the same `render` prop as every other part, uses no hooks, and works in a Server Component:

```tsx
import { mergeProps, renderElement } from "@ui-sdk/react/primitive"
import { cn } from "cn"
import type { RenderProps } from "@ui-sdk-ds/ui/lib/parts"

function CardTitle({ className, render, ...props }: RenderProps<"div">) {
  return renderElement(
    "div",
    mergeProps(
      { "data-slot": "card-title", className: cn("text-base font-medium", className) },
      props,
    ),
    render,
  )
}
```

### Conventions

- **Style from state attributes.** Use Tailwind variants like `data-open:`, `data-pressed:` and `aria-invalid:`, and the CSS variables each component lists. Wrappers take `className` as a string; `PrimitiveProps` and `RenderProps` enforce that, because `cn` silently drops a class name function.
- **Change the element with `render`**, like `<CardTitle render={<h2 />} />`. Never add an `as` prop.
- **Compose instead of adding flags.** Expose a part and let the caller place it, rather than adding props like `showClear`.
- **Name every control.** Icon-only buttons get a default `aria-label` that callers can override; everything else is named with a label part or `aria-label`.
- **Don't hand-roll what ui-sdk ships.** That covers roles, focus handling and keyboard shortcuts; `useShortcut` from `@ui-sdk-ds/ui/hooks/use-shortcut` registers a shortcut that pauses while a modal is open.
- **Leave `data-slot` to ui-sdk.** A part always renders its own slot, so only plain elements set one.
- **Write variants as plain objects** and a function that returns `cn(...)`, like `buttonVariants`.
- **Key lists by value or id**, never by index.
- **Keep comments rare.** Write one only for a browser quirk or a trade-off a reader would otherwise get wrong.

## Testing

Tests live in `packages/ui/src/test` and run in jsdom with Vitest and Testing Library.

- Behavior tests find elements by role and accessible name, and drive them with `user-event`.
- `structure.test.tsx` snapshots each component's rendered markup. Read every snapshot diff before you accept it with `pnpm --filter @ui-sdk-ds/ui test -u`.
- jsdom can't see color or layout. Check contrast, animation and spacing in the reference app.

## ui-sdk docs

The docs for the installed ui-sdk version ship with the package. Start at `packages/ui/node_modules/@ui-sdk/react/docs/llms.txt`, then read the page for the component you're working on, like `docs/components/combobox.md`. The same docs are online at https://ui-sdk.dev/docs.
