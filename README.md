# PureSight Prototype 🌊✨

> **PureSight** – a sleek, real‑time water‑quality dashboard built with **React** + **Vite**. Visualize sensor data, get instant safety status, and enjoy a premium glass‑morphism UI.

[![Vercel Deploy](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Sarvan-Singh7/PureSight-ProtoType.git&project-name=puresight-prototype&repo-name=PureSight-ProtoType)

Live demo: https://pure-sight-proto-type.vercel.app/

---

## 📋 Table of Contents

- [✨ Features](#-features)
- [🚀 Demo](#-demo)
- [🛠️ Tech Stack](#-tech-stack)
- [⚡ Getting Started](#-getting-started)
- [🔧 Development Workflow](#-development-workflow)
- [🧪 Testing](#-testing)
- [📦 Deployment](#-deployment)
- [🤝 Contributing](#-contributing)
- [📄 License](#-license)

---

## ✨ Features

| Feature | Description |
|--------|-------------|
| **Live Safety Status** | Shows **SAFE**, **WARNING**, or **DANGER** with bold colors and emojis. |
| **Metric Cards** | TDS, Turbidity, UV, Filter health, Temperature – each with health‑based color tokens. |
| **Glass‑morphism UI** | Subtle frosted‑glass backgrounds, smooth micro‑animations, and dark‑mode ready. |
| **Simulated Data Hook** | `useSimulatedData` provides realistic streaming data for rapid prototyping. |
| **Pure Functional Core** | `src/utils/statusLogic.js` contains pure functions, fully unit‑testable. |
| **Responsive Layout** | Works on desktop, tablet, and mobile viewports. |

---

## 🚀 Demo

Explore the live application here: **[PureSight Demo](https://pure-sight-proto-type.vercel.app/)**

---

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| **Framework** | React 18 |
| **Bundler** | Vite |
| **Styling** | Vanilla CSS + CSS variables |
| **Linting** | ESLint (OXC) |
| **Testing** | Vitest + React Testing Library |
| **Deployment** | Vercel (Git‑connected) |

---

## ⚡ Getting Started

> **Prerequisites**: Node ≥ 18, npm ≥ 9 (or `pnpm`/`yarn`).

```bash
# Clone the repository (already done for you)
git clone https://github.com/Sarvan-Singh7/PureSight-ProtoType.git
cd PureSight-ProtoType/frontend

# Install exact dependencies from lockfile
npm ci

# Start the development server
npm run dev
# → Open http://localhost:5173 in your browser
```

### Environment Variables

The current prototype does **not** require any env variables. If you later need to expose an API endpoint, create a `.env` file with the `VITE_` prefix (e.g., `VITE_API_URL=https://my.api`). Vite will inject those values at build time.

---

## 🔧 Development Workflow

| Command | Purpose |
|---------|---------|
| `npm run dev` | Starts Vite dev server with HMR |
| `npm run build` | Creates an optimized production bundle in `dist/` |
| `npm run lint` | Runs ESLint (add `-- --fix` to auto‑fix) |
| `npm test` | Runs Vitest unit tests |
| `npm run preview` | Serves the production build locally |

### Adding a New Component
1. Create `src/components/MyWidget.jsx` (and optional `.css`).
2. Export default component.
3. Import and use it in `src/App.jsx`.
4. Run `npm run lint && npm test` to keep the codebase clean.

---

## 🧪 Testing

```bash
npm test
```

Tests are located under `src/__tests__/`. The pure logic in `src/utils/statusLogic.js` is fully covered.

---

## 📦 Deployment

1. Click the **Vercel Deploy** button at the top of this README (or manually connect the repo in the Vercel dashboard).  
2. Vercel detects a Vite project and runs `npm ci && npm run build`.  
3. After the build finishes, Vercel provides a preview URL and a production URL (e.g., `https://pure-sight-proto-type.vercel.app`).

> **Pro tip:** Add any future `VITE_` environment variables in **Vercel → Settings → Environment Variables** – they are injected during the build.

---

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch (`git checkout -b feat/awesome-feature`).
3. Commit using conventional commits (`feat: …`, `fix: …`).
4. Open a Pull Request – CI will automatically lint, test, and preview‑deploy your changes.

Please review the `CODE_OF_CONDUCT.md` before contributing.

---

## 📄 License

MIT © 2026 Sarvan Singh. Feel free to use, remix, and deploy this prototype.
