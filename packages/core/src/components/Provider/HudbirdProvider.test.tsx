import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { HudbirdProvider, useHudbird } from "./HudbirdProvider";

const Consumer = () => {
  const { navigate } = useHudbird();
  return <button onClick={() => navigate?.("/dashboard")}>Navigate</button>;
};

describe("HudbirdProvider component", () => {
  it("provides navigate function to consumer components", () => {
    const mockNavigate = vi.fn();
    render(
      <HudbirdProvider navigate={mockNavigate}>
        <Consumer />
      </HudbirdProvider>
    );

    const btn = screen.getByRole("button", { name: /navigate/i });
    fireEvent.click(btn);

    expect(mockNavigate).toHaveBeenCalledWith("/dashboard");
  });
});
