import { useState } from "react";
import { Link } from "react-router-dom";
import { knowledgeTypes } from "../data";
import {
  IconCheck,
  IconArrow,
  IconSparkle,
  IconClose,
  IconLink,
  IconPlay,
  IconAdd,
  IconPlus,
  IconDecision,
  IconGraph,
  IconRuler,
  IconGauge,
  IconFile,
  IconLock,
} from "../components/Icons";
import Lottie from "../components/Lottie";
import MagicWand from "../components/MagicWand";
import published from "../assets/published.json";
import yodaGlasses from "../assets/yoda-glasses.svg";
import feeMgt from "../images/Feemgt2.jpg";
import photoAsset from "../images/Sameness in design UI.jpeg";
import microscopeConfig from "../images/microscopy.png";

const steps = ["Choose", "Current context", "Add details", "Success"];

const suggestedTagsByType = {
  decision: ["design-rationale", "cta", "usability", "conversion", "checkout"],
  research: ["research-insight", "user-feedback", "synthesis", "usability-testing"],
  guideline: ["guideline", "accessibility", "design-system", "interaction-pattern"],
  evidence: ["evidence", "validation", "analytics", "source-linked"],
  documentation: ["documentation", "handover", "onboarding", "project-context"],
  private: ["private-note", "draft"],
};

const typeIcons = {
  decision: IconDecision,
  research: IconGraph,
  guideline: IconRuler,
  evidence: IconGauge,
  documentation: IconFile,
  private: IconLock,
};

const typeActions = {
  decision: "I made a design decision",
  research: "I found a research insight",
  guideline: "I created or updated a guideline",
  evidence: "I want to attach evidence",
  documentation: "I want to document project context",
  private: "I want to save a private note",
};

const departments = ["Finance", "Microscopy", "Photography", "Medical", "Other"];
const audiences = ["Internal design team", "New project members", "Product and engineering", "Stakeholders", "All employees"];
const projects = ["Fee Management System", "Photo Asset Management", "Microscope Configuration Portal"];
const authors = ["Priyal Shah", "Alex Kim", "Priya Sharma", "Sarah Lee", "David Chen", "Adrian", "Marcus"];

const relatedProjects = [
  { id: "fee-management", name: "Fee Management System", dept: "Finance", updated: "3 days ago", desc: "Shares the checkout CTA pattern and above-the-fold action study.", color: "#007AFF", image: feeMgt },
  { id: "photo-asset", name: "Photo Asset Management", dept: "Photography", updated: "1 week ago", desc: "Referenced the same heatmap method to validate the primary action.", color: "#AF52DE", image: photoAsset },
  { id: "microscope-config", name: "Microscope Configuration Portal", dept: "Microscopy", updated: "2 weeks ago", desc: "Similar layout change to surface the key task above the fold.", color: "#34C759", image: microscopeConfig },
];

const fieldDefinitions = {
  decision: [
    { name: "title", label: "Give the decision a clear title", type: "text", required: true, placeholder: "e.g. Move the primary CTA above the fold" },
    { name: "story", label: "Describe what led to this decision", type: "textarea", required: true, rows: 7, placeholder: "e.g. Users were missing the payment CTA during testing, so we explored a sticky CTA and moving it above the fold. We chose the latter because it improved visibility." },
  ],
  research: [
    { name: "title", label: "Give the insight a clear title", type: "text", required: true, placeholder: "e.g. CTA visibility below the fold reduces task success" },
    { name: "story", label: "Describe what you learned", type: "textarea", required: true, rows: 7, placeholder: "During usability testing, 7 of 10 participants missed the payment CTA because it appeared below the fold. Participants expected the primary action to be visible without scrolling." },
  ],
  guideline: [
    { name: "title", label: "Give the guideline a clear title", type: "text", required: true, placeholder: "e.g. Primary actions should be visible without scrolling" },
    { name: "story", label: "Describe the guideline", type: "textarea", required: true, rows: 7, placeholder: "Primary actions should remain visible without scrolling on critical task pages, especially when users need to complete a time-sensitive action." },
  ],
  evidence: [
    { name: "title", label: "Give the evidence a clear title", type: "text", required: true, placeholder: "e.g. Above-the-fold CTA increased task success by 27%" },
    { name: "story", label: "Describe what the evidence shows", type: "textarea", required: true, rows: 7, placeholder: "After moving the CTA above the fold, task success increased from 62% to 89% and completion time decreased from 4m 21s to 2m 11s." },
  ],
  documentation: [
    { name: "title", label: "Give this documentation a clear title", type: "text", required: true, placeholder: "e.g. Fee Management System — design handover" },
    { name: "story", label: "Describe the project context", type: "textarea", required: true, rows: 7, placeholder: "This project redesigned the internal fee management workflow after support teams reported frequent payment errors. The current design is in validation, with accessibility testing still pending before launch." },
  ],
  private: [
    { name: "title", label: "Give your note a title", type: "text", required: true, placeholder: "e.g. Thoughts on CTA placement" },
    { name: "content", label: "Write whatever is on your mind", type: "textarea", required: true, rows: 7, placeholder: "This stays private. Jedi can help organize it when you're ready." },
  ],
};

