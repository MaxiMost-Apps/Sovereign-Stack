import React, { createContext, useContext, useState, ReactNode } from 'react';

export type LensType = 'operator' | 'scientist' | 'ceo' | 'human';

interface LensContextType {
  activeLens: LensType;
  setLens: (lens: LensType) => void;
}

const LensContext = createContext<LensContextType | undefined>(undefined);

export const LensProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [activeLens, setLens] = useState<LensType>('operator');

  return (
    <LensContext.Provider value={{ activeLens, setLens }}>
      {children}
    </LensContext.Provider>
  );
};

export const useLens = () => {
  const context = useContext(LensContext);
  if (!context) {
    throw new Error('useLens must be used within a LensProvider');
  }
  return context;
};
