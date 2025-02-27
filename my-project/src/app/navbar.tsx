import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

import {
  Sparkles,
  Menu,
  X,
} from 'lucide-react';


import {
  ConnectButton,
  useCurrentWallet,
  useCurrentAccount,
  useSignAndExecuteTransaction,
} from '@mysten/dapp-kit';
import { Transaction } from '@mysten/sui/transactions';


export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { connectionStatus } = useCurrentWallet();
  const account = useCurrentAccount();
  const { mutate: signAndExecuteTransaction } = useSignAndExecuteTransaction();
	const [digest, setDigest] = useState('');

  useEffect(() => {
    console.log(connectionStatus);
  }, [connectionStatus]);


  const sendTransaction = () => {

    const tx1 = new Transaction();
    const [coin1] = tx1.splitCoins(tx1.gas, [1]);
    tx1.transferObjects([coin1], '0xcbebc0f83d45873a42a2f207e0a3c197e059bc1a5c3cad4c8a1f04ac79731b47');

    try{
      signAndExecuteTransaction(
        {
          transaction: tx1,
          chain: 'sui:mainnet',
        },
        {
          onSuccess: (result) => {
            console.log('executed transaction', result);
            setDigest(result.digest);
          },
        },
      );
    }catch(e){
      console.error(e)
    }
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
          
            <a
              href="#"
              className="text-gray-600 hover:text-purple-600 transition-colors"
            >
              How to Play
            </a>
            {account ? (
              <>
                <div>Address : {account?.address.substring(0, 9)}</div>
                <Button onClick={sendTransaction}>Get tickets</Button>
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
