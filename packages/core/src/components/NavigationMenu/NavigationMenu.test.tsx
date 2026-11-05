import * as React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import {
  NavigationMenu,
  NavigationMenuAction,
  NavigationMenuActions,
  NavigationMenuBar,
  NavigationMenuBrand,
  NavigationMenuCard,
  NavigationMenuContent,
  NavigationMenuGroup,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuMobile,
  NavigationMenuSearch,
  NavigationMenuToggle,
  NavigationMenuTrigger,
} from "./NavigationMenu";

function ExampleNavigation({ onValueChange }: { onValueChange?: (value: string | null) => void }) {
  return (
    <NavigationMenu onValueChange={onValueChange}>
      <NavigationMenuBar>
        <NavigationMenuBrand href="/">Hudbird</NavigationMenuBrand>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink href="/docs" active>
              Docs
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem value="products">
            <NavigationMenuTrigger>Products</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuGroup>
                <NavigationMenuCard href="/components" description="Accessible primitives">
                  Components
                </NavigationMenuCard>
              </NavigationMenuGroup>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
        <NavigationMenuActions>
          <NavigationMenuSearch shortcut="⌘K" />
          <NavigationMenuAction intent="primary">Open builder</NavigationMenuAction>
          <NavigationMenuToggle />
        </NavigationMenuActions>
      </NavigationMenuBar>
      <NavigationMenuMobile>
        <NavigationMenuLink href="/docs">Docs</NavigationMenuLink>
      </NavigationMenuMobile>
    </NavigationMenu>
  );
}

describe("NavigationMenu", () => {
  it("renders the navigation landmark, brand, link, search, and primary action", () => {
    render(<ExampleNavigation />);

    expect(screen.getByRole("navigation", { name: "Primary navigation" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Hudbird" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Docs" })).toHaveAttribute("aria-current", "page");
    expect(screen.getByRole("button", { name: "Search" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Open builder" })).toBeInTheDocument();
  });

  it("opens and closes a dropdown while reporting value changes", () => {
    const onValueChange = vi.fn();
    render(<ExampleNavigation onValueChange={onValueChange} />);

    const trigger = screen.getByRole("button", { name: "Products" });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByRole("link", { name: /Components/ })).toBeInTheDocument();
    expect(onValueChange).toHaveBeenLastCalledWith("products");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
    expect(onValueChange).toHaveBeenLastCalledWith(null);
  });

  it("supports a controlled dropdown value", () => {
    const onValueChange = vi.fn();
    const { rerender } = render(
      <NavigationMenu value={null} onValueChange={onValueChange}>
        <NavigationMenuBar>
          <NavigationMenuItem value="company">
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            <NavigationMenuContent>Company links</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuBar>
      </NavigationMenu>
    );

    fireEvent.click(screen.getByRole("button", { name: "Company" }));
    expect(onValueChange).toHaveBeenCalledWith("company");
    expect(screen.queryByText("Company links")).not.toBeInTheDocument();

    rerender(
      <NavigationMenu value="company" onValueChange={onValueChange}>
        <NavigationMenuBar>
          <NavigationMenuItem value="company">
            <NavigationMenuTrigger>Company</NavigationMenuTrigger>
            <NavigationMenuContent>Company links</NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuBar>
      </NavigationMenu>
    );
    expect(screen.getByText("Company links")).toBeInTheDocument();
  });

  it("opens the responsive panel and closes it with Escape", () => {
    render(<ExampleNavigation />);

    const toggle = screen.getByRole("button", { name: "Toggle navigation" });
    fireEvent.click(toggle);
    expect(toggle).toHaveAttribute("aria-expanded", "true");
    expect(document.getElementById("navigation-menu-mobile-panel")).toBeInTheDocument();

    fireEvent.keyDown(screen.getByRole("navigation"), { key: "Escape" });
    expect(toggle).toHaveAttribute("aria-expanded", "false");
  });

  it("places the brand according to the selected logo position", () => {
    const { rerender } = render(
      <NavigationMenu logoPosition="center">
        <NavigationMenuBar>
          <NavigationMenuBrand href="/">Hudbird</NavigationMenuBrand>
        </NavigationMenuBar>
      </NavigationMenu>
    );
    expect(screen.getByRole("link", { name: "Hudbird" })).toHaveClass("col-start-2");

    rerender(
      <NavigationMenu logoPosition="right">
        <NavigationMenuBar>
          <NavigationMenuBrand href="/">Hudbird</NavigationMenuBrand>
        </NavigationMenuBar>
      </NavigationMenu>
    );
    expect(screen.getByRole("link", { name: "Hudbird" })).toHaveClass("col-start-3");
  });

  it("mirrors links and actions when the logo moves to the right", () => {
    render(
      <NavigationMenu logoPosition="right">
        <NavigationMenuBar>
          <NavigationMenuBrand href="/">Hudbird</NavigationMenuBrand>
          <NavigationMenuList data-testid="links" />
          <NavigationMenuActions data-testid="actions" />
        </NavigationMenuBar>
      </NavigationMenu>
    );

    expect(screen.getByTestId("actions")).toHaveClass("col-start-1", "flex-row-reverse");
    expect(screen.getByTestId("links")).toHaveClass("col-start-2", "justify-self-center");
    expect(screen.getByRole("link", { name: "Hudbird" })).toHaveClass("col-start-3");
  });

  it("exposes transparent, glass, and flat surface variants", () => {
    const { rerender } = render(<NavigationMenu surface="transparent" />);
    const navigation = screen.getByRole("navigation");
    expect(navigation).toHaveAttribute("data-surface", "transparent");
    expect(navigation).toHaveClass("bg-transparent");

    rerender(<NavigationMenu surface="flat" />);
    expect(navigation).toHaveAttribute("data-surface", "flat");
    expect(navigation).toHaveClass("bg-background");

    rerender(<NavigationMenu surface="glass" />);
    expect(navigation).toHaveAttribute("data-surface", "glass");
    expect(navigation).toHaveClass("backdrop-blur-xl");
  });

  it("renders mega-menu content in a responsive multi-column group", () => {
    render(
      <NavigationMenu defaultValue="solutions">
        <NavigationMenuBar>
          <NavigationMenuItem value="solutions">
            <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
            <NavigationMenuContent layout="mega">
              <NavigationMenuGroup columns={3} data-testid="mega-grid">
                <NavigationMenuCard href="/startups">Startups</NavigationMenuCard>
                <NavigationMenuCard href="/agencies">Agencies</NavigationMenuCard>
                <NavigationMenuCard href="/teams">Product teams</NavigationMenuCard>
              </NavigationMenuGroup>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuBar>
      </NavigationMenu>
    );

    expect(screen.getByTestId("mega-grid")).toHaveClass("lg:grid-cols-3");
    expect(screen.getByRole("link", { name: "Startups" })).toBeInTheDocument();
  });
});
