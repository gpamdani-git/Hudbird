import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from "./Navbar";

describe("Navbar component", () => {
  it("renders navbar navigation landmark and brand", () => {
    render(
      <Navbar>
        <NavbarBrand>
          <span data-testid="logo">Hudbird UI</span>
        </NavbarBrand>
        <NavbarContent>
          <NavbarItem>Docs</NavbarItem>
          <NavbarItem>Components</NavbarItem>
        </NavbarContent>
      </Navbar>
    );

    expect(screen.getByRole("navigation")).toBeInTheDocument();
    expect(screen.getByTestId("logo")).toHaveTextContent("Hudbird UI");
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
  });

  it("triggers onMenuOpenChange when toggle is clicked", () => {
    const handleMenuOpenChange = vi.fn();
    render(
      <Navbar onMenuOpenChange={handleMenuOpenChange}>
        <NavbarMenuToggle />
      </Navbar>
    );

    const toggleBtn = screen.getByRole("button");
    fireEvent.click(toggleBtn);
    expect(handleMenuOpenChange).toHaveBeenCalledWith(true);
  });

  it("renders mobile menu when isMenuOpen is true", () => {
    render(
      <Navbar isMenuOpen={true}>
        <NavbarMenu>
          <NavbarMenuItem>Mobile Item 1</NavbarMenuItem>
        </NavbarMenu>
      </Navbar>
    );

    expect(screen.getByText("Mobile Item 1")).toBeInTheDocument();
  });
});
