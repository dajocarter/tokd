# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Vite dev server at http://localhost:5173
npm run build        # tsc + vite build
npm run lint         # ESLint
npm run test.unit    # Vitest (unit tests)
npm run test.e2e     # Cypress (requires dev server running)
```

Run a single unit test file:
```bash
npx vitest run src/components/forms/product/index.test.tsx
```

## Architecture

**Tok'd** is "Untappd for weed" — an Ionic React mobile/web app backed by Firebase.

### Auth flow (`src/App.tsx`)

`App` wraps everything in `IonReactRouter` → `AuthProvider` → `Routes`. The `Routes` component reads `{ user, loading }` from `useAuth()` and renders either:
- **Unauthenticated**: `/` (Splash), `/login`, `/signup`
- **Authenticated**: tabbed layout with `/activity`, `/discover`, `/account`

Routing is React Router v5 with Ionic's `IonRouterOutlet`.

### Auth abstraction (`src/context/AuthContext.tsx`)

`AuthProvider` wraps Firebase Auth and exposes `{ user, loading, signIn, signUp, signOut }` via `useAuth()`. `signIn`/`signUp` fall back to anonymous auth when no credentials are provided.

### Firebase (`src/firebase.ts`)

Exports `auth` (Firebase Auth) and `database` (Realtime Database). Configured via `VITE_FIREBASE_*` env vars in `.env.local`. Uses `getApps()` guard to avoid re-initialization.

### Pages & components

Pages live in `src/pages/<Name>/index.tsx` and follow Ionic conventions (`IonPage`, `IonHeader`, `IonContent`). Reusable forms are in `src/components/forms/` organized by domain: `brand/`, `product/`, `seshin/`. Unit tests (`.test.tsx`) and Cypress tests (`.cy.ts`) colocate with the component.

### Styling

`src/theme/variables.css` — Ionic CSS custom properties for the color palette. Dark mode uses `dark.system.css` (follows OS preference).
