import { useEffect, useRef } from "react";
import { gsap } from "../lib/gsap";

export default function RotatingText({ phrases, className = "", startDelay = 2400, interval = 2600 }) {
  const ref = useRef(null);
  const idxRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el || phrases.length < 2) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let timer;
    let startTimer;

    const cycle = () => {
      const next = (idxRef.current + 1) % phrases.length;
      gsap.to(el, {
        yPercent: -115,
        opacity: 0,
        filter: "blur(10px)",
        duration: 0.5,
        ease: "power3.in",
        onComplete: () => {
          idxRef.current = next;
          el.textContent = phrases[next];
          gsap.fromTo(
            el,
            { yPercent: 115, opacity: 0, filter: "blur(10px)" },
            { yPercent: 0, opacity: 1, filter: "blur(0px)", duration: 0.65, ease: "power3.out" }
          );
        },
      });
    };

    startTimer = setTimeout(() => {
      timer = setInterval(cycle, interval);
    }, startDelay);

    return () => {
      clearTimeout(startTimer);
      clearInterval(timer);
      gsap.killTweensOf(el);
    };
  }, [phrases, startDelay, interval]);

  return (
    <span ref={ref} className={className}>
      {phrases[0]}
    </span>
  );
}
