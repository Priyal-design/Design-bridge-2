import { useState } from "react";
import { Link } from "react-router-dom";
import { onboardingWorkspaces } from "../data";
import { IconArrow, IconProject, IconLock } from "../components/Icons";
import figmaIcon from "../assets/figma.png";
import microsoftTeamsIcon from "../assets/microsoft-teams-icon.svg";
import yodaUfoLanding from "../assets/yoda-ufo-landing.svg";

const heroStats = [
  ["Current Sprint", "Sprint 14"],
  ["Role", "Product Designer"],
  ["Your Team", "Core Experiences"],
];

const initials = (name) => name.replace(/^Dr\.\s*/, "").split(" ").map((n) => n[0]).join("").slice(0, 2);

const privateNotes = [
  { name: "CTA placement rationale", date: "12/03/26", status: "Draft", type: "Design Decision", links: "Figma, JIRA-2041" },
  { name: "Heatmap findings summary", date: "10/03/26", status: "Draft", type: "Research", links: "Notion, Slides" },
  { name: "Accessibility review notes", date: "08/03/26", status: "Draft", type: "Guideline", links: "Docs, Sheet" },
  { name: "Stakeholder feedback log", date: "05/03/26", status: "Draft", type: "Evidence", links: "Confluence" },
  { name: "Sprint 14 retro action items", date: "01/03/26", status: "Draft", type: "Documentation", links: "JIRA-2038" },
];

const startHereCards = [
  {
    title: "Understand the project",
    text: "Get the essential context behind the Fee Management System and its current direction.",
    cta: "View project overview",
    to: "/projects/fee-management/chapters",
  },
  {
    title: "Decisions you should know",
    text: "Understand the key decisions shaping the current checkout experience.",
    cta: "Explore decisions",
    to: "/projects/fee-management/chapters?tab=sources&source=Design%20Decisions",
  },
  {
    title: "Key research",
    text: "See the research findings that influenced the current design.",
    cta: "View research",
    to: "/projects/fee-management/chapters?tab=sources&source=Research",
  },
];

const whatChanged = [
  ["CTA placement decision updated", "2h ago", "/projects/fee-management/decisions"],
  ["Accessibility testing moved", "Yesterday", "/projects/fee-management/chapters"],
  ["3 checkout prototypes added", "1d ago", "/figma"],
];

