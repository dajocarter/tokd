# Copilot Instructions for Tok'd

## Project Overview
**Tok'd** is an Ionic/React mobile application built with Vite, TypeScript, and Capacitor. It uses a tab-based navigation architecture with three main page sections (Tab1, Tab2, Tab3) powered by React Router.

### Key Technology Stack
- **UI Framework**: Ionic React 8.5.0 + React 19
- **Build Tool**: Vite 5.0 with TypeScript support
- **Mobile**: Capacitor 8.0 for native platform integration
- **Testing**: Vitest (unit), Cypress (e2e)
- **Code Quality**: ESLint with TypeScript support

---

## Architecture Patterns

### 1. **Component Structure**
All UI components follow Ionic's composable structure:
- Pages use `IonPage` wrapper with `IonHeader`, `IonToolbar`, and `IonContent`
- Components are functional React components with `.tsx` extension
- Styling is colocated (e.g., `Tab1.tsx` with `Tab1.css`)
- Layout examples: [src/pages/Tab1.tsx](src/pages/Tab1.tsx)

### 2. **Routing**
- Uses React Router v5 with Ionic's `IonReactRouter` wrapper
- Tab navigation managed by `IonTabs` + `IonTabButton` at root level
- Routes defined as exact paths (e.g., `/tab1`, `/tab2`, `/tab3`)
- See [src/App.tsx](src/App.tsx) for the routing setup

### 3. **Ionic CSS Architecture**
- Core Ionic styles imported in `App.tsx`
- Custom theme variables in [src/theme/variables.css](src/theme/variables.css)
- Dark mode configured to use system preference (`dark.system.css`)
- Optional CSS utilities available but mostly commented out

---

## Development Workflows

### Build & Dev Commands
```bash
npm run dev          # Start Vite dev server on http://localhost:5173
npm run build        # TypeScript check + Vite production build → dist/
npm run preview      # Preview production build locally
```

### Testing Commands
```bash
npm run test.unit    # Vitest (unit tests with jsdom environment)
npm run test.e2e     # Cypress (e2e tests, runs against http://localhost:5173)
npm run lint         # ESLint code quality checks
```

### Capacitor Mobile Development
- `capacitor.config.ts` points web output to `dist/` directory
- App ID: `io.ionic.starter` (update this for production)
- Native builds require Xcode/Android Studio after `ionic build`

---

## Code Conventions & Patterns

### TypeScript & JSX
- **Strict mode enabled** in `tsconfig.json`
- React functional components typed as `React.FC` or with explicit return type
- Default export pattern for page components
- JSX syntax: `jsx: react-jsx` (automatic JSX transform, no React import needed)

### Testing Strategy
- **Unit tests**: Use `@testing-library/react` with `render()` helper
- **Setup file**: [src/setupTests.ts](src/setupTests.ts) provides `matchMedia` mock for Ionic components
- **E2E tests**: Cypress with baseUrl pointing to dev server
- Example test: [src/App.test.tsx](src/App.test.tsx) (renders without crashing pattern)

### ESLint Rules
- React Hooks rules enforced
- Console/debugger allowed in dev, warned in production
- React Fast Refresh export validation
- Ignores: `dist/` and `cypress.config.ts`

---

## Key Files Reference
| File | Purpose |
|------|---------|
| [src/App.tsx](src/App.tsx) | Root component, routing, tab navigation |
| [src/pages/](src/pages/) | Page components (Tab1, Tab2, Tab3) |
| [src/components/](src/components/) | Reusable UI components |
| [src/theme/variables.css](src/theme/variables.css) | Ionic theme customization |
| [vite.config.ts](vite.config.ts) | Build configuration, Vitest settings |
| [eslint.config.js](eslint.config.js) | Linting rules |
| [capacitor.config.ts](capacitor.config.ts) | Native app configuration |

---

## Important Notes
1. **IonPage required**: All content must be wrapped in `IonPage` for proper layout
2. **cssModules not used**: Styles imported as globals; use CSS specificity or Ionic's component props
3. **No state management library**: Currently using React component state
4. **Browser APIs mocked**: `matchMedia` handled in setupTests for Ionic responsive features
5. **Legacy browser support**: `@vitejs/plugin-legacy` enables ES5 compatibility for older devices
