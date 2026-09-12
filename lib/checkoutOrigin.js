function requestOrigin(request) {
  const forwardedHost = String(request?.headers?.["x-forwarded-host"] || request?.headers?.host || "").split(",")[0].trim().toLowerCase();
  const allowedHost = /^(?:localhost|127\.0\.0\.1)(?::\d+)?$/.test(forwardedHost)
    || forwardedHost === "taprank.co.uk"
    || forwardedHost === "www.taprank.co.uk"
    || /^[a-z0-9-]+\.vercel\.app$/.test(forwardedHost);
  if (!allowedHost) return "";
  const protocol = /^(?:localhost|127\.0\.0\.1)/.test(forwardedHost) ? "http" : "https";
  return `${protocol}://${forwardedHost}`;
}

export function checkoutSiteUrl(request, runtime = process.env) {
  const configured = String(runtime.NEXT_PUBLIC_SITE_URL || "https://taprank.co.uk").replace(/\/$/, "");
  if (runtime.NODE_ENV === "development" || runtime.VERCEL_ENV === "preview") {
    return requestOrigin(request) || configured;
  }
  return configured;
}
