import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { decisionById, projects } from "../data";
import { IconArrow, IconDecision, IconFile, IconGauge, IconGraph, IconRuler, IconSearch, IconSparkle } from "../components/Icons";

const typeMeta = {
  all: {
    title: "Knowledge",
    subtitle: "Connected decisions, research, evidence, guidelines, and documentation in one repository.",
    search: "Search all project knowledge...",
    typeFilter: "Knowledge type",
    filterOptions: ["Decision", "Research", "Evidence", "Guideline", "Documentation"],
    more: ["Date", "Owner", "Source", "Relationship"],
  },
  decisions: {
    title: "Design Decisions",
    subtitle: "Understand what was decided, why, and how decisions evolved over time.",
    search: "Search decisions, rationale, alternatives...",
    typeFilter: "Status",
    filterOptions: ["Active", "Superseded", "Under review"],
    more: ["Decision date", "Owner", "Tags"],
  },
  research: {
    title: "Research Insights",
    subtitle: "Find validated learnings from research, testing, and analytics.",
    search: "Search user needs, behaviours, findings...",
    typeFilter: "Research method",
    filterOptions: ["Usability testing", "Interviews", "Analytics", "Survey", "Field study"],
    more: ["Audience / user group", "Date", "Researcher"],
  },
  guidelines: {
    title: "Guidelines",
    subtitle: "Reusable guidance based on previous decisions and evidence.",
    search: "How should I design...?",
    typeFilter: "Topic",
    filterOptions: ["Accessibility", "Interaction", "Content", "Forms", "Navigation"],
    more: ["Platform", "Status"],
    shortcuts: ["Accessibility", "Interaction", "Content", "Forms", "Navigation"],
  },
  evidence: {
    title: "Evidence",
    subtitle: "Trace metrics, validation results, and observations back to design decisions.",
    search: "Search metrics, test results, validation...",
    typeFilter: "Evidence type",
    filterOptions: ["Quantitative", "Qualitative", "Testing", "Analytics"],
    more: ["Date", "Source"],
  },
  docs: {
    title: "Project Documentation",
    subtitle: "Understand project context, progress, handovers, and open questions.",
    search: "Search project context, milestones, risks...",
    typeFilter: "Phase",
    filterOptions: ["Discovery", "Definition", "Validation", "Build", "Launch"],
    more: ["Document type", "Owner", "Updated"],
    shortcuts: ["Overview", "Handover", "Workshop", "Specification", "Meeting notes"],
  },
};

