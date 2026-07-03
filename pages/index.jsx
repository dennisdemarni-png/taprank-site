import { useEffect, useRef, useState } from "react";
import Head from "next/head";

const setupMailto = "mailto:hello@taprank.co.uk?subject=TapRank%20Stand%20Setup%20Request";
const customMailto = "mailto:hello@taprank.co.uk?subject=TapRank%20Custom%20Setup%20Request";

const productImages = {
  hero: "/product/taprank-stand-cafe-counter.jpg",
  closeup: "/product/taprank-stand-closeup.jpg",
  salon: "/product/taprank-stand-salon-counter.jpg",
  barber: "/product/taprank-stand-barber-counter.jpg",
};

const trustItems = [
  { icon: "✓", title: "No subscription", copy: "One-off payment" },
  { icon: "⚙", title: "Comes fully set up", copy: "Linked before delivery" },
  { icon: "⌁", title: "NFC + QR included", copy: "Tap or scan" },
  { icon: "★", title: "1-year warranty", copy: "Built for real counters" },
];

const productCards = [
  {
    title: "TapRank Stand",
    price: "£39.99",
    tag: "Ready-made",
    image: productImages.closeup,
    alt: "Ready-made TapRank acrylic review stand with QR code and NFC tap area",
    bullets: ["NFC + QR stand", "Live TapRank page", "Google review button"],
    cta: "Get Your TapRank Stand",
    href: setupMailto,
  },
  {
    title: "Custom TapRank Setup",
    price: "£69.99",
    tag: "Custom",
    image: productImages.barber,
    alt: "TapRank acrylic stand on a barber shop counter",
    bullets: ["Business colours/logo", "Menus, bookings, socials or WhatsApp", "Arrives ready to use"],
    cta: "Start Your Custom Setup",
    href: customMailto,
  },
  {
    title: "NFC/QR Cards or Stickers",
    price: "Ask us",
    tag: "Add-ons",
    image: productImages.salon,
    alt: "TapRank review stand on a salon reception counter",
    bullets: ["Great for tables and tills", "Same TapRank page", "Useful for extra locations"],
    cta: "Ask About Bundles",
    href: "mailto:hello@taprank.co.uk?subject=TapRank%20Multi-Stand%20Bundle",
  },
];

const steps = [
  ["01", "We set it up", "Send your business name, review link and the customer actions you want."],
  ["02", "You place it on your counter", "Your stand arrives linked, tested and ready for the till, table or reception."],
  ["03", "Customers tap or scan", "They can review, book, view menus, follow socials or open your links in seconds."],
];

const demos = [
  {
    href: "/r/barber-demo",
    icon: "✂",
    title: "Barber demo",
    copy: "Reviews, bookings, services and socials in one simple TapRank page.",
  },
  {
    href: "/r/restaurant-demo",
    icon: "🍽",
    title: "Restaurant demo",
    copy: "Menus, table bookings, Google reviews and directions for customers.",
  },
  {
    href: "/r/salon-demo",
    icon: "✦",
    title: "Salon demo",
    copy: "Bookings, treatments, reviews, WhatsApp and social links in one tap.",
  },
];

const pricingCards = [
  {
    title: "Ready-Made TapRank Stand",
    price: "£39.99",
    note: "one-off",
    label: "Best for a fast launch",
    href: setupMailto,
    cta: "Get Your TapRank Stand",
    features: [
      "NFC + QR stand",
      "Live TapRank page",
      "Google review button",
      "Up to 3 extra links",
      "Comes fully set up",
      "No subscription",
      "1-year warranty",
    ],
  },
  {
    title: "Custom TapRank Setup",
    price: "£69.99",
    note: "one-off",
    label: "Most flexible",
    href: customMailto,
    cta: "Start Your Custom Setup",
    featured: true,
    features: [
      "Custom stand design",
      "Business colours/logo",
      "Live TapRank page",
      "Google review button",
      "Menus, bookings, socials, website or WhatsApp links",
      "Comes fully set up",
      "No subscription",
      "1-year warranty",
    ],
  },
];

