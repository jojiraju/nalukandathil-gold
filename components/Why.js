"use client";

import Image from "next/image";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { Counter, Lines, spotMove } from "./fx";

const icons = [
  <svg key="a" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2"><rect x="5" y="7" width="22" height="20" rx="1" /><path d="M5 13h22M11 4v6M21 4v6M12 20l3 3 6-6" /></svg>,
  <svg key="b" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M16 4l10 4v8c0 6-4 10-10 12C10 26 6 22 6 16V8z" /><path d="M11 16l4 4 6-7" /></svg>,
  <svg key="c" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M8 5h16l5 7-13 15L3 12z" /><path d="M3 12h26M12 5l-3 7 7 15M20 5l3 7-7 15" /></svg>,
  <svg key="d" viewBox="0 0 32 32" fill="none" stroke="currentColor" strokeWidth="1.2"><path d="M26 15a10 10 0 00-18-5M6 5v5h5M6 17a10 10 0 0018 5M26 27v-5h-5" /></svg>,
];

// Bento grid: one large feature tile + four trust tiles with a cursor spotlight.
export default function Why() {
  const years = new Date().getFullYear() - site.since;
  return (
    <section className="section why">
      <div className="wrap">
        <div className="sec-head center">
          <p className="kicker">Why Nalukandathil</p>
          <h2>
            <Lines lines={["Jewellery you can", <em key="e">trust</em>]} />
          </h2>
        </div>

        <div className="bento">
          <Reveal className="bento-hero">
            <Image
              src="/images/look-noir.png"
              alt=""
              fill
              sizes="(max-width: 960px) 100vw, 50vw"
              style={{ objectFit: "cover", objectPosition: "40% 40%" }}
            />
            <div className="bento-hero-text">
              <strong>
                <Counter to={years} suffix="+" />
              </strong>
              <span>Years of honest gold and a welcome for every family.</span>
            </div>
          </Reveal>

          {site.values.map((v, i) => (
            <Reveal key={v.title} delay={0.08 + i * 0.07} className="why-item spot" onPointerMove={spotMove}>
              <span className="why-n">0{i + 1}</span>
              <div className="why-icon">{icons[i]}</div>
              <h3>{v.title}</h3>
              <p>{v.text}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
