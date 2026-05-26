<!-- Copilot / AI agent instructions for Showy-HRMS -->
# Showy-HRMS — Copilot Instructions
<!-- Copilot / AI agent instructions for Showy-HRMS -->
# Showy-HRMS — Copilot Instructions

Purpose: give an AI coding agent concise, actionable context to be productive in this repository.

- **Big picture**
  - This repo is primarily a static frontend (multiple standalone HTML pages at the repo root) with a tiny Node helper service for WhatsApp integration.
  - Frontend pages are plain HTML + vanilla JS; the backend is an external Google Apps Script (called via JSONP) plus an optional local Node Express service under `showy-whatsapp/`.

- **Key files**
  - [js/script.js](js/script.js#L1): primary client logic. Contains `API_URL` (Google Apps Script) and JSONP-style calls (script tag injection with `callback`).
  - [showy-whatsapp/server.js](showy-whatsapp/server.js#L1): Express app exposing `/` (health) and `/send-whatsapp`.
  - [showy-whatsapp/package.json](showy-whatsapp/package.json#L1): runtime deps (`express`, `axios`, `dotenv`, `cors`). No `start` script by default.
  - [css/style.css](css/style.css#L1) and `assets/`: shared styling and static assets used by pages.

- **Architecture & data flow (concrete)**
  - Frontend -> Google Apps Script: JSONP via injected `<script>` tags. Look for `API_URL` in `js/script.js` and the `callback` parameter usage.
  - Frontend persistence: `localStorage` (see `loginUser()` saving `employee` in `js/script.js`).
  - Optional local service: `showy-whatsapp/server.js` receives POSTs to `/send-whatsapp` and forwards messages (used when testing WhatsApp flows locally).

- **How to run & common commands**
  - Serve frontend statically to avoid file:// issues:

    npm install -g http-server
    cd /path/to/Showy-HRMS
    npx http-server .

  - Run WhatsApp helper locally:

    cd showy-whatsapp
    npm install
    node server.js

  - Test the local WhatsApp endpoint (example):

    curl -X POST http://localhost:3000/send-whatsapp \
      -H "Content-Type: application/json" \
      -d '{"phone":"918019951344","message":"Hello from SHOWY 🚀"}'

- **Project conventions / patterns**
  - No frontend build/bundler: keep edits minimal to existing HTML/JS; avoid adding a build system unless explicitly requested.
  - Network pattern: JSONP via dynamically injected `<script>` with a `callback` param — preserve this when extending API calls unless migrating all pages to a different approach.
  - State is client-side (no local DB): `localStorage` holds session/employee info; server state is external (Google Apps Script) or the optional local Express service.

- **Integration points & gotchas**
  - `API_URL` in [js/script.js](js/script.js#L1) is the single source for Google Apps Script calls; changing it requires updating all caller pages.
  - `showy-whatsapp` is CommonJS (Node). The frontend may call it during development; production WhatsApp integrations are typically external.
  - CORS: frontend uses JSONP to avoid CORS with Google Apps Script; if you change to fetch/XHR, you must handle CORS and update all pages.

- **Where to look for change impact**
  - Update `js/script.js` when changing auth or API URL; search HTML pages for script-based API calls.
  - Modify `showy-whatsapp/server.js` for local testing of WhatsApp flows; confirm port (`3000`) and JSON shape expected by `/send-whatsapp`.

- **When testing or reviewing PRs**
  - Run the static server, exercise the UI flows (login, dashboard, attendance) and watch DevTools for injected script calls.
  - For WhatsApp flows, run the local `showy-whatsapp` server and POST to `/send-whatsapp` to verify behavior.

- **If you need external context**
  - The Google Apps Script backend (the code behind `API_URL`) is not in this repo. Request the script project or its endpoint when backend changes are needed.

- **If you want improvements**
  - I can add `npm` scripts, a small README, or a tiny static-server script to make local testing easier. Tell me which you prefer.
