import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import mukeshMPatel from "../assets/founder-mukesh-m-patel.webp";
import mukeshKPatel from "../assets/founder-mukesh-k-patel.webp";
import "./Leadership.css";

const TEAM = [
  {
    name: "CA Mukesh M. Patel",
    role: "Co-Founder",
    credentials: "B.Com, FCA, CCCAB (ICAI)",
    focus: "10+ years as a Chartered Accountant, specializing in financial intricacies and client-focused solutions.",
    photo: mukeshMPatel,
  },
  {
    name: "CA Mukesh K. Patel",
    role: "Co-Founder",
    credentials: "B.Com, FCA, DISA (ICAI), CCIDT (ICAI)",
    focus: "10+ years in management consultancy, driving strategic financial solutions across diverse sectors.",
    photo: mukeshKPatel,
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
        <div className="section-head leadership-head">
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 className="services-title">Founders behind every mandate.</h2>
          </div>
          <Link to="/about" className="btn btn-ghost leadership-more">
            Full Profiles
            <span className="btn-arrow">&#8599;</span>
          </Link>
        </div>

        <div className="leader-grid leader-grid-founders">
          {TEAM.map((t) => (
            <article className="leader-card" key={t.name} onMouseMove={onMove}>
              <div className="leader-portrait">
                <img src={t.photo} alt={t.name} className="leader-photo" />
                <div className="leader-light" />
              </div>
              <div className="leader-quote">
                <svg viewBox="0 0 32 24" className="quote-mark">
                  <path d="M0 24V13.5C0 5 5 0 13 0v5.5C8 5.5 5.5 8 5.5 13H13V24H0Zm18 0V13.5C18 5 23 0 31 0v5.5c-5 0-7.5 2.5-7.5 7.5H31V24H18Z" />
                </svg>
                <p>{t.focus}</p>
              </div>
              <div className="leader-info">
                <div>
                  <h3>{t.name}</h3>
                  <p>{t.role}</p>
                  <p className="leader-credentials">{t.credentials}</p>
                </div>
                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="leader-linkedin" aria-label="LinkedIn">
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
