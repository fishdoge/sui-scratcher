/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useState, useRef } from 'react';
import PoolPrize from '@/app/poolPrize';
import { motion } from 'framer-motion';
import confetti from 'canvas-confetti';
import {
  Trophy,
  Users,
  Ticket,
  Info,
  History,
  Clock,
  // BadgeDollarSign,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  useCurrentWallet,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from '@mysten/dapp-kit';
import { SuiClient, getFullnodeUrl } from '@mysten/sui/client';
import { Transaction } from '@mysten/sui/transactions';
import {
  suiPackage,
  usdtArgs,
  usdtTestPackage,
  scratcherShop,
  scratcherCollectBook,
} from '@/chainConfig';

interface historyType {
  id: number;
  time: string;
  prize: string;
  dist: string;
  gain: string;
}

// Mock purchase history data
const purchaseHistory: historyType[] = [];

type userObject = {
  collectBook: string | undefined;
  usdTokenObject: string | undefined;
};

const client = new SuiClient({
  url: getFullnodeUrl('testnet'),
});

export default function Scratcher() {
  const [isRevealed, setIsRevealed] = useState(false);
  const [isScratchStarted, setIsScratchStarted] = useState(false);
  const [userUsdtBalance, setUserUsdtBalance] = useState(0);
  const { connectionStatus } = useCurrentWallet();
  const account = useCurrentAccount();
  const { mutateAsync } = useSignAndExecuteTransaction();
  const [userOwnObjects, setUserObjects] = useState<userObject | null>();

  const newGameState = useRef<string>('');

  useEffect(() => {
    const getUserObjectLog = async () => {
      if (!account?.address) {
        return;
      }

      const userObjects = await client.getOwnedObjects({
        owner: account?.address,
        options: { showType: true, showContent: true },
      });

      const biggestObject = await getUsdtObject(account?.address);

      let colloctBook;

      userObjects.data.map((index) => {
        if (index.data?.type === scratcherCollectBook) {
          colloctBook = index.data.objectId;
        }
      });

      console.log('objects', biggestObject);

      console.log('colloctBookObject', colloctBook);
      //console.log('coinBalance',coinBalance)

      const data = {
        collectBook: colloctBook,
        usdTokenObject: biggestObject,
      };

      setUserObjects(data);
    };
    getUserObjectLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus]);

  const getUsdtObject = async (user: string) => {
    const usdtCoins = await client.getCoins({
      owner: user,
      coinType:
        '0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT',
    });

    let coinValue = 0;
    let biggestObjectValue = 0;
    let biggestObject;
    usdtCoins.data.map((index) => {
      const val = index.balance;
      if (parseInt(val) > 0) {
        coinValue += parseInt(val);
        if (biggestObjectValue < parseInt(val)) {
          biggestObjectValue = parseInt(val);
          biggestObject = index.coinObjectId;
        }
      }
    });

    setUserUsdtBalance(coinValue / 1000000);

    return biggestObject;
  };

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

  function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const playSuiScratcher = async (): Promise<string> => {
    const ticketTx = new Transaction();

    if (!userOwnObjects?.usdTokenObject) return 'error';

    const [coin] = ticketTx.splitCoins(
      ticketTx.object(userOwnObjects?.usdTokenObject),
      [5000000]
    );

    if (!userOwnObjects?.collectBook || !userOwnObjects?.usdTokenObject) {
      return 'error';
    }

    ticketTx.moveCall({
      target: `${suiPackage}::suirandom::packup`,
      typeArguments: [usdtArgs],
      arguments: [
        ticketTx.object(userOwnObjects.collectBook),
        ticketTx.object(coin),
        ticketTx.object(scratcherShop),
        ticketTx.object('0x8'),
      ],
    });

    try {
      const result = await mutateAsync({
        transaction: ticketTx,
        chain: 'sui:testnet',
      });

      if (!result || !result.digest) {
        console.error('Transaction failed or digest missing.');
        return 'error';
      }

      console.log('digest', result.digest);
      if (account?.address) {
        getUsdtObject(account?.address);
      }

      return result.digest;
    } catch (error) {
      console.error('Transaction error:', error);
      return 'error';
    }
  };

  const getCurrentDateTime = () => {
    const now = new Date();

    const year = now.getFullYear();
    const month = now.getMonth() + 1; // 月份從0開始，所以+1
    const date = now.getDate();
    const hours = now.getHours();
    const minutes = now.getMinutes();

    return `${year}/${month}/${date} ${hours}:${minutes}`;
  };
  const getFreeUsdt = async () => {
    const ticketTxse = new Transaction();

    ticketTxse.moveCall({
      target: `${usdtTestPackage}::usdt::faucet`,
      arguments: [
        ticketTxse.object(
          '0xf0a1515e4ab64b7fa3252d659e0b21c8152c451e4a61309690859c59fcba8fb3'
        ),
      ],
    });

    try {
      await mutateAsync(
        {
          transaction: ticketTxse,
          chain: 'sui:testnet',
        },
        {
          onSuccess: async (result: any) => {
            // const { digest } = data;
            console.log('digest', result?.digest);
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const returnGameState = (states: string) => {
    console.log('status', newGameState.current);
    switch (states) {
      case 'None':
        return (
          <div className="w-20 h-20 rounded-full bg-[#2F4C3A] flex items-center justify-center text-white font-bold">
            You Lose
          </div>
        );

      case 'Bronze':
        return (
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center text-white font-bold">
            Bronze
          </div>
        );

      case 'Silver':
        return (
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#C0C0C0] to-[#A9A9A9] flex items-center justify-center text-white font-bold">
            Silver
          </div>
        );

      case 'Gold':
        return (
          <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#FFD700] to-[#D4AF37] flex items-center justify-center text-white font-bold">
            Gold
          </div>
        );
    }
  };

  const scartch = async () => {
    const digestDigest: string = await playSuiScratcher();

    if (digestDigest == 'error') return;

    await sleep(1000);
    if (!isScratchStarted) {
      setIsScratchStarted(true);
      setTimeout(revealNumber, 2000);
    }

    const txnDetails: any = await client.getTransactionBlock({
      digest: digestDigest,
      options: {
        showEffects: true,
        showEvents: true,
      },
    });
    const finalState = txnDetails?.events?.[0]?.parsedJson?.awards;
    let earn: string = '0';

    if (finalState == 'None') {
      earn = '- 5';
    } else if (finalState == 'Bronze') {
      earn = '+ 10';
    } else if (finalState == 'Silver') {
      earn = '+ 20';
    } else if (finalState == 'Gold') {
      earn = '+ 99999';
    }

    purchaseHistory.push({
      id: purchaseHistory.length + 1,
      time: getCurrentDateTime(),
      prize: finalState,
      dist: digestDigest,
      gain: earn,
    });

    // console.log('Full transaction:', txnDetails);
    console.log('event:', finalState);
    newGameState.current = finalState;

    console.log(newGameState.current);
  };

  return (
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
            <h3 className="font-semibold text-gray-800">Initial Pool Size</h3>
          </div>
          <p className="text-2xl font-bold text-purple-600">
            {poolInfo.totalPool} USDT
          </p>
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
          <p className="text-2xl font-bold text-blue-600">
            {poolInfo.ticketsSold}
          </p>
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
          <p className="text-2xl font-bold text-green-600">
            {poolInfo.activeUsers}
          </p>
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
          <p className="text-2xl font-bold text-orange-600">
            {poolInfo.jackpotHolders}
          </p>
        </motion.div>
      </div>

      {/* pool info */}
      <PoolPrize />

      {/* Lottery Section with History */}
      <div className="max-w-6xl mx-auto mb-12 mt-[60px]">
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
                <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                  Scratch Your Ticket
                </h2>
                <p className="text-gray-600">
                  Click below to reveal your lucky numbers
                </p>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 mb-6 border border-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-green-600"
                    >
                      <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                    </svg>
                    <div>
                      <p className="text-sm text-gray-500">Your Balance</p>
                      <p className="font-semibold text-gray-800">
                        {userUsdtBalance + ' '} USDT
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Scratch Area */}
              <div
                className="relative h-[180px] bg-gradient-to-r from-purple-100 to-blue-100 rounded-xl p-8 mb-6 cursor-pointer"
                onClick={scartch}
              >
                <div className="text-center">
                  {!isScratchStarted ? (
                    <div>
                      <Ticket className="h-12 w-12 mx-auto text-purple-400 mb-2" />
                      <h3 className="text-3xl font-bold text-purple-400 mb-2 mt-4">
                        Click to scratch!
                      </h3>
                      {/* <Button>scratch</Button> */}
                    </div>
                  ) : // <p className="text-gray-600">Click to scratch!</p>
                  !isRevealed ? (
                    <h3 className="text-2xl font-bold text-purple-400 mb-2 mt-8">
                      Scratching...
                    </h3>
                  ) : (
                    // <p className="text-gray-600">Scratching...</p>
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5 }}
                    >
                      <h3 className="text-2xl font-bold text-purple-600 mb-2">
                        Winning result
                      </h3>
                      <div className="flex justify-center gap-3">
                        {returnGameState(newGameState.current)}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>

              <Button
                className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                onClick={() => {
                  setIsRevealed(false);
                  setIsScratchStarted(false);
                }}
              >
                Try Again
              </Button>

              <Button
                className="w-full mt-6 bg-gradient-to-r from-purple-600 to-blue-600 text-white"
                onClick={getFreeUsdt}
              >
                Get test USDT token
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
                <h2 className="text-2xl font-semibold text-gray-800">
                  Purchase History
                </h2>
              </div>
              <div className="space-y-4">
                {purchaseHistory
                  .slice()
                  .reverse()
                  .map((item) => (
                    <div
                      key={item.id}
                      className="flex items-start gap-4 p-4 rounded-lg bg-gray-50"
                    >
                      <Clock className="h-5 w-5 text-gray-400 mt-1" />
                      <div className="flex-1">
                        <p className="text-sm text-gray-500">{item.time}</p>
                   
                        <p
                          className={`font-medium text-sm ${item.prize === 'None' ? 'text-red-600' : 'text-green-600'}`}
                        >
                          {item.prize}
                        </p>
                        <p
                          className={`font-medium text-sm ${item.prize === 'None' ? 'text-red-600' : 'text-green-600'}`}
                        >
                          {item.gain + ' '}USDT
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
                When the Lottery first launches, the house will deposit 100 USDT
                into the prize pool.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>
                2. Lottery Purchase and Drawing Process
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>
                    Each Lottery ticket costs 5 USDT, and players can purchase
                    unlimited tickets.
                  </li>
                  <li>
                    Upon purchase, the Lottery will instantly reveal whether you
                    {"'"}ve won.
                  </li>
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
                      <li>
                        Jackpot winners can claim the entire prize pool at any
                        time
                      </li>
                      <li>
                        Multiple players can hold the jackpot simultaneously
                      </li>
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
              <AccordionTrigger>
                4. Game Termination Conditions
              </AccordionTrigger>
              <AccordionContent>
                <ul className="list-disc pl-4 space-y-2">
                  <li>When a jackpot winner claims the prize pool</li>
                  <li>When the termination prize is drawn</li>
                </ul>
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>
                5. Prize Distribution After Game End
              </AccordionTrigger>
              <AccordionContent>
                Whether through jackpot claim or termination prize, 30% of the
                prize pool will be automatically allocated to the next round to
                start a new game.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>6. Special Circumstances</AccordionTrigger>
              <AccordionContent>
                If the prize pool is depleted by regular and special prizes
                without any jackpot or termination prize being drawn, the
                project will inject an additional 100 USDT to maintain game
                operation.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </motion.div>
      </div>
    </main>
  );
}
