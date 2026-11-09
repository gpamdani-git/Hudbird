// packages/theme/src/index.js
const plugin = require("tailwindcss/plugin");

module.exports = plugin(
  function ({ addBase, theme }) {
    addBase({
      ":root": {
        "--background": "255 255 255",
        "--foreground": "24 24 27",
        "--elevated": "249 250 251",
        "--overlay": "0 0 0",
        "--border": "228 228 231",
        "--primary-indigo": "79 70 229",
        "--hudbird-brand": "79 70 229",
        "--stitch-prose": "24 24 27",
        "--stitch-muted": "82 82 91",
        "--success": "34 197 94",
        "--warning": "245 158 11",
        "--danger": "239 68 68",
        "--info": "14 165 233",

        /* Duration & Easing Tokens */
        "--duration-fast": "150ms",
        "--duration-normal": "250ms",
        "--duration-slow": "400ms",
        "--ease-spring": "cubic-bezier(0.16, 1, 0.3, 1)",
        "--ease-smooth": "cubic-bezier(0.4, 0, 0.2, 1)",

        /* Section rhythm */
        "--hb-section-spacing": "clamp(4.5rem, 7vw, 6rem)",
        "--hb-section-spacing-compact": "clamp(3.5rem, 6vw, 5rem)",
      },
      ".dark": {
        "--background": "12 13 16", // Obsidian Charcoal (#0c0d10)
        "--foreground": "244 244 246",
        "--elevated": "20 21 26", // Elevated Surface (#14151a)
        "--overlay": "12 13 16",
        "--border": "39 39 42", // Border (#27272a)
        "--primary-indigo": "99 102 241",
        "--hudbird-brand": "129 140 248", // Hudbird Brand Indigo (#818CF8)
        "--stitch-prose": "244 244 246",
        "--stitch-muted": "161 161 170",
        "--success": "74 222 128",
        "--warning": "251 191 36",
        "--danger": "248 113 113",
        "--info": "56 189 248",
      },
    });
  },
  {
    theme: {
      extend: {
        keyframes: {
          shimmer: {
            "100%": { transform: "translateX(100%)" },
          },
        },
        animation: {
          shimmer: "shimmer 2s infinite linear",
          "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        },
        colors: {
          background: "rgb(var(--background) / <alpha-value>)",
          foreground: "rgb(var(--foreground) / <alpha-value>)",
          elevated: "rgb(var(--elevated) / <alpha-value>)",
          overlay: "rgb(var(--overlay) / <alpha-value>)",
          border: "rgb(var(--border) / <alpha-value>)",
          primary: {
            indigo: "rgb(var(--primary-indigo) / <alpha-value>)",
          },
          hudbird: {
            brand: "#4F46E5",
            cyan: "#06B6D4",
          },
          stitch: {
            canvas: "#0c0d10",
            surface: "#14151a",
            border: "#27272a",
            prose: "#f4f4f6",
            muted: "#a1a1aa",
          },
          success: "rgb(var(--success) / <alpha-value>)",
          warning: "rgb(var(--warning) / <alpha-value>)",
          danger: "rgb(var(--danger) / <alpha-value>)",
          info: "rgb(var(--info) / <alpha-value>)",
        },
        fontSize: {
          "display-2xl": [
            "clamp(2.5rem, 5vw, 4.5rem)",
            { lineHeight: "1.1", letterSpacing: "-0.025em" },
          ],
          "display-xl": [
            "clamp(2.25rem, 4.5vw, 3.75rem)",
            { lineHeight: "1.15", letterSpacing: "-0.022em" },
          ],
          "display-lg": [
            "clamp(1.75rem, 3.2vw, 2.5rem)",
            { lineHeight: "1.2", letterSpacing: "-0.02em" },
          ],
          "display-md": [
            "clamp(1.5rem, 2.5vw, 2rem)",
            { lineHeight: "1.25", letterSpacing: "-0.018em" },
          ],
          "display-sm": ["1.25rem", { lineHeight: "1.35", letterSpacing: "-0.015em" }],
        },
        transitionDuration: {
          fast: "150ms",
          normal: "250ms",
          slow: "400ms",
        },
        transitionTimingFunction: {
          spring: "cubic-bezier(0.16, 1, 0.3, 1)",
          smooth: "cubic-bezier(0.4, 0, 0.2, 1)",
          bounce: "cubic-bezier(0.34, 1.56, 0.64, 1)",
        },
        boxShadow: {
          "2xs": "0 1px 2px rgba(16, 24, 40, 0.04)",
          xs: "0 1px 2px rgba(16, 24, 40, 0.05)",
          skeuomorphic:
            "0 1px 2px rgba(16, 24, 40, 0.06), inset 0 1px 0 rgba(255, 255, 255, 0.16), inset 0 0 0 1px rgba(16, 24, 40, 0.12)",
        },
        letterSpacing: {
          "stitch-display": "-1.8px",
          "stitch-heading": "-0.3px",
          "stitch-body": "-0.16px",
          "stitch-eyebrow": "1.4px",
        },
        lineHeight: {
          "stitch-display": "1.15",
          "stitch-subtitle": "1.625",
          "stitch-prose": "1.7",
        },
        borderRadius: {
          xl: "0.75rem",
          "2xl": "1rem",
        },
      },
    },
  }
);
