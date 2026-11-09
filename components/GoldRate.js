"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { Lines, Magnetic } from "./fx";

const fmt = (n) => "₹ " + Number(n).toLocaleString("en-IN");

export default function GoldRate() {
  // Start from the last known rate so the section never shows empty, then refresh from the live source.
  const [r, setR] = useState({ ...site.goldRate, live: false });

  useEffect(() => {
    let off = false;
    fetch("/api/gold-rate")
      .then((x) => (x.ok ? x.json() : Promise.reject()))
      .then((d) => !off && d.live && setR(d))
      .catch(() => {});
    return () => {
      off = true;
    };
  }, []);

  const arrow = r.dir === "up" ? "↑" : r.dir === "down" ? "↓" : "•";
  const msg = "Hello Nalukandathil, I would like to know today's gold rate.";

  return (
    <section id="rate" className="section gr">
      <div className="wrap">
        <div className="sec-head center">
          <p className="kicker">Gold rate</p>
          <h2>
            <Lines lines={["Today’s", <em key="e">gold rate</em>]} />
          </h2>
          <Reveal as="p" className="sec-sub">
            <span className={`gr-live ${r.live ? "on" : ""}`}><i /> {r.live ? "Live updated rate" : "Last known rate"}</span>
          </Reveal>
        </div>

        <Reveal className="gr-card">
          <div className="gr-cell">
            <small>1 Gram</small>
            <strong>{fmt(r.gram)}</strong>
          </div>
          <div className="gr-mid">
            <span className={`gr-chg ${r.dir}`}>
              <b>{arrow}</b> {(r.change || "Rate unchanged").replace(/^[\u2191\u2193\u25b2\u25bc\u2022\s]+/, "")}
            </span>
          </div>
          <div className="gr-cell">
            <small>8 Grams</small>
            <strong>{fmt(r.eight)}</strong>
          </div>
        </Reveal>

        <Reveal className="gr-foot" delay={0.1}>
          <span>Last update: {r.updated}</span>
          <Magnetic>
            <a
              className="btn"
              href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Ask for today’s price
            </a>
          </Magnetic>
        </Reveal>
      </div>
    </section>
  );
}
