"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { supabase } from "@/lib/supabase"

export default function LoginModal({ onClose }: { onClose: () => void }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [focusedField, setFocusedField] = useState<"email" | "password" | null>(null)

  const handleLogin = async () => {
    setError("")
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    setLoading(false)
    if (error) {
      setError("Login failed 😢 " + error.message)
    } else {
      window.location.href = "/admin"
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") handleLogin()
  }

  return (
    // Backdrop
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 999,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        background: "rgba(120,0,60,0.35)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
      }}
    >
      {/* Card */}
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.82, opacity: 0, y: 40, rotate: -3 }}
        animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 24, rotate: 2 }}
        transition={{ type: "spring", stiffness: 200, damping: 22 }}
        style={{
          width: "100%",
          maxWidth: "380px",
          borderRadius: "28px",
          padding: "clamp(28px, 6vw, 44px) clamp(24px, 6vw, 40px)",
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "2px solid rgba(255,255,255,0.95)",
          boxShadow: "0 32px 80px rgba(194,24,91,0.22), 0 8px 24px rgba(0,0,0,0.10)",
          position: "relative",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        {/* Top gradient bar */}
        <div style={{
          position: "absolute",
          top: 0, left: "8%", right: "8%",
          height: "3px",
          borderRadius: "0 0 8px 8px",
          background: "linear-gradient(90deg, transparent, #f06292, #e91e8c, #f06292, transparent)",
        }} />

        {/* Background glow */}
        <div aria-hidden style={{
          position: "absolute",
          top: "-40px", left: "50%", transform: "translateX(-50%)",
          width: "280px", height: "180px",
          borderRadius: "50%",
          background: "radial-gradient(ellipse, rgba(233,30,140,0.06) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />

        {/* Wax seal / icon */}
        <motion.div
          animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.08, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          style={{
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "linear-gradient(135deg, #f06292, #e91e8c, #c2185b)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.6rem",
            boxShadow: "0 8px 24px rgba(233,30,140,0.35), 0 2px 8px rgba(0,0,0,0.10)",
            border: "3px solid white",
            marginBottom: "20px",
          }}
        >
          💌
        </motion.div>

        {/* Email input */}
        <div style={{ width: "100%", marginBottom: "14px" }}>
          <motion.div
            animate={{
              boxShadow: focusedField === "email"
                ? "0 0 0 3px rgba(233,30,140,0.2), 0 4px 12px rgba(233,30,140,0.12)"
                : "0 2px 8px rgba(0,0,0,0.06)",
            }}
            transition={{ duration: 0.25 }}
            style={{
              borderRadius: "14px",
              border: `1.5px solid ${focusedField === "email" ? "#e91e8c" : "rgba(244,143,177,0.35)"}`,
              background: "rgba(255,248,252,0.9)",
              transition: "border-color 0.25s ease",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", padding: "0 14px" }}>
              <span style={{ fontSize: "1rem", opacity: 0.6, marginRight: "10px", flexShrink: 0 }}>✉️</span>
              <input
                type="email"
                placeholder="Email kamu"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onFocus={() => setFocusedField("email")}
                onBlur={() => setFocusedField(null)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  padding: "14px 0",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "0.95rem",
                  color: "#880e4f",
                  width: "100%",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Password input */}
        <div style={{ width: "100%", marginBottom: "20px" }}>
          <motion.div
            animate={{
              boxShadow: focusedField === "password"
                ? "0 0 0 3px rgba(233,30,140,0.2), 0 4px 12px rgba(233,30,140,0.12)"
                : "0 2px 8px rgba(0,0,0,0.06)",
            }}
            transition={{ duration: 0.25 }}
            style={{
              borderRadius: "14px",
              border: `1.5px solid ${focusedField === "password" ? "#e91e8c" : "rgba(244,143,177,0.35)"}`,
              background: "rgba(255,248,252,0.9)",
              transition: "border-color 0.25s ease",
              overflow: "hidden",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", padding: "0 14px" }}>
              <span style={{ fontSize: "1rem", opacity: 0.6, marginRight: "10px", flexShrink: 0 }}>🔒</span>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onFocus={() => setFocusedField("password")}
                onBlur={() => setFocusedField(null)}
                onKeyDown={handleKeyDown}
                style={{
                  flex: 1,
                  border: "none",
                  outline: "none",
                  background: "transparent",
                  padding: "14px 0",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "0.95rem",
                  color: "#880e4f",
                  width: "100%",
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Error message */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -8, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -8, height: 0 }}
              style={{
                width: "100%",
                marginBottom: "16px",
                padding: "10px 14px",
                borderRadius: "12px",
                background: "rgba(233,30,140,0.08)",
                border: "1.5px solid rgba(233,30,140,0.2)",
                fontFamily: "'Nunito', sans-serif",
                fontSize: "0.82rem",
                color: "#c2185b",
                textAlign: "center",
              }}
            >
              {error}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Login button */}
        <motion.button
          onClick={handleLogin}
          disabled={loading}
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.96 }}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: "14px",
            border: "none",
            background: loading
              ? "linear-gradient(135deg, #f48fb1, #f06292)"
              : "linear-gradient(135deg, #f06292, #e91e8c, #c2185b)",
            color: "white",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 800,
            fontSize: "0.92rem",
            letterSpacing: "0.06em",
            cursor: loading ? "not-allowed" : "pointer",
            boxShadow: "0 8px 24px rgba(233,30,140,0.35)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "8px",
            marginBottom: "12px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Shimmer */}
          {!loading && (
            <motion.div
              aria-hidden
              style={{
                position: "absolute",
                top: 0, left: "-100%",
                width: "60%", height: "100%",
                background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.22), transparent)",
                pointerEvents: "none",
              }}
              animate={{ left: ["−100%", "200%"] }}
              transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 2 }}
            />
          )}
          {loading ? (
            <motion.span
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              style={{ display: "inline-block", fontSize: "1rem" }}
            >
              🌸
            </motion.span>
          ) : (
            <motion.span
              animate={{ scale: [1, 1.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              style={{ fontSize: "1rem" }}
            >
              💖
            </motion.span>
          )}
          {loading ? "Masuk..." : "Login"}
        </motion.button>

        {/* Cancel */}
        <motion.button
          onClick={onClose}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "12px",
            border: "1.5px solid rgba(244,143,177,0.3)",
            background: "transparent",
            fontFamily: "'Montserrat', sans-serif",
            fontWeight: 700,
            fontSize: "0.82rem",
            color: "#f48fb1",
            cursor: "pointer",
            letterSpacing: "0.04em",
          }}
        >
          Cancel
        </motion.button>
      </motion.div>
    </motion.div>
  )
}