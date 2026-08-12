import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  contributors,
  departmentColors,
  feedbackAnalysis,
  figmaFiles,
  futureTasks,
  jira,
  projectComments,
  projectIssues,
  projectMetrics,
  projects,
  projectTeams,
  statusBadge,
  timeline,
  timelineActive,
  usabilityVideos,
} from "../data";
import { IconArrow, IconCheck, IconDecision, IconExternalLink, IconGauge, IconGraph, IconPlay, IconRuler } from "../components/Icons";
import MagicWand from "../components/MagicWand";

function Donut({ segments, size = 132, stroke = 22 }) {
  const total = segments.reduce((s, x) => s + x.value, 0);
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  let acc = 0;

  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
      {segments.map((seg) => {
        const len = (seg.value / total) * c;
        const el = (
          <circle
            key={seg.label}
            cx={size / 2}
            cy={size / 2}
            r={r}
            fill="none"
            stroke={seg.color}
            strokeWidth={stroke}
            strokeDasharray={`${len} ${c - len}`}
            strokeDashoffset={-acc}
          />
        );
        acc += len;
        return el;
      })}
    </svg>
  );
}

function SectionHead({ label, title, desc }) {
  return (
    <div className="pdv2-head">
      <span>{label}</span>
      <div>
        <h3>{title}</h3>
        {desc && <p>{desc}</p>}
      </div>
    </div>
  );
}

function KnowledgeCard({ tone, eyebrow, title, body, to }) {
  return (
    <Link to={to} className={`pdv2-know-card ${tone}`}>
      <span>{eyebrow}</span>
      <strong>{title}</strong>
      <p>{body}</p>
      <small>View source <IconArrow /></small>
    </Link>
  );
}

