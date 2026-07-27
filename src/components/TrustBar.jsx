import "./TrustBar.css";

const LOGOS = [
  "Meridian Holdings",
  "Falcon Capital Group",
  "Al Warqa Industries",
  "Northbridge Partners",
  "Zenith Real Estate",
  "Crestline Ventures",
  "Orion Trading Co.",
  "Sapphire Logistics",
];

export default function TrustBar() {
  const items = [...LOGOS, ...LOGOS];
  return (
    <section className="trust-bar" aria-label="Trusted by">
      <div className="container trust-bar-label">
        <p className="eyebrow">Trusted across sectors</p>
      </div>
      <div className="marquee">
        <div className="marquee-track">
          {items.map((name, i) => (
            <span className="marquee-item" key={i}>
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
