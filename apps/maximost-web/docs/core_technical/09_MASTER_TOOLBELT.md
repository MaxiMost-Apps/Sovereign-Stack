# 🛠️ THE MASTER TOOLBELT (TECH STACK)

## 1. THE FORGE (FRONTEND)
* **Framework:** React 18 + Vite
* **Language:** TypeScript (Strict Mode)
* **Styling:** TailwindCSS
    * *Theme:* Titan Mission Control (Deep Navy `#0B1221`, Slate, Red/Blue Accents).
* **Icons:** Lucide React (`lucide-react`)
    * *Rule:* Use standardized icons defined in `sovereign_library.ts`.
* **Motion:** Framer Motion (`framer-motion`)
    * *Usage:* Page transitions and micro-interactions (hover states) only.
* **Drag & Drop:** `@dnd-kit/core`
* UI Feedback: Use sonner for all toast notifications. Never use alert().
* Data: Always use completed_at for logging timestamps.


## 2. THE ENGINE (BACKEND)
* **Runtime:** Node.js 22 (CommonJS)
* **Database:** Supabase (PostgreSQL 15)
* **ORM:** None. We use the raw Supabase JS Client (`@supabase/supabase-js`).
* **Validation:** Zod (`zod`)
    * *Usage:* Strict runtime validation for all Environment Variables.

## 3. THE INFRASTRUCTURE
* **Repo:** GitHub (Monorepo)
* **Frontend Host:** Vercel
* **Backend Host:** Render
* **AI Engine:** Google Gemini (Oracle)
* **Logic Engine:** `staticBrain.ts` (Client-side deterministic rules).

## 4. DEPRECATED TOOLS (DO NOT USE)
* **Redux / Zustand:** Not needed. State is managed via React Hooks + Supabase.
* **Axios:** Not needed. Use `fetch` or Supabase Client.
* **Moment.js:** Not needed. Use `date-fns`.