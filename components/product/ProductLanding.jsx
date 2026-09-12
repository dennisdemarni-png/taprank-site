import { useCallback, useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import ProductDemoVideo from "../ProductDemoVideo";
import { Arrow, Logo } from "../homepage/Visuals";
import { assets, customerProof, faqs, productLandingContent } from "../homepage/content";
import { TAPRANK_CONTACT } from "../../lib/contact";
import { externalLinkProps } from "../../lib/publicLinks";
import { homepageEvent } from "../../lib/homepageEvents";
import CartDrawer from "./CartDrawer";
import ProductConfigurator from "./ProductConfigurator";
import ProductGallery from "./ProductGallery";
import PromotionBar from "./PromotionBar";
import { formatPrice } from "../../lib/commerce";
import { PRODUCT_PROMOTION, promotionState, validRegularPricePence } from "../../lib/promotion";
import styles from "./ProductLanding.module.css";

const origin = "https://www.taprank.co.uk";

const comparisonRows = [
  { feature: "NFC tap", basicState: "yes" },
  { feature: "QR code", basicState: "yes" },
  { feature: "Hosted TapRank business page", basicState: "no" },
  { feature: "Reviews, socials, bookings + menu", basicState: "no" },
  { feature: "Configured for your business", basicState: "no" },
  { feature: "Managed link updates without replacing the stand", basicState: "no" },
  { feature: "1-year replacement warranty", basicState: "no" },
  { feature: "No app required", basicState: "yes" },
  { feature: "No subscription required", basicState: "yes" },
];

function CartIcon() {
  return <svg className={styles.cartIcon} viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 5.5h2.2l1.5 9.1h10.5l1.8-6.2H6.2" /><circle cx="9" cy="18.5" r="1.3" /><circle cx="17" cy="18.5" r="1.3" /></svg>;
}

function PurchaseLink({ product, location, className = styles.primaryButton, children }) {
  return (
    <a
      className={className}
      href="#configure"
      onClick={() => homepageEvent("product_cta_click", { variant: product.id, location })}
      data-event="product_cta_click"
    >
      {children || product.cta} <Arrow />
    </a>
  );
}

function Header({ product, cart, cartLoading, onOpenCart }) {
  return (
    <>
      <PromotionBar />
      <header className={styles.header}>
        <div className={styles.wrap}>
          <a href="/" aria-label="TapRank home"><Logo /></a>
          <nav aria-label="Product page navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#products">Products</a>
            <a href="#faq">FAQ</a>
          </nav>
          <details className={styles.mobileMenu}><summary aria-label="Open navigation"><span></span><span></span><span></span></summary><nav aria-label="Mobile product navigation"><a href="#how-it-works">How it works</a><a href="#products">Products</a><a href="#faq">FAQ</a></nav></details>
          <button className={styles.cartButton} type="button" onClick={onOpenCart} aria-label={cartLoading ? "Open cart, loading saved items" : `Open cart with ${cart?.itemCount || 0} items`}><CartIcon /><span>{cartLoading ? "…" : cart?.itemCount || 0}</span></button>
          <PurchaseLink product={product} location="header" className={styles.headerButton}>Configure</PurchaseLink>
        </div>
      </header>
    </>
  );
}

function Hero({ product, designId, onDesignChange, onCartChanged, onOpenCart, onSelectionChange }) {
  const activePromotion = promotionState().active;
  const regularPricePence = activePromotion ? validRegularPricePence(product.pricePence) : null;
  const primaryBenefit = {
    google: "Make leaving a Google review effortless",
    instagram: "Make finding and following your Instagram effortless",
    tripadvisor: "Make leaving a Tripadvisor review effortless",
    custom: "Put your chosen customer action one tap away",
  }[product.id];
  return (
    <section className={`${styles.wrap} ${styles.hero}`} id="product-hero" aria-labelledby="product-title">
      <div className={styles.heroGallery}>
        <ProductGallery product={product} designId={designId} />
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{product.id === "google" ? `Google Review TapRank · ${designId === "classic" ? "White background" : "Blue background"}` : product.eyebrow}</p>
        <h1 id="product-title">{product.headline}</h1>
        <p className={styles.lead}>{product.lead}</p>
        <div className={styles.price}>{activePromotion ? <small>{PRODUCT_PROMOTION.saleLabel}</small> : null}<strong>£{product.price}</strong>{regularPricePence ? <del>{formatPrice(regularPricePence)}</del> : null}<span>One-off payment</span></div>
        <ul className={styles.heroBenefits}>
          <li>{primaryBenefit}</li>
          <li>NFC + QR — configured and ready to use</li>
          <li>Free UK delivery · No subscription</li>
          <li>Includes your TapRank-hosted business page</li>
        </ul>
        <ProductConfigurator product={product} designId={designId} onDesignChange={onDesignChange} onCartChanged={onCartChanged} onOpenCart={onOpenCart} onSelectionChange={onSelectionChange} />
      </div>
    </section>
  );
}

function HowItWorks({ product }) {
  const firstAction = product.id === "custom" ? "your chosen primary action" : product.outcome;
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="how-it-works" aria-labelledby="how-title">
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>Simple for every customer</p>
        <h2 id="how-title">From a happy customer to the next action.</h2>
      </div>
      <ol className={styles.threeSteps}>
        <li><span>01</span><h3>They tap or scan</h3><p>NFC and QR give customers two simple ways to connect while they are with you.</p></li>
        <li><span>02</span><h3>Your page opens</h3><p>Your mobile TapRank business page opens in their browser. No TapRank app is needed.</p></li>
        <li><span>03</span><h3>They choose an action</h3><p>The page prioritises {firstAction}, with your other relevant business links available alongside it.</p></li>
      </ol>
    </section>
  );
}

