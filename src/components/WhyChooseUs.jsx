import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import "./WhyChooseUs.css";

const POINTS = [
  {
    n: "150+",
    target: 150,
    suffix: "+",
    title: "Entities structured",
    desc: "Across Mainland, Free Zone and Offshore jurisdictions for founders, family offices and institutions.",
  },
  {
    n: "AED 2.4B",
    target: 2.4,
    suffix: "B",
    prefix: "AED ",
    decimals: 1,
    title: "Capital advised on",
    desc: "In M&A, restructuring and capital-raising mandates across the region.",
  },
  {
    n: "40+",
    target: 40,
    suffix: "+",
    title: "Licensed jurisdictions",
    desc: "Direct relationships across UAE free zones, mainland authorities and global partners.",
  },
  {
    n: "98%",
    target: 98,
    suffix: "%",
    title: "Client retention",
    desc: "Long-standing mandates built on discretion, precision and measurable outcomes.",
  },
];

export default function WhyChooseUs() {
  const rootRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray(".why-point").forEach((point) => {
        const numEl = point.querySelector(".why-num");
        const target = parseFloat(numEl.dataset.target);
        const decimals = parseInt(numEl.dataset.decimals || "0", 10);
        const prefix = numEl.dataset.prefix || "";
        const suffix = numEl.dataset.suffix || "";
        const counter = { val: 0 };

        gsap.fromTo(
          point,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: point, start: "top 80%" },
          }
        );

        gsap.to(counter, {
          val: target,
          duration: 1.6,
          ease: "power2.out",
          scrollTrigger: { trigger: point, start: "top 80%" },
          onUpdate: () => {
            numEl.textContent = `${prefix}${counter.val.toFixed(decimals)}${suffix}`;
          },
        });
      });

      gsap.fromTo(
        ".why-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".why-list",
            start: "top 60%",
            end: "bottom 80%",
            scrub: true,
          },
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="why section-pad" id="why" ref={rootRef}>
      <div className="container why-grid">
        <div className="why-sticky">
          <p className="eyebrow">Why Choose M2</p>
          <h2 className="why-title">
            Structure that scales with your ambition.
          </h2>
          <p className="why-copy">
            We combine investment-bank rigor with boutique attention &mdash; every
            engagement is led by senior advisors, not delegated down the chain.
          </p>
          <a href="#contact" className="btn btn-ghost">
            Start a Conversation
            <span className="btn-arrow">&#8599;</span>
          </a>
        </div>

        <div className="why-list">
          <div className="why-line-track">
            <div className="why-line" />
          </div>
          {POINTS.map((p, i) => (
            <div className="why-point" key={i}>
              <div className="why-dot" />
              <div
                className="why-num"
                data-target={p.target}
                data-decimals={p.decimals || 0}
                data-prefix={p.prefix || ""}
                data-suffix={p.suffix || ""}
              >
                {p.prefix || ""}0{p.suffix || ""}
              </div>
              <h3 className="why-point-title">{p.title}</h3>
              <p className="why-point-desc">{p.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
