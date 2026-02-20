"use client"

import { motion, useScroll, useTransform } from "motion/react"
import { useRef } from "react"

import HeroSection from "@/components/sections/HeroSection"
import StatsSection from "@/components/sections/StatsSection"
import LoveStorySection from "@/components/sections/LoveStorySection"
import GallerySection from "@/components/sections/GallerySection"
import LoveLetterSection from "@/components/sections/LoveLetterSection"
import FooterSection from "@/components/sections/FooterSection"
import CursorSparkle from "@/components/ui/CursorSparkle"

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  })

  const stripY1 = useTransform(scrollYProgress, [0, 1], [0, -100])
  const stripY2 = useTransform(scrollYProgress, [0, 1], [0, -160])
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.1])
  const heroOpacity = useTransform(scrollYProgress, [0, 0.75], [1, 0])
  const titleY = useTransform(scrollYProgress, [0, 1], [0, -70])

  return (
    <main className="relative overflow-x-hidden" style={{ background: "#fff0f6" }}>
      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;1,400&family=Nunito:wght@400;600;700;800&family=Dancing+Script:wght@600;700&display=swap');
        
        *,
        *::before,
        *::after {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }
        
        body {
          background: #fff0f6;
          overflow-x: hidden;
        }
        
        ::selection {
          background: #f48fb1;
          color: #fff;
        }
        
        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          14% { transform: scale(1.35); }
          28% { transform: scale(1); }
          42% { transform: scale(1.2); }
          70% { transform: scale(1); }
        }
        
        .heartbeat {
          animation: heartbeat 1.6s ease-in-out infinite;
          display: inline-block;
        }
      `}</style>

      <CursorSparkle />

      <HeroSection
        ref={heroRef}
        stripY1={stripY1}
        stripY2={stripY2}
        heroScale={heroScale}
        heroOpacity={heroOpacity}
        titleY={titleY}
      />

      {/* Wave separator */}
      <div style={{ background: "#fff0f6", lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" xmlns="http://www.w3.org/2000/svg" style={{ display: "block", width: "100%" }}>
          <path d="M0,40 C360,80 1080,0 1440,40 L1440,80 L0,80 Z" fill="#fff0f6" />
        </svg>
      </div>

      <StatsSection />
      <LoveStorySection />
      <GallerySection />
      <LoveLetterSection />
      <FooterSection />
    </main>
  )
}