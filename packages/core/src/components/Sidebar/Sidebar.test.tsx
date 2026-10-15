import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarNav,
  SidebarItem,
  useSidebar,
} from "./Sidebar";

const CollapseToggle = () => {
  const { toggleCollapse } = useSidebar();
  return <button onClick={toggleCollapse}>Toggle</button>;
};

describe("Sidebar component", () => {
  it("renders aside element with items and header", () => {
    render(
      <Sidebar>
        <SidebarHeader>Dashboard</SidebarHeader>
        <SidebarContent>
          <SidebarNav>
            <SidebarItem href="/analytics">Analytics</SidebarItem>
            <SidebarItem href="/settings">Settings</SidebarItem>
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
    );

    const aside = screen.getByRole("complementary");
    expect(aside).toBeInTheDocument();
    expect(screen.getByText("Dashboard")).toBeInTheDocument();
    expect(screen.getByText("Analytics")).toBeInTheDocument();
    expect(screen.getByText("Settings")).toBeInTheDocument();
  });

  it("toggles collapse state with useSidebar hook", () => {
    const handleCollapseChange = vi.fn();
    render(
      <Sidebar onCollapseChange={handleCollapseChange}>
        <SidebarHeader>
          <CollapseToggle />
        </SidebarHeader>
      </Sidebar>
    );

    const trigger = screen.getByRole("button", { name: "Toggle" });
    fireEvent.click(trigger);
    expect(handleCollapseChange).toHaveBeenCalledWith(true);
  });
});
