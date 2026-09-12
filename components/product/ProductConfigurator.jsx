import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { assets, googleDesigns, variants } from "../homepage/content";
import { ETSY_SHOP_URL, checkoutFor, formatPrice, linePricingFor } from "../../lib/commerce";
import { externalLinkProps } from "../../lib/publicLinks";
import { homepageEvent } from "../../lib/homepageEvents";
import { PRIMARY_ACTION_OPTIONS, STOREFRONT_LOGO_MAX_BYTES, STOREFRONT_LOGO_TYPES } from "../../lib/storefront";
import BundleSelector from "./BundleSelector";
import GoogleBusinessSearch from "./GoogleBusinessSearch";
import styles from "./Storefront.module.css";

const optionalLinkTypes = ["Website", "Booking", "Menu", "WhatsApp", "Facebook", "TikTok", "Other"];

function FieldError({ error }) {
  return error ? <p className={styles.fieldError}>{error}</p> : null;
}

export default function ProductConfigurator({ product, designId = "current", onDesignChange, onCartChanged, onOpenCart, onSelectionChange }) {
  const formRef = useRef(null);
  const fixedAction = product.id === "custom" ? "" : product.id;
  const [primaryAction, setPrimaryAction] = useState(fixedAction);
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [manualGoogle, setManualGoogle] = useState(false);
  const [additionalLinks, setAdditionalLinks] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [errors, setErrors] = useState({});
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [logoName, setLogoName] = useState("");
  const fallbackUrl = checkoutFor(product.id, designId === "classic" ? "classic" : "new");
  const pricing = linePricingFor(product.id, quantity);
  const isGoogleAction = primaryAction === "google";
  const primaryLabel = useMemo(
    () => PRIMARY_ACTION_OPTIONS.find((option) => option.value === primaryAction)?.label || "primary action",
    [primaryAction]
  );

  useEffect(() => {
    onSelectionChange?.({
      label: product.id === "google" ? `Google Review · ${designId === "classic" ? "White background" : "Blue background"}` : product.name,
      pricePence: pricing?.totalPence || product.pricePence,
      quantity,
    });
  }, [designId, onSelectionChange, pricing?.totalPence, product.id, product.name, product.pricePence, quantity]);

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
      designId: product.id === "google" ? designId : null,
      additionalLinks: links,
    };

    if (product.id === "custom" && logo instanceof File && logo.size > 0 && (!STOREFRONT_LOGO_TYPES.includes(logo.type) || logo.size > STOREFRONT_LOGO_MAX_BYTES)) {
      setErrors({ logo: "Choose a JPG, PNG or WebP logo under 3 MB." });
      setMessage("Please check your logo and try again.");
      return;
    }

    const payload = new FormData();
    payload.set("productId", product.id);
    payload.set("quantity", String(quantity));
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
      <span id="products" className={styles.sectionAnchor} aria-hidden="true" />
      <fieldset className={styles.productChoices}>
        <legend>Choose your TapRank face</legend>
        <div>
          {variants.map((variant) => (
            <a className={variant.id === product.id ? styles.productChoiceSelected : ""} href={variant.route} aria-current={variant.id === product.id ? "page" : undefined} onClick={() => homepageEvent("variant_selected", { variant: variant.id })} key={variant.id}>
              <span><Image src={variant.image} alt="" width={120} height={120} loading="eager" /></span>
              <strong>{variant.id === "custom" ? "Custom" : variant.name}</strong>
              <small>£{variant.price}</small>
            </a>
          ))}
        </div>
      </fieldset>

      {product.id === "google" ? (
        <fieldset className={styles.designChoices}>
          <legend>Choose your design</legend>
          <div>
            {googleDesigns.map((design) => {
              const value = design.id === "new" ? "current" : design.id;
              return (
                <label className={designId === value ? styles.designSelected : ""} key={design.id}>
                  <input type="radio" name="designId" value={value} checked={designId === value} onChange={() => { onDesignChange?.(value); setMessage(""); homepageEvent("variant_selected", { variant: "google", design: design.id }); }} />
                  <span><Image src={design.image} alt={`${design.name} Google Review TapRank`} width={140} height={140} loading="eager" /></span>
                  <strong>{design.name}</strong>
                  <small className={styles.inStock}><i aria-hidden="true" />In stock</small>
                </label>
              );
            })}
          </div>
        </fieldset>
      ) : null}

      {product.id === "custom" ? (
        <fieldset className={styles.actionChoices}>
          <legend>Choose the primary customer action</legend>
          {PRIMARY_ACTION_OPTIONS.map((option) => (
            <label key={option.value}>
              <input type="radio" name="primaryAction" value={option.value} checked={primaryAction === option.value} onChange={() => { setPrimaryAction(option.value); setSelectedPlace(null); }} />
              <span>{option.label}</span>
            </label>
          ))}
          <FieldError error={errors.primaryAction} />
        </fieldset>
      ) : null}

      {isGoogleAction ? (
        <section className={styles.businessSearch} aria-labelledby={`${product.id}-search-title`}>
          <div className={styles.searchHeading}>
            <span><Image src={assets.platforms.google} alt="Google" fill sizes="38px" /></span>
            <div><strong id={`${product.id}-search-title`}>Search for your business</strong><small>Find your Google Business Profile so we can configure your review link before your TapRank arrives.</small></div>
          </div>
          <GoogleBusinessSearch onSelect={selectPlace} />
          {selectedPlace ? <div className={styles.selectedBusiness}><span>Selected business</span><strong>{selectedPlace.businessName}</strong><small>{selectedPlace.businessAddress}</small><button type="button" onClick={() => setSelectedPlace(null)}>Change</button></div> : null}
          <button className={styles.textButton} type="button" onClick={() => { setManualGoogle((value) => !value); setSelectedPlace(null); }}>
            Can’t find your business? {manualGoogle ? "Hide manual entry" : "Enter the link manually"}
          </button>
          <FieldError error={errors.primaryUrl} />
        </section>
      ) : null}

      <div className={styles.formField}>
        <label htmlFor={`${product.id}-business-name`}>Business name</label>
        <input id={`${product.id}-business-name`} name="businessName" maxLength="160" autoComplete="organization" placeholder="Your business name" required />
        <FieldError error={errors.businessName} />
      </div>

      {(!isGoogleAction || manualGoogle) ? (
        <div className={styles.formField}>
          <label htmlFor={`${product.id}-primary-url`}>{primaryLabel} link</label>
          <input id={`${product.id}-primary-url`} name="primaryUrl" type="url" maxLength="1000" placeholder="https://…" required />
          {!isGoogleAction ? <FieldError error={errors.primaryUrl} /> : null}
        </div>
      ) : <input type="hidden" name="primaryUrl" value="" />}

      {product.id === "custom" ? (
        <div className={styles.formField}>
          <label htmlFor="custom-logo">Business logo <span>Required</span></label>
          <small>JPG, PNG or WebP · maximum 3 MB</small>
          <label className={styles.filePicker} htmlFor="custom-logo"><span>{logoName || "Choose your logo"}</span><strong>Browse</strong></label>
          <input className={styles.hiddenFile} id="custom-logo" name="logo" type="file" accept={STOREFRONT_LOGO_TYPES.join(",")} required onChange={(event) => setLogoName(event.target.files?.[0]?.name || "")} />
          <FieldError error={errors.logo} />
        </div>
      ) : null}

      <details className={styles.optionalDetails}>
        <summary><span>Customise your TapRank page</span><small>Add optional links, location and opening times</small></summary>
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

      <BundleSelector productId={product.id} quantity={quantity} onChange={setQuantity} />
      <FieldError error={errors.quantity} />

      {message ? <p className={styles.formMessage} role="alert">{message}</p> : null}
      <button className={styles.addToCart} type="submit" disabled={submitting || (product.id === "custom" && !primaryAction)}>
        {submitting ? "Adding securely…" : `Add to cart — ${formatPrice(pricing?.totalPence || product.pricePence)}`}
      </button>
      <ul className={styles.purchaseReassurance}>
        <li>Secure checkout</li><li>Free UK delivery</li><li>Dispatch within 48 hours</li><li>Ready to use</li><li>1-year replacement warranty</li>
      </ul>
      <a className={styles.etsyLink} href={ETSY_SHOP_URL} {...externalLinkProps(ETSY_SHOP_URL)}>Prefer Etsy? Shop TapRank on Etsy →</a>
      {fallbackUrl ? <details className={styles.fallback}><summary>Having trouble with the configurator?</summary><p>Use TapRank’s existing Square checkout and send your setup details afterwards.</p><a href={fallbackUrl} {...externalLinkProps(fallbackUrl)} onClick={() => homepageEvent("square_checkout_click", { variant: product.id, location: "configurator_fallback" })}>Use existing Square checkout</a></details> : null}
    </form>
  );
}
