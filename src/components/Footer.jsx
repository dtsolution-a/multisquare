import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import useMagnetic from "../lib/useMagnetic";
import logoWordmarkWhite from "../assets/logo-wordmark-white.png";
import skylineLineart from "../assets/skyline-lineart.webp";
import "./Footer.css";

const COLS = [
  {
    title: "Services",
    links: [
      { label: "Company Formation", to: "/services#registration-licenses-visa" },
      { label: "Virtual CFO", to: "/services#virtual-cfo" },
      { label: "M&A Advisory", to: "/services#due-diligence-ma" },
      { label: "Tax & Compliance", to: "/services#compliance-taxation" },
      { label: "All Services", to: "/services" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", to: "/about" },
      { label: "Leadership", to: "/#leadership" },
      { label: "Insights", to: "/insights" },
      { label: "Careers", to: "/#contact" },
    ],
  },
  {
    title: "Contact",
    links: [
      { label: "Dubai, UAE", to: "/#contact" },
      { label: "hello@m2consultancy.ae", href: "mailto:hello@m2consultancy.ae" },
      { label: "+971 4 000 0000", href: "tel:+97140000000" },
    ],
  },
];

const SOCIALS = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/",
    path: "M6 9h4v15H6V9Zm2-7a2.4 2.4 0 1 1 0 4.8A2.4 2.4 0 0 1 8 2ZM13 9h3.8v2.1h.05c.53-1 1.83-2.1 3.77-2.1 4.03 0 4.78 2.65 4.78 6.1V24h-4v-7.9c0-1.88-.03-4.3-2.62-4.3-2.63 0-3.03 2.05-3.03 4.17V24h-4V9Z",
  },
  {
    label: "X",
    href: "https://x.com/",
    path: "M3 3h5.6l4.4 6.1L18 3h3l-6.9 8.9L21.6 25H16l-4.9-6.8L5 25H2l7.4-9.5L3 3Zm2.6 1.7 11.2 18.6h2.6L8.2 4.7H5.6Z",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/",
    path: "M8.5 2h11A6.5 6.5 0 0 1 26 8.5v11a6.5 6.5 0 0 1-6.5 6.5h-11A6.5 6.5 0 0 1 2 19.5v-11A6.5 6.5 0 0 1 8.5 2Zm0 2.5A4 4 0 0 0 4.5 8.5v11a4 4 0 0 0 4 4h11a4 4 0 0 0 4-4v-11a4 4 0 0 0-4-4h-11ZM14 8.8a5.2 5.2 0 1 1 0 10.4 5.2 5.2 0 0 1 0-10.4Zm0 2.5a2.7 2.7 0 1 0 0 5.4 2.7 2.7 0 0 0 0-5.4Zm5.4-3.9a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5Z",
  },
];

export default function Footer() {
  const lineRef = useRef(null);
  const ctaRef = useRef(null);
  useMagnetic(ctaRef, 0.25);

  useEffect(() => {
    gsap.fromTo(
      lineRef.current,
      { scaleX: 0 },
      {
        scaleX: 1,
        duration: 1.4,
        ease: "power3.inOut",
        scrollTrigger: { trigger: lineRef.current, start: "top 90%" },
      }
    );

    gsap.fromTo(
      ".footer-cta-inner > *",
      { opacity: 0, y: 24 },
      {
        opacity: 1,
        y: 0,
        duration: 0.9,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: { trigger: ".footer-cta", start: "top 88%" },
      }
    );
  }, []);

  return (
    <footer className="site-footer">
      <img src={skylineLineart} alt="" className="footer-skyline" aria-hidden="true" />
      <span className="footer-watermark" aria-hidden="true">
        M<span>2</span>
      </span>

      <div className="container">
        <div className="footer-cta">
          <div className="footer-cta-inner">
            <h3>Let&rsquo;s build something precise together.</h3>
            <Link to="/#contact" className="btn btn-light footer-cta-btn" ref={ctaRef}>
              Book a Consultation
              <span className="btn-arrow">&#8599;</span>
            </Link>
          </div>
        </div>

        <div className="footer-top">
          <div className="footer-brand">
            <img src={logoWordmarkWhite} alt="M2 &mdash; MultiSquare" className="footer-logo" />
            <p>
              MultiSquare Management Consultancy &mdash; precision advisory
              for ambitious businesses across the UAE.
            </p>
          </div>

          <div className="footer-cols">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.to ? (
                        <Link to={l.to}>
                          <span>{l.label}</span>
                        </Link>
                      ) : (
                        <a href={l.href}>
                          <span>{l.label}</span>
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="footer-divider" ref={lineRef} />

        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} MultiSquare Management Consultancy (M2). All rights reserved.</p>
          <div className="footer-socials">
            {SOCIALS.map((s) => (
              <a href={s.href} target="_blank" rel="noreferrer" key={s.label} className="social-icon" aria-label={s.label}>
                <svg viewBox="0 0 28 28" fill="currentColor">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
