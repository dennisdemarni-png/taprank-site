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

const lucideIconPaths = {
  menu: (
    <>
      <path d="M4 19.5V5.75A2.25 2.25 0 0 1 6.25 3.5H20v14H6.25A2.25 2.25 0 0 0 4 19.75" />
      <path d="M4 19.75A2.75 2.75 0 0 0 6.75 22H20" />
      <path d="M8 7h8" />
      <path d="M8 10.5h6" />
    </>
  ),
  order: (
    <>
      <path d="M6.2 8.5h11.6l-.95 11.2a2 2 0 0 1-2 1.8h-5.7a2 2 0 0 1-2-1.8L6.2 8.5Z" />
      <path d="M9 8.5V7a3 3 0 0 1 6 0v1.5" />
      <path d="M9.5 13h5" />
      <path d="M9.5 16h3.25" />
    </>
  ),
  call: (
    <>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.82 19.82 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.82 19.82 0 0 1 2.12 4.2 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.35 1.89.66 2.78a2 2 0 0 1-.45 2.11L8.05 9.88a16 16 0 0 0 6.07 6.07l1.27-1.27a2 2 0 0 1 2.11-.45c.89.31 1.82.53 2.78.66A2 2 0 0 1 22 16.92Z" />
    </>
  ),
  website: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10Z" />
    </>
  ),
  booking: (
    <>
      <path d="M8 2v4" />
      <path d="M16 2v4" />
      <rect x="3" y="4" width="18" height="18" rx="2.75" />
      <path d="M3 10h18" />
      <path d="M8 14h.01" />
      <path d="M12 14h.01" />
      <path d="M16 14h.01" />
      <path d="M8 18h.01" />
      <path d="M12 18h.01" />
    </>
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 6v6l4 2" />
    </>
  ),
  map: (
    <>
      <path d="M20 10c0 5.5-8 12-8 12S4 15.5 4 10a8 8 0 1 1 16 0Z" />
      <circle cx="12" cy="10" r="3" />
    </>
  ),
};

function GoogleBrandIcon() {
  return (
    <svg className="businessBrandIcon businessBrandIcon--google" viewBox="0 0 48 48" focusable="false" aria-hidden="true">
      <path fill="#FFC107" d="M43.61 20.08H42V20H24v8h11.3c-1.65 4.66-6.08 8-11.3 8-6.63 0-12-5.37-12-12s5.37-12 12-12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4 12.95 4 4 12.95 4 24s8.95 20 20 20 20-8.95 20-20c0-1.34-.14-2.65-.39-3.92Z" />
      <path fill="#FF3D00" d="m6.31 14.69 6.57 4.82C14.66 15.11 18.96 12 24 12c3.06 0 5.84 1.15 7.96 3.04l5.66-5.66C34.05 6.05 29.27 4 24 4c-7.68 0-14.34 4.34-17.69 10.69Z" />
      <path fill="#4CAF50" d="M24 44c5.17 0 9.86-1.98 13.41-5.19l-6.19-5.24A11.92 11.92 0 0 1 24 36c-5.2 0-9.62-3.32-11.28-7.95L6.2 33.08C9.51 39.56 16.23 44 24 44Z" />
      <path fill="#1976D2" d="M43.61 20.08H42V20H24v8h11.3a12.04 12.04 0 0 1-4.08 5.57l6.19 5.24C36.97 39.21 44 34 44 24c0-1.34-.14-2.65-.39-3.92Z" />
    </svg>
  );
}

function InstagramBrandIcon() {
  return (
    <svg className="businessBrandIcon businessBrandIcon--instagram" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      <defs>
        <linearGradient id="taprankInstagramGradient" x1="3" y1="21" x2="21" y2="3" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#F58529" />
          <stop offset=".45" stopColor="#E1306C" />
          <stop offset=".75" stopColor="#833AB4" />
          <stop offset="1" stopColor="#405DE6" />
        </linearGradient>
      </defs>
      <rect x="4" y="4" width="16" height="16" rx="5" />
      <circle cx="12" cy="12" r="3.6" />
      <path d="M16.9 7.1h.01" />
    </svg>
  );
}

function LucideStyleIcon({ icon }) {
  return (
    <svg className="businessSvgIcon" viewBox="0 0 24 24" focusable="false" aria-hidden="true">
      {lucideIconPaths[icon] || lucideIconPaths.website}
    </svg>
  );
}

function normalisePhoneHref(phoneNumber) {
  if (!phoneNumber) return "#";
  return phoneNumber.startsWith("tel:") ? phoneNumber : `tel:${phoneNumber.replace(/\s/g, "")}`;
}

function ActionIcon({ icon }) {
  if (icon === "google") {
    return (
      <span className="businessGoogleIcon" aria-hidden="true">
        <GoogleBrandIcon />
      </span>
    );
  }

  return (
    <span className={`businessActionIcon businessActionIcon--${icon}`} aria-hidden="true">
      {icon === "instagram" ? <InstagramBrandIcon /> : <LucideStyleIcon icon={icon} />}
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
