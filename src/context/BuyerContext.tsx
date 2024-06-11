import React, { createContext, useContext, ReactNode } from 'react';

interface BuyerContextType {
  buyerId: string | null;
}

const BuyerContext = createContext<BuyerContextType>({ buyerId: null });

export const useBuyer = () => useContext(BuyerContext);

interface BuyerProviderProps {
  children: ReactNode;
  buyerId: string;
}

export const BuyerProvider: React.FC<BuyerProviderProps> = ({ children, buyerId }) => {
  return (
    <BuyerContext.Provider value={{ buyerId }}>
      {children}
    </BuyerContext.Provider>
  );
};