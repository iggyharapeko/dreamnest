import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: {
    template: '%s | DreamNest',
    default: 'DreamNest - Capture and explore your dreams',
  },
  description: 'DreamNest is a beautiful dream journal application where you can capture, explore, and reflect on your dreams.',
  keywords: ['dream journal', 'dream tracking', 'dream diary', 'dream analysis', 'dream exploration'],
  authors: [{ name: 'DreamNest Team' }],
  creator: 'DreamNest',
  publisher: 'DreamNest',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
  icons: {
    icon: '/favicon.ico',
  },
} 