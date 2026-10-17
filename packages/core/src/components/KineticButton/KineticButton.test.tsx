import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { KineticButton } from "./KineticButton";

describe("KineticButton", () => {
  it("renders button label correctly", () => {
    render(<KineticButton>Launch Project</KineticButton>);
    expect(screen.getAllByText("Launch Project")[0]).toBeInTheDocument();
  });

  it("renders as anchor tag when href is provided", () => {
    render(<KineticButton href="https://example.com">Explore Work</KineticButton>);
    const link = screen.getByRole("link", { name: /explore work/i });
    expect(link).toHaveAttribute("href", "https://example.com");
  });
});
