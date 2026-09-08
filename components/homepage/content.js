const root = "/Assets/redesign";
export const assets = {
  logo: `${root}/Brand/Taprank logo Transparent.png`,
  whiteLogo: `${root}/Brand/White Taprank logo Transparent Background.png`,
  google: `${root}/Stands/Google review stand.png`,
  instagram: `${root}/Stands/Instagram stand.png`,
  tripadvisor: `${root}/Stands/Tripadvisor stand.png`,
  custom: `${root}/Stands/Custom stands Transparent.png`,
  laserPage: `${root}/Hosted pages/Laser Expert Pro web design showcase on phone.png`,
  spacePage: `${root}/Hosted pages/Spacejump web design showcase on phone.png`,
  // The supplied Restaurant file also depicts Space Jump; do not mislabel it.
  video: `${root}/Video/Taprank outdated product video. referrence only.mp4`,
  platforms: { google: `${root}/Platform logos/Google.PNG`, instagram: `${root}/Platform logos/Instagram.PNG`, tripadvisor: `${root}/Platform logos/Tripadvisor.PNG` },
};
export const variants = [
  { id: "google", name: "Google Review", price: "64.99", accent: "#1654ed", image: assets.google, description: "Make leaving a Google review the obvious next step. Connect customers to your other useful links on the same TapRank page.", caption: "A little prompt. A lasting impression." },
  { id: "instagram", name: "Instagram", price: "64.99", accent: "#af2875", image: assets.instagram, description: "Keep the connection going after they leave. Put your Instagram front and centre, with reviews, bookings and more on your TapRank page.", caption: "From in-person moments to online connections." },
  { id: "tripadvisor", name: "Tripadvisor", price: "64.99", accent: "#087f63", image: assets.tripadvisor, description: "Give guests a simple way to share their experience on Tripadvisor, alongside your menu, directions and other useful links.", caption: "Great experiences deserve to be shared." },
  { id: "custom", name: "Custom Logo + Branding", price: "84.99", accent: "#19315a", image: assets.custom, description: "Your logo. Your colours. Your TapRank page. A tailored physical stand and custom-branded hosted page that feel like your business.", caption: "Your brand, on both sides of the tap." },
];
export const actions = [
  { id: "review", label: "Review", title: "Make their next review an easy one.", copy: "Bring Google Reviews or Tripadvisor into the moment, while the experience is still fresh.", image: `${root}/Actions/Google review.jpg`, width: 1173, height: 282, alt: "Example Google review action on a TapRank page" },
  { id: "follow", label: "Follow", title: "Keep the connection going.", copy: "Help customers find your Instagram without typing, searching or guessing your handle.", image: assets.laserPage, alt: "Laser Expert Pro page example with Google Reviews and Instagram", phone: true },
  { id: "book", label: "Book", title: "Give the next visit a head start.", copy: "Connect customers to your booking page or enquiry link, right from your TapRank page.", image: `${root}/Actions/Booking Enquiry.jpg`, width: 575, height: 252, alt: "Booking enquiry action example" },
  { id: "browse", label: "Browse", title: "Your menu. Right in their hands.", copy: "A menu, website or more about your business. Give customers the information they came for.", image: `${root}/Actions/Menu.jpg`, width: 585, height: 239, alt: "Example menu action" },
  { id: "call", label: "Call", title: "Make getting in touch simple.", copy: "Keep your phone number one clear action away, alongside the other ways to connect with you.", image: `${root}/Actions/Call resturant.jpg`, width: 565, height: 231, alt: "Example restaurant phone action" },
  { id: "find", label: "Find us", title: "Help them find their way back.", copy: "Put directions, opening hours and location details together on your business page.", image: `${root}/Actions/Directions .jpg`, width: 577, height: 241, extraImage: `${root}/Actions/More info : location.jpg`, alt: "Directions action example" },
];
export const faqs = [
  ["How does TapRank work?", "A customer taps a compatible phone on the NFC area or scans the QR code. Both open your TapRank-hosted business page, where they can choose reviews, Instagram, Tripadvisor, your menu, bookings and other links you provide."],
  ["Do customers need an app?", "No TapRank app or download is needed. Your page opens in their phone’s browser. Some destinations may ask customers to sign in, for example to leave a review."],
  ["Does it work with iPhone and Android?", "NFC works with most modern iPhone and Android phones with NFC enabled. The QR code provides an alternative using the phone’s camera. An internet connection is needed to open your page."],
  ["What happens after I order?", "Send your business details and links through our setup form. TapRank prepares your hosted page, generates and configures the QR code, and configures the NFC before dispatch. Your A7 acrylic stand arrives ready to use."],
  ["What’s the difference between Standard and Custom?", "Standard is £64.99: choose Google Review, Instagram or Tripadvisor, with the standard TapRank-hosted page design. Custom Logo + Branding is £84.99 and includes your logo, colours and tailored stand design, plus a custom-branded hosted page."],
  ["Can I change the links later?", "Yes. Contact TapRank to arrange a link update. Your stand points to a permanent TapRank page, so changing destinations does not require reprinting the QR code or reprogramming the NFC. Updates are managed by TapRank."],
  ["Is there a monthly subscription?", "No monthly subscription is required. Your one-off purchase includes the stand, setup and TapRank-hosted business page."],
  ["How quickly is it dispatched?", "Dispatch is within 48 hours, with free UK delivery. Dispatch is when your order leaves us; it is not a promise of delivery within 48 hours."],
  ["What warranty is included?", "Every TapRank includes a 1-year replacement warranty. Contact TapRank with your order details if you need help with a replacement."],
  ["Can I order multiple stands?", "Yes. Contact TapRank with your quantity, locations and branding needs for a multiple-stand enquiry."],
];
