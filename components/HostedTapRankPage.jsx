import Head from "next/head";

const actionSymbols = {
  review: "G",
  booking: "▣",
  menu: "≡",
  instagram: "◎",
  whatsapp: "↗",
  directions: "⌖",
  prices: "£",
  services: "✂",
  allergens: "i",
  treatments: "✦",
  tiktok: "♪",
  call: "☎",
  website: "◎",
};

const themeColours = {
  barber: "#071426",
  restaurant: "#f7f0e3",
  salon: "#fbf4f5",
};

function ActionIcon({ icon }) {
  return <span className={`hostedActionIcon hostedActionIcon--${icon}`}>{actionSymbols[icon] || "→"}</span>;
}

export default function HostedTapRankPage({ page }) {
  const {
    slug,
    theme,
    businessName,
    initials,
    categoryLabel,
    bannerLabel,
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
          <div className="hostedHeroBanner" aria-hidden="true">
            <div className="hostedHeroBrand">
              <span className="hostedHeroMark">TR</span>
              <strong>TAPRANK</strong>
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
              <small>Powered by</small>
              <strong><i>TR</i> TapRank</strong>
              <span aria-hidden="true" />
            </footer>
          </div>
        </section>
      </main>
    </>
  );
}
