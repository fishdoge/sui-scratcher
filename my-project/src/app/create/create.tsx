'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Coins, AlertCircle, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import Link from 'next/link';
import Footer from '../footer';
import Navbar from '../navbar';

export default function CreateGamePage() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [tokenName, setTokenName] = useState('');
  const [tokenSymbol, setTokenSymbol] = useState('');
  const [initialPool, setInitialPool] = useState(1000);
  const [ticketPrice, setTicketPrice] = useState(5);
  const [winProbability, setWinProbability] = useState(21.5);
  const [isValidating, setIsValidating] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [gameId, setGameId] = useState('');

  // Regular prize settings
  const [regularPrizeChance, setRegularPrizeChance] = useState(14);
  const [regularPrizeAmount, setRegularPrizeAmount] = useState(10);

  // Special prize settings
  const [specialPrizeChance, setSpecialPrizeChance] = useState(6);
  const [specialPrizeAmount, setSpecialPrizeAmount] = useState(20);

  // Jackpot settings
  const [jackpotChance, setJackpotChance] = useState(1);
  const [enableJackpot, setEnableJackpot] = useState(true);

  // Termination settings
  const [terminationChance, setTerminationChance] = useState(0.5);
  const [enableTermination, setEnableTermination] = useState(true);

  // Validate token
  const validateToken = () => {
    if (!tokenAddress) return;

    setIsValidating(true);

    // Simulate API call to validate token
    setTimeout(() => {
      // Mock validation - in a real app, this would check the blockchain
      const isValid =
        tokenAddress.startsWith('0x') && tokenAddress.length === 42;

      if (isValid) {
        // Mock token data - in a real app, this would come from the blockchain
        setTokenName('Custom Token');
        setTokenSymbol('CTK');
      }

      setIsValidToken(isValid);
      setIsValidating(false);
    }, 1500);
  };

  // Create game
  const createGame = () => {
    if (!isValidToken) return;

    setIsCreating(true);

    // Simulate API call to create game
    setTimeout(() => {
      // Generate a random game ID
      const randomId = Math.random().toString(36).substring(2, 10);
      setGameId(randomId);
      setIsCreated(true);
      setIsCreating(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="container mx-auto px-4 pt-24 pb-16">
        {/* Back Button */}
        <div className="mb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-purple-600 hover:text-purple-700 transition-colors"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </div>

        {/* Page Title */}
        <div className="text-center mb-12">
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Create Your Own Game
          </motion.h1>
          <motion.p
            className="text-gray-600 text-lg"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Launch a custom lottery using your own token
          </motion.p>
        </div>

        {isCreated ? (
          <motion.div
            className="max-w-3xl mx-auto"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Alert className="bg-green-50 border-green-200 mb-8">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
              <AlertTitle className="text-green-800">Success!</AlertTitle>
              <AlertDescription className="text-green-700">
                Your custom lottery game has been created successfully.
              </AlertDescription>
            </Alert>

            <Card className="bg-white/90 backdrop-blur-md shadow-xl">
              <CardHeader>
                <CardTitle className="text-2xl">
                  Game Created Successfully
                </CardTitle>
                <CardDescription>
                  Your game is now live and ready to play
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                  <p className="font-medium text-purple-800">Game ID</p>
                  <p className="text-purple-700 font-mono">{gameId}</p>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                    <p className="font-medium text-blue-800">Token</p>
                    <p className="text-blue-700">
                      {tokenName} ({tokenSymbol})
                    </p>
                    <p className="text-xs text-blue-600 font-mono truncate mt-1">
                      {tokenAddress}
                    </p>
                  </div>

                  <div className="p-4 bg-green-50 rounded-lg border border-green-100">
                    <p className="font-medium text-green-800">Initial Pool</p>
                    <p className="text-green-700">
                      {initialPool} {tokenSymbol}
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                  <p className="font-medium text-amber-800">Prize Structure</p>
                  <ul className="mt-2 space-y-1 text-amber-700">
                    <li>
                      • {regularPrizeChance}% chance to win {regularPrizeAmount}{' '}
                      {tokenSymbol}
                    </li>
                    <li>
                      • {specialPrizeChance}% chance to win {specialPrizeAmount}{' '}
                      {tokenSymbol}
                    </li>
                    {enableJackpot && (
                      <li>• {jackpotChance}% chance to win the jackpot</li>
                    )}
                    {enableTermination && (
                      <li>
                        • {terminationChance}% chance to win the termination
                        prize
                      </li>
                    )}
                  </ul>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col sm:flex-row gap-4">
                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                  View Game Dashboard
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  onClick={() => setIsCreated(false)}
                >
                  Create Another Game
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Tabs defaultValue="token" className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="token">Token Setup</TabsTrigger>
                <TabsTrigger value="settings">Game Settings</TabsTrigger>
                <TabsTrigger value="preview">Preview & Launch</TabsTrigger>
              </TabsList>

              {/* Token Setup Tab */}
              <TabsContent value="token">
                <motion.div
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Token Configuration
                  </h2>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="token-address">
                        Coin Contract Address
                      </Label>
                      <div className="flex gap-2">
                        <Input
                          id="token-address"
                          placeholder="0x..."
                          value={tokenAddress}
                          onChange={(e) => setTokenAddress(e.target.value)}
                          className="flex-1"
                        />
                        <Button
                          onClick={validateToken}
                          disabled={isValidating || !tokenAddress}
                          className="bg-purple-600 hover:bg-purple-700 text-white"
                        >
                          {isValidating ? 'Validating...' : 'Validate'}
                        </Button>
                      </div>
                      <p className="text-sm text-gray-500">
                        Enter your Coin object{' '}
                      </p>
                    </div>

                    {isValidToken && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                        className="space-y-4"
                      >
                        <Alert className="bg-green-50 border-green-200">
                          <CheckCircle2 className="h-5 w-5 text-green-600" />
                          <AlertTitle className="text-green-800">
                            Valid Token
                          </AlertTitle>
                          <AlertDescription className="text-green-700">
                            Token validated successfully. You can now configure
                            your game.
                          </AlertDescription>
                        </Alert>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="token-name">Token Name</Label>
                            <Input
                              id="token-name"
                              value={tokenName}
                              onChange={(e) => setTokenName(e.target.value)}
                              readOnly
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="token-symbol">Token Symbol</Label>
                            <Input
                              id="token-symbol"
                              value={tokenSymbol}
                              onChange={(e) => setTokenSymbol(e.target.value)}
                              readOnly
                            />
                          </div>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="initial-pool">
                            Initial Pool Amount (1000 minimum)
                          </Label>
                          <div className="flex items-center gap-2">
                            <Input
                              id="initial-pool"
                              type="number"
                              min={1000}
                              value={initialPool}
                              onChange={(e) =>
                                setInitialPool(Number(e.target.value))
                              }
                            />
                            <span className="text-gray-700 font-medium w-16">
                              {tokenSymbol}
                            </span>
                          </div>
                          <p className="text-sm text-gray-500">
                            This amount will be transferred from your wallet to
                            start the game
                          </p>
                        </div>
                      </motion.div>
                    )}

                    {!isValidToken && tokenAddress && !isValidating && (
                      <Alert className="bg-red-50 border-red-200">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                        <AlertTitle className="text-red-800">
                          Invalid Token
                        </AlertTitle>
                        <AlertDescription className="text-red-700">
                          The token address you entered is not valid. Please
                          check and try again.
                        </AlertDescription>
                      </Alert>
                    )}
                  </div>
                </motion.div>
              </TabsContent>

              {/* Game Settings Tab */}
              <TabsContent value="settings">
                <motion.div
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Game Settings
                  </h2>

                  <div className="space-y-8">
                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Basic Settings
                      </h3>

                      <div className="space-y-2">
                        <Label htmlFor="ticket-price">Ticket Price</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            id="ticket-price"
                            type="number"
                            min={1}
                            value={ticketPrice}
                            onChange={(e) =>
                              setTicketPrice(Number(e.target.value))
                            }
                          />
                          <span className="text-gray-700 font-medium w-16">
                            {tokenSymbol}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <Label htmlFor="win-probability">
                            Win Probability: {winProbability}%
                          </Label>
                        </div>
                        <Slider
                          id="win-probability"
                          min={5}
                          max={50}
                          step={0.5}
                          value={[winProbability]}
                          onValueChange={(value) => setWinProbability(value[0])}
                          className="py-4"
                        />
                        <p className="text-sm text-gray-500">
                          Total probability of winning any prize
                        </p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <h3 className="text-lg font-semibold text-gray-700">
                        Prize Structure
                      </h3>

                      <div className="space-y-6">
                        {/* Regular Prize */}
                        <div className="p-4 bg-purple-50 rounded-lg border border-purple-100">
                          <h4 className="font-medium text-purple-800 mb-3">
                            Regular Prize
                          </h4>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="regular-chance">
                                Chance: {regularPrizeChance}%
                              </Label>
                              <Slider
                                id="regular-chance"
                                min={1}
                                max={30}
                                step={0.5}
                                value={[regularPrizeChance]}
                                onValueChange={(value) =>
                                  setRegularPrizeChance(value[0])
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="regular-amount">
                                Prize Amount
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id="regular-amount"
                                  type="number"
                                  min={1}
                                  value={regularPrizeAmount}
                                  onChange={(e) =>
                                    setRegularPrizeAmount(
                                      Number(e.target.value)
                                    )
                                  }
                                />
                                <span className="text-gray-700 font-medium w-16">
                                  {tokenSymbol}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Special Prize */}
                        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
                          <h4 className="font-medium text-blue-800 mb-3">
                            Special Prize
                          </h4>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="special-chance">
                                Chance: {specialPrizeChance}%
                              </Label>
                              <Slider
                                id="special-chance"
                                min={1}
                                max={20}
                                step={0.5}
                                value={[specialPrizeChance]}
                                onValueChange={(value) =>
                                  setSpecialPrizeChance(value[0])
                                }
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="special-amount">
                                Prize Amount
                              </Label>
                              <div className="flex items-center gap-2">
                                <Input
                                  id="special-amount"
                                  type="number"
                                  min={1}
                                  value={specialPrizeAmount}
                                  onChange={(e) =>
                                    setSpecialPrizeAmount(
                                      Number(e.target.value)
                                    )
                                  }
                                />
                                <span className="text-gray-700 font-medium w-16">
                                  {tokenSymbol}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>

                        {/* Jackpot Prize */}
                        <div className="p-4 bg-amber-50 rounded-lg border border-amber-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-amber-800">
                              Jackpot Prize
                            </h4>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="enable-jackpot"
                                checked={enableJackpot}
                                onCheckedChange={setEnableJackpot}
                              />
                              <Label htmlFor="enable-jackpot">Enable</Label>
                            </div>
                          </div>

                          {enableJackpot && (
                            <div className="space-y-2">
                              <Label htmlFor="jackpot-chance">
                                Chance: {jackpotChance}%
                              </Label>
                              <Slider
                                id="jackpot-chance"
                                min={0.1}
                                max={5}
                                step={0.1}
                                value={[jackpotChance]}
                                onValueChange={(value) =>
                                  setJackpotChance(value[0])
                                }
                              />
                              <p className="text-sm text-amber-700">
                                Jackpot winners can claim the entire prize pool
                              </p>
                            </div>
                          )}
                        </div>

                        {/* Termination Prize */}
                        <div className="p-4 bg-red-50 rounded-lg border border-red-100">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="font-medium text-red-800">
                              Termination Prize
                            </h4>
                            <div className="flex items-center space-x-2">
                              <Switch
                                id="enable-termination"
                                checked={enableTermination}
                                onCheckedChange={setEnableTermination}
                              />
                              <Label htmlFor="enable-termination">Enable</Label>
                            </div>
                          </div>

                          {enableTermination && (
                            <div className="space-y-2">
                              <Label htmlFor="termination-chance">
                                Chance: {terminationChance}%
                              </Label>
                              <Slider
                                id="termination-chance"
                                min={0.1}
                                max={2}
                                step={0.1}
                                value={[terminationChance]}
                                onValueChange={(value) =>
                                  setTerminationChance(value[0])
                                }
                              />
                              <p className="text-sm text-red-700">
                                When drawn, the game round ends immediately
                              </p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>

              {/* Preview & Launch Tab */}
              <TabsContent value="preview">
                <motion.div
                  className="bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h2 className="text-2xl font-bold mb-6 text-gray-800">
                    Preview & Launch
                  </h2>

                  <div className="space-y-8">
                    <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl border border-purple-100">
                      <h3 className="text-xl font-semibold text-gray-800 mb-4">
                        Game Summary
                      </h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">Token</p>
                            <p className="font-medium text-gray-800">
                              {tokenName || 'Not set'}{' '}
                              {tokenSymbol ? `(${tokenSymbol})` : ''}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Initial Pool
                            </p>
                            <p className="font-medium text-gray-800">
                              {initialPool} {tokenSymbol || 'tokens'}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Ticket Price
                            </p>
                            <p className="font-medium text-gray-800">
                              {ticketPrice} {tokenSymbol || 'tokens'}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-gray-500">
                              Win Probability
                            </p>
                            <p className="font-medium text-gray-800">
                              {winProbability}%
                            </p>
                          </div>

                          <div>
                            <p className="text-sm text-gray-500">
                              Prize Structure
                            </p>
                            <ul className="space-y-1">
                              <li className="text-gray-700">
                                • {regularPrizeChance}% chance:{' '}
                                {regularPrizeAmount} {tokenSymbol || 'tokens'}
                              </li>
                              <li className="text-gray-700">
                                • {specialPrizeChance}% chance:{' '}
                                {specialPrizeAmount} {tokenSymbol || 'tokens'}
                              </li>
                              {enableJackpot && (
                                <li className="text-gray-700">
                                  • {jackpotChance}% chance: Jackpot
                                </li>
                              )}
                              {enableTermination && (
                                <li className="text-gray-700">
                                  • {terminationChance}% chance: Termination
                                </li>
                              )}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-amber-50 rounded-xl border border-amber-200">
                      <div className="flex items-start gap-4">
                        <div className="bg-amber-100 p-2 rounded-full">
                          <Coins className="h-6 w-6 text-amber-600" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-amber-800 mb-1">
                            Token Approval Required
                          </h3>
                          <p className="text-amber-700 mb-4">
                            To create this game, you{`'`}ll need to approve the
                            transfer of {initialPool} {tokenSymbol || 'tokens'}{' '}
                            from your wallet.
                          </p>
                          <div className="flex flex-col sm:flex-row gap-3">
                            <Button className="bg-amber-600 hover:bg-amber-700 text-white">
                              Approve Token Transfer
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-end">
                      <Button
                        variant="outline"
                        className="border-purple-200 text-purple-600 hover:bg-purple-50"
                      >
                        Save as Draft
                      </Button>
                      <Button
                        className="bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                        disabled={!isValidToken || isCreating}
                        onClick={createGame}
                      >
                        {isCreating ? (
                          <>
                            <span className="animate-spin mr-2">◌</span>
                            Creating Game...
                          </>
                        ) : (
                          'Create Game'
                        )}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        )}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
