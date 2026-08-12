import { Link, useParams } from "react-router-dom";
import {
  decisionById,
  figmaFiles,
  knowledgeStories,
  projectMetrics,
  projects,
  usabilityVideos,
} from "../data";
import { IconArrow, IconCheck, IconExternalLink, IconFile, IconGauge, IconPlay } from "../components/Icons";
import jediIcon from "../assets/yoda-main.svg";

const researchRows = [
  ["P01", "No", "42s", "Scrolled"],
  ["P02", "Yes", "18s", "-"],
  ["P03", "No", "51s", "Missed CTA"],
  ["P04", "No", "46s", "Missed CTA"],
];

const validationRows = [
  ["Task success", "62%", "89%"],
  ["Error rate", "12%", "4%"],
  ["Completion time", "4m 21s", "2m 11s"],
  ["Accessibility", "71", "92"],
];

function StorySection({ eyebrow, title, children }) {
  return (
    <section className="pdv3-section">
      <div className="pdv3-section-head">
        <h3>{title} <span>{eyebrow}</span></h3>
      </div>
      {children}
    </section>
  );
}

function SpreadsheetPreview({ title, columns, rows, highlight }) {
  return (
    <div className="pdv3-source-card pdv3-sheet">
      <div className="pdv3-source-top">
        <span><IconFile /></span>
        <div>
          <strong>{title}</strong>
          <small>Spreadsheet snapshot</small>
        </div>
      </div>
      <table>
        <thead>
          <tr>{columns.map((col) => <th key={col}>{col}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.join("-")}>{row.map((cell, index) => <td key={`${cell}-${index}`}>{cell}</td>)}</tr>
          ))}
        </tbody>
      </table>
      {highlight && <div className="pdv3-highlight"><IconCheck />{highlight}</div>}
      <div className="pdv3-actions">
        <button className="btn btn-ghost btn-sm">Open source</button>
        <Link to="/projects/fee-management/research/RS-001" className="btn btn-ghost btn-sm">View full research</Link>
      </div>
    </div>
  );
}

