import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { Accordion, AccordionItem } from "./index";

describe("Accordion component", () => {
  it("renders accordion item headers with collapsed aria state", () => {
    render(
      <Accordion>
        <AccordionItem itemKey="1" title="What is Hudbird?">
          Modern React UI library.
        </AccordionItem>
        <AccordionItem itemKey="2" title="How to install?">
          Run pnpm add @hudbird/ui.
        </AccordionItem>
      </Accordion>
    );

    const trigger1 = screen.getByRole("button", { name: /What is Hudbird?/i });
    const trigger2 = screen.getByRole("button", { name: /How to install?/i });

    expect(trigger1).toBeInTheDocument();
    expect(trigger2).toBeInTheDocument();
    expect(trigger1).toHaveAttribute("aria-expanded", "false");
    expect(trigger2).toHaveAttribute("aria-expanded", "false");
  });

  it("toggles aria-expanded when trigger is clicked", () => {
    render(
      <Accordion>
        <AccordionItem itemKey="1" title="Question 1">
          Answer 1
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole("button", { name: /Question 1/i });
    expect(trigger).toHaveAttribute("aria-expanded", "false");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "true");

    fireEvent.click(trigger);
    expect(trigger).toHaveAttribute("aria-expanded", "false");
  });

  it("handles disabled item", () => {
    render(
      <Accordion>
        <AccordionItem itemKey="1" title="Disabled Question" isDisabled>
          Disabled content
        </AccordionItem>
      </Accordion>
    );

    const trigger = screen.getByRole("button", { name: /Disabled Question/i });
    expect(trigger).toBeDisabled();
  });
});
