"use client"

import { motion } from "motion/react"

const footerEmojis = ["💕", "🌸", "💖", "🌷", "💗", "✨", "💓"]

export default function FooterSection() {
  return (
    <footer
      style={{
        padding: "30px 24px 30px",
        background: "linear-gradient(180deg, #fff0f6 0%, #fce4ec 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
      }}
    >
      {/* Soft bg blobs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
        <div style={{
          position: "absolute", top: "-60px", left: "50%", transform: "translateX(-50%)",
          width: "500px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(233,30,140,0.07) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, left: "10%",
          width: "200px", height: "120px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(244,143,177,0.12) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: 0, right: "10%",
          width: "200px", height: "120px", borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(244,143,177,0.12) 0%, transparent 70%)",
        }} />
      </div>

      {/* Dot pattern strip at top */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 0, left: 0, right: 0,
          height: "60px",
          backgroundImage: "radial-gradient(circle, #f8bbd0 1.5px, transparent 1.5px)",
          backgroundSize: "22px 22px",
          opacity: 0.5,
          pointerEvents: "none",
        }}
      />

      {/* Top divider line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        style={{
          width: "160px",
          height: "2px",
          borderRadius: "99px",
          background: "linear-gradient(90deg, transparent, #f06292, #e91e8c, #f06292, transparent)",
          marginBottom: "36px",
          transformOrigin: "center",
          position: "relative",
          zIndex: 1,
        }}
      />

      {/* Floating emojis row */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.7 }}
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "clamp(8px, 2vw, 18px)",
          marginBottom: "32px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {footerEmojis.map((emoji, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 2 + i * 0.1, repeat: Infinity, delay: i * 0.18, ease: "easeInOut" }}
            style={{ fontSize: "clamp(1.2rem, 3.5vw, 1.8rem)" }}
          >
            {emoji}
          </motion.span>
        ))}
      </motion.div>

      {/* Divider dots */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.35 }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "8px",
          marginBottom: "24px",
          position: "relative",
          zIndex: 1,
        }}
      >
        {["#f48fb1", "#e91e8c", "#f48fb1"].map((c, i) => (
          <div key={i} style={{
            width: i === 1 ? "8px" : "5px",
            height: i === 1 ? "8px" : "5px",
            borderRadius: "50%",
            background: c,
            opacity: i === 1 ? 1 : 0.5,
          }} />
        ))}
      </motion.div>

      {/* Credit line */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.45, duration: 0.7 }}
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "10px",
        }}
      >
        {/* Glass pill */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            background: "rgba(255,255,255,0.7)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            border: "1.5px solid rgba(244,143,177,0.35)",
            borderRadius: "99px",
            padding: "10px 22px",
            boxShadow: "0 4px 16px rgba(233,30,140,0.10)",
          }}
        >
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              color: "#ad1457",
              fontSize: "clamp(0.75rem, 2vw, 0.88rem)",
              letterSpacing: "0.04em",
            }}
          >
            Made with
          </span>
          <motion.span
            animate={{ scale: [1, 1.4, 1] }}
            transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "1rem" }}
          >
            ❤️
          </motion.span>
          <span
            style={{
              fontFamily: "'Montserrat', sans-serif",
              fontWeight: 700,
              color: "#ad1457",
              fontSize: "clamp(0.75rem, 2vw, 0.88rem)",
              letterSpacing: "0.04em",
            }}
          >
            by Aldi
          </span>
        </div>
      </motion.div>

      {/* Bottom decorative line */}
      <motion.div
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.5, ease: "easeOut" }}
        style={{
          marginTop: "36px",
          width: "80px",
          height: "2px",
          borderRadius: "99px",
          background: "linear-gradient(90deg, transparent, #f48fb1, transparent)",
          transformOrigin: "center",
          position: "relative",
          zIndex: 1,
        }}
      />
    </footer>
  )
}