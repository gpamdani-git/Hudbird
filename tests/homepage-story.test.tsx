import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { afterEach, expect, it, vi } from "vitest";
import {
  HomepageWorkflow,
  homepageBrief,
} from "../apps/docs/src/components/landing/HomepageWorkflow";
import { HomepageQuestions } from "../apps/docs/src/components/landing/HomepageClosing";
import LandingPage from "../apps/docs/src/pages/LandingPage";
import { navigationData } from "../apps/docs/src/navData";

afterEach(() => vi.unstubAllGlobals());

it("copies the brief and exposes the source workflow through keyboard tabs", async () => {
  const writeText = vi.fn().mockResolvedValue(undefined);
  vi.stubGlobal("navigator", { clipboard: { writeText } });
  render(<HomepageWorkflow />);
  fireEvent.click(screen.getByRole("button", { name: "Copy brief" }));
  await waitFor(() => expect(writeText).toHaveBeenCalledWith(homepageBrief));
  expect(await screen.findByRole("button", { name: "Copied" })).toBeInTheDocument();

  const tabs = screen.getByRole("tablist", { name: "Explore the Hudbird workflow" });
  within(tabs).getByRole("tab", { name: "01 Brief" }).focus();
  fireEvent.keyDown(within(tabs).getByRole("tab", { name: "01 Brief" }), { key: "End" });
  expect(within(tabs).getByRole("tab", { name: "03 Source" })).toHaveAttribute(
    "aria-selected",
    "true"
  );
  fireEvent.click(screen.getByRole("button", { name: "Copy commands" }));
  await waitFor(() =>
    expect(writeText).toHaveBeenLastCalledWith(
      "npx hudbird-ui@latest init\nnpx hudbird-ui@latest add Button"
    )
  );
  expect(screen.getByRole("link", { name: "Read the installation guide" })).toHaveAttribute(
    "href",
    "/#/installation"
  );
});

it("keeps the brief selectable when clipboard access is unavailable", async () => {
  vi.stubGlobal("navigator", {
    clipboard: { writeText: vi.fn().mockRejectedValue(new Error("Denied")) },
  });
  render(<HomepageWorkflow />);
  fireEvent.click(screen.getByRole("button", { name: "Copy brief" }));
  expect(
    await screen.findByText("Copy unavailable. Select and copy the text below.")
  ).toBeInTheDocument();
  expect(screen.getByRole("tabpanel")).toHaveTextContent(
    "Brand: [my name, logo, colors, and font]"
  );
});

it("explains the real no-code and AI boundaries in expandable questions", () => {
  render(<HomepageQuestions />);
  const question = screen.getByRole("button", { name: "Do I need to know how to code?" });
  fireEvent.click(question);
  expect(question).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByText(/you’ll need a React project/)).toBeVisible();
  fireEvent.click(screen.getByRole("button", { name: "How does Hudbird work with AI?" }));
  expect(screen.getByText(/does not generate a site through an AI service/)).toBeVisible();
});

it("renders the full homepage with one main heading and valid documentation destinations", () => {
  render(<LandingPage />);
  expect(screen.getAllByRole("heading", { level: 1 })).toHaveLength(1);
  for (const id of ["hero", "benefits", "builder", "workflow", "questions", "start"]) {
    expect(document.getElementById(id)).not.toBeNull();
  }
  const routes = new Set([
    "/",
    ...navigationData.flatMap((group) => group.items.map((item) => item.path)),
  ]);
  for (const link of screen.getAllByRole("link")) {
    const href = link.getAttribute("href")!;
    if (href.startsWith("/#/"))
      expect(routes.has(href.slice(2)), `Unknown route: ${href}`).toBe(true);
  }
  expect(document.querySelector('video[src*="assembly"]')).toBeNull();
});
