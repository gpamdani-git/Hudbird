import React from "react";
import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { InfiniteScroll } from "./InfiniteScroll";

describe("InfiniteScroll component", () => {
  it("renders children and loader when hasMore is true", () => {
    const handleNext = vi.fn();
    render(
      <InfiniteScroll hasMore={true} next={handleNext} loader={<div>Loading more posts...</div>}>
        <div>Item 1</div>
        <div>Item 2</div>
      </InfiniteScroll>
    );

    expect(screen.getByText("Item 1")).toBeInTheDocument();
    expect(screen.getByText("Item 2")).toBeInTheDocument();
    expect(screen.getByText("Loading more posts...")).toBeInTheDocument();
  });

  it("renders endMessage when hasMore is false", () => {
    const handleNext = vi.fn();
    render(
      <InfiniteScroll
        hasMore={false}
        next={handleNext}
        endMessage={<div>You have reached the end.</div>}
      >
        <div>Item A</div>
      </InfiniteScroll>
    );

    expect(screen.getByText("Item A")).toBeInTheDocument();
    expect(screen.getByText("You have reached the end.")).toBeInTheDocument();
  });
});
