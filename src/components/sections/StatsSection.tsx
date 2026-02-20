"use client"
import { motion } from "motion/react"
import { useEffect, useState } from "react"

const ANNIVERSARY_DATE = new Date("2026-02-02T00:00:00")

function getTimeDiff(from: Date, to: Date) {
  let diff = Math.floor((to.getTime() - from.getTime()) / 1000)
  if (diff < 0) diff = 0
  const days = Math.floor(diff / 86400)
  diff -= days * 86400
  const hours = Math.floor(diff / 3600)
  diff -= hours * 3600
  const minutes = Math.floor(diff / 60)
  const seconds = diff - minutes * 60
  return { days, hours, minutes, seconds }
}

function TimeUnit({ value, label }: { value: number; label: string }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "10px" }}>
      <div
        style={{
          position: "relative",
          background: "rgba(255,255,255,0.75)",
          backdropFilter: "blur(16px)",
          WebkitBackdropFilter: "blur(16px)",
          border: "2px solid rgba(255,255,255,0.9)",
          borderRadius: "24px",
          width: "clamp(68px, 15vw, 100px)",
          height: "clamp(68px, 15vw, 100px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow:
            "0 12px 40px rgba(233,30,140,0.15), 0 4px 12px rgba(233,30,140,0.10), inset 0 1px 0 rgba(255,255,255,0.9)",
          flexShrink: 0,
        }}
      >
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "22px",
            background: "radial-gradient(ellipse at 50% 0%, rgba(233,30,140,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        <span
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(1.9rem, 5vw, 2.8rem)",
            fontWeight: 700,
            color: "#d81b60",
            lineHeight: 1,
            textShadow: "0 2px 8px rgba(216,27,96,0.18)",
          }}
        >
          {String(value).padStart(2, "0")}
        </span>
      </div>
      <span
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(0.55rem, 1.4vw, 0.7rem)",
          fontWeight: 800,
          letterSpacing: "0.18em",
          color: "#c2185b",
          textTransform: "uppercase",
        }}
      >
        {label}
      </span>
    </div>
  )
}

function Colon() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "8px",
        paddingBottom: "28px",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #e91e8c, #f06292)",
          boxShadow: "0 2px 6px rgba(233,30,140,0.4)",
        }}
      />
      <div
        style={{
          width: "5px",
          height: "5px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #e91e8c, #f06292)",
          boxShadow: "0 2px 6px rgba(233,30,140,0.4)",
        }}
      />
    </div>
  )
}

export default function StatsSection() {
  const [diff, setDiff] = useState(() => getTimeDiff(ANNIVERSARY_DATE, new Date()))
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const interval = setInterval(() => {
      setDiff(getTimeDiff(ANNIVERSARY_DATE, new Date()))
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const formattedDate = ANNIVERSARY_DATE.toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const timeData = mounted
    ? [
        { value: diff.days, label: "Days" },
        { value: diff.hours, label: "Hours" },
        { value: diff.minutes, label: "Minutes" },
        { value: diff.seconds, label: "Seconds" },
      ]
    : [
        { value: 0, label: "Days" },
        { value: 0, label: "Hours" },
        { value: 0, label: "Minutes" },
        { value: 0, label: "Seconds" },
      ]

  return (
    <section
      style={{
        margin: 0,
        padding: "50px 24px 50px",
        background:
          "linear-gradient(160deg, #fce4ec 0%, #ffd6e7 30%, #ffb3d1 60%, #fce4ec 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Floating bg circles */}
      {[
        { size: 320, top: "-100px", left: "-80px", opacity: 0.18 },
        { size: 220, top: "40px", right: "-60px", opacity: 0.13 },
        { size: 180, bottom: "-50px", left: "20%", opacity: 0.15 },
        { size: 140, top: "30%", right: "10%", opacity: 0.10 },
      ].map((c, i) => (
        <div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            width: c.size,
            height: c.size,
            borderRadius: "50%",
            background: `radial-gradient(circle, rgba(233,30,140,${c.opacity}) 0%, transparent 70%)`,
            top: (c as any).top,
            left: (c as any).left,
            right: (c as any).right,
            bottom: (c as any).bottom,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Floating emoji accents */}
      {(["💕", "💖", "🌸", "✨"] as const).map((emoji, i) => (
        <motion.span
          key={i}
          aria-hidden
          animate={{ y: [0, -14, 0], rotate: [-5, 5, -5] }}
          transition={{ duration: 4 + i * 0.7, repeat: Infinity, ease: "easeInOut", delay: i * 0.9 }}
          style={{
            position: "absolute",
            fontSize: "clamp(1.2rem, 3vw, 1.8rem)",
            opacity: 0.3,
            top: `${15 + i * 20}%`,
            left: i % 2 === 0 ? `${4 + i * 3}%` : undefined,
            right: i % 2 !== 0 ? `${4 + i * 2}%` : undefined,
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          {emoji}
        </motion.span>
      ))}

      {/* Title */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "16px", position: "relative", zIndex: 1 }}
      >
        <span
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(2.2rem, 6vw, 3.6rem)",
            color: "#c2185b",
            display: "block",
            textShadow: "0 2px 20px rgba(194,24,91,0.18)",
          }}
        >
          Us In Numbers ✨
        </span>
      </motion.div>

      {/* Date badge */}
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          background: "rgba(255,255,255,0.55)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
          border: "1.5px solid rgba(255,255,255,0.85)",
          borderRadius: "99px",
          padding: "10px 22px",
          marginBottom: "48px",
          boxShadow: "0 4px 20px rgba(233,30,140,0.12)",
          position: "relative",
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: "1rem" }}>💕</span>
        <span
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "clamp(0.75rem, 2vw, 0.88rem)",
            fontWeight: 700,
            color: "#c2185b",
            letterSpacing: "0.04em",
          }}
        >
          Official since {formattedDate}
        </span>
      </motion.div>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3, duration: 0.6 }}
        style={{
          fontFamily: "'Montserrat', sans-serif",
          fontSize: "clamp(0.6rem, 1.8vw, 0.75rem)",
          fontWeight: 800,
          letterSpacing: "0.22em",
          color: "#ad1457",
          textTransform: "uppercase",
          marginBottom: "24px",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
        }}
      >
        Been together for...
      </motion.p>

      {/* Timer — semua dalam 1 baris */}
      <motion.div
        initial={{ opacity: 0, y: 36 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.9, type: "spring" }}
        style={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          gap: "clamp(4px, 1.5vw, 14px)",
          width: "100%",
          maxWidth: "640px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {timeData.map((unit, i) => (
          <div key={unit.label} style={{ display: "contents" }}>
            <TimeUnit value={unit.value} label={unit.label} />
            {i < timeData.length - 1 && <Colon />}
          </div>
        ))}
      </motion.div>

      {/* Tagline */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.7, duration: 0.8 }}
        style={{
          marginTop: "44px",
          fontFamily: "'Dancing Script', cursive",
          fontSize: "clamp(1.2rem, 3.5vw, 1.7rem)",
          color: "#c2185b",
          textAlign: "center",
          textShadow: "0 2px 12px rgba(194,24,91,0.15)",
          position: "relative",
          zIndex: 1,
        }}
      >
        and still counting... 💖
      </motion.p>
    </section>
  )
}