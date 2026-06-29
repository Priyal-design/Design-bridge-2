import { useState } from "react";
import { Link } from "react-router-dom";
import { onboardingWorkspaces } from "../data";
import { IconArrow, IconCheck, IconProject, IconFigma } from "../components/Icons";

const chips = [
  ["Current Sprint", "Sprint 14"],
  ["Assigned Role", "Product Designer"],
  ["Primary Team", "Core Experiences"],
];

const initials = (name) => name.replace(/^Dr\.\s*/, "").split(" ").map((n) => n[0]).join("").slice(0, 2);

export default function Onboarding() {
  const [selected, setSelected] = useState(onboardingWorkspaces[0].name);
  const ws = onboardingWorkspaces.find((w) => w.name === selected) || onboardingWorkspaces[0];
  const { responsibilities, manager, deadlines, tasks, quickActions, updates } = ws;

  return (
    <div className="page">
      {/* Hero */}
      <div className="onb-hero mb24">
        <div className="badge badge-blue mb12">Onboarding</div>
        <h2 style={{ fontSize: 30, fontWeight: 800, letterSpacing: "-0.8px" }}>Welcome, Priyal 🚀</h2>
        <p className="muted mt12" style={{ fontSize: 15.5, maxWidth: 600 }}>
          Get up to speed on the projects that matter to you — everything the team knows, in one place.
        </p>
        <div className="onb-chips mt20">
          {chips.map(([k, v]) => (
            <div key={k} className="onb-chip"><span className="faint">{k}</span><b>{v}</b></div>
          ))}
          <Link to="/figma" className="onb-chip link"><span style={{ width: 14, height: 14 }}><IconFigma /></span> Figma Linked</Link>
        </div>
      </div>

      {/* Row 1: projects tree + responsibilities — unified inside one background card */}
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
                    <span className="tree-caret">{open ? "▾" : "▸"}</span>
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
            <span className="tree-caret">▾</span>
            <span style={{ width: 16, height: 16, color: "var(--accent)" }}><IconProject /></span>
            <span style={{ fontWeight: 700, fontSize: 14 }}>{ws.name}</span>
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
        </div>
      </div>

      {/* Row 2: active project workspace */}
      <div className="section-title">Your Active Project Workspace — {ws.name}</div>
      <div className="work-grid">
        {/* Key deadlines */}
        <div className="card">
          <div className="section-title">Key Deadlines</div>
          <div className="col gap10">
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
        </div>

        {/* Your tasks */}
        <div className="card">
          <div className="row between mb16" style={{ alignItems: "center" }}>
            <div className="section-title" style={{ margin: 0 }}>Your Tasks</div>
            <div className="row gap8" style={{ alignItems: "center" }}>
              <div className="avatar" style={{ width: 26, height: 26, fontSize: 10, background: "linear-gradient(180deg,#e056c8,#b3309e)" }}>PS</div>
              <span className="faint" style={{ fontSize: 12.5 }}>Priyal Shah</span>
            </div>
          </div>
          <div className="col gap10">
            {tasks.map((t) => (
              <div key={t.t} className="work-row">
                <div className="row gap10" style={{ alignItems: "center" }}>
                  <span className="task-check">{t.state === "Done" ? <span style={{ width: 12, height: 12 }}><IconCheck /></span> : ""}</span>
                  <span style={{ fontWeight: 600, fontSize: 13.5 }}>{t.t}</span>
                </div>
                <span className={"badge " + t.badge}>{t.state}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick actions & updates */}
        <div className="card">
          <div className="section-title">Quick Actions</div>
          <div className="col gap8 mb20">
            {quickActions.map((a) => (
              <button key={a} className="work-action">{a} <span style={{ width: 14, height: 14 }}><IconArrow /></span></button>
            ))}
          </div>
          <div className="section-title">Recent Updates</div>
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
  );
}
