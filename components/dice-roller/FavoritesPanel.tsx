import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FavoriteRoll } from "@/lib/dice-types";
import { DicePoolDisplay } from "./DicePoolDisplay";
import { Trash2, Play } from "lucide-react";
import { cn } from "@/lib/utils";

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
      <Card className={cn("p-4", className)}>
        <div className="text-center text-muted-foreground">
          <div className="text-sm">No favorites saved</div>
          <div className="text-xs mt-1">
            Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">F</kbd> to save current roll
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-4", className)}>
      <div className="space-y-3">
        <div className="text-sm font-medium text-muted-foreground">
          Favorites
        </div>
        
        <div className="space-y-2">
          {favorites.map((favorite, index) => (
            <div
              key={favorite.id}
              className="flex items-center justify-between p-2 rounded-lg border hover:bg-muted/50 transition-colors"
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
                  title={`Roll ${favorite.name} (${['Q','W','E','R','T','Y','U','I','O'][index] || ''})`}
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
        
        <div className="text-xs text-muted-foreground text-center pt-2 border-t">
          Press <kbd className="px-1 py-0.5 bg-muted rounded text-xs">Q-W-E-R-T-Y-U-I-O</kbd> for quick roll
        </div>
      </div>
    </Card>
  );
}