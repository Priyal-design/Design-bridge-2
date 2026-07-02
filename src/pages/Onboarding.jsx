import { useState } from "react";
import { Link } from "react-router-dom";
import { onboardingWorkspaces } from "../data";
import { IconArrow, IconCheck, IconProject, IconFigma, IconLock } from "../components/Icons";

const chips = [
  ["Current Sprint", "Sprint 14"],
  ["Assigned Role", "Product Designer"],
  ["Primary Team", "Core Experiences"],
];

const initials = (name) => name.replace(/^Dr\.\s*/, "").split(" ").map((n) => n[0]).join("").slice(0, 2);

const privateNotes = [
  { name: "CTA placement rationale", date: "12/03/26", status: "Draft", type: "Design Decision", links: "Figma, JIRA-2041" },
  { name: "Heatmap findings summary", date: "10/03/26", status: "Draft", type: "Research", links: "Notion, Slides" },
  { name: "Accessibility review notes", date: "08/03/26", status: "Draft", type: "Guideline", links: "Docs, Sheet" },
  { name: "Stakeholder feedback log", date: "05/03/26", status: "Draft", type: "Evidence", links: "Confluence" },
  { name: "Sprint 14 retro action items", date: "01/03/26", status: "Draft", type: "Documentation", links: "JIRA-2038" },
];

