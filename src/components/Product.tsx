export function Product() {
  return (
    <section id="product" className="section product-band">
      <span id="how-it-works" className="anchor" aria-hidden="true" />
      <div className="container">
        <div className="section-head center">
          <p className="eyebrow">Product</p>
          <h2>What you do inside the Terminal.</h2>
          <p>
            Built around how investment teams actually decide. Most tools help
            with a task — Verric holds the acquisition from first look through
            the final call.
          </p>
        </div>

        <ol className="how-strip">
          <li>
            <span className="how-num">01</span>
            <h3>Ingest</h3>
            <p>CIM and financials in. Findings linked to source.</p>
          </li>
          <li>
            <span className="how-num">02</span>
            <h3>Screen</h3>
            <p>Firm rules applied before a week is burned.</p>
          </li>
          <li>
            <span className="how-num">03</span>
            <h3>Diligence</h3>
            <p>Workstreams, owners, blockers in one place.</p>
          </li>
          <li>
            <span className="how-num">04</span>
            <h3>Decide</h3>
            <p>The call — and why — stays with the deal.</p>
          </li>
        </ol>

        <div className="workflow-rows">
          <article className="workflow-row">
            <div>
              <p className="eyebrow">Screen</p>
              <h3>Same first read on every target</h3>
              <p>
                Drop in the CIM and financials. Verric extracts what matters,
                links every finding to the source, and returns a first pass
                against your mandate — verified earnings, ranked risks, and a
                clear pursue-or-pass call before anyone burns a week on the wrong
                deal.
              </p>
            </div>
            <div className="panel workflow-panel">
              <div className="panel-meta">
                <p className="label">Screen · Project Hearth</p>
              </div>
              <div className="workflow-panel-inner">
                <ul className="mini-list">
                  <li>
                    <span>Mandate fit</span>
                    <span className="score">Consumer · in band</span>
                  </li>
                  <li>
                    <span>Verified earnings bridge</span>
                    <span className="score">Source-linked</span>
                  </li>
                  <li>
                    <span>Customer concentration</span>
                    <span className="tag danger">57% · outside rule</span>
                  </li>
                  <li>
                    <span>Recommendation</span>
                    <span className="score">Pass (draft)</span>
                  </li>
                </ul>
              </div>
            </div>
          </article>

          <article className="workflow-row reverse">
            <div>
              <p className="eyebrow">Structure</p>
              <h3>Diligence as owned workstreams</h3>
              <p>
                Live deals break into financial, debt, legal, customers, and
                operations — with owners and progress against the clock.
                Blockers surface early, measured against time elapsed.
              </p>
            </div>
            <div className="panel workflow-panel">
              <div className="panel-meta">
                <p className="label">Project Juniper · diligence</p>
                <p className="label">Day 18 of 30</p>
              </div>
              <ul className="workstream-list">
                <li>
                  <span>Financial &amp; QoE</span>
                  <span className="faint">LA</span>
                  <div className="bar">
                    <span style={{ width: "75%" }} />
                  </div>
                </li>
                <li>
                  <span>Legal &amp; licenses</span>
                  <span className="faint">SP</span>
                  <div className="bar">
                    <span className="bar-blocked" style={{ width: "33%" }} />
                  </div>
                  <span className="tag danger">blocked</span>
                </li>
                <li>
                  <span>Customers</span>
                  <span className="faint">LA</span>
                  <div className="bar">
                    <span style={{ width: "50%" }} />
                  </div>
                </li>
                <li>
                  <span>Operations</span>
                  <span className="faint">SP</span>
                  <div className="bar">
                    <span style={{ width: "33%" }} />
                  </div>
                </li>
              </ul>
            </div>
          </article>

          <article className="workflow-row">
            <div>
              <p className="eyebrow">Decide</p>
              <h3>The call — and why — stays with the deal</h3>
              <p>
                Approvals, findings, and the reasoning behind every pursue or
                pass remain attached to the opportunity — ready for the next
                deal that looks like it.
              </p>
            </div>
            <div className="panel workflow-panel">
              <div className="panel-meta">
                <p className="label">Decision record</p>
              </div>
              <div className="decide-callout">
                <p className="label signal">Pass · drafted</p>
                <p>
                  Concentration limit breached. Compared to prior pass on
                  Project Kettle — same risk pattern, same firm rule.
                </p>
              </div>
              <ul className="rules-list">
                <li>
                  <span className="tag danger">Hard</span>
                  <span>No customer above 35% of revenue</span>
                </li>
                <li>
                  <span className="tag ok">Applied</span>
                  <span>Preserved for institutional memory</span>
                </li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
