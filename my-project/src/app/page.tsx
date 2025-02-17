"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import confetti from "canvas-confetti"
import { Sparkles, Menu, X, Trophy, Users, Ticket, Info, History, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock purchase history data
const purchaseHistory = [
  { id: 1, time: "2024-02-17 13:45", result: "Regular Prize (10 USDT)", status: "won" },
  { id: 2, time: "2024-02-17 13:30", result: "No Win", status: "lost" },
  { id: 3, time: "2024-02-17 13:15", result: "Special Prize (20 USDT)", status: "won" },
  { id: 4, time: "2024-02-17 13:00", result: "No Win", status: "lost" },
  { id: 5, time: "2024-02-17 12:45", result: "No Win", status: "lost" },
]

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
              Sui Scratcher

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
      <div className="text-center mb-12">
            <motion.h1
              className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              Play Sui Scratcher!
            </motion.h1>
            <motion.p
              className="text-gray-600 text-lg mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Each ticket costs 5 USDT. Try your luck now!
            </motion.p>
          </div>

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
              <h3 className="font-semibold text-gray-800">Current Pool</h3>
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
              <h3 className="font-semibold text-gray-800">Tickets Sold</h3>
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
              <h3 className="font-semibold text-gray-800">Active Players</h3>
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
              <h3 className="font-semibold text-gray-800">Jackpot Holders</h3>
            </div>
            <p className="text-2xl font-bold text-orange-600">{poolInfo.jackpotHolders}</p>
          </motion.div>
        </div>

        {/* Lottery Section with History */}
        <div className="max-w-6xl mx-auto mb-12">
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Lottery Card */}
            <motion.div
              className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="p-8">
                <div className="text-center mb-6">
                  <h2 className="text-2xl font-semibold text-gray-800 mb-2">Prize Pool</h2>
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
                      <p className="text-gray-600">Click to scratch!</p>
                    ) : !isRevealed ? (
                      <p className="text-gray-600">Scratching...</p>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      >
                        <h3 className="text-2xl font-bold text-purple-600 mb-2">Your Numbers</h3>
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
                  Try Again
                </Button>
              </div>
            </motion.div>

            {/* Purchase History */}
            <motion.div
              className="bg-white rounded-2xl shadow-xl overflow-hidden"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <History className="h-6 w-6 text-purple-600" />
                  <h2 className="text-2xl font-semibold text-gray-800">Purchase History</h2>
                </div>
                <div className="space-y-4">
                  {purchaseHistory.map((item) => (
                    <div key={item.id} className="flex items-start gap-4 p-4 rounded-lg bg-gray-50">
                      <Clock className="h-5 w-5 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">{item.time}</p>
                        <p className={`font-medium ${item.status === "won" ? "text-green-600" : "text-gray-600"}`}>
                          {item.result}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Game Rules Section */}
        <div className="max-w-6xl md:w-[1800px] w-[300px] mx-auto">
          <motion.div
            className="bg-white/70 backdrop-blur-md rounded-2xl p-8 shadow-xl"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800">Game Rules</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>1. Initial Setup</AccordionTrigger>
                <AccordionContent>
                  When the Lottery first launches, the house will deposit 100 USDT into the prize pool.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>2. Lottery Purchase and Drawing Process</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>Each Lottery ticket costs 5 USDT, and players can purchase unlimited tickets.</li>
                    <li>Upon purchase, the Lottery will instantly reveal whether you've won.</li>
                    <li>The winning probability is 21.5%</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>3. Prize Structure</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>14% chance to win 10 USDT (Regular Prize)</li>
                    <li>6% chance to win 20 USDT (Special Prize)</li>
                    <li>
                      1% chance to win the Jackpot:
                      <ul className="list-disc pl-4 mt-2">
                        <li>Jackpot winners can claim the entire prize pool at any time</li>
                        <li>Multiple players can hold the jackpot simultaneously</li>
                        <li>Risk of losing earnings if not claimed</li>
                      </ul>
                    </li>
                    <li>
                      0.5% chance to win the Termination Prize:
                      <ul className="list-disc pl-4 mt-2">
                        <li>The game round ends immediately when drawn</li>
                        <li>Unclaimed jackpot tickets become void</li>
                      </ul>
                    </li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>4. Game Termination Conditions</AccordionTrigger>
                <AccordionContent>
                  <ul className="list-disc pl-4 space-y-2">
                    <li>When a jackpot winner claims the prize pool</li>
                    <li>When the termination prize is drawn</li>
                  </ul>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>5. Prize Distribution After Game End</AccordionTrigger>
                <AccordionContent>
                  Whether through jackpot claim or termination prize, 30% of the prize pool will be automatically
                  allocated to the next round to start a new game.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-6">
                <AccordionTrigger>6. Special Circumstances</AccordionTrigger>
                <AccordionContent>
                  If the prize pool is depleted by regular and special prizes without any jackpot or termination prize
                  being drawn, the project will inject an additional 100 USDT to maintain game operation.
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

