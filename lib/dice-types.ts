export type DieType = 'd4' | 'd6' | 'd8' | 'd10' | 'd12' | 'd20' | 'd100';

export interface DiceGroup {
  type: DieType;
  quantity: number;
}

export interface DieRoll {
  type: DieType;
  value: number;
  isCrit: boolean;
  isFail: boolean;
}

export interface RollResult {
  dice: DieRoll[];
  subtotal: number;
  modifier: number;
  total: number;
  timestamp: Date;
  dicePool: DiceGroup[];
}

export interface RollHistoryEntry {
  id: string;
  result: RollResult;
  displayText: string;
}

export interface InputAction {
  type: 'die' | 'modifier_digit';
  value: DieType | string;
  timestamp: number;
}

export interface FavoriteRoll {
  id: string;
  name: string;
  dicePool: DieType[];
  modifier: number;
}

export interface DiceRollerState {
  currentDieType: DieType;
  dicePool: DieType[];
  modifier: number;
  pendingModifier: string;
  inputHistory: InputAction[];
  lastRoll: RollResult | null;
  history: RollHistoryEntry[];
  favorites: FavoriteRoll[];
  hotbarSlots: (FavoriteRoll | null)[];
  isHistoryVisible: boolean;
  isHelpVisible: boolean;
  quickMode: boolean;
}

export const DIE_FACES: Record<DieType, number> = {
  'd4': 4,
  'd6': 6,
  'd8': 8,
  'd10': 10,
  'd12': 12,
  'd20': 20,
  'd100': 100,
};

