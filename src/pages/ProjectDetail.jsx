import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  projects, projectMetrics, contributors, projectTeams, timeline, timelineActive,
  achievements, futureTasks, jira, statusBadge, departmentColors,
  figmaFiles, feedbackAnalysis, projectIssues, projectComments, usabilityVideos,
} from "../data";
import { IconArrow, IconPlay, IconDecision, IconGraph, IconRuler, IconGauge } from "../components/Icons";
import MagicWand from "../components/MagicWand";

// Donut chart for the Feedback Analysis card
function Donut({ segments, size = 156, stroke = 28 }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      {segments.map((seg) => {
        const len = (seg.value / total) * c;
        const el = (
          <circle key={seg.label} cx={size / 2} cy={size / 2} r={r} fill="none"
            stroke={seg.color} strokeWidth={stroke} strokeLinecap="butt"
            strokeDasharray={`${len} ${c - len}`} strokeDashoffset={-acc} />
        );
        acc += len;
        return el;
      })}
    </svg>
  );
}

// Stylised figma canvas preview (mock frames on a board)
function FigmaPreview({ frames, tint }) {
  return (
    <div className="figma-prev">
      {Array.from({ length: frames }).map((_, i) => (
        <div key={i} className="fp-frame">
          <div className="fp-bar" style={{ background: tint }} />
          <div className="fp-line w70" />
          <div className="fp-line w50" />
          <div className="fp-block" />
          <div className="fp-line w40" />
        </div>
      ))}
    </div>
  );
}

