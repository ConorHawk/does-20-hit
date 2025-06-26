import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RollHistoryEntry, DieType } from '@/lib/dice-types';
import { cn } from '@/lib/utils';
import { RotateCcw, Clock } from 'lucide-react';

interface RollHistoryProps {
  history: RollHistoryEntry[];
  onReroll: (historyEntry: RollHistoryEntry) => void;
  className?: string;
}

export function RollHistory({ history, onReroll, className }: RollHistoryProps) {
  if (history.length === 0) {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <div className="text-muted-foreground flex flex-col items-center gap-2">
          <Clock className="h-8 w-8 opacity-50" />
          <p>No rolls yet</p>
          <p className="text-sm">Your roll history will appear here</p>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("h-80 lg:h-[calc(100vh-8rem)] overflow-hidden flex flex-col", className)}>
      <div className="p-4 border-b bg-muted/50 shrink-0">
        <h3 className="font-semibold flex items-center gap-2">
          <Clock className="h-4 w-4" />
          Roll History
        </h3>
      </div>
      <div className="flex-1 overflow-y-auto divide-y">
        {history.map((entry) => {
          const result = entry.result;
          
          // Group dice by type for display
          const diceByType = result.dice.reduce((acc, die) => {
            if (!acc[die.type]) {
              acc[die.type] = [];
            }
            acc[die.type].push(die);
            return acc;
          }, {} as Record<DieType, typeof result.dice>);

          return (
            <div key={entry.id} className="p-3 hover:bg-muted/50 transition-colors">
              <div className="space-y-2">
                {/* Timestamp and formula */}
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">
                    {result.timestamp.toLocaleTimeString()}
                  </span>
                  <span className="text-sm font-mono bg-muted px-2 py-1 rounded break-all">
                    {entry.displayText}
                  </span>
                </div>

                {/* Individual dice results */}
                <div className="space-y-1">
                  {Object.entries(diceByType).map(([dieType, dice]) => (
                    <div key={dieType} className="flex flex-col gap-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        {dieType}:
                      </span>
                      <div className="flex flex-wrap gap-1">
                        {dice.map((die, dieIndex) => (
                          <span
                            key={dieIndex}
                            className={cn(
                              "inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded border",
                              die.isCrit && "bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-400 dark:text-green-200",
                              die.isFail && "bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-400 dark:text-red-200",
                              !die.isCrit && !die.isFail && "bg-muted border-muted-foreground/20 text-muted-foreground"
                            )}
                          >
                            {die.value}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Total and Reroll button */}
                <div className="flex items-center justify-between pt-2 border-t">
                  <span className="font-bold text-sm">
                    Total: {result.total}
                  </span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => onReroll(entry)}
                    className="h-8 px-2 text-xs"
                  >
                    <RotateCcw className="h-3 w-3 mr-1" />
                    Reroll
                  </Button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}