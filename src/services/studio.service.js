import { apiUrl } from "./api";

const videoCandidates = [
  import.meta.env.VITE_STUDIO_VIDEO_PATH,
  "studio.mp4",
  "videos/studio.mp4",
  "video/studio.mp4",
].filter(Boolean);

const canReachVideo = async (url) => {
  try {
    const response = await fetch(url, { method: "HEAD" });
    return response.ok;
  } catch {
    return false;
  }
};

export const fetchStudioVideoUrl = async () => {
  for (const path of videoCandidates) {
    const candidateUrl = apiUrl(path);
    const reachable = await canReachVideo(candidateUrl);
    if (reachable) {
      return candidateUrl;
    }
  }

  return null;
};
