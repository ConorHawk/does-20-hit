import { Card } from '@/components/ui/card';
import { DieType } from '@/lib/dice-types';
import { cn } from '@/lib/utils';
import { Kbd } from '@/components/ui/kbd';

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
              <span><Kbd>SPACE</Kbd>=1d20</span>
              <span><Kbd>5</Kbd>=+5 modifier</span>
              <span><Kbd compound>⌘1-7</Kbd>=Add dice</span>
            </>
          ) : (
            <>
              <span><Kbd>SPACE</Kbd>=Roll</span>
              <span><Kbd>5</Kbd>=+5 modifier</span>
              <span><Kbd>ESC</Kbd>=Clear</span>
            </>
          )}
          <span><Kbd tooltip="Show keyboard shortcuts">?</Kbd>=Help</span>
        </div>
      </div>
    </Card>
  );
}