'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

interface KbdProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  size?: 'xs' | 'sm' | 'md';
  compound?: boolean;
  tooltip?: string;
  active?: boolean;
  className?: string;
}

const sizeClasses = {
  xs: 'px-1 py-0.5 text-[10px]',
  sm: 'px-1.5 py-0.5 text-xs',
  md: 'px-2 py-1 text-sm',
};


function parseCompoundKeys(children: React.ReactNode): string[] {
  if (typeof children !== 'string') return [];
  
  // Handle special cases like "Q-W-E-R-T-Y-U-I-O"
  if (children.includes('-') && /^[A-Z](-[A-Z])+$/.test(children)) {
    return children.split('-');
  }
  
  // Handle compound keys with + separator
  if (children.includes('+')) {
    return children.split('+').map(k => k.trim());
  }
  
  // Handle compound keys with space separator
  if (children.includes(' ') && children.split(' ').every(part => part.length <= 3)) {
    return children.split(' ');
  }
  
  return [children];
}

function SingleKbd({ 
  children, 
  size = 'sm', 
  active, 
  className,
  ...props 
}: Omit<KbdProps, 'compound' | 'tooltip'>) {
  return (
    <kbd
      className={cn(
        'inline-flex items-center justify-center bg-background font-mono rounded border border-border shadow-sm',
        sizeClasses[size],
        active && 'bg-primary text-primary-foreground shadow-md',
        className
      )}
      {...props}
    >
      {children}
    </kbd>
  );
}

export function Kbd({ 
  children, 
  size = 'sm', 
  compound = false,
  tooltip,
  active,
  className,
  ...props 
}: KbdProps) {
  const content = React.useMemo(() => {
    if (!compound || typeof children !== 'string') {
      return <SingleKbd size={size} active={active} className={className} {...props}>{children}</SingleKbd>;
    }

    const keys = parseCompoundKeys(children);
    if (keys.length === 1) {
      return <SingleKbd size={size} active={active} className={className} {...props}>{children}</SingleKbd>;
    }

    return (
      <span className="inline-flex items-center gap-0.5">
        {keys.map((key, index) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="text-muted-foreground text-xs">+</span>}
            <SingleKbd size={size} active={active}>{key}</SingleKbd>
          </React.Fragment>
        ))}
      </span>
    );
  }, [children, compound, size, active, className, props]);

  if (!tooltip) {
    return content;
  }

  return (
    <TooltipProvider>
      <Tooltip delayDuration={300}>
        <TooltipTrigger asChild>
          {content}
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-xs">{tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}