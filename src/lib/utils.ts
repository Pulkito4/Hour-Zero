import { clsx, type ClassValue } from "clsx"
import { collection, getDocs, query, where } from "firebase/firestore";
import { twMerge } from "tailwind-merge"
import { db } from "./firebase.config";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleCopy = () => {
  try {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/')[2]; // Get domain without protocol
    const fullBaseUrl = `${window.location.protocol}//${baseUrl}`;

    navigator.clipboard.writeText(fullBaseUrl);
    // alert("URL copied to clipboard!\nNow you can share it with your friends.");
  } catch (error) {
    console.error("Failed to copy URL:", error);
    // alert("Failed to copy URL");
  }
};

export const redirectGithub = () => {
  window.open("https://github.com/Pulkito4/Hour-Zero");
};

export const getVideoId = (url: string): string | null => {
  try {
    // Handle playlist URLs
    const playlistMatch = url.match(/[&?]list=([a-zA-Z0-9_-]+)/);
    if (playlistMatch) {
      return `playlist/${playlistMatch[1]}`;
    }

    // Handle video URLs
    const videoMatch = url.match(/(?:youtu\.be\/|youtube\.com(?:\/embed\/|\/v\/|\/watch\?v=|\/watch\?.+&v=))([\w-]{11})/);
    if (videoMatch) {
      return videoMatch[1];
    }

    return null;
  } catch (error) {
    console.error('Error processing YouTube URL:', error);
    return null;
  }
};

export const getCleanUrl = (url: string): string | null => {
  const videoId = getVideoId(url);
  if (!videoId) return null;

  if (videoId.startsWith('playlist/')) {
    const playlistId = videoId.replace('playlist/', '');
    return `https://www.youtube.com/playlist?list=${playlistId}`;
  }

  return `https://www.youtube.com/watch?v=${videoId}`;
};

export const getEmbedUrl = (url: string): string => {
  const videoId = getVideoId(url);
  if (!videoId) return url;

  if (videoId.startsWith('playlist/')) {
    const playlistId = videoId.replace('playlist/', '');
    return `https://www.youtube.com/embed/videoseries?list=${playlistId}`;
  }

  return `https://www.youtube.com/embed/${videoId}`;
};

export const getYearFromSemester = (semester: number): string => {
  if (semester === 1 || semester === 2) return "1st yr";
  if (semester === 3 || semester === 4) return "2nd yr";
  if (semester === 5 || semester === 6) return "3rd yr";
  if (semester === 7 || semester === 8) return "4th yr";
  return "";
};


export const checkAuthorizedUser = async (email: string): Promise<boolean> => {
    const q = query(
      collection(db, "authorizedUsers"),
      where("email", "==", email.toLowerCase())
    );
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  };