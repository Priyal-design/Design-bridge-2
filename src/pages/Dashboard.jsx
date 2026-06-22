import { Link } from "react-router-dom";
import { kpis, knowledgeGaps, activity, coverageChart } from "../data";
import { IconChat, IconAdd, IconHub, IconGraph } from "../components/Icons";

function Gauge({ value }) {
  const r = 84, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="gauge">
      <svg width="200" height="200" viewBox="0 0 200 200">
        <defs>
          <linearGradient id="ggrad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#34C759" />
            <stop offset="100%" stopColor="#10b981" />
          </linearGradient>
        </defs>
        <circle cx="100" cy="100" r={r} fill="none" stroke="var(--panel-3)" strokeWidth="14" />
        <circle cx="100" cy="100" r={r} fill="none" stroke="url(#ggrad)" strokeWidth="14"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off}
          style={{ transition: "stroke-dashoffset 1s ease" }} />
      </svg>
      <div className="gauge-label">
        <div>
          <div className="gauge-num">{value}%</div>
          <div className="badge badge-green" style={{ marginTop: 6 }}><span className="dot" style={{ background: "var(--green)" }} />Healthy</div>
        </div>
      </div>
    </div>
  );
}

const quickActions = [
  { label: "Ask Design Bridge", to: "/chat", icon: IconChat, color: "#007AFF" },
  { label: "Add Knowledge", to: "/add", icon: IconAdd, color: "#AF52DE" },
  { label: "Explore Projects", to: "/hub", icon: IconHub, color: "#FF9500" },
  { label: "Open Knowledge Graph", to: "/graph", icon: IconGraph, color: "#AF52DE" },
];

export default function Dashboard() {
  return (
    <div className="page">
      <div className="page-head">
        <h2>Welcome back, Priyal 👋</h2>
        <p>Here's the state of design knowledge across Jedi today.</p>
      </div>

      {/* KPI cards */}
      <div className="kpi-grid mb24">
        {kpis.map((k) => (
          <div key={k.label} className="kpi">
            <div className="kpi-glyph" style={{ background: `${k.color}22` }}>{k.glyph}</div>
            <div className="kpi-label">{k.label}</div>
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-trend">↑ {k.trend}</div>
          </div>
        ))}
      </div>

      <div className="dash-grid mb24">
        {/* Knowledge coverage chart */}
        <div className="card">
          <div className="row between mb16">
            <div className="section-title" style={{ margin: 0 }}>Knowledge Coverage by Department</div>
            <span className="badge badge-blue">Q2 2026</span>
          </div>
          <div className="barchart">
            {coverageChart.map((d, i) => (
              <div key={d.dept} className="bar-col">
                <div className="bar-visual" style={{ height: `${d.value}%`, animationDelay: `${i * 0.1}s` }}>
                  <span className="val">{d.value}%</span>
                </div>
                <div className="faint" style={{ fontSize: 13, fontWeight: 600 }}>{d.dept}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Health gauge */}
        <div className="card">
          <div className="section-title">Knowledge Health</div>
          <div className="gauge-wrap"><Gauge value={92} /></div>
          <p className="muted" style={{ textAlign: "center", fontSize: 13, marginTop: 10 }}>
            92% of projects have documented rationale, research, and metrics.
          </p>
        </div>
      </div>

      <div className="dash-grid mb24">
        {/* Activity feed */}
        <div className="card">
          <div className="section-title">Recent Activity</div>
          {activity.map((a, i) => (
            <div key={i} className="activity-item">
              <div className="activity-ic" style={{ background: `${a.color}22`, color: a.color }}>{a.icon}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14 }}><strong>{a.who}</strong> {a.action}</div>
                <div className="faint" style={{ fontSize: 12.5, marginTop: 2 }}>{a.time}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Knowledge gaps */}
        <div className="card">
          <div className="section-title">Knowledge Gaps</div>
          {knowledgeGaps.map((g) => (
            <div key={g.label} className="gap-row">
              <div className="gap-num" style={{ color: g.color }}>{g.value}</div>
              <div style={{ flex: 1, fontSize: 14 }} className="muted">{g.label}</div>
              <Link to="/hub" className="badge badge-gray">Review →</Link>
            </div>
          ))}
          <Link to="/add" className="btn btn-ghost btn-sm" style={{ marginTop: 16, width: "100%" }}>
            Close a gap →
          </Link>
        </div>
      </div>

      {/* Quick actions */}
      <div className="card">
        <div className="section-title">Quick Actions</div>
        <div className="quick-grid">
          {quickActions.map((q) => (
            <Link key={q.label} to={q.to} className="quick-btn">
              <span className="quick-ic" style={{ background: `${q.color}22`, color: q.color }}>
                <span style={{ width: 18, height: 18 }}><q.icon /></span>
              </span>
              {q.label}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
