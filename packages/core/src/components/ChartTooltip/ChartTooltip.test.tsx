import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ChartTooltip } from "./ChartTooltip";

describe("ChartTooltip component", () => {
  it("renders nothing when active is false", () => {
    const { container } = render(
      <ChartTooltip active={false} payload={[{ name: "Revenue", value: 1200, color: "#3b82f6" }]} />
    );
    expect(container.firstChild).toBeNull();
  });

  it("renders tooltip content when active is true and payload exists", () => {
    render(
      <ChartTooltip
        active={true}
        label="Q1 2026"
        payload={[
          { name: "Revenue", value: 1200, color: "#3b82f6" },
          { name: "Expenses", value: 800, color: "#ef4444" },
        ]}
      />
    );

    expect(screen.getByText("Q1 2026")).toBeInTheDocument();
    expect(screen.getByText("Revenue")).toBeInTheDocument();
    expect(screen.getByText("1200")).toBeInTheDocument();
    expect(screen.getByText("Expenses")).toBeInTheDocument();
    expect(screen.getByText("800")).toBeInTheDocument();
  });

  it("formats value using valueFormatter", () => {
    render(
      <ChartTooltip
        active={true}
        payload={[{ name: "Sales", value: 5000 }]}
        valueFormatter={(v) => `$${v}`}
      />
    );

    expect(screen.getByText("$5000")).toBeInTheDocument();
  });
});
