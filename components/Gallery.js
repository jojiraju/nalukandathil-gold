"use client";

import { site } from "@/lib/site";
import Photo from "./Photo";
import Reveal from "./Reveal";
import { Lines } from "./fx";

export default function Gallery() {
  return (
    <section id="gallery" className="section gl">
      <div className="wrap">
        <div className="sec-head center">
          <p className="kicker">Our gallery</p>
          <h2>
            <Lines lines={["Moments in", <em key="e">gold &amp; diamonds</em>]} />
          </h2>
          <Reveal as="p" className="sec-sub">
            A glimpse of the designs you will find at our Edakkara showroom.
          </Reveal>
        </div>

        <div className="gl-grid">
          {site.gallery.map((g, i) => (
            <Reveal key={g.image} delay={i * 0.08} className={`gl-item ${g.tall ? "tall" : ""}`}>
              <figure>
                <Photo item={g} ratio="fill" sizes="(max-width: 700px) 50vw, 33vw" />
                <figcaption>{g.title}</figcaption>
              </figure>
            </Reveal>
          ))}
        </div>

        <Reveal className="gl-follow" delay={0.1}>
          <p>See more of our latest designs</p>
          <a href={site.instagram} target="_blank" rel="noopener noreferrer" className="text-link">Follow on Instagram ↗</a>
        </Reveal>
      </div>
    </section>
  );
}
