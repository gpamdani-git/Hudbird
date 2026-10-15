import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Tabs, Tab } from "./Tabs";

describe("Tabs component", () => {
  it("renders declarative tabs and shows initial active panel", () => {
    render(
      <Tabs defaultSelectedKey="overview">
        <Tab key="overview" id="overview" title="Overview">
          <p>Overview Content</p>
        </Tab>
        <Tab key="analytics" id="analytics" title="Analytics">
          <p>Analytics Content</p>
        </Tab>
      </Tabs>
    );

    const tabs = screen.getAllByRole("tab");
    expect(tabs).toHaveLength(2);
    expect(tabs[0]).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Overview Content")).toBeInTheDocument();
  });

  it("switches tab panel when another tab is clicked", () => {
    const handleSelectionChange = vi.fn();
    render(
      <Tabs defaultSelectedKey="tab1" onSelectionChange={handleSelectionChange}>
        <Tab key="tab1" id="tab1" title="Tab 1">
          Content 1
        </Tab>
        <Tab key="tab2" id="tab2" title="Tab 2">
          Content 2
        </Tab>
      </Tabs>
    );

    const tab2 = screen.getByRole("tab", { name: /tab 2/i });
    fireEvent.click(tab2);

    expect(handleSelectionChange).toHaveBeenCalledWith("tab2");
    expect(tab2).toHaveAttribute("aria-selected", "true");
    expect(screen.getByText("Content 2")).toBeInTheDocument();
  });

  it("respects isDisabled prop on specific tab", () => {
    render(
      <Tabs defaultSelectedKey="tab1">
        <Tab key="tab1" id="tab1" title="Active Tab">
          Active Content
        </Tab>
        <Tab key="tab2" id="tab2" title="Disabled Tab" isDisabled>
          Disabled Content
        </Tab>
      </Tabs>
    );

    const disabledTab = screen.getByRole("tab", { name: /disabled tab/i });
    expect(disabledTab).toBeDisabled();

    fireEvent.click(disabledTab);
    expect(disabledTab).not.toHaveAttribute("aria-selected", "true");
  });
});
