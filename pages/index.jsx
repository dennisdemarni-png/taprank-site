import Head from "next/head";

const products = [
  {
    icon: "star",
    eyebrow: "Build trust",
    title: "Google Review Stands",
    copy: "NFC + QR stands that send customers straight to your Google review page.",
  },
  {
    icon: "links",
    eyebrow: "One useful page",
    title: "TapRank Link Pages",
    copy: "Hosted pages for reviews, menus, bookings, socials, WhatsApp and more.",
  },
  {
    icon: "phone",
    eyebrow: "More ways to act",
    title: "Menu & Multi-Link Stands",
    copy: "Ideal for businesses that want customers to scan once and choose what they need.",
  },
];

const steps = [
  ["01", "Choose your setup", "Pick a review stand, link page or a combination that suits your counter."],
  ["02", "Share your details", "Send us your business name, brand details and the links customers should see."],
  ["03", "We build it", "We design, program and test your TapRank stand and hosted destination."],
  ["04", "Customers tap", "Put it in place and turn happy visits into reviews, bookings and follows."],
];

const useCases = [
  ["Barbers", "Google reviews + booking link", "✂"],
  ["Salons", "Reviews, Instagram + treatments", "✦"],
  ["Restaurants", "Menu, bookings + reviews", "⌁"],
  ["Cafes", "Menu, loyalty + socials", "☕"],
  ["Car washes", "Reviews, WhatsApp + location", "◇"],
  ["Gyms & PTs", "Trial booking + Instagram", "↗"],
  ["Takeaways", "Order link, menu + reviews", "▣"],
];

const benefits = [
  "Reduces the steps between a happy customer and a useful action",
  "Prompts customers while their experience is still fresh",
  "NFC + QR gives almost every smartphone an easy route in",
  "Update destinations later without replacing the stand",
  "Hosted pages grow as your business adds new links and offers",
  "A polished counter display that feels part of your business",
];

function BrandLogo({ placement = "header" }) {
  const useDarkBackgroundLogo = placement === "stand" || placement === "footer";

  return (
    <img
      className={`brandLogo brandLogo--${placement}`}
      src={useDarkBackgroundLogo ? "/taprank-logo-dark.png" : "/taprank-logo.png"}
      alt="TapRank"
      width={useDarkBackgroundLogo ? 1774 : 1820}
      height={useDarkBackgroundLogo ? 887 : 864}
    />
  );
}

function Icon({ name }) {
  if (name === "star") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 2.8 2.8 5.7 6.3.9-4.6 4.5 1.1 6.3-5.6-3-5.6 3 1.1-6.3-4.6-4.5 6.3-.9L12 2.8Z" /></svg>;
  }
  if (name === "links") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9.5 14.5 14.5 9m-7.1 8.3-1.2 1.2a3.7 3.7 0 0 1-5.2-5.2l3.4-3.4a3.7 3.7 0 0 1 5.2 0m7-3.2 1.2-1.2a3.7 3.7 0 0 1 5.2 5.2l-3.4 3.4a3.7 3.7 0 0 1-5.2 0" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 18h4M9.5 6h5" /></svg>;
}

function QrCode() {
  return (
    <svg className="qrCode" viewBox="0 0 92 92" aria-label="Example QR code">
      <rect width="92" height="92" rx="8" fill="#fff" />
      <g fill="#071225">
        <path d="M8 8h25v25H8zm6 6v13h13V14zM59 8h25v25H59zm6 6v13h13V14zM8 59h25v25H8zm6 6v13h13V65z" fillRule="evenodd" />
        <path d="M41 8h8v8h-8zm8 8h8v8h-8zm-8 8h8v9h-8zm0 17h9v8h-9zm-8 0h8v8h-8zm-17 0h9v8h-9zm-8 8h8v8H8zm17 0h8v8h-8zm25 0h8v8h-8zm8-8h8v8h-8zm8 0h10v8H66zm10 8h8v8h-8zm-35 8h8v8h-8zm8 8h8v8h-8zm9-8h8v8h-8zm8 8h18v8H66zm-25 8h8v11h-8zm17-8h8v19h-8z" />
      </g>
    </svg>
  );
}

