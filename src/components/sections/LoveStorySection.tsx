"use client"

import { motion } from "motion/react"

export default function LoveStorySection() {
  return (
    <section
      style={{
        padding: "50px 24px 80px",
        background: "linear-gradient(180deg, #fff0f6 0%, #fce4ec 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Giant background LOVE text */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          pointerEvents: "none",
          userSelect: "none",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(6rem, 24vw, 22rem)",
            color: "rgba(233,30,140,0.045)",
            whiteSpace: "nowrap",
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          LOVE
        </span>
      </div>

      {/* Floating bg blobs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{
          position: "absolute", top: "-80px", right: "-80px",
          width: "380px", height: "380px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,30,140,0.08) 0%, transparent 70%)",
        }} />
        <div style={{
          position: "absolute", bottom: "-60px", left: "-60px",
          width: "300px", height: "300px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(233,30,140,0.07) 0%, transparent 70%)",
        }} />
      </div>

      {/* Content wrapper */}
      <div style={{ maxWidth: "1000px", width: "100%", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div
          style={{ textAlign: "center", marginBottom: "64px" }}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p style={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "0.72rem",
            fontWeight: 800,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: "#f48fb1",
            marginBottom: "12px",
          }}>
            ✦ Chapter I ✦
          </p>
          <h2 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(2.8rem, 7vw, 4.8rem)",
            color: "#c2185b",
            lineHeight: 1.15,
            margin: 0,
          }}>
            Our <em>Story</em>
          </h2>
        </motion.div>

        {/* Two column grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "40px",
            alignItems: "center",
          }}
        >
          {/* Photo card */}
          <motion.div
            style={{ position: "relative" }}
            initial={{ opacity: 0, x: -60, rotate: -6 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 1, type: "spring", bounce: 0.25 }}
            whileHover={{ rotate: 0, scale: 1.03 }}
          >
            {/* Photo frame */}
            <div
              style={{
                borderRadius: "28px",
                overflow: "hidden",
                border: "6px solid white",
                boxShadow: "0 24px 60px rgba(233,30,140,0.18), 0 8px 20px rgba(0,0,0,0.1)",
                aspectRatio: "4/5",
                background: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <img
                src="/images/foto6.jpg"
                alt="us"
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                onError={(e) => {
                  // Fallback placeholder if image doesn't exist
                  const el = e.currentTarget
                  el.style.display = "none"
                  const parent = el.parentElement
                  if (parent) {
                    parent.innerHTML = `
                      <div style="width:100%;height:100%;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:16px;">
                        <span style="font-size:4rem;opacity:0.6">📸</span>
                        <span style="font-family:'Dancing Script',cursive;font-size:1.3rem;color:#e91e8c;opacity:0.7">Foto</span>
                      </div>`
                  }
                }}
              />
            </div>

            {/* Sticker badge */}
            <motion.div
              style={{
                position: "absolute",
                bottom: "-18px",
                right: "-12px",
                borderRadius: "18px",
                padding: "10px 18px",
                boxShadow: "0 8px 24px rgba(233,30,140,0.35)",
                color: "white",
                fontFamily: "'Dancing Script', cursive",
                fontSize: "1.25rem",
                background: "linear-gradient(135deg, #f06292, #e91e8c)",
                zIndex: 2,
              }}
              animate={{ rotate: [3, 7, 3] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              That's literally us! 💕
            </motion.div>

            {/* Decorative dots */}
            <div style={{
              position: "absolute",
              top: "-16px",
              left: "-16px",
              width: "60px",
              height: "60px",
              borderRadius: "50%",
              border: "3px dashed rgba(233,30,140,0.25)",
              zIndex: 0,
            }} />
          </motion.div>

          {/* Text card */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2, type: "spring" }}
          >
            <div
              style={{
                borderRadius: "28px",
                padding: "clamp(24px, 5vw, 44px)",
                boxShadow: "0 20px 60px rgba(233,30,140,0.12), 0 4px 16px rgba(233,30,140,0.07)",
                background: "rgba(255,255,255,0.88)",
                backdropFilter: "blur(16px)",
                WebkitBackdropFilter: "blur(16px)",
                border: "2px solid rgba(244,143,177,0.25)",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Top accent line */}
              <div style={{
                position: "absolute",
                top: 0,
                left: "10%",
                right: "10%",
                height: "3px",
                borderRadius: "0 0 8px 8px",
                background: "linear-gradient(90deg, transparent, #f06292, #e91e8c, #f06292, transparent)",
              }} />

              {/* Big quote mark */}
              <div style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "5rem",
                lineHeight: 1,
                color: "#f48fb1",
                marginBottom: "-0.5rem",
                opacity: 0.8,
              }}>
                "
              </div>

              <p style={{
                fontFamily: "'Nunito', sans-serif",
                fontSize: "clamp(0.95rem, 2vw, 1.1rem)",
                lineHeight: 1.85,
                color: "#880e4f",
                marginBottom: "28px",
              }}>
              From that simple first meeting, to all the laughs and stories we've shared together. Every moment with you is a memory I want to keep forever.
              </p>

              {/* Divider */}
              <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                <div style={{
                  height: "1.5px",
                  flex: 1,
                  background: "linear-gradient(90deg, #f48fb1, transparent)",
                  borderRadius: "99px",
                }} />
                <span style={{
                  fontFamily: "'Dancing Script', cursive",
                  fontSize: "1.35rem",
                  color: "#e91e8c",
                }}>
                  With Love
                </span>
              </div>

              {/* Signature row */}
              {/* <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {["💗 Tristan", "💫 Tsurayyaa", "🌸 Mumtaaz"].map((tag, i) => (
                  <motion.span
                    key={i}
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5, type: "spring" }}
                    style={{
                      fontFamily: "'Nunito', sans-serif",
                      fontSize: "0.78rem",
                      fontWeight: 700,
                      padding: "6px 14px",
                      borderRadius: "99px",
                      background: "rgba(233,30,140,0.08)",
                      border: "1.5px solid rgba(233,30,140,0.18)",
                      color: "#c2185b",
                      letterSpacing: "0.04em",
                    }}
                  >
                    {tag}
                  </motion.span>
                ))}
              </div> */}

              {/* Floating hearts inside card */}
              {["💗", "💓", "💝"].map((heart, i) => (
                <motion.span
                  key={i}
                  aria-hidden
                  style={{
                    position: "absolute",
                    right: `${10 + i * 12}%`,
                    top: `${16 + i * 16}%`,
                    fontSize: "1.2rem",
                    pointerEvents: "none",
                    opacity: 0.25,
                  }}
                  animate={{ y: [0, -10, 0], opacity: [0.2, 0.45, 0.2] }}
                  transition={{ duration: 2.5 + i * 0.6, repeat: Infinity, delay: i * 0.5 }}
                >
                  {heart}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}