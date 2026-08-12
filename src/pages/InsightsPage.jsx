import { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { ICONS } from "../lib/serviceIcons";
import abudhabiDusk from "../assets/abudhabi-dusk.webp";
import dubaiHighway from "../assets/dubai-highway.webp";
import "./InsightsPage.css";

const CATEGORIES = ["All", "Business Setup", "Tax & Compliance", "Financial Advisory", "M&A"];

const POSTS = [
  {
    slug: "mainland-vs-freezone-2025",
    category: "Business Setup",
    icon: "registration",
    title: "Mainland vs Free Zone: Choosing the Right Structure for 2025",
    excerpt: "Ownership rules, market access and licensing costs have all shifted in the last two years — here's how to weigh the decision properly.",
    date: "Jan 2026",
    readTime: "6 min read",
    featured: true,
    photo: dubaiHighway,
  },
  {
    slug: "uae-corporate-tax-sme-guide",
    category: "Tax & Compliance",
    icon: "compliance",
    title: "UAE Corporate Tax: What Every SME Needs to Know",
    excerpt: "A practical breakdown of thresholds, exemptions and filing obligations for small and mid-sized businesses operating in the UAE.",
    date: "Dec 2025",
    readTime: "8 min read",
  },
  {
    slug: "when-to-hire-a-virtual-cfo",
    category: "Financial Advisory",
    icon: "vcfo",
    title: "When Does a Growing Business Need a Virtual CFO?",
    excerpt: "The signs that your finance function has outgrown a bookkeeper — and what institutional-grade oversight actually looks like.",
    date: "Dec 2025",
    readTime: "5 min read",
  },
  {
    slug: "due-diligence-red-flags",
    category: "M&A",
    icon: "diligence",
    title: "Due Diligence Red Flags Every Acquirer Should Watch For",
    excerpt: "The liabilities and disclosures that most often get missed in a rushed deal — and how a structured diligence process catches them.",
    date: "Nov 2025",
    readTime: "7 min read",
  },
  {
    slug: "country-by-country-reporting-deadlines",
    category: "Tax & Compliance",
    icon: "cbcr",
    title: "Country-by-Country Reporting: Are You Ready for the Deadlines?",
    excerpt: "A checklist for multinational groups on scope, thresholds and what jurisdiction-by-jurisdiction disclosure actually requires.",
    date: "Nov 2025",
    readTime: "6 min read",
  },
  {
    slug: "debt-vs-equity-structuring",
    category: "Financial Advisory",
    icon: "structuring",
    title: "Debt vs Equity: Structuring Capital for Sustainable Growth",
    excerpt: "Why the right financing mix depends less on cost of capital and more on how much control you're willing to give up.",
    date: "Oct 2025",
    readTime: "6 min read",
  },
  {
    slug: "startup-scaling-signals",
    category: "Business Setup",
    icon: "startup",
    title: "5 Signs Your Start-Up Needs Advisory Support Before Scaling",
    excerpt: "Growth exposes gaps fast. Here's what to have in place before headcount or revenue doubles.",
    date: "Oct 2025",
    readTime: "5 min read",
  },
];

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
            <Link to="#" className="featured-post" onClick={(e) => e.preventDefault()}>
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
              <Link to="#" className="post-card" key={p.slug} onClick={(e) => e.preventDefault()}>
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
