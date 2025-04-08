'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import type { CoinType } from '@/types/coin';
interface CoinContextType {
  coin: CoinType;
  setCoin: (coin: CoinType) => void;
}

const CoinContext = createContext<CoinContextType | undefined>(undefined);

export function CoinProvider({ children }: { children: ReactNode }) {
  const [coin, setCoin] = useState<CoinType>('USDT');

  return (
    <CoinContext.Provider value={{ coin, setCoin }}>
      {children}
    </CoinContext.Provider>
  );
}

export function useCoin() {
  const context = useContext(CoinContext);
  if (context === undefined) {
    throw new Error('useCoin must be used within a CoinProvider');
  }
  return context;
}