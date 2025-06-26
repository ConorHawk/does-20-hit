"use client";

import { Clock, History, RotateCcw, Star, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { RollHistoryEntry } from "@/lib/dice-types";
import { useDiceRollerContext } from "@/components/dice-roller-provider";
import Image from "next/image";
import { DiceResultSegment } from "@/components/dice-roller/DiceResultSegment";
import { FavoritesPanel } from "@/components/dice-roller/FavoritesPanel";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";

// Animation variants for smooth transitions
const sectionVariants = {
  expanded: {
    height: "auto",
    opacity: 1
  },
  collapsed: {
    height: 0,
    opacity: 0
  }
};

const chevronVariants = {
  expanded: { rotate: 0 },
  collapsed: { rotate: -90 }
};

export function AppSidebar() {
  const { state, actions } = useDiceRollerContext();
  const [isFavoritesExpanded, setIsFavoritesExpanded] = useState(true);
  const [isHistoryExpanded, setIsHistoryExpanded] = useState(true);

  const renderHistoryEntry = (entry: RollHistoryEntry) => {
    const result = entry.result;

    return (
      <div
        key={entry.id}
        className="p-3 space-y-2 border rounded-lg bg-background/50"
      >
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
        <div className="flex flex-wrap gap-1">
          {result.dice.map((die, index) => (
            <DiceResultSegment key={index} die={die} size="sm" />
          ))}
        </div>

        {/* Total and Reroll button */}
        <div className="flex items-center justify-between pt-2 border-t">
          <span className="font-bold text-sm">Total: {result.total}</span>
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
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <History className="size-4" />
              </div>
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  Rolls & Favorites
                </span>
                <span className="truncate text-xs">
                  History and saved rolls
                </span>
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <div className="px-3 py-2 space-y-4">
          {/* Favorites Section */}
          <div className="space-y-2">
            <button
              onClick={() => setIsFavoritesExpanded(!isFavoritesExpanded)}
              className="w-full text-sm font-medium flex items-center justify-between hover:bg-muted/50 hover:text-foreground rounded-md px-2 py-1 transition-colors"
            >
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4" />
                Favorites
              </div>
                <motion.div
                variants={chevronVariants}
                animate={isFavoritesExpanded ? "expanded" : "collapsed"}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronDown className="h-3 w-3" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isFavoritesExpanded && (
                <motion.div
                  variants={sectionVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  <FavoritesPanel
                    favorites={state.favorites}
                    onRollFavorite={actions.rollFromFavorite}
                    onDeleteFavorite={actions.deleteFavorite}
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* History Section */}
          <div className="space-y-2">
            <button
              onClick={() => setIsHistoryExpanded(!isHistoryExpanded)}
              className="w-full text-sm font-medium flex items-center justify-between hover:bg-muted/50 hover:text-foreground rounded-md px-2 py-1 transition-colors"
            >
              <div className="flex items-center gap-2">
                <History className="h-4 w-4" />
                History
              </div>
              <motion.div
                variants={chevronVariants}
                animate={isHistoryExpanded ? "expanded" : "collapsed"}
                transition={{ duration: 0.2, ease: "easeInOut" }}
              >
                <ChevronDown className="h-3 w-3" />
              </motion.div>
            </button>

            <AnimatePresence>
              {isHistoryExpanded && (
                <motion.div
                  variants={sectionVariants}
                  initial="collapsed"
                  animate="expanded"
                  exit="collapsed"
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  style={{ overflow: "hidden" }}
                >
                  {state.history.length === 0 ? (
                    <div className="p-6 text-center text-muted-foreground">
                      <div className="flex flex-col items-center gap-3">
                        <Clock className="h-8 w-8 opacity-50" />
                        <Image
                          src="/icons/dice/dice-d6-light.svg"
                          alt="D6 die"
                          width={32}
                          height={32}
                          className="opacity-20"
                        />
                        <div>
                          <p className="text-sm">No rolls yet</p>
                          <p className="text-xs">
                            Your roll history will appear here
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      {state.history.map((entry) => renderHistoryEntry(entry))}
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
