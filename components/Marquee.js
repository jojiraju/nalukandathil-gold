const words = ["Rings", "Necklaces", "Chains", "Bracelets", "Anklets", "Lockets", "Gold & Diamonds", "Since 1979"];

// Two endless bands moving in opposite directions (pure CSS, pause on hover).
export default function Marquee() {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div className="marquee" aria-label="Our collections">
      <div className="marquee-track" aria-hidden>
        {row.map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
      <div className="marquee-track rev" aria-hidden>
        {[...row].reverse().map((w, i) => (
          <span key={i}>{w}</span>
        ))}
      </div>
    </div>
  );
}
