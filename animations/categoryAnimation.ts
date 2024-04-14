import { Variants } from "framer-motion";

export const categoryAnimation: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1
    }
  })
};
