"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Moon, Stars, UserPlus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

interface Particle {
  id: number
  size: number
  left: number
  top: number
  color: string
}

const SignupPage = () => {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [particles, setParticles] = useState<Particle[]>([])
  const router = useRouter()

  useEffect(() => {
    const generateParticles = () => {
      const newParticles = Array.from({ length: 15 }, (_, i) => ({
        id: i,
        size: Math.random() * 3 + 1,
        left: Math.random() * 100,
        top: Math.random() * 100,
        color: i % 2 === 0 ? "#FF6EC7" : "#00FFFF"
      }))
      setParticles(newParticles)
    }
    generateParticles()
  }, [])

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault()
    if (password !== confirmPassword) {
      alert("Passwords don't match!")
      return
    }
    // Implement signup logic here
    console.log("Signing up...", { username, email, password })
    // After successful signup, redirect to dreams page
    router.push('/dreams')
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center py-12 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #001F54 0%, #6A0572 100%)",
      }}
    >
      {/* Enhanced floating particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="absolute rounded-full"
            style={{
              width: `${particle.size}px`,
              height: `${particle.size}px`,
              backgroundColor: particle.color,
              left: `${particle.left}%`,
              top: `${particle.top}%`,
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
        ))}
      </div>

      <div className="max-w-md w-full mx-4">
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
            ✨ Begin your dream journey ✨
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl shadow-2xl p-8"
          style={{
            backgroundColor: "rgba(0, 31, 84, 0.4)",
            backdropFilter: "blur(15px)",
            border: "2px solid rgba(255, 110, 199, 0.3)",
            boxShadow: "0 8px 32px rgba(255, 110, 199, 0.2)",
          }}
        >
          <form onSubmit={handleSignup} className="space-y-6">
            <div>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Choose a username"
                className="w-full p-4 rounded-xl transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: "rgba(0, 31, 84, 0.6)",
                  border: "1px solid rgba(0, 255, 255, 0.4)",
                  color: "#FAF3E0",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full p-4 rounded-xl transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: "rgba(0, 31, 84, 0.6)",
                  border: "1px solid rgba(0, 255, 255, 0.4)",
                  color: "#FAF3E0",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Create a password"
                className="w-full p-4 rounded-xl transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: "rgba(0, 31, 84, 0.6)",
                  border: "1px solid rgba(0, 255, 255, 0.4)",
                  color: "#FAF3E0",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <div>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm your password"
                className="w-full p-4 rounded-xl transition-all duration-200 ease-in-out"
                style={{
                  backgroundColor: "rgba(0, 31, 84, 0.6)",
                  border: "1px solid rgba(0, 255, 255, 0.4)",
                  color: "#FAF3E0",
                  fontSize: "16px",
                }}
                required
              />
            </div>
            <motion.button
              type="submit"
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
                <UserPlus size={20} />
                Create Account
              </span>
            </motion.button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-[#5EEAD4]">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#FF6EC7] hover:text-[#DA70D6] transition-colors duration-200"
              >
                Log in
              </Link>
            </p>
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default SignupPage 