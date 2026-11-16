"use client";

import * as React from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, BookOpen, Calendar, Clock, RotateCcw, Search } from "lucide-react";
import {
  Avatar,
  Badge,
  Button,
  Container,
  Heading,
  Input,
  Section,
  Tab,
  Tabs,
  Text,
} from "@hudbird/ui";
import { cn } from "../../utils/cn";
import { ABOUT_EASE_OUT } from "../AboutUsSection/shared";
import {
  BLOG_CATEGORIES,
  DEFAULT_BLOG_POSTS,
  scrollBlogRootToTop,
  type BlogCategoryFilter,
  type BlogPost,
} from "./data";
import "./blog-section.css";

export interface BlogIndexSectionProps {
  id?: string;
  brandName?: string;
  badgeLabel?: string;
  title?: string;
  description?: string;
  posts?: BlogPost[];
  onSelectPost?: (slug: string) => void;
  className?: string;
}

export function BlogIndexSection({
  id = "blog-index",
  brandName = "Hudbird UI",
  badgeLabel,
  title = "Notes on interface systems, motion physics, and front-end craft.",
  description = "Practical architectural writeups, benchmark notes, and design token patterns from the team maintaining @hudbird/ui and @hudbird/marketing.",
  posts = DEFAULT_BLOG_POSTS,
  onSelectPost,
  className,
}: BlogIndexSectionProps) {
  const prefersReducedMotion = Boolean(useReducedMotion());
  const rootRef = React.useRef<HTMLDivElement>(null);

  const revealInitial = (y: number) => (prefersReducedMotion ? false : { opacity: 0, y });
  const revealTarget = { opacity: 1, y: 0 };

  const [activeCategory, setActiveCategory] = React.useState<BlogCategoryFilter>("All");
  const [searchQuery, setSearchQuery] = React.useState("");

  const resolvedBadge = badgeLabel ?? `${brandName} Journal`;

  const filteredPosts = React.useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    return posts.filter((post) => {
      const matchesCategory = activeCategory === "All" || post.category === activeCategory;
      if (!matchesCategory) return false;
      if (!query) return true;
      return (
        post.title.toLowerCase().includes(query) ||
        post.summary.toLowerCase().includes(query) ||
        post.author.name.toLowerCase().includes(query) ||
        post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    });
  }, [posts, activeCategory, searchQuery]);

  const showFeaturedLayout = activeCategory === "All" && searchQuery.trim() === "";
  const featuredPost = React.useMemo(() => {
    if (!showFeaturedLayout || !filteredPosts.length) return null;
    return filteredPosts.find((p) => p.featured) ?? filteredPosts[0];
  }, [showFeaturedLayout, filteredPosts]);

  const gridPosts = React.useMemo(() => {
    if (!featuredPost) return filteredPosts;
    return filteredPosts.filter((p) => p.slug !== featuredPost.slug);
  }, [featuredPost, filteredPosts]);

  const handleOpenPost = (slug: string) => {
    scrollBlogRootToTop(rootRef.current, prefersReducedMotion ? "auto" : "smooth");
    onSelectPost?.(slug);
  };

  return (
    <div ref={rootRef} data-landing-section="blog-index" className="w-full">
      <Section
        id={id}
        spacing="none"
        className={cn(
          "hb-blog-section bg-background text-foreground pt-8 pb-16 sm:pt-12 sm:pb-24",
          className
        )}
      >
        <Container size="xl" gutter="lg">
          <div className="mx-auto w-full max-w-6xl">
            {/* Editorial Badge + Hero Title */}
            <motion.div
              initial={revealInitial(10)}
              animate={revealTarget}
              transition={{ duration: 0.34, ease: ABOUT_EASE_OUT }}
              className="mb-4 sm:mb-6"
            >
              <Badge
                variant="modern"
                size="md"
                data-hb-node="badge"
                data-hb-edit="blog-index:badgeLabel"
                className="gap-2 px-3.5 py-1.5 text-xs font-medium"
              >
                <BookOpen
                  className="h-3.5 w-3.5 text-zinc-700 dark:text-zinc-300"
                  aria-hidden="true"
                />
                <span data-hb-edit-text="">{resolvedBadge}</span>
              </Badge>
            </motion.div>

            <motion.div
              initial={revealInitial(14)}
              animate={revealTarget}
              transition={{ duration: 0.4, delay: 0.04, ease: ABOUT_EASE_OUT }}
              className="w-full space-y-4"
            >
              <Heading
                as="h1"
                size="inherit"
                data-hb-node="heading"
                data-hb-edit="blog-index:title"
                className="text-foreground text-[clamp(2rem,4vw,3.55rem)] leading-[1.08] font-semibold tracking-[-0.03em]"
              >
                {title}
              </Heading>
              <Text
                variant="muted"
                data-hb-node="text"
                data-hb-edit="blog-index:description"
                className="max-w-3xl text-base leading-relaxed sm:text-lg"
              >
                {description}
              </Text>
            </motion.div>

            {/* Underline Tabs Category Filter + Search Input */}
            <motion.div
              initial={revealInitial(12)}
              animate={revealTarget}
              transition={{ duration: 0.38, delay: 0.08, ease: ABOUT_EASE_OUT }}
              className="mt-8 flex flex-col gap-4 border-b border-zinc-200/80 pb-4 md:mt-10 md:flex-row md:items-end md:justify-between dark:border-white/[0.08]"
            >
              <Tabs
                variant="underlined"
                size="md"
                selectedKey={activeCategory}
                onSelectionChange={(key) => setActiveCategory(String(key) as BlogCategoryFilter)}
                aria-label="Filter articles by category"
                className="w-full md:w-auto"
                classNames={{
                  tabList: "w-full overflow-x-auto pb-0 border-b-0 gap-4 sm:gap-6",
                  tab: "min-h-11 px-1 text-xs sm:text-sm whitespace-nowrap",
                }}
              >
                {BLOG_CATEGORIES.map((category) => (
                  <Tab key={category} tabKey={category} title={category} />
                ))}
              </Tabs>

              <div className="w-full md:w-72 lg:w-80">
                <Input
                  type="search"
                  size="md"
                  variant="bordered"
                  radius="lg"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onClear={() => setSearchQuery("")}
                  isClearable={Boolean(searchQuery)}
                  placeholder="Search articles, authors, tags..."
                  aria-label="Search blog articles"
                  startContent={<Search className="h-4 w-4 text-zinc-400" aria-hidden="true" />}
                />
              </div>
            </motion.div>

            {/* Animated Filter View */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={`${activeCategory}-${searchQuery.trim() ? "search" : "browse"}`}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -4 }}
                transition={{ duration: 0.18, ease: ABOUT_EASE_OUT }}
                className="mt-8 sm:mt-10"
              >
                {filteredPosts.length === 0 ? (
                  <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-200/90 bg-zinc-50/60 px-6 py-14 text-center dark:border-white/10 dark:bg-zinc-900/40">
                    <Heading as="h2" size="inherit" className="text-lg font-semibold">
                      No matching articles found
                    </Heading>
                    <Text variant="muted" className="mt-2 max-w-md text-sm">
                      Try clearing your search term or switching back to all editorial categories.
                    </Text>
                    <Button
                      variant="outline"
                      size="md"
                      className="mt-5 min-h-11"
                      onClick={() => {
                        setActiveCategory("All");
                        setSearchQuery("");
                      }}
                    >
                      <RotateCcw className="h-4 w-4" aria-hidden="true" />
                      <span>Reset filters</span>
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-8 lg:space-y-10">
                    {/* Featured Lead Article */}
                    {featuredPost &&
                      (() => {
                        const featuredIdx = Math.max(
                          0,
                          posts.findIndex((p) => p.slug === featuredPost.slug)
                        );
                        return (
                          <article
                            data-hb-node="card"
                            data-hb-item={featuredIdx}
                            className="hb-blog-media-card hb-blog-card-interactive group overflow-hidden rounded-2xl border border-zinc-200/80 bg-white dark:border-white/10 dark:bg-[#141416]"
                          >
                            <div className="grid grid-cols-1 md:grid-cols-12">
                              <button
                                type="button"
                                data-hb-node="media"
                                data-hb-item={featuredIdx}
                                data-hb-edit={`blog-index:posts.${featuredIdx}.coverImage.src`}
                                data-hb-edit-mode="popover"
                                onClick={() => handleOpenPost(featuredPost.slug)}
                                aria-label={`Read featured article: ${featuredPost.title}`}
                                className="hb-blog-media-frame relative block aspect-[16/10] w-full cursor-pointer overflow-hidden bg-zinc-100 text-left focus-visible:outline-2 focus-visible:outline-offset-2 md:col-span-6 md:aspect-auto md:min-h-[340px] lg:col-span-7 dark:bg-zinc-900"
                              >
                                <img
                                  src={featuredPost.coverImage.src}
                                  alt={featuredPost.coverImage.alt}
                                  fetchPriority="high"
                                  className="hb-blog-media-img h-full w-full object-cover"
                                />
                              </button>

                              <div className="flex flex-col justify-between p-6 sm:p-8 md:col-span-6 lg:col-span-5 lg:p-10">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                                    <Badge
                                      variant="modern"
                                      size="sm"
                                      data-hb-node="badge"
                                      data-hb-item={featuredIdx}
                                      data-hb-edit={`blog-index:posts.${featuredIdx}.category`}
                                      className="font-medium"
                                    >
                                      <span data-hb-edit-text="">{featuredPost.category}</span>
                                    </Badge>
                                    <span className="inline-flex items-center gap-1">
                                      <Calendar className="h-3.5 w-3.5" aria-hidden="true" />
                                      {featuredPost.publishedAt}
                                    </span>
                                    <span className="inline-flex items-center gap-1">
                                      <Clock className="h-3.5 w-3.5" aria-hidden="true" />
                                      {featuredPost.readTime}
                                    </span>
                                  </div>

                                  <Heading
                                    as="h2"
                                    size="inherit"
                                    data-hb-node="heading"
                                    data-hb-item={featuredIdx}
                                    data-hb-edit={`blog-index:posts.${featuredIdx}.title`}
                                    className="text-foreground mt-4 text-2xl leading-[1.18] font-semibold tracking-[-0.025em] sm:text-[1.75rem]"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => handleOpenPost(featuredPost.slug)}
                                      className="cursor-pointer text-left hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                                    >
                                      <span data-hb-edit-text="">{featuredPost.title}</span>
                                    </button>
                                  </Heading>

                                  <Text
                                    variant="muted"
                                    data-hb-node="text"
                                    data-hb-item={featuredIdx}
                                    data-hb-edit={`blog-index:posts.${featuredIdx}.summary`}
                                    className="mt-3 text-sm leading-relaxed sm:text-base"
                                  >
                                    {featuredPost.summary}
                                  </Text>
                                </div>

                                <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-zinc-200/70 pt-5 dark:border-white/[0.08]">
                                  <div className="flex min-w-0 items-center gap-3">
                                    <Avatar
                                      src={featuredPost.author.avatar}
                                      name={featuredPost.author.name}
                                      alt={featuredPost.author.name}
                                      size="sm"
                                    />
                                    <div className="min-w-0">
                                      <p className="text-foreground truncate text-sm font-medium">
                                        {featuredPost.author.name}
                                      </p>
                                      <p className="truncate text-xs text-zinc-500 dark:text-zinc-400">
                                        {featuredPost.author.role}
                                      </p>
                                    </div>
                                  </div>

                                  <Button
                                    type="button"
                                    variant="flat"
                                    size="md"
                                    className="hb-blog-btn-tap min-h-11 shrink-0"
                                    onClick={() => handleOpenPost(featuredPost.slug)}
                                  >
                                    <span>Read article</span>
                                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </article>
                        );
                      })()}

                    {/* Filter count summary when searching or filtering */}
                    {!featuredPost && (
                      <div className="flex items-center justify-between">
                        <Text variant="muted" className="text-sm">
                          Showing {filteredPosts.length}{" "}
                          {filteredPosts.length === 1 ? "article" : "articles"}
                          {activeCategory !== "All" ? ` in ${activeCategory}` : ""}
                        </Text>
                      </div>
                    )}

                    {/* Responsive Article Grid */}
                    {gridPosts.length > 0 && (
                      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
                        {gridPosts.map((post) => {
                          const postIdx = Math.max(
                            0,
                            posts.findIndex((p) => p.slug === post.slug)
                          );
                          return (
                            <article
                              key={post.slug}
                              data-hb-node="card"
                              data-hb-item={postIdx}
                              className="hb-blog-media-card hb-blog-card-interactive group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white dark:border-white/10 dark:bg-[#141416]"
                            >
                              <button
                                type="button"
                                data-hb-node="media"
                                data-hb-item={postIdx}
                                data-hb-edit={`blog-index:posts.${postIdx}.coverImage.src`}
                                data-hb-edit-mode="popover"
                                onClick={() => handleOpenPost(post.slug)}
                                aria-label={`Read article: ${post.title}`}
                                className="hb-blog-media-frame relative block aspect-[16/10] w-full cursor-pointer overflow-hidden bg-zinc-100 text-left focus-visible:outline-2 focus-visible:outline-offset-2 dark:bg-zinc-900"
                              >
                                <img
                                  src={post.coverImage.src}
                                  alt={post.coverImage.alt}
                                  className="hb-blog-media-img h-full w-full object-cover"
                                />
                              </button>

                              <div className="flex flex-1 flex-col justify-between p-5 sm:p-6">
                                <div>
                                  <div className="flex flex-wrap items-center gap-2.5 text-xs text-zinc-500 dark:text-zinc-400">
                                    <Badge
                                      variant="modern"
                                      size="sm"
                                      data-hb-node="badge"
                                      data-hb-item={postIdx}
                                      data-hb-edit={`blog-index:posts.${postIdx}.category`}
                                      className="font-medium"
                                    >
                                      <span data-hb-edit-text="">{post.category}</span>
                                    </Badge>
                                    <span>{post.publishedAt}</span>
                                    <span>{post.readTime}</span>
                                  </div>

                                  <Heading
                                    as="h3"
                                    size="inherit"
                                    data-hb-node="heading"
                                    data-hb-item={postIdx}
                                    data-hb-edit={`blog-index:posts.${postIdx}.title`}
                                    className="text-foreground mt-3.5 text-xl leading-snug font-semibold tracking-[-0.02em]"
                                  >
                                    <button
                                      type="button"
                                      onClick={() => handleOpenPost(post.slug)}
                                      className="cursor-pointer text-left hover:underline focus-visible:outline-2 focus-visible:outline-offset-4"
                                    >
                                      <span data-hb-edit-text="">{post.title}</span>
                                    </button>
                                  </Heading>

                                  <Text
                                    variant="muted"
                                    data-hb-node="text"
                                    data-hb-item={postIdx}
                                    data-hb-edit={`blog-index:posts.${postIdx}.summary`}
                                    className="mt-2.5 line-clamp-3 text-sm leading-relaxed"
                                  >
                                    {post.summary}
                                  </Text>
                                </div>

                                <div className="mt-6 flex items-center justify-between gap-3 border-t border-zinc-200/70 pt-4 dark:border-white/[0.08]">
                                  <div className="flex min-w-0 items-center gap-2.5">
                                    <Avatar
                                      src={post.author.avatar}
                                      name={post.author.name}
                                      alt={post.author.name}
                                      size="sm"
                                    />
                                    <div className="min-w-0">
                                      <p className="text-foreground truncate text-xs font-medium sm:text-sm">
                                        {post.author.name}
                                      </p>
                                      <p className="truncate text-[11px] text-zinc-500 dark:text-zinc-400">
                                        {post.author.role}
                                      </p>
                                    </div>
                                  </div>

                                  <Button
                                    type="button"
                                    variant="plain"
                                    size="sm"
                                    className="hb-blog-btn-tap min-h-11 shrink-0 px-3"
                                    onClick={() => handleOpenPost(post.slug)}
                                  >
                                    <span>Read</span>
                                    <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                                  </Button>
                                </div>
                              </div>
                            </article>
                          );
                        })}
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </Container>
      </Section>
    </div>
  );
}
