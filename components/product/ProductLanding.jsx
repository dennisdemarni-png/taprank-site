import { useEffect, useRef, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import ProductDemoVideo from "../ProductDemoVideo";
import { Arrow, Logo } from "../homepage/Visuals";
import { assets, customerProof, faqs, productLandingContent } from "../homepage/content";
import { TAPRANK_CONTACT } from "../../lib/contact";
import { externalLinkProps } from "../../lib/publicLinks";
import { homepageEvent } from "../../lib/homepageEvents";
import CartDrawer from "./CartDrawer";
import ProductConfigurator from "./ProductConfigurator";
import styles from "./ProductLanding.module.css";

const origin = "https://www.taprank.co.uk";

const comparisonRows = [
  ["NFC tap", "Commonly included", "Included and configured"],
  ["QR code", "Commonly included", "Included and configured"],
  ["Customer journey", "Usually one direct destination", "Hosted TapRank business page"],
  ["Other useful links", "Not part of a simple single-link stand", "Instagram, bookings, menu, call, directions and more"],
  ["Setup", "Varies", "TapRank configures the page, NFC and QR"],
  ["Monthly subscription", "Varies", "None required"],
  ["Replacement warranty", "Varies", "1-year replacement warranty"],
];

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

function Header({ product, cart, onOpenCart }) {
  return (
    <>
      <div className={styles.announcement}>Free UK delivery <span>·</span> One-off payment <span>·</span> No subscription</div>
      <header className={styles.header}>
        <div className={styles.wrap}>
          <a href="/" aria-label="TapRank home"><Logo /></a>
          <nav aria-label="Product page navigation">
            <a href="#how-it-works">How it works</a>
            <a href="#compare">Compare</a>
            <a href="#faq">FAQ</a>
          </nav>
          <button className={styles.cartButton} type="button" onClick={onOpenCart} aria-label={`Open cart with ${cart?.itemCount || 0} items`}>Cart <span>{cart?.itemCount || 0}</span></button>
          <PurchaseLink product={product} location="header" className={styles.headerButton}>Configure</PurchaseLink>
        </div>
      </header>
    </>
  );
}

function Hero({ product, onCartChanged, onOpenCart }) {
  return (
    <section className={`${styles.wrap} ${styles.hero}`} id="product-hero" aria-labelledby="product-title">
      <div className={styles.heroGallery}>
        <div className={styles.heroArt} style={{ "--accent": product.accent }}>
          <span className={styles.available}>Current design · Available now</span>
          <div className={`${styles.productImage} ${product.id === "custom" ? styles.customImage : ""}`}>
            <Image src={product.image} alt={product.imageAlt} fill priority loading="eager" sizes="(max-width: 760px) 92vw, 50vw" />
          </div>
          <small>A7 acrylic tabletop stand · NFC + QR</small>
        </div>
        <div className={styles.galleryNotes}><span>Front and centre on your counter</span><span>Tap or scan in seconds</span><span>Arrives ready to use</span></div>
      </div>
      <div className={styles.heroCopy}>
        <p className={styles.eyebrow}>{product.eyebrow}</p>
        <h1 id="product-title">{product.headline}</h1>
        <p className={styles.lead}>{product.lead}</p>
        <div className={styles.price}><strong>£{product.price}</strong><span>One-off payment</span></div>
        <ul className={styles.reassurance}>
          <li>No subscription</li>
          <li>Free UK delivery</li>
          <li>Arrives configured and ready to use</li>
        </ul>
        <ProductConfigurator product={product} onCartChanged={onCartChanged} onOpenCart={onOpenCart} />
      </div>
      {product.id === "google" && (
        <details className={styles.classicNote} id="classic-design">
          <summary>Looking for our Classic design? <span>You may have seen it in one of our earlier ads. View Classic</span></summary>
          <div>
            <Image src={assets.googleClassic} alt="Google Review TapRank Classic stand design" width={150} height={150} />
            <p><strong>Classic design</strong><span>This earlier design is currently sold out. The Current design above is available now.</span></p>
          </div>
        </details>
      )}
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
          <small>{customerProof.disclaimer} Exact customer details can be added here if approved later.</small>
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
      <div className={styles.sectionHeading}>
        <p className={styles.eyebrow}>The TapRank difference</p>
        <h2 id="compare-title">More than a basic NFC review stand.</h2>
        <p>A simple stand can point to one place. TapRank connects the physical product to a hosted business page that stays useful beyond the first action.</p>
      </div>
      <div className={styles.comparison} role="table" aria-label="Basic review stand compared with TapRank">
        <div className={styles.comparisonHead} role="row"><span role="columnheader">Feature</span><span role="columnheader">Basic NFC/QR review stand</span><strong role="columnheader">TapRank</strong></div>
        {comparisonRows.map(([feature, basic, taprank]) => (
          <div role="row" key={feature}><strong role="rowheader">{feature}</strong><span role="cell">{basic}</span><span role="cell">{taprank}</span></div>
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
          <div><p className={styles.eyebrow}>Your hosted TapRank page</p><h3>The first action is only the beginning.</h3><p>Where relevant, your page can also include Instagram, bookings or enquiries, menu and website links, phone actions, directions and opening hours.</p><a href="/r/restaurant-demo" onClick={() => homepageEvent("demo_viewed", { variant: product.id })}>Explore a demo page <Arrow /></a></div>
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
      <div>{faqs.slice(0, 9).map(([question, answer], index) => <details key={question} onToggle={event => event.currentTarget.open && homepageEvent("faq_open", { variant: product.id, question: index })}><summary>{question}<span aria-hidden="true">+</span></summary><p>{answer}</p></details>)}</div>
    </section>
  );
}

function MobilePurchase({ product, cart, onOpenCart }) {
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
  return visible ? <div className={styles.mobilePurchase}><span><strong>{product.name}</strong><small>{cart?.itemCount ? `${cart.itemCount} in cart` : `£${product.price} · Free UK delivery`}</small></span>{cart?.itemCount ? <button className={styles.stickyButton} type="button" onClick={onOpenCart}>View cart</button> : <PurchaseLink product={product} location="mobile_sticky" className={styles.stickyButton}>Configure</PurchaseLink>}</div> : null;
}

function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`${styles.wrap} ${styles.footerGrid}`}>
        <div><a href="/" aria-label="TapRank home"><Logo /></a><p>Connect customers to what matters.</p></div>
        <nav aria-label="Products"><strong>Products</strong>{Object.values(productLandingContent).map(item => <a href={item.route} key={item.id}>{item.shortName}</a>)}</nav>
        <nav aria-label="Customer information"><strong>Customer information</strong><a href={`mailto:${TAPRANK_CONTACT.email}`}>Contact</a><a href="#setup-title">Delivery &amp; setup</a><a href="#faq">Warranty</a><a href="/privacy">Privacy</a>{/* TODO: Add Returns / Refunds and Terms links only after TapRank supplies and approves the policy wording. */}</nav>
      </div>
      <div className={`${styles.wrap} ${styles.footerBottom}`}><span>© {new Date().getFullYear()} TapRank</span><span>{TAPRANK_CONTACT.email}</span></div>
    </footer>
  );
}

export default function ProductLanding({ productId }) {
  const product = productLandingContent[productId];
  const [cart, setCart] = useState({ items: [], itemCount: 0, totalPence: 0, status: "active" });
  const [cartOpen, setCartOpen] = useState(false);
  useEffect(() => { homepageEvent("product_page_view", { variant: product.id }); }, [product.id]);
  useEffect(() => {
    let active = true;
    fetch("/api/cart")
      .then((response) => response.json())
      .then((result) => { if (active && result?.ok) setCart(result.cart); })
      .catch(() => {});
    return () => { active = false; };
  }, []);
  const canonical = `${origin}${product.route}`;
  const structuredData = { "@context": "https://schema.org", "@type": "Product", name: product.name, image: `${origin}${encodeURI(product.image)}`, description: product.seoDescription, brand: { "@type": "Brand", name: "TapRank" }, offers: { "@type": "Offer", price: product.price, priceCurrency: "GBP", url: canonical } };
  return (
    <div className={styles.page} id="top" style={{ "--product-accent": product.accent }}>
      <Head><title>{product.seoTitle}</title><meta name="description" content={product.seoDescription} /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="theme-color" content="#101d38" /><link rel="canonical" href={canonical} /><meta property="og:type" content="website" /><meta property="og:title" content={product.seoTitle} /><meta property="og:description" content={product.seoDescription} /><meta property="og:url" content={canonical} /><meta property="og:image" content={`${origin}${encodeURI(product.image)}`} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></Head>
      <a className={styles.skipLink} href="#main">Skip to content</a>
      <Header product={product} cart={cart} onOpenCart={() => setCartOpen(true)} />
      <main id="main">
        <Hero product={product} onCartChanged={setCart} onOpenCart={() => setCartOpen(true)} />
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
      <MobilePurchase product={product} cart={cart} onOpenCart={() => setCartOpen(true)} />
      <CartDrawer cart={cart} open={cartOpen} onClose={() => setCartOpen(false)} onCartChanged={setCart} />
    </div>
  );
}
