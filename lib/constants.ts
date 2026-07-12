export const SITE = {
  name: "Jose Laurencio",
  title: "Jose Laurencio — Mission Control",
  description:
    "Student, builder, future engineer. Robotics, software, and research — problems, constraints, iterations, and results.",
  url: "https://joselaurencio.github.io",
  missionStatement:
    "Relentlessly pursuing excellence through engineering, continuous learning, and purposeful creation.",
};

export const PRIMARY_NAV = [
  { label: "Mission Control", href: "/" },
  { label: "Projects", href: "/projects" },
  { label: "Notebook", href: "/notebook" },
  { label: "Robotics", href: "/robotics" },
  { label: "Research", href: "/research" },
  { label: "Timeline", href: "/timeline" },
  { label: "Contact", href: "/contact" },
] as const;

export const SECONDARY_NAV = [
  { label: "Programming", href: "/programming" },
  { label: "Books", href: "/books" },
  { label: "Dashboard", href: "/dashboard" },
] as const;

export const SOCIAL_LINKS = {
  // TODO(jose): confirm actual GitHub username and swap this placeholder —
  // it was never provided, so it's a guess, not verified data.
  github: "https://github.com/joselaurencio",
  youtube: "https://www.youtube.com/@robocodex",
  ftcScout: "https://ftcscout.org/teams/24813",
  email: "mailto:pralaurencio@gmail.com",
} as const;

export const KEYBOARD_SHORTCUTS = [
  { keys: ["⌘", "K"], description: "Open command palette" },
  { keys: ["G", "H"], description: "Go to Mission Control" },
  { keys: ["G", "P"], description: "Go to Projects" },
  { keys: ["G", "N"], description: "Go to Notebook" },
  { keys: ["G", "R"], description: "Go to Robotics" },
  { keys: ["G", "T"], description: "Go to Timeline" },
  { keys: ["G", "C"], description: "Go to Contact" },
  { keys: ["?"], description: "Show this cheat sheet" },
  { keys: ["Esc"], description: "Close dialog / palette" },
] as const;
