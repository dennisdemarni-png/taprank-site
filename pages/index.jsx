import Head from "next/head";

const mockupMailto = "mailto:hello@taprank.co.uk?subject=TapRank%20Free%20Mockup%20Request";

const products = [
  {
    icon: "star",
    eyebrow: "Reviews first",
    title: "TapRank Review Pages",
    copy: "Google reviews stay front and centre, with optional links for bookings, socials, menus and more.",
  },
  {
    icon: "phone",
    eyebrow: "The physical touchpoint",
    title: "NFC + QR Touchpoints",
    copy: "Counter stands, table stands, cards and stickers that send customers to your live TapRank page.",
  },
  {
    icon: "links",
    eyebrow: "More ways to act",
    title: "Menu & Multi-Link Pages",
    copy: "Perfect for restaurants, cafes, salons, barbers and shops that want customers to scan once and choose what they need.",
  },
  {
    icon: "social",
    eyebrow: "The live service",
    title: "Managed TapRank Care",
    copy: "Keep your links, destinations and page content updated without needing to reprint QR codes or reprogram tags.",
  },
];

const steps = [
  ["01", "Choose your setup", "Pick a review stand, link page or a combination that suits your counter."],
  ["02", "Share your details", "Send your business name, brand colours and the actions customers should see."],
  ["03", "We build it", "We design, programme and test your TapRank touchpoint and hosted destination."],
  ["04", "Customers tap", "Put it in place and turn happy visits into reviews, bookings, follows and more."],
];

const useCases = [
  ["Barbers", "Reviews, booking and price list", "✂"],
  ["Salons", "Reviews, treatments and Instagram", "✦"],
  ["Restaurants", "Menu, bookings and reviews", "⌁"],
  ["Cafes", "Menu, loyalty and socials", "☕"],
  ["Car washes", "Reviews, WhatsApp and location", "◇"],
  ["Gyms & PTs", "Trial booking, Instagram and reviews", "↗"],
  ["Takeaways", "Order link, menu and Google reviews", "▣"],
  ["Local shops", "Reviews, socials and website", "◫"],
];

const customerActions = [
  ["★", "Leave a Google review"],
  ["≡", "View menu"],
  ["✓", "Book appointment"],
  ["◎", "Follow Instagram"],
  ["↗", "Message on WhatsApp"],
  ["⌖", "Open location"],
  ["→", "Visit website"],
];

const benefits = [
  "Reduces the steps between a happy customer and a useful action",
  "Prompts customers while their experience is still fresh",
  "NFC + QR gives almost every smartphone an easy route in",
  "Update destinations later without replacing the stand",
  "Hosted pages grow as your business adds new links and offers",
  "A polished physical touchpoint that feels part of your business",
];

const demos = [
  { label: "Barber", href: "/r/barber-demo", theme: "navy", eyebrow: "Premium barber page", actions: "Reviews · bookings · prices" },
  { label: "Restaurant", href: "/r/restaurant-demo", theme: "amber", eyebrow: "Warm hospitality page", actions: "Menu · tables · reviews" },
  { label: "Salon", href: "/r/salon-demo", theme: "blush", eyebrow: "Elegant beauty page", actions: "Bookings · treatments · socials" },
];

function BrandLogo({ placement = "header" }) {
  const useDarkBackgroundLogo = placement === "footer";

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
  if (name === "social") {
    return <svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="6" cy="12" r="2.5" /><circle cx="18" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><path d="m8.3 10.9 7.4-3.8M8.3 13.1l7.4 3.8" /></svg>;
  }
  return <svg viewBox="0 0 24 24" aria-hidden="true"><rect x="6" y="2" width="12" height="20" rx="3" /><path d="M10 18h4M9.5 6h5" /></svg>;
}

function ReviewStandVisual() {
  return (
    <div className="visualWrap">
      <div className="orbit orbitOne" />
      <div className="orbit orbitTwo" />
      <div className="standImageCard">
        <span className="standImagePill"><i /> NFC + QR ready</span>
        <img
          className="heroStandImage"
          src="/taprank-google-review-stand.png"
          alt="TapRank review stand with NFC and QR code"
          width="1054"
          height="1492"
        />
      </div>
      <div className="floatingBadge floatingTop"><span>★</span><strong>Make feedback effortless</strong></div>
      <div className="floatingBadge floatingBottom"><span className="pulseDot" /><strong>Made for your brand</strong></div>
    </div>
  );
}

