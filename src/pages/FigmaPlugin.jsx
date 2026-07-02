import { useState } from "react";
import { Link } from "react-router-dom";
import { chatThread, knowledgeTypes } from "../data";
import { IconClose, IconSparkle, IconArrow, IconCheck, IconLink, IconPlay, IconDecision, IconGraph, IconRuler, IconGauge, IconProject, IconLock } from "../components/Icons";
import MagicWand from "../components/MagicWand";
import Lottie from "../components/Lottie";
import published from "../assets/published.json";
import Wordmark from "../components/Wordmark";

const suggestedTags = ["cta", "accessibility", "conversion", "above-the-fold", "checkout", "usability", "mobile", "heatmap"];
const addSteps = ["Choose", "Details", "Publish"];

const relatedProjects = [
  { id: "fee-management", name: "Fee Management System", dept: "Finance", updated: "3 days ago", desc: "Shares the checkout CTA pattern and above-the-fold action study.", color: "#007AFF" },
  { id: "photo-asset", name: "Photo Asset Management", dept: "Photography", updated: "1 week ago", desc: "Referenced the same heatmap method to validate the primary action.", color: "#AF52DE" },
  { id: "microscope-config", name: "Microscope Configuration Portal", dept: "Microscopy", updated: "2 weeks ago", desc: "Similar layout reshuffle to surface the key task above the fold.", color: "#34C759" },
];

