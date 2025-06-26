import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">Quick d20 Rolls</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">SPACE</kbd>
                <span>Roll 1d20</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">5 ENTER</kbd>
                <span>Roll 1d20+5</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">20 ENTER</kbd>
                <span>Roll 1d20+20</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">- 2 ENTER</kbd>
                <span>Roll 1d20-2</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Modifiers</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">5</kbd>
                <span>Immediately set +5</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">- 3</kbd>
                <span>Immediately set -3</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">BACKSPACE</kbd>
                <span>Remove last digit</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">ENTER</kbd>
                <span>Roll with modifier</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Command+Number (Add Dice)</h3>
            <p className="text-sm text-muted-foreground mb-3">Each press adds exactly 1 die. Press multiple times to add multiple dice.</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">⌘ 1</kbd>
                <span>Add 1d20</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">⌘ 2</kbd>
                <span>Add 1d12</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">⌘ 3</kbd>
                <span>Add 1d10</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">⌘ 4</kbd>
                <span>Add 1d8</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">⌘ 5</kbd>
                <span>Add 1d6</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">⌘ 6</kbd>
                <span>Add 1d4</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">⌘ 7</kbd>
                <span>Add 1d100</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Die Types</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">D 4</kbd>
                <span>Add 1d4</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">D 6</kbd>
                <span>Add 1d6</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">D 8</kbd>
                <span>Add 1d8</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">D 1</kbd>
                <span>Add 1d10</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">D 2</kbd>
                <span>Add 1d12</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">D 0</kbd>
                <span>Add 1d100</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">D D</kbd>
                <span>Return to d20 mode</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">Shift + D</kbd>
                <span>Change die type only</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Actions</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">ENTER</kbd>
                <span>Roll dice pool</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">R</kbd>
                <span>Reroll last roll</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">ESC</kbd>
                <span>Clear dice pool</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">BACKSPACE</kbd>
                <span>Remove last dice group</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">H</kbd>
                <span>Toggle history</span>
              </div>
              <div className="flex justify-between">
                <kbd className="px-2 py-1 bg-muted rounded font-mono">C</kbd>
                <span>Copy last result</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Examples</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Roll 1d20+5:</strong> Press <kbd className="px-1 py-0.5 bg-muted rounded font-mono">5</kbd> then <kbd className="px-1 py-0.5 bg-muted rounded font-mono">ENTER</kbd>
              </div>
              <div>
                <strong>Roll 1d20+23:</strong> Press <kbd className="px-1 py-0.5 bg-muted rounded font-mono">2</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">3</kbd> then <kbd className="px-1 py-0.5 bg-muted rounded font-mono">ENTER</kbd>
              </div>
              <div>
                <strong>Edit modifier:</strong> Type <kbd className="px-1 py-0.5 bg-muted rounded font-mono">1</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">2</kbd>, then <kbd className="px-1 py-0.5 bg-muted rounded font-mono">BACKSPACE</kbd> to get +1
              </div>
              <div>
                <strong>Add 3d6:</strong> Press <kbd className="px-1 py-0.5 bg-muted rounded font-mono">⌘</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">5</kbd> three times, then <kbd className="px-1 py-0.5 bg-muted rounded font-mono">SPACE</kbd>
              </div>
              <div>
                <strong>Roll 2d20+1d8-2:</strong> Press <kbd className="px-1 py-0.5 bg-muted rounded font-mono">⌘</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">1</kbd> twice, then <kbd className="px-1 py-0.5 bg-muted rounded font-mono">⌘</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">4</kbd> once, then <kbd className="px-1 py-0.5 bg-muted rounded font-mono">-</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">2</kbd>, then <kbd className="px-1 py-0.5 bg-muted rounded font-mono">SPACE</kbd>
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}