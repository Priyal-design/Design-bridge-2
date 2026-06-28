import { NavLink, useLocation } from "react-router-dom";
import {
  IconHome, IconHub, IconProject, IconChat,
  IconAdd, IconRocket, IconFigma, IconSearch, IconBell, IconSparkle,
} from "./Icons";
import Wordmark from "./Wordmark";

const nav = [
  { section: "Overview" },
  { to: "/dashboard", label: "Home", icon: IconHome },
  { to: "/hub", label: "Knowledge Hub", icon: IconHub },
  { to: "/projects/fee-management", label: "Project Detail", icon: IconProject },
  { section: "Intelligence" },
  { to: "/chat", label: "Ask Design Bridge", icon: IconChat },
  { section: "Workflow" },
  { to: "/add", label: "Add Knowledge", icon: IconAdd },
  { to: "/onboarding", label: "Onboarding Hub", icon: IconRocket },
  { to: "/figma", label: "Figma Plugin", icon: IconFigma },
];

const titles = {
  "/dashboard": "Home Dashboard",
  "/hub": "Knowledge Hub",
  "/chat": "Ask Design Bridge",
  "/graph": "Knowledge Graph",
  "/add": "Add Knowledge",
  "/onboarding": "Onboarding Hub",
  "/figma": "Figma Plugin",
};

export default function Layout({ children }) {
  const loc = useLocation();
  let title = titles[loc.pathname] || "Design Bridge";
  if (loc.pathname.startsWith("/projects")) title = "Project Detail";
  if (loc.pathname.startsWith("/decisions")) title = "Decision Detail";

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="brand">
          <NavLink to="/"><Wordmark size={22} /></NavLink>
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
          <div className="topbar-search">
            <span style={{ width: 16, height: 16, color: "var(--text-faint)" }}><IconSearch /></span>
            <input placeholder="Search projects, decisions, studies…" />
          </div>
          <div className="topbar-actions">
            <NavLink to="/chat" className="btn btn-ghost btn-sm">
              <span style={{ width: 15, height: 15, color: "var(--accent)" }}><IconSparkle /></span>
              Ask AI
            </NavLink>
            <button className="icon-btn"><span style={{ width: 18, height: 18 }}><IconBell /></span></button>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
}
