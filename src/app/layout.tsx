"use client"

import { Inter } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/context/AuthContext'
import { AnimatePresence } from 'framer-motion'
import { usePathname } from 'next/navigation'
import { PageTransition } from '@/components/PageTransition'
import { useState, useEffect } from 'react'

const inter = Inter({ subsets: ['latin'] })

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1000)
    return () => clearTimeout(timer)
  }, [pathname])

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className={inter.className} style={{ margin: 0, padding: 0, minHeight: '100vh' }}>
        <AuthProvider>
          <AnimatePresence mode="wait">
            {children}
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {isLoading && <PageTransition />}
          </AnimatePresence>
        </AuthProvider>
      </body>
    </html>
  )
}