import { useEffect, useRef, useState } from "react";
import Head from "next/head";

const setupMailto = "mailto:hello@taprank.co.uk?subject=TapRank%20Stand%20Setup%20Request";
const customMailto = "mailto:hello@taprank.co.uk?subject=TapRank%20Custom%20Setup%20Request";
const bundleMailto = "mailto:hello@taprank.co.uk?subject=TapRank%20Buy%202%20Get%201%20Free%20Bundle";

const productImages = {
  clean: "/product/taprank-stand-clean-product.png",
  cafe: "/product/taprank-stand-cafe-counter.jpg",
  closeup: "/product/taprank-stand-closeup.jpg",
  salon: "/product/taprank-stand-salon-counter.jpg",
  barber: "/product/taprank-stand-barber-counter.jpg",
};

const heroGallery = [
  {
    src: productImages.clean,
    alt: "Clean plain-background TapRank acrylic NFC and QR review stand",
    label: "Product shot",
  },
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
  { icon: "⌁", title: "NFC + QR included", copy: "Tap or scan" },
  { icon: "★", title: "1-year warranty", copy: "Covered for faults" },
];

const includedItems = [
  { title: "Acrylic counter stand", copy: "Clean, counter-ready display for tills, receptions and tables." },
  { title: "NFC tap point", copy: "Customers can tap with most modern phones — no app needed." },
  { title: "QR code", copy: "A simple scan option when NFC is unavailable or switched off." },
  { title: "Live TapRank page", copy: "Reviews, bookings, menus, socials, website or WhatsApp links." },
  { title: "Linked before delivery", copy: "Your stand arrives ready to place straight on the counter." },
  { title: "1-year warranty", copy: "Covers product defects and faults, not deliberate damage." },
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
    image: productImages.clean,
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
    cta: "Start Custom Setup",
    image: productImages.barber,
    alt: "TapRank acrylic stand on a barber shop counter",
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
    mark: "✂",
    title: "Barber demo",
    business: "Sunset Barber Co.",
    actions: ["Review us on Google", "Book appointment", "View services"],
  },
  {
    href: "/r/restaurant-demo",
    theme: "amber",
    mark: "🍽",
    title: "Restaurant demo",
    business: "Olive & Oak",
    actions: ["View menu", "Book a table", "Get directions"],
  },
  {
    href: "/r/salon-demo",
    theme: "blush",
    mark: "✦",
    title: "Salon demo",
    business: "Luxe Beauty Salon",
    actions: ["Book treatment", "Message on WhatsApp", "Follow Instagram"],
  },
];

const faqs = [
  [
    "Does the stand come already set up?",
    "Yes. Setup is included. Your TapRank stand is linked and tested before delivery so it arrives ready to place on your counter.",
  ],
  [
    "Is there a monthly subscription?",
    "No. The ready-made TapRank Stand is £39.99 one-off and the Custom TapRank Setup is £69.99 one-off.",
  ],
  [
    "Can I add my business logo?",
    "Yes. Choose the Custom TapRank Setup if you want your logo, colours and a more tailored stand design.",
  ],
  [
    "What happens when customers tap or scan?",
    "They open your live TapRank page, where they can review, book, view menus, follow socials, visit your website or message you.",
  ],
  [
    "Will it work with iPhone and Android?",
    "Yes. NFC works with most modern iPhone and Android phones, and the QR code gives customers a scan option too.",
  ],
  [
    "What if a customer’s phone does not use NFC?",
    "They can scan the QR code instead. Customers do not need to download an app.",
  ],
  [
    "Can I order more than one stand?",
    "Yes. The launch bundle is buy 2, get 1 free — useful for reception, the till, tables, counters or extra locations.",
  ],
  [
    "Can I change my links later?",
    "Yes. Contact TapRank and your links can be updated without replacing the stand, NFC tag or QR code.",
  ],
  [
    "What does the 1-year warranty cover?",
    "The warranty covers product defects or faults for one year. It does not cover deliberate damage.",
  ],
  [
    "How do I order?",
    "Use the order buttons or form on this page to email TapRank directly while online checkout is being prepared.",
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

function Reveal({ as: Tag = "div", children, className = "", delay = 0 }) {
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
      style={{ "--delay": `${delay}ms` }}
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
  const activeImage = heroGallery[activeIndex];

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;

    const timer = window.setTimeout(() => {
      setActiveIndex((current) => (current + 1) % heroGallery.length);
    }, 4000);

    return () => window.clearTimeout(timer);
  }, [activeIndex, resetKey]);

  function chooseImage(index) {
    setActiveIndex(index);
    setResetKey((current) => current + 1);
  }

  return (
    <Reveal className="launchHeroVisual" delay={120}>
      <div className="galleryGlow" aria-hidden="true" />
      <div className="galleryMainFrame">
        <img
          key={activeImage.src}
          className="galleryMainImage"
          src={activeImage.src}
          alt={activeImage.alt}
          width="1122"
          height="1402"
          fetchPriority={activeIndex === 0 ? "high" : "auto"}
          loading={activeIndex === 0 ? "eager" : "lazy"}
        />
        <div className="galleryBadge">
          <span>From £39.99</span>
          <strong>No subscription</strong>
        </div>
      </div>
      <div className="galleryThumbs" aria-label="TapRank product gallery">
        {heroGallery.map((image, index) => (
          <button
            type="button"
            className={index === activeIndex ? "active" : ""}
            aria-pressed={index === activeIndex}
            onClick={() => chooseImage(index)}
            key={image.src}
          >
            <img src={image.src} alt="" width="1122" height="1402" loading={index < 2 ? "eager" : "lazy"} />
            <span>{image.label}</span>
          </button>
        ))}
      </div>
    </Reveal>
  );
}

