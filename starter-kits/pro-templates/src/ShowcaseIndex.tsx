import React, { useEffect } from "react";
import { ShowcaseNavbar } from "./components/Showcase/ShowcaseNavbar";
import { ShowcaseHero } from "./components/Showcase/ShowcaseHero";
import { ShowcaseGallery } from "./components/Showcase/ShowcaseGallery";

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
  useEffect(() => {
    // Force dark mode by default as requested
    document.documentElement.classList.add("dark");
    document.documentElement.style.backgroundColor = "";

    // Also save to localStorage if not exists so Navbar can pick it up
    if (!localStorage.getItem("theme")) {
      localStorage.setItem("theme", "dark");
    }
  }, []);

  return (
    <main className="flex min-h-screen w-full flex-col bg-zinc-50 font-sans dark:bg-zinc-950">
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
    </main>
  );
}
