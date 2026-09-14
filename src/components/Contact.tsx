export function Contact() {
  return (
    <section id="contact" className="section contact">
      <span id="book-walkthrough" className="anchor" aria-hidden="true" />
      <span id="design-partner" className="anchor" aria-hidden="true" />
      <div className="container contact-layout">
        <div className="contact-intro">
          <p className="eyebrow">Contact</p>
          <h2>Send an inquiry.</h2>
          <p>We reply within one business day. Under NDA when needed.</p>
          <p className="contact-direct">
            Or email directly —{" "}
            <a href="mailto:labuizzah@verric.io">labuizzah@verric.io</a>
            {" · "}
            <a href="mailto:sprakaash@verric.io">sprakaash@verric.io</a>
          </p>
        </div>

        <form className="contact-form" method="POST" name="contact">
          <input type="hidden" name="form-name" value="contact" />
          <p className="honeypot" aria-hidden="true">
            <label>
              Don&apos;t fill this out: <input name="bot-field" tabIndex={-1} />
            </label>
          </p>

          <div className="form-row">
            <div>
              <label htmlFor="contact-name">Name</label>
              <input
                id="contact-name"
                name="name"
                type="text"
                required
                autoComplete="name"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="contact-email">Email</label>
              <input
                id="contact-email"
                name="email"
                type="email"
                required
                autoComplete="email"
                placeholder="you@firm.com"
              />
            </div>
          </div>

          <div className="form-row">
            <div>
              <label htmlFor="contact-firm">
                Firm <span className="faint">optional</span>
              </label>
              <input
                id="contact-firm"
                name="firm"
                type="text"
                autoComplete="organization"
                placeholder="Firm or fund"
              />
            </div>
            <div>
              <label htmlFor="contact-intent">Reason</label>
              <select
                id="contact-intent"
                name="reason"
                defaultValue="Booking a walkthrough"
              >
                <option>Booking a walkthrough</option>
                <option>The design-partner program</option>
                <option>Pricing</option>
                <option>Investor inquiry</option>
                <option>Something else</option>
              </select>
            </div>
          </div>

          <input type="hidden" name="buyer-type" value="PE firm" />

          <div>
            <label htmlFor="contact-message">Message</label>
            <textarea
              id="contact-message"
              name="message"
              required
              rows={6}
              placeholder="What your firm looks at, and what you’d like to walk through."
            />
          </div>

          <button type="submit" className="btn btn-ghost">
            Send inquiry
          </button>
        </form>
      </div>
    </section>
  );
}
