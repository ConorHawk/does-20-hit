# Dice Roller Specification

## Overview
A keyboard-only dice rolling application for TTRPGs that allows users to quickly build dice pools and roll them with modifiers.

## Design Philosophy

### D20-First Approach
Since the vast majority of TTRPG rolls are single d20 rolls (ability checks, saving throws, attack rolls), the interface is optimized for this use case:

1. **Zero-friction d20 rolls**: Press Space to instantly roll 1d20
2. **Smart context switching**: The app knows when you want quick d20s vs building a pool
3. **Minimal keystrokes**: Common actions like "roll d20+5" take only 2 keystrokes (5, Enter)
4. **Progressive complexity**: Simple rolls are instant, complex pools are still easy

## Core Features

### 1. Dice Types
- **d4** - 4-sided die
- **d6** - 6-sided die  
- **d8** - 8-sided die
- **d10** - 10-sided die
- **d12** - 12-sided die
- **d20** - 20-sided die
- **d100** - Percentile die

### 2. Keyboard Shortcuts

#### Primary Actions (Optimized for d20)
- **Space/Enter**: 
  - If dice pool is empty: Roll 1d20 with current modifier
  - If dice pool has dice: Roll the current pool
- **Number Keys (1-9, 0)**: Always set modifiers (immediately visible)
- **Command + Number**: Add dice to pool (each press adds 1 die)
  - ⌘1: Add 1d20, ⌘2: Add 1d12, ⌘3: Add 1d10, ⌘4: Add 1d8, ⌘5: Add 1d6, ⌘6: Add 1d4, ⌘7: Add 1d100
- **-**: Add negative sign to modifier (works like text input)
- **Backspace**: Edit modifier (remove last character) or remove last dice group
- **R**: Quick repeat last roll (including modifiers)
- **Escape**: Clear the dice pool and modifiers

#### Die Type Selection (Legacy - Replaced by Command+Number)
- **D + Number**: Change die type and add 1 die
  - D4: Add 1d4, D6: Add 1d6, D8: Add 1d8, D1: Add 1d10, D2: Add 1d12, D0: Add 1d100
- **Shift + D + Number**: Just change die type without adding
- **DD**: Quick toggle back to d20 mode

#### Modifiers (Text Input Style)
- **Number keys**: Immediately append to modifier (works like typing in text field)
- **-**: Add negative sign (only at start, works like text input)
- **Backspace**: Remove last character from modifier (including the - sign)
- **Modifier automatically clears**: After any roll is completed

#### Navigation & Display
- **?**: Show keyboard shortcuts help
- **C**: Copy last result to clipboard

### 3. User Interface Components

#### Dice Pool Display
- Visual representation of current dice pool
- Shows dice type and quantity (e.g., "3d6", "2d20")
- Current modifier displayed separately
- Total dice count indicator

#### Quick Reference Bar
- Always visible at top/bottom
- Shows current die type selection
- Active modifier indicator
- Key hints for common actions

#### Roll Results Panel
- Individual die results with visual highlighting
- Critical successes (max value) in green
- Critical failures (1s) in red
- Subtotal before modifiers
- Final total with modifiers
- Animation on new rolls

#### Roll History
- Last 10 rolls saved and displayed in main interface
- Shows timestamp, dice pool, and result
- Automatically visible in UI (no toggle required)

### 4. State Management

#### Application State
```typescript
interface DiceRollerState {
  currentDieType: DieType; // Defaults to d20
  dicePool: DiceGroup[];
  modifier: number; // Parsed from pendingModifier
  pendingModifier: string; // Text input for modifier (e.g., "-5", "23")
  lastRoll: RollResult | null;
  history: RollHistoryEntry[];
  isHelpVisible: boolean;
  quickMode: boolean; // True when pool is empty (d20 quick rolls)
}

interface DiceGroup {
  type: DieType;
  quantity: number;
}

interface RollResult {
  dice: DieRoll[];
  subtotal: number;
  modifier: number;
  total: number;
  timestamp: Date;
}

interface DieRoll {
  type: DieType;
  value: number;
  isCrit: boolean;
  isFail: boolean;
}
```

