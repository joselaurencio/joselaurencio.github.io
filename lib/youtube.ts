import youtubeData from "@/content/data/youtube.json";

export interface YouTubeVideo {
  id: string;
  title: string;
  publishedAt: string;
  thumbnail: string;
  url: string;
}

export interface YouTubeSnapshot {
  generatedAt: string;
  channelId: string;
  channelTitle: string;
  channelUrl: string;
  latestVideos: YouTubeVideo[];
}

export function getYouTubeSnapshot(): YouTubeSnapshot {
  return youtubeData as YouTubeSnapshot;
}

export function getLatestVideo(): YouTubeVideo | undefined {
  return getYouTubeSnapshot().latestVideos[0];
}
