export function TerminalDemo() {
  return (
    <aside
      className="panel terminal-demo"
      aria-label="Illustration of the Verric terminal: live deals, diligence progress, and the firm analyst"
    >
      <div className="terminal-demo-head">
        <p className="label" data-signal-target="title">
          Verric Terminal
        </p>
        <span className="chip terminal-ink">demo · simulated data</span>
      </div>
      <div className="terminal-stats">
        <div>
          <p className="label" data-signal-target="live">
            Live deals
          </p>
          <p className="stat" data-signal-reveal="live">
            5
          </p>
        </div>
        <div>
          <p className="label" data-signal-target="diligence">
            In diligence
          </p>
          <p className="stat" data-signal-reveal="diligence">
            2
          </p>
        </div>
        <div>
          <p className="label" data-signal-target="rules">
            Firm rules active
          </p>
          <p className="stat" data-signal-reveal="rules">
            6
          </p>
        </div>
      </div>
      <ul className="deal-list">
        <li>
          <div>
            <p>
              <span data-signal-target="juniper">Project Juniper</span>{" "}
              <span className="faint terminal-ink">
                Better-for-you packaged foods ·{" "}
              </span>
              <span className="faint" data-signal-target="ev">
                $52M EV
              </span>
            </p>
            <div className="bar terminal-ink">
              <span style={{ width: "60%" }} />
            </div>
          </div>
          <span className="tag amber" data-signal-target="juniper-tag">
            Due diligence
          </span>
          <span className="score" data-signal-target="score">
            82 · Pursue
          </span>
        </li>
        <li>
          <div>
            <p>
              <span data-signal-target="forge">Project Forge</span>{" "}
              <span className="faint terminal-ink">
                Personal-care contract manufacturing ·{" "}
              </span>
              <span className="faint" data-signal-target="forge-ev">
                $104M EV
              </span>
            </p>
            <div className="bar terminal-ink">
              <span style={{ width: "20%" }} />
            </div>
          </div>
          <span className="tag amber" data-signal-target="forge-tag">
            Due diligence
          </span>
          <span className="score" data-signal-target="forge-score">
            79 · Pursue
          </span>
        </li>
        <li>
          <div>
            <p>
              <span data-signal-target="hearth">Project Hearth</span>{" "}
              <span className="faint terminal-ink">
                Private-label household products ·{" "}
              </span>
              <span className="faint" data-signal-target="hearth-ev">
                $78M EV
              </span>
            </p>
            <div className="bar terminal-ink">
              <span style={{ width: "100%" }} />
            </div>
          </div>
          <span className="tag red" data-signal-target="hearth-tag">
            Needs review
          </span>
          <span className="score" data-signal-target="hearth-score">
            48 · Pass (draft)
          </span>
        </li>
      </ul>
      <div className="analyst-note">
        <p className="label signal">
          <span className="live-dot terminal-ink" aria-hidden="true" />
          <span data-signal-target="analyst-label">Firm analyst</span>
        </p>
        <p>
          <span className="terminal-ink">Hearth is drafted as a pass: </span>
          <span data-signal-target="analyst">57% concentration</span>
          <span className="terminal-ink">
            {" "}
            with a renewal inside 14 months — outside your{" "}
          </span>
          <span data-signal-target="rule-35">35% rule</span>
          <span className="terminal-ink">. </span>
          <span className="faint terminal-ink">
            Kettle has no financials yet, so I can&apos;t assess it.
          </span>
        </p>
      </div>
    </aside>
  );
}