export default function ProjectDetailV2() {
  const { id } = useParams();
  const project = projects.find((p) => p.id === id) || projects[0];
  const color = departmentColors[project.department];
  const team = projectTeams[id] || contributors;
  const files = figmaFiles[id] || figmaFiles["fee-management"] || [];
  const [showDelivery, setShowDelivery] = useState(false);
  const [activeExplore, setActiveExplore] = useState("design");

  const taskSuccess = projectMetrics.find((m) => m.label === "Task Success");
  const errorRate = projectMetrics.find((m) => m.label === "Error Rate");
  const completionTime = projectMetrics.find((m) => m.label === "Completion Time");
  const impactMetrics = [
    taskSuccess,
    errorRate,
    completionTime,
    { label: "Satisfaction", from: "3.1", to: "4.6" },
  ].filter(Boolean);

  const exploreTabs = [
    { id: "decisions", label: "Decisions", icon: IconDecision },
    { id: "research", label: "Research", icon: IconGraph },
    { id: "guidelines", label: "Guidelines", icon: IconRuler },
    { id: "evidence", label: "Evidence", icon: IconGauge },
    { id: "design", label: "Design files", icon: IconExternalLink },
    { id: "usability", label: "Usability tests", icon: IconPlay },
    { id: "feedback", label: "Feedback", icon: IconGraph },
    { id: "delivery", label: "Delivery", icon: IconCheck },
  ];

  return (
    <div className="page pdv2-page">
      <section className="pdv2-hero-v3">
        <div className="pdv2-hero-orb" />
        <div className="pdv2-hero-content">
          <div className="pdv2-kicker">
            <span className={"badge " + statusBadge[project.status]}>{project.status}</span>
            <span className="badge" style={{ background: `${color}22`, color }}>{project.department}</span>
            <span>Sprint {project.sprint}</span>
            <span>Last updated {project.updated}</span>
          </div>
          <h2>{project.name}</h2>
          <p>{project.summary}</p>
          <div className="pdv2-hero-actions">
            <Link to="/chat" className="btn btn-primary"><MagicWand size={32} /> Ask about this project</Link>
            <a href={files[0]?.url || "#"} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">Open project files</a>
          </div>
        </div>
      </section>

      <section className="pdv2-brief card">
        <div className="pdv2-brief-top">
          <div className="pdv2-brief-mark"><MagicWand size={58} /></div>
          <div>
            <span className="section-title">Jedi Project Brief</span>
            <h3>What do I need to know?</h3>
            <p className="pdv2-source-line">
              Generated from {project.decisions} decisions, {project.research} research insights, {project.guideline} guidelines, and {project.evidence} evidence sources.
            </p>
          </div>
        </div>
        <p className="pdv2-brief-summary">
          The project is currently in validation. Research found that users frequently missed the primary payment action and experienced uncertainty during the fee workflow. The team redesigned the checkout experience and moved the primary CTA above the fold. Early validation shows task success increased from 62% to 89%, while errors decreased from 12% to 4%. The next priorities are accessibility validation and beta rollout.
        </p>
        <div className="pdv2-insight-grid">
          <div><span>What changed</span><strong>Primary CTA moved above the fold.</strong></div>
          <div><span>Why it matters</span><strong>Users were missing the primary action.</strong></div>
          <div><span>What happens next</span><strong>Accessibility validation, then beta rollout.</strong></div>
        </div>
        <div className="pdv2-brief-actions">
          <button className="btn btn-ghost btn-sm" onClick={() => setActiveExplore("feedback")}>View sources</button>
          <Link to="/chat" className="btn btn-ghost btn-sm">Ask a follow-up</Link>
        </div>
      </section>

      <section className="pdv2-section-v3">
        <SectionHead label="02" title="What you should know" desc="Four signals explain the project faster than the full evidence trail." />
        <div className="pdv2-know-grid">
          <KnowledgeCard tone="blue" eyebrow="Key decision" title="Move the primary CTA above the fold" body="The redesigned checkout makes the primary payment action visible earlier." to={`/projects/${id}/decisions`} />
          <KnowledgeCard tone="violet" eyebrow="Key research" title="7 of 10 participants initially missed the CTA" body="Usability testing showed the original placement was easy to overlook." to="#project-explore" />
          <KnowledgeCard tone="green" eyebrow="Key evidence" title="Task success improved from 62% to 89%" body="Early validation indicates the redesign improved completion." to="#project-impact" />
          <KnowledgeCard tone="orange" eyebrow="Current risk" title="Mobile accessibility still requires validation" body="Accessibility review remains a delivery priority before beta rollout." to="#project-journey" />
        </div>
        <div className="pdv2-count-strip">
          <span>{project.decisions} Decisions</span>
          <span>{project.research} Research</span>
          <span>{project.guideline} Guidelines</span>
          <span>{project.evidence} Evidence</span>
          <Link to={`/projects/${id}/decisions`}>Explore all project knowledge <IconArrow /></Link>
        </div>
      </section>

      <section className="pdv2-section-v3 card" id="project-journey">
        <SectionHead label="03" title="Project journey" desc="Where the project is now, without opening every delivery artifact." />
        <div className="pdv2-flow">
          {timeline.map((step, i) => (
            <div key={step} className={i < timelineActive ? "done" : i === timelineActive ? "active" : ""}>
              <span>{i < timelineActive ? "✓" : i === timelineActive ? "●" : i + 1}</span>
              <strong>{step}</strong>
            </div>
          ))}
        </div>
        <div className="pdv2-now-next">
          <div><span>Now</span><strong>Validate the redesigned checkout and accessibility.</strong></div>
          <div><span>Next</span><strong>Finalize beta rollout.</strong></div>
          <button className="btn btn-ghost btn-sm" onClick={() => setShowDelivery((s) => !s)}>
            {showDelivery ? "Hide delivery details" : "View delivery details"}
          </button>
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
      </section>

      <section className="pdv2-section-v3" id="project-impact">
        <SectionHead label="04" title="Impact so far" desc="The clearest before-and-after outcomes from v1 to v2." />
        <div className="pdv2-impact-row">
          {impactMetrics.map((metric) => (
            <div key={metric.label} className="pdv2-impact-tile">
              <span>{metric.label}</span>
              <strong>{metric.from} <IconArrow /> {metric.to}</strong>
            </div>
          ))}
        </div>
        <p className="pdv2-jedi-note"><strong>Jedi summary:</strong> The redesign improved both successful completion and efficiency, with the strongest improvement in task success.</p>
      </section>

      <section className="pdv2-section-v3 card pdv2-people">
        <SectionHead label="05" title="People involved" desc="Core contributors for the validation phase." />
        <div className="pdv2-people-row">
          {team.map((person) => (
            <div key={person.name}>
              <span className="avatar" style={{ background: person.color }}>{person.ini || person.name.split(" ").map((n) => n[0]).join("")}</span>
              <strong>{person.name}</strong>
              <small>{person.role}</small>
            </div>
          ))}
          <button className="btn btn-ghost btn-sm">View responsibility map</button>
        </div>
      </section>

      <section className="pdv2-section-v3 card" id="project-explore">
        <SectionHead label="06" title="Explore project knowledge" desc="Open one detail category at a time when you need the underlying evidence." />
        <div className="pdv2-tabs">
          {exploreTabs.map((tab) => (
            <button key={tab.id} className={activeExplore === tab.id ? "active" : ""} onClick={() => setActiveExplore(tab.id)}>
              <tab.icon />{tab.label}
            </button>
          ))}
        </div>

        <div className="pdv2-tab-panel">
          {activeExplore === "decisions" && (
            <div className="pdv2-simple-panel">
              <h4>Decision library</h4>
              <p>Browse the full rationale trail for the {project.decisions} decisions linked to this project.</p>
              <Link to={`/projects/${id}/decisions`} className="btn btn-ghost btn-sm">Open decisions</Link>
            </div>
          )}

          {activeExplore === "research" && (
            <div className="pdv2-simple-panel">
              <h4>Research insights</h4>
              <p>Research showed participants missed the primary payment action and needed clearer fee breakdowns.</p>
              {feedbackAnalysis.insights.map((insight) => <p key={insight}><IconCheck />{insight}</p>)}
            </div>
          )}

          {activeExplore === "guidelines" && (
            <div className="pdv2-simple-panel orange">
              <h4>Guidelines</h4>
              <p>Reusable guidance from this project now informs payment actions, fee summaries, and accessibility-ready checkout patterns.</p>
              <strong>{project.guideline} guidelines linked</strong>
            </div>
          )}

          {activeExplore === "evidence" && (
            <div className="pdv2-simple-panel green">
              <h4>Evidence sources</h4>
              <p>Evidence connects the CTA change to higher task success and reduced errors during validation.</p>
              <strong>{project.evidence} evidence sources linked</strong>
            </div>
          )}

          {activeExplore === "design" && (
            <div className="pdv2-design-files">
              {files.map((file) => (
                <a key={file.name} href={file.url} target="_blank" rel="noopener noreferrer">
                  {file.image && <img src={file.image} alt={file.name} />}
                  <span className={"badge " + file.badge}>{file.status}</span>
                  <strong>{file.name}</strong>
                  <small>Open Figma <IconExternalLink /></small>
                </a>
              ))}
            </div>
          )}

          {activeExplore === "usability" && (
            <div className="pdv2-video-grid">
              {usabilityVideos.map((video) => (
                <div key={video.caption}>
                  <div className="usab-video" style={{ background: `url(${video.image}) center/cover no-repeat` }}>
                    <span className="usab-play"><IconPlay /></span>
                    <span className="usab-dur">{video.duration}</span>
                  </div>
                  <div className="usab-cap"><strong>{video.caption}</strong><p>{video.tag} · {video.tag2}</p></div>
                </div>
              ))}
            </div>
          )}

          {activeExplore === "feedback" && (
            <div className="pdv2-feedback-panel">
              <Donut segments={feedbackAnalysis.segments} />
              <div>
                <h4>{feedbackAnalysis.title}</h4>
                <p>{feedbackAnalysis.desc}</p>
                <div className="fa-sentiment mt16">
                  {feedbackAnalysis.sentiment.map((s) => <span key={s.label} className="fa-sent-seg" style={{ flex: s.value, background: s.color }} title={`${s.label} ${s.value}%`} />)}
                </div>
                {feedbackAnalysis.segments.map((segment) => <p key={segment.label}><span className="fa-leg-dot" style={{ background: segment.color }} />{segment.label}: {segment.value}</p>)}
              </div>
            </div>
          )}

          {activeExplore === "delivery" && (
            <div className="pdv2-disclosure-grid visible">
              <div>
                <h4>Issues</h4>
                {projectIssues.map((issue) => <p key={issue.label}>{issue.label}<span>{issue.count}</span></p>)}
              </div>
              <div>
                <h4>Collaboration</h4>
                {projectComments.map((comment) => <p key={comment.who}>{comment.who}<span>{comment.text}</span></p>)}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
