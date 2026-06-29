import { useState } from "react";
import { Link } from "react-router-dom";
import { projects, statusBadge, projectTeams, filterAndSortProjects, emptyProjectFilter } from "../data";
import { IconStar, IconArrow } from "../components/Icons";
import SearchBar from "../components/SearchBar";

const categories = ["All", "Finance", "Microscopy", "Photography", "Medical", "Research", "Active", "Completed", "In Preparation", "Favorites"];

function matchesCategory(p, c) {
  if (c === "All") return true;
  if (c === "Favorites") return p.favorite;
  if (c === "Active") return p.status === "Active" || p.status === "In Development";
  if (c === "In Preparation") return p.status === "In Development";
  if (c === "Completed") return p.status === "Released";
  if (c === "Research") return p.status === "Research";
  return p.department === c;
}

export default function KnowledgeHub() {
  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState({ ...emptyProjectFilter });
  const [openTeam, setOpenTeam] = useState(null); // project id whose contributor popover is open

  const filtered = filterAndSortProjects(projects, filter).filter((p) => matchesCategory(p, category));

  return (
    <div className="page">
      <div className="page-head">
        <h2>Knowledge Hub</h2>
        <p>Browse every project's captured decisions, research, and metrics.</p>
      </div>

      <SearchBar
        value={filter}
        onChange={setFilter}
        placeholder="Search projects, decisions, studies…"
        variant="page"
      />

      <div className="hub-filters">
        {categories.map((c) => (
          <button key={c} className={"chip" + (category === c ? " active" : "")} onClick={() => setCategory(c)}>{c}</button>
        ))}
      </div>

      <div className="khub-grid">
        {filtered.map((p) => {
          const label = p.status === "In Development" ? "In Preparation" : p.status;
          const team = projectTeams[p.id] || [];
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

              <div className="avatar-stack-wrap">
                <button
                  type="button"
                  className="avatar-stack"
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setOpenTeam(openTeam === p.id ? null : p.id); }}
                  aria-label="Show contributors"
                >
                  {team.map((m, i) => (
                    <span key={i} className="stack-av" style={{ background: m.color, zIndex: 10 - i }}>
                      {m.ini}
                      <span className="av-tip">{m.name}</span>
                    </span>
                  ))}
                </button>
                {openTeam === p.id && (
                  <div
                    className="team-pop"
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); }}
                  >
                    <div className="team-pop-title">Contributors</div>
                    {team.map((m, i) => (
                      <div key={i} className="team-pop-row">
                        <span className="stack-av" style={{ background: m.color, margin: 0 }}>{m.ini}</span>
                        <div>
                          <div className="team-pop-name">{m.name}</div>
                          <div className="team-pop-role">{m.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="khub-foot">
                <span className="khub-created">
                  Created By <b>{p.team || "Design system team"}</b> | {p.created}
                </span>
                <span className="khub-link">Project {p.department} <span style={{ width: 14, height: 14 }}><IconArrow /></span></span>
              </div>
            </Link>
          );
        })}

        {filtered.length === 0 && (
          <div className="khub-noresults">No projects match your search and filters.</div>
        )}
      </div>
    </div>
  );
}
