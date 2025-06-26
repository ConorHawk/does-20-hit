import { DiceGroup } from '@/lib/dice-types';
import { getDiceIconPath } from '@/lib/utils';
import Image from 'next/image';

interface DicePoolDisplayProps {
  dicePool: DiceGroup[];
  modifier: number;
  compact?: boolean;
}

export function DicePoolDisplay({ dicePool, modifier, compact = false }: DicePoolDisplayProps) {
  if (dicePool.length === 0 && modifier === 0) {
    return <span className="text-muted-foreground">Empty</span>;
  }

  if (compact) {
    const diceText = dicePool.map(group => 
      `${group.quantity}${group.type}`
    ).join(' + ');
    
    const modifierText = modifier !== 0 ? 
      ` ${modifier > 0 ? '+' : ''}${modifier}` : '';
    
    return <span className="font-mono text-xs">{diceText}{modifierText}</span>;
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {dicePool.map((group, index) => (
        <span key={`${group.type}-${index}`} className="flex items-center gap-1">
          {index > 0 && <span className="text-muted-foreground mx-1">+</span>}
          {Array.from({ length: group.quantity }).map((_, i) => (
            <Image
              key={`${group.type}-${index}-${i}`}
              src={getDiceIconPath(group.type)}
              alt={`${group.type} die`}
              width={20}
              height={20}
              className="opacity-80 inline-block"
            />
          ))}
        </span>
      ))}
      {modifier !== 0 && (
        <>
          <span className="text-muted-foreground mx-1">
            {modifier > 0 ? '+' : ''}
          </span>
          <span className="font-semibold">{modifier}</span>
        </>
      )}
    </div>
  );
}