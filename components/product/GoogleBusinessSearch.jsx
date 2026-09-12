import { useEffect, useRef, useState } from "react";
import styles from "./Storefront.module.css";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
const GOOGLE_MAPS_SCRIPT_ID = "taprank-google-maps";

function loadGoogleMaps() {
  if (window.google?.maps?.importLibrary) return Promise.resolve(window.google.maps);
  if (window.__taprankGoogleMapsPromise) return window.__taprankGoogleMapsPromise;

  window.__taprankGoogleMapsPromise = new Promise((resolve, reject) => {
    const existing = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
    const handleLoad = () => {
      if (window.google?.maps?.importLibrary) resolve(window.google.maps);
      else reject(new Error("Google Maps did not initialise."));
    };
    const handleError = () => reject(new Error("Google Maps could not be loaded."));

    if (existing) {
      existing.addEventListener("load", handleLoad, { once: true });
      existing.addEventListener("error", handleError, { once: true });
      return;
    }

    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?key=${encodeURIComponent(apiKey)}&libraries=places&v=weekly&auth_referrer_policy=origin`;
    script.async = true;
    script.defer = true;
    script.addEventListener("load", handleLoad, { once: true });
    script.addEventListener("error", handleError, { once: true });
    document.head.appendChild(script);
  }).catch((error) => {
    window.__taprankGoogleMapsPromise = null;
    throw error;
  });

  return window.__taprankGoogleMapsPromise;
}

export default function GoogleBusinessSearch({ onSelect }) {
  const onSelectRef = useRef(onSelect);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [searching, setSearching] = useState(false);
  const autocompleteRef = useRef(null);
  const sessionTokenRef = useRef(null);
  const selectedQueryRef = useRef("");

  useEffect(() => { onSelectRef.current = onSelect; }, [onSelect]);

  useEffect(() => {
    if (!apiKey) return undefined;
    let cancelled = false;

    loadGoogleMaps()
      .then(async () => {
        const places = await window.google.maps.importLibrary("places");
        if (cancelled) return;
        autocompleteRef.current = places.AutocompleteSuggestion;
        sessionTokenRef.current = new places.AutocompleteSessionToken();
        setReady(true);
      })
      .catch(() => { if (!cancelled) setError("Business search is temporarily unavailable. Enter your link manually below."); });

    return () => { cancelled = true; };
  }, []);

  useEffect(() => {
    if (!ready || query.trim().length < 2 || query === selectedQueryRef.current || !autocompleteRef.current) {
      setSuggestions([]);
      return undefined;
    }
    let cancelled = false;
    const timeout = window.setTimeout(async () => {
      setSearching(true);
      try {
        const { suggestions: results } = await autocompleteRef.current.fetchAutocompleteSuggestions({
          input: query.trim(),
          includedRegionCodes: ["gb"],
          region: "gb",
          sessionToken: sessionTokenRef.current,
        });
        if (!cancelled) {
          setSuggestions(results.map((result) => result.placePrediction).filter(Boolean));
          setError("");
        }
      } catch {
        if (!cancelled) {
          setSuggestions([]);
          setError("We couldn’t search just now. Try again or enter your link manually.");
        }
      } finally {
        if (!cancelled) setSearching(false);
      }
    }, 250);

    return () => {
      cancelled = true;
      window.clearTimeout(timeout);
    };
  }, [query, ready]);

  async function selectPrediction(prediction) {
    setSearching(true);
    try {
      const place = prediction.toPlace();
      await place.fetchFields({ fields: ["id", "displayName", "formattedAddress"] });
      const selected = {
        placeId: place.id || "",
        businessName: place.displayName || prediction.mainText?.text || query,
        businessAddress: place.formattedAddress || prediction.secondaryText?.text || "",
      };
      selectedQueryRef.current = selected.businessName;
      setQuery(selected.businessName);
      setSuggestions([]);
      onSelectRef.current?.(selected);
      const { AutocompleteSessionToken } = await window.google.maps.importLibrary("places");
      sessionTokenRef.current = new AutocompleteSessionToken();
      setError("");
    } catch {
      setError("We couldn’t load that listing. Try again or enter your link manually.");
    } finally {
      setSearching(false);
    }
  }

  if (!apiKey) {
    return <p className={styles.searchUnavailable}>Business search is temporarily unavailable. Enter your link manually below.</p>;
  }

  return (
    <div className={styles.googleSearch}>
      <label className={styles.srOnly} htmlFor="taprank-google-business-search">Search for your business on Google</label>
      <div className={styles.googleSearchInput}>
        <input
          id="taprank-google-business-search"
          type="search"
          value={query}
          placeholder={ready ? "Type your business name…" : "Loading secure business search…"}
          autoComplete="off"
          role="combobox"
          aria-autocomplete="list"
          aria-controls="taprank-google-business-results"
          aria-expanded={suggestions.length > 0}
          disabled={!ready}
          onChange={(event) => { selectedQueryRef.current = ""; setQuery(event.target.value); }}
        />
        {searching ? <span className={styles.searchSpinner} aria-label="Searching" /> : null}
      </div>
      {suggestions.length > 0 ? (
        <ul className={styles.googleSuggestions} id="taprank-google-business-results" role="listbox">
          {suggestions.map((prediction) => (
            <li key={prediction.placeId} role="presentation">
              <button type="button" role="option" aria-selected="false" onClick={() => selectPrediction(prediction)}>
                <strong>{prediction.mainText?.text || prediction.text?.text || String(prediction.text || "Google business")}</strong>
                {prediction.secondaryText?.text ? <small>{prediction.secondaryText.text}</small> : null}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
      {error ? <p className={styles.searchMessage} role="status">{error}</p> : null}
    </div>
  );
}
