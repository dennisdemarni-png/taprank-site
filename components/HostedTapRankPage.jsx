import Head from "next/head";

const themeColours = {
  barber: "#f4f8ff",
  restaurant: "#f4f8ff",
  salon: "#f4f8ff",
};

const iconPaths = {
  booking: (
    <>
      <rect x="5" y="6" width="14" height="13" rx="2.5" />
      <path d="M8 4v4M16 4v4M5 10h14" />
    </>
  ),
  menu: (
    <>
      <path d="M5 7h14M5 12h14M5 17h10" />
    </>
  ),
  instagram: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <circle cx="12" cy="12" r="3" />
      <path d="M16.7 7.3h.01" />
    </>
  ),
  whatsapp: (
    <>
      <path d="M6.4 18.4 7.3 15A7 7 0 1 1 10 17.3l-3.6 1.1Z" />
      <path d="M10 9.4c.4 1.9 1.7 3.2 3.6 3.9l1-1" />
    </>
  ),
  directions: (
    <>
      <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
  services: (
    <>
      <path d="M5 7h14M5 12h14M5 17h8" />
      <path d="m16 15 3 3" />
    </>
  ),
  allergens: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 10v6M12 7h.01" />
    </>
  ),
  treatments: (
    <>
      <path d="m12 3 1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8L12 3Z" />
    </>
  ),
  tiktok: (
    <>
      <path d="M14 4v9.4a3.5 3.5 0 1 1-3.5-3.5" />
      <path d="M14 6c1 2 2.4 3.2 4 3.4" />
    </>
  ),
  call: (
    <>
      <path d="M8 5 5.8 7.2c-.6.6-.8 1.5-.4 2.3 1.4 3.1 4 5.7 7.1 7.1.8.4 1.7.2 2.3-.4L17 14l-3-2-1.3 1.3c-1.2-.6-2.4-1.8-3-3L11 9 8 5Z" />
    </>
  ),
  website: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M4 12h16M12 4c2 2.2 3 4.8 3 8s-1 5.8-3 8M12 4c-2 2.2-3 4.8-3 8s1 5.8 3 8" />
    </>
  ),
};

function ActionIcon({ icon }) {
  if (icon === "review") {
    return <span className="hostedActionIcon hostedActionIcon--review" aria-hidden="true">G</span>;
  }

  return (
    <span className={`hostedActionIcon hostedActionIcon--${icon}`} aria-hidden="true">
      <svg viewBox="0 0 24 24">{iconPaths[icon] || iconPaths.website}</svg>
    </span>
  );
}

export default function HostedTapRankPage({ page }) {
  const {
    slug,
    theme,
    businessName,
    initials,
    categoryLabel,
    bannerLabel,
    heroImage,
    heroAlt,
    rating,
    welcomeText,
    primaryAction,
    links,
  } = page;

  return (
    <>
      <Head>
        <title>{businessName} | Powered by TapRank</title>
        <meta name="description" content={`${businessName} customer links, powered by TapRank.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content={themeColours[theme] || "#ffffff"} />
        <meta name="robots" content="noindex" />
      </Head>

      <main className={`hostedPage hostedPage--${theme}`} data-slug={slug}>
        <div className="hostedBackdrop" aria-hidden="true"><span /><span /><span /></div>
        <section className="hostedCard">
          <div className="hostedHeroBanner" role="img" aria-label={heroAlt || `${businessName} TapRank page banner`}>
            {heroImage ? <img src={heroImage} alt="" /> : null}
            <div className="hostedHeroBrand">
              <img src="/taprank-logo-dark.png" alt="TapRank" width="1280" height="331" />
            </div>
            <span className="hostedHeroLabel">{bannerLabel}</span>
            <i />
            <b />
          </div>

          <div className="hostedContentPanel">
            <header className="hostedHeader">
              <div className="hostedIdentity">
                <div className="hostedMonogram"><span>{initials}</span></div>
              </div>
              <h1>{businessName}</h1>
              <span className="hostedEyebrow">{categoryLabel}</span>
              <div className="hostedRating" aria-label={`${rating.score} stars from ${rating.count} reviews`}>
                <strong>{rating.score}</strong>
                <span>★★★★★</span>
                <small>({rating.count})</small>
              </div>
              <p>{welcomeText}</p>
            </header>

            <nav className="hostedActions" aria-label={`${businessName} links`}>
              <a className="hostedAction hostedAction--primary" href={primaryAction.href}>
                <ActionIcon icon={primaryAction.icon} />
                <strong>{primaryAction.label}</strong>
                <span className="hostedActionArrow">›</span>
              </a>
              {links.map((action, index) => (
                <a
                  className={`hostedAction ${action.featured ? "hostedAction--featured" : ""} hostedAction--${index + 1}`}
                  href={action.href}
                  key={action.label}
                >
                  <ActionIcon icon={action.icon} />
                  <strong>{action.label}</strong>
                  <span className="hostedActionArrow">›</span>
                </a>
              ))}
            </nav>

            <footer className="hostedFooter">
              <span aria-hidden="true" />
              <div>
                <small>Powered by</small>
                <img className="hostedFooterLogo" src="/taprank-logo-transparent.png" alt="TapRank" width="1280" height="331" />
                <em>Connect customers to what matters.</em>
              </div>
              <span aria-hidden="true" />
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
