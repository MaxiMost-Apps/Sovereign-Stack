import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase } from '../supabase';
import { useAuth } from '../AuthSystem';

interface AIContextType {
  neuralConfig: string;
  updateConfig: (newConfig: string) => Promise<void>;
  isLoading: boolean;
}

const AIContext = createContext<AIContextType | undefined>(undefined);

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [neuralConfig, setNeuralConfig] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  // 1. Fetch on Mount (Phoenix Protocol: From User Context)
  useEffect(() => {
    if (!user) {
        setIsLoading(false);
        return;
    }

    // Access directly from user metadata/state instead of DB query
    const config = (user as any).neural_config || (user.user_metadata as any)?.neural_config || '';
    setNeuralConfig(config);
    setIsLoading(false);
  }, [user]);

  // 2. The Write Function (Phoenix Protocol: Update User Context)
  const updateConfig = async (newConfig: string) => {
    setNeuralConfig(newConfig); // Optimistic Update
    if (!user) return;

    // Update via Auth API instead of direct table access
    const { error } = await supabase.auth.updateUser({
      data: { neural_config: newConfig }
    });

    if (error) {
      console.error("Neural Sync Failed:", error);
    }
  };

  return (
    <AIContext.Provider value={{ neuralConfig, updateConfig, isLoading }}>
      {children}
    </AIContext.Provider>
  );
};

export const useAIContext = () => {
  const context = useContext(AIContext);
  if (!context) throw new Error("useAIContext must be used within an AIProvider");
  return context;
};