function Proof({ product }) {
  return (
    <section className={styles.proof} aria-labelledby="proof-title">
      <div className={`${styles.wrap} ${styles.proofGrid}`}>
        <div>
          <p className={styles.eyebrow}>A real customer result</p>
          <strong className={styles.proofNumber}><small>{customerProof.metricPrefix}</small>{customerProof.metric}</strong>
          <h2 id="proof-title">{customerProof.timeframe}</h2>
          <p>{customerProof.summary}</p>
          <small>{customerProof.disclaimer}</small>
          {/* Add approved customer identity, logo and exact counts here when available. */}
        </div>
        <figure>
          <div aria-label="Five out of five stars">★★★★★</div>
          <blockquote>“{customerProof.quoteLead}”</blockquote>
          <p>“{customerProof.quoteBody}”</p>
          <figcaption><strong>{customerProof.reviewer}</strong><span>{customerProof.sourceLabel}</span></figcaption>
          <a href={customerProof.sourceUrl} {...externalLinkProps(customerProof.sourceUrl)}>View review on Trustpilot <Arrow /></a>
        </figure>
      </div>
      <div className={`${styles.wrap} ${styles.decisionCta}`}>
        <div><strong>Get the same simple system for your business.</strong><span>{product.name} · £{product.price}</span></div>
        <PurchaseLink product={product} location="after_proof" className={styles.secondaryButton}>Buy now</PurchaseLink>
      </div>
    </section>
  );
}

function Comparison({ product }) {
  return (
    <section className={`${styles.wrap} ${styles.section}`} id="compare" aria-labelledby="compare-title">
      <div className={`${styles.sectionHeading} ${styles.comparisonHeading}`}>
        <div><strong>5</strong><span>extra advantages</span></div>
        <div><p className={styles.eyebrow}>The TapRank difference</p><h2 id="compare-title">Five ways TapRank goes beyond a basic stand.</h2><p>A basic stand can point customers to one place. TapRank keeps the whole customer journey connected.</p></div>
      </div>
      <div className={styles.comparison} role="table" aria-label="Basic review stand compared with TapRank">
        <div className={styles.comparisonHead} role="row"><span role="columnheader">Feature</span><span role="columnheader">Basic NFC/QR review stand</span><strong role="columnheader">TapRank</strong></div>
        {comparisonRows.map(({ feature, basicState }) => (
          <div role="row" key={feature}><strong role="rowheader">{feature}</strong><span role="cell" data-state={basicState}><i aria-hidden="true">{basicState === "yes" ? "✓" : "×"}</i><span className={styles.srOnly}>{basicState === "yes" ? "Included" : "Not included"}</span></span><span role="cell"><i aria-hidden="true">✓</i><span className={styles.srOnly}>Included</span></span></div>
        ))}
      </div>
      <div className={styles.inlineCta}><p><strong>Stand, hosted page and setup—all included.</strong><span>Choose what you want customers to notice first.</span></p><PurchaseLink product={product} location="after_comparison" className={styles.secondaryButton}>Get {product.shortName} · £{product.price}</PurchaseLink></div>
    </section>
  );
}