export default function Onboarding() {
  const [roleMapOpen, setRoleMapOpen] = useState(false);
  const [notesOpen, setNotesOpen] = useState(true);
  const [mapProjectId, setMapProjectId] = useState("fee-management");
  const [selectedMapPerson, setSelectedMapPerson] = useState("you");
  const ws = onboardingWorkspaces.find((w) => w.id === "fee-management") || onboardingWorkspaces[0];
  const mapWs = onboardingWorkspaces.find((w) => w.id === mapProjectId) || ws;
  const { responsibilities, manager } = mapWs;
  const byArea = (area) => responsibilities.find((r) => r.area === area) || responsibilities[0];
  const byOwner = (owner) => responsibilities.find((r) => r.owner === owner);
  const projectOwner = byArea("Manager") || { owner: manager.name, cat: "Project Owner", area: "Project", color: "#34C759" };
  const designOwner = byArea("Design");
  const productOwner = byArea("Contracting") || responsibilities[0];
  const accessibilityOwner = byOwner("Sarah Lee") || productOwner;
  const activePerson = selectedMapPerson || {
    name: projectOwner.owner,
    role: "Project Owner",
    area: mapWs.name,
    color: projectOwner.color,
    owns: "Project direction, delivery alignment, and key escalation paths.",
    contact: "Contact for project priorities, ownership questions, or cross-team decisions.",
    status: "Project owner",
  };

  const openPerson = (person) => setSelectedMapPerson(person);
  const mainPeople = {
    owner: {
      name: "John Chen",
      role: "Project Owner",
      area: "Fee Management System",
      color: "#34C759",
      owns: "Project direction, ownership alignment, and delivery priorities.",
      contact: "Contact for project priorities, ownership questions, or cross-team decisions.",
      related: "Fee Management System",
      status: "Project owner",
    },
    design: {
      name: "Alex Kim",
      role: "Primary Design Contact",
      area: "Design",
      color: "#AF52DE",
      owns: "Checkout experience design, current prototypes, and design rationale.",
      contact: "Contact for checkout UX context, prototype feedback, or design decisions.",
      related: "Checkout experience",
      status: "Primary contact",
    },
    product: {
      name: "Sarah Lee",
      role: "Product Owner",
      area: "Product",
      color: "#007AFF",
      owns: "Product requirements, validation criteria, and finance context.",
      contact: "Contact for product scope, business rules, or validation questions.",
      related: "Fee schedule",
    },
    research: {
      name: "Kai Morgan",
      role: "UX Researcher",
      area: "Research",
      color: "#FF3B30",
      owns: "Research findings, study context, and evidence behind checkout design decisions.",
      contact: "Contact for usability findings, research interpretation, or evidence behind design tradeoffs.",
      related: "Checkout research",
    },
    accessibility: {
      name: "Sarah Lee",
      role: "Accessibility Specialist",
      area: "Accessibility",
      color: "#007AFF",
      owns: "Accessibility testing guidance and validation readiness.",
      contact: "Contact before accessibility testing or when resolving accessibility tradeoffs.",
      related: "Validation milestone",
    },
    you: {
      name: "Priyal Shah",
      role: "Product Designer",
      area: "Checkout experience",
      color: "#e056c8",
      owns: "Checkout flow validation and Fee Management design-decision context.",
      contact: "You are the current designer using this orientation space.",
      related: "Checkout experience",
      status: "You",
    },
  };
  const selectedRolePerson = typeof selectedMapPerson === "string" ? mainPeople[selectedMapPerson] : selectedMapPerson;

  if (roleMapOpen) {
    const personCard = (person, opts = {}) => (
      <button
        type="button"
        className={"onb-map-card" + (opts.current ? " current" : "")}
        onClick={() => openPerson(person)}
      >
        <span className="avatar onb-map-avatar" style={{ background: person.color }}>{initials(person.name)}</span>
        <span className="onb-map-name">{person.name}</span>
        <span className="onb-map-role">{person.role}</span>
        <span className="onb-map-area">{person.area}</span>
        {person.status && <span className="onb-map-status">{person.status}</span>}
        {opts.current && <span className="onb-map-you">You</span>}
      </button>
    );

    const ownerPerson = {
      name: projectOwner.owner,
      role: "Project Owner",
      area: mapWs.name,
      color: projectOwner.color,
      owns: "Project direction, priorities, delivery alignment, and stakeholder decisions.",
      contact: "Contact when ownership is unclear or project direction needs confirmation.",
      related: mapWs.name,
      status: "Project owner",
    };
    const designPerson = {
      name: designOwner.owner,
      role: "Primary Design Contact",
      area: "Design",
      color: designOwner.color,
      owns: "Checkout experience design, design rationale, and current prototype direction.",
      contact: "Contact for checkout UX context, design decisions, and prototype feedback.",
      related: "Checkout experience",
      status: "Primary contact",
    };
    const productPerson = {
      name: productOwner.owner,
      role: "Product Owner",
      area: productOwner.area,
      color: productOwner.color,
      owns: "Product requirements, finance context, and fee-management business rules.",
      contact: "Contact for product scope, fee policy context, or validation criteria.",
      related: productOwner.area,
    };
    const accessibilityPerson = {
      name: accessibilityOwner.owner,
      role: "Accessibility Specialist",
      area: "Accessibility",
      color: accessibilityOwner.color,
      owns: "Accessibility testing guidance and validation readiness.",
      contact: "Contact before accessibility testing or when resolving accessibility tradeoffs.",
      related: "Validation milestone",
    };
    const youPerson = {
      name: "Priyal Shah",
      role: "Product Designer",
      area: "Checkout experience",
      color: "#e056c8",
      owns: "Supporting checkout validation and learning the decision context for Fee Management.",
      contact: "You are the current designer using this orientation space.",
      related: "Checkout experience",
      status: "You",
    };

    return (
      <div className="page onb-map-page">
        <div className="onb-map-toolbar">
          <button type="button" className="onb-map-back" onClick={() => setRoleMapOpen(false)}>← Back to My Space</button>
          <label className="onb-map-project-select">
            <span className="sr-only">Project</span>
            <select value={mapProjectId} onChange={(e) => { setMapProjectId(e.target.value); setSelectedMapPerson(null); }}>
              {onboardingWorkspaces.map((project) => (
                <option key={project.id} value={project.id}>{project.name}</option>
              ))}
            </select>
          </label>
        </div>

        <section className="card onb-map-shell">
          <div className="onb-section-head">
            <div>
              <h3>Full Responsibility Map</h3>
              <p><b>{mapWs.name === "Fee Management" ? "Fee Management System" : mapWs.name}</b></p>
              <p>See who owns each area of the project and who to contact when you need context.</p>
            </div>
          </div>

          <div className="onb-map-layout">
            <div className="onb-map-chart">
              <div className="onb-map-level root">
                <div className="onb-map-kicker">Project Owner</div>
                {personCard(ownerPerson)}
              </div>

              <div className="onb-map-connector vertical" />
              <div className="onb-map-connector horizontal" />

              <div className="onb-map-level disciplines">
                <div className="onb-map-branch">
                  {personCard(designPerson)}
                </div>
                <div className="onb-map-branch">{personCard(productPerson)}</div>
                <div className="onb-map-branch">{personCard(accessibilityPerson)}</div>
              </div>

              <div className="onb-map-connector vertical small" />
              <div className="onb-map-level subareas compact">
                {personCard(youPerson, { current: true })}
              </div>
            </div>

            <aside className="onb-map-detail">
              <div className="row gap10 mb16">
                <span className="avatar onb-map-avatar" style={{ background: activePerson.color }}>{initials(activePerson.name)}</span>
                <div>
                  <h4>{activePerson.name}</h4>
                  <p>{activePerson.role}</p>
                </div>
              </div>
              <div className="onb-detail-block"><span>What they own</span><p>{activePerson.owns}</p></div>
              <div className="onb-detail-block"><span>When to contact them</span><p>{activePerson.contact}</p></div>
              <div className="onb-detail-block"><span>Related project area</span><p>{activePerson.related || activePerson.area}</p></div>
            </aside>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="onb-hero mb24">
        <div className="onb-hero-orb onb-hero-orb-a" />
        <div className="onb-hero-orb onb-hero-orb-b" />
        <div className="onb-hero-character" aria-hidden="true">
          <img src={yodaUfoLanding} alt="" />
        </div>

        <div className="onb-hero-content">
          <div className="onb-hero-badge">Private & Personalised</div>
          <h2>Priyal’s Space</h2>
          <p>
            You’re a Product Designer in Core Experiences, currently supporting the <a href="https://design-bridge-2.vercel.app/projects/fee-management/chapters" className="onb-hero-project-link">Fee Management System</a> during validation. Your focus is the checkout experience, and Alex Kim is your primary design contact.
          </p>
        </div>

        <div className="onb-hero-stats" aria-label="Current workspace details">
          {heroStats.map(([label, value]) => (
            <div key={label} className="onb-hero-stat">
              <span>{label}</span>
              <strong>{value}</strong>
            </div>
          ))}
          <Link to="/figma" className="onb-hero-stat onb-hero-figma">
            <span>Tools</span>
            <strong className="onb-tool-icons" aria-label="Figma, Jira, and Microsoft Teams linked">
              <img className="figma-tool-icon" src={figmaIcon} alt="Figma" />
              <img src="https://cdn.simpleicons.org/jira/0052CC" alt="Jira" />
              <img className="teams-tool-icon" src={microsoftTeamsIcon} alt="Microsoft Teams" />
            </strong>
          </Link>
        </div>
      </div>

      <section className="onb-section mb24">
        <div className="onb-section-head">
          <div>
            <h3>Start here</h3>
            <p>Essential knowledge selected for your role and current project.</p>
          </div>
        </div>
        <div className="onb-start-grid">
          {startHereCards.map((card, i) => (
            <Link key={card.title} to={card.to} className="card onb-start-card">
              <div className="onb-start-num">0{i + 1}</div>
              <h4>{card.title}</h4>
              <p>{card.text}</p>
              <span>{card.cta} <IconArrow /></span>
            </Link>
          ))}
        </div>
      </section>

      <div className="onb-side-grid mb24">
        <section className="card onb-section onb-updates-section">
          <div className="onb-section-head">
            <div>
              <h3>What changed since your last visit</h3>
              <p>3 updates are relevant to your current work.</p>
            </div>
          </div>
          <div className="onb-change-list">
            {whatChanged.map(([title, time, to]) => (
              <Link key={title} to={to} className="onb-change-item onb-clickable-row">
                <span className="onb-change-dot" />
                <div>
                  <div className="onb-change-title">{title} <span className="onb-inline-arrow"><IconArrow /></span></div>
                  <div className="faint" style={{ fontSize: 12 }}>{time}</div>
                </div>
              </Link>
            ))}
          </div>
          <Link to="/projects/fee-management/chapters" className="onb-text-link">View all updates <IconArrow /></Link>
        </section>

        <section className="card onb-section onb-next-section">
          <div className="onb-section-head">
            <div>
              <h3>Next up</h3>
              <p>The most important next steps from meetings, deadlines, and tasks.</p>
            </div>
          </div>
          <div className="onb-next-list">
            <div className="work-row">
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Validate UI Prototype</div>
                <div className="faint" style={{ fontSize: 12 }}>Project task</div>
              </div>
              <span className="badge badge-blue">In review</span>
            </div>
            <div className="work-row">
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Accessibility testing</div>
                <div className="faint" style={{ fontSize: 12 }}>Fee Management</div>
              </div>
              <span className="badge badge-gray">Next milestone</span>
            </div>
            <div className="work-row">
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>Brainstorm</div>
                <div className="faint" style={{ fontSize: 12 }}>Today, 8–9 AM</div>
              </div>
              <span className="meeting-dot" />
            </div>
          </div>
          <Link to="/projects/fee-management/chapters?tab=project%20timeline" className="onb-text-link">View full schedule <IconArrow /></Link>
        </section>
      </div>

      <section className="card onb-section mb24">
        <div className="onb-section-head">
          <div>
            <h3>Your role in Fee Management</h3>
            <p>Here’s where you fit, what you own, and who can help.</p>
          </div>
        </div>
        <div className="onb-role-grid">
          <div className="onb-role-focus onb-role-combined">
            {selectedRolePerson ? (
              <>
                <div className="row gap10 mb16">
                  <span className="onb-person-avatar onb-selected-person-avatar" style={{ background: selectedRolePerson.color }}>{initials(selectedRolePerson.name)}</span>
                  <div>
                    <strong>{selectedRolePerson.name}</strong>
                    <p className="faint" style={{ margin: "4px 0 0", fontSize: 12 }}>{selectedRolePerson.role}</p>
                  </div>
                </div>
                <div className="onb-person-detail"><span>What they own</span><p>{selectedRolePerson.owns}</p></div>
                <div className="onb-person-detail"><span>When to contact them</span><p>{selectedRolePerson.contact}</p></div>
                <div className="onb-person-detail"><span>Related area</span><p>{selectedRolePerson.related}</p></div>
              </>
            ) : (
              <>
                <span>Focus</span>
                <strong>Checkout experience</strong>
                <h4>You’re responsible for:</h4>
                <ul>
                  <li>Checkout flow validation</li>
                  <li>Fee schedule design decisions</li>
                </ul>
              </>
            )}
          </div>
          <div className="onb-role-block">
            <h4>People to know:</h4>
            <div className="onb-people-map" aria-label="Responsibility map">
              <button type="button" className="onb-people-node owner" onClick={() => openPerson(mainPeople.owner)}><span className="onb-person-avatar" style={{ background: "#34C759" }}>JC</span><strong>John Chen</strong><small>Project owner</small></button>
              <div className="onb-people-map-line" />
              <div className="onb-people-branches">
                <button type="button" className="onb-people-node" onClick={() => openPerson(mainPeople.design)}><span className="onb-person-avatar" style={{ background: "#AF52DE" }}>AK</span><strong>Alex Kim</strong><small>Primary design contact</small></button>
                <button type="button" className="onb-people-node" onClick={() => openPerson(mainPeople.research)}><span className="onb-person-avatar" style={{ background: "#FF3B30" }}>KM</span><strong>Kai Morgan</strong><small>UX researcher</small></button>
                <button type="button" className="onb-people-node" onClick={() => openPerson(mainPeople.accessibility)}><span className="onb-person-avatar" style={{ background: "#007AFF" }}>SL</span><strong>Sarah Lee</strong><small>Accessibility specialist</small></button>
              </div>
              <div className="onb-people-map-line under-design" />
              <div className="onb-people-under-design">
                <button type="button" className="onb-people-node you" onClick={() => openPerson(mainPeople.you)}><span className="onb-person-avatar" style={{ background: "#e056c8" }}>PS</span><strong>Priyal Shah</strong><small>You · Checkout experience</small></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="card onb-section onb-private-bottom mb24">
        <button type="button" className="onb-private-toggle" onClick={() => setNotesOpen((open) => !open)}>
          <span className="onb-private-lock" style={{ background: "rgba(229, 178, 13, 0.15)", color: "#E5B20D" }}><IconLock /></span>
          <div>
            <h3>Private Notes</h3>
            <p>5 drafts · Only visible to you</p>
          </div>
          <span className="onb-private-caret" style={{ transform: notesOpen ? "rotate(180deg)" : "none" }}>▼</span>
        </button>

        {notesOpen && (
          <div className="onb-notes-table-wrap">
            <table className="onb-notes-table">
              <thead>
                <tr>
                  <th>Name of Note</th>
                  <th>Date of Creation</th>
                  <th>Status</th>
                  <th>Type of Knowledge</th>
                  <th>Links</th>
                </tr>
              </thead>
              <tbody>
                {privateNotes.map((n) => (
                  <tr key={n.name}>
                    <td>{n.name}</td>
                    <td>{n.date}</td>
                    <td><span className="badge badge-gray">Draft</span></td>
                    <td>{n.type}</td>
                    <td>{n.links}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
