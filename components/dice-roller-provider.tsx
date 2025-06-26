"use client";

import { createContext, useContext, ReactNode } from 'react';
import { useDiceRoller } from '@/hooks/useDiceRoller';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';

type DiceRollerContextType = ReturnType<typeof useDiceRoller>;

const DiceRollerContext = createContext<DiceRollerContextType | null>(null);

export function DiceRollerProvider({ children }: { children: ReactNode }) {
  const diceRollerData = useDiceRoller();
  
  // Set up keyboard shortcuts at the provider level
  useKeyboardShortcuts(diceRollerData.state, diceRollerData.actions);

  return (
    <DiceRollerContext.Provider value={diceRollerData}>
      {children}
    </DiceRollerContext.Provider>
  );
}

export function useDiceRollerContext() {
  const context = useContext(DiceRollerContext);
  if (!context) {
    throw new Error('useDiceRollerContext must be used within a DiceRollerProvider');
  }
  return context;
}