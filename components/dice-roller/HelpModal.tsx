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
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-3">Rolling Dice</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">ENTER</kbd>
                <span className="ml-2">Roll 1d20 or dice pool</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">Numbers</kbd>
                <span className="ml-2">Set positive modifier</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">- Numbers</kbd>
                <span className="ml-2">Set negative modifier</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">BACKSPACE</kbd>
                <span className="ml-2">Edit modifier or remove dice</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Adding Multiple Dice</h3>
            <p className="text-sm text-muted-foreground mb-3">Each press adds exactly 1 die. Press multiple times to add multiple dice.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">⌘ 1</kbd>
                <span className="ml-2">Add 1d20</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">⌘ 2</kbd>
                <span className="ml-2">Add 1d12</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">⌘ 3</kbd>
                <span className="ml-2">Add 1d10</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">⌘ 4</kbd>
                <span className="ml-2">Add 1d8</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">⌘ 5</kbd>
                <span className="ml-2">Add 1d6</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">⌘ 6</kbd>
                <span className="ml-2">Add 1d4</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">⌘ 7</kbd>
                <span className="ml-2">Add 1d100</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Other Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">R</kbd>
                <span className="ml-2">Reroll last roll</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">ESC</kbd>
                <span className="ml-2">Clear dice pool</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">C</kbd>
                <span className="ml-2">Copy last result</span>
              </div>
              <div className="flex justify-between items-center">
                <kbd className="px-2 py-1 bg-muted rounded font-mono whitespace-nowrap">?</kbd>
                <span className="ml-2">Toggle this help</span>
              </div>
            </div>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Examples</h3>
            <div className="space-y-2 text-sm">
              <div>
                <strong>Simple roll:</strong> Press <kbd className="px-1 py-0.5 bg-muted rounded font-mono">ENTER</kbd> to roll 1d20
              </div>
              <div>
                <strong>Roll with modifier:</strong> Type <kbd className="px-1 py-0.5 bg-muted rounded font-mono">5</kbd> then <kbd className="px-1 py-0.5 bg-muted rounded font-mono">ENTER</kbd> for 1d20+5
              </div>
              <div>
                <strong>Roll with negative:</strong> Type <kbd className="px-1 py-0.5 bg-muted rounded font-mono">-</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">2</kbd> then <kbd className="px-1 py-0.5 bg-muted rounded font-mono">ENTER</kbd> for 1d20-2
              </div>
              <div>
                <strong>Multiple dice:</strong> Press <kbd className="px-1 py-0.5 bg-muted rounded font-mono">⌘</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">5</kbd> three times for 3d6, then <kbd className="px-1 py-0.5 bg-muted rounded font-mono">ENTER</kbd>
              </div>
              <div>
                <strong>Complex roll:</strong> <kbd className="px-1 py-0.5 bg-muted rounded font-mono">⌘</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">1</kbd> twice + <kbd className="px-1 py-0.5 bg-muted rounded font-mono">⌘</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">4</kbd> + <kbd className="px-1 py-0.5 bg-muted rounded font-mono">-</kbd><kbd className="px-1 py-0.5 bg-muted rounded font-mono">2</kbd> + <kbd className="px-1 py-0.5 bg-muted rounded font-mono">ENTER</kbd> for 2d20+1d8-2
              </div>
            </div>
          </section>
        </div>
      </DialogContent>
    </Dialog>
  );
}