'use client';

import React, { createContext, ReactNode, useState } from 'react';

// 定義 WebsitePage 的型別
interface CollectBook {
  collectBookState: string;
  stateCollectBook: (pageState: string) => void;
}

export const CollectBookContext = createContext<CollectBook>({
  collectBookState: '',
  stateCollectBook: () => {},
});

// Provider 組件
export const CollectBookAuthProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  // Page 狀態
  const [collectBookState, setPageState] = useState<string>('');
  const stateCollectBook = (newPageState: string) => setPageState(newPageState);

  return (
    <CollectBookContext.Provider
      value={{
        collectBookState,
        stateCollectBook,
      }}
    >
      {children}
    </CollectBookContext.Provider>
  );
};
