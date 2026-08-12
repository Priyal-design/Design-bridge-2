import { useState, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { projects, statusBadge, projectTeams, filterAndSortProjects, emptyProjectFilter } from "../data";
import { IconStar, IconArrow } from "../components/Icons";
import SearchBar from "../components/SearchBar";

const categories = ["All", "Finance", "Microscopy", "Photography", "Medical", "Favorites"];

function matchesCategory(p, c) {
  if (c === "All") return true;
  if (c === "Favorites") return p.favorite;
  return p.department === c;
}

export default function KnowledgeHub() {
  const [category, setCategory] = useState("All");
  const [filter, setFilter] = useState({ ...emptyProjectFilter });
  const [openTeam, setOpenTeam] = useState(null);
  const [favorites, setFavorites] = useState(() => new Set(projects.filter((p) => p.favorite).map((p) => p.id)));
  const [tagTip, setTagTip] = useState(null);
  const tipRef = useRef(null);

  const showTagTip = useCallback((e, text) => {
    const r = e.currentTarget.getBoundingClientRect();
    setTagTip({
      text,
      style: {
        position: "fixed",
        left: r.left + r.width / 2,
        top: r.top - 8,
        transform: "translate(-50%, -100%)",
      },
    });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const displayed = projects.map((p) => ({ ...p, favorite: favorites.has(p.id) }));
  const filtered = filterAndSortProjects(displayed, filter)
    .filter((p) => matchesCategory(p, category))
    .sort((a, b) => {
      if (a.favorite !== b.favorite) return a.favorite ? -1 : 1;
      if (a.id === "fee-management") return -1;
      if (b.id === "fee-management") return 1;
      return 0;
    });

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
          const label = p.status === "In Development" ? "In Preparation" : p.status === "Released" ? "Completed" : p.status;
          const team = projectTeams[p.id] || [];
          return (
            <Link key={p.id} to={p.id === "fee-management" ? `/projects/${p.id}/chapters` : `/projects/${p.id}`} className="card card-hover khub-card">
              <div className="khub-top">
                <div className="khub-title">
                  <button
                    type="button"
                    className={"star" + (p.favorite ? " on" : "")}
                    style={{ width: 22, height: 22, background: "none", border: "none", padding: 0, cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}
                    onClick={(e) => { e.preventDefault(); e.stopPropagation(); toggleFavorite(p.id); }}
                    aria-label={p.favorite ? "Unfavorite" : "Favorite"}
                  >
                    <IconStar />
                  </button>
                  {p.name}
                </div>
                <span className={"badge " + statusBadge[p.status]}>{label}</span>
              </div>

              <div className="khub-stats">
                <div><div className="kl">Decisions</div><div className="kv">{p.decisions}</div></div>
                <div><div className="kl">Research</div><div className="kv">{p.research}</div></div>
                <div><div className="kl">Guideline</div><div className="kv">{p.guideline}</div></div>
                <div><div className="kl">Evidence</div><div className="kv">{p.evidence}</div></div>
              </div>

              <p className="khub-desc">{p.summary}</p>

              {p.tags && p.tags.length > 0 && (
                <div className="khub-tags">
                  {p.tags.slice(0, 3).map((t) => (
                    <span key={t} className="tag">{t}</span>
                  ))}
                  {p.tags.length > 3 && (
                    <span
                      className="tag tag-more"
                      onMouseEnter={(e) => showTagTip(e, p.tags.slice(3).join(", "))}
                      onMouseLeave={() => setTagTip(null)}
                    >
                      +{p.tags.length - 3}
                    </span>
                  )}
                </div>
              )}

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

      {tagTip && createPortal(
        <div className="tag-tip" style={tagTip.style} ref={tipRef}>
          {tagTip.text}
          <span className="tag-tip-arrow" />
        </div>,
        document.body
      )}
    </div>
  );
}
