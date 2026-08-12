import { useState } from "react";
import { Link } from "react-router-dom";
import { chatThread, knowledgeTypes } from "../data";
import { IconClose, IconSparkle, IconArrow, IconCheck, IconLink, IconPlay, IconPlus, IconDecision, IconGraph, IconRuler, IconGauge, IconFile, IconLock } from "../components/Icons";
import Lottie from "../components/Lottie";
import published from "../assets/published.json";
import magicWand from "../assets/magic-wand.json";
import Wordmark from "../components/Wordmark";
import yodaMain from "../assets/yoda-main.svg";
import yodaGlasses from "../assets/yoda-glasses.svg";

const addSteps = ["Choose", "Context", "Add Info", "Generated Info"];
const suggestedTagsByType = {
  decision: ["design-rationale", "cta", "usability", "conversion", "checkout"],
  research: ["research-insight", "user-feedback", "synthesis", "usability-testing"],
  guideline: ["guideline", "accessibility", "design-system", "interaction-pattern"],
  evidence: ["evidence", "validation", "analytics", "source-linked"],
  documentation: ["documentation", "handover", "onboarding", "project-context"],
  private: ["private-note", "draft"],
};

const contextOptions = {
  project: ["Fee Management System", "Photo Asset Management", "Microscope Configuration Portal"],
  department: ["Finance", "Microscopy", "Photography", "Medical", "Other"],
  audience: ["Internal design team", "New project members", "Product and engineering", "Stakeholders", "All employees"],
  designer: ["Priyal Shah", "Alex Kim", "Priya Sharma", "Sarah Lee", "David Chen", "Adrian", "Marcus"],
};

function dateToInput(display) {
  const date = new Date(display);
  if (Number.isNaN(date.getTime())) return new Date().toISOString().split("T")[0];
  return date.toISOString().split("T")[0];
}

const typeActions = {
  decision: "I made a design decision",
  research: "I found a research insight",
  guideline: "I created or updated a guideline",
  evidence: "I want to attach evidence",
  documentation: "I want to document project context",
  private: "I want to save a private note",
};

const pluginStructure = [
  ["problem", "Context / problem", "What situation or problem led to this decision?", "Users were not reliably noticing the primary action in the existing layout."],
  ["alternatives", "Alternatives", "What alternatives did the team consider?", "The team considered a sticky action and moving the CTA into the hero area."],
  ["decision", "Decision made", "What was decided?", "Place the primary CTA above the fold within the hero area."],
  ["rationale", "Rationale", "Why was this chosen over the alternatives?", "This improved discoverability while keeping the interaction familiar and visible in context."],
  ["consequences", "Consequences", "What trade-offs or risks come with it?", "The layout becomes denser and should be checked across smaller screens and content variants."],
];

const relatedProjects = [
  { id: "fee-management", name: "Fee Management System", dept: "Finance", updated: "3 days ago", desc: "Shares the checkout CTA pattern and above-the-fold action study.", color: "#007AFF" },
  { id: "photo-asset", name: "Photo Asset Management", dept: "Photography", updated: "1 week ago", desc: "Referenced the same heatmap method to validate the primary action.", color: "#AF52DE" },
  { id: "microscope-config", name: "Microscope Configuration Portal", dept: "Microscopy", updated: "2 weeks ago", desc: "Similar layout change to surface the key task above the fold.", color: "#34C759" },
];

const typeIcons = {
  decision: IconDecision,
  research: IconGraph,
  guideline: IconRuler,
  evidence: IconGauge,
  documentation: IconFile,
  private: IconLock,
};

// Small confidence ring — matches the Ask Design Bridge chat answer.
function ConfRing({ value, size = 44 }) {
  const r = size / 2 - 4, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="conf-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: "rotate(-90deg)" }}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--panel-3)" strokeWidth="4" />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--green)" strokeWidth="4"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 10.5, fontWeight: 800 }}>
        {value}%
      </div>
    </div>
  );
}

