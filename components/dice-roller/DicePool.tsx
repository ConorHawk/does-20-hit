import { Card } from "@/components/ui/card";
import { DieType } from "@/lib/dice-types";
import { cn } from "@/lib/utils";
import { DicePoolDisplay } from "./DicePoolDisplay";
import Image from "next/image";
import { Kbd } from "@/components/ui/kbd";

interface DicePoolProps {
  dicePool: DieType[];
  modifier: number;
  pendingModifier: string;
  quickMode: boolean;
  className?: string;
}

export function DicePool({
  dicePool,
  modifier,
  pendingModifier,
  quickMode,
  className,
}: DicePoolProps) {
  const modifierText =
    modifier !== 0 ? ` ${modifier > 0 ? "+" : ""}${modifier}` : "";

  if (quickMode && dicePool.length === 0) {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <div className="text-lg text-muted-foreground">
          {pendingModifier ? (
            <>
              <div className="text-2xl font-bold text-foreground">
                1d20{modifierText}
              </div>
              <div className="text-sm mt-2">
                Press{" "}
                <Kbd tooltip="Roll the dice pool">ENTER</Kbd>{" "}
                to roll •{" "}
                <Kbd tooltip="Edit modifier or remove last die">BACKSPACE</Kbd>{" "}
                to edit
              </div>
            </>
          ) : (
            <>
              <div className="flex items-center justify-center gap-3 mb-2">
                <Image
                  src="/icons/dice/dice-d20-light.svg"
                  alt="d20 die"
                  width={24}
                  height={24}
                  className="opacity-70"
                />
                <span>
                  Press{" "}
                  <Kbd tooltip="Roll a single d20">ENTER</Kbd>{" "}
                  for 1d20
                </span>
              </div>
              {modifier !== 0 && (
                <div className="text-sm text-muted-foreground mt-2">
                  Current modifier: {modifierText}
                </div>
              )}
            </>
          )}
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-6", className)}>
      <div className="text-center">
        <div className="mb-2 flex items-center justify-center">
          <DicePoolDisplay dicePool={dicePool} modifier={modifier} />
        </div>
        <div className="text-sm text-muted-foreground mb-2">
          Dice Pool
        </div>
        <div className="text-sm text-muted-foreground">
          Press{" "}
          <Kbd tooltip="Roll the entire dice pool">SPACE</Kbd>{" "}
          to roll pool •{" "}
          <Kbd compound tooltip="Add dice to the pool">⌘+Number</Kbd>{" "}
          to add dice •{" "}
          <Kbd tooltip="Set a positive or negative modifier">0-9</Kbd>{" "}
          for modifier
        </div>
      </div>
    </Card>
  );
}
