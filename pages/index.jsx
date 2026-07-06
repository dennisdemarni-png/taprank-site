import { useEffect, useRef, useState } from "react";
import Head from "next/head";

function makeMailto(subject, body) {
  return `mailto:hello@taprank.co.uk?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

const setupMailto = makeMailto(
  "Standard TapRank Stand Enquiry",
  `Hi TapRank,

I'd like to enquire about a Standard TapRank Stand.

Business name:
Business type:
Website:
How many stands:
Links I'd like included:
Additional information:

Thank you.`
);

const customMailto = makeMailto(
  "Custom TapRank Stand Enquiry",
  `Hi TapRank,

I'd like to enquire about a Custom TapRank Stand.

Business name:
Business type:
Website:
How many stands:
Brand colours:
Links I'd like included:
Additional information:

Thank you.`
);

const launchBundleMailto = makeMailto(
  "Launch Bundle Enquiry",
  `Hi TapRank,

I'd like to enquire about the Buy 2 Get 1 Free launch bundle.

Business name:
Business type:
Website:
Standard or custom stands:
Links I'd like included:
Additional information:

Thank you.`
);

const bundleMailto = makeMailto(
  "Bulk Orders TapRank Stand Enquiry",
  `Hi TapRank,

I'd like to enquire about a bulk TapRank stand order.

Business name:
Business type:
Website:
How many stands:
Standard or custom stands:
Number of locations/counters:
Links I'd like included:
Additional information:

Thank you.`
);

const productImages = {
  standardTransparent: "/product/taprank-standard-stand-transparent.png",
  customTransparent: "/product/taprank-custom-subway-stand-transparent.png",
  googleBefore: "/product/google-profile-before.png",
  googleAfter: "/product/google-profile-after.png",
  clean: "/product/taprank-stand-clean-product.png",
  cafe: "/product/taprank-stand-cafe-counter.jpg",
  closeup: "/product/taprank-stand-closeup.jpg",
  salon: "/product/taprank-stand-salon-counter.jpg",
  barber: "/product/taprank-stand-barber-counter.jpg",
};

const heroStandSlides = [
  {
    src: productImages.standardTransparent,
    alt: "Transparent TapRank acrylic NFC and QR review stand",
    label: "Standard stand",
  },
  {
    src: productImages.customTransparent,
    alt: "Transparent custom TapRank acrylic stand branded for Subway",
    label: "Custom stand",
  },
];

const heroSupportPhotos = [
  {
    src: productImages.cafe,
    alt: "TapRank NFC and QR review stand placed on a cafe counter beside a till",
    label: "Cafe counter",
  },
  {
    src: productImages.closeup,
    alt: "Close-up of a TapRank QR and NFC stand on a reception counter",
    label: "Close-up",
  },
  {
    src: productImages.salon,
    alt: "TapRank stand ready on a bright salon reception counter",
    label: "Salon",
  },
  {
    src: productImages.barber,
    alt: "TapRank stand placed on a barber shop counter",
    label: "Barber",
  },
];

const trustItems = [
  { icon: "✓", title: "No subscription", copy: "One-off payment" },
  { icon: "⚙", title: "Setup included", copy: "Linked before delivery" },
  { icon: "↗", title: "Shipped within 48 hours", copy: "Fast dispatch" },
  { icon: "⌁", title: "NFC + QR included", copy: "Tap or scan" },
  { icon: "★", title: "1-year warranty", copy: "Covered for faults" },
];

const productTabs = [
  {
    id: "standard",
    tab: "Standard Stand",
    title: "Ready-made TapRank Stand",
    image: productImages.standardTransparent,
    alt: "Ready-made TapRank acrylic NFC and QR review stand",
    intro: "A clean counter-ready stand for businesses that want reviews and key links live quickly.",
    bestFor: "Best for reviews, menus, bookings, socials and website links.",
    href: "#pricing",
    cta: "View Standard Stand Pricing",
    features: [
      "NFC tap point and QR code",
      "Live TapRank page",
      "Google review button",
      "Up to 3 extra customer links",
      "Arrives linked and ready to use",
      "No subscription",
    ],
  },
  {
    id: "custom",
    tab: "Custom Stand",
    title: "Custom TapRank Setup",
    image: productImages.customTransparent,
    alt: "Custom branded TapRank acrylic stand example for Subway",
    intro: "A branded stand designed around your business colours, logo and customer actions.",
    bestFor: "Best for restaurants, takeaways, cafes, barbers, salons and local brands.",
    href: "#pricing",
    cta: "View Custom Stand Pricing",
    features: [
      "Custom stand design",
      "Business colours and logo",
      "Menus, reviews, rewards, bookings or socials",
      "Live TapRank page",
      "Arrives fully set up",
      "1-year warranty",
    ],
  },
];

const steps = [
  { icon: "⌁", title: "Customer taps or scans", copy: "NFC and QR give customers two quick ways to open your page." },
  { icon: "▣", title: "TapRank page opens", copy: "A clean live page shows your most useful customer actions." },
  { icon: "↗", title: "They act in seconds", copy: "Review, book, follow, view your menu or message your business." },
];

const pricingCards = [
  {
    title: "TapRank Stand",
    price: "£39.99",
    note: "one-off",
    label: "Ready-made",
    href: setupMailto,
    cta: "Get Your TapRank Stand",
    image: productImages.standardTransparent,
    alt: "Ready-made TapRank acrylic NFC and QR review stand",
    features: [
      "Acrylic NFC + QR stand",
      "Live TapRank page",
      "Google review button",
      "Up to 3 extra links",
      "Setup included",
      "No subscription",
      "1-year warranty",
    ],
  },
  {
    title: "Custom TapRank Setup",
    price: "£69.99",
    note: "one-off",
    label: "Custom",
    href: customMailto,
    cta: "Start Your Custom Setup",
    image: productImages.customTransparent,
    alt: "Custom branded TapRank acrylic stand",
    featured: true,
    features: [
      "Custom stand design",
      "Business colours/logo",
      "Live TapRank page",
      "Google review button",
      "Menus, bookings, socials, website or WhatsApp links",
      "Setup included",
      "No subscription",
      "1-year warranty",
    ],
  },
];

const demos = [
  {
    href: "/r/barber-demo",
    theme: "navy",
    image: "/product/google-profile-after.png",
    title: "Review-first page",
    business: "North & Co. Coffee House",
    category: "Coffee • Reviews • Menu • Contact",
    rating: "4.9 (512)",
    primary: "Leave a Google Review",
    actions: ["View Menu", "Order Online", "Instagram", "Call Us"],
  },
  {
    href: "/r/restaurant-demo",
    theme: "amber",
    image: "/product/taprank-stand-cafe-counter.jpg",
    title: "Customer action page",
    business: "North & Co. Coffee House",
    category: "Coffee • Reviews • Menu • Contact",
    rating: "4.9 (512)",
    primary: "Leave a Google Review",
    actions: ["Website", "Book a Table", "Open in Maps", "Hours"],
  },
  {
    href: "/r/salon-demo",
    theme: "blush",
    image: "/product/taprank-stand-closeup.jpg",
    title: "TapRank mobile template",
    business: "North & Co. Coffee House",
    category: "Coffee • Reviews • Menu • Contact",
    rating: "4.9 (512)",
    primary: "Leave a Google Review",
    actions: ["View Menu", "Order Online", "Website", "Book a Table"],
  },
];

const faqs = [
  [
    "What is included with the standard stand?",
    "The ready-made stand includes the acrylic counter stand, NFC tap point, QR code, live TapRank page, Google review button, up to 3 extra links, setup and a 1-year warranty.",
  ],
  [
    "What is included with the custom stand?",
    "The custom setup includes a branded stand design using your colours or logo, the live TapRank page, customer action links, setup, NFC, QR and a 1-year warranty.",
  ],
  [
    "Do I need an app to use TapRank?",
    "No. Customers tap with NFC or scan the QR code. Your business gets a live TapRank page without asking customers to download anything.",
  ],
  [
    "Does it work on iPhone and Android?",
    "Yes. NFC works with most modern iPhone and Android phones, and the QR code gives everyone a simple scan option too.",
  ],
  [
    "Can I add my own branding/logo?",
    "Yes. Choose the Custom TapRank Setup if you want your logo, colours and a more tailored branded stand.",
  ],
  [
    "Can I use it for menus, bookings, socials and reviews?",
    "Yes. Your TapRank page can link customers to Google reviews, menus, booking pages, socials, WhatsApp, your website and other useful actions.",
  ],
  [
    "Do you offer bulk orders?",
    "Yes. The launch bundle is buy 2, get 1 free, and larger multi-stand orders can be quoted around your quantity, locations and design needs.",
  ],
  [
    "How do I order a custom stand?",
    "Use the custom setup button and send your business name, business type, branding requirements, links and quantity. TapRank will confirm the best setup before production.",
  ],
  [
    "What does the 1-year warranty cover?",
    "The warranty covers product defects or faults for one year. It does not cover deliberate damage.",
  ],
];

function BrandLogo({ placement = "header" }) {
  return (
    <img
      className={`brandLogo brandLogo--${placement}`}
      src={placement === "footer" ? "/taprank-logo-dark.png" : "/taprank-logo-light.png"}
      alt="TapRank"
      width="1280"
      height="331"
    />
  );
}

function Reveal({ as: Tag = "div", children, className = "", delay = 0, style, ...props }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true);
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.16 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={`reveal ${visible ? "isVisible" : ""} ${className}`.trim()}
      style={{ "--delay": `${delay}ms`, ...style }}
      {...props}
    >
      {children}
    </Tag>
  );
}

function SectionIntro({ eyebrow, title, copy, centered = true }) {
  return (
    <Reveal className={`launchSectionIntro ${centered ? "centered" : ""}`}>
      <span className="launchSectionTag">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </Reveal>
  );
}

function HeroGallery() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [resetKey, setResetKey] = useState(0);
  const [paused, setPaused] = useState(false);
  const swipeStartX = useRef(null);
  const activeImage = heroStandSlides[activeIndex];

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    if (paused) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % heroStandSlides.length);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, paused, resetKey]);

  function chooseImage(index) {
    setActiveIndex(index);
    setResetKey((current) => current + 1);
  }

  function moveGallery(direction) {
    setActiveIndex((current) => (current + direction + heroStandSlides.length) % heroStandSlides.length);
    setResetKey((current) => current + 1);
  }

  function startSwipe(event) {
    swipeStartX.current = event.clientX;
  }

  function endSwipe(event) {
    if (swipeStartX.current == null) return;
    const distance = event.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(distance) < 42) return;
    moveGallery(distance > 0 ? -1 : 1);
  }

  return (
    <Reveal
      className="launchHeroVisual heroProductComposition"
      delay={120}
      onPointerEnter={() => setPaused(true)}
      onPointerLeave={() => setPaused(false)}
      onPointerCancel={() => { swipeStartX.current = null; setPaused(false); }}
      onPointerDown={startSwipe}
      onPointerUp={endSwipe}
    >
      <div className="heroVisualHalo" aria-hidden="true" />
      <div className="heroStandStage">
        <img
          key={activeImage.src}
          className="heroStandMain"
          src={activeImage.src}
          alt={activeImage.alt}
          width="1122"
          height="1402"
          fetchPriority={activeIndex === 0 ? "high" : "auto"}
          loading={activeIndex === 0 ? "eager" : "lazy"}
        />
        <div className="heroStandMeta" aria-live="polite">
          <span>{activeImage.label}</span>
          <strong>NFC + QR ready</strong>
        </div>
        <div className="heroStandDots" aria-label="Main product image">
          {heroStandSlides.map((image, index) => (
            <button
              type="button"
              className={index === activeIndex ? "active" : ""}
              aria-label={`Show ${image.label}`}
              aria-pressed={index === activeIndex}
              onClick={() => chooseImage(index)}
              key={image.src}
            />
          ))}
        </div>
      </div>
      <div className="heroLifestyleStack" aria-label="TapRank in real businesses">
        {heroSupportPhotos.map((image, index) => (
          <figure className={`heroLifestyleCard heroLifestyleCard--${index + 1}`} key={image.src}>
            <img
              src={image.src}
              alt={image.alt}
              width="1122"
              height="1402"
              loading={index === 0 ? "eager" : "lazy"}
            />
            <figcaption>{image.label}</figcaption>
          </figure>
        ))}
      </div>
      <div className="heroMobilePhotoStrip" aria-label="TapRank product photos">
        {heroSupportPhotos.slice(0, 3).map((image) => (
          <img
            src={image.src}
            alt={image.alt}
            width="1122"
            height="1402"
            loading="lazy"
            key={image.src}
          />
        ))}
      </div>
    </Reveal>
  );
}

function ProductSwitcher() {
  const [activeId, setActiveId] = useState(productTabs[0].id);
  const activeProduct = productTabs.find((product) => product.id === activeId) || productTabs[0];

  return (
    <Reveal className="productSwitcher">
      <div className="productTabs" role="tablist" aria-label="TapRank product options">
        {productTabs.map((product) => (
          <button
            type="button"
            role="tab"
            aria-selected={activeProduct.id === product.id}
            className={activeProduct.id === product.id ? "active" : ""}
            onClick={() => setActiveId(product.id)}
            key={product.id}
          >
            <span>{product.tab}</span>
          </button>
        ))}
      </div>

      <div className={`productSwitchGrid productSwitchGrid--${activeProduct.id}`}>
        <div className="productSwitchVisual">
          <div className="productOrb" aria-hidden="true" />
          <img
            key={activeProduct.image}
            src={activeProduct.image}
            alt={activeProduct.alt}
            width="1122"
            height="1402"
            loading="lazy"
          />
        </div>
        <div className="productSwitchCopy">
          <span className="launchSectionTag">{activeProduct.tab}</span>
          <h3>{activeProduct.title}</h3>
          <p>{activeProduct.intro}</p>
          <p className="productSwitchBestFor">{activeProduct.bestFor}</p>
          <div className="productFeatureGrid">
            {activeProduct.features.map((feature) => (
              <span key={feature}>✓ {feature}</span>
            ))}
          </div>
          <a className="button" href={activeProduct.href}>{activeProduct.cta} <span>→</span></a>
        </div>
      </div>
    </Reveal>
  );
}

function BeforeAfterSlider() {
  const sliderRef = useRef(null);
  const [position, setPosition] = useState(0);

  function updatePosition(clientX) {
    const bounds = sliderRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(100, Math.max(0, next)));
  }

  function startDrag(event) {
    event.preventDefault();
    event.currentTarget.setPointerCapture?.(event.pointerId);
    updatePosition(event.clientX);

    const onMove = (moveEvent) => updatePosition(moveEvent.clientX);
    const onUp = () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerup", onUp);
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
  }

  function adjustWithKeyboard(event) {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      setPosition((value) => Math.max(0, value - 5));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(100, value + 5));
    }
  }

  return (
    <Reveal className="comparisonShell proofComparisonShell">
      <div className="comparisonSlider proofComparisonSlider" ref={sliderRef} onPointerDown={startDrag}>
        <div className="proofImageLayer beforeProof">
          <img
            src={productImages.googleBefore}
            alt="Example Google business profile before TapRank with fewer reviews"
            width="1122"
            height="1402"
            loading="lazy"
          />
          <div className="proofCaption proofCaption--before">
            <span>Before TapRank</span>
            <strong>Customers leave and forget to search for you.</strong>
          </div>
        </div>
        <div className="proofImageLayer afterProof" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <img
            src={productImages.googleAfter}
            alt="Example Google business profile after TapRank with stronger review proof"
            width="1122"
            height="1402"
            loading="lazy"
          />
          <div className="proofCaption proofCaption--after">
            <span>After TapRank</span>
            <strong>They tap or scan while they’re still at the counter.</strong>
          </div>
        </div>
        <div className="comparisonDivider" style={{ left: `clamp(0px, ${position}%, 100%)` }} aria-hidden="true" />
        <button
          type="button"
          className="comparisonHandle"
          style={{ left: `clamp(24px, ${position}%, calc(100% - 24px))` }}
          aria-label="Drag to compare before and after TapRank"
          aria-valuemin="0"
          aria-valuemax="100"
          aria-valuenow={Math.round(position)}
          role="slider"
          onPointerDown={(event) => {
            event.stopPropagation();
            startDrag(event);
          }}
          onKeyDown={adjustWithKeyboard}
        >
          <span />
        </button>
      </div>
      <p className="proofNote">Drag the slider to compare the idea: less friction before, clearer review action after.</p>
    </Reveal>
  );
}

function PhonePreviewCard({ demo, index }) {
  return (
    <Reveal as="article" className={`phoneDemoCard phoneDemoCard--${demo.theme}`} delay={index * 90}>
      <div className="phoneDemoShell">
        <div className="phoneDemoNotch" />
        <div className="phoneDemoScreen">
          <div className="phoneDemoAvatar">
            <img src={demo.image} alt="" width="180" height="180" loading="lazy" />
          </div>
          <strong>{demo.business}</strong>
          <span className="phoneDemoCategory">{demo.category}</span>
          <div className="phoneDemoStars"><span>★★★★★</span><strong>{demo.rating}</strong></div>
          <div className="phoneDemoPrimary"><b>G</b><strong>{demo.primary}</strong><i>›</i></div>
          <div className="phoneDemoActions">
            {demo.actions.map((action) => <span key={action}>{action}<i>›</i></span>)}
          </div>
          <small>Powered by <img src="/taprank-logo-transparent.png" alt="TapRank" width="1280" height="331" /></small>
        </div>
      </div>
      <div className="phoneDemoCopy">
        <span>{demo.title}</span>
        <a className="button buttonSecondary" href={demo.href}>Open demo <b>↗</b></a>
      </div>
    </Reveal>
  );
}

function CustomStandShowcase() {
  return (
    <div className="customStandGrid">
      <Reveal className="customStandCopy">
        <span className="launchSectionTag">CUSTOM STANDS</span>
        <h2>Brand the stand around your business, not just TapRank.</h2>
        <p>
          Custom TapRank stands can match your logo, colours and customer journey — from menus and rewards
          to reviews, bookings, WhatsApp, socials and websites.
        </p>
        <div className="customUsePills" aria-label="Custom stand use cases">
          <span>Restaurants</span>
          <span>Takeaways</span>
          <span>Cafes</span>
          <span>Barbers</span>
          <span>Salons</span>
          <span>Local services</span>
        </div>
        <a className="button" href="#pricing">See Custom Stand Pricing <span>→</span></a>
      </Reveal>
      <Reveal className="customStandVisual" delay={120}>
        <div className="customStandHalo" aria-hidden="true" />
        <img
          src={productImages.customTransparent}
          alt="Custom branded Subway TapRank NFC and QR acrylic stand"
          width="1130"
          height="1392"
          loading="lazy"
        />
      </Reveal>
    </div>
  );
}

function BulkOrderSection() {
  return (
    <Reveal className="bundleBulkGrid">
      <article className="bundleBulkCard bundleBulkCard--launch">
        <div className="bulkStandCluster bulkStandCluster--standard" aria-hidden="true">
          <img className="bulkStand bulkStand--one" src={productImages.standardTransparent} alt="" width="1122" height="1402" loading="lazy" />
          <img className="bulkStand bulkStand--two" src={productImages.standardTransparent} alt="" width="1122" height="1402" loading="lazy" />
          <img className="bulkStand bulkStand--three" src={productImages.standardTransparent} alt="" width="1122" height="1402" loading="lazy" />
        </div>
        <div className="bulkOrderCopy">
          <span className="launchSectionTag">LAUNCH BUNDLE</span>
          <h2>Buy 2, get 1 free.</h2>
          <p>
            A simple launch offer for businesses that want TapRank at the till, reception and another busy customer point.
          </p>
          <a className="button buttonSecondary" href={launchBundleMailto}>Ask About Launch Bundle <span>→</span></a>
        </div>
      </article>

      <article className="bundleBulkCard bundleBulkCard--bulk">
        <div className="bulkStandCluster bulkStandCluster--custom" aria-hidden="true">
          <img className="bulkStand bulkStand--one" src={productImages.customTransparent} alt="" width="1130" height="1392" loading="lazy" />
          <img className="bulkStand bulkStand--two" src={productImages.customTransparent} alt="" width="1130" height="1392" loading="lazy" />
          <img className="bulkStand bulkStand--three" src={productImages.customTransparent} alt="" width="1130" height="1392" loading="lazy" />
        </div>
        <div className="bulkOrderCopy">
          <span className="launchSectionTag">BULK ORDERS</span>
          <h2>Ordering for multiple counters or locations?</h2>
          <p>
            Bulk orders are quoted around your quantity, design needs and rollout plan. Ideal for chains, venues and multi-room businesses.
          </p>
          <a className="button buttonSecondary" href={bundleMailto}>Request Bulk Quote <span>→</span></a>
        </div>
      </article>
    </Reveal>
  );
}

function DirectOrderPanel() {
  const orderOptions = [
    {
      title: "Standard Stand",
      copy: "Ready-made TapRank stand enquiry.",
      href: setupMailto,
      cta: "Email About Standard",
    },
    {
      title: "Custom Stand",
      copy: "Branded stand with your logo, colours and links.",
      href: customMailto,
      cta: "Email About Custom",
    },
    {
      title: "Bulk Orders",
      copy: "Multiple stands for counters, venues or locations.",
      href: bundleMailto,
      cta: "Email About Bulk",
    },
  ];

  return (
    <div className="directOrderPanel">
      {orderOptions.map((option) => (
        <a className="directOrderOption" href={option.href} key={option.title}>
          <span>{option.title}</span>
          <p>{option.copy}</p>
          <strong>{option.cta} <b>→</b></strong>
        </a>
      ))}
    </div>
  );
}

function MobileStickyCta() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 620);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <a className={`mobileStickyCta ${visible ? "isVisible" : ""}`} href={setupMailto}>
      <span>
        <strong>Get Your TapRank Stand</strong>
        <small>Quick email enquiry</small>
      </span>
      <b>→</b>
    </a>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>TapRank | NFC & QR Review Stands for Local Businesses</title>
        <meta
          name="description"
          content="TapRank creates NFC and QR stands that arrive fully set up and help customers review, book, follow and connect with your business in one tap."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="TapRank | NFC & QR Review Stands for Local Businesses" />
        <meta
          property="og:description"
          content="NFC + QR stands that arrive fully set up, linked to a live page for your business, and ready to place on your counter."
        />
      </Head>

      <header className="siteHeader launchHeader">
        <div className="container launchNav">
          <a className="logoLink" href="#top" aria-label="TapRank home"><BrandLogo /></a>
          <nav className="desktopNav" aria-label="Main navigation">
            <a href="#products">Products</a>
            <a href="#live-demos">Live examples</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#faqs">FAQs</a>
          </nav>
          <a className="button buttonSmall navCta" href={setupMailto}>Get Your TapRank Stand <span>→</span></a>
          <details className="mobileMenu">
            <summary aria-label="Open navigation"><span /><span /><span /></summary>
            <nav>
              <a href="#products">Products</a>
              <a href="#live-demos">Live examples</a>
              <a href="#how-it-works">How it works</a>
              <a href="#pricing">Pricing</a>
              <a href="#faqs">FAQs</a>
              <a className="button" href={setupMailto}>Get Your TapRank Stand</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="top" className="launchHome">
        <section className="launchHero">
          <div className="heroBackgroundShape one" aria-hidden="true" />
          <div className="heroBackgroundShape two" aria-hidden="true" />
          <div className="container launchHeroGrid">
            <Reveal className="launchHeroCopy">
              <span className="heroEyebrow">TapRank for local businesses</span>
              <h1>One tap to your reviews, menus, bookings and socials.</h1>
              <p>
                A clean NFC + QR touchpoint that connects customers to your most useful business actions
                while they are still with you.
              </p>
              <div className="heroActions heroActions--focused">
                <a className="button" href="#how-it-works">How it works <span>→</span></a>
              </div>
            </Reveal>
            <HeroGallery />
          </div>
        </section>

        <section className="section includedSection productChoiceSection" id="products">
          <div className="container">
            <SectionIntro
              eyebrow="PRODUCT OPTIONS"
              title="Choose a ready-made stand or a branded custom setup."
              copy="Both options include NFC, QR, setup, a live TapRank page, no subscription and a 1-year warranty."
            />
            <ProductSwitcher />
            <div className="productTrustRow" aria-label="TapRank buying confidence">
              {trustItems.map((item, index) => (
                <Reveal className="productTrustItem" delay={index * 55} key={item.title}>
                  <span>{item.icon}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <small>{item.copy}</small>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section demosRefreshSection demosRefreshSection--high" id="live-demos">
          <div className="container">
            <SectionIntro
              eyebrow="LIVE EXAMPLES"
              title="Preview the TapRank page customers open when they tap or scan."
              copy="A review-first mobile page for customers already inside the venue — with menus, ordering, socials, calls, bookings and maps still one tap away."
            />
            <div className="phoneDemoGrid">
              {demos.map((demo, index) => <PhonePreviewCard demo={demo} index={index} key={demo.href} />)}
            </div>
          </div>
        </section>

        <section className="section visualStepsSection" id="how-it-works">
          <div className="container">
            <SectionIntro
              eyebrow="HOW IT WORKS"
              title="Three simple moments from counter to customer action."
              copy="No app. No searching. Just tap or scan while the customer is still with you."
            />
            <div className="visualStepsGrid">
              {steps.map((step, index) => (
                <Reveal as="article" className="visualStepCard" delay={index * 90} key={step.title}>
                  <span className="visualStepIcon">{step.icon}</span>
                  <small>Step {index + 1}</small>
                  <h3>{step.title}</h3>
                  <p>{step.copy}</p>
                  {index < steps.length - 1 ? <i aria-hidden="true">→</i> : null}
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section comparisonSection">
          <div className="container">
            <SectionIntro
              eyebrow="BEFORE / AFTER"
              title="Turn a forget-later moment into a tap-now action."
              copy="A simple counter touchpoint keeps the next step clear while the customer is still there."
            />
            <BeforeAfterSlider />
          </div>
        </section>

        <section className="section customStandSection" id="custom-stands">
          <div className="container">
            <CustomStandShowcase />
          </div>
        </section>

        <section className="section pricingRefreshSection" id="pricing">
          <div className="container">
            <SectionIntro
              eyebrow="PRICING"
              title="Simple one-off pricing. No subscription."
              copy="Two clear ways to launch, both with setup included and a 1-year warranty."
            />
            <div className="pricingRefreshGrid">
              {pricingCards.map((plan, index) => (
                <Reveal as="article" className={`pricingRefreshCard launchPricingCard ${plan.featured ? "featured" : ""}`} delay={index * 100} key={plan.title}>
                  <img src={plan.image} alt={plan.alt} width="1122" height="1402" loading="lazy" />
                  <span className="pricingLabel">{plan.label}</span>
                  <h3>{plan.title}</h3>
                  <p className="newPrice"><strong>{plan.price}</strong><span>{plan.note}</span></p>
                  <ul>
                    {plan.features.map((feature) => <li key={feature}>{feature}</li>)}
                  </ul>
                  <a className={`button fullButton ${plan.featured ? "" : "buttonSecondary"}`} href={plan.href}>{plan.cta}</a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section bulkOrderSection" id="launch-bundle">
          <div className="container">
            <BulkOrderSection />
          </div>
        </section>

        <section className="section orderSection" id="order">
          <div className="container orderGrid">
            <Reveal className="orderCopy">
              <span className="launchSectionTag">DIRECT ORDER</span>
              <h2>Start with a quick email and we’ll confirm the right setup.</h2>
              <p>
                Choose the closest enquiry below and your email will open with the useful details already laid out.
                Add your business name, links and quantity, then send it over.
              </p>
              <div className="orderButtons">
                <a className="button" href={setupMailto}>Get Your TapRank Stand <span>→</span></a>
                <a className="button buttonSecondary" href={customMailto}>Start Your Custom Setup</a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <DirectOrderPanel />
            </Reveal>
          </div>
        </section>

        <section className="section faqSection" id="faqs">
          <div className="container faqGrid">
            <Reveal className="faqIntro">
              <span className="launchSectionTag">FAQs</span>
              <h2>Quick answers before you order.</h2>
              <p>Short, plain-English answers for local business owners.</p>
            </Reveal>
            <div className="faqList">
              {faqs.map(([question, answer], index) => (
                <Reveal as="details" className="faqItem" delay={index * 35} key={question}>
                  <summary>{question}<span>+</span></summary>
                  <p>{answer}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="finalRefreshSection" id="contact">
          <div className="container">
            <Reveal className="finalRefreshCard launchFinalCard">
              <img
                src={productImages.cafe}
                alt="TapRank stand ready to use on a cafe counter"
                width="1122"
                height="1402"
                loading="lazy"
              />
              <div>
                <span className="launchSectionTag">READY WHEN YOU ARE</span>
                <h2>Get your TapRank stand linked and ready for your counter.</h2>
                <p>One-off payment. No subscription. Setup included.</p>
                <div className="heroActions">
                  <a className="button" href={setupMailto}>Get Your TapRank Stand <span>→</span></a>
                  <a className="button buttonSecondary" href="#live-demos">View Live Examples</a>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="siteFooter refreshedFooter">
        <div className="container footerTop">
          <div className="footerBrand">
            <BrandLogo placement="footer" />
            <strong className="footerSlogan">Connect customers to what matters.</strong>
            <p>NFC + QR stands linked to live TapRank pages for reviews, menus, bookings, socials and more.</p>
          </div>
          <div className="footerLinks">
            <div><h3>Explore</h3><a href="#products">Products</a><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a></div>
            <div><h3>Live demos</h3><a href="/r/barber-demo">Barber</a><a href="/r/restaurant-demo">Restaurant</a><a href="/r/salon-demo">Salon</a></div>
            <div><h3>Get in touch</h3><a href={setupMailto}>Get your stand</a><a href="mailto:hello@taprank.co.uk">hello@taprank.co.uk</a></div>
          </div>
        </div>
        <div className="container footerBottom"><p>© {new Date().getFullYear()} TapRank. One tap to your next customer action.</p><p>taprank.co.uk</p></div>
      </footer>

      <MobileStickyCta />
    </>
  );
}