// ----- Ask a Question tab — same chatbot style as Ask Design Bridge -----
function PluginAsk() {
  const [thinking, setThinking] = useState(false);
  const [answered, setAnswered] = useState(true);
  const [input, setInput] = useState("");

  const ask = () => {
    setThinking(true);
    setAnswered(false);
    setInput("");
    setTimeout(() => { setThinking(false); setAnswered(true); }, 1200);
  };

  return (
    <>
      <div className="ai-bubble user mb12">{chatThread.question}</div>

      {thinking && (
        <div className="ai-bubble mb12"><span className="muted">Searching evidence and design memory…</span></div>
      )}

      {answered && (
        <div className="ai-result-card plugin-jedi-answer">
          <div className="row between mb12" style={{ alignItems: "center" }}>
            <div className="row gap8" style={{ alignItems: "center" }}>
              <img className="plugin-jedi-avatar" src={yodaMain} alt="" />
              <strong style={{ fontSize: 16 }}>Jedi thinks</strong>
            </div>
            <ConfRing value={chatThread.confidence} />
          </div>

          <div className="badge badge-violet mb8">Decision Insights</div>
          <div className="figma-ask-citation-trail">
            <p>Users failed to notice the CTA in the previous location.<Link to="/chat?openSources=true&activeClaimId=claim-1" state={{ openSources: true, activeClaimId: "claim-1" }} className="figma-citation-link">[1]</Link></p>
            <p>Heatmap analysis and usability testing demonstrated significantly higher visibility above the fold.<Link to="/chat?openSources=true&activeClaimId=claim-2" state={{ openSources: true, activeClaimId: "claim-2" }} className="figma-citation-link">[2]</Link></p>
            <p>Our team has documented this extensively, and I've pulled together insights from design files, research studies, and decision logs.<Link to="/chat?openSources=true&activeClaimId=claim-5" state={{ openSources: true, activeClaimId: "claim-5" }} className="figma-citation-link">[3]</Link></p>
          </div>

          <div className="faint" style={{ fontSize: 11.5, marginBottom: 6 }}>Metrics</div>
          <div className="row gap10 mb12 wrap">
            {chatThread.metrics.map((m) => (
              <div key={m.label} className="metric-panel" style={{ padding: "10px 12px" }}>
                <div className="faint" style={{ fontSize: 11 }}>{m.label}</div>
                <div className="metric-arrow mt4">
                  <span className="metric-from" style={{ fontSize: 13 }}>{m.from}</span>
                  <span className="arrow" style={{ width: 13, height: 13 }}><IconArrow /></span>
                  <span className="metric-to" style={{ fontSize: 16 }}>{m.to}</span>
                </div>
              </div>
            ))}
          </div>
          <Link to="/chat?openSources=true&activeClaimId=claim-1" state={{ openSources: true, activeClaimId: "claim-1" }} className="btn btn-ghost btn-sm open-sources-btn">
            <span style={{ width: 15, height: 15 }}><IconLink /></span>
            Open Sources
          </Link>
        </div>
      )}

      <div className="ai-input plugin-jedi-input mt16">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Ask Jedi about the selected frame…" />
        <button className="btn btn-primary btn-sm" onClick={ask}>
          Send <span style={{ width: 14, height: 14 }}><IconArrow /></span>
        </button>
      </div>

      <div className="mt16">
        <div className="faint" style={{ fontSize: 11.5, marginBottom: 8 }}>Related questions</div>
        <div className="col gap8">
          {chatThread.related.map((q) => (
            <div key={q} className="related-q" style={{ fontSize: 12.5, padding: "9px 12px" }} onClick={ask}>
              <span className="faint">↳</span> {q}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ----- Add Knowledge tab — same multi-step process as the /add page -----
function PluginAdd() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("");
  const [tags, setTags] = useState([]);
  const [linked, setLinked] = useState({ "Fee Management System": true });
  const [linkModal, setLinkModal] = useState(null);
  const [linkReason, setLinkReason] = useState("");
  const [generated, setGenerated] = useState(false);
  const [generatingInfo, setGeneratingInfo] = useState(false);
  const [description, setDescription] = useState("");
  const [editingContext, setEditingContext] = useState(false);
  const [editingGenerated, setEditingGenerated] = useState(false);
  const [context, setContext] = useState({
    project: "Fee Management System",
    department: "Finance",
    audience: "Internal design team",
    source: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
    figmaUrl: "https://www.figma.com/file/CTA-hero-layout-v2",
    designer: "Priyal Shah",
  });

  const toggleTag = (t) => setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));
  const selectedType = knowledgeTypes.find((item) => item.key === type);
  const isPrivate = type === "private";
  const trimmedDescription = description.trim();
  const typedLineCount = trimmedDescription ? trimmedDescription.split("\n").filter((line) => line.trim()).length : 0;
  const estimatedWrappedLines = trimmedDescription ? Math.ceil(trimmedDescription.length / 90) : 0;
  const lineCount = Math.max(typedLineCount, estimatedWrappedLines);
  const quality = lineCount >= 2 ? "Excellent" : lineCount >= 1 ? "Average" : "Needs context";
  const qualityClass = quality === "Excellent" ? "green" : quality === "Average" ? "yellow" : "red";
  const contextFields = [
    ["project", "Project"],
    ["department", "Department"],
    ["audience", "Intended for"],
    ["source", "Date"],
    ["figmaUrl", "Figma URL"],
    ["designer", "Captured by"],
  ];

  const switchType = (nextType) => {
    setType(nextType);
    setTags(suggestedTagsByType[nextType].slice(0, 3));
    setGenerated(false);
    setGeneratingInfo(false);
    setDescription("");
  };

  function generateInfo() {
    setStep(3);
    setGenerated(false);
    setEditingGenerated(false);
    setGeneratingInfo(true);
    window.setTimeout(() => {
      setGeneratingInfo(false);
      setGenerated(true);
    }, 3000);
  }

  return (
    <div className="figma-add-flow">
      {/* Step rail */}
      <div className="steps-rail figma-steps-rail">
        {addSteps.map((s, i) => (
          <div key={s} className="step-pill" style={{ flex: i < addSteps.length - 1 ? 1 : "none" }}>
            <div className={"step-circle " + (i < Math.min(step, addSteps.length) ? "done" : i === step ? "active" : "")} style={{ width: 28, height: 28, fontSize: 12 }}>
              {i < step ? <span style={{ width: 14, height: 14 }}><IconCheck /></span> : i + 1}
            </div>
            <span className="step-label" style={{ fontSize: 12, color: i === step ? "var(--text)" : "var(--text-faint)" }}>{s}</span>
            {i < addSteps.length - 1 && <div className="step-conn" style={{ minWidth: 16 }} />}
          </div>
        ))}
      </div>

      {/* Step 1 — Choose */}
      {step === 0 && (
        <>
          <div className="faint mb12" style={{ fontSize: 12.5 }}>What are you capturing?</div>
          <div className="type-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
            {knowledgeTypes.map((t) => (
              <button type="button" key={t.key} className={"type-card" + (type === t.key ? " sel" : "")} style={{ padding: "14px 12px", minHeight: 148 }} onClick={() => switchType(t.key)}>
                <div className={"type-ic type-ic--" + t.key} style={{ width: 36, height: 36, marginBottom: 8 }}>{(() => { const Ic = typeIcons[t.key]; return Ic ? <Ic /> : t.icon; })()}</div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{typeActions[t.key]}</div>
                <div className="type-desc" style={{ fontSize: 11, marginTop: 4 }}>{t.desc}</div>
              </button>
            ))}
          </div>
        </>
      )}

      {/* Step 2 — Pre-existing context */}
      {step === 1 && (
          <div className="figma-details-ui">
          <div className={"context-known-card figma-context-known" + (editingContext ? " editing" : "")}>
            <div className="context-known-head">
              <div className="context-known-title-wrap">
                {isPrivate ? <span className="context-known-icon"><IconLock /></span> : null}
                <div>
                    <h3>{isPrivate ? "Private workspace context" : "Context Jedi knows"}</h3>
                  <p>{isPrivate ? "This stays visible only to you." : "Information based on the frame you have selected"}</p>
                </div>
                </div>
              <div className="context-known-actions"><button type="button" className="btn btn-ghost btn-sm"><IconPlus /> Sources</button><button type="button" className="btn btn-ghost btn-sm" onClick={() => setEditingContext((value) => !value)}>{editingContext ? "Done" : "Edit"}</button></div>
            </div>
            <div className="context-known-grid figma-context-grid">
              {contextFields.map(([name, label]) => (
                <div className="context-known-item" key={name}>
                  <span>{label}</span>
                  {editingContext ? (
                    name === "source" ? (
                      <input type="date" value={dateToInput(context.source)} onChange={(event) => {
                        const date = new Date(event.target.value + "T00:00:00");
                        setContext((previous) => ({ ...previous, source: date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }) }));
                      }} />
                    ) : name === "figmaUrl" ? (
                      <input type="text" value={context.figmaUrl} onChange={(event) => setContext((previous) => ({ ...previous, figmaUrl: event.target.value }))} />
                    ) : (
                      <select value={context[name]} onChange={(event) => setContext((previous) => ({ ...previous, [name]: event.target.value }))}>
                        {contextOptions[name].map((option) => <option key={option}>{option}</option>)}
                      </select>
                    )
                  ) : <strong>{context[name]}</strong>}
                </div>
              ))}
            </div>
          </div>

          {!isPrivate && (
            <div className="figma-details-card figma-context-known figma-tags-card"><label>Prepared for retrieval</label>
              <p className="faint" style={{ fontSize: 12, marginBottom: 12 }}>Jedi generated these tags from the selected knowledge type. Edit only when necessary.</p>
              <div className="tag-input-box">
                {tags.map((t) => (
                  <span key={t} className="tag-chip">{t}<button type="button" className="tag-chip-x" aria-label={`Remove ${t}`} onClick={() => toggleTag(t)}><IconClose /></button></span>
                ))}
              </div>
              <div className="generated-tag-options figma-generated-tags">
                {(suggestedTagsByType[type] || []).filter((tag) => !tags.includes(tag)).map((tag) => (
                  <button type="button" className="suggest-pill" key={tag} onClick={() => toggleTag(tag)}>+ {tag}</button>
                ))}
              </div>
            </div>
          )}

        </div>
      )}

      {/* Step 3 — Add details */}
      {step === 2 && (
        <div className="figma-add-details-layout private">
          <div className="figma-details-card figma-capture-card">
            <div className="figma-details-head">
              <img src={yodaGlasses} alt="" className="figma-addinfo-avatar" />
              <div>
                <span>{selectedType?.label || "Knowledge"}</span>
                <h3>{isPrivate ? "Private note" : "Jedi Knowledge Coach"}</h3>
                {!isPrivate && <div className="figma-addinfo-quality"><span>Quality</span><strong className={"jrp-quality-badge " + qualityClass}>{quality}</strong></div>}
              </div>
            </div>
            <p className="form-intro">{isPrivate ? "Add the content of your private note." : "Describe the knowledge in your own words. Jedi will structure it into reusable project context."}</p>

            <div className="figma-details-grid">
              <div className="field figma-details-full"><label>{isPrivate ? "Give your note a title" : "Give this knowledge a clear title"}</label><input placeholder={isPrivate ? "e.g. Thoughts on CTA placement" : "e.g. Move the primary CTA above the fold"} /></div>
              <div className="field figma-details-full"><label>{isPrivate ? "Write whatever is on your mind" : "Describe what happened"}</label><textarea className="figma-description-textarea" rows="5" value={description} onChange={(event) => setDescription(event.target.value)} placeholder={isPrivate ? "This stays private. Jedi can help organize it when you're ready." : "e.g. Users were missing the payment CTA during testing, so we explored a sticky CTA and moving it above the fold. We chose the latter because it improved visibility."} /></div>
            </div>
          </div>
        </div>
      )}

      {/* Step 4 — Generated info */}
      {step === 3 && (
        <div className="figma-add-details-layout private">
          {!isPrivate ? (
            <div className={"decision-understanding-card figma-generated-structure" + (generated ? "" : " empty") + (editingGenerated ? " editing" : "")}>
              <div className="decision-understanding-head">
                <div><span className="eyebrow"><IconSparkle /> Jedi structured your {selectedType?.label?.toLowerCase() || "knowledge"}</span><h3>Generated info</h3><p>{generatingInfo ? "Jedi is structuring your knowledge." : generated ? "Review and edit what will be stored." : "Generate details from the previous step to review the reusable structure."}</p></div>
                {generated && <button type="button" className="btn btn-ghost btn-sm figma-generated-edit-btn" onClick={() => setEditingGenerated((value) => !value)}>{editingGenerated ? "Done" : "Edit"}</button>}
              </div>
              {generatingInfo ? (
                <div className="decision-understanding-placeholder figma-structure-placeholder figma-generating-loader">
                  <Lottie animationData={magicWand} size={92} />
                  <strong>Jedi is working..</strong>
                  <p>Turning your note into knowledge.</p>
                </div>
              ) : generated ? (
                <div className="decision-understanding-grid figma-structure-grid">
                  {pluginStructure.map(([key, label, prompt, text]) => (
                    <label className="decision-structure-item" key={key}>
                      <span>{label}</span>
                      <small>{prompt}</small>
                      <textarea rows="3" defaultValue={text} disabled={!editingGenerated} />
                    </label>
                  ))}
                </div>
              ) : (
                <div className="decision-understanding-placeholder figma-structure-placeholder">
                  <IconSparkle />
                  <strong>Details not generated yet</strong>
                  <p>Go back to Add details and generate the reusable structure.</p>
                </div>
              )}
            </div>
          ) : (
            <div className="figma-details-card figma-capture-card">
              <div className="figma-details-head"><div><span>Private note</span><h3>Ready to save</h3></div></div>
              <p className="form-intro">Your private note will stay visible only to you and can be converted into shared knowledge later.</p>
            </div>
          )}
        </div>
      )}

      {/* Published */}
      {step === 4 && (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <Lottie animationData={published} size={120} loop={false} style={{ margin: "0 auto" }} />
          <h3 style={{ fontSize: 18, marginTop: 4 }}>{isPrivate ? "Private note saved" : "Knowledge published"}</h3>
          <p className="muted mt8" style={{ fontSize: 13 }}>{isPrivate ? "Your note is available in your personal space and can be converted later." : "The structured entry and its workspace context are now available for project retrieval."}</p>
          <div className="row gap8 mt20 figma-success-actions" style={{ justifyContent: "center" }}>
            <button className="btn btn-ghost btn-sm" onClick={() => { setStep(0); setType(""); setTags([]); setGenerated(false); setGeneratingInfo(false); setEditingGenerated(false); }}>Add another</button>
            <Link to={isPrivate ? "/onboarding" : "/hub"} className="btn btn-primary btn-sm">{isPrivate ? "View My Space" : "View in Hub"}</Link>
          </div>
        </div>
      )}

      {/* Nav */}
      {step < 4 && (
        <div className="row between mt20 figma-add-nav" style={{ justifyContent: step === 0 ? "flex-end" : "space-between" }}>
          {step > 0 && <button className="btn btn-ghost btn-sm" onClick={() => setStep((s) => s - 1)}>← Back</button>}
          <button className={"btn btn-primary btn-sm" + (step === 2 && !isPrivate ? " figma-footer-generate-btn" : "")} disabled={step === 0 && !type} onClick={() => {
            if (step === 2 && !isPrivate) {
              generateInfo();
            } else {
              setStep((s) => s + 1);
            }
          }}>
            {step === 2 && !isPrivate ? <><IconSparkle /> Generate info</> : <>{step === 3 ? (isPrivate ? "Save Private Note" : "Publish Knowledge") : "Continue"} <span style={{ width: 14, height: 14 }}><IconArrow /></span></>}
          </button>
        </div>
      )}

      {/* Link reason modal */}
      {linkModal && (
        <div className="modal-overlay" onClick={() => setLinkModal(null)}>
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal-head">
              <h3>Link Project</h3>
              <button className="modal-close" onClick={() => setLinkModal(null)}><span style={{ width: 16, height: 16, display: "grid" }}><IconClose /></span></button>
            </div>
            <div className="modal-desc">
              Tell us why <strong>{linkModal.name}</strong> is helpful to the current project.
            </div>
            <div className="modal-body">
              <textarea
                className="link-textarea"
                rows="3"
                placeholder="e.g. Shares the same CTA pattern we're improving…"
                value={linkReason}
                onChange={(e) => setLinkReason(e.target.value)}
              />
            </div>
            <div className="modal-foot">
              <button className="btn btn-ghost" onClick={() => setLinkModal(null)}>Cancel</button>
              <button
                className="btn btn-primary"
                onClick={() => {
                  setLinked((l) => ({ ...l, [linkModal.name]: true }));
                  setLinkModal(null);
                }}
              >Link</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FigmaPlugin() {
  const [tab, setTab] = useState("ask"); // ask | add
  const [selected, setSelected] = useState("screen"); // null | "screen"

  return (
    <div className="figma-stage" onClick={() => setSelected(null)}>
      <div style={{ position: "absolute", top: 24, left: 28 }}>
        <Link to="/" className="faint" style={{ fontSize: 13 }}>← Back to site</Link>
      </div>

      <div className="figma-frame">
        {/* Fake Figma canvas */}
        <div className="figma-canvas">
          <div className="fc-toolbar">
            <span className="fc-dot" style={{ background: "#ff5f57" }} />
            <span className="fc-dot" style={{ background: "#febc2e" }} />
            <span className="fc-dot" style={{ background: "#28c840" }} />
            <span className="faint" style={{ marginLeft: 10, fontSize: 12 }}>Fee Management — Checkout.fig</span>
          </div>

          <div style={{ padding: 30 }}>
            <span style={{ fontSize: 11, color: "var(--accent)", fontWeight: 600, marginLeft: 4, marginBottom: 6, display: "block" }}>Fee Home UI</span>

            <div
              className="figma-screen"
              onClick={(e) => { e.stopPropagation(); setSelected("screen"); }}
              style={{ position: "relative", border: "1.5px solid var(--accent)" }}
            >
              <div style={{ padding: 16 }}>
                {/* Fee Summary card */}
                <div className="card" style={{ padding: 16, marginBottom: 16 }}>
                  <div style={{ fontSize: 11, color: "var(--text-faint)", fontWeight: 600, marginBottom: 4 }}>Fee Summary</div>
                  <div style={{ fontSize: 24, fontWeight: 700 }}>$1,240.00</div>
                </div>

                {/* Pay Now button */}
                <button
                  className="btn btn-primary"
                  style={{ width: "100%", marginBottom: 16 }}
                  onClick={(e) => { e.stopPropagation(); setSelected("screen"); }}
                >
                  Pay Now
                </button>

                {/* Blank cards */}
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="card" style={{ padding: 14, marginBottom: 8 }}>
                    <div style={{ height: 8, width: "50%", background: "var(--panel-3)", borderRadius: 4, marginBottom: 6 }} />
                    <div style={{ height: 8, width: "30%", background: "var(--panel-3)", borderRadius: 4 }} />
                  </div>
                ))}
              </div>

              {/* Selection frame */}
              {selected === "screen" && (
                <div className="selection-frame" style={{ inset: -8 }}>
                  <span className="sel-handle" style={{ top: -5, left: -5 }} />
                  <span className="sel-handle" style={{ top: -5, right: -5 }} />
                  <span className="sel-handle" style={{ bottom: -5, left: -5 }} />
                  <span className="sel-handle" style={{ bottom: -5, right: -5 }} />
                  <span style={{ position: "absolute", top: -24, left: 0, fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>Fee Home UI</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Plugin panel */}
        <div className="plugin-panel">
          <div className="plugin-head plugin-head-col">
            <div className="row between" style={{ width: "100%", alignItems: "center" }}>
              <div className="plugin-brand">
                <Wordmark size={24} />
              </div>
              <div className="plugin-jedi-mini"><img src={yodaMain} alt="" /><span>Jedi for Figma</span></div>
              <button className="del-btn" style={{ position: "static" }}><span style={{ width: 14, height: 14 }}><IconClose /></span></button>
            </div>
            <div className="plugin-tabbar">
              <button className={tab === "ask" ? "active" : ""} onClick={() => setTab("ask")}>Ask a Question</button>
              <button className={tab === "add" ? "active" : ""} onClick={() => setTab("add")}>Add Knowledge</button>
            </div>
          </div>

          <div className="plugin-body">
            {tab === "ask" ? <PluginAsk /> : <PluginAdd />}
          </div>
        </div>
      </div>
    </div>
  );
}
