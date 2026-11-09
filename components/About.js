"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { Counter, Magnetic } from "./fx";

// Each word lights up as you scroll through the statement.
function Word({ children, range, progress }) {
  const opacity = useTransform(progress, range, [0.16, 1]);
  return (
    <motion.span className="st-w" style={{ opacity }}>
      {children}
    </motion.span>
  );
}

export default function About() {
  const years = new Date().getFullYear() - site.since;
  const text = `Since ${site.since} we have made one promise: honest gold, fair prices and a welcome for every family. Every piece is a moment — a wedding, a birth, a festival, a quiet gift — turned into a timeless memory.`;
  const words = text.split(" ");

  const stmt = useRef(null);
  const { scrollYProgress } = useScroll({ target: stmt, offset: ["start 0.85", "end 0.55"] });

  const vis = useRef(null);
  const { scrollYProgress: vp } = useScroll({ target: vis, offset: ["start end", "end start"] });
  const y = useTransform(vp, [0, 1], ["-9%", "9%"]);

  return (
    <section id="story" className="st">
      <div className="wrap">
        <div className="st-statement" ref={stmt}>
          <p className="kicker light">Our story</p>
          <p className="st-big">
            {words.map((w, i) => {
              const s = i / words.length;
              return (
                <Word key={i} range={[s * 0.92, s * 0.92 + 0.1]} progress={scrollYProgress}>
                  {w}
                </Word>
              );
            })}
          </p>
        </div>

        <div className="st-bottom">
          <div className="st-visual" ref={vis}>
            <div className="st-arch">
              <motion.div className="st-par" style={{ y }}>
                <Image
                  src="/images/look-emerald.png"
                  alt={`${site.fullName} jewellery`}
                  fill
                  sizes="(max-width: 960px) 90vw, 440px"
                  style={{ objectFit: "cover", objectPosition: "36% 60%", transform: "scale(1.3)", transformOrigin: "35% 85%" }}
                />
              </motion.div>
            </div>
          </div>

          <div className="st-side">
            <Reveal as="p" className="st-copy">
              Nalukandathil began as a family jeweller in Edakkara. Our eight-petal emblem stands for the many moments a
              piece of jewellery can hold — and for the {years} years of trust we have been privileged to earn.
            </Reveal>

            <Reveal className="st-stats" delay={0.1}>
              <div>
                <strong><Counter to={years} suffix="+" /></strong>
                <span>Years of trust</span>
              </div>
              <div>
                <strong><Counter to={parseInt(site.stats.instagramFollowers.replace(/,/g, ""), 10)} /></strong>
                <span>Instagram family</span>
              </div>
              <div>
                <strong><Counter to={parseFloat(site.stats.googleRating)} decimals={1} suffix="★" /></strong>
                <span>{site.stats.googleReviews} Google reviews</span>
              </div>
            </Reveal>

            <Reveal delay={0.2}>
              <Magnetic>
                <a href="#visit" className="btn gold">Talk to us</a>
              </Magnetic>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
