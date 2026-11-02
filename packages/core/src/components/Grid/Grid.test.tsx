import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Grid, GridItem } from "./index";

describe("Grid & GridItem Components", () => {
  it("renders Grid with default props", () => {
    render(
      <Grid data-testid="grid">
        <div>Item 1</div>
        <div>Item 2</div>
      </Grid>
    );
    const el = screen.getByTestId("grid");
    expect(el.tagName).toBe("DIV");
    expect(el).toHaveClass("grid", "grid-cols-1", "gap-4");
  });

  it("applies column variations accurately", () => {
    const { rerender } = render(
      <Grid cols={2} data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("md:grid-cols-2");

    rerender(
      <Grid cols={3} data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("lg:grid-cols-3");

    rerender(
      <Grid cols={12} data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("grid-cols-12");
  });

  it("applies bento asymmetric layout presets", () => {
    const { rerender } = render(
      <Grid layout="bento-2-1" data-testid="grid">
        <div>Primary Card</div>
        <div>Sidebar Card</div>
      </Grid>
    );
    const el = screen.getByTestId("grid");
    expect(el).toHaveClass("[&>*:nth-child(1)]:lg:col-span-2");

    rerender(
      <Grid layout="bento-split" data-testid="grid">
        <div>Asymmetric Left</div>
        <div>Asymmetric Right</div>
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("[&>*:nth-child(1)]:lg:col-span-7");
  });

  it("applies gap variants strictly locked to 8-point rhythm", () => {
    const { rerender } = render(
      <Grid gap="none" data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-0");

    rerender(
      <Grid gap="xs" data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-2");

    rerender(
      <Grid gap="lg" data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-6");

    rerender(
      <Grid gap="xl" data-testid="grid">
        <div>Item</div>
      </Grid>
    );
    expect(screen.getByTestId("grid")).toHaveClass("gap-8");
  });

  it("renders GridItem with colSpan, rowSpan, and colStart", () => {
    render(
      <Grid cols={12}>
        <GridItem colSpan={8} rowSpan={2} colStart={3} data-testid="grid-item">
          Item Content
        </GridItem>
      </Grid>
    );
    const el = screen.getByTestId("grid-item");
    expect(el).toHaveClass("col-span-8", "row-span-2", "col-start-3");
  });

  it("renders animated Grid and GridItem without crashing", () => {
    render(
      <Grid animate data-testid="grid">
        <GridItem animate data-testid="grid-item">
          Waterfall Item
        </GridItem>
      </Grid>
    );
    expect(screen.getByTestId("grid")).toBeInTheDocument();
    expect(screen.getByTestId("grid-item")).toBeInTheDocument();
  });

  it("forwards ref to the underlying elements", () => {
    const gridRef = React.createRef<HTMLDivElement>();
    const itemRef = React.createRef<HTMLDivElement>();

    render(
      <Grid ref={gridRef}>
        <GridItem ref={itemRef}>Item</GridItem>
      </Grid>
    );
    expect(gridRef.current).toBeInstanceOf(HTMLDivElement);
    expect(itemRef.current).toBeInstanceOf(HTMLDivElement);
  });
});
