import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import logoWordmarkWhite from "../assets/logo-wordmark-white.png";
import skylineLineart from "../assets/skyline-lineart.webp";
import "./Footer.css";

const COLS = [
  {
    title: "Services",
    links: ["Company Formation", "Virtual CFO", "M&A Advisory", "Tax & Compliance"],
  },
  {
    title: "Company",
    links: ["About", "Leadership", "Insights", "Careers"],
  },
  {
    title: "Contact",
    links: ["Dubai, UAE", "hello@m2consultancy.ae", "+971 4 000 0000"],
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
                    <li key={l}>
                      <a href="#">{l}</a>
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
