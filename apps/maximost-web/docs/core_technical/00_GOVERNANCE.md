# ⚖️ GOVERNANCE & PROTOCOLS

## 1. THE CHAIN OF COMMAND
The Sovereign Stack operates under a strict hierarchy to prevent architectural drift.

* **COMMAND (User/Watchman):** The ultimate authority. Holds the vision and approves all deployments.
* **THE ARCHITECT (Oracle):** Responsible for high-level design, documentation updates, and schema definitions.
* **THE BUILDER (Jules/Vance):** Responsible for code execution.
    * *Rule:* The Builder DOES NOT invent architecture. The Builder executes the Architect's plans.

## 2. THE "DOCUMENTATION FIRST" PROTOCOL
Before writing any code, the Builder must:
1.  **Read:** `02_ARCHITECTURE.md` and `03_DESIGN_SYSTEM.md`.
2.  **Verify:** Check if the requested change violates a Forbidden Pattern (e.g., polling loops).
3.  **Execute:** Write the code only after validation.

## 3. DEPLOYMENT STANDARDS
* **Branching:**
    * `main`: Production-ready code only.
    * `dev`: Active development.
* **The "Stop Work" Authority:**
    * If a deployment causes a regression (e.g., Infinite Loop, Broken UI), all forward work stops.
    * The system reverts to the last known stable state immediately.
    * A "Root Cause Analysis" (RCA) is performed before coding resumes.

## 4. VERSIONING
* **TITAN (Frontend):** Current Version `v1.0.2` (Mission Control).
* **PHOENIX (Backend):** Current Version `v1.1.0` (Bio-Rig Integration).