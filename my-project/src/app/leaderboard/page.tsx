'use client';

import { motion } from 'framer-motion';
import { Sparkles, Trophy, ArrowLeft } from 'lucide-react';
import Leaderboard from '@/components/leaderboard';
import Link from 'next/link';
import Footer from '../footer';
import { useCoin } from '@/context/CoinContext';

// Mock leaderboard data
const leaderboardData = [
  {
    id: 1,
    name: '0x7895115',
    plays: 347,
    winnings: 2580,
    avatar: '/user-check.svg',
  },
  {
    id: 2,
    name: '0xaff45815',
    plays: 315,
    winnings: 1950,
    avatar: '/user-check.svg',
  },
  {
    id: 3,
    name: '0x4568eca87',
    plays: 289,
    winnings: 3200,
    avatar: '/user-check.svg',
  },
  {
    id: 4,
    name: '0x4568eca87',
    plays: 256,
    winnings: 1100,
    avatar: '/user-check.svg',
  },
  {
    id: 5,
    name: '0x4568eca87',
    plays: 234,
    winnings: 1750,
    avatar: '/user-check.svg',
  },
];

export default function LeaderboardPage() {
  const { coin } = useCoin();
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Sui Scratcher
              </span>
            </div>

            <div className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Home
              </Link>
              <Link
                href="/leaderboard"
                className="text-purple-600 font-medium transition-colors"
              >
                Leaderboard
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                Results
              </Link>
              <Link
                href="#"
                className="text-gray-600 hover:text-purple-600 transition-colors"
              >
                How to Play
              </Link>
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
            <p className="text-2xl font-bold text-amber-500">
              {leaderboardData[0].name}
            </p>
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
              {leaderboardData.reduce(
                (sum, player) => sum + player.winnings,
                0
              )}{' '}
              {coin}
            </p>
            <p className="text-gray-600">paid out to players</p>
          </motion.div>
        </div>

        <div className="max-w-4xl mx-auto">
          <Leaderboard players={leaderboardData} />
        </div>
      </main>

      <Footer />
    </div>
  );
}
