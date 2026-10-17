import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { EditorialImage } from "./EditorialImage";

describe("EditorialImage", () => {
  it("renders image with alt text and optical classes", () => {
    render(
      <EditorialImage
        src="https://example.com/photo.jpg"
        alt="Studio Project Showcase"
        captionTitle="Project Alpha"
      />
    );
    const img = screen.getByAltText("Studio Project Showcase");
    expect(img).toBeInTheDocument();
    expect(screen.getByText("Project Alpha")).toBeInTheDocument();
  });
});
