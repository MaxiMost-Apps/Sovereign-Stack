# 🩻 SPECIFICATION: THE BODY HUD (TITAN V1)

## 1. THE OBJECTIVE
To visualize "Hidden Data." The user should not read a spreadsheet to know they are under-recovered. They should see a red glow on their avatar's legs.
* **Metaphor:** The "Damage Report" in a mech suit or sci-fi cockpit.
* **Goal:** Instant comprehension of physical state.

## 2. THE VISUAL COMPONENT
* **Library:** `react-three-fiber` (3D) or High-Fidelity SVG.
* **The Avatar:** A wireframe humanoid model (The "Sovereign").
* **Default State:** "Ghost Blue" (`#1e293b` wireframe opacity 50%).

## 3. DATA MAPPING (THE "PAIN MAP")
The HUD ingests data from `telemetry_logs` and `biometric_data` to color-code body zones.

### Zone A: Central Nervous System (Head/Spine)
* **Input:** HRV (Heart Rate Variability) + Sleep Score.
* **Logic:**
    * High HRV (>50ms) = **Green/Cyan Glow** (Ready).
    * Low HRV (<30ms) = **Amber Pulse** (Strain).
    * Poor Sleep (<6h) = **Red Glitch** (Cognitive Decline).

### Zone B: Musculoskeletal (Legs/Arms)
* **Input:** Step Count + Workout Volume (Habit Logs).
* **Logic:**
    * High Volume (Leg Day) = **Red/Orange Glow** on Quads (Soreness/Recovery).
    * Inactivity (>8h sedentary) = **Grey/Dim** (Atrophy warning).

### Zone C: The Core (Torso)
* **Input:** Nutrition Habits (Macros/Water).
* **Logic:**
    * Fasting Protocol Active = **Blue/White Core** (Clean burn).
    * "The Poison" (Alcohol/Sugar) detected = **Purple Haze** (Toxicity).

## 4. INTERACTION
* **Hover:** Hovering over a zone (e.g., Head) opens a "Diagnostics" tooltip with the raw numbers (e.g., "HRV: 32ms - Sympathetic Overdrive").
* **Click:** Clicking a red zone creates a "Recovery Protocol" task in the Dashboard (e.g., "Deploy Foam Roller").

## 5. TECHNICAL IMPLEMENTATION
* **State:** Managed by `useBiometrics.ts`.
* **Refresh:** Updates on dashboard load. No real-time animation loop required (save GPU).