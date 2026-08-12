import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { ICONS } from "../lib/serviceIcons";
import "./Services.css";

const SERVICES = [
  {
    n: "01",
    title: "Company Formation",
    desc: "Mainland, Free Zone and Offshore structuring engineered around your commercial objectives and licensing pathway.",
    slug: "registration-licenses-visa",
    icon: "registration",
  },
  {
    n: "02",
    title: "Virtual CFO",
    desc: "Institutional-grade financial oversight, reporting and treasury discipline without the overhead of a full office.",
    slug: "virtual-cfo",
    icon: "vcfo",
  },
  {
    n: "03",
    title: "M&A Advisory",
    desc: "End-to-end deal leadership &mdash; sourcing, valuation, due diligence and integration &mdash; protecting value at every stage.",
    slug: "due-diligence-ma",
    icon: "diligence",
  },
  {
    n: "04",
    title: "Tax & Compliance",
    desc: "Corporate tax, VAT and regulatory filings executed with precision to keep your enterprise audit-ready year-round.",
    slug: "compliance-taxation",
    icon: "compliance",
  },
];

export default function Services() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".service-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, scale: 0.9, filter: "blur(10px)", y: 40 },
          {
            opacity: 1,
            scale: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1,
            ease: "power3.out",
            delay: i * 0.12,
            scrollTrigger: {
              trigger: card,
              start: "top 88%",
            },
          }
        );
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="services section-pad" id="services" ref={rootRef}>
      <div className="container">
        <div className="section-head services-head">
          <div>
            <p className="eyebrow">Core Services</p>
            <h2 className="services-title">
              Four disciplines. One standard of precision.
            </h2>
          </div>
          <Link to="/services" className="btn btn-ghost services-more">
            View All 9 Services
            <span className="btn-arrow">&#8599;</span>
          </Link>
        </div>

        <div className="service-grid">
          {SERVICES.map((s) => (
            <article className="service-card" key={s.n}>
              <div className="service-card-top">
                <span className="service-n">{s.n}</span>
                <span className="service-icon-wrap">
                  <svg className="service-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                    {ICONS[s.icon]}
                  </svg>
                </span>
              </div>
              <h3 className="service-card-title">{s.title}</h3>
              <p className="service-card-desc" dangerouslySetInnerHTML={{ __html: s.desc }} />
              <Link to={`/services#${s.slug}`} className="service-card-link">
                Learn more <span className="btn-arrow">&#8599;</span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
