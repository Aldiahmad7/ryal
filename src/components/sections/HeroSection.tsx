"use client"

import { motion, MotionValue } from "motion/react"
import { forwardRef } from "react"
import PhotoStrip from "@/components/ui/PhotoStrip"
import Sticker from "@/components/ui/Sticker"

interface HeroSectionProps {
  stripY1: MotionValue<number>
  stripY2: MotionValue<number>
  heroScale: MotionValue<number>
  heroOpacity: MotionValue<number>
  titleY: MotionValue<number>
}

const strip1 = [
  "/images/foto1.jpg", "/images/foto2.jpg", "/images/foto4.jpg", "/images/foto11.jpg","/images/foto13.jpg", "/images/foto15.jpg", "/images/foto17.jpg", "/images/foto18.jpg"
]
const strip2 = [
  "/images/foto18.jpg","/images/foto1.jpg", "/images/foto2.jpg", "/images/foto4.jpg", "/images/foto11.jpg","/images/foto13.jpg", "/images/foto15.jpg", "/images/foto17.jpg"
]

const HeroSection = forwardRef<HTMLDivElement, HeroSectionProps>(
  ({ stripY1, stripY2, heroScale, heroOpacity, titleY }, ref) => {
    return (
      <section
        ref={ref}
        className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden"
      >
        {/* Scrolling photo strip background */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-around py-2 gap-2"
          style={{ scale: heroScale }}
        >
          <motion.div style={{ y: stripY1 }} className="opacity-65">
            <PhotoStrip images={strip1} direction={1} speed={22} />
          </motion.div>
          <motion.div style={{ y: stripY2 }} className="opacity-50">
            <PhotoStrip images={strip2} direction={-1} speed={18} />
          </motion.div>
          <motion.div style={{ y: stripY1 }} className="opacity-60">
            <PhotoStrip images={strip1} direction={1} speed={28} />
          </motion.div>
        </motion.div>

        {/* Gradient overlay */}
        <div
          className="absolute inset-0 z-10"
          style={{
            background:
              "radial-gradient(ellipse at 50% 50%, rgba(255,240,246,0.5) 0%, rgba(244,143,177,0.65) 50%, rgba(233,30,140,0.5) 100%)",
          }}
        />

        {/* Floating stickers */}
        <div className="absolute inset-0 z-20 overflow-hidden">
          <Sticker x="4%" y="8%" rotate={-14} delay={0.8} size="text-5xl">🌸</Sticker>
          <Sticker x="87%" y="6%" rotate={16} delay={1.0} size="text-4xl">💖</Sticker>
          <Sticker x="2%" y="72%" rotate={-8} delay={1.2} size="text-5xl">🌷</Sticker>
          <Sticker x="91%" y="68%" rotate={12} delay={1.4} size="text-4xl">✨</Sticker>
          <Sticker x="14%" y="52%" rotate={-22} delay={1.6} size="text-4xl">🦋</Sticker>
          <Sticker x="82%" y="38%" rotate={20} delay={1.8} size="text-4xl">🍓</Sticker>
          <Sticker x="50%" y="3%" rotate={5} delay={2.0} size="text-4xl">⭐</Sticker>
          <Sticker x="93%" y="48%" rotate={-11} delay={2.2} size="text-3xl">🌺</Sticker>
          <Sticker x="75%" y="85%" rotate={8} delay={2.4} size="text-3xl">💕</Sticker>
          <Sticker x="20%" y="88%" rotate={-6} delay={2.6} size="text-3xl">🎀</Sticker>
        </div>

        {/* Hero content */}
        <motion.div
          className="relative z-30 text-center px-6"
          style={{ y: titleY, opacity: heroOpacity }}
        >
          {/* Badge */}
          <motion.div
            className="inline-flex items-center gap-2 rounded-full px-6 py-2.5 mb-8 text-sm font-bold shadow-lg"
            style={{
              background: "rgba(255,255,255,0.85)",
              color: "#e91e8c",
              fontFamily: "'Nunito', sans-serif",
              backdropFilter: "blur(10px)",
            }}
            initial={{ opacity: 0, y: -30, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, type: "spring", bounce: 0.4 }}
          >
            <span className="heartbeat">💕</span>
            For You.. Someone Special
            <span className="heartbeat">💕</span>
          </motion.div>

          {/* Main title */}
          <motion.h1
            style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "clamp(4.5rem, 13vw, 10rem)",
              color: "white",
              textShadow: "0 6px 40px rgba(194,24,91,0.4), 0 2px 0 rgba(0,0,0,0.1)",
              lineHeight: 1,
              marginBottom: "0.2em",
            }}
            initial={{ opacity: 0, scale: 0.75, y: 50 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1, type: "spring", bounce: 0.3 }}
          >
            Ayyaa
          </motion.h1>

          <motion.div
            style={{
              fontFamily: "'Dancing Script', cursive",
              fontSize: "clamp(2.5rem, 8vw, 5rem)",
              color: "rgba(255,240,246,0.95)",
              textShadow: "0 2px 20px rgba(0,0,0,0.2)",
              marginBottom: "1rem",
            }}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.75, duration: 0.9, type: "spring" }}
          >
            Tristan Tsurayyaa Mumtaaz
          </motion.div>

          <motion.p
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontSize: "1.1rem",
              color: "rgba(255,255,255,0.92)",
              textShadow: "0 2px 12px rgba(0,0,0,0.2)",
              maxWidth: 380,
              margin: "0 auto 2.5rem",
              lineHeight: 1.7,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.1, duration: 0.9 }}
          >
            A little place for all our beautiful memories 🌷
          </motion.p>

          {/* CTA Button */}
          <motion.button
            style={{
              fontFamily: "'Nunito', sans-serif",
              fontWeight: 800,
              color: "white",
              borderRadius: "9999px",
              padding: "1rem 2.5rem",
              fontSize: "1rem",
              background: "linear-gradient(135deg, #f06292 0%, #e91e8c 50%, #c2185b 100%)",
              boxShadow: "0 8px 30px rgba(233,30,140,0.4)",
              border: "none",
              cursor: "pointer",
            }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.35, duration: 0.8, type: "spring" }}
            whileHover={{ scale: 1.08, boxShadow: "0 16px 50px rgba(233,30,140,0.55)" }}
            whileTap={{ scale: 0.95 }}
          >
            Look Back On Our Memories ↓
          </motion.button>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
        >
          <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.7rem", color: "rgba(255,255,255,0.7)", letterSpacing: "0.2em", textTransform: "uppercase" }}>
            scroll
          </p>
          <div
            className="flex justify-center pt-2 rounded-full border-2 border-white/50"
            style={{ width: 26, height: 42 }}
          >
            <motion.div
              className="rounded-full bg-white"
              style={{ width: 6, height: 6 }}
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </section>
    )
  }
)

HeroSection.displayName = "HeroSection"
export default HeroSection