import React, { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";
import {
  AiStartupHero,
  AiStartupLogoCloud,
  AiStartupFeatures,
  AiStartupMarquee,
  AiStartupCta,
  AiStartupFooter,
  AiStartupAgentShowcase,
} from "@hudbird/marketing";

function App() {
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    // Force dark mode for the AI Startup template by default
    document.documentElement.classList.add("dark");
    document.documentElement.style.backgroundColor = "#030712";
  }, []);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
    if (theme === "dark") {
      document.documentElement.classList.remove("dark");
      document.documentElement.style.backgroundColor = "#ffffff";
    } else {
      document.documentElement.classList.add("dark");
      document.documentElement.style.backgroundColor = "#030712";
    }
  };

  return (
    <BrowserRouter>
      <main className="flex min-h-screen w-full flex-col bg-white dark:bg-[#030712]">
        <AiStartupHero theme={theme} toggleTheme={toggleTheme} />
        <AiStartupLogoCloud />
        <AiStartupFeatures />
        <AiStartupAgentShowcase />
        <AiStartupMarquee />
        <AiStartupCta />
        <AiStartupFooter />
      </main>
    </BrowserRouter>
  );
}

export default App;
