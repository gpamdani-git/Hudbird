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
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden border-b border-zinc-200/50 dark:border-white/5">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-zinc-100/50 dark:bg-cyan-600/15 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 mb-8 w-fit">
            Resources / Community
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
            Build together, <span className="italic font-light text-zinc-500 dark:text-zinc-400">grow together</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Join thousands of developers and product managers shaping the future of work. Share ideas, get help, and connect with peers.
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
            <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800" />
            <div className="flex flex-col items-center">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">120+</div>
              <div className="text-sm font-medium text-zinc-500">Countries</div>
            </div>
            <div className="w-px h-12 bg-zinc-200 dark:bg-zinc-800 hidden sm:block" />
            <div className="hidden flex-col items-center sm:flex">
              <div className="text-3xl font-bold text-zinc-900 dark:text-white">1M+</div>
              <div className="text-sm font-medium text-zinc-500">Messages Sent</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Chat UI Mockup */}
      <section className="py-24 bg-white dark:bg-[#0A0C14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="rounded-3xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-[#12141D] overflow-hidden shadow-xl"
            >
              <div className="flex items-center gap-2 p-4 border-b border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/50">
                <div className="w-3 h-3 rounded-full bg-red-400" />
                <div className="w-3 h-3 rounded-full bg-yellow-400" />
                <div className="w-3 h-3 rounded-full bg-green-400" />
                <div className="ml-4 font-semibold text-sm text-zinc-900 dark:text-white"># general-chat</div>
              </div>
              <div className="p-6 space-y-6">
                {[
                  { user: "AlexD", avatar: "bg-blue-500", time: "10:24 AM", text: "Hey everyone! Just deployed the new API endpoint, loving the speed so far 🚀" },
                  { user: "SarahJ", avatar: "bg-purple-500", time: "10:26 AM", text: "Nice! Did you use the new caching layer they announced yesterday?" },
                  { user: "AlexD", avatar: "bg-blue-500", time: "10:28 AM", text: "Yes! Reduced latency by 40%. Highly recommend it." },
                  { user: "TaskkTeam", avatar: "bg-blue-500", time: "10:30 AM", text: "Awesome work @AlexD! Let us know if you have any feedback on the docs." }
                ].map((msg, i) => (
                  <div key={i} className="flex gap-4">
                    <div className={`w-8 h-8 rounded-full ${msg.avatar} shrink-0`} />
                    <div>
                      <div className="flex items-baseline gap-2 mb-1">
                        <span className="font-bold text-sm text-zinc-900 dark:text-white">{msg.user}</span>
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
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-100/50 dark:bg-blue-500/10 mb-6">
                <MessageSquare className="h-6 w-6 text-cyan-600 dark:text-cyan-400" />
              </div>
              <h2 className="text-3xl font-medium tracking-tight text-zinc-900 dark:text-white mb-6">
                A place for everyday conversations
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Whether you're stuck on a bug, looking for architecture advice, or just want to share your latest launch, our community Discord is active 24/7.
              </p>
              
              <button className="flex w-fit items-center gap-2 rounded-full bg-[#5865F2] px-8 py-4 text-sm font-bold text-white transition-all hover:bg-[#4752C4] shadow-lg shadow-[#5865F2]/20">
                Join our Discord server
              </button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* SECTION 3: Upcoming Events */}
      <section className="py-24 bg-zinc-50 dark:bg-[#070912]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-semibold text-zinc-900 dark:text-white">Upcoming <span className="italic font-light text-zinc-500 dark:text-zinc-400">Events</span></h2>
            <a href="#" className="text-cyan-600 dark:text-cyan-400 font-medium text-sm hover:underline">View all events &rarr;</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { type: "Virtual Meetup", title: "Building scalable frontends with BlankUI", date: "Oct 15, 2026", location: "Online (Zoom)" },
              { type: "Conference", title: "Taskk Developer Summit 2026", date: "Nov 02-04, 2026", location: "San Francisco, CA" },
              { type: "Hackathon", title: "AI Workflow Automation Hack", date: "Dec 10, 2026", location: "Online / Global" },
            ].map((event, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-3xl bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-2000 transition-colors"
              >
                <div className="text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-4">{event.type}</div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-6">{event.title}</h3>
                
                <div className="space-y-3 pt-6 border-t border-zinc-100 dark:border-zinc-800">
                  <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <Calendar className="w-4 h-4" /> {event.date}
                  </div>
                  <div className="flex items-center gap-3 text-sm text-zinc-600 dark:text-zinc-400">
                    <MapPin className="w-4 h-4" /> {event.location}
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
