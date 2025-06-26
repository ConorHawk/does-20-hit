import { Button } from "@/components/ui/button";
import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuTrigger,
} from "@/components/ui/context-menu";
import { FavoriteRoll } from "@/lib/dice-types";
import { DicePoolDisplay } from "./DicePoolDisplay";
import { cn } from "@/lib/utils";

interface HotbarSlotProps {
  slotIndex: number;
  keybind: string;
  assignedFavorite: FavoriteRoll | null;
  favorites: FavoriteRoll[];
  onRoll: () => void;
  onAssignFavorite: (favoriteId: string) => void;
  onClearSlot: () => void;
  className?: string;
}

export function HotbarSlot({
  keybind,
  assignedFavorite,
  favorites,
  onRoll,
  onAssignFavorite,
  onClearSlot,
  className,
}: HotbarSlotProps) {
  return (
    <ContextMenu>
      <ContextMenuTrigger asChild>
        <Button
          variant={assignedFavorite ? "default" : "outline"}
          className={cn(
            "h-16 w-16 flex flex-col items-center justify-center p-2 relative",
            assignedFavorite ? "bg-primary hover:bg-primary/90" : "border-dashed",
            className
          )}
          onClick={assignedFavorite ? onRoll : undefined}
          title={assignedFavorite ? `${assignedFavorite.name} (${keybind})` : `Empty slot (${keybind})`}
        >
          <div className="absolute top-1 left-1 text-xs font-mono opacity-70">
            {keybind}
          </div>
          
          {assignedFavorite ? (
            <div className="flex flex-col items-center justify-center text-center mt-2">
              <div className="text-xs font-medium truncate max-w-full leading-tight mb-1">
                {assignedFavorite.name}
              </div>
              <div className="text-[10px] opacity-80">
                <DicePoolDisplay 
                  dicePool={assignedFavorite.dicePool} 
                  modifier={assignedFavorite.modifier}
                  compact={true}
                />
              </div>
            </div>
          ) : (
            <div className="text-xs text-muted-foreground mt-2">
              Empty
            </div>
          )}
        </Button>
      </ContextMenuTrigger>
      
      <ContextMenuContent className="w-56">
        {favorites.length > 0 ? (
          <>
            <div className="px-2 py-1.5 text-sm font-semibold text-muted-foreground">
              Assign Favorite
            </div>
            {favorites.map((favorite) => (
              <ContextMenuItem
                key={favorite.id}
                onClick={() => onAssignFavorite(favorite.id)}
                className="flex flex-col items-start gap-1 h-auto py-2"
              >
                <div className="font-medium text-sm">{favorite.name}</div>
                <div className="text-xs text-muted-foreground">
                  <DicePoolDisplay 
                    dicePool={favorite.dicePool} 
                    modifier={favorite.modifier}
                    compact={true}
                  />
                </div>
              </ContextMenuItem>
            ))}
            {assignedFavorite && (
              <>
                <div className="border-t my-1" />
                <ContextMenuItem
                  onClick={onClearSlot}
                  className="text-destructive focus:text-destructive"
                >
                  Clear Slot
                </ContextMenuItem>
              </>
            )}
          </>
        ) : (
          <ContextMenuItem disabled>
            No favorites available
          </ContextMenuItem>
        )}
      </ContextMenuContent>
    </ContextMenu>
  );
}