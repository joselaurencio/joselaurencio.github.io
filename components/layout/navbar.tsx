"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search } from "lucide-react";

import { PRIMARY_NAV, SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface NavbarProps {
  onOpenPalette: () => void;
  onOpenMobileNav: () => void;
}

export function Navbar({ onOpenPalette, onOpenMobileNav }: NavbarProps) {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 border-b bg-void/85 backdrop-blur-md transition-colors",
        scrolled ? "border-border-hairline" : "border-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-[1280px] items-center justify-between px-5 sm:px-8 lg:px-16">
        <Link
          href="/"
          className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-primary"
        >
          {SITE.name}
        </Link>

        <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
          {PRIMARY_NAV.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative rounded-md px-3 py-2 text-body-sm transition-colors",
                  active ? "text-text-primary" : "text-text-secondary hover:text-text-primary"
                )}
              >
                {item.label}
                {active && (
                  <span className="absolute inset-x-3 -bottom-[1px] h-px bg-accent" aria-hidden />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenPalette}
            className="hidden items-center gap-2 rounded-md border border-border-hairline px-3 py-1.5 text-caption text-text-tertiary transition-colors hover:border-border-hairline-strong hover:text-text-secondary sm:flex"
          >
            <Search className="size-3.5" aria-hidden />
            <span>Search</span>
            <kbd className="rounded border border-border-hairline px-1.5 py-0.5 font-mono text-[0.6875rem]">
              ⌘K
            </kbd>
          </button>

          <Button
            variant="ghost"
            size="sm"
            className="sm:hidden"
            onClick={onOpenPalette}
            aria-label="Open command palette"
          >
            <Search className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden"
            onClick={onOpenMobileNav}
            aria-label="Open navigation menu"
          >
            <Menu className="size-4" />
          </Button>
        </div>
      </div>
    </header>
  );
}