function BeforeAfterSlider() {
  const sliderRef = useRef(null);
  const [position, setPosition] = useState(52);

  function updatePosition(clientX) {
    const bounds = sliderRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const next = ((clientX - bounds.left) / bounds.width) * 100;
    setPosition(Math.min(88, Math.max(12, next)));
  }

  function startDrag(event) {
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
      setPosition((value) => Math.max(12, value - 5));
    }
    if (event.key === "ArrowRight") {
      event.preventDefault();
      setPosition((value) => Math.min(88, value + 5));
    }
  }

  return (
    <Reveal className="comparisonShell">
      <div className="comparisonSlider" ref={sliderRef}>
        <div className="comparisonPanel beforePanel">
          <span className="comparisonKicker">Before TapRank</span>
          <h3>Customers leave and forget to search for you.</h3>
          <div className="frictionStack" aria-hidden="true">
            <span>Search Google</span>
            <span>Find the right business</span>
            <span>Remember to review</span>
          </div>
        </div>
        <div className="comparisonPanel afterPanel" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
          <span className="comparisonKicker">After TapRank</span>
          <h3>They tap or scan while they’re still at the counter.</h3>
          <div className="afterVisual">
            <img
              src={productImages.clean}
              alt="TapRank stand showing NFC and QR actions"
              width="1122"
              height="1402"
              loading="lazy"
            />
            <div className="miniPhoneCard" aria-hidden="true">
              <strong>TapRank page</strong>
              <span>Review us on Google</span>
              <span>Book now</span>
              <span>Follow Instagram</span>
            </div>
          </div>
        </div>
        <button
          type="button"
          className="comparisonHandle"
          style={{ left: `${position}%` }}
          aria-label="Drag to compare before and after TapRank"
          aria-valuemin="12"
          aria-valuemax="88"
          aria-valuenow={Math.round(position)}
          role="slider"
          onPointerDown={startDrag}
          onKeyDown={adjustWithKeyboard}
        >
          <span />
        </button>
      </div>
    </Reveal>
  );
}

function PhonePreviewCard({ demo, index }) {
  return (
    <Reveal as="article" className={`phoneDemoCard phoneDemoCard--${demo.theme}`} delay={index * 90}>
      <div className="phoneDemoShell">
        <div className="phoneDemoNotch" />
        <div className="phoneDemoScreen">
          <div className="phoneDemoHero">
            <span>{demo.mark}</span>
          </div>
          <strong>{demo.business}</strong>
          <div className="phoneDemoStars">★★★★★</div>
          <div className="phoneDemoActions">
            {demo.actions.map((action) => <span key={action}>{action}<i>›</i></span>)}
          </div>
          <small>Powered by TapRank</small>
        </div>
      </div>
      <div className="phoneDemoCopy">
        <span>{demo.title}</span>
        <a className="button buttonSecondary" href={demo.href}>Open demo <b>↗</b></a>
      </div>
    </Reveal>
  );
}

