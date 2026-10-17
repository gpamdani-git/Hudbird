import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { StickyStack, StickyStackItem } from "./StickyStack";

describe("StickyStack", () => {
  it("renders stack items with correct sticky styles", () => {
    render(
      <StickyStack baseTop="5rem" offsetStep="1rem">
        <StickyStackItem index={0}>Step 1</StickyStackItem>
        <StickyStackItem index={1}>Step 2</StickyStackItem>
      </StickyStack>
    );

    const step1 = screen.getByText("Step 1");
    expect(step1).toBeInTheDocument();
    expect(step1.closest("div")).toHaveStyle("position: sticky");
  });
});