const knowledgeCaptureConfig = {
  decision: {
    narrativeField: "story",
    helperText: "Describe the decision in your own words. Jedi will structure the context, rationale, alternatives, and trade-offs.",
    eyebrow: "Jedi will structure your decision",
    sections: {
      problem: ["Context / problem", "What situation or problem led to this decision?"],
      alternatives: ["Alternatives", "What alternatives did the team consider?"],
      decision: ["Decision made", "What was decided?"],
      rationale: ["Rationale", "Why was this chosen over the alternatives?"],
      consequences: ["Consequences", "What trade-offs or risks come with it?"],
    },
  },
  research: {
    narrativeField: "story",
    helperText: "Share the finding naturally. Jedi will structure the research context, evidence, and design implications.",
    eyebrow: "Jedi will structure your research insight",
    sections: {
      keyFinding: ["Key finding", "What was the main finding?"],
      researchContext: ["Research context", "What was being tested or explored?"],
      method: ["Method", "How was the research conducted?"],
      participants: ["Participants / sample", "Who participated in the study?"],
      evidence: ["Supporting evidence", "What data or observations support this?"],
      implication: ["Design implication", "How should this influence the design?"],
    },
  },
  guideline: {
    narrativeField: "story",
    helperText: "Explain the principle naturally. Jedi will structure when, why, and how teams should apply it.",
    eyebrow: "Jedi will structure your guideline",
    sections: {
      guideline: ["Guideline", "What is the guideline?"],
      whyMatters: ["Why it matters", "Why is this guideline important?"],
      whenToUse: ["When to use", "When should teams apply this?"],
      whenNotToUse: ["When not to use", "When should teams avoid this?"],
      example: ["Example", "What does this look like in practice?"],
      considerations: ["Related considerations", "What else should teams keep in mind?"],
    },
  },
  evidence: {
    narrativeField: "story",
    helperText: "Share the result naturally. Jedi will organize the metric, source, and what it supports.",
    eyebrow: "Jedi will structure your evidence",
    sections: {
      summary: ["Evidence summary", "What does this evidence show?"],
      evidenceType: ["Evidence type", "What kind of evidence is this?"],
      metric: ["Key result / metric", "What was the measured outcome?"],
      tested: ["What was tested", "What was being evaluated?"],
      source: ["Source", "Where does this evidence come from?"],
      supports: ["What this evidence supports", "What design claim does this back up?"],
    },
  },
  documentation: {
    narrativeField: "story",
    helperText: "Add the context future team members should know. Jedi will organize it for onboarding and handover.",
    eyebrow: "Jedi will structure your documentation",
    sections: {
      overview: ["Project overview", "What was this project about?"],
      phase: ["Current phase", "What phase is the project in?"],
      milestones: ["Key milestones", "What were the major milestones?"],
      decisions: ["Key decisions", "What important decisions were made?"],
      stakeholders: ["Owners / stakeholders", "Who was involved?"],
      risks: ["Open questions or risks", "What is unresolved?"],
      handover: ["Handover notes", "What should future team members know?"],
    },
  },
};

