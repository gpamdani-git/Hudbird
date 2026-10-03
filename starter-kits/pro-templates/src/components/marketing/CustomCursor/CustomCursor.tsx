import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hoverState, setHoverState] = useState<"default" | "button" | "text" | "view-works">(
    "default"
  );

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0) translate(-50%, -50%)`;
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;

      const cursorTarget = target.closest("[data-cursor]");
      if (cursorTarget) {
        setHoverState(cursorTarget.getAttribute("data-cursor") as any);
        return;
      }

      if (target.closest("a") || target.closest("button") || target.closest(".cursor-pointer")) {
        setHoverState("button");
      } else if (
        ["h1", "h2", "h3", "h4", "h5", "h6", "p", "span", "div"].some(
          (tag) => target.tagName.toLowerCase() === tag && target.innerText.length > 0
        )
      ) {
        setHoverState("text");
      } else {
        setHoverState("default");
      }
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleMouseOver);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleMouseOver);
    };
  }, []);

  return (
    <div
      ref={cursorRef}
      className={`pointer-events-none fixed top-0 left-0 z-[99999] flex items-center justify-center rounded-full mix-blend-difference ease-out ${
        hoverState === "button" ? "h-12 w-12 border-transparent bg-white" : ""
      } ${hoverState === "text" ? "h-24 w-24 border-transparent bg-white" : ""} ${
        hoverState === "view-works" ? "h-28 w-28 border-transparent bg-white text-black" : ""
      } ${
        hoverState === "default" ? "h-8 w-8 border border-white opacity-70 backdrop-invert" : ""
      } `}
      style={{
        transitionProperty: "width, height, background-color, border-color, opacity",
        transitionDuration: "300ms",
      }}
    >
      <AnimatePresence>
        {hoverState === "view-works" && (
          <motion.span
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            className="text-center text-[10px] font-bold tracking-widest uppercase"
          >
            View
            <br />
            Works
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
