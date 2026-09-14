export function TerminalDemo() {
  return (
    <aside
      className="terminal-demo"
      aria-label="Illustration of the Verric terminal: live deals, diligence progress, and the firm analyst"
    >
      <div className="terminal-demo-head">
        <p className="label">Verric Terminal</p>
        <span className="terminal-chip">demo · simulated data</span>
      </div>
      <div className="terminal-stats">
        <div>
          <p className="label">Live deals</p>
          <p className="stat">5</p>
        </div>
        <div>
          <p className="label">In diligence</p>
          <p className="stat">2</p>
        </div>
        <div>
          <p className="label">Firm rules active</p>
          <p className="stat">6</p>
        </div>
      </div>
      <ul className="deal-list">
        <li>
          <div>
            <p>
              Project Juniper{" "}
              <span className="faint">
                Better-for-you packaged foods · $52M EV
              </span>
            </p>
            <div className="bar">
              <span style={{ width: "60%" }} />
            </div>
          </div>
          <span className="tag warn">Due diligence</span>
          <span className="score">82 · Pursue</span>
        </li>
        <li>
          <div>
            <p>
              Project Forge{" "}
              <span className="faint">
                Personal-care contract manufacturing · $104M EV
              </span>
            </p>
            <div className="bar">
              <span style={{ width: "20%" }} />
            </div>
          </div>
          <span className="tag warn">Due diligence</span>
          <span className="score">79 · Pursue</span>
        </li>
        <li>
          <div>
            <p>
              Project Hearth{" "}
              <span className="faint">
                Private-label household products · $78M EV
              </span>
            </p>
            <div className="bar">
              <span style={{ width: "100%" }} />
            </div>
          </div>
          <span className="tag danger">Needs review</span>
          <span className="score">48 · Pass (draft)</span>
        </li>
      </ul>
      <div className="analyst-note">
        <p className="label signal">
          <span className="live-dot" aria-hidden="true" />
          Firm analyst
        </p>
        <p>
          Hearth is drafted as a pass: 57% concentration with a renewal inside
          14 months — outside your 35% rule. Kettle has no financials yet, so I
          can&apos;t assess it.
        </p>
      </div>
    </aside>
  );
}
