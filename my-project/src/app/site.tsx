'use client';

import { useEffect } from 'react';

import { useCurrentWallet } from '@mysten/dapp-kit';

import Navbar from './navbar';
import Scratcher from './scratcher';
import Footer from './footer';

// Mock purchase history data

export default function Site() {
  const { connectionStatus } = useCurrentWallet();

  useEffect(() => {
    console.log(connectionStatus);
  }, [connectionStatus]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-blue-50">
      {/* Navbar */}
      <Navbar />

      <Scratcher />
      <Footer />
    </div>
  );
}
