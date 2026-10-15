import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  DescriptionList,
  DescriptionListItem,
  DescriptionListLabel,
  DescriptionListValue,
} from "./DescriptionList";

describe("DescriptionList component", () => {
  it("renders dl element with dt and dd pairs", () => {
    render(
      <DescriptionList>
        <DescriptionListItem>
          <DescriptionListLabel>Full Name</DescriptionListLabel>
          <DescriptionListValue>Dani Akbar</DescriptionListValue>
        </DescriptionListItem>
        <DescriptionListItem>
          <DescriptionListLabel>Role</DescriptionListLabel>
          <DescriptionListValue>Architect</DescriptionListValue>
        </DescriptionListItem>
      </DescriptionList>
    );

    expect(screen.getByText("Full Name")).toBeInTheDocument();
    expect(screen.getByText("Dani Akbar")).toBeInTheDocument();
    expect(screen.getByText("Role")).toBeInTheDocument();
    expect(screen.getByText("Architect")).toBeInTheDocument();
  });

  it("applies card variant styling", () => {
    const { container } = render(
      <DescriptionList variant="card">
        <DescriptionListItem>
          <DescriptionListLabel>Card Item</DescriptionListLabel>
          <DescriptionListValue>Value</DescriptionListValue>
        </DescriptionListItem>
      </DescriptionList>
    );

    expect(container.firstChild).toHaveClass("rounded-2xl");
  });
});
