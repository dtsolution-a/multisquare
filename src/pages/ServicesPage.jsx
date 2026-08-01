import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { gsap, ScrollTrigger } from "../lib/gsap";
import dubaiDuskBurj from "../assets/dubai-dusk-burj.webp";
import towerIsolated from "../assets/tower-isolated.webp";
import "./ServicesPage.css";

const ICONS = {
  registration: (
    <path d="M9 4h12l4 4v20H9V4Z M21 4v4h4M13 15h10M13 19h10M13 23h6" strokeLinecap="round" strokeLinejoin="round" />
  ),
  compliance: (
    <path d="M16 4l11 4v7c0 7-4.5 11.5-11 13-6.5-1.5-11-6-11-13V8l11-4Z M11 16l3.5 3.5L21 13" strokeLinecap="round" strokeLinejoin="round" />
  ),
  structuring: (
    <path d="M16 4v6M16 26v2M6 10h20M9 10l-4 8a5 5 0 0 0 10 0l-4-8ZM27 10l-4 8a5 5 0 0 0 10 0l-4-8Z" strokeLinecap="round" strokeLinejoin="round" />
  ),
  evaluation: (
    <path d="M6 27V6M6 27h20M11 22v-7M17.5 22V10M24 22v-4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  diligence: (
    <path d="M14 4a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM21.5 21.5 28 28M10 14h8M14 10v8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  cost: (
    <path d="M8 4h16v24H8V4Z M11 9h10M11 14h3M17 14h3M11 18h3M17 18h3M11 22h3M17 22h3" strokeLinecap="round" strokeLinejoin="round" />
  ),
  vcfo: (
    <path d="M6 27V13l10-6 10 6v14M6 27h20M13 27v-8h6v8" strokeLinecap="round" strokeLinejoin="round" />
  ),
  startup: (
    <path d="M16 4c5 3 7 8 6 15l-6 7-6-7c-1-7 1-12 6-15Z M16 14a2 2 0 1 0 0.001 0Z M9 22c-3 1-4 4-4 7 3 0 6-1 7-4M23 22c3 1 4 4 4 7-3 0-6-1-7-4" strokeLinecap="round" strokeLinejoin="round" />
  ),
  cbcr: (
    <path d="M16 4a12 12 0 1 0 0 24 12 12 0 0 0 0-24ZM4 16h24M16 4c3 3.5 4.5 8 4.5 12S19 24.5 16 28c-3-3.5-4.5-8-4.5-12S13 7.5 16 4Z" strokeLinecap="round" strokeLinejoin="round" />
  ),
};

