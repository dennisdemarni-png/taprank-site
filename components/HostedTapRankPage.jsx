import Head from "next/head";

const defaultBusinessPage = {
  businessName: "North & Co. Coffee House",
  businessImage: "/product/google-profile-after.png",
  categoryLine: "Coffee • Reviews • Menu • Contact",
  ratingValue: "4.9",
  ratingCount: "512",
  supportingText: "Tap below to leave a review or explore more.",
  reviewUrl: "https://www.google.com/search?q=North+%26+Co.+Coffee+House+Manchester+reviews",
  menuUrl: "#menu",
  orderUrl: "#order",
  instagramUrl: "https://www.instagram.com/",
  phoneNumber: "+441612345678",
  websiteUrl: "https://www.taprank.co.uk/",
  bookingUrl: "#book",
  openingHours: [
    { days: "Mon – Fri", hours: "7:00 AM – 7:00 PM" },
    { days: "Sat – Sun", hours: "8:00 AM – 8:00 PM" },
  ],
  address: "14 Tib St, Manchester M4 1LG",
  mapsUrl: "https://www.google.com/maps/search/?api=1&query=14+Tib+St%2C+Manchester+M4+1LG",
};

const iconPaths = {
  menu: (
    <>
      <path d="M4.8 6.2c2.7-.8 5.1-.3 7.2 1.5 2.1-1.8 4.5-2.3 7.2-1.5v12.2c-2.7-.8-5.1-.3-7.2 1.5-2.1-1.8-4.5-2.3-7.2-1.5V6.2Z" />
      <path d="M12 7.7v12.2" />
    </>
  ),
  order: (
    <>
      <path d="M6.7 9h10.6l-.9 10.2H7.6L6.7 9Z" />
      <path d="M9.2 9V7.4a2.8 2.8 0 0 1 5.6 0V9" />
      <path d="M9.6 13h4.8" />
    </>
  ),
  instagram: (
    <>
      <rect x="5" y="5" width="14" height="14" rx="4" />
      <circle cx="12" cy="12" r="3.2" />
      <path d="M16.7 7.3h.01" />
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
  booking: (
    <>
      <rect x="5" y="6" width="14" height="13" rx="2.5" />
      <path d="M8 4v4M16 4v4M5 10h14M9 14h.01M12 14h.01M15 14h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="8" />
      <path d="M12 7.8v4.7l3 1.8" />
    </>
  ),
  map: (
    <>
      <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" />
      <circle cx="12" cy="10" r="2" />
    </>
  ),
};

function normalisePhoneHref(phoneNumber) {
  if (!phoneNumber) return "#";
  return phoneNumber.startsWith("tel:") ? phoneNumber : `tel:${phoneNumber.replace(/\s/g, "")}`;
}

function ActionIcon({ icon }) {
  if (icon === "google") {
    return (
      <span className="businessGoogleIcon" aria-hidden="true">
        <span>G</span>
      </span>
    );
  }

  return (
    <span className={`businessActionIcon businessActionIcon--${icon}`} aria-hidden="true">
      <svg viewBox="0 0 24 24">{iconPaths[icon] || iconPaths.website}</svg>
    </span>
  );
}

function Chevron({ compact = false }) {
  return <span className={compact ? "businessChevron businessChevron--compact" : "businessChevron"} aria-hidden="true">›</span>;
}

export default function HostedTapRankPage({ page }) {
  const business = { ...defaultBusinessPage, ...page };
  const openingHours = business.openingHours?.length ? business.openingHours : defaultBusinessPage.openingHours;
  const reviewCount = String(business.ratingCount).replace(/[()]/g, "");
  const actions = [
    { label: "View Menu", icon: "menu", href: business.menuUrl },
    { label: "Order Online", icon: "order", href: business.orderUrl },
    { label: "Instagram", icon: "instagram", href: business.instagramUrl },
    { label: "Call Us", icon: "call", href: normalisePhoneHref(business.phoneNumber) },
    { label: "Website", icon: "website", href: business.websiteUrl },
    { label: "Book a Table", icon: "booking", href: business.bookingUrl },
  ];

  return (
    <>
      <Head>
        <title>{business.businessName} | Powered by TapRank</title>
        <meta name="description" content={`${business.businessName} customer actions, powered by TapRank.`} />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
        <meta name="theme-color" content="#ffffff" />
        <meta name="robots" content="noindex" />
      </Head>

      <main className="businessLinkPage" data-slug={business.slug}>
        <section className="businessLinkShell" aria-label={`${business.businessName} TapRank page`}>
          <header className="businessIntro">
            <div className="businessAvatar">
              <img
                src={business.businessImage}
                alt={`${business.businessName} business image`}
                width="180"
                height="180"
                loading="eager"
              />
            </div>
            <h1>{business.businessName}</h1>
            <p className="businessCategory">{business.categoryLine}</p>
            <div className="businessRating" aria-label={`${business.ratingValue} stars from ${reviewCount} reviews`}>
              <span className="businessStars" aria-hidden="true">★★★★★</span>
              <strong>{business.ratingValue} ({reviewCount})</strong>
            </div>
            <p className="businessInstruction">{business.supportingText}</p>
          </header>

          <a className="businessPrimaryCta" href={business.reviewUrl}>
            <ActionIcon icon="google" />
            <strong>Leave a Google Review</strong>
            <Chevron />
          </a>

          <nav className="businessActionGrid" aria-label={`${business.businessName} quick actions`}>
            {actions.map((action) => (
              <a className="businessActionCard" href={action.href || "#"} key={action.label}>
                <ActionIcon icon={action.icon} />
                <span>{action.label}</span>
                <Chevron compact />
              </a>
            ))}
          </nav>

          <section className="businessInfoCard" aria-label="More information">
            <h2>More info</h2>
            <div className="businessInfoRow">
              <ActionIcon icon="clock" />
              <div className="businessHours">
                {openingHours.map((item) => (
                  <p key={`${item.days}-${item.hours}`}>
                    <span>{item.days}</span>
                    <strong>{item.hours}</strong>
                  </p>
                ))}
              </div>
            </div>
            <div className="businessInfoDivider" />
            <a className="businessInfoRow businessInfoRow--map" href={business.mapsUrl}>
              <ActionIcon icon="map" />
              <div>
                <strong>{business.address}</strong>
                <span>Open in Maps</span>
              </div>
              <Chevron compact />
            </a>
          </section>

          <footer className="businessPoweredBy">
            <span>Powered by</span>
            <img src="/taprank-logo-transparent.png" alt="TapRank" width="1280" height="331" />
          </footer>
        </section>
      </main>
    </>
  );
}
