'use client';

import { DiceRoller } from '@/components/dice-roller/DiceRoller';
import { DiceIconsRow } from '@/components/dice-roller/DiceIconsRow';
import { Hotbar } from '@/components/dice-roller/Hotbar';
import { useDiceRollerContext } from '@/components/dice-roller-provider';

export default function Home() {
  const { state, actions } = useDiceRollerContext();

  return (
    <div className="relative">
      <div className="space-y-6">
        <div className="text-center">
          <p className="text-muted-foreground">
            A keyboard-only dice roller for tabletop RPGs
          </p>
        </div>
        
        <DiceIconsRow />
        
        <main>
          <DiceRoller />
        </main>
      </div>
      
      <Hotbar
        hotbarSlots={state.hotbarSlots}
        favorites={state.favorites}
        onRollFromSlot={actions.rollFromHotbarSlot}
        onAssignToSlot={actions.assignToHotbarSlot}
        onClearSlot={actions.clearHotbarSlot}
      />
    </div>
  );
}
