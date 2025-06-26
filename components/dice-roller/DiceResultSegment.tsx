import { cn, getDiceIconPath } from "@/lib/utils";
import { DieRoll } from "@/lib/dice-types";
import Image from "next/image";
import { motion } from "framer-motion";

interface DiceResultSegmentProps {
  die?: DieRoll;
  modifier?: number;
  size?: "sm" | "md";
}

export function DiceResultSegment({
  die,
  modifier,
  size = "md",
}: DiceResultSegmentProps) {
  const sizeClasses = {
    sm: {
      container: "px-1.5 py-0.5",
      icon: 10,
      text: "text-xs",
    },
    md: {
      container: "px-2 py-1",
      icon: 14,
      text: "text-sm",
    },
  };

  const sizeConfig = sizeClasses[size];

  // Handle modifier display
  if (modifier !== undefined) {
    return (
      <div
        className={cn(
          "inline-flex items-center gap-2 rounded-lg border",
          sizeConfig.container,
          "bg-muted border-muted-foreground/20"
        )}
      >
        <span className={cn("font-bold", sizeConfig.text, "text-foreground")}>
          {modifier > 0 ? "+" : ""}
          {modifier}
        </span>
      </div>
    );
  }

  // Handle die display
  if (!die) return null;

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2 rounded-lg border",
        sizeConfig.container,
        die.isCrit &&
          "bg-green-100 border-green-500 dark:bg-green-900 dark:border-green-400",
        die.isFail &&
          "bg-red-100 border-red-500 dark:bg-red-900 dark:border-red-400",
        !die.isCrit && !die.isFail && "bg-muted border-muted-foreground/20"
      )}
    >
      <motion.div
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ 
          duration: 0.6, 
          ease: "easeOut",
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
      >
        <Image
          src={getDiceIconPath(die.type)}
          alt={`${die.type} die`}
          width={sizeConfig.icon}
          height={sizeConfig.icon}
          className="opacity-60"
        />
      </motion.div>
      <span
        className={cn(
          "font-bold",
          sizeConfig.text,
          die.isCrit && "text-green-800 dark:text-green-200",
          die.isFail && "text-red-800 dark:text-red-200",
          !die.isCrit && !die.isFail && "text-foreground"
        )}
      >
        {die.value}
      </span>
    </div>
  );
}
