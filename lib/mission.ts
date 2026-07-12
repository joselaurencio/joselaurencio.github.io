import missionData from "@/content/data/mission.json";
import timelineData from "@/content/data/timeline.json";

export interface MissionObjective {
  label: string;
  detail: string;
  progressPercent?: number;
  icon: string;
}

export interface MissionGoal {
  label: string;
  target: string;
  progressPercent: number;
  category: "robotics" | "programming" | "personal" | "academic";
}

export interface MissionData {
  currentMission: string;
  objectives: MissionObjective[];
  goals: MissionGoal[];
  systems: {
    name: string;
    status: "nominal" | "in-progress" | "planned";
    summary: string;
    href: string;
    icon: string;
  }[];
}

export interface TimelineMilestone {
  date: string;
  title: string;
  category: "robotics" | "programming" | "leadership" | "personal" | "academic";
  description: string;
  relatedProjectSlug?: string;
}

export function getMissionData(): MissionData {
  return missionData as MissionData;
}

export function getTimelineMilestones(): TimelineMilestone[] {
  return (timelineData as TimelineMilestone[]).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getRecentMilestones(limit = 4): TimelineMilestone[] {
  return getTimelineMilestones().slice(0, limit);
}
