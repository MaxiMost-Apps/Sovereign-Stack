# 🧠 AI HANDSHAKE PROTOCOL

## 1. THE DUAL-BRAIN ARCHITECTURE
The system uses two levels of intelligence to optimize performance/cost.

### Level 1: The Static Brain (`staticBrain.ts`)
* **Type:** Deterministic Rule Engine (TypeScript).
* **Function:** Runs on the client/edge. Provides instant feedback.
* **Cost:** Zero.
* **Use Case:**
    * Streak calculation.
    * "The Mirror" basic responses.
    * Dashboard sorting logic.

### Level 2: The Orchestrator (LLM)
* **Type:** Large Language Model (Gemini/GPT).
* **Function:** Periodic deep analysis (Weekly Reviews).
* **Cost:** Token-based.
* **Use Case:**
    * "Coach Council" personality text generation.
    * Correlating Biometrics (Sleep) with Habits (Performance).
    * Generating "Triptych" Roasts in The Mirror.

## 2. DATA PRIVACY
* **Sanitization:** The AI never sees raw PII (Names, Emails).
* **Views:** The AI consumes data via `migrations_telemetry.sql`, which creates anonymized views of the user's performance.

## 3. THE FEEDBACK LOOP
1.  User performs action (Toggles Habit).
2.  `staticBrain` updates Streak instantly (Optimistic UI).
3.  Data logs to `telemetry_logs`.
4.  (Async) Orchestrator analyzes logs and updates `coach_message` in `profiles`.