function emptyForm(type) {
  return Object.fromEntries((fieldDefinitions[type] || []).map((field) => [field.name, ""]));
}

function dateToInput(display) {
  try {
    const d = new Date(display);
    if (isNaN(d.getTime())) return new Date().toISOString().split("T")[0];
    return d.toISOString().split("T")[0];
  } catch { return new Date().toISOString().split("T")[0]; }
}

function getNarrative(type, form) {
  if (type === "private") return form.content || "";
  return form.story || "";
}

function buildEmptyStructure(type) {
  if (type === "private") return null;
  const config = knowledgeCaptureConfig[type];
  if (!config) return {};
  return Object.fromEntries(Object.keys(config.sections).map((k) => [k, ""]));
}

function inferStructure(type, narrative) {
  if (type === "private") return null;
  if (!narrative.trim()) return buildEmptyStructure(type);

  if (type === "decision") {
    return {
      problem: "Users were not reliably noticing the primary action in the existing layout.",
      alternatives: "The team considered a sticky action and moving the CTA into the hero area.",
      decision: "Place the primary CTA above the fold within the hero area.",
      rationale: "This improved discoverability while keeping the interaction familiar and visible in context.",
      consequences: "The layout becomes denser and should be checked across smaller screens and content variants.",
    };
  }

  if (type === "research") {
    return {
      keyFinding: "Participants consistently missed the primary action when it appeared below the fold.",
      researchContext: "The study evaluated checkout flow usability for the Fee Management System redesign.",
      method: "Usability Test",
      participants: "10 participants",
      evidence: "7 of 10 participants failed to locate the CTA on first attempt when placed below the fold.",
      implication: "Primary actions should be placed above the fold to reduce cognitive load and task completion time.",
    };
  }

  if (type === "guideline") {
    return {
      guideline: "Keep primary actions visible without scrolling on critical task pages.",
      whyMatters: "Users are more likely to abandon or make errors when key actions require scrolling to discover.",
      whenToUse: "On pages where the user needs to complete a time-sensitive or high-stakes action.",
      whenNotToUse: "On content-heavy pages where scannability and reading flow take priority over immediate action.",
      example: "Moving the payment CTA above the fold increased task success from 62% to 89%.",
      considerations: "Test across viewport sizes to ensure the action remains accessible on mobile and tablet.",
    };
  }

  if (type === "evidence") {
    return {
      summary: "Moving the CTA above the fold significantly improved task completion and reduced time-on-task.",
      evidenceType: "A/B Test",
      metric: "Task success: 62% → 89% | Completion time: 4m 21s → 2m 11s",
      tested: "CTA placement — above the fold vs. below the fold in the checkout flow.",
      source: "Not specified",
      supports: "Primary actions should be placed above the fold to reduce task completion time.",
    };
  }

  if (type === "documentation") {
    return {
      overview: "Redesigned the internal fee management workflow to reduce payment errors reported by support teams.",
      phase: "Validation",
      milestones: "Discovery → Design exploration → Usability testing → High-fidelity prototype → Validation",
      decisions: "CTA moved above the fold; sticky action bar added for secondary tasks on scroll.",
      stakeholders: "Design team, Product management, Engineering leads",
      risks: "Accessibility testing is still pending before launch. Mobile layout needs verification.",
      handover: "All design files are available in the project Figma. Component specs documented in Zeroheight.",
    };
  }

  return buildEmptyStructure(type);
}

function getNarrativeField(type) {
  if (type === "private") return "content";
  return "story";
}

function getKnowledgeQuality(narrative) {
  const text = narrative.trim().toLowerCase();
  if (!text) return "Needs context";

  const lineCount = text.split("\n").filter((line) => line.trim()).length;
  const signals = [
    /user|participant|customer|operator|team/.test(text),
    /test|testing|research|study|heatmap|feedback|analysis/.test(text),
    /missing|missed|failed|problem|issue|pain|risk/.test(text),
    /explored|considered|alternative|sticky|option/.test(text),
    /chose|chosen|decided|decision|we chose/.test(text),
    /because|so that|therefore|rationale/.test(text),
    /improved|increased|reduced|higher|better|visibility|success/.test(text),
  ].filter(Boolean).length;

  if (lineCount >= 3 || signals >= 5) return "Excellent";
  if (signals >= 2 || lineCount >= 1) return "Average";
  return "Needs context";
}

