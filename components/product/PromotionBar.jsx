import styles from "./ProductLanding.module.css";
import { usePromotionCountdown } from "./usePromotionCountdown";

export default function PromotionBar() {
  const state = usePromotionCountdown();
  const message = state.active
    ? "🍂 Autumn Sale · Standard TapRank stands £64.99 · Ends 30 November · 🚚 Free UK delivery · ♾️ No subscription"
    : "⭐ Standard TapRank stands £64.99 · 🚚 Free UK delivery · ♾️ No subscription";

  return (
    <div className={`${styles.promotionBar} ${state.active ? "" : styles.promotionBarNeutral}`} aria-label={message}>
      <div className={styles.promotionTickerViewport}><div className={styles.promotionTicker} aria-hidden="true"><span>{message}</span><span>{message}</span></div></div>
      {state.active ? <span className={styles.countdown} role="timer" suppressHydrationWarning aria-label={`${state.days} days, ${state.hours} hours, ${state.minutes} minutes and ${state.seconds} seconds remaining`}>
          <span><b suppressHydrationWarning>{state.days}</b><small>days</small></span><i>:</i><span><b suppressHydrationWarning>{String(state.hours).padStart(2, "0")}</b><small>hours</small></span><i>:</i><span><b suppressHydrationWarning>{String(state.minutes).padStart(2, "0")}</b><small>mins</small></span><i>:</i><span><b suppressHydrationWarning>{String(state.seconds).padStart(2, "0")}</b><small>secs</small></span>
        </span> : null}
    </div>
  );
}
