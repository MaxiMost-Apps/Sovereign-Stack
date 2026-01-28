# 🔥 PHOENIX PROTOCOL (BACKEND)

**Status:** ACTIVE
**Role:** Data Ingestion, Sanitation, & Integrity.

---

## ⚡️ THE MISSION
The Phoenix Protocol is the "Bio-Rig" engine. It has two responsibilities:
1.  **Ingest:** Accept raw biometric data (Webhooks/API) from Oura, Terra, etc.
2.  **Sanitize:** Validate data against Zod schemas and store it in Supabase.

---

## 🛠️ THE TOOLBELT
* **Runtime:** Node.js 22 (CommonJS).
* **Framework:** Express / Node HTTP.
* **Database:** Supabase (PostgreSQL 15).
* **Validation:** Zod (`zod`).

---

## 🔐 SECURITY PROTOCOLS
1.  **The Airlock:** All incoming data is treated as "Radioactive" until validated.
2.  **Service Role:** This API uses the `SUPABASE_SERVICE_ROLE_KEY` to bypass RLS for ingestion. Use with extreme caution.
3.  **Strict Typing:** No `any`. All payloads must match the definitions in `docs/core_technical/04_DATA_SCHEMA.md`.

---

## 📂 DOCUMENTATION
Refer to the `docs/core_technical/` folder for the Law:
* **[02_ARCHITECTURE.md](./docs/core_technical/02_ARCHITECTURE.md)** - System Rules.
* **[04_DATA_SCHEMA.md](./docs/core_technical/04_DATA_SCHEMA.md)** - Database Structure.
* **[07_AIRLOCK_PROTOCOL.md](./docs/core_technical/07_AIRLOCK_PROTOCOL.md)** - Deployment Checklist.