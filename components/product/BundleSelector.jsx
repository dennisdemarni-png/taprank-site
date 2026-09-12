import { STANDARD_BUNDLE_TIERS, formatPrice, linePricingFor } from "../../lib/commerce";
import styles from "./Storefront.module.css";

export default function BundleSelector({ productId, quantity, onChange }) {
  if (productId === "custom") {
    return (
      <div className={styles.customQuantity}>
        <label htmlFor="custom-quantity">Quantity</label>
        <div>
          <button type="button" onClick={() => onChange(Math.max(1, quantity - 1))} aria-label="Decrease quantity">−</button>
          <input id="custom-quantity" name="quantity" type="number" min="1" max="20" value={quantity} onChange={(event) => onChange(Math.min(20, Math.max(1, Number(event.target.value) || 1)))} inputMode="numeric" />
          <button type="button" onClick={() => onChange(Math.min(20, quantity + 1))} aria-label="Increase quantity">+</button>
        </div>
        <small>Custom stands keep the standard £84.99 unit price.</small>
      </div>
    );
  }

  return (
    <fieldset className={styles.bundleSelector}>
      <legend><span>Buy more, save more</span><small>One configuration is used for every stand in this bundle.</small></legend>
      <div className={styles.bundleGrid}>
        {STANDARD_BUNDLE_TIERS.map((tier) => {
          const pricing = linePricingFor(productId, tier.quantity);
          const selected = quantity === tier.quantity;
          return (
            <label className={`${styles.bundleCard} ${selected ? styles.bundleSelected : ""}`} key={tier.quantity}>
              <input type="radio" name="quantity" value={tier.quantity} checked={selected} onChange={() => onChange(tier.quantity)} />
              {tier.quantity === 3 ? <em>Most popular</em> : tier.quantity === 5 ? <em>Best value</em> : null}
              <span className={styles.bundleChoice}><b>{tier.quantity}</b><small>{tier.quantity === 1 ? "Stand" : "Stands"}</small></span>
              <span className={styles.bundlePrice}>
                {tier.discountPercent ? <mark>{tier.discountPercent}% off</mark> : <small>Starter</small>}
                <strong>{formatPrice(pricing.totalPence)}</strong>
                <small>{formatPrice(pricing.effectiveUnitPricePence)} each</small>
              </span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}
