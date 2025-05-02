'use client';
import { createContext, useContext, useState } from 'react';

const BackgroundContext = createContext({
  backgroundMode: 'main',
  setBackgroundMode: (mode: string) => {}
});

export function BackgroundProvider({ children }: { children: React.ReactNode }) {
  const [backgroundMode, setBackgroundMode] = useState('main');

  return (
    <BackgroundContext.Provider value={{ backgroundMode, setBackgroundMode }}>
      {children}
    </BackgroundContext.Provider>
  );
}

export const useBackground = () => useContext(BackgroundContext);
