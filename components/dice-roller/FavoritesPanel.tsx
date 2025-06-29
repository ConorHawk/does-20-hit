import { Button } from "@/components/ui/button";
import { FavoriteRoll } from "@/lib/dice-types";
import { DicePoolDisplay } from "./DicePoolDisplay";
import { Trash2, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { Kbd } from "@/components/ui/kbd";

interface FavoritesPanelProps {
  favorites: FavoriteRoll[];
  onRollFavorite: (favorite: FavoriteRoll) => void;
  onDeleteFavorite: (favoriteId: string) => void;
  className?: string;
}

export function FavoritesPanel({
  favorites,
  onRollFavorite,
  onDeleteFavorite,
  className,
}: FavoritesPanelProps) {
  if (favorites.length === 0) {
    return (
      <div className={cn("text-center text-muted-foreground", className)}>
        <div className="text-sm">No favorites saved</div>
        <div className="text-xs mt-1">
          Press <Kbd tooltip="Save the current dice roll as a favorite">F</Kbd> to
          save current roll
        </div>
      </div>
    );
  }

  return (
    <div className={cn("space-y-3", className)}>
      <div className="space-y-2">
        {favorites.map((favorite) => (
          <div
            key={favorite.id}
            className="bg-white flex items-center justify-between p-2 rounded-lg border"
          >
            <div className="flex-1 min-w-0">
              <div className="text-sm font-medium truncate mb-1">
                {favorite.name}
              </div>
              <div className="flex items-center gap-1">
                <DicePoolDisplay
                  dicePool={favorite.dicePool}
                  modifier={favorite.modifier}
                />
              </div>
            </div>

            <div className="flex items-center gap-1 ml-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onRollFavorite(favorite)}
                className="h-8 w-8 p-0"
                title={`Roll ${favorite.name}`}
              >
                <Play className="h-3 w-3" />
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => onDeleteFavorite(favorite.id)}
                className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                title="Delete favorite"
              >
                <Trash2 className="h-3 w-3" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
