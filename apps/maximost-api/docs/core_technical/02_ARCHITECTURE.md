# 🏛️ SOVEREIGN STACK ARCHITECTURE (V2: PHOENIX + TITAN)

## 1. THE MONOREPO DOCTRINE
The system is divided into two sovereign domains that share a single repository.
* **Backend:** The Phoenix Protocol (Data Integrity).
* **Frontend:** The Titan Interface (Mission Control).

---

## 2. PHOENIX PROTOCOL (BACKEND STANDARDS)
*Objective: Hardened Data Integrity & "Bio-Rig" Integration.*

* **Environment:** Strict CommonJS. All core vars (`SUPABASE_KEYS`) must pass Zod Validation at runtime.
* **Auth:** "Enriched Profile" Middleware. Exposes a safe client to frontend; uses Service Role for background ops.
* **Telemetry:** Row Level Security (RLS) is active on all habit tables. `migrations_telemetry.sql` creates secure views for the AI Orchestrator.
* **The Airlock:** Protocols are hydrated with full v12 JSONB metadata during deployment.

---

## 3. TITAN INTERFACE (FRONTEND STANDARDS)
*Objective: "Mission Control" Dashboard. Zero Latency. High Contrast.*

### A. The Singularity (Entry Point)
* **Main Dashboard:** `src/core/DashboardSingularity.tsx` is the **ONLY** valid dashboard entry.
* **Legacy Ban:** `Dashboard.tsx` and `HabitList.tsx` are deprecated/illegal.

### B. Data Hygiene (The "Anti-Loop" Law)
* **Master Data:** `src/data/sovereign_library.ts` is the **STATIC** source of truth (60 Habits).
    * *Rule:* Never fetch habit definitions from DB. Only fetch *status*.
* **Hooks:**
    * `useLibrary.ts`: **MUST BE STATIC.** Returns array immediately. **NO FETCHING.**
    * `useHabits.ts`: **FETCH ONCE.** No polling intervals. Optimistic updates only.

### C. View Logic
The Dashboard supports three state-based views:
1.  **DAY:** Split View (Absolute Protocol vs Frequency Targets).
2.  **WEEK:** Matrix View (`WeeklyMatrix.tsx`).
3.  **MONTH:** Macro View (Placeholder).