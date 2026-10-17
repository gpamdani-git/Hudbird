import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { IconBox } from "./IconBox";

describe("IconBox", () => {
  it("renders children correctly", () => {
    render(
      <IconBox>
        <span>★</span>
      </IconBox>
    );
    expect(screen.getByText("★")).toBeInTheDocument();
  });
});
