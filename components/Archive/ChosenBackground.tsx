'use client';

import { useBackground } from '../Backgrounds/BackgroundMaker';

const backgroundMap: Record<string, string> = {
  main: "bg-[url('/images/bg.webp')]",
  infopage: "bg-[url('/images/info.webp')]",
  loginpage: "bg-[url('/images/login.webp')]",
  // Add more modes as needed
};

export default function ChosenBackground() {
  const { backgroundMode } = useBackground();
  return backgroundMap[backgroundMode] || backgroundMap.main;
}
