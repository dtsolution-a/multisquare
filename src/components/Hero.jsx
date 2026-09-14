import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";
import useMagnetic from "../lib/useMagnetic";
import RotatingText from "./RotatingText";
import "./Hero.css";

const ROTATING_PHRASES = [
  "decisions that move markets.",
  "capital that compounds.",
  "structures built to last.",
  "growth without compromise.",
];

// Mesh resolution — kept modest so the warp math stays cheap every frame.
const COLS = 22;
const ROWS = 14;
const REACH = 170; // px radius of cursor influence
const STRENGTH = 26; // px max displacement at the cursor's center

export default function Hero({ ready }) {
  const rootRef = useRef(null);
  const ctaRef = useRef(null);
  const svgRef = useRef(null);

  useMagnetic(ctaRef, 0.3);

  useEffect(() => {
    if (!ready) return;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.1 });

      tl.fromTo(
        ".hero-title .split-line > *",
        { yPercent: 120, opacity: 0, filter: "blur(14px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.3,
          ease: "power4.out",
          stagger: 0.12,
        }
      )
        .fromTo(".hero-eyebrow", { opacity: 0, y: 14 }, { opacity: 1, y: 0, duration: 0.8 }, 0)
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 26, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          "-=0.7"
        )
        .fromTo(".hero-cta-row > *", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 }, "-=0.6")
        .fromTo(".hero-scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.3")
        .fromTo(".hero-mesh", { opacity: 0 }, { opacity: 1, duration: 1.6 }, 0);

      gsap.to(".hero-inner", {
        yPercent: 18,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [ready]);

  // Cursor-reactive mesh: a grid of points, each pushed away from the
  // pointer by an amount that falls off with distance. Rendered as SVG
  // lines and redrawn on rAF so the warp stays smooth without thrashing
  // React state on every mousemove.
  useEffect(() => {
    const root = rootRef.current;
    const svg = svgRef.current;
    if (!root || !svg || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let width = root.clientWidth;
    let height = root.clientHeight;
    let pointer = { x: width / 2, y: height * 0.4, active: false };
    let smoothed = { x: pointer.x, y: pointer.y };
    let rafId;

    const cellW = () => width / (COLS - 1);
    const cellH = () => height / (ROWS - 1);

    const hLines = [];
    const vLines = [];
    for (let r = 0; r < ROWS; r++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      line.setAttribute("class", "hero-mesh-line");
      svg.appendChild(line);
      hLines.push(line);
    }
    for (let c = 0; c < COLS; c++) {
      const line = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
      line.setAttribute("class", "hero-mesh-line");
      svg.appendChild(line);
      vLines.push(line);
    }

    const pointAt = (c, r) => {
      const x = c * cellW();
      const y = r * cellH();
      const dx = x - smoothed.x;
      const dy = y - smoothed.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist > REACH || !pointer.active) return [x, y];
      const falloff = 1 - dist / REACH;
      const push = falloff * falloff * STRENGTH;
      const angle = Math.atan2(dy, dx);
      return [x + Math.cos(angle) * push, y + Math.sin(angle) * push];
    };

    const draw = () => {
      smoothed.x += (pointer.x - smoothed.x) * 0.12;
      smoothed.y += (pointer.y - smoothed.y) * 0.12;

      for (let r = 0; r < ROWS; r++) {
        const pts = [];
        for (let c = 0; c < COLS; c++) pts.push(pointAt(c, r).join(","));
        hLines[r].setAttribute("points", pts.join(" "));
      }
      for (let c = 0; c < COLS; c++) {
        const pts = [];
        for (let r = 0; r < ROWS; r++) pts.push(pointAt(c, r).join(","));
        vLines[c].setAttribute("points", pts.join(" "));
      }
      rafId = requestAnimationFrame(draw);
    };

    const onResize = () => {
      width = root.clientWidth;
      height = root.clientHeight;
      svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    };

    const onMove = (e) => {
      const rect = root.getBoundingClientRect();
      pointer.x = e.clientX - rect.left;
      pointer.y = e.clientY - rect.top;
      pointer.active = true;
    };
    const onLeave = () => {
      pointer.active = false;
    };

    onResize();
    window.addEventListener("resize", onResize);
    root.addEventListener("mousemove", onMove);
    root.addEventListener("mouseleave", onLeave);
    rafId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      root.removeEventListener("mousemove", onMove);
      root.removeEventListener("mouseleave", onLeave);
      hLines.forEach((l) => l.remove());
      vLines.forEach((l) => l.remove());
    };
  }, []);

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero-mesh">
        <svg ref={svgRef} className="hero-mesh-svg" preserveAspectRatio="none" />
      </div>

      <div className="container hero-inner">
        <p className="hero-eyebrow eyebrow" style={{ color: "var(--blue-500)" }}>
          Dubai, UAE &mdash; Est. Business Advisory
        </p>

        <h1 className="hero-title">
          <span className="split-line">
            <span>Precision consultancy for</span>
          </span>
          <span className="split-line">
            <RotatingText phrases={ROTATING_PHRASES} />
          </span>
        </h1>

        <p className="hero-sub">
          MultiSquare Management Consultancy (M2) structures, finances and safeguards
          ambitious enterprises across the UAE &mdash; from company formation to M&amp;A.
        </p>

        <div className="hero-cta-row">
          <a href="#contact" className="btn btn-light" ref={ctaRef}>
            Request a Consultation
            <span className="btn-arrow">&#8599;</span>
          </a>
          <a href="#services" className="hero-link">
            Explore Services
          </a>
        </div>
      </div>

      <div className="hero-scroll-cue">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
