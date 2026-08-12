import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { ICONS } from "../lib/serviceIcons";
import { CATEGORIES, POSTS } from "../lib/blogPosts";
import abudhabiDusk from "../assets/abudhabi-dusk.webp";
import "./InsightsPage.css";

export default function InsightsPage() {
  const rootRef = useRef(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const featured = useMemo(() => POSTS.find((p) => p.featured), []);
  const rest = useMemo(() => {
    const others = POSTS.filter((p) => !p.featured);
    if (activeCategory === "All") return others;
    return others.filter((p) => p.category === activeCategory);
  }, [activeCategory]);

  useEffect(() => {
    window.scrollTo(0, 0);

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".insights-hero .split-line > span",
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
        ".insights-hero-lede",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 }
      );

      gsap.to(".insights-hero-photo", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: { trigger: ".insights-hero", start: "top top", end: "bottom top", scrub: true },
      });

      gsap.fromTo(
        ".featured-post",
        { opacity: 0, y: 50, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".featured-post", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".insights-cta-inner",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".insights-cta", start: "top 85%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".post-card",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        }
      );
    }, rootRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="insights-page" ref={rootRef}>
      <section className="insights-hero">
        <img src={abudhabiDusk} alt="" className="insights-hero-photo" aria-hidden="true" />
        <div className="insights-hero-overlay" />
        <div className="container insights-hero-inner">
          <p className="eyebrow" style={{ color: "var(--blue-500)" }}>
            Insights
          </p>
          <h1 className="insights-hero-title">
            <span className="split-line"><span>Perspective on structuring,</span></span>
            <span className="split-line"><span>capital and compliance.</span></span>
          </h1>
          <p className="insights-hero-lede">
            Notes from M2&rsquo;s advisory desk &mdash; practical reading for founders
            and finance leaders building in the UAE.
          </p>
        </div>
      </section>

      <section className="section-pad insights-body">
        <div className="container">
          {featured && (
            <Link to={`/insights/${featured.slug}`} className="featured-post">
              <div className="featured-post-media">
                <img src={featured.photo} alt="" />
              </div>
              <div className="featured-post-copy">
                <div className="post-meta">
                  <span className="post-tag">{featured.category}</span>
                  <span>{featured.date}</span>
                  <span>&middot;</span>
                  <span>{featured.readTime}</span>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <span className="post-read-more">
                  Read Article <span className="btn-arrow">&#8599;</span>
                </span>
              </div>
            </Link>
          )}

          <div className="insights-filters">
            {CATEGORIES.map((c) => (
              <button
                key={c}
                className={`insights-filter ${activeCategory === c ? "is-active" : ""}`}
                onClick={() => setActiveCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          <div className="post-grid">
            {rest.map((p) => (
              <Link to={`/insights/${p.slug}`} className="post-card" key={p.slug}>
                <div className={`post-card-media post-card-media-${p.icon}`}>
                  <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                    {ICONS[p.icon]}
                  </svg>
                </div>
                <div className="post-card-body">
                  <div className="post-meta">
                    <span className="post-tag">{p.category}</span>
                    <span>{p.readTime}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="post-read-more">
                    Read Article <span className="btn-arrow">&#8599;</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {rest.length === 0 && (
            <p className="post-empty">No articles in this category yet &mdash; check back soon.</p>
          )}
        </div>
      </section>

      <section className="insights-cta">
        <div className="container insights-cta-inner">
          <h2>Have a question our advisors could answer?</h2>
          <Link to="/#contact" className="btn btn-light">
            Book a Consultation
            <span className="btn-arrow">&#8599;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
