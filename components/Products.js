"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useMotionValue, useSpring } from "framer-motion";
import { site } from "@/lib/site";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { Lines, ease, spotMove } from "./fx";

const cats = ["All", ...Array.from(new Set(site.products.map((p) => p.category)))];

// 3D tilt that follows the cursor (mouse only) + gold spotlight.
function Tilt({ children }) {
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
        <div className="pb-head">
          <div>
            <p className="kicker">Selected pieces</p>
            <h2>
              <Lines lines={[<>The <em>edit</em></>]} />
            </h2>
            <Reveal as="p" className="sec-sub left">
              Sample designs shown. Message us for current stock, weight and today’s rate.
            </Reveal>
          </div>

          <div className="pb-seg" role="tablist">
            {cats.map((c) => (
              <button key={c} role="tab" aria-selected={cat === c} className={cat === c ? "on" : ""} onClick={() => setCat(c)}>
                {cat === c && <motion.i layoutId="seg-pill" className="seg-pill" transition={{ duration: 0.5, ease }} />}
                <span>{c}</span>
              </button>
            ))}
          </div>
        </div>

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
                <Tilt>
                  <Photo item={p} ratio="fill" sizes="(max-width: 700px) 100vw, 50vw" />
                  <span className="pb-cat">{p.category}</span>
                  <div className="pb-info">
                    <div>
                      <h3>{p.name}</h3>
                      <span>{p.purity}</span>
                    </div>
                    <a href={enquire(p)} target="_blank" rel="noopener noreferrer" className="pb-enq" aria-label={`Enquire about ${p.name}`}>
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
