import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "../lib/gsap";
import useMagnetic from "../lib/useMagnetic";
import dubaiDuskBurj from "../assets/dubai-dusk-burj.webp";
import "./Contact.css";

const FIELDS = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "company", label: "Company Name", type: "text" },
];

const CONTACT_INFO = [
  {
    label: "Email",
    value: "hello@m2consultancy.ae",
    href: "mailto:hello@m2consultancy.ae",
    icon: <path d="M4 7h24v18H4V7Z M4 7l12 10L28 7" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    label: "Phone",
    value: "+971 4 000 0000",
    href: "tel:+97140000000",
    icon: <path d="M8 5h6l3 7-4 2c1.5 4 4 6.5 8 8l2-4 7 3v6c0 1.5-1.5 2-3 2C15 29 3 17 3 8c0-1.5.5-3 2-3Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
  {
    label: "Office",
    value: "Dubai, United Arab Emirates",
    href: null,
    icon: <path d="M16 4c-6 0-10 4.5-10 10 0 7.5 10 14 10 14s10-6.5 10-14c0-5.5-4-10-10-10Z M16 18a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" strokeLinecap="round" strokeLinejoin="round" />,
  },
];

const TRUST_POINTS = [
  "Response within 24 hours",
  "Direct line to a senior advisor",
  "No obligation, completely confidential",
];

export default function Contact() {
  const rootRef = useRef(null);
  const waRef = useRef(null);
  const [focused, setFocused] = useState(null);
  const [values, setValues] = useState({ name: "", email: "", company: "" });

  useMagnetic(waRef, 0.4);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".contact-form-el",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: { trigger: rootRef.current, start: "top 75%" },
        }
      );

      gsap.fromTo(
        ".contact-info-row",
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.7,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-info", start: "top 85%" },
        }
      );

      gsap.fromTo(
        ".trust-point",
        { opacity: 0, y: 12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".contact-trust", start: "top 90%" },
        }
      );

      gsap.fromTo(
        ".contact-map",
        { clipPath: "inset(0 0 100% 0)" },
        {
          clipPath: "inset(0 0 0% 0)",
          duration: 1.2,
          ease: "power4.inOut",
          scrollTrigger: { trigger: ".contact-map", start: "top 85%" },
        }
      );

      gsap.to(".contact-map-photo", {
        scale: 1.1,
        ease: "none",
        scrollTrigger: { trigger: ".contact-map", start: "top bottom", end: "bottom top", scrub: true },
      });
    }, rootRef);
    return () => ctx.revert();
  }, []);

  const onRipple = (e) => {
    const btn = e.currentTarget;
    const rect = btn.getBoundingClientRect();
    const span = document.createElement("span");
    span.className = "ripple";
    span.style.left = `${e.clientX - rect.left}px`;
    span.style.top = `${e.clientY - rect.top}px`;
    btn.appendChild(span);
    setTimeout(() => span.remove(), 650);
  };

  return (
    <section className="contact section-pad" id="contact" ref={rootRef}>
      <div className="contact-bg-blob" aria-hidden="true" />
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow contact-form-el">Get in Touch</p>
          <h2 className="contact-title contact-form-el">
            Let&rsquo;s structure your next move.
          </h2>
          <p className="contact-lede contact-form-el">
            Speak directly with a senior advisor &mdash; no call centres, no
            hand-offs. Based in Dubai, working across the UAE and beyond.
          </p>

          <div className="contact-info">
            {CONTACT_INFO.map((c) => {
              const Tag = c.href ? "a" : "div";
              return (
                <Tag className="contact-info-row" key={c.label} href={c.href || undefined}>
                  <span className="contact-info-icon">
                    <svg viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.6">
                      {c.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="contact-info-label">{c.label}</span>
                    <span className="contact-info-value">{c.value}</span>
                  </span>
                </Tag>
              );
            })}
          </div>

          <div className="contact-map" aria-hidden="true">
            <img src={dubaiDuskBurj} alt="" className="contact-map-photo" />
            <div className="contact-map-overlay" />
            <div className="contact-map-grid" />
            <div className="contact-map-pin">
              <span className="pin-dot" />
              <span className="pin-ring" />
            </div>
            <span className="contact-map-label">Dubai, United Arab Emirates</span>
          </div>
        </div>

        <div className="contact-form-wrap">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            {FIELDS.map((f) => (
              <div className="field contact-form-el" key={f.name}>
                <input
                  id={f.name}
                  type={f.type}
                  value={values[f.name]}
                  onFocus={() => setFocused(f.name)}
                  onBlur={() => setFocused(null)}
                  onChange={(e) => setValues((v) => ({ ...v, [f.name]: e.target.value }))}
                />
                <label
                  htmlFor={f.name}
                  className={focused === f.name || values[f.name] ? "is-active" : ""}
                >
                  {f.label}
                </label>
              </div>
            ))}

            <div className="field contact-form-el">
              <textarea
                id="message"
                rows={4}
                value={values.message || ""}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                onChange={(e) => setValues((v) => ({ ...v, message: e.target.value }))}
              />
              <label htmlFor="message" className={focused === "message" || values.message ? "is-active" : ""}>
                How can we help?
              </label>
            </div>

            <button type="submit" className="btn btn-primary contact-submit contact-form-el" onClick={onRipple}>
              Send Inquiry
              <span className="btn-arrow">&#8599;</span>
            </button>
          </form>

          <div className="contact-trust">
            {TRUST_POINTS.map((t) => (
              <div className="trust-point" key={t}>
                <svg viewBox="0 0 16 16" className="trust-point-check">
                  <path d="M3 8.5 6.2 12 13 4" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span>{t}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <a
        href="https://wa.me/"
        target="_blank"
        rel="noreferrer"
        className="whatsapp-fab"
        ref={waRef}
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.35A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 0 1 6.9 12.6l-.25.4.6 2.2-2.25-.6-.4.24A8.2 8.2 0 1 1 12 3.8Zm-3.1 4a.9.9 0 0 0-.65.3c-.22.24-.85.83-.85 2.02s.87 2.35 1 2.5c.12.17 1.7 2.6 4.13 3.64 2.02.86 2.43.7 2.87.65.44-.04 1.4-.57 1.6-1.13.2-.55.2-1.02.14-1.13-.06-.1-.22-.17-.46-.3-.24-.12-1.4-.7-1.62-.77-.22-.08-.37-.12-.53.12-.16.24-.6.77-.74.92-.13.16-.27.18-.5.06-.24-.12-1-.37-1.9-1.18-.7-.62-1.18-1.4-1.32-1.63-.13-.24 0-.36.12-.48.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.53-1.3-.74-1.77-.19-.46-.4-.4-.53-.4Z" />
        </svg>
      </a>
    </section>
  );
}
