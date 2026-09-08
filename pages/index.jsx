import Head from "next/head";
import Homepage from "../components/homepage/Homepage";
import { variants } from "../components/homepage/content";
const origin = "https://www.taprank.co.uk";
const title = "TapRank | NFC & QR Review Stands for Your Business";
const description = "Turn happy customers into action with TapRank. Google review stands, Instagram NFC stands, Tripadvisor and custom branding. From £64.99. Free UK delivery. No subscription.";
const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Organization", "@id": `${origin}/#organization`, name: "TapRank", url: `${origin}/` },
    { "@type": "WebSite", "@id": `${origin}/#website`, name: "TapRank", url: `${origin}/`, publisher: { "@id": `${origin}/#organization` } },
    ...variants.map(variant => ({
      "@type": "Product", "@id": `${origin}/#${variant.id}-stand`, name: `TapRank ${variant.name} NFC + QR Stand`, description: variant.description,
      image: `${origin}${encodeURI(variant.image)}`, brand: { "@id": `${origin}/#organization` },
      category: variant.id === "custom" ? "Custom business NFC stand" : "NFC and QR code review and social stand",
      offers: { "@type": "Offer", priceCurrency: "GBP", price: variant.price, url: `${origin}/#options`, shippingDetails: { "@type": "OfferShippingDetails", shippingDestination: { "@type": "DefinedRegion", addressCountry: "GB" }, shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "GBP" } } },
    })),
  ],
};
export default function Home() {
  return <><Head><title>{title}</title><meta name="description" content={description} /><meta name="viewport" content="width=device-width, initial-scale=1" /><meta name="theme-color" content="#101d38" /><link rel="canonical" href={`${origin}/`} /><meta property="og:type" content="website" /><meta property="og:site_name" content="TapRank" /><meta property="og:url" content={`${origin}/`} /><meta property="og:title" content={title} /><meta property="og:description" content={description} /><meta property="og:image" content={`${origin}/Assets/redesign/Stands/Google%20review%20stand.png`} /><meta name="twitter:card" content="summary_large_image" /><meta name="twitter:title" content={title} /><meta name="twitter:description" content={description} /><meta name="twitter:image" content={`${origin}/Assets/redesign/Stands/Google%20review%20stand.png`} /><script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} /></Head><Homepage /></>;
}
