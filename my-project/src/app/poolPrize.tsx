'use client';

import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
const client = new SuiClient({
  url: getFullnodeUrl('testnet'),
});
export default function PoolPrize() {
  const [poolUSDTBalance, setPoolUSDTBalance] = useState(0);

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
      className="max-w-4xl mx-auto mb-12 relative"
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-1 shadow-xl overflow-hidden">
        <div className="bg-white/95 backdrop-blur-md rounded-xl p-8 relative overflow-hidden">
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
                  {poolUSDTBalance} USDT
                </span>
              </div>
              <p className="text-gray-600 mt-2">
                Growing with every ticket purchase!
              </p>
            </div>

            <div className="flex flex-col items-center">
              <div className="relative mb-4">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full blur-md"></div>
                <Button className="relative bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-6 rounded-full text-lg font-semibold">
                  Buy Ticket Now
                </Button>
              </div>
              <p className="text-sm text-gray-500">% chance to win prizes!</p>
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
                1% chance to win entire pool!
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
