import React, { createContext, useContext } from "react";

export interface HudbirdContextValue {
  navigate?: (path: string, options?: any) => void;
}

const HudbirdContext = createContext<HudbirdContextValue>({});

export const useHudbird = () => useContext(HudbirdContext);

export interface HudbirdProviderProps {
  children: React.ReactNode;
  navigate?: (path: string, options?: any) => void;
}

export const HudbirdProvider: React.FC<HudbirdProviderProps> = ({ children, navigate }) => {
  return (
    <HudbirdContext.Provider value={{ navigate }}>
      {children}
    </HudbirdContext.Provider>
  );
};
