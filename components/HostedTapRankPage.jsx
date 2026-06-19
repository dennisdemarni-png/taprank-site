import Head from "next/head";

const actionSymbols = {
  review: "★",
  booking: "✓",
  menu: "≡",
  instagram: "◎",
  whatsapp: "↗",
  directions: "⌖",
  prices: "£",
  allergens: "i",
  treatments: "✦",
  tiktok: "♪",
};

export default function HostedTapRankPage({
  theme,
  businessName,
  monogram,
  eyebrow,
  copy,
  actions,
}) {
  return (
    <>
      <Head>
        <title>{businessName} | Powered by TapRank</title>
        <meta name="description" content={`${businessName} customer links, powered by TapRank.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content={theme === "barber" ? "#071426" : theme === "restaurant" ? "#f7f0e3" : "#fbf4f5"} />
        <meta name="robots" content="noindex" />
      </Head>

      <main className={`hostedPage hostedPage--${theme}`}>
        <div className="hostedBackdrop" aria-hidden="true"><span /><span /><span /></div>
        <section className="hostedCard">
          <header className="hostedHeader">
            <div className="hostedMonogram">{monogram}</div>
            <span className="hostedEyebrow">{eyebrow}</span>
            <h1>{businessName}</h1>
            <p>{copy}</p>
          </header>

          <nav className="hostedActions" aria-label={`${businessName} links`}>
            {actions.map((action, index) => (
              <a
                className={`hostedAction ${action.primary ? "hostedAction--primary" : ""} hostedAction--${index + 1}`}
                href={action.href}
                key={action.label}
              >
                <span className="hostedActionIcon">{actionSymbols[action.icon] || "→"}</span>
                <strong>{action.label}</strong>
                <span className="hostedActionArrow">→</span>
              </a>
            ))}
          </nav>

          <footer className="hostedFooter">
            <span>Powered by</span>
            <img src={theme === "barber" ? "/taprank-logo-dark.png" : "/taprank-logo.png"} alt="TapRank" width="1820" height="864" />
          </footer>
        </section>
      </main>
    </>
  );
}
