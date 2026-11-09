"use client";

import { useState } from "react";
import Image from "next/image";
import { site } from "@/lib/site";
import Reveal from "./Reveal";
import { Lines, Magnetic } from "./fx";

const Phone = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z" /></svg>
);
const Wa = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm5.8 14.07c-.25.7-1.45 1.33-2 1.4-.52.07-1.17.1-1.9-.12a17 17 0 0 1-1.72-.64c-3.03-1.3-5-4.35-5.15-4.55-.15-.2-1.23-1.63-1.23-3.1 0-1.48.77-2.2 1.05-2.5.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.52.25.6.85 2.07.92 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.52-.15.15-.3.31-.13.6.18.3.78 1.28 1.68 2.07 1.15 1.03 2.12 1.35 2.42 1.5.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.18 1.42Z" /></svg>
);
const Pin = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><path d="M12 21s7-6.2 7-11.5A7 7 0 005 9.5C5 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg>
);
const Clock = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
);
const Mail = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4"><rect x="3" y="5" width="18" height="14" rx="1" /><path d="M3 7l9 6 9-6" /></svg>
);

export default function Contact() {
  const s = site.showrooms[0];
  const tel = `tel:${site.phone.replace(/\s/g, "")}`;
  const [form, setForm] = useState({ name: "", phone: "", interest: site.collections[0].title, message: "" });
  const update = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  // No backend needed: opens WhatsApp with the enquiry pre-filled.
  const submit = (e) => {
    e.preventDefault();
    const text = `Hello Nalukandathil, I'm ${form.name} (${form.phone}). I'm interested in: ${form.interest}. ${form.message}`;
    window.open(`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`, "_blank");
  };

  const rows = [
    { icon: <Pin />, label: "Address", value: s.address },
    { icon: <Phone />, label: "Phone", value: site.phone, href: tel },
    ...(site.email ? [{ icon: <Mail />, label: "Email", value: site.email, href: `mailto:${site.email}` }] : []),
  ];

  return (
    <section id="visit" className="section ct">
      <div className="ct-blob b1" aria-hidden />
      <div className="ct-blob b2" aria-hidden />
      <div className="wrap">
        <div className="sec-head center">
          <p className="kicker">Visit us</p>
          <h2>
            <Lines lines={["Come in,", <em key="e">take your time</em>]} />
          </h2>
          <Reveal as="p" className="sec-sub">
            Visit our Edakkara showroom, or send us a message and we will get back to you.
          </Reveal>
        </div>

        <Reveal className="vt">
          {/* Left: showroom details */}
          <aside className="vt-info">
            <Image src="/images/look-emerald.png" alt="" fill sizes="(max-width: 960px) 100vw, 45vw" style={{ objectFit: "cover", objectPosition: "40% 55%" }} />
            <div className="vt-shade" />
            <div className="vt-in">
              <p className="kicker light">Our showroom</p>
              <h3>{s.name}</h3>
              <p className="vt-sub">{site.fullName}</p>

              <ul>
                {rows.map((r) => (
                  <li key={r.label}>
                    <span className="vt-ico">{r.icon}</span>
                    <div>
                      <small>{r.label}</small>
                      {r.href ? <a href={r.href}>{r.value}</a> : <p>{r.value}</p>}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="vt-hours">
                <p><Clock /> Business hours</p>
                <dl>
                  {site.hoursList.map((h) => (
                    <div key={h.day} className={h.closed ? "closed" : ""}>
                      <dt>{h.day}</dt>
                      <dd>{h.time}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="vt-quick">
                <a href={tel} className="vt-btn"><Phone /> Call</a>
                <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" className="vt-btn"><Wa /> WhatsApp</a>
                <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="vt-btn"><Pin /> Directions</a>
              </div>

              <a className="vt-rate" href={s.mapUrl} target="_blank" rel="noopener noreferrer">
                <strong>{site.stats.googleRating}<em>★</em></strong>
                <span>{site.stats.googleReviews} Google reviews</span>
              </a>
            </div>
          </aside>

          {/* Right: enquiry form */}
          <form className="vt-form" onSubmit={submit}>
            <p className="kicker">Enquiry</p>
            <h3>Send us a message</h3>
            <p className="vt-note">Tell us what you are looking for and our team will reply on WhatsApp.</p>

            <div className="row2">
              <div className="fl">
                <input name="name" value={form.name} onChange={update} required autoComplete="name" placeholder=" " id="f-name" />
                <label htmlFor="f-name">Your name</label>
              </div>
              <div className="fl">
                <input name="phone" type="tel" value={form.phone} onChange={update} required autoComplete="tel" placeholder=" " id="f-phone" />
                <label htmlFor="f-phone">Phone number</label>
              </div>
            </div>

            <div className="vt-chips" role="radiogroup" aria-label="Interested in">
              <span>Interested in</span>
              {site.collections.map((c) => (
                <button
                  type="button"
                  key={c.title}
                  role="radio"
                  aria-checked={form.interest === c.title}
                  className={form.interest === c.title ? "on" : ""}
                  onClick={() => setForm({ ...form, interest: c.title })}
                >
                  {c.title}
                </button>
              ))}
            </div>

            <div className="fl">
              <textarea name="message" rows={4} value={form.message} onChange={update} placeholder=" " id="f-msg" />
              <label htmlFor="f-msg">Message (optional)</label>
            </div>

            <div className="vt-submit">
              <Magnetic>
                <button className="btn" type="submit">Send via WhatsApp <span aria-hidden>→</span></button>
              </Magnetic>
              <small>We usually reply within a few hours.</small>
            </div>
          </form>
        </Reveal>

        {/* Map strip */}
        <Reveal className="vt-map" delay={0.1}>
          <iframe
            title="Nalukandathil showroom map"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            src="https://www.google.com/maps?q=Nalukandathil+Jewellers+Edakkara&output=embed"
          />
          <div className="vt-map-card">
            <small>Find us</small>
            <strong>{s.name}, Keralam</strong>
            <a href={s.mapUrl} target="_blank" rel="noopener noreferrer" className="btn gold">Get directions</a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
