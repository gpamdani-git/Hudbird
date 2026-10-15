import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RadialChart } from "./RadialChart";

const sampleData = [
  { name: "18-24", count: 31.47, fill: "#8884d8" },
  { name: "25-29", count: 26.69, fill: "#83a6ed" },
];

describe("RadialChart component", () => {
  it("renders container element with custom className", () => {
    const { container } = render(
      <RadialChart
        data={sampleData}
        index="name"
        categories={["count"]}
        className="test-radialchart"
      />
    );

    expect(container.querySelector(".test-radialchart")).toBeInTheDocument();
  });
});
