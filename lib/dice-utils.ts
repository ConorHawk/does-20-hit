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

export function rollDicePool(dicePool: DieType[], modifier: number = 0): RollResult {
  const allRolls: DieRoll[] = [];
  
  for (const dieType of dicePool) {
    const rolls = rollDice(dieType, 1);
    allRolls.push(...rolls);
  }
  
  const subtotal = allRolls.reduce((sum, roll) => sum + roll.value, 0);
  const total = subtotal + modifier;
  const averageTotal = calculateAverageTotal(dicePool, modifier);
  
  const dicePoolGroups = groupDiceByType(dicePool.map(type => ({ type, quantity: 1 })));
  
  return {
    dice: allRolls,
    subtotal,
    modifier,
    total,
    averageTotal,
    timestamp: new Date(),
    dicePool: dicePoolGroups,
  };
}

export function formatDicePool(dicePool: DieType[] | DiceGroup[]): string {
  if (dicePool.length === 0) return 'Empty';
  
  // Handle DieType[] (individual dice)
  if (typeof dicePool[0] === 'string') {
    const individualDice = dicePool as DieType[];
    const groups = groupDiceByType(individualDice.map(type => ({ type, quantity: 1 })));
    return groups.map(group => 
      group.quantity === 1 ? group.type : `${group.quantity}${group.type}`
    ).join(' + ');
  }
  
  // Handle DiceGroup[] (legacy format)
  const groups = (dicePool as DiceGroup[]).map(group => 
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

export function calculateAverageTotal(dicePool: DieType[], modifier: number): number {
  const diceAverage = dicePool.reduce((sum, dieType) => {
    const faces = DIE_FACES[dieType];
    const average = (1 + faces) / 2;
    return sum + average;
  }, 0);
  
  return Math.round((diceAverage + modifier) * 10) / 10;
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

export function addDiceToPool(dicePool: DieType[], dieType: DieType, quantity: number): DieType[] {
  const newPool = [...dicePool];
  
  for (let i = 0; i < quantity; i++) {
    newPool.push(dieType);
  }
  
  return newPool;
}

export function removeLastDieFromPool(dicePool: DieType[]): DieType[] {
  const newPool = [...dicePool];
  newPool.pop();
  return newPool;
}