### 5. Accessibility Features

- **Screen Reader Support**: ARIA labels for all actions
- **Focus Management**: Clear focus indicators
- **Keyboard Traps**: Avoid trapping focus in modals
- **High Contrast Mode**: Support system preferences

### 6. Visual Design

#### Layout
```
┌─────────────────────────────────────────┐
│  d20 Mode | 5=+5 modifier | ⌘1-7=Add   │
├─────────────────────────────────────────┤
│                                         │
│     [Empty - Press SPACE for 1d20]     │
│                                         │
│     -- OR with modifier typing --      │
│                                         │
│     1d20+5                             │
│     [Press ENTER to roll • BACKSPACE to edit] │
│                                         │
│     -- OR with dice in pool --         │
│                                         │
│     Dice Pool: 3d20 + 2d6 + 2         │
│     [Press SPACE to roll • ⌘+Number to add dice] │
│                                         │
├─────────────────────────────────────────┤
│     Last Roll:                         │
│     d20: [17] [8] [20!]               │
│     d6: [4] [6]                       │
│     Subtotal: 55                      │
│     Modifier: +2                      │
│     Total: 57                         │
│                                         │
│     [Press R to reroll]                │
└─────────────────────────────────────────┘
```

### 7. Technical Implementation

#### Component Structure
- `DiceRoller` - Main container component
- `DicePool` - Display current dice selection
- `QuickReference` - Keyboard hints bar
- `RollResults` - Display roll outcomes
- `HelpModal` - Keyboard shortcuts reference

#### Hooks
- `useDiceRoller` - Main state management with text-input style modifiers
- `useKeyboardShortcuts` - Handle all keyboard inputs including Command+Number combos

#### Utilities
- `rollDice(type: DieType, quantity: number)` - Core rolling logic
- `rollDicePool(pool: DiceGroup[], modifier: number)` - Roll entire pool with modifier
- `addDiceToPool(pool, dieType, quantity)` - Smart dice pool merging
- `formatDicePool(pool: DiceGroup[])` - Display formatting (e.g., "2d20 + 3d6")
- `formatRollResult(result: RollResult)` - Format results for display and history

### 8. User Flow Examples

#### Example 1: Quick d20 Rolls (Most Common)
- **Roll 1d20**: Just press `Space`
- **Roll 1d20+5**: Press `5` then `Enter` (shows "1d20+5" immediately)
- **Roll 1d20-2**: Press `-` then `2` then `Enter` (shows "1d20-2")
- **Roll 1d20+23**: Press `2` then `3` then `Enter` (shows "1d20+23")

#### Example 2: Modifier Editing
- **Type and edit**: Press `1` `2` (shows "1d20+12"), then `Backspace` (shows "1d20+1")
- **Remove negative**: Press `-` `5` (shows "1d20-5"), then `Backspace` twice (shows "1d20")
- **Fresh after roll**: Roll clears modifier automatically, type `3` for fresh "+3"

#### Example 3: Building Dice Pools
- **Add 3d6**: Press `⌘5` three times (adds 1d6 each press)
- **Add 2d20 + 1d8**: Press `⌘1` twice, then `⌘4` once
- **Complex pool with modifier**: Build pool with Command+Number, then type modifier

#### Example 4: Quick Actions
- **Reroll last**: Press `R` (keeps same dice and modifiers)
- **Clear everything**: Press `Esc` (clears pool and modifiers)
- **Edit modifier**: Use `Backspace` to edit current modifier like text input

### 9. Future Enhancements
- Dice pool presets (save/load with F1-F12)
- Exploding dice option
- Drop lowest/highest options
- Roll statistics tracking
- Export roll history
- Customizable dice colors/themes
- Macro support for complex rolls

### 10. Performance Considerations
- Debounce rapid keyboard inputs
- Limit history to 100 entries
- Use React.memo for dice components
- Virtualize history list if needed
- Optimize animations for 60fps