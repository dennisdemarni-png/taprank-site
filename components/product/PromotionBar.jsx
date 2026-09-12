import { useEffect, useState } from "react";
import { PRODUCT_PROMOTION, promotionState } from "../../lib/promotion";
import styles from "./ProductLanding.module.css";

export default function PromotionBar() {
  const [state, setState] = useState(() => promotionState());

  useEffect(() => {
    if (!state.active) return undefined;
    const timer = window.setInterval(() => setState(promotionState()), 30000);
    return () => window.clearInterval(timer);
  }, [state.active]);

  if (!state.active) {
    return <div className={`${styles.promotionBar} ${styles.promotionBarNeutral}`}>Standard TapRank stands £64.99 <span>·</span> Free UK delivery <span>·</span> No subscription</div>;
  }

  return (
    <div className={styles.promotionBar} role="timer" aria-live="polite">
      <strong>{PRODUCT_PROMOTION.banner}</strong>
      <span className={styles.countdown} aria-label={`${state.days} days, ${state.hours} hours and ${state.minutes} minutes remaining`}>
        <span><b>{state.days}</b><small>days</small></span>
        <i>:</i>
        <span><b>{String(state.hours).padStart(2, "0")}</b><small>hours</small></span>
        <i>:</i>
        <span><b>{String(state.minutes).padStart(2, "0")}</b><small>mins</small></span>
      </span>
    </div>
  );
}
