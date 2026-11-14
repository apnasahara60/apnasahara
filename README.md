# ApnaSahara (अपना सहारा) - Compassionate Eldercare Platform

> Dedicated in-person companion care, continuous medical vital monitoring, and guaranteed 24/7 emergency SOS coordination for aging parents in India.

ApnaSahara is a production-ready, responsive, full-stack Progressive Web Application (PWA) built with **React 18**, **TypeScript**, **Tailwind CSS**, and **MongoDB / Express.js / Node.js**.

---

## 🌟 Architecture & Deployment Stack

- **Frontend**: **Vercel** (`React 18`, `TypeScript`, `Tailwind CSS`, `Vite`, `vercel.json` SPA routing configured).
- **Backend API**: **Render** (`Node.js`, `Express`, `Socket.IO` real-time websockets, `render.yaml` 1-click blueprint).
- **Database**: **MongoDB** (`Mongoose` schemas, indexes, and automated seeders for Atlas or local clusters).
- **Dual-Engine Persistence**:
  - Connects out-of-the-box to the **MongoDB Express API** via `VITE_API_URL` (e.g. `http://localhost:5000/api` or hosted Render URL).
  - Features an intelligent, reactive **Local-First Engine** stored in `localStorage` ensuring instant offline responsiveness, sub-millisecond local updates, and full PWA resilience across reloads.
- **Dedicated Role-Based Web Portals**:
  1. **Public Website**: Hero, About, Services, How It Works, Pricing, Contact, Login, Register, and Onboarding.
  2. **Family Web Portal**: Health vitals monitoring, live location radar, caregiver GPS tracking, SOS alert room, medication management, doctor appointment scheduling, post-visit reports, and subscription management.
  3. **Elderly Parent Portal**: Designed specifically for seniors with extra-large buttons, one-touch emergency SOS trigger with a 5-second cancel buffer, voice read-aloud assistant, mood check-ins, medication checklists, and family speed dial.
  4. **Caregiver Web Portal**: Task management, GPS check-in/out, turn-by-turn navigation to assigned homes, clinical vital documentation, and shift availability calendar.
  5. **Admin Operations Portal**: Real-time national SOS dispatch desk, caregiver verification queue, MRR subscription analytics, and platform configurations.
- **Interactive User Onboarding Flow**:
  - Automatically guides newly registered family users to input their loved one's details (name, age, city, medical conditions, medications, emergency numbers), establishing a live city bridge (e.g., `Bengaluru ↔ Indore`).
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
| **Family Member** | `family@apnasahara.com` | `password123` | **Rahul Sharma** (Son living in Bengaluru) |
| **Elderly Parent** | `parent@apnasahara.com` | `password123` | **Shri Ramesh Sharma** (74y, Indore, MP) |
| **Caregiver (Sahayak)**| `caregiver@apnasahara.com` | `password123` | **Priya Verma** (Verified GDA Nurse Attendant) |
| **Admin Operations** | `admin@apnasahara.com` | `password123` | **Dr. Ananya Roy** (Director of Care Operations) |

---

## 🍃 MongoDB Schema & Backend Setup

All MongoDB models and API routes are located in [`server/`](./server):

### Collections (Mongoose Models):
1. `User` (`server/src/models/User.ts`): User accounts (`family`, `elder`, `caregiver`, `admin`), bcrypt password hashes, city, and onboarding flags.
2. `Elder` (`server/src/models/Elder.ts`): Parent profiles, medical conditions, safe-zone coordinates, battery levels, emergency contacts.
3. `Caregiver` (`server/src/models/Caregiver.ts`): Attendant certifications, rating, police verification status, current coordinates.
4. `HealthMetric` (`server/src/models/HealthMetric.ts`): Continuous BP, pulse, blood glucose, SpO2, weight, and mood logs.
5. `Medication` (`server/src/models/Medication.ts`): Daily dosage schedules, time-of-day slots, adherence logs, refill thresholds.
6. `SosAlert` (`server/src/models/SosAlert.ts`): Real-time emergency beacon triggers, responder assignments, resolution logs.
7. `Visit` (`server/src/models/Visit.ts`): In-person companion visits, task checklists, vitals recorded, and feedback ratings.
8. `Appointment` (`server/src/models/Appointment.ts`): Clinic consultations and door-to-door escort records.
9. `Subscription` (`server/src/models/Subscription.ts`): Monthly care plans (`Basic`, `Comprehensive`, `Guardian`), billing cycles, quotas.
10. `Notification` (`server/src/models/Notification.ts`): In-app push notifications with unread counts.

### Running & Seeding MongoDB Locally:
```bash
# 1. Navigate to backend directory
cd server

# 2. Install backend dependencies
npm install

# 3. Seed MongoDB with demo accounts & records
npm run seed

# 4. Start backend server
npm run dev
```

The backend starts on `http://localhost:5000` with live Socket.IO connection and `/health` monitoring.

---

## 🚀 Running the Frontend

```bash
# In the root workspace:
npm install
npm run dev
```
Open `http://localhost:5173` in your browser.

To verify a production build:
```bash
npm run build
```

---

## 🌐 Deployment Instructions

### 1. Frontend on Vercel
1. Import repository on [Vercel](https://vercel.com).
2. Framework preset: **Vite**.
3. Build command: `npm run build`, output directory: `dist`.
4. Environment Variables:
   - `VITE_API_URL`: Your hosted Render backend URL (e.g. `https://apnasahara-backend.onrender.com/api`).
   - `VITE_SOCKET_URL`: Your hosted Render backend websocket URL (e.g. `https://apnasahara-backend.onrender.com`).
5. Deploy.

### 2. Backend on Render
1. Create a **Web Service** on [Render](https://render.com) or use the included `render.yaml`.
2. Root Directory: `server`.
3. Build Command: `npm install && npm run build`.
4. Start Command: `npm start`.
5. Environment Variables:
   - `MONGODB_URI`: Your MongoDB Atlas connection string (`mongodb+srv://<user>:<password>@cluster0.mongodb.net/apnasahara?retryWrites=true&w=majority`).
   - `JWT_SECRET`: Any secure random secret string.
   - `NODE_ENV`: `production`.
6. Deploy.

---

## ⚠️ Important Safety & Compliance Notice

> **Emergency Disclaimer**: ApnaSahara provides non-clinical companion eldercare, remote health monitoring, and emergency coordination. Background SOS delivery and live GPS tracking require active cellular or internet connectivity. Offline mode caches static resources but cannot guarantee emergency dispatch. In an acute medical emergency without connectivity, call **112** (National Emergency) or **108** (National Ambulance Service) directly from your phone.
