import { useState } from "react";
import { Link } from "react-router-dom";
import { projects, departmentColors, statusBadge } from "../data";
import { IconSearch } from "../components/Icons";

const filters = ["All", "Finance", "Microscopy", "Photography", "Medical", "Research", "Active", "Completed", "Favorites"];

export default function KnowledgeHub() {
  const [active, setActive] = useState("All");
  const [q, setQ] = useState("");

  const filtered = projects.filter((p) => {
    if (q && !p.name.toLowerCase().includes(q.toLowerCase())) return false;
    if (active === "All") return true;
    if (active === "Favorites") return p.favorite;
    if (active === "Active") return p.status === "Active" || p.status === "In Development";
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

      <div className="project-grid">
        {filtered.map((p) => {
          const color = departmentColors[p.department];
          return (
            <Link key={p.id} to={`/projects/${p.id}`} className="card card-hover">
              <div className="proj-card-top">
                <div>
                  <div className="proj-name">
                    {p.favorite && <span style={{ color: "var(--yellow)" }}>⭐</span>}
                    {p.name}
                  </div>
                  <div className="badge" style={{ marginTop: 8, background: `${color}22`, color }}>
                    <span className="dot" style={{ background: color }} />{p.department}
                  </div>
                </div>
                <span className={"badge " + statusBadge[p.status]}>{p.status}</span>
              </div>

              <div className="proj-meta">
                <div>
                  <div className="m-l">Accessibility</div>
                  <div className="m-v" style={{ color: "var(--green)" }}>{p.accessibility}</div>
                </div>
                <div>
                  <div className="m-l">Coverage</div>
                  <div className="m-v" style={{ color: "var(--accent)" }}>{p.coverage}%</div>
                </div>
                <div>
                  <div className="m-l">Updated</div>
                  <div className="m-v" style={{ fontSize: 13 }}>{p.updated}</div>
                </div>
              </div>

              {p.owner && (
                <div className="faint" style={{ fontSize: 12.5, marginBottom: 12 }}>
                  Owner: <span className="muted">{p.owner}</span>
                </div>
              )}

              <div className="proj-stats">
                <span>🔬 <strong style={{ color: "var(--text)" }}>{p.research}</strong> Research</span>
                <span>🧭 <strong style={{ color: "var(--text)" }}>{p.decisions}</strong> Decisions</span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
