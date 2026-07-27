import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import useMagnetic from "../lib/useMagnetic";
import logoMarkWhite from "../assets/logo-mark-white.png";
import logoMarkNavy from "../assets/logo-mark-navy.png";
import "./Header.css";

const NAV = [
  { label: "Services", href: "#services" },
  { label: "Marketing", href: "#marketing" },
  { label: "Why M2", href: "#why" },
  { label: "About", href: "#about" },
  { label: "Leadership", href: "#leadership" },
  { label: "Insights", href: "#testimonials" },
];

export default function Header({ ready }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const ctaRef = useRef(null);
  useMagnetic(ctaRef, 0.25);

  useEffect(() => {
    const lenis = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", lenis, { passive: true });
    return () => window.removeEventListener("scroll", lenis);
  }, []);

  useEffect(() => {
    if (!ready) return;
    gsap.fromTo(
      ".header-reveal",
      { y: -30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", stagger: 0.06, delay: 0.15 }
    );
  }, [ready]);

  return (
    <header className={`site-header ${scrolled ? "is-scrolled" : ""}`}>
      <div className="container header-inner">
        <a href="#top" className="logo header-reveal">
          <img src={logoMarkWhite} alt="M2" className="logo-img logo-img-white" />
          <img src={logoMarkNavy} alt="M2" className="logo-img logo-img-navy" />
        </a>

        <nav className="main-nav header-reveal">
          <ul>
            {NAV.map((item) => (
              <li key={item.href}>
                <a href={item.href}>
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions header-reveal">
          <a href="#contact" className="btn btn-primary header-cta" ref={ctaRef}>
            Book a Consultation
            <span className="btn-arrow">&#8599;</span>
          </a>
          <button
            className={`nav-burger ${open ? "is-open" : ""}`}
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      <div className={`mobile-nav ${open ? "is-open" : ""}`}>
        <ul>
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
