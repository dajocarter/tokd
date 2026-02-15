# Tok'd

Tok'd is Untappd for weed. A mobile/web app built with Ionic React and Vite.

## Quick summary

- Framework: Ionic React (Ionic 8) + React 19
- Language: TypeScript
- Build: Vite
- Mobile: Capacitor
- Backend: Firebase (Auth / Firestore / Storage)

## Highlights

- Tab-based navigation using `IonTabs` + `react-router`
- Pages follow Ionic conventions (`IonPage`, `IonHeader`, `IonContent`)
- Theme variables in `src/theme/variables.css` for colors
- Auth abstraction in `src/context/AuthContext.tsx` (wired for Firebase Auth in this repo)
- Simple, responsive splash / auth screens and example assets

## Run locally

1. Install dependencies

```bash
npm install
```

2. Create a `.env.local` file at the project root with your Firebase values (optional, required if you want real Firebase auth):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=123456789
VITE_FIREBASE_APP_ID=1:123:web:abcdef
```

3. Start the dev server

```bash
npm run dev
```

4. Open `http://localhost:5173` in your browser or run via Capacitor for native builds after `npm run build`.

## Scripts

- `npm run dev` — start Vite dev server
- `npm run build` — TypeScript check + Vite build
- `npm run preview` — preview production build
- `npm run test.unit` — run unit tests (Vitest)
- `npm run test.e2e` — run Cypress e2e tests (expects dev server)
- `npm run lint` — run ESLint

## Project layout (important files)

- `src/App.tsx` — app root, routing and tab navigation
- `src/pages/` — page components (Tab1, Tab2, Tab3, Splash, Login, Signup)
- `src/components/` — reusable UI components
- `src/context/AuthContext.tsx` — authentication provider / hook
- `src/firebase.ts` — Firebase initialization (reads Vite env vars)
- `src/theme/variables.css` — Ionic theme variables
- `vite.config.ts` — Vite + Vitest configuration

## Notes for reviewers

- This is a demo project; authentication currently expects Firebase configuration but you can run the UI and flows locally without Firebase by stubbing or providing test credentials.
- The codebase follows Ionic conventions for pages and uses strict TypeScript settings.
- Styling uses the Ionic theme variables so colors and dark mode are easy to adjust.

## Tracker

### Day 0

- Initialize app
- Add Firebase for a realtime DB
- Create, style, and edit Splash for logged-out users
- Create signup and login pages
