import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const handleCopy = () => {
  try {
    const currentUrl = window.location.href;
    const baseUrl = currentUrl.split('/')[2]; // Get domain without protocol
    const fullBaseUrl = `${window.location.protocol}//${baseUrl}`;

    navigator.clipboard.writeText(fullBaseUrl);
    alert("URL copied to clipboard!\nNow you can share it with your friends.");
  } catch (error) {
    console.error("Failed to copy URL:", error);
    alert("Failed to copy URL");
  }
};

export const redirectGithub = () => {
  window.open("https://github.com/Pulkito4/Hour-Zero");
};