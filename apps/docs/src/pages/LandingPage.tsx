import * as React from "react";
import { BrandScope } from "@hudbird/marketing";
import { HomepageNavigation } from "../components/landing/HomepageNavigation";
import { HomepageStudioHero } from "../components/landing/HomepageStudioHero";
import { HomepageAssembly } from "../components/landing/HomepageAssembly";
import { HomepagePlayground } from "../components/landing/HomepagePlayground";
import { HomepageWorkflow } from "../components/landing/HomepageWorkflow";
import {
  HomepageQuestions,
  HomepageClosing,
  HomepageFooter,
} from "../components/landing/HomepageClosing";
import {
  applyHomepageTheme,
  readHomepageTheme,
  resolveHomepageTheme,
  type HomepageThemePreference,
  type ResolvedTheme,
} from "../lib/homepageTheme";
import { hudbirdHomepageBrand } from "../data/hudbirdHomepage";
import "./homepage.css";

function useHomepageTheme() {
  const [preference, setPreference] = React.useState<HomepageThemePreference>(() =>
    typeof window === "undefined" ? "system" : readHomepageTheme(window.localStorage)
  );
  const [resolved, setResolved] = React.useState<ResolvedTheme>(() => {
    if (typeof window === "undefined") return "light";
    return resolveHomepageTheme(
      preference,
      window.matchMedia("(prefers-color-scheme: dark)").matches
    );
  });

  React.useEffect(() => {
    const query = window.matchMedia("(prefers-color-scheme: dark)");
    const update = () => {
      const next = resolveHomepageTheme(preference, query.matches);
      applyHomepageTheme(document.documentElement, next);
      setResolved(next);
    };
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, [preference]);

  const toggle = React.useCallback(() => {
    setPreference((current) => {
      const systemDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const currentResolved = resolveHomepageTheme(current, systemDark);
      const next = currentResolved === "dark" ? "light" : "dark";
      try {
        window.localStorage.setItem("theme", next);
      } catch {
        // The visual choice still applies when browser storage is unavailable.
      }
      return next;
    });
  }, []);

  return { resolved, toggle };
}

export default function LandingPage() {
  const { resolved, toggle } = useHomepageTheme();
  const brand = { ...hudbirdHomepageBrand, mode: resolved };

  return (
    <BrandScope
      brand={brand}
      className="hb-homepage min-h-[100dvh]"
      data-landing-page
      data-landing-smooth-scroll="true"
    >
      <HomepageNavigation mode={resolved} onToggle={toggle} />
      <main id="landing-page" tabIndex={-1}>
        <HomepageStudioHero />
        <HomepageAssembly />
        <HomepagePlayground />
        <HomepageWorkflow />
        <HomepageQuestions />
        <HomepageClosing />
      </main>
      <HomepageFooter />
    </BrandScope>
  );
}
