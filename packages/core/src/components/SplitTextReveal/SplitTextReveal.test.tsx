import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { SplitTextReveal } from "./SplitTextReveal";

describe("SplitTextReveal", () => {
  it("renders text tokens into DOM correctly", () => {
    render(<SplitTextReveal text="Ready to build something extraordinary?" as="h2" />);
    expect(screen.getByText("Ready")).toBeInTheDocument();
    expect(screen.getByText("extraordinary?")).toBeInTheDocument();
  });
});
