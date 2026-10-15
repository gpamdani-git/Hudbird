import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { LineChart } from "./LineChart";

const sampleData = [
  { day: "Mon", visitors: 200 },
  { day: "Tue", visitors: 450 },
];

describe("LineChart component", () => {
  it("renders container element with custom className", () => {
    const { container } = render(
      <LineChart
        data={sampleData}
        index="day"
        categories={["visitors"]}
        className="test-linechart"
      />
    );

    expect(container.querySelector(".test-linechart")).toBeInTheDocument();
  });
});
