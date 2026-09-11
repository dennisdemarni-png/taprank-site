import Head from "next/head";
import OrderPageShell from "../components/OrderPageShell";
import { TAPRANK_CONTACT } from "../lib/contact";

export default function PrivacyPage() {
  return (
    <OrderPageShell>
      <Head>
        <title>Order Setup Privacy Notice | TapRank</title>
        <meta
          name="description"
          content="How TapRank uses and protects information submitted for stand and hosted-page setup."
        />
        <meta name="robots" content="noindex, follow" />
        <link rel="canonical" href="https://taprank.co.uk/privacy" />
      </Head>

      <section className="privacyHero">
        <div className="orderContainer privacyContainer">
          <span className="orderEyebrow">PRIVACY NOTICE</span>
          <h1>How we use your order setup details.</h1>
          <p>
            This notice covers information submitted to TapRank to prepare an
            NFC + QR stand and its connected hosted business page.
          </p>
          <small>Version dated 28 July 2026</small>
        </div>
      </section>

      <section className="privacyContent">
        <div className="orderContainer privacyContainer">
          <article>
            <h2>What we collect</h2>
            <p>
              We collect the order reference you provide, contact details,
              public business information, customer-action links, opening
              hours, branding instructions and optional logo files. We do not
              ask for or store card numbers, security codes or online banking
              credentials.
            </p>
          </article>

          <article>
            <h2>Why we use it</h2>
            <p>
              TapRank uses this information to match a submission to an order,
              contact the purchaser, prepare the hosted page and stand, verify
              customer destinations, fulfil and dispatch the product, and
              provide related support or requested page updates.
            </p>
          </article>

          <article>
            <h2>Payment verification</h2>
            <p>
              Sending the setup form does not prove payment. TapRank checks the
              submitted details against its Square order records before
              production. Payment information collected by Square is handled
              separately under Square’s own privacy terms.
            </p>
          </article>

          <article>
            <h2>Storage and access</h2>
            <p>
              Setup records and optional branding files are stored using
              Supabase. Access is limited to authorised TapRank operations and
              technical service providers that need it to operate the service.
              The public website does not receive TapRank’s privileged database
              credentials, and submitted logos are stored privately.
            </p>
          </article>

          <article>
            <h2>What may become public</h2>
            <p>
              Only information intended for the customer-facing TapRank page,
              such as the business name, approved logo, address, opening hours
              and selected links, may be published. Private order-contact
              details are not published unless they were separately supplied
              as public business contact details.
            </p>
          </article>

          <article>
            <h2>How long we keep it</h2>
            <p>
              Operational setup records are kept while the connected TapRank
              page is active and are normally deleted or anonymised within 24
              months after that service ends, unless they are still needed for
              support, dispute handling or a legal record-keeping obligation.
              Branding files that are no longer required are removed sooner
              where practical.
            </p>
          </article>

          <article>
            <h2>Website measurement</h2>
            <p>TapRank uses Meta Pixel for page views and homepage interactions,
              including product selections and clicks through to Square checkout.
              These events help us understand advertising and the purchase journey.
              A checkout click is not recorded as a completed purchase. Our homepage
              event code does not include your order setup fields, contact details
              or payment information. We also use Vercel Web Analytics to understand
              website traffic.</p>
          </article>

          <article>
            <h2>Your choices</h2>
            <p>
              You can ask TapRank to explain, correct or delete information it
              holds about you, subject to any legal reason it must be retained.
              You can also tell TapRank that a business detail or destination
              must not be published.
            </p>
          </article>

          <article>
            <h2>Contact TapRank</h2>
            <p>
              For privacy questions or information requests, email{" "}
              <a href={`mailto:${TAPRANK_CONTACT.email}`}>
                {TAPRANK_CONTACT.email}
              </a>{" "}
              or call{" "}
              <a href={TAPRANK_CONTACT.callHref}>
                {TAPRANK_CONTACT.phoneDisplay}
              </a>
              .
            </p>
          </article>

          <div className="privacyActions">
            <a className="button" href="/order-details">
              Return to setup form
            </a>
            <a className="button buttonSecondary" href="/">
              TapRank home
            </a>
          </div>
        </div>
      </section>
    </OrderPageShell>
  );
}
