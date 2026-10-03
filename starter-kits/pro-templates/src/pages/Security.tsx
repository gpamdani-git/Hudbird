import React from "react";
import { SaaSNavbar } from "@/components/marketing/SaaS/Navbar/SaaSNavbar";
import { SaaSFooter } from "@/components/marketing/SaaS/Footer/SaaSFooter";
import { SaaSCta } from "@/components/marketing/SaaS/Cta/SaaSCta";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Key, Server, FileText, Fingerprint } from "lucide-react";

export function Security() {
  return (
    <div className="flex min-h-screen w-full flex-col bg-zinc-50 dark:bg-[#070912]">
      <SaaSNavbar />
      
      {/* SECTION 1: Hero & Features Grid */}
      <section className="relative pt-32 pb-24 lg:pt-48 lg:pb-32 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-zinc-100/50 dark:bg-orange-600/15 blur-[100px] rounded-full pointer-events-none" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="inline-flex items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-zinc-600 dark:border-white/10 dark:bg-white/5 dark:text-zinc-400 mb-8 w-fit">
            Product / Security
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white">
            Enterprise-grade <span className="italic font-light text-zinc-500 dark:text-zinc-400">protection</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="mt-6 mx-auto max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">
            Your data is your most valuable asset. We use bank-level encryption, regular audits, and strict access controls to keep it secure.
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            {[
              { title: "End-to-End Encryption", icon: <Lock className="w-6 h-6 text-orange-500" /> },
              { title: "Compliance Ready", icon: <ShieldCheck className="w-6 h-6 text-orange-500" /> },
              { title: "SSO & Access Control", icon: <Key className="w-6 h-6 text-orange-500" /> }
            ].map((feature, idx) => (
              <div key={idx} className="p-8 rounded-3xl bg-white dark:bg-zinc-900/50 border border-zinc-200 dark:border-white/5 shadow-xl shadow-zinc-200/50 dark:shadow-none hover:border-zinc-2000 transition-colors">
                <div className="mb-4 bg-zinc-50 dark:bg-orange-500/10 w-12 h-12 rounded-2xl flex items-center justify-center">{feature.icon}</div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">{feature.title}</h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">Advanced security measures designed to meet the rigorous requirements of modern enterprises.</p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Compliance & Certifications */}
      <section className="py-24 bg-white dark:bg-[#0A0C14] border-y border-zinc-200/50 dark:border-white/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 dark:text-white mb-6">
              Certified trust, globally recognized
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              We adhere to the highest international standards for data privacy and security, ensuring your team can operate without compliance anxiety.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { name: "SOC 2 Type II", desc: "Independently audited for security, availability, and confidentiality.", icon: <FileText className="w-8 h-8" /> },
              { name: "GDPR Compliant", desc: "Full adherence to European data protection and privacy regulations.", icon: <ShieldCheck className="w-8 h-8" /> },
              { name: "ISO 27001", desc: "Certified information security management systems in place.", icon: <Server className="w-8 h-8" /> }
            ].map((cert, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center text-center p-8 rounded-3xl bg-zinc-50 dark:bg-[#12141D] border border-zinc-200/50 dark:border-white/5"
              >
                <div className="text-orange-500 mb-6">{cert.icon}</div>
                <h3 className="text-xl font-bold text-zinc-900 dark:text-white mb-3">{cert.name}</h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Zero Trust Architecture */}
      <section className="py-24 bg-zinc-50 dark:bg-[#070912]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="flex flex-col justify-center order-2 lg:order-1"
            >
              <div className="text-[10px] font-bold tracking-wider text-orange-600 dark:text-orange-400 uppercase mb-4">Zero Trust Architecture</div>
              <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-900 dark:text-white mb-6">
                Never trust, always verify
              </h2>
              <p className="text-lg text-zinc-600 dark:text-zinc-400 mb-8 leading-relaxed">
                Our infrastructure is built on the Zero Trust security model. Every request is authenticated, authorized, and continuously validated before granting access.
              </p>
              
              <ul className="space-y-4">
                {[
                  "Multi-factor authentication (MFA) enforced",
                  "Role-based access control (RBAC)",
                  "Automated threat detection and blocking",
                  "24/7 infrastructure monitoring"
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Fingerprint className="w-5 h-5 text-orange-500" />
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2 h-[400px] sm:h-[500px] rounded-3xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200/50 dark:border-white/5 relative overflow-hidden flex items-center justify-center"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-500/20 via-transparent to-transparent opacity-50" />
              
              {/* Abstract Security Diagram */}
              <div className="relative z-10 w-full max-w-sm">
                <div className="relative mx-auto w-32 h-32 mb-8">
                  <div className="absolute inset-0 border-4 border-zinc-200 rounded-full animate-[spin_10s_linear_infinite]" />
                  <div className="absolute inset-2 border-4 border-zinc-2000 rounded-full animate-[spin_7s_linear_infinite_reverse]" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="w-12 h-12 text-orange-500" />
                  </div>
                </div>
                
                <div className="bg-white dark:bg-[#12141D] rounded-2xl p-4 shadow-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white">API Request</div>
                      <div className="text-[10px] text-zinc-500">Authenticating token...</div>
                    </div>
                  </div>
                  <div className="text-[10px] font-bold text-green-500 bg-green-500/10 px-2 py-1 rounded">VERIFIED</div>
                </div>
                
                <div className="bg-white dark:bg-[#12141D] rounded-2xl p-4 shadow-xl border border-zinc-200 dark:border-zinc-800 flex items-center justify-between opacity-50">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
                      <Lock className="w-4 h-4 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white">Database Query</div>
                      <div className="text-[10px] text-zinc-500">Checking permissions...</div>
                    </div>
                  </div>
                  <div className="w-4 h-4 border-2 border-zinc-300 dark:border-zinc-700 border-t-zinc-500 rounded-full animate-spin" />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <SaaSCta />
      <SaaSFooter />
    </div>
  );
}
