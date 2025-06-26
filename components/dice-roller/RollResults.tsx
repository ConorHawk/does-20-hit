import { Card } from "@/components/ui/card";
import { RollResult } from "@/lib/dice-types";
import { cn } from "@/lib/utils";
import Image from "next/image";
import NumberFlow from "@number-flow/react";
import { DiceResultSegment } from "./DiceResultSegment";
import { AnimatePresence, motion } from "framer-motion";

interface RollResultsProps {
  result: RollResult | null;
  className?: string;
}

export function RollResults({ result, className }: RollResultsProps) {
  if (!result) {
    return (
      <Card className={cn("p-6 text-center", className)}>
        <div className="flex flex-col items-center gap-3">
          <Image
            src="/icons/dice/dice-d20-light.svg"
            alt="D20 die"
            width={48}
            height={48}
            className="opacity-30"
          />
          <div className="text-muted-foreground">
            No rolls yet. Press keys to start rolling!
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className={cn("p-6", className)}>
      <div className="space-y-4">
        {/* Prominent total display */}
        <div className="text-center">
          <NumberFlow
            value={result.total}
            className="text-4xl font-bold"
            respectMotionPreference={true}
            transformTiming={{ duration: 250, easing: "ease-out" }}
            spinTiming={{ duration: 250, easing: "ease-out" }}
            opacityTiming={{ duration: 100, easing: "ease-out" }}
          />
        </div>

        {/* Individual dice results */}
        <div className="flex flex-wrap gap-3">
          <AnimatePresence mode="popLayout">
            {result.dice.map((die, index) => (
              <motion.div
                key={`${die.type}-${index}-${result.timestamp.getTime()}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeOut",
                  delay: index * 0.05 
                }}
                layout
              >
                <DiceResultSegment die={die} />
              </motion.div>
            ))}
            {result.modifier !== 0 && (
              <motion.div
                key={`modifier-${result.modifier}-${result.timestamp.getTime()}`}
                initial={{ opacity: 0, scale: 0.8, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8, y: -10 }}
                transition={{ 
                  duration: 0.2, 
                  ease: "easeOut",
                  delay: result.dice.length * 0.05 
                }}
                layout
              >
                <DiceResultSegment modifier={result.modifier} />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Card>
  );
}
