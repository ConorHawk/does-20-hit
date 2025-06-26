import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RollResult, DieType } from '@/lib/dice-types';
import { cn } from '@/lib/utils';
import { RotateCcw } from 'lucide-react';

interface RollResultsProps {
  result: RollResult | null;
  onReroll: () => void;
  className?: string;
}

export function RollResults({ result, onReroll, className }: RollResultsProps) {
  if (!result) {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <div className="text-muted-foreground">
          No rolls yet. Press keys to start rolling!
        </div>
      </Card>
    );
  }

  // Group dice by type for display
  const diceByType = result.dice.reduce((acc, die) => {
    if (!acc[die.type]) {
      acc[die.type] = [];
    }
    acc[die.type].push(die);
    return acc;
  }, {} as Record<DieType, typeof result.dice>);

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
        <div className="space-y-2">
          {Object.entries(diceByType).map(([dieType, dice]) => (
            <div key={dieType} className="flex items-center gap-2">
              <span className="text-sm font-medium min-w-[40px]">{dieType}:</span>
              <div className="flex flex-wrap gap-1">
                {dice.map((die, index) => (
                  <span
                    key={index}
                    className={cn(
                      "inline-flex items-center justify-center w-8 h-8 text-sm font-bold rounded border-2",
                      die.isCrit && "bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-400 dark:text-green-200",
                      die.isFail && "bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-400 dark:text-red-200",
                      !die.isCrit && !die.isFail && "bg-muted border-muted-foreground/20"
                    )}
                  >
                    {die.value}
                  </span>
                ))}
              </div>
            </div>
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