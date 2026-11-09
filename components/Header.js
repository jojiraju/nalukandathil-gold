"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { site } from "@/lib/site";
import { ease } from "./fx";

const links = [
  { href: "#collections", label: "Collections" },
  { href: "#rate", label: "Gold Rate" },
  { href: "#pieces", label: "Pieces" },
  { href: "#story", label: "Our Story" },
  { href: "#visit", label: "Showroom" },
];

const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
);
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm5.8 14.07c-.25.7-1.45 1.33-2 1.4-.52.07-1.17.1-1.9-.12a17 17 0 0 1-1.72-.64c-3.03-1.3-5-4.35-5.15-4.55-.15-.2-1.23-1.63-1.23-3.1 0-1.48.77-2.2 1.05-2.5.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.52.25.6.85 2.07.92 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.52-.15.15-.3.31-.13.6.18.3.78 1.28 1.68 2.07 1.15 1.03 2.12 1.35 2.42 1.5.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.18 1.42Z" /></svg>
);
const IgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.3" cy="6.7" r="1" fill="currentColor" /></svg>
);

const FbIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5H16l.5-3h-3V8.6c0-.9.3-1.5 1.6-1.5H16.6V4.4C16.3 4.4 15.4 4.3 14.4 4.3c-2.2 0-3.7 1.3-3.7 3.8v2.4H8.2v3h2.5V21z" /></svg>
);

export default function Header() {
  const [open, setOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [solid, setSolid] = useState(false);
  const [active, setActive] = useState("");
  const last = useRef(0);
  const close = () => setOpen(false);
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;

  // Hide on scroll down, reveal on scroll up; become solid after leaving the banner top.
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setSolid(y > 10);
      setHidden(y > last.current && y > 260);
      last.current = y;
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Highlight the nav link of the section currently in view.
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" }
    );
    links.forEach((l) => {
      const el = document.getElementById(l.href.slice(1));
      if (el) obs.observe(el);
    });
    const top = document.getElementById("top");
    if (top) {
      const t = new IntersectionObserver(([e]) => e.isIntersecting && setActive(""), { rootMargin: "-45% 0px -50% 0px" });
      t.observe(top);
      return () => { obs.disconnect(); t.disconnect(); };
    }
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("lenis-stopped", open);
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (l) => active === l.href.slice(1);

  return (
    <motion.header
      className={`header ${hidden && !open ? "hide" : ""} ${solid ? "solid" : ""} ${open ? "menu-open" : ""}`}
      initial={{ y: -120, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease, delay: 0.2 }}
    >
      {/* Announcement bar */}
      <div className="bar">
        <div className="wrap bar-in">
          <span className="bar-l"><i>◆</i> BIS hallmarked · Trusted since {site.since}</span>
          <span className="bar-r">
            <span className="bar-hours">{site.showrooms[0].hours}</span>
            <a href={tel}>{site.phone}</a>
            <a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
          </span>
        </div>
      </div>

      <div className="wrap nav">
        <nav className="nav-side left" aria-label="Primary">
          {links.slice(0, 4).map((l) => (
            <a key={l.label} href={l.href} className={isActive(l) ? "active" : ""}>
              {l.label}
            </a>
          ))}
        </nav>

        <a href="#top" className="logo" aria-label={`${site.fullName} – home`} onClick={close}>
          <span className="logo-frame">
            <Image src="/logo.jpg" alt={site.fullName} width={150} height={150} priority />
          </span>
        </a>

        <nav className="nav-side right" aria-label="Secondary">
          <a href={tel} className="nav-phone"><PhoneIcon />{site.phone}</a>
          <a
            href={`https://wa.me/${site.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="wa-btn"
            aria-label="Chat on WhatsApp"
          >
            <WaIcon />
          </a>
          <a href="#visit" className="nav-btn">
            Book a visit <span aria-hidden>→</span>
          </a>
        </nav>

        <button className={`burger ${open ? "open" : ""}`} aria-label="Menu" aria-expanded={open} onClick={() => setOpen((v) => !v)}>
          <span />
          <span />
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.7, ease }}
            data-lenis-prevent
          >
            <nav>
              {links.map((l, i) => (
                <div key={l.label} className="mm-row">
                  <motion.a
                    href={l.href}
                    onClick={close}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    exit={{ y: "110%" }}
                    transition={{ duration: 0.8, ease, delay: 0.25 + i * 0.07 }}
                  >
                    <sup>0{i + 1}</sup>
                    {l.label}
                  </motion.a>
                </div>
              ))}
            </nav>

            <motion.div
              className="mm-foot"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0, transition: { delay: 0.7, duration: 0.7, ease } }}
              exit={{ opacity: 0 }}
            >
              <div>
                <small>Showroom</small>
                <p>{site.showrooms[0].address}</p>
                <p>{site.showrooms[0].hours}</p>
              </div>
              <div>
                <small>Contact</small>
                <a href={tel}>{site.phone}</a>
                {site.email && <a href={`mailto:${site.email}`}>{site.email}</a>}
              </div>
              <div className="mm-social">
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp"><WaIcon /></a>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram"><IgIcon /></a>
                <a href={site.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook"><FbIcon /></a>
                <a href={tel} aria-label="Call"><PhoneIcon /></a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
