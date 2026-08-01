import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger, SplitText } from "../lib/gsap";
import dubaiHighway from "../assets/dubai-highway.webp";
import abudhabiDusk from "../assets/abudhabi-dusk.webp";
import mukeshKPatel from "../assets/founder-mukesh-k-patel.webp";
import mukeshMPatel from "../assets/founder-mukesh-m-patel.webp";
import "./AboutPage.css";

const TIMELINE = [
  { year: "2014", label: "M2 founded in Dubai with a single mandate: precision advisory." },
  { year: "2017", label: "Expanded into Virtual CFO services for scaling regional enterprises." },
  { year: "2020", label: "Built a dedicated M&A and due-diligence practice." },
  { year: "2023", label: "Launched a partnership with Experience for integrated growth and marketing strategy." },
  { year: "2024", label: "150+ entities structured across 40+ jurisdictions." },
];

const STATS = [
  { target: 150, suffix: "+", label: "Entities structured" },
  { target: 40, suffix: "+", label: "Jurisdictions covered" },
  { target: 20, suffix: "+", label: "Years combined leadership experience" },
  { target: 100, suffix: "%", label: "Founder-led engagements" },
];

const FOUNDERS = [
  {
    name: "CA Mukesh K. Patel",
    role: "Co-Founder",
    credentials: "B.Com, FCA, DISA (ICAI), CCIDT (ICAI)",
    photo: mukeshKPatel,
    linkedin: "https://www.linkedin.com/in/mukeshkpatel/",
    journey: [
      "Qualified as a Chartered Accountant and entered management consultancy.",
      "10+ years advising businesses on strategic financial solutions.",
      "Co-founded M2 in Dubai, 2014.",
    ],
    bio: "Mukesh K. Patel is the co-founder of MultiSquare Management Consultancy (M2), based in Dubai. With over a decade of experience in management consultancy, he brings a wealth of strategic insight to financial advisory. His leadership has helped M2 become a trusted name in the industry, known for delivering strategic financial solutions and unparalleled client service across diverse sectors.",
  },
  {
    name: "CA Mukesh M. Patel",
    role: "Co-Founder",
    credentials: "B.Com, FCA, CCCAB (ICAI)",
    photo: mukeshMPatel,
    linkedin: "https://www.linkedin.com/in/mukeshmpatel-b9733b217/",
    journey: [
      "Began his career as a Chartered Accountant in Halol, Gujarat.",
      "10+ years mastering financial intricacies across industries.",
      "Co-founded M2 in Dubai, 2014.",
    ],
    bio: "Mukesh M. Patel is the co-founder of MultiSquare Management Consultancy (M2) in Dubai. With over a decade of experience as a Chartered Accountant based in Halol, Gujarat, he brings a deep understanding of financial intricacies to every engagement. His commitment to client success has helped establish M2 as a trusted partner for businesses navigating complex financial landscapes across the UAE and beyond.",
  },
];

