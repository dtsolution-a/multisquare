import { useEffect, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import { ICONS } from "../lib/serviceIcons";
import { getPostBySlug, getRelatedPosts } from "../lib/blogPosts";
import "./PostPage.css";

export default function PostPage() {
  const { slug } = useParams();
  const rootRef = useRef(null);
  const progressRef = useRef(null);
  const post = getPostBySlug(slug);
  const related = post ? getRelatedPosts(post) : [];

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  useEffect(() => {
    if (!post) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".post-hero .split-line > span",
        { yPercent: 110, opacity: 0, filter: "blur(10px)" },
        {
          yPercent: 0,
          opacity: 1,
          filter: "blur(0px)",
          duration: 1,
          stagger: 0.1,
          ease: "power4.out",
          delay: 0.15,
        }
      );

      gsap.fromTo(
        ".post-hero-meta, .post-hero-media",
        { opacity: 0, y: 24 },
        { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, ease: "power3.out", delay: 0.35 }
      );

      gsap.to(".post-hero-media img", {
        scale: 1.1,
        ease: "none",
        scrollTrigger: { trigger: ".post-hero-media", start: "top bottom", end: "bottom top", scrub: true },
      });

      gsap.utils.toArray(".post-section").forEach((section) => {
        gsap.fromTo(
          section,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: { trigger: section, start: "top 88%" },
          }
        );
      });

      gsap.fromTo(
        ".related-post",
        { opacity: 0, y: 30, filter: "blur(6px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".related-grid", start: "top 88%" },
        }
      );

      gsap.set(progressRef.current, { scaleX: 0, transformOrigin: "left center" });
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: ".post-article",
          start: "top top",
          end: "bottom bottom",
          scrub: true,
        },
      });
    }, rootRef);

    return () => ctx.revert();
  }, [post]);

  if (!post) {
    return (
      <div className="post-page post-not-found">
        <div className="container">
          <p className="eyebrow">Insights</p>
          <h1>Article not found.</h1>
          <p>The article you&rsquo;re looking for may have moved or been unpublished.</p>
          <Link to="/insights" className="btn btn-primary">
            Back to Insights
            <span className="btn-arrow">&#8599;</span>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="post-page" ref={rootRef}>
      <div className="post-progress" ref={progressRef} />

      <section className="post-hero">
        <div className="container">
          <Link to="/insights" className="post-back">
            &#8592; All Insights
          </Link>
          <div className="post-hero-meta">
            <span className="post-tag">{post.category}</span>
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>{post.readTime}</span>
          </div>
          <h1 className="post-hero-title">
            {post.title.split(": ").map((chunk, i, arr) => (
              <span className="split-line" key={i}>
                <span>
                  {chunk}
                  {i < arr.length - 1 ? ":" : ""}
                </span>
              </span>
            ))}
          </h1>
        </div>

        <div className="post-hero-media">
          <img src={post.photo} alt="" />
        </div>
      </section>

      <article className="post-article section-pad">
        <div className="container post-article-inner">
          <p className="post-disclaimer">
            This article is for general information and does not constitute
            legal, financial or tax advice. Speak to an M2 advisor for
            guidance specific to your business.
          </p>

          {post.body.map((section) => (
            <div className="post-section" key={section.heading}>
              <h2>{section.heading}</h2>
              {section.paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          ))}

          <div className="post-article-cta">
            <div>
              <h3>Want to talk through how this applies to your business?</h3>
              <p>Speak directly with a senior M2 advisor &mdash; no call centres, no hand-offs.</p>
            </div>
            <Link to="/#contact" className="btn btn-primary">
              Book a Consultation
              <span className="btn-arrow">&#8599;</span>
            </Link>
          </div>
        </div>
      </article>

      {related.length > 0 && (
        <section className="section-pad related-section">
          <div className="container">
            <div className="section-head">
              <p className="eyebrow">Keep Reading</p>
              <h2 className="services-title">More from the advisory desk.</h2>
            </div>

            <div className="post-grid related-grid">
              {related.map((p) => (
                <Link to={`/insights/${p.slug}`} className="post-card related-post" key={p.slug}>
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
          </div>
        </section>
      )}
    </div>
  );
}
