import React, { createContext, ReactNode, useState } from 'react';

interface AuthContextType {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  user: any;
  isLoggedIn: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  login: (user: any) => void;
  logout: () => void;
}

// 定義 WebsitePage 的型別
interface WebsitePageType {
  pageState: string;
  stateChange: (pageState: string) => void;
}

// 建立 Context
export const AuthContext = createContext<AuthContextType>({
  user: null,
  isLoggedIn: false,
  login: () => {},
  logout: () => {},
});

export const WebsitePageContext = createContext<WebsitePageType>({
  pageState: 'home',
  stateChange: () => {},
});

// Provider 組件
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Auth 狀態
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const login = (user: any) => setUser(user);
  const logout = () => setUser(null);

  // Page 狀態
  const [pageState, setPageState] = useState<string>('home');
  const stateChange = (newPageState: string) => setPageState(newPageState);

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoggedIn: !!user,
        login,
        logout,
      }}
    >
      <WebsitePageContext.Provider
        value={{
          pageState,
          stateChange,
        }}
      >
        {children}
      </WebsitePageContext.Provider>
    </AuthContext.Provider>
  );
};