export default function AboutPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    const splits = [];

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".about-page-hero .split-line > span",
        { yPercent: 110, opacity: 0, filter: "blur(10px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1.1,
          stagger: 0.12,
          ease: "power4.out",
          delay: 0.2,
        }
      );

      gsap.fromTo(
        ".about-page-hero .about-page-lede",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 }
      );

      gsap.to(".about-page-hero-photo", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".about-page-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.fromTo(
        ".story-timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: ".story-timeline",
            start: "top 65%",
            end: "bottom 75%",
            scrub: true,
          },
        }
      );

      gsap.utils.toArray(".story-timeline-row").forEach((row) => {
        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 85%" },
        });

        tl.fromTo(
          row.querySelector(".story-timeline-dot"),
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: "back.out(2.4)" },
          0
        )
          .fromTo(
            row.querySelector(".story-timeline-year"),
            { opacity: 0, y: 14, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
            0.05
          )
          .fromTo(
            row.querySelector(".story-timeline-label"),
            { opacity: 0, y: 14, filter: "blur(6px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, ease: "power3.out" },
            0.14
          );
      });

      gsap.fromTo(
        ".story-heading .split-line",
        { yPercent: 100, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".story-heading", start: "top 85%" },
        }
      );

      // Stats band
      gsap.utils.toArray(".about-stat").forEach((stat, i) => {
        gsap.fromTo(
          stat,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: i * 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
          }
        );

        const numEl = stat.querySelector(".about-stat-num");
        const target = parseFloat(numEl.dataset.target);
        const suffix = numEl.dataset.suffix || "";
        const counter = { val: 0 };
        gsap.to(counter, {
          val: target,
          duration: 1.4,
          ease: "power2.out",
          scrollTrigger: { trigger: ".about-stats", start: "top 85%" },
          onUpdate: () => {
            numEl.textContent = `${Math.round(counter.val)}${suffix}`;
          },
        });
      });

      // Founders — each row plays as its own sequenced "journey" reveal,
      // not everything appearing at once.
      gsap.utils.toArray(".founder-row").forEach((row) => {
        const mask = row.querySelector(".founder-mask");
        const photo = row.querySelector(".founder-photo");
        const bioEl = row.querySelector(".founder-bio");
        const journeyLine = row.querySelector(".founder-journey-line");
        const journeySteps = row.querySelectorAll(".founder-journey-step");

        const split = new SplitText(bioEl, { type: "lines", linesClass: "split-line" });
        splits.push(split);

        const tl = gsap.timeline({
          scrollTrigger: { trigger: row, start: "top 78%" },
        });

        tl.fromTo(
          row.querySelector(".founder-eyebrow"),
          { opacity: 0, y: 16 },
          { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
          0
        )
          .fromTo(
            row.querySelector(".founder-copy h3"),
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.7, ease: "power3.out" },
            0.08
          )
          .fromTo(
            mask,
            { clipPath: "inset(0 0 100% 0)" },
            { clipPath: "inset(0 0 0% 0)", duration: 1.3, ease: "power4.inOut" },
            0.15
          )
          .fromTo(
            row.querySelector(".founder-credentials"),
            { opacity: 0, y: 12 },
            { opacity: 1, y: 0, duration: 0.5 },
            0.4
          )
          .fromTo(journeyLine, { scaleY: 0 }, { scaleY: 1, duration: 1, ease: "power2.inOut" }, 0.55)
          .fromTo(
            journeySteps,
            { opacity: 0, x: -16 },
            { opacity: 1, x: 0, duration: 0.6, stagger: 0.22, ease: "power3.out" },
            0.65
          )
          .fromTo(
            split.lines,
            { opacity: 0, y: 14, filter: "blur(4px)" },
            { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.6, stagger: 0.05, ease: "power3.out" },
            1.25
          )
          .fromTo(
            row.querySelector(".founder-linkedin"),
            { opacity: 0, y: 14 },
            { opacity: 1, y: 0, duration: 0.6, ease: "power3.out" },
            1.55
          );

        gsap.to(photo, {
          scale: 1.14,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // Ambient motion that keeps running after the scroll-reveals are done —
      // the page shouldn't go still once you've stopped scrolling.
      gsap.utils.toArray(".founder-blob").forEach((blob, i) => {
        gsap.to(blob, {
          y: i % 2 === 0 ? "+=26" : "-=26",
          x: i % 2 === 0 ? "+=16" : "-=16",
          duration: 5 + i,
          ease: "sine.inOut",
          yoyo: true,
          repeat: -1,
        });
      });

      gsap.to(".founders-bg-blob", {
        x: "+=120",
        y: "+=60",
        duration: 14,
        ease: "sine.inOut",
        yoyo: true,
        repeat: -1,
      });

      gsap.fromTo(
        ".about-cta-inner",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".about-cta", start: "top 82%" },
        }
      );
    }, rootRef);

    return () => {
      ctx.revert();
      splits.forEach((s) => s.revert());
    };
  }, []);

  // Cursor-reactive tilt + glow on the founder portraits — interactive life
  // that isn't tied to a one-shot scroll reveal.
  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    const medias = rootRef.current.querySelectorAll(".founder-media");
    const cleanups = [];

    medias.forEach((media) => {
      const light = media.querySelector(".founder-media-light");

      const onMove = (e) => {
        const rect = media.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const rotY = (x / rect.width - 0.5) * 10;
        const rotX = (y / rect.height - 0.5) * -10;
        gsap.to(media, {
          rotateY: rotY,
          rotateX: rotX,
          duration: 0.6,
          ease: "power3.out",
          transformPerspective: 900,
        });
        gsap.to(light, { x, y, duration: 0.5, ease: "power3.out" });
      };

      const onLeave = () => {
        gsap.to(media, { rotateX: 0, rotateY: 0, duration: 0.8, ease: "power3.out" });
      };

      media.addEventListener("mousemove", onMove);
      media.addEventListener("mouseleave", onLeave);
      cleanups.push(() => {
        media.removeEventListener("mousemove", onMove);
        media.removeEventListener("mouseleave", onLeave);
      });
    });

    return () => cleanups.forEach((fn) => fn());
  }, []);

  return (
    <div className="about-page" ref={rootRef}>
      <section className="about-page-hero">
        <img src={abudhabiDusk} alt="" className="about-page-hero-photo" aria-hidden="true" />
        <div className="about-page-hero-overlay" />
        <div className="container about-page-hero-inner">
          <p className="eyebrow" style={{ color: "var(--blue-500)" }}>
            About M2
          </p>
          <h1 className="about-page-title">
            <span className="split-line"><span>A decade of precision,</span></span>
            <span className="split-line"><span>built by advisors who</span></span>
            <span className="split-line"><span>have sat on the other side.</span></span>
          </h1>
          <p className="about-page-lede">
            MultiSquare Management Consultancy (M2) was founded in Dubai on a simple
            conviction: that businesses deserve counsel with the rigor of an
            investment bank and the accessibility of a trusted partner.
          </p>
        </div>
      </section>

      <section className="section-pad about-story">
        <div className="container about-story-grid">
          <div className="about-story-copy">
            <p className="eyebrow">Our Story</p>
            <h2 className="story-heading">
              <span className="split-line"><span>Structured for scale,</span></span>
              <span className="split-line"><span>grounded in discipline.</span></span>
            </h2>
            <p className="about-story-lede">
              From a single mandate in 2014 to 150+ entities structured across 40+
              jurisdictions today, M2 has grown by staying close to every client &mdash;
              senior advisors on every engagement, no exceptions.
            </p>
          </div>

          <div className="story-timeline">
            <div className="story-timeline-line-track">
              <div className="story-timeline-line" />
            </div>
            {TIMELINE.map((t) => (
              <div className="story-timeline-row" key={t.year}>
                <span className="story-timeline-dot" />
                <span className="story-timeline-year">{t.year}</span>
                <span className="story-timeline-label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="about-stats">
        <div className="container about-stats-grid">
          {STATS.map((s) => (
            <div className="about-stat" key={s.label}>
              <span className="about-stat-num" data-target={s.target} data-suffix={s.suffix}>
                0{s.suffix}
              </span>
              <span className="about-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section-pad founders-section" id="founders">
        <div className="founders-bg-blob" />
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Leadership</p>
            <h2 className="founders-title">Meet the founders.</h2>
          </div>

          {FOUNDERS.map((f, i) => (
            <article className={`founder-row ${i % 2 === 1 ? "is-reverse" : ""}`} key={f.name}>
              <span className="founder-index" aria-hidden="true">
                0{i + 1}
              </span>
              <div className="founder-media">
                <div className="founder-blob" />
                <div className="founder-mask">
                  <img src={f.photo} alt={f.name} className="founder-photo" />
                  <div className="founder-media-light" />
                </div>
              </div>
              <div className="founder-copy">
                <p className="founder-eyebrow eyebrow">{f.role}</p>
                <h3>{f.name}</h3>
                <p className="founder-credentials">{f.credentials}</p>

                <div className="founder-journey">
                  <div className="founder-journey-line-track">
                    <div className="founder-journey-line" />
                  </div>
                  {f.journey.map((step, si) => (
                    <div className="founder-journey-step" key={si}>
                      <span className="founder-journey-dot" />
                      <p>{step}</p>
                    </div>
                  ))}
                </div>

                <p className="founder-bio">{f.bio}</p>
                <a
                  href={f.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="btn btn-ghost founder-linkedin"
                >
                  Connect on LinkedIn
                  <span className="btn-arrow">&#8599;</span>
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-pad about-cta">
        <img src={dubaiHighway} alt="" className="about-cta-photo" aria-hidden="true" />
        <div className="about-cta-overlay" />
        <div className="container about-cta-inner">
          <h2>Ready to structure your next move?</h2>
          <Link to="/#contact" className="btn btn-light">
            Book a Consultation
            <span className="btn-arrow">&#8599;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
