"use client"
import '@mysten/dapp-kit/dist/index.css';

import Site from "@/app/site"
import { createNetworkConfig, SuiClientProvider } from '@mysten/dapp-kit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { getFullnodeUrl } from '@mysten/sui/client';
import { AuthProvider } from '@/app/context/authContext'
import dynamic from 'next/dynamic';

const WalletProvider = dynamic(() => import('@mysten/dapp-kit').then(mod => mod.WalletProvider), {
	ssr: false,
});

const { networkConfig } = createNetworkConfig({
	localnet: { url: getFullnodeUrl('localnet') },
	mainnet: { url: getFullnodeUrl('mainnet') },
	devnet:{url: 'https://fullnode.devnet.sui.io:443' }
});

const queryClient = new QueryClient();

export default function Page() {
  

  return (
  
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork="mainnet">
        <WalletProvider>
          <AuthProvider>
            <Site/>
          </AuthProvider>
        </WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}

