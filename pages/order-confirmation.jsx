import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import OrderPageShell from "../components/OrderPageShell";
import { TAPRANK_CONTACT } from "../lib/contact";
import styles from "../styles/OrderConfirmation.module.css";

const copy = Object.freeze({
  paid: {
    eyebrow: "PAYMENT CONFIRMED",
    title: "Thank you. Your TapRank order is in.",
    body: "Square has confirmed your payment and we have your TapRank configuration. We’ll review the links and prepare your order.",
  },
  waiting: {
    eyebrow: "CONFIRMING PAYMENT",
    title: "Thank you. We’re checking your order.",
    body: "Square has returned you to TapRank and payment confirmation is still arriving. This normally updates shortly—please do not pay again.",
  },
  failed: {
    eyebrow: "CHECKOUT NOT CONFIRMED",
    title: "We haven’t received payment confirmation.",
    body: "The checkout may have been cancelled or interrupted. Contact TapRank if Square shows a completed charge.",
  },
});

export default function OrderConfirmationPage() {
  const router = useRouter();
  const [order, setOrder] = useState(null);
  const [lookupFailed, setLookupFailed] = useState(false);

  useEffect(() => {
    if (!router.isReady) return undefined;
    const reference = String(router.query.reference || "");
    if (!reference) {
      setLookupFailed(true);
      return undefined;
    }
    let active = true;
    let attempts = 0;
    let timer;
    async function check() {
      attempts += 1;
      try {
        const response = await fetch(`/api/order-status?reference=${encodeURIComponent(reference)}`);
        const result = await response.json().catch(() => null);
        if (!active) return;
        if (!response.ok || !result?.ok) {
          setLookupFailed(true);
          return;
        }
        setOrder(result.order);
        if (result.order.status !== "paid" && attempts < 6) timer = window.setTimeout(check, 3000);
      } catch {
        if (active) setLookupFailed(true);
      }
    }
    check();
    return () => { active = false; window.clearTimeout(timer); };
  }, [router.isReady, router.query.reference]);

  const statusKey = lookupFailed || ["failed", "cancelled"].includes(order?.status)
    ? "failed"
    : order?.status === "paid" ? "paid" : "waiting";
  const message = copy[statusKey];

  return (
    <OrderPageShell>
      <Head><title>Order confirmation | TapRank</title><meta name="robots" content="noindex, nofollow" /></Head>
      <section className={styles.page} aria-live="polite">
        <div className={`orderContainer ${styles.card}`}>
          <span className={styles.statusIcon} aria-hidden="true">{statusKey === "paid" ? "✓" : statusKey === "waiting" ? "…" : "!"}</span>
          <p className={styles.eyebrow}>{message.eyebrow}</p>
          <h1>{message.title}</h1>
          <p>{message.body}</p>
          {order?.reference ? <div className={styles.reference}><span>TapRank order reference</span><strong>{order.reference}</strong></div> : null}
          <div className={styles.actions}><a href="/">Return to TapRank</a><a href={`mailto:${TAPRANK_CONTACT.email}`}>Contact support</a></div>
        </div>
      </section>
    </OrderPageShell>
  );
}
