import ftcData from "@/content/data/ftc.json";

export interface FtcAward {
  type: string;
  placement: number;
  event: string;
}

export interface FtcEvent {
  eventCode: string;
  name: string;
  start: string;
  end: string;
  type: string;
}

export interface FtcSeason {
  season: number;
  events: FtcEvent[];
  awards: FtcAward[];
}

export interface FtcSnapshot {
  generatedAt: string;
  teamNumber: number;
  teamName: string;
  school: string;
  location: { city: string; state: string; country: string };
  rookieYear: number;
  sponsors: string[];
  seasons: FtcSeason[];
}

export function getFtcSnapshot(): FtcSnapshot {
  return ftcData as FtcSnapshot;
}

export function getLatestSeason(): FtcSeason | undefined {
  const { seasons } = getFtcSnapshot();
  return [...seasons].sort((a, b) => b.season - a.season)[0];
}

export function getTotalAwardCount(): number {
  return getFtcSnapshot().seasons.reduce((sum, s) => sum + s.awards.length, 0);
}
