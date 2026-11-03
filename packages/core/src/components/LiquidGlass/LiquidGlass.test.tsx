import * as React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  LiquidGlass,
  LiquidGlassHeader,
  LiquidGlassBody,
  LiquidGlassFooter,
  LiquidGlassStage,
  LiquidGlassSensor,
  LiquidGlassIslandCompact,
  LiquidGlassIslandExpanded,
  resolveLiquidGlassBlurPx,
} from "./LiquidGlass";

describe("LiquidGlass", () => {
  it("resolves Golden Gate blur presets and clamped numeric blur values", () => {
    expect(resolveLiquidGlassBlurPx(undefined)).toBe(22);
    expect(resolveLiquidGlassBlurPx("golden-gate")).toBe(22);
    expect(resolveLiquidGlassBlurPx("none")).toBe(0);
    expect(resolveLiquidGlassBlurPx(34)).toBe(34);
    expect(resolveLiquidGlassBlurPx(120)).toBe(64);
  });

  it("renders compound slots with glass, dark, and light modes", () => {
    const { rerender } = render(
      <LiquidGlass data-testid="glass-card" mode="glass" blur={26} intensity={44}>
        <LiquidGlassHeader>Golden Gate</LiquidGlassHeader>
        <LiquidGlassBody padding="capsule">Refractive Capsule</LiquidGlassBody>
        <LiquidGlassFooter>macOS 27</LiquidGlassFooter>
      </LiquidGlass>
    );

    const card = screen.getByTestId("glass-card");
    expect(card).toHaveAttribute("data-glass-mode", "glass");
    expect(card).toHaveAttribute("data-hb-theme", "dark");
    expect(card.style.backdropFilter).toContain("blur(26px)");
    expect(screen.getByText("Refractive Capsule")).toBeInTheDocument();

    rerender(
      <LiquidGlass data-testid="glass-card" mode="light" radius="capsule">
        <LiquidGlassBody padding="capsule">Daylight Mode</LiquidGlassBody>
      </LiquidGlass>
    );
    expect(card).toHaveAttribute("data-glass-mode", "light");
    expect(card).toHaveAttribute("data-hb-theme", "light");
    expect(card.className).toContain("rounded-full");

    rerender(
      <LiquidGlass data-testid="glass-card" mode="dark" radius="full">
        <LiquidGlassBody padding="compact">Obsidian Mode</LiquidGlassBody>
      </LiquidGlass>
    );
    expect(card).toHaveAttribute("data-glass-mode", "dark");
    expect(card).toHaveAttribute("data-hb-theme", "dark");
    expect(card.className).toContain("rounded-3xl");
  });

  it("supports keyboard activation when isPressable is enabled", () => {
    const onActivate = vi.fn();
    render(
      <LiquidGlass isPressable onClick={onActivate}>
        <LiquidGlassBody>Interactive Pill</LiquidGlassBody>
      </LiquidGlass>
    );

    const buttonSurface = screen.getByRole("button");
    fireEvent.keyDown(buttonSurface, { key: "Enter" });
    expect(onActivate).toHaveBeenCalledTimes(1);
  });

  it("renders LiquidGlassStage across glass, dark, and light modes with Container layout", () => {
    render(
      <LiquidGlassStage data-testid="stage" mode="glass" wallpaper="golden-gate" containerSize="md">
        <span>Floating Island</span>
      </LiquidGlassStage>
    );

    const stage = screen.getByTestId("stage");
    expect(stage).toHaveAttribute("data-stage-mode", "glass");
    expect(stage.querySelector(".max-w-screen-md")).toBeInTheDocument();
    expect(screen.getByText("Floating Island")).toBeInTheDocument();
  });

  it("renders WidgetKit DynamicIsland radius, keylineTint, sensor, and 4-region expanded anatomy", () => {
    render(
      <div>
        <LiquidGlass data-testid="compact-island" radius="capsule" keylineTint="emerald">
          <LiquidGlassBody padding="compactPill">
            <LiquidGlassIslandCompact
              leading={<span>Spotify</span>}
              trailing={<span>00:51</span>}
            />
          </LiquidGlassBody>
        </LiquidGlass>

        <LiquidGlass data-testid="expanded-island" radius="island" keylineTint="indigo">
          <LiquidGlassBody padding="island">
            <LiquidGlassIslandExpanded
              leading={<span>ANA NH107</span>}
              trailing={<span>Gate G9</span>}
              center={<span>SFO to HND</span>}
              bottom={<span>Seat 4A</span>}
            />
          </LiquidGlassBody>
        </LiquidGlass>

        <LiquidGlassSensor data-testid="standalone-sensor" size="expanded" />
      </div>
    );

    const compactIsland = screen.getByTestId("compact-island");
    expect(compactIsland).toHaveAttribute("data-keyline-tint", "emerald");
    expect(compactIsland.style.border).toContain("rgba(52, 211, 153");

    const expandedIsland = screen.getByTestId("expanded-island");
    expect(expandedIsland).toHaveAttribute("data-keyline-tint", "indigo");
    expect(expandedIsland.className).toContain("rounded-[36px]");
    expect(screen.getByText("SFO to HND")).toBeInTheDocument();
    expect(screen.getByText("Seat 4A")).toBeInTheDocument();
    expect(screen.getByTestId("standalone-sensor")).toHaveAttribute("aria-hidden", "true");
  });
});
