"use client";

// react
import React from "@/lib/react";

// components
import AccordionPrimitive from "@/lib/radix-ui/react-accordion";

// icons
import { ChevronDown } from "@/lib/lucide-react";

// utils
import { cn } from "@/lib/utils";

const Accordion = AccordionPrimitive.Root;

const AccordionItem = React.forwardRef<
  React.ElementRef<typeof AccordionPrimitive.Item>,
  React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item>
>(({ className, ...props }, ref) => (
  <AccordionPrimitive.Item ref={ref} className={cn("", className)} {...props} />
));
AccordionItem.displayName = "AccordionItem";

interface CustomElementRef
  extends React.ElementRef<typeof AccordionPrimitive.Trigger> {
  active: boolean;
}

interface CustomComponentPropsWithoutRef
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> {
  active: boolean;
}

const AccordionTrigger = React.forwardRef<
  CustomElementRef,
  CustomComponentPropsWithoutRef
>(({ className, children, active, ...props }, ref) => (
  <AccordionPrimitive.Header className="flex">
    <div
      className={cn(
        "mb-2 inline-flex h-10 w-full items-center justify-start rounded-md px-4 py-2 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        { "bg-accent text-accent-foreground": active },
      )}
    >
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 font-medium transition-all [&[data-state=open]>svg]:rotate-180",
          className,
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-4 w-4 shrink-0 transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </div>
  </AccordionPrimitive.Header>
));

AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

interface CustomElementRefContent
  extends React.ElementRef<typeof AccordionPrimitive.Content> {
  active: boolean;
}

interface CustomComponentPropsWithoutRefContent
  extends React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> {
  active: boolean;
}

const AccordionContent = React.forwardRef<
  CustomElementRefContent,
  CustomComponentPropsWithoutRefContent
>(({ className, children, active, ...props }, ref) => (
  <AccordionPrimitive.Content
    ref={ref}
    className={cn(
      "overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down",
      className,
    )}
    {...props}
  >
    <div
      className={cn(
        "inline-flex h-10 w-full items-center justify-start rounded-md py-2 pl-8 pr-4 text-sm font-medium ring-offset-background transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
        { "bg-accent text-accent-foreground": active },
      )}
    >
      {children}
    </div>
  </AccordionPrimitive.Content>
));
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };
