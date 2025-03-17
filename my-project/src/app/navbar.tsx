/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  SuiTransactionBlockResponse,
  SuiClient,
  getFullnodeUrl,
  PaginatedObjectsResponse,
  GetObjectParams,
} from '@mysten/sui/client';

import { Sparkles, Menu, X } from 'lucide-react';

import {
  ConnectButton,
  useCurrentWallet,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSuiClientQuery,
  useSuiClientContext,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';
import { scratcherShop, suiPackage, scratcherCollectBook } from '@/chainConfig';
import Link from 'next/link';

type userObject = {
  collectBook: string | undefined;
  usdTokenObject: string | undefined;
};
export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connectionStatus, currentWallet } = useCurrentWallet();
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction, mutateAsync } =
    useSignAndExecuteTransaction();
  const [digest, setDigest] = useState('');
  const [userOwnObjects, setUserObjects] = useState<userObject | null>();

  const client = new SuiClient({
    url: getFullnodeUrl('testnet'),
  });

  useEffect(() => {
    const getUserObjectLog = async () => {
      if (!account?.address) {
        return;
      }

      const userObjects = await client.getOwnedObjects({
        owner: account?.address,
        options: { showType: true, showContent: true },
      });

      const usdtCoins = await client.getCoins({
        owner: account?.address,
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

      const objectTxc = await client.getObject({
        id: '0x3332595c528a1733693d7508479caad355f4e1d382abe121b9a94dfdd55c5490',
        // fetch the object content field
        options: { showContent: true },
      });

      const coinBalance = await client.getBalance({
        owner:
          '0xe67ebf92a256811389e642038ad7e56a887e627a2399e634e277eadf0911e4a9',
        coinType: `0x2782e601cfb23063db01f50ce1ad70236c96623eb4298676ed2bf9fd1a5dbbf1::suirandom::Collect_Book`,
      });

      let colloctBook;

      userObjects.data.map((index) => {
        if (index.data?.type === scratcherCollectBook) {
          colloctBook = index.data.objectId;
        }
      });

      const data = {
        collectBook: colloctBook,
        usdTokenObject: biggestObject,
      };

      setUserObjects(data);
    };
    getUserObjectLog();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus]);

  useEffect(() => {
    console.log(connectionStatus);
    console.log('account', account?.address);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [connectionStatus]);

  const getGameTicket = async () => {
    console.log('excute');

    const ticketTx = new Transaction();
    //const [SUI] = ticketTx.splitCoins(ticketTx.gas, [1_000_000]);
    console.log(`${suiPackage}::suirandom::start_new_collect_book`);
    ticketTx.moveCall({
      target: `${suiPackage}::suirandom::start_new_collect_book`,
      typeArguments: [
        '0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT',
      ],
      arguments: [ticketTx.object(scratcherShop)],
    });

    try {
      await mutateAsync(
        {
          transaction: ticketTx,
          chain: 'sui:testnet',
        },
        {
          onSuccess: (result: any) => {
            console.log('executed transaction', result);
            setDigest(result?.digest);
          },
        }
      );
    } catch (e) {
      console.error(e);
    }
  };

  const sendTransaction = async () => {
    const tx1 = new Transaction();
    const [coin1] = tx1.splitCoins(tx1.gas, [100000]);
    tx1.transferObjects(
      [coin1],
      '0x55bb1996831879b9b714705f192468bf5ff00a94b233e28cc945f9e5e825a040'
    );

    try {
      await signAndExecuteTransaction(
        {
          transaction: tx1,
          chain: 'sui:testnet',
        },
        {
          //@typescript-eslint/no-explicit-any
          onSuccess: (result: any) => {
            console.log('executed transaction', result);
            setDigest(result.digest);
          },
        }
      );
    } catch (e) {
      console.error(e);
    }

    console.log('digest', digest);
  };

  function NetworkSelector() {
    const ctx = useSuiClientContext();

    const switchNetwork = (network: string) => {
      ctx.selectNetwork(network);
      console.log(`Switch to ${ctx.network}`);
    };

    return (
      <div>
        {Object.keys(ctx.networks).map((network) => (
          <button key={network} onClick={() => switchNetwork(network)}>
            {` ${network}`}
          </button>
        ))}
      </div>
    );
  }

  return (
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
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Home
            </a>
            <Link
              href="/leaderboard"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              Leaderboard
            </Link>

            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              How to Play
            </a>
            {account ? (
              <>
                <div>Address : {account?.address.substring(0, 9)}</div>
                <Button onClick={getGameTicket}>Get tickets</Button>
              </>
            ) : (
              <div>wallet not connect</div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <ConnectButton />
          <div className="md:hidden">
            {isMenuOpen ? (
              <X
                className="h-6 w-6 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            ) : (
              <Menu
                className="h-6 w-6 text-gray-600"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              />
            )}
          </div>
          {/* <NetworkSelector /> */}
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white/95 backdrop-blur-md">
          <div className="px-2 pt-2 pb-3 space-y-1">
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-purple-600"
            >
              Home
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-purple-600"
            >
              Results
            </a>
            <a
              href="#"
              className="block px-3 py-2 text-gray-600 hover:text-purple-600"
            >
              How to Play
            </a>
          </div>

          <div className="px-3 py-2">
            {account ? (
              <div className="grid grid-cols-2 gap-2">
                <div>Address : {account?.address.substring(0, 9)}</div>
                <div>
                  <Button onClick={getGameTicket}>Get tickets</Button>
                </div>
              </div>
            ) : (
              <>Wallet not connect</>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