const CATEGORIES = [
  {
    label: "Business Setup & Compliance",
    intro: "Everything required to stand up and legally operate a UAE entity, then keep it compliant as regulation evolves.",
    services: [
      {
        slug: "registration-licenses-visa",
        icon: "registration",
        title: "Registration, Licenses & Visa",
        summary: "Company registration, licensing, tax registration, document clearing and post-registration support — start to finish.",
        groups: [
          { heading: "Company Registration", items: ["Jurisdiction & structure selection", "Business name reservation", "MOA / AOA drafting", "Initial regulatory approvals"] },
          { heading: "Licensing", items: ["Commercial, professional & industrial trade licenses", "Tourism licenses"] },
          { heading: "Tax Registration", items: ["VAT registration", "Excise tax for specific goods", "Corporate tax for mainland operations"] },
          { heading: "Document Clearing", items: ["Employment, investor & family visa processing", "PRO services", "Legal translation", "Ejari registration"] },
          { heading: "Post-Registration Support", items: ["Corporate bank account setup", "Accounting & bookkeeping consultation", "Office space solutions"] },
        ],
        benefits: ["Multiple jurisdictions across 7 emirates", "100% foreign ownership in free zones", "No income or capital gains tax", "UAE-wide business freedom", "Access to a skilled workforce"],
      },
      {
        slug: "compliance-taxation",
        icon: "compliance",
        title: "Compliance (Taxation & Other)",
        summary: "Corporate tax, VAT, governance and regulatory compliance managed end-to-end so nothing slips through the cracks.",
        groups: [
          { heading: "Corporate Tax Compliance", items: ["Regulatory adherence guidance", "Tax return preparation & filing", "Strategic tax planning"] },
          { heading: "VAT Compliance", items: ["Registration & filing support", "Regulatory adherence", "Business-specific VAT advisory"] },
          { heading: "Regulatory & Financial Compliance", items: ["Compliance assessments (gaps & risks)", "Internal audits & financial reporting oversight", "Risk management & internal controls"] },
          { heading: "Additional Compliance", items: ["AML & KYC protocols", "Data protection & privacy policy", "Corporate governance frameworks", "Staff training programs"] },
        ],
        benefits: ["Comprehensive regulatory adherence", "Detailed risk assessment reports", "AML / KYC / data protection training", "Governance frameworks aligned to UAE requirements"],
      },
      {
        slug: "country-by-country-reporting",
        icon: "cbcr",
        title: "Country-by-Country Reporting",
        summary: "Mandatory OECD/G20 reporting for multinational groups — global revenue, profit before tax and tax accrued, by jurisdiction.",
        groups: [
          { heading: "Reporting Scope", items: ["Global revenue breakdown by jurisdiction", "Profit before tax by jurisdiction", "Income tax accrued & paid", "Employee & activity metrics per jurisdiction"] },
        ],
        benefits: ["Ensures compliance with international tax reporting", "Supports multinational operational transparency", "Integrates with wider financial structuring & compliance work"],
      },
    ],
  },
  {
    label: "Financial Advisory",
    intro: "Structuring, executive-level oversight and rigorous costing so every financial decision stands on solid ground.",
    services: [
      {
        slug: "financial-structuring",
        icon: "structuring",
        title: "Business Financial Structuring (Debt & Equity)",
        summary: "Optimising the balance between debt and equity so your capital structure supports growth without compromising stability.",
        groups: [
          { heading: "Financial Planning & Analysis", items: ["Capital structure analysis", "Financial modeling & forecasting", "Risk identification & mitigation", "Liquidity management"] },
          { heading: "Debt Financing", items: ["Loan arrangement across banking partners", "Debt restructuring", "Syndicated lending coordination"] },
          { heading: "Equity Financing", items: ["VC & PE sourcing", "IPO & secondary offering guidance", "Crowdfunding exploration", "Convertible securities structuring"] },
          { heading: "Hybrid Financing", items: ["Mezzanine financing", "Convertible debt issuance", "Preferred equity arrangements"] },
        ],
        benefits: ["Optimal financial structure", "Long-term business success", "Flexible funding combinations", "Sustainable organizational growth"],
      },
      {
        slug: "virtual-cfo",
        icon: "vcfo",
        title: "Virtual Chief Financial Officer (vCFO)",
        summary: "Investment-bank-grade financial leadership — budgeting, reporting, strategy and compliance — without full-time executive cost.",
        groups: [
          { heading: "Financial Planning & Analysis", items: ["Budgeting & forecasting", "Cash flow management", "Financial modeling", "Scenario analysis"] },
          { heading: "Strategic Financial Advisory", items: ["Growth strategy", "Risk management", "Investment guidance", "Performance metrics"] },
          { heading: "Accounting & Compliance", items: ["Accounting process management", "Regulatory compliance oversight", "Audit preparation", "Tax planning"] },
          { heading: "Reporting & Analysis", items: ["Monthly & quarterly reports", "Custom reporting", "Variance analysis", "Executive dashboards"] },
        ],
        benefits: ["Expert financial management without overhead", "Strategic alignment with business objectives", "Enhanced operational efficiency", "Regulatory compliance assurance"],
      },
      {
        slug: "cost-risk-assessment",
        icon: "cost",
        title: "Cost & Risk Assessment",
        summary: "Precise product/service costing paired with rigorous risk analysis, so pricing and investment decisions stand on solid ground.",
        groups: [
          { heading: "Cost Assessment", items: ["Direct costs (materials, labour, production)", "Indirect costs (overhead, admin)", "Cost allocation", "Cost control strategies"] },
          { heading: "Pricing Strategy", items: ["Market benchmarking", "Value-based pricing", "Cost-plus pricing", "Dynamic pricing"] },
          { heading: "Risk Assessment", items: ["Operational risk analysis", "Financial risk (currency, credit)", "Market risk (volatility, competition, demand)", "Regulatory compliance verification"] },
          { heading: "Profitability & Cost-Benefit Analysis", items: ["Break-even & margin analysis", "Scenario planning", "NPV calculations", "ROI assessment"] },
        ],
        benefits: ["Optimized pricing for profitability", "Identified cost reduction opportunities", "Minimized financial & operational risk", "Informed investment decisions"],
      },
    ],
  },
  {
    label: "Growth & Transactions",
    intro: "From first-time founders to full M&A transactions — evaluation, deal advisory and scaling support in one practice.",
    services: [
      {
        slug: "business-evaluation-support",
        icon: "evaluation",
        title: "Business Evaluation & Support Services",
        summary: "A full read on how your business performs today, and a structured plan for where it goes next.",
        groups: [
          { heading: "Business Evaluation", items: ["Financial statement & performance analysis", "Market trend & competitive positioning", "Operational efficiency assessments", "Business valuation"] },
          { heading: "Strategic Planning", items: ["Business plan development", "Growth & expansion identification", "Risk mitigation strategies", "KPI establishment"] },
          { heading: "Financial & Operational Support", items: ["Bookkeeping & cash flow management", "UAE tax planning", "Process improvement", "HR & recruitment"] },
          { heading: "Market Entry Services", items: ["Market dynamics research", "Local regulatory compliance", "Local partner sourcing", "Marketing & sales strategy"] },
        ],
        benefits: ["Clear performance visibility", "Structured growth pathways", "Regulatory compliance assurance", "Operational streamlining"],
      },
      {
        slug: "due-diligence-ma",
        icon: "diligence",
        title: "Due Diligence & M&A Advisory",
        summary: "Risk mitigated and value protected across the full transaction lifecycle — target identification through post-merger integration.",
        groups: [
          { heading: "Due Diligence", items: ["Financial due diligence (statements, cash flow, liabilities)", "Operational efficiency assessment", "Legal & compliance review", "Market position analysis"] },
          { heading: "M&A Advisory", items: ["Strategic planning", "Target identification", "Valuation analysis", "Deal negotiation support", "Tax-efficient structuring"] },
          { heading: "Post-Merger Integration", items: ["Integration planning & execution", "Change management", "Synergy identification", "Performance tracking"] },
          { heading: "Additional Services", items: ["Divestiture & spin-off advisory", "Joint venture structuring", "Strategic alliance facilitation"] },
        ],
        benefits: ["Risk mitigation through comprehensive analysis", "Optimized deal structures", "Seamless organizational transitions", "Synergy realization"],
      },
      {
        slug: "startup-advisory",
        icon: "startup",
        title: "Start-Up Advisory",
        summary: "End-to-end guidance for founders — business plan and funding through legal setup, operations and scaling.",
        groups: [
          { heading: "Business Plan & Funding", items: ["Market research & business model design", "Financial projections", "Investor presentations", "VC / angel investor connections"] },
          { heading: "Legal & Compliance", items: ["Company formation", "Licensing", "IP protection", "Regulatory adherence"] },
          { heading: "Operations & Marketing", items: ["Process setup & talent acquisition", "Technology implementation", "Brand development & digital presence", "Sales & customer strategy"] },
          { heading: "Growth & Scaling", items: ["Expansion identification", "Performance monitoring", "Risk mitigation", "Exit strategy development"] },
        ],
        benefits: ["Navigate the regulatory landscape efficiently", "Secure appropriate funding sources", "Strong operational foundation", "Ready for sustainable expansion"],
      },
    ],
  },
];