function OrderForm() {
  return (
    <form
      className="orderForm"
      action="mailto:hello@taprank.co.uk?subject=TapRank%20Order%20Enquiry"
      method="post"
      encType="text/plain"
    >
      <label>
        <span>Name</span>
        <input name="Name" type="text" autoComplete="name" />
      </label>
      <label>
        <span>Business name</span>
        <input name="Business name" type="text" autoComplete="organization" />
      </label>
      <label>
        <span>Email</span>
        <input name="Email" type="email" autoComplete="email" />
      </label>
      <label>
        <span>Phone optional</span>
        <input name="Phone" type="tel" autoComplete="tel" />
      </label>
      <label className="wide">
        <span>Setup choice</span>
        <select name="Setup choice" defaultValue="TapRank Stand">
          <option>TapRank Stand</option>
          <option>Custom Setup</option>
          <option>Buy 2 Get 1 Free Bundle</option>
        </select>
      </label>
      <label className="wide">
        <span>Message</span>
        <textarea name="Message" rows="4" placeholder="Tell us your Google review link, website, menu, booking link or social links." />
      </label>
      <button className="button fullButton" type="submit">Send Order Enquiry <span>→</span></button>
    </form>
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
        <small>From £39.99 · No subscription</small>
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
            <a href="#included">Included</a>
            <a href="#how-it-works">How it works</a>
            <a href="#live-demos">Live examples</a>
            <a href="#pricing">Pricing</a>
            <a href="#faqs">FAQs</a>
          </nav>
          <a className="button buttonSmall navCta" href={setupMailto}>Get Your TapRank Stand <span>→</span></a>
          <details className="mobileMenu">
            <summary aria-label="Open navigation"><span /><span /><span /></summary>
            <nav>
              <a href="#included">Included</a>
              <a href="#how-it-works">How it works</a>
              <a href="#live-demos">Live examples</a>
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
              <span className="heroEyebrow">Counter-ready NFC + QR stands for local businesses</span>
              <h1>One tap to your reviews, menus, bookings and socials.</h1>
              <p>
                TapRank creates acrylic stands that arrive fully set up, linked to a live page for your business,
                and ready to place on your counter.
              </p>
              <div className="heroActions">
                <a className="button" href={setupMailto}>Get Your TapRank Stand <span>→</span></a>
                <a className="button buttonSecondary" href="#live-demos">View Live Examples</a>
              </div>
              <div className="heroMicroProof">
                <strong>£39.99 one-off</strong>
                <span>Setup included</span>
                <span>Buy 2, get 1 free</span>
              </div>
            </Reveal>
            <HeroGallery />
          </div>
        </section>

        <section className="trustStrip launchTrustStrip" aria-label="TapRank buying confidence">
          <div className="container trustStripGrid">
            {trustItems.map((item, index) => (
              <Reveal className="trustStripItem" delay={index * 70} key={item.title}>
                <span>{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.copy}</small>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section includedSection" id="included">
          <div className="container">
            <SectionIntro
              eyebrow="WHAT'S INCLUDED"
              title="The stand, the tap point, the QR code and the live page — already linked."
              copy="A polished physical product connected to the customer actions that matter most."
            />
            <div className="includedVisualGrid">
              <Reveal className="includedProduct">
                <img
                  src={productImages.clean}
                  alt="TapRank acrylic NFC and QR counter stand with plain background"
                  width="1122"
                  height="1402"
                  loading="lazy"
                />
                <span className="includedCallout calloutOne">NFC tap point</span>
                <span className="includedCallout calloutTwo">QR scan code</span>
                <span className="includedCallout calloutThree">Powered by TapRank</span>
              </Reveal>
              <div className="includedCards">
                {includedItems.map((item, index) => (
                  <Reveal as="article" className="includedCard" delay={index * 55} key={item.title}>
                    <span>{index + 1}</span>
                    <h3>{item.title}</h3>
                    <p>{item.copy}</p>
                  </Reveal>
                ))}
              </div>
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
            <Reveal className="launchBundle">
              <div>
                <span>Launch offer</span>
                <strong>Buy 2, get 1 free.</strong>
                <p>Use one at reception, one near the till and one on a table or counter.</p>
              </div>
              <a className="button buttonSecondary" href={bundleMailto}>Ask About Bundle <span>→</span></a>
            </Reveal>
          </div>
        </section>

        <section className="section demosRefreshSection" id="live-demos">
          <div className="container">
            <SectionIntro
              eyebrow="LIVE EXAMPLES"
              title="The physical stand opens a live TapRank page."
              copy="Preview how customers can review, book, view menus or follow a business from one page."
            />
            <div className="phoneDemoGrid">
              {demos.map((demo, index) => <PhonePreviewCard demo={demo} index={index} key={demo.href} />)}
            </div>
          </div>
        </section>

        <section className="section orderSection" id="order">
          <div className="container orderGrid">
            <Reveal className="orderCopy">
              <span className="launchSectionTag">DIRECT ORDER</span>
              <h2>Order directly while we prepare online checkout.</h2>
              <p>
                Send your details and we’ll help you choose the right setup. You can start with the £39.99 stand,
                the £69.99 custom setup, or the launch bundle.
              </p>
              <div className="orderButtons">
                <a className="button" href={setupMailto}>Get Your TapRank Stand <span>→</span></a>
                <a className="button buttonSecondary" href={customMailto}>Start Custom Setup</a>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <OrderForm />
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
            <div><h3>Explore</h3><a href="#included">Included</a><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a></div>
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
