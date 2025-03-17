'use client';

import { motion } from 'framer-motion';
import { Trophy, Medal, Award, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LeaderboardPlayer {
  id: number;
  name: string;
  plays: number;
  winnings: number;
  avatar: string;
}

interface LeaderboardProps {
  players: LeaderboardPlayer[];
  className?: string;
}

export default function Leaderboard({ players, className }: LeaderboardProps) {
  // Sort players by number of plays (descending)
  const sortedPlayers = [...players].sort((a, b) => b.plays - a.plays);

  return (
    <motion.div
      className={cn(
        'bg-white/90 backdrop-blur-md rounded-2xl shadow-xl overflow-hidden',
        className
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <Trophy className="h-6 w-6 text-amber-500" />
          <h2 className="text-2xl font-bold bg-gradient-to-r from-amber-500 to-yellow-500 bg-clip-text text-transparent">
            Top Players
          </h2>
        </div>

        <div className="space-y-4">
          {sortedPlayers.map((player, index) => (
            <motion.div
              key={player.id}
              className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-white border border-gray-100 transition-all hover:shadow-md"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              {/* Rank Icon */}
              <div
                className={cn(
                  'flex items-center justify-center w-10 h-10 rounded-full',
                  index === 0
                    ? 'bg-gradient-to-r from-amber-400 to-yellow-300'
                    : index === 1
                      ? 'bg-gradient-to-r from-gray-300 to-gray-200'
                      : index === 2
                        ? 'bg-gradient-to-r from-amber-700 to-amber-600'
                        : 'bg-gradient-to-r from-purple-100 to-blue-100'
                )}
              >
                {index === 0 ? (
                  <Crown className="h-5 w-5 text-white" />
                ) : index === 1 ? (
                  <Medal className="h-5 w-5 text-white" />
                ) : index === 2 ? (
                  <Award className="h-5 w-5 text-white" />
                ) : (
                  <span className="text-gray-600 font-bold">{index + 1}</span>
                )}
              </div>

              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm">
                  <img
                    src={player.avatar || '/placeholder.svg'}
                    alt={player.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                {index < 3 && (
                  <div
                    className={cn(
                      'absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold text-white',
                      index === 0
                        ? 'bg-amber-500'
                        : index === 1
                          ? 'bg-gray-400'
                          : 'bg-amber-700'
                    )}
                  >
                    {index + 1}
                  </div>
                )}
              </div>

              {/* Player Info */}
              <div className="flex-1">
                <p className="font-semibold text-gray-800">{player.name}</p>
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <span className="font-medium text-purple-600">
                    {player.plays} plays
                  </span>
                  <span>•</span>
                  <span>{player.winnings} USDT won</span>
                </div>
              </div>

              {/* Badge for top player */}
              {index === 0 && (
                <div className="bg-gradient-to-r from-amber-100 to-yellow-100 text-amber-700 text-xs font-medium px-2.5 py-1 rounded-full border border-amber-200">
                  #1 Player
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  );
}
