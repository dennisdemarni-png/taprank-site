import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import OrderPageShell from "../components/OrderPageShell";
import {
  ORDER_DETAILS_LOGO_MAX_BYTES,
  ORDER_DETAILS_LOGO_TYPES,
  ORDER_PRODUCT_TYPES,
  PRIMARY_ACTIONS,
} from "../lib/orderDetails";
import { TAPRANK_CONTACT } from "../lib/contact";

const setupChecklist = [
  "Your Square receipt or order reference, if available",
  "Your business contact details and opening hours",
  "The exact links customers should open",
  "Your logo and brand colours, if applicable",
];

const formSections = [
  ["1", "Order", "Tell us what TapRank should match to your purchase."],
  ["2", "Business", "Provide the details needed to prepare your page."],
  ["3", "Links", "Choose the actions customers should be able to take."],
  ["4", "Branding", "Add any visual guidance and confirm the submission."],
];

const optionalLinkOptions = [
  {
    field: "websiteUrl",
    label: "Website",
    placeholder: "https://yourbusiness.co.uk",
    type: "url",
    value: "website",
  },
  {
    field: "bookingUrl",
    label: "Booking page",
    placeholder: "https://...",
    type: "url",
    value: "booking",
  },
  {
    field: "menuUrl",
    label: "Menu or ordering page",
    placeholder: "https://...",
    type: "url",
    value: "menu",
  },
  {
    field: "instagramUrl",
    label: "Instagram profile",
    placeholder: "https://instagram.com/...",
    type: "url",
    value: "instagram",
  },
  {
    field: "facebookUrl",
    label: "Facebook page",
    placeholder: "https://facebook.com/...",
    type: "url",
    value: "facebook",
  },
  {
    field: "tiktokUrl",
    label: "TikTok profile",
    placeholder: "https://tiktok.com/@...",
    type: "url",
    value: "tiktok",
  },
  {
    field: "whatsappNumber",
    hint: "Include the country code, such as +44.",
    label: "WhatsApp number",
    placeholder: "+44...",
    type: "tel",
    value: "whatsapp",
  },
  {
    label: "Another customer link",
    type: "custom",
    value: "additional",
  },
];

