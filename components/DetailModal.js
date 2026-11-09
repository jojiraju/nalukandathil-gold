"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { site } from "@/lib/site";
import { ease } from "./fx";

const EVENT = "nk:detail";

// Open the detail popup from anywhere: openDetail({ title, image, description, ... })
export function openDetail(item) {
  window.dispatchEvent(new CustomEvent(EVENT, { detail: item }));
}

// Category description lookup so every product can show a description.
export function describe(category) {
  return site.collections.find((c) => c.title === category)?.description || "";
}

const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12.04 2a9.9 9.9 0 0 0-8.5 14.9L2 22l5.25-1.5A9.9 9.9 0 1 0 12.04 2Zm5.8 14.07c-.25.7-1.45 1.33-2 1.4-.52.07-1.17.1-1.9-.12a17 17 0 0 1-1.72-.64c-3.03-1.3-5-4.35-5.15-4.55-.15-.2-1.23-1.63-1.23-3.1 0-1.48.77-2.2 1.05-2.5.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.52.25.6.85 2.07.92 2.22.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.31.38-.45.52-.15.15-.3.31-.13.6.18.3.78 1.28 1.68 2.07 1.15 1.03 2.12 1.35 2.42 1.5.3.15.47.12.65-.07.17-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.27.1 1.73.82 2.03.97.3.15.5.22.57.35.07.12.07.72-.18 1.42Z" /></svg>
);

export default function DetailModal() {
  const [item, setItem] = useState(null);

  useEffect(() => {
    const onOpen = (e) => setItem(e.detail);
    window.addEventListener(EVENT, onOpen);
    return () => window.removeEventListener(EVENT, onOpen);
  }, []);

  // Lock page scroll + close on Escape while open.
  useEffect(() => {
    if (!item) return;
    document.documentElement.classList.add("lenis-stopped");
    document.body.style.overflow = "hidden";
    const esc = (e) => e.key === "Escape" && setItem(null);
    window.addEventListener("keydown", esc);
    return () => {
      window.removeEventListener("keydown", esc);
      document.documentElement.classList.remove("lenis-stopped");
      document.body.style.overflow = "";
    };
  }, [item]);

  const msg = item
    ? `Hello Nalukandathil, I would like to enquire about: ${item.title}${item.material ? ` (${item.material})` : ""}.`
    : "";

  const viewPieces = () => {
    // Pre-select the category in the pieces filter, then scroll there.
    const a = document.createElement("a");
    a.href = "#pieces";
    a.dataset.cat = item.category;
    document.body.appendChild(a);
    setItem(null);
    setTimeout(() => {
      a.click();
      a.remove();
    }, 350);
  };

  return (
    <AnimatePresence>
      {item && (
        <motion.div
          className="dm"
          role="dialog"
          aria-modal="true"
          aria-label={item.title}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          onClick={() => setItem(null)}
        >
          <motion.div
            className="dm-box"
            initial={{ y: 40, scale: 0.97, opacity: 0 }}
            animate={{ y: 0, scale: 1, opacity: 1 }}
            exit={{ y: 30, scale: 0.97, opacity: 0 }}
            transition={{ duration: 0.5, ease }}
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
            <button className="dm-x" aria-label="Close" onClick={() => setItem(null)}>
              <span /><span />
            </button>

            <div className="dm-img">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 800px) 100vw, 520px"
                style={{ objectFit: "cover", objectPosition: item.focus || "50% 50%" }}
              />
            </div>

            <div className="dm-body">
              {item.tag && <span className="dm-tag">{item.tag}</span>}
              <h3>{item.title}</h3>
              {item.material && <p className="dm-mat">{item.material}</p>}
              {item.description && <p className="dm-desc">{item.description}</p>}

              <div className="dm-actions">
                <a
                  className="btn gold"
                  href={`https://wa.me/${site.whatsapp}?text=${encodeURIComponent(msg)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <WaIcon /> Enquire on WhatsApp
                </a>
                {item.category && item.showAll && (
                  <button className="btn ghost-dark" onClick={viewPieces}>View {item.category} pieces</button>
                )}
              </div>
              <p className="dm-hint">Visit our showroom on CNG Road, Edakkara to see this in person.</p>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
