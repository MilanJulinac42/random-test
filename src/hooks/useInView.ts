import { useEffect, useRef, useState } from "react";

export function useInView<T extends Element = HTMLDivElement>(
  options: IntersectionObserverInit = { threshold: 0.12, rootMargin: "0px 0px -40px 0px" },
) {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || typeof IntersectionObserver === "undefined") {
      setInView(true);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      });
    }, options);
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return { ref, inView };
}
