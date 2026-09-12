const taprankHosts = new Set(["taprank.co.uk", "www.taprank.co.uk"]);

export function isExternalWebLink(href) {
  if (typeof href !== "string") return false;

  try {
    const url = new URL(href);
    return ["http:", "https:"].includes(url.protocol) && !taprankHosts.has(url.hostname.toLowerCase());
  } catch {
    return false;
  }
}

export function externalLinkProps(href) {
  return isExternalWebLink(href)
    ? { target: "_blank", rel: "noopener noreferrer" }
    : {};
}
