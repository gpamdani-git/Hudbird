import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { BarChart } from "./BarChart";

const sampleData = [
  { month: "Jan", revenue: 4000, profit: 2400 },
  { month: "Feb", revenue: 3000, profit: 1398 },
];

describe("BarChart component", () => {
  it("renders container element with custom className", () => {
    const { container } = render(
      <BarChart
        data={sampleData}
        index="month"
        categories={["revenue", "profit"]}
        className="test-barchart"
      />
    );

    expect(container.querySelector(".test-barchart")).toBeInTheDocument();
  });
});
