import { useState } from "react";
import { Link } from "react-router-dom";
import { projects, statusBadge } from "../data";
import { IconSearch, IconStar, IconArrow } from "../components/Icons";

const filters = ["All", "Finance", "Microscopy", "Photography", "Medical", "Research", "Active", "Completed", "In Preparation", "Favorites"];

// avatar stacks per project (initials + colors)
const teams = {
  "fee-management": [["SL", "#007AFF"], ["AK", "#AF52DE"], ["KM", "#FF9500"]],
  "microscope-config": [["MV", "#FF9500"], ["DC", "#34C759"]],
  "photo-asset": [["LO", "#AF52DE"], ["PS", "#e056c8"], ["AK", "#007AFF"]],
  "patient-portal": [["AO", "#34C759"], ["GS", "#007AFF"]],
};

export default function KnowledgeHub() {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  const filtered = projects.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (active === "All") return true;
    if (active === "Favorites") return p.favorite;
    if (active === "Active") return p.status === "Active" || p.status === "In Development";
    if (active === "In Preparation") return p.status === "In Development";
    if (active === "Completed") return p.status === "Released";
    if (active === "Research") return p.status === "Research";
    return p.department === active;
  });

  return (
    <div className="page">
      <div className="page-head">
        <h2>Knowledge Hub</h2>
        <p>Browse every project's captured decisions, research, and metrics.</p>
      </div>

      <div className="topbar-search" style={{ maxWidth: "100%" }}>
        <span style={{ width: 16, height: 16, color: "var(--text-faint)" }}><IconSearch /></span>
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search projects, decisions, studies…" />
      </div>

      <div className="hub-filters">
        {filters.map((f) => (
          <button key={f} className={"chip" + (active === f ? " active" : "")} onClick={() => setActive(f)}>{f}</button>
        ))}
      </div>

      <div className="khub-grid">
        {filtered.map((p) => {
          const label = p.status === "In Development" ? "In Preparation" : p.status;
          return (
            <Link key={p.id} to={`/projects/${p.id}`} className="card card-hover khub-card">
              <div className="khub-top">
                <div className="khub-title">
                  <span className={"star" + (p.favorite ? " on" : "")} style={{ width: 18, height: 18 }}><IconStar /></span>
                  {p.name}
                </div>
                <span className={"badge " + statusBadge[p.status]}>{label}</span>
              </div>

              <div className="khub-stats">
                <div><div className="kl">Decisions</div><div className="kv">{p.decisions}</div></div>
                <div><div className="kl">Research</div><div className="kv">{p.research}</div></div>
                <div><div className="kl">Accessibility</div><div className="kv">{p.accessibility} <span className="kl" style={{ textTransform: "none" }}>score</span></div></div>
              </div>

              <p className="khub-desc">{p.summary}</p>

              <div className="avatar-stack">
                {(teams[p.id] || []).map(([ini, c], i) => (
                  <span key={i} className="stack-av" style={{ background: c, zIndex: 10 - i }}>{ini}</span>
                ))}
              </div>

              <div className="khub-foot">
                <span className="faint" style={{ fontSize: 12 }}>
                  Created by <b style={{ color: "var(--text-dim)" }}>Design system team</b> · {p.updated}
                </span>
                <span className="khub-link">Project {p.department} <span style={{ width: 14, height: 14 }}><IconArrow /></span></span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