export default function ProjectDetail() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id) || projects[0];
  const color = departmentColors[project.department];
  const files = figmaFiles[id] || figmaFiles["fee-management"];

  const USAB_PREVIEW = 1;
  const [showAllUsab, setShowAllUsab] = useState(false);
  const visibleUsab = showAllUsab ? usabilityVideos : usabilityVideos.slice(0, USAB_PREVIEW);

  const [showFeedback, setShowFeedback] = useState(false);
  const team = projectTeams[id] || contributors;

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
            <MagicWand size={36} /> Ask about this project
          </Link>
        </div>
        <p className="muted mt16" style={{ fontSize: 14.5, maxWidth: 760 }}>{project.summary}</p>
      </div>

      {/* Knowledge stats */}
      <div className="pd-metric-grid mb24">
        <Link to={`/projects/${id}/decisions`} className="card card-hover" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", textDecoration: "none", color: "inherit" }}>
          <div className="row gap10" style={{ alignItems: "center" }}>
            <div style={{ width: 28, height: 28, color: "#007AFF" }}><IconDecision /></div>
            <div className="section-title" style={{ margin: 0 }}>Decisions</div>
          </div>
          <div className="kv" style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-head)" }}>{project.decisions}</div>
        </Link>
        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="row gap10" style={{ alignItems: "center" }}>
            <div style={{ width: 28, height: 28, color: "#AF52DE" }}><IconGraph /></div>
            <div className="section-title" style={{ margin: 0 }}>Research</div>
          </div>
          <div className="kv" style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-head)" }}>{project.research}</div>
        </div>
        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="row gap10" style={{ alignItems: "center" }}>
            <div style={{ width: 28, height: 28, color: "#FF9500" }}><IconRuler /></div>
            <div className="section-title" style={{ margin: 0 }}>Guidelines</div>
          </div>
          <div className="kv" style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-head)" }}>{project.guideline}</div>
        </div>
        <div className="card" style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div className="row gap10" style={{ alignItems: "center" }}>
            <div style={{ width: 28, height: 28, color: "#34C759" }}><IconGauge /></div>
            <div className="section-title" style={{ margin: 0 }}>Evidence</div>
          </div>
          <div className="kv" style={{ fontSize: 24, fontWeight: 700, fontFamily: "var(--font-head)" }}>{project.evidence}</div>
        </div>
      </div>

      {/* Three columns */}
      <div className="pd-grid mt24">
        {/* ---------- Left column ---------- */}
        <div className="col gap20">
          {/* Project Timeline */}
          <div className="card">
            <div className="section-title">Project Timeline</div>
            {timeline.map((step, i) => (
              <div key={step}>
                <div className="timeline-step">
                  <div className={"timeline-dot " + (i < timelineActive ? "done" : i === timelineActive ? "active" : "")}>
                    {i < timelineActive ? "✓" : i + 1}
                  </div>
                  <div>
                    <div style={{ fontSize: 14.5, fontWeight: 700 }}>{step}</div>
                    <div className="faint" style={{ fontSize: 12 }}>
                      {i < timelineActive ? "Completed" : i === timelineActive ? "In progress" : "Upcoming"}
                    </div>
                  </div>
                </div>
                {i < timeline.length - 1 && <div className="timeline-line" />}
              </div>
            ))}
          </div>

          {/* Achievements */}
          <div className="card">
            <div className="section-title">Achievements</div>
            {achievements.map((a) => (
              <div key={a} className="list-item">
                <span className="list-bullet" style={{ background: "var(--green)" }} />
                <span>{a}</span>
              </div>
            ))}
          </div>

          {/* Contributors */}
          <div className="card">
            <div className="section-title">Contributors</div>
            {team.map((c) => (
              <div key={c.name} className="contrib">
                <div className="avatar" style={{ background: c.color }}>
                  {c.name.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700 }}>{c.name}</div>
                  <div className="faint" style={{ fontSize: 12 }}>{c.role}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Jira Status */}
          <div className="card">
            <div className="section-title">Jira Status</div>
            <div className="faint" style={{ fontSize: 12 }}>Epic</div>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{jira.epic}</div>
            <div className="badge badge-blue mb16">Sprint {jira.sprint}</div>
            {jira.tasks.map((t) => (
              <div key={t.label} className="jira-task">
                <span className="jira-check" style={{
                  background: t.state === "done" ? "var(--green)" : t.state === "progress" ? "var(--yellow)" : "var(--panel-3)",
                  color: "#fff",
                  borderColor: t.state === "todo" ? "var(--border-2)" : "transparent",
                }}>{t.state === "done" ? "■" : t.state === "progress" ? "■" : ""}</span>
                <span className={t.state === "todo" ? "faint" : ""}>{t.label}</span>
              </div>
            ))}
          </div>

          {/* Future Tasks */}
          <div className="card">
            <div className="section-title">Future Tasks</div>
            {futureTasks.map((t) => (
              <div key={t} className="list-item">
                <span className="list-bullet" style={{ background: "var(--accent)" }} />
                <span>{t}</span>
              </div>
              ))}
          </div>
          </div>

        {/* ---------- Center column ---------- */}
        <div className="col gap20">
          {/* Figma File */}
          <div className="card">
            <div className="section-title">Figma File</div>
            {files.map((f) => (
              <a key={f.name} href={f.url} target="_blank" rel="noopener noreferrer" className="figma-file" style={{ textDecoration: "none", color: "inherit", display: "block" }}>
                <div className="row between" style={{ alignItems: "center", marginBottom: 12 }}>
                  <div style={{ fontSize: 16, fontWeight: 700 }}>{f.name}</div>
                  <span className={"badge " + f.badge}>{f.status}</span>
                </div>
                {f.image
                  ? <img src={f.image} alt={f.name} className="figma-img" />
                  : <FigmaPreview frames={f.frames} tint={f.tint} />}
              </a>
            ))}
            <div className="figma-metrics">
              <div className="section-title" style={{ marginBottom: 12 }}>V1 vs V2</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                {projectMetrics.map((m) => (
                  <div key={m.label}>
                    <div className="section-title" style={{ marginBottom: 2, fontSize: 10 }}>{m.label}</div>
                    <div style={{ display: "flex", alignItems: "center", gap: 6, fontWeight: 700 }}>
                      <span className="metric-from" style={{ fontSize: 14 }}>{m.from}</span>
                      <span className="arrow" style={{ width: 12, height: 12, color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}><IconArrow /></span>
                      <span className="metric-to" style={{ fontSize: 16 }}>{m.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Feedback Analysis */}
          <div className="card">
            <div className="section-title" style={{ margin: 0 }}>{feedbackAnalysis.eyebrow}</div>
            <div className="fa-body mt20">
              <div className="fa-chart">
                <Donut segments={feedbackAnalysis.segments} />
              </div>
              <div className="fa-legend">
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>{feedbackAnalysis.title}</div>
                <div className="muted" style={{ fontSize: 13, lineHeight: 1.55, marginBottom: 14 }}>{feedbackAnalysis.desc}</div>
                {feedbackAnalysis.segments.map((s) => (
                  <div key={s.label} className="fa-leg-row">
                    <span className="fa-leg-dot" style={{ background: s.color }} />
                    <span style={{ flex: 1 }}>{s.label}</span>
                    <strong>{s.value}</strong>
                  </div>
                ))}
              </div>
            </div>

            {showFeedback && (
              <div className="fa-more mt20">
                <div className="fa-more-stats">
                  <div><div className="faint" style={{ fontSize: 12 }}>Period</div><div style={{ fontWeight: 700 }}>{feedbackAnalysis.period}</div></div>
                  <div><div className="faint" style={{ fontSize: 12 }}>Responses</div><div style={{ fontWeight: 700 }}>{feedbackAnalysis.sample}</div></div>
                </div>

                <div className="faint mt16" style={{ fontSize: 12, fontWeight: 600 }}>Sentiment</div>
                <div className="fa-sentiment mt8">
                  {feedbackAnalysis.sentiment.map((s) => (
                    <span key={s.label} className="fa-sent-seg" style={{ flex: s.value, background: s.color }} title={`${s.label} ${s.value}%`} />
                  ))}
                </div>
                <div className="row gap12 mt8 wrap faint" style={{ fontSize: 12 }}>
                  {feedbackAnalysis.sentiment.map((s) => (
                    <span key={s.label} className="row gap6" style={{ alignItems: "center" }}>
                      <span className="fa-leg-dot" style={{ background: s.color }} />{s.label} {s.value}%
                    </span>
                  ))}
                </div>

                <div className="faint mt16" style={{ fontSize: 12, fontWeight: 600 }}>Key findings</div>
                {feedbackAnalysis.insights.map((t) => (
                  <div key={t} className="list-item">
                    <span className="list-bullet" style={{ background: "var(--accent)" }} />
                    <span style={{ fontSize: 13.5 }}>{t}</span>
                  </div>
                ))}
              </div>
            )}

            <button
              className="btn btn-ghost btn-sm mt20"
              style={{ margin: "20px auto 0", display: "flex" }}
              onClick={() => setShowFeedback((s) => !s)}
            >
              {showFeedback ? "Show less" : "Show more"}
            </button>
          </div>
        </div>

        {/* ---------- Right column ---------- */}
        <div className="col gap20">
          {/* Design Bridge AI */}
          <div className="card">
            <div className="row gap12 mb16" style={{ alignItems: "center" }}>
              <MagicWand size={42} />
              <div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>Design Bridge AI</div>
                <div className="faint" style={{ fontSize: 12 }}>Always on, always traceable</div>
              </div>
            </div>

            <div className="ai-bubble user mb12">Why was the CTA moved above the fold?</div>
            <div style={{ fontSize: 13.5, lineHeight: 1.6 }} className="muted">
              Users failed to notice the CTA in the previous location. Heatmaps and usability testing
              showed far higher visibility above the fold.
            </div>
            <div className="row gap8 mt12 wrap" style={{ alignItems: "center" }}>
              <span className="tag">Study #11</span>
              <span className="tag">Heatmaps</span>
            </div>
            <div className="mt8"><span className="badge badge-green" style={{ fontSize: 11 }}>94% confidence</span></div>
            <Link to="/chat" className="ai-fullconv mt16">Open full conversation →</Link>

            <div className="ai-input mt16">
              <input placeholder="Ask anything about this project…" />
              <button className="btn btn-primary btn-sm">
                <span style={{ width: 14, height: 14 }}><IconArrow /></span>
              </button>
            </div>

            <div className="faint mt16" style={{ fontSize: 12 }}>Suggested</div>
            <div className="col gap8 mt8">
              {["What did research conclude?", "Who owns the rollout?", "Show accessibility history"].map((s) => (
                <Link key={s} to="/chat" className="ai-suggest">{s}</Link>
              ))}
            </div>
          </div>

          {/* Issues */}
          <div className="card">
            <div className="section-title">Issues</div>
            {projectIssues.map((it, i) => (
              <div key={it.label} className={"issue-row" + (i < projectIssues.length - 1 ? " bordered" : "")}>
                <span className="issue-count">{it.count}</span>
                <span style={{ flex: 1, fontSize: 14 }}>{it.label}</span>
                <span className="issue-arrow" style={{ width: 16, height: 16 }}><IconArrow /></span>
              </div>
            ))}
          </div>

          {/* Comments */}
          <div className="card">
            <div className="section-title">Comments</div>
            {projectComments.map((c, i) => {
              const tm = team.find(t => t.name.startsWith(c.who));
              return (
                <div key={i} className={"comment-row" + (i < projectComments.length - 1 ? " bordered" : "")}>
                  <div className="avatar" style={{ background: tm?.color || c.color, width: 32, height: 32, fontSize: 12 }}>{tm?.ini || c.who[0]}</div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 700 }}>{c.who}</div>
                    <div className="muted" style={{ fontSize: 13 }}>{c.text}</div>
                  </div>
                  <span className="issue-arrow" style={{ width: 16, height: 16 }}><IconArrow /></span>
                </div>
              );
            })}
          </div>

          {/* Usability Testing */}
          <div className="card">
            <div className="section-title">Usability Testing</div>
            <div className="col" style={{ gap: 24 }}>
              {visibleUsab.map((v, i) => (
                <div key={i}>
                  <div className="usab-video" style={{ background: `url(${v.image}) center/cover no-repeat` }}>
                    <span className="usab-play"><span style={{ width: 16, height: 16 }}><IconPlay /></span></span>
                    <span className="usab-dur">{v.duration}</span>
                  </div>
                  <div className="usab-cap">
                    <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8 }}>{v.caption}</div>
                    <div className="row between" style={{ alignItems: "center" }}>
                      <div className="row" style={{ gap: 4 }}>
                        <span className="tag" style={{ fontSize: 11, padding: "3px 9px" }}>{v.tag}</span>
                        <span className="tag" style={{ fontSize: 11, padding: "3px 9px" }}>{v.tag2}</span>
                      </div>
                      <span className="stack-av" style={{ background: (team.find(c => c.name.startsWith(v.author)) || {}).color || "#888", width: 26, height: 26, fontSize: 10, marginLeft: 0 }}>
                        {v.author[0]}
                        <span className="av-tip">{v.author}</span>
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            {usabilityVideos.length > USAB_PREVIEW && (
              <button
                className="btn btn-ghost btn-sm"
                style={{ margin: "16px auto 0", display: "flex" }}
                onClick={() => setShowAllUsab((s) => !s)}
              >
                {showAllUsab ? "Show less" : `Show more (${usabilityVideos.length - USAB_PREVIEW})`}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
