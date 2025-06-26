import { FavoriteRoll } from "@/lib/dice-types";
import { HotbarSlot } from "./HotbarSlot";
import { cn } from "@/lib/utils";

interface HotbarProps {
  hotbarSlots: (FavoriteRoll | null)[];
  favorites: FavoriteRoll[];
  onRollFromSlot: (slotIndex: number) => void;
  onAssignToSlot: (slotIndex: number, favoriteId: string) => void;
  onClearSlot: (slotIndex: number) => void;
  className?: string;
}

const KEYBINDS = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O'];

export function Hotbar({
  hotbarSlots,
  favorites,
  onRollFromSlot,
  onAssignToSlot,
  onClearSlot,
  className,
}: HotbarProps) {
  return (
    <div className={cn(
      "fixed bottom-0 left-1/2 transform -translate-x-1/2 z-50",
      "backdrop-blur-sm bg-background/80 border-0 border-t rounded-t-lg p-3 shadow-lg",
      className
    )}>
      <div className="flex items-center gap-2">
        {hotbarSlots.map((slot, index) => (
          <HotbarSlot
            key={index}
            slotIndex={index}
            keybind={KEYBINDS[index]}
            assignedFavorite={slot}
            favorites={favorites}
            onRoll={() => onRollFromSlot(index)}
            onAssignFavorite={(favoriteId) => onAssignToSlot(index, favoriteId)}
            onClearSlot={() => onClearSlot(index)}
          />
        ))}
      </div>
      
      <div className="text-center mt-2 text-xs text-muted-foreground">
        Press Q-W-E-R-T-Y-U-I-O to roll • Right-click to assign favorites
      </div>
    </div>
  );
}