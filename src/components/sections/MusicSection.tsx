"use client"

import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import Image from "next/image"

const songs = [
  {
    title: "Somebody's Pleasure (Extended Version)",
    artist: "Aziz Hedra",
    cover: "/images/foto16.jpg",
    src: "/api/stream/song1.mp3",
    startTime: 180,
    endTime: 278,
    accent: "#e91e8c",
  },
  {
    title: "Monolog",
    artist: "Pamungkas",
    cover: "/images/foto1.jpg",
    src: "/api/stream/song2.mp3",
    startTime: 133,
    endTime: 193,
    accent: "#f06292",
  },
]

function formatTime(sec: number) {
  return `${Math.floor(sec / 60)}:${(sec % 60).toString().padStart(2, "0")}`
}

function SongCard({
  song,
  isActive,
  onPlay,
  index,
}: {
  song: any
  isActive: boolean
  onPlay: () => void
  index: number
}) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [imageError, setImageError] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    if (!isActive && audioRef.current) {
      audioRef.current.pause()
      setPlaying(false)
    }
  }, [isActive])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleLoadedMetadata = () => {
      audio.currentTime = song.startTime
    }

    const handleTimeUpdate = () => {
      if (!audioRef.current) return
      const a = audioRef.current

      if (a.currentTime >= song.endTime) {
        a.currentTime = song.startTime
        a.play()
      }

      const progress =
        ((a.currentTime - song.startTime) /
          (song.endTime - song.startTime)) *
        100

      setProgress(Math.max(0, Math.min(100, progress)))
    }

    audio.addEventListener("loadedmetadata", handleLoadedMetadata)
    audio.addEventListener("timeupdate", handleTimeUpdate)

    return () => {
      audio.removeEventListener("loadedmetadata", handleLoadedMetadata)
      audio.removeEventListener("timeupdate", handleTimeUpdate)
    }
  }, [song.startTime, song.endTime])

  const togglePlay = async () => {
    const audio = audioRef.current
    if (!audio) return

    try {
      if (playing) {
        audio.pause()
        setPlaying(false)
        return
      }

      onPlay()

      if (
        audio.currentTime < song.startTime ||
        audio.currentTime >= song.endTime
      ) {
        audio.currentTime = song.startTime
      }

      await audio.play()
      setPlaying(true)

    } catch (err) {
      console.error("Play error:", err)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.15, duration: 0.8, type: "spring" }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ 
        position: "relative", 
        width: "100%",
        maxWidth: "300px",
        margin: "0 auto",
      }}
    >
      {/* Glow halo */}
      <motion.div
        animate={{ opacity: hovered || playing ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        style={{
          position: "absolute", inset: "-10px", borderRadius: "30px",
          background: `radial-gradient(ellipse, ${song.accent}30 0%, transparent 70%)`,
          filter: "blur(18px)", pointerEvents: "none",
        }}
      />

      {/* Card */}
      <motion.div
        animate={{ scale: hovered ? 1.025 : 1, y: hovered ? -4 : 0 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        style={{
          borderRadius: "24px",
          background: "rgba(255,255,255,0.93)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: `1.5px solid ${playing ? song.accent + "55" : "rgba(244,143,177,0.25)"}`,
          boxShadow: playing
            ? `0 20px 60px ${song.accent}22, 0 4px 20px rgba(233,30,140,0.12)`
            : "0 8px 32px rgba(233,30,140,0.10), 0 2px 8px rgba(0,0,0,0.06)",
          overflow: "hidden",
          transition: "border-color 0.4s, box-shadow 0.4s",
        }}
      >
        {/* Top accent bar */}
        <motion.div
          animate={{ scaleX: playing ? 1 : 0, opacity: playing ? 1 : 0 }}
          transition={{ duration: 0.5 }}
          style={{
            height: "3px",
            background: `linear-gradient(90deg, transparent, ${song.accent}, ${song.accent}88, transparent)`,
            transformOrigin: "left",
          }}
        />

        {/* Cover art */}
        <div style={{ position: "relative", width: "100%", aspectRatio: "1/1", overflow: "hidden" }}>
          {!imageError ? (
            <motion.div
              animate={{ scale: playing ? 1.06 : 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              style={{ width: "100%", height: "100%", position: "relative" }}
            >
              <Image
                src={song.cover}
                alt={song.title}
                width={300}
                height={300}
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
                onError={() => setImageError(true)}
                priority={false}
              />
            </motion.div>
          ) : (
            <div style={{
              width: "100%", height: "100%",
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "linear-gradient(135deg, #fce4ec, #f8bbd0)",
              fontSize: "4rem",
            }}>
              🎵
            </div>
          )}

          {/* Gradient overlay */}
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(to top, rgba(255,240,246,0.9) 0%, transparent 50%)",
            pointerEvents: "none",
          }} />

          {/* PLAYING badge */}
          <AnimatePresence>
            {playing && (
              <motion.div
                initial={{ opacity: 0, scale: 0.8, y: -8 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -8 }}
                style={{
                  position: "absolute", top: "12px", left: "12px",
                  background: `linear-gradient(135deg, ${song.accent}, #c2185b)`,
                  borderRadius: "99px", padding: "5px 12px",
                  display: "flex", alignItems: "center", gap: "7px",
                  boxShadow: `0 4px 16px ${song.accent}55`,
                  zIndex: 2,
                }}
              >
                <div style={{ display: "flex", gap: "2px", alignItems: "flex-end", height: "12px" }}>
                  {[1, 0.5, 0.8].map((h, i) => (
                    <motion.div
                      key={i}
                      animate={{ scaleY: [h, 1, h * 0.3, 1, h] }}
                      transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.15, ease: "easeInOut" }}
                      style={{ width: "3px", height: "12px", background: "white", borderRadius: "2px", transformOrigin: "bottom" }}
                    />
                  ))}
                </div>
                <span style={{ fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "0.6rem", color: "white", letterSpacing: "0.1em" }}>
                  PLAYING
                </span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Play/pause button */}
          <motion.button
            onClick={togglePlay}
            animate={{ opacity: hovered || playing ? 1 : 0, scale: hovered || playing ? 1 : 0.8 }}
            transition={{ duration: 0.25 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            style={{
              position: "absolute", bottom: "14px", right: "14px",
              width: "52px", height: "52px", borderRadius: "50%", border: "none",
              background: `linear-gradient(135deg, ${song.accent}, #c2185b)`,
              color: "white", fontSize: "1.2rem", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              boxShadow: `0 8px 24px ${song.accent}55`,
              zIndex: 2,
            }}
          >
            {playing ? "⏸" : "▶"}
          </motion.button>
        </div>

        {/* Info */}
        <div style={{ 
          padding: "clamp(12px, 2vw, 16px) clamp(12px, 2vw, 18px) clamp(16px, 2.5vw, 20px)" 
        }}>
          <p style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "clamp(0.75rem, 3vw, 0.97rem)",
            fontWeight: 700, 
            color: "#880e4f",
            margin: "0 0 3px", 
            lineHeight: 1.3,
            overflow: "hidden", 
            textOverflow: "ellipsis", 
            display: "-webkit-box",
            WebkitLineClamp: 2,
            WebkitBoxOrient: "vertical",
            whiteSpace: "normal",
            minHeight: "2.6em",
          }}>
            {song.title}
          </p>
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "clamp(0.7rem, 2.5vw, 0.8rem)",
            color: "#f48fb1",
            margin: "0 0 14px", 
            fontWeight: 600,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}>
            {song.artist}
          </p>

          {/* Progress bar */}
          <div style={{ marginBottom: "6px" }}>
            <div style={{
              width: "100%", height: "4px",
              background: "rgba(233,30,140,0.12)",
              borderRadius: "99px", overflow: "hidden",
            }}>
              <div style={{
                width: `${progress}%`, height: "100%",
                background: `linear-gradient(90deg, ${song.accent}aa, ${song.accent})`,
                borderRadius: "99px", transition: "width 0.1s linear",
              }} />
            </div>
          </div>

          {/* Time labels */}
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ 
              fontFamily: "'Montserrat', sans-serif", 
              fontSize: "clamp(0.55rem, 2vw, 0.62rem)", 
              color: "#f48fb1", 
              fontWeight: 600, 
              letterSpacing: "0.06em" 
            }}>
              {formatTime(song.startTime)}
            </span>
            <span style={{ 
              fontFamily: "'Montserrat', sans-serif", 
              fontSize: "clamp(0.55rem, 2vw, 0.62rem)", 
              color: "rgba(244,143,177,0.6)", 
              fontWeight: 600, 
              letterSpacing: "0.06em" 
            }}>
              {formatTime(song.endTime)}
            </span>
          </div>
        </div>
      </motion.div>

      {/* audio stream */}
      <audio
        ref={audioRef}
        src={song.src}
        preload="metadata"
        controlsList="nodownload"
      />
    </motion.div>
  )
}

