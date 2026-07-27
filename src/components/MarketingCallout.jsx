import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
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
  const pinWrapRef = useRef(null);
  const panelRef = useRef(null);
  const ctaRef = useRef(null);
  const towerRef = useRef(null);
  useMagnetic(ctaRef, 0.25);

  useEffect(() => {
    if (
      window.innerWidth < 900 ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }

    const ctx = gsap.context(() => {
      const panel = panelRef.current;
      const pinWrap = pinWrapRef.current;

      const measure = () => {
        gsap.set(panel, { clearProps: "width,height" });
        const rect = panel.getBoundingClientRect();
        gsap.set(panel, {
          width: rect.width,
          height: rect.height,
          borderRadius: 32,
        });
        return rect;
      };

      measure();

      // Content reveals as soon as the section enters view — independent of
      // the pin/expand scroll below, so the card is never sitting empty.
      const entrance = gsap.timeline({
        scrollTrigger: { trigger: pinWrap, start: "top 85%" },
      });

      entrance
        .fromTo(towerRef.current, { opacity: 0, scale: 1.06 }, { opacity: 0.5, scale: 1, duration: 1.2, ease: "power3.out" }, 0)
        .fromTo(
          ".marketing-title .split-line > span",
          { yPercent: 110, opacity: 0, filter: "blur(8px)" },
          { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.9, stagger: 0.1, ease: "power3.out" },
          0.1
        )
        .fromTo(".marketing-lede", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, ease: "power3.out" }, 0.35)
        .fromTo(
          ".marketing-stat",
          { opacity: 0, y: 20 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: "power3.out" },
          0.45
        )
        .fromTo(".marketing-cta", { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" }, 0.6);

      gsap.utils.toArray(".marketing-stat").forEach((stat) => {
        const numEl = stat.querySelector(".marketing-stat-num");
        const target = parseFloat(numEl.dataset.target);
        const decimals = parseInt(numEl.dataset.decimals || "0", 10);
        const suffix = numEl.dataset.suffix || "";
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.3,
          ease: "power2.out",
          scrollTrigger: { trigger: pinWrap, start: "top 80%" },
          onUpdate: () => {
            numEl.textContent = `${counter.val.toFixed(decimals)}${suffix}`;
          },
        });
      });

      const path = pinWrap.querySelector(".marketing-chart path");
      if (path) {
        const len = path.getTotalLength();
        gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.4,
          ease: "power2.inOut",
          scrollTrigger: { trigger: pinWrap, start: "top 80%" },
        });
      }

      gsap.to(towerRef.current, {
        y: "+=22",
        duration: 3.6,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      // The pin/expand grow is purely the card's geometry — content is
      // already visible by the time this kicks in.
      const st = ScrollTrigger.create({
        trigger: pinWrap,
        start: "top top",
        end: "+=1200",
        scrub: 1,
        pin: true,
        pinSpacing: true,
        invalidateOnRefresh: true,
        onRefreshInit: measure,
        animation: gsap.timeline().to(
          panel,
          { width: () => window.innerWidth, height: () => window.innerHeight, borderRadius: 0, ease: "none" },
          0
        ),
      });

      return () => st.kill();
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="marketing-callout" id="marketing" ref={rootRef}>
      <div className="marketing-pin-wrap" ref={pinWrapRef}>
        <div className="marketing-panel" ref={panelRef}>
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
