import { DiceGroup } from '@/lib/dice-types';
import { getDiceIconPath } from '@/lib/utils';
import Image from 'next/image';

interface DicePoolDisplayProps {
  dicePool: DiceGroup[];
  modifier: number;
}

export function DicePoolDisplay({ dicePool, modifier }: DicePoolDisplayProps) {
  if (dicePool.length === 0 && modifier === 0) {
    return <span className="text-muted-foreground">Empty</span>;
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      {dicePool.map((group, index) => (
        <span key={`${group.type}-${index}`} className="flex items-center gap-1">
          {index > 0 && <span className="text-muted-foreground mx-1">+</span>}
          <span className="font-semibold">
            {group.quantity > 1 && group.quantity}
          </span>
          <Image
            src={getDiceIconPath(group.type)}
            alt={`${group.type} die`}
            width={20}
            height={20}
            className="opacity-80 inline-block"
          />
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