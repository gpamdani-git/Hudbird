import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { PieChart } from "./PieChart";

const sampleData = [
  { name: "Direct", value: 400 },
  { name: "Social", value: 300 },
  { name: "Referral", value: 200 },
];

describe("PieChart component", () => {
  it("renders container element with custom className", () => {
    const { container } = render(
      <PieChart data={sampleData} index="name" category="value" className="test-piechart" />
    );

    expect(container.querySelector(".test-piechart")).toBeInTheDocument();
  });
});
