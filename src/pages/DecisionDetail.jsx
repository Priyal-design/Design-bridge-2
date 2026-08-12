import { useParams, Link } from "react-router-dom";
import { decisionById, projects } from "../data";
import { IconCheck, IconClose, IconArrow } from "../components/Icons";

export default function DecisionDetail() {
  const { projectId, decisionId } = useParams();
  const project = projects.find((p) => p.id === projectId) || projects[0];
  const decision = decisionById[decisionId] || decisionById["DD-001"];

  if (!decision) {
    return (
      <div className="page" style={{ textAlign: "center", paddingTop: 80 }}>
        <h2>Decision not found</h2>
        <Link to={`/projects/${projectId}/decisions`} className="btn btn-ghost btn-sm mt16" style={{ display: "inline-flex" }}>
          ← Back to decisions
        </Link>
      </div>
    );
  }

  return (
    <div className="page" style={{ maxWidth: 1100 }}>
      <Link
        to={`/projects/${projectId}/decisions`}
        className="faint"
        style={{ fontSize: 13, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 12 }}
      >
        ← Back to decisions — {project.name}
      </Link>

      {/* Header */}
      <div className="page-head">
        <div className="row gap12 wrap" style={{ alignItems: "center", marginBottom: 12 }}>
          <span className="badge badge-violet">{decision.id}</span>
          <span className={"badge " + (decision.status === "Approved" ? "badge-green" : "badge-yellow")}>
            {decision.status}
          </span>
          <span className={"badge " + (decision.impact === "High" ? "badge-pink" : "badge-orange")}>
            {decision.impact} Impact
          </span>
          <span className="badge">{decision.sprint}</span>
        </div>
        <h2>{decision.title}</h2>
        <p className="muted" style={{ marginTop: 8, fontSize: 15 }}>
          {decision.summary}
        </p>
      </div>

      <div className="grid mb24" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Problem */}
        <div className="card">
          <div className="section-title">Problem</div>
          <p style={{ fontSize: 14.5, lineHeight: 1.65 }}>{decision.problem}</p>
        </div>

        {/* Context */}
        <div className="card">
          <div className="section-title">Context</div>
          <div className="col gap10">
            {decision.context.why && (
              <div>
                <div className="faint" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 3 }}>Why</div>
                <p style={{ fontSize: 14 }}>{decision.context.why}</p>
              </div>
            )}
            {decision.context.who && (
              <div>
                <div className="faint" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 3 }}>Who</div>
                <p style={{ fontSize: 14 }}>{decision.context.who}</p>
              </div>
            )}
            {decision.context.biz && (
              <div>
                <div className="faint" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 3 }}>Business</div>
                <p style={{ fontSize: 14 }}>{decision.context.biz}</p>
              </div>
            )}
            {decision.context.user && (
              <div>
                <div className="faint" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 3 }}>User</div>
                <p style={{ fontSize: 14 }}>{decision.context.user}</p>
              </div>
            )}
            {decision.context.tech && (
              <div>
                <div className="faint" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px", marginBottom: 3 }}>Tech</div>
                <p style={{ fontSize: 14 }}>{decision.context.tech}</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Alternatives */}
      <div className="section-title" style={{ marginTop: 8 }}>Alternatives Considered</div>
      <div className="grid mb24" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {decision.alternatives.map((a) => (
          <div key={a.name} className={"alt-card" + (a.selected ? " selected" : "")}>
            <div className="row between mb12" style={{ alignItems: "center" }}>
              <strong style={{ fontSize: 15 }}>{a.name}</strong>
              <span className={"badge " + (a.selected ? "badge-green" : "badge-gray")}>
                <span style={{ width: 13, height: 13, display: "inline-block", verticalAlign: "middle" }}>
                  {a.selected ? <IconCheck /> : <IconClose />}
                </span>
                {a.verdict}
              </span>
            </div>
            <div className="col gap6" style={{ fontSize: 13.5 }}>
              <div><span className="faint" style={{ fontWeight: 600 }}>Pros:</span> {a.pros}</div>
              <div><span className="faint" style={{ fontWeight: 600 }}>Cons:</span> {a.cons}</div>
              {a.reason && <div className="muted" style={{ fontSize: 13, marginTop: 4 }}>{a.reason}</div>}
            </div>
          </div>
        ))}
      </div>

      <div className="grid mb24" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Research */}
        <div className="card">
          <div className="section-title">Research</div>
          {decision.researchCards.map((r, i) => (
            <div key={i} className="mb16" style={{ padding: 14, borderRadius: "var(--radius-sm)", background: "var(--glass-subtle)", border: "1px solid var(--glass-border)" }}>
              <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 6 }}>{r.title}</div>
              <div className="row gap8 wrap mb6" style={{ fontSize: 12 }}>
                <span className="badge">{r.method}</span>
                <span className="badge">{r.participants} participants</span>
                <span className="badge" style={{ color: "var(--green)", fontWeight: 700 }}>{r.confidence}% confidence</span>
              </div>
              <p className="muted" style={{ fontSize: 13 }}>{r.findings}</p>
            </div>
          ))}
          {decision.research && (
            <div className="faint" style={{ fontSize: 12, marginTop: 8 }}>ID: {decision.research}</div>
          )}
        </div>

        {/* Evidence */}
        <div className="card">
          <div className="section-title">Evidence</div>
          {decision.evidenceCards.map((e, i) => (
            <div key={i} className="mb12" style={{ padding: 14, borderRadius: "var(--radius-sm)", background: "var(--glass-subtle)", border: "1px solid var(--glass-border)" }}>
              <div className="row gap8 wrap mb6">
                <span className="badge badge-blue" style={{ fontSize: 11 }}>{e.type}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{e.title}</div>
              <div className="faint" style={{ fontSize: 12, marginTop: 4 }}>{e.detail}</div>
            </div>
          ))}
          {decision.evidence && (
            <div className="faint" style={{ fontSize: 12, marginTop: 8 }}>ID: {decision.evidence}</div>
          )}
        </div>
      </div>

      {/* Guideline */}
      <div className="card mb24">
        <div className="section-title">Guideline</div>
        <p style={{ fontSize: 14.5, lineHeight: 1.6 }}>{decision.guideline}</p>
      </div>

      <div className="grid mb24" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Figma Files */}
        <div className="card">
          <div className="section-title">Figma Files</div>
          {decision.figmaFiles.map((f, i) => (
            <a
              key={i}
              href={f.url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 14px",
                borderRadius: "var(--radius-sm)",
                background: "var(--glass-subtle)",
                border: "1px solid var(--glass-border)",
                textDecoration: "none",
                color: "inherit",
                marginBottom: 8,
              }}
            >
              <span style={{ fontSize: 14, fontWeight: 600 }}>{f.name}</span>
              <span style={{ width: 16, height: 16, color: "var(--text-faint)", flex: "none" }}>
                <IconArrow />
              </span>
            </a>
          ))}
        </div>

        {/* Jira */}
        <div className="card">
          <div className="section-title">Jira</div>
          <div className="col gap10" style={{ fontSize: 14 }}>
            <div className="row between">
              <span className="faint">Epic</span>
              <span style={{ fontWeight: 600 }}>{decision.jira.epic}</span>
            </div>
            <div className="row between">
              <span className="faint">Sprint</span>
              <span className="badge badge-blue">{decision.jira.sprint}</span>
            </div>
            <div className="row between">
              <span className="faint">Developer</span>
              <span style={{ fontWeight: 600 }}>{decision.jira.developer}</span>
            </div>
            <div className="row between">
              <span className="faint">Status</span>
              <span className={"badge " + (decision.jira.status === "Done" ? "badge-green" : decision.jira.status === "In Progress" ? "badge-yellow" : "badge-gray")}>
                {decision.jira.status}
              </span>
            </div>
            <div className="row between">
              <span className="faint">Completed</span>
              <span style={{ fontWeight: 600 }}>{decision.jira.completion}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Outcome */}
      <div className="card mb24" style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.08), var(--bg-2))", borderColor: "rgba(52,211,153,0.25)" }}>
        <div className="section-title" style={{ color: "var(--green)" }}>Outcome</div>
        <div className="grid" style={{ gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))" }}>
          {decision.outcome.map((o) => (
            <div key={o.label} className="row gap10" style={{ alignItems: "center" }}>
              <span style={{ width: 22, height: 22, color: "var(--green)", flex: "none" }}>
                <IconCheck />
              </span>
              <div>
                <div className="faint" style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.6px" }}>{o.label}</div>
                <div className="row gap6" style={{ alignItems: "center", marginTop: 2 }}>
                  <span className="metric-from">{o.from}</span>
                  <span className="arrow" style={{ width: 12, height: 12, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <IconArrow />
                  </span>
                  <span className="metric-to">{o.to}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Summary */}
      <div className="card mb24">
        <div className="section-title">AI Summary</div>
        <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "var(--text-dim)" }}>{decision.aiSummary}</p>
      </div>

      <div className="grid mb24" style={{ gridTemplateColumns: "1fr 1fr" }}>
        {/* Related Decisions */}
        <div className="card">
          <div className="section-title">Related Decisions</div>
          {decision.relatedDecisions.length > 0 ? (
            <div className="col gap8">
              {decision.relatedDecisions.map((rid) => {
                const rd = decisionById[rid];
                if (!rd) return null;
                return (
                  <Link
                    key={rid}
                    to={`/projects/${projectId}/decisions/${rid}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "12px 14px",
                      borderRadius: "var(--radius-sm)",
                      background: "var(--glass-subtle)",
                      border: "1px solid var(--glass-border)",
                      textDecoration: "none",
                      color: "inherit",
                    }}
                  >
                    <div className="col gap4">
                      <div style={{ fontSize: 13, fontWeight: 600 }}>{rd.title}</div>
                      <div className="row gap6">
                        <span className="badge badge-violet" style={{ fontSize: 10, padding: "3px 8px" }}>{rid}</span>
                        <span className="faint" style={{ fontSize: 12 }}>{rd.impact} impact</span>
                      </div>
                    </div>
                    <span style={{ width: 16, height: 16, color: "var(--text-faint)", flex: "none" }}>
                      <IconArrow />
                    </span>
                  </Link>
                );
              })}
            </div>
          ) : (
            <p className="faint" style={{ fontSize: 14 }}>No related decisions.</p>
          )}
        </div>

        {/* Comments */}
        <div className="card">
          <div className="section-title">Comments</div>
          {decision.comments.length > 0 ? (
            decision.comments.map((c, i) => (
              <div
                key={i}
                className="row gap10"
                style={{
                  alignItems: "flex-start",
                  padding: "12px 0",
                  borderBottom: i < decision.comments.length - 1 ? "1px solid var(--border)" : "none",
                }}
              >
                <div
                  className="avatar"
                  style={{
                    width: 32,
                    height: 32,
                    fontSize: 12,
                    background: "var(--accent)",
                    flex: "none",
                  }}
                >
                  {c.who.split(" ").map((n) => n[0]).join("")}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700 }}>{c.who}</div>
                  <div className="muted" style={{ fontSize: 13 }}>{c.text}</div>
                </div>
              </div>
            ))
          ) : (
            <p className="faint" style={{ fontSize: 14 }}>No comments yet.</p>
          )}
        </div>
      </div>

      {/* Footer metadata */}
      <div className="card" style={{ padding: "16px 20px" }}>
        <div className="row between wrap gap12" style={{ fontSize: 13 }}>
          <div className="row gap16 wrap">
            <div><span className="faint">Owner:</span> <strong>{decision.owner}</strong></div>
            <div><span className="faint">Confidence:</span> <strong style={{ color: "var(--green)" }}>{decision.confidence}%</strong></div>
            <div><span className="faint">Created:</span> <strong>{decision.created}</strong></div>
            <div><span className="faint">Updated:</span> <strong>{decision.updated}</strong></div>
          </div>
          <div className="row gap6 wrap">
            {(decision.tags || []).map((t) => (
              <span key={t} className="tag" style={{ fontSize: 11, padding: "3px 10px" }}>{t}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
