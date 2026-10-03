import React, { useState } from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { SaaSCta } from "@/components/marketing/SaaS/Cta/SaaSCta";
import { motion } from "framer-motion";
import { Calendar, User, ArrowLeft, Link as LinkIcon, Check } from "lucide-react";
import { Link, useParams } from "react-router-dom";

// Inline SVGs for social icons to avoid missing exports in some lucide-react versions
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
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
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center mb-16">
          <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-500 hover:text-emerald-600 dark:text-zinc-400 dark:hover:text-emerald-400 transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to blog
          </Link>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-6 flex justify-center">
            <div className="inline-flex items-center rounded-full border border-emerald-200/50 bg-zinc-100/50 dark:border-blue-500/20 dark:bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400">
              Product Update
            </div>
          </motion.div>

          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl sm:text-6xl font-bold tracking-tight text-zinc-900 dark:text-white mb-8 leading-tight">
            Introducing Taskk 2.0: The Future of Workflow Automation
          </motion.h1>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="flex items-center justify-center gap-6 text-sm text-zinc-600 dark:text-zinc-400">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center overflow-hidden">
                <User className="w-4 h-4" />
              </div>
              <span className="font-medium text-zinc-900 dark:text-white">Sarah Jenkins</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" /> Oct 2, 2026
            </div>
            <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700 hidden sm:block" />
            <div className="hidden sm:block">5 min read</div>
          </motion.div>
        </div>

        {/* Custom Pro Gradient Banner (Replaces Unsplash) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }}
          className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 mb-20"
        >
          <div className="w-full aspect-[21/9] rounded-3xl bg-gradient-to-br from-blue-200 via-cyan-200 to-emerald-200 dark:from-blue-900/40 dark:via-cyan-900/20 dark:to-emerald-900/40 overflow-hidden relative shadow-2xl">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTIwIDIwTDAgME0yMCAyMGwyMCAyME0yMCAyMEwwIDQwTTIwIDIwbDIwLTIwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-5xl sm:text-8xl font-black text-zinc-900/50 dark:text-white/80 tracking-tighter mix-blend-overlay">TASKK 2.0</div>
            </div>
          </div>
        </motion.div>

        {/* Article Body */}
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-12">
          
          {/* Social Share Sidebar */}
          <div className="hidden lg:flex w-16 shrink-0 flex-col gap-4 sticky top-32 h-fit">
            <div className="text-xs font-bold text-zinc-400 uppercase tracking-widest text-center mb-2">Share</div>
            <button className="w-12 h-12 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-500 hover:text-[#1DA1F2] hover:border-[#1DA1F2] transition-colors bg-white dark:bg-zinc-900">
              <TwitterIcon className="w-5 h-5" />
            </button>
            <button className="w-12 h-12 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-500 hover:text-[#0A66C2] hover:border-[#0A66C2] transition-colors bg-white dark:bg-zinc-900">
              <LinkedinIcon className="w-5 h-5" />
            </button>
            <button onClick={handleCopyLink} className="w-12 h-12 rounded-full border border-zinc-200 dark:border-white/10 flex items-center justify-center text-zinc-500 hover:text-emerald-500 hover:border-blue-500 transition-colors bg-white dark:bg-zinc-900">
              {copied ? <Check className="w-5 h-5" /> : <LinkIcon className="w-5 h-5" />}
            </button>
          </div>

          {/* Main Content Typography */}
          <div className="flex-1 max-w-3xl text-lg text-zinc-700 dark:text-zinc-300 leading-relaxed space-y-8">
            <p className="text-xl sm:text-2xl font-medium text-zinc-900 dark:text-white leading-relaxed">
              When we launched Taskk two years ago, our goal was simple: make it easier for teams to track their work. Today, we're taking a massive leap forward.
            </p>

            <p>
              Taskk 2.0 isn't just a visual refresh. It's a complete rewrite of our core engine, designed from the ground up to handle massive scale while feeling incredibly fast and responsive. We've listened to your feedback, analyzed millions of workflows, and built the platform you need for the next decade of work.
            </p>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-12 mb-6">Blazing Fast Performance</h2>
            
            <p>
              Speed is a feature. In Taskk 2.0, we've moved our entire frontend to a new architecture powered by React Server Components and edge caching. The result?
            </p>

            <ul className="list-disc pl-6 space-y-3">
              <li><strong className="text-zinc-900 dark:text-white">Initial load times</strong> are down by 65%.</li>
              <li><strong className="text-zinc-900 dark:text-white">Switching views</strong> (from Board to List to Calendar) is now instant with zero layout shift.</li>
              <li><strong className="text-zinc-900 dark:text-white">Real-time sync</strong> across devices has been optimized to resolve conflicts seamlessly.</li>
            </ul>

            <blockquote className="border-l-4 border-blue-500 pl-6 py-2 my-10 italic text-xl text-zinc-600 dark:text-zinc-400 bg-zinc-100/50 dark:bg-blue-500/5 rounded-r-2xl">
              "We didn't just want to make it faster. We wanted it to feel like it was reading your mind. Every interaction in 2.0 is designed to get out of your way."
              <footer className="text-sm font-semibold text-zinc-900 dark:text-white mt-4 not-italic">— David Chen, CTO</footer>
            </blockquote>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mt-12 mb-6">AI-Powered Automations</h2>
            
            <p>
              We're introducing <strong className="text-zinc-900 dark:text-white">Taskk AI</strong>, an intelligent layer that learns how your team operates. Instead of manually configuring complex IF/THEN rules, you can now simply tell Taskk what you want to happen.
            </p>

            <div className="rounded-xl bg-[#0d1117] border border-[#30363d] p-6 my-8 overflow-x-auto shadow-xl">
              <pre className="text-sm font-mono text-[#c9d1d9] whitespace-pre">
                <span className="text-zinc-500">// Example: Natural Language Automation API</span>{'\n'}
                <span className="text-[#ff7b72]">await</span> taskk.automations.<span className="text-[#d2a8ff]">create</span>({'{'}{'\n'}
                {'  '}prompt: <span className="text-[#a5d6ff]">"When a high priority bug is filed, page the on-call engineer and create a Slack channel."</span>{'\n'}
                {'}'});
              </pre>
            </div>

            <p>
              The AI automatically generates the underlying logic, connects to your integrations (like PagerDuty and Slack), and activates the workflow instantly.
            </p>

            <div className="w-full h-px bg-zinc-200 dark:bg-white/10 my-12" />

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Available Today</h2>
            <p>
              Taskk 2.0 is rolling out to all users starting today. There's no migration required, and all your existing workflows will continue to function perfectly on the new engine.
            </p>
            <p>
              We can't wait to see what you build with it.
            </p>

            <h2 className="text-2xl font-bold text-zinc-900 dark:text-white mb-6">Available Today</h2>
            <p>
              Taskk 2.0 is rolling out to all users starting today. There's no migration required, and all your existing workflows will continue to function perfectly on the new engine.
            </p>
            <p>
              We can't wait to see what you build with it.
            </p>

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
    content: "This 2.0 release looks absolutely incredible. We've been waiting for the AI automations to simplify our onboarding flows!",
    replies: [
      {
        id: "1-1",
        author: "Sarah Jenkins",
        isAuthor: true,
        avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sarah",
        time: "1 hour ago",
        content: "Thanks Alex! We can't wait for you to try it out. Let us know what you think of the new visual builder once you dig in.",
        replies: []
      }
    ]
  },
  {
    id: "2",
    author: "Marcus Chen",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Marcus",
    time: "5 hours ago",
    content: "Will this require any migration steps for users currently on the old Enterprise plan? Or does it happen transparently?",
    replies: []
  }
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
      replies: []
    };
    setComments([newComment, ...comments]);
    setMainInput("");
  };

  const handlePostReply = (parentId: string) => {
    if (!replyInput.trim()) return;
    
    setComments(prev => prev.map(c => {
      if (c.id === parentId) {
        return {
          ...c,
          replies: [...c.replies, {
            id: Date.now().toString(),
            author: "You (Guest)",
            avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=You",
            time: "Just now",
            content: replyInput.trim(),
            replies: []
          }]
        };
      }
      return c;
    }));
    setReplyingTo(null);
    setReplyInput("");
  };

  const totalComments = comments.length + comments.reduce((acc, c) => acc + c.replies.length, 0);

  return (
    <div className="mt-20 pt-10 border-t border-zinc-200 dark:border-white/10">
      <h3 className="text-2xl font-bold text-zinc-900 dark:text-white mb-8">Discussion ({totalComments})</h3>
      
      {/* Main Comment Form */}
      <div className="flex gap-4 mb-12">
        <div className="w-10 h-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
          <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="You" className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <textarea 
            rows={3}
            value={mainInput}
            onChange={(e) => setMainInput(e.target.value)}
            placeholder="What are your thoughts?"
            className="w-full rounded-2xl border border-zinc-200 bg-white dark:bg-[#12141D] p-4 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-white/10 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 resize-none mb-3 shadow-sm transition-all"
          />
          <div className="flex justify-end">
            <button 
              onClick={handlePostMainComment}
              disabled={!mainInput.trim()}
              className="rounded-full bg-zinc-900 px-5 py-2 text-sm font-medium text-white transition-all hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Post Comment
            </button>
          </div>
        </div>
      </div>

      {/* Comment Thread */}
      <div className="space-y-8">
        {comments.map(comment => (
          <div key={comment.id} className="flex gap-4">
            <div className="w-10 h-10 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
              <img src={comment.avatar} alt={comment.author} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-semibold text-zinc-900 dark:text-white">{comment.author}</span>
                {comment.isAuthor && (
                  <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">Author</span>
                )}
                <span className="text-xs text-zinc-500">{comment.time}</span>
              </div>
              <p className="text-sm text-zinc-700 dark:text-zinc-300 mb-3 leading-relaxed">
                {comment.content}
              </p>
              <button 
                onClick={() => {
                  setReplyingTo(replyingTo === comment.id ? null : comment.id);
                  setReplyInput("");
                }}
                className="text-xs font-semibold text-zinc-500 hover:text-purple-600 dark:text-zinc-400 dark:hover:text-purple-400 transition-colors"
              >
                {replyingTo === comment.id ? "Cancel Reply" : "Reply"}
              </button>

              {/* Reply Input Box */}
              {replyingTo === comment.id && (
                <div className="mt-4 flex gap-4 animate-in fade-in slide-in-from-top-2 duration-200">
                  <div className="w-8 h-8 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                    <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=You" alt="You" className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1">
                    <textarea 
                      rows={2}
                      value={replyInput}
                      onChange={(e) => setReplyInput(e.target.value)}
                      placeholder={`Reply to ${comment.author}...`}
                      autoFocus
                      className="w-full rounded-xl border border-zinc-200 bg-white dark:bg-[#12141D] p-3 text-sm outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 dark:border-white/10 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400 resize-none mb-2"
                    />
                    <div className="flex justify-end gap-2">
                      <button 
                        onClick={() => setReplyingTo(null)}
                        className="rounded-full px-4 py-1.5 text-xs font-medium text-zinc-500 hover:bg-zinc-100 dark:hover:bg-white/5 transition-colors"
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
                  {comment.replies.map(reply => (
                    <div key={reply.id} className="flex gap-4">
                      <div className="w-8 h-8 shrink-0 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                        <img src={reply.avatar} alt={reply.author} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-semibold text-zinc-900 dark:text-white">{reply.author}</span>
                          {reply.isAuthor && (
                            <span className="rounded bg-purple-100 px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-purple-600 dark:bg-purple-500/20 dark:text-purple-400">Author</span>
                          )}
                          <span className="text-xs text-zinc-500">{reply.time}</span>
                        </div>
                        <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed">
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
