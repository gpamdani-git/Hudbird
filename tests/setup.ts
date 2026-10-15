import "@testing-library/jest-dom/vitest";
import { cleanup } from "@testing-library/react";
import { afterEach } from "vitest";

// Automatically cleanup DOM after each test
afterEach(() => {
  cleanup();
});

// Polyfill window.matchMedia for JSDOM
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: (query: string) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: () => {},
    removeListener: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
    dispatchEvent: () => false,
  }),
});

// Polyfill ResizeObserver for JSDOM
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Polyfill IntersectionObserver for JSDOM
global.IntersectionObserver = class IntersectionObserver {
  readonly root = null;
  readonly rootMargin = "";
  readonly thresholds = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords() {
    return [];
  }
};

window.scrollTo = () => {};

// Mock container measurements for Recharts in JSDOM
Object.defineProperty(HTMLElement.prototype, "offsetWidth", {
  configurable: true,
  value: 500,
});
Object.defineProperty(HTMLElement.prototype, "offsetHeight", {
  configurable: true,
  value: 300,
});
Object.defineProperty(HTMLElement.prototype, "clientWidth", {
  configurable: true,
  value: 500,
});
Object.defineProperty(HTMLElement.prototype, "clientHeight", {
  configurable: true,
  value: 300,
});

HTMLElement.prototype.getBoundingClientRect = function () {
  return {
    width: 500,
    height: 300,
    top: 0,
    left: 0,
    bottom: 300,
    right: 500,
    x: 0,
    y: 0,
    toJSON: () => {},
  };
};
