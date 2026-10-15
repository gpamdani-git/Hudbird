import React, { useState } from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { SaaSCta } from "@/components/marketing/SaaS/Cta/SaaSCta";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Link as LinkIcon, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Inline SVGs for social icons to avoid missing exports in some lucide-react versions
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

export function BlogPost() {
  const { slug } = useParams();
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-[#070912]">
      <SaaSNavbar />

      {/* Article Header & Hero */}
      <article className="flex-1 pt-32 pb-24">
        <div className="mx-auto mb-16 max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <Link
            to="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-zinc-500 transition-colors hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400"
          >
            <ArrowLeft className="h-4 w-4" /> Back to blog
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6 flex justify-center"
          >
            <div className="inline-flex items-center rounded-full border border-emerald-200/50 bg-zinc-100/50 px-3 py-1 text-xs font-bold tracking-widest text-emerald-600 uppercase dark:border-blue-500/20 dark:bg-blue-500/10 dark:text-emerald-400">
              Product Update
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="mb-8 text-4xl leading-tight font-bold tracking-tight text-zinc-900 sm:text-6xl dark:text-white"
          >
            Introducing Taskk 2.0: The Future of Workflow Automation
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="flex items-center justify-center gap-6 text-sm text-zinc-600 dark:text-zinc-400"
          >
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                <User className="h-4 w-4" />
              </div>
              <span className="font-medium text-zinc-900 dark:text-white">Sarah Jenkins</span>
            </div>
            <div className="h-1 w-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" /> Oct 2, 2026
            </div>
            <div className="hidden h-1 w-1 rounded-full bg-zinc-300 sm:block dark:bg-zinc-700" />
            <div className="hidden sm:block">5 min read</div>
          </motion.div>
        </div>

        {/* Custom Pro Gradient Banner (Replaces Unsplash) */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mx-auto mb-20 max-w-6xl px-4 sm:px-6 lg:px-8"
        >
          <div className="relative aspect-[21/9] w-full overflow-hidden rounded-3xl bg-gradient-to-br from-blue-200 via-cyan-200 to-emerald-200 shadow-2xl dark:from-blue-900/40 dark:via-cyan-900/20 dark:to-emerald-900/40">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTIwIDIwTDAgME0yMCAyMGwyMCAyME0yMCAyMEwwIDQwTTIwIDIwbDIwLTIwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl font-black tracking-tighter text-zinc-900/50 mix-blend-overlay sm:text-8xl dark:text-white/80">
                TASKK 2.0
              </div>
            </div>
          </div>
        </motion.div>

        {/* Article Body */}
        <div className="mx-auto flex max-w-7xl flex-col gap-12 px-4 sm:px-6 lg:flex-row lg:px-8">
          {/* Social Share Sidebar */}
          <div className="sticky top-32 hidden h-fit w-16 shrink-0 flex-col gap-4 lg:flex">
            <div className="mb-2 text-center text-xs font-bold tracking-widest text-zinc-400 uppercase">
              Share
            </div>
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-[#1DA1F2] hover:text-[#1DA1F2] dark:border-white/10 dark:bg-zinc-900">
              <TwitterIcon className="h-5 w-5" />
            </button>
            <button className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2] dark:border-white/10 dark:bg-zinc-900">
              <LinkedinIcon className="h-5 w-5" />
            </button>
            <button
              onClick={handleCopyLink}
              className="flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-blue-500 hover:text-emerald-500 dark:border-white/10 dark:bg-zinc-900"
            >
              {copied ? <Check className="h-5 w-5" /> : <LinkIcon className="h-5 w-5" />}
            </button>
          </div>

          {/* Main Content Typography */}
          <div className="max-w-3xl flex-1 space-y-8 text-lg leading-relaxed text-zinc-700 dark:text-zinc-300">
            <p className="text-xl leading-relaxed font-medium text-zinc-900 sm:text-2xl dark:text-white">
              When we launched Taskk two years ago, our goal was simple: make it easier for teams to
              track their work. Today, we're taking a massive leap forward.
            </p>

            <p>
              Taskk 2.0 isn't just a visual refresh. It's a complete rewrite of our core engine,
              designed from the ground up to handle massive scale while feeling incredibly fast and
              responsive. We've listened to your feedback, analyzed millions of workflows, and built
              the platform you need for the next decade of work.
            </p>

            <h2 className="mt-12 mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
              Blazing Fast Performance
            </h2>

            <p>
              Speed is a feature. In Taskk 2.0, we've moved our entire frontend to a new
              architecture powered by React Server Components and edge caching. The result?
            </p>

            <ul className="list-disc space-y-3 pl-6">
              <li>
                <strong className="text-zinc-900 dark:text-white">Initial load times</strong> are
                down by 65%.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-white">Switching views</strong> (from
                Board to List to Calendar) is now instant with zero layout shift.
              </li>
              <li>
                <strong className="text-zinc-900 dark:text-white">Real-time sync</strong> across
                devices has been optimized to resolve conflicts seamlessly.
              </li>
            </ul>

            <blockquote className="my-10 rounded-r-2xl border-l-4 border-blue-500 bg-zinc-100/50 py-2 pl-6 text-xl text-zinc-600 italic dark:bg-blue-500/5 dark:text-zinc-400">
              "We didn't just want to make it faster. We wanted it to feel like it was reading your
              mind. Every interaction in 2.0 is designed to get out of your way."
              <footer className="mt-4 text-sm font-semibold text-zinc-900 not-italic dark:text-white">
                — David Chen, CTO
              </footer>
            </blockquote>

            <h2 className="mt-12 mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
              AI-Powered Automations
            </h2>

            <p>
              We're introducing <strong className="text-zinc-900 dark:text-white">Taskk AI</strong>,
              an intelligent layer that learns how your team operates. Instead of manually
              configuring complex IF/THEN rules, you can now simply tell Taskk what you want to
              happen.
            </p>

            <div className="my-8 overflow-x-auto rounded-xl border border-[#30363d] bg-[#0d1117] p-6 shadow-xl">
              <pre className="font-mono text-sm whitespace-pre text-[#c9d1d9]">
                <span className="text-zinc-500">// Example: Natural Language Automation API</span>
                {"\n"}
                <span className="text-[#ff7b72]">await</span> taskk.automations.
                <span className="text-[#d2a8ff]">create</span>({"{"}
                {"\n"}
                {"  "}prompt:{" "}
                <span className="text-[#a5d6ff]">
                  "When a high priority bug is filed, page the on-call engineer and create a Slack
                  channel."
                </span>
                {"\n"}
                {"}"});
              </pre>
            </div>

            <p>
              The AI automatically generates the underlying logic, connects to your integrations
              (like PagerDuty and Slack), and activates the workflow instantly.
            </p>

            <div className="my-12 h-px w-full bg-zinc-200 dark:bg-white/10" />

            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
              Available Today
            </h2>
            <p>
              Taskk 2.0 is rolling out to all users starting today. There's no migration required,
              and all your existing workflows will continue to function perfectly on the new engine.
            </p>
            <p>We can't wait to see what you build with it.</p>

            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-white">
              Available Today
            </h2>
            <p>
              Taskk 2.0 is rolling out to all users starting today. There's no migration required,
              and all your existing workflows will continue to function perfectly on the new engine.
            </p>
            <p>We can't wait to see what you build with it.</p>

            {/* Comments Section */}
            <CommentSection />
          </div>
        </div>
      </article>

      <SaaSCta />
      <SaaSFooter />
    </div>
  );
}

