"use client";

import * as React from "react";
import { Command as CommandPrimitive } from "cmdk";
import { Search } from "lucide-react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { cn } from "@/lib/utils";

function Command({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) {
  return (
    <CommandPrimitive
      className={cn(
        "flex h-full w-full flex-col overflow-hidden rounded-xl bg-panel-raised text-text-primary",
        className
      )}
      {...props}
    />
  );
}

function CommandDialog({
  children,
  title = "Command Palette",
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Root> & { title?: string }) {
  return (
    <DialogPrimitive.Root {...props}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay
          className={cn(
            "fixed inset-0 z-50 bg-void/70 backdrop-blur-sm transition-opacity duration-200 ease-out",
            "data-[state=closed]:opacity-0 data-[state=open]:opacity-100"
          )}
        />
        <DialogPrimitive.Content
          className={cn(
            "fixed left-1/2 top-[18vh] z-50 w-full max-w-xl -translate-x-1/2 overflow-hidden rounded-xl border border-border-hairline bg-panel-raised shadow-2xl",
            "transition-[opacity,transform] duration-200 ease-out",
            "data-[state=closed]:scale-95 data-[state=closed]:opacity-0 data-[state=open]:scale-100 data-[state=open]:opacity-100"
          )}
        >
          <DialogPrimitive.Title className="sr-only">{title}</DialogPrimitive.Title>
          <Command>{children}</Command>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}

function CommandInput({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Input>) {
  return (
    <div className="flex items-center gap-3 border-b border-border-hairline px-4">
      <Search className="size-4 shrink-0 text-text-tertiary" aria-hidden />
      <CommandPrimitive.Input
        className={cn(
          "flex h-14 w-full bg-transparent text-body outline-none placeholder:text-text-tertiary",
          className
        )}
        {...props}
      />
    </div>
  );
}

function CommandList({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.List>) {
  return (
    <CommandPrimitive.List
      className={cn("max-h-80 overflow-y-auto overflow-x-hidden p-2", className)}
      {...props}
    />
  );
}

function CommandEmpty(props: React.ComponentProps<typeof CommandPrimitive.Empty>) {
  return (
    <CommandPrimitive.Empty className="py-8 text-center text-body-sm text-text-tertiary" {...props} />
  );
}

function CommandGroup({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Group>) {
  return (
    <CommandPrimitive.Group
      className={cn(
        "overflow-hidden p-1 text-text-primary [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-mono-label [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.06em] [&_[cmdk-group-heading]]:text-text-tertiary",
        className
      )}
      {...props}
    />
  );
}

function CommandItem({ className, ...props }: React.ComponentProps<typeof CommandPrimitive.Item>) {
  return (
    <CommandPrimitive.Item
      className={cn(
        "flex cursor-pointer items-center gap-3 rounded-md px-3 py-2.5 text-body-sm text-text-secondary outline-none",
        "data-[selected=true]:bg-accent-muted data-[selected=true]:text-text-primary",
        className
      )}
      {...props}
    />
  );
}

function CommandFooter({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-4 border-t border-border-hairline px-4 py-2.5 font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary",
        className
      )}
      {...props}
    />
  );
}

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandFooter,
};
