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
      <section style={{
        maxWidth: "900px",
        margin: "0 auto",
        paddingTop: "80px"
      }}>
        <h1 style={{
          fontSize: "56px",
          marginBottom: "20px",
          lineHeight: "1.05"
        }}>
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

        <div style={{
          display: "flex",
          gap: "16px",
          justifyContent: "center",
          flexWrap: "wrap"
        }}>
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

          <a href="#how-it-works" style={{
            border: "1px solid #333",
            color: "white",
            padding: "14px 24px",
            borderRadius: "10px",
            textDecoration: "none",
            fontWeight: "bold"
          }}>
            See How It Works
          </a>
        </div>
      </section>

      <section id="how-it-works" style={{
        maxWidth: "900px",
        margin: "100px auto 0"
      }}>
        <h2 style={{ fontSize: "36px" }}>How It Works</h2>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          marginTop: "30px"
        }}>
          <div style={cardStyle}>
            <h3 style={numberStyle}>01</h3>
            <p style={textStyle}>Send us your business name and Google review link.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={numberStyle}>02</h3>
            <p style={textStyle}>We create your custom TapRank review stand.</p>
          </div>

          <div style={cardStyle}>
            <h3 style={numberStyle}>03</h3>
            <p style={textStyle}>Customers tap or scan to leave a review instantly.</p>
          </div>
        </div>
      </section>

      <section id="order" style={{
        maxWidth: "700px",
        margin: "100px auto 0"
      }}>
        <h2 style={{ fontSize: "36px" }}>Order / Enquire</h2>

        <p style={{
          color: "#d4d4d4",
          fontSize: "18px"
        }}>
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

const cardStyle = {
  background: "#111",
  border: "1px solid #222",
  borderRadius: "16px",
  padding: "24px"
};

const numberStyle = {
  color: "#fbbf24",
  fontSize: "24px"
};

const textStyle = {
  color: "#d4d4d4",
  fontSize: "16px",
  lineHeight: "1.5"
};
