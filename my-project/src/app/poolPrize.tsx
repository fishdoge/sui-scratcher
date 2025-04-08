'use client';

import { motion } from 'framer-motion';
import { Coins, Award, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { cn } from '@/lib/utils';
import { useCoin } from '@/context/CoinContext';

interface PrizePoolProps {
  totalPool: number;
  ticketPrice?: number;
  winProbability?: number;
  className?: string;
}
const client = new SuiClient({
  url: getFullnodeUrl('testnet'),
});
export default function PoolPrize({ className }: PrizePoolProps) {
  const [poolUSDTBalance, setPoolUSDTBalance] = useState(0);
  const { coin } = useCoin(); 

  useEffect(() => {
    async function getContractObjectUSDT() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const txn: any = await client.getObject({
        id: '0x132931c191c82182b50f0d1d2de7073dbaf8f9a234d06d3c07ad3e90a6b06b2f',
        // fetch the object content field
        options: { showContent: true },
      });

      const data = txn.data?.content?.fields?.reward_pool / 1000000;
      const clearfyData = parseInt(data.toString());

      console.log('reward_pool', clearfyData);

      setPoolUSDTBalance(clearfyData);
    }

    getContractObjectUSDT();

    //getCoinIdentifier()
  });

  return (
    <motion.div
      className={cn('max-w-4xl mx-auto mb-12 relative', className)}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div
        className={cn(
          'p-[3px] rounded-2xl shadow-xl overflow-hidden relative',
          'bg-gradient-to-r from-purple-600 to-blue-600',
          'before:absolute before:inset-0 before:bg-gradient-to-r before:from-pink-500 before:via-purple-500 before:to-blue-500 before:animate-gradient-x',
          'after:absolute after:inset-0 after:bg-gradient-to-r after:from-blue-500 after:via-purple-500 after:to-pink-500 after:animate-gradient-x after:animation-delay-1000'
        )}
      >
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 relative overflow-hidden z-10">
          {/* Decorative elements */}
          <div className="absolute -top-24 -right-24 w-48 h-48 bg-purple-200 rounded-full opacity-20"></div>
          <div className="absolute -bottom-16 -left-16 w-32 h-32 bg-blue-200 rounded-full opacity-20"></div>

          <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
            <div className="mb-6 md:mb-0">
              <h2 className="text-2xl md:text-3xl font-bold mb-2 bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Current Prize Pool
              </h2>
              <div className="flex items-center gap-3">
                <Coins className="h-8 w-8 text-yellow-500" />
                <span className="text-4xl md:text-5xl font-bold text-purple-600">
                  {poolUSDTBalance} {coin}
                </span>
              </div>
              <p className="text-gray-600 mt-2">
                Growing with every ticket purchase!
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                {/* Golden button with shimmering effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-yellow-300 rounded-full blur-md animate-pulse"></div>
                <div className="flex items-center gap-3">
                  {/* Jackpot indicator */}
                  <div className="relative">
                    <div className="absolute inset-0 bg-amber-450 rounded-full animate-ping opacity-30"></div>
                    <div className="relative bg-gradient-to-r from-amber-500 to-yellow-400 p-3 rounded-full shadow-lg">
                      <Award className="h-6 w-6 text-white" />
                    </div>
                  </div>

                  <Button className="relative bg-gradient-to-r from-amber-500 to-yellow-400 hover:from-amber-600 hover:to-yellow-500 text-white px-8 py-6 rounded-full text-lg font-semibold shadow-lg border border-amber-300 group overflow-hidden">
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-yellow-300 to-amber-300 opacity-0 group-hover:opacity-20 transition-opacity"></div>
                    <div className="absolute -inset-x-full top-0 h-px bg-gradient-to-r from-transparent via-yellow-200 to-transparent animate-shimmer"></div>
                    <div className="absolute -inset-y-full right-0 w-px bg-gradient-to-b from-transparent via-yellow-200 to-transparent animate-shimmer-vertical"></div>
                    <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-yellow-200 to-transparent animate-shimmer"></div>
                    <div className="absolute -inset-y-full left-0 w-px bg-gradient-to-b from-transparent via-yellow-200 to-transparent animate-shimmer-vertical"></div>
                    <span className="relative z-10 flex items-center gap-1">
                      Redeem Jackpot
                      <Star className="h-4 w-4 fill-yellow-100 stroke-yellow-100" />
                    </span>
                  </Button>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                Click to get entire prize!
              </p>
            </div>
          </div>

          {/* Prize tiers */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
            <div className="bg-purple-50 rounded-lg p-4 border border-purple-100">
              <p className="font-semibold text-purple-700">Regular Prize</p>
              <p className="text-sm text-gray-600">14% chance to win 10 USDT</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-100">
              <p className="font-semibold text-blue-700">Special Prize</p>
              <p className="text-sm text-gray-600">6% chance to win 20 USDT</p>
            </div>
            <div className="bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg p-4 border border-yellow-100">
              <p className="font-semibold text-amber-700">Jackpot</p>
              <p className="text-sm text-gray-600">
                0.1% chance to win entire pool!
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
