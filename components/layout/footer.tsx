import Link from "next/link";
import { GitBranch, CirclePlay, Briefcase, Mail, ExternalLink } from "lucide-react";

import { PRIMARY_NAV, SECONDARY_NAV, SITE, SOCIAL_LINKS } from "@/lib/constants";
import { StatusIndicator } from "@/components/mission-control/status-indicator";
import { Container } from "./container";

const BUILD_TIMESTAMP = new Date().toISOString();

export function Footer() {
  return (
    <footer className="border-t border-border-hairline bg-void">
      <Container className="flex flex-col gap-12 py-16 lg:py-24">
        <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
          <div className="col-span-2 flex flex-col gap-3 sm:col-span-1">
            <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
              {SITE.name}
            </span>
            <p className="text-body-sm text-text-secondary">{SITE.missionStatement}</p>
          </div>

          <FooterColumn title="Sitemap" links={PRIMARY_NAV} />
          <FooterColumn title="More" links={SECONDARY_NAV} />

          <div className="flex flex-col gap-3">
            <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
              Elsewhere
            </span>
            <SocialLink href={SOCIAL_LINKS.github} label="GitHub" icon={GitBranch} />
            <SocialLink href={SOCIAL_LINKS.youtube} label="YouTube — @robocodex" icon={CirclePlay} />
            <SocialLink href={SOCIAL_LINKS.linkedin} label="LinkedIn" icon={Briefcase} />
            <SocialLink href={SOCIAL_LINKS.email} label="Email" icon={Mail} />
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-border-hairline pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <StatusIndicator status="nominal" label="System Status: Operational" />
          </div>
          <p className="font-mono text-mono-label text-text-tertiary">
            Built with Next.js · deployed via GitHub Actions · last build {formatBuildTime(BUILD_TIMESTAMP)}
          </p>
        </div>
      </Container>
    </footer>
  );
}

function FooterColumn({
  title,
  links,
}: {
  title: string;
  links: ReadonlyArray<{ label: string; href: string }>;
}) {
  return (
    <div className="flex flex-col gap-3">
      <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
        {title}
      </span>
      {links.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          className="text-body-sm text-text-secondary transition-colors hover:text-text-primary"
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
}

function SocialLink({
  href,
  label,
  icon: Icon,
}: {
  href: string;
  label: string;
  icon: typeof GitBranch;
}) {
  return (
    <a
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel={href.startsWith("mailto:") ? undefined : "noreferrer"}
      className="flex items-center gap-2 text-body-sm text-text-secondary transition-colors hover:text-text-primary"
    >
      <Icon className="size-3.5" aria-hidden />
      {label}
      {!href.startsWith("mailto:") && <ExternalLink className="size-3" aria-hidden />}
    </a>
  );
}

function formatBuildTime(iso: string) {
  return new Date(iso).toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}
