"use client";

import { useRouter } from "next/navigation";
import { CirclePlay, Copy, GitBranch, Moon, Sun } from "lucide-react";

import type { CommandPaletteItem } from "@/lib/hooks/use-command-palette-data";
import { SOCIAL_LINKS } from "@/lib/constants";
import {
  CommandDialog,
  CommandEmpty,
  CommandFooter,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface CommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  items: CommandPaletteItem[];
  theme: "dark" | "light";
  onToggleTheme: () => void;
}

export function CommandPalette({ open, onOpenChange, items, theme, onToggleTheme }: CommandPaletteProps) {
  const router = useRouter();

  const go = (href: string) => {
    onOpenChange(false);
    router.push(href);
  };

  const groups: CommandPaletteItem["group"][] = ["Pages", "Projects", "Notebook"];

  return (
    <CommandDialog open={open} onOpenChange={onOpenChange}>
      <CommandInput placeholder="Search Mission Control..." />
      <CommandList>
        <CommandEmpty>No results. Try a broader term.</CommandEmpty>

        {groups.map((group) => {
          const groupItems = items.filter((item) => item.group === group);
          if (groupItems.length === 0) return null;
          return (
            <CommandGroup key={group} heading={group}>
              {groupItems.map((item) => (
                <CommandItem key={item.href} value={`${item.label} ${item.meta ?? ""}`} onSelect={() => go(item.href)}>
                  <div className="flex flex-col">
                    <span>{item.label}</span>
                    {item.meta && <span className="text-caption text-text-tertiary">{item.meta}</span>}
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          );
        })}

        <CommandGroup heading="Actions">
          <CommandItem
            value="toggle theme dark light"
            onSelect={() => {
              onToggleTheme();
              onOpenChange(false);
            }}
          >
            {theme === "dark" ? <Sun className="size-4" /> : <Moon className="size-4" />}
            Switch to {theme === "dark" ? "light" : "dark"} theme
          </CommandItem>
          <CommandItem
            value="copy email contact"
            onSelect={() => {
              navigator.clipboard.writeText(SOCIAL_LINKS.email.replace("mailto:", ""));
              onOpenChange(false);
            }}
          >
            <Copy className="size-4" />
            Copy email address
          </CommandItem>
          <CommandItem
            value="github repository"
            onSelect={() => {
              onOpenChange(false);
              window.open(SOCIAL_LINKS.github, "_blank", "noreferrer");
            }}
          >
            <GitBranch className="size-4" />
            Open GitHub
          </CommandItem>
          <CommandItem
            value="youtube robocodex"
            onSelect={() => {
              onOpenChange(false);
              window.open(SOCIAL_LINKS.youtube, "_blank", "noreferrer");
            }}
          >
            <CirclePlay className="size-4" />
            Open YouTube — @robocodex
          </CommandItem>
        </CommandGroup>
      </CommandList>
      <CommandFooter>
        <span>↑↓ navigate</span>
        <span>↵ select</span>
        <span>esc close</span>
      </CommandFooter>
    </CommandDialog>
  );
}
