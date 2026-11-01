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

  it("supports position right and bottom dock variants", () => {
    const { rerender } = render(
      <Sidebar position="right" variant="floating" data-testid="right-sidebar">
        <SidebarContent>
          <SidebarNav>
            <SidebarItem href="/inspector">Inspector</SidebarItem>
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
    );

    expect(screen.getByTestId("right-sidebar")).toBeInTheDocument();
    expect(screen.getByText("Inspector")).toBeInTheDocument();

    rerender(
      <Sidebar position="bottom" variant="dock" data-testid="dock-sidebar">
        <SidebarContent>
          <SidebarNav>
            <SidebarItem href="/home" label="Home" />
          </SidebarNav>
        </SidebarContent>
      </Sidebar>
    );

    expect(screen.getByTestId("dock-sidebar")).toBeInTheDocument();
  });
});
