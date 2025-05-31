"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Eye, EyeOff, UserPlus, Loader2 } from 'lucide-react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { useAuth } from '@/context/AuthContext'
import { validateUsername, validateEmail, validatePassword, validateConfirmPassword } from '@/utils/validation'

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  })
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const router = useRouter()
  const { register } = useAuth()

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        router.push('/login')
      }, 2000)
      return () => clearTimeout(timer)
    }
  }, [success, router])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    // Validate all fields
    const usernameError = validateUsername(formData.username)
    if (usernameError) {
      setError(usernameError)
      return
    }

    const emailError = validateEmail(formData.email)
    if (emailError) {
      setError(emailError)
      return
    }

    const passwordError = validatePassword(formData.password)
    if (passwordError) {
      setError(passwordError)
      return
    }

    const confirmPasswordError = validateConfirmPassword(formData.password, formData.confirmPassword)
    if (confirmPasswordError) {
      setError(confirmPasswordError)
      return
    }

    setIsLoading(true)

    try {
      await register(formData.username, formData.email, formData.password)
      setSuccess(true)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Registration failed')
      setSuccess(false)
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
              Create Account
            </h1>
            <p className="text-[#5EEAD4] opacity-80">Begin your dream journey</p>
          </div>

          <AnimatePresence mode="wait">
            {error && (
              <motion.div
                key="error"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-lg bg-red-500/20 border border-red-500/50"
                style={{ color: 'white' }}
              >
                {error}
              </motion.div>
            )}

            {success && (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="mb-4 p-3 rounded-lg bg-green-500/20 border border-green-500/50"
                style={{ color: 'white' }}
              >
                Account created successfully! Redirecting to login...
              </motion.div>
            )}
          </AnimatePresence>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-[#5EEAD4] mb-2">
                Username
              </label>
              <input
                id="username"
                name="username"
                type="text"
                value={formData.username}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5EEAD4] focus:border-transparent transition-all"
                placeholder="Choose a username"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#5EEAD4] mb-2">
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5EEAD4] focus:border-transparent transition-all"
                placeholder="Enter your email"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-[#5EEAD4] mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5EEAD4] focus:border-transparent transition-all"
                  placeholder="Create a strong password"
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

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#5EEAD4] mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-white border border-gray-300 text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#5EEAD4] focus:border-transparent transition-all"
                  placeholder="Confirm your password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                >
                  {showConfirmPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                </button>
              </div>
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading || success}
              className="w-full px-6 py-3 rounded-lg font-medium transition-all relative overflow-hidden group disabled:opacity-50"
              style={{
                background: "linear-gradient(45deg, #DA70D6, #FF6EC7)",
              }}
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isLoading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    Creating account...
                  </>
                ) : success ? (
                  'Account Created!'
                ) : (
                  <>
                    <UserPlus size={20} />
                    Register
                  </>
                )}
              </span>
            </motion.button>

            <p className="text-center text-white text-opacity-80 text-sm">
              Already have an account?{' '}
              <Link
                href="/login"
                className="text-[#5EEAD4] hover:text-[#FF6EC7] transition-colors"
              >
                Login here
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default RegisterPage 