import { useParams, Link } from "react-router-dom";
import {
  projects, projectMetrics, contributors, timeline, timelineActive,
  achievements, futureTasks, figmaComments, jira, statusBadge, departmentColors,
} from "../data";
import { IconSparkle, IconArrow } from "../components/Icons";

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id) || projects[0];
  const color = departmentColors[project.department];

  return (
    <div className="page">
      {/* Header */}
      <div className="card mb24" style={{ borderColor: "var(--border-2)" }}>
        <div className="row between wrap gap16">
          <div>
            <div className="row gap12" style={{ alignItems: "center" }}>
              <h2 style={{ fontSize: 26, fontWeight: 800, letterSpacing: "-0.6px" }}>{project.name}</h2>
              <span className={"badge " + statusBadge[project.status]}>{project.status}</span>
            </div>
            <div className="row gap16 mt12 wrap muted" style={{ fontSize: 13.5 }}>
              <span className="badge" style={{ background: `${color}22`, color }}>
                <span className="dot" style={{ background: color }} />{project.department} Department
              </span>
              <span>Sprint <strong style={{ color: "var(--text)" }}>{project.sprint}</strong></span>
              <span>Last Updated <strong style={{ color: "var(--text)" }}>{project.updated}</strong></span>
            </div>
          </div>
          <Link to="/chat" className="btn btn-primary">
            <span style={{ width: 16, height: 16 }}><IconSparkle /></span> Ask about this project
          </Link>
        </div>
        <p className="muted mt16" style={{ fontSize: 14.5, maxWidth: 760 }}>{project.summary}</p>
      </div>

      {/* Metrics */}
      <div className="pd-metric-grid">
        {projectMetrics.map((m) => (
          <div key={m.label} className="card">
            <div className="faint" style={{ fontSize: 12.5, fontWeight: 600 }}>{m.label}</div>
            <div className="metric-arrow mt12">
              <span className="metric-from">{m.from}</span>
              <span className="arrow" style={{ width: 18, height: 18 }}><IconArrow /></span>
              <span className="metric-to" style={{ color: m.inverse ? "var(--green)" : "var(--green)" }}>{m.to}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Three columns */}
      <div className="pd-grid mt24">
        {/* Left sidebar */}
        <div className="col gap20">
          <div className="card">
            <div className="section-title">Contributors</div>
            {contributors.map((c) => (
              <div key={c.name} className="contrib">
                <div className="avatar" style={{ background: c.color }}>
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 600 }}>{c.name}</div>
                  <div className="faint" style={{ fontSize: 12 }}>{c.role}</div>
                </div>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-title">Jira Status</div>
            <div className="faint" style={{ fontSize: 12 }}>Epic</div>
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4 }}>{jira.epic}</div>
            <div className="badge badge-blue mb12">Sprint {jira.sprint}</div>
            {jira.tasks.map((t) => (
              <div key={t.label} className="jira-task">
                <span className="jira-check" style={{
                  background: t.state === "done" ? "var(--green)" : t.state === "progress" ? "rgba(251,191,36,0.2)" : "var(--panel-3)",
                  color: t.state === "done" ? "#05231a" : t.state === "progress" ? "var(--yellow)" : "var(--text-faint)",
                }}>{t.state === "done" ? "✔" : t.state === "progress" ? "⏳" : ""}</span>
                <span className={t.state === "todo" ? "faint" : ""}>{t.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Center */}
        <div className="col gap20">
          <div className="card">
            <div className="section-title">Project Timeline</div>
            {timeline.map((step, i) => (
              <div key={step}>
                <div className="timeline-step">
                  <div className={"timeline-dot " + (i < timelineActive ? "done" : i === timelineActive ? "active" : "")}>
                    {i < timelineActive ? "✓" : i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 600 }}>{step}</div>
                    <div className="faint" style={{ fontSize: 12 }}>
                      {i < timelineActive ? "Completed" : i === timelineActive ? "In progress" : "Upcoming"}
                    </div>
                  </div>
                </div>
                {i < timeline.length - 1 && <div className="timeline-line" />}
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-title">Achievements</div>
            {achievements.map((a) => (
              <div key={a} className="list-item">
                <span className="list-bullet" style={{ background: "var(--green)" }} />
                <span>{a}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-title">Future Tasks</div>
            {futureTasks.map((t) => (
              <div key={t} className="list-item">
                <span className="list-bullet" style={{ background: "var(--accent)" }} />
                <span>{t}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div className="section-title">Figma Comments</div>
            {figmaComments.map((c, i) => (
              <div key={i} className="comment">
                <div className="avatar" style={{ background: c.color, width: 30, height: 30, fontSize: 11 }}>
                  {c.who[0]}
                </div>
                <div>
                  <div style={{ fontSize: 13, fontWeight: 600 }}>{c.who}</div>
                  <div className="muted" style={{ fontSize: 13.5 }}>{c.text}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right AI panel */}
        <div className="ai-panel">
          <div className="card">
            <div className="row gap12 mb16" style={{ alignItems: "center" }}>
              <div className="ai-orb-sm" />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Design Bridge AI</div>
                <div className="faint" style={{ fontSize: 12 }}>Always on, always traceable</div>
              </div>
            </div>

            <div className="col gap12">
              <div className="ai-bubble user">Why was the CTA moved above the fold?</div>
              <div className="ai-bubble">
                Users failed to notice the CTA in the previous location. Heatmaps and usability testing
                showed far higher visibility above the fold.
                <div className="row gap8 mt12 wrap">
                  <span className="tag">Study #11</span>
                  <span className="tag">Heatmaps</span>
                  <span className="badge badge-green" style={{ fontSize: 11 }}>94% confidence</span>
                </div>
                <Link to="/chat" className="btn btn-ghost btn-sm mt12" style={{ width: "100%" }}>
                  Open full conversation →
                </Link>
              </div>
            </div>

            <div className="ai-input">
              <input placeholder="Ask anything about this project…" />
              <button className="btn btn-primary btn-sm">
                <span style={{ width: 14, height: 14 }}><IconArrow /></span>
              </button>
            </div>

            <div className="faint mt16" style={{ fontSize: 12 }}>Suggested</div>
            <div className="col gap8 mt8">
              {["What did research conclude?", "Who owns the rollout?", "Show accessibility history"].map((s) => (
                <Link key={s} to="/chat" className="tag" style={{ display: "block", padding: "8px 10px" }}>{s}</Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
