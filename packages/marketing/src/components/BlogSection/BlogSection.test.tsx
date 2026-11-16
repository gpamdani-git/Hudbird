import React from "react";
import { describe, expect, it, vi } from "vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { BlogIndexSection } from "./BlogIndexSection";
import { BlogPostSection } from "./BlogPostSection";
import { DEFAULT_BLOG_POSTS } from "./data";
import { WebsiteProjectPage } from "../WebsiteProject/WebsiteProject";
import {
  addWebsitePage,
  createWebsiteProject,
  parseWebsiteProject,
} from "../WebsiteProject/config";

describe("BlogSection", () => {
  it("renders all 3 static articles on the Blog Index page with Pexels images and underline Tabs filtering", async () => {
    const onSelectPost = vi.fn();
    const { container } = render(<BlogIndexSection onSelectPost={onSelectPost} />);

    for (const post of DEFAULT_BLOG_POSTS) {
      expect(screen.getByText(post.title)).toBeInTheDocument();
    }

    const images = Array.from(container.querySelectorAll("img.hb-blog-media-img"));
    expect(images.length).toBe(3);
    for (const img of images) {
      expect(img).toHaveAttribute("src", expect.stringContaining("images.pexels.com"));
    }

    // Filter using underline category tab
    fireEvent.click(screen.getByRole("tab", { name: "Motion" }));
    await waitFor(() => {
      expect(screen.queryByText(DEFAULT_BLOG_POSTS[0].title)).not.toBeInTheDocument();
    });
    expect(screen.getByText(DEFAULT_BLOG_POSTS[1].title)).toBeInTheDocument();

    // Switch back to All & search by keyword
    fireEvent.click(screen.getByRole("tab", { name: "All" }));
    await waitFor(() => {
      expect(screen.getByText(DEFAULT_BLOG_POSTS[0].title)).toBeInTheDocument();
    });

    const searchInput = screen.getByRole("searchbox", { name: /Search blog articles/i });
    fireEvent.change(searchInput, { target: { value: "Multi-Page Schemas" } });
    await waitFor(() => {
      expect(screen.queryByText(DEFAULT_BLOG_POSTS[0].title)).not.toBeInTheDocument();
      expect(screen.getByText(DEFAULT_BLOG_POSTS[2].title)).toBeInTheDocument();
    });

    // Aligns header and sections within the shared max-w-6xl container
    expect(container.querySelector(".max-w-6xl")).toBeInTheDocument();

    // Clicking article triggers selection callback
    fireEvent.click(screen.getByRole("button", { name: "Read" }));
    expect(onSelectPost).toHaveBeenCalledWith(DEFAULT_BLOG_POSTS[2].slug);
  });

  it("renders Single Post with quote, code snippet, TOC, Share copy feedback, Related Posts, and interactive Comments", async () => {
    const onSelectPost = vi.fn();
    const onBackToBlog = vi.fn();
    render(
      <BlogPostSection
        postSlug={DEFAULT_BLOG_POSTS[0].slug}
        onSelectPost={onSelectPost}
        onBackToBlog={onBackToBlog}
      />
    );

    expect(
      screen.getByRole("heading", { level: 1, name: DEFAULT_BLOG_POSTS[0].title })
    ).toBeInTheDocument();

    // Reading progress bar & editorial quote & code snippet
    expect(screen.getByRole("progressbar", { name: /Reading progress/i })).toBeInTheDocument();
    expect(
      screen.getByText(
        /recalc styles inside the browser engine, never re-run JavaScript component trees/i
      )
    ).toBeInTheDocument();
    expect(screen.getByText("packages/theme/tokens.css")).toBeInTheDocument();

    // Share copy button feedback
    fireEvent.click(screen.getByRole("button", { name: /Share article/i }));
    await waitFor(() => {
      expect(screen.getByRole("button", { name: /Link copied/i })).toBeInTheDocument();
    });

    // Related posts section & sequence stepper
    expect(screen.getByRole("heading", { level: 2, name: "Related articles" })).toBeInTheDocument();
    expect(screen.getAllByText(DEFAULT_BLOG_POSTS[1].title).length).toBeGreaterThanOrEqual(1);

    // Interactive comments: upvote/helpful toggle
    const helpfulButtons = screen.getAllByRole("button", { name: /Helpful \(/i });
    expect(helpfulButtons[0]).toHaveAttribute("aria-pressed", "false");
    fireEvent.click(helpfulButtons[0]);
    expect(helpfulButtons[0]).toHaveAttribute("aria-pressed", "true");

    // Submit empty comment validation
    fireEvent.click(screen.getByRole("button", { name: "Post comment" }));
    expect(screen.getByRole("alert")).toHaveTextContent(
      /Please enter both your name and a comment/i
    );

    // Submit valid comment
    fireEvent.change(screen.getByLabelText("Name"), { target: { value: "Bima Santoso" } });
    fireEvent.change(screen.getByLabelText("Comment"), {
      target: { value: "CSS custom properties also improved our SSR hydration timings." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Post comment" }));

    expect(screen.getByText("Bima Santoso")).toBeInTheDocument();
    expect(
      screen.getByText("CSS custom properties also improved our SSR hydration timings.")
    ).toBeInTheDocument();

    // Reply flow on first comment
    const replyButtons = screen.getAllByRole("button", { name: "Reply" });
    fireEvent.click(replyButtons[0]);
    fireEvent.change(screen.getByLabelText("Your name"), { target: { value: "Siti Rahma" } });
    fireEvent.change(screen.getByLabelText(/Reply to Bima Santoso/i), {
      target: { value: "Confirmed the same result with Vite builds." },
    });
    fireEvent.click(screen.getByRole("button", { name: "Send reply" }));
    await waitFor(() => {
      expect(screen.getByText("Siti Rahma")).toBeInTheDocument();
      expect(screen.getByText("Confirmed the same result with Vite builds.")).toBeInTheDocument();
    });

    // Related posts section uses real semantic links & sequence stepper
    expect(screen.getByRole("heading", { level: 2, name: "Related articles" })).toBeInTheDocument();
    const relatedTitleLink = screen.getByRole("link", { name: DEFAULT_BLOG_POSTS[1].title });
    expect(relatedTitleLink).toHaveAttribute("href", `#${DEFAULT_BLOG_POSTS[1].slug}`);
    const relatedReadLink = screen.getByRole("link", {
      name: `Read ${DEFAULT_BLOG_POSTS[1].title}`,
    });
    expect(relatedReadLink).toHaveAttribute("href", `#${DEFAULT_BLOG_POSTS[1].slug}`);

    // Back to blog navigation
    fireEvent.click(screen.getByRole("button", { name: "Back to Blog" }));
    expect(onBackToBlog).toHaveBeenCalledTimes(1);

    // Clicking a Related Article switches post cleanly even in standalone uncontrolled mode
    fireEvent.click(relatedReadLink);
    expect(onSelectPost).toHaveBeenCalledWith(DEFAULT_BLOG_POSTS[1].slug);
    expect(
      screen.getByRole("heading", { level: 1, name: DEFAULT_BLOG_POSTS[1].title })
    ).toBeInTheDocument();
  });

  it("aligns Single Post header within shared max-w-6xl container and switches posts cleanly without onSelectPost prop", () => {
    const { container } = render(<BlogPostSection postSlug={DEFAULT_BLOG_POSTS[0].slug} />);
    expect(container.querySelector(".max-w-6xl")).toBeInTheDocument();
    expect(container.querySelector("header")?.className).toContain("w-full");

    const scrollToSpy = vi.fn();
    window.scrollTo = scrollToSpy;

    const targetTitleLink = screen.getByRole("link", { name: DEFAULT_BLOG_POSTS[2].title });
    fireEvent.click(targetTitleLink);

    expect(
      screen.getByRole("heading", { level: 1, name: DEFAULT_BLOG_POSTS[2].title })
    ).toBeInTheDocument();
  });

  it("integrates Blog and Single Post templates cleanly inside WebsiteProject", () => {
    let project = addWebsitePage(createWebsiteProject(), "blog", "blog-main");
    project = addWebsitePage(project, "blog-post", "blog-single");
    expect(project.pages.map((p) => p.path)).toEqual(["/", "/blog", "/blog/post"]);
    expect(parseWebsiteProject(JSON.parse(JSON.stringify(project)))).toBeDefined();

    const onNavigate = vi.fn();
    render(<WebsiteProjectPage project={project} pageId="blog-main" onNavigate={onNavigate} />);

    fireEvent.click(
      screen.getByRole("button", {
        name: `Read featured article: ${DEFAULT_BLOG_POSTS[0].title}`,
      })
    );
    expect(onNavigate).toHaveBeenCalledWith("blog-single");
  });
});
