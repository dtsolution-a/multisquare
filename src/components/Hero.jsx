import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import useMagnetic from "../lib/useMagnetic";
import logoWordmarkWhite from "../assets/logo-wordmark-white.png";
import dubaiDuskBurj from "../assets/dubai-dusk-burj.webp";
import towerIsolated from "../assets/tower-isolated.webp";
import RotatingText from "./RotatingText";
import "./Hero.css";

const ROTATING_PHRASES = [
  "decisions that move markets.",
  "capital that compounds.",
  "structures built to last.",
  "growth without compromise.",
];

export default function Hero({ ready }) {
  const rootRef = useRef(null);
  const bgRef = useRef(null);
  const lightRef = useRef(null);
  const ctaRef = useRef(null);

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
        .fromTo(
          ".hero-logo",
          { opacity: 0, y: 20, scale: 0.92, filter: "blur(10px)" },
          { opacity: 1, y: 0, scale: 1, filter: "blur(0px)", duration: 1, ease: "power3.out" },
          0
        )
        .fromTo(
          ".hero-eyebrow",
          { opacity: 0, y: 14 },
          { opacity: 1, y: 0, duration: 0.8 },
          "-=0.7"
        )
        .fromTo(
          ".hero-sub",
          { opacity: 0, y: 26, filter: "blur(8px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          "-=0.7"
        )
        .fromTo(
          ".hero-cta-row > *",
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.9, stagger: 0.1 },
          "-=0.6"
        )
        .fromTo(
          ".hero-form",
          { opacity: 0, y: 40, filter: "blur(10px)" },
          { opacity: 1, y: 0, filter: "blur(0px)", duration: 1 },
          "-=0.7"
        )
        .fromTo(
          ".hero-form-field",
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, stagger: 0.08 },
          "-=0.6"
        )
        .fromTo(".hero-scroll-cue", { opacity: 0 }, { opacity: 1, duration: 0.8 }, "-=0.3");

      gsap.to(bgRef.current, {
        scale: 1.18,
        duration: 22,
        ease: "none",
      });

      gsap.to(".hero-inner", {
        yPercent: 22,
        ease: "none",
        scrollTrigger: {
          trigger: rootRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(bgRef.current, {
        yPercent: 12,
        scale: 1.05,
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

  useEffect(() => {
    const el = rootRef.current;
    const light = lightRef.current;
    if (!el || !light || window.matchMedia("(hover: none)").matches) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      gsap.to(light, { x, y, duration: 1.1, ease: "power3.out" });
      gsap.to(".hero-inner", {
        x: (x / rect.width - 0.5) * -20,
        y: (y / rect.height - 0.5) * -14,
        duration: 1.2,
        ease: "power3.out",
      });
    };

    el.addEventListener("mousemove", onMove);
    return () => el.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <section className="hero" id="top" ref={rootRef}>
      <div className="hero-bg" ref={bgRef}>
        <img src={dubaiDuskBurj} alt="" className="hero-bg-photo" />
        <img src={towerIsolated} alt="" className="hero-tower" />
        <div className="hero-noise" />
        <div className="hero-vignette" />
      </div>

      <div className="hero-cursor-light" ref={lightRef} />

      <div className="container hero-inner">
        <img src={logoWordmarkWhite} alt="M2 &mdash; MultiSquare" className="hero-logo" />

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

        <form className="hero-form" onSubmit={(e) => e.preventDefault()}>
          <div className="hero-form-field">
            <input type="text" placeholder="Full name" required />
          </div>
          <div className="hero-form-field">
            <input type="email" placeholder="Email address" required />
          </div>
          <div className="hero-form-field">
            <select defaultValue="">
              <option value="" disabled>
                Area of interest
              </option>
              <option>Company Formation</option>
              <option>Virtual CFO</option>
              <option>M&amp;A</option>
              <option>Tax Advisory</option>
            </select>
          </div>
          <button type="submit" className="hero-form-submit hero-form-field">
            Submit
          </button>
        </form>
      </div>

      <div className="hero-scroll-cue">
        <span>Scroll</span>
        <div className="hero-scroll-line" />
      </div>
    </section>
  );
}
