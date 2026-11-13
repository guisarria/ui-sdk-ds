import { Textarea as TextareaPrimitive } from "@ui-sdk/react/textarea"
import { cn } from "cn"
import type { PrimitiveProps } from "@ui-sdk-ds/ui/lib/parts"

function Textarea({ className, ...props }: PrimitiveProps<typeof TextareaPrimitive>) {
  return (
    <TextareaPrimitive
      className={cn(
        "flex field-sizing-content min-h-16 w-full resize-none rounded-2xl border border-transparent bg-input/50 px-2.5 py-2 text-base transition-[color,box-shadow] duration-200 outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/30 disabled:cursor-not-allowed disabled:opacity-50 aria-invalid:border-destructive aria-invalid:ring-3 aria-invalid:ring-destructive/20 md:text-sm dark:aria-invalid:border-destructive/50 dark:aria-invalid:ring-destructive/40",
        "in-data-[slot=input-group]:flex-1 in-data-[slot=input-group]:rounded-none in-data-[slot=input-group]:border-0 in-data-[slot=input-group]:bg-transparent in-data-[slot=input-group]:shadow-none in-data-[slot=input-group]:ring-0 in-data-[slot=input-group]:focus-visible:ring-0 in-data-[slot=input-group]:aria-invalid:ring-0 in-data-[slot=input-group]:dark:bg-transparent",
        className,
      )}
      {...props}
    />
  )
}

export { Textarea }
export { createInputController } from "@ui-sdk/react/textarea"
