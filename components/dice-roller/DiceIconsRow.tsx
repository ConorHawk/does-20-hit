import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Kbd } from '@/components/ui/kbd';

interface DiceIcon {
  type: string;
  shortcut: string;
  icon: string;
}

const diceIcons: DiceIcon[] = [
  { type: 'd20', shortcut: '⌘+1', icon: '/icons/dice/dice-d20-light.svg' },
  { type: 'd12', shortcut: '⌘+2', icon: '/icons/dice/dice-d12-light.svg' },
  { type: 'd10', shortcut: '⌘+3', icon: '/icons/dice/dice-d10-light.svg' },
  { type: 'd8', shortcut: '⌘+4', icon: '/icons/dice/dice-d8-light.svg' },
  { type: 'd6', shortcut: '⌘+5', icon: '/icons/dice/dice-d6-light.svg' },
  { type: 'd4', shortcut: '⌘+6', icon: '/icons/dice/dice-d4-light.svg' },
];

// Map keyboard numbers to dice types
const keyToDiceType: Record<string, string> = {
  '1': 'd20',
  '2': 'd12', 
  '3': 'd10',
  '4': 'd8',
  '5': 'd6',
  '6': 'd4',
};

export function DiceIconsRow() {
  const [pulseTimestamps, setPulseTimestamps] = useState<Record<string, number>>({});

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const key = event.key.toLowerCase();
      const isCtrl = event.ctrlKey || event.metaKey;
      
      // Check if it's a dice keybind (Cmd+1 through Cmd+6)
      if (isCtrl && keyToDiceType[key]) {
        // Trigger pulse by updating timestamp
        setPulseTimestamps(prev => ({
          ...prev,
          [key]: Date.now()
        }));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const getDiceKey = (diceType: string): string => {
    return Object.keys(keyToDiceType).find(key => keyToDiceType[key] === diceType) || '';
  };

  return (
    <div className="flex flex-wrap justify-center gap-6 mb-8">
      {diceIcons.map((dice) => {
        const diceKey = getDiceKey(dice.type);
        const pulseTimestamp = pulseTimestamps[diceKey];
        
        return (
          <div key={dice.type} className="flex flex-col items-center space-y-2">
            <motion.div 
              className="w-8 h-8 flex items-center justify-center"
              key={pulseTimestamp} // Force re-render on each pulse
              initial={{ scale: 1, opacity: 0.7 }}
              animate={{ 
                scale: [1, 1.2, 1],
                opacity: [0.7, 1, 0.7]
              }}
              transition={{
                duration: 0.3,
                ease: "easeOut"
              }}
            >
              <Image
                src={dice.icon}
                alt={`${dice.type} die`}
                width={32}
                height={32}
                className="hover:opacity-100 transition-opacity"
              />
            </motion.div>
            <div className="text-center">
              <div className="text-sm font-medium text-foreground">{dice.type}</div>
              <Kbd compound tooltip={`Add ${dice.type} to dice pool`}>
                {dice.shortcut}
              </Kbd>
            </div>
          </div>
        );
      })}
    </div>
  );
}