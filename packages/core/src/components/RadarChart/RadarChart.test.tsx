import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { RadarChart } from "./RadarChart";

const sampleData = [
  { subject: "Math", score: 120 },
  { subject: "Chinese", score: 98 },
  { subject: "English", score: 86 },
];

describe("RadarChart component", () => {
  it("renders container element with custom className", () => {
    const { container } = render(
      <RadarChart
        data={sampleData}
        index="subject"
        categories={["score"]}
        className="test-radarchart"
      />
    );

    expect(container.querySelector(".test-radarchart")).toBeInTheDocument();
  });
});
