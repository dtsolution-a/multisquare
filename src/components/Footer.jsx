import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../lib/gsap";
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
      { label: "Insights", to: "/#testimonials" },
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

const SOCIALS = ["in", "X", "ig"];

export default function Footer() {
  const lineRef = useRef(null);

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
  }, []);

  return (
    <footer className="site-footer">
      <img src={skylineLineart} alt="" className="footer-skyline" aria-hidden="true" />
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <img src={logoWordmarkWhite} alt="M2 &mdash; MultiSquare" className="footer-logo" />
            <p>MultiSquare Management Consultancy</p>
          </div>

          <div className="footer-cols">
            {COLS.map((col) => (
              <div key={col.title}>
                <h4>{col.title}</h4>
                <ul>
                  {col.links.map((l) => (
                    <li key={l.label}>
                      {l.to ? <Link to={l.to}>{l.label}</Link> : <a href={l.href}>{l.label}</a>}
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
              <a href="#" key={s} className="social-icon" aria-label={s}>
                <span>{s}</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
