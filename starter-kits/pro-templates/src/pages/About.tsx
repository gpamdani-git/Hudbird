import React from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { SaaSCta } from "@/components/marketing/SaaS/Cta/SaaSCta";
import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";

export function About() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-zinc-200/50 dark:bg-[#070912]">
      <SaaSNavbar />
      
      {/* 1. Hero Section */}
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 text-center flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 mb-8"
          >
            SaaS Template
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-7xl dark:text-white max-w-4xl"
          >
            When the stakes rise, <br className="hidden sm:block" />
            words <span className="italic font-light text-zinc-500 dark:text-zinc-400">matter</span> most
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-10 flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Link 
              to="/register" 
              className="group flex h-12 items-center justify-center gap-2 rounded-full bg-zinc-900 px-8 text-sm font-medium text-white transition-all hover:bg-zinc-800 hover:shadow-lg dark:bg-white dark:text-zinc-950 dark:hover:bg-zinc-200"
            >
              Get template
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link 
              to="/contact" 
              className="flex h-12 items-center justify-center rounded-full border border-zinc-200 bg-white px-8 text-sm font-medium text-zinc-900 transition-all hover:bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950 dark:text-white dark:hover:bg-zinc-900"
            >
              Book a consultation
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 flex flex-col items-center gap-4"
          >
            <div className="flex -space-x-3">
              {[
                "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=faces",
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces",
              ].map((src, i) => (
                <img key={i} src={src} alt="Client" className="h-10 w-10 rounded-full border-2 border-zinc-50 object-cover dark:border-[#070912]" />
              ))}
            </div>
            <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
              Trusted by 500+ clients across industries
            </p>
          </motion.div>
        </div>
      </section>

      {/* 2. Bento Images Section */}
      <section className="px-4 sm:px-6 lg:px-8 mx-auto max-w-7xl w-full pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 h-auto lg:h-[500px]">
          {/* Left Large Image */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-5 h-[400px] lg:h-full rounded-3xl overflow-hidden relative group"
          >
            <img 
              src="https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
              alt="Woman relaxing" 
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
          </motion.div>

          {/* Right Area */}
          <div className="lg:col-span-7 flex flex-col gap-4 h-full">
            <div className="flex flex-col sm:flex-row gap-4 h-[400px] lg:h-[55%]">
              {/* Top Left - UI Mockup */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.1 }}
                className="flex-1 rounded-3xl bg-zinc-100 dark:bg-orange-950/30 p-6 relative overflow-hidden flex flex-col justify-center border border-zinc-200/50 dark:border-white/5"
              >
                {/* Abstract blur background */}
                <div className="absolute inset-0 bg-gradient-to-br from-zinc-400/50 to-zinc-500/50 blur-3xl rounded-full scale-[2] transform translate-x-1/4 -translate-y-1/4" />
                <div className="relative z-10 w-full max-w-[240px] mx-auto space-y-3">
                  <div className="h-10 w-full rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm flex items-center px-4 justify-between">
                    <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">Draft sent</div>
                    <div className="h-5 px-2 bg-zinc-100 dark:bg-blue-900/50 rounded-full flex items-center justify-center text-[8px] font-bold tracking-wider text-blue-600 dark:text-blue-400">DELIVERED</div>
                  </div>
                  <div className="h-10 w-full rounded-2xl bg-white/70 dark:bg-zinc-900/70 backdrop-blur-md shadow-sm flex items-center px-4 justify-between">
                    <div className="text-xs font-medium text-zinc-800 dark:text-zinc-200">Review Stage</div>
                    <div className="h-5 px-2 bg-zinc-100 dark:bg-orange-900/50 rounded-full flex items-center justify-center text-[8px] font-bold tracking-wider text-orange-600 dark:text-orange-400">REVIEWER</div>
                  </div>
                  <div className="h-10 w-full rounded-2xl bg-zinc-900 dark:bg-white backdrop-blur-md shadow-xl flex items-center px-4 justify-between">
                    <div className="text-xs font-medium text-white dark:text-zinc-900">Final approval</div>
                    <div className="h-5 px-2 bg-zinc-800 dark:bg-zinc-100 rounded-full flex items-center justify-center text-[8px] font-bold tracking-wider text-white dark:text-zinc-900">AWAITING</div>
                  </div>
                </div>
              </motion.div>
              {/* Top Right - Abstract shape */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="w-full sm:w-[40%] rounded-3xl bg-zinc-200 dark:bg-[#12141d] flex items-center justify-center p-8 border border-zinc-200/50 dark:border-white/5"
              >
                <div className="grid grid-cols-3 gap-2 w-24 h-24 transform -rotate-45">
                  <div className="bg-zinc-900 dark:bg-white rounded-sm" />
                  <div className="bg-zinc-900 dark:bg-white rounded-sm" />
                  <div className="bg-zinc-900 dark:bg-white rounded-sm opacity-0" />
                  <div className="bg-zinc-900 dark:bg-white rounded-sm" />
                  <div className="bg-zinc-900 dark:bg-white rounded-sm col-span-2" />
                  <div className="bg-zinc-900 dark:bg-white rounded-sm opacity-0" />
                  <div className="bg-zinc-900 dark:bg-white rounded-sm col-span-2 row-span-2" />
                </div>
              </motion.div>
            </div>
            
            {/* Bottom - Wide Card */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="rounded-3xl bg-zinc-900 dark:bg-[#12141d] h-[300px] lg:h-[45%] flex items-center justify-center p-6 relative overflow-hidden border border-zinc-800 dark:border-white/5"
            >
              <div className="w-full max-w-md rounded-2xl bg-white dark:bg-zinc-900 p-5 shadow-2xl relative z-10 border border-zinc-100 dark:border-zinc-800">
                <div className="flex items-center gap-2 mb-3">
                  <div className="h-6 w-6 rounded border border-zinc-200 dark:border-zinc-700 flex items-center justify-center">
                    <CheckCircle2 className="h-3 w-3 text-zinc-400" />
                  </div>
                  <span className="text-[10px] font-bold tracking-wider text-zinc-500 uppercase">Coaching Follow-up</span>
                </div>
                <p className="text-sm text-zinc-600 dark:text-zinc-300 mb-4 leading-relaxed font-medium">
                  Hi Alex, great progress today. Your message landed with clarity. For next time, try slowing your pace.
                </p>
                <div className="flex items-center justify-between border-t border-zinc-100 dark:border-zinc-800 pt-3">
                  <span className="text-[10px] font-semibold text-zinc-400 uppercase tracking-wider">✓ Sent by Jessica Mercedes</span>
                  <button className="text-[10px] font-bold tracking-wider uppercase bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 px-4 py-1.5 rounded-full hover:opacity-80 transition-opacity">Answer</button>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* 3. Process Section */}
      <section className="py-24 bg-white dark:bg-[#0A0C14] border-y border-zinc-200/50 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            {/* Left side text and image */}
            <div className="flex flex-col gap-10 lg:pr-8">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-2xl sm:text-3xl font-serif text-zinc-900 dark:text-white leading-snug"
              >
                We help expert-led teams structure their communication around what actually needs to be said — clearly, calmly, and with intent.
              </motion.h2>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
                className="rounded-3xl overflow-hidden aspect-[4/3] bg-zinc-100 dark:bg-zinc-900 relative group border border-zinc-200/50 dark:border-white/5"
              >
                <img 
                  src="https://images.unsplash.com/photo-1542744173-8e7e53415bb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                  alt="Team discussion" 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </motion.div>
            </div>

            {/* Right side process list */}
            <div className="flex flex-col pt-2">
              {[
                { time: "1 WEEK", title: "Discovery Audit", desc: "We start with a deep-dive into your current systems, challenges, and KPIs. Outcome: clarity on what matters most." },
                { time: "1-2 WEEKS", title: "Planning Brief", desc: "We design a tailored framework and roadmap. Outcome: a measurable plan aligned with your goals." },
                { time: "3 WEEK", title: "Execution Track", desc: "Modular delivery cycles with clear milestones and check-ins. Outcome: visible progress at every stage." },
                { time: "4 WEEK", title: "Performance Review", desc: "We measure results, track KPIs, and adapt strategies. Outcome: impact you can quantify." }
              ].map((step, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="group flex flex-col sm:flex-row gap-4 sm:gap-8 py-8 border-b border-zinc-200 dark:border-zinc-800 last:border-0"
                >
                  <div className="w-full sm:w-[40%] shrink-0">
                    <div className="text-[10px] font-bold tracking-wider text-zinc-400 uppercase mb-2">{step.time}</div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white transition-colors group-hover:text-blue-600 dark:group-hover:text-blue-400">{step.title}</h3>
                  </div>
                  <div className="w-full sm:w-[60%]">
                    <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 4. How It Works / Architecture Section */}
      <section className="py-24 bg-zinc-50 dark:bg-[#070912] relative overflow-hidden">
        {/* Background Decorative Gradients */}
        <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-zinc-200 dark:via-zinc-800 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-zinc-100/50 dark:bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="text-[10px] font-bold tracking-wider text-blue-600 dark:text-blue-400 uppercase mb-4">HOW IT WORKS</div>
            <h2 className="text-3xl sm:text-5xl font-medium tracking-tight text-zinc-900 dark:text-white">
              Rebuild the <span className="italic font-light text-zinc-500 dark:text-zinc-400">architecture</span>
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-sm text-zinc-500 dark:text-zinc-400">
              A systematic approach to breaking down complex communication silos and building a unified framework that scales with your team.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Deconstruct",
                desc: "We analyze your existing workflows, identifying bottlenecks, redundancies, and miscommunications that slow down execution.",
                icon: (
                  <div className="grid grid-cols-2 gap-1 w-12 h-12">
                    <div className="bg-zinc-200 dark:bg-zinc-800 rounded-tl-lg" />
                    <div className="bg-zinc-300 dark:bg-zinc-700 rounded-tr-lg" />
                    <div className="bg-zinc-300 dark:bg-zinc-700 rounded-bl-lg" />
                    <div className="bg-zinc-400 dark:bg-zinc-600 rounded-br-lg" />
                  </div>
                )
              },
              {
                step: "02",
                title: "Design",
                desc: "We engineer a new communication topology. Clear channels, structured updates, and automated follow-ups to keep everyone aligned.",
                icon: (
                  <div className="flex flex-col gap-1 w-12 h-12">
                    <div className="flex-1 bg-zinc-100 dark:bg-blue-900/50 rounded-t-lg" />
                    <div className="flex gap-1 flex-1">
                      <div className="flex-1 bg-blue-200 dark:bg-blue-800/50 rounded-bl-lg" />
                      <div className="flex-[2] bg-blue-500 dark:bg-blue-500 rounded-br-lg" />
                    </div>
                  </div>
                )
              },
              {
                step: "03",
                title: "Deploy",
                desc: "Implementation is rolled out in phases. We train your leaders, monitor adoption metrics, and refine the architecture in real-time.",
                icon: (
                  <div className="relative w-12 h-12">
                    <div className="absolute inset-0 border-2 border-zinc-200 dark:border-zinc-700 rounded-full" />
                    <div className="absolute inset-2 bg-zinc-900 dark:bg-white rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-white dark:bg-zinc-900 rounded-full animate-pulse" />
                    </div>
                  </div>
                )
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15 }}
                className="group relative p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 hover:border-zinc-300 dark:hover:border-white/10 transition-colors overflow-hidden"
              >
                {/* Hover Glow */}
                <div className="absolute -inset-px bg-gradient-to-b from-zinc-100 dark:from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-3xl pointer-events-none" />
                
                <div className="relative z-10 flex flex-col h-full">
                  <div className="mb-8 flex items-center justify-between">
                    {item.icon}
                    <span className="text-4xl font-light text-zinc-300 dark:text-zinc-800/50">{item.step}</span>
                  </div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
                    {item.desc}
                  </p>
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
