import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
export function hasTouchScreen(): boolean {
  if (typeof window === 'undefined') return false;
  
  if ("maxTouchPoints" in navigator) {
    return navigator.maxTouchPoints > 0;
  } else if ("msMaxTouchPoints" in navigator) {
    return (navigator as any).msMaxTouchPoints > 0;
  } 

  const mQ = window.matchMedia && window.matchMedia("(pointer:coarse)");
  if (mQ && mQ.media === "(pointer:coarse)") {
    return !!mQ.matches;
  } 
  
  if ('orientation' in window) {
    return true; // deprecated, but good fallback
  }

  // Only as a last resort, fall back to user agent sniffing
  const UA = (navigator as Navigator).userAgent;
  return (
    /\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(UA) ||
    /\b(Android|Windows Phone|iPad|iPod)\b/i.test(UA)
  );
}