const typeIcons = {
  decision: IconDecision,
  research: IconGraph,
  guideline: IconRuler,
  evidence: IconGauge,
  documentation: IconProject,
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
        <div className="ai-result-card">
          <div className="row between mb12" style={{ alignItems: "center" }}>
            <div className="row gap8" style={{ alignItems: "center" }}>
              <MagicWand size={30} />
              <strong style={{ fontSize: 14 }}>Design Bridge</strong>
            </div>
            <ConfRing value={chatThread.confidence} />
          </div>

          <div className="badge badge-violet mb8">Decision Insights</div>
          <p style={{ fontSize: 13.5, lineHeight: 1.6, marginBottom: 12 }}>{chatThread.answer[0]}</p>

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

          <div className="faint" style={{ fontSize: 11.5, marginBottom: 6 }}>Evidence found</div>
          <div className="row gap8 wrap">
            {chatThread.evidence.map((e) => (
              <span key={e.title} className="tag">{e.icon} {e.title}</span>
            ))}
          </div>

          <Link to="/chat" state={{ openSources: true }} className="btn btn-ghost btn-sm open-sources-btn">
            <span style={{ width: 15, height: 15 }}><IconLink /></span>
            Open Sources
          </Link>
        </div>
      )}

      <div className="ai-input mt16">
        <input value={input} onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && ask()}
          placeholder="Ask about the selection…" />
        <button className="btn btn-primary btn-sm" onClick={ask}>
          <span style={{ width: 14, height: 14 }}><IconSparkle /></span>
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
  const [type, setType] = useState("decision");
  const [tags, setTags] = useState(["cta", "accessibility"]);
  const [linked, setLinked] = useState({ "Fee Management System": true });
  const [linkModal, setLinkModal] = useState(null);
  const [linkReason, setLinkReason] = useState("");

  const toggleTag = (t) => setTags((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]));

  return (
    <div>
      {/* Step rail */}
      <div className="steps-rail" style={{ marginBottom: 20 }}>
        {addSteps.map((s, i) => (
          <div key={s} className="step-pill" style={{ flex: i < addSteps.length - 1 ? 1 : "none" }}>
            <div className={"step-circle " + (i < step ? "done" : i === step ? "active" : "")} style={{ width: 28, height: 28, fontSize: 12 }}>
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
              <div key={t.key} className={"type-card" + (type === t.key ? " sel" : "")} style={{ padding: "14px 12px", height: 148 }} onClick={() => setType(t.key)}>
                <div className="type-ic" style={{ width: 36, height: 36, marginBottom: 8 }}>{(() => { const Ic = typeIcons[t.key]; return Ic ? <Ic /> : t.icon; })()}</div>
                <div style={{ fontWeight: 700, fontSize: 13 }}>{t.label}</div>
                <div className="type-desc" style={{ fontSize: 11, marginTop: 4 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Step 2 — Details */}
      {step === 1 && (
        <>
          <div className="field"><label>Title</label><input placeholder="e.g. Move CTA above the fold" defaultValue="Move CTA Above Fold" /></div>
          <div className="field"><label>Description</label><textarea rows="3" placeholder="Describe the knowledge…" defaultValue="Users overlooked the payment action in the prior layout." /></div>
          <div className="field-row">
            <div className="field"><label>Department</label>
              <select defaultValue="Finance"><option>Finance</option><option>Microscopy</option><option>Photography</option><option>Medical</option></select>
            </div>
            <div className="field"><label>Category</label>
              <select defaultValue="Decision"><option>Decision</option><option>Research</option><option>Guideline</option><option>Metric</option></select>
            </div>
          </div>
          <div className="field"><label>Authors</label><input placeholder="Add contributors" defaultValue="Alex Kim, Priya Sharma" /></div>
          <div className="field"><label>Target Audience</label>
            <select defaultValue="">
              <option value="" disabled>Select target audience</option>
              <option>Students</option>
              <option>Working Professionals</option>
              <option>Elderly</option>
              <option>All Clients and Businesses</option>
            </select>
          </div>
          <div className="field-row">
            <div className="field"><label>Source URL</label><input placeholder="https://" /></div>
            <div className="field"><label>Figma Link</label><input placeholder="figma.com/file/…" /></div>
          </div>
          <div className="field"><label>Jira Link</label><input placeholder="jedi.atlassian.net/…" /></div>
          <div className="field"><label>Files</label>
            <div className="dropzone">📎 Drag &amp; drop files here, or <span style={{ color: "var(--accent)" }}>browse</span></div>
          </div>
          <div className="field" style={{ marginBottom: 0 }}><label>Tags</label>
            <div className="tag-input-box">
              {tags.length === 0 && <span className="tag-empty">No tags yet — pick from suggestions below.</span>}
              {tags.map((t) => (
                <span key={t} className="tag-chip">{t}
                  <button type="button" className="tag-chip-x" aria-label={`Remove ${t}`} onClick={() => toggleTag(t)}>
                    <span style={{ width: 12, height: 12, display: "grid" }}><IconClose /></span>
                  </button>
                </span>
              ))}
            </div>
            <div className="gen-tags">
              <div className="gen-tags-head">
                <span className="gen-tags-ic"><IconSparkle /></span>
                <div>
                  <div className="gen-tags-title">Generated tags</div>
                  <div className="gen-tags-sub">Pick tags for the project</div>
                </div>
              </div>
              <div className="gen-tags-pills">
                {suggestedTags.map((t) => {
                  const on = tags.includes(t);
                  return (
                    <button type="button" key={t} className={"suggest-pill" + (on ? " on" : "")} onClick={() => toggleTag(t)}>
                      <span className="sp-ic">{on ? <IconCheck /> : <span className="sp-plus">+</span>}</span>{t}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Step 3 — Published */}
      {step === 2 && (
        <div style={{ textAlign: "center", padding: "10px 0" }}>
          <Lottie animationData={published} size={120} loop={false} style={{ margin: "0 auto" }} />
          <h3 style={{ fontSize: 18, marginTop: 4 }}>Knowledge published!</h3>
          <p className="muted mt8" style={{ fontSize: 13 }}>It now appears across the Knowledge Hub, graph, and AI search.</p>
          <div className="row gap8 mt20" style={{ justifyContent: "center" }}>
            <button className="btn btn-ghost btn-sm" onClick={() => setStep(1)}>← Go Back</button>
            <Link to="/hub" className="btn btn-primary btn-sm">View in Hub</Link>
          </div>
        </div>
      )}

      {/* Nav */}
      {step < 2 && (
        <div className="row between mt20" style={{ justifyContent: step === 0 ? "flex-end" : "space-between" }}>
          {step > 0 && <button className="btn btn-ghost btn-sm" onClick={() => setStep((s) => s - 1)}>← Back</button>}
          <button className="btn btn-primary btn-sm" onClick={() => setStep((s) => s + 1)}>
            {step === 1 ? "Publish" : "Continue"} <span style={{ width: 14, height: 14 }}><IconArrow /></span>
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
        <div className="plugin-panel" style={{ width: 552, height: 756 }}>
          <div className="plugin-head plugin-head-col">
            <div className="row between" style={{ width: "100%", alignItems: "center" }}>
              <div className="plugin-brand">
                <Wordmark size={24} />
              </div>
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
