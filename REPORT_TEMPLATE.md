# React Performance Optimization — Practical Report

**Student name:** ____________________  
**Class / roll number:** ____________________  
**Repository URL:** ____________________  
**Test date:** ____________________

## Objective
To examine React rendering performance and apply memoization and code splitting to reduce unnecessary work.

## Application
React Performance Lab is a product catalog containing 1,200 generated products. It supports text search, category filtering, sorting, and an on-demand dashboard.

## Techniques applied
1. `React.memo` wraps `ProductCard` so unchanged props can avoid parent-triggered re-renders.
2. `useMemo` caches filtered and sorted product results until `search`, `category`, or `sort` changes.
3. `React.lazy` and `Suspense` load `Dashboard.jsx` when the dashboard is opened.
4. `Profiler` logs actual and base rendering durations for the product catalog.

## Test method
1. Run `npm run dev`.
2. Open browser Developer Tools and record the same search/filter interactions.
3. Capture React Developer Tools Profiler results.
4. Temporarily remove one optimization at a time and repeat the interaction.
5. Restore optimized code and record the results below.

## Results

| Metric | Before | After |
|---|---|---|
| ProductCatalog actualDuration | __________ | __________ |
| ProductCard render observation | __________ | __________ |
| JavaScript loading / chunk observation | __________ | __________ |
| Functional tests | __________ | __________ |

## Discussion
Explain which change had the clearest measured effect. Mention the dataset, browser, and test conditions. If the difference was small, state that honestly; optimization should be guided by profiling rather than assumed.

## Conclusion
This project demonstrates how React memoization and code splitting can reduce repeated work or defer loading. Profiling and repeatable measurements are necessary to confirm whether an optimization improves the application.

## References
- https://react.dev/reference/react/memo
- https://react.dev/reference/react/useMemo
- https://react.dev/reference/react/lazy
- https://react.dev/reference/react/Suspense
- https://react.dev/reference/react/Profiler
