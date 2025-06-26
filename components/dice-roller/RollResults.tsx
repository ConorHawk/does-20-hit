import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RollResult } from '@/lib/dice-types';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';
import Image from 'next/image';
import { DiceResultSegment } from './DiceResultSegment';

interface RollResultsProps {
  result: RollResult | null;
  onReroll: () => void;
  className?: string;
}

export function RollResults({ result, onReroll, className }: RollResultsProps) {
  if (!result) {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/icons/dice/dice-d20-light.svg"
            alt="D20 die"
            width={48}
            height={48}
            className="opacity-30"
          />
          <div className="text-muted-foreground">
            No rolls yet. Press keys to start rolling!
          </div>
        </div>
      </Card>
    );
  }


  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-4">
        {/* Prominent total display */}
        <div className="text-center">
          <div className="text-4xl font-bold">{result.total}</div>
        </div>

        {/* Individual dice results */}
        <div className="flex flex-wrap gap-3">
          {result.dice.map((die, index) => (
            <DiceResultSegment key={index} die={die} />
          ))}
          {result.modifier !== 0 && (
            <DiceResultSegment modifier={result.modifier} />
          )}
        </div>
      </div>
    </Card>
  );
}