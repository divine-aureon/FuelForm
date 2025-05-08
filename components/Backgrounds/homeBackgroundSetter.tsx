'use client';

import { useEffect } from 'react';
import { useBackground } from '@/components/Backgrounds/BackgroundMaker'; // Adjust path as needed

const HomeBackgroundSetter = () => {
  const { setBackgroundMode } = useBackground();

  useEffect(() => {
    setBackgroundMode("homepage2");
  }, [setBackgroundMode]);

  return null; // No visual output
};

export default HomeBackgroundSetter;
