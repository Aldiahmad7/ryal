"use client"

import { useMotionValue, useAnimationFrame } from "motion/react"
import { motion } from "motion/react"

interface PhotoStripProps {
  images: string[]
  direction?: number
  speed?: number
}

export default function PhotoStrip({
  images,
  direction = 1,
  speed = 30,
}: PhotoStripProps) {
  const x = useMotionValue(0)

  useAnimationFrame((_, delta) => {
    const move = (delta / 1000) * speed
    const cardWidth = 204 // 200px + 4px gap
    const total = images.length * cardWidth
    let next = x.get() - move * direction

    // Wrap around
    if (direction > 0 && next < -total) next += total
    if (direction < 0 && next > 0) next -= total
    x.set(next)
  })

  const tripled = [...images, ...images, ...images]

  return (
    <div className="overflow-hidden" style={{ width: "100vw" }}>
      <motion.div className="flex gap-4 flex-shrink-0" style={{ x, width: "max-content" }}>
        {tripled.map((src, i) => (
          <div
            key={i}
            className="relative flex-shrink-0 rounded-2xl overflow-hidden border-4 border-white shadow-lg"
            style={{ width: 200, height: 270 }}
          >
            <img src={src} alt="" className="w-full h-full object-cover" />
            <div
              className="absolute inset-0"
              style={{ background: "rgba(255,182,193,0.15)" }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  )
}