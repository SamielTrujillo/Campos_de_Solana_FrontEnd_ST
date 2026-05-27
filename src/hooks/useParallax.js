import { useRef } from "react";
import { useScroll, useTransform } from "framer-motion";

export default function useParallax(distance = 120) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(
    scrollYProgress,
    [0, 1],
    [-distance, distance]
  );

  return { ref, y };
}