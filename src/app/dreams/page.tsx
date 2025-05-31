"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Trash2, Sparkles, Moon, Stars, LogOut } from 'lucide-react'
import type { NextPage } from 'next'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/context/AuthContext'
import { Modal } from '@/components/Modal'

interface Dream {
  id: string
  content: string
  createdAt: string
  userId: string
}

const DreamsPage: NextPage = () => {
  const [dreams, setDreams] = useState<Dream[]>([])
  const [newDream, setNewDream] = useState("")
  const [sparklePosition, setSparklePosition] = useState({ x: 0, y: 0 })
  const [mounted, setMounted] = useState(false)
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; dreamId: string | null }>({
    isOpen: false,
    dreamId: null,
  })
  const router = useRouter()
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    if (!isAuthenticated) {
      router.push('/login')
      return
    }
    setMounted(true)
    fetchDreams()
  }, [isAuthenticated, router])

  const fetchDreams = async () => {
    try {
      const response = await fetch(`/api/dreams?userId=${user?.id}`)
      if (!response.ok) throw new Error('Failed to fetch dreams')
      const data = await response.json()
      setDreams(data)
    } catch (error) {
      console.error('Error fetching dreams:', error)
    }
  }

  const handleLogout = () => {
    logout()
    router.push('/login')
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setSparklePosition({ x: e.clientX, y: e.clientY })
    }

    if (mounted) {
      window.addEventListener("mousemove", handleMouseMove)
      return () => window.removeEventListener("mousemove", handleMouseMove)
    }
  }, [mounted])

  const handleAddDream = async () => {
    if (!newDream.trim() || !user) return

    try {
      const response = await fetch('/api/dreams', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: newDream.trim(),
          userId: user.id,
        }),
      })

      if (!response.ok) throw new Error('Failed to create dream')
      
      const dream = await response.json()
      setDreams([dream, ...dreams])
      setNewDream("")
    } catch (error) {
      console.error('Error adding dream:', error)
    }
  }

  const handleDeleteDream = async (id: string) => {
    setDeleteModal({ isOpen: true, dreamId: id })
  }

  const confirmDelete = async () => {
    if (!deleteModal.dreamId) return

    try {
      const response = await fetch(`/api/dreams/${deleteModal.dreamId}`, {
        method: 'DELETE',
      })

      if (!response.ok) throw new Error('Failed to delete dream')
      
      setDreams(dreams.filter((dream) => dream.id !== deleteModal.dreamId))
      setDeleteModal({ isOpen: false, dreamId: null })
    } catch (error) {
      console.error('Error deleting dream:', error)
    }
  }

  return (
    <div
      className="min-h-screen relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #001F54 0%, #6A0572 100%)",
      }}
    >
      {/* Navigation Bar */}
      <nav className="w-full px-4 sm:px-6 py-4 backdrop-blur-md border-b border-[rgba(255,255,255,0.1)] relative z-20" 
           style={{ 
             background: "rgba(0, 31, 84, 0.4)",
             boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)"
           }}>
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-0">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2"
          >
            <Stars className="h-5 w-5" style={{ color: "#5EEAD4" }} />
            <span className="text-[#5EEAD4] font-medium">{user?.username || 'Dream Explorer'}</span>
          </motion.div>
          
          <motion.button
            onClick={handleLogout}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors w-full sm:w-auto justify-center"
            style={{
              background: "rgba(255, 110, 199, 0.2)",
              border: "1px solid rgba(255, 110, 199, 0.4)",
              color: "#FF6EC7"
            }}
          >
            <span>Logout</span>
            <LogOut size={18} />
          </motion.button>
        </div>
      </nav>

      {/* Enhanced floating particles */}
      {mounted && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {[...Array(15)].map((_, i) => {
            const size = Math.random() * 3 + 1
            return (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${size}px`,
                  height: `${size}px`,
                  backgroundColor: i % 2 === 0 ? "#FF6EC7" : "#00FFFF",
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [0, -30, 0],
                  x: [0, Math.random() * 20 - 10, 0],
                  opacity: [0.3, 0.8, 0.3],
                  scale: [0.5, 1.2, 0.5],
                }}
                transition={{
                  duration: 4 + Math.random() * 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                  delay: Math.random() * 3,
                }}
              />
            )
          })}
        </div>
      )}

      {/* Cursor sparkle effect */}
      {mounted && (
        <motion.div
          className="fixed w-6 h-6 pointer-events-none z-50"
          style={{
            left: sparklePosition.x - 12,
            top: sparklePosition.y - 12,
            color: "#00FFFF",
          }}
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 2,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        >
          <Stars className="w-full h-full" />
        </motion.div>
      )}

      <div className="py-8 sm:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Title with enhanced styling */}
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center mb-8"
          >
            <div className="flex items-center justify-center gap-4 mb-4">
              <Moon className="h-8 w-8" style={{ color: "#FF6EC7" }} />
              <h1
                className="text-6xl font-bold"
                style={{
                  background: "linear-gradient(45deg, #5EEAD4, #FF6EC7, #00FFFF)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                  fontFamily: "serif",
                }}
              >
                DreamNest
              </h1>
              <Moon className="h-8 w-8" style={{ color: "#FF6EC7" }} />
            </div>
            <motion.div
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
              style={{ color: "#5EEAD4" }}
              className="text-lg italic"
            >
              ✨ Capture the magic of your dreams ✨
            </motion.div>
          </motion.div>

          {/* Input area */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="rounded-2xl shadow-2xl p-6 mb-8"
            style={{
              backgroundColor: "rgba(0, 31, 84, 0.4)",
              backdropFilter: "blur(15px)",
              border: "2px solid rgba(255, 110, 199, 0.3)",
              boxShadow: "0 8px 32px rgba(255, 110, 199, 0.2)",
            }}
          >
            <textarea
              value={newDream}
              onChange={(e) => setNewDream(e.target.value)}
              placeholder="Describe your dream in vivid detail..."
              className="w-full p-4 rounded-xl mb-4 transition-all duration-200 ease-in-out min-h-[120px] resize-none"
              style={{
                backgroundColor: "rgba(0, 31, 84, 0.6)",
                border: "1px solid rgba(0, 255, 255, 0.4)",
                color: "#FAF3E0",
                fontSize: "16px",
              }}
              rows={4}
            />
            <motion.button
              onClick={handleAddDream}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full px-6 py-3 rounded-xl font-medium transition-all duration-200 ease-in-out"
              style={{
                background: "linear-gradient(45deg, #DA70D6, #FF6EC7, #DA70D6)",
                color: "#F0F8FF",
                boxShadow: "0 4px 20px rgba(255, 110, 199, 0.6)",
                fontSize: "18px",
                fontWeight: "600",
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <Sparkles size={20} />
                Capture Dream
                <Sparkles size={20} />
              </span>
            </motion.button>
          </motion.div>

          {/* Dreams list with responsive grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {dreams.length === 0 ? (
                <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="col-span-full text-center py-12"
                >
                  <motion.p
                    animate={{ opacity: [0.6, 1, 0.6] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                    className="text-xl italic mb-4"
                    style={{ color: "rgba(250, 243, 224, 0.8)" }}
                  >
                    No dreams captured yet...
                  </motion.p>
                  <p style={{ color: "rgba(94, 234, 212, 0.7)" }}>
                    Close your eyes and let your imagination soar ✨
                  </p>
                </motion.div>
              ) : (
                dreams.map((dream) => (
                  <motion.div
                    key={dream.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    whileHover={{
                      scale: 1.02,
                      boxShadow: "0 8px 25px rgba(0, 255, 255, 0.4)",
                    }}
                    className="rounded-xl p-6 shadow-lg transition-all duration-300"
                    style={{
                      backgroundColor: "rgba(0, 31, 84, 0.4)",
                      backdropFilter: "blur(12px)",
                      border: "1px solid rgba(0, 255, 255, 0.3)",
                    }}
                  >
                    <div className="flex justify-between items-start mb-3">
                      <p className="text-sm" style={{ color: "#5EEAD4" }}>
                        {new Date(dream.createdAt).toLocaleDateString("en-US", {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </p>
                      <motion.button
                        onClick={() => handleDeleteDream(dream.id)}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        className="transition-colors duration-200 p-1 rounded"
                        style={{ color: "rgba(250, 243, 224, 0.5)" }}
                        onMouseEnter={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "#FF6EC7")}
                        onMouseLeave={(e: React.MouseEvent<HTMLButtonElement>) => (e.currentTarget.style.color = "rgba(250, 243, 224, 0.5)")}
                        aria-label="Delete dream"
                      >
                        <Trash2 size={18} />
                      </motion.button>
                    </div>
                    <p className="leading-relaxed text-lg" style={{ color: "#FAF3E0" }}>
                      {dream.content}
                    </p>
                  </motion.div>
                ))
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, dreamId: null })}
        onConfirm={confirmDelete}
        title="Delete Dream"
        confirmText="Delete"
        cancelText="Cancel"
      >
        <p>Are you sure you want to delete this dream? This action cannot be undone.</p>
      </Modal>
    </div>
  )
}

export default DreamsPage