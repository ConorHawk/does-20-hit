import Image from 'next/image';

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

export function DiceIconsRow() {
  return (
    <div className="flex flex-wrap justify-center gap-6 mb-8">
      {diceIcons.map((dice) => (
        <div key={dice.type} className="flex flex-col items-center space-y-2">
          <div className="w-8 h-8 flex items-center justify-center">
            <Image
              src={dice.icon}
              alt={`${dice.type} die`}
              width={32}
              height={32}
              className="opacity-70 hover:opacity-100 transition-opacity"
            />
          </div>
          <div className="text-center">
            <div className="text-sm font-medium text-foreground">{dice.type}</div>
            <kbd className="px-1.5 py-0.5 bg-muted rounded text-xs font-mono text-muted-foreground">
              {dice.shortcut}
            </kbd>
          </div>
        </div>
      ))}
    </div>
  );
}