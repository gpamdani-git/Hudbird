import React, { useState } from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, Calendar, User, Mail } from "lucide-react";
import { Link } from "react-router-dom";

export function Blog() {
  const [activeFilter, setActiveFilter] = useState("All");

  const posts = [
    { tag: "Engineering", title: "How we migrated 50TB of data with zero downtime", date: "Sep 28, 2026", gradient: "from-blue-200 via-cyan-200 to-emerald-200 dark:from-blue-900/40 dark:via-cyan-900/20 dark:to-emerald-900/40", slug: "migrated-50tb" },
    { tag: "Product", title: "New Feature: Advanced Role-Based Access Control", date: "Sep 15, 2026", gradient: "from-purple-200 via-indigo-200 to-pink-200 dark:from-purple-900/40 dark:via-indigo-900/20 dark:to-pink-900/40", slug: "rbac-feature" },
    { tag: "Company", title: "Taskk secures $15M Series A to build the future of work", date: "Sep 01, 2026", gradient: "from-orange-200 via-amber-200 to-yellow-200 dark:from-orange-900/40 dark:via-amber-900/20 dark:to-yellow-900/40", slug: "series-a" },
    { tag: "Engineering", title: "Optimizing React performance in large data grids", date: "Aug 20, 2026", gradient: "from-indigo-200 via-purple-200 to-blue-200 dark:from-indigo-900/40 dark:via-purple-900/20 dark:to-blue-900/40", slug: "react-performance" },
    { tag: "Product", title: "5 ways to automate your daily standups using Taskk", date: "Aug 10, 2026", gradient: "from-emerald-200 via-teal-200 to-cyan-200 dark:from-emerald-900/40 dark:via-teal-900/20 dark:to-cyan-900/40", slug: "automate-standups" },
    { tag: "Design", title: "Behind the scenes: Redesigning our core analytics dashboard", date: "Jul 25, 2026", gradient: "from-rose-200 via-red-200 to-orange-200 dark:from-rose-900/40 dark:via-red-900/20 dark:to-orange-900/40", slug: "redesign-analytics" },
  ];

  const filteredPosts = activeFilter === "All" 
    ? posts 
    : posts.filter(post => post.tag === activeFilter);

  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-[#070912]">
      <SaaSNavbar />
      
      {/* SECTION 1: Featured Article */}
      <section className="relative pt-32 pb-12 lg:pt-48 lg:pb-24 overflow-hidden border-b border-zinc-200/50 dark:border-white/5">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-zinc-100/50 dark:bg-blue-600/15 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 items-center">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="lg:w-1/2 flex flex-col"
            >
              <div className="inline-flex items-center rounded-full border border-emerald-200/50 bg-zinc-100/50 dark:border-blue-500/20 dark:bg-blue-500/10 px-3 py-1 text-xs font-bold uppercase tracking-widest text-emerald-600 dark:text-emerald-400 mb-6 w-fit">
                Featured Post
              </div>
              <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight text-zinc-900 dark:text-white mb-6 leading-tight">
                Introducing Taskk 2.0: The Future of Workflow Automation
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Today we're thrilled to announce the biggest update to Taskk since our launch. We've completely rebuilt our engine to be 10x faster and added AI-powered automations.
              </p>
              
              <div className="flex items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400 mb-8">
                <div className="flex items-center gap-1.5"><Calendar className="w-4 h-4" /> Oct 2, 2026</div>
                <div className="w-1 h-1 rounded-full bg-zinc-300 dark:bg-zinc-700" />
                <div className="flex items-center gap-1.5"><User className="w-4 h-4" /> Sarah Jenkins</div>
              </div>

              <Link to="/blog/taskk-2-0" className="flex w-fit items-center gap-2 rounded-full bg-zinc-900 px-6 py-3 text-sm font-medium text-white transition-all hover:bg-zinc-800 dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200">
                Read the full story <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="lg:w-1/2 w-full aspect-[4/3] rounded-3xl bg-gradient-to-br from-blue-200 via-cyan-200 to-emerald-200 dark:from-blue-900/40 dark:via-cyan-900/20 dark:to-emerald-900/40 overflow-hidden relative shadow-2xl"
            >
              <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTIwIDIwTDAgME0yMCAyMGwyMCAyME0yMCAyMEwwIDQwTTIwIDIwbDIwLTIwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-30" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-6xl font-black text-zinc-900/50 dark:text-white/80 tracking-tighter mix-blend-overlay">TASKK 2.0</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 2: Latest Articles Grid */}
      <section className="py-24 bg-white dark:bg-[#0A0C14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-12 gap-6">
            <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white">Latest <span className="italic font-light text-zinc-500 dark:text-zinc-400">Articles</span></h2>
            <div className="flex flex-wrap gap-2">
              {['All', 'Product', 'Engineering', 'Company', 'Design'].map(tag => (
                <button 
                  key={tag} 
                  onClick={() => setActiveFilter(tag)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    activeFilter === tag 
                      ? 'bg-zinc-900 text-white dark:bg-white dark:text-zinc-900' 
                      : 'text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-900'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <AnimatePresence mode="popLayout">
              {filteredPosts.map((post, i) => (
                <motion.div 
                  key={post.title}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                >
                  <Link
                    to={`/blog/${post.slug}`}
                    className="group flex flex-col gap-4 block h-full"
                  >
                    <div className={`aspect-[16/10] rounded-2xl overflow-hidden bg-gradient-to-br ${post.gradient} relative shadow-sm group-hover:shadow-md transition-all`}>
                      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+CjxwYXRoIGQ9Ik0wIDBoNDB2NDBIMHoiIGZpbGw9Im5vbmUiLz4KPHBhdGggZD0iTTIwIDIwTDAgME0yMCAyMGwyMCAyME0yMCAyMEwwIDQwTTIwIDIwbDIwLTIwIiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4xKSIgc3Ryb2tlLXdpZHRoPSIxIi8+Cjwvc3ZnPg==')] opacity-20" />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
                      <div className="absolute top-4 left-4 rounded-full bg-white/90 backdrop-blur-sm dark:bg-zinc-900/90 px-3 py-1 text-xs font-bold text-zinc-900 dark:text-white">
                        {post.tag}
                      </div>
                      <div className="absolute bottom-4 left-4 right-4 text-zinc-900 dark:text-white font-bold text-xl opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
                        Read Article &rarr;
                      </div>
                    </div>
                    <div>
                      <div className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">{post.date}</div>
                      <h3 className="text-xl font-bold text-zinc-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors">
                        {post.title}
                      </h3>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </section>

      {/* SECTION 3: Newsletter */}
      <section className="py-24 bg-zinc-50 dark:bg-[#070912]">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-12 rounded-3xl bg-white dark:bg-zinc-900/20 border border-zinc-200 dark:border-white/10 relative overflow-hidden shadow-xl"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-zinc-100 dark:bg-white/5 blur-[80px] rounded-full pointer-events-none" />
            <div className="relative z-10">
              <div className="w-16 h-16 mx-auto bg-zinc-100 dark:bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Mail className="w-8 h-8 text-zinc-900 dark:text-white" />
              </div>
              <h2 className="text-3xl font-bold text-zinc-900 dark:text-white mb-4">Never miss an update</h2>
              <p className="text-zinc-600 dark:text-zinc-400 mb-8 max-w-lg mx-auto">
                Get the latest articles, product updates, and industry insights delivered straight to your inbox once a month.
              </p>
              
              <form className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
                <input 
                  type="email" 
                  placeholder="Enter your email" 
                  className="flex-1 px-4 py-3 rounded-full bg-white dark:bg-black/20 border border-zinc-200 dark:border-white/10 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-500 focus:outline-none focus:ring-2 focus:ring-zinc-900 dark:focus:ring-white/50 shadow-sm"
                  required
                />
                <button type="submit" className="px-6 py-3 rounded-full bg-zinc-900 text-white font-bold hover:bg-zinc-800 transition-colors dark:bg-white dark:text-zinc-900 dark:hover:bg-zinc-200 shadow-sm">
                  Subscribe
                </button>
              </form>
            </div>
          </motion.div>
        </div>
      </section>

      <SaaSFooter />
    </div>
  );
}
