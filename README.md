# React Performance Lab

A responsive React + Vite coursework project demonstrating:

- `React.memo` to allow unchanged product cards to skip parent-triggered renders.
- `useMemo` to cache product filtering/sorting until its dependencies change.
- `React.lazy` and `Suspense` to load the dashboard module only when requested.
- React `<Profiler>` to log render timings to the browser console.
- Search, category filtering, sorting, and a 1,200-item generated product dataset.

## Requirements

Install Node.js (LTS recommended) from https://nodejs.org/ and use VS Code or another editor.

## Run locally

Open this folder in VS Code. Open Terminal > New Terminal and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, usually `http://localhost:5173`.

Create a production build:

```bash
npm run build
npm run preview
```

## How to demonstrate the optimization

1. Open the app and open browser Developer Tools (F12).
2. Select Console. Search and filter products. Look for `[Profiler: ProductCatalog]` timing messages.
3. Open the lazy dashboard. In browser DevTools > Network, enable Disable cache and reload. Inspect JavaScript chunks; the dashboard is a separate dynamically imported module.
4. To compare behavior, temporarily remove `memo` from `ProductCard` or remove `useMemo` around `filteredProducts`, then repeat the same actions. Restore the optimized code afterward.
5. Use the React Developer Tools Profiler for a visual flamegraph and repeat measurements under comparable conditions.
6. For accurate production performance results, use a production profiling setup where needed. Development timings can differ, especially under Strict Mode.

Do not claim a specific percentage improvement unless you measured it on your machine. Record actual before-and-after values in the report template below.

## Suggested report measurements

| Measurement | Before | After |
|---|---|---|
| ProductCatalog `actualDuration` for the same interaction | Fill in your measurement | Fill in your measurement |
| Number of ProductCard renders during an unrelated parent update | Fill in your observation | Fill in your observation |
| Initial JavaScript bundle / chunks | Record from Network or build output | Record from Network or build output |
| Search and filter correctness | Pass/fail | Pass/fail |

## GitHub submission steps

1. Sign in at https://github.com/ and create a **public** repository named `react-performance-lab`.
2. In VS Code, open this project folder.
3. Open Terminal > New Terminal and run the commands below (replace the URL with your repository's actual URL):

```bash
git init
git add .
git commit -m "Add React performance optimization lab"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/react-performance-lab.git
git push -u origin main
```

4. Refresh the GitHub repository page and copy the URL from the address bar.
5. Submit that repository URL. A GitHub Pages deployment is not required for a source-code repository; use the README and screenshots or deploy separately if your instructor requires a live website.

If Git asks for identity, configure it once:

```bash
git config --global user.name "Your Name"
git config --global user.email "you@example.com"
```

## Assignment note

This is a sample application created for the assignment, not a third-party instructor-provided GitHub repository. If your instructor requires a specific sample, use that repository instead and adapt these techniques to it.
