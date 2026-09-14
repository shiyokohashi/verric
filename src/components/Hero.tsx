import { HourglassSand } from "./HourglassSand";
import { TerminalDemo } from "./TerminalDemo";

export function Hero() {
  return (
    <section id="top" className="hero">
      <div className="hero-atmosphere" aria-hidden="true" />
      <HourglassSand />

      <div className="hero-inner">
        <div className="hero-copy">
          <p className="hero-kicker">AI for private markets</p>
          <p className="hero-brand">Verric</p>
          <h1>Deal intelligence for every opportunity.</h1>
          <p className="hero-lede">
            The terminal that screens against your mandate, runs diligence as
            owned workstreams, and keeps the reasoning behind every call.
          </p>
          <div className="hero-ctas">
            <a href="#book-walkthrough" className="btn btn-primary">
              Book a walkthrough
            </a>
            <a href="#product" className="btn btn-ghost">
              See the Terminal
            </a>
          </div>
        </div>
      </div>

      <div className="hero-stage">
        <div className="hero-stage-frame">
          <TerminalDemo />
        </div>
      </div>
    </section>
  );
}
