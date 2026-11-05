import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./Table";

describe("Table component suite", () => {
  it("renders table with headers and data rows", () => {
    render(
      <Table>
        <TableCaption>Invoice list</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Invoice</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Amount</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>INV-001</TableCell>
            <TableCell>Paid</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell>$250.00</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    );

    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByText("Invoice list")).toBeInTheDocument();
    expect(screen.getByText("INV-001")).toBeInTheDocument();
    expect(screen.getByText("Paid")).toBeInTheDocument();
    expect(screen.getAllByText("$250.00")).toHaveLength(2);
  });

  it("supports variants and densities", () => {
    const { container, rerender } = render(
      <Table variant="striped" density="compact">
        <TableBody>
          <TableRow isSelected>
            <TableCell>Item 1</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    const row = container.querySelector("tr");
    expect(row).toHaveAttribute("data-selected", "true");

    rerender(
      <Table variant="borderless" density="relaxed">
        <TableBody>
          <TableRow>
            <TableCell>Item 2</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );

    expect(screen.getByText("Item 2")).toBeInTheDocument();
  });
});

describe("Table scroll wrapper", () => {
  it("accepts an accessible, focusable scroll region without moving table attributes", () => {
    render(
      <Table
        aria-label="Demo plans"
        wrapperProps={{ role: "region", tabIndex: 0, "aria-label": "Scrollable plans" }}
      >
        <TableBody>
          <TableRow>
            <TableCell>Plan A</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
    expect(screen.getByRole("region", { name: "Scrollable plans" })).toHaveAttribute(
      "tabindex",
      "0"
    );
    expect(screen.getByRole("table", { name: "Demo plans" })).toBeInTheDocument();
  });
});
