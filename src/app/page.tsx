import Link from 'next/link'

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 to-purple-900">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-white mb-8">Welcome to DreamNest</h1>
        <Link 
          href="/dreams" 
          className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-8 py-4 rounded-lg text-xl hover:opacity-90 transition-opacity"
        >
          Start Logging Dreams ✨
        </Link>
      </div>
    </div>
  )
}