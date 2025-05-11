'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from "framer-motion";

export default function NavLoad_v2() {

const [show, setShow] = useState(true);

useEffect(() => {
  const timeout = setTimeout(() => setShow(false), 800); // Duration of your loading
  return () => clearTimeout(timeout);
}, []);

if (!show) return null; // ❌ Stops rendering the background and div completely

return (
  <motion.div
    key="splits"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 1 }}
    transition={{ duration: 0.6 }}>
    <div className="fixed inset-0 bg-[url('/images/loading.jpg')] 
    bg-cover bg-center z-[9999] bg-no-repeat flex flex-col justify-center items-center min-h-screen text-center space-y-4">
      <p className="text-3xl font-bold text-white pulse-glow animate-pulse">Teleporting...</p>
    </div>
  </ motion.div>
);
}