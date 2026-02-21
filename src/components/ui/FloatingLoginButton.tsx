"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import LoginModal from "./LoginModal"

export default function FloatingLoginButton() {
  const [open, setOpen] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <>
      {/* Ripple rings */}
      <AnimatePresence>
        {!open && (
          <div style={{ position: "fixed", bottom: "24px", right: "24px", zIndex: 49, pointerEvents: "none" }}>
            {[1, 2, 3].map((ring) => (
              <motion.div
                key={ring}
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "99px",
                  border: "2px solid rgba(233,30,140,0.4)",
                }}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{ scale: 2.2 + ring * 0.5, opacity: 0 }}
                transition={{
                  duration: 2.2,
                  repeat: Infinity,
                  delay: ring * 0.55,
                  ease: "easeOut",
                }}
              />
            ))}
          </div>
        )}
      </AnimatePresence>

      {/* Main button */}
      <motion.button
        onClick={() => setOpen(true)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        initial={{ scale: 0, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 200, damping: 18, delay: 0.5 }}
        whileTap={{ scale: 0.92 }}
        style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          gap: "8px",
          padding: "14px 22px",
          borderRadius: "99px",
          border: "2px solid rgba(255,255,255,0.5)",
          background: "linear-gradient(135deg, #f06292, #e91e8c, #c2185b)",
          backgroundSize: "200% 200%",
          color: "white",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 800,
          fontSize: "0.88rem",
          letterSpacing: "0.05em",
          cursor: "pointer",
          boxShadow: hovered
            ? "0 16px 48px rgba(233,30,140,0.55), 0 4px 16px rgba(0,0,0,0.15)"
            : "0 8px 28px rgba(233,30,140,0.40), 0 2px 8px rgba(0,0,0,0.12)",
          transition: "box-shadow 0.3s ease",
          overflow: "hidden",
        }}
      >
        {/* Shimmer overlay */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            top: 0,
            left: "-100%",
            width: "60%",
            height: "100%",
            background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
            pointerEvents: "none",
          }}
          animate={{ left: hovered ? "160%" : "-100%" }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        />

        {/* Heart icon with pulse */}
        <motion.span
          animate={{ scale: [1, 1.35, 1] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          style={{ fontSize: "1.1rem", lineHeight: 1 }}
        >
          💖
        </motion.span>

        {/* Label — expands on hover */}
        <motion.span
          animate={{ opacity: hovered ? 1 : 0.92, letterSpacing: hovered ? "0.08em" : "0.05em" }}
          transition={{ duration: 0.3 }}
          style={{ position: "relative" }}
        >
          Login
        </motion.span>
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="modal-wrapper"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <LoginModal onClose={() => setOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}