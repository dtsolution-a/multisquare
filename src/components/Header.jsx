import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../lib/gsap";
import useMagnetic from "../lib/useMagnetic";
import logoMarkWhite from "../assets/logo-mark-white.png";
import logoMarkNavy from "../assets/logo-mark-navy.png";
import "./Header.css";

const NAV = [
  { label: "Services", to: "/#services" },
  { label: "Marketing", to: "/#marketing" },
  { label: "Why M2", to: "/#why" },
  { label: "About", to: "/about" },
  { label: "Leadership", to: "/#leadership" },
  { label: "Insights", to: "/#testimonials" },
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
        <Link to="/" className="logo header-reveal">
          <img src={logoMarkWhite} alt="M2" className="logo-img logo-img-white" />
          <img src={logoMarkNavy} alt="M2" className="logo-img logo-img-navy" />
        </Link>

        <nav className="main-nav header-reveal">
          <ul>
            {NAV.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="header-actions header-reveal">
          <Link to="/#contact" className="btn btn-primary header-cta" ref={ctaRef}>
            Book a Consultation
            <span className="btn-arrow">&#8599;</span>
          </Link>
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
            <li key={item.to}>
              <Link to={item.to} onClick={() => setOpen(false)}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </header>
  );
}
