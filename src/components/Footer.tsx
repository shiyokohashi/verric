import { Logo } from "./Logo";

export function Footer() {
  return (
    <footer className="site-footer band-cream">
      <div className="container footer-top">
        <div>
          <Logo />
          <p>The AI operating system for private markets.</p>
        </div>
        <nav aria-label="Footer">
          <a href="#product">Product</a>
          <a href="#memory">Memory</a>
          <a href="#trust">Trust</a>
          <a href="#contact">Contact</a>
        </nav>
      </div>
      <div className="container footer-bottom">
        <p className="legal">
          Verric provides research and analytical software and services only.
          Verric is not a broker-dealer, investment adviser, or fiduciary, and
          nothing on this site or in any Verric deliverable constitutes
          investment, legal, tax, or accounting advice, or an offer or
          solicitation to buy or sell any security or business. Outputs are
          informational, may contain errors, and should be verified
          independently. All investment decisions are solely yours.
        </p>
        <p className="faint small">
          © 2026 Verric. Built and signed by Luai Abuizzah and Shaurya Prakaash.
        </p>
      </div>
    </footer>
  );
}