const ALL_SERVICES = CATEGORIES.flatMap((c) => c.services);

export default function ServicesPage() {
  const rootRef = useRef(null);
  const location = useLocation();
  const initialSlug = location.hash?.replace("#", "");
  const hasValidHash = ALL_SERVICES.some((s) => s.slug === initialSlug);
  const [activeSlug, setActiveSlug] = useState(ALL_SERVICES[0].slug);

  const jumpTo = (slug) => {
    const el = document.getElementById(slug);
    if (!el) return;
    const lenis = window.__lenis;
    if (lenis) lenis.scrollTo(el, { offset: -20 });
    else el.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!hasValidHash) window.scrollTo(0, 0);

    const smallScreen = window.matchMedia("(max-width: 900px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canPin = !smallScreen && !reduced;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".services-page-hero .split-line > span",
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
        ".services-page-hero .services-page-lede",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out", delay: 0.6 }
      );

      gsap.to(".services-page-hero-photo", {
        scale: 1.12,
        ease: "none",
        scrollTrigger: {
          trigger: ".services-page-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.to(".services-page-tower", {
        yPercent: 16,
        ease: "none",
        scrollTrigger: {
          trigger: ".services-page-hero",
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });

      gsap.utils.toArray(".sv-category").forEach((cat) => {
        gsap.fromTo(
          cat.querySelector(".sv-category-heading .split-line"),
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.9,
            stagger: 0.08,
            ease: "power3.out",
            scrollTrigger: { trigger: cat, start: "top 82%" },
          }
        );
      });

      gsap.utils.toArray(".sv-overview-card").forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 30, filter: "blur(6px)" },
          {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.8,
            delay: i * 0.06,
            ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 92%" },
          }
        );
      });

      // Each service card grows from a compact card to a fullscreen panel as
      // you scroll through it — same card-to-fullscreen mechanic as the
      // Marketing section — then releases into the next one.
      gsap.utils.toArray(".sv-pin-wrap").forEach((pinWrap) => {
        const panel = pinWrap.querySelector(".sv-panel");
        const head = panel.querySelector(".sv-panel-head");
        const body = panel.querySelector(".sv-panel-body");

        gsap.fromTo(
          head,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            ease: "power3.out",
            scrollTrigger: { trigger: pinWrap, start: "top 82%" },
          }
        );

        ScrollTrigger.create({
          trigger: pinWrap,
          start: "top center",
          end: "bottom center",
          onToggle: (self) => {
            if (self.isActive) setActiveSlug(panel.id);
          },
        });

        if (!canPin) return;

        const measure = () => {
          gsap.set(panel, { clearProps: "width,height" });
          const rect = panel.getBoundingClientRect();
          gsap.set(panel, { width: rect.width, height: rect.height, borderRadius: 28 });
        };
        measure();

        ScrollTrigger.create({
          trigger: pinWrap,
          start: "top top",
          end: "+=900",
          scrub: 1,
          pin: true,
          pinSpacing: true,
          invalidateOnRefresh: true,
          onRefreshInit: measure,
          animation: gsap
            .timeline()
            .to(
              panel,
              { width: () => window.innerWidth, height: () => window.innerHeight, borderRadius: 0, ease: "none" },
              0
            )
            .fromTo(body, { opacity: 0, y: 30 }, { opacity: 1, y: 0, ease: "none" }, 0.42),
        });
      });

      gsap.fromTo(
        ".services-cta-inner",
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: ".services-cta", start: "top 82%" },
        }
      );
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="services-page" ref={rootRef}>
      <section className="services-page-hero">
        <img src={dubaiDuskBurj} alt="" className="services-page-hero-photo" aria-hidden="true" />
        <img src={towerIsolated} alt="" className="services-page-tower" aria-hidden="true" />
        <div className="services-page-hero-overlay" />
        <div className="container services-page-hero-inner">
          <p className="eyebrow" style={{ color: "var(--blue-500)" }}>
            Services
          </p>
          <h1 className="services-page-title">
            <span className="split-line"><span>Nine disciplines.</span></span>
            <span className="split-line"><span>One standard of precision.</span></span>
          </h1>
          <p className="services-page-lede">
            From first registration to full transaction advisory, M2 covers every
            financial discipline a growing business in the UAE needs &mdash; led
            directly by senior advisors, not delegated down the chain.
          </p>
        </div>
      </section>

      <section className="section-pad sv-overview">
        <div className="container">
          <div className="section-head">
            <p className="eyebrow">All Services</p>
            <h2 className="services-title">Nine services, one click away.</h2>
            <p className="sv-overview-lede">
              Browse the full list now, or scroll on to see each in detail
              &mdash; jump straight to any of them at any time.
            </p>
          </div>

          <div className="sv-overview-grid">
            {ALL_SERVICES.map((s, i) => (
              <button className="sv-overview-card" key={s.slug} onClick={() => jumpTo(s.slug)}>
                <div className="sv-overview-top">
                  <span className="sv-overview-n">{String(i + 1).padStart(2, "0")}</span>
                  <svg className="sv-overview-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                    {ICONS[s.icon]}
                  </svg>
                </div>
                <h4>{s.title}</h4>
                <p>{s.summary}</p>
                <span className="sv-overview-arrow">
                  Jump to service <span className="btn-arrow">&#8599;</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <nav className="sv-railnav" aria-label="Jump to a service">
        <div className="sv-railnav-track">
          <div
            className="sv-railnav-fill"
            style={{
              height: `${(ALL_SERVICES.findIndex((s) => s.slug === activeSlug) / (ALL_SERVICES.length - 1)) * 100}%`,
            }}
          />
        </div>
        {ALL_SERVICES.map((s) => (
          <button
            key={s.slug}
            className={`sv-railnav-item ${activeSlug === s.slug ? "is-active" : ""}`}
            onClick={() => jumpTo(s.slug)}
          >
            <span className="sv-railnav-dot" />
            <span className="sv-railnav-label">{s.title}</span>
          </button>
        ))}
      </nav>

      {CATEGORIES.map((cat) => (
        <section className="sv-category" key={cat.label}>
          <div className="container sv-category-head-wrap">
            <div className="section-head sv-category-head">
              <div>
                <p className="eyebrow">{cat.label}</p>
                <h2 className="sv-category-heading">
                  <span className="split-line"><span>{cat.intro}</span></span>
                </h2>
              </div>
            </div>
          </div>

          {cat.services.map((s, i) => (
            <div className="sv-pin-wrap" key={s.slug}>
              <div className="sv-panel" id={s.slug}>
                <div className="sv-panel-head">
                  <span className="sv-panel-icon-wrap">
                    <svg className="sv-panel-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.4">
                      {ICONS[s.icon]}
                    </svg>
                  </span>
                  <div className="sv-panel-head-text">
                    <span className="sv-panel-n">{String(i + 1).padStart(2, "0")}</span>
                    <h3 className="sv-panel-title">{s.title}</h3>
                    <p className="sv-panel-summary">{s.summary}</p>
                  </div>
                </div>

                <div className="sv-panel-body">
                  <div className="sv-panel-groups">
                    {s.groups.map((g) => (
                      <div className="sv-panel-group" key={g.heading}>
                        <h4>{g.heading}</h4>
                        <ul>
                          {g.items.map((it) => (
                            <li key={it}>{it}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>

                  <div className="sv-panel-benefits">
                    <h4>Why it matters</h4>
                    <ul>
                      {s.benefits.map((b) => (
                        <li key={b}>{b}</li>
                      ))}
                    </ul>
                    <Link to="/#contact" className="btn btn-primary sv-panel-cta">
                      Discuss This Service
                      <span className="btn-arrow">&#8599;</span>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </section>
      ))}

      <section className="services-cta">
        <div className="container services-cta-inner">
          <h2>Not sure where to start?</h2>
          <p>
            Tell us where your business is today and where you want it to be
            &mdash; we&rsquo;ll map the right combination of services.
          </p>
          <Link to="/#contact" className="btn btn-light">
            Book a Consultation
            <span className="btn-arrow">&#8599;</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
