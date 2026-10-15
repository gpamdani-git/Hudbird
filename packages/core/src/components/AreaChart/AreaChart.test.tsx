import React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { AreaChart } from "./AreaChart";

const chartData = [
  { month: "Jan", sales: 100 },
  { month: "Feb", sales: 150 },
];

describe("AreaChart component", () => {
  it("renders container element with role or className", () => {
    const { container } = render(
      <AreaChart data={chartData} index="month" categories={["sales"]} className="custom-chart" />
    );
    expect(container.querySelector(".custom-chart")).toBeInTheDocument();
  });
});
