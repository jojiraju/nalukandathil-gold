import Image from "next/image";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { Magnetic } from "./fx";

const tel = `tel:${site.phone.replace(/\s/g, "")}`;

const Ig = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" /></svg>
);
const Wa = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm5.8 14.07c-.25.7-1.45 1.33-2 1.4-.52.07-1.17.1-1.9-.12a17 17 0 0 1-1.72-.64c-3.03-1.3-5-4.35-5.15-4.55-.15-.2-1.23-1.63-1.23-3.1 0-1.48.77-2.2 1.05-2.5.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.52.25.6.85 2.07.92 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.52-.15.15-.3.31-.13.6.18.3.78 1.28 1.68 2.07 1.15 1.03 2.12 1.35 2.42 1.5.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.18 1.42Z" /></svg>
);
const Ph = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
);
const Fb = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5H16.6V4.4C16.3 4.4 15.4 4.3 14.4 4.3c-2.2 0-3.7 1.3-3.7 3.8v2.4H8.2v3h2.5V21z" /></svg>
);

export default function Footer() {
  const s = site.showrooms[0];
  return (
    <footer className="footer">
      {/* Call-to-action band */}
      <div className="ft-cta">
        <div className="wrap ft-cta-in">
          <Reveal>
            <p className="kicker light">Visit Nalukandathil</p>
            <h2>
              Find the piece that tells <em>your story.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.1} className="ft-cta-actions">
            <Magnetic>
              <a href="#visit" className="btn gold">Book a visit</a>
            </Magnetic>
            <Magnetic>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="btn ghost">
                Chat on WhatsApp
              </a>
            </Magnetic>
          </Reveal>
        </div>
      </div>

      <div className="wrap ft-main">
        <Reveal className="ft-brand">
          <span className="ft-logo">
            <Image src="/logo.jpg" alt={site.fullName} width={150} height={150} />
          </span>
          <p>{site.tagline}</p>
          <div className="ft-social">
            <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><Ig /></a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><Wa /></a>
            <a href={tel} aria-label="Call us"><Ph /></a>
            <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><Fb /></a>
          </div>
        </Reveal>

        <Reveal delay={0.08} className="ft-col">
          <h4>Explore</h4>
          <a href="#collections">Collections</a>
          <a href="#pieces">Selected pieces</a>
          <a href="#story">Our story</a>
          <a href="#visit">Showroom &amp; contact</a>
        </Reveal>

        <Reveal delay={0.14} className="ft-col">
          <h4>Collections</h4>
          {site.collections.map((c) => (
            <a key={c.title} href="#pieces" data-cat={c.title}>
              {c.title}
            </a>
          ))}
        </Reveal>

        <Reveal delay={0.2} className="ft-col ft-visit">
          <h4>Visit us</h4>
          <p>{s.address}</p>
          <p>{s.hours}</p>
          <a href={tel}>{site.phone}</a>
          {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
          <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="ft-link">Get directions →</a>
        </Reveal>
      </div>

      <div className="ft-bar">
        <div className="wrap ft-bar-in">
          <span>© {new Date().getFullYear()} {site.fullName}. All rights reserved.</span>
          <span className="ft-badges">BIS hallmarked <i>◆</i> Since {site.since} <i>◆</i> Edakkara, Keralam</span>
          <a href="#top" className="ft-top" aria-label="Back to top">↑</a>
        </div>
      </div>
    </footer>
  );
}
