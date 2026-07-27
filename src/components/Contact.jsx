import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import useMagnetic from "../lib/useMagnetic";
import "./Contact.css";

const FIELDS = [
  { name: "name", label: "Full Name", type: "text" },
  { name: "email", label: "Email Address", type: "email" },
  { name: "company", label: "Company Name", type: "text" },
];

export default function Contact() {
  const rootRef = useRef(null);
  const waRef = useRef(null);
  const [focused, setFocused] = useState(null);
  const [values, setValues] = useState({ name: "", email: "", company: "" });

  useMagnetic(waRef, 0.4);

  useEffect(() => {
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
      <div className="container contact-grid">
        <div className="contact-copy">
          <p className="eyebrow">Get in Touch</p>
          <h2 className="contact-title">
            Let&rsquo;s structure your next move.
          </h2>
          <p className="contact-lede">
            Speak directly with a senior advisor &mdash; no call centres, no
            hand-offs. Based in Dubai, working across the UAE and beyond.
          </p>

          <div className="contact-map" aria-hidden="true">
            <div className="contact-map-grid" />
            <div className="contact-map-pin">
              <span className="pin-dot" />
              <span className="pin-ring" />
            </div>
            <span className="contact-map-label">Dubai, United Arab Emirates</span>
          </div>
        </div>

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
