import { useState } from "react";
import { Link, useSearchParams, useParams } from "react-router-dom";
import { departmentColors, figmaFiles, futureTasks, jira, knowledgeStories, projects, statusBadge, timeline, timelineActive, usabilityVideos } from "../data";
import { IconArrow, IconDecision, IconExternalLink, IconFigma, IconFile, IconGauge, IconGraph, IconHub, IconJira, IconPlay, IconRuler } from "../components/Icons";
import MagicWand from "../components/MagicWand";
import jediIcon from "../assets/yoda-main.svg";

const tabs = ["Overview", "Knowledge Stories", "Project Timeline", "Sources", "People"];
const sourceTypes = ["All", "Design Decisions", "Research", "Guidelines", "Evidence", "Design files", "Video", "Jira", "Documentation"];
const sourceTypeIcons = {
  All: IconHub,
  "Design Decisions": IconDecision,
  Research: IconGraph,
  Guidelines: IconRuler,
  Evidence: IconGauge,
  "Design files": IconFigma,
  Video: IconPlay,
  Jira: IconJira,
  Documentation: IconFile,
};

export default function ProjectDetailChapters() {
  const { id = "fee-management" } = useParams();
  const [searchParams] = useSearchParams();
  const project = projects.find((p) => p.id === id) || projects[0];
  const color = departmentColors[project.department];
  const stories = knowledgeStories.filter((story) => story.projectId === project.id);
  const files = figmaFiles[id] || figmaFiles["fee-management"] || [];
  const video = usabilityVideos[2] || usabilityVideos[0];
  const initialTab = tabs.find((item) => item.toLowerCase() === (searchParams.get("tab") || "").toLowerCase()) || "Overview";
  const initialSource = sourceTypes.find((item) => item.toLowerCase() === (searchParams.get("source") || "").toLowerCase()) || "All";
  const [tab, setTab] = useState(initialTab);
  const [sourceType, setSourceType] = useState(initialSource);
  const [showDelivery, setShowDelivery] = useState(true);
  const mapPeople = [
    { key: "john", name: "John Chen", role: "Project owner", area: "Project direction", color: "#34C759", owns: "Project direction, ownership alignment, delivery priorities, and key escalation paths.", contact: "Contact John for project priorities, ownership questions, or cross-team decisions.", related: "Fee Management System" },
    { key: "alex", name: "Alex Kim", role: "Head designer", area: "Design", color: "#AF52DE", owns: "Checkout experience design, current prototypes, Figma direction, and design rationale.", contact: "Contact Alex for checkout UX context, prototype feedback, or design decisions.", related: "Checkout experience", status: "Primary contact" },
    { key: "kai", name: "Kai Morgan", role: "UX researcher", area: "Research", color: "#FF3B30", owns: "Research findings, study context, usability clips, and evidence behind checkout design decisions.", contact: "Contact Kai for usability findings, research interpretation, or evidence behind design tradeoffs.", related: "Checkout research" },
    { key: "sarah", name: "Sarah Lee", role: "Accessibility specialist", area: "Accessibility", color: "#007AFF", owns: "Accessibility testing guidance and validation readiness.", contact: "Contact Sarah before accessibility testing or when resolving accessibility tradeoffs.", related: "Validation milestone" },
    { key: "priyal", name: "Priyal Shah", role: "Checkout experience", area: "Design", color: "#e056c8", owns: "Checkout flow validation and Fee Management design-decision context.", contact: "You are the current designer using this project chapter view.", related: "Checkout experience" },
  ];
  const [selectedPersonKey, setSelectedPersonKey] = useState("john");
  const selectedPerson = mapPeople.find((person) => person.key === selectedPersonKey) || mapPeople[0];
  const projectSummary = "Fee Management System is redesigning the internal payment workflow so finance operators can understand fees, act confidently, and avoid processing errors. The current work connects CTA visibility, fee clarity, payment status, and accessibility validation into one reusable knowledge base.";
  const sourceItems = [
    ...stories.map((story) => ({
      type: "Design Decisions",
      title: story.decision?.title || story.preview.find((p) => p.type === "decision")?.text || story.title,
      detail: `Chapter ${String(story.chapterNumber).padStart(2, "0")} · ${story.decision?.options?.length || 3} options considered`,
      summary: story.decision?.rationale || story.summary,
      meta: story.decision?.tradeoff ? `Trade-off: ${story.decision.tradeoff}` : "Decision rationale connected to research and validation evidence.",
      icon: IconDecision,
    })),
    ...stories.map((story) => ({
      type: "Research",
      title: story.research?.finding || story.preview.find((p) => p.type === "research")?.text || "Research insight",
      detail: story.research?.sample || "Research insight",
      summary: story.research?.context || story.summary,
      meta: story.research?.video?.meta || "Research source connected to the project knowledge story.",
      icon: IconGraph,
    })),
    ...stories.map((story) => ({
      type: "Guidelines",
      title: story.guideline?.title || story.preview.find((p) => p.type === "guideline")?.text || "Reusable learning",
      detail: story.guideline?.usedIn ? `Used in ${story.guideline.usedIn} related projects` : story.title,
      summary: story.guideline?.why || story.summary,
      meta: "Reusable guidance based on decisions, research, and validation evidence.",
      icon: IconRuler,
    })),
    ...stories.map((story) => ({
      type: "Evidence",
      title: story.preview.find((p) => p.type === "evidence")?.text || "Validation evidence",
      detail: story.evidence?.metrics?.map((metric) => `${metric.label}: ${metric.from} to ${metric.to}`).join(" · ") || story.title,
      summary: story.evidence?.summary || "Validation evidence connected to this knowledge story.",
      meta: story.evidence?.spreadsheet?.title || "Evidence snapshot",
      icon: IconGauge,
    })),
    ...files.map((file) => ({ type: "Design files", title: file.name, detail: file.status, summary: "Figma source snapshot used to compare design direction and implementation-ready changes.", meta: "Open source file", image: file.image, url: file.url })),
    { type: "Video", title: "Participant 04 clip", detail: "Usability Test · 00:42", summary: "Participant struggled to locate the payment action before the CTA placement was changed.", meta: "Demo preview · source video unavailable locally", icon: IconPlay, image: video?.image },
    { type: "Jira", title: jira.epic, detail: `Sprint ${jira.sprint} · Validation in progress`, summary: "Tracks validation scope, accessibility follow-up, and beta rollout readiness for the project.", meta: "Delivery source", icon: IconJira },
    { type: "Documentation", title: "Checkout Validation Handover", detail: "Validation · Handover", summary: "Project context for new joiners: preserve validated CTA hierarchy, analytics events, and checkout validation decisions.", meta: "Key decisions: 2 · Open questions: 3 · Known risks: 2", icon: IconFile },
  ];
  const visibleSources = sourceType === "All" ? sourceItems : sourceItems.filter((item) => item.type === sourceType);

  return (
    <div className="page chapters-page">
      <section className="chapters-cover">
        <div>
          <div className="chapters-meta">
            <span className={"badge chapters-status-badge " + statusBadge[project.status]}>{project.status}</span>
            <span className="badge" style={{ background: `${color}22`, color }}>{project.department}</span>
            <span>Sprint {project.sprint}</span>
            <span>Last updated {project.updated}</span>
          </div>
          <h2>{project.name}</h2>
          <p>{project.summary}</p>
        </div>
        <div className="chapters-brief">
          <span className="chapters-brief-title"><img src={jediIcon} alt="" />Jedi Project Brief</span>
          <p>The Fee Management System redesign focused on reducing payment errors and making critical actions easier to understand. The project is currently in validation, with accessibility testing and beta rollout as the next priorities.</p>
          <Link to="/chat" className="btn btn-primary btn-sm chapters-brief-action"><MagicWand size={28} /> Ask about this project</Link>
        </div>
      </section>

      <nav className="chapters-tabs">
        {tabs.map((item) => <button key={item} className={tab === item ? "active" : ""} onClick={() => setTab(item)}>{item}</button>)}
      </nav>

      {tab === "Knowledge Stories" && (
        <section className="chapters-section">
          <div className="chapters-section-head"><h3>Knowledge Stories</h3><p>Follow how research, design decisions, evidence, and reusable learning came together.</p></div>
          <div className="chapters-story-grid">
            {stories.map((story) => <StoryCard key={story.id} story={story} projectId={project.id} />)}
          </div>
        </section>
      )}

      {tab === "Overview" && (
        <section className="chapters-overview">
          <div className="chapters-overview-top">
            <div className="card"><h3>Project summary</h3><p>{projectSummary}</p></div>
            <div className="card chapters-stage-card"><h3>Current stage</h3><strong>Validation · Sprint {jira.sprint}</strong><p>Next priorities: accessibility validation and beta rollout.</p></div>
          </div>
          <div className="chapters-story-grid compact">{stories.slice(0, 3).map((story) => <StoryCard key={story.id} story={story} projectId={project.id} compact />)}</div>
        </section>
      )}

      {tab === "Project Timeline" && (
        <section className="chapters-section">
          <div className="card chapters-timeline-card">
            <div className="chapters-timeline-head">
              <div><h3>Project journey</h3><p>Where the project is now, without opening every delivery artifact.</p></div>
              <button className="btn btn-ghost btn-sm" onClick={() => setShowDelivery((value) => !value)}>
                {showDelivery ? "Hide delivery details" : "View delivery details"}
              </button>
            </div>
            <div className="pdv2-flow">
              {timeline.map((step, index) => (
                <div key={step} className={index < timelineActive ? "done" : index === timelineActive ? "active" : ""}>
                  <span>{index < timelineActive ? "✓" : index === timelineActive ? "●" : index + 1}</span>
                  <strong>{step}</strong>
                </div>
              ))}
            </div>
            <div className="pdv2-now-next">
              <div><span>Now</span><strong>Validate the redesigned checkout and accessibility.</strong></div>
              <div><span>Next</span><strong>Finalize beta rollout.</strong></div>
            </div>
            {showDelivery && (
              <div className="pdv2-disclosure-grid">
                <div>
                  <h4>Jira status</h4>
                  <p className="faint">Epic: {jira.epic} · Sprint {jira.sprint}</p>
                  {jira.tasks.map((task) => <p key={task.label}>{task.label}<span>{task.state}</span></p>)}
                </div>
                <div>
                  <h4>Future tasks</h4>
                  {futureTasks.map((task) => <p key={task}>{task}</p>)}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {tab === "Sources" && (
        <section className="chapters-section">
          <div className="chapters-section-head chapters-source-head">
            <div><h3>Sources</h3><p>Raw source material that supports the knowledge stories.</p></div>
          </div>
          <div className="chapters-source-filters">
            {sourceTypes.map((type) => {
              const Icon = sourceTypeIcons[type] || IconFile;
              return <button key={type} className={sourceType === type ? "active" : ""} onClick={() => setSourceType(type)}><Icon />{type}</button>;
            })}
          </div>
          <div className="chapters-source-grid">
            {visibleSources.map((item) => {
              const Icon = item.icon || IconFile;
              const cardClass = `chapters-source-card ${sourceClass(item.type)}`;
              const content = <>{item.image && item.type !== "Video" ? <img src={item.image} alt="" /> : item.image ? <div className="chapters-video-thumb" style={{ backgroundImage: `url(${item.image})` }}><span><IconPlay /></span></div> : <span className={"chapters-source-ic " + sourceClass(item.type)}><Icon /></span>}<span>{item.type}</span><strong>{item.title}</strong><small>{item.detail}{item.url ? <IconExternalLink /> : null}</small>{item.summary && <p>{item.summary}</p>}{item.meta && <em>{item.meta}</em>}</>;
              return item.url ? <a key={`${item.type}-${item.title}`} className={cardClass} href={item.url} target="_blank" rel="noopener noreferrer">{content}</a> : <div key={`${item.type}-${item.title}`} className={cardClass}>{content}</div>;
            })}
          </div>
        </section>
      )}

      {tab === "People" && (
        <section className="chapters-section">
          <div className="chapters-section-head"><h3>People</h3><p>Core contributors and responsibilities.</p></div>
          <div className="chapters-responsibility-map card">
            <div className="chapters-map-layout">
              <aside className="onb-map-detail chapters-map-detail">
                <div className="row gap10 mb16">
                  <span className="avatar onb-map-avatar" style={{ background: selectedPerson.color }}>{initials(selectedPerson.name)}</span>
                  <div>
                    <h4>{selectedPerson.name}</h4>
                    <p>{selectedPerson.role}</p>
                  </div>
                </div>
                <div className="onb-detail-block"><span>What they own</span><p>{selectedPerson.owns}</p></div>
                <div className="onb-detail-block"><span>When to contact them</span><p>{selectedPerson.contact}</p></div>
                <div className="onb-detail-block"><span>Related project area</span><p>{selectedPerson.related}</p></div>
              </aside>

              <div className="onb-map-chart chapters-map-chart">
                <div className="onb-map-level root">
                  <PersonMapCard person={mapPeople[0]} active={selectedPersonKey === "john"} onSelect={() => setSelectedPersonKey("john")} />
                </div>
                <div className="onb-map-connector vertical" />
                <div className="onb-map-connector horizontal" />
                <div className="onb-map-level disciplines chapters-map-level">
                  <div className="chapters-map-branch">
                    <PersonMapCard person={mapPeople[1]} active={selectedPersonKey === "alex"} onSelect={() => setSelectedPersonKey("alex")} />
                    <div className="onb-map-connector vertical small" />
                    <PersonMapCard person={mapPeople[4]} active={selectedPersonKey === "priyal"} onSelect={() => setSelectedPersonKey("priyal")} current />
                  </div>
                  <PersonMapCard person={mapPeople[2]} active={selectedPersonKey === "kai"} onSelect={() => setSelectedPersonKey("kai")} />
                  <PersonMapCard person={mapPeople[3]} active={selectedPersonKey === "sarah"} onSelect={() => setSelectedPersonKey("sarah")} />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

function sourceClass(type) {
  return {
    "Design Decisions": "decision",
    Research: "research",
    Guidelines: "guideline",
    Evidence: "evidence",
    Video: "video",
    Jira: "jira",
    Documentation: "docs",
  }[type] || "default";
}

function initials(name) {
  return name.split(" ").map((n) => n[0]).join("");
}

function PersonMapCard({ person, active, current, onSelect }) {
  return (
    <button type="button" className={"onb-map-card" + (current ? " current" : "") + (active ? " active" : "")} onClick={onSelect}>
      <span className="avatar onb-map-avatar" style={{ background: person.color }}>{initials(person.name)}</span>
      <span className="onb-map-name">{person.name}</span>
      <span className="onb-map-role">{person.role}</span>
      <span className="onb-map-area">{person.area}</span>
      {person.status && <span className="onb-map-status">{person.status}</span>}
      {current && <span className="onb-map-you">You</span>}
    </button>
  );
}

function StoryCard({ story, projectId, compact }) {
  return (
    <article className="chapters-story-card">
      <span>Chapter {String(story.chapterNumber).padStart(2, "0")}</span>
      <h3>{story.title}</h3>
      <p>{story.summary}</p>
      {!compact && <div className="chapters-chain">{story.chain.map((step) => {
        const Icon = chainIcon(step);
        return <span key={step} className={chainClass(step)}><Icon />{step}</span>;
      })}</div>}
      <div className="chapters-preview-list">
        {story.preview.map((item) => <div key={item.label}><strong>{item.label}</strong><p>{item.text}</p></div>)}
      </div>
      <div className="chapters-card-foot">
        <span>{story.sources.length} connected sources</span>
        <Link to={`/projects/${projectId}/v3`}>View full story <IconArrow /></Link>
      </div>
    </article>
  );
}

function chainIcon(step) {
  if (step.includes("Research")) return IconGraph;
  if (step.includes("Design")) return IconFile;
  if (step.includes("Decision")) return IconDecision;
  if (step.includes("Validation")) return IconGauge;
  if (step.includes("Reusable")) return IconRuler;
  return IconFile;
}

function chainClass(step) {
  if (step.includes("Research")) return "research";
  if (step.includes("Design")) return "design";
  if (step.includes("Decision")) return "decision";
  if (step.includes("Validation")) return "evidence";
  if (step.includes("Reusable")) return "guideline";
  return "";
}