const mockKnowledge = {
  research: [
    {
      id: "RS-001", title: "Users often missed the primary payment CTA", projectId: "fee-management", projectArea: "Checkout", method: "Usability testing", audience: "Finance operators", owner: "Kai Morgan", updated: "24 May 2026",
      finding: "7 of 10 participants did not notice the action without scrolling.", implication: "Keep critical actions visible during payment flows.", strength: "High", participants: "10 participants", source: "Payment flow usability study", quote: "I expected the next step to be visible near the total.", relatedDecision: "DD-001",
    },
    {
      id: "RS-002", title: "Operators need confidence before submitting fees", projectId: "fee-management", projectArea: "Review", method: "Interviews", audience: "Billing specialists", owner: "Sarah Lee", updated: "20 May 2026",
      finding: "Users repeatedly checked totals against source systems before submission.", implication: "Show calculation logic and audit details beside final actions.", strength: "Medium", participants: "6 interviews", source: "Billing specialist interviews", quote: "I need to know where that number came from before I approve it.", relatedDecision: "DD-012",
    },
    {
      id: "RS-003", title: "Payment errors created avoidable support loops", projectId: "fee-management", projectArea: "Errors", method: "Analytics", audience: "Internal support", owner: "Alex Kim", updated: "18 May 2026",
      finding: "Most support tickets repeated the same payment-failure investigation path.", implication: "Expose recovery steps and failure context in-product.", strength: "High", participants: "214 tickets", source: "Support ticket analysis", quote: "The code tells me nothing actionable.", relatedDecision: "DD-026",
    },
  ],
  guidelines: [
    {
      id: "GL-001", title: "Keep primary actions visible in critical flows", projectId: "fee-management", topic: "Accessibility", productArea: "Checkout", platform: "Web", status: "Active", owner: "Alex Kim", updated: "28 May 2026",
      useWhen: "Users must complete a time-sensitive or essential task.", avoidWhen: "Persistent actions would obscure important content.", why: "Critical actions are missed when buried below dense review content.", do: ["Keep the next action within the first viewport", "Pair action labels with the exact outcome"], avoid: ["Hiding final actions below long summaries", "Using generic labels like Continue"], basedOn: "3 decisions · 2 research studies", relatedDecision: "DD-001",
    },
    {
      id: "GL-002", title: "Explain payment failures in plain language", projectId: "fee-management", topic: "Content", productArea: "Errors", platform: "Web", status: "Active", owner: "Sarah Lee", updated: "26 May 2026",
      useWhen: "A user can recover from a failed transaction.", avoidWhen: "The system cannot safely expose operational details.", why: "Error codes forced users to contact support even for self-service fixes.", do: ["State what happened", "Give a specific recovery action"], avoid: ["Displaying only backend codes", "Blaming the user"], basedOn: "2 decisions · 1 analytics review", relatedDecision: "DD-026",
    },
    {
      id: "GL-003", title: "Show review-step progress in multi-step fee tasks", projectId: "fee-management", topic: "Navigation", productArea: "Workflow", platform: "Web", status: "Under review", owner: "Priyal Shah", updated: "21 May 2026",
      useWhen: "Users move through three or more dependent steps.", avoidWhen: "The task is a single-page edit with no sequence.", why: "Progress context reduced abandonment in long fee setup tasks.", do: ["Show current step and completed steps", "Let users return to completed steps"], avoid: ["Using progress as decoration only", "Locking users into a dead-end step"], basedOn: "2 decisions · 1 research study", relatedDecision: "DD-003",
    },
  ],
  evidence: [
    {
      id: "EV-001", title: "After moving the CTA above the fold", projectId: "fee-management", category: "Testing", resultLabel: "Task Success", before: "62%", after: "89%", delta: "+27%", source: "Usability test · 10 participants", updated: "29 May 2026", owner: "Kai Morgan",
      summary: "Participants found and completed the payment review action more reliably after the CTA moved into the first viewport.", tested: "CTA placement in the payment review flow", supports: "DD-001", relatedResearch: "RS-001",
    },
    {
      id: "EV-002", title: "Payment failure support contacts reduced", projectId: "fee-management", category: "Analytics", resultLabel: "Support Tickets", before: "42/wk", after: "19/wk", delta: "-55%", source: "Support analytics", updated: "27 May 2026", owner: "Sarah Lee",
      summary: "Plain-language error explanations reduced repeated support contacts for recoverable failures.", tested: "AI-generated failure explanation panel", supports: "DD-026", relatedResearch: "RS-003",
    },
    {
      id: "EV-003", title: "Review time dropped after inline calculation context", projectId: "fee-management", category: "Quantitative", resultLabel: "Median Review Time", before: "8m 10s", after: "5m 40s", delta: "-30%", source: "Workflow analytics", updated: "22 May 2026", owner: "Alex Kim",
      summary: "Showing calculation details reduced cross-checking time before approval.", tested: "Inline fee calculation details", supports: "DD-012", relatedResearch: "RS-002",
    },
  ],
  docs: [
    {
      id: "DOC-001", title: "Fee Management System", projectId: "fee-management", phase: "Validation", docType: "Overview", owner: "Sarah Lee", updated: "2 days ago",
      context: "Redesigning the internal fee management workflow to reduce processing errors and improve transparency.", summary: "New joiners should understand that the project is validating the payment review flow, with CTA visibility, error recovery, and calculation confidence as the highest-risk areas.", milestones: ["Prototype validated with finance operators", "Accessibility pass completed", "Beta handover prepared"], keyDecisions: 3, openQuestions: 2, risks: 1,
    },
    {
      id: "DOC-002", title: "Checkout Validation Handover", projectId: "fee-management", phase: "Validation", docType: "Handover", owner: "Alex Kim", updated: "Yesterday",
      context: "Handover notes for the checkout validation sprint and engineering implementation questions.", summary: "Focus on preserving the validated CTA hierarchy and ensuring analytics events stay attached to the final review action.", milestones: ["Design QA scheduled", "Analytics taxonomy reviewed", "Engineering edge cases captured"], keyDecisions: 2, openQuestions: 3, risks: 2,
    },
  ],
};

