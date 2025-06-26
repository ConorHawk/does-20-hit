'use client';

import { useDiceRollerContext } from '@/components/dice-roller-provider';
import { DicePool } from './DicePool';
import { RollResults } from './RollResults';
import { HelpModal } from './HelpModal';
import { cn } from '@/lib/utils';

interface DiceRollerProps {
  className?: string;
}

export function DiceRoller({ className }: DiceRollerProps) {
  const { state, actions } = useDiceRollerContext();

  return (
    <div className={cn("max-w-4xl mx-auto space-y-6", className)}>
      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left Column - Dice Pool */}
        <div className="space-y-6">
          <DicePool
            dicePool={state.dicePool}
            modifier={state.modifier}
            pendingModifier={state.pendingModifier}
            quickMode={state.quickMode}
          />
        </div>

        {/* Right Column - Results */}
        <div className="space-y-6">
          <RollResults
            result={state.lastRoll}
          />
        </div>
      </div>

      {/* Help Text */}
      <div className="text-center text-sm text-muted-foreground">
        <p className="mb-2">
          This is a keyboard-only dice roller. Use the shortcuts above to roll dice quickly.
        </p>
        <p>
          Press <kbd className="px-2 py-1 bg-muted rounded font-mono">?</kbd> for full keyboard shortcuts
        </p>
      </div>

      {/* Help Modal */}
      <HelpModal
        isOpen={state.isHelpVisible}
        onClose={actions.toggleHelp}
      />
    </div>
  );
}