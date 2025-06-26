import { cn, getDiceIconPath } from '@/lib/utils';
import { DieRoll } from '@/lib/dice-types';
import Image from 'next/image';

interface DiceResultSegmentProps {
  die: DieRoll;
  size?: 'sm' | 'md';
}

export function DiceResultSegment({ die, size = 'md' }: DiceResultSegmentProps) {
  const sizeClasses = {
    sm: {
      container: 'px-2 py-1',
      icon: 12,
      text: 'text-sm'
    },
    md: {
      container: 'px-3 py-2',
      icon: 20,
      text: 'text-lg'
    }
  };

  const sizeConfig = sizeClasses[size];

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border-2",
        sizeConfig.container,
        die.isCrit && "bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-400",
        die.isFail && "bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-400",
        !die.isCrit && !die.isFail && "bg-muted border-muted-foreground/20"
      )}
    >
      <Image
        src={getDiceIconPath(die.type)}
        alt={`${die.type} die`}
        width={sizeConfig.icon}
        height={sizeConfig.icon}
        className="opacity-60"
      />
      <span
        className={cn(
          "font-bold",
          sizeConfig.text,
          die.isCrit && "text-green-800 dark:text-green-200",
          die.isFail && "text-red-800 dark:text-red-200",
          !die.isCrit && !die.isFail && "text-foreground"
        )}
      >
        {die.value}
      </span>
    </div>
  );
}