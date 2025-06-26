import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { DiceGroup } from "@/lib/dice-types";
import { DicePoolDisplay } from "./DicePoolDisplay";

interface SaveFavoriteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (name: string) => void;
  dicePool: DiceGroup[];
  modifier: number;
}

export function SaveFavoriteModal({
  isOpen,
  onClose,
  onSave,
  dicePool,
  modifier,
}: SaveFavoriteModalProps) {
  const [name, setName] = useState("");

  const handleSave = () => {
    if (name.trim()) {
      onSave(name.trim());
      setName("");
      onClose();
    }
  };

  const handleClose = () => {
    setName("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Save Favorite Roll</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="text-center p-4 bg-muted rounded-lg">
            <div className="text-sm text-muted-foreground mb-2">Preview</div>
            <DicePoolDisplay dicePool={dicePool} modifier={modifier} />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="favorite-name">Name</Label>
            <Input
              id="favorite-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter a name for this roll..."
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleSave();
                }
              }}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            Save Favorite
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}