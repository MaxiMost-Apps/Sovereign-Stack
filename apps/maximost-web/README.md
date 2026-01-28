# ⚡️ SOVEREIGN STACK (MONOREPO)

**Current Build:** Titan V1 (Frontend) + Phoenix V1 (Backend)
**Status:** ACTIVE DEPLOYMENT

---

## 🗺️ THE SYSTEM
This repository houses the complete Sovereign Stack ecosystem. It is divided into two strict domains:

### 1. TITAN INTERFACE (Frontend)
* **Location:** `client/src`
* **Core:** `DashboardSingularity.tsx` (The only valid dashboard).
* **Visuals:** "Titan Glass" aesthetic (Deep Navy, Circles, Red/Blue signals).
* **Law:** NO fetch loops. NO square buttons. Master data is static.

### 2. PHOENIX PROTOCOL (Backend)
* **Location:** `server/` (or `api/` depending on your specific structure)
* **Core:** "Bio-Rig" ingestion engine.
* **Security:** Strict Zod validation, RLS "Bio-Seals", Service Role middleware.
* **Law:** CommonJS environment.

---

## 📚 DOCUMENTATION (THE LAW)
Before writing code, you MUST review the Core Technical Standards in `docs/core_technical/`:

* **[00_GOVERNANCE.md](./docs/core_technical/00_GOVERNANCE.md)** - Project hierarchy & decision trees.
* **[01_VISION.md](./docs/core_technical/01_VISION.md)** - The "Why" (Sovereignty, Biometrics, AI).
* **[02_ARCHITECTURE.md](./docs/core_technical/02_ARCHITECTURE.md)** - **CRITICAL.** The technical constraints for Phoenix & Titan.
* **[03_DESIGN_SYSTEM.md](./docs/core_technical/03_DESIGN_SYSTEM.md)** - **CRITICAL.** Visual physics (Circles, Layouts, Colors).

---

## 🚀 QUICK START

### 1. Install Dependencies
```bash
npm install