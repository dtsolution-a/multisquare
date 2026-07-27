import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import "./Leadership.css";

const TEAM = [
  {
    name: "Rashid Al Mansoori",
    role: "Managing Partner",
    quote: "Every mandate gets the same senior attention — no exceptions.",
  },
  {
    name: "Elena Kovacs",
    role: "Head of M&A",
    quote: "Diligence is where value is protected, not just verified.",
  },
  {
    name: "Farid Haidari",
    role: "Director, Virtual CFO",
    quote: "Clarity in the numbers is clarity in the decision.",
  },
  {
    name: "Priya Nair",
    role: "Head of Tax Advisory",
    quote: "Compliance should be a strength, never an afterthought.",
  },
];

export default function Leadership() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".leader-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            delay: i * 0.1,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%" },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const onMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const light = card.querySelector(".leader-light");
    gsap.to(light, {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      duration: 0.6,
      ease: "power3.out",
    });
  };

  return (
    <section className="leadership section-pad" id="leadership" ref={rootRef}>
      <div className="container">
        <div className="section-head">
          <p className="eyebrow">Leadership</p>
          <h2 className="services-title">Senior advisors. Every mandate.</h2>
        </div>

        <div className="leader-grid">
          {TEAM.map((t) => (
            <article className="leader-card" key={t.name} onMouseMove={onMove}>
              <div className="leader-portrait">
                <div className="leader-light" />
              </div>
              <div className="leader-quote">
                <svg viewBox="0 0 32 24" className="quote-mark">
                  <path d="M0 24V13.5C0 5 5 0 13 0v5.5C8 5.5 5.5 8 5.5 13H13V24H0Zm18 0V13.5C18 5 23 0 31 0v5.5c-5 0-7.5 2.5-7.5 7.5H31V24H18Z" />
                </svg>
                <p>{t.quote}</p>
              </div>
              <div className="leader-info">
                <div>
                  <h3>{t.name}</h3>
                  <p>{t.role}</p>
                </div>
                <a href="#" className="leader-linkedin" aria-label="LinkedIn">
                  <span>in</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
