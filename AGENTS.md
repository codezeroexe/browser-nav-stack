<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Stack
- Next.js 16.2.4 (App Router, src/ dir)
- TypeScript, Tailwind CSS v4, Shadcn UI
- next-themes (dark mode), Inter font
- npm (not yarn/pnpm)

## Commands
- `npm run dev` — dev server
- `npm run build` — production build
- `npm run lint` — eslint
- No test framework configured

## Key Files
- `src/app/layout.tsx` — Inter font, ThemeProvider wrapper
- `src/app/page.tsx` — renders NavSimulator
- `src/components/NavSimulator.tsx` — main component (stack DS logic)
- `vercel.json` — Vercel deploy config (build to `.next`)

## Gotchas
- Tailwind v4 uses CSS `@import` + `@theme inline` (not v3 config file)
- Shadcn components in `src/components/ui/` — add via `npx shadcn@latest add <component>`
- Dark mode: next-themes with `suppressHydrationWarning` on `<html>`
- Vercel alias: `https://browser-nav-stack.vercel.app`
- Repo: `codezeroexe/browser-nav-stack` (GitHub)
