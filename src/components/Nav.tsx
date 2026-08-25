"use client";

import { useEffect, useState } from "react";
import { Logo } from "./Logo";

const links = [
  { href: "#product", label: "Product" },
  { href: "#memory", label: "Memory" },
  { href: "#trust", label: "Trust" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="header-inner">
        <a href="#top" className="header-brand" aria-label="Verric — back to top">
          <Logo />
        </a>
        <nav className="nav-desktop" aria-label="Main">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <div className="header-end">
          <a href="#book-walkthrough" className="btn btn-primary nav-cta">
            Book a walkthrough
          </a>
          <button
            className="nav-toggle"
            type="button"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open ? (
        <nav className="nav-mobile" aria-label="Mobile">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <a
            href="#book-walkthrough"
            className="btn btn-primary nav-cta"
            onClick={() => setOpen(false)}
          >
            Book a walkthrough
          </a>
        </nav>
      ) : null}
    </header>
  );
}
