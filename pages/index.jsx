import Head from "next/head";

const setupMailto = "mailto:hello@taprank.co.uk?subject=TapRank%20Setup%20Request";

const products = [
  {
    icon: "star",
    eyebrow: "Reviews first",
    title: "TapRank Review Pages",
    copy: "Put Google reviews front and centre, with bookings, menus, socials and contact links one tap away.",
  },
  {
    icon: "phone",
    eyebrow: "The physical touchpoint",
    title: "NFC + QR Touchpoints",
    copy: "Counter stands, table stands, cards and stickers, all linked and tested before they arrive.",
  },
  {
    icon: "links",
    eyebrow: "More ways to act",
    title: "Menu & Multi-Link Pages",
    copy: "Give customers one simple place to view menus, book, follow your socials or contact you.",
  },
  {
    icon: "social",
    eyebrow: "The live service",
    title: "Managed TapRank Care",
    copy: "Keep your links and page content up to date without replacing your stand, QR code or NFC tag.",
  },
];

const steps = [
  ["01", "Choose your setup", "Pick a review stand, link page or a combination that suits your counter."],
  ["02", "Share your details", "Tell us your business name, brand colours and the links customers should see."],
  ["03", "We set it up", "We design, link and test your TapRank product before it arrives."],
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
  "Tap or scan from almost any modern smartphone",
  "Update your links later without replacing the stand",
  "Hosted pages grow as your business adds new links and offers",
  "A polished physical touchpoint that feels part of your business",
];

const demos = [
  { label: "Barber", href: "/r/barber-demo", theme: "navy", eyebrow: "Premium barber page", actions: "Reviews · bookings · prices" },
  { label: "Restaurant", href: "/r/restaurant-demo", theme: "amber", eyebrow: "Warm hospitality page", actions: "Menu · tables · reviews" },
  { label: "Salon", href: "/r/salon-demo", theme: "blush", eyebrow: "Elegant beauty page", actions: "Bookings · treatments · socials" },
];

