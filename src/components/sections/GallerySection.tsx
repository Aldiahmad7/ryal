"use client"

import { motion } from "motion/react"
import * as motionClient from "motion/react-client"
import type { Variants } from "motion/react"
import Image from "next/image"
import { useState } from "react"

export default function GallerySection() {
  return (
    <section
      style={{
        padding: "50px 24px 50px",
        background: "#fff8fc",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Dot pattern background */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "radial-gradient(circle, #f8bbd0 1.5px, transparent 1.5px)",
          backgroundSize: "28px 28px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Soft gradient blobs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-100px", left: "-100px",
          width: "400px", height: "400px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,30,140,0.07) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-80px", right: "-80px",
          width: "360px", height: "360px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,30,140,0.06) 0%, transparent 65%)",
        }} />
        <div style={{
          position: "absolute", top: "40%", left: "50%", transform: "translateX(-50%)",
          width: "500px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(244,143,177,0.08) 0%, transparent 70%)",
        }} />
      </div>

      {/* Header */}
      <motion.div
        style={{ textAlign: "center", marginBottom: "64px", position: "relative", zIndex: 1, width: "100%" }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
      >
        {/* Chapter label */}
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.32em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 800,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#f48fb1",
            marginBottom: "14px",
          }}
        >
          ✦ Chapter II ✦
        </motion.p>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 7vw, 4.8rem)",
            color: "#c2185b",
            lineHeight: 1.15,
            margin: "0 0 16px",
          }}
        >
          Memory <em>Lane</em>
        </h2>

        {/* Subtitle */}
        <p
          style={{
            fontFamily: "'Nunito', sans-serif",
            color: "#ad1457",
            fontSize: "clamp(0.95rem, 2vw, 1.08rem)",
            opacity: 0.75,
            margin: "0 0 28px",
          }}
        >
          Our most precious photos 📸✨
        </p>

        {/* Decorative line under title */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{
            width: "120px",
            height: "3px",
            borderRadius: "99px",
            background: "linear-gradient(90deg, transparent, #e91e8c, #f06292, transparent)",
            margin: "0 auto",
            transformOrigin: "center",
          }}
        />
      </motion.div>

      {/* Gallery */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.9, delay: 0.2, type: "spring" }}
        style={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          maxWidth: "1100px",
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* Glow behind gallery */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: "-20px",
            borderRadius: "40px",
            background: "radial-gradient(ellipse at center, rgba(233,30,140,0.06) 0%, transparent 70%)",
            pointerEvents: "none",
            zIndex: 0,
          }}
        />
        <div style={{ position: "relative", zIndex: 1, width: "100%" }}>
          <FramerGallery />
        </div>
      </motion.div>

      {/* Bottom caption */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.5 }}
        style={{
          marginTop: "52px",
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "16px",
        }}
      >
        {/* Floating hearts row */}
        <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
          {["💗", "💖", "💗"].map((h, i) => (
            <motion.span
              key={i}
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 2 + i * 0.4, repeat: Infinity, delay: i * 0.3 }}
              style={{ fontSize: "1.4rem", opacity: 0.7 }}
            >
              {h}
            </motion.span>
          ))}
        </div>
        <span
          style={{
            fontFamily: "'Dancing Script', cursive",
            fontSize: "clamp(1.1rem, 3vw, 1.4rem)",
            color: "#c2185b",
            opacity: 0.7,
          }}
        >
          Every photo holds a thousand stories...
        </span>
      </motion.div>
    </section>
  )
}

// FramerGallery Component (sebelumnya file terpisah)
function FramerGallery() {
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
    <motionClient.div
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
      <motionClient.div
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
          <motionClient.div
            style={{ width: "100%", height: "100%", position: "relative" }}
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          >
            <Image src={src} alt={caption} fill style={{ objectFit: "cover" }} />
          </motionClient.div>

          {/* Pink overlay */}
          <motionClient.div
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
          <motionClient.div
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
          </motionClient.div>
        </div>

        {/* Caption */}
        <div style={{ paddingTop: "clamp(4px, 1.2vw, 10px)", paddingBottom: "2px", textAlign: "center" }}>
          <motionClient.p
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(0.6rem, 1.6vw, 1.15rem)",
              lineHeight: 1.2,
              margin: 0,
            }}
            animate={{ color: hovered ? "#e91e8c" : "#c2185b" }}
          >
            {caption}
          </motionClient.p>

          {/* Dot hearts */}
          <div style={{ display: "flex", justifyContent: "center", gap: "clamp(2px, 0.5vw, 5px)", marginTop: "clamp(3px, 0.8vw, 7px)" }}>
            {["#f48fb1", "#f06292", "#e91e8c"].map((c, j) => (
              <motionClient.div
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
    </motionClient.div>
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
  { src: "/images/foto6.jpg", caption: "Our first pic", date: "Jan '25", accent: "#f06292" },
  { src: "/images/foto2.jpg", caption: "Rayyaa's fave pic", date: "Dec '25", accent: "#e91e8c" },
  { src: "/images/foto1.jpg", caption: "Aldi's fave pic", date: "Jan '26", accent: "#f06292" },
  { src: "/images/foto3.jpg", caption: "Too cute", date: "Feb '26", accent: "#f48fb1" },
  { src: "/images/foto4.jpg", caption: "Best pic", date: "Dec '25", accent: "#ec407a" },
  { src: "/images/foto5.jpg", caption: "Rayyaa on the train", date: "Dec '25", accent: "#f06292" },
  { src: "/images/foto7.jpg", caption: "Mwahhh", date: "Jan '26", accent: "#e91e8c" },
  { src: "/images/foto8.jpg", caption: "Aldi with glasses", date: "Nov '25", accent: "#f48fb1" },
  { src: "/images/foto9.jpg", caption: "Rayyaa with glasses", date: "Jan '26", accent: "#ec407a" },
  { src: "/images/foto10.jpg", caption: "Aldi's straight face", date: "Nov '25", accent: "#f06292" },
  { src: "/images/foto11.jpg", caption: "Us with a TikTok filter", date: "Nov '25", accent: "#f06292" },
  { src: "/images/foto12.jpg", caption: "Rayyaa looking stunning", date: "Jan '26", accent: "#e91e8c" },
  { src: "/images/foto13.jpg", caption: "Us, holding each other close", date: "Feb '26", accent: "#f48fb1" },
  { src: "/images/foto14.jpg", caption: "Adorable", date: "Nov '25", accent: "#ec407a" },
  { src: "/images/foto15.jpg", caption: "Rayyaa was shaking all over", date: "Dec '25", accent: "#f06292" },
  { src: "/images/foto16.jpg", caption: "a soft smile", date: "Oct '25", accent: "#f48fb1" },
  { src: "/images/foto17.jpg", caption: "A candid shot of Rayyaa", date: "Feb '26", accent: "#ec407a" },
  { src: "/images/foto18.jpg", caption: "us making silly faces with our tongues out", date: "Oct '25", accent: "#f06292" },
]