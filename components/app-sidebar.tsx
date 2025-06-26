"use client";

import { Clock, History, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { RollHistoryEntry, DieType } from "@/lib/dice-types";
import { useDiceRollerContext } from "@/components/dice-roller-provider";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

export function AppSidebar() {
  const { state, actions } = useDiceRollerContext();

  const renderHistoryEntry = (entry: RollHistoryEntry) => {
    const result = entry.result;
    
    // Group dice by type for display
    const diceByType = result.dice.reduce((acc, die) => {
      if (!acc[die.type]) {
        acc[die.type] = [];
      }
      acc[die.type].push(die);
      return acc;
    }, {} as Record<DieType, typeof result.dice>);

    return (
      <div key={entry.id} className="p-3 space-y-2 border rounded-lg bg-background/50">
        {/* Timestamp and formula */}
        <div className="flex flex-col gap-1">
          <span className="text-xs text-muted-foreground">
            {result.timestamp.toLocaleTimeString()}
          </span>
          <span className="text-sm font-mono bg-muted px-2 py-1 rounded break-all">
            {entry.displayText}
          </span>
        </div>

        {/* Individual dice results */}
        <div className="space-y-1">
          {Object.entries(diceByType).map(([dieType, dice]) => (
            <div key={dieType} className="flex flex-col gap-1">
              <span className="text-xs font-medium text-muted-foreground">
                {dieType}:
              </span>
              <div className="flex flex-wrap gap-1">
                {dice.map((die, dieIndex) => (
                  <span
                    key={dieIndex}
                    className={cn(
                      "inline-flex items-center justify-center w-6 h-6 text-xs font-bold rounded border",
                      die.isCrit && "bg-green-100 border-green-500 text-green-800 dark:bg-green-900 dark:border-green-400 dark:text-green-200",
                      die.isFail && "bg-red-100 border-red-500 text-red-800 dark:bg-red-900 dark:border-red-400 dark:text-red-200",
                      !die.isCrit && !die.isFail && "bg-muted border-muted-foreground/20 text-muted-foreground"
                    )}
                  >
                    {die.value}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Total and Reroll button */}
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="font-bold text-sm">
            Total: {result.total}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => actions.rerollFromHistory(entry)}
            className="h-8 px-2 text-xs"
          >
            <RotateCcw className="h-3 w-3 mr-1" />
            Reroll
          </Button>
        </div>
      </div>
    );
  };

  return (
    <Sidebar side="right" collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground">
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <History className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">Roll History</span>
                <span className="truncate text-xs">Previous rolls</span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-3 py-2">
          {state.history.length === 0 ? (
            <div className="p-6 text-center text-muted-foreground">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
              <p className="text-sm">No rolls yet</p>
              <p className="text-xs">Your roll history will appear here</p>
            </div>
          ) : (
            <div className="space-y-2">
              {state.history.map((entry) => renderHistoryEntry(entry))}
            </div>
          )}
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}