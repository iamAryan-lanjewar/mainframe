/**
 * Computes the displayed substring and completion status for a typewriter effect.
 */
export function getTypewriterSlice(text: string, count: number): { displayed: string; done: boolean } {
  if (count <= 0) {
    return { displayed: '', done: false };
  }
  if (count >= text.length) {
    return { displayed: text, done: true };
  }
  return {
    displayed: text.slice(0, count),
    done: false,
  };
}

/**
 * Calculates new target time for video scrubbing based on horizontal cursor delta.
 * (delta / window.innerWidth) * SENSITIVITY * video.duration
 * Clamped between 0 and duration.
 */
export function calculateTargetScrubTime(
  currentTime: number,
  deltaX: number,
  windowWidth: number,
  duration: number,
  sensitivity: number = 0.8
): number {
  if (!duration || duration <= 0 || !windowWidth || windowWidth <= 0) {
    return currentTime;
  }
  const timeOffset = (deltaX / windowWidth) * sensitivity * duration;
  const target = currentTime + timeOffset;
  return Math.max(0, Math.min(duration, target));
}
