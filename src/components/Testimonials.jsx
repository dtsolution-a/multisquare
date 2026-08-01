import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import abudhabiDusk from "../assets/abudhabi-dusk.webp";
import "./Testimonials.css";

const QUOTES = [
  {
    text: "M2 restructured our holding entity across three jurisdictions in under six weeks — precise, discreet, and completely dependable.",
    name: "Omar Al Suwaidi",
    role: "Founder, Crestline Ventures",
    initials: "OA",
  },
  {
    text: "Their Virtual CFO desk gave us investment-bank-grade reporting at a fraction of the cost of an in-house team.",
    name: "Sara Whitfield",
    role: "COO, Northbridge Partners",
    initials: "SW",
  },
  {
    text: "The due diligence team caught liabilities our own counsel missed. That single engagement paid for a decade of fees.",
    name: "Vikram Chandhok",
    role: "Managing Director, Orion Trading",
    initials: "VC",
  },
];

export default function Testimonials() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".testi-head-copy .split-line > span",
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".testi-head-copy", start: "top 85%" },
        }
      );

      gsap.utils.toArray(".testi-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 1,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );

        const path = card.querySelector(".testi-quote-mark path");
        if (path) {
          const len = path.getTotalLength();
          gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
          gsap.to(path, {
            strokeDashoffset: 0,
            duration: 1.2,
            ease: "power2.inOut",
            scrollTrigger: { trigger: card, start: "top 82%" },
          });
        }
      });

      gsap.to(".testimonials-bg-photo", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".testi-glyph", {
        x: "+=40",
        y: "-=24",
        duration: 10,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const onMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const light = card.querySelector(".testi-card-light");
    gsap.to(light, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section className="testimonials section-pad" id="testimonials" ref={rootRef}>
      <img src={abudhabiDusk} alt="" className="testimonials-bg-photo" aria-hidden="true" />
      <div className="testimonials-overlay" />
      <span className="testi-glyph" aria-hidden="true">
        &#8221;
      </span>

      <div className="container">
        <div className="section-head testi-head">
          <div className="testi-head-copy">
            <p className="eyebrow" style={{ color: "var(--blue-500)" }}>
              Client Voices
            </p>
            <h2 className="services-title">
              <span className="split-line"><span>Trusted by leaders</span></span>
              <span className="split-line"><span>who expect more.</span></span>
            </h2>
          </div>
        </div>

        <div className="testi-grid">
          {QUOTES.map((q) => (
            <article className="testi-card" key={q.name} onMouseMove={onMove}>
              <div className="testi-card-light" />
              <svg viewBox="0 0 32 24" className="testi-quote-mark">
                <path
                  d="M0 24V13.5C0 5 5 0 13 0v5.5C8 5.5 5.5 8 5.5 13H13V24H0Zm18 0V13.5C18 5 23 0 31 0v5.5c-5 0-7.5 2.5-7.5 7.5H31V24H18Z"
                  fill="none"
                  stroke="var(--blue-500)"
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

              <p className="testi-text">&ldquo;{q.text}&rdquo;</p>

              <div className="testi-person">
                <div className="testi-avatar">{q.initials}</div>
                <div>
                  <h4>{q.name}</h4>
                  <p>{q.role}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
