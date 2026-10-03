import React from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

export function Contact() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 selection:bg-zinc-200/50 dark:bg-[#070912]">
      <SaaSNavbar />
      
      <section className="relative pt-32 pb-16 sm:pt-40 sm:pb-24 overflow-hidden flex-1">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
            
            {/* Left side: Text & Info */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="flex flex-col"
            >
              <div className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 mb-8 w-fit">
                Contact Us
              </div>
              <h1 className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-6xl dark:text-white mb-6">
                Let's start a <span className="italic font-light text-zinc-500 dark:text-zinc-400">conversation</span>
              </h1>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-12 max-w-lg">
                Whether you have a question about pricing, need a custom demo, or want to explore an enterprise partnership, our team is ready to help.
              </p>

              <div className="space-y-8">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Email Us</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">hello@taskk.com</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400">
                    <Phone className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Call Us</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">+1 (555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-pink-600 dark:bg-pink-500/10 dark:text-pink-400">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-zinc-900 dark:text-white">Visit Us</h3>
                    <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
                      123 Innovation Drive<br />San Francisco, CA 94103
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Right side: Contact Form */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="rounded-3xl bg-white p-6 sm:p-8 shadow-2xl shadow-zinc-200/50 dark:bg-[#12141d] dark:shadow-black/50 border border-zinc-200/50 dark:border-white/5"
            >
              <form className="flex flex-col gap-6" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">First Name</label>
                    <input type="text" className="h-12 w-full rounded-xl border border-zinc-200 bg-transparent px-4 text-sm outline-none transition-colors focus:border-zinc-500 dark:border-zinc-800 dark:focus:border-zinc-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400" placeholder="John" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Last Name</label>
                    <input type="text" className="h-12 w-full rounded-xl border border-zinc-200 bg-transparent px-4 text-sm outline-none transition-colors focus:border-zinc-500 dark:border-zinc-800 dark:focus:border-zinc-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400" placeholder="Doe" />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Work Email</label>
                  <input type="email" className="h-12 w-full rounded-xl border border-zinc-200 bg-transparent px-4 text-sm outline-none transition-colors focus:border-zinc-500 dark:border-zinc-800 dark:focus:border-zinc-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400" placeholder="john@company.com" />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">Message</label>
                  <textarea rows={4} className="w-full resize-none rounded-xl border border-zinc-200 bg-transparent p-4 text-sm outline-none transition-colors focus:border-zinc-500 dark:border-zinc-800 dark:focus:border-zinc-500 text-zinc-900 dark:text-white placeholder:text-zinc-500 dark:placeholder:text-zinc-400" placeholder="How can we help you?" />
                </div>

                <button type="submit" className="mt-2 h-12 w-full rounded-full bg-blue-600 px-8 text-sm font-medium text-white transition-all hover:bg-blue-700 hover:shadow-lg dark:bg-[#1875ff] dark:hover:bg-blue-500">
                  Send Message
                </button>
              </form>
            </motion.div>

          </div>
        </div>
      </section>

      <SaaSFooter />
    </div>
  );
}
