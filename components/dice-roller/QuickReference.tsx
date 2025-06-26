import { Card } from '@/components/ui/card';
import { DieType } from '@/lib/dice-types';
import { cn } from '@/lib/utils';

interface QuickReferenceProps {
  currentDieType: DieType;
  quickMode: boolean;
  modifier: number;
  className?: string;
}

export function QuickReference({ currentDieType, quickMode, modifier, className }: QuickReferenceProps) {
  const modifierText = modifier !== 0 
    ? ` | Mod: ${modifier > 0 ? '+' : ''}${modifier}` 
    : '';

  return (
    <Card className={cn("px-4 py-2 bg-muted/50", className)}>
      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-4">
          <span className="font-medium">
            {quickMode ? 'd20 Mode' : `${currentDieType} Mode`}{modifierText}
          </span>
        </div>
        
        <div className="flex items-center gap-6 text-xs text-muted-foreground">
          {quickMode ? (
            <>
              <span><kbd className="px-1 py-0.5 bg-background rounded font-mono">SPACE</kbd>=1d20</span>
              <span><kbd className="px-1 py-0.5 bg-background rounded font-mono">5</kbd>=+5 modifier</span>
              <span><kbd className="px-1 py-0.5 bg-background rounded font-mono">⌘1-7</kbd>=Add dice</span>
            </>
          ) : (
            <>
              <span><kbd className="px-1 py-0.5 bg-background rounded font-mono">SPACE</kbd>=Roll</span>
              <span><kbd className="px-1 py-0.5 bg-background rounded font-mono">5</kbd>=+5 modifier</span>
              <span><kbd className="px-1 py-0.5 bg-background rounded font-mono">ESC</kbd>=Clear</span>
            </>
          )}
          <span><kbd className="px-1 py-0.5 bg-background rounded font-mono">?</kbd>=Help</span>
        </div>
      </div>
    </Card>
  );
}