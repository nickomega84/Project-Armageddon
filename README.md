# 🌌 Project Armageddon: Multiverse Team Builder

![Status](https://img.shields.io/badge/Status-Deployed-00ff00?style=for-the-badge)
![Version](https://img.shields.io/badge/Version-1.0.0-blue?style=for-the-badge)
![Tech Stack](https://img.shields.io/badge/Tech-React_|_Supabase-red?style=for-the-badge)

## 📋 Mission Briefing
**Project Armageddon** is a Full-Stack, single-page application (SPA) engineered to manage a classified roster of Multiverse targets. It allows commanders to review elite profiles, execute database injections to recruit them to a secure Vault, and purge assets when they are no longer needed.

This project was built to demonstrate proficiency in seamless Frontend-to-Backend data pipelines without relying on heavy bundlers, utilizing a pure CDN-based React architecture.

## 🚀 Live Deployment
**[Access the Secure Vault Here]** *(Replace this text with your Netlify URL once deployed)*

## ⚙️ Core Architecture
* **Frontend Engine:** React 18 (Injected via CDN for zero-dependency local execution).
* **Compiler:** Babel Standalone (In-browser JSX translation).
* **Backend Database:** Supabase (PostgreSQL) handling real-time cloud storage.
* **Asset Delivery:** Supabase Cloud Storage Buckets (AWS S3 Architecture).
* **UI/UX:** Custom "Brightlight" CSS Grid with Optimistic UI state management.

## ⚔️ Tactical Features
- **The Roster (Read):** Dynamically maps a hardcoded array of high-value targets.
- **The Vault (Create & Read):** Executes asynchronous `fetch` protocols to pull live data from the Supabase cloud.
- **Cross-Referencing:** Prevents data duplication by scanning the cloud database on initial load and locking down recruitment protocols for already secured assets.
- **Discharge Protocol (Delete):** Allows the commander to purge specific rows from the PostgreSQL database, updating the UI instantly upon successful deletion.
- **Optimistic UI:** Buttons provide immediate visual feedback (Transmitting... / Secured) while awaiting database confirmation.

## 🛠️ Local Execution Protocol
To run this application on your local machine:

1. Clone or download this repository.
2. Ensure the folder contains `index.html`, `app.js`, and `style.css`.
3. Open `app.js` and input your authorized Supabase credentials:
   ```javascript
   const SUPABASE_URL = 'YOUR_PROJECT_URL';
   const SUPABASE_ANON_KEY = 'YOUR_PUBLIC_KEY';