"use client"

import { motion } from "motion/react"
import { useState, useEffect, useRef } from "react"

const sparkleChars = ["✨", "💖", "🌸", "⭐", "💗"]

interface Sparkle {
  id: number
  x: number
  y: number
  char: string
}

export default function CursorSparkle() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([])
  const counter = useRef(0)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const id = counter.current++
      const char = sparkleChars[id % sparkleChars.length]

      setSparkles((prev) => [...prev.slice(-10), { id, x: e.clientX, y: e.clientY, char }])
    }

    window.addEventListener("mousemove", handleMouseMove)
    return () => window.removeEventListener("mousemove", handleMouseMove)
  }, [])

  const removeSparkle = (id: number) => {
    setSparkles((prev) => prev.filter((sparkle) => sparkle.id !== id))
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-[999]">
      {sparkles.map((sparkle) => (
        <motion.div
          key={sparkle.id}
          className="absolute text-lg leading-none"
          style={{ left: sparkle.x - 10, top: sparkle.y - 10 }}
          initial={{ opacity: 1, scale: 1 }}
          animate={{
            opacity: 0,
            scale: 0.3,
            y: -30,
            x: sparkle.id % 2 === 0 ? 10 : -10,
          }}
          transition={{ duration: 0.9 }}
          onAnimationComplete={() => removeSparkle(sparkle.id)}
        >
          {sparkle.char}
        </motion.div>
      ))}
    </div>
  )
}