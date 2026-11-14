# ApnaSahara (अपना सहारा) - Compassionate Eldercare Platform

> Dedicated in-person companion care, continuous medical vital monitoring, and guaranteed 24/7 emergency SOS coordination for aging parents in India.

ApnaSahara is a production-ready, responsive, full-stack Progressive Web Application (PWA) built with **React 18**, **TypeScript**, **Tailwind CSS**, and **Supabase / PostgreSQL**.

---

## 🌟 Architecture & Key Highlights

- **Dual-Engine Persistence**:
  - Connects out-of-the-box to live **Supabase PostgreSQL** via `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`.
  - Seamlessly falls back to an intelligent, reactive **Local-First Engine** stored in `localStorage` when no backend keys are provided. You can test and demonstrate all features immediately with complete persistence across browser reloads.
- **Dedicated Role-Based Web Portals**:
  1. **Public Website**: Hero, About, Services, How It Works, Pricing, Contact, Login & Register.
  2. **Family Web Portal**: Health vitals monitoring, live location radar, caregiver GPS tracking, SOS alert room, medication management, doctor appointment scheduling, post-visit reports, and subscription management.
  3. **Elderly Parent Portal**: Designed specifically for seniors with extra-large buttons, one-touch emergency SOS trigger with a 5-second cancel buffer, voice read-aloud assistant, mood check-ins, medication checklists, and family speed dial.
  4. **Caregiver Web Portal**: Task management, GPS check-in/out, turn-by-turn navigation to assigned homes, clinical vital documentation, and shift availability calendar.
  5. **Admin Operations Portal**: Real-time national SOS dispatch desk, caregiver verification queue, MRR subscription analytics, and platform configurations.
- **Progressive Web App (PWA)**:
  - Installable to desktop, Android, and iOS home screens.
  - Custom Web App Manifest (`manifest.webmanifest`) and Service Worker (`sw.js`).
  - Offline fallback page (`offline.html`) with explicit safety notices.
- **Accessibility for Seniors**:
  - Senior font scaling: Normal (A), Large (A+), Extra-Large (A++).
  - High-contrast mode toggle.
  - Text-to-Speech (TTS) voice readout powered by Web Speech API.
  - Audible emergency siren synthesized directly via Web Audio API.

---

## 🔑 Demo Accounts & Instant Role Switcher

You can test any role instantly using the **Floating Demo Role Switcher** at the bottom-left of the screen, or log in with these pre-seeded demo accounts:

| Portal Role | Demo Email | Password | Pre-seeded User Profile |
| :--- | :--- | :--- | :--- |
| **Family Member** | `family@apnasahara.com` | `password123` | **Rahul Sharma** (Son living in Bangalore) |
| **Elderly Parent** | `parent@apnasahara.com` | `password123` | **Shri Ramesh Sharma** (74y, Sector 62, Noida) |
| **Caregiver (Sahayak)**| `caregiver@apnasahara.com` | `password123` | **Priya Verma** (Verified GDA Nurse Attendant) |
| **Admin Operations** | `admin@apnasahara.com` | `password123` | **Dr. Ananya Roy** (Director of Care Operations) |

---

## 🗄️ Database Schema & Supabase Setup

The complete production PostgreSQL database schema is included in [`supabase/schema.sql`](./supabase/schema.sql).

### Tables Included:
1. `public.profiles`: User records linked to `auth.users` with role enforcement (`family`, `elder`, `caregiver`, `admin`).
2. `public.elders`: Elder profiles, medical conditions, safe-zone coordinates, battery levels, emergency contacts.
3. `public.caregivers`: Attendant certifications, rating, police verification status, current coordinates.
4. `public.health_metrics`: Continuous BP, pulse, blood glucose, SpO2, weight, and mood logs.
5. `public.medications`: Daily dosage schedules, time-of-day slots, adherence logs, refill thresholds.
6. `public.sos_alerts`: Real-time emergency beacon triggers, responder assignments, resolution logs.
7. `public.visits`: In-person companion visits, task checklists, vitals recorded, and feedback ratings.
8. `public.appointments`: Clinic consultations and door-to-door escort records.
9. `public.subscriptions`: Monthly care plans (`Basic`, `Comprehensive`, `Guardian`), billing cycles, quotas.
10. `public.assistance_requests`: Grocery, medicine, transport, and companion requests from elders.
11. `public.notifications`: Push & in-app notifications with unread counts.

### Running Migrations on Supabase:
1. Create a project at [supabase.com](https://supabase.com).
2. Go to **SQL Editor** in your Supabase dashboard.
3. Paste the contents of `supabase/schema.sql` and click **Run**.
4. Copy your **Project URL** and **Anon Public Key** from `Settings -> API`.
5. Add them to your `.env` file:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```

---

## 🚀 Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the local development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

3. Build for production:
   ```bash
   npm run build
   ```

---

## 🌐 Public Deployment Guide

### Deploying to Vercel
1. Push this repository to GitHub or GitLab.
2. Import the project in [Vercel](https://vercel.com).
3. The included `vercel.json` automatically handles SPA routing rewrites and PWA manifest headers.
4. (Optional) Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in Environment Variables.
5. Deploy!

### Deploying to Netlify
1. Import the repository in [Netlify](https://netlify.com).
2. The included `netlify.toml` handles routing redirects to `/index.html`.
3. Set build command to `npm run build` and publish directory to `dist`.
4. Deploy!

---

## ⚠️ Important Safety & Compliance Notice

> **Emergency Disclaimer**: ApnaSahara provides non-clinical companion eldercare, remote health monitoring, and emergency coordination. Background SOS delivery and live GPS tracking require active cellular or internet connectivity. Offline mode caches static resources but cannot guarantee emergency dispatch. In an acute medical emergency without connectivity, call **112** (National Emergency) or **108** (National Ambulance Service) directly from your phone.
