export default function Home() {
  return (
    <main style={{
      minHeight: "100vh",
      background: "#050505",
      color: "white",
      fontFamily: "Arial, sans-serif",
      padding: "40px 24px",
      textAlign: "center"
    }}>
      <section style={{ maxWidth: "900px", margin: "0 auto", paddingTop: "80px" }}>
        <h1 style={{ fontSize: "56px", marginBottom: "20px" }}>
          Get More Google Reviews With One Tap
        </h1>

        <p style={{
          fontSize: "22px",
          color: "#d4d4d4",
          lineHeight: "1.5",
          maxWidth: "700px",
          margin: "0 auto 36px"
        }}>
          TapRank creates NFC and QR review stands for local businesses.
          Customers tap their phone or scan the QR code and land straight on your Google review page.
        </p>

        <a href="#order" style={{
          background: "#0ea5ff",
          color: "white",
          padding: "14px 24px",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "bold"
        }}>
          Order a Stand
        </a>
      </section>

      <section style={{ maxWidth: "900px", margin: "100px auto 0" }}>
        <h2 style={{ fontSize: "36px" }}>How It Works</h2>
        <p>1. Send us your business name and Google review link.</p>
        <p>2. We create your custom TapRank review stand.</p>
        <p>3. Customers tap or scan to leave a review instantly.</p>
      </section>

      <section id="order" style={{ maxWidth: "700px", margin: "100px auto 0" }}>
        <h2 style={{ fontSize: "36px" }}>Order / Enquire</h2>
        <p style={{ color: "#d4d4d4", fontSize: "18px" }}>
          TapRank Mini Stands launching locally soon.
        </p>

        <a href="mailto:hello@taprank.co.uk" style={{
          display: "inline-block",
          marginTop: "20px",
          background: "#fbbf24",
          color: "#050505",
          padding: "14px 24px",
          borderRadius: "10px",
          textDecoration: "none",
          fontWeight: "bold"
        }}>
          Email TapRank
        </a>
      </section>
    </main>
  );
}
