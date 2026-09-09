import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

export const ScrollToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isVisible) {
    return null;
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      className="fixed right-6 bottom-6 z-50 rounded-full border border-zinc-200 bg-white p-3 text-zinc-900 shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100"
    >
      <ArrowUp className="h-5 w-5" />
    </button>
  );
};
