import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import styles from "./Storefront.module.css";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export default function GoogleBusinessSearch({ onSelect }) {
  const mountRef = useRef(null);
  const onSelectRef = useRef(onSelect);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => { onSelectRef.current = onSelect; }, [onSelect]);

  useEffect(() => {
    if (!ready || !mountRef.current) return undefined;
    if (!window.google?.maps?.importLibrary) {
      setError("Business search is temporarily unavailable. You can enter your link manually below.");
      return undefined;
    }
    let autocomplete;
    let cancelled = false;
    let listener;

    async function initialise() {
      try {
        const { PlaceAutocompleteElement } = await window.google.maps.importLibrary("places");
        if (cancelled || !mountRef.current) return;
        autocomplete = new PlaceAutocompleteElement();
        autocomplete.placeholder = "Type your business name…";
        autocomplete.includedRegionCodes = ["gb"];
        autocomplete.setAttribute("aria-label", "Search for your business on Google");
        mountRef.current.replaceChildren(autocomplete);
        listener = async ({ placePrediction }) => {
          try {
            const place = placePrediction.toPlace();
            await place.fetchFields({ fields: ["id", "displayName", "formattedAddress"] });
            onSelectRef.current?.({
              placeId: place.id || "",
              businessName: place.displayName || "",
              businessAddress: place.formattedAddress || "",
            });
            setError("");
          } catch {
            setError("We couldn’t load that listing. Try again or enter your link manually.");
          }
        };
        autocomplete.addEventListener("gmp-select", listener);
      } catch {
        setError("Business search is temporarily unavailable. Enter the link manually below.");
      }
    }

    initialise();
    return () => {
      cancelled = true;
      if (autocomplete && listener) autocomplete.removeEventListener("gmp-select", listener);
      if (mountRef.current) mountRef.current.replaceChildren();
    };
  }, [ready]);

  if (!apiKey) {
    return <p className={styles.searchUnavailable}>Business search is temporarily unavailable. Enter your link manually below.</p>;
  }

  return (
    <>
      <Script
        id="taprank-google-maps"
        src={`https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&loading=async&v=weekly`}
        strategy="afterInteractive"
        onLoad={() => setReady(true)}
        onReady={() => setReady(true)}
        onError={() => setError("Business search is temporarily unavailable. Enter your link manually below.")}
      />
      <div className={styles.googleSearch} ref={mountRef} aria-live="polite">
        {!ready ? <span>Loading secure business search…</span> : null}
      </div>
      {error ? <p className={styles.searchMessage}>{error}</p> : null}
    </>
  );
}
