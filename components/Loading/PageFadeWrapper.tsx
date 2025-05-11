'use client';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import NavLoad from "@/components/Loading/NavLoad";

export default function PageFadeWrapper({ children }: { children: React.ReactNode }) {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setIsMounted(true), 800); // Just enough to stabilize
    return () => clearTimeout(t);
  }, []);

  if (!isMounted) return null;

  return (
   
    <motion.div
      initial={{ opacity: 0}}
      animate={{ opacity: 1}}
      exit={{ opacity: 1}}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col"
    > 
      {children}
    </motion.div>
  );
}
