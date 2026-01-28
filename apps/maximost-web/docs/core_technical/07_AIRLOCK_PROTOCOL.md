# 🚀 THE AIRLOCK PROTOCOL (DEPLOYMENT)

## 1. PRE-FLIGHT CHECKLIST (MANUAL)
Before pushing to `main`, the Operator must verify:
* [ ] **No Loops:** Search for `setInterval` or `refetchInterval` in the codebase. If found, kill it.
* [ ] **No Squares:** Verify `DailyHabitRow.tsx` uses `rounded-full`.
* [ ] **Tabs Active:** Verify `DashboardSingularity.tsx` contains the "Day/Week/Month" switcher.

## 2. THE BUILD PIPELINE (AUTOMATED)
* **Vercel (Titan):** Deploys the Frontend.
    * *Command:* `npm run build`
    * *Output:* `./dist`
* **Render (Phoenix):** Deploys the Backend (API).
    * *Command:* `npm run build:server`
    * *Health Check:* `/health` endpoint must return 200 OK.

## 3. EMERGENCY VENT (ROLLBACK)
If a deployment introduces a regression (e.g., Infinite Loop):
1.  **Stop:** Do not push "fixes."
2.  **Revert:** Revert the commit in Git immediately.
3.  **Redeploy:** Push the previous stable state.
4.  **Debrief:** Log the failure in `99_AAR_LOG.md`.