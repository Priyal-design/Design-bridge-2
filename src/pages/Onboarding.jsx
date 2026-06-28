import { Link } from "react-router-dom";
import { IconArrow, IconCheck, IconProject } from "../components/Icons";

const chips = [
  ["Current Sprint", "Sprint 14"],
  ["Assigned Role", "Product Designer"],
  ["Primary Team", "Core Experiences"],
];

const tree = [
  { name: "Fee Management", open: true, children: ["Checkout flow", "Fee schedule", "Refund policy"] },
  { name: "Patient Portal Workspace", open: false, children: ["Booking calendar", "Reminders"] },
  { name: "Microscopy Dashboard Redesign", open: false, children: ["Presets", "Calibration"] },
];

const responsibilities = [
  { area: "Co-Funding", owner: "Sarah Lee", cat: "Finance Owner", pm: "John Chen", color: "#007AFF" },
  { area: "Design", owner: "Alex Kim", cat: "UX Owner", pm: "John Chen", color: "#AF52DE" },
  { area: "Engineering", owner: "David Chen", cat: "Eng. Owner", pm: "Manager", color: "#FF9500" },
  { area: "Manager", owner: "John Chen", cat: "PM Owner", pm: "Manager", color: "#34C759" },
];

const deadlines = [
  { t: "Contract Review", due: "Nov 1", badge: "badge-yellow", state: "In progress" },
  { t: "Validate Prototype", due: "Nov 6", badge: "badge-blue", state: "Queued" },
  { t: "Finalize Design Costs", due: "Nov 7", badge: "badge-pink", state: "Blocked" },
];

const tasks = [
  { t: "Validate UI Prototype", badge: "badge-blue", state: "In Review" },
  { t: "Input Final Design Costs", badge: "badge-yellow", state: "In progress" },
  { t: "Publish Fee Schedule", badge: "badge-green", state: "Done" },
];

const quickActions = ["Propose Fee Agreement", "Review PM Actions", "Configure Workflow"];

const updates = [
  { who: "David Chen", text: "updated the doc-fee scope timeline", time: "2h" },
  { who: "Sarah Lee", text: "approved the refund policy decision", time: "5h" },
  { who: "Alex Kim", text: "added 3 prototypes to Checkout flow", time: "1d" },
];

export default function Onboarding() {
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
          <Link to="/hub" className="onb-chip link">See highlights <span style={{ width: 13, height: 13 }}><IconArrow /></span></Link>
        </div>
      </div>

      {/* Row 1: projects tree + responsibilities */}
      <div className="grid mb24" style={{ gridTemplateColumns: "320px 1fr" }}>
        <div className="card">
          <div className="section-title">Projects Relevant To You</div>
          <div className="tree">
            {tree.map((node) => (
              <div key={node.name}>
                <div className="tree-item">
                  <span className="tree-caret">{node.open ? "▾" : "▸"}</span>
                  <span style={{ width: 16, height: 16, color: "var(--accent)" }}><IconProject /></span>
                  <span style={{ fontWeight: 600, fontSize: 14 }}>{node.name}</span>
                </div>
                {node.open && node.children.map((c) => (
                  <div key={c} className="tree-sub">{c}</div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="row between mb16" style={{ alignItems: "center" }}>
            <div className="section-title" style={{ margin: 0 }}>Fee &amp; Project Responsibilities</div>
            <div className="row gap8">
              <span className="chip" style={{ padding: "6px 12px", fontSize: 12 }}>Global view</span>
              <span className="chip active" style={{ padding: "6px 12px", fontSize: 12 }}>By project</span>
            </div>
          </div>
          <div className="resp-table">
            <div className="resp-head">
              <div>Sub-area</div><div>Category Owner</div><div>Design Manager / PM</div>
            </div>
            {responsibilities.map((r) => (
              <div key={r.area} className="resp-row">
                <div className="row gap10">
                  <div className="avatar" style={{ width: 30, height: 30, background: r.color, fontSize: 11 }}>
                    {r.owner.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 13.5 }}>{r.area}</div>
                    <div className="faint" style={{ fontSize: 12 }}>{r.owner}</div>
                  </div>
                </div>
                <div><span className="badge badge-gray">{r.cat}</span></div>
                <div className="muted" style={{ fontSize: 13.5 }}>{r.pm}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Row 2: active project workspace */}
      <div className="section-title">Your Active Project Workspace — Fee Management</div>
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
