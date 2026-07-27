import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import useMagnetic from "../lib/useMagnetic";
import towerIsolated from "../assets/tower-isolated.webp";
import "./MarketingCallout.css";

const STATS = [
  { target: 3.2, decimals: 1, suffix: "x", label: "Average ROAS uplift" },
  { target: 40, suffix: "+", label: "Campaigns launched" },
  { target: 18, suffix: " days", label: "Avg. time to first result" },
];

const TITLE_LINES = ["Growth & marketing", "strategy, handled by", "our partner studio."];

export default function MarketingCallout() {
  const rootRef = useRef(null);
  const ctaRef = useRef(null);
  const towerRef = useRef(null);
  useMagnetic(ctaRef, 0.25);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".marketing-panel",
        { opacity: 0, y: 50, scale: 0.97, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.1,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
        }
      );

      gsap.fromTo(
        ".marketing-title .split-line > span",
        { yPercent: 110, opacity: 0, filter: "blur(8px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".marketing-title", start: "top 82%" },
        }
      );

      gsap.fromTo(
        ".marketing-stat",
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: ".marketing-stats", start: "top 88%" },
        }
      );

      gsap.utils.toArray(".marketing-stat").forEach((stat) => {
        const numEl = stat.querySelector(".marketing-stat-num");
        const target = parseFloat(numEl.dataset.target);
        const decimals = parseInt(numEl.dataset.decimals || "0", 10);
        const suffix = numEl.dataset.suffix || "";
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: stat, start: "top 90%" },
          onUpdate: () => {
            numEl.textContent = `${counter.val.toFixed(decimals)}${suffix}`;
          },
        });
      });

      const path = rootRef.current.querySelector(".marketing-chart path");
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.6,
          ease: "power2.inOut",
          scrollTrigger: { trigger: rootRef.current, start: "top 65%" },
        });
      }

      gsap.fromTo(
        towerRef.current,
        { opacity: 0, scale: 1.08, y: 40 },
        {
          opacity: 0.5,
          scale: 1,
          y: 0,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 78%" },
        }
      );

      gsap.to(towerRef.current, {
        y: "+=22",
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.to(towerRef.current, {
        yPercent: 14,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="marketing-callout section-pad" id="marketing" ref={rootRef}>
      <div className="container">
        <div className="marketing-panel">
          <img
            ref={towerRef}
            src={towerIsolated}
            alt=""
            aria-hidden="true"
            className="marketing-tower"
          />

          <div className="marketing-copy">
            <p className="eyebrow marketing-eyebrow">Beyond Advisory</p>
            <h2 className="marketing-title">
              {TITLE_LINES.map((line, i) => (
                <span className="split-line" key={i}>
                  <span>{line}</span>
                </span>
              ))}
            </h2>
            <p className="marketing-lede">
              M2 clients get direct access to <strong>Experience</strong> &mdash;
              a dedicated growth and marketing practice covering brand strategy,
              performance marketing and digital execution &mdash; so structuring
              your business and scaling it never sit in separate silos.
            </p>

            <div className="marketing-stats">
              {STATS.map((s) => (
                <div className="marketing-stat" key={s.label}>
                  <span
                    className="marketing-stat-num"
                    data-target={s.target}
                    data-decimals={s.decimals || 0}
                    data-suffix={s.suffix || ""}
                  >
                    0{s.suffix}
                  </span>
                  <span className="marketing-stat-label">{s.label}</span>
                </div>
              ))}
            </div>

            <a
              href="https://experience-psi.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className="btn btn-light marketing-cta"
              ref={ctaRef}
            >
              Explore Experience
              <span className="btn-arrow">&#8599;</span>
            </a>
          </div>

          <div className="marketing-visual">
            <svg className="marketing-chart" viewBox="0 0 320 200" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M10 165 L60 122 L108 142 L158 68 L206 92 L256 38 L308 18"
                stroke="var(--blue-500)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="308" cy="18" r="6" fill="var(--blue-500)" className="marketing-chart-dot" />
              <circle cx="308" cy="18" r="6" fill="none" stroke="var(--blue-500)" strokeWidth="1.5" className="marketing-chart-pulse" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
}
