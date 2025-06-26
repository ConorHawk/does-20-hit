import { useState, useCallback, useEffect } from 'react';
import { DiceRollerState, DieType, RollResult, RollHistoryEntry, FavoriteRoll } from '@/lib/dice-types';
import { rollDicePool as rollDicePoolUtil, rollDice, addDiceToPool, formatRollResult } from '@/lib/dice-utils';

const initialState: DiceRollerState = {
  currentDieType: 'd20',
  dicePool: [],
  modifier: 0,
  pendingModifier: '',
  lastRoll: null,
  history: [],
  favorites: [],
  hotbarSlots: Array(9).fill(null),
  isHistoryVisible: false,
  isHelpVisible: false,
  quickMode: true,
};

const FAVORITES_STORAGE_KEY = 'dice-roller-favorites';
const HOTBAR_STORAGE_KEY = 'dice-roller-hotbar';

export function useDiceRoller() {
  const [state, setState] = useState<DiceRollerState>(initialState);

  // Load favorites and hotbar from localStorage on mount
  useEffect(() => {
    try {
      const storedFavorites = localStorage.getItem(FAVORITES_STORAGE_KEY);
      const storedHotbar = localStorage.getItem(HOTBAR_STORAGE_KEY);
      
      if (storedFavorites || storedHotbar) {
        setState(prev => ({
          ...prev,
          ...(storedFavorites && { favorites: JSON.parse(storedFavorites) as FavoriteRoll[] }),
          ...(storedHotbar && { hotbarSlots: JSON.parse(storedHotbar) as (FavoriteRoll | null)[] }),
        }));
      }
    } catch (error) {
      console.warn('Failed to load data from localStorage:', error);
    }
  }, []);

  // Save favorites to localStorage whenever they change
  useEffect(() => {
    try {
      localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(state.favorites));
    } catch (error) {
      console.warn('Failed to save favorites to localStorage:', error);
    }
  }, [state.favorites]);

  // Save hotbar to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem(HOTBAR_STORAGE_KEY, JSON.stringify(state.hotbarSlots));
    } catch (error) {
      console.warn('Failed to save hotbar to localStorage:', error);
    }
  }, [state.hotbarSlots]);

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

  const saveFavorite = useCallback((name: string) => {
    const favorite: FavoriteRoll = {
      id: Date.now().toString(),
      name,
      dicePool: [...state.dicePool],
      modifier: state.modifier,
    };

    setState(prev => ({
      ...prev,
      favorites: [favorite, ...prev.favorites],
    }));

    return favorite;
  }, [state.dicePool, state.modifier]);

  const rollFromFavorite = useCallback((favorite: FavoriteRoll) => {
    const result = rollDicePoolUtil(favorite.dicePool, favorite.modifier);
    
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
  }, []);

  const deleteFavorite = useCallback((favoriteId: string) => {
    setState(prev => ({
      ...prev,
      favorites: prev.favorites.filter(fav => fav.id !== favoriteId),
      hotbarSlots: prev.hotbarSlots.map(slot => 
        slot?.id === favoriteId ? null : slot
      ),
    }));
  }, []);

  const assignToHotbarSlot = useCallback((slotIndex: number, favoriteId: string) => {
    setState(prev => {
      const favorite = prev.favorites.find(fav => fav.id === favoriteId);
      if (!favorite || slotIndex < 0 || slotIndex >= 9) return prev;

      const newSlots = [...prev.hotbarSlots];
      newSlots[slotIndex] = favorite;
      
      return {
        ...prev,
        hotbarSlots: newSlots,
      };
    });
  }, []);

  const clearHotbarSlot = useCallback((slotIndex: number) => {
    setState(prev => {
      if (slotIndex < 0 || slotIndex >= 9) return prev;

      const newSlots = [...prev.hotbarSlots];
      newSlots[slotIndex] = null;
      
      return {
        ...prev,
        hotbarSlots: newSlots,
      };
    });
  }, []);

  const rollFromHotbarSlot = useCallback((slotIndex: number) => {
    const favorite = state.hotbarSlots[slotIndex];
    if (!favorite) return null;
    
    return rollFromFavorite(favorite);
  }, [state.hotbarSlots, rollFromFavorite]);

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
      saveFavorite,
      rollFromFavorite,
      deleteFavorite,
      assignToHotbarSlot,
      clearHotbarSlot,
      rollFromHotbarSlot,
    },
  };
}