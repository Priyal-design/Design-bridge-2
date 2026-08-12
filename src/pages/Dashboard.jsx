import { useState } from "react";
import { Link } from "react-router-dom";
import { knowledgeGaps, activity, projects, statusBadge } from "../data";
import { IconHub, IconArrow, IconAdd, IconStar, IconDecision, IconGraph, IconProject, IconGauge } from "../components/Icons";

const activityIcons = {
  research: IconGraph,
  check: IconDecision,
  sprint: IconProject,
  chart: IconGauge,
  link: IconProject,
};

const activityColors = {
  research: "#AF52DE",
  check: "#007AFF",
  sprint: "#FF9500",
  chart: "#34C759",
  link: "#4C4AFA",
};
import KnowledgeStackedChart from "../components/KnowledgeStackedChart";

const quarters = ["Q1 2026", "Q2 2026", "Q3 2026"];

const quickActions = [
  { label: "Explore Projects", to: "/hub", icon: IconHub, color: "#007AFF", desc: "Browse every captured project" },
  { label: "Add Knowledge", to: "/add", icon: IconAdd, color: "#AF52DE", desc: "Capture a new decision, study or metric" },
];

export default function Dashboard() {
  const [quarter, setQuarter] = useState("Q2 2026");

  function QuarterFilter() {
    return (
      <div style={{
        display: "flex", alignItems: "center", gap: 4,
        background: "var(--panel-3)", borderRadius: "var(--radius-full)",
        padding: 4,
      }}>
        {quarters.map((q) => (
          <button
            key={q}
            onClick={() => setQuarter(q)}
            style={{
              padding: "6px 14px", borderRadius: "var(--radius-full)",
              border: "none", cursor: "pointer",
              fontSize: 12.5, fontWeight: 600,
              background: quarter === q ? "var(--glass-strong)" : "transparent",
              color: quarter === q ? "var(--text)" : "var(--text-faint)",
              transition: "all 0.2s ease",
            }}
          >
            {q}
          </button>
        ))}
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page-head">
        <h2>Welcome back, Priyal</h2>
        <p>Here's the state of design knowledge across teams today.</p>
      </div>

      {/* Knowledge distribution stack chart */}
      <div className="card mb24">
        <div className="row between mb8" style={{ alignItems: "center" }}>
          <div className="section-title" style={{ margin: 0 }}>Knowledge Distribution by Department</div>
          <QuarterFilter />
        </div>
        <KnowledgeStackedChart quarter={quarter} />
      </div>

      <div className="dash-grid mb24">
        {/* Activity feed */}
        <div className="card">
          <div className="section-title">Recent Activity</div>
          {activity.map((a, i) => (
            <div key={i} className="activity-item">
              <div className="activity-ic" style={{ color: activityColors[a.icon] }}>{(() => { const Ic = activityIcons[a.icon]; return Ic ? <Ic /> : a.icon; })()}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14 }}><strong>{a.who}</strong> {a.action}</div>
                <div className="faint" style={{ fontSize: 12.5, marginTop: 2 }}>{a.time}{a.dept ? ` | ${a.dept}` : ""}</div>
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

      {/* Favourites */}
      <div className="card mb24">
        <div className="row between mb16" style={{ alignItems: "center" }}>
          <div className="section-title" style={{ margin: 0 }}>Favourites</div>
          <Link to="/hub" className="khub-link">View all <span style={{ width: 14, height: 14 }}><IconArrow /></span></Link>
        </div>
        <div className="dash-proj-grid">
          {projects.filter((p) => p.favorite).slice(0, 3).map((p) => {
            const label = p.status === "In Development" ? "In Preparation" : p.status;
            return (
              <Link key={p.id} to={`/projects/${p.id}`} className="dash-proj card-hover">
                <div className="dash-proj-head">
                  <span className="dash-proj-star"><IconStar fill="currentColor" stroke="none" /></span>
                  <span className="dash-proj-name">{p.name}</span>
                </div>
                <span className={"badge " + statusBadge[p.status]} style={{ alignSelf: "flex-start", marginTop: 10 }}>{label}</span>
                <div className="dash-proj-stats">
                  <div><div className="kl">Decisions</div><div className="kv">{p.decisions}</div></div>
                  <div><div className="kl">Research</div><div className="kv">{p.research}</div></div>
                  <div><div className="kl">Guideline</div><div className="kv">{p.guideline}</div></div>
                  <div><div className="kl">Evidence</div><div className="kv">{p.evidence}</div></div>
                </div>
                {p.team && (
                  <div className="dash-proj-created">Created By <strong>{p.team}</strong> | {p.created}</div>
                )}
                <span className="khub-link" style={{ marginTop: 14 }}>Project {p.department} <span style={{ width: 14, height: 14 }}><IconArrow /></span></span>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Quick actions */}
      <div className="quick-grid">
        {quickActions.map((q) => (
          <Link key={q.label} to={q.to} className="quick-btn" style={{ padding: 22 }}>
            <span className="quick-ic" style={{ background: `${q.color}22`, color: q.color }}>
              <span style={{ width: 18, height: 18 }}><q.icon /></span>
            </span>
            <div>
              <div style={{ fontSize: 15 }}>{q.label}</div>
              <div className="faint" style={{ fontSize: 12.5, fontWeight: 500 }}>{q.desc}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