const businessTypes = ["Barbers", "Salons", "Cafes", "Restaurants", "Local services"];

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
      { threshold: 0.18 }
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
    <Reveal className={`newSectionIntro ${centered ? "centered" : ""}`}>
      <span className="newSectionTag">{eyebrow}</span>
      <h2>{title}</h2>
      {copy ? <p>{copy}</p> : null}
    </Reveal>
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

      <header className="siteHeader refreshedHeader">
        <div className="container refreshedNav">
          <a className="logoLink" href="#top" aria-label="TapRank home"><BrandLogo /></a>
          <nav className="desktopNav" aria-label="Main navigation">
            <a href="#products">Products</a>
            <a href="#how-it-works">How it works</a>
            <a href="#live-demos">Live examples</a>
            <a href="#pricing">Pricing</a>
          </nav>
          <a className="button buttonSmall navCta" href={setupMailto}>Get Your TapRank Stand <span>→</span></a>
          <details className="mobileMenu">
            <summary aria-label="Open navigation"><span /><span /><span /></summary>
            <nav>
              <a href="#products">Products</a>
              <a href="#how-it-works">How it works</a>
              <a href="#live-demos">Live examples</a>
              <a href="#pricing">Pricing</a>
              <a className="button" href={setupMailto}>Get Your TapRank Stand</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="top" className="refreshedHome">
        <section className="newHero">
          <div className="newHeroGlow" aria-hidden="true" />
          <div className="container newHeroGrid">
            <Reveal className="newHeroCopy">
              <span className="heroEyebrow">Connect customers to what matters.</span>
              <h1>One tap to your reviews, menus, bookings and socials.</h1>
              <p>
                TapRank creates NFC + QR stands that arrive fully set up, linked to a live page for your business,
                and ready to place on your counter.
              </p>
              <div className="heroActions">
                <a className="button" href={setupMailto}>Get Your TapRank Stand <span>→</span></a>
                <a className="button buttonSecondary" href="#live-demos">View Live Examples</a>
              </div>
              <div className="heroTrustNotes" aria-label="TapRank trust notes">
                <span>No subscription</span>
                <span>Setup included</span>
                <span>1-year warranty</span>
              </div>
            </Reveal>

            <Reveal className="newHeroVisual" delay={120}>
              <div className="heroImageFrame">
                <img
                  src={productImages.hero}
                  alt="TapRank NFC and QR review stand placed on a cafe counter beside a till"
                  width="1122"
                  height="1402"
                />
                <span className="heroImageBadge">Arrives linked and ready to use</span>
              </div>
              <div className="heroThumbRail" aria-label="TapRank product photos">
                <img src={productImages.closeup} alt="Close-up of a TapRank QR and NFC stand" width="1122" height="1402" />
                <img src={productImages.salon} alt="TapRank stand on a salon reception counter" width="1122" height="1402" />
                <img src={productImages.barber} alt="TapRank stand on a barber shop counter" width="1122" height="1402" />
              </div>
            </Reveal>
          </div>
        </section>

        <section className="trustStrip" aria-label="TapRank buying confidence">
          <div className="container trustStripGrid">
            {trustItems.map((item, index) => (
              <Reveal className="trustStripItem" delay={index * 80} key={item.title}>
                <span>{item.icon}</span>
                <div>
                  <strong>{item.title}</strong>
                  <small>{item.copy}</small>
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="section newProblemSection">
          <div className="container problemRefreshGrid">
            <Reveal className="problemHeadline">
              <span className="newSectionTag">THE SIMPLE IDEA</span>
              <h2>Customers should not have to search for you after they leave.</h2>
            </Reveal>
            <Reveal className="problemSolutionCard" delay={100}>
              <p>
                Put one clear TapRank touchpoint where the customer already is — your counter, till, reception or table.
              </p>
              <div className="miniFlow">
                <span>Tap</span>
                <i>→</i>
                <span>Choose</span>
                <i>→</i>
                <span>Review / book / follow</span>
              </div>
              <strong>No app. No searching. Just tap or scan.</strong>
            </Reveal>
          </div>
        </section>

        <section className="section productStorySection">
          <div className="container productStoryGrid">
            <Reveal className="productStoryImage">
              <img
                src={productImages.salon}
                alt="TapRank acrylic review stand ready on a bright salon counter"
                width="1122"
                height="1402"
              />
            </Reveal>
            <Reveal className="productStoryCopy" delay={100}>
              <span className="newSectionTag">REAL COUNTER-READY PRODUCT</span>
              <h2>Built for real counters, tills, receptions and tables.</h2>
              <p>
                Your TapRank stand is a physical product connected to a live page. Customers can tap the NFC point
                or scan the QR code and land exactly where you want them.
              </p>
              <div className="compactBusinessRow">
                {businessTypes.map((type) => <span key={type}>{type}</span>)}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="section productsRefreshSection" id="products">
          <div className="container">
            <SectionIntro
              eyebrow="PRODUCTS"
              title="Counter-ready products, already linked for your business."
              copy="Choose a ready-made stand or a custom setup. Every option is connected before it arrives."
            />
            <div className="productRefreshGrid">
              {productCards.map((product, index) => (
                <Reveal as="article" className="productRefreshCard" delay={index * 90} key={product.title}>
                  <img src={product.image} alt={product.alt} width="1122" height="1402" />
                  <div className="productRefreshBody">
                    <span className="productTag">{product.tag}</span>
                    <h3>{product.title}</h3>
                    <strong>{product.price}</strong>
                    <ul>
                      {product.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
                    </ul>
                    <a className="textButton" href={product.href}>{product.cta} <span>→</span></a>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section howRefreshSection" id="how-it-works">
          <div className="container">
            <SectionIntro
              eyebrow="HOW IT WORKS"
              title="Three steps from setup to customer action."
              copy="We handle the linking and testing. You place it where customers can see it."
            />
            <div className="stepsRefreshGrid">
              {steps.map(([number, title, copy], index) => (
                <Reveal as="article" className="stepRefreshCard" delay={index * 90} key={title}>
                  <span>{number}</span>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section demosRefreshSection" id="live-demos">
          <div className="container">
            <SectionIntro
              eyebrow="LIVE EXAMPLES"
              title="See how TapRank pages work for different businesses."
              copy="Each demo opens a real TapRank-style page with actions customers understand instantly."
            />
            <div className="demoRefreshGrid">
              {demos.map((demo, index) => (
                <Reveal as="article" className="demoRefreshCard" delay={index * 90} key={demo.href}>
                  <div className="demoIcon">{demo.icon}</div>
                  <h3>{demo.title}</h3>
                  <p>{demo.copy}</p>
                  <a className="button buttonSecondary" href={demo.href}>Open demo <span>↗</span></a>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section className="section pricingRefreshSection" id="pricing">
          <div className="container">
            <SectionIntro
              eyebrow="PRICING"
              title="Simple one-off pricing. No subscription."
              copy="Arrives linked and ready to use, with setup included and a 1-year warranty."
            />
            <div className="pricingRefreshGrid">
              {pricingCards.map((plan, index) => (
                <Reveal as="article" className={`pricingRefreshCard ${plan.featured ? "featured" : ""}`} delay={index * 100} key={plan.title}>
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
            <Reveal className="bundleNote">
              <strong>Need multiple stands?</strong> Ask about launch bundle pricing — buy 2, get 1 free.
            </Reveal>
          </div>
        </section>

        <section className="finalRefreshSection" id="contact">
          <div className="container">
            <Reveal className="finalRefreshCard">
              <img
                src={productImages.barber}
                alt="TapRank stand ready to use on a barber shop counter"
                width="1122"
                height="1402"
              />
              <div>
                <span className="newSectionTag">READY WHEN YOU ARE</span>
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
    </>
  );
}
