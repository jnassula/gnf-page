"use client";

import * as React from "react";
import * as TabsPrimitive from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";

const Tabs = TabsPrimitive.Root;

const TabsList = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(
      "inline-flex h-10 w-full items-center justify-stretch rounded-[var(--radius-md)] bg-surface-sunken p-1 text-foreground-muted",
      className
    )}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Trigger
    ref={ref}
    className={cn(
      "flex-1 inline-flex items-center justify-center whitespace-nowrap rounded-[var(--radius-sm)] px-3 py-1.5 text-[13px] font-medium transition-all duration-[var(--dur-fast)] ease-[var(--ease-out)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ring)] disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:shadow-[var(--shadow-sm)]",
      className
    )}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<
  React.ElementRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(
      "mt-4 focus-visible:outline-none data-[state=inactive]:hidden",
      className
    )}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
