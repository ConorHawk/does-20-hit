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
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold">Last Roll</h3>
          <Button
            variant="outline"
            size="sm"
            onClick={onReroll}
            className="flex items-center gap-2"
          >
            <RotateCcw className="h-4 w-4" />
            Reroll
          </Button>
        </div>

        {/* Individual dice results */}
        <div className="flex flex-wrap gap-3">
          {result.dice.map((die, index) => (
            <DiceResultSegment key={index} die={die} />
          ))}
        </div>

        {/* Summary */}
        <div className="border-t pt-4 space-y-1">
          <div className="flex justify-between text-sm">
            <span>Subtotal:</span>
            <span className="font-mono">{result.subtotal}</span>
          </div>
          {result.modifier !== 0 && (
            <div className="flex justify-between text-sm">
              <span>Modifier:</span>
              <span className="font-mono">
                {result.modifier > 0 ? '+' : ''}{result.modifier}
              </span>
            </div>
          )}
          <div className="flex justify-between text-lg font-bold border-t pt-2">
            <span>Total:</span>
            <span className="font-mono">{result.total}</span>
          </div>
        </div>

        <div className="text-xs text-muted-foreground flex justify-between">
          <span>Press <kbd className="px-1 py-0.5 bg-muted rounded">R</kbd> to reroll</span>
          <span>{result.timestamp.toLocaleTimeString()}</span>
        </div>
      </div>
    </Card>
  );
}