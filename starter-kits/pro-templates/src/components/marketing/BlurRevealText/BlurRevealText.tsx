import React from "react";
import { motion } from "framer-motion";

export const BlurRevealText = ({
  text,
  className,
  delay = 0,
  style,
}: {
  text: string;
  className?: string;
  delay?: number;
  style?: React.CSSProperties;
}) => {
  const words = text.split(" ");
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: 0.08, delayChildren: delay } },
        hidden: {},
      }}
      className={className}
      style={style}
    >
      {words.map((word, i) => (
        <React.Fragment key={i}>
          {word === "\n" ? (
            <br />
          ) : (
            <motion.span
              variants={{
                hidden: { opacity: 0, filter: "blur(12px)", y: 20 },
                visible: {
                  opacity: 1,
                  filter: "blur(0px)",
                  y: 0,
                  transition: { duration: 1.4, ease: [0.22, 1, 0.36, 1] },
                },
              }}
              className="mr-[0.25em] inline-block"
            >
              {word}
            </motion.span>
          )}
        </React.Fragment>
      ))}
    </motion.div>
  );
};
