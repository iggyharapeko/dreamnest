"use client"

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Eye, EyeOff, LogIn } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { validateEmail } from '@/utils/validation'

const LoginPage = () => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const { login } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')

    if (!identifier) {
      setError('Email or username is required')
      return
    }

    // Validate password
    if (!password) {
      setError('Password is required')
      return
    }

    setIsLoading(true)

    try {
      await login(identifier, password)
      router.push('/dreams')
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to login')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 sm:px-6"
         style={{
           background: "linear-gradient(135deg, #001F54 0%, #6A0572 100%)",
         }}>
      <div className="w-full max-w-md">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-2xl p-8 shadow-2xl"
          style={{
            backgroundColor: "rgba(0, 31, 84, 0.4)",
            backdropFilter: "blur(15px)",
            border: "2px solid rgba(255, 110, 199, 0.3)",
            boxShadow: "0 8px 32px rgba(255, 110, 199, 0.2)",
          }}
        >
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold mb-2"
                style={{
                  background: "linear-gradient(45deg, #5EEAD4, #FF6EC7)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}>
              Welcome Back
            </h1>
            <p className="text-[#5EEAD4] opacity-80">Enter your dreamscape</p>
          </div>

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50"
              style={{ color: 'white' }}
            >
              {error}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="identifier" className="block text-sm font-medium text-[#5EEAD4] mb-2">
                Email or Username
              </label>
              <input
                id="identifier"
                type="text"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5EEAD4] focus:border-transparent transition-all"
                placeholder="Enter your email or username"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#5EEAD4] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5EEAD4] focus:border-transparent transition-all"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              className="w-full px-6 py-3 rounded-lg font-medium transition-all relative overflow-hidden group disabled:opacity-50"
              style={{
                background: "linear-gradient(45deg, #DA70D6, #FF6EC7)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? 'Logging in...' : (
                  <>
                    <LogIn size={20} />
                    Login
                  </>
                )}
              </span>
            </motion.button>

            <p className="text-center text-white text-opacity-80 text-sm">
              Don't have an account?{' '}
              <Link
                href="/register"
                className="text-[#5EEAD4] hover:text-[#FF6EC7] transition-colors"
              >
                Register here
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default LoginPage 