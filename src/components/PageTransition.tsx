"use client"

import { motion } from 'framer-motion'
import { Moon, Stars } from 'lucide-react'

export const PageTransition = () => {
  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        background: "linear-gradient(135deg, rgba(0, 31, 84, 0.9) 0%, rgba(106, 5, 114, 0.9) 100%)",
        backdropFilter: "blur(8px)",
      }}
    >
      <div className="h-full w-full flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Main loading text */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="text-[#5EEAD4] text-2xl mb-8 text-center"
          >
            <span className="relative inline-flex">
              <span>Loading</span>
              <motion.span
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                ...
              </motion.span>
            </span>
          </motion.div>

          {/* Animated circle with moon and stars */}
          <motion.div
            className="relative w-24 h-24"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            exit={{ rotate: 0, opacity: 0 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear"
            }}
          >
            {/* Outer glowing circle */}
            <motion.div
              className="absolute inset-0 rounded-full"
              style={{
                border: "2px solid rgba(94, 234, 212, 0.3)",
                boxShadow: "0 0 15px rgba(94, 234, 212, 0.3)",
              }}
              initial={{ scale: 1, opacity: 0.3 }}
              animate={{
                scale: [1, 1.1, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />

            {/* Moon icon */}
            <motion.div
              className="absolute top-0 left-1/2 -translate-x-1/2"
              initial={{ y: 0 }}
              animate={{ y: [-8, 0, -8] }}
              exit={{ y: 0, opacity: 0 }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              <Moon className="w-8 h-8" style={{ color: "#FF6EC7" }} />
            </motion.div>

            {/* Stars */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{
                  top: "50%",
                  left: "50%",
                  transform: `rotate(${i * 120}deg) translateX(2.5rem) translateY(-50%)`,
                }}
                initial={{ scale: 1, opacity: 0.5 }}
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.5,
                  ease: "easeInOut"
                }}
              >
                <Stars className="w-6 h-6" style={{ color: "#5EEAD4" }} />
              </motion.div>
            ))}
          </motion.div>

          {/* Sparkles */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: "4px",
                height: "4px",
                background: i % 2 === 0 ? "#FF6EC7" : "#5EEAD4",
                borderRadius: "50%",
              }}
              animate={{
                scale: [0, 1, 0],
                opacity: [0, 1, 0],
                y: [0, -20],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
                ease: "easeOut"
              }}
            />
          ))}
        </div>
      </div>
    </motion.div>
  )
} 