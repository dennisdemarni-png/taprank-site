import { useEffect, useRef, useState } from "react";
import { formatPrice } from "../../lib/commerce";
import { homepageEvent } from "../../lib/homepageEvents";
import styles from "./Storefront.module.css";

export default function CartDrawer({ cart, open, onClose, onCartChanged }) {
  const closeRef = useRef(null);
  const [checkingOut, setCheckingOut] = useState(false);
  const [message, setMessage] = useState("");
  const locked = cart?.status === "checkout_started";

  useEffect(() => {
    if (!open) return undefined;
    const previousFocus = document.activeElement;
    closeRef.current?.focus();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key !== "Tab") return;
      const controls = Array.from(document.querySelectorAll('[role="dialog"] button:not(:disabled), [role="dialog"] a[href], [role="dialog"] input:not(:disabled)'));
      if (!controls.length) return;
      const first = controls[0];
      const last = controls[controls.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
      previousFocus?.focus?.();
    };
  }, [open, onClose]);

  async function removeItem(itemId) {
    setMessage("");
    try {
      const response = await fetch(`/api/cart?itemId=${encodeURIComponent(itemId)}`, { method: "DELETE" });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) throw new Error(result?.message);
      onCartChanged(result.cart);
    } catch (error) {
      setMessage(error?.message || "That item could not be removed.");
    }
  }

  async function checkout() {
    const checkoutWindow = window.open("about:blank", "_blank");
    if (checkoutWindow) checkoutWindow.opener = null;
    setCheckingOut(true);
    setMessage("");
    try {
      const response = await fetch("/api/checkout", { method: "POST", headers: { "Content-Type": "application/json" }, body: "{}" });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.checkoutUrl) throw new Error(result?.message || "Checkout could not be started.");
      homepageEvent("square_checkout_click", { variant: cart.items[0].productId, location: "cart" });
      if (checkoutWindow) checkoutWindow.location.replace(result.checkoutUrl);
      else window.location.assign(result.checkoutUrl);
      onCartChanged({ ...cart, status: "checkout_started" });
    } catch (error) {
      if (checkoutWindow) checkoutWindow.close();
      setMessage(error?.message || "Secure checkout could not be started.");
    } finally {
      setCheckingOut(false);
    }
  }

  if (!open) return null;
  return (
    <div className={styles.cartLayer} role="presentation" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <aside className={styles.cartDrawer} role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <header><div><span>Your TapRank order</span><h2 id="cart-title">Cart</h2></div><button ref={closeRef} type="button" onClick={onClose} aria-label="Close cart">×</button></header>
        {!cart?.items?.length ? <div className={styles.emptyCart}><strong>Your cart is empty.</strong><p>Configure a TapRank product to add it here.</p></div> : (
          <>
            <div className={styles.cartItems}>
              {cart.items.map((item) => <article key={item.id}>
                <div><strong>{item.productName}</strong><span>{item.configuration.businessName}</span><small>Primary action: {item.configuration.primaryActionLabel}</small>{item.hasLogo ? <small>Logo attached</small> : null}</div>
                <div><strong>{formatPrice(item.unitPricePence * item.quantity)}</strong><span>Qty {item.quantity}</span>{!locked ? <button type="button" onClick={() => removeItem(item.id)}>Remove</button> : null}</div>
              </article>)}
            </div>
            <div className={styles.cartSummary}><p><span>Total</span><strong>{formatPrice(cart.totalPence)}</strong></p><small>Free UK delivery · One-off payment</small></div>
            {message ? <p className={styles.formMessage} role="alert">{message}</p> : null}
            <button className={styles.checkoutButton} type="button" onClick={checkout} disabled={checkingOut}>{checkingOut ? "Opening secure checkout…" : locked ? "Return to secure Square checkout" : "Checkout securely with Square"}</button>
            <p className={styles.checkoutNote}>Square securely collects payment and your UK delivery address in a new tab. TapRank never receives your full card details.</p>
          </>
        )}
      </aside>
    </div>
  );
}
