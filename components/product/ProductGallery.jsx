import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { actions, assets } from "../homepage/content";
import styles from "./ProductLanding.module.css";

const actionAssets = Object.freeze({
  google: actions[0],
  instagram: { image: assets.restaurantPage, alt: "Example TapRank business page with social actions" },
  tripadvisor: actions[0],
  custom: { image: assets.spacePage, alt: "Example custom TapRank page shown on a phone" },
});

function mediaFor(product, designId) {
  const physicalImage = product.id === "google" && designId === "classic" ? assets.googleClassic : product.image;
  const physicalAlt = product.id === "google" && designId === "classic" ? "Classic Google Review TapRank acrylic stand" : product.imageAlt;
  const action = actionAssets[product.id];
  return [
    { id: "product", type: "image", src: physicalImage, alt: physicalAlt, label: product.id === "google" && designId === "classic" ? "Classic design" : "Current design", priority: true },
    { id: "page", type: "image", src: assets.restaurantPage, alt: "TapRank hosted business page on a mobile phone", label: "Your hosted page" },
    { id: "action", type: "image", src: action.image, alt: action.alt, label: "Customer action" },
    { id: "features", type: "card", label: "NFC + QR", kicker: "Two simple ways to connect", copy: "Customers can tap with NFC or scan the QR code. No TapRank app is required." },
    { id: "size", type: "card", label: "A7 size", kicker: "Made for the counter", copy: "A compact acrylic tabletop stand that keeps the next action visible without taking over your space." },
    { id: "configured", type: "card", label: "Ready to use", kicker: "TapRank handles setup", copy: "Your hosted page, NFC and QR code are configured before dispatch." },
    { id: "result", type: "card", label: "Real result", kicker: "More than 4× the reviews", copy: "One customer achieved more than four times their original review count in approximately two months. Individual results vary." },
    { id: "video", type: "video", src: assets.video, poster: assets.videoPoster, label: "8-second demo" },
  ];
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
            ) : item.type === "video" ? (
              <video className={styles.galleryVideo} controls muted playsInline preload="metadata" poster={item.poster}><source src={item.src} type="video/mp4" /></video>
            ) : (
              <div className={styles.galleryCard}><span>{item.label}</span><strong>{item.kicker}</strong><p>{item.copy}</p></div>
            )}
          </figure>
        ))}
      </div>
      <div className={styles.galleryThumbs} aria-label="Product gallery">
        {media.map((item, index) => (
          <button type="button" className={active === index ? styles.galleryThumbActive : ""} onClick={() => select(index)} aria-label={`View ${item.label}`} aria-current={active === index ? "true" : undefined} key={item.id}>
            {item.type === "image" ? <Image src={item.src} alt="" fill sizes="72px" /> : <span>{item.type === "video" ? "▶" : item.label}</span>}
          </button>
        ))}
      </div>
      <div className={styles.galleryDots} aria-label="Choose gallery slide">
        {media.map((item, index) => <button type="button" key={item.id} onClick={() => select(index)} aria-label={`View slide ${index + 1}`} aria-current={active === index ? "true" : undefined} />)}
      </div>
    </div>
  );
}
