# PureSight Prototype 🌊✨

> A sleek, real‑time water‑quality dashboard built with **React** + **Vite**.

Live demo: https://pure-sight-proto-type.vercel.app/

---

## Tech Stack
- **Framework:** React 18
- **Bundler:** Vite
- **Styling:** Vanilla CSS + CSS variables (glass‑morphism, dark‑mode ready)


---

## Features
| Feature | Description |
|--------|-------------|
| **Live Safety Status** | Shows **SAFE**, **WARNING**, or **DANGER** with bold colors and emojis |
| **Metric Cards** | TDS, Turbidity, UV, Filter health, Temperature – each with health‑based color tokens |
| **Glass‑morphism UI** | Subtle frosted‑glass backgrounds, smooth micro‑animations, dark‑mode ready |
| **Simulated Data Hook** | `useSimulatedData` provides realistic streaming data for rapid prototyping |
| **Pure Functional Core** | `src/utils/statusLogic.js` contains pure, unit‑testable functions |
| **Responsive Layout** | Works on desktop, tablet, and mobile viewports |

---

## Getting Started
```bash
# Clone the repository
git clone https://github.com/Sarvan-Singh7/PureSight-ProtoType.git
cd PureSight-ProtoType/frontend

# Install exact dependencies
npm ci

# Run the development server
npm run dev   # → http://localhost:5173
```

*No environment variables are required for this prototype.*

---

## Contributing
1. Fork the repo.
2. Create a feature branch (`git checkout -b feat/your-feature`).
3. Commit using conventional messages (`feat: …`, `fix: …`).
4. Open a Pull Request – CI will lint, test, and preview‑deploy automatically.

---

## License
MIT © 2026 Sarvan Singh. Feel free to use, remix, and deploy this prototype.
