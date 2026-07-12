import type { Metadata } from "next";

import { fontVariables } from "@/lib/fonts";
import { SITE } from "@/lib/constants";
import { useCommandPaletteData } from "@/lib/hooks/use-command-palette-data";
import { AppChrome } from "@/components/layout/app-chrome";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.title,
    template: `%s — ${SITE.name}`,
  },
  description: SITE.description,
  openGraph: {
    title: SITE.title,
    description: SITE.description,
    url: SITE.url,
    siteName: SITE.name,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SITE.title,
    description: SITE.description,
  },
};

// Applied before hydration so the persisted theme choice never flashes the
// wrong theme on load (dark is the default in the absence of a stored value).
const THEME_INIT_SCRIPT = `
(function () {
  try {
    var stored = localStorage.getItem('theme');
    if (stored === 'light') document.documentElement.setAttribute('data-theme', 'light');
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const paletteItems = useCommandPaletteData();

  return (
    <html lang="en" className={fontVariables}>
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT_SCRIPT }} />
      </head>
      <body>
        <AppChrome paletteItems={paletteItems}>{children}</AppChrome>
      </body>
    </html>
  );
}
