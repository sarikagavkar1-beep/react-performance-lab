import { BarChart3, Clock3, Gauge, Package } from "lucide-react";

export default function Dashboard() {
  return (
    <section className="dashboard-panel">
      <div className="section-heading">
        <div>
          <p className="eyebrow">ON-DEMAND MODULE</p>
          <h2>Performance dashboard</h2>
        </div>
        <span className="status-pill">Lazy-loaded</span>
      </div>
      <div className="stats-grid">
        <div className="stat-card"><Gauge /><span>Rendering</span><strong>Profile it</strong></div>
        <div className="stat-card"><Package /><span>Dataset</span><strong>1,200 items</strong></div>
        <div className="stat-card"><Clock3 /><span>Measurement</span><strong>Before / after</strong></div>
        <div className="stat-card"><BarChart3 /><span>Goal</span><strong>Less wasted work</strong></div>
      </div>
      <p className="muted small">This panel is loaded only when opened, using React.lazy and Suspense.</p>
    </section>
  );
}