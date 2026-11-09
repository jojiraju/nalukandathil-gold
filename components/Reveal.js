"use client";

import { motion } from "framer-motion";

// Gentle fade-up when scrolled into view (the only animation used on the site).
export default function Reveal({ children, delay = 0, className, as = "div", ...rest }) {
  const M = motion[as];
  return (
    <M
      className={className}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.6, ease: "easeOut", delay }}
      {...rest}
    >
      {children}
    </M>
  );
}
