"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface RouteButtonProps {
  label: string;
  href: string;
}

export default function RouteButton({ label, href }: RouteButtonProps) {
  const router = useRouter();
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    // Optional: delay so color change is visible
    setTimeout(() => router.push(href),200);
  };

  return (
    <button
      onClick={handleClick}
      className={`rounded-xl p-4 backdrop-blur text-white shadow-md transition duration-100 ${
        clicked ? "bg-blue-300/30 text-black" : "bg-white/10"
      }`}
    >
      {label}
    </button>
  );
}
