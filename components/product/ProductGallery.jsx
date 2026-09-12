import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { assets } from "../homepage/content";
import styles from "./ProductLanding.module.css";

const galleryLabels = ["Product", "How it works", "Why TapRank", "Product guide"];

function mediaFor(product, designId) {
  const suppliedImages = assets.productGalleries[product.id] || [product.image];
  const imageItems = suppliedImages.map((src, index) => ({
    id: `product-${index + 1}`,
    type: "image",
    src: product.id === "google" && designId === "classic" && index === 0 ? assets.googleClassic : src,
    alt: product.id === "google" && designId === "classic" && index === 0
      ? "Classic Google Review TapRank acrylic stand"
      : `${product.name} — ${galleryLabels[index] || `gallery image ${index + 1}`}`,
    label: product.id === "google" && designId === "classic" && index === 0 ? "Classic design" : galleryLabels[index],
    priority: index === 0,
  }));
  return [...imageItems, { id: "video", type: "video", src: assets.video, poster: assets.videoPoster, label: "8-second demo" }];
}

export default function ProductGallery({ product, designId }) {
  const media = mediaFor(product, designId);
  const [active, setActive] = useState(0);
  const trackRef = useRef(null);

  useEffect(() => setActive(0), [designId, product.id]);

  function select(index) {
    setActive(index);
    const track = trackRef.current;
    if (track && window.matchMedia("(max-width: 760px)").matches) {
      track.scrollTo({ left: index * track.clientWidth, behavior: "smooth" });
    }
  }

  function trackScroll(event) {
    const node = event.currentTarget;
    if (!node.clientWidth) return;
    setActive(Math.max(0, Math.min(media.length - 1, Math.round(node.scrollLeft / node.clientWidth))));
  }

  return (
    <div className={styles.galleryShell}>
      <div className={styles.galleryTrack} ref={trackRef} onScroll={trackScroll}>
        {media.map((item, index) => (
          <figure className={`${styles.gallerySlide} ${active === index ? styles.gallerySlideActive : ""}`} key={item.id}>
            <span className={styles.galleryLabel}>{item.label}</span>
            {item.type === "image" ? (
              <div className={styles.galleryImage}><Image src={item.src} alt={item.alt} fill priority={item.priority} loading={item.priority ? "eager" : "lazy"} sizes="(max-width: 760px) 100vw, 52vw" /></div>
            ) : (
              <video className={styles.galleryVideo} controls muted playsInline preload="metadata" poster={item.poster}><source src={item.src} type="video/mp4" /></video>
            )}
          </figure>
        ))}
      </div>
      <div className={styles.galleryThumbs} aria-label="Product gallery">
        {media.map((item, index) => (
          <button type="button" className={active === index ? styles.galleryThumbActive : ""} onClick={() => select(index)} aria-label={`View ${item.label}`} aria-current={active === index ? "true" : undefined} key={item.id}>
            {item.type === "image" ? <Image src={item.src} alt="" fill sizes="72px" /> : <span>▶</span>}
          </button>
        ))}
      </div>
      <div className={styles.galleryDots} aria-label="Choose gallery slide">
        {media.map((item, index) => <button type="button" key={item.id} onClick={() => select(index)} aria-label={`View slide ${index + 1}`} aria-current={active === index ? "true" : undefined} />)}
      </div>
    </div>
  );
}
