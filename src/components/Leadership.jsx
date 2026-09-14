import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap } from "../lib/gsap";
import mukeshKPatel from "../assets/founder-mukesh-k-patel.webp";
import mukeshMPatel from "../assets/founder-mukesh-m-patel.webp";
import "./Leadership.css";

const TEAM = [
  {
    name: "CA Mukesh K. Patel",
    role: "Co-Founder",
    credentials: "B.Com, FCA, DISA (ICAI), CCIDT (ICAI)",
    focus: "10+ years in management consultancy, driving strategic financial solutions across diverse sectors.",
    photo: mukeshKPatel,
    linkedin: "https://www.linkedin.com/in/mukeshkpatel/",
    stats: [
      { value: "10+", label: "Years advising" },
      { value: "2014", label: "Co-founded M2" },
      { value: "40+", label: "Jurisdictions" },
    ],
  },
  {
    name: "CA Mukesh M. Patel",
    role: "Co-Founder",
    credentials: "B.Com, FCA, CCCAB (ICAI)",
    focus: "10+ years as a Chartered Accountant, specializing in financial intricacies and client-focused solutions.",
    photo: mukeshMPatel,
    linkedin: "https://www.linkedin.com/in/mukeshmpatel-b9733b217/",
    stats: [
      { value: "10+", label: "Years in practice" },
      { value: "2014", label: "Co-founded M2" },
      { value: "150+", label: "Entities structured" },
    ],
  },
];

export default function Leadership() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".leader-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.12,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 90%" },
          }
        );
        gsap.fromTo(
          card.querySelectorAll(".leader-stat"),
          { opacity: 0, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 85%" },
            delay: 0.25 + i * 0.12,
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="leadership section-pad" id="leadership" ref={rootRef}>
      <div className="container">
        <div className="section-head leadership-head">
          <div>
            <p className="eyebrow">Leadership</p>
            <h2 className="services-title">Founders behind every mandate.</h2>
            <p className="leadership-intro">
              M2 is led directly by its two co-founders &mdash; every engagement gets
              their senior attention, not a delegated hand-off.
            </p>
          </div>
          <Link to="/about" className="btn btn-ghost leadership-more">
            Full Profiles
            <span className="btn-arrow">&#8599;</span>
          </Link>
        </div>

        <div className="leader-grid leader-grid-founders">
          {TEAM.map((t) => (
            <article className="leader-card" key={t.name}>
              <div className="leader-card-top">
                <div className="leader-avatar">
                  <img src={t.photo} alt={t.name} className="leader-avatar-img" />
                </div>
                <div className="leader-id">
                  <h3>{t.name}</h3>
                  <p className="leader-role">{t.role}</p>
                  <p className="leader-credentials">{t.credentials}</p>
                </div>
                <a href={t.linkedin} target="_blank" rel="noreferrer" className="leader-linkedin" aria-label="LinkedIn">
                  <span>in</span>
                </a>
              </div>

              <p className="leader-focus">{t.focus}</p>

              <div className="leader-stats">
                {t.stats.map((s) => (
                  <div className="leader-stat" key={s.label}>
                    <span className="leader-stat-value">{s.value}</span>
                    <span className="leader-stat-label">{s.label}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
