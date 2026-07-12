import githubData from "@/content/data/github.json";

export interface GitHubDay {
  date: string;
  count: number;
}

export interface GitHubRepo {
  name: string;
  url: string;
  stars: number;
  language: string;
}

export interface GitHubSnapshot {
  generatedAt: string;
  user: string;
  sample: boolean;
  contributionDays: GitHubDay[];
  topRepos: GitHubRepo[];
}

export function getGitHubSnapshot(): GitHubSnapshot {
  return githubData as GitHubSnapshot;
}

export function getRecentContributionTotal(days = 30): number {
  const snapshot = getGitHubSnapshot();
  return snapshot.contributionDays.slice(-days).reduce((sum, d) => sum + d.count, 0);
}
