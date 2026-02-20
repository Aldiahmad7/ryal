"use client"

import { motion } from "motion/react"
import { ReactNode } from "react"

interface StickerProps {
  children: ReactNode
  x: string
  y: string
  rotate: number
  delay?: number
  size?: string
}

export default function Sticker({
  children,
  x,
  y,
  rotate,
  delay = 0,
  size = "text-3xl",
}: StickerProps) {
  return (
    <motion.div
      className={`absolute select-none pointer-events-none ${size} z-10`}
      style={{ left: x, top: y }}
      initial={{ opacity: 0, scale: 0, rotate: rotate - 20 }}
      animate={{
        opacity: 1,
        scale: 1,
        rotate,
        y: [0, -12, 0],
      }}
      transition={{
        opacity: { delay, duration: 0.5 },
        scale: { delay, duration: 0.6, type: "spring", bounce: 0.5 },
        rotate: { delay, duration: 0.5 },
        y: {
          delay: delay + 0.5,
          duration: 3 + delay * 2,
          repeat: Infinity,
          ease: "easeInOut",
        },
      }}
    >
      {children}
    </motion.div>
  )
}