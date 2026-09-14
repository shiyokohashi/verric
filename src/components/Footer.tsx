import { FooterSand } from "./FooterSand";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-sand" aria-hidden="true">
        <FooterSand />
      </div>
      <div className="container footer-inner">
        <p className="footer-wordmark">Verric</p>

        <div className="footer-top">
          <p className="footer-tagline">
            The AI deal terminal for private markets.
          </p>
          <nav aria-label="Footer">
            <a href="#product">Product</a>
            <a href="#memory">Memory</a>
            <a href="#trust">Trust</a>
            <a href="#contact">Contact</a>
          </nav>
        </div>

        <div className="footer-bottom">
          <p className="legal">
            Verric provides research and analytical software and services only.
            Verric is not a broker-dealer, investment adviser, or fiduciary, and
            nothing on this site or in any Verric deliverable constitutes
            investment, legal, tax, or accounting advice, or an offer or
            solicitation to buy or sell any security or business. Outputs are
            informational, may contain errors, and should be verified
            independently. All investment decisions are solely yours.
          </p>
          <p className="footer-copy">
            © 2026 Verric. Built and signed by Luai Abuizzah and Shaurya
            Prakaash.
          </p>
        </div>
      </div>
    </footer>
  );
}
