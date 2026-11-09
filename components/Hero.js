"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Lines, Magnetic, ease } from "./fx";
import { site } from "@/lib/site";

const up = (delay) => ({
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease, delay },
});

const pop = (delay) => ({
  initial: { opacity: 0, scale: 0.85, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0 },
  transition: { duration: 0.9, ease, delay },
});

export default function Hero() {
  const years = new Date().getFullYear() - site.since;
  const looks = site.looks;
  const n = looks.length;
  const [i, setI] = useState(0);

  // Autoplay; restarts whenever the slide changes (so manual picks get a full interval).
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const t = setTimeout(() => setI((v) => (v + 1) % n), 6500);
    return () => clearTimeout(t);
  }, [i, n]);

  // Cursor-driven depth: the arch, cards and badge drift at different rates.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18 });
  const sy = useSpring(my, { stiffness: 60, damping: 18 });
  const archX = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const archY = useTransform(sy, [-0.5, 0.5], [8, -8]);
  const cardX = useTransform(sx, [-0.5, 0.5], [-26, 26]);
  const cardY = useTransform(sy, [-0.5, 0.5], [-18, 18]);

  const onMove = (e) => {
    if (e.pointerType === "touch") return;
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  };

  return (
    <section id="top" className="hero" onPointerMove={onMove}>
      {/* Ambient background: the active photo, blurred, so the whole banner takes on its colours */}
      <div className="hero-bg" aria-hidden>
        {looks.map((l, k) => (
          <Image key={l.src} src={l.src} alt="" fill sizes="100vw" className={k === i ? "on" : ""} priority={k === 0} />
        ))}
      </div>

      <div className="wrap hero-grid">
        <div className="hero-copy">
          <motion.p className="kicker light" {...up(0.5)}>
            Gold &amp; Diamonds · Since {site.since}
          </motion.p>
          <h1>
            <Lines load delay={0.6} lines={["Make every moment", <em key="e">a timeless memory.</em>]} />
          </h1>
          <motion.p className="hero-lead" {...up(1.1)}>
            Gold and diamond rings, necklaces, chains, bracelets, anklets and lockets — honestly priced and made
            to be treasured, from our showroom on CNG Road, Edakkara.
          </motion.p>
          <motion.div className="hero-actions" {...up(1.25)}>
            <Magnetic>
              <a href="#collections" className="btn gold">Explore collections</a>
            </Magnetic>
            <Magnetic>
              <a href="#visit" className="btn ghost">Visit showroom</a>
            </Magnetic>
          </motion.div>

          <motion.ul className="hero-facts" {...up(1.45)}>
            <li><strong>{years}+</strong><span>Years of trust</span></li>
            <li><strong>BIS</strong><span>Hallmarked gold</span></li>
            <li><strong>{site.stats.googleRating}★</strong><span>{site.stats.googleReviews} Google reviews</span></li>
          </motion.ul>
        </div>

        <div className="hero-visual">
          <motion.div className="arch-wrap" style={{ x: archX, y: archY }}>
            <div className="stage">
            <motion.div
              className="arch"
              initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
              animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
              transition={{ duration: 1.6, ease, delay: 0.35 }}
            >
              {looks.map((l, k) => (
                <Image
                  key={l.src}
                  src={l.src}
                  alt={l.title}
                  fill
                  priority={k === 0}
                  sizes="(max-width: 960px) 90vw, 480px"
                  className={k === i ? "on" : ""}
                />
              ))}
            </motion.div>

            {/* Rotating badge */}
            <motion.div className="badge" style={{ x: cardX, y: cardY }} {...pop(1.5)} aria-hidden>
              <svg viewBox="0 0 120 120">
                <defs>
                  <path id="badge-circle" d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
                </defs>
                <text>
                  <textPath href="#badge-circle">Since {site.since} · Edakkara · Gold ·</textPath>
                </text>
              </svg>
              <span>◆</span>
            </motion.div>

            {/* Glass card: current campaign */}
            <motion.div className="float glass-card" style={{ x: cardX, y: cardY }} {...pop(1.7)}>
              <div className="float-in">
                <small>Latest campaign · {String(i + 1).padStart(2, "0")}/{String(n).padStart(2, "0")}</small>
                <strong key={i} className="cap-title">{looks[i].title}</strong>
                <span className="prog"><i key={i} /></span>
              </div>
            </motion.div>

            {/* Rating card */}
            <motion.div className="float rate-card" style={{ x: cardX, y: cardY }} {...pop(1.9)}>
              <div className="float-in slow">
                <strong>{site.stats.googleRating}<em>★</em></strong>
                <small>{site.stats.googleReviews} Google reviews</small>
              </div>
            </motion.div>

            </div>

            {/* Thumbnails */}
            <motion.div className="thumbs" {...up(1.8)}>
              {looks.map((l, k) => (
                <button key={l.src} className={k === i ? "on" : ""} aria-label={l.title} onClick={() => setI(k)}>
                  <Image src={l.src} alt="" fill sizes="72px" style={{ objectFit: "cover", objectPosition: "34% 56%" }} />
                </button>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>

      <motion.a href="#collections" className="scroll-cue" aria-label="Scroll to collections" {...up(2)}>
        <span>Scroll</span>
        <i />
      </motion.a>
    </section>
  );
}
