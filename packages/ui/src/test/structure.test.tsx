import { act, render } from "@testing-library/react"
import type { ReactNode } from "react"
import { describe, expect, test } from "vitest"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@ui-sdk-ds/ui/components/alert-dialog"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui-sdk-ds/ui/components/accordion"
import { Avatar, AvatarFallback } from "@ui-sdk-ds/ui/components/avatar"
import { Badge } from "@ui-sdk-ds/ui/components/badge"
import { Calendar } from "@ui-sdk-ds/ui/components/calendar"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@ui-sdk-ds/ui/components/carousel"
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "@ui-sdk-ds/ui/components/combobox"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandShortcut,
} from "@ui-sdk-ds/ui/components/command"
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@ui-sdk-ds/ui/components/input-otp"
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarTrigger,
} from "@ui-sdk-ds/ui/components/menubar"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@ui-sdk-ds/ui/components/navigation-menu"
import { Progress } from "@ui-sdk-ds/ui/components/progress"
import { ScrollArea } from "@ui-sdk-ds/ui/components/scroll-area"
import { Separator } from "@ui-sdk-ds/ui/components/separator"
import { Slider } from "@ui-sdk-ds/ui/components/slider"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@ui-sdk-ds/ui/components/tabs"
import { Textarea } from "@ui-sdk-ds/ui/components/textarea"
import { Toggle } from "@ui-sdk-ds/ui/components/toggle"
import { ToggleGroup, ToggleGroupItem } from "@ui-sdk-ds/ui/components/toggle-group"
import { Button } from "@ui-sdk-ds/ui/components/button"
import { Checkbox } from "@ui-sdk-ds/ui/components/checkbox"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@ui-sdk-ds/ui/components/collapsible"
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@ui-sdk-ds/ui/components/context-menu"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui-sdk-ds/ui/components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@ui-sdk-ds/ui/components/drawer"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@ui-sdk-ds/ui/components/dropdown-menu"
import { Field, FieldDescription, FieldLabel } from "@ui-sdk-ds/ui/components/field"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@ui-sdk-ds/ui/components/hover-card"
import { Input, InputGroup } from "@ui-sdk-ds/ui/components/input"
import { Item, ItemContent, ItemTitle } from "@ui-sdk-ds/ui/components/item"
import { Label } from "@ui-sdk-ds/ui/components/label"
import {
  Popover,
  PopoverContent,
  PopoverTitle,
  PopoverTrigger,
} from "@ui-sdk-ds/ui/components/popover"
import { RadioGroup, RadioGroupItem } from "@ui-sdk-ds/ui/components/radio-group"
import { ResizablePanel, ResizablePanelGroup } from "@ui-sdk-ds/ui/components/resizable"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui-sdk-ds/ui/components/select"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTitle,
  SheetTrigger,
} from "@ui-sdk-ds/ui/components/sheet"
import { Switch } from "@ui-sdk-ds/ui/components/switch"
import { Tooltip, TooltipContent, TooltipTrigger } from "@ui-sdk-ds/ui/components/tooltip"

function outline(root: Element) {
  const lines: Array<string> = []
  const walk = (el: Element, depth: number) => {
    const slot = el.getAttribute("data-slot")
    const className = el.getAttribute("class")
    lines.push(
      `${"  ".repeat(depth)}<${el.tagName.toLowerCase()}${slot ? ` slot=${slot}` : ""}>${className ? ` ${className}` : ""}`,
    )
    for (const child of el.children) walk(child, depth + 1)
  }
  for (const child of root.children) walk(child, 0)
  return lines.join("\n")
}

async function snapshot(ui: ReactNode) {
  const view = render(ui)
  await act(async () => {
    await new Promise<void>((resolve) => {
      setTimeout(resolve, 0)
    })
  })
  return outline(view.baseElement)
}

