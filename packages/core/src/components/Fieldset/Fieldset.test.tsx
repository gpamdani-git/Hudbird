import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Fieldset, FieldsetHeader, FieldsetContent, FieldsetLegend, FieldsetRow } from "./Fieldset";

describe("Fieldset component", () => {
  it("renders fieldset with legend and content", () => {
    render(
      <Fieldset>
        <FieldsetHeader>
          <FieldsetLegend>Profile Information</FieldsetLegend>
        </FieldsetHeader>
        <FieldsetContent>
          <FieldsetRow label="Username" description="Your public handle">
            <input type="text" placeholder="username" />
          </FieldsetRow>
        </FieldsetContent>
      </Fieldset>
    );

    expect(screen.getByText("Profile Information")).toBeInTheDocument();
    expect(screen.getByText("Username")).toBeInTheDocument();
    expect(screen.getByText("Your public handle")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("username")).toBeInTheDocument();
  });

  it("handles disabled state on entire fieldset", () => {
    render(
      <Fieldset disabled>
        <FieldsetContent>
          <input type="text" placeholder="blocked input" />
        </FieldsetContent>
      </Fieldset>
    );

    expect(screen.getByPlaceholderText("blocked input")).toBeDisabled();
  });

  it("applies variant classes correctly", () => {
    const { container } = render(
      <Fieldset variant="card">
        <FieldsetContent>Content</FieldsetContent>
      </Fieldset>
    );

    const fieldset = container.querySelector("fieldset");
    expect(fieldset?.className).toContain("rounded-2xl");
  });
});
