import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { SuiTransactionBlockResponse } from '@mysten/sui/client';

import { Sparkles, Menu, X } from 'lucide-react';

import {
  ConnectButton,
  useCurrentWallet,
  useCurrentAccount,
  useSignAndExecuteTransaction,
  useSignTransaction,
  useSuiClient,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connectionStatus } = useCurrentWallet();
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
  const [digest, setDigest] = useState('');
  const { mutateAsync: signTransaction } = useSignTransaction();
  const client = useSuiClient();

  useEffect(() => {
    console.log(connectionStatus);
  }, [connectionStatus]);

  const excuteTransaciot = async () => {
    const ticketTx = new Transaction();
    // const [coin1] = ticketTx.splitCoins(ticketTx.gas, [100000]);
    ticketTx.moveCall({
      target:
        '0xf47f765b2ceca6a00f327e4465181d25d525a7cfdcbebacacf59902154fe75b6::suirandom::start_new_collect_book',
      typeArguments: [
        '0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT',
      ],
      arguments: [
        ticketTx.object(
          '0x7cab13913e4106f03512f1059864abb183207c1806dcd0e9caefd7a6f5f35a6e'
        ),
      ],
    });
    //ticketTx.transferObjects([coin1], '0xf47f765b2ceca6a00f327e4465181d25d525a7cfdcbebacacf59902154fe75b6');

    const { bytes, signature, reportTransactionEffects } =
      await signTransaction({
        transaction: ticketTx,
        chain: 'sui:testnet',
      });

    const executeResult = await client.executeTransactionBlock({
      transactionBlock: bytes,
      signature,
      options: {
        showRawEffects: true,
      },
    });

    // Always report transaction effects to the wallet after execution
    reportTransactionEffects(executeResult.rawEffects!);

    console.log(executeResult);
  };

  const getGameTicket = async () => {
    console.log('excute');

    const ticketTx = new Transaction();
    //const [SUI] = ticketTx.splitCoins(ticketTx.gas, [1_000_000]);

    ticketTx.moveCall({
      target:
        '0xf47f765b2ceca6a00f327e4465181d25d525a7cfdcbebacacf59902154fe75b6::suirandom::start_new_collect_book',
      typeArguments: [
        '0x0588cff9a50e0eaf4cd50d337c1a36570bc1517793fd3303e1513e8ad4d2aa96::usdt::USDT',
      ],
      arguments: [
        ticketTx.object(
          '0x7cab13913e4106f03512f1059864abb183207c1806dcd0e9caefd7a6f5f35a6e'
        ),
      ],
    });

    try {
      await signAndExecuteTransaction(
        {
          transaction: ticketTx,
          chain: 'sui:testnet',
        },
        {
          onSuccess: (result: SuiTransactionBlockResponse) => {
            console.log('executed transaction', result);
            setDigest(result.digest);
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
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
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
          <ConnectButton
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 text-gray-600" />
            ) : (
              <Menu className="h-6 w-6 text-gray-600" />
            )}
          </ConnectButton>
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
            <div className="px-3 py-2">
              <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white">
                Connect Wallet
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
}
