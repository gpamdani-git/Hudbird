import React from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Badge } from "@hudbird/ui";

const TEMPLATES = [
  {
    id: "saas-launchpad",
    name: "SaaS Launchpad",
    category: "Landing Page",
    path: "/saas-launchpad",
    isNew: false,
    imageLight: "/assets/templates/saas-launchpad-light.png",
    imageDark: "/assets/templates/saas-launchpad.png",
  },
  {
    id: "ai-startup",
    name: "AI Startup",
    category: "Landing Page",
    path: "/ai-startup",
    isNew: true,
    imageLight: "/assets/templates/ai-startup-light.png",
    imageDark: "/assets/templates/ai-startup.png",
  },
  {
    id: "modern-app",
    name: "Modern App",
    category: "Landing Page",
    path: "/modern-app",
    isNew: false,
    imageLight: "/assets/templates/modern-app-light.png",
    imageDark: "/assets/templates/modern-app.png",
  },
  {
    id: "ecommerce",
    name: "Ecommerce",
    category: "Landing Page",
    path: "/ecommerce",
    isNew: false,
    imageLight: "/assets/templates/ecommerce-light.png",
    imageDark: "/assets/templates/ecommerce.png",
  },
  {
    id: "fintech",
    name: "Fintech",
    category: "Landing Page",
    path: "/fintech",
    isNew: true,
    imageLight: "/assets/templates/fintech-light.png",
    imageDark: "/assets/templates/fintech.png",
  },
  {
    id: "hospitality",
    name: "Hospitality",
    category: "Landing Page",
    path: "/hospitality",
    isNew: false,
    imageLight: "/assets/templates/hospitality-light.png",
    imageDark: "/assets/templates/hospitality.png",
  },
  {
    id: "agency",
    name: "Agency",
    category: "Landing Page",
    path: "/agency",
    isNew: false,
    imageLight: "/assets/templates/agency-light.png",
    imageDark: "/assets/templates/agency.png",
  },
];

const ADMIN_CMS = [
  {
    id: "admin-cms",
    name: "Hudbird Dashboard",
    category: "Admin CMS",
    path: "/dashboard",
    isNew: true,
    imageLight: "/assets/templates/admin-cms-light.png",
    imageDark: "/assets/templates/admin-cms.png",
  },
];

export function ShowcaseGallery() {
  return (
    <section className="relative z-10 mx-auto w-full max-w-[1400px] px-4 py-16 sm:px-6 lg:px-8">
      {/* Landing Pages Section */}
      <div className="mb-8 flex items-center justify-between">
        <h2 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white">
          Landing Pages
        </h2>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {TEMPLATES.length} templates
        </span>
      </div>

      <div className="mb-24 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {TEMPLATES.map((template, idx) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: (idx % 3) * 0.1 }}
            className="group relative flex flex-col gap-4"
          >
            {/* Card Container */}
            <Link
              to={template.path}
              className="group-hover:border-primary-500/50 dark:group-hover:border-primary-500/50 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm transition-all duration-300 group-hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 rounded-full bg-zinc-900/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                  View Template <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Light Image */}
              <img
                src={template.imageLight}
                alt={template.name}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 dark:hidden"
                loading="lazy"
              />

              {/* Dark Image */}
              <img
                src={template.imageDark}
                alt={template.name}
                className="absolute inset-0 hidden h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 dark:block"
                loading="lazy"
              />
            </Link>

            {/* Info */}
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
                  {template.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{template.category}</p>
              </div>
              {template.isNew && (
                <Badge
                  variant="default"
                  className="rounded-full border-none bg-lime-400 px-3 font-semibold text-lime-950 hover:bg-lime-500"
                >
                  New
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Admin CMS Section */}
      <div className="mb-8 flex items-center justify-between border-t border-zinc-200 pt-16 dark:border-zinc-800">
        <h2 className="font-heading text-2xl font-bold text-zinc-900 dark:text-white">
          Admin CMS & Dashboards
        </h2>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">
          {ADMIN_CMS.length} templates
        </span>
      </div>

      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {ADMIN_CMS.map((template, idx) => (
          <motion.div
            key={template.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.5, delay: idx * 0.1 }}
            className="group relative flex flex-col gap-4"
          >
            {/* Card Container */}
            <Link
              to={template.path}
              className="group-hover:border-primary-500/50 dark:group-hover:border-primary-500/50 relative aspect-[4/3] w-full overflow-hidden rounded-2xl border border-zinc-200 bg-zinc-100 shadow-sm transition-all duration-300 group-hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900"
            >
              <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

              <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex items-center gap-2 rounded-full bg-zinc-900/90 px-4 py-2 text-sm font-medium text-white backdrop-blur-md">
                  View Template <ArrowRight className="h-4 w-4" />
                </div>
              </div>

              {/* Light Image */}
              <img
                src={template.imageLight}
                alt={template.name}
                className="absolute inset-0 h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 dark:hidden"
                loading="lazy"
              />

              {/* Dark Image */}
              <img
                src={template.imageDark}
                alt={template.name}
                className="absolute inset-0 hidden h-full w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-105 dark:block"
                loading="lazy"
              />
            </Link>

            {/* Info */}
            <div className="flex items-center justify-between px-1">
              <div>
                <h3 className="font-heading text-lg font-semibold text-zinc-900 dark:text-white">
                  {template.name}
                </h3>
                <p className="text-sm text-zinc-500 dark:text-zinc-400">{template.category}</p>
              </div>
              {template.isNew && (
                <Badge
                  variant="default"
                  className="rounded-full border-none bg-lime-400 px-3 font-semibold text-lime-950 hover:bg-lime-500"
                >
                  New
                </Badge>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
