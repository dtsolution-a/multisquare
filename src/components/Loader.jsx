import { useEffect, useRef, useState } from "react";
import { gsap } from "../lib/gsap";
import logoMarkWhite from "../assets/logo-mark-white.png";
import "./Loader.css";

export default function Loader({ onComplete }) {
  const rootRef = useRef(null);
  const lineRef = useRef(null);
  const panelTopRef = useRef(null);
  const panelBottomRef = useRef(null);
  const countRef = useRef(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    document.documentElement.style.overflow = "hidden";

    const counter = { val: 0 };
    const tl = gsap.timeline({
      defaults: { ease: "power2.inOut" },
      onComplete: () => {
        document.documentElement.style.overflow = "";
        gsap.set(rootRef.current, { display: "none" });
        onComplete?.();
      },
    });

    if (reduce) {
      setCount(100);
      tl.to(rootRef.current, { autoAlpha: 0, duration: 0.3 });
      return () => tl.kill();
    }

    tl.fromTo(
      ".loader-mark",
      { opacity: 0, y: 18, filter: "blur(10px)" },
      { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.8, ease: "power3.out" }
    )
      .fromTo(lineRef.current, { scaleX: 0 }, { scaleX: 1, duration: 1.5, ease: "power3.inOut" }, 0.15)
      .to(
        counter,
        {
          val: 100,
          duration: 1.55,
          ease: "power2.inOut",
          onUpdate: () => setCount(Math.round(counter.val)),
        },
        0.15
      )
      .to(".loader-mark", { opacity: 0, y: -14, duration: 0.4, ease: "power2.in" }, "+=0.05")
      .to(
        [panelTopRef.current],
        { yPercent: -100, duration: 0.9, ease: "cubic-bezier(0.85,0,0.15,1)" },
        "reveal"
      )
      .to(
        [panelBottomRef.current],
        { yPercent: 100, duration: 0.9, ease: "cubic-bezier(0.85,0,0.15,1)" },
        "reveal"
      );

    return () => tl.kill();
  }, [onComplete]);

  return (
    <div className="loader" ref={rootRef}>
      <div className="loader-panel loader-panel-top" ref={panelTopRef} />
      <div className="loader-panel loader-panel-bottom" ref={panelBottomRef} />
      <div className="loader-mark">
        <img className="loader-logo" src={logoMarkWhite} alt="M2" />
        <div className="loader-count" ref={countRef}>
          {String(count).padStart(2, "0")}
          <span>%</span>
        </div>
        <div className="loader-track">
          <div className="loader-line" ref={lineRef} />
        </div>
      </div>
    </div>
  );
}
