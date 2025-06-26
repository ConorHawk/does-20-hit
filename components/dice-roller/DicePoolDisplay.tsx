import { DiceGroup, DieType } from '@/lib/dice-types';
import { groupDiceByType } from '@/lib/dice-utils';
import { getDiceIconPath } from '@/lib/utils';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ReactElement } from 'react';

interface DicePoolDisplayProps {
  dicePool: DieType[] | DiceGroup[];
  modifier: number;
  compact?: boolean;
}

export function DicePoolDisplay({ dicePool, modifier, compact = false }: DicePoolDisplayProps) {
  if (dicePool.length === 0 && modifier === 0) {
    return <span className="text-muted-foreground">Empty</span>;
  }

  // Convert DieType[] to DiceGroup[] if needed
  const diceGroups: DiceGroup[] = typeof dicePool[0] === 'string' 
    ? groupDiceByType((dicePool as DieType[]).map(type => ({ type, quantity: 1 })))
    : dicePool as DiceGroup[];

  if (compact) {
    const diceText = diceGroups.map(group => 
      `${group.quantity}${group.type}`
    ).join(' + ');
    
    const modifierText = modifier !== 0 ? 
      ` ${modifier > 0 ? '+' : ''}${modifier}` : '';
    
    return <span className="font-mono text-xs">{diceText}{modifierText}</span>;
  }

  // Create a flat array of all elements (dice, plus signs, modifier)
  const elements: Array<{
    type: 'die' | 'plus' | 'modifier';
    key: string;
    content: ReactElement;
  }> = [];

  diceGroups.forEach((group, groupIndex) => {
    // Add plus sign before group (except for first group)
    if (groupIndex > 0) {
      elements.push({
        type: 'plus',
        key: `plus-${groupIndex}`,
        content: <span className="text-muted-foreground mx-1">+</span>
      });
    }
    
    // Add individual dice for this group
    Array.from({ length: group.quantity }).forEach((_, dieIndex) => {
      elements.push({
        type: 'die',
        key: `${group.type}-${groupIndex}-${dieIndex}`,
        content: (
          <Image
            src={getDiceIconPath(group.type)}
            alt={`${group.type} die`}
            width={20}
            height={20}
            className="opacity-80 inline-block"
          />
        )
      });
    });
  });

  // Add modifier if present
  if (modifier !== 0) {
    elements.push({
      type: 'plus',
      key: 'modifier-plus',
      content: (
        <span className="text-muted-foreground mx-1">
          {modifier > 0 ? '+' : ''}
        </span>
      )
    });
    elements.push({
      type: 'modifier',
      key: 'modifier',
      content: <span className="font-semibold">{modifier}</span>
    });
  }

  return (
    <div className="flex items-center gap-1 flex-wrap">
      <AnimatePresence mode="popLayout">
        {elements.map((element) => (
          <motion.div
            key={element.key}
            initial={element.type === 'die' ? { 
              opacity: 0, 
              scale: 0.5, 
              rotate: 0 
            } : { 
              opacity: 0, 
              scale: 0.8 
            }}
            animate={element.type === 'die' ? { 
              opacity: 1, 
              scale: 1, 
              rotate: 360 
            } : { 
              opacity: 1, 
              scale: 1 
            }}
            exit={element.type === 'die' ? { 
              opacity: 0, 
              scale: 0.5, 
              rotate: 180 
            } : { 
              opacity: 0, 
              scale: 0.8 
            }}
            transition={element.type === 'die' ? { 
              duration: 0.5, 
              ease: "easeOut",
              type: "spring",
              stiffness: 120,
              damping: 12
            } : { 
              duration: 0.3, 
              ease: "easeOut"
            }}
            layout
          >
            {element.content}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}