export default function Onboarding() {
  const [selected, setSelected] = useState(onboardingWorkspaces[0].name);
  const [notesOpen, setNotesOpen] = useState(false);
  const ws = onboardingWorkspaces.find((w) => w.name === selected) || onboardingWorkspaces[0];
  const { responsibilities, manager, deadlines, tasks, quickActions, updates } = ws;

  return (
    <div className="page">
      {/* Hero + Upcoming Meetings side by side */}
      <div className="onb-hero-row mb24">
        <div className="onb-hero">
          <div className="badge badge-blue mb12">Personalized for you</div>
          <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.8px" }}>My Space</h2>
          <p className="muted mt12" style={{ fontSize: 15.5, maxWidth: 600 }}>
            Your active projects, team updates, and shortcuts tailored for your workflow
          </p>
          <div className="onb-chips mt20">
            {chips.map(([k, v]) => (
              <div key={k} className="onb-chip"><span className="faint">{k}</span><b>{v}</b></div>
            ))}
            <Link to="/figma" className="onb-chip link"><span style={{ width: 14, height: 14 }}><IconFigma /></span> Figma Linked</Link>
          </div>
        </div>
        <div className="card onb-meetings">
          <div className="section-title">Upcoming Meetings</div>
          <div className="col gap12">
            <div className="meeting-row">
              <span className="meeting-dot" />
              <span style={{ fontWeight: 600, fontSize: 13.5 }}>Brainstorm</span>
              <span className="faint" style={{ fontSize: 12.5, marginLeft: "auto" }}>8 – 9 AM</span>
            </div>
            <div className="meeting-row">
              <span className="meeting-dot dashed" />
              <span style={{ fontWeight: 600, fontSize: 13.5 }}>Project overview</span>
              <span className="faint" style={{ fontSize: 12.5, marginLeft: "auto" }}>9 – 10 AM</span>
            </div>
            <div className="meeting-row">
              <span className="meeting-dot dashed" />
              <span style={{ fontWeight: 600, fontSize: 13.5 }}>Break</span>
              <span className="faint" style={{ fontSize: 12.5, marginLeft: "auto" }}>1 – 2 PM</span>
            </div>
          </div>
        </div>
      </div>

      {/* Projects tree + responsibilities + workspace — one unified card */}
      <div className="card onb-unify mb24">
        <div className="onb-panel">
          <div className="section-title">Projects Relevant To You</div>
          <div className="tree">
            {onboardingWorkspaces.map((node) => {
              const open = node.name === selected;
              return (
                <div key={node.name}>
                  <button
                    type="button"
                    className={"tree-item" + (open ? " active" : "")}
                    onClick={() => setSelected(node.name)}
                  >
                    <span style={{ width: 16, height: 16, color: "var(--accent)" }}><IconProject /></span>
                    <span style={{ fontWeight: 600, fontSize: 14 }}>{node.name}</span>
                  </button>
                  {open && node.children.map((c) => (
                    <div key={c} className="tree-sub">{c}</div>
                  ))}
                </div>
              );
            })}
          </div>
        </div>

        <div className="onb-panel">
          <div className="mb16">
            <div className="section-title" style={{ margin: 0 }}>Detailed Project Responsibilities</div>
            <div className="faint" style={{ fontSize: 12, marginTop: 2 }}>Dynamic for the selected project</div>
          </div>

          <div className="resp-folder">
            <span style={{ width: 20, height: 20, color: "var(--accent)" }}><IconProject /></span>
            <span style={{ fontWeight: 700, fontSize: 14, color: "var(--accent)" }}>{ws.name}</span>
            <Link to={`/projects/${ws.id}`} style={{ marginLeft: 4, width: 24, height: 24, display: "grid", placeItems: "center", color: "var(--accent)" }}><IconArrow /></Link>
          </div>

          <div className="resp-table">
            <div className="resp-head">
              <div>Sub-area</div><div>Category Owner</div><div>Design Manager / PM</div>
            </div>
            {responsibilities.map((r) => {
              const isManager = r.area === "Manager";
              return (
                <div key={r.area} className="resp-row">
                  <div className="row gap10">
                    <div className="avatar" style={{ width: 30, height: 30, background: r.color, fontSize: 11 }}>
                      {initials(r.owner)}
                    </div>
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13.5 }}>{r.area}</div>
                      <div className="faint" style={{ fontSize: 12 }}>{r.owner}</div>
                    </div>
                  </div>
                  <div><span className="badge badge-gray">{r.cat}</span></div>
                  <div className="muted" style={{ fontSize: 13.5 }}>
                    {isManager ? manager.role : `PM: ${manager.name}`}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Workspace card — deadlines/tasks + quick actions/updates */}
          <div className="onb-workspace-grid" style={{ marginTop: 20 }}>
            {/* Key deadlines + Your tasks */}
            <div className="onb-workspace-card">
              <div className="section-title" style={{ fontSize: 12 }}>Key Deadlines</div>
              <div className="col gap10 mb20">
                {deadlines.map((d) => (
                  <div key={d.t} className="work-row">
                    <div>
                      <div style={{ fontWeight: 600, fontSize: 13.5 }}>{d.t}</div>
                      <div className="faint" style={{ fontSize: 12 }}>Due · {d.due}</div>
                    </div>
                    <span className={"badge " + d.badge}>{d.state}</span>
                  </div>
                ))}
              </div>

              <div className="section-title" style={{ fontSize: 12 }}>Your Tasks</div>
              <div className="col gap10">
                {tasks.map((t) => (
                  <div key={t.t} className="work-row">
                    <div className="row gap10" style={{ alignItems: "center" }}>
                      <span className="task-check">{t.state === "Done" ? <IconCheck /> : ""}</span>
                      <span style={{ fontWeight: 600, fontSize: 13.5 }}>{t.t}</span>
                    </div>
                    <span className={"badge " + t.badge}>{t.state}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick actions & updates */}
            <div className="onb-workspace-card">
              <div className="section-title" style={{ fontSize: 12 }}>Quick Actions</div>
              <div className="col gap8 mb20">
                {quickActions.map((a) => (
                  <button key={a} className="work-action">{a} <span style={{ width: 14, height: 14 }}><IconArrow /></span></button>
                ))}
              </div>
              <div className="section-title" style={{ fontSize: 12 }}>Recent Updates</div>
              <div className="col gap0">
                {updates.map((u, i) => (
                  <div key={i} className="update-row">
                    <span className="update-dot" />
                    <div style={{ fontSize: 13 }}><b>{u.who}</b> {u.text} <span className="faint">· {u.time}</span></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Private Notes */}
      <div className="card mb24" style={{ overflow: "hidden" }}>
        <button
          onClick={() => setNotesOpen((o) => !o)}
          style={{
            display: "flex", alignItems: "center", gap: 10, width: "100%",
            padding: 0, border: "none", background: "none", cursor: "pointer",
            fontSize: 14, fontWeight: 600, color: "var(--text)",
          }}
        >
          <span style={{
            width: 36, height: 36, borderRadius: 10, flex: "none",
            display: "grid", placeItems: "center",
            background: "rgba(175, 82, 222, 0.15)", color: "#AF52DE",
          }}>
            <span style={{ width: 18, height: 18 }}><IconLock /></span>
          </span>
          <span>Private Notes</span>
          <span className="faint" style={{ marginLeft: "auto", fontSize: 12, transition: "transform 0.2s ease", transform: notesOpen ? "rotate(180deg)" : "none" }}>▼</span>
        </button>

        {notesOpen && (
          <div style={{ marginTop: 16, overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
              <thead>
                <tr style={{ borderBottom: "1px solid var(--border)", color: "var(--text-subtle)", fontWeight: 600 }}>
                  <th style={{ textAlign: "left", padding: "10px 12px" }}>Name of Note</th>
                  <th style={{ textAlign: "left", padding: "10px 12px" }}>Date of Creation</th>
                  <th style={{ textAlign: "left", padding: "10px 12px" }}>Status</th>
                  <th style={{ textAlign: "left", padding: "10px 12px" }}>Type of Knowledge</th>
                  <th style={{ textAlign: "left", padding: "10px 12px" }}>Links</th>
                </tr>
              </thead>
              <tbody>
                {privateNotes.map((n) => (
                  <tr key={n.name} style={{ borderBottom: "1px solid var(--border)" }}>
                    <td style={{ padding: "10px 12px", fontWeight: 600 }}>{n.name}</td>
                    <td style={{ padding: "10px 12px", color: "var(--text-dim)" }}>{n.date}</td>
                    <td style={{ padding: "10px 12px" }}><span className="badge badge-gray">Draft</span></td>
                    <td style={{ padding: "10px 12px", color: "var(--text-dim)" }}>{n.type}</td>
                    <td style={{ padding: "10px 12px", color: "var(--accent)", fontWeight: 500 }}>{n.links}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
