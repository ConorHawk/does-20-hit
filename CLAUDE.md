# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- `npm run dev` - Start development server with Turbopack on http://localhost:3000
- `npm run build` - Build production bundle
- `npm run lint` - Run ESLint for code quality checks
- `npm install` - Install dependencies

## Architecture Overview

This is a Next.js 15.3.4 application using:
- **App Router** - All routes defined in the `app/` directory
- **React 19** - With Server Components as default
- **TypeScript** - Strict mode enabled
- **Tailwind CSS v4** - For styling with PostCSS
- **shadcn/ui** - Component library configured with "new-york" style

## Key Technical Details

- **Path Alias**: `@/*` imports resolve to the project root
- **Component Styling**: Use the `cn()` utility from `lib/utils.ts` for conditional classNames
- **shadcn/ui Components**: Install via `npx shadcn@latest add <component-name>`
- **Turbopack**: Development builds use Turbopack for faster HMR

## Project Structure

```
app/              # Next.js App Router pages and layouts
├── layout.tsx    # Root layout with html and body
├── page.tsx      # Home page component
└── globals.css   # Global styles and Tailwind directives

lib/              # Utility functions
└── utils.ts      # cn() utility for className merging

components/       # React components (to be added with shadcn/ui)
```

The project follows Next.js App Router conventions where each route is a folder with page.tsx, and layouts wrap their children automatically.