function decisionItems(projectId) {
  return Object.values(decisionById).slice(0, 8).map((d, index) => ({
    ...d,
    projectId,
    projectArea: index % 2 ? "Review" : "Checkout",
    displayStatus: ["Active", "Under review", "Superseded"][index % 3],
    evidenceCount: d.evidenceCards?.length || 2,
    researchCount: d.researchCards?.length || 1,
    decisionText: d.alternatives?.find((a) => a.selected)?.name || d.title,
    why: d.summary.split(".")[0] || "Improved discoverability",
    tradeoff: d.alternatives?.find((a) => a.selected)?.cons || "Denser first viewport",
  }));
}

function itemsFor(type, projectId) {
  if (type === "all") return allKnowledgeItems(projectId);
  if (type === "decisions") return decisionItems(projectId);
  return mockKnowledge[type] || [];
}

function allKnowledgeItems(projectId) {
  const decisionList = decisionItems(projectId).slice(0, 5).map((item) => ({ ...item, knowledgeType: "Decision", typeKey: "decisions", summaryText: item.summary, filterValue: "Decision", updated: item.updated || "Today" }));
  const researchList = mockKnowledge.research.map((item) => ({ ...item, knowledgeType: "Research", typeKey: "research", summaryText: item.finding, filterValue: "Research" }));
  const evidenceList = mockKnowledge.evidence.map((item) => ({ ...item, knowledgeType: "Evidence", typeKey: "evidence", summaryText: item.summary, filterValue: "Evidence" }));
  const guidelineList = mockKnowledge.guidelines.map((item) => ({ ...item, knowledgeType: "Guideline", typeKey: "guidelines", summaryText: item.why, filterValue: "Guideline" }));
  const docsList = mockKnowledge.docs.map((item) => ({ ...item, knowledgeType: "Documentation", typeKey: "docs", summaryText: item.summary, filterValue: "Documentation" }));
  return [...researchList, ...decisionList, ...evidenceList, ...guidelineList, ...docsList].filter((item) => item.projectId === projectId);
}

function KnowledgeShell({ meta, projectsList, filters, setFilters, children }) {
  const [showMore, setShowMore] = useState(false);
  const activeChips = [filters.project !== "all" && projectsList.find((p) => p.id === filters.project)?.name, filters.type, filters.extra].filter(Boolean);
  const clearFilters = () => setFilters({ query: "", project: "all", type: "", extra: "" });

  return (
    <div className="page knowledge-page">
      <div className="knowledge-head">
        <div>
          <h2>{meta.title}</h2>
          <p>{meta.subtitle}</p>
        </div>
        <button className="btn btn-ghost btn-sm" onClick={() => setShowMore((v) => !v)}>More filters</button>
      </div>

      <div className="knowledge-filterbar">
        <label className="knowledge-search">
          <span><IconSearch /></span>
          <input value={filters.query} onChange={(e) => setFilters((f) => ({ ...f, query: e.target.value }))} placeholder={meta.search} />
        </label>
        <select value={filters.project} onChange={(e) => setFilters((f) => ({ ...f, project: e.target.value }))}>
          <option value="all">All projects</option>
          {projectsList.map((p) => <option key={p.id} value={p.id}>{p.name}</option>)}
        </select>
        <select value={filters.type} onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}>
          <option value="">{meta.typeFilter}</option>
          {meta.filterOptions.map((o) => <option key={o} value={o}>{o}</option>)}
        </select>
      </div>

      {showMore && (
        <div className="knowledge-more card">
          {meta.more.map((label) => (
            <button key={label} className={filters.extra === label ? "active" : ""} onClick={() => setFilters((f) => ({ ...f, extra: f.extra === label ? "" : label }))}>{label}</button>
          ))}
        </div>
      )}

      {activeChips.length > 0 && (
        <div className="knowledge-chips">
          {activeChips.map((chip) => <span key={chip}>{chip}</span>)}
          <button onClick={clearFilters}>Clear all filters</button>
        </div>
      )}

      {children}
    </div>
  );
}

function useFilteredItems(type, projectId) {
  const [filters, setFilters] = useState({ query: "", project: projectId || "all", type: "", extra: "" });
  const items = useMemo(() => itemsFor(type, projectId), [type, projectId]);
  const filtered = useMemo(() => {
    const q = filters.query.trim().toLowerCase();
    return items.filter((item) => {
      if (filters.project !== "all" && item.projectId !== filters.project) return false;
      const typeValue = item.displayStatus || item.method || item.topic || item.category || item.phase;
      if (filters.type && typeValue !== filters.type && item.filterValue !== filters.type) return false;
      if (!q) return true;
      const hay = [item.title, item.summary, item.problem, item.finding, item.implication, item.context, item.guideline, item.why].filter(Boolean).join(" ").toLowerCase();
      return hay.includes(q);
    });
  }, [items, filters]);
  return { filters, setFilters, filtered };
}

