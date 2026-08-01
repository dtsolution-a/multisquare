import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollManager({ ready }) {
  const location = useLocation();

  useEffect(() => {
    if (!ready) return;

    const scrollToHash = () => {
      if (location.hash) {
        const el = document.querySelector(location.hash);
        if (el) {
          const lenis = window.__lenis;
          if (lenis) lenis.scrollTo(el, { offset: -20 });
          else el.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
      const lenis = window.__lenis;
      if (lenis) lenis.scrollTo(0, { immediate: true });
      else window.scrollTo(0, 0);
    };

    const id = setTimeout(scrollToHash, 60);
    return () => clearTimeout(id);
  }, [location.pathname, location.hash, ready]);

  return null;
}
