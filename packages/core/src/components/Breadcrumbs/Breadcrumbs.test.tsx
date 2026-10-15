import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Breadcrumbs, BreadcrumbItem } from "./Breadcrumbs";

describe("Breadcrumbs component", () => {
  it("renders breadcrumb navigation with list items", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem href="/docs">Docs</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Components</BreadcrumbItem>
      </Breadcrumbs>
    );

    const nav = screen.getByRole("navigation", { name: "Breadcrumb" });
    expect(nav).toBeInTheDocument();
    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Docs")).toBeInTheDocument();
    expect(screen.getByText("Components")).toBeInTheDocument();
  });

  it("marks current item with aria-current='page'", () => {
    render(
      <Breadcrumbs>
        <BreadcrumbItem href="/">Home</BreadcrumbItem>
        <BreadcrumbItem isCurrent>Dashboard</BreadcrumbItem>
      </Breadcrumbs>
    );

    const currentItem = screen.getByText("Dashboard").closest("li");
    expect(currentItem).toHaveAttribute("aria-current", "page");
  });

  it("handles click and onPress handlers", () => {
    const handlePress = vi.fn();
    render(
      <Breadcrumbs>
        <BreadcrumbItem onPress={handlePress}>Settings</BreadcrumbItem>
      </Breadcrumbs>
    );

    fireEvent.click(screen.getByText("Settings"));
    expect(handlePress).toHaveBeenCalled();
  });

  it("collapses items when maxItems is specified", () => {
    render(
      <Breadcrumbs maxItems={3}>
        <BreadcrumbItem href="/1">1</BreadcrumbItem>
        <BreadcrumbItem href="/2">2</BreadcrumbItem>
        <BreadcrumbItem href="/3">3</BreadcrumbItem>
        <BreadcrumbItem href="/4">4</BreadcrumbItem>
        <BreadcrumbItem isCurrent>5</BreadcrumbItem>
      </Breadcrumbs>
    );

    expect(screen.getByText("1")).toBeInTheDocument();
    expect(screen.getByText("5")).toBeInTheDocument();
    expect(screen.queryByText("3")).not.toBeInTheDocument();
  });
});
