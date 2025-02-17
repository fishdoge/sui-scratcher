"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Sparkles, Menu, X, Trophy, Users, Ticket, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export default function Page() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isRevealed, setIsRevealed] = useState(false)
  const [isScratchStarted, setIsScratchStarted] = useState(false)

  const poolInfo = {
    totalPool: 1000,
    ticketsSold: 156,
    activeUsers: 45,
    jackpotHolders: 2,
  }

  const triggerConfetti = () => {
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
    })
  }

  const revealNumber = () => {
    setIsRevealed(true)
    triggerConfetti()
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Navbar */}
      <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-md border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2">
              <Sparkles className="h-6 w-6 text-purple-600" />
              <span className="font-bold text-xl bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                LuckyDraw
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-6">
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Home
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                Results
              </a>
              <a href="#" className="text-gray-600 hover:text-purple-600 transition-colors">
                How to Play
              </a>
              <Button className="bg-gradient-to-r from-purple-600 to-blue-600 text-white">Connect Wallet</Button>
            </div>

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="h-6 w-6 text-gray-600" /> : <Menu className="h-6 w-6 text-gray-600" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-purple-600">
                Home
              </a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-purple-600">
                Results
              </a>
              <a href="#" className="block px-3 py-2 text-gray-600 hover:text-purple-600">
                How to Play
              </a>
              <div className="px-3 py-2">
                <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  Connect Wallet
                </Button>
              </div>
            </div>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Pool Information Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Trophy className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold text-gray-800">當前獎池</h3>
            </div>
            <p className="text-2xl font-bold text-purple-600">{poolInfo.totalPool} USDT</p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Ticket className="h-5 w-5 text-blue-600" />
              <h3 className="font-semibold text-gray-800">售出票數</h3>
            </div>
            <p className="text-2xl font-bold text-blue-600">{poolInfo.ticketsSold}</p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Users className="h-5 w-5 text-green-600" />
              <h3 className="font-semibold text-gray-800">活躍玩家</h3>
            </div>
            <p className="text-2xl font-bold text-green-600">{poolInfo.activeUsers}</p>
          </motion.div>

          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-6 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="flex items-center gap-3 mb-2">
              <Info className="h-5 w-5 text-orange-600" />
              <h3 className="font-semibold text-gray-800">頭獎持有者</h3>
            </div>
            <p className="text-2xl font-bold text-orange-600">{poolInfo.jackpotHolders}</p>
          </motion.div>
        </div>

        {/* Lottery Card Section */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              今日幸運抽獎
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              每張票價 5 USDT，立即開啟您的好運！
            </motion.p>
          </div>

          {/* Lottery Card */}
          <motion.div
            className="relative max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">獎池金額</h2>
                <p className="text-4xl font-bold text-purple-600">{poolInfo.totalPool} USDT</p>
              </div>

              {/* Scratch Area */}
              <div
                className="relative bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 mb-6 cursor-pointer"
                onClick={() => {
                  if (!isScratchStarted) {
                    setIsScratchStarted(true)
                    setTimeout(revealNumber, 1000)
                  }
                }}
              >
                <div className="text-center">
                  {!isScratchStarted ? (
                    <p className="text-gray-600">點擊刮開！</p>
                  ) : !isRevealed ? (
                    <p className="text-gray-600">刮開中...</p>
                  ) : (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold text-purple-600 mb-2">您的號碼</h3>
                      <div className="flex justify-center gap-3">
                        {[12, 24, 36, 48, 60].map((number, index) => (
                          <div
                            key={index}
                            className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-600 to-blue-600 flex items-center justify-center text-white font-bold"
                          >
                            {number}
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                onClick={() => {
                  setIsRevealed(false)
                  setIsScratchStarted(false)
                }}
              >
                再試一次
              </Button>
            </div>
          </motion.div>
        </div>

        {/* Game Rules Section */}
        <div className="max-w-4xl mx-auto">
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">遊戲規則</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. 初始設定</AccordionTrigger>
                <AccordionContent>Lottery 首次啟動時，莊家將投入 100 USDT 至獎金池。</AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>2. Lottery 購買與開獎流程</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>每張Lottery 價格為 5 USDT，玩家可以無限購買。</li>
                    <li>購買時，Lottery 會即刻開啟，告知是否中獎。</li>
                    <li>中獎機率 21.5%</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>3. 獎勵設計</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>14% 機率 獲得 10 USDT（普通獎）</li>
                    <li>6% 機率 獲得 20 USDT（特別獎）</li>
                    <li>
                      1% 機率 獲得頭獎：
                      <ul className="list-disc pl-4 mt-2">
                        <li>頭獎可以在任何時候兌換券獲取當前獎金池內全部獎金</li>
                        <li>頭獎可以重複獲取，多名玩家可同時持有頭獎</li>
                        <li>若未使用投影則會面臨失去收益的風險</li>
                      </ul>
                    </li>
                    <li>
                      0.5% 機率 獲得終止獎：
                      <ul className="list-disc pl-4 mt-2">
                        <li>當終止獎出現，本輪遊戲直接終止</li>
                        <li>如果有玩家獲得頭獎但未使用頭獎兌換券，則失去獲得獎金權利</li>
                      </ul>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>4. 遊戲終止條件</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>頭獎玩家兌換獎池獲取獎金，遊戲終止</li>
                    <li>終止獎出現，本輪遊戲終止</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>5. 遊戲終止後的獎金分配</AccordionTrigger>
                <AccordionContent>
                  不論是頭獎投影還是終止獎出現，獎金池中的 30% 會自動分配到下一輪遊戲中，重新啟動新一輪遊戲。
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>6. 特殊情況</AccordionTrigger>
                <AccordionContent>
                  如果未有頭獎或終止獎出現，而獎金池被普通獎或特別獎抽空，項目方將額外100 USDT
                  再次接入獎金池，保持遊戲的持續操作。
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </motion.div>
        </div>
      </main>

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
              <p className="text-gray-600">The most transparent and fair lottery platform on the blockchain.</p>
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

