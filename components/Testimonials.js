"use client";

import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { Lines } from "./fx";

export default function Testimonials() {
  return (
    <section className="section tm">
      <div className="wrap">
        <div className="sec-head center">
          <p className="kicker light">Testimonials</p>
          <h2>
            <Lines lines={["Words from our", <em key="e">customers</em>]} />
          </h2>
        </div>

        <div className="tm-grid">
          {site.testimonials.map((t, i) => (
            <Reveal key={t.name} delay={i * 0.1} className="tm-card">
              <span className="tm-mark" aria-hidden>“</span>
              <div className="tm-stars" aria-label="5 out of 5 stars">★★★★★</div>
              <blockquote>{t.quote}</blockquote>
              <footer>
                <span className="tm-av">{t.name[0]}</span>
                <div>
                  <strong>{t.name}</strong>
                  <small>{t.place}</small>
                </div>
              </footer>
            </Reveal>
          ))}
        </div>

        <Reveal className="tm-rate" delay={0.15}>
          <strong>{site.stats.googleRating}<em>★</em></strong>
          <span>{site.stats.googleReviews} reviews on Google</span>
          <a href={site.showrooms[0].mapUrl} target="_blank" rel="noopener noreferrer" className="text-link light">Read all reviews ↗</a>
        </Reveal>
      </div>
    </section>
  );
}
