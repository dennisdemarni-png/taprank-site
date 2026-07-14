export const TAPRANK_CONTACT = Object.freeze({
  phone: "+447576564780",
  phoneDisplay: "+44 7576 564780",
  email: "Dennisdemarni@gmail.com",
  callHref: "tel:+447576564780",
  smsHref: "sms:+447576564780",
});

export function makeContactMailto(subject, body) {
  return `mailto:${TAPRANK_CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
