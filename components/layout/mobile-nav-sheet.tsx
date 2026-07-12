"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { PRIMARY_NAV, SECONDARY_NAV } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Sheet, SheetContent, SheetTitle } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";

interface MobileNavSheetProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function MobileNavSheet({ open, onOpenChange }: MobileNavSheetProps) {
  const pathname = usePathname();

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent side="right">
        <SheetTitle>Navigate</SheetTitle>
        <nav className="flex flex-col gap-1" aria-label="Mobile">
          {PRIMARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className={cn(
                "rounded-md px-3 py-2.5 text-body",
                pathname === item.href
                  ? "bg-accent-muted text-text-primary"
                  : "text-text-secondary hover:bg-panel hover:text-text-primary"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Separator />
        <nav className="flex flex-col gap-1" aria-label="More">
          {SECONDARY_NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => onOpenChange(false)}
              className="rounded-md px-3 py-2.5 text-body-sm text-text-tertiary hover:bg-panel hover:text-text-secondary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
