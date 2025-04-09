'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useCoin } from '@/context/CoinContext';
import { CoinType, isValidCoin } from '@/types/coin';

export default function CoinInitializer() {
  const searchParams = useSearchParams();
  const paramCoin = searchParams.get('coin');
  const { setCoin } = useCoin();

  useEffect(() => {
    if (paramCoin && isValidCoin(paramCoin)) {
      setCoin(paramCoin as CoinType);
    }
  }, [paramCoin]);

  return null; // 這個元件只負責初始化，不需要 render 東西
}
