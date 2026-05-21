"use client"

import { motion, useScroll, useSpring } from "framer-motion";

export default function ProgressBar() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {stiffness: 100, damping: 30, restDelta:0.001})

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
          height: 5,
          originX: 0,
        }}
        className="bg-red-600 dark:bg-(--color-herbalife-3)"
      ></motion.div>
    </>
  );
}
