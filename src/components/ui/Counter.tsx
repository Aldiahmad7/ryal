"use client"

import { motion } from "motion/react"
import { useRef, useState, useEffect } from "react"

interface CounterProps {
  to: number
  label: string
  emoji: string
}

export default function Counter({ to, label, emoji }: CounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started) setStarted(true)
      },
      { threshold: 0.1 }
    )

    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return

    let frame = 0
    const total = 60
    const timer = setInterval(() => {
      frame++
      setCount(Math.round((frame / total) * to))
      if (frame >= total) clearInterval(timer)
    }, 20)

    return () => clearInterval(timer)
  }, [started, to])

  return (
    <motion.div
      ref={ref}
      className="flex flex-col items-center gap-2 px-6 py-8 rounded-3xl"
      style={{
        background: "rgba(255,255,255,0.8)",
        backdropFilter: "blur(12px)",
        boxShadow: "0 8px 32px rgba(233,30,140,0.12)",
      }}
      whileHover={{ scale: 1.06, y: -6 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <span className="text-4xl">{emoji}</span>
      <span
        className="text-5xl font-bold"
        style={{ fontFamily: "'Playfair Display', serif", color: "#e91e8c" }}
      >
        {count}+
      </span>
      <span
        className="text-sm font-semibold tracking-wide text-center"
        style={{ fontFamily: "'Nunito', sans-serif", color: "#c2185b" }}
      >
        {label}
      </span>
    </motion.div>
  )
}