"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";

import { useCommandPaletteData } from "@/lib/hooks/use-command-palette-data";
import { useKeyboardShortcuts } from "@/lib/hooks/use-keyboard-shortcuts";
import { useTheme } from "@/lib/hooks/use-theme";
import { KEYBOARD_SHORTCUTS } from "@/lib/constants";
import { SkipLink } from "./skip-link";
import { Navbar } from "./navbar";
import { Footer } from "./footer";
import { MobileNavSheet } from "./mobile-nav-sheet";
import { CommandPalette } from "./command-palette";
import { PageTransition } from "@/components/motion/page-transition";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";

interface AppChromeProps {
  children: React.ReactNode;
  paletteItems: ReturnType<typeof useCommandPaletteData>;
}

export function AppChrome({ children, paletteItems }: AppChromeProps) {
  const [paletteOpen, setPaletteOpen] = useState(false);
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [cheatSheetOpen, setCheatSheetOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useKeyboardShortcuts({
    onOpenPalette: () => setPaletteOpen(true),
    onOpenCheatSheet: () => setCheatSheetOpen(true),
  });

  return (
    <>
      <SkipLink />
      <Navbar onOpenPalette={() => setPaletteOpen(true)} onOpenMobileNav={() => setMobileNavOpen(true)} />
      <AnimatePresence mode="wait">
        <PageTransition key="main">
          <main id="main-content">{children}</main>
        </PageTransition>
      </AnimatePresence>
      <Footer />

      <MobileNavSheet open={mobileNavOpen} onOpenChange={setMobileNavOpen} />
      <CommandPalette
        open={paletteOpen}
        onOpenChange={setPaletteOpen}
        items={paletteItems}
        theme={theme}
        onToggleTheme={toggleTheme}
      />

      <Dialog open={cheatSheetOpen} onOpenChange={setCheatSheetOpen}>
        <DialogContent>
          <DialogTitle>Keyboard shortcuts</DialogTitle>
          <DialogDescription>Mission Control is fully keyboard-navigable.</DialogDescription>
          <ul className="mt-4 flex flex-col gap-2.5">
            {KEYBOARD_SHORTCUTS.map((shortcut) => (
              <li key={shortcut.description} className="flex items-center justify-between text-body-sm">
                <span className="text-text-secondary">{shortcut.description}</span>
                <span className="flex gap-1">
                  {shortcut.keys.map((key) => (
                    <kbd
                      key={key}
                      className="rounded border border-border-hairline px-1.5 py-0.5 font-mono text-caption text-text-primary"
                    >
                      {key}
                    </kbd>
                  ))}
                </span>
              </li>
            ))}
          </ul>
        </DialogContent>
      </Dialog>
    </>
  );
}
