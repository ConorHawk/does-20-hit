import { Card } from "@/components/ui/card";
import { RollResult } from "@/lib/dice-types";
import { cn } from "@/lib/utils";
import Image from "next/image";
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
    <motion.div
      layout
      transition={{ 
        duration: 0.3, 
        ease: "easeOut",
        type: "spring",
        stiffness: 300,
        damping: 30
      }}
    >
      <Card className={cn("p-6", className)}>
        <div className="space-y-4">
          {/* Prominent total display */}
          <div className="text-center">
            <motion.div
              key={result.total}
              initial={{ rotateZ: 0, scale: 0.3 }}
              animate={{ rotateZ: 360, scale: 1 }}
              transition={{ 
                duration: 0.6, 
                ease: "easeOut",
                type: "spring",
                stiffness: 100,
                damping: 15
              }}
              className="text-4xl font-bold"
            >
              {result.total}
            </motion.div>
          </div>

          {/* Individual dice results */}
          <motion.div 
            className="flex flex-wrap gap-1.5 justify-center"
            layout
            transition={{ 
              duration: 0.3, 
              ease: "easeOut",
              type: "spring",
              stiffness: 300,
              damping: 30
            }}
          >
            <AnimatePresence mode="popLayout">
              {result.dice.map((die, index) => (
                <motion.div
                  key={`${die.type}-${index}-${result.timestamp.getTime()}`}
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.2, 
                      ease: "easeOut",
                      delay: index * 0.05 
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    y: -10,
                    transition: { 
                      duration: 0.2, 
                      ease: "easeOut",
                      delay: 0 
                    }
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
                  animate={{ 
                    opacity: 1, 
                    scale: 1, 
                    y: 0,
                    transition: { 
                      duration: 0.2, 
                      ease: "easeOut",
                      delay: result.dice.length * 0.05 
                    }
                  }}
                  exit={{ 
                    opacity: 0, 
                    scale: 0.8, 
                    y: -10,
                    transition: { 
                      duration: 0.2, 
                      ease: "easeOut",
                      delay: 0 
                    }
                  }}
                  layout
                >
                  <DiceResultSegment modifier={result.modifier} />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </Card>
    </motion.div>
  );
}
