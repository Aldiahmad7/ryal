"use client"

import { useEffect, useState, useRef } from "react"
import { motion, AnimatePresence } from "motion/react"
import { supabase } from "@/lib/supabase"

type Photo = {
  id: string
  image_url: string
  title: string
  date: string
}

// ─── Toast ────────────────────────────────────────────────────────────────────
function Toast({ msg, type }: { msg: string; type: "success" | "error" | "warn" }) {
  const bg =
    type === "success"
      ? "linear-gradient(135deg, #f06292, #e91e8c)"
      : type === "error"
      ? "linear-gradient(135deg, #e53935, #c62828)"
      : "linear-gradient(135deg, #f48fb1, #f06292)"
  return (
    // Outer wrapper: fixed full-width, only handles horizontal centering
    <div
      style={{
        position: "fixed",
        bottom: "32px",
        left: 0,
        right: 0,
        zIndex: 99999,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        pointerEvents: "none",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.88 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 240, damping: 22 }}
        style={{
          padding: "14px 28px",
          borderRadius: "99px",
          background: bg,
          color: "white",
          fontFamily: "'Montserrat', sans-serif",
          fontWeight: 700,
          fontSize: "0.88rem",
          letterSpacing: "0.04em",
          boxShadow: "0 8px 32px rgba(0,0,0,0.18), 0 2px 8px rgba(0,0,0,0.10)",
          whiteSpace: "nowrap",
        }}
      >
        {msg}
      </motion.div>
    </div>
  )
}

