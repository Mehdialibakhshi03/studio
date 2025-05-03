
"use client"

import * as React from "react"
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group"
// Removed Circle import as it's not needed for the improved design

import { cn } from "@/lib/utils"

const RadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Root>
>(({ className, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn("grid gap-2", className)} // Keep gap for general layout
      {...props}
      ref={ref}
    />
  )
})
RadioGroup.displayName = RadioGroupPrimitive.Root.displayName

const RadioGroupItem = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof RadioGroupPrimitive.Item>
>(({ className, children, ...props }, ref) => { // Accept children for label association
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        // Base styling for the hidden radio input
        "peer aspect-square h-4 w-4 rounded-full border border-primary text-primary ring-offset-background focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
        // This is the hidden native radio button. The parent Label is styled instead.
        "sr-only", // Hide it visually but keep it accessible
        className
      )}
      {...props}
    >
       {/* Indicator can be removed if styling is purely on the Label */}
      {/* <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
         <div className="h-2.5 w-2.5 rounded-full bg-primary-foreground data-[state=unchecked]:bg-transparent" />
       </RadioGroupPrimitive.Indicator> */}
       {/* Render children (typically the Label) if provided - Though the Label should wrap this */}
       {children}
    </RadioGroupPrimitive.Item>
  )
})
RadioGroupItem.displayName = RadioGroupPrimitive.Item.displayName

export { RadioGroup, RadioGroupItem }
