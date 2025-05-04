"use client";

import { motion } from "framer-motion";

export function FadeIn({
    children,
    delay = 1.3,
  }: {
    children: React.ReactNode;
    delay?: number;
  }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      className="relative z-0"
    >

        {children}
    </motion.div>
  );
}