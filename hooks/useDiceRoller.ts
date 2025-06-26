import { useState, useCallback } from 'react';
import { DiceRollerState, DieType, RollResult, RollHistoryEntry } from '@/lib/dice-types';
import { rollDicePool as rollDicePoolUtil, rollDice, addDiceToPool, formatRollResult } from '@/lib/dice-utils';

const initialState: DiceRollerState = {
  currentDieType: 'd20',
  dicePool: [],
  modifier: 0,
  pendingModifier: '',
  lastRoll: null,
  history: [],
  isHistoryVisible: false,
  isHelpVisible: false,
  quickMode: true,
};

export function useDiceRoller() {
  const [state, setState] = useState<DiceRollerState>(initialState);

  const addDice = useCallback((dieType: DieType, quantity: number) => {
    setState(prev => ({
      ...prev,
      dicePool: addDiceToPool(prev.dicePool, dieType, quantity),
      currentDieType: dieType,
      quickMode: false,
    }));
  }, []);

  const appendToPendingModifier = useCallback((character: string) => {
    setState(prev => {
      const newPendingModifier = prev.pendingModifier + character;
      const value = parseInt(newPendingModifier);
      
      return {
        ...prev,
        pendingModifier: newPendingModifier,
        modifier: !isNaN(value) ? value : 0,
      };
    });
  }, []);

  const removeFromPendingModifier = useCallback(() => {
    setState(prev => {
      if (prev.pendingModifier.length > 0) {
        const newPendingModifier = prev.pendingModifier.slice(0, -1);
        const value = parseInt(newPendingModifier);
        
        return {
          ...prev,
          pendingModifier: newPendingModifier,
          modifier: newPendingModifier === '' ? 0 : (!isNaN(value) ? value : 0),
        };
      }
      
      return prev;
    });
  }, []);

  const setModifier = useCallback((modifier: number, isNegative: boolean = false) => {
    setState(prev => ({
      ...prev,
      modifier: isNegative ? -Math.abs(modifier) : Math.abs(modifier),
      pendingModifier: '',
    }));
  }, []);

  const rollQuickD20 = useCallback((quantity: number = 1) => {
    const rolls = rollDice('d20', quantity);
    const subtotal = rolls.reduce((sum, roll) => sum + roll.value, 0);
    const total = subtotal + state.modifier;
    
    const result: RollResult = {
      dice: rolls,
      subtotal,
      modifier: state.modifier,
      total,
      timestamp: new Date(),
      dicePool: [{ type: 'd20', quantity }],
    };

    const historyEntry: RollHistoryEntry = {
      id: Date.now().toString(),
      result,
      displayText: formatRollResult(result),
    };

    setState(prev => ({
      ...prev,
      lastRoll: result,
      history: [historyEntry, ...prev.history.slice(0, 9)],
      modifier: 0,
      pendingModifier: '',
    }));

    return result;
  }, [state.modifier]);

  const rollDicePool = useCallback(() => {
    if (state.dicePool.length === 0) {
      return rollQuickD20(1);
    }

    const result = rollDicePoolUtil(state.dicePool, state.modifier);
    
    const historyEntry: RollHistoryEntry = {
      id: Date.now().toString(),
      result,
      displayText: formatRollResult(result),
    };

    setState(prev => ({
      ...prev,
      lastRoll: result,
      history: [historyEntry, ...prev.history.slice(0, 9)],
      dicePool: [],
      modifier: 0,
      pendingModifier: '',
      quickMode: true,
    }));

    return result;
  }, [state.dicePool, state.modifier, rollQuickD20]);

  const rerollLast = useCallback(() => {
    if (!state.lastRoll) return null;
    
    const result = rollDicePoolUtil(state.lastRoll.dicePool, state.lastRoll.modifier);
    
    const historyEntry: RollHistoryEntry = {
      id: Date.now().toString(),
      result,
      displayText: formatRollResult(result),
    };

    setState(prev => ({
      ...prev,
      lastRoll: result,
      history: [historyEntry, ...prev.history.slice(0, 9)],
    }));

    return result;
  }, [state.lastRoll]);

  const clearDicePool = useCallback(() => {
    setState(prev => ({
      ...prev,
      dicePool: [],
      modifier: 0,
      pendingModifier: '',
      quickMode: true,
    }));
  }, []);

  const removeLastDiceGroup = useCallback(() => {
    setState(prev => {
      const newPool = [...prev.dicePool];
      newPool.pop();
      return {
        ...prev,
        dicePool: newPool,
        quickMode: newPool.length === 0,
      };
    });
  }, []);

  const toggleHistory = useCallback(() => {
    setState(prev => ({
      ...prev,
      isHistoryVisible: !prev.isHistoryVisible,
    }));
  }, []);

  const toggleHelp = useCallback(() => {
    setState(prev => ({
      ...prev,
      isHelpVisible: !prev.isHelpVisible,
    }));
  }, []);

  const setDieType = useCallback((dieType: DieType) => {
    setState(prev => ({
      ...prev,
      currentDieType: dieType,
    }));
  }, []);

  const startModifierMode = useCallback((isNegative: boolean = false) => {
    setState(prev => ({
      ...prev,
      pendingModifier: isNegative ? '-' : '',
      modifier: 0,
    }));
  }, []);

  const loadHistoryRoll = useCallback((historyEntry: RollHistoryEntry) => {
    setState(prev => ({
      ...prev,
      dicePool: [...historyEntry.result.dicePool],
      modifier: historyEntry.result.modifier,
      quickMode: historyEntry.result.dicePool.length === 0,
    }));
  }, []);

  const rerollFromHistory = useCallback((historyEntry: RollHistoryEntry) => {
    const result = rollDicePoolUtil(historyEntry.result.dicePool, historyEntry.result.modifier);
    
    const newHistoryEntry: RollHistoryEntry = {
      id: Date.now().toString(),
      result,
      displayText: formatRollResult(result),
    };

    setState(prev => ({
      ...prev,
      lastRoll: result,
      history: [newHistoryEntry, ...prev.history.slice(0, 9)],
    }));

    return result;
  }, []);

  return {
    state,
    actions: {
      addDice,
      appendToPendingModifier,
      removeFromPendingModifier,
      setModifier,
      rollQuickD20,
      rollDicePool,
      rerollLast,
      clearDicePool,
      removeLastDiceGroup,
      toggleHistory,
      toggleHelp,
      setDieType,
      startModifierMode,
      loadHistoryRoll,
      rerollFromHistory,
    },
  };
}