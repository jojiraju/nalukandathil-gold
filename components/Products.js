"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { site } from "@/lib/site";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { Lines, ease, spotMove } from "./fx";
import { describe, openDetail } from "./DetailModal";

const cats = ["All", ...Array.from(new Set(site.products.map((p) => p.category)))];

// Round thumbnail for each category (collection photo; Earrings and All use their own).
const thumbs = {
  All: { src: "/images/look-noir.png", pos: "36% 62%", zoom: 1.5 },
  Earrings: { src: "/site/gallery-2.webp", pos: "50% 70%", zoom: 1.2 },
};
function thumbFor(c) {
  if (thumbs[c]) return thumbs[c];
  const col = site.collections.find((x) => x.title === c);
  const prod = site.products.find((x) => x.category === c);
  const src = col?.image || prod?.image;
  return { src, pos: col?.focus || prod?.focus || "50% 50%", zoom: 1.15 };
}
const countOf = (c) => (c === "All" ? site.products.length : site.products.filter((p) => p.category === c).length);

// 3D tilt that follows the cursor (mouse only) + gold spotlight.
function Tilt({ children, onOpen }) {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 160, damping: 18 });
  const sry = useSpring(ry, { stiffness: 160, damping: 18 });

  const move = (e) => {
    if (e.pointerType !== "mouse") return;
    spotMove(e);
    const r = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - r.left) / r.width - 0.5) * 9);
    rx.set(-((e.clientY - r.top) / r.height - 0.5) * 9);
  };
  const leave = () => {
    rx.set(0);
    ry.set(0);
  };

  return (
    <motion.div
      ref={ref}
      className="pb-in spot"
      role="button"
      tabIndex={0}
      aria-label="View details"
      onClick={onOpen}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && (e.preventDefault(), onOpen())}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 1000 }}
      onPointerMove={move}
      onPointerLeave={leave}
    >
      {children}
    </motion.div>
  );
}

export default function Products() {
  const [cat, setCat] = useState("All");
  const shown = cat === "All" ? site.products : site.products.filter((p) => p.category === cat);

  // Clicking a collection tile pre-selects its category here.
  useEffect(() => {
    const onClick = (e) => {
      const a = e.target.closest?.("a[data-cat]");
      if (a) setCat(a.dataset.cat);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  const enquire = (p) =>
    `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(
      `Hello Nalukandathil, I would like to enquire about: ${p.name} (${p.purity}).`
    )}`;

  return (
    <section id="pieces" className="section pb">
      <div className="wrap">
        <div className="sec-head center">
          <p className="kicker">Selected pieces</p>
          <h2>
            <Lines lines={[<>The <em>edit</em></>]} />
          </h2>
          <Reveal as="p" className="sec-sub">
            Sample designs shown. Message us for current stock, weight and today’s rate.
          </Reveal>
        </div>

        <div className="pc-rail" role="tablist" aria-label="Filter by category">
          {cats.map((c) => {
            const t = thumbFor(c);
            const on = cat === c;
            return (
              <button key={c} role="tab" aria-selected={on} className={`pc-chip ${on ? "on" : ""}`} onClick={() => setCat(c)}>
                <span className="pc-ring">
                  {on && <motion.i layoutId="pc-ring" className="pc-ring-on" transition={{ duration: 0.55, ease }} />}
                  <span className="pc-img">
                    <Image
                      src={t.src}
                      alt=""
                      fill
                      sizes="100px"
                      style={{ objectFit: "cover", objectPosition: t.pos, transformOrigin: t.pos, transform: `scale(${t.zoom})` }}
                    />
                  </span>
                  <b className="pc-count">{countOf(c)}</b>
                </span>
                <span className="pc-label">{c}</span>
              </button>
            );
          })}
        </div>

        <p className="pc-status" aria-live="polite">
          Showing <strong>{shown.length}</strong> {shown.length === 1 ? "piece" : "pieces"}
          {cat === "All" ? "" : ` in ${cat}`}
        </p>

        <motion.div layout className={`pb-grid ${cat === "All" ? "bento" : ""}`}>
          <AnimatePresence mode="popLayout">
            {shown.map((p, i) => (
              <motion.article
                layout
                key={p.name}
                className="pb-card"
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "0px 0px -6% 0px" }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.7, ease, delay: (i % 4) * 0.07 }}
              >
                <Tilt
                  onOpen={() =>
                    openDetail({
                      title: p.name,
                      image: p.image,
                      focus: p.focus,
                      tag: p.category,
                      material: p.purity,
                      description: p.description || describe(p.category),
                      category: p.category,
                    })
                  }
                >
                  <Photo item={p} ratio="fill" sizes="(max-width: 700px) 100vw, 50vw" />
                  <span className="pb-cat">{p.category}</span>
                  <div className="pb-info">
                    <div>
                      <h3>{p.name}</h3>
                      <span>{p.purity}</span>
                    </div>
                    <a href={enquire(p)} target="_blank" rel="noopener noreferrer" className="pb-enq" aria-label={`Enquire about ${p.name}`} onClick={(e) => e.stopPropagation()}>
                      ↗
                    </a>
                  </div>
                </Tilt>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
