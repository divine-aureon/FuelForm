import { useEffect, useRef, useState } from "react";

export function AutoClamp(threshold = 225) {
  const ref = useRef<HTMLDivElement>(null);
  const [isNarrow, setIsNarrow] = useState(false);
  const [width, setWidth] = useState<number>(0);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new ResizeObserver(([entry]) => {
      const newWidth = entry.contentRect.width;
      setWidth(newWidth);
      setIsNarrow(newWidth < threshold);
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isNarrow, width };
}
