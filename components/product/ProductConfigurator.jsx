import { useMemo, useRef, useState } from "react";
import { checkoutFor } from "../../lib/commerce";
import { externalLinkProps } from "../../lib/publicLinks";
import { homepageEvent } from "../../lib/homepageEvents";
import { PRIMARY_ACTION_OPTIONS, STOREFRONT_LOGO_MAX_BYTES, STOREFRONT_LOGO_TYPES } from "../../lib/storefront";
import GoogleBusinessSearch from "./GoogleBusinessSearch";
import styles from "./Storefront.module.css";

const optionalLinkTypes = ["Website", "Booking", "Menu", "WhatsApp", "Facebook", "TikTok", "Other"];

function FieldError({ error }) {
  return error ? <p className={styles.fieldError}>{error}</p> : null;
}

export default function ProductConfigurator({ product, onCartChanged, onOpenCart }) {
  const formRef = useRef(null);
  const fixedAction = product.id === "custom" ? "" : product.id;
  const [primaryAction, setPrimaryAction] = useState(fixedAction);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [manualGoogle, setManualGoogle] = useState(false);
  const [additionalLinks, setAdditionalLinks] = useState([]);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [logoName, setLogoName] = useState("");
  const fallbackUrl = checkoutFor(product.id);
  const isGoogleAction = primaryAction === "google";
  const primaryLabel = useMemo(
    () => PRIMARY_ACTION_OPTIONS.find((option) => option.value === primaryAction)?.label || "primary action",
    [primaryAction]
  );

  function selectPlace(place) {
    setSelectedPlace(place);
    setManualGoogle(false);
    const form = formRef.current;
    if (form?.elements.businessName) form.elements.businessName.value = place.businessName;
    if (form?.elements.businessLocation) form.elements.businessLocation.value = place.businessAddress;
    setErrors((current) => ({ ...current, businessName: "", primaryUrl: "" }));
    homepageEvent("business_selected", { variant: product.id });
  }

  function addLink() {
    if (additionalLinks.length >= 5) return;
    setAdditionalLinks((links) => [...links, { id: crypto.randomUUID(), label: optionalLinkTypes[links.length] || "Other", url: "" }]);
  }

  function updateLink(id, key, value) {
    setAdditionalLinks((links) => links.map((link) => link.id === id ? { ...link, [key]: value } : link));
  }

  async function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const logo = formData.get("logo");
    const links = additionalLinks.map(({ label, url }) => ({ label, url }));
    const configuration = {
      businessName: formData.get("businessName"),
      businessAddress: selectedPlace?.businessAddress || "",
      businessLocation: formData.get("businessLocation"),
      openingHours: formData.get("openingHours"),
      primaryAction,
      primaryUrl: isGoogleAction && selectedPlace ? "" : formData.get("primaryUrl"),
      placeId: isGoogleAction ? selectedPlace?.placeId || "" : "",
      additionalLinks: links,
      privacyAccepted: formData.get("privacyAccepted") === "on",
    };

    if (product.id === "custom" && logo instanceof File && logo.size > 0 && (!STOREFRONT_LOGO_TYPES.includes(logo.type) || logo.size > STOREFRONT_LOGO_MAX_BYTES)) {
      setErrors({ logo: "Choose a JPG, PNG or WebP logo under 3 MB." });
      setMessage("Please check your logo and try again.");
      return;
    }

    const payload = new FormData();
    payload.set("productId", product.id);
    payload.set("quantity", formData.get("quantity"));
    payload.set("configuration", JSON.stringify(configuration));
    if (product.id === "custom" && logo instanceof File && logo.size > 0) payload.set("logo", logo);

    setSubmitting(true);
    setErrors({});
    setMessage("");
    try {
      const response = await fetch("/api/cart", { method: "POST", body: payload });
      const result = await response.json().catch(() => null);
      if (!response.ok || !result?.ok) {
        setErrors(result?.errors || {});
        setMessage(result?.message || "This TapRank could not be added to your cart.");
        return;
      }
      onCartChanged(result.cart);
      onOpenCart();
      homepageEvent("add_to_cart", { variant: product.id });
    } catch {
      setMessage("The cart could not be reached. Please try again or use the Square fallback.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className={styles.configurator} id="configure" ref={formRef} onSubmit={submit} noValidate>
      <div className={styles.configuratorHeading}>
        <span>Configure your TapRank</span>
        <strong>We’ll set it up before dispatch.</strong>
      </div>

      {product.id === "custom" ? (
        <fieldset className={styles.actionChoices}>
          <legend>1. Choose the primary customer action</legend>
          {PRIMARY_ACTION_OPTIONS.map((option) => (
            <label key={option.value}>
              <input type="radio" name="primaryAction" value={option.value} checked={primaryAction === option.value} onChange={() => { setPrimaryAction(option.value); setSelectedPlace(null); }} />
              <span>{option.label}</span>
            </label>
          ))}
          <FieldError error={errors.primaryAction} />
        </fieldset>
      ) : null}

      <div className={styles.formField}>
        <label htmlFor={`${product.id}-business-name`}>{product.id === "custom" ? "2." : "1."} Business name</label>
        <input id={`${product.id}-business-name`} name="businessName" maxLength="160" autoComplete="organization" placeholder="Your business name" required />
        <FieldError error={errors.businessName} />
      </div>

      {isGoogleAction ? (
        <div className={styles.formField}>
          <label>Search for your business on Google</label>
          <small>Choose the correct listing so we can configure your main review action.</small>
          <GoogleBusinessSearch onSelect={selectPlace} />
          {selectedPlace ? <div className={styles.selectedBusiness}><span>Selected</span><strong>{selectedPlace.businessName}</strong><small>{selectedPlace.businessAddress}</small><button type="button" onClick={() => setSelectedPlace(null)}>Change</button></div> : null}
          <button className={styles.textButton} type="button" onClick={() => { setManualGoogle((value) => !value); setSelectedPlace(null); }}>
            Can’t find your business? {manualGoogle ? "Hide manual entry" : "Enter the link manually"}
          </button>
        </div>
      ) : null}

      {(!isGoogleAction || manualGoogle) ? (
        <div className={styles.formField}>
          <label htmlFor={`${product.id}-primary-url`}>{primaryLabel} link</label>
          <input id={`${product.id}-primary-url`} name="primaryUrl" type="url" maxLength="1000" placeholder="https://…" required />
          <FieldError error={errors.primaryUrl} />
        </div>
      ) : <input type="hidden" name="primaryUrl" value="" />}
      {isGoogleAction && !manualGoogle ? <FieldError error={errors.primaryUrl} /> : null}

      <details className={styles.optionalDetails}>
        <summary>Add optional business details and links</summary>
        <div className={styles.optionalContent}>
          <div className={styles.formField}>
            <label htmlFor={`${product.id}-location`}>Business location <span>Optional</span></label>
            <input id={`${product.id}-location`} name="businessLocation" maxLength="500" placeholder="Address or location customers should see" />
          </div>
          <div className={styles.formField}>
            <label htmlFor={`${product.id}-hours`}>Opening times <span>Optional</span></label>
            <textarea id={`${product.id}-hours`} name="openingHours" maxLength="1000" rows="3" placeholder="Monday–Friday 9am–5pm…" />
          </div>
          <div className={styles.additionalLinks}>
            <div><strong>Additional links</strong><span>Optional · up to five</span></div>
            {additionalLinks.map((link, index) => (
              <div className={styles.additionalLink} key={link.id}>
                <select aria-label={`Additional link ${index + 1} label`} value={link.label} onChange={(event) => updateLink(link.id, "label", event.target.value)}>
                  {optionalLinkTypes.map((type) => <option key={type}>{type}</option>)}
                </select>
                <input aria-label={`Additional link ${index + 1} URL`} type="url" value={link.url} onChange={(event) => updateLink(link.id, "url", event.target.value)} placeholder="https://…" />
                <button type="button" aria-label={`Remove additional link ${index + 1}`} onClick={() => setAdditionalLinks((links) => links.filter((item) => item.id !== link.id))}>×</button>
                <FieldError error={errors[`additionalLinks.${index}.label`] || errors[`additionalLinks.${index}.url`]} />
              </div>
            ))}
            {additionalLinks.length < 5 ? <button className={styles.addLinkButton} type="button" onClick={addLink}>+ Add another link</button> : null}
          </div>
        </div>
      </details>

      {product.id === "custom" ? (
        <div className={styles.formField}>
          <label htmlFor="custom-logo">Business logo</label>
          <small>Required for Custom · JPG, PNG or WebP · maximum 3 MB</small>
          <label className={styles.filePicker} htmlFor="custom-logo"><span>{logoName || "Choose your logo"}</span><strong>Browse</strong></label>
          <input className={styles.hiddenFile} id="custom-logo" name="logo" type="file" accept={STOREFRONT_LOGO_TYPES.join(",")} required onChange={(event) => setLogoName(event.target.files?.[0]?.name || "")} />
          <FieldError error={errors.logo} />
        </div>
      ) : null}

      <div className={styles.quantityRow}>
        <label htmlFor={`${product.id}-quantity`}>Quantity</label>
        <input id={`${product.id}-quantity`} name="quantity" type="number" min="1" max="20" defaultValue="1" inputMode="numeric" />
        <span>Each quantity uses this same configuration.</span>
      </div>
      <FieldError error={errors.quantity} />

      <label className={styles.privacyCheck}>
        <input type="checkbox" name="privacyAccepted" />
        <span>I’ve checked these details and read the <a href="/privacy">privacy notice</a>.</span>
      </label>
      <FieldError error={errors.privacyAccepted} />

      {message ? <p className={styles.formMessage} role="alert">{message}</p> : null}
      <button className={styles.addToCart} type="submit" disabled={submitting || (product.id === "custom" && !primaryAction)}>
        {submitting ? "Adding securely…" : `Add to cart · £${product.price}`}
      </button>
      <ul className={styles.purchaseReassurance}>
        <li>Free UK delivery</li><li>No subscription</li><li>1-year replacement warranty</li>
      </ul>
      {fallbackUrl ? <details className={styles.fallback}><summary>Having trouble with the configurator?</summary><p>You can still use TapRank’s existing Square checkout and send your setup details afterwards.</p><a href={fallbackUrl} {...externalLinkProps(fallbackUrl)} onClick={() => homepageEvent("square_checkout_click", { variant: product.id, location: "configurator_fallback" })}>Use existing Square checkout</a></details> : null}
    </form>
  );
}
