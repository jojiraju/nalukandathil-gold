"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useSpring, useInView, animate, useMotionValue, useSpring as useSpringMV } from "framer-motion";
import Lenis from "lenis";

export const ease = [0.22, 1, 0.36, 1];

// Smooth inertial scrolling + anchor links that respect the sticky header.
export function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    let raf;
    const loop = (t) => {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    const onClick = (e) => {
      const a = e.target.closest?.('a[href^="#"]');
      if (!a) return;
      const id = a.getAttribute("href");
      const el = id.length > 1 ? document.querySelector(id) : null;
      e.preventDefault();
      lenis.scrollTo(el || 0, { offset: el ? -84 : 0, duration: 1.4 });
    };
    document.addEventListener("click", onClick);
    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("click", onClick);
      lenis.destroy();
    };
  }, []);
  return null;
}

// Thin gold bar showing page scroll progress.
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.3 });
  return <motion.div className="progress" style={{ scaleX }} />;
}

// Headline lines that rise out of a mask. `load` = play on page load instead of on scroll.
export function Lines({ lines, delay = 0, load = false, className = "" }) {
  // The trigger sits on the (unclipped) mask, not the hidden text, so the in-view observer can see it.
  const trigger = load
    ? { animate: "show" }
    : { whileInView: "show", viewport: { once: true, margin: "0px 0px -10% 0px" } };
  return (
    <>
      {lines.map((l, i) => (
        <motion.span className={`mask ${className}`} key={i} initial="hide" {...trigger}>
          <motion.span
            className="mask-in"
            variants={{ hide: { y: "115%" }, show: { y: 0 } }}
            transition={{ duration: 1.1, ease, delay: delay + i * 0.12 }}
          >
            {l}
          </motion.span>
        </motion.span>
      ))}
    </>
  );
}

// Image wipe: the frame opens upward while the picture settles from a slight zoom.
export function Wipe({ children, className = "", delay = 0 }) {
  return (
    <motion.div
      className={className}
      initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
      whileInView={{ clipPath: "inset(0% 0% 0% 0%)" }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 1.2, ease, delay }}
    >
      <motion.div
        initial={{ scale: 1.25 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, margin: "0px 0px -8% 0px" }}
        transition={{ duration: 1.8, ease, delay }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

// Button/link that gently follows the cursor (pointer devices only).
export function Magnetic({ children, strength = 0.3 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpringMV(x, { stiffness: 220, damping: 16, mass: 0.4 });
  const sy = useSpringMV(y, { stiffness: 220, damping: 16, mass: 0.4 });
  const ref = useRef(null);

  const move = (e) => {
    if (e.pointerType === "touch") return;
    const r = ref.current.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };
  const leave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div ref={ref} className="magnetic" style={{ x: sx, y: sy }} onPointerMove={move} onPointerLeave={leave}>
      {children}
    </motion.div>
  );
}

// Number that counts up when scrolled into view.
export function Counter({ to, decimals = 0, suffix = "", duration = 2 }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const c = animate(0, to, { duration, ease, onUpdate: setV });
    return () => c.stop();
  }, [inView, to, duration]);
  const text = decimals ? v.toFixed(decimals) : Math.round(v).toLocaleString("en-IN");
  return (
    <span ref={ref}>
      {text}
      {suffix}
    </span>
  );
}

// Cursor spotlight: sets --mx/--my on the hovered element (pair with className "spot").
export function spotMove(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
}

export function useDesktop(query = "(min-width: 960px)") {
  const [d, setD] = useState(false);
  useEffect(() => {
    const m = window.matchMedia(query);
    const f = () => setD(m.matches);
    f();
    m.addEventListener("change", f);
    return () => m.removeEventListener("change", f);
  }, [query]);
  return d;
}