// ---------------------------------------------------------
// Interactive Comments Section
// ---------------------------------------------------------

type CommentType = {
  id: string;
  author: string;
  isAuthor?: boolean;
  avatar: string;
  time: string;
  content: string;
  replies: CommentType[];
};

const initialComments: CommentType[] = [
  {
    id: "1",
    author: "Alex Rivera",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alex",
    time: "2 hours ago",
    content:
      "This 2.0 release looks absolutely incredible. We've been waiting for the AI automations to simplify our onboarding flows!",
    replies: [
      {
        id: "1-1",
        author: "Sarah Jenkins",
        isAuthor: true,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        time: "1 hour ago",
        content:
          "Thanks Alex! We can't wait for you to try it out. Let us know what you think of the new visual builder once you dig in.",
        replies: [],
      },
    ],
  },
  {
    id: "2",
    author: "Marcus Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    time: "5 hours ago",
    content:
      "Will this require any migration steps for users currently on the old Enterprise plan? Or does it happen transparently?",
    replies: [],
  },
];

function CommentSection() {
  const [comments, setComments] = useState<CommentType[]>(initialComments);
  const [mainInput, setMainInput] = useState("");
  const [replyingTo, setReplyingTo] = useState<string | null>(null);
  const [replyInput, setReplyInput] = useState("");

  const handlePostMainComment = () => {
    if (!mainInput.trim()) return;
    const newComment: CommentType = {
      id: Date.now().toString(),
      author: "You (Guest)",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
      time: "Just now",
      content: mainInput.trim(),
      replies: [],
    };
    setComments([newComment, ...comments]);
    setMainInput("");
  };

  const handlePostReply = (parentId: string) => {
    if (!replyInput.trim()) return;

    setComments((prev) =>
      prev.map((c) => {
        if (c.id === parentId) {
          return {
            ...c,
            replies: [
              ...c.replies,
              {
                id: Date.now().toString(),
                author: "You (Guest)",
                avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
                time: "Just now",
                content: replyInput.trim(),
                replies: [],
              },
            ],
          };
        }
        return c;
      })
    );
    setReplyingTo(null);
    setReplyInput("");
  };

  const totalComments = comments.length + comments.reduce((acc, c) => acc + c.replies.length, 0);

  return (
    <div className="mt-20 border-t border-zinc-200 pt-10 dark:border-white/10">
      <h3 className="mb-8 text-2xl font-bold text-zinc-900 dark:text-white">
        Discussion ({totalComments})
      </h3>

      {/* Main Comment Form */}
      <div className="mb-12 flex gap-4">
        <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
          <img
            src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
            alt="You"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex-1">
          <textarea
            rows={3}
            value={mainInput}
            onChange={(e) => setMainInput(e.target.value)}
            placeholder="What are your thoughts?"
            className="mb-3 w-full resize-none rounded-2xl border border-zinc-200 bg-white p-4 text-sm shadow-sm transition-all outline-none placeholder:text-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-white/10 dark:bg-[#12141D] dark:text-white dark:placeholder:text-zinc-400"
          />
          <div className="flex justify-end">
            <button
              onClick={handlePostMainComment}
              disabled={!mainInput.trim()}
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comment Thread */}
      <div className="space-y-8">
        {comments.map((comment) => (
          <div key={comment.id} className="flex gap-4">
            <div className="h-10 w-10 shrink-0 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
              <img
                src={comment.avatar}
                alt={comment.author}
                className="h-full w-full object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="mb-1 flex items-center gap-2">
                <span className="font-semibold text-zinc-900 dark:text-white">
                  {comment.author}
                </span>
                {comment.isAuthor && (
                  <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-purple-600 uppercase dark:bg-purple-500/20 dark:text-purple-400">
                    Author
                  </span>
                )}
                <span className="text-xs text-zinc-500">{comment.time}</span>
              </div>
              <p className="mb-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                {comment.content}
              </p>
              <button
                onClick={() => {
                  setReplyingTo(replyingTo === comment.id ? null : comment.id);
                  setReplyInput("");
                }}
                className="text-xs font-semibold text-zinc-500 transition-colors hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400"
              >
                {replyingTo === comment.id ? "Cancel Reply" : "Reply"}
              </button>

              {/* Reply Input Box */}
              {replyingTo === comment.id && (
                <div className="animate-in fade-in slide-in-from-top-2 mt-4 flex gap-4 duration-200">
                  <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                    <img
                      src="https://api.dicebear.com/7.x/avataaars/svg?seed=You"
                      alt="You"
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <textarea
                      rows={2}
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder={`Reply to ${comment.author}...`}
                      autoFocus
                      className="mb-2 w-full resize-none rounded-xl border border-zinc-200 bg-white p-3 text-sm outline-none placeholder:text-zinc-500 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-white/10 dark:bg-[#12141D] dark:text-white dark:placeholder:text-zinc-400"
                    />
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setReplyingTo(null)}
                        className="rounded-full px-4 py-1.5 text-xs font-medium text-zinc-500 transition-colors hover:bg-zinc-100 dark:hover:bg-white/5"
                      >
                        Cancel
                      </button>
                      <button
                        onClick={() => handlePostReply(comment.id)}
                        disabled={!replyInput.trim()}
                        className="rounded-full bg-zinc-900 px-4 py-1.5 text-xs font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
                      >
                        Reply
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Nested Replies */}
              {comment.replies.length > 0 && (
                <div className="mt-6 space-y-6">
                  {comment.replies.map((reply) => (
                    <div key={reply.id} className="flex gap-4">
                      <div className="h-8 w-8 shrink-0 overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-800">
                        <img
                          src={reply.avatar}
                          alt={reply.author}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1">
                        <div className="mb-1 flex items-center gap-2">
                          <span className="font-semibold text-zinc-900 dark:text-white">
                            {reply.author}
                          </span>
                          {reply.isAuthor && (
                            <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold tracking-wider text-purple-600 uppercase dark:bg-purple-500/20 dark:text-purple-400">
                              Author
                            </span>
                          )}
                          <span className="text-xs text-zinc-500">{reply.time}</span>
                        </div>
                        <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                          {reply.content}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
