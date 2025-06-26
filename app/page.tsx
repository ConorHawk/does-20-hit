import { DiceRoller } from '@/components/dice-roller/DiceRoller';
import { DiceIconsRow } from '@/components/dice-roller/DiceIconsRow';

export default function Home() {
  return (
    <div className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Does 20 Hit?</h1>
          <p className="text-muted-foreground">
            A keyboard-only dice roller for tabletop RPGs
          </p>
        </header>
        
        <DiceIconsRow />
        
        <main>
          <DiceRoller />
        </main>
      </div>
    </div>
  );
}
