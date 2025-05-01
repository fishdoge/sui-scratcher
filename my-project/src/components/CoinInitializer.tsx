'use client';

import { useEffect } from 'react';
import { useSearchParams, usePathname } from 'next/navigation';
import { useCoin } from '@/context/CoinContext';
import { CoinType, isValidCoin } from '@/types/coin';

export default function CoinInitializer() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { setCoin } = useCoin();

  useEffect(() => {
    if (pathname === '/404' || pathname === '/_not-found') return;

    const paramCoin = searchParams.get('coin');
    if (paramCoin && isValidCoin(paramCoin)) {
      setCoin(paramCoin as CoinType);
    }
  }, [searchParams, pathname, setCoin]);

  return null;
}