function ContextCard({ context, onChange, privateMode }) {
  const [editing, setEditing] = useState(false);
  const fields = [
    ["project", "Project", projects],
    ["department", "Department", departments],
    ["audience", "Intended for", audiences],
    ["source", "Date", []],
    ["figmaUrl", "Figma URL", []],
    ["designer", "Captured by", authors],
  ];

  return (
    <section className={"context-known-card" + (privateMode ? " private-note-mode" : "") + (editing ? " editing" : "")}>
      <div className="context-known-head">
        <div className="context-known-title-wrap">
          {privateMode ? <span className="context-known-icon"><IconLock /></span> : null}
          <div>
            <h3>{privateMode ? "Private workspace context" : "Context Jedi already knows"}</h3>
            <p>{privateMode ? "This stays visible only to you." : "Detected from your current workspace. Review it instead of filling it in again."}</p>
          </div>
        </div>
        <div className="context-known-actions">
          <button type="button" className="btn btn-ghost btn-sm">
            <IconPlus /> Sources
          </button>
          <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing((value) => !value)}>
            {editing ? "Done" : "Edit"}
          </button>
        </div>
      </div>

      <div className="context-known-grid">
        {fields.map(([name, label, options]) => (
          <div className="context-known-item" key={name}>
            <span>{label}</span>
            {name === "source" ? (
              editing ? (
                <input
                  type="date"
                  value={dateToInput(context.source)}
                  onChange={(event) => {
                    const d = new Date(event.target.value + "T00:00:00");
                    onChange("source", d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }));
                  }}
                />
              ) : (
                <strong>{context.source}</strong>
              )
            ) : name === "figmaUrl" ? (
              editing ? (
                <input type="text" value={context.figmaUrl} onChange={(event) => onChange("figmaUrl", event.target.value)} placeholder="https://figma.com/file/…" />
              ) : (
                <strong>{context.figmaUrl}</strong>
              )
            ) : editing ? (
              <select value={context[name]} onChange={(event) => onChange(name, event.target.value)}>
                {options.map((option) => <option key={option}>{option}</option>)}
              </select>
            ) : (
              <strong>{context[name]}</strong>
            )}
          </div>
        ))}
      </div>
    </section>
  );
}

function DecisionUnderstanding({ story, structure, onChange, generated }) {
  const [editing, setEditing] = useState(false);
  const hasStory = story.trim().length > 0;

  return (
    <section className={"decision-understanding-card" + (editing ? " editing" : "")}>
      {generated ? (
        <>
          <div className="decision-understanding-head">
            <div>
              <span className="eyebrow"><IconSparkle /> Jedi will structure your decision</span>
              <h3>Review what will be stored</h3>
              <p>You can edit once Jedi structures the insights</p>
            </div>
            <div className="decision-understanding-actions">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing((value) => !value)}>
                {editing ? "Done" : "Edit"}
              </button>
            </div>
          </div>
          <div className="decision-understanding-grid">
            {Object.entries(decisionStructureLabels).map(([key, [label, prompt]]) => (
              <label className="decision-structure-item" key={key}>
                <span>{label}</span>
                <small>{prompt}</small>
                <textarea
                  rows="3"
                  value={structure[key]}
                  onChange={(event) => onChange(key, event.target.value)}
                  placeholder={hasStory ? "Edit Jedi's interpretation" : "Generated after you describe what happened"}
                  disabled={!editing}
                />
              </label>
            ))}
          </div>
        </>
      ) : (
        <div className="decision-understanding-placeholder" />
      )}
    </section>
  );
}

