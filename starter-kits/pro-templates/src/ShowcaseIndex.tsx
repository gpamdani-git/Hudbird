import React, { useEffect, useState } from "react";
import { ShowcaseNavbar } from "./components/Showcase/ShowcaseNavbar";
import { ShowcaseHero } from "./components/Showcase/ShowcaseHero";
import { ShowcaseGallery } from "./components/Showcase/ShowcaseGallery";
import { LivePreviewToolbar } from "./components/nexus-sections/LivePreviewToolbar";

const ShowcaseDeveloper = React.lazy(() =>
  import("./components/Showcase/ShowcaseDeveloper").then((m) => ({ default: m.ShowcaseDeveloper }))
);
const ShowcaseComponents = React.lazy(() =>
  import("./components/Showcase/ShowcaseComponents").then((m) => ({
    default: m.ShowcaseComponents,
  }))
);
const ShowcaseAdmin = React.lazy(() =>
  import("./components/Showcase/ShowcaseAdmin").then((m) => ({ default: m.ShowcaseAdmin }))
);
const ShowcasePricing = React.lazy(() =>
  import("./components/Showcase/ShowcasePricing").then((m) => ({ default: m.ShowcasePricing }))
);
const ShowcaseFAQ = React.lazy(() =>
  import("./components/Showcase/ShowcaseFAQ").then((m) => ({ default: m.ShowcaseFAQ }))
);
const ShowcaseFooter = React.lazy(() =>
  import("./components/Showcase/ShowcaseFooter").then((m) => ({ default: m.ShowcaseFooter }))
);

export function ShowcaseIndex() {
  const [accentColor, setAccentColor] = useState("#7C3AED");

  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.documentElement.style.backgroundColor = "";

    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return (
    <main
      style={{ "--brand-primary": accentColor } as React.CSSProperties}
      className="flex min-h-screen w-full flex-col bg-[#F4F5F8] font-sans transition-colors duration-300 dark:bg-[#090B10]"
    >
      <ShowcaseNavbar />
      <ShowcaseHero />
      <ShowcaseGallery />
      <React.Suspense
        fallback={
          <div className="flex h-32 w-full items-center justify-center">
            <div className="h-6 w-6 animate-spin rounded-full border-b-2 border-zinc-900 dark:border-white"></div>
          </div>
        }
      >
        <ShowcaseDeveloper />
        <ShowcaseComponents />
        <ShowcaseAdmin />
        <ShowcasePricing />
        <ShowcaseFAQ />
        <ShowcaseFooter />
      </React.Suspense>

      <LivePreviewToolbar
        currentAccentColor={accentColor}
        onAccentColorChange={(c) => setAccentColor(c)}
      />
    </main>
  );
}