export default function MusicSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  return (
    <section
      style={{
        padding: "50px 24px 50px",
        background: "linear-gradient(180deg, #fdf2f8 0%, #fce4ec 50%, #fff0f6 100%)",
        position: "relative",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* BG blobs */}
      <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", overflow: "hidden" }}>
        <div style={{ position: "absolute", top: "-80px", left: "-80px", width: "380px", height: "380px", borderRadius: "50%", background: "radial-gradient(circle, rgba(233,30,140,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-60px", right: "-60px", width: "320px", height: "320px", borderRadius: "50%", background: "radial-gradient(circle, rgba(240,98,146,0.07) 0%, transparent 70%)" }} />
      </div>

      {/* Dot pattern */}
      <div aria-hidden style={{
        position: "absolute", inset: 0, pointerEvents: "none",
        backgroundImage: "radial-gradient(circle, #f8bbd0 1.5px, transparent 1.5px)",
        backgroundSize: "28px 28px", opacity: 0.35,
      }} />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{ textAlign: "center", marginBottom: "16px", position: "relative", zIndex: 1 }}
      >
        <motion.p
          initial={{ opacity: 0, letterSpacing: "0.1em" }}
          whileInView={{ opacity: 1, letterSpacing: "0.32em" }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.1 }}
          style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", fontWeight: 800, letterSpacing: "0.32em", textTransform: "uppercase", color: "#f48fb1", marginBottom: "14px" }}
        >
          ✦ Chapter III ✦
        </motion.p>

        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2.4rem, 6vw, 4rem)", color: "#c2185b", margin: "0 0 14px", textShadow: "0 2px 20px rgba(194,24,91,0.15)" }}>
          Our Playlist 🎧
        </h2>

        <motion.div
          initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          style={{ width: "100px", height: "2px", background: "linear-gradient(90deg, transparent, #e91e8c, transparent)", margin: "0 auto", transformOrigin: "center" }}
        />
      </motion.div>

      {/* Cards */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: "clamp(12px, 2vw, 24px)",
        position: "relative", zIndex: 1,
        marginTop: "48px",
        width: "100%", 
        maxWidth: "700px",
        padding: "0 12px",
      }}>
        {songs.map((song, i) => (
          <div key={i} style={{ width: "100%" }}>
            <SongCard
              song={song}
              index={i}
              isActive={activeIndex === i}
              onPlay={() => setActiveIndex(i)}
            />
          </div>
        ))}
      </div>
    </section>
  )
}