const fixtures = {
  button: () => (
    <>
      <Button>Save</Button>
      <Badge variant="outline">New</Badge>
    </>
  ),
  dialog: () => (
    <Dialog defaultOpen>
      <DialogTrigger render={<Button variant="outline" />}>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Title</DialogTitle>
          <DialogDescription>Description</DialogDescription>
        </DialogHeader>
        <DialogFooter showCloseButton>
          <DialogClose>Done</DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  ),
  "alert-dialog": () => (
    <AlertDialog defaultOpen>
      <AlertDialogTrigger>Delete</AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete project?</AlertDialogTitle>
          <AlertDialogDescription>This cannot be undone.</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Delete forever</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ),
  sheet: () => (
    <Sheet defaultOpen>
      <SheetTrigger>Open sheet</SheetTrigger>
      <SheetContent>
        <SheetTitle>Sheet</SheetTitle>
        <SheetClose>Close sheet</SheetClose>
      </SheetContent>
    </Sheet>
  ),
  drawer: () => (
    <Drawer defaultOpen>
      <DrawerTrigger>Open drawer</DrawerTrigger>
      <DrawerContent>
        <DrawerTitle>Drawer</DrawerTitle>
        <DrawerClose>Close drawer</DrawerClose>
      </DrawerContent>
    </Drawer>
  ),
  popover: () => (
    <Popover defaultOpen>
      <PopoverTrigger>Details</PopoverTrigger>
      <PopoverContent>
        <PopoverTitle>Details</PopoverTitle>
      </PopoverContent>
    </Popover>
  ),
  "hover-card": () => (
    <HoverCard defaultOpen>
      <HoverCardTrigger href="#">Profile</HoverCardTrigger>
      <HoverCardContent>Card</HoverCardContent>
    </HoverCard>
  ),
  tooltip: () => (
    <Tooltip defaultOpen>
      <TooltipTrigger>Hint</TooltipTrigger>
      <TooltipContent>Tip</TooltipContent>
    </Tooltip>
  ),
  "dropdown-menu": () => (
    <DropdownMenu defaultOpen>
      <DropdownMenuTrigger>Actions</DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Group</DropdownMenuLabel>
          <DropdownMenuItem>
            <Item size="xs">
              <ItemContent>
                <ItemTitle>Item</ItemTitle>
              </ItemContent>
            </Item>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuRadioGroup defaultValue="a">
          <DropdownMenuRadioItem value="a">A</DropdownMenuRadioItem>
        </DropdownMenuRadioGroup>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>More</DropdownMenuSubTrigger>
          <DropdownMenuSubContent>
            <DropdownMenuItem>Nested</DropdownMenuItem>
          </DropdownMenuSubContent>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  ),
  "context-menu": () => (
    <ContextMenu defaultOpen>
      <ContextMenuTrigger>Area</ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuGroup>
          <ContextMenuItem>Copy</ContextMenuItem>
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  ),
  select: () => (
    <Field>
      <FieldLabel>Fruit</FieldLabel>
      <Select defaultOpen defaultValue="apple">
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="apple">Apple</SelectItem>
        </SelectContent>
      </Select>
    </Field>
  ),
  field: () => (
    <>
      <Field>
        <FieldLabel>Name</FieldLabel>
        <Input />
        <FieldDescription>Your name</FieldDescription>
      </Field>
      <Field orientation="horizontal">
        <Checkbox />
        <FieldLabel>Accept</FieldLabel>
      </Field>
      <Field orientation="horizontal">
        <Switch />
        <Label>Notify</Label>
      </Field>
      <RadioGroup defaultValue="a" aria-label="Choice">
        <RadioGroupItem value="a" aria-label="A" />
      </RadioGroup>
    </>
  ),
  collapsible: () => (
    <Collapsible defaultOpen>
      <CollapsibleTrigger>Toggle</CollapsibleTrigger>
      <CollapsibleContent>Panel</CollapsibleContent>
    </Collapsible>
  ),
  resizable: () => (
    <ResizablePanelGroup>
      <ResizablePanel>One</ResizablePanel>
    </ResizablePanelGroup>
  ),
  tabs: () => (
    <Tabs defaultValue="a">
      <TabsList>
        <TabsTrigger value="a">A</TabsTrigger>
        <TabsTrigger value="b">B</TabsTrigger>
      </TabsList>
      <TabsContent value="a">Panel A</TabsContent>
    </Tabs>
  ),
  accordion: () => (
    <Accordion defaultValue={["a"]}>
      <AccordionItem value="a">
        <AccordionTrigger>Section</AccordionTrigger>
        <AccordionContent>Body</AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
  controls: () => (
    <>
      <Slider defaultValue={[20]} aria-label="Volume" />
      <Progress value={40} aria-label="Upload" />
      <Separator />
      <Textarea aria-label="Notes" />
      <Toggle aria-label="Bold">B</Toggle>
      <ToggleGroup defaultValue={["a"]}>
        <ToggleGroupItem value="a" aria-label="A">
          A
        </ToggleGroupItem>
      </ToggleGroup>
      <Avatar>
        <AvatarFallback>GS</AvatarFallback>
      </Avatar>
      <ScrollArea className="h-10">Scrollable</ScrollArea>
    </>
  ),
  "input-otp": () => (
    <InputOTP maxLength={2} aria-label="Code">
      <InputOTPGroup>
        <InputOTPSlot index={0} />
        <InputOTPSlot index={1} />
      </InputOTPGroup>
    </InputOTP>
  ),
  combobox: () => (
    <Combobox items={["Apple", "Pear"]} defaultOpen>
      <InputGroup>
        <ComboboxInput aria-label="Fruit" />
        <ComboboxTrigger />
      </InputGroup>
      <ComboboxContent>
        <ComboboxEmpty>None</ComboboxEmpty>
        <ComboboxList>
          {(item: string) => (
            <ComboboxItem key={item} value={item}>
              {item}
            </ComboboxItem>
          )}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  ),
  command: () => (
    <Command>
      <CommandInput aria-label="Search commands" placeholder="Search" />
      <CommandList>
        <CommandEmpty>Nothing</CommandEmpty>
        <CommandGroup heading="Actions">
          <CommandItem>
            Open
            <CommandShortcut>⌘O</CommandShortcut>
          </CommandItem>
        </CommandGroup>
      </CommandList>
    </Command>
  ),
  calendar: () => <Calendar defaultMonth={new Date(2026, 0, 1)} />,
  "navigation-menu": () => (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          <NavigationMenuLink href="#">Home</NavigationMenuLink>
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  ),
  menubar: () => (
    <Menubar>
      <MenubarMenu defaultOpen>
        <MenubarTrigger>File</MenubarTrigger>
        <MenubarContent>
          <MenubarItem>New</MenubarItem>
        </MenubarContent>
      </MenubarMenu>
    </Menubar>
  ),
  carousel: () => (
    <Carousel aria-label="Featured projects">
      <CarouselContent>
        <CarouselItem>One</CarouselItem>
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  ),
} satisfies Record<string, () => ReactNode>

describe("rendered structure", () => {
  for (const [name, fixture] of Object.entries(fixtures)) {
    test(name, async () => {
      expect(await snapshot(fixture())).toMatchSnapshot()
    })
  }
})
