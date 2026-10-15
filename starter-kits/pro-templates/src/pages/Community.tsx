import React from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { SaaSCta } from "@/components/marketing/SaaS/Cta/SaaSCta";
import { motion } from "framer-motion";
import { Users, MessageSquare, Heart, Globe2, Calendar, MapPin } from "lucide-react";

export function Community() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-[#070912]">
      <SaaSNavbar />

      {/* SECTION 1: Hero & Stats */}
      <section className="relative overflow-hidden border-b border-zinc-200/50 pt-32 pb-24 lg:pt-48 lg:pb-32 dark:border-white/5">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[500px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-100/50 blur-[100px] dark:bg-cyan-600/15" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex w-fit items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold tracking-widest text-zinc-600 uppercase dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
          >
            Resources / Community
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white"
          >
            Build together,{" "}
            <span className="font-light text-zinc-500 italic dark:text-zinc-400">
              grow together
            </span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            Join thousands of developers and product managers shaping the future of work. Share
            ideas, get help, and connect with peers.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 flex justify-center gap-8"
          >
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">50k+</div>
              <div className="text-sm font-medium text-zinc-500">Active Members</div>
            </div>
            <div className="h-12 w-px bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">120+</div>
              <div className="text-sm font-medium text-zinc-500">Countries</div>
            </div>
            <div className="hidden h-12 w-px bg-zinc-200 sm:block dark:bg-zinc-800" />
            <div className="hidden flex-col items-center sm:flex">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">1M+</div>
              <div className="text-sm font-medium text-zinc-500">Messages Sent</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Chat UI Mockup */}
      <section className="bg-white py-24 dark:bg-[#0A0C14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="overflow-hidden rounded-3xl border border-zinc-200 bg-zinc-50 shadow-xl dark:border-zinc-800 dark:bg-[#12141D]"
            >
              <div className="flex items-center gap-2 border-b border-zinc-200 bg-white p-4 dark:border-zinc-800 dark:bg-zinc-900/50">
                <div className="h-3 w-3 rounded-full bg-red-400" />
                <div className="h-3 w-3 rounded-full bg-yellow-400" />
                <div className="h-3 w-3 rounded-full bg-green-400" />
                <div className="ml-4 text-sm font-semibold text-zinc-900 dark:text-white">
                  # general-chat
                </div>
              </div>
              <div className="space-y-6 p-6">
                {[
                  {
                    user: "AlexD",
                    avatar: "bg-blue-500",
                    time: "10:24 AM",
                    text: "Hey everyone! Just deployed the new API endpoint, loving the speed so far 🚀",
                  },
                  {
                    user: "SarahJ",
                    avatar: "bg-purple-500",
                    time: "10:26 AM",
                    text: "Nice! Did you use the new caching layer they announced yesterday?",
                  },
                  {
                    user: "AlexD",
                    avatar: "bg-blue-500",
                    time: "10:28 AM",
                    text: "Yes! Reduced latency by 40%. Highly recommend it.",
                  },
                  {
                    user: "TaskkTeam",
                    avatar: "bg-blue-500",
                    time: "10:30 AM",
                    text: "Awesome work @AlexD! Let us know if you have any feedback on the docs.",
                  },
                ].map((msg, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`h-8 w-8 rounded-full ${msg.avatar} shrink-0`} />
                    <div>
                      <div className="mb-1 flex items-baseline gap-2">
                        <span className="text-sm font-bold text-zinc-900 dark:text-white">
                          {msg.user}
                        </span>
                        <span className="text-xs text-zinc-500">{msg.time}</span>
                      </div>
                      <div className="text-sm text-zinc-700 dark:text-zinc-300">{msg.text}</div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100/50 dark:bg-blue-500/10">
                <MessageSquare className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="mb-6 text-3xl font-medium tracking-tight text-zinc-900 dark:text-white">
                A place for everyday conversations
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Whether you're stuck on a bug, looking for architecture advice, or just want to
                share your latest launch, our community Discord is active 24/7.
              </p>

              <button className="flex w-fit items-center gap-2 rounded-full bg-[#5865F2] px-8 py-4 text-sm font-bold text-white shadow-lg shadow-[#5865F2]/20 transition-all hover:bg-[#4752C4]">
                Join our Discord server
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Upcoming Events */}
      <section className="bg-zinc-50 py-24 dark:bg-[#070912]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-12 flex items-center justify-between">
            <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white">
              Upcoming{" "}
              <span className="font-light text-zinc-500 italic dark:text-zinc-400">Events</span>
            </h2>
            <a
              href="#"
              className="text-sm font-medium text-cyan-600 hover:underline dark:text-cyan-400"
            >
              View all events &rarr;
            </a>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              {
                type: "Virtual Meetup",
                title: "Building scalable frontends with BlankUI",
                date: "Oct 15, 2026",
                location: "Online (Zoom)",
              },
              {
                type: "Conference",
                title: "Taskk Developer Summit 2026",
                date: "Nov 02-04, 2026",
                location: "San Francisco, CA",
              },
              {
                type: "Hackathon",
                title: "AI Workflow Automation Hack",
                date: "Dec 10, 2026",
                location: "Online / Global",
              },
            ].map((event, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="hover:border-zinc-2000 rounded-3xl border border-zinc-200 bg-white p-6 transition-colors dark:border-zinc-800 dark:bg-zinc-900"
              >
                <div className="mb-4 text-xs font-bold tracking-wider text-cyan-600 uppercase dark:text-cyan-400">
                  {event.type}
                </div>
                <h3 className="mb-6 text-xl font-bold text-zinc-900 dark:text-white">
                  {event.title}
                </h3>

                <div className="space-y-3 border-t border-zinc-100 pt-6 dark:border-zinc-800">
                  <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <Calendar className="h-4 w-4" /> {event.date}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <MapPin className="h-4 w-4" /> {event.location}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <SaaSCta />
      <SaaSFooter />
    </div>
  );
}