function StandMockup() {
  return (
    <div className="visualWrap" aria-label="TapRank Google review stand preview">
      <div className="orbit orbitOne" />
      <div className="orbit orbitTwo" />
      <div className="standShadow" />
      <div className="stand">
        <div className="standShine" />
        <div className="standLogo"><BrandLogo placement="stand" /></div>
        <div className="googleBadge"><span>G</span></div>
        <p className="reviewLabel">REVIEW US ON</p>
        <p className="googleWord">Google</p>
        <div className="stars" aria-label="Five stars">★★★★★</div>
        <div className="standActions">
          <div className="tapAction">
            <div className="nfcIcon"><i /><i /><i /></div>
            <div><strong>Tap your phone</strong><span>Hold near the stand</span></div>
          </div>
          <div className="actionDivider"><span>or</span></div>
          <div className="scanAction">
            <QrCode />
            <div><strong>Scan QR code</strong><span>Open your camera</span></div>
          </div>
        </div>
        <div className="standFooter">Powered by <b>TapRank</b></div>
      </div>
      <div className="floatingBadge floatingTop"><span>★</span><strong>Make feedback effortless</strong></div>
      <div className="floatingBadge floatingBottom"><span className="pulseDot" /><strong>NFC ready</strong></div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>TapRank | NFC + QR Solutions for Local Businesses</title>
        <meta name="description" content="Get more Google reviews, bookings and customer actions with premium TapRank NFC + QR stands and hosted link pages." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="TapRank | Get more reviews with one tap" />
        <meta property="og:description" content="Premium NFC + QR stands and hosted pages for local businesses." />
      </Head>

      <header className="siteHeader">
        <div className="container navInner">
          <a className="logoLink" href="#top" aria-label="TapRank home"><BrandLogo /></a>
          <nav className="desktopNav" aria-label="Main navigation">
            <a href="#products">Products</a>
            <a href="#how-it-works">How it works</a>
            <a href="#pricing">Pricing</a>
            <a href="#use-cases">Use cases</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="button buttonSmall navCta" href="#pricing">Order a Stand <span>→</span></a>
          <details className="mobileMenu">
            <summary aria-label="Open navigation"><span /><span /><span /></summary>
            <nav>
              <a href="#products">Products</a>
              <a href="#how-it-works">How it works</a>
              <a href="#pricing">Pricing</a>
              <a href="#use-cases">Use cases</a>
              <a href="#contact">Contact</a>
              <a className="button" href="#pricing">Order a Stand</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="heroGlow" />
          <div className="container heroGrid">
            <div className="heroCopy">
              <div className="eyebrow"><span className="eyebrowStars">★★★★★</span> Built for brilliant local businesses</div>
              <h1>Get more Google reviews <span className="gradientText">with one tap</span></h1>
              <p className="heroLead">TapRank creates NFC + QR stands and hosted link pages for local businesses, helping customers leave reviews, view menus, follow socials and take action instantly.</p>
              <div className="heroActions">
                <a className="button" href="#pricing">Order a Stand <span>→</span></a>
                <a className="button buttonSecondary" href="#how-it-works"><span className="playIcon">▶</span> See How It Works</a>
              </div>
              <div className="heroProof">
                <div className="proofFaces"><span>B</span><span>S</span><span>C</span></div>
                <p><strong>Simple to set up</strong><br />Made for busy business owners</p>
              </div>
            </div>
            <StandMockup />
          </div>
        </section>

        <section className="trustBar" aria-label="Businesses TapRank is built for">
          <div className="container trustInner">
            <span className="trustLabel">BUILT FOR</span>
            <div className="trustTypes">
              <span>Barbers</span><i />
              <span>Salons</span><i />
              <span>Restaurants</span><i />
              <span>Cafes</span><i />
              <span>Takeaways</span><i />
              <span>Local shops</span>
            </div>
          </div>
        </section>

        <section className="section problemSection">
          <div className="container problemGrid">
            <div>
              <span className="sectionTag">THE MISSED OPPORTUNITY</span>
              <h2>Happy customers mean little if they <span className="gradientText">forget to review.</span></h2>
            </div>
            <div className="problemCopy">
              <p>Most customers are willing to support a good business, but they rarely search for your Google page after they leave.</p>
              <p>TapRank puts the action point directly in front of them while the experience is still fresh—no searching, typing or remembering later.</p>
              <div className="microResult"><span>↘</span><p><strong>Less friction.</strong> More customers reaching the right page at the right moment.</p></div>
            </div>
          </div>
        </section>

        <section className="section productsSection" id="products">
          <div className="container">
            <div className="sectionIntro centered">
              <span className="sectionTag">WHAT WE MAKE</span>
              <h2>One tap. <span className="gradientText">More ways to grow.</span></h2>
              <p>Physical touchpoints and flexible digital pages, designed to make your customer journey feel effortless.</p>
            </div>
            <div className="productGrid">
              {products.map((product, index) => (
                <article className={`productCard productCard${index + 1}`} key={product.title}>
                  <div className="productIcon"><Icon name={product.icon} /></div>
                  <span className="cardEyebrow">{product.eyebrow}</span>
                  <h3>{product.title}</h3>
                  <p>{product.copy}</p>
                  <a href="#contact">Explore this setup <span>→</span></a>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section howSection" id="how-it-works">
          <div className="container">
            <div className="sectionIntro splitIntro">
              <div><span className="sectionTag lightTag">HOW IT WORKS</span><h2>From your idea to the counter in <span>four simple steps.</span></h2></div>
              <p>We handle the setup so you can focus on the experience your customers already love.</p>
            </div>
            <div className="stepsGrid">
              {steps.map(([number, title, copy]) => (
                <article className="stepCard" key={number}>
                  <div className="stepNumber">{number}</div>
                  <h3>{title}</h3>
                  <p>{copy}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section useCasesSection" id="use-cases">
          <div className="container">
            <div className="sectionIntro centered narrowIntro">
              <span className="sectionTag">MADE FOR THE HIGH STREET</span>
              <h2>Useful in every <span className="gradientText">local business.</span></h2>
              <p>Give customers the most useful next step for the kind of visit they just had.</p>
            </div>
            <div className="useCaseGrid">
              {useCases.map(([title, copy, symbol]) => (
                <article className="useCaseCard" key={title}>
                  <span className="useIcon">{symbol}</span>
                  <div><h3>{title}</h3><p>{copy}</p></div>
                  <span className="caseArrow">↗</span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="section pricingSection" id="pricing">
          <div className="container">
            <div className="sectionIntro centered">
              <span className="sectionTag">LAUNCH PRICING</span>
              <h2>Start simple. <span className="gradientText">Grow when you’re ready.</span></h2>
              <p>Clear options for your first stand, a tailored setup and ongoing support.</p>
            </div>
            <div className="pricingGrid">
              <article className="priceCard">
                <span className="pricePill">Simple start</span>
                <h3>TapRank Mini Stand</h3>
                <p className="price"><small>Launch offer from</small>£24.99</p>
                <p className="priceSummary">A simple NFC + QR review stand for one business location.</p>
                <ul><li>NFC tap point</li><li>Scannable QR code</li><li>Direct review link</li><li>Counter-ready design</li></ul>
                <a className="button buttonSecondary fullButton" href="mailto:hello@taprank.co.uk?subject=TapRank%20Mini%20Stand">Enquire about Mini</a>
              </article>
              <article className="priceCard featuredPrice">
                <div className="popularLabel">MOST FLEXIBLE</div>
                <span className="pricePill bluePill">Built around you</span>
                <h3>TapRank Setup</h3>
                <p className="price"><small>Custom setup from</small>£49</p>
                <p className="priceSummary">A tailored stand and hosted link, set up for your customer journey.</p>
                <ul><li>Custom stand design</li><li>NFC + QR setup</li><li>TapRank hosted link</li><li>Basic setup support</li></ul>
                <a className="button fullButton" href="mailto:hello@taprank.co.uk?subject=TapRank%20Setup">Choose TapRank Setup <span>→</span></a>
              </article>
              <article className="priceCard">
                <span className="pricePill">Keep it current</span>
                <h3>TapRank Care</h3>
                <p className="price"><small>Ongoing support</small>£9.99<span>/month</span></p>
                <p className="priceSummary">Hosting, updates and practical support as your business changes.</p>
                <ul><li>Hosted TapRank page</li><li>Destination + link updates</li><li>Monthly review check</li><li>Replacement stand discount</li></ul>
                <a className="button buttonSecondary fullButton" href="mailto:hello@taprank.co.uk?subject=TapRank%20Care">Ask about Care</a>
              </article>
            </div>
            <p className="pricingNote">Physical products may require a setup fee or annual plan. Custom and bulk orders are available.</p>
          </div>
        </section>

        <section className="section benefitsSection">
          <div className="container benefitsGrid">
            <div className="benefitsCopy">
              <span className="sectionTag">WHY IT WORKS</span>
              <h2>A small touchpoint with a <span className="gradientText">big job to do.</span></h2>
              <p>TapRank removes the awkward gap between “that was great” and the action that helps your business grow.</p>
              <a className="textLink" href="#contact">Talk through your setup <span>→</span></a>
            </div>
            <div className="benefitList">
              {benefits.map((benefit) => <div className="benefitItem" key={benefit}><span>✓</span><p>{benefit}</p></div>)}
            </div>
          </div>
        </section>

        <section className="finalSection" id="contact">
          <div className="container">
            <div className="finalCard">
              <div className="finalGlow" />
              <div className="finalStars">★★★★★</div>
              <h2>Ready to make reviews easier?</h2>
              <p>Send us your business name, Google review link and how many stands you want. We’ll help you choose the right setup.</p>
              <a className="button buttonWhite" href="mailto:hello@taprank.co.uk?subject=TapRank%20enquiry">Email TapRank <span>→</span></a>
              <span className="emailHint">hello@taprank.co.uk</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="container footerTop">
          <div className="footerBrand"><BrandLogo placement="footer" /><p>NFC + QR stands and hosted pages that help local businesses turn good experiences into useful actions.</p></div>
          <div className="footerLinks"><div><h3>Explore</h3><a href="#products">Products</a><a href="#how-it-works">How it works</a><a href="#pricing">Pricing</a></div><div><h3>Get in touch</h3><a href="#use-cases">Use cases</a><a href="mailto:hello@taprank.co.uk">Contact</a><a href="mailto:hello@taprank.co.uk">hello@taprank.co.uk</a></div></div>
        </div>
        <div className="container footerBottom"><p>© {new Date().getFullYear()} TapRank. NFC + QR solutions for local businesses.</p><p>taprank.co.uk</p></div>
      </footer>
    </>
  );
}
