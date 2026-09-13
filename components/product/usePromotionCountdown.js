import { useEffect, useState } from "react";
import { promotionState } from "../../lib/promotion";

export function usePromotionCountdown() {
  const [state, setState] = useState(() => promotionState());

  useEffect(() => {
    const update = () => setState(promotionState());
    update();
    const timer = window.setInterval(update, 1000);
    return () => window.clearInterval(timer);
  }, []);

  return state;
}
