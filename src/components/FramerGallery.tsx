"use client"

import * as motion from "motion/react-client"
import type { Variants } from "motion/react"
import Image from "next/image"
import { useState } from "react"

export default function FramerGallery() {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(3, 1fr)",
        gap: "clamp(10px, 3vw, 32px)",
        width: "100%",
        maxWidth: "1100px",
        margin: "0 auto",
        padding: "16px 0 24px",
      }}
    >
      {photos.map((item, i) => (
        <PolaroidCard key={i} i={i} {...item} />
      ))}
    </div>
  )
}

interface CardProps {
  src: string
  caption: string
  date: string
  accent: string
  i: number
}

const rotations = [-4, 3, -2, 5, -3, 4]

function PolaroidCard({ src, caption, date, accent, i }: CardProps) {
  const [hovered, setHovered] = useState(false)
  const rot = rotations[i % rotations.length]

  return (
    <motion.div
      initial="offscreen"
      whileInView="onscreen"
      viewport={{ once: true, amount: 0.2 }}
      variants={flyIn(rot, i)}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      whileHover={{
        scale: 1.08,
        rotate: 0,
        y: -14,
        zIndex: 20,
        transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
      }}
      style={{
        transformOrigin: "center 80%",
        cursor: "pointer",
        position: "relative",
        zIndex: hovered ? 20 : 1,
      }}
    >
      {/* Glow behind card */}
      <motion.div
        style={{
          position: "absolute",
          inset: "-8px",
          borderRadius: "20px",
          background: `radial-gradient(ellipse, ${accent}55, transparent 70%)`,
          filter: "blur(14px)",
          pointerEvents: "none",
        }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
      />

      {/* Polaroid frame */}
      <div
        style={{
          position: "relative",
          borderRadius: "clamp(10px, 2vw, 16px)",
          overflow: "hidden",
          background: "white",
          padding: `clamp(5px, 1.5vw, 12px) clamp(5px, 1.5vw, 12px) clamp(28px, 7vw, 52px)`,
          boxShadow: hovered
            ? `0 24px 52px rgba(0,0,0,0.16), 0 0 0 2px ${accent}55`
            : "0 6px 24px rgba(0,0,0,0.10), 0 2px 6px rgba(0,0,0,0.07)",
          transition: "box-shadow 0.35s ease",
        }}
      >
        {/* Top colour strip */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: "3px",
            background: `linear-gradient(90deg, ${accent}, ${accent}aa)`,
            borderRadius: "16px 16px 0 0",
          }}
        />

        {/* Photo area */}
        <div
          style={{
            position: "relative",
            borderRadius: "clamp(6px, 1.5vw, 10px)",
            overflow: "hidden",
            aspectRatio: "3/4",
          }}
        >
          <motion.div
            style={{ width: "100%", height: "100%", position: "relative" }}
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={src} alt={caption} fill style={{ objectFit: "cover" }} />
          </motion.div>

          {/* Pink overlay */}
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(to top, ${accent}55 0%, transparent 55%)`,
            }}
            animate={{ opacity: hovered ? 1 : 0.3 }}
            transition={{ duration: 0.35 }}
          />

          {/* Date badge */}
          <div
            style={{
              position: "absolute",
              top: "clamp(4px, 1.5vw, 10px)",
              right: "clamp(4px, 1.5vw, 10px)",
              borderRadius: "99px",
              padding: "clamp(2px, 0.6vw, 4px) clamp(6px, 1.5vw, 12px)",
              color: "white",
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(0.45rem, 1.2vw, 0.7rem)",
              background: accent,
              letterSpacing: "0.04em",
              boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
            }}
          >
            {date}
          </div>

          {/* Hover sticker */}
          <motion.div
            style={{
              position: "absolute",
              bottom: "clamp(3px, 1vw, 10px)",
              left: "clamp(3px, 1vw, 10px)",
              fontSize: "clamp(0.9rem, 2.5vw, 1.6rem)",
            }}
            animate={{ scale: hovered ? 1 : 0, rotate: hovered ? 0 : -20 }}
            transition={{ type: "spring", stiffness: 300, damping: 15 }}
          >
            💖
          </motion.div>
        </div>

        {/* Caption */}
        <div style={{ paddingTop: "clamp(4px, 1.2vw, 10px)", paddingBottom: "2px", textAlign: "center" }}>
          <motion.p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(0.6rem, 1.6vw, 1.15rem)",
              lineHeight: 1.2,
              margin: 0,
            }}
            animate={{ color: hovered ? "#e91e8c" : "#c2185b" }}
          >
            {caption}
          </motion.p>

          {/* Dot hearts */}
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(2px, 0.5vw, 5px)", marginTop: "clamp(3px, 0.8vw, 7px)" }}>
            {["#f48fb1", "#f06292", "#e91e8c"].map((c, j) => (
              <motion.div
                key={j}
                style={{
                  width: "clamp(3px, 0.8vw, 6px)",
                  height: "clamp(3px, 0.8vw, 6px)",
                  borderRadius: "50%",
                  background: c,
                }}
                animate={{ scale: hovered ? [1, 1.6, 1] : 1 }}
                transition={{ duration: 0.4, delay: j * 0.08 }}
              />
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function flyIn(rotate: number, i: number): Variants {
  const directions = [
    { x: -60, y: 40 },
    { x: 60, y: 30 },
    { x: 0, y: 80 },
    { x: -50, y: 50 },
    { x: 60, y: 40 },
    { x: 0, y: 90 },
  ]
  const dir = directions[i % directions.length]
  return {
    offscreen: { opacity: 0, x: dir.x, y: dir.y, rotate: rotate * 2.5, scale: 0.82 },
    onscreen: {
      opacity: 1, x: 0, y: 0, rotate, scale: 1,
      transition: { type: "spring", stiffness: 65, damping: 14, delay: i * 0.1 },
    },
  }
}

const photos: Omit<CardProps, "i">[] = [
  { src: "/images/foto1.jpg", caption: "hari pertama kita 🌸", date: "Jan '24", accent: "#f06292" },
  { src: "/images/foto2.jpg", caption: "selfie kesukaan aku 💕", date: "Feb '24", accent: "#e91e8c" },
  { src: "/images/foto3.jpg", caption: "tawa yang aku cinta 😄", date: "Mar '24", accent: "#f48fb1" },
  { src: "/images/foto4.jpg", caption: "momen spesial kita ✨", date: "Apr '24", accent: "#ec407a" },
  { src: "/images/foto5.jpg", caption: "perjalanan indah 🌷", date: "May '24", accent: "#f06292" },

]