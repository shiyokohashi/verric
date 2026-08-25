export function Memory() {
  return (
    <section id="memory" className="section band-charcoal memory">
      <div className="container memory-layout">
        <div className="memory-copy">
          <p className="eyebrow">Institutional memory</p>
          <h2>
            The reasoning behind a decision is the most valuable thing a firm
            produces.
          </h2>
          <p>
            And the thing least likely to survive the deal. Verric captures why
            you passed, why you pursued, and what the firm learned — so the next
            screen starts from judgment, not a blank chat.
          </p>
        </div>

        <div className="memory-panel">
          <div className="memory-panel-head">
            <p className="label">Decision record · Project Hearth</p>
            <span className="tag memory-tag">Pass (draft)</span>
          </div>

          <div className="memory-verdict">
            <p className="label signal">Why this call</p>
            <p>
              57% single-customer concentration with a renewal inside 14 months
              — outside the firm’s 35% rule. Drafted as a pass before IC.
            </p>
          </div>

          <ul className="memory-trail">
            <li>
              <span className="memory-dot" />
              <div>
                <p className="memory-meta">Screen · day 1</p>
                <p>Flagged against concentration limit on first pass.</p>
              </div>
            </li>
            <li>
              <span className="memory-dot" />
              <div>
                <p className="memory-meta">Analyst · day 1</p>
                <p>
                  Compared to prior pass on Project Kettle — same risk pattern,
                  same rule.
                </p>
              </div>
            </li>
            <li>
              <span className="memory-dot" />
              <div>
                <p className="memory-meta">Firm rule applied</p>
                <p>Hard · No customer above 35% of revenue.</p>
              </div>
            </li>
            <li>
              <span className="memory-dot" />
              <div>
                <p className="memory-meta">Preserved for the firm</p>
                <p>
                  Reasoning attached to the opportunity — available on the next
                  similar screen.
                </p>
              </div>
            </li>
          </ul>

          <p className="memory-principle">
            The model reads. The code calculates.{" "}
            <span>The investment team decides.</span>
          </p>
        </div>
      </div>
    </section>
  );
}
