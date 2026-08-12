import abudhabiDusk from "../assets/abudhabi-dusk.webp";
import dubaiHighway from "../assets/dubai-highway.webp";
import dubaiDuskBurj from "../assets/dubai-dusk-burj.webp";

export const CATEGORIES = ["All", "Business Setup", "Tax & Compliance", "Financial Advisory", "M&A"];

// Placeholder editorial content — real topics for M2's service lines, but
// the articles themselves need to be written/reviewed before this goes live.
export const POSTS = [
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
    body: [
      {
        heading: "The decision isn't as simple as it used to be",
        paragraphs: [
          "For years, the mainland-versus-free-zone question came down almost entirely to ownership: mainland companies required a local partner, free zones didn't. Reforms allowing 100% foreign ownership on the mainland for most commercial activities changed that calculus — the decision now hinges on market access, licensing scope and long-term cost, not just who holds the shares.",
          "That means the right answer depends on where your customers are, whether you need to trade directly within the UAE market, and how your business is likely to grow over the next three to five years — not just what's cheapest to set up today.",
        ],
      },
      {
        heading: "What free zones still do better",
        paragraphs: [
          "Free zones remain the faster, more predictable route for businesses whose customers and suppliers sit outside the UAE, or who want a streamlined visa and licensing process without navigating mainland municipal requirements. Sector-specific free zones can also offer infrastructure and licensing tailored to specific industries.",
          "The trade-off is market access: most free zone entities cannot trade directly with the UAE mainland market without an additional distributor or a mainland branch, which adds a layer of structuring to plan for upfront rather than after the fact.",
        ],
      },
      {
        heading: "Where mainland structures win",
        paragraphs: [
          "If direct access to the UAE domestic market, government contracts, or a broader range of commercial activities matters to your business, a mainland license is usually the better foundation — even with the additional compliance overhead it carries.",
          "The right move for many growing businesses is to model both structures against a realistic three-year plan, not just first-year setup cost. That's the review we run with every new client before recommending a jurisdiction.",
        ],
      },
    ],
  },
  {
    slug: "uae-corporate-tax-sme-guide",
    category: "Tax & Compliance",
    icon: "compliance",
    title: "UAE Corporate Tax: What Every SME Needs to Know",
    excerpt: "A practical breakdown of thresholds, exemptions and filing obligations for small and mid-sized businesses operating in the UAE.",
    date: "Dec 2025",
    readTime: "8 min read",
    photo: abudhabiDusk,
    body: [
      {
        heading: "Who actually needs to register",
        paragraphs: [
          "Corporate tax registration in the UAE applies broadly across mainland and free zone entities, with registration required even where a business ultimately owes no tax. Missing the registration window is one of the most common — and most avoidable — compliance failures we see among growing SMEs.",
          "Free zone entities that qualify for preferential treatment still need to actively maintain that status through their activities and record-keeping; it isn't automatic simply by virtue of the license type.",
        ],
      },
      {
        heading: "Getting the basics of taxable income right",
        paragraphs: [
          "Most compliance issues we encounter aren't disputes over the rate itself — they're gaps in how taxable income is calculated: related-party transactions priced inconsistently, expenses that aren't properly substantiated, or accounting periods that don't line up with the entity's actual financial year.",
          "Clean, audit-ready bookkeeping from day one is the single biggest lever an SME has over its corporate tax exposure. Retrofitting records after the fact is always more expensive than doing it properly the first time.",
        ],
      },
      {
        heading: "Building a filing calendar you can actually keep",
        paragraphs: [
          "Registration, provisional obligations, and annual filing all sit on different clocks. The businesses that stay penalty-free are the ones that build a compliance calendar early and treat it the same way they treat payroll — non-negotiable, not best-effort.",
          "If you're not sure where your business currently stands, that's the first thing an advisor should help you establish — not the filing itself.",
        ],
      },
    ],
  },
  {
    slug: "when-to-hire-a-virtual-cfo",
    category: "Financial Advisory",
    icon: "vcfo",
    title: "When Does a Growing Business Need a Virtual CFO?",
    excerpt: "The signs that your finance function has outgrown a bookkeeper — and what institutional-grade oversight actually looks like.",
    date: "Dec 2025",
    readTime: "5 min read",
    photo: dubaiDuskBurj,
    body: [
      {
        heading: "The gap between bookkeeping and financial strategy",
        paragraphs: [
          "A bookkeeper keeps your records accurate. A CFO tells you what those records mean for your next decision — whether you can afford to hire, when cash flow will get tight, and which of two growth paths is actually financeable. Most businesses feel that gap long before they act on it.",
          "The most common trigger isn't revenue size — it's complexity: multiple entities, a first fundraise, a new market, or a board that suddenly wants monthly reporting instead of a year-end summary.",
        ],
      },
      {
        heading: "What a virtual CFO desk actually replaces",
        paragraphs: [
          "A virtual CFO engagement isn't a part-time bookkeeper with a bigger title — it's investment-bank-grade financial planning, forecasting, and board-level reporting, delivered without the cost of a full-time executive hire.",
          "For most growing businesses, that means monthly management accounts that actually inform decisions, cash flow modelling that flags problems months in advance, and a second set of eyes on every material financial decision.",
        ],
      },
      {
        heading: "How to know you're ready",
        paragraphs: [
          "If you're making six-figure decisions on gut feel rather than a model, if your accountant can't answer strategic questions, or if investors are asking for reporting you don't yet produce — those are the signals. Waiting until a fundraise or audit forces the issue is the expensive way to find out.",
        ],
      },
    ],
  },
  {
    slug: "due-diligence-red-flags",
    category: "M&A",
    icon: "diligence",
    title: "Due Diligence Red Flags Every Acquirer Should Watch For",
    excerpt: "The liabilities and disclosures that most often get missed in a rushed deal — and how a structured diligence process catches them.",
    date: "Nov 2025",
    readTime: "7 min read",
    photo: abudhabiDusk,
    body: [
      {
        heading: "The liabilities that hide in plain sight",
        paragraphs: [
          "The costliest diligence failures are rarely dramatic fraud — they're mundane: unreconciled related-party balances, contracts with change-of-control clauses nobody flagged, or tax positions that were aggressive but never challenged. Each one is individually small; together they can materially change what a business is worth.",
          "A rushed diligence process, run against a tight deal timeline, is exactly when these get missed — which is why the businesses with the most disciplined diligence process are usually the ones that pay the right price, not the lowest one.",
        ],
      },
      {
        heading: "Where to look harder than the data room suggests",
        paragraphs: [
          "Financial statements tell you what happened; they rarely tell you why. Customer concentration, key-person dependency, and informal arrangements that were never put in writing are the areas where a structured diligence process earns its cost — because they're the areas a seller has the least incentive to surface unprompted.",
        ],
      },
      {
        heading: "Turning findings into deal terms",
        paragraphs: [
          "Good diligence doesn't just produce a report — it produces negotiating leverage: price adjustments, escrow terms, or specific warranties that protect the buyer against what was found. That's the step that turns diligence from a compliance exercise into value protection.",
        ],
      },
    ],
  },
  {
    slug: "country-by-country-reporting-deadlines",
    category: "Tax & Compliance",
    icon: "cbcr",
    title: "Country-by-Country Reporting: Are You Ready for the Deadlines?",
    excerpt: "A checklist for multinational groups on scope, thresholds and what jurisdiction-by-jurisdiction disclosure actually requires.",
    date: "Nov 2025",
    readTime: "6 min read",
    photo: dubaiHighway,
    body: [
      {
        heading: "Why this catches groups off guard",
        paragraphs: [
          "Country-by-Country Reporting exists to give tax authorities a jurisdiction-by-jurisdiction picture of a multinational group's revenue, profit and tax paid — and the obligation to file often lands on a group's UAE entity even when the ultimate parent sits elsewhere, depending on the group's reporting structure.",
          "Groups that treat it as a local filing, rather than a group-wide reporting exercise, are the ones most likely to miss a deadline or file inconsistent numbers across jurisdictions.",
        ],
      },
      {
        heading: "What the disclosure actually requires",
        paragraphs: [
          "Beyond revenue and profit, the report expects consistent figures for tax accrued and paid, headcount, and stated business activity in every jurisdiction the group operates in — reconciled against the group's consolidated accounts, not estimated separately by each local team.",
        ],
      },
      {
        heading: "Building the process once, not every year",
        paragraphs: [
          "The groups that find this straightforward are the ones who built a repeatable data-collection process the first year, rather than reassembling it from scratch each filing cycle. That's usually the difference between a routine annual task and a last-minute scramble.",
        ],
      },
    ],
  },
  {
    slug: "debt-vs-equity-structuring",
    category: "Financial Advisory",
    icon: "structuring",
    title: "Debt vs Equity: Structuring Capital for Sustainable Growth",
    excerpt: "Why the right financing mix depends less on cost of capital and more on how much control you're willing to give up.",
    date: "Oct 2025",
    readTime: "6 min read",
    photo: dubaiDuskBurj,
    body: [
      {
        heading: "The real trade-off isn't cost",
        paragraphs: [
          "Founders often approach the debt-versus-equity question as a pricing exercise — which is cheaper. In practice, the more important question is control: debt has to be repaid on schedule regardless of performance, while equity dilutes ownership but doesn't demand fixed repayment when things slow down.",
          "The right mix depends on how predictable your cash flow is, not just how much capital you need. A business with steady, contracted revenue can carry more debt safely than one with lumpy, unpredictable income — even at identical revenue size.",
        ],
      },
      {
        heading: "Where hybrid structures earn their complexity",
        paragraphs: [
          "Mezzanine financing, convertible instruments and preferred equity exist precisely because pure debt and pure equity don't fit every situation. They add structuring complexity, but done well, they let a business raise growth capital without forcing an early, unfavourable valuation of the whole company.",
        ],
      },
      {
        heading: "Modelling before you raise",
        paragraphs: [
          "The businesses that end up with capital structures they regret are almost always the ones that took whatever was offered first, rather than modelling two or three structures against their actual growth plan before approaching lenders or investors.",
        ],
      },
    ],
  },
  {
    slug: "startup-scaling-signals",
    category: "Business Setup",
    icon: "startup",
    title: "5 Signs Your Start-Up Needs Advisory Support Before Scaling",
    excerpt: "Growth exposes gaps fast. Here's what to have in place before headcount or revenue doubles.",
    date: "Oct 2025",
    readTime: "5 min read",
    photo: dubaiHighway,
    body: [
      {
        heading: "1. Your finance function is still one person's side project",
        paragraphs: [
          "If financial reporting, cash flow tracking and compliance all run through one founder's spare hours, that's fine at ten people. At fifty, it's the single most common cause of a scaling business losing control of its own numbers.",
        ],
      },
      {
        heading: "2. You've never modelled what doubling actually costs",
        paragraphs: [
          "Revenue doubling and cost doubling rarely happen on the same timeline. Businesses that scale without modelling the cash gap between hiring ahead of revenue and revenue actually landing are the ones that run into working-capital crises mid-growth.",
        ],
      },
      {
        heading: "3. Your legal structure was built for a team of five",
        paragraphs: [
          "Contracts, IP ownership and entity structure that were fine for an early-stage team often don't hold up under investor or acquirer scrutiny once the business is bigger. It's cheaper to fix this before diligence than during it.",
        ],
      },
      {
        heading: "4 & 5. No board-ready reporting, no one owns compliance",
        paragraphs: [
          "If you couldn't produce a clean set of management accounts for an investor tomorrow, or if no single person is accountable for regulatory deadlines, those gaps compound quietly until they become urgent. Advisory support at this stage isn't about outsourcing control — it's about making sure growth doesn't outpace the systems that support it.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug) {
  return POSTS.find((p) => p.slug === slug);
}

export function getRelatedPosts(post, limit = 3) {
  return POSTS.filter((p) => p.slug !== post.slug && p.category === post.category)
    .concat(POSTS.filter((p) => p.slug !== post.slug && p.category !== post.category))
    .slice(0, limit);
}
