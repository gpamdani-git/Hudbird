import * as React from "react";

export interface UseActiveSectionOptions {
  sectionIds: string[];
  offset?: number;
}

export function useActiveSection({ sectionIds, offset = 80 }: UseActiveSectionOptions) {
  const [activeId, setActiveId] = React.useState<string>("");

  React.useEffect(() => {
    if (typeof window === "undefined" || !sectionIds.length) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + offset + 20;

      for (let i = sectionIds.length - 1; i >= 0; i--) {
        const id = sectionIds[i].replace(/^#/, "");
        const element = document.getElementById(id);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveId(id);
            return;
          }
        }
      }

      if (window.scrollY < offset) {
        setActiveId(sectionIds[0]?.replace(/^#/, "") || "");
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sectionIds, offset]);

  const scrollToSection = React.useCallback(
    (targetId: string, smooth = true) => {
      const cleanId = targetId.replace(/^#/, "");
      const element = document.getElementById(cleanId);
      if (element) {
        const top = element.offsetTop - offset;
        window.scrollTo({
          top: Math.max(0, top),
          behavior: smooth ? "smooth" : "auto",
        });
        setActiveId(cleanId);
      }
    },
    [offset]
  );

  return { activeId, scrollToSection };
}
