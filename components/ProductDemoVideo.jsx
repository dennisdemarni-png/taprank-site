import { useEffect, useRef } from "react";
import { assets } from "./homepage/content";
import styles from "./ProductDemoVideo.module.css";

export default function ProductDemoVideo({ theme = "light", onPlay, headingId = "product-video-title" }) {
  const videoRef = useRef(null);
  const trackedPlay = useRef(false);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || window.matchMedia?.("(prefers-reduced-motion: reduce)").matches || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: .45 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);
  function handlePlay() {
    if (trackedPlay.current) return;
    trackedPlay.current = true;
    onPlay?.();
  }
  return (
    <section className={`${styles.section} ${styles[theme]}`} aria-labelledby={headingId}>
      <div className={styles.copy}>
        <p>See it in action</p>
        <h2 id={headingId}>See exactly how TapRank works — 8 seconds</h2>
        <span>A customer taps the stand and your TapRank page opens on their phone.</span>
      </div>
      <div className={styles.frame}>
        <video
          ref={videoRef}
          controls
          muted
          loop
          playsInline
          preload="metadata"
          poster={assets.videoPoster}
          src={assets.video}
          onPlay={handlePlay}
          aria-label="TapRank eight-second product demonstration"
        />
      </div>
    </section>
  );
}
