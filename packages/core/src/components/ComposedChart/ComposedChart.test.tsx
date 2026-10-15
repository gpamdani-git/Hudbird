import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { ComposedChart } from "./ComposedChart";

const sampleData = [
  { month: "Jan", sales: 4000, profit: 2400 },
  { month: "Feb", sales: 3000, profit: 1398 },
];

describe("ComposedChart component", () => {
  it("renders container element with custom className", () => {
    const { container } = render(
      <ComposedChart
        data={sampleData}
        index="month"
        series={[
          { category: "sales", type: "bar" },
          { category: "profit", type: "line" },
        ]}
        className="test-composedchart"
      />
    );

    expect(container.querySelector(".test-composedchart")).toBeInTheDocument();
  });
});
