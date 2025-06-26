import { useEffect, useCallback } from 'react';
import { DiceRollerState, FavoriteRoll } from '@/lib/dice-types';

interface KeyboardActions {
  addDice: (dieType: any, quantity: number) => void;
  appendToPendingModifier: (digit: string) => void;
  removeFromPendingModifier: () => void;
  setModifier: (modifier: number, isNegative?: boolean) => void;
  rollQuickD20: (quantity?: number) => void;
  rollDicePool: () => void;
  rerollLast: () => void;
  clearDicePool: () => void;
  removeLastDiceGroup: () => void;
  toggleHistory: () => void;
  toggleHelp: () => void;
  setDieType: (dieType: any) => void;
  startModifierMode: (isNegative?: boolean) => void;
  rollFromFavorite: (favorite: FavoriteRoll) => void;
  rollFromHotbarSlot: (slotIndex: number) => void;
}

interface UseKeyboardShortcutsProps {
  state: DiceRollerState;
  actions: KeyboardActions;
  onOpenSaveFavoriteModal?: () => void;
}

export function useKeyboardShortcuts({ state, actions, onOpenSaveFavoriteModal }: UseKeyboardShortcutsProps) {
  const handleKeyPress = useCallback((event: KeyboardEvent) => {
    // Prevent handling if typing in an input field
    if (event.target instanceof HTMLInputElement || event.target instanceof HTMLTextAreaElement) {
      return;
    }

    const key = event.key.toLowerCase();
    const isShift = event.shiftKey;
    const isCtrl = event.ctrlKey || event.metaKey;
    const isAlt = event.altKey;

    // Prevent default for keys we handle
    const handledKeys = [
      'enter', 'escape', 'backspace', 'r', 'c', '?', 'f',
      'q', 'w', 'e', 't', 'y', 'u', 'i', 'o' // Hotbar keys
    ];
    
    // Only prevent default for number keys if not using Alt modifier  
    const numberKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-'];
    
    if (handledKeys.includes(key) || (numberKeys.includes(key) && !isAlt)) {
      event.preventDefault();
    }


    switch (key) {
      // Roll dice
      case 'enter':
        if (state.quickMode && state.dicePool.length === 0) {
          actions.rollQuickD20(1);
        } else {
          actions.rollDicePool();
        }
        break;

      // Numbers - context dependent
      case '1':
      case '2':
      case '3':
      case '4':
      case '5':
      case '6':
      case '7':
      case '8':
      case '9':
      case '0':
        // Command+Number adds dice
        if (isCtrl) {
          const diceMap: Record<string, any> = {
            '1': 'd20',
            '2': 'd12',
            '3': 'd10',
            '4': 'd8',
            '5': 'd6',
            '6': 'd4',
            '7': 'd100',
          };
          
          if (diceMap[key]) {
            actions.addDice(diceMap[key], 1);
          }
        } else {
          // Regular number handling - always set modifiers
          actions.appendToPendingModifier(key);
        }
        break;

      // Hotbar shortcuts using Q-W-E-R-T-Y-U-I-O
      case 'q':
      case 'w':
      case 'e':
      case 'r':
      case 't':
      case 'y':
      case 'u':
      case 'i':
      case 'o':
        const hotbarKeyMap: Record<string, number> = {
          'q': 0, 'w': 1, 'e': 2, 'r': 3, 't': 4,
          'y': 5, 'u': 6, 'i': 7, 'o': 8
        };
        
        const slotIndex = hotbarKeyMap[key];
        actions.rollFromHotbarSlot(slotIndex);
        break;

      // Negative modifier
      case '-':
        // Only add - if we don't already have one at the start
        if (state.pendingModifier === '' || !state.pendingModifier.startsWith('-')) {
          actions.appendToPendingModifier('-');
        }
        break;


      // Clear pool
      case 'escape':
        actions.clearDicePool();
        break;

      // Remove last dice group or backspace from modifier
      case 'backspace':
        if (state.quickMode && state.dicePool.length === 0 && state.pendingModifier !== '') {
          // Remove from pending modifier
          actions.removeFromPendingModifier();
        } else {
          // Remove last dice group
          actions.removeLastDiceGroup();
        }
        break;

      // Reroll
      case 'r':
        actions.rerollLast();
        break;

      // Toggle help
      case '?':
        actions.toggleHelp();
        break;

      // Copy result (placeholder)
      case 'c':
        if (state.lastRoll && navigator.clipboard) {
          navigator.clipboard.writeText(state.lastRoll.total.toString());
        }
        break;

      // Save favorite
      case 'f':
        if (onOpenSaveFavoriteModal && (state.dicePool.length > 0 || state.modifier !== 0)) {
          onOpenSaveFavoriteModal();
        }
        break;
    }
  }, [state, actions, onOpenSaveFavoriteModal]);


  useEffect(() => {
    document.addEventListener('keydown', handleKeyPress);
    
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);
}