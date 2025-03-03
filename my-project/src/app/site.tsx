'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  Trophy,
  Users,
  Ticket,
  Info,
  History,
  Clock,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { useCurrentWallet } from '@mysten/dapp-kit';

import Navbar from './navbar';
import Scratcher from './scratcher';

// Mock purchase history data
const purchaseHistory = [
  {
    id: 1,
    time: '2024-02-17 13:45',
    result: 'Regular Prize (10 USDT)',
    status: 'won',
  },
  { id: 2, time: '2024-02-17 13:30', result: 'No Win', status: 'lost' },
  {
    id: 3,
    time: '2024-02-17 13:15',
    result: 'Special Prize (20 USDT)',
    status: 'won',
  },
  { id: 4, time: '2024-02-17 13:00', result: 'No Win', status: 'lost' },
  { id: 5, time: '2024-02-17 12:45', result: 'No Win', status: 'lost' },
];

export default function Site() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratchStarted, setIsScratchStarted] = useState(false);
  const { connectionStatus } = useCurrentWallet();
  const [gameState, setgameState] = useState(0);

  useEffect(() => {
    console.log(connectionStatus);
  }, [connectionStatus]);

  const poolInfo = {
    totalPool: 1000,
    ticketsSold: 156,
    activeUsers: 45,
    jackpotHolders: 2,
  };

  const triggerConfetti = () => {
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  const revealNumber = () => {
    setIsRevealed(true);
    triggerConfetti();
  };

  const playScratcr = (): number => {
    const number = Math.floor(Math.random() * 4) + 1;

    return number;
  };

  const returnGameState = (status: number) => {
    switch (status) {
      case 1:
        return (
          <div className="w-20 h-20 rounded-full bg-[#2F4C3A] flex items-center justify-center text-white font-bold">
            You Lose
          </div>
        );

      case 2:
        return (
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">
            Grand Prize
          </div>
        );

      case 3:
        return (
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold">
            Second Prize
          </div>
        );

      case 4:
        return (
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-red-500 to-blue-600 flex items-center justify-center text-white font-bold">
            Grand Prize
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Navbar */}
      <Navbar />

      <Scratcher/>
    

      {/* Footer */}
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
              <p className="text-gray-600">
                The most transparent and fair lottery platform on the
                blockchain.
              </p>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    How it Works
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    Past Results
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-600 hover:text-purple-600">
                    FAQs
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold text-gray-800 mb-4">
                Connect With Us
              </h3>
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
            <p>
              &copy; {new Date().getFullYear()} LuckyDraw. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
