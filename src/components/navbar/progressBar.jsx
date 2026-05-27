"use client"

import { motion, useScroll, useSpring } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {stiffness: 120, damping: 30, restDelta:0.001})

  return (
    <>
      <motion.div
        id="scroll-indicator"
        style={{
          scaleX,
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          height: 3,
          originX: 0,
        }}
        className="bg-herbalife-1 dark:bg-herbalife-3 z-50"
      ></motion.div>
    </>
  );
}
