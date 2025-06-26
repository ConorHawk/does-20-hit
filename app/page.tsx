import { DiceRoller } from '@/components/dice-roller/DiceRoller';
import { DiceIconsRow } from '@/components/dice-roller/DiceIconsRow';

export default function Home() {
  return (
    <div className="space-y-6">
      <div className="text-center">
        <p className="text-muted-foreground">
          A keyboard-only dice roller for tabletop RPGs
        </p>
      </div>
      
      <DiceIconsRow />
      
      <main>
        <DiceRoller />
      </main>
    </div>
  );
}
