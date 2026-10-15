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
      <section className="relative overflow-hidden pt-32 pb-24 lg:pt-48 lg:pb-32">
        <div className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-zinc-100/50 blur-[100px] dark:bg-orange-600/15" />

        <div className="relative z-10 mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-8 inline-flex w-fit items-center rounded-full border border-zinc-200 bg-zinc-100 px-3 py-1 text-[10px] font-bold tracking-widest text-zinc-600 uppercase dark:border-white/10 dark:bg-white/5 dark:text-zinc-400"
          >
            Product / Security
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl font-semibold tracking-tight text-zinc-900 sm:text-6xl dark:text-white"
          >
            Enterprise-grade{" "}
            <span className="font-light text-zinc-500 italic dark:text-zinc-400">protection</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400"
          >
            Your data is your most valuable asset. We use bank-level encryption, regular audits, and
            strict access controls to keep it secure.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-16 grid grid-cols-1 gap-6 text-left md:grid-cols-3"
          >
            {[
              {
                title: "End-to-End Encryption",
                icon: <Lock className="h-6 w-6 text-orange-500" />,
              },
              {
                title: "Compliance Ready",
                icon: <ShieldCheck className="h-6 w-6 text-orange-500" />,
              },
              { title: "SSO & Access Control", icon: <Key className="h-6 w-6 text-orange-500" /> },
            ].map((feature, idx) => (
              <div
                key={idx}
                className="hover:border-zinc-2000 rounded-3xl border border-zinc-200 bg-white p-8 shadow-xl shadow-zinc-200/50 transition-colors dark:border-white/5 dark:bg-zinc-900/50 dark:shadow-none"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-zinc-50 dark:bg-orange-500/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-zinc-900 dark:text-white">
                  {feature.title}
                </h3>
                <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-400">
                  Advanced security measures designed to meet the rigorous requirements of modern
                  enterprises.
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* SECTION 2: Compliance & Certifications */}
      <section className="border-y border-zinc-200/50 bg-white py-24 dark:border-white/5 dark:bg-[#0A0C14]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="mb-6 text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
              Certified trust, globally recognized
            </h2>
            <p className="text-lg text-zinc-600 dark:text-zinc-400">
              We adhere to the highest international standards for data privacy and security,
              ensuring your team can operate without compliance anxiety.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {[
              {
                name: "SOC 2 Type II",
                desc: "Independently audited for security, availability, and confidentiality.",
                icon: <FileText className="h-8 w-8" />,
              },
              {
                name: "GDPR Compliant",
                desc: "Full adherence to European data protection and privacy regulations.",
                icon: <ShieldCheck className="h-8 w-8" />,
              },
              {
                name: "ISO 27001",
                desc: "Certified information security management systems in place.",
                icon: <Server className="h-8 w-8" />,
              },
            ].map((cert, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex flex-col items-center rounded-3xl border border-zinc-200/50 bg-zinc-50 p-8 text-center dark:border-white/5 dark:bg-[#12141D]"
              >
                <div className="mb-6 text-orange-500">{cert.icon}</div>
                <h3 className="mb-3 text-xl font-bold text-zinc-900 dark:text-white">
                  {cert.name}
                </h3>
                <p className="text-sm text-zinc-600 dark:text-zinc-400">{cert.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: Zero Trust Architecture */}
      <section className="bg-zinc-50 py-24 dark:bg-[#070912]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-16 lg:grid-cols-2">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="order-2 flex flex-col justify-center lg:order-1"
            >
              <div className="mb-4 text-[10px] font-bold tracking-wider text-orange-600 uppercase dark:text-orange-400">
                Zero Trust Architecture
              </div>
              <h2 className="mb-6 text-3xl font-medium tracking-tight text-zinc-900 sm:text-4xl dark:text-white">
                Never trust, always verify
              </h2>
              <p className="mb-8 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
                Our infrastructure is built on the Zero Trust security model. Every request is
                authenticated, authorized, and continuously validated before granting access.
              </p>

              <ul className="space-y-4">
                {[
                  "Multi-factor authentication (MFA) enforced",
                  "Role-based access control (RBAC)",
                  "Automated threat detection and blocking",
                  "24/7 infrastructure monitoring",
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center gap-3">
                    <Fingerprint className="h-5 w-5 text-orange-500" />
                    <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative order-1 flex h-[400px] items-center justify-center overflow-hidden rounded-3xl border border-zinc-200/50 bg-zinc-100 sm:h-[500px] lg:order-2 dark:border-white/5 dark:bg-zinc-900"
            >
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-zinc-500/20 via-transparent to-transparent opacity-50" />

              {/* Abstract Security Diagram */}
              <div className="relative z-10 w-full max-w-sm">
                <div className="relative mx-auto mb-8 h-32 w-32">
                  <div className="absolute inset-0 animate-[spin_10s_linear_infinite] rounded-full border-4 border-zinc-200" />
                  <div className="border-zinc-2000 absolute inset-2 animate-[spin_7s_linear_infinite_reverse] rounded-full border-4" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <ShieldCheck className="h-12 w-12 text-orange-500" />
                  </div>
                </div>

                <div className="mb-4 flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 shadow-xl dark:border-zinc-800 dark:bg-[#12141D]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <Lock className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white">
                        API Request
                      </div>
                      <div className="text-[10px] text-zinc-500">Authenticating token...</div>
                    </div>
                  </div>
                  <div className="rounded bg-green-500/10 px-2 py-1 text-[10px] font-bold text-green-500">
                    VERIFIED
                  </div>
                </div>

                <div className="flex items-center justify-between rounded-2xl border border-zinc-200 bg-white p-4 opacity-50 shadow-xl dark:border-zinc-800 dark:bg-[#12141D]">
                  <div className="flex items-center gap-3">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800">
                      <Lock className="h-4 w-4 text-zinc-500 dark:text-zinc-400" />
                    </div>
                    <div>
                      <div className="text-xs font-bold text-zinc-900 dark:text-white">
                        Database Query
                      </div>
                      <div className="text-[10px] text-zinc-500">Checking permissions...</div>
                    </div>
                  </div>
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-zinc-300 border-t-zinc-500 dark:border-zinc-700" />
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
