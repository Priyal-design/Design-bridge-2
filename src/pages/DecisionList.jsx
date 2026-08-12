import { useState, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { decisionById, projects, projectTeams } from "../data";
import { IconSearch, IconArrow, IconDecision, IconExternalLink } from "../components/Icons";

const STATUS_LIST = ["Completed", "Ongoing", "In preparation"];

export default function DecisionList() {
  const { projectId } = useParams();
  const project = projects.find((p) => p.id === projectId) || projects[0];
  const [query, setQuery] = useState("");

  const team = projectTeams[projectId] || [];

  const allDecisions = useMemo(() => Object.values(decisionById), []);

  const filtered = useMemo(() => {
    if (!query.trim()) return allDecisions;
    const q = query.toLowerCase();
    return allDecisions.filter(
      (d) =>
        d.id.toLowerCase().includes(q) ||
        d.title.toLowerCase().includes(q) ||
        d.owner.toLowerCase().includes(q) ||
        (d.tags || []).some((t) => t.toLowerCase().includes(q))
    );
  }, [query, allDecisions]);

  const ownerAvatar = (name) => {
    const m = team.find((t) => t.name === name || name.startsWith(t.name.split(" ")[0]));
    if (!m) {
      const parts = name.split(" ");
      return { ini: parts.map((n) => n[0]).join(""), color: "var(--accent)" };
    }
    return { ini: m.ini, color: m.color };
  };

  return (
    <div className="page">
      <div className="page-head">
        <Link
          to={`/projects/${projectId}`}
          className="faint"
          style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}
        >
          ← Back to {project.name}
        </Link>
        <h2>Decision Library</h2>
        <p style={{ marginTop: 8 }}>{allDecisions.length} decisions across {project.name}</p>
      </div>

      <div className="card" style={{ padding: 0, overflow: "hidden" }}>
        <div
          className="row"
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 20px",
            borderBottom: "1px solid var(--border)",
          }}
        >
          <div style={{ width: 20, height: 20, color: "var(--text-faint)", flex: "none" }}>
            <IconSearch />
          </div>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by ID, title, owner, or tag…"
            style={{
              flex: 1,
              border: "none",
              outline: "none",
              background: "none",
              fontSize: 14,
              color: "var(--text)",
              fontFamily: "inherit",
            }}
          />
          <span className="faint" style={{ fontSize: 13, whiteSpace: "nowrap" }}>
            {filtered.length} of {allDecisions.length}
          </span>
        </div>

        <div style={{ overflowX: "auto" }}>
          <table className="dl-table">
            <thead>
              <tr>
                <th>Decision</th>
                <th>Created</th>
                <th>Creator</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((d, i) => {
                const av = ownerAvatar(d.owner);
                const status = STATUS_LIST[i % STATUS_LIST.length];
                return (
                  <tr key={d.id} className="dl-rich-row">
                    <td className="dl-decision-cell">
                      <div className="dl-decision-title">{d.title}</div>
                      <p className="dl-decision-summary">{d.summary}</p>
                      <div className="dl-meta-row">
                        {(d.tags || []).slice(0, 4).map((tag) => <span key={tag} className="dl-tag">{tag}</span>)}
                        <span className="dl-meta-pill">Impact: {d.impact}</span>
                        <span className="dl-meta-pill">Confidence: {d.confidence}%</span>
                      </div>
                    </td>
                    <td className="dl-sprint-cell">
                      <strong>{d.created}</strong>
                    </td>
                    <td>
                      <div className="dl-creator">
                        <div
                          className="avatar"
                          style={{ width: 34, height: 34, fontSize: 11, background: av.color }}
                          title={d.owner}
                        >
                          {av.ini}
                        </div>
                        <div>
                          <div className="dl-creator-name">{d.owner}</div>
                          <div className="dl-creator-role">Creator</div>
                        </div>
                      </div>
                    </td>
                    <td>
                      <span
                        style={{
                          width: 20,
                          height: 20,
                          display: "grid",
                          placeItems: "center",
                          color: "var(--text-faint)",
                        }}
                      >
                        <IconArrow />
                      </span>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={4} style={{ textAlign: "center", padding: 40, color: "var(--text-faint)" }}>
                    No decisions match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
