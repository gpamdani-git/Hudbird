"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Calendar,
  Check,
  ChevronDown,
  Clock,
  Heart,
  ListTree,
  MessageSquare,
  Share2,
} from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Container,
  Heading,
  Input,
  Section,
  Text,
  Textarea,
} from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { ABOUT_EASE_OUT } from "../AboutUsSection/shared";
import {
  countAllComments,
  DEFAULT_BLOG_POSTS,
  getBlogPostBySlug,
  getRelatedBlogPosts,
  scrollBlogRootToTop,
  type BlogComment,
  type BlogPost,
} from "./data";
import "./blog-section.css";

export interface BlogPostSectionProps {
  id?: string;
  postSlug?: string;
  posts?: BlogPost[];
  title?: string;
  summary?: string;
  coverImage?: Partial<BlogPost["coverImage"]>;
  onSelectPost?: (slug: string) => void;
  onBackToBlog?: () => void;
  className?: string;
}

export function BlogPostSection({
  id = "blog-post",
  postSlug,
  posts = DEFAULT_BLOG_POSTS,
  title,
  summary,
  coverImage,
  onSelectPost,
  onBackToBlog,
  className,
}: BlogPostSectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const articleRootRef = React.useRef<HTMLDivElement>(null);

  const revealInitial = (y: number, scale = 1) =>
    prefersReducedMotion ? false : { opacity: 0, y, scale };
  const revealTarget = { opacity: 1, y: 0, scale: 1 };

  const [internalSlug, setInternalSlug] = React.useState<string>(
    () => postSlug ?? posts[0]?.slug ?? ""
  );

  React.useEffect(() => {
    if (postSlug) {
      setInternalSlug(postSlug);
    }
  }, [postSlug]);

  const resolvedSlug = internalSlug || postSlug;
  const basePost = React.useMemo(
    () => getBlogPostBySlug(resolvedSlug, posts),
    [resolvedSlug, posts]
  );
  const post = React.useMemo(
    () =>
      coverImage?.src || coverImage?.alt || coverImage?.caption
        ? { ...basePost, coverImage: { ...basePost.coverImage, ...coverImage } }
        : basePost,
    [basePost, coverImage]
  );
  const postIndex = React.useMemo(
    () => posts.findIndex((p) => p.slug === post.slug),
    [posts, post.slug]
  );
  const previousPost = postIndex > 0 ? posts[postIndex - 1] : null;
  const nextPost = postIndex >= 0 && postIndex < posts.length - 1 ? posts[postIndex + 1] : null;
  const relatedPosts = React.useMemo(
    () => getRelatedBlogPosts(post.slug, posts, 2),
    [post.slug, posts]
  );

  const [readingProgress, setReadingProgress] = React.useState(0);
  const [copiedUrl, setCopiedUrl] = React.useState(false);
  const [mobileTocOpen, setMobileTocOpen] = React.useState(false);

  // Per-article comment state preserved across post switches
  const [commentsBySlug, setCommentsBySlug] = React.useState<Record<string, BlogComment[]>>({});
  const [commentAuthor, setCommentAuthor] = React.useState("");
  const [commentBody, setCommentBody] = React.useState("");
  const [commentError, setCommentError] = React.useState<string | null>(null);

  // Inline reply state
  const [replyingToId, setReplyingToId] = React.useState<string | null>(null);
  const [replyAuthor, setReplyAuthor] = React.useState("");
  const [replyBody, setReplyBody] = React.useState("");
  const [replyError, setReplyError] = React.useState<string | null>(null);

  const activeComments = commentsBySlug[post.slug] ?? post.initialComments;
  const totalCommentCount = countAllComments(activeComments);

  React.useEffect(() => {
    setReplyingToId(null);
    setCommentError(null);
    setReplyError(null);
    setCopiedUrl(false);
  }, [post.slug]);

  React.useEffect(() => {
    let rafId = 0;
    const ownerWin = articleRootRef.current?.ownerDocument?.defaultView ?? window;
    let hostParentWin: Window | null = null;
    try {
      if (ownerWin.parent && ownerWin.parent !== ownerWin) {
        hostParentWin = ownerWin.parent;
      }
    } catch {
      hostParentWin = null;
    }

    const updateProgress = () => {
      rafId = 0;
      const el = articleRootRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      let offsetTop = rect.top;
      let viewportHeight = ownerWin.innerHeight || 800;

      if (hostParentWin) {
        try {
          const hostFrame = Array.from(hostParentWin.document.querySelectorAll("iframe")).find(
            (frame) => frame.contentWindow === ownerWin
          );
          if (hostFrame) {
            offsetTop += hostFrame.getBoundingClientRect().top;
            viewportHeight = hostParentWin.innerHeight || viewportHeight;
          }
        } catch {
          // Cross-origin frame access ignored
        }
      }

      const totalScrollable = Math.max(rect.height - viewportHeight * 0.65, 1);
      const passed = Math.max(0, -offsetTop + 96);
      const ratio = Math.min(1, Math.max(0, passed / totalScrollable));
      setReadingProgress(ratio);
    };

    const onScroll = () => {
      if (!rafId) {
        rafId = ownerWin.requestAnimationFrame(updateProgress);
      }
    };

    updateProgress();
    ownerWin.addEventListener("scroll", onScroll, { passive: true });
    ownerWin.addEventListener("resize", onScroll, { passive: true });
    hostParentWin?.addEventListener("scroll", onScroll, { passive: true });
    hostParentWin?.addEventListener("resize", onScroll, { passive: true });
    return () => {
      if (rafId) ownerWin.cancelAnimationFrame(rafId);
      ownerWin.removeEventListener("scroll", onScroll);
      ownerWin.removeEventListener("resize", onScroll);
      hostParentWin?.removeEventListener("scroll", onScroll);
      hostParentWin?.removeEventListener("resize", onScroll);
    };
  }, [post.slug]);

  const handleCopyShareLink = async () => {
    const shareUrl =
      typeof window !== "undefined"
        ? `${window.location.origin}${window.location.pathname}#blog/${post.slug}`
        : "";
    try {
      if (typeof navigator !== "undefined" && navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(shareUrl);
      }
    } catch {
      // Fallback gracefully when clipboard permissions are restricted
    }
    setCopiedUrl(true);
    window.setTimeout(() => setCopiedUrl(false), 2200);
  };

  const handleAddComment = (event: React.FormEvent) => {
    event.preventDefault();
    const author = commentAuthor.trim();
    const body = commentBody.trim();
    if (!author || !body) {
      setCommentError("Please enter both your name and a comment before submitting.");
      return;
    }
    const newComment: BlogComment = {
      id: `comment-${Date.now()}`,
      author,
      role: "Reader",
      timestamp: "Just now",
      body,
      likes: 0,
      likedByViewer: false,
      replies: [],
    };
    setCommentsBySlug((prev) => ({
      ...prev,
      [post.slug]: [newComment, ...(prev[post.slug] ?? post.initialComments)],
    }));
    setCommentAuthor("");
    setCommentBody("");
    setCommentError(null);
  };

  const handleToggleLike = (targetId: string) => {
    setCommentsBySlug((prev) => {
      const currentList = prev[post.slug] ?? post.initialComments;
      const updateNode = (list: BlogComment[]): BlogComment[] =>
        list.map((item) => {
          if (item.id === targetId) {
            const nextLiked = !item.likedByViewer;
            return {
              ...item,
              likedByViewer: nextLiked,
              likes: Math.max(0, item.likes + (nextLiked ? 1 : -1)),
            };
          }
          if (item.replies?.length) {
            return { ...item, replies: updateNode(item.replies) };
          }
          return item;
        });
      return { ...prev, [post.slug]: updateNode(currentList) };
    });
  };

  const handleSubmitReply = (parentId: string, event: React.FormEvent) => {
    event.preventDefault();
    const author = replyAuthor.trim();
    const body = replyBody.trim();
    if (!author || !body) {
      setReplyError("Please fill in your name and reply message.");
      return;
    }
    const newReply: BlogComment = {
      id: `reply-${Date.now()}`,
      author,
      role: "Community",
      timestamp: "Just now",
      body,
      likes: 0,
      likedByViewer: false,
    };
    setCommentsBySlug((prev) => {
      const currentList = prev[post.slug] ?? post.initialComments;
      const updated = currentList.map((item) =>
        item.id === parentId ? { ...item, replies: [...(item.replies ?? []), newReply] } : item
      );
      return { ...prev, [post.slug]: updated };
    });
    setReplyAuthor("");
    setReplyBody("");
    setReplyError(null);
    setReplyingToId(null);
  };

  const handleJumpToSection = (sectionId: string) => {
    const doc = articleRootRef.current?.ownerDocument ?? document;
    const el = doc.getElementById(sectionId);
    if (el) {
      el.scrollIntoView?.({ behavior: prefersReducedMotion ? "auto" : "smooth", block: "start" });
    }
    setMobileTocOpen(false);
  };

  const handleSelectArticle = (slug: string) => {
    setInternalSlug(slug);
    setReadingProgress(0);
    setMobileTocOpen(false);
    onSelectPost?.(slug);
    const behavior: ScrollBehavior = prefersReducedMotion ? "auto" : "smooth";
    const ownerWin = articleRootRef.current?.ownerDocument?.defaultView;
    if (ownerWin?.requestAnimationFrame) {
      ownerWin.requestAnimationFrame(() => {
        scrollBlogRootToTop(articleRootRef.current, behavior);
      });
    } else {
      scrollBlogRootToTop(articleRootRef.current, behavior);
    }
  };

  const handleBack = () => {
    scrollBlogRootToTop(articleRootRef.current, prefersReducedMotion ? "auto" : "smooth");
    onBackToBlog?.();
  };

  return (
    <div ref={articleRootRef} data-landing-section="blog-post" className="relative w-full">
      {/* Scroll Reading Progress Bar */}
      <div
        role="progressbar"
        aria-label="Reading progress"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(readingProgress * 100)}
        className="sticky top-0 z-30 h-[3px] w-full overflow-hidden bg-zinc-200/70 dark:bg-zinc-800/80"
      >
        <div
          className="hb-blog-progress-fill h-full w-full bg-zinc-900 dark:bg-white"
          style={{ transform: `scaleX(${readingProgress})` }}
        />
      </div>

      <Section
        id={id}
        spacing="none"
        className={cn(
          "hb-blog-section bg-background text-foreground pt-6 pb-16 sm:pt-10 sm:pb-24",
          className
        )}
      >
        <Container size="xl" gutter="lg">
          <div className="mx-auto w-full max-w-6xl">
            {/* Top Utility Bar: Back to Blog & Share Link */}
            <motion.div
              initial={revealInitial(8)}
              animate={revealTarget}
              transition={{ duration: 0.3, ease: ABOUT_EASE_OUT }}
              className="mb-6 flex flex-wrap items-center justify-between gap-3 sm:mb-8"
            >
              <Button
                type="button"
                variant="plain"
                size="md"
                className="hb-blog-btn-tap -ml-2 min-h-11 gap-2 px-3 text-zinc-600 hover:text-zinc-950 dark:text-zinc-400 dark:hover:text-white"
                onClick={handleBack}
              >
                <ArrowLeft className="h-4 w-4" aria-hidden="true" />
                <span>Back to Blog</span>
              </Button>

              <Button
                type="button"
                variant="outline"
                size="md"
                onClick={handleCopyShareLink}
                className="hb-blog-btn-tap min-h-11 gap-2"
              >
                {copiedUrl ? (
                  <>
                    <Check
                      className="h-4 w-4 text-emerald-600 dark:text-emerald-400"
                      aria-hidden="true"
                    />
                    <span>Link copied</span>
                  </>
                ) : (
                  <>
                    <Share2 className="h-4 w-4" aria-hidden="true" />
                    <span>Share article</span>
                  </>
                )}
              </Button>
            </motion.div>

            {/* Editorial Article Header */}
            <motion.header
              initial={revealInitial(12)}
              animate={revealTarget}
              transition={{ duration: 0.38, delay: 0.03, ease: ABOUT_EASE_OUT }}
              className="w-full"
            >
              <div className="flex flex-wrap items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
                <Badge variant="modern" size="md" className="font-medium">
                  {post.category}
                </Badge>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{post.publishedAt}</span>
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>{post.readTime}</span>
                </span>
              </div>

              <Heading
                as="h1"
                size="inherit"
                data-hb-node="heading"
                data-hb-edit="blog-post:title"
                className="text-foreground mt-4 text-[clamp(1.85rem,3.6vw,3.35rem)] leading-[1.1] font-semibold tracking-[-0.03em]"
              >
                {title ?? post.title}
              </Heading>

              <Text
                variant="muted"
                data-hb-node="text"
                data-hb-edit="blog-post:summary"
                className="mt-4 w-full text-base leading-relaxed sm:text-lg"
              >
                {summary ?? post.summary}
              </Text>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-y border-zinc-200/80 py-4 dark:border-white/[0.08]">
                <div className="flex items-center gap-3">
                  <Avatar
                    src={post.author.avatar}
                    name={post.author.name}
                    alt={post.author.name}
                    size="md"
                  />
                  <div>
                    <p className="text-foreground text-sm font-semibold">{post.author.name}</p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">{post.author.role}</p>
                  </div>
                </div>

                <Button
                  type="button"
                  variant="plain"
                  size="sm"
                  className="hb-blog-btn-tap min-h-11 gap-1.5 px-3 text-xs text-zinc-600 dark:text-zinc-300"
                  onClick={() => handleJumpToSection("post-comments")}
                >
                  <MessageSquare className="h-4 w-4" aria-hidden="true" />
                  <span>
                    {totalCommentCount} {totalCommentCount === 1 ? "comment" : "comments"}
                  </span>
                </Button>
              </div>
            </motion.header>

            {/* Primary Editorial Cover Photograph (Monochrome -> Color on Hover) */}
            <motion.figure
              initial={revealInitial(16, 0.99)}
              animate={revealTarget}
              transition={{ duration: 0.44, delay: 0.08, ease: ABOUT_EASE_OUT }}
              className="mt-8 sm:mt-10"
            >
              <div
                data-hb-node="media"
                data-hb-edit="blog-post:coverImage.src"
                data-hb-edit-mode="popover"
                className="hb-blog-media-frame relative aspect-[16/9] w-full overflow-hidden rounded-2xl bg-zinc-100 sm:rounded-[28px] dark:bg-zinc-900"
              >
                <img
                  src={post.coverImage.src}
                  alt={post.coverImage.alt}
                  fetchPriority="high"
                  className="hb-blog-media-img h-full w-full object-cover"
                />
              </div>
              {post.coverImage.caption && (
                <figcaption className="mt-3 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {post.coverImage.caption}
                </figcaption>
              )}
            </motion.figure>

            {/* Mobile Collapsible Table of Contents (< md) */}
            <div className="mt-8 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-4 md:hidden dark:border-white/10 dark:bg-zinc-900/40">
              <button
                type="button"
                aria-expanded={mobileTocOpen}
                onClick={() => setMobileTocOpen((prev) => !prev)}
                className="flex min-h-11 w-full cursor-pointer items-center justify-between gap-3 text-left text-sm font-semibold"
              >
                <span className="inline-flex items-center gap-2">
                  <ListTree className="h-4 w-4 text-zinc-500" aria-hidden="true" />
                  <span>On this page</span>
                </span>
                <ChevronDown
                  className={cn(
                    "h-4 w-4 text-zinc-500 transition-transform duration-200",
                    mobileTocOpen && "rotate-180"
                  )}
                  aria-hidden="true"
                />
              </button>

              {mobileTocOpen && (
                <nav
                  aria-label="Article table of contents"
                  className="mt-2 border-t border-zinc-200/70 pt-2 dark:border-white/[0.08]"
                >
                  <ul className="space-y-1">
                    {post.sections.map((section) => (
                      <li key={section.id}>
                        <button
                          type="button"
                          onClick={() => handleJumpToSection(section.id)}
                          className="min-h-11 w-full cursor-pointer rounded-lg px-2 py-2 text-left text-sm text-zinc-600 hover:bg-zinc-200/60 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-white/10 dark:hover:text-white"
                        >
                          {section.heading}
                        </button>
                      </li>
                    ))}
                  </ul>
                </nav>
              )}
            </div>

            {/* 12-Col Editorial Reader Body + Sticky Desktop Rail */}
            <div className="mt-8 grid grid-cols-1 gap-8 md:mt-12 md:grid-cols-12 md:gap-10 lg:mt-14 lg:gap-12">
              {/* Sticky Desktop Rail */}
              <aside className="hidden md:col-span-4 md:block">
                <div className="sticky top-12 space-y-8">
                  <div>
                    <Heading
                      as="h2"
                      size="inherit"
                      className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
                    >
                      On this page
                    </Heading>
                    <nav aria-label="Article outline" className="mt-3">
                      <ul className="space-y-1 border-l border-zinc-200 dark:border-white/10">
                        {post.sections.map((section) => (
                          <li key={section.id}>
                            <button
                              type="button"
                              onClick={() => handleJumpToSection(section.id)}
                              className="-ml-px block min-h-10 w-full cursor-pointer border-l-2 border-transparent py-2 pl-4 text-left text-sm leading-snug text-zinc-600 transition-colors hover:border-zinc-900 hover:text-zinc-950 dark:text-zinc-400 dark:hover:border-white dark:hover:text-white"
                            >
                              {section.heading}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </nav>
                  </div>

                  <div>
                    <Heading
                      as="h2"
                      size="inherit"
                      className="text-xs font-semibold tracking-wider text-zinc-500 uppercase dark:text-zinc-400"
                    >
                      Topics
                    </Heading>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {post.tags.map((tag) => (
                        <Badge key={tag} variant="flat" size="sm">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </aside>

              {/* Editorial Article Content */}
              <article className="space-y-10 md:col-span-8">
                {post.sections.map((section) => (
                  <section key={section.id} id={section.id} className="scroll-mt-24 space-y-5">
                    <Heading
                      as="h2"
                      size="inherit"
                      className="text-foreground text-2xl leading-snug font-semibold tracking-[-0.025em] sm:text-[1.75rem]"
                    >
                      {section.heading}
                    </Heading>

                    {section.paragraphs.map((paragraph, pIdx) => (
                      <p
                        key={pIdx}
                        className="text-base leading-[1.78] text-zinc-700 sm:text-[1.0625rem] dark:text-zinc-300"
                      >
                        {paragraph}
                      </p>
                    ))}

                    {section.quote && (
                      <blockquote className="my-7 border-l-2 border-zinc-900 bg-zinc-50/70 py-4 pr-5 pl-6 dark:border-white dark:bg-zinc-900/40">
                        <p className="text-foreground text-lg leading-relaxed font-medium sm:text-xl">
                          &ldquo;{section.quote.text}&rdquo;
                        </p>
                        <footer className="mt-2.5 text-xs font-medium tracking-wide text-zinc-500 dark:text-zinc-400">
                          {section.quote.attribution}
                        </footer>
                      </blockquote>
                    )}

                    {section.codeSnippet && (
                      <div className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-zinc-950 text-zinc-100 dark:border-white/10">
                        <div className="flex items-center justify-between border-b border-white/10 px-4 py-2.5 text-xs text-zinc-400">
                          <span className="font-mono">{section.codeSnippet.filename}</span>
                          <span className="uppercase">{section.codeSnippet.language}</span>
                        </div>
                        <pre className="overflow-x-auto p-4 font-mono text-xs leading-relaxed sm:p-5 sm:text-[13px]">
                          <code>{section.codeSnippet.code}</code>
                        </pre>
                      </div>
                    )}

                    {section.image && (
                      <figure className="my-7">
                        <div className="hb-blog-media-frame aspect-[16/10] w-full overflow-hidden rounded-2xl bg-zinc-100 dark:bg-zinc-900">
                          <img
                            src={section.image.src}
                            alt={section.image.alt}
                            className="hb-blog-media-img h-full w-full object-cover"
                          />
                        </div>
                        <figcaption className="mt-2.5 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                          {section.image.caption}
                        </figcaption>
                      </figure>
                    )}
                  </section>
                ))}

                {/* Author Bio Card */}
                <div className="rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-6 sm:p-7 dark:border-white/10 dark:bg-zinc-900/40">
                  <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                    <Avatar
                      src={post.author.avatar}
                      name={post.author.name}
                      alt={post.author.name}
                      size="lg"
                    />
                    <div className="space-y-1">
                      <Heading as="h3" size="inherit" className="text-base font-semibold">
                        Written by {post.author.name}
                      </Heading>
                      <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                        {post.author.role}
                      </p>
                      <Text variant="muted" className="pt-1 text-sm leading-relaxed">
                        {post.author.bio}
                      </Text>
                    </div>
                  </div>
                </div>

                {/* Previous / Next Post Stepper */}
                {(previousPost || nextPost) && (
                  <nav
                    aria-label="Article sequence navigation"
                    className="grid grid-cols-1 gap-4 border-t border-zinc-200/80 pt-8 sm:grid-cols-2 dark:border-white/[0.08]"
                  >
                    {previousPost ? (
                      <a
                        href={`#${previousPost.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectArticle(previousPost.slug);
                        }}
                        className="hb-blog-card-interactive flex min-h-11 cursor-pointer flex-col items-start rounded-2xl border border-zinc-200/80 bg-white p-4 text-left no-underline hover:border-zinc-400 dark:border-white/10 dark:bg-[#141416] dark:hover:border-white/25"
                      >
                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <ArrowLeft className="h-3.5 w-3.5" aria-hidden="true" />
                          <span>Previous article</span>
                        </span>
                        <span className="text-foreground mt-1.5 line-clamp-2 text-sm font-semibold">
                          {previousPost.title}
                        </span>
                      </a>
                    ) : (
                      <div className="hidden sm:block" />
                    )}

                    {nextPost && (
                      <a
                        href={`#${nextPost.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectArticle(nextPost.slug);
                        }}
                        className="hb-blog-card-interactive flex min-h-11 cursor-pointer flex-col items-end rounded-2xl border border-zinc-200/80 bg-white p-4 text-right no-underline hover:border-zinc-400 dark:border-white/10 dark:bg-[#141416] dark:hover:border-white/25"
                      >
                        <span className="inline-flex items-center gap-1.5 text-xs text-zinc-500 dark:text-zinc-400">
                          <span>Next article</span>
                          <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span className="text-foreground mt-1.5 line-clamp-2 text-sm font-semibold">
                          {nextPost.title}
                        </span>
                      </a>
                    )}
                  </nav>
                )}
              </article>
            </div>

            {/* Related Posts Section */}
            {relatedPosts.length > 0 && (
              <section
                id="related-posts"
                aria-labelledby="related-posts-heading"
                className="mt-16 border-t border-zinc-200/80 pt-12 sm:mt-20 sm:pt-14 dark:border-white/[0.08]"
              >
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <Heading
                      as="h2"
                      id="related-posts-heading"
                      size="inherit"
                      className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
                    >
                      Related articles
                    </Heading>
                    <Text variant="muted" className="mt-1 text-sm">
                      Continue reading engineering notes from the Hudbird UI team.
                    </Text>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    className="hb-blog-btn-tap min-h-11 px-4"
                    onClick={handleBack}
                  >
                    <span>View all articles</span>
                  </Button>
                </div>

                <div className="mt-7 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                  {relatedPosts.map((rel) => (
                    <article
                      key={rel.slug}
                      className="hb-blog-media-card hb-blog-card-interactive group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white dark:border-white/10 dark:bg-[#141416]"
                    >
                      <a
                        href={`#${rel.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleSelectArticle(rel.slug);
                        }}
                        aria-label={`Read related article: ${rel.title}`}
                        className="hb-blog-media-frame block aspect-[16/10] w-full cursor-pointer overflow-hidden bg-zinc-100 text-left dark:bg-zinc-900"
                      >
                        <img
                          src={rel.coverImage.src}
                          alt={rel.coverImage.alt}
                          className="hb-blog-media-img h-full w-full object-cover"
                        />
                      </a>

                      <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                        <div>
                          <div className="flex items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                            <Badge variant="modern" size="sm">
                              {rel.category}
                            </Badge>
                            <span>{rel.readTime}</span>
                          </div>
                          <Heading
                            as="h3"
                            size="inherit"
                            className="text-foreground mt-3 text-lg font-semibold tracking-[-0.02em] sm:text-xl"
                          >
                            <a
                              href={`#${rel.slug}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handleSelectArticle(rel.slug);
                              }}
                              className="text-foreground block cursor-pointer text-left no-underline hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                            >
                              {rel.title}
                            </a>
                          </Heading>
                        </div>

                        <div className="mt-5 flex items-center justify-between border-t border-zinc-200/70 pt-4 dark:border-white/[0.08]">
                          <span className="text-xs font-medium text-zinc-600 dark:text-zinc-300">
                            {rel.author.name}
                          </span>
                          <Button
                            href={`#${rel.slug}`}
                            variant="plain"
                            size="sm"
                            aria-label={`Read ${rel.title}`}
                            className="hb-blog-btn-tap min-h-11 px-3 no-underline"
                            onClick={(e) => {
                              e.preventDefault();
                              handleSelectArticle(rel.slug);
                            }}
                          >
                            <span>Read</span>
                            <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                          </Button>
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </section>
            )}

            {/* Interactive Comments Section */}
            <section
              id="post-comments"
              aria-labelledby="comments-heading"
              className="mt-16 border-t border-zinc-200/80 pt-12 sm:mt-20 sm:pt-14 dark:border-white/[0.08]"
            >
              <div className="w-full">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <Heading
                    as="h2"
                    id="comments-heading"
                    size="inherit"
                    className="text-2xl font-semibold tracking-[-0.025em] sm:text-3xl"
                  >
                    Discussion ({totalCommentCount})
                  </Heading>
                  <Text variant="muted" className="text-sm">
                    Ask a question or leave implementation feedback.
                  </Text>
                </div>

                {/* New Comment Form */}
                <form
                  onSubmit={handleAddComment}
                  noValidate
                  className="mt-6 space-y-4 rounded-2xl border border-zinc-200/80 bg-zinc-50/70 p-5 sm:p-6 dark:border-white/10 dark:bg-zinc-900/40"
                >
                  <Input
                    id="blog-comment-author"
                    label="Name"
                    aria-label="Name"
                    variant="bordered"
                    value={commentAuthor}
                    onChange={(e) => {
                      setCommentAuthor(e.target.value);
                      if (commentError) setCommentError(null);
                    }}
                    placeholder="Your name"
                  />

                  <Textarea
                    id="blog-comment-body"
                    label="Comment"
                    aria-label="Comment"
                    variant="bordered"
                    value={commentBody}
                    onChange={(e) => {
                      setCommentBody(e.target.value);
                      if (commentError) setCommentError(null);
                    }}
                    placeholder="Share a technical observation or question..."
                  />

                  {commentError && (
                    <p
                      role="alert"
                      className="text-xs font-medium text-rose-600 dark:text-rose-400"
                    >
                      {commentError}
                    </p>
                  )}

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      color="primary"
                      size="md"
                      className="hb-blog-btn-tap min-h-11"
                    >
                      Post comment
                    </Button>
                  </div>
                </form>

                {/* Comment Thread */}
                <div className="mt-8 space-y-5">
                  {activeComments.map((comment) => {
                    const isReplying = replyingToId === comment.id;
                    return (
                      <div
                        key={comment.id}
                        className="rounded-2xl border border-zinc-200/80 bg-white p-5 sm:p-6 dark:border-white/10 dark:bg-[#141416]"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex items-center gap-3">
                            <Avatar
                              src={comment.avatar}
                              name={comment.author}
                              alt={comment.author}
                              size="sm"
                            />
                            <div>
                              <div className="flex flex-wrap items-center gap-2">
                                <span className="text-foreground text-sm font-semibold">
                                  {comment.author}
                                </span>
                                {comment.role && (
                                  <Badge variant="flat" size="sm">
                                    {comment.role}
                                  </Badge>
                                )}
                              </div>
                              <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                {comment.timestamp}
                              </p>
                            </div>
                          </div>
                        </div>

                        <p className="mt-3.5 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          {comment.body}
                        </p>

                        <div className="mt-4 flex flex-wrap items-center gap-2">
                          <Button
                            type="button"
                            variant="plain"
                            size="sm"
                            aria-pressed={Boolean(comment.likedByViewer)}
                            onClick={() => handleToggleLike(comment.id)}
                            className={cn(
                              "hb-blog-btn-tap min-h-11 gap-1.5 px-3 text-xs",
                              comment.likedByViewer
                                ? "text-rose-600 dark:text-rose-400"
                                : "text-zinc-500 dark:text-zinc-400"
                            )}
                          >
                            <Heart
                              className={cn("h-4 w-4", comment.likedByViewer && "fill-current")}
                              aria-hidden="true"
                            />
                            <span>Helpful ({comment.likes})</span>
                          </Button>

                          <Button
                            type="button"
                            variant="plain"
                            size="sm"
                            onClick={() => {
                              setReplyingToId(isReplying ? null : comment.id);
                              setReplyError(null);
                            }}
                            className="hb-blog-btn-tap min-h-11 gap-1.5 px-3 text-xs text-zinc-600 dark:text-zinc-300"
                          >
                            <MessageSquare className="h-4 w-4" aria-hidden="true" />
                            <span>{isReplying ? "Cancel reply" : "Reply"}</span>
                          </Button>
                        </div>

                        {/* Inline Reply Form */}
                        <AnimatePresence initial={false}>
                          {isReplying && (
                            <motion.form
                              onSubmit={(e) => handleSubmitReply(comment.id, e)}
                              noValidate
                              initial={prefersReducedMotion ? false : { opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={prefersReducedMotion ? undefined : { opacity: 0, height: 0 }}
                              transition={{ duration: 0.18, ease: ABOUT_EASE_OUT }}
                              className="mt-4 space-y-3 overflow-hidden border-t border-zinc-200/70 pt-4 dark:border-white/[0.08]"
                            >
                              <Input
                                id={`blog-reply-author-${comment.id}`}
                                label="Your name"
                                aria-label="Your name"
                                size="sm"
                                variant="bordered"
                                value={replyAuthor}
                                onChange={(e) => {
                                  setReplyAuthor(e.target.value);
                                  if (replyError) setReplyError(null);
                                }}
                                placeholder="Your name"
                              />
                              <Textarea
                                id={`blog-reply-body-${comment.id}`}
                                label={`Reply to ${comment.author}`}
                                aria-label={`Reply to ${comment.author}`}
                                variant="bordered"
                                value={replyBody}
                                onChange={(e) => {
                                  setReplyBody(e.target.value);
                                  if (replyError) setReplyError(null);
                                }}
                                placeholder="Write a reply..."
                              />
                              {replyError && (
                                <p
                                  role="alert"
                                  className="text-xs font-medium text-rose-600 dark:text-rose-400"
                                >
                                  {replyError}
                                </p>
                              )}
                              <div className="flex justify-end gap-2">
                                <Button
                                  type="button"
                                  variant="plain"
                                  size="sm"
                                  className="min-h-11"
                                  onClick={() => setReplyingToId(null)}
                                >
                                  Cancel
                                </Button>
                                <Button
                                  type="submit"
                                  color="primary"
                                  size="sm"
                                  className="min-h-11"
                                >
                                  Send reply
                                </Button>
                              </div>
                            </motion.form>
                          )}
                        </AnimatePresence>

                        {/* Nested Replies */}
                        {comment.replies && comment.replies.length > 0 && (
                          <div className="mt-5 space-y-4 border-l-2 border-zinc-200/90 pl-4 sm:pl-5 dark:border-white/10">
                            {comment.replies.map((reply) => (
                              <div key={reply.id} className="space-y-2">
                                <div className="flex items-center gap-2.5">
                                  <Avatar
                                    src={reply.avatar}
                                    name={reply.author}
                                    alt={reply.author}
                                    size="sm"
                                  />
                                  <div className="flex flex-wrap items-center gap-2">
                                    <span className="text-foreground text-sm font-semibold">
                                      {reply.author}
                                    </span>
                                    {reply.role && (
                                      <Badge variant="flat" size="sm">
                                        {reply.role}
                                      </Badge>
                                    )}
                                    <span className="text-xs text-zinc-500 dark:text-zinc-400">
                                      {reply.timestamp}
                                    </span>
                                  </div>
                                </div>
                                <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                                  {reply.body}
                                </p>
                                <Button
                                  type="button"
                                  variant="plain"
                                  size="sm"
                                  aria-pressed={Boolean(reply.likedByViewer)}
                                  onClick={() => handleToggleLike(reply.id)}
                                  className={cn(
                                    "hb-blog-btn-tap -ml-2 min-h-11 gap-1.5 px-3 text-xs",
                                    reply.likedByViewer
                                      ? "text-rose-600 dark:text-rose-400"
                                      : "text-zinc-500 dark:text-zinc-400"
                                  )}
                                >
                                  <Heart
                                    className={cn(
                                      "h-3.5 w-3.5",
                                      reply.likedByViewer && "fill-current"
                                    )}
                                    aria-hidden="true"
                                  />
                                  <span>Helpful ({reply.likes})</span>
                                </Button>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            </section>
          </div>
        </Container>
      </Section>
    </div>
  );
}
