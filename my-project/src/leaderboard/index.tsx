"use client"

import { motion } from "framer-motion"
import { Sparkles, Trophy, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import Leaderboard from "@/components/leaderboard"
import Link from "next/link"

// Mock leaderboard data
const leaderboardData = [
  {
    id: 1,
    name: "Alex Thompson",
    plays: 347,
    winnings: 2580,
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    id: 2,
    name: "Sarah Chen",
    plays: 315,
    winnings: 1950,
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
  {
    id: 3,
    name: "Michael Rodriguez",
    plays: 289,
    winnings: 3200,
    avatar: "https://randomuser.me/api/portraits/men/67.jpg",
  },
  {
    id: 4,
    name: "Emma Wilson",
    plays: 256,
    winnings: 1100,
    avatar: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    id: 5,
    name: "David Kim",
    plays: 234,
    winnings: 1750,
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
  },
  {
    id: 6,
    name: "Olivia Martinez",
    plays: 198,
    winnings: 950,
    avatar: "https://randomuser.me/api/portraits/women/28.jpg",
  },
  {
    id: 7,
    name: "James Johnson",
    plays: 176,
    winnings: 1320,
    avatar: "https://randomuser.me/api/portraits/men/22.jpg",
  },
  {
    id: 8,
    name: "Sophia Lee",
    plays: 154,
    winnings: 780,
    avatar: "https://randomuser.me/api/portraits/women/59.jpg",
  },
]

export default function LeaderboardPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                LuckyDraw
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-purple-600 transition-colors">
                Home
              </Link>
              <Link href="/leaderboard" className="text-purple-600 font-medium transition-colors">
                Leaderboard
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Results
              </Link>
              <Link href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                How to Play
              </Link>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Connect Wallet</Button>
            </div>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 pt-24 pb-16">
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Leaderboard
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Our top players ranked by number of plays
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-5 w-5 text-amber-500" />
              <h3 className="font-semibold text-gray-800">Top Player</h3>
            </div>
            <p className="text-2xl font-bold text-amber-500">{leaderboardData[0].name}</p>
            <p className="text-gray-600">{leaderboardData[0].plays} plays</p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">Total Plays</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">
              {leaderboardData.reduce((sum, player) => sum + player.plays, 0)}
            </p>
            <p className="text-gray-600">across all players</p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">Total Winnings</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">
              {leaderboardData.reduce((sum, player) => sum + player.winnings, 0)} USDT
            </p>
            <p className="text-gray-600">paid out to players</p>
          </motion.div>
        </div>

      
        <div className="max-w-4xl mx-auto">
          <Leaderboard players={leaderboardData} />
        </div>
      </main>

   
      <footer className="bg-white/70 backdrop-blur-md border-t">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Sparkles className="h-6 w-6 text-purple-600" />
                <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                  LuckyDraw
                </span>
              </div>
              <p className="text-gray-600">The most transparent and fair lottery platform on the blockchain.</p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600">
                    How it Works
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600">
                    Past Results
                  </Link>
                </li>
                <li>
                  <Link href="#" className="text-gray-600 hover:text-purple-600">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Connect With Us</h3>
              <div className="flex gap-4">
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  Twitter
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  Discord
                </a>
                <a href="#" className="text-gray-600 hover:text-purple-600">
                  Telegram
                </a>
              </div>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} LuckyDraw. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

