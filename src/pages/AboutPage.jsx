import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import dubaiHighway from "../assets/dubai-highway.webp";
import abudhabiDusk from "../assets/abudhabi-dusk.webp";
import mukeshMPatel from "../assets/founder-mukesh-m-patel.webp";
import mukeshKPatel from "../assets/founder-mukesh-k-patel.webp";
import "./AboutPage.css";

const TIMELINE = [
  { year: "2014", label: "M2 founded in Dubai with a single mandate: precision advisory." },
  { year: "2017", label: "Expanded into Virtual CFO services for scaling regional enterprises." },
  { year: "2020", label: "Built a dedicated M&A and due-diligence practice." },
  { year: "2023", label: "Launched a partnership with Experience for integrated growth and marketing strategy." },
  { year: "2024", label: "150+ entities structured across 40+ jurisdictions." },
];

const FOUNDERS = [
  {
    name: "CA Mukesh M. Patel",
    role: "Co-Founder",
    credentials: "B.Com, FCA, CCCAB (ICAI)",
    photo: mukeshMPatel,
    bio: "Mukesh M. Patel is the co-founder of MultiSquare Management Consultancy (M2) in Dubai. With over a decade of experience as a Chartered Accountant based in Halol, Gujarat, he brings a deep understanding of financial intricacies to every engagement. His commitment to client success has helped establish M2 as a trusted partner for businesses navigating complex financial landscapes across the UAE and beyond.",
  },
  {
    name: "CA Mukesh K. Patel",
    role: "Co-Founder",
    credentials: "B.Com, FCA, DISA (ICAI), CCIDT (ICAI)",
    photo: mukeshKPatel,
    bio: "Mukesh K. Patel is the co-founder of MultiSquare Management Consultancy (M2), based in Dubai. With over a decade of experience in management consultancy, he brings a wealth of strategic insight to financial advisory. His leadership has helped M2 become a trusted name in the industry, known for delivering strategic financial solutions and unparalleled client service across diverse sectors.",
  },
];

export default function AboutPage() {
  const rootRef = useRef(null);

  useEffect(() => {
    window.scrollTo(0, 0);

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

      gsap.utils.toArray(".story-timeline-row").forEach((row, i) => {
        gsap.fromTo(
          row,
          { opacity: 0, x: -30 },
          {
            opacity: 1,
            x: 0,
            duration: 0.9,
            delay: i * 0.05,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 88%" },
          }
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

      gsap.utils.toArray(".founder-row").forEach((row) => {
        const mask = row.querySelector(".founder-mask");
        const photo = row.querySelector(".founder-photo");

        gsap.fromTo(
          mask,
          { clipPath: "inset(0 0 100% 0)" },
          {
            clipPath: "inset(0 0 0% 0)",
            duration: 1.3,
            ease: "power4.inOut",
            scrollTrigger: { trigger: row, start: "top 75%" },
          }
        );

        gsap.to(photo, {
          scale: 1.14,
          ease: "none",
          scrollTrigger: { trigger: row, start: "top bottom", end: "bottom top", scrub: true },
        });

        gsap.fromTo(
          row.querySelector(".founder-copy"),
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: { trigger: row, start: "top 72%" },
          }
        );
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

    return () => ctx.revert();
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
            {TIMELINE.map((t) => (
              <div className="story-timeline-row" key={t.year}>
                <span className="story-timeline-year">{t.year}</span>
                <span className="story-timeline-label">{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-pad founders-section" id="founders">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">Leadership</p>
            <h2 className="founders-title">Meet the founders.</h2>
          </div>

          {FOUNDERS.map((f, i) => (
            <article className={`founder-row ${i % 2 === 1 ? "is-reverse" : ""}`} key={f.name}>
              <div className="founder-media">
                <div className="founder-mask">
                  <img src={f.photo} alt={f.name} className="founder-photo" />
                </div>
              </div>
              <div className="founder-copy">
                <h3>{f.name}</h3>
                <p className="founder-role">{f.role}</p>
                <p className="founder-credentials">{f.credentials}</p>
                <p className="founder-bio">{f.bio}</p>
                <a
                  href="https://www.linkedin.com/"
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
