"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring, useMotionValueEvent } from "framer-motion";
import { site } from "@/lib/site";
import Photo from "./Photo";
import { Lines, spotMove, useDesktop } from "./fx";
import { openDetail } from "./DetailModal";

function Card({ c, i, n }) {
  return (
    <div
      role="button"
      tabIndex={0}
      className="cx-card spot"
      onPointerMove={spotMove}
      onClick={() => openDetail({ title: c.title, image: c.image, focus: c.focus, tag: c.tag, description: c.description || c.blurb, category: c.title, showAll: true })}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), e.currentTarget.click())}
    >
      <Photo item={{ ...c, name: c.title }} ratio="fill" sizes="(max-width: 700px) 80vw, 460px" />
      <span className="cx-tag">{c.tag}</span>
      <span className="cx-num">0{i + 1}<small> / 0{n}</small></span>
      <div className="cx-text">
        <h3>{c.title}</h3>
        <p>{c.blurb}</p>
        <span className="cx-go">Explore <i>→</i></span>
      </div>
    </div>
  );
}

function More({ more }) {
  return (
    <div className="cx-card cx-more">
      <p className="kicker light">Also explore</p>
      {more.map((c) => (
        <a key={c.title} href="#visit">
          <span>{c.title}</span>
          <small>{c.blurb}</small>
          <i aria-hidden>→</i>
        </a>
      ))}
    </div>
  );
}

export default function Collections() {
  const featured = site.collections.filter((c) => c.image);
  const more = site.collections.filter((c) => !c.image);
  const n = featured.length;

  const desktop = useDesktop();
  const sectionRef = useRef(null);
  const trackRef = useRef(null);
  const [dist, setDist] = useState(0);
  const distRef = useRef(0);
  const [idx, setIdx] = useState(0);

  // Horizontal distance the track must travel while the section is pinned.
  useEffect(() => {
    if (!desktop) return;
    const measure = () => {
      const t = trackRef.current;
      if (!t || !t.lastElementChild) return;
      const last = t.lastElementChild;
      const vw = document.documentElement.clientWidth;
      const pad = parseFloat(getComputedStyle(t).paddingLeft) || 0;
      // Travel until the last card's right edge (plus the same side padding) is inside the viewport.
      const d = Math.max(0, last.offsetLeft + last.offsetWidth + pad - vw);
      distRef.current = d;
      setDist(d);
    };
    measure();
    const ro = new ResizeObserver(measure);
    if (trackRef.current) {
      ro.observe(trackRef.current);
      [...trackRef.current.children].forEach((c) => ro.observe(c));
    }
    window.addEventListener("resize", measure);
    window.addEventListener("load", measure);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", measure);
      window.removeEventListener("load", measure);
    };
  }, [desktop]);

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ["start start", "end end"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.4 });
  // Function form reads the live distance (a fixed output range would keep the first, stale measurement).
  const x = useTransform(smooth, (v) => -v * distRef.current);
  useMotionValueEvent(scrollYProgress, "change", (v) => setIdx(Math.min(n - 1, Math.round(v * n * 0.9))));

  const head = (
    <div className="wrap cx-head">
      <div>
        <p className="kicker light">The Collections</p>
        <h2>
          <Lines lines={["Crafted for", <em key="e">every occasion</em>]} />
        </h2>
      </div>
      {desktop && (
        <div className="cx-count">
          <strong>0{idx + 1}</strong>
          <span>/ 0{n}</span>
        </div>
      )}
    </div>
  );

  // One <section> (with the tracking ref) in both layouts, so the scroll tracker attaches on first render.
  return (
    <section id="collections" className={`cx ${desktop ? "" : "cx-mobile"}`} ref={sectionRef}>
      {desktop ? (
        <div className="cx-pin" style={{ height: `calc(100svh + ${Math.round(dist * 2.4)}px)` }}>
          <div className="cx-sticky">
            {head}
            <motion.div className="cx-track" ref={trackRef} style={{ x }}>
              {featured.map((c, i) => (
                <Card key={c.title} c={c} i={i} n={n} />
              ))}
              {more.length > 0 && <More more={more} />}
            </motion.div>
            <div className="wrap">
              <div className="cx-progress">
                <motion.i style={{ scaleX: smooth }} />
              </div>
            </div>
          </div>
        </div>
      ) : (
        <>
          {head}
          <div className="cx-swipe" data-lenis-prevent>
            {featured.map((c, i) => (
              <Card key={c.title} c={c} i={i} n={n} />
            ))}
            {more.length > 0 && <More more={more} />}
          </div>
          <p className="cx-hint">Swipe →</p>
        </>
      )}
    </section>
  );
}