function Included({ product }) {
  return (
    <section className={styles.included} id="included" aria-labelledby="included-title">
      <div className={`${styles.wrap} ${styles.includedGrid}`}>
        <div>
          <p className={styles.eyebrow}>Everything you need</p>
          <h2 id="included-title">One physical stand. One useful business page.</h2>
          <ul>
            <li>A7 acrylic tabletop TapRank stand</li>
            <li>NFC configured before dispatch</li>
            <li>QR code generated and configured by TapRank</li>
            <li>TapRank-hosted mobile business page</li>
            <li>{product.id === "custom" ? "Your logo, colours, tailored stand and custom-branded page" : `${product.shortName} stand design with standard TapRank page branding`}</li>
            <li>1-year replacement warranty</li>
          </ul>
        </div>
        <div className={styles.hostedCard}>
          <div className={styles.phoneImage}><Image src={assets.restaurantPage} alt="TapRank hosted restaurant page showing customer actions" fill sizes="280px" /></div>
          <div><p className={styles.eyebrow}>Your hosted TapRank page</p><h3>The first action is only the beginning.</h3><p>Where relevant, your page can also include Instagram, bookings or enquiries, menu and website links, phone actions, directions and opening hours.</p><a href="/r/restaurant-demo" target="_blank" rel="noopener noreferrer" onClick={() => homepageEvent("demo_viewed", { variant: product.id })}>Explore a demo page <Arrow /></a></div>
        </div>
      </div>
    </section>
  );
}

function Setup() {
  const steps = [
    ["Configure your TapRank", "Choose the primary action, find your business and add any optional links."],
    ["Review your cart", "Check the product, quantity and business configuration before payment."],
    ["Pay securely with Square", "Square collects your payment and UK delivery address."],
    ["It arrives ready to use", "TapRank prepares the page, QR code and NFC before dispatch."],
  ];
  return (
    <section className={`${styles.wrap} ${styles.section} ${styles.setup}`} aria-labelledby="setup-title">
      <div className={styles.sectionHeading}><p className={styles.eyebrow}>We handle the setup</p><h2 id="setup-title">No programming. No technical knowledge needed.</h2></div>
      <ol>{steps.map(([title, copy], index) => <li key={title}><span>0{index + 1}</span><h3>{title}</h3><p>{copy}</p></li>)}</ol>
      <div className={styles.trustStrip}><p><strong>Free</strong><span>UK delivery</span></p><p><strong>£0</strong><span>Monthly subscription</span></p><p><strong>48 hours</strong><span>Dispatch after details received</span></p><p><strong>1 year</strong><span>Replacement warranty</span></p></div>
    </section>
  );
}

