export const META_PIXEL_ID = "1100460359044969";

// Standard Meta queue allows PageView to be queued while the async library loads.
export const META_PIXEL_BASE = `
!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
n.callMethod.apply(n,arguments):n.queue.push(arguments)};
if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];
t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];
s.parentNode.insertBefore(t,s)}(window,document,'script',
'https://connect.facebook.net/en_US/fbevents.js');
fbq('init', '${META_PIXEL_ID}');
fbq('track', 'PageView');
if (window.location && window.location.pathname === '/') fbq('trackCustom', 'storefront_view', { page_type: 'storefront' });
`;

export function trackMetaPageView() {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
    if (window.location?.pathname === "/") window.fbq("trackCustom", "storefront_view", { page_type: "storefront" });
  }
}
