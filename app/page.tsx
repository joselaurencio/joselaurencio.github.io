import Link from "next/link";
import { ArrowRight, CirclePlay, Cpu, ExternalLink, GitBranch, Mail } from "lucide-react";

import { getFeaturedProjects, getLatestNotebookEntries } from "@/lib/content";
import { getMissionData, getRecentMilestones } from "@/lib/mission";
import { getFtcSnapshot, getLatestSeason, getTotalAwardCount } from "@/lib/ftc";
import { getLatestVideo } from "@/lib/youtube";
import { getGitHubSnapshot, getRecentContributionTotal } from "@/lib/github";
import { SITE, SOCIAL_LINKS } from "@/lib/constants";
import { ICON_MAP } from "@/lib/icon-map";
import { formatDate } from "@/lib/utils";

import { Section } from "@/components/layout/section";
import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { StaggerGroup } from "@/components/motion/stagger-group";
import { SystemStatusBar } from "@/components/mission-control/system-status-bar";
import { MissionPanel } from "@/components/mission-control/mission-panel";
import { StatusIndicator, type Status } from "@/components/mission-control/status-indicator";
import { ProgressBar } from "@/components/mission-control/progress-bar";
import { Counter } from "@/components/mission-control/counter";
import { Sparkline } from "@/components/mission-control/sparkline";
import { ProjectCard } from "@/components/content/project-card";
import { NotebookEntryCard } from "@/components/content/notebook-entry-card";
import { TimelineItem } from "@/components/content/timeline-item";

