import { useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  IconHome, IconHub, IconProject, IconSparkle,
  IconAdd, IconUfo, IconFigma, IconBell, IconClose, IconUserPlus,
} from "./Icons";
import Wordmark from "./Wordmark";
import SearchBar from "./SearchBar";
import { emptyProjectFilter } from "../data";

const nav = [
  { section: "Overview" },
  { to: "/dashboard", label: "Home", icon: IconHome },
  { to: "/hub", label: "Knowledge Hub", icon: IconHub },
  { to: "/projects/fee-management", label: "Project Detail", icon: IconProject },
  { section: "Intelligence" },
  { to: "/chat", label: "Ask Jedi Bot", icon: IconSparkle },
  { section: "Workflow" },
  { to: "/add", label: "Add Knowledge", icon: IconAdd },
  { to: "/onboarding", label: "My Space", icon: IconUfo },
  { to: "/figma", label: "Figma Plugin", icon: IconFigma },
];

const titles = {
  "/dashboard": "Home Dashboard",
  "/hub": "Knowledge Hub",
  "/chat": "Ask Jedi Bot",
  "/graph": "Knowledge Graph",
  "/add": "Add Knowledge",
  "/onboarding": "My Space",
  "/figma": "Figma Plugin",
};

export default function Layout({ children }) {
  const loc = useLocation();
  const [search, setSearch] = useState({ ...emptyProjectFilter });
  const [showInvite, setShowInvite] = useState(false);
  const [emails, setEmails] = useState([""]);
  let title = titles[loc.pathname] || "Design Bridge";
  if (loc.pathname.startsWith("/projects")) title = "Project Detail";
  if (loc.pathname.startsWith("/decisions")) title = "Decision Detail";

  const addEmailField = () => setEmails((prev) => [...prev, ""]);
  const updateEmail = (i, val) => setEmails((prev) => prev.map((e, idx) => (idx === i ? val : e)));
  const removeEmail = (i) => setEmails((prev) => prev.filter((_, idx) => idx !== i));
  const handleInvite = () => {
    const valid = emails.filter((e) => e.trim());
    if (valid.length) {
      alert("Invited: " + valid.join(", "));
      setEmails([""]);
      setShowInvite(false);
    }
  };

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <NavLink to="/"><Wordmark size={32} /></NavLink>
        </div>

        {nav.map((item, i) =>
          item.section ? (
            <div key={i} className="nav-section">{item.section}</div>
          ) : (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) => "nav-item" + (isActive ? " active" : "")}
            >
              <span className="nav-icon"><item.icon /></span>
              {item.label}
            </NavLink>
          )
        )}

        <div className="sidebar-footer">
          <div className="user-chip">
            <div className="avatar" style={{ background: "linear-gradient(180deg, #e056c8, #b3309e)" }}>PS</div>
            <div style={{ minWidth: 0 }}>
              <div style={{ fontSize: 13.5, fontWeight: 600 }}>Priyal Shah</div>
              <div style={{ fontSize: 11.5, color: "var(--text-faint)" }}>Product Designer</div>
            </div>
          </div>
        </div>
      </aside>

      <div className="main">
        <header className="topbar">
          <h1>{title}</h1>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Search projects, decisions, studies…"
            variant="global"
            showFilter={false}
          />
          <div className="topbar-actions">
            <button className="btn btn-ghost btn-sm" onClick={() => setShowInvite(true)}>
              <span style={{ width: 15, height: 15 }}><IconUserPlus /></span>
              Invite Users
            </button>
            <button className="icon-btn"><span style={{ width: 18, height: 18 }}><IconBell /></span></button>
          </div>
        </header>
        {children}
      </div>

      {showInvite && (
        <div className="modal-overlay" onClick={() => setShowInvite(false)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Invite Users</h3>
              <button className="modal-close" onClick={() => setShowInvite(false)} aria-label="Close">
                <span style={{ width: 16, height: 16 }}><IconClose /></span>
              </button>
            </div>
            <p className="modal-desc">Add email addresses to invite team members to Design Bridge.</p>
            <div className="modal-body">
              {emails.map((email, i) => (
                <div key={i} className="invite-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => updateEmail(i, e.target.value)}
                    placeholder="email@company.com"
                    className="invite-input"
                  />
                  {emails.length > 1 && (
                    <button className="invite-remove" onClick={() => removeEmail(i)} aria-label="Remove">
                      <span style={{ width: 14, height: 14 }}><IconClose /></span>
                    </button>
                  )}
                </div>
              ))}
              <button className="invite-add" onClick={addEmailField}>+ Add another</button>
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost btn-sm" onClick={() => setShowInvite(false)}>Cancel</button>
              <button className="btn btn-primary btn-sm" onClick={handleInvite}>Send Invites</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
