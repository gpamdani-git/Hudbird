import re

with open("apps/docs/src/components/templates/ModernAppTemplate.tsx", "r") as f:
    content = f.read()

# Fix import
content = content.replace(
    'import { motion, useMotionValue, useSpring } from "framer-motion";',
    'import { motion, useMotionValue, useSpring, useScroll, useMotionValueEvent } from "framer-motion";'
)

# Add state
state_code = """export const ModernAppTemplate = () => {
  const { scrollY } = useScroll();
  const [navVisible, setNavVisible] = useState(true);
  const [navCompact, setNavCompact] = useState(false);

  useMotionValueEvent(scrollY, "change", (current) => {
    const previous = scrollY.getPrevious() || 0;
    const diff = current - previous;
    
    if (current > 50) {
      setNavCompact(true);
    } else {
      setNavCompact(false);
    }

    if (current > 150 && diff > 5) {
      setNavVisible(false);
    } else if (diff < -5 || current <= 150) {
      setNavVisible(true);
    }
  });

  return ("""

content = content.replace(
    """export const ModernAppTemplate = () => {
  return (""",
    state_code
)

# Replace Navbar container
old_nav = """      {/* Floating Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, type: "spring", bounce: 0.35, delay: 0.1 }}
        className="fixed inset-x-0 top-4 z-[100] mx-auto w-full max-w-4xl px-4 sm:top-6"
      >
        <Navbar
          styleVariant="floating-full"
          position="static"
          className="!mt-0 !max-w-3xl !border-zinc-200/80 !bg-white/80 !px-2 !shadow-2xl !backdrop-blur-2xl transition-colors duration-500 dark:!border-white/10 dark:!bg-[#12141d]/85 [&>div:first-child]:!h-[56px] [&>div:first-child]:!px-2"
        >"""

new_nav = """      {/* Floating Navbar */}
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ 
          y: navVisible ? 0 : -100, 
          opacity: navVisible ? 1 : 0 
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="fixed inset-x-0 top-4 z-[100] mx-auto w-full max-w-4xl px-4 sm:top-6"
      >
        <Navbar
          styleVariant="floating-full"
          position="static"
          className={`!mx-auto !mt-0 transition-all duration-300 ${
            navCompact 
              ? "!max-w-2xl !py-0 [&>div:first-child]:!h-[48px]" 
              : "!max-w-3xl !py-1 [&>div:first-child]:!h-[56px]"
          } !border-zinc-200/80 !bg-white/80 !px-2 !shadow-2xl !backdrop-blur-2xl dark:!border-white/10 dark:!bg-[#12141d]/85 [&>div:first-child]:!px-2`}
        >"""

content = content.replace(old_nav, new_nav)

with open("apps/docs/src/components/templates/ModernAppTemplate.tsx", "w") as f:
    f.write(content)