export default function MissionControlPage() {
  const mission = getMissionData();
  const featuredProjects = getFeaturedProjects(3);
  const latestNotebook = getLatestNotebookEntries(3);
  const recentMilestones = getRecentMilestones(4);

  const ftc = getFtcSnapshot();
  const latestSeason = getLatestSeason();
  const totalAwards = getTotalAwardCount();

  const latestVideo = getLatestVideo();
  const github = getGitHubSnapshot();
  const recentCommits = getRecentContributionTotal(30);
  const sparklineData = github.contributionDays.slice(-30).map((d) => d.count);

  return (
    <>
      {/* 1. Status bar */}
      <Container>
        <SystemStatusBar />
      </Container>

      {/* 2. Hero */}
      <Section className="pb-12 pt-16 lg:pb-16 lg:pt-24">
        <ScrollReveal className="flex flex-col gap-6">
          <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-accent">
            Mission Control
          </span>
          <h1 className="max-w-3xl text-display font-semibold text-text-primary text-balance-pretty">
            {SITE.name}
          </h1>
          <p className="text-h4 font-normal text-text-secondary">Student · Builder · Future Engineer</p>
          <p className="max-w-2xl text-body-lg text-text-secondary">{SITE.missionStatement}</p>
          <div className="flex flex-wrap gap-3 pt-2">
            <Button asChild size="lg">
              <Link href="/projects">
                View Projects <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link href="/contact">Contact Me</Link>
            </Button>
          </div>
        </ScrollReveal>
      </Section>

      {/* 3. Current Mission */}
      <Section className="py-8 lg:py-12">
        <ScrollReveal>
          <MissionPanel className="flex flex-col gap-4">
            <div className="flex items-center justify-between gap-4">
              <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
                Current Mission
              </span>
              <StatusIndicator status="in-progress" />
            </div>
            <p className="max-w-3xl text-h4 font-normal text-text-primary">{mission.currentMission}</p>
            <ProgressBar percent={40} label="Season progress" tone="in-progress" className="max-w-sm" />
          </MissionPanel>
        </ScrollReveal>
      </Section>

      {/* 4. Current Objectives grid */}
      <Section className="py-8 lg:py-12">
        <h2 className="mb-6 text-h2 font-semibold text-text-primary">Current Objectives</h2>
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mission.objectives.map((objective) => {
            const Icon = ICON_MAP[objective.icon] ?? Cpu;
            return (
              <ScrollReveal key={objective.label}>
                <MissionPanel className="flex h-full flex-col gap-3">
                  <Icon className="size-5 text-accent" aria-hidden />
                  <h3 className="text-h4 font-medium text-text-primary">{objective.label}</h3>
                  <p className="flex-1 text-body-sm text-text-secondary">{objective.detail}</p>
                  {objective.progressPercent !== undefined && (
                    <ProgressBar percent={objective.progressPercent} />
                  )}
                </MissionPanel>
              </ScrollReveal>
            );
          })}
        </StaggerGroup>
      </Section>

      {/* 5. Engineering Systems overview */}
      <Section className="py-8 lg:py-12">
        <h2 className="mb-6 text-h2 font-semibold text-text-primary">Engineering Systems</h2>
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {mission.systems.map((system) => {
            const Icon = ICON_MAP[system.icon] ?? Cpu;
            return (
              <ScrollReveal key={system.name}>
                <Link href={system.href} className="block h-full">
                  <MissionPanel className="flex h-full flex-col gap-3 hover:border-border-hairline-strong">
                    <div className="flex items-center justify-between">
                      <Icon className="size-5 text-accent" aria-hidden />
                      <StatusIndicator status={system.status as Status} />
                    </div>
                    <h3 className="text-h4 font-medium text-text-primary">{system.name}</h3>
                    <p className="text-body-sm text-text-secondary">{system.summary}</p>
                  </MissionPanel>
                </Link>
              </ScrollReveal>
            );
          })}
        </StaggerGroup>
      </Section>

      {/* 6. Live telemetry strip */}
      <Section className="py-8 lg:py-12">
        <h2 className="mb-6 text-h2 font-semibold text-text-primary">Live Telemetry</h2>
        <StaggerGroup className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ScrollReveal>
            <Link href="/programming" className="block h-full">
              <MissionPanel className="flex h-full flex-col gap-3 hover:border-border-hairline-strong">
                <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
                  GitHub Activity
                </span>
                <Counter value={recentCommits} suffix=" commits" />
                <span className="text-caption text-text-tertiary">Last 30 days{github.sample ? " · sample data" : ""}</span>
                <Sparkline data={sparklineData} className="mt-auto" />
              </MissionPanel>
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <Link href="/robotics" className="block h-full">
              <MissionPanel className="flex h-full flex-col gap-3 hover:border-border-hairline-strong">
                <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
                  FTC Team #{ftc.teamNumber}
                </span>
                <Counter value={totalAwards} suffix=" awards" />
                <span className="text-caption text-text-tertiary">
                  {latestSeason ? `${latestSeason.awards.length} in the latest season` : "Season record"}
                </span>
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {latestSeason?.awards.slice(0, 3).map((award) => (
                    <Badge key={award.type} variant="accent">
                      {award.type}
                    </Badge>
                  ))}
                </div>
              </MissionPanel>
            </Link>
          </ScrollReveal>

          <ScrollReveal>
            <a href={latestVideo?.url ?? SOCIAL_LINKS.youtube} target="_blank" rel="noreferrer" className="block h-full">
              <MissionPanel className="flex h-full flex-col gap-3 hover:border-border-hairline-strong">
                <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-text-tertiary">
                  Latest Upload
                </span>
                {latestVideo && (
                  <>
                    <h3 className="text-body font-medium text-text-primary">{latestVideo.title}</h3>
                    <span className="text-caption text-text-tertiary">{formatDate(latestVideo.publishedAt)}</span>
                  </>
                )}
                <span className="mt-auto flex items-center gap-1.5 text-caption text-accent">
                  <CirclePlay className="size-3.5" /> @robocodex <ExternalLink className="size-3" />
                </span>
              </MissionPanel>
            </a>
          </ScrollReveal>
        </StaggerGroup>
      </Section>

      {/* 7. Featured Projects */}
      <Section className="py-8 lg:py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-h2 font-semibold text-text-primary">Featured Projects</h2>
          <Link href="/projects" className="flex items-center gap-1 text-body-sm text-text-secondary hover:text-accent">
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredProjects.map((project) => (
            <ScrollReveal key={project.slug}>
              <ProjectCard
                href={project.permalink}
                title={project.title}
                oneLiner={project.oneLiner}
                tags={project.tags}
                status={project.status}
                density="feature"
              />
            </ScrollReveal>
          ))}
        </StaggerGroup>
      </Section>

      {/* 8. Latest Notebook entries */}
      <Section className="py-8 lg:py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-h2 font-semibold text-text-primary">Engineering Notebook</h2>
          <Link href="/notebook" className="flex items-center gap-1 text-body-sm text-text-secondary hover:text-accent">
            View all <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <StaggerGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {latestNotebook.map((entry) => (
            <ScrollReveal key={entry.slug}>
              <NotebookEntryCard
                href={entry.permalink}
                date={entry.date}
                title={entry.title}
                excerpt={entry.excerpt}
                tags={entry.tags}
              />
            </ScrollReveal>
          ))}
        </StaggerGroup>
      </Section>

      {/* 9. Timeline teaser */}
      <Section className="py-8 lg:py-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-h2 font-semibold text-text-primary">Timeline</h2>
          <Link href="/timeline" className="flex items-center gap-1 text-body-sm text-text-secondary hover:text-accent">
            Full timeline <ArrowRight className="size-3.5" />
          </Link>
        </div>
        <ScrollReveal className="flex gap-6 overflow-x-auto pb-2">
          {recentMilestones.map((milestone) => (
            <TimelineItem key={milestone.title + milestone.date} milestone={milestone} compact />
          ))}
        </ScrollReveal>
      </Section>

      {/* 10. Contact band */}
      <Section className="py-16 lg:py-24">
        <ScrollReveal>
          <MissionPanel className="flex flex-col items-start gap-6 bg-panel-raised p-10 text-left lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-col gap-3">
              <span className="font-mono text-mono-label uppercase tracking-[0.06em] text-accent">
                Open Channel
              </span>
              <h2 className="max-w-xl text-h2 font-semibold text-text-primary">{SITE.missionStatement}</h2>
            </div>
            <div className="flex shrink-0 flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <a href={SOCIAL_LINKS.email}>
                  <Mail className="size-4" /> Contact Me
                </a>
              </Button>
              <Button asChild variant="secondary" size="lg">
                <a href={SOCIAL_LINKS.github} target="_blank" rel="noreferrer">
                  <GitBranch className="size-4" /> GitHub
                </a>
              </Button>
            </div>
          </MissionPanel>
        </ScrollReveal>
      </Section>
    </>
  );
}