const reviewStats = [
  ["97%", "of consumers read reviews for local businesses"],
  ["71%", "use Google to read local business reviews"],
  ["54%", "visit a business website after reading positive reviews"],
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
        <span className="standImagePill"><i /> Ready for your counter</span>
        <img
          className="heroStandImage"
          src="/taprank-google-review-stand.png"
          alt="TapRank review stand with NFC and QR code"
          width="1054"
          height="1492"
        />
      </div>
      <div className="floatingBadge floatingTop"><span>★</span><strong>Linked before it arrives</strong></div>
      <div className="floatingBadge floatingBottom"><span className="pulseDot" /><strong>No setup required</strong></div>
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
        <title>TapRank | Connect Customers to What Matters</title>
        <meta name="description" content="TapRank creates NFC + QR stands, cards and stickers that help customers review, book, view menus, follow and contact local businesses." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta property="og:title" content="TapRank | Connect customers to what matters" />
        <meta property="og:description" content="One tap to your reviews, menus, bookings and socials." />
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
          <a className="button buttonSmall navCta" href={setupMailto}>Start Setup <span>→</span></a>
          <details className="mobileMenu">
            <summary aria-label="Open navigation"><span /><span /><span /></summary>
            <nav>
              <a href="#products">Products</a>
              <a href="#how-it-works">How it works</a>
              <a href="#link-pages">Link pages</a>
              <a href="#pricing">Pricing</a>
              <a href="#use-cases">Use cases</a>
              <a className="button" href={setupMailto}>Start Setup</a>
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
              <h1>One tap to your <span className="gradientText">reviews, menus, bookings and socials.</span></h1>
              <p className="heroLead">Google reviews stay front and centre. Everything else your customers need sits one tap away.</p>
              <div className="heroActions">
                <a className="button" href={setupMailto}>Start Your TapRank Setup <span>→</span></a>
                <a className="button buttonSecondary" href="#live-demos"><span className="playIcon">↘</span> View Live Examples</a>
              </div>
              <p className="heroRange"><span>✓</span> Arrives linked, tested and ready to place. No setup required.</p>
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
              <p>No searching. No typing. Just tap, scan and choose what they need.</p>
              <div className="microResult"><span>↘</span><p><strong>Less friction.</strong> More customers reaching the right page at the right moment.</p></div>
            </div>
          </div>
        </section>

        <section className="reviewStatsSection" aria-labelledby="review-stats-title">
          <div className="container">
            <div className="reviewStatsIntro">
              <div>
                <span className="sectionTag">LOCAL TRUST</span>
                <h2 id="review-stats-title">Reviews still shape local decisions.</h2>
              </div>
              <p>TapRank makes it easier for customers to act while they are still in your business — instead of hoping they remember later.</p>
            </div>
            <div className="reviewStatsGrid">
              {reviewStats.map(([number, label]) => (
                <article className="reviewStatCard" key={number}><strong>{number}</strong><p>{label}</p></article>
              ))}
            </div>
            <small className="reviewStatsSource">Source: BrightLocal local review research</small>
          </div>
        </section>

        <section className="section productsSection" id="products">
          <div className="container">
            <div className="sectionIntro centered">
              <span className="sectionTag">WHAT WE MAKE</span>
              <h2>One tap. <span className="gradientText">More ways to grow.</span></h2>
              <p>Every TapRank product arrives set up and linked to your business.</p>
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
            <p className="productSetupNote"><span>✓</span><strong>Arrives linked, tested and ready to place. No setup required.</strong></p>
          </div>
        </section>

        <section className="section actionSystemSection" id="link-pages">
          <div className="container actionSystemGrid">
            <div className="actionSystemCopy">
              <span className="sectionTag">THE TAPRANK PAGE</span>
              <h2>One tap. <span className="gradientText">Every customer action.</span></h2>
              <p>Give customers one simple page to review, book, view your menu, follow your socials or contact you. Your links can change later without replacing the stand.</p>
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
              <p className="managedNote"><span>✓</span><strong>Managed updates available with TapRank Care.</strong> Change links without replacing the physical product.</p>
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
              <div className="mockupCopy"><span className="sectionTag">WHAT YOUR SETUP CAN LOOK LIKE</span><h2>See what your TapRank setup could look like.</h2><p>Your TapRank setup can be ready-made or customised to your business. Once you choose a setup, we link your stand, QR code and NFC tag to your live TapRank page before it arrives.</p></div>
              <div className="mockupAction"><a className="button" href={setupMailto}>Start Your TapRank Setup <span>→</span></a><small>Custom examples will be added soon using real product photos.</small></div>
            </div>
          </div>
        </section>

        <section className="section pricingSection" id="pricing">
          <div className="container">
            <div className="sectionIntro centered">
              <span className="sectionTag">FLEXIBLE PRICING</span>
              <h2>Choose your setup. <span className="gradientText">We’ll handle the rest.</span></h2>
              <p>Every TapRank product arrives set up and linked to your business.</p>
            </div>
            <div className="pricingGrid">
              <article className="priceCard">
                <span className="pricePill">Simple start</span><h3>Ready-Made TapRank Stand</h3>
                <p className="price"><strong className="priceAmount priceAmountProduct">From £24.99 <span>+ £9.99/month</span></strong></p>
                <p className="priceSummary">A clean ready-made NFC + QR stand linked to your live TapRank page. Best for businesses that want a simple, fast way to collect reviews and share key links.</p>
                <ul><li>Ready-made stand design</li><li>NFC + QR included</li><li>Live TapRank page</li><li>Google review button front and centre</li><li>Arrives linked and ready to place</li><li>No setup required</li></ul>
                <a className="button buttonSecondary fullButton" href="mailto:hello@taprank.co.uk?subject=TapRank%20Ready-Made%20Stand">Get Your Stand</a>
              </article>
              <article className="priceCard featuredPrice">
                <div className="popularLabel">MOST FLEXIBLE</div><span className="pricePill bluePill">Built around you</span><h3>Custom TapRank Setup</h3>
                <p className="price"><strong className="priceAmount priceAmountProduct">From £49 <span>+ £9.99/month</span></strong></p>
                <p className="priceSummary">A custom setup matched to your business, brand colours and customer actions. Best for businesses that want a more tailored stand and TapRank page.</p>
                <ul><li>Custom stand/page styling</li><li>Business links added for you</li><li>Review, booking, menu and social buttons</li><li>NFC + QR setup</li><li>Arrives linked, tested and ready to use</li><li>Better for branded counters, salons, restaurants and shops</li></ul>
                <a className="button fullButton" href={setupMailto}>Start Custom Setup <span>→</span></a>
              </article>
              <article className="priceCard">
                <span className="pricePill">More places</span><h3>Multi-Location / Bulk</h3>
                <p className="price"><strong className="priceAmount priceAmountQuote">Custom quote</strong></p>
                <p className="priceSummary">For businesses that need multiple stands, table displays, stickers or cards across one or more locations.</p>
                <ul><li>Multiple touchpoints</li><li>Shared or separate TapRank pages</li><li>Bulk product options</li><li>Ongoing link management</li><li>Custom layout support</li></ul>
                <a className="button buttonSecondary fullButton" href="mailto:hello@taprank.co.uk?subject=TapRank%20Multi-Location%20or%20Bulk%20Setup">Talk Through a Setup</a>
              </article>
            </div>
            <div className="subscriptionExplainer">
              <span className="subscriptionIcon">↻</span>
              <div><h3>Why the monthly TapRank page?</h3><p>Your physical stand points to a live TapRank page. That page keeps your links flexible, so you can update reviews, menus, bookings, socials or WhatsApp without replacing your QR code or NFC tag.</p><strong>TapRank Page is £9.99/month and keeps your page active, editable and supported.</strong></div>
            </div>
            <p className="pricingNote">Arrives linked, tested and ready to place. No setup required.</p>
          </div>
        </section>

        <section className="section benefitsSection">
          <div className="container benefitsGrid">
            <div className="benefitsCopy">
              <span className="sectionTag">WHY IT WORKS</span>
              <h2>A small touchpoint with a <span className="gradientText">big job to do.</span></h2>
              <p>TapRank connects the physical moment in your business with the digital action that helps it grow.</p>
              <a className="textLink" href={setupMailto}>Talk through your setup <span>→</span></a>
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
              <h2>Ready to connect customers to what matters?</h2>
              <p>Choose a ready-made stand or a custom TapRank setup. We’ll link it to your business before it arrives, so customers can tap or scan straight away.</p>
              <a className="button buttonWhite" href={setupMailto}>Start Your TapRank Setup <span>→</span></a>
              <span className="emailHint">Online checkout coming later. For now, TapRank setups are handled directly.</span>
            </div>
          </div>
        </section>
      </main>

      <footer className="siteFooter">
        <div className="container footerTop">
          <div className="footerBrand"><BrandLogo placement="footer" /><strong className="footerSlogan">Connect customers to what matters.</strong><p>TapRank gives local businesses NFC + QR touchpoints linked to live pages for reviews, menus, bookings, socials and more.</p></div>
          <div className="footerLinks"><div><h3>Explore</h3><a href="#products">Products</a><a href="#link-pages">Link pages</a><a href="#pricing">Pricing</a></div><div><h3>Live demos</h3><a href="/r/barber-demo">Barber</a><a href="/r/restaurant-demo">Restaurant</a><a href="/r/salon-demo">Salon</a></div><div><h3>Get in touch</h3><a href={setupMailto}>Start setup</a><a href="mailto:hello@taprank.co.uk">hello@taprank.co.uk</a></div></div>
        </div>
        <div className="container footerBottom"><p>© {new Date().getFullYear()} TapRank. Connect customers to what matters.</p><p>taprank.co.uk</p></div>
      </footer>
    </>
  );
}