function GeneratedKnowledgeStructure({ type, generated, structure, onChange, config }) {
  const [editing, setEditing] = useState(false);

  return (
    <section className={"decision-understanding-card" + (editing ? " editing" : "")}>
      {generated ? (
        <>
          <div className="decision-understanding-head">
            <div>
              <span className="eyebrow"><IconSparkle /> {config?.eyebrow || "Jedi will structure your knowledge"}</span>
              <h3>Review what will be stored</h3>
              <p>You can edit once Jedi structures the insights</p>
            </div>
            <div className="decision-understanding-actions">
              <button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditing((value) => !value)}>
                {editing ? "Done" : "Edit"}
              </button>
            </div>
          </div>
          <div className="decision-understanding-grid">
            {Object.entries(config?.sections || {}).map(([key, [label, prompt]]) => (
              <label className="decision-structure-item" key={key}>
                <span>{label}</span>
                <small>{prompt}</small>
                <textarea
                  rows="3"
                  value={structure[key] || ""}
                  onChange={(event) => onChange(key, event.target.value)}
                  placeholder="Generated after you describe what happened"
                  disabled={!editing}
                />
              </label>
            ))}
          </div>
        </>
      ) : (
        <div className="decision-understanding-placeholder" />
      )}
    </section>
  );
}

function KnowledgeReview({ type, form, tags }) {
  const narrative = getNarrative(type, form);
  const quality = getKnowledgeQuality(narrative);
  const qualityClass = quality === "Excellent" ? "green" : quality === "Average" ? "yellow" : "red";

  return (
    <aside className="jedi-review-panel no-chat">
      <div className="jrp-head">
        <span className="jrp-ic"><img src={yodaGlasses} alt="" /></span>
        <div>
          <strong>Jedi Knowledge Coach</strong>
        </div>
      </div>

      <div className="jrp-quality">
        <span>Quality</span>
        <strong className={"jrp-quality-badge " + qualityClass}>{quality}</strong>
      </div>
    </aside>
  );
}