export default function KnowledgeSection({ type = "decisions" }) {
  const { projectId = "fee-management" } = useParams();
  const meta = typeMeta[type];
  const { filters, setFilters, filtered } = useFilteredItems(type, projectId);
  const project = projects.find((p) => p.id === projectId) || projects[0];

  return (
    <KnowledgeShell meta={meta} projectsList={projects} filters={filters} setFilters={setFilters}>
      {meta.shortcuts && (
        <div className="knowledge-shortcuts">
          {meta.shortcuts.map((s) => <button key={s} onClick={() => setFilters((f) => ({ ...f, type: s }))}>{s}</button>)}
        </div>
      )}
      {type === "all" && <AllKnowledge items={filtered} project={project} />}
      {type === "decisions" && <DecisionTimeline items={filtered} project={project} />}
      {type === "research" && <ResearchCards items={filtered} project={project} />}
      {type === "guidelines" && <GuidelineLibrary items={filtered} project={project} />}
      {type === "evidence" && <EvidenceResults items={filtered} project={project} />}
      {type === "docs" && <DocumentationHandbook items={filtered} project={project} />}
    </KnowledgeShell>
  );
}

function EmptyState() {
  return <div className="card knowledge-empty">No knowledge matched the current filters.</div>;
}

const typeBadgeClass = {
  Decision: "decision",
  Research: "research",
  Evidence: "evidence",
  Guideline: "guideline",
  Documentation: "docs",
};

function TypeBadge({ type }) {
  return <span className={`knowledge-type-badge ${typeBadgeClass[type] || ""}`}>{type}</span>;
}

