import { Link } from "react-router-dom";
import { onboarding } from "../data";
import { IconArrow } from "../components/Icons";

export default function Onboarding() {
  const o = onboarding;
  return (
    <div className="page">
      {/* Hero */}
      <div className="onb-hero mb24">
        <div className="badge badge-blue mb12">Onboarding</div>
        <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.8px" }}>Welcome, {o.name} 🚀</h2>
        <p className="muted mt12" style={{ fontSize: 15.5, maxWidth: 560 }}>
          Get up to speed on the projects that matter to you — everything the team knows, in one place.
        </p>
        <div className="row gap16 mt20 wrap">
          <div className="card" style={{ padding: "14px 20px" }}>
            <div className="faint" style={{ fontSize: 12 }}>Current Sprint</div>
            <div style={{ fontSize: 20, fontWeight: 800 }}>Sprint {o.sprint}</div>
          </div>
          <div className="card" style={{ padding: "14px 20px" }}>
            <div className="faint" style={{ fontSize: 12 }}>Goal</div>
            <div style={{ fontSize: 20, fontWeight: 800, color: "var(--accent)" }}>{o.goal}</div>
          </div>
        </div>
      </div>

      <div className="grid mb24" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Relevant projects */}
        <div className="card">
          <div className="section-title">Projects Relevant To You</div>
          <div className="col gap12">
            {o.relevantProjects.map((p) => (
              <Link key={p} to="/projects/fee-management" className="quick-btn">
                <span className="quick-ic" style={{ background: "rgba(139,92,246,0.18)", color: "var(--accent)" }}>📁</span>
                {p}
                <span className="faint" style={{ marginLeft: "auto", width: 16, height: 16 }}><IconArrow /></span>
              </Link>
            ))}
          </div>
        </div>

        {/* Who owns what */}
        <div className="card">
          <div className="section-title">Who Owns What</div>
          {o.owners.map((own) => (
            <div key={own.name} className="contrib">
              <div className="avatar" style={{ background: own.color }}>
                {own.name.split(" ").map((n) => n[0]).join("")}
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 14, fontWeight: 600 }}>{own.name}</div>
                <div className="faint" style={{ fontSize: 12 }}>{own.area}</div>
              </div>
              <span className="badge badge-gray">{own.area}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Relationship graph */}
      <div className="card mb24">
        <div className="section-title">Project Relationship Graph</div>
        <div className="relgraph">
          {o.relationshipGraph.map((n, i) => (
            <div key={n} className="row" style={{ alignItems: "center" }}>
              <div className="rel-node" style={i === 0 ? { background: "var(--accent)", color: "#fff" } : {}}>{n}</div>
              {i < o.relationshipGraph.length - 1 && <span className="rel-arrow">↔</span>}
            </div>
          ))}
        </div>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 1.3fr" }}>
        {/* Reading list */}
        <div className="card">
          <div className="section-title">What You Should Read</div>
          {o.reading.map((r, i) => (
            <Link key={r} to="/decisions/21" className="jira-task" style={{ display: "flex" }}>
              <span className="jira-check" style={{ background: "var(--panel-3)", color: "var(--accent)" }}>{i + 1}</span>
              <span>{r}</span>
            </Link>
          ))}
        </div>

        {/* 30-second summary */}
        <div className="card" style={{ background: "rgba(139,92,246,0.08)" }}>
          <div className="row gap10 mb12" style={{ alignItems: "center" }}>
            <div className="ai-orb-sm" />
            <div className="section-title" style={{ margin: 0 }}>30-Second Summary</div>
          </div>
          {o.summary.map((s, i) => (
            <div key={i} className="summary-line">
              <div className="summary-num">{i + 1}</div>
              <div style={{ fontSize: 14.5 }}>{s}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
