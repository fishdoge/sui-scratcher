'use client';

import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { SuiGraphQLClient } from '@mysten/sui/graphql';
import { graphql } from '@mysten/sui/graphql/schemas/latest';

export default function PoolPrize() {
  useEffect(() => {
    const gqlClient = new SuiGraphQLClient({
      url: 'https://sui-testnet.mystenlabs.com/graphql',
    });

    const coinIdentifierQuery = graphql(`
      query getCoins(
        $owner: SuiAddress!
        $first: Int
        $cursor: String
        $type: String = "0x2::sui::SUI"
      ) {
        address(address: $owner) {
          coins(first: $first, after: $cursor, type: $type) {
            nodes {
              contents {
                json
              }
            }
          }
        }
      }
    `);

    async function getCoinIdentifier() {
      const result = await gqlClient.query({
        query: coinIdentifierQuery,
        variables: {
          owner:
            '0x25e6a21d3c032479b67448c44f817217791da22d12f4539264df2c884ac4301e',
          type: '0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT',
        },
      });
      console.log('result',result);
      //return result.data?.address?.coins?.nodes;
    }

    getCoinIdentifier()
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
            <p className="text-3xl font-bold text-purple-600">USDT</p>
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
