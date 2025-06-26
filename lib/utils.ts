import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { DieType } from "./dice-types"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getDiceIconPath(dieType: DieType): string {
  const iconMap: Record<DieType, string> = {
    'd4': '/icons/dice/dice-d4-light.svg',
    'd6': '/icons/dice/dice-d6-light.svg', 
    'd8': '/icons/dice/dice-d8-light.svg',
    'd10': '/icons/dice/dice-d10-light.svg',
    'd12': '/icons/dice/dice-d12-light.svg',
    'd20': '/icons/dice/dice-d20-light.svg',
    'd100': '/icons/dice/dice-d10-light.svg', // Use d10 icon as fallback for d100
  };
  return iconMap[dieType];
}
