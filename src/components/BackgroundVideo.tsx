import { useEffect, useRef } from 'react';
import { calculateTargetScrubTime } from '../utils/typewriter';

const VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260826_041744_63efcd78-bf7d-4039-99e2-2461e8a61903.mp4';
const SENSITIVITY = 0.8;

export function BackgroundVideo() {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const prevXRef = useRef<number | null>(null);
  const targetTimeRef = useRef<number>(0);
  const isSeekingRef = useRef<boolean>(false);

  // Check and dispatch seek if needed
  const checkAndSeek = () => {
    const video = videoRef.current;
    if (!video || !video.duration) return;
    if (isSeekingRef.current) return;

    const diff = Math.abs(video.currentTime - targetTimeRef.current);
    if (diff > 0.01) {
      isSeekingRef.current = true;
      video.currentTime = targetTimeRef.current;
    }
  };

  const handleSeeked = () => {
    isSeekingRef.current = false;
    checkAndSeek();
  };

  const handleLoadedMetadata = () => {
    const video = videoRef.current;
    if (video) {
      targetTimeRef.current = video.currentTime || 0;
      // Seek slightly forward to paint the initial frame if at 0
      if (video.currentTime === 0 && video.duration > 0) {
        video.currentTime = 0.01;
      }
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.load();
    }

    const handleMouseMove = (e: MouseEvent) => {
      const vid = videoRef.current;
      if (!vid || !vid.duration) return;

      if (prevXRef.current === null) {
        prevXRef.current = e.clientX;
        return;
      }

      const delta = e.clientX - prevXRef.current;
      prevXRef.current = e.clientX;

      targetTimeRef.current = calculateTargetScrubTime(
        targetTimeRef.current,
        delta,
        window.innerWidth,
        vid.duration,
        SENSITIVITY
      );

      checkAndSeek();
    };

    const handleMouseLeave = () => {
      prevXRef.current = null;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return (
    <video
      ref={videoRef}
      src={VIDEO_SRC}
      muted
      playsInline
      preload="auto"
      onSeeked={handleSeeked}
      onLoadedMetadata={handleLoadedMetadata}
      className="fixed inset-0 z-0 w-full h-full object-cover pointer-events-none select-none"
      style={{
        objectPosition: '70% center',
      }}
      aria-hidden="true"
    />
  );
}
