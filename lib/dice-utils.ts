import { DieType, DieRoll, DiceGroup, RollResult, DIE_FACES } from './dice-types';

export function rollSingleDie(dieType: DieType): number {
  const faces = DIE_FACES[dieType];
  return Math.floor(Math.random() * faces) + 1;
}

export function rollDice(dieType: DieType, quantity: number): DieRoll[] {
  const rolls: DieRoll[] = [];
  const faces = DIE_FACES[dieType];
  
  for (let i = 0; i < quantity; i++) {
    const value = rollSingleDie(dieType);
    const isCrit = value === faces;
    const isFail = value === 1;
    
    rolls.push({
      type: dieType,
      value,
      isCrit,
      isFail,
    });
  }
  
  return rolls;
}

export function rollDicePool(dicePool: DiceGroup[], modifier: number = 0): RollResult {
  const allRolls: DieRoll[] = [];
  
  for (const group of dicePool) {
    const rolls = rollDice(group.type, group.quantity);
    allRolls.push(...rolls);
  }
  
  const subtotal = allRolls.reduce((sum, roll) => sum + roll.value, 0);
  const total = subtotal + modifier;
  
  return {
    dice: allRolls,
    subtotal,
    modifier,
    total,
    timestamp: new Date(),
    dicePool: [...dicePool],
  };
}

export function formatDicePool(dicePool: DiceGroup[]): string {
  if (dicePool.length === 0) return 'Empty';
  
  const groups = dicePool.map(group => 
    group.quantity === 1 ? group.type : `${group.quantity}${group.type}`
  );
  
  return groups.join(' + ');
}

export function formatRollResult(result: RollResult): string {
  const poolText = formatDicePool(result.dicePool);
  const modifierText = result.modifier !== 0 
    ? ` ${result.modifier > 0 ? '+' : ''}${result.modifier}` 
    : '';
  
  return `${poolText}${modifierText} = ${result.total}`;
}

export function calculateTotal(rolls: DieRoll[], modifier: number): number {
  const subtotal = rolls.reduce((sum, roll) => sum + roll.value, 0);
  return subtotal + modifier;
}

export function groupDiceByType(dicePool: DiceGroup[]): DiceGroup[] {
  const grouped = new Map<DieType, number>();
  
  for (const group of dicePool) {
    const existing = grouped.get(group.type) || 0;
    grouped.set(group.type, existing + group.quantity);
  }
  
  return Array.from(grouped.entries()).map(([type, quantity]) => ({
    type,
    quantity,
  }));
}

export function addDiceToPool(dicePool: DiceGroup[], dieType: DieType, quantity: number): DiceGroup[] {
  const newPool = [...dicePool];
  const existingIndex = newPool.findIndex(group => group.type === dieType);
  
  if (existingIndex >= 0) {
    newPool[existingIndex] = {
      ...newPool[existingIndex],
      quantity: newPool[existingIndex].quantity + quantity,
    };
  } else {
    newPool.push({ type: dieType, quantity });
  }
  
  return newPool;
}

export function removeDiceFromPool(dicePool: DiceGroup[], dieType: DieType, quantity: number): DiceGroup[] {
  const newPool = [...dicePool];
  const existingIndex = newPool.findIndex(group => group.type === dieType);
  
  if (existingIndex >= 0) {
    const newQuantity = newPool[existingIndex].quantity - quantity;
    if (newQuantity <= 0) {
      newPool.splice(existingIndex, 1);
    } else {
      newPool[existingIndex] = {
        ...newPool[existingIndex],
        quantity: newQuantity,
      };
    }
  }
  
  return newPool;
}