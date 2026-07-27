import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import abudhabiDusk from "../assets/abudhabi-dusk.webp";
import "./Testimonials.css";

const QUOTES = [
  {
    text: "M2 restructured our holding entity across three jurisdictions in under six weeks — precise, discreet, and completely dependable.",
    name: "Omar Al Suwaidi",
    role: "Founder, Crestline Ventures",
  },
  {
    text: "Their Virtual CFO desk gave us investment-bank-grade reporting at a fraction of the cost of an in-house team.",
    name: "Sara Whitfield",
    role: "COO, Northbridge Partners",
  },
  {
    text: "The due diligence team caught liabilities our own counsel missed. That single engagement paid for a decade of fees.",
    name: "Vikram Chandhok",
    role: "Managing Director, Orion Trading",
  },
];

export default function Testimonials() {
  const [active, setActive] = useState(0);
  const textRef = useRef(null);
  const quoteRef = useRef(null);

  useEffect(() => {
    gsap.fromTo(
      textRef.current,
      { opacity: 0, y: 16 },
      { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }
    );
  }, [active]);

  useEffect(() => {
    const path = quoteRef.current?.querySelector("path");
    if (!path) return;
    const len = path.getTotalLength();
    gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
    gsap.to(path, {
      strokeDashoffset: 0,
      duration: 1.4,
      ease: "power2.inOut",
      scrollTrigger: { trigger: quoteRef.current, start: "top 85%" },
    });
  }, []);

  const next = () => setActive((v) => (v + 1) % QUOTES.length);
  const prev = () => setActive((v) => (v - 1 + QUOTES.length) % QUOTES.length);
  const q = QUOTES[active];

  return (
    <section className="testimonials section-pad" id="testimonials">
      <img src={abudhabiDusk} alt="" className="testimonials-bg-photo" aria-hidden="true" />
      <div className="testimonials-overlay" />
      <div className="container testimonials-inner">
        <svg ref={quoteRef} viewBox="0 0 32 24" className="testi-quote-mark">
          <path
            d="M0 24V13.5C0 5 5 0 13 0v5.5C8 5.5 5.5 8 5.5 13H13V24H0Zm18 0V13.5C18 5 23 0 31 0v5.5c-5 0-7.5 2.5-7.5 7.5H31V24H18Z"
            fill="none"
            stroke="var(--blue-600)"
            strokeWidth="1"
          />
        </svg>

        <div className="testi-stars">
          {Array.from({ length: 5 }).map((_, i) => (
            <span key={i} className="testi-star" style={{ animationDelay: `${i * 0.08}s` }}>
              &#9733;
            </span>
          ))}
        </div>

        <div ref={textRef}>
          <p className="testi-text">&ldquo;{q.text}&rdquo;</p>
          <div className="testi-person">
            <div className="testi-avatar" />
            <div>
              <h4>{q.name}</h4>
              <p>{q.role}</p>
            </div>
          </div>
        </div>

        <div className="testi-controls">
          <button onClick={prev} aria-label="Previous">&#8592;</button>
          <div className="testi-dots">
            {QUOTES.map((_, i) => (
              <span key={i} className={i === active ? "is-active" : ""} onClick={() => setActive(i)} />
            ))}
          </div>
          <button onClick={next} aria-label="Next">&#8594;</button>
        </div>
      </div>
    </section>
  );
}
