import { useEffect, useState } from "react";
import { promotionState } from "../../lib/promotion";
import styles from "./ProductLanding.module.css";

export default function PromotionBar() {
  const [state, setState] = useState(() => promotionState());
  const message = state.active
    ? "🔥 5-day offer · Standard TapRank stands £64.99 · 🚚 Free UK delivery · ♾️ No subscription"
    : "⭐ Standard TapRank stands £64.99 · 🚚 Free UK delivery · ♾️ No subscription";

  useEffect(() => {
    if (!state.active) return undefined;
    const timer = window.setInterval(() => setState(promotionState()), 30000);
    return () => window.clearInterval(timer);
  }, [state.active]);

  return (
    <div className={`${styles.promotionBar} ${state.active ? "" : styles.promotionBarNeutral}`} aria-label={message}>
      <div className={styles.promotionTickerViewport}><div className={styles.promotionTicker} aria-hidden="true"><span>{message}</span><span>{message}</span></div></div>
      {state.active ? <span className={styles.countdown} role="timer" aria-live="polite" aria-label={`${state.days} days, ${state.hours} hours and ${state.minutes} minutes remaining`}>
          <span><b>{state.days}</b><small>days</small></span><i>:</i><span><b>{String(state.hours).padStart(2, "0")}</b><small>hours</small></span><i>:</i><span><b>{String(state.minutes).padStart(2, "0")}</b><small>mins</small></span>
        </span> : null}
    </div>
  );
}
