import { useState } from "react";
import { Link } from "react-router-dom";
import { knowledgeTypes } from "../data";
import { IconSparkle, IconCheck, IconArrow } from "../components/Icons";

const steps = ["Choose", "Details", "AI Enrichment", "Publish"];

const enrichActions = [
  { label: "Generate Summary", desc: "Condense into a 2-line abstract", icon: "📝" },
  { label: "Generate Rationale", desc: "Explain the why behind the decision", icon: "🧭" },
  { label: "Find Related Projects", desc: "Surface connected work across teams", icon: "🔗" },
  { label: "Suggest Tags", desc: "Auto-classify by topic and department", icon: "🏷️" },
];

export default function AddKnowledge() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("decision");
  const [done, setDone] = useState({});

  return (
    <div className="page" style={{ maxWidth: 920 }}>
      <div className="page-head">
        <h2>Add Knowledge</h2>
        <p>Capture a decision, study, or guideline — Design Bridge enriches and links it for you.</p>
      </div>

      {/* Steps rail */}
      <div className="steps-rail">
        {steps.map((s, i) => (
          <div key={s} className="step-pill" style={{ flex: i < steps.length - 1 ? 1 : "none" }}>
            <div className={"step-circle " + (i < step ? "done" : i === step ? "active" : "")}>
              {i < step ? <span style={{ width: 16, height: 16 }}><IconCheck /></span> : i + 1}
            </div>
            <span className="step-label" style={{ color: i === step ? "var(--text)" : "var(--text-faint)" }}>{s}</span>
            {i < steps.length - 1 && <div className={"step-conn" + (i < step ? " done" : "")} />}
          </div>
        ))}
      </div>

      {/* Step 1 */}
      {step === 0 && (
        <div className="card">
          <div className="section-title">What are you capturing?</div>
          <div className="type-grid">
            {knowledgeTypes.map((t) => (
              <div key={t.key} className={"type-card" + (type === t.key ? " sel" : "")} onClick={() => setType(t.key)}>
                <div className="type-ic">{t.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{t.label}</div>
                <div className="faint" style={{ fontSize: 12.5, marginTop: 4 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 */}
      {step === 1 && (
        <div className="card">
          <div className="section-title">Details</div>
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
          <div className="field-row">
            <div className="field"><label>Source URL</label><input placeholder="https://" /></div>
            <div className="field"><label>Figma Link</label><input placeholder="figma.com/file/…" /></div>
          </div>
          <div className="field"><label>Jira Link</label><input placeholder="jedi.atlassian.net/…" /></div>
          <div className="field"><label>Files</label>
            <div className="dropzone">📎 Drag & drop files here, or <span style={{ color: "var(--accent)" }}>browse</span></div>
          </div>
          <div className="field"><label>Tags</label><input placeholder="Add tags…" defaultValue="cta, accessibility, conversion" /></div>
        </div>
      )}

      {/* Step 3 */}
      {step === 2 && (
        <div className="card">
          <div className="row gap10 mb16" style={{ alignItems: "center" }}>
            <div className="ai-orb-sm" />
            <div className="section-title" style={{ margin: 0 }}>AI Enrichment</div>
          </div>
          <div className="col gap12">
            {enrichActions.map((a) => (
              <button key={a.label} className="enrich-btn"
                onClick={() => setDone((d) => ({ ...d, [a.label]: true }))}>
                <div className="row gap12" style={{ alignItems: "center" }}>
                  <span style={{ fontSize: 22 }}>{a.icon}</span>
                  <div style={{ textAlign: "left" }}>
                    <div style={{ fontWeight: 700 }}>{a.label}</div>
                    <div className="faint" style={{ fontSize: 12.5 }}>{a.desc}</div>
                  </div>
                </div>
                {done[a.label]
                  ? <span className="badge badge-green"><span style={{ width: 13, height: 13 }}><IconCheck /></span> Done</span>
                  : <span className="badge badge-blue"><span style={{ width: 13, height: 13 }}><IconSparkle /></span> Run</span>}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 4 */}
      {step === 3 && (
        <div className="card" style={{ textAlign: "center", padding: 50 }}>
          <div style={{ width: 70, height: 70, borderRadius: "50%", margin: "0 auto 20px", display: "grid", placeItems: "center", background: "rgba(52,199,89,0.15)", color: "var(--green)", border: "1px solid var(--glass-border)", boxShadow: "inset 0 1px 0 var(--glass-highlight)" }}>
            <span style={{ width: 34, height: 34 }}><IconCheck /></span>
          </div>
          <h2 style={{ fontSize: 24 }}>Knowledge published!</h2>
          <p className="muted mt12">Your entry appears instantly across the Knowledge Hub, graph, and AI search.</p>
          <div className="row gap12 mt24" style={{ justifyContent: "center" }}>
            <Link to="/hub" className="btn btn-ghost">View in Hub</Link>
            <Link to="/graph" className="btn btn-primary">See on Graph</Link>
          </div>
        </div>
      )}

      {/* Nav */}
      {step < 3 && (
        <div className="row between mt24">
          <button className="btn btn-ghost" disabled={step === 0}
            style={{ opacity: step === 0 ? 0.4 : 1 }}
            onClick={() => setStep((s) => Math.max(0, s - 1))}>← Back</button>
          <button className="btn btn-primary" onClick={() => setStep((s) => s + 1)}>
            {step === 2 ? "Publish" : "Continue"} <span style={{ width: 16, height: 16 }}><IconArrow /></span>
          </button>
        </div>
      )}
    </div>
  );
}