function HostedPagePreview() {
  const previewLinks = ["Leave a Google Review", "Book Appointment", "Instagram", "Price List", "WhatsApp", "Location"];

  return (
    <div className="phoneStage" aria-label="Example TapRank hosted link page">
      <div className="phoneShell">
        <div className="phoneTop"><span /><i /></div>
        <div className="phonePage">
          <div className="barberMark">EB</div>
          <span className="phoneEyebrow">WELCOME TO</span>
          <h3>Example Barber Co.</h3>
          <p>Thanks for visiting. Choose what you need below.</p>
          <div className="phoneLinks">
            {previewLinks.map((link, index) => <span className={index < 2 ? "phoneLink primaryPhoneLink" : "phoneLink"} key={link}>{link}<b>→</b></span>)}
          </div>
          <div className="phonePowered">Powered by <strong>TapRank</strong></div>
        </div>
      </div>
      <div className="phoneStageNote"><span>Live hosted page</span><strong>Links can change later</strong></div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <Head>
        <title>TapRank | NFC + QR Customer Actions for Local Businesses</title>
        <meta name="description" content="Turn customer visits into reviews, bookings, follows and more with TapRank NFC + QR stands and hosted link pages." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="TapRank | Turn customer visits into action" />
        <meta property="og:description" content="NFC + QR stands and hosted pages for reviews, menus, bookings, socials and more." />
      </Head>

      <header className="siteHeader">
        <div className="container navInner">
          <a className="logoLink" href="#top" aria-label="TapRank home"><BrandLogo /></a>
          <nav className="desktopNav" aria-label="Main navigation">
            <a href="#products">Products</a>
            <a href="#how-it-works">How it works</a>
            <a href="#link-pages">Link pages</a>
            <a href="#pricing">Pricing</a>
            <a href="#use-cases">Use cases</a>
          </nav>
          <a className="button buttonSmall navCta" href={mockupMailto}>Free Mockup <span>→</span></a>
          <details className="mobileMenu">
            <summary aria-label="Open navigation"><span /><span /><span /></summary>
            <nav>
              <a href="#products">Products</a>
              <a href="#how-it-works">How it works</a>
              <a href="#link-pages">Link pages</a>
              <a href="#pricing">Pricing</a>
              <a href="#use-cases">Use cases</a>
              <a className="button" href={mockupMailto}>Request a Free Mockup</a>
            </nav>
          </details>
        </div>
      </header>

      <main id="top">
        <section className="hero section">
          <div className="heroGlow" />
          <div className="container heroGrid">
            <div className="heroCopy">
              <div className="eyebrow"><span className="eyebrowStars">✦</span> Connect customers to what matters.</div>
              <h1>Get more Google reviews <span className="gradientText">with one tap</span></h1>
              <p className="heroLead">TapRank creates NFC + QR products linked to live TapRank pages, helping local businesses turn customer visits into reviews, menu views, bookings, follows and more.</p>
              <div className="heroActions">
                <a className="button" href={mockupMailto}>Request a Free Mockup <span>→</span></a>
                <a className="button buttonSecondary" href="#live-demos"><span className="playIcon">↘</span> View Live Demos</a>
              </div>
              <p className="heroRange"><span>★</span> Google reviews first. Menus, socials, bookings and custom pages when you’re ready.</p>
              <div className="heroProof">
                <div className="proofFaces"><span>B</span><span>S</span><span>C</span></div>
                <p><strong>Simple to set up</strong><br />Made for busy business owners</p>
              </div>
            </div>
            <ReviewStandVisual />
          </div>
        </section>

        <section className="trustBar" aria-label="Businesses TapRank is built for">
          <div className="container trustInner">
            <span className="trustLabel">BUILT FOR</span>
            <div className="trustTypes">
              <span>Barbers</span><i /><span>Salons</span><i /><span>Restaurants</span><i /><span>Cafes</span><i /><span>Takeaways</span><i /><span>Local shops</span>
            </div>
          </div>
        </section>

        <section className="section problemSection">
          <div className="container problemGrid">
            <div>
              <span className="sectionTag">THE MISSED OPPORTUNITY</span>
              <h2>Happy customers are ready to act. <span className="gradientText">Make it effortless.</span></h2>
            </div>
            <div className="problemCopy">
              <p>Most customers are happy to review, book or follow a good business—but few search for the right page after they leave.</p>
              <p>TapRank puts the next action directly in front of them while the experience is still fresh: one tap, one scan, no searching or typing.</p>
              <div className="microResult"><span>↘</span><p><strong>Less friction.</strong> More customers reaching the right page at the right moment.</p></div>
            </div>
          </div>
        </section>

        <section className="section productsSection" id="products">
          <div className="container">
            <div className="sectionIntro centered">
              <span className="sectionTag">WHAT WE MAKE</span>
              <h2>One tap. <span className="gradientText">More ways to grow.</span></h2>
              <p>Physical touchpoints and flexible digital destinations, designed to make every customer journey feel effortless.</p>
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

        <section className="section actionSystemSection" id="link-pages">
          <div className="container actionSystemGrid">
            <div className="actionSystemCopy">
              <span className="sectionTag">THE TAPRANK PAGE</span>
              <h2>One tap. <span className="gradientText">Every customer action.</span></h2>
              <p>Instead of sending customers to one fixed destination forever, TapRank opens a live page that can grow with your business. Start with Google reviews, then add menus, booking links, WhatsApp, socials, offers and more.</p>
              <div className="tapFlow" aria-label="How a TapRank page works">
                <div><span>1</span><strong>Customer taps or scans</strong></div>
                <i>→</i>
                <div><span>2</span><strong>TapRank page opens</strong></div>
                <i>→</i>
                <div><span>3</span><strong>Customer chooses an action</strong></div>
              </div>
              <div className="actionList">
                {customerActions.map(([symbol, label]) => <div className="actionItem" key={label}><span>{symbol}</span><strong>{label}</strong></div>)}
              </div>
              <p className="managedNote"><span>✓</span><strong>Managed updates available with TapRank Care.</strong> Change links and destinations without replacing the physical product.</p>
            </div>
            <HostedPagePreview />
          </div>
        </section>

        <section className="section liveDemoSection" id="live-demos">
          <div className="container">
            <div className="sectionIntro centered">
              <span className="sectionTag">LIVE TAPRANK DEMOS</span>
              <h2>See what a TapRank page <span className="gradientText">can look like.</span></h2>
              <p>Every stand, sticker or card can open a page tailored to the business. Start with reviews, then add the links customers ask for most.</p>
            </div>
            <div className="liveDemoGrid">
              {demos.map((demo) => (
                <a className={`liveDemoCard liveDemoCard--${demo.theme}`} href={demo.href} key={demo.href}>
                  <span className="liveDemoEyebrow">{demo.eyebrow}</span>
                  <div className="liveDemoMark">{demo.label.slice(0, 1)}</div>
                  <h3>Example {demo.label}</h3>
                  <p>{demo.actions}</p>
                  <strong>View {demo.label} Demo <span>↗</span></strong>
                </a>
              ))}
            </div>
            <p className="demoNote">These are demo pages. Real TapRank pages can use your business name, colours, links and main call-to-action.</p>
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
                <article className="stepCard" key={number}><div className="stepNumber">{number}</div><h3>{title}</h3><p>{copy}</p></article>
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
                <article className="useCaseCard" key={title}><span className="useIcon">{symbol}</span><div><h3>{title}</h3><p>{copy}</p></div><span className="caseArrow">↗</span></article>
              ))}
            </div>
          </div>
        </section>

        <section className="section mockupSection">
          <div className="container">
            <div className="mockupCard">
              <div className="mockupStar">★</div>
              <div className="mockupCopy"><span className="sectionTag">FREE CUSTOM MOCKUP</span><h2>Want to see what yours could look like?</h2><p>Send us your business name, colours, Google review link and any menu, booking or social links you want customers to see. We’ll create a quick TapRank mockup before you order.</p></div>
              <div className="mockupAction"><a className="button" href={mockupMailto}>Request a Free Mockup <span>→</span></a><small>Perfect if you want to see your brand on a TapRank stand before committing.</small></div>
            </div>
          </div>
        </section>

        <section className="section pricingSection" id="pricing">
          <div className="container">
            <div className="sectionIntro centered">
              <span className="sectionTag">FLEXIBLE PRICING</span>
              <h2>Start simple. <span className="gradientText">Grow when you’re ready.</span></h2>
              <p>Every TapRank product connects to a live TapRank page. Start with a touchpoint, then keep the useful digital part active and easy to update.</p>
            </div>
            <div className="pricingGrid">
              <article className="priceCard">
                <span className="pricePill">Simple start</span><h3>TapRank Mini Stand</h3>
                <p className="price"><span className="priceLabel">Launch offer from{" "}</span><strong className="priceAmount">£24.99</strong></p>
                <p className="priceSummary">A simple NFC + QR touchpoint for your counter, table or reception area.</p>
                <ul><li>NFC + QR touchpoint</li><li>Live TapRank review page</li><li>Google review front and centre</li><li>Counter, table or reception ready</li></ul>
                <a className="button buttonSecondary fullButton" href="mailto:hello@taprank.co.uk?subject=TapRank%20Mini%20Stand">Get Your TapRank Stand</a>
              </article>
              <article className="priceCard featuredPrice">
                <div className="popularLabel">MOST FLEXIBLE</div><span className="pricePill bluePill">Built around you</span><h3>TapRank Setup</h3>
                <p className="price"><span className="priceLabel">Custom setup from{" "}</span><strong className="priceAmount">£49</strong></p>
                <p className="priceSummary">Custom stand design, NFC/QR setup, hosted TapRank page setup and basic launch support.</p>
                <ul><li>Custom touchpoint design</li><li>NFC + QR setup</li><li>Hosted TapRank page setup</li><li>Basic launch support</li></ul>
                <a className="button fullButton" href={mockupMailto}>Start Your TapRank Setup <span>→</span></a>
              </article>
              <article className="priceCard">
                <span className="pricePill">The useful live part</span><h3>TapRank Page + Care</h3>
                <p className="price"><span className="priceLabel">Live page and support{" "}</span><strong className="priceAmount">£9.99<span>/month</span></strong></p>
                <p className="priceSummary">Your live TapRank page, link updates, destination changes and practical support.</p>
                <ul><li>Hosted TapRank page</li><li>Link and destination updates</li><li>Review, menu and social support</li><li>Page content changes</li><li>Discounted replacement products</li></ul>
                <a className="button buttonSecondary fullButton" href="mailto:hello@taprank.co.uk?subject=TapRank%20Care">Ask about TapRank Care</a>
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
              <p>TapRank connects the physical moment in your business with the digital action that helps it grow.</p>
              <a className="textLink" href={mockupMailto}>Talk through your setup <span>→</span></a>
            </div>
            <div className="benefitList">
              {benefits.map((benefit) => <div className="benefitItem" key={benefit}><span>✓</span><p>{benefit}</p></div>)}
            </div>
          </div>
        </section>

        <section className="finalSection" id="contact">
          <div className="container">
            <div className="finalCard">
              <div className="finalGlow" /><div className="finalStars">★★★★★</div>
              <h2>Ready to turn more visits into action?</h2>
              <p>Send us your business name, Google review link and any menu, booking or social links you want customers to see. We’ll help you choose the right TapRank setup.</p>
              <a className="button buttonWhite" href={mockupMailto}>Request a Free Mockup <span>→</span></a>
              <span className="emailHint">hello@taprank.co.uk</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="container footerTop">
          <div className="footerBrand"><BrandLogo placement="footer" /><strong className="footerSlogan">Connect customers to what matters.</strong><p>TapRank connects local businesses to the customer actions that matter — reviews, menus, bookings, socials and more.</p></div>
          <div className="footerLinks"><div><h3>Explore</h3><a href="#products">Products</a><a href="#link-pages">Link pages</a><a href="#pricing">Pricing</a></div><div><h3>Live demos</h3><a href="/r/barber-demo">Barber</a><a href="/r/restaurant-demo">Restaurant</a><a href="/r/salon-demo">Salon</a></div><div><h3>Get in touch</h3><a href={mockupMailto}>Free mockup</a><a href="mailto:hello@taprank.co.uk">hello@taprank.co.uk</a></div></div>
        </div>
        <div className="container footerBottom"><p>© {new Date().getFullYear()} TapRank. NFC + QR customer journeys for local businesses.</p><p>taprank.co.uk</p></div>
      </footer>
    </>
  );
}
