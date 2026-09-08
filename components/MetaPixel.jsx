import { useEffect } from "react";
import Script from "next/script";
import { useRouter } from "next/router";
import { META_PIXEL_BASE, META_PIXEL_ID, trackMetaPageView } from "../lib/metaPixel";

export default function MetaPixel() {
  const router = useRouter();
  useEffect(() => {
    // Full loads are tracked by the base code; Next page transitions need a call.
    // Hash-only navigation does not trigger routeChangeComplete.
    const onRouteChange = (_url, { shallow }) => {
      if (!shallow) trackMetaPageView();
    };
    router.events.on("routeChangeComplete", onRouteChange);
    return () => router.events.off("routeChangeComplete", onRouteChange);
  }, [router.events]);

  return <>
    <Script id="taprank-meta-pixel" strategy="afterInteractive">{META_PIXEL_BASE}</Script>
    <noscript><img height="1" width="1" style={{ display: "none" }} alt="" src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`} /></noscript>
  </>;
}
