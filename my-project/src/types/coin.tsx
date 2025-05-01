// /types/coin.ts

export type CoinType = 'USDT' | 'USDC' | 'SUI';

export const ALLOWED_COINS: CoinType[] = ['USDT', 'USDC', 'SUI'];

export function isValidCoin(value: string | null): value is CoinType {
  return (
    value !== null && ALLOWED_COINS.includes(value.toUpperCase() as CoinType)
  );
}
