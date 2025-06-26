"use client";

import { createContext, useContext, ReactNode, useState } from 'react';
import { useDiceRoller } from '@/hooks/useDiceRoller';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { SaveFavoriteModal } from '@/components/dice-roller/SaveFavoriteModal';

type DiceRollerContextType = ReturnType<typeof useDiceRoller>;

const DiceRollerContext = createContext<DiceRollerContextType | null>(null);

export function DiceRollerProvider({ children }: { children: ReactNode }) {
  const diceRollerData = useDiceRoller();
  const [isSaveFavoriteModalOpen, setIsSaveFavoriteModalOpen] = useState(false);

  const handleSaveFavorite = (name: string) => {
    diceRollerData.actions.saveFavorite(name);
  };
  
  // Set up keyboard shortcuts at the provider level
  useKeyboardShortcuts({
    state: diceRollerData.state,
    actions: {
      ...diceRollerData.actions,
      rollFromHotbarSlot: diceRollerData.actions.rollFromHotbarSlot,
    },
    onOpenSaveFavoriteModal: () => setIsSaveFavoriteModalOpen(true),
  });

  return (
    <DiceRollerContext.Provider value={diceRollerData}>
      {children}
      <SaveFavoriteModal
        isOpen={isSaveFavoriteModalOpen}
        onClose={() => setIsSaveFavoriteModalOpen(false)}
        onSave={handleSaveFavorite}
        dicePool={diceRollerData.state.dicePool}
        modifier={diceRollerData.state.modifier}
      />
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