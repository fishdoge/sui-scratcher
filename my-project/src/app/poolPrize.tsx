'use client';

import { motion } from 'framer-motion';
import { useEffect,useState } from 'react';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
const client = new SuiClient({
  url: getFullnodeUrl('testnet'),
});
export default function PoolPrize() {

  const [poolUSDTBalance,setPoolUSDTBalance] = useState(0)

  useEffect(() => {

    async function getContractObjectUSDT() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const txn:any = await client.getObject({
        id: '0x132931c191c82182b50f0d1d2de7073dbaf8f9a234d06d3c07ad3e90a6b06b2f',
        // fetch the object content field
        options: { showContent: true },
      });

      const data = txn.data?.content?.fields?.reward_pool / 1000000
      const clearfyData = parseInt(data.toString());

      console.log('reward_pool',clearfyData)

      setPoolUSDTBalance(clearfyData)
    }

    getContractObjectUSDT()



    //getCoinIdentifier()
  });

  return (
    <div className="grid md:grid-cols-1 gap-8">
      {/* Lottery Card */}
      <motion.div
        className="relative bg-white rounded-2xl shadow-xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <div className="p-8 items-center">
          <div className="text-center  mb-6">
            <div className="">
              {/* <BadgeDollarSign className="h-8 w-8 text-purple-600 flex justify-center " /> */}

              <div className="text-4xl font-semibold text-gray-800 mb-2">
                Prize Pool
              </div>
            </div>
            <p className="text-3xl font-bold text-purple-600">{poolUSDTBalance + " "}USDT</p>
          </div>

          {/* Scratch Area */}

          {/* <div className="w-full h-8 text-center mb-6 bg-green-300  to-blue-300 rounded">
                <p className="text-xl font-bold from-green-600">
                  Your USDT balance :{' '}
                </p>
              </div> */}

          {/* <Button
              className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
              onClick={digeestt}
            >
              Get test USDT token
            </Button> */}
        </div>
      </motion.div>
    </div>
  );
}