function Field({
  children,
  error,
  hint,
  label,
  name,
  optional = false,
}) {
  const hintId = hint ? `${name}-hint` : undefined;
  const errorId = error ? `${name}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ") || undefined;

  return (
    <div className={`orderField ${error ? "hasError" : ""}`}>
      <label htmlFor={name}>
        {label}
        {optional ? <span>Optional</span> : null}
      </label>
      {hint ? <small id={hintId}>{hint}</small> : null}
      {typeof children === "function"
        ? children({ describedBy, invalid: Boolean(error) })
        : children}
      {error ? (
        <p className="orderFieldError" id={errorId}>
          {error}
        </p>
      ) : null}
    </div>
  );
}

function TextInput({
  autoComplete,
  defaultValue,
  error,
  hint,
  label,
  maxLength,
  name,
  max,
  min,
  optional,
  placeholder,
  required = !optional,
  step,
  type = "text",
}) {
  return (
    <Field
      error={error}
      hint={hint}
      label={label}
      name={name}
      optional={optional}
    >
      {({ describedBy, invalid }) => (
        <input
          aria-describedby={describedBy}
          aria-invalid={invalid}
          autoComplete={autoComplete}
          defaultValue={defaultValue}
          id={name}
          max={max}
          maxLength={maxLength}
          min={min}
          name={name}
          placeholder={placeholder}
          required={required}
          step={step}
          type={type}
        />
      )}
    </Field>
  );
}

function UrlInput({ error, hint, label, name, optional = true, placeholder }) {
  return (
    <TextInput
      autoComplete="url"
      error={error}
      hint={hint}
      label={label}
      maxLength={1000}
      name={name}
      optional={optional}
      placeholder={placeholder}
      type="url"
    />
  );
}

export default function OrderDetailsPage() {
  const [startedAt, setStartedAt] = useState("");
  const [errors, setErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [linkToAdd, setLinkToAdd] = useState(optionalLinkOptions[0].value);
  const [logoName, setLogoName] = useState("");
  const [optionalLinks, setOptionalLinks] = useState([]);
  const [success, setSuccess] = useState(null);
  const errorSummaryRef = useRef(null);

  useEffect(() => {
    setStartedAt(String(Date.now()));
  }, []);

  useEffect(() => {
    if (generalError) {
      errorSummaryRef.current?.focus();
    }
  }, [generalError]);

  const availableOptionalLinks = optionalLinkOptions.filter(
    (option) => !optionalLinks.includes(option.value)
  );

  function addOptionalLink() {
    if (!linkToAdd || optionalLinks.includes(linkToAdd)) return;

    const nextLinks = [...optionalLinks, linkToAdd];
    setOptionalLinks(nextLinks);
    setLinkToAdd(
      optionalLinkOptions.find((option) => !nextLinks.includes(option.value))
        ?.value || ""
    );
  }

  function removeOptionalLink(linkValue) {
    setOptionalLinks((currentLinks) =>
      currentLinks.filter((value) => value !== linkValue)
    );

    if (!linkToAdd) setLinkToAdd(linkValue);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    const logo = formData.get("logo");

    setErrors({});
    setGeneralError("");

    if (
      logo instanceof File &&
      logo.size > 0 &&
      (!ORDER_DETAILS_LOGO_TYPES.includes(logo.type) ||
        logo.size > ORDER_DETAILS_LOGO_MAX_BYTES)
    ) {
      setErrors({ logo: "Choose a JPG, PNG or WebP logo under 3 MB." });
      setGeneralError("Please check the highlighted logo and submit again.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/order-details", {
        body: formData,
        method: "POST",
      });
      const result = await response.json().catch(() => null);

      if (!response.ok || !result?.ok) {
        setErrors(result?.errors || {});
        setGeneralError(
          result?.message ||
            "Your details could not be submitted. Please try again or contact TapRank."
        );
        return;
      }

      setSuccess({
        message: result.message,
        reference: result.reference,
      });
      window.scrollTo({ behavior: "smooth", top: 0 });
    } catch {
      setGeneralError(
        "We could not connect to TapRank. Check your connection and try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <OrderPageShell>
      <Head>
        <title>Submit Your Setup Details | TapRank</title>
        <meta
          name="description"
          content="Send TapRank the business details and links needed to prepare your NFC and QR stand."
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://taprank.co.uk/order-details" />
      </Head>

      <section className="orderHero">
        <div className="orderContainer orderHeroGrid">
          <div className="orderHeroCopy">
            <span className="orderEyebrow">POST-CHECKOUT SETUP</span>
            <h1>Let’s get your TapRank stand ready.</h1>
            <p>
              Send the business details and links we need to create your live
              page and prepare your NFC + QR stand.
            </p>
            <div className="orderHeroAssurance">
              <span aria-hidden="true">✓</span>
              <div>
                <strong>This normally takes about 5 minutes.</strong>
                <small>
                  Your submission will be matched to your Square purchase
                  before production begins.
                </small>
              </div>
            </div>
          </div>

          <aside className="orderChecklist" aria-label="What you will need">
            <span>WHAT YOU’LL NEED</span>
            <ul>
              {setupChecklist.map((item) => (
                <li key={item}>
                  <b aria-hidden="true">✓</b>
                  {item}
                </li>
              ))}
            </ul>
            <p>
              Do not submit card details or other sensitive payment
              information.
            </p>
          </aside>
        </div>
      </section>

      <section className="orderFormSection">
        <div className="orderContainer">
          {success ? (
            <div className="orderSuccess" role="status">
              <span className="orderSuccessIcon" aria-hidden="true">
                ✓
              </span>
              <span className="orderEyebrow">DETAILS RECEIVED</span>
              <h2>Thank you—we have what we need to start checking your setup.</h2>
              <p>{success.message}</p>
              <div className="orderReference">
                <span>Your TapRank submission reference</span>
                <strong>{success.reference}</strong>
              </div>
              <p>
                This confirms receipt of your setup details, not payment. We’ll
                match them to the Square order and contact you if anything is
                missing.
              </p>
              <div className="orderSuccessActions">
                <a className="button" href="/">
                  Return to TapRank
                </a>
                <a
                  className="button buttonSecondary"
                  href={TAPRANK_CONTACT.callHref}
                >
                  Call TapRank
                </a>
              </div>
            </div>
          ) : (
            <>
              <nav className="orderSteps" aria-label="Form sections">
                {formSections.map(([number, title, copy]) => (
                  <a href={`#order-step-${number}`} key={number}>
                    <span>{number}</span>
                    <div>
                      <strong>{title}</strong>
                      <small>{copy}</small>
                    </div>
                  </a>
                ))}
              </nav>

              <form
                className="orderSetupForm"
                encType="multipart/form-data"
                onSubmit={handleSubmit}
              >
                <input name="startedAt" type="hidden" value={startedAt} />
                <div className="orderHoneypot" aria-hidden="true">
                  <label htmlFor="companyWebsite">
                    Leave this field empty
                  </label>
                  <input
                    autoComplete="off"
                    id="companyWebsite"
                    name="companyWebsite"
                    tabIndex="-1"
                    type="text"
                  />
                </div>

                {generalError ? (
                  <div
                    className="orderErrorSummary"
                    ref={errorSummaryRef}
                    role="alert"
                    tabIndex="-1"
                  >
                    <strong>We couldn’t submit the form yet.</strong>
                    <p>{generalError}</p>
                  </div>
                ) : null}

                <fieldset className="orderFormCard" id="order-step-1">
                  <legend>
                    <span>1</span>
                    <div>
                      <strong>Your order</strong>
                      <small>
                        We will check these details against Square before
                        production.
                      </small>
                    </div>
                  </legend>

                  <Field
                    error={errors.productType}
                    hint="Custom stands should be selected only when TapRank has confirmed the custom order with you."
                    label="Which stand did you order?"
                    name="productType"
                  >
                    {({ describedBy, invalid }) => (
                      <div
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        aria-label="Which stand did you order?"
                        className="orderChoiceGrid"
                        role="radiogroup"
                      >
                        {ORDER_PRODUCT_TYPES.map((product, index) => (
                          <label className="orderChoiceCard" key={product.value}>
                            <input
                              defaultChecked={index === 0}
                              name="productType"
                              required
                              type="radio"
                              value={product.value}
                            />
                            <span>
                              <b>{product.label}</b>
                              <small>
                                {product.value === "standard"
                                  ? "Ready-made TapRank design"
                                  : "Branding agreed with TapRank"}
                              </small>
                            </span>
                          </label>
                        ))}
                      </div>
                    )}
                  </Field>

                  <div className="orderFormGrid">
                    <TextInput
                      error={errors.quantity}
                      defaultValue="1"
                      hint="For more than 20 stands, contact TapRank directly."
                      label="Quantity"
                      max="20"
                      maxLength={2}
                      min="1"
                      name="quantity"
                      placeholder="1"
                      step="1"
                      type="number"
                    />
                    <TextInput
                      error={errors.squareOrderReference}
                      hint="Shown on your Square receipt. Leave blank if you cannot find it."
                      label="Square order or receipt reference"
                      maxLength={100}
                      name="squareOrderReference"
                      optional
                      placeholder="For example: QEE7..."
                    />
                  </div>
                </fieldset>

                <fieldset className="orderFormCard" id="order-step-2">
                  <legend>
                    <span>2</span>
                    <div>
                      <strong>Contact and business details</strong>
                      <small>
                        Contact details are private unless you separately enter
                        them as public page details.
                      </small>
                    </div>
                  </legend>

                  <div className="orderFormGrid">
                    <TextInput
                      autoComplete="name"
                      error={errors.contactName}
                      label="Your name"
                      maxLength={120}
                      name="contactName"
                      placeholder="Name of the person we should contact"
                    />
                    <TextInput
                      autoComplete="email"
                      error={errors.contactEmail}
                      hint="Use the address associated with the order where possible."
                      label="Order contact email"
                      maxLength={254}
                      name="contactEmail"
                      placeholder="you@business.co.uk"
                      type="email"
                    />
                    <TextInput
                      autoComplete="tel"
                      error={errors.contactPhone}
                      label="Order contact telephone"
                      maxLength={40}
                      name="contactPhone"
                      placeholder="+44..."
                      type="tel"
                    />
                    <TextInput
                      autoComplete="organization"
                      error={errors.businessName}
                      hint="Use the exact capitalisation you want customers to see."
                      label="Business name"
                      maxLength={160}
                      name="businessName"
                      placeholder="Your public business name"
                    />
                    <TextInput
                      error={errors.businessType}
                      label="Business type"
                      maxLength={120}
                      name="businessType"
                      placeholder="For example: barber, cafe or salon"
                    />
                    <TextInput
                      autoComplete="street-address"
                      error={errors.businessAddress}
                      hint="Add this only if it should help customers find your business."
                      label="Public business address"
                      maxLength={500}
                      name="businessAddress"
                      optional
                      placeholder="Street, town and postcode"
                    />
                    <TextInput
                      autoComplete="tel"
                      error={errors.publicPhone}
                      hint="Only enter this if it may appear on your TapRank page."
                      label="Public business telephone"
                      maxLength={40}
                      name="publicPhone"
                      optional
                      placeholder="+44..."
                      type="tel"
                    />
                    <TextInput
                      autoComplete="email"
                      error={errors.publicEmail}
                      hint="Only enter this if customers may use it."
                      label="Public business email"
                      maxLength={254}
                      name="publicEmail"
                      optional
                      placeholder="hello@business.co.uk"
                      type="email"
                    />
                  </div>

                  <Field
                    error={errors.openingHours}
                    hint="Use one line per day or group days with the same hours."
                    label="Opening hours"
                    name="openingHours"
                    optional
                  >
                    {({ describedBy, invalid }) => (
                      <textarea
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        id="openingHours"
                        maxLength={1000}
                        name="openingHours"
                        placeholder={"Monday–Friday: 9am–5pm\nSaturday: 10am–4pm\nSunday: Closed"}
                        rows="5"
                      />
                    )}
                  </Field>
                </fieldset>

                <fieldset className="orderFormCard" id="order-step-3">
                  <legend>
                    <span>3</span>
                    <div>
                      <strong>Your customer links</strong>
                      <small>
                        Copy complete links from the browser, including
                        https://.
                      </small>
                    </div>
                  </legend>

                  <div className="orderFormGrid">
                    <Field
                      error={errors.primaryAction}
                      hint="This becomes the most prominent button on your TapRank page."
                      label="Main customer action"
                      name="primaryAction"
                    >
                      {({ describedBy, invalid }) => (
                        <select
                          aria-describedby={describedBy}
                          aria-invalid={invalid}
                          defaultValue="review"
                          id="primaryAction"
                          name="primaryAction"
                          required
                        >
                          {PRIMARY_ACTIONS.map((action) => (
                            <option key={action.value} value={action.value}>
                              {action.label}
                            </option>
                          ))}
                        </select>
                      )}
                    </Field>
                    <UrlInput
                      error={errors.primaryActionUrl}
                      hint="For reviews, paste the direct Google review or business profile link."
                      label="Main action link"
                      name="primaryActionUrl"
                      optional={false}
                      placeholder="https://..."
                    />
                  </div>

                  <div className="orderSubsection">
                    <div>
                      <strong>Add any other links you want customers to see</strong>
                      <p>
                        Choose only what you need. You can add more than one.
                      </p>
                    </div>

                    <div className="orderLinkPicker">
                      <Field
                        hint="Select a destination, then choose Add link."
                        label="Link type"
                        name="optionalLinkType"
                        optional
                      >
                        {({ describedBy }) => (
                          <select
                            aria-describedby={describedBy}
                            disabled={availableOptionalLinks.length === 0}
                            id="optionalLinkType"
                            onChange={(event) =>
                              setLinkToAdd(event.target.value)
                            }
                            value={linkToAdd}
                          >
                            {availableOptionalLinks.length ? (
                              availableOptionalLinks.map((option) => (
                                <option key={option.value} value={option.value}>
                                  {option.label}
                                </option>
                              ))
                            ) : (
                              <option value="">All link types added</option>
                            )}
                          </select>
                        )}
                      </Field>
                      <button
                        className="orderAddLinkButton"
                        disabled={!linkToAdd}
                        onClick={addOptionalLink}
                        type="button"
                      >
                        <span aria-hidden="true">＋</span>
                        Add link
                      </button>
                    </div>

                    {optionalLinks.length ? (
                      <div className="orderAddedLinks">
                        {optionalLinks.map((linkValue) => {
                          const option = optionalLinkOptions.find(
                            (item) => item.value === linkValue
                          );

                          if (!option) return null;

                          return (
                            <div className="orderAddedLink" key={option.value}>
                              <div className="orderAddedLinkHeader">
                                <strong>{option.label}</strong>
                                <button
                                  aria-label={`Remove ${option.label}`}
                                  onClick={() =>
                                    removeOptionalLink(option.value)
                                  }
                                  type="button"
                                >
                                  Remove
                                </button>
                              </div>

                              {option.type === "custom" ? (
                                <div className="orderFormGrid">
                                  <TextInput
                                    error={errors.additionalLinkLabel}
                                    label="Button label"
                                    maxLength={80}
                                    name="additionalLinkLabel"
                                    optional
                                    placeholder="For example: View our rewards"
                                  />
                                  <UrlInput
                                    error={errors.additionalLinkUrl}
                                    label="Button destination"
                                    name="additionalLinkUrl"
                                    placeholder="https://..."
                                  />
                                </div>
                              ) : option.type === "url" ? (
                                <UrlInput
                                  error={errors[option.field]}
                                  label={option.label}
                                  name={option.field}
                                  placeholder={option.placeholder}
                                />
                              ) : (
                                <TextInput
                                  error={errors[option.field]}
                                  hint={option.hint}
                                  label={option.label}
                                  maxLength={40}
                                  name={option.field}
                                  optional
                                  placeholder={option.placeholder}
                                  type="tel"
                                />
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="orderNoLinks">
                        No extra links added. Your main customer action is
                        enough if that is all you need.
                      </p>
                    )}
                  </div>
                </fieldset>

                <fieldset className="orderFormCard" id="order-step-4">
                  <legend>
                    <span>4</span>
                    <div>
                      <strong>Branding and confirmation</strong>
                      <small>
                        Custom designs are reviewed and confirmed before
                        production.
                      </small>
                    </div>
                  </legend>

                  <div className="orderFormGrid">
                    <Field
                      error={errors.logo}
                      hint="JPG, PNG or WebP. Maximum size 3 MB. Do not upload sensitive documents."
                      label="Business logo"
                      name="logo"
                      optional
                    >
                      {({ describedBy, invalid }) => (
                        <label className="orderFilePicker" htmlFor="logo">
                          <input
                            accept={ORDER_DETAILS_LOGO_TYPES.join(",")}
                            aria-describedby={describedBy}
                            aria-invalid={invalid}
                            id="logo"
                            name="logo"
                            onChange={(event) =>
                              setLogoName(event.target.files?.[0]?.name || "")
                            }
                            type="file"
                          />
                          <span>Choose logo</span>
                          <small>{logoName || "No file selected"}</small>
                        </label>
                      )}
                    </Field>
                    <TextInput
                      error={errors.brandColours}
                      hint="Colour names or hex codes are both useful."
                      label="Brand colours"
                      maxLength={240}
                      name="brandColours"
                      optional
                      placeholder="For example: navy, white and #147cff"
                    />
                  </div>

                  <Field
                    error={errors.brandingNotes}
                    hint="Include any wording, design preferences or important setup context."
                    label="Additional instructions"
                    name="brandingNotes"
                    optional
                  >
                    {({ describedBy, invalid }) => (
                      <textarea
                        aria-describedby={describedBy}
                        aria-invalid={invalid}
                        id="brandingNotes"
                        maxLength={2000}
                        name="brandingNotes"
                        placeholder="Tell us anything else we should know..."
                        rows="5"
                      />
                    )}
                  </Field>

                  <div className="orderPrivacyNotice">
                    <span aria-hidden="true">🔒</span>
                    <div>
                      <strong>How TapRank uses these details</strong>
                      <p>
                        We use them to match your order, build your hosted page,
                        prepare and dispatch your stand, and provide related
                        support. Setup records and logos are stored privately
                        with Supabase and are not sold.
                      </p>
                      <a href="/privacy" target="_blank" rel="noreferrer">
                        Read the TapRank setup privacy notice
                      </a>
                    </div>
                  </div>

                  <div className="orderConfirmations">
                    <label className={errors.accuracyConfirmed ? "hasError" : ""}>
                      <input
                        aria-invalid={Boolean(errors.accuracyConfirmed)}
                        name="accuracyConfirmed"
                        required
                        type="checkbox"
                      />
                      <span>
                        I confirm that these business details and destinations
                        are accurate and that I am authorised to provide them.
                      </span>
                    </label>
                    {errors.accuracyConfirmed ? (
                      <p className="orderFieldError">
                        {errors.accuracyConfirmed}
                      </p>
                    ) : null}

                    <label
                      className={errors.privacyAcknowledged ? "hasError" : ""}
                    >
                      <input
                        aria-invalid={Boolean(errors.privacyAcknowledged)}
                        name="privacyAcknowledged"
                        required
                        type="checkbox"
                      />
                      <span>
                        I have read how TapRank will use and store these setup
                        details.
                      </span>
                    </label>
                    {errors.privacyAcknowledged ? (
                      <p className="orderFieldError">
                        {errors.privacyAcknowledged}
                      </p>
                    ) : null}
                  </div>

                  <div className="orderSubmitRow">
                    <button
                      className="button orderSubmitButton"
                      disabled={isSubmitting || !startedAt}
                      type="submit"
                    >
                      {isSubmitting
                        ? "Sending securely…"
                        : "Submit Setup Details"}
                    </button>
                    <p>
                      Submitting this form does not confirm payment. TapRank
                      will match it to the Square order before production.
                    </p>
                  </div>
                </fieldset>
              </form>
            </>
          )}
        </div>
      </section>
    </OrderPageShell>
  );
}