function AllKnowledge({ items, project }) {
  const [openStory, setOpenStory] = useState("cta");
  const stories = [
    {
      id: "cta",
      title: "Primary action visibility became a reusable pattern",
      chain: [
        ["Research Insight", "Users missed the payment CTA"],
        ["Design Decision", "Move CTA above the fold"],
        ["Evidence", "Task success increased to 89%"],
        ["Guideline", "Keep primary actions visible in critical flows"],
      ],
    },
    {
      id: "errors",
      title: "Payment failure evidence shaped plain-language recovery guidance",
      chain: [
        ["Research Insight", "Payment errors created support loops"],
        ["Design Decision", "Explain payment failures in plain language"],
        ["Evidence", "Support contacts reduced"],
        ["Guideline", "Show recovery actions users can understand"],
      ],
    },
  ];

  return (
    <>
      <section className="card knowledge-brief">
        <div className="knowledge-brief-mark"><IconSparkle /></div>
        <div>
          <div className="section-title">Jedi Knowledge Brief</div>
          <p>Users struggled to notice the primary payment action. Research led the team to move the CTA above the fold. Validation increased task success from 62% to 89%. This became a reusable accessibility guideline.</p>
          <div className="knowledge-brief-actions">
            <Link to={`/projects/${project.id}/research/RS-001`} className="btn btn-ghost btn-sm">View sources</Link>
            <Link to="/chat" className="btn btn-ghost btn-sm">Ask about this</Link>
          </div>
        </div>
      </section>

      <section className="knowledge-stories">
        <div className="section-title">Connected Knowledge Stories</div>
        {stories.map((story) => {
          const isOpen = openStory === story.id;
          return (
            <article key={story.id} className="knowledge-story card">
              <button type="button" onClick={() => setOpenStory(isOpen ? "" : story.id)}>
                <strong>{story.title}</strong>
                <span>{isOpen ? "Collapse" : "Expand"}</span>
              </button>
              {isOpen && (
                <div className="knowledge-story-chain">
                  {story.chain.map(([label, text], index) => (
                    <div key={label}>
                      <span>{label}</span>
                      <strong>{text}</strong>
                      {index < story.chain.length - 1 && <IconArrow />}
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </section>

      <section className="knowledge-recent">
        <div className="section-title">Recent Knowledge</div>
        {items.slice(0, 10).map((item) => (
          <Link key={`${item.typeKey}-${item.id}`} to={`/projects/${project.id}/${item.typeKey}/${item.id}`} className="knowledge-feed-row">
            <TypeBadge type={item.knowledgeType} />
            <div>
              <strong>{item.title}</strong>
              <p>{item.summaryText}</p>
            </div>
            <span>{item.updated || project.updated}</span>
          </Link>
        ))}
      </section>
    </>
  );
}

function DecisionTimeline({ items, project }) {
  if (!items.length) return <EmptyState />;
  return (
    <div className="decision-timeline">
      {items.map((d) => (
        <article key={d.id} className="decision-timeline-item">
          <div className="decision-marker"><IconDecision /></div>
          <div className="decision-panel">
            <div className="knowledge-row-meta"><span>{project.name} · {d.projectArea}</span><span className={`knowledge-status ${d.displayStatus.toLowerCase().replace(" ", "-")}`}>{d.displayStatus}</span></div>
            <h3>{d.title}</h3>
            <p>{d.summary}</p>
            <div className="decision-preview">
              <div><strong>Decision</strong><span>{d.decisionText}</span></div>
              <div><strong>Why</strong><span>{d.why}</span></div>
              <div><strong>Trade-off</strong><span>{d.tradeoff}</span></div>
            </div>
            <div className="knowledge-card-foot"><span>{d.researchCount} research · {d.evidenceCount} evidence</span><Link to={`/projects/${project.id}/decisions/${d.id}`}>View decision <IconArrow /></Link></div>
          </div>
        </article>
      ))}
    </div>
  );
}

function ResearchCards({ items, project }) {
  if (!items.length) return <EmptyState />;
  return (
    <div className="research-grid">
      {items.map((r) => (
        <article key={r.id} className="research-card">
          <div className="research-eyebrow">Key finding</div>
          <h3>{r.title}</h3>
          <p>{r.finding}</p>
          <div className="research-context"><span>{r.method}</span><span>{r.participants}</span><span>{r.strength} strength</span></div>
          <blockquote>{r.quote}</blockquote>
          <div className="research-implication"><strong>Design implication:</strong> {r.implication}</div>
          <div className="knowledge-card-foot"><span>{project.name}</span><Link to={`/projects/${project.id}/research/${r.id}`}>View research <IconArrow /></Link></div>
        </article>
      ))}
    </div>
  );
}

function GuidelineLibrary({ items, project }) {
  if (!items.length) return <EmptyState />;
  return (
    <div className="guideline-library">
      {items.map((g) => (
        <article key={g.id} className="guideline-card">
          <span className="guideline-topic">{g.topic}</span>
          <h3>{g.title}</h3>
          <div className="guideline-use"><strong>Use when:</strong><p>{g.useWhen}</p></div>
          <div className="guideline-avoid"><strong>Avoid when:</strong><p>{g.avoidWhen}</p></div>
          <div className="knowledge-card-foot"><span>Based on {g.basedOn}</span><Link to={`/projects/${project.id}/guidelines/${g.id}`}>View guideline <IconArrow /></Link></div>
        </article>
      ))}
    </div>
  );
}

function EvidenceResults({ items, project }) {
  if (!items.length) return <EmptyState />;
  return (
    <div className="evidence-results">
      {items.map((e) => (
        <article key={e.id} className="evidence-card">
          <div className="evidence-label">{e.resultLabel}</div>
          <div className="evidence-metric"><span>{e.before}</span><IconArrow /><span>{e.after}</span><strong>{e.delta}</strong></div>
          <h3>{e.title}</h3>
          <p>{e.source}</p>
          <div className="supports-link">Supports <IconArrow /> <span>{decisionById[e.supports]?.title || e.supports}</span></div>
          <div className="knowledge-card-foot"><span>{e.category}</span><Link to={`/projects/${project.id}/evidence/${e.id}`}>View evidence <IconArrow /></Link></div>
        </article>
      ))}
    </div>
  );
}

function DocumentationHandbook({ items, project }) {
  if (!items.length) return <EmptyState />;
  return (
    <div className="doc-handbook">
      {items.map((doc) => (
        <article key={doc.id} className="doc-card">
          <div className="doc-cover"><span>{doc.title}</span><small>Updated {doc.updated}</small></div>
          <div className="doc-body">
            <div className="knowledge-row-meta"><span>Current phase: <strong>{doc.phase}</strong></span><span>{doc.docType}</span></div>
            <p>{doc.context}</p>
            <div className="doc-stats"><span>Key decisions: {doc.keyDecisions}</span><span>Open questions: {doc.openQuestions}</span><span>Known risks: {doc.risks}</span></div>
            <Link to={`/projects/${project.id}/docs/${doc.id}`}>View project documentation <IconArrow /></Link>
          </div>
        </article>
      ))}
    </div>
  );
}

export function KnowledgeDetail({ type = "decisions" }) {
  const { projectId = "fee-management", itemId, decisionId } = useParams();
  const id = itemId || decisionId;
  const project = projects.find((p) => p.id === projectId) || projects[0];
  const item = type === "decisions" ? decisionItems(projectId).find((d) => d.id === id) : itemsFor(type, projectId).find((d) => d.id === id);
  if (!item) return <div className="page"><div className="card">Knowledge item not found.</div></div>;

  return (
    <div className="page knowledge-detail-page">
      <Link to={`/projects/${project.id}/${type}`} className="faint knowledge-back">← Back to {typeMeta[type].title}</Link>
      <div className={`knowledge-detail detail-${type}`}>
        <main className="knowledge-detail-main">
          {type === "decisions" && <DecisionDetailContent item={item} project={project} />}
          {type === "research" && <ResearchDetailContent item={item} />}
          {type === "guidelines" && <GuidelineDetailContent item={item} />}
          {type === "evidence" && <EvidenceDetailContent item={item} />}
          {type === "docs" && <DocsDetailContent item={item} />}
        </main>
        <aside className="knowledge-detail-side">
          <SideSection title="Sources" items={[item.source || item.research || "Design Bridge record", item.evidence || "Linked project evidence"].filter(Boolean)} />
          <RelatedKnowledge project={project} type={type} item={item} />
          <SideSection title="Project" items={[project.name]} />
          <SideSection title="Owner / contributor" items={[item.owner || "Design system team"]} />
          <SideSection title="Last updated" items={[item.updated || project.updated]} />
        </aside>
      </div>
    </div>
  );
}

function SideSection({ title, items }) {
  return <section><h4>{title}</h4>{items.map((i) => <p key={i}>{i}</p>)}</section>;
}

function RelatedKnowledge({ project, type, item }) {
  const related = {
    Research: item.relatedResearch || item.research || mockKnowledge.research[0]?.title,
    Decisions: item.relatedDecision || item.supports || item.relatedDecisions?.[0] || "DD-001",
    Evidence: item.evidence || mockKnowledge.evidence[0]?.title,
    Guidelines: item.guideline || mockKnowledge.guidelines[0]?.title,
    Documentation: mockKnowledge.docs[0]?.title,
  };

  return (
    <section className="related-knowledge-side">
      <h4>Related Knowledge</h4>
      {Object.entries(related).map(([label, value]) => (
        <p key={label}><strong>{label}</strong><span>{value}</span></p>
      ))}
      <Link to={`/projects/${project.id}/knowledge`}>Explore connected knowledge <IconArrow /></Link>
    </section>
  );
}

function DetailBlock({ title, children }) {
  return <section className="detail-block"><h3>{title}</h3>{children}</section>;
}

function DecisionDetailContent({ item }) {
  return (
    <>
      <div className="detail-hero"><span className="knowledge-status active">{item.displayStatus}</span><h2>{item.title}</h2><p>{item.summary}</p></div>
      <DetailBlock title="Context / Problem"><p>{item.problem}</p></DetailBlock>
      <DetailBlock title="Alternatives considered"><div className="detail-alt-grid">{item.alternatives.map((a) => <div key={a.name} className={a.selected ? "selected" : ""}><strong>{a.name}</strong><p>{a.pros}</p><small>{a.cons}</small></div>)}</div></DetailBlock>
      <DetailBlock title="Decision made"><p>{item.decisionText}</p></DetailBlock>
      <DetailBlock title="Rationale"><p>{item.aiSummary}</p></DetailBlock>
      <DetailBlock title="Consequences / trade-offs"><p>{item.tradeoff}</p></DetailBlock>
      <DetailBlock title="Supporting evidence"><p>{item.evidence}</p></DetailBlock>
      <DetailBlock title="Related research"><p>{item.research}</p></DetailBlock>
      <DetailBlock title="Figma frame"><p>{item.figmaFiles?.[0]?.name || "Linked Figma frame"}</p></DetailBlock>
      <DetailBlock title="Decision Timeline"><div className="detail-history"><span>Initial usability issue found</span><span>Alternatives reviewed</span><span>Decision approved</span><span>Outcome validated</span></div></DetailBlock>
      <DetailBlock title="Superseded by / influenced by"><p>{item.relatedDecisions?.join(", ") || "No superseding decision"}</p></DetailBlock>
    </>
  );
}

function ResearchDetailContent({ item }) {
  return <><div className="detail-hero"><span>Key finding</span><h2>{item.title}</h2><p>{item.finding}</p></div><DetailBlock title="Research context"><p>{item.source}</p></DetailBlock><DetailBlock title="Method"><p>{item.method}</p></DetailBlock><DetailBlock title="Participants / sample"><p>{item.participants} · {item.audience}</p></DetailBlock><DetailBlock title="Supporting evidence"><p>Evidence strength: {item.strength}</p></DetailBlock><DetailBlock title="Design implication"><p>{item.implication}</p></DetailBlock><DetailBlock title="Quotes / clips"><blockquote>{item.quote}</blockquote></DetailBlock><DetailBlock title="Related decisions"><p>{decisionById[item.relatedDecision]?.title}</p></DetailBlock><DetailBlock title="Research source"><p>{item.source}</p></DetailBlock></>;
}

function GuidelineDetailContent({ item }) {
  return <><div className="detail-hero"><span>{item.topic}</span><h2>{item.title}</h2><p>{item.why}</p></div><DetailBlock title="Guideline statement"><p>{item.title}</p></DetailBlock><DetailBlock title="Why it matters"><p>{item.why}</p></DetailBlock><DetailBlock title="Do / Avoid"><div className="do-avoid"><div><h4>Do</h4>{item.do.map((d) => <p key={d}>{d}</p>)}</div><div><h4>Avoid</h4>{item.avoid.map((a) => <p key={a}>{a}</p>)}</div></div></DetailBlock><DetailBlock title="When to use"><p>{item.useWhen}</p></DetailBlock><DetailBlock title="When not to use"><p>{item.avoidWhen}</p></DetailBlock><DetailBlock title="Example"><p>Apply this pattern in fee checkout review screens.</p></DetailBlock><DetailBlock title="Related considerations"><p>{item.productArea} · {item.platform}</p></DetailBlock><DetailBlock title="Evidence behind the guideline"><p>{item.basedOn}</p></DetailBlock></>;
}

function EvidenceDetailContent({ item }) {
  return <><div className="detail-hero metric"><span>{item.resultLabel}</span><h2>{item.before} → {item.after}</h2><p>{item.delta} · {item.title}</p></div><DetailBlock title="Key result"><p>{item.delta} change in {item.resultLabel}.</p></DetailBlock><DetailBlock title="Evidence summary"><p>{item.summary}</p></DetailBlock><DetailBlock title="Evidence type"><p>{item.category}</p></DetailBlock><DetailBlock title="What was tested"><p>{item.tested}</p></DetailBlock><DetailBlock title="Source"><p>{item.source}</p></DetailBlock><DetailBlock title="What this evidence supports"><p>{decisionById[item.supports]?.title}</p></DetailBlock><DetailBlock title="Related decisions"><p>{item.supports}</p></DetailBlock><DetailBlock title="Related research"><p>{item.relatedResearch}</p></DetailBlock></>;
}

function DocsDetailContent({ item }) {
  return <><div className="detail-hero handbook"><span>What a new person needs to know</span><h2>{item.title}</h2><p>{item.summary}</p></div><DetailBlock title="Project overview"><p>{item.context}</p></DetailBlock><DetailBlock title="Current phase"><p>{item.phase}</p></DetailBlock><DetailBlock title="Key milestones"><ul>{item.milestones.map((m) => <li key={m}>{m}</li>)}</ul></DetailBlock><DetailBlock title="Key decisions"><p>{item.keyDecisions} linked decisions</p></DetailBlock><DetailBlock title="Owners / stakeholders"><p>{item.owner}</p></DetailBlock><DetailBlock title="Open questions and risks"><p>{item.openQuestions} open questions · {item.risks} known risks</p></DetailBlock><DetailBlock title="Handover notes"><p>Confirm analytics ownership and validated interaction patterns before implementation.</p></DetailBlock></>;
}