function FAQ({ product }) {
  return (
    <section className={`${styles.wrap} ${styles.faq}`} id="faq" aria-labelledby="faq-title">
      <div><p className={styles.eyebrow}>Questions, answered</p><h2 id="faq-title">Everything to know before you order.</h2><p>Need help? Email <a href={`mailto:${TAPRANK_CONTACT.email}`}>{TAPRANK_CONTACT.email}</a></p></div>
      <div>{faqs.map(([question, answer], index) => <details key={question} onToggle={event => event.currentTarget.open && homepageEvent("faq_open", { variant: product.id, question: index })}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </section>
  );
}

function MobilePurchase({ product, selection, cart, onOpenCart }) {
  const [visible, setVisible] = useState(false);
  const heroPassed = useRef(false);
  const finalVisible = useRef(false);
  useEffect(() => {
    const hero = document.getElementById("product-hero");
    const final = document.getElementById("product-final-cta");
    if (!hero || !window.IntersectionObserver) return;
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.target === hero) heroPassed.current = !entry.isIntersecting && entry.boundingClientRect.bottom < 0;
        if (entry.target === final) finalVisible.current = entry.isIntersecting;
      });
      setVisible(heroPassed.current && !finalVisible.current);
    });
    observer.observe(hero);
    if (final) observer.observe(final);
    return () => observer.disconnect();
  }, []);
  return visible ? <div className={styles.mobilePurchase}><span><strong>{selection?.label || product.name}</strong><small>{cart?.itemCount ? `${cart.itemCount} in cart` : `${formatPrice(selection?.pricePence || product.pricePence)} · ${selection?.quantity || 1} stand${(selection?.quantity || 1) > 1 ? "s" : ""}`}</small></span>{cart?.itemCount ? <button className={styles.stickyButton} type="button" onClick={onOpenCart}>View cart</button> : <PurchaseLink product={product} location="mobile_sticky" className={styles.stickyButton}>Add to cart</PurchaseLink>}</div> : null;
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.wrap} ${styles.footerGrid}`}>
        <div><a href="/" aria-label="TapRank home"><Logo /></a><p>Connect customers to what matters.</p></div>
        <nav aria-label="Products"><strong>Products</strong>{Object.values(productLandingContent).filter(item => item.id !== "custom").map(item => <a href={item.route} key={item.id}>{item.shortName}</a>)}</nav>
        <nav aria-label="Customer information"><strong>Customer information</strong><a href={`mailto:${TAPRANK_CONTACT.email}`}>Contact</a><a href="#setup-title">Delivery &amp; setup</a><a href="#faq">Warranty</a><a href="/privacy">Privacy</a>{/* TODO: Add Returns / Refunds and Terms links only after TapRank supplies and approves the policy wording. */}</nav>
      </div>
      <div className={`${styles.wrap} ${styles.footerBottom}`}><span>© {new Date().getFullYear()} TapRank</span><span>{TAPRANK_CONTACT.email}</span></div>
    </footer>
  );
}

export default function ProductLanding({ productId }) {
  const router = useRouter();
  const product = productLandingContent[productId];
  const [cart, setCart] = useState(null);
  const [cartHydrated, setCartHydrated] = useState(false);
  const cartRevision = useRef(0);
  const [cartOpen, setCartOpen] = useState(false);
  const [designId, setDesignId] = useState("current");
  const [purchaseSelection, setPurchaseSelection] = useState({ label: product.name, pricePence: product.pricePence, quantity: 1 });
  useEffect(() => {
    if (router.isReady && product.id === "google" && router.query.design === "classic") setDesignId("classic");
  }, [product.id, router.isReady, router.query.design]);
  useEffect(() => { homepageEvent("product_page_view", { variant: product.id }); }, [product.id]);
  const updateCart = useCallback((nextCart) => {
    cartRevision.current += 1;
    setCart(nextCart);
    setCartHydrated(true);
  }, []);
  useEffect(() => {
    let active = true;
    const requestedAtRevision = cartRevision.current;
    fetch("/api/cart")
      .then((response) => response.json())
      .then((result) => {
        if (!active || requestedAtRevision !== cartRevision.current) return;
        setCart(result?.ok ? result.cart : null);
        setCartHydrated(true);
      })
      .catch(() => {
        if (active && requestedAtRevision === cartRevision.current) setCartHydrated(true);
      });
    return () => { active = false; };
  }, []);
  const canonical = `${origin}${product.route}`;
  const structuredData = { "@context": "https://schema.org", "@type": "Product", name: product.name, image: `${origin}${encodeURI(product.image)}`, description: product.seoDescription, brand: { "@type": "Brand", name: "TapRank" }, offers: { "@type": "Offer", price: product.price, priceCurrency: "GBP", url: canonical } };
  return (
    <div className={styles.page} id="top" style={{ "--product-accent": product.accent }}>
      <Head><title>{product.seoTitle}</title><meta name="description" content={product.seoDescription} /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="theme-color" content="#101d38" /><link rel="canonical" href={canonical} /><meta property="og:type" content="website" /><meta property="og:title" content={product.seoTitle} /><meta property="og:description" content={product.seoDescription} /><meta property="og:url" content={canonical} /><meta property="og:image" content={`${origin}${encodeURI(product.image)}`} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></Head>
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <Header product={product} cart={cart} cartLoading={!cartHydrated} onOpenCart={() => setCartOpen(true)} />
      <main id="main">
        <Hero product={product} designId={designId} onDesignChange={setDesignId} onCartChanged={updateCart} onOpenCart={() => setCartOpen(true)} onSelectionChange={setPurchaseSelection} />
        <div className={`${styles.wrap} ${styles.videoWrap}`}><ProductDemoVideo onPlay={() => homepageEvent("demo_video_play", { variant: product.id })} headingId={`${product.id}-video-title`} /></div>
        <HowItWorks product={product} />
        <Proof product={product} />
        <Comparison product={product} />
        <Included product={product} />
        <Setup />
        <FAQ product={product} />
        <section className={styles.finalCta} id="product-final-cta"><div className={styles.wrap}><p className={styles.eyebrow}>Ready when you are</p><h2>Turn the next customer moment into action.</h2><PurchaseLink product={product} location="final" className={styles.lightButton} /><ul><li>One-off payment</li><li>Free UK delivery</li><li>No subscription</li></ul></div></section>
      </main>
      <Footer />
      <MobilePurchase product={product} selection={purchaseSelection} cart={cart} onOpenCart={() => setCartOpen(true)} />
      <CartDrawer cart={cart} cartLoading={!cartHydrated} open={cartOpen} onClose={() => setCartOpen(false)} onCartChanged={updateCart} />
    </div>
  );
}
