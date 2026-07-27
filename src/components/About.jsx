import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import dubaiHighway from "../assets/dubai-highway.webp";
import "./About.css";

const TIMELINE = [
  { year: "2014", label: "M2 founded in Dubai with a single mandate: precision advisory." },
  { year: "2017", label: "Expanded into Virtual CFO services for scaling regional enterprises." },
  { year: "2020", label: "Built a dedicated M&A and due-diligence practice." },
  { year: "2024", label: "150+ entities structured across 40+ jurisdictions." },
];

export default function About() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-mask",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.4,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".about-media", start: "top 75%" },
        }
      );

      gsap.to(".about-media img, .about-media .about-photo", {
        scale: 1.15,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-media",
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray(".timeline-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            ease: "power3.out",
            delay: i * 0.05,
            scrollTrigger: { trigger: row, start: "top 88%" },
          }
        );
      });

      gsap.fromTo(
        ".about-heading .split-line",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-heading", start: "top 85%" },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="about section-pad" id="about" ref={rootRef}>
      <div className="container about-grid">
        <div className="about-copy">
          <p className="eyebrow">About M2</p>
          <h2 className="about-heading">
            <span className="split-line"><span>Built by advisors who</span></span>
            <span className="split-line"><span>have sat on the other</span></span>
            <span className="split-line"><span>side of the table.</span></span>
          </h2>
          <p className="about-lede">
            MultiSquare Management Consultancy was founded on a simple conviction:
            that businesses deserve counsel with the rigor of an investment bank
            and the accessibility of a trusted partner.
          </p>

          <div className="timeline">
            {TIMELINE.map((t) => (
              <div className="timeline-row" key={t.year}>
                <span className="timeline-year">{t.year}</span>
                <span className="timeline-label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="about-media">
          <div className="about-mask">
            <img src={dubaiHighway} alt="Dubai skyline" className="about-photo" />
          </div>
        </div>
      </div>
    </section>
  );
}