// ─── Confirm Delete Modal ─────────────────────────────────────────────────────
function ConfirmModal({
  photo,
  onConfirm,
  onCancel,
}: {
  photo: Photo
  onConfirm: () => void
  onCancel: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onCancel}
      style={{
        position: "fixed", inset: 0, zIndex: 9998,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
        background: "rgba(100,0,40,0.40)",
        backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.82, opacity: 0, y: 32 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.88, opacity: 0, y: 20 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        style={{
          width: "100%", maxWidth: "360px",
          borderRadius: "24px",
          background: "rgba(255,255,255,0.97)",
          backdropFilter: "blur(20px)",
          border: "2px solid rgba(255,255,255,0.95)",
          boxShadow: "0 32px 80px rgba(194,24,91,0.20), 0 8px 24px rgba(0,0,0,0.10)",
          overflow: "hidden",
          display: "flex", flexDirection: "column", alignItems: "center",
        }}
      >
        {/* Top bar */}
        <div style={{ width: "100%", height: "4px", background: "linear-gradient(90deg, #f06292, #e91e8c, #f06292)" }} />

        <div style={{ padding: "32px 28px 28px", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center" }}>
          {/* Thumbnail */}
          <div style={{
            width: "80px", height: "80px", borderRadius: "16px", overflow: "hidden",
            marginBottom: "18px", border: "3px solid white",
            boxShadow: "0 8px 24px rgba(233,30,140,0.20)",
            flexShrink: 0,
          }}>
            <img src={photo.image_url} alt={photo.title} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>

          {/* Icon */}
          <motion.div
            animate={{ rotate: [-8, 8, -8], scale: [1, 1.08, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ fontSize: "2rem", marginBottom: "12px" }}
          >
            🗑️
          </motion.div>

          <h3 style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: "1.35rem", color: "#c2185b", margin: "0 0 8px",
          }}>
            Delete Photo?
          </h3>
          <p style={{
            fontFamily: "'Nunito', sans-serif",
            fontSize: "0.88rem", color: "#ad1457", lineHeight: 1.6, margin: "0 0 24px", opacity: 0.8,
          }}>
            <strong>"{photo.title}"</strong> will be permanently deleted and cannot be recovered.
          </p>

          <div style={{ display: "flex", gap: "10px", width: "100%" }}>
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }}
              onClick={onConfirm}
              style={{
                flex: 1, padding: "12px", borderRadius: "12px", border: "none",
                background: "linear-gradient(135deg, #e53935, #c62828)",
                color: "white", fontFamily: "'Montserrat', sans-serif",
                fontWeight: 800, fontSize: "0.82rem", letterSpacing: "0.05em",
                cursor: "pointer", boxShadow: "0 6px 18px rgba(229,57,53,0.30)",
              }}>
              🗑️ Yes, Delete
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.04, y: -1 }} whileTap={{ scale: 0.96 }}
              onClick={onCancel}
              style={{
                flex: 1, padding: "12px", borderRadius: "12px",
                border: "1.5px solid rgba(244,143,177,0.40)",
                background: "transparent", color: "#f48fb1",
                fontFamily: "'Montserrat', sans-serif",
                fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.05em",
                cursor: "pointer",
              }}>
              Cancel
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Edit Modal ───────────────────────────────────────────────────────────────
function EditModal({
  photo,
  onSave,
  onClose,
}: {
  photo: Photo
  onSave: (id: string, title: string, date: string) => void
  onClose: () => void
}) {
  const [newTitle, setNewTitle] = useState(photo.title)
  const [newDate, setNewDate] = useState(photo.date)
  const [focused, setFocused] = useState<string | null>(null)

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, zIndex: 9999,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "24px",
        background: "rgba(120,0,60,0.35)",
        backdropFilter: "blur(8px)", WebkitBackdropFilter: "blur(8px)",
      }}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        initial={{ scale: 0.85, opacity: 0, y: 30 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 16 }}
        transition={{ type: "spring", stiffness: 220, damping: 22 }}
        style={{
          width: "100%", maxWidth: "400px",
          borderRadius: "24px", padding: "36px 32px",
          background: "rgba(255,255,255,0.97)",
          boxShadow: "0 32px 80px rgba(194,24,91,0.2), 0 8px 24px rgba(0,0,0,0.10)",
          border: "2px solid rgba(255,255,255,0.95)",
          position: "relative", overflow: "hidden",
        }}
      >
        <div style={{ position: "absolute", top: 0, left: "8%", right: "8%", height: "3px", borderRadius: "0 0 8px 8px", background: "linear-gradient(90deg, transparent, #f06292, #e91e8c, #f06292, transparent)" }} />

        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", color: "#c2185b", marginBottom: "24px", textAlign: "center" }}>
          ✏️ Edit Photo
        </h3>

        {[
          { label: "Title", value: newTitle, setter: setNewTitle, placeholder: "Photo title...", key: "title" },
          { label: "Date", value: newDate, setter: setNewDate, placeholder: "Jan '25", key: "date" },
        ].map(({ label, value, setter, placeholder, key }) => (
          <div key={key} style={{ marginBottom: "16px" }}>
            <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.68rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f48fb1", display: "block", marginBottom: "6px" }}>
              {label}
            </label>
            <motion.div
              animate={{ boxShadow: focused === key ? "0 0 0 3px rgba(233,30,140,0.18)" : "0 2px 8px rgba(0,0,0,0.06)" }}
              style={{ borderRadius: "12px", border: `1.5px solid ${focused === key ? "#e91e8c" : "rgba(244,143,177,0.35)"}`, background: "#fff8fc", transition: "border-color 0.2s", overflow: "hidden" }}
            >
              <input
                value={value}
                onChange={(e) => setter(e.target.value)}
                placeholder={placeholder}
                onFocus={() => setFocused(key)}
                onBlur={() => setFocused(null)}
                style={{ width: "100%", padding: "12px 14px", border: "none", outline: "none", background: "transparent", fontFamily: "'Nunito', sans-serif", fontSize: "0.95rem", color: "#880e4f", boxSizing: "border-box" }}
              />
            </motion.div>
          </div>
        ))}

        <div style={{ display: "flex", gap: "10px", marginTop: "24px" }}>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={() => onSave(photo.id, newTitle, newDate)}
            style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "none", background: "linear-gradient(135deg, #f06292, #e91e8c)", color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "0.85rem", cursor: "pointer", boxShadow: "0 6px 18px rgba(233,30,140,0.3)" }}>
            Save 💾
          </motion.button>
          <motion.button whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} onClick={onClose}
            style={{ flex: 1, padding: "12px", borderRadius: "12px", border: "1.5px solid rgba(244,143,177,0.35)", background: "transparent", color: "#f48fb1", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.85rem", cursor: "pointer" }}>
            Cancel
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Photo Card ───────────────────────────────────────────────────────────────
function PhotoCard({
  photo,
  onEdit,
  onDelete,
}: {
  photo: Photo
  onEdit: (photo: Photo) => void
  onDelete: (photo: Photo) => void
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.88, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.82, y: -16 }}
      transition={{ type: "spring", stiffness: 200, damping: 20 }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{ position: "relative" }}
    >
      <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
        style={{ position: "absolute", inset: "-4px", borderRadius: "22px", background: "radial-gradient(ellipse, rgba(233,30,140,0.18) 0%, transparent 70%)", filter: "blur(10px)", pointerEvents: "none" }}
      />
      <div style={{
        borderRadius: "20px", background: "rgba(255,255,255,0.95)",
        border: `1.5px solid ${hovered ? "rgba(233,30,140,0.28)" : "rgba(244,143,177,0.2)"}`,
        boxShadow: hovered ? "0 16px 40px rgba(233,30,140,0.14), 0 4px 12px rgba(0,0,0,0.08)" : "0 4px 16px rgba(0,0,0,0.07)",
        overflow: "hidden", transition: "border-color 0.25s, box-shadow 0.25s",
      }}>
        <div style={{ position: "relative", aspectRatio: "4/3", overflow: "hidden", background: "linear-gradient(135deg, #fce4ec, #f8bbd0)" }}>
          <motion.img
            src={photo.image_url} alt={photo.title}
            animate={{ scale: hovered ? 1.07 : 1 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
          <motion.div animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.3 }}
            style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(194,24,91,0.5) 0%, transparent 60%)" }}
          />
          <div style={{ position: "absolute", top: "10px", right: "10px", padding: "4px 12px", borderRadius: "99px", background: "linear-gradient(135deg, #f06292, #e91e8c)", color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "0.62rem", letterSpacing: "0.06em", boxShadow: "0 2px 8px rgba(233,30,140,0.35)" }}>
            {photo.date}
          </div>
        </div>
        <div style={{ padding: "14px 16px 16px" }}>
          <p style={{ fontFamily: "'Dancing Script', cursive", fontSize: "1.05rem", color: "#c2185b", margin: "0 0 12px", lineHeight: 1.3 }}>
            {photo.title}
          </p>
          <div style={{ display: "flex", gap: "8px" }}>
            <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} onClick={() => onEdit(photo)}
              style={{ flex: 1, padding: "8px", borderRadius: "10px", border: "none", background: "linear-gradient(135deg, #fce4ec, #f8bbd0)", color: "#c2185b", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.06em", cursor: "pointer" }}>
              ✏️ Edit
            </motion.button>
            <motion.button whileHover={{ scale: 1.05, y: -1 }} whileTap={{ scale: 0.95 }} onClick={() => onDelete(photo)}
              style={{ flex: 1, padding: "8px", borderRadius: "10px", border: "none", background: "rgba(229,57,53,0.08)", color: "#e53935", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "0.7rem", letterSpacing: "0.06em", cursor: "pointer" }}>
              🗑️ Delete
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function AdminPage() {
  const [photos, setPhotos] = useState<Photo[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [title, setTitle] = useState("")
  const [date, setDate] = useState("")
  const [loading, setLoading] = useState(false)
  const [editingPhoto, setEditingPhoto] = useState<Photo | null>(null)
  const [deletingPhoto, setDeletingPhoto] = useState<Photo | null>(null)
  const [toast, setToast] = useState<{ msg: string; type: "success" | "error" | "warn" } | null>(null)
  const [focused, setFocused] = useState<string | null>(null)
  const [dragOver, setDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploadError, setUploadError] = useState("")

  const showToast = (msg: string, type: "success" | "error" | "warn" = "success") => {
    setToast({ msg, type })
    setTimeout(() => setToast(null), 3000)
  }

  const checkUser = async () => {
    const { data } = await supabase.auth.getUser()
    if (!data.user) window.location.href = "/"
  }

  const fetchPhotos = async () => {
    const { data } = await supabase.from("photos").select("*").order("created_at", { ascending: false })
    if (data) setPhotos(data)
  }

  useEffect(() => { checkUser(); fetchPhotos() }, [])

  const handleUpload = async () => {
    if (!file || !title || !date) { setUploadError("⚠️ Please fill in all fields before uploading."); return }
    setUploadError("")
    setLoading(true)
    const fileName = `${Date.now()}-${file.name}`
    const { error: storUploadError } = await supabase.storage.from("gallery").upload(fileName, file)
    if (storUploadError) { showToast("Upload failed 😢", "error"); setLoading(false); return }
    const { data } = supabase.storage.from("gallery").getPublicUrl(fileName)
    await supabase.from("photos").insert([{ image_url: data.publicUrl, title, date }])
    setFile(null); setTitle(""); setDate("")
    setLoading(false)
    showToast("Photo uploaded successfully! 💖")
    fetchPhotos()
  }

  const handleDeleteConfirmed = async () => {
    if (!deletingPhoto) return
    const photo = deletingPhoto
    setDeletingPhoto(null)
    try {
      const filePath = photo.image_url.split("/").pop()
      if (filePath) {
        const { error: storageError } = await supabase.storage.from("gallery").remove([filePath])
        if (storageError) { showToast("Failed to delete from storage 😢", "error"); return }
      }
      const { error: dbError } = await supabase.from("photos").delete().eq("id", photo.id)
      if (dbError) { showToast("Failed to delete photo 😢", "error"); return }
      setPhotos((prev) => prev.filter((p) => p.id !== photo.id))
      showToast("Photo deleted successfully 🗑️")
    } catch (err) {
      console.error(err)
      showToast("An error occurred 😢", "error")
    }
  }

  const handleEdit = async (id: string, newTitle: string, newDate: string) => {
    if (!newTitle || !newDate) return
    const { error } = await supabase.from("photos").update({ title: newTitle, date: newDate }).eq("id", id)
    if (error) { showToast("Failed to update photo 😢", "error"); return }
    setEditingPhoto(null)
    showToast("Photo updated successfully! ✨")
    fetchPhotos()
  }

  const inputStyle = (key: string) => ({
    width: "100%", padding: "12px 14px", border: "none", outline: "none",
    background: "transparent", fontFamily: "'Nunito', sans-serif",
    fontSize: "0.92rem", color: "#880e4f", boxSizing: "border-box" as const,
  })

  const wrapStyle = (key: string) => ({
    borderRadius: "12px",
    border: `1.5px solid ${focused === key ? "#e91e8c" : "rgba(244,143,177,0.35)"}`,
    background: "#fff8fc", transition: "border-color 0.2s", overflow: "hidden" as const,
  })

  return (
    <div style={{
      minHeight: "100vh",
      background: "linear-gradient(160deg, #fff0f6 0%, #fce4ec 50%, #fdf2f8 100%)",
      fontFamily: "'Nunito', sans-serif",
      position: "relative",
    }}>
      {/* BG blobs */}
      <div aria-hidden style={{ position: "fixed", inset: 0, pointerEvents: "none", overflow: "hidden", zIndex: 0 }}>
        <div style={{ position: "absolute", top: "-100px", left: "-100px", width: "400px", height: "400px", borderRadius: "50%", background: "radial-gradient(circle, rgba(233,30,140,0.07) 0%, transparent 70%)" }} />
        <div style={{ position: "absolute", bottom: "-80px", right: "-80px", width: "360px", height: "360px", borderRadius: "50%", background: "radial-gradient(circle, rgba(233,30,140,0.06) 0%, transparent 70%)" }} />
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "clamp(24px, 5vw, 48px) clamp(16px, 4vw, 32px)", position: "relative", zIndex: 1 }}>

        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}
          style={{ marginBottom: "36px", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "16px" }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.8rem, 5vw, 2.6rem)", color: "#c2185b", margin: "0 0 4px" }}>
              📸 Admin Gallery
            </h1>
            <p style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.72rem", fontWeight: 700, color: "#f48fb1", letterSpacing: "0.12em", textTransform: "uppercase", margin: 0 }}>
              {photos.length} photos stored
            </p>
          </div>
          <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.96 }}
            onClick={async () => { await supabase.auth.signOut(); window.location.href = "/" }}
            style={{ padding: "10px 20px", borderRadius: "12px", border: "1.5px solid rgba(244,143,177,0.4)", background: "rgba(255,255,255,0.7)", color: "#f48fb1", fontFamily: "'Montserrat', sans-serif", fontWeight: 700, fontSize: "0.8rem", cursor: "pointer", backdropFilter: "blur(8px)" }}>
            Logout 👋
          </motion.button>
        </motion.div>

        {/* Upload Card */}
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15, duration: 0.7 }}
          style={{ borderRadius: "24px", background: "rgba(255,255,255,0.92)", backdropFilter: "blur(16px)", border: "2px solid rgba(255,255,255,0.9)", boxShadow: "0 16px 48px rgba(233,30,140,0.10), 0 4px 16px rgba(0,0,0,0.07)", padding: "clamp(24px, 5vw, 36px)", marginBottom: "36px", position: "relative", overflow: "hidden" }}>
          <div style={{ position: "absolute", top: 0, left: "5%", right: "5%", height: "3px", borderRadius: "0 0 8px 8px", background: "linear-gradient(90deg, transparent, #f06292, #e91e8c, #f06292, transparent)" }} />

          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.35rem", color: "#c2185b", marginBottom: "22px" }}>
            ✨ Upload New Photo
          </h2>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "14px", alignItems: "end" }}>
            {/* Drop zone */}
            <div style={{ gridColumn: "1 / -1" }}>
              <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f48fb1", display: "block", marginBottom: "8px" }}>Photo</label>
              <motion.div
                animate={{ borderColor: dragOver ? "#e91e8c" : (file ? "#f06292" : "rgba(244,143,177,0.4)"), background: dragOver ? "rgba(233,30,140,0.04)" : "#fff8fc" }}
                transition={{ duration: 0.2 }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); const f = e.dataTransfer.files[0]; if (f) setFile(f) }}
                onClick={() => fileInputRef.current?.click()}
                style={{ borderRadius: "14px", border: "2px dashed rgba(244,143,177,0.4)", padding: "20px", textAlign: "center", cursor: "pointer" }}
              >
                <input ref={fileInputRef} type="file" accept="image/*" onChange={(e) => setFile(e.target.files?.[0] || null)} style={{ display: "none" }} />
                {file ? (
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
                    <span style={{ fontSize: "1.2rem" }}>🌸</span>
                    <span style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.88rem", color: "#c2185b", fontWeight: 700 }}>{file.name}</span>
                    <motion.span whileHover={{ scale: 1.2 }} onClick={(e) => { e.stopPropagation(); setFile(null) }}
                      style={{ cursor: "pointer", color: "#f48fb1", fontSize: "1.1rem", lineHeight: 1 }}>×</motion.span>
                  </div>
                ) : (
                  <div>
                    <div style={{ fontSize: "1.8rem", marginBottom: "6px", opacity: 0.45 }}>📸</div>
                    <p style={{ fontFamily: "'Nunito', sans-serif", fontSize: "0.85rem", color: "#f48fb1", margin: 0 }}>
                      Drag & drop or <span style={{ color: "#e91e8c", fontWeight: 700, textDecoration: "underline" }}>click to browse</span>
                    </p>
                  </div>
                )}
              </motion.div>
            </div>

            {/* Title */}
            <div>
              <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f48fb1", display: "block", marginBottom: "6px" }}>Title</label>
              <motion.div animate={{ boxShadow: focused === "title" ? "0 0 0 3px rgba(233,30,140,0.16)" : "0 2px 8px rgba(0,0,0,0.05)" }} style={wrapStyle("title")}>
                <input type="text" placeholder="Photo title..." value={title} onChange={(e) => setTitle(e.target.value)} onFocus={() => setFocused("title")} onBlur={() => setFocused(null)} style={inputStyle("title")} />
              </motion.div>
            </div>

            {/* Date */}
            <div>
              <label style={{ fontFamily: "'Montserrat', sans-serif", fontSize: "0.66rem", fontWeight: 800, letterSpacing: "0.12em", textTransform: "uppercase", color: "#f48fb1", display: "block", marginBottom: "6px" }}>Date</label>
              <motion.div animate={{ boxShadow: focused === "date" ? "0 0 0 3px rgba(233,30,140,0.16)" : "0 2px 8px rgba(0,0,0,0.05)" }} style={wrapStyle("date")}>
                <input type="text" placeholder="Jan '25" value={date} onChange={(e) => setDate(e.target.value)} onFocus={() => setFocused("date")} onBlur={() => setFocused(null)} style={inputStyle("date")} />
              </motion.div>
            </div>

            {/* Button */}
            <div style={{ display: "flex", alignItems: "flex-end" }}>
              <motion.button onClick={handleUpload} disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.04, y: loading ? 0 : -2 }} whileTap={{ scale: loading ? 1 : 0.96 }}
                style={{ width: "100%", padding: "13px 16px", borderRadius: "12px", border: "none", background: loading ? "linear-gradient(135deg, #f48fb1, #f06292)" : "linear-gradient(135deg, #f06292, #e91e8c, #c2185b)", color: "white", fontFamily: "'Montserrat', sans-serif", fontWeight: 800, fontSize: "0.85rem", letterSpacing: "0.06em", cursor: loading ? "not-allowed" : "pointer", boxShadow: "0 8px 24px rgba(233,30,140,0.28)", display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
                {loading
                  ? <><motion.span animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} style={{ display: "inline-block" }}>🌸</motion.span> Uploading...</>
                  : <>📤 Upload</>}
              </motion.button>
            </div>
          </div>

          {/* Inline validation error */}
          <AnimatePresence>
            {uploadError && (
              <motion.div
                initial={{ opacity: 0, y: -8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                style={{
                  marginTop: "14px",
                  padding: "10px 16px",
                  borderRadius: "12px",
                  background: "rgba(244,143,177,0.12)",
                  border: "1.5px solid rgba(244,143,177,0.35)",
                  fontFamily: "'Nunito', sans-serif",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  color: "#c2185b",
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                }}
              >
                {uploadError}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Gallery */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3, duration: 0.7 }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem", color: "#c2185b", marginBottom: "18px" }}>
            🖼️ All Photos
          </h2>
          {photos.length === 0 ? (
            <div style={{ textAlign: "center", padding: "56px 24px", borderRadius: "20px", background: "rgba(255,255,255,0.7)", border: "2px dashed rgba(244,143,177,0.3)" }}>
              <div style={{ fontSize: "2.8rem", marginBottom: "10px", opacity: 0.4 }}>📭</div>
              <p style={{ color: "#f48fb1", fontFamily: "'Nunito', sans-serif", fontSize: "0.95rem", margin: 0 }}>No photos yet. Upload the first one! 🌸</p>
            </div>
          ) : (
            <motion.div layout style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))", gap: "18px" }}>
              <AnimatePresence mode="popLayout">
                {photos.map((p) => (
                  <PhotoCard key={p.id} photo={p} onEdit={setEditingPhoto} onDelete={setDeletingPhoto} />
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>
      </div>

      {/* Modals */}
      <AnimatePresence>
        {editingPhoto && <EditModal photo={editingPhoto} onSave={handleEdit} onClose={() => setEditingPhoto(null)} />}
      </AnimatePresence>
      <AnimatePresence>
        {deletingPhoto && <ConfirmModal photo={deletingPhoto} onConfirm={handleDeleteConfirmed} onCancel={() => setDeletingPhoto(null)} />}
      </AnimatePresence>

      {/* Toast — centered with transform */}
      <AnimatePresence>
        {toast && <Toast msg={toast.msg} type={toast.type} />}
      </AnimatePresence>
    </div>
  )
}