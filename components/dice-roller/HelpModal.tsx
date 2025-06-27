import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Kbd } from '@/components/ui/kbd';

interface HelpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HelpModal({ isOpen, onClose }: HelpModalProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Keyboard Shortcuts</DialogTitle>
        </DialogHeader>
        
        <motion.div 
          className="space-y-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.2 }}
        >
          <section className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Image src="/icons/dice/dice-d20-light.svg" alt="" width={20} height={20} className="opacity-60" />
              <h3 className="text-lg font-semibold">Rolling Dice</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <Kbd>ENTER</Kbd>
                <span className="ml-3 text-sm text-muted-foreground">Roll 1d20 or dice pool</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <Kbd>0-9</Kbd>
                <span className="ml-3 text-sm text-muted-foreground">Set positive modifier</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex gap-1">
                  <Kbd>-</Kbd>
                  <Kbd>0-9</Kbd>
                </div>
                <span className="ml-3 text-sm text-muted-foreground">Set negative modifier</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <Kbd>BACKSPACE</Kbd>
                <span className="ml-3 text-sm text-muted-foreground">Edit modifier or remove last die</span>
              </div>
            </div>
          </section>

          <section className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                <span className="text-xs font-bold">+</span>
              </div>
              <h3 className="text-lg font-semibold">Adding Multiple Dice</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Each press adds exactly 1 die. Press multiple times to add multiple dice.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Kbd compound>⌘+1</Kbd>
                  <Image src="/icons/dice/dice-d20-light.svg" alt="" width={14} height={14} className="opacity-40" />
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Add d20</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Kbd compound>⌘+2</Kbd>
                  <Image src="/icons/dice/dice-d12-light.svg" alt="" width={14} height={14} className="opacity-40" />
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Add d12</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Kbd compound>⌘+3</Kbd>
                  <Image src="/icons/dice/dice-d10-light.svg" alt="" width={14} height={14} className="opacity-40" />
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Add d10</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Kbd compound>⌘+4</Kbd>
                  <Image src="/icons/dice/dice-d8-light.svg" alt="" width={14} height={14} className="opacity-40" />
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Add d8</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Kbd compound>⌘+5</Kbd>
                  <Image src="/icons/dice/dice-d6-light.svg" alt="" width={14} height={14} className="opacity-40" />
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Add d6</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Kbd compound>⌘+6</Kbd>
                  <Image src="/icons/dice/dice-d4-light.svg" alt="" width={14} height={14} className="opacity-40" />
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Add d4</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <div className="flex items-center gap-2">
                  <Kbd compound>⌘+7</Kbd>
                  <span className="text-xs font-mono text-muted-foreground">d100</span>
                </div>
                <span className="ml-2 text-sm text-muted-foreground">Add d100</span>
              </div>
            </div>
          </section>

          <section className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                <span className="text-xs font-bold">★</span>
              </div>
              <h3 className="text-lg font-semibold">Hotbar & Favorites</h3>
            </div>
            <p className="text-xs text-muted-foreground mb-3">Save favorite dice combinations and assign them to the hotbar for quick access.</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <Kbd>F</Kbd>
                <span className="ml-3 text-sm text-muted-foreground">Save current roll as favorite</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <Kbd compound>Q-W-E-R-T-Y-U-I-O</Kbd>
                <span className="ml-3 text-sm text-muted-foreground">Roll from hotbar slots</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors md:col-span-2">
                <span className="text-sm text-muted-foreground">Right-click hotbar slot</span>
                <span className="ml-3 text-sm text-muted-foreground">Assign favorite to slot</span>
              </div>
            </div>
          </section>

          <section className="bg-muted/30 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-muted flex items-center justify-center">
                <span className="text-xs font-bold">⚡</span>
              </div>
              <h3 className="text-lg font-semibold">Other Actions</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2">
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <Kbd>R</Kbd>
                <span className="ml-3 text-sm text-muted-foreground">Reroll last roll</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <Kbd>ESC</Kbd>
                <span className="ml-3 text-sm text-muted-foreground">Clear dice pool</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <Kbd>C</Kbd>
                <span className="ml-3 text-sm text-muted-foreground">Copy last result</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <Kbd>?</Kbd>
                <span className="ml-3 text-sm text-muted-foreground">Toggle this help</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded hover:bg-muted/50 transition-colors">
                <Kbd compound>⌘+B</Kbd>
                <span className="ml-3 text-sm text-muted-foreground">Toggle sidebar</span>
              </div>
            </div>
          </section>

          <section className="bg-primary/5 border border-primary/10 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <div className="w-5 h-5 rounded bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-bold">?</span>
              </div>
              <h3 className="text-lg font-semibold">Examples</h3>
            </div>
            <div className="space-y-3">
              <div className="p-2 bg-background rounded border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Simple roll</p>
                <p className="text-sm font-mono">Press <Kbd size="xs">ENTER</Kbd> to roll 1d20</p>
              </div>
              <div className="p-2 bg-background rounded border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Roll with modifier</p>
                <p className="text-sm font-mono">Type <Kbd size="xs">5</Kbd> then <Kbd size="xs">ENTER</Kbd> for 1d20+5</p>
              </div>
              <div className="p-2 bg-background rounded border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Roll with negative</p>
                <p className="text-sm font-mono">Type <Kbd size="xs">-</Kbd><Kbd size="xs">2</Kbd> then <Kbd size="xs">ENTER</Kbd> for 1d20-2</p>
              </div>
              <div className="p-2 bg-background rounded border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Multiple dice</p>
                <p className="text-sm font-mono">Press <Kbd size="xs" compound>⌘+5</Kbd> three times for 3d6, then <Kbd size="xs">ENTER</Kbd></p>
              </div>
              <div className="p-2 bg-background rounded border border-border">
                <p className="text-xs font-semibold text-muted-foreground mb-1">Complex roll</p>
                <p className="text-sm font-mono"><Kbd size="xs" compound>⌘+1</Kbd> ×2 + <Kbd size="xs" compound>⌘+4</Kbd> + <Kbd size="xs">-</Kbd><Kbd size="xs">2</Kbd> + <Kbd size="xs">ENTER</Kbd> = 2d20+1d8-2</p>
              </div>
            </div>
          </section>
        </motion.div>
      </DialogContent>
    </Dialog>
  );
}