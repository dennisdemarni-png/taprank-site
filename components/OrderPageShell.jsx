import { TAPRANK_CONTACT } from "../lib/contact";

export default function OrderPageShell({ children }) {
  return (
    <div className="orderPage">
      <header className="orderHeader">
        <div className="orderContainer orderHeaderInner">
          <a className="orderBrand" href="/" aria-label="TapRank home">
            <img
              src="/taprank-logo-transparent.png"
              alt="TapRank"
              width="512"
              height="174"
            />
          </a>
          <div className="orderHeaderHelp">
            <span>Need help?</span>
            <a href={TAPRANK_CONTACT.callHref}>{TAPRANK_CONTACT.phoneDisplay}</a>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="orderFooter">
        <div className="orderContainer orderFooterInner">
          <div>
            <strong>TapRank</strong>
            <p>Connect customers to what matters.</p>
          </div>
          <nav aria-label="Order support">
            <a href="/">Home</a>
            <a href="/privacy">Privacy</a>
            <a href={TAPRANK_CONTACT.callHref}>Call TapRank</a>
            <a href={`mailto:${TAPRANK_CONTACT.email}`}>Email support</a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
