import {
  Bot,
  BookOpen,
  Code2,
  Compass,
  Cpu,
  FlaskConical,
  Terminal,
  Users,
  type LucideIcon,
} from "lucide-react";

/** Maps the plain-string icon names used in content/data/*.json to Lucide components. */
export const ICON_MAP: Record<string, LucideIcon> = {
  cpu: Cpu,
  "code-2": Code2,
  users: Users,
  "book-open": BookOpen,
  bot: Bot,
  terminal: Terminal,
  "flask-conical": FlaskConical,
  compass: Compass,
};