export default function ProjectDetailV3() {
  const { id = "fee-management" } = useParams();
  const project = projects.find((p) => p.id === id) || projects[0];
  const decision = decisionById["DD-001"];
  const story = knowledgeStories.find((item) => item.projectId === project.id && item.chapterNumber === 1) || knowledgeStories[0];
  const files = figmaFiles[id] || figmaFiles["fee-management"] || [];
  const v1 = files[0];
  const v2 = files[1] || files[0];
  const video = usabilityVideos[2] || usabilityVideos[0];

  return (
    <div className="page pdv3-page">
      <div className="pdv3-nav-top" aria-label="Project navigation">
        <Link to={`/projects/${project.id}/chapters`} className="pdv3-back-link" aria-label="Back to project chapters"><IconArrow /></Link>
        <nav className="pdv3-breadcrumb" aria-label="Breadcrumb">
          <Link to={`/projects/${project.id}/chapters`}>{project.name}</Link>
          <span aria-hidden="true">/</span>
          <strong aria-current="page">Chapter {String(story.chapterNumber).padStart(2, "0")}</strong>
        </nav>
      </div>

      <section className="pdv3-hero">
        <div className="pdv3-hero-copy">
          <span className="pdv3-kicker">Chapter {String(story.chapterNumber).padStart(2, "0")}</span>
          <h2>{story.title}</h2>
          <p>{story.brief}</p>
        </div>
      </section>

      <StorySection eyebrow="01" title="Jedi Summary">
        <div className="pdv3-summary card">
          <div className="pdv3-summary-icon"><img src={jediIcon} alt="" /></div>
          <p>Research showed that users missed the primary payment action when it appeared below the first viewport. The team compared CTA patterns in Figma, selected the above-the-fold option, and validated the redesign with usability and metric evidence. The result became a reusable guideline for critical task flows.</p>
        </div>
      </StorySection>

      <StorySection eyebrow="02" title="Research that informed this">
        <div className="pdv3-two-col">
          <div className="pdv3-text-card card">
            <span>Finding</span>
            <h4>7 of 10 participants missed the CTA without scrolling.</h4>
            <p>Participants expected the next action to be visible near the payment total. When the CTA appeared below the fee summary, most users scrolled, hesitated, or missed it entirely.</p>
          </div>
          <SpreadsheetPreview
            title="Checkout_Usability_Test.xlsx"
            columns={["Participant", "Found CTA", "Time", "Issue"]}
            rows={researchRows}
            highlight="7/10 participants initially missed the CTA."
          />
        </div>
      </StorySection>

      <StorySection eyebrow="03" title="Usability test clip">
        <div className="pdv3-video-card card">
          <div className="pdv3-video-poster" style={{ backgroundImage: `url(${video.image})` }}>
            <span className="pdv3-play"><IconPlay /></span>
            <span className="pdv3-duration">00:42</span>
          </div>
          <div>
            <h4>Participant struggles to find payment action</h4>
            <p>Usability Test · Participant 04 · 00:42</p>
            <span className="badge badge-gray">Demo preview · source video unavailable locally</span>
          </div>
        </div>
      </StorySection>

      <StorySection eyebrow="04" title="Design exploration">
        <div className="pdv3-figma-compare">
          <a href={v1?.url} target="_blank" rel="noopener noreferrer" className="pdv3-figma-card">
            <div className="pdv3-figma-meta">
              <div><span>Figma · V1</span><strong>V1 — CTA below the fold</strong></div>
              {v1?.status && <em className={"badge " + v1.badge}>{v1.status}</em>}
            </div>
            {v1?.image && <img src={v1.image} alt={v1.name} />}
          </a>
          <div className="pdv3-big-arrow"><IconArrow /></div>
          <a href={v2?.url} target="_blank" rel="noopener noreferrer" className="pdv3-figma-card selected">
            <div className="pdv3-figma-meta">
              <div><span>Figma · V2</span><strong>V2 — CTA visible in the first viewport</strong></div>
              {v2?.status && <em className={"badge " + v2.badge}>{v2.status}</em>}
            </div>
            {v2?.image && <img src={v2.image} alt={v2.name} />}
          </a>
        </div>
        <a href={v2?.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost mt16 pdv3-open-figma">Open in Figma <IconExternalLink /></a>
      </StorySection>

      <StorySection eyebrow="05" title="Decision">
        <div className="pdv3-decision card">
          <div>
            <span>Decision</span>
            <h4>Move the primary CTA above the fold.</h4>
            <p>{decision.summary}</p>
          </div>
          <div className="pdv3-alt-grid">
            {decision.alternatives.map((alt) => (
              <div key={alt.name} className={alt.selected ? "selected" : ""}>
                <strong>{alt.name}</strong>
                <p>{alt.reason}</p>
                <small>{alt.selected ? "Selected" : alt.verdict}</small>
              </div>
            ))}
          </div>
          <div className="pdv3-rationale-grid">
            <div><strong>Rationale</strong><p>{decision.alternatives.find((a) => a.selected)?.pros}</p></div>
            <div><strong>Trade-off</strong><p>{decision.alternatives.find((a) => a.selected)?.cons}</p></div>
          </div>
        </div>
      </StorySection>

      <StorySection eyebrow="06" title="Validation evidence">
        <div className="pdv3-metrics-row">
          {projectMetrics.map((metric) => (
            <div key={metric.label}>
              <span>{metric.label}</span>
              <strong>{metric.from} <IconArrow /> {metric.to}</strong>
            </div>
          ))}
        </div>
        <SpreadsheetPreview
          title="Validation_Results_Sprint14.xlsx"
          columns={["Metric", "V1", "V2"]}
          rows={validationRows}
        />
      </StorySection>

      <StorySection eyebrow="07" title="Reusable learning">
        <div className="pdv3-learning card">
          <span>Guideline</span>
          <h4>Keep critical actions visible in essential task flows.</h4>
          <p>{decision.guideline}</p>
          <div>
            <strong>Used in 3 related projects</strong>
            <Link to="/projects/fee-management/guidelines/GL-001">View guideline <IconArrow /></Link>
          </div>
        </div>
      </StorySection>

      <StorySection eyebrow="08" title="Source trail">
        <div className="pdv3-source-trail">
          <a className="pdv3-trail-item visual" href={v2?.url} target="_blank" rel="noopener noreferrer">
            <img src={v2?.image} alt="" />
            <span>Figma design</span>
            <strong>{v2?.name || "Fee mgt v2 design"}</strong>
            <p>Final design frame linked to the approved above-the-fold CTA direction.</p>
          </a>
          <div className="pdv3-trail-item sheet-mini">
            <IconFile />
            <span>Usability spreadsheet</span>
            <strong>Checkout_Usability_Test.xlsx</strong>
            <p>Participant table snapshot showing who found the CTA and how long it took.</p>
            <table><tbody>{researchRows.slice(0, 3).map((row) => <tr key={row.join("-")}>{row.slice(0, 3).map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table>
          </div>
          <div className="pdv3-trail-item visual">
            <div className="pdv3-trail-video" style={{ backgroundImage: `url(${video.image})` }}><IconPlay /></div>
            <span>Usability video</span>
            <strong>Participant 04 clip</strong>
            <p>Poster preview from the session where the payment action was missed.</p>
          </div>
          <div className="pdv3-trail-item sheet-mini">
            <IconGauge />
            <span>Validation spreadsheet</span>
            <strong>Validation_S14.xlsx</strong>
            <p>Sprint 14 metrics comparing task success, error rate, completion time, and accessibility.</p>
            <table><tbody>{validationRows.slice(0, 3).map((row) => <tr key={row.join("-")}>{row.map((cell) => <td key={cell}>{cell}</td>)}</tr>)}</tbody></table>
          </div>
          <div className="pdv3-trail-item doc">
            <IconFile />
            <span>Project documentation</span>
            <strong>Checkout Validation Handover</strong>
            <p>Handover context for preserving the validated CTA hierarchy, analytics events, and rollout questions.</p>
            <div><small>Key decisions: 2</small><small>Open questions: 3</small><small>Known risks: 2</small></div>
          </div>
        </div>
      </StorySection>
    </div>
  );
}