export default function AddKnowledge() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");
  const [form, setForm] = useState(emptyForm(""));
  const [errors, setErrors] = useState({});
  const [tags, setTags] = useState([]);
  const [context, setContext] = useState({
    project: "Fee Management System",
    department: "Finance",
    audience: "Internal design team",
    source: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    figmaUrl: "https://www.figma.com/file/CTA-hero-layout-v2",
    designer: "Priyal Shah",
  });
  const [structure, setStructure] = useState(buildEmptyStructure(""));
  const [showStructure, setShowStructure] = useState(false);
  const [structuring, setStructuring] = useState(false);
  const [linked, setLinked] = useState({ "Fee Management System": true });

  const isPrivate = type === "private";
  const fields = fieldDefinitions[type] || [];
  const typeLabel = knowledgeTypes.find((item) => item.key === type)?.label || "Knowledge";

  function updateForm(name, value) {
    setForm((previous) => ({ ...previous, [name]: value }));
    setErrors((previous) => ({ ...previous, [name]: false }));
  }

  function generateRationale() {
    setStructuring(true);
    setTimeout(() => {
      setStructure(inferStructure(type, getNarrative(type, form)));
      setShowStructure(true);
      setStructuring(false);
    }, 3000);
  }

  function updateContext(name, value) {
    setContext((previous) => ({ ...previous, [name]: value }));
  }

  function switchType(nextType) {
    setType(nextType);
    setForm(emptyForm(nextType));
    setTags(suggestedTagsByType[nextType].slice(0, 3));
    setErrors({});
    setStructure(buildEmptyStructure(nextType));
    setShowStructure(false);
    setStructuring(false);
    setContext((previous) => ({ ...previous, source: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }));
  }

  function validate() {
    const nextErrors = {};
    fields.forEach((field) => {
      if (field.required && !String(form[field.name] || "").trim()) nextErrors[field.name] = true;
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  }

  function continueToSuccess() {
    if (validate()) setStep(3);
  }

  function renderField(field) {
    const value = form[field.name] || "";
    const className = "field" + (errors[field.name] ? " has-error" : "");

    return (
      <div className={className} key={field.name}>
        <label className="field-label">
          <span>{field.label}{field.required ? <span className="req"> *</span> : null}</span>
          {errors[field.name] ? <span className="field-required-note">Required</span> : null}
        </label>

        {field.type === "textarea" ? (
          field.name === getNarrativeField(type) && !isPrivate ? (
            <div>
              <textarea rows={field.rows || 3} style={{ height: 120 }} value={value} onChange={(event) => updateForm(field.name, event.target.value)} placeholder={field.placeholder || ""} />
                <button type="button" className="btn btn-generate-rationale btn-sm" style={{ marginTop: 18, width: "100%", justifyContent: "center" }} onClick={generateRationale}>
                <IconSparkle /> Generate details
              </button>
            </div>
          ) : (
            <textarea rows={field.rows || 3} value={value} onChange={(event) => updateForm(field.name, event.target.value)} placeholder={field.placeholder || ""} />
          )
        ) : field.type === "select" ? (
          <select value={value} onChange={(event) => updateForm(field.name, event.target.value)}>
            <option value="" disabled>Select an option</option>
            {field.options.map((option) => <option key={option}>{option}</option>)}
          </select>
        ) : (
          <input type={field.type === "number" ? "number" : "text"} value={value} onChange={(event) => updateForm(field.name, event.target.value)} placeholder={field.placeholder || ""} />
        )}
      </div>
    );
  }

  return (
    <div className={"page add-layout" + (isPrivate ? " private-note-mode" : "") + (type === "documentation" ? " documentation-mode" : "")}>
      <div className="page-head">
        <h2>{step === 0 ? "Add Knowledge" : typeLabel}</h2>
        <p>Describe the work once. Jedi prepares the structure and workspace context for reuse.</p>
      </div>

      <div className="steps-rail">
        {steps.map((label, index) => (
          <div key={label} className="step-pill" style={{ flex: index < steps.length - 1 ? 1 : "none" }}>
            <div className={"step-circle " + (index < step ? "done" : index === step ? "active" : "")}>
              {index < step ? <IconCheck /> : index + 1}
            </div>
            <span className="step-label">{label}</span>
            {index < steps.length - 1 ? <div className={"step-conn" + (index < step ? " done" : "")} /> : null}
          </div>
        ))}
      </div>

      {step === 0 && (
        <>
          <div className="add-main">
            <div className="type-grid">
              {knowledgeTypes.map((item) => {
                const TypeIcon = typeIcons[item.key];
                return (
                  <button type="button" key={item.key} className={"type-card" + (type === item.key ? " sel" : "")} onClick={() => switchType(item.key)}>
                    <div className={"type-ic type-ic--" + item.key}>{TypeIcon ? <TypeIcon /> : item.icon}</div>
                    <strong>{typeActions[item.key]}</strong>
                    <span className="type-desc">{item.desc}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div className="row mt24" style={{ justifyContent: "flex-end" }}>
            <button className="btn btn-primary" disabled={!type} onClick={() => setStep(1)}>Continue <IconArrow /></button>
          </div>
        </>
      )}

      {step === 1 && (
        <>
          <ContextCard context={context} onChange={updateContext} privateMode={isPrivate} />

          {!isPrivate && (
            <section className="card compact-supporting-info" style={{ marginTop: 20 }}>
              <div className="section-title">Prepared for retrieval</div>
              <p className="faint" style={{ marginBottom: 16 }}>Jedi generated these tags from the selected knowledge type. Edit only when necessary.</p>
              <div className="tag-input-box">
                {tags.map((tag) => (
                  <div className="tag-chip" key={tag}>
                    {tag}
                    <button type="button" className="tag-chip-x" onClick={() => setTags((previous) => previous.filter((item) => item !== tag))}><IconClose /></button>
                  </div>
                ))}
              </div>

              <div className="generated-tag-options">
                {(suggestedTagsByType[type] || []).filter((tag) => !tags.includes(tag)).map((tag) => (
                  <button type="button" className="suggest-pill" key={tag} onClick={() => setTags((previous) => [...previous, tag])}>+ {tag}</button>
                ))}
              </div>
            </section>
          )}

          {!isPrivate && (
            <section className="card compact-related-projects">
              <div className="row between mb16">
                <div>
                  <div className="section-title" style={{ margin: 0 }}>Related projects Jedi found</div>
                  <p className="faint">Connections are suggestions, not required form fields.</p>
                </div>
                <span className="badge badge-blue">{relatedProjects.length} suggestions</span>
              </div>

              <div className="col gap12">
                {relatedProjects.map((project) => {
                  const isLinked = Boolean(linked[project.name]);
                  return (
                    <div className={"linkproj-row" + (isLinked ? " on" : "")} key={project.name}>
                      <div className="linkproj-screen" style={{ "--sc": project.color }}><img src={project.image} alt="" /></div>
                      <div className="linkproj-info">
                        <div className="linkproj-name">{project.name}</div>
                        <div className="linkproj-meta">{project.dept} · Updated {project.updated}</div>
                        <div className="linkproj-desc">{project.desc}</div>
                      </div>
                      <div className="linkproj-actions">
                        <Link to={`/projects/${project.id}`} className="btn btn-ghost btn-sm"><IconPlay /> View</Link>
                        <button
                          type="button"
                          className={"btn btn-sm " + (isLinked ? "btn-green" : "btn-primary")}
                          onClick={() => setLinked((previous) => ({ ...previous, [project.name]: !isLinked }))}
                        >
                          {isLinked ? <><IconCheck /> Linked</> : <><IconLink /> Link</>}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>
          )}

          <div className="row between mt24">
            <button className="btn btn-ghost" onClick={() => setStep(0)}>← Back</button>
            <button className="btn btn-primary" onClick={() => setStep(2)}>Continue <IconArrow /></button>
          </div>
        </>
      )}

      {step === 2 && (
        <>
          <div className="add-details-layout simplified-add-details">
            <main className="add-main">
              {!isPrivate ? (
                <div style={{ position: "relative" }}>
                  <GeneratedKnowledgeStructure
                    type={type}
                    generated={showStructure}
                    structure={structure}
                    onChange={(name, value) => setStructure((previous) => ({ ...previous, [name]: value }))}
                    config={knowledgeCaptureConfig[type]}
                  />
                  {structuring ? (
                    <div className="structuring-overlay">
                      <MagicWand size={240} />
                      <span>Jedi is setting up the details</span>
                    </div>
                  ) : null}
                </div>
              ) : null}
            </main>

            <section className={"card" + (isPrivate ? " private-card" : "")} style={{ paddingTop: 52 }}>
              <KnowledgeReview type={type} form={form} tags={tags} />

              <div className="section-title">{typeLabel}</div>
                <p className="form-intro">{isPrivate ? "Add the content of your private note." : (knowledgeCaptureConfig[type]?.helperText || "Describe the knowledge in your own words. Jedi will structure the details.")}</p>
              <div className="simplified-fields">{fields.map(renderField)}</div>
            </section>
          </div>

          <div className="row between" style={{ marginTop: 64 }}>
            <button className="btn btn-ghost" onClick={() => setStep(1)}>← Back</button>
            <button className="btn btn-primary" onClick={continueToSuccess}>{isPrivate ? "Save Private Note" : "Publish Knowledge"} <IconArrow /></button>
          </div>
        </>
      )}

      {step === 3 && (
        <div className="card success-card">
          <Lottie animationData={published} size={180} loop={false} style={{ margin: "0 auto" }} />
          <h2>{isPrivate ? "Private note saved" : "Knowledge published"}</h2>
          <p className="muted mt12">{isPrivate ? "Your note is available in your personal space and can be converted later." : "The structured entry and its workspace context are now available for project retrieval."}</p>
          <div className="row gap12 mt24" style={{ justifyContent: "center" }}>
            <button className="btn btn-ghost" onClick={() => { setStep(0); setType(""); setForm(emptyForm("")); setTags([]); setErrors({}); setStructure(buildEmptyStructure("")); setShowStructure(false); setStructuring(false); }}>Add another item</button>
            <a href={isPrivate ? "/onboarding" : "/hub"} className="btn btn-primary">{isPrivate ? "View My Space" : "View in Hub"}</a>
          </div>
        </div>
      )}

    </div>
  );
}
