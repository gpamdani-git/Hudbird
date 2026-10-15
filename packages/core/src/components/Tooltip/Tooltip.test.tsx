import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import { Tooltip } from "./Tooltip";

describe("Tooltip component", () => {
  it("renders trigger element", () => {
    render(
      <Tooltip content="Helper text">
        <button>Hover me</button>
      </Tooltip>
    );

    expect(screen.getByRole("button", { name: /hover me/i })).toBeInTheDocument();
  });

  it("shows tooltip on hover when isOpen is true or defaultOpen", () => {
    render(
      <Tooltip content="Help tooltip" defaultOpen={true}>
        <button>Trigger</button>
      </Tooltip>
    );

    expect(screen.getByRole("tooltip")).toHaveTextContent("Help tooltip");
  });

  it("does not display tooltip when isDisabled is true", () => {
    render(
      <Tooltip content="Hidden tip" defaultOpen={true} isDisabled>
        <button>Disabled Target</button>
      </Tooltip>
    );

    expect(screen.queryByRole("tooltip")).not.toBeInTheDocument();
  });
});
