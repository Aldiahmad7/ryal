"use client"

import { motion } from "motion/react"

const floatingEmojis = ["💖", "💗", "💓", "💝", "💕", "❤️", "🌸", "✨"]

export default function LoveLetterSection() {
  return (
    <section
      style={{
        padding: "50px 24px 50px",
        background: "linear-gradient(145deg, #fce4ec 0%, #f8bbd0 40%, #f06292 80%, #e91e8c 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {/* Mesh noise overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `radial-gradient(ellipse at 20% 50%, rgba(255,255,255,0.12) 0%, transparent 60%),
                            radial-gradient(ellipse at 80% 20%, rgba(255,255,255,0.10) 0%, transparent 50%),
                            radial-gradient(ellipse at 60% 80%, rgba(194,24,91,0.15) 0%, transparent 50%)`,
          pointerEvents: "none",
        }}
      />

      {/* Floating emojis */}
      {floatingEmojis.map((emoji, i) => (
        <motion.div
          key={i}
          aria-hidden
          style={{
            position: "absolute",
            fontSize: "clamp(1.4rem, 4vw, 2.2rem)",
            pointerEvents: "none",
            userSelect: "none",
            left: `${6 + i * 11.5}%`,
            top: `${38 + Math.sin(i * 1.2) * 34}%`,
            opacity: 0.18,
          }}
          animate={{
            y: [-18, 18, -18],
            rotate: [-10, 10, -10],
            opacity: [0.1, 0.25, 0.1],
          }}
          transition={{ duration: 4 + i * 0.6, repeat: Infinity, delay: i * 0.35, ease: "easeInOut" }}
        >
          {emoji}
        </motion.div>
      ))}

      {/* Content */}
      <motion.div
        style={{
          maxWidth: "680px",
          width: "100%",
          textAlign: "center",
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.85 }}
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
            color: "rgba(255,255,255,0.85)",
            marginBottom: "14px",
          }}
        >
          ✦ Chapter IV ✦
        </motion.p>

        {/* Title */}
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 7vw, 4.8rem)",
            color: "white",
            marginBottom: "48px",
            lineHeight: 1.15,
            textShadow: "0 4px 24px rgba(140,0,60,0.25)",
          }}
        >
          For <em>You</em> 💌
        </h2>

        {/* Letter card */}
        <motion.div
          style={{
            position: "relative",
            width: "100%",
            borderRadius: "32px",
            padding: "clamp(28px, 6vw, 52px) clamp(24px, 6vw, 48px)",
            background: "rgba(255,255,255,0.93)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "2.5px solid rgba(255,255,255,0.95)",
            boxShadow: "0 32px 80px rgba(194,24,91,0.22), 0 8px 24px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,1)",
          }}
          initial={{ scale: 0.88, rotate: -2, opacity: 0 }}
          whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, type: "spring", bounce: 0.28 }}
          whileHover={{ scale: 1.015, rotate: 0.4 }}
        >
          {/* Top gradient bar */}
          <div style={{
            position: "absolute",
            top: 0,
            left: "8%",
            right: "8%",
            height: "3px",
            borderRadius: "0 0 8px 8px",
            background: "linear-gradient(90deg, transparent, #f06292, #e91e8c, #f06292, transparent)",
          }} />

          {/* Wax seal */}
          <motion.div
            style={{
              position: "absolute",
              top: "-26px",
              left: "50%",
              transform: "translateX(-50%)",
              width: "52px",
              height: "52px",
              borderRadius: "50%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.5rem",
              background: "linear-gradient(135deg, #f06292, #c2185b)",
              boxShadow: "0 8px 24px rgba(194,24,91,0.4), 0 2px 8px rgba(0,0,0,0.15)",
              border: "3px solid white",
              zIndex: 2,
            }}
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            💌
          </motion.div>

          {/* Paper lines decoration */}
          <div aria-hidden style={{ position: "absolute", inset: "60px 0 24px", pointerEvents: "none", overflow: "hidden", opacity: 0.04 }}>
            {Array.from({ length: 10 }).map((_, i) => (
              <div key={i} style={{ height: "1px", background: "#880e4f", marginBottom: "32px" }} />
            ))}
          </div>

          {/* Greeting */}
          <div
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.5rem, 4vw, 2rem)",
              color: "#e91e8c",
              marginBottom: "16px",
              marginTop: "16px",
              position: "relative",
            }}
          >
            Hi Love,
          </div>

          {/* Body text */}
          <p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
              lineHeight: 2,
              color: "#880e4f",
              marginBottom: "28px",
              position: "relative",
            }}
          >
          Thank you for being in my life. Every moment with you always feels special. I hope we can keep being together and accepting each other just as we are. 🌷
          </p>

          {/* Divider */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "12px",
              marginBottom: "20px",
            }}
          >
            <div style={{ height: "1.5px", width: "60px", background: "linear-gradient(90deg, transparent, #f48fb1)", borderRadius: "99px" }} />
            <motion.span
              style={{ fontSize: "1.6rem" }}
              animate={{ scale: [1, 1.4, 1] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
              💖
            </motion.span>
            <div style={{ height: "1.5px", width: "60px", background: "linear-gradient(90deg, #f48fb1, transparent)", borderRadius: "99px" }} />
          </div>

          {/* Signature */}
          <div
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(1.2rem, 3vw, 1.5rem)",
              color: "#c2185b",
              position: "relative",
            }}
          >
            All my heart, Aldi
          </div>

          {/* Corner rose */}
          {[
            { bottom: "14px", right: "18px" },
            { top: "60px", left: "18px" },
          ].map((pos, i) => (
            <motion.span
              key={i}
              aria-hidden
              style={{ position: "absolute", fontSize: "clamp(1rem, 2.5vw, 1.4rem)", opacity: 0.2, pointerEvents: "none", ...pos }}
              animate={{ rotate: [0, 15, 0], scale: [1, 1.1, 1] }}
              transition={{ duration: 5 + i, repeat: Infinity, delay: i * 1.2 }}
            >
              🌸
            </motion.span>
          ))}
        </motion.div>

        {/* Bottom envelope flap decoration */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.8 }}
          style={{
            marginTop: "40px",
            display: "flex",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {["💌", "🌸", "💖", "🌸", "💌"].map((e, i) => (
            <motion.span
              key={i}
              style={{ fontSize: "clamp(1rem, 2.5vw, 1.3rem)", opacity: i === 2 ? 0.9 : 0.45 }}
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.2 }}
            >
              {e}
            </motion.span>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}