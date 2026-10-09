import { lazy, memo, Profiler, Suspense, useMemo, useState } from "react";
import { Activity, ArrowDownUp, CheckCircle2, Search, SlidersHorizontal, Zap } from "lucide-react";
import { products } from "./data.js";

const Dashboard = lazy(() => import("./Dashboard.jsx"));

const ProductCard = memo(function ProductCard({ product }) {
  return (
    <article className="product-card">
      <div className={`product-art art-${product.id % 5}`}>
        <span>{product.category}</span>
        <div className="product-symbol">{product.name.split(" ").map(word => word[0]).slice(0, 2).join("")}</div>
      </div>
      <div className="product-info">
        <div className="product-title-row">
          <h3>{product.name}</h3>
          <span className="rating">★ {product.rating}</span>
        </div>
        <p>{product.description}</p>
        <div className="product-bottom">
          <strong>₹{product.price.toLocaleString("en-IN")}</strong>
          <span className="category-tag">{product.category}</span>
        </div>
      </div>
    </article>
  );
});

function onProfileRender(id, phase, actualDuration, baseDuration) {
  console.info(`[Profiler: ${id}] phase=${phase}; actual=${actualDuration.toFixed(2)}ms; base=${baseDuration.toFixed(2)}ms`);
}

export default function App() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All categories");
  const [sort, setSort] = useState("default");
  const [showDashboard, setShowDashboard] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const [dark, setDark] = useState(false);

  const filteredProducts = useMemo(() => {
    const term = search.trim().toLowerCase();
    const result = products.filter(product => {
      const matchesText = product.name.toLowerCase().includes(term) ||
        product.description.toLowerCase().includes(term);
      const matchesCategory = category === "All categories" || product.category === category;
      return matchesText && matchesCategory;
    });
    if (sort === "price-low") result.sort((a, b) => a.price - b.price);
    if (sort === "price-high") result.sort((a, b) => b.price - a.price);
    if (sort === "name") result.sort((a, b) => a.name.localeCompare(b.name));
    return result;
  }, [search, category, sort]);

  const visibleProducts = showAll ? filteredProducts : filteredProducts.slice(0, 24);

  return (
    <main className={dark ? "app-shell dark" : "app-shell"}>
      <header className="topbar">
        <a className="brand" href="#" aria-label="React Performance Lab home">
          <span className="brand-mark"><Activity size={21} /></span>
          <span>React<span className="brand-light">Lab</span><small>PERFORMANCE STUDIO</small></span>
        </a>
        <nav><a href="#catalog">Catalog</a><a href="#method">Method</a></nav>
        <button className="button button-quiet" onClick={() => setDark(value => !value)}>
          {dark ? "Light mode" : "Dark mode"}
        </button>
      </header>

      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow"><span className="live-dot" /> HANDS-ON REACT WORKSHOP</span>
          <h1>Make every render<br /><span>earn its place.</span></h1>
          <p>Explore memoization, smarter filtering, and code splitting in a working product catalog. Profile it, change it, and see what React is doing.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#catalog">Explore catalog <ArrowDownUp size={16} /></a>
            <button className="button button-secondary" onClick={() => setShowDashboard(value => !value)}>
              {showDashboard ? "Hide dashboard" : "Open lazy dashboard"}
            </button>
          </div>
          <div className="hero-footnote"><CheckCircle2 size={16} /> React hooks · Profiler logs · Responsive layout</div>
        </div>
        <div className="hero-visual" aria-label="Illustration of a performance dashboard">
          <div className="orbit orbit-one"></div><div className="orbit orbit-two"></div>
          <div className="core"><Zap size={44} fill="currentColor" /></div>
          <div className="floating-card floating-top"><span className="mini-label">RENDER STRATEGY</span><strong>Measure → Optimize</strong><div className="mini-bars"><i></i><i></i><i></i><i></i><i></i><i></i><i></i></div></div>
          <div className="floating-card floating-bottom"><span className="pulse"></span><span>Memoized product cards</span><strong>Ready to profile</strong></div>
        </div>
      </section>

      <section className="principles" id="method">
        <div><span className="principle-number">01</span><div><strong>Cache useful work</strong><p>useMemo and React.memo</p></div></div>
        <div><span className="principle-number">02</span><div><strong>Load on demand</strong><p>React.lazy and Suspense</p></div></div>
        <div><span className="principle-number">03</span><div><strong>Measure the result</strong><p>React Profiler callback</p></div></div>
      </section>

      {showDashboard && (
        <Suspense fallback={<section className="dashboard-panel loading">Loading dashboard module…</section>}>
          <Dashboard />
        </Suspense>
      )}

      <section className="catalog-section" id="catalog">
        <div className="section-heading">
          <div><p className="eyebrow">THE TEST BENCH</p><h2>Product catalog</h2><p className="muted">A generated dataset of 1,200 products for testing search and rendering.</p></div>
          <div className="result-count"><strong>{filteredProducts.length.toLocaleString()}</strong><span>matching items</span></div>
        </div>
        <div className="filters">
          <label className="search-box"><Search size={18} /><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Search products…" aria-label="Search products" /></label>
          <label className="select-box"><SlidersHorizontal size={17} /><select value={category} onChange={event => setCategory(event.target.value)} aria-label="Filter by category"><option>All categories</option><option>Electronics</option><option>Home</option><option>Accessories</option><option>Fitness</option></select></label>
          <select className="sort-select" value={sort} onChange={event => setSort(event.target.value)} aria-label="Sort products"><option value="default">Sort: Recommended</option><option value="price-low">Price: Low to high</option><option value="price-high">Price: High to low</option><option value="name">Name: A to Z</option></select>
        </div>
        <Profiler id="ProductCatalog" onRender={onProfileRender}>
          <div className="product-grid">
            {visibleProducts.map(product => <ProductCard key={product.id} product={product} />)}
          </div>
        </Profiler>
        {filteredProducts.length === 0 && <div className="empty-state">No products match those filters. Try another search.</div>}
        {filteredProducts.length > 24 && <div className="load-more-wrap"><button className="button button-secondary" onClick={() => setShowAll(value => !value)}>{showAll ? "Show fewer products" : `Show all ${filteredProducts.length.toLocaleString()} products`}</button></div>}
      </section>

      <footer><div className="brand footer-brand"><span className="brand-mark"><Activity size={18} /></span><span>ReactLab<small>PERFORMANCE STUDIO</small></span></div><span>Learning project · Built with React + Vite</span></footer>
    </main>
  );
}