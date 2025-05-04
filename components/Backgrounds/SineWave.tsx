// components/SineWave.tsx
export default function SineWave() {
    return (
      <div className="w-full h-32 overflow-hidden relative">
        <svg
          className="absolute top-0 left-0 animate-sineWave"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
          width="100%"
          height="100%"
        >
          <path
            fill="#6366f1" // Tailwind's indigo-500
            fillOpacity="0.4"
            d="M0,160 C360,80 1080,240 1440,160 L1440,320 L0,320 Z"
          />
        </svg>
      </div>
    );
  }
  