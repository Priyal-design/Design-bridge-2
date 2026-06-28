import { useState } from "react";
import { Link } from "react-router-dom";
import { knowledgeTypes } from "../data";
import { IconCheck, IconArrow } from "../components/Icons";
import Lottie from "../components/Lottie";
import published from "../assets/published.json";

const steps = ["Choose", "Details", "Publish"];

const relatedProjects = [
  { name: "Fee Management System", dept: "Finance", desc: "Shares the checkout CTA pattern", color: "#007AFF", initials: "FM" },
  { name: "Patient Appointment Portal", dept: "Medical", desc: "Similar above-fold action study", color: "#34C759", initials: "PP" },
  { name: "Photo Asset Management", dept: "Photography", desc: "Referenced the same heatmap method", color: "#AF52DE", initials: "PA" },
];

export default function AddKnowledge() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("decision");
  const [linked, setLinked] = useState({ "Fee Management System": true });

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

      {/* Step 1 — Choose */}
      {step === 0 && (
        <div className="card">
          <div className="section-title">What are you capturing?</div>
          <div className="type-grid">
            {knowledgeTypes.map((t) => (
              <div key={t.key} className={"type-card" + (type === t.key ? " sel" : "")} onClick={() => setType(t.key)}>
                <div className="type-ic">{t.icon}</div>
                <div style={{ fontWeight: 700, fontSize: 15 }}>{t.label}</div>
                <div className="type-desc" style={{ fontSize: 12.5, marginTop: 4 }}>{t.desc}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2 — Details */}
      {step === 1 && (
        <>
          <div className="card mb20">
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
              <div className="dropzone">📎 Drag &amp; drop files here, or <span style={{ color: "var(--accent)" }}>browse</span></div>
            </div>
            <div className="field" style={{ marginBottom: 0 }}><label>Tags</label>
              <div className="row gap8 wrap">
                {["cta", "accessibility", "conversion"].map((t) => <span key={t} className="tag">#{t}</span>)}
                <input style={{ flex: 1, minWidth: 140 }} placeholder="Add tags…" />
              </div>
            </div>
          </div>

          {/* Related projects suggestion */}
          <div className="card">
            <div className="row between mb16" style={{ alignItems: "center" }}>
              <div className="section-title" style={{ margin: 0 }}>Related projects we found</div>
              <span className="badge badge-violet">3 suggestions</span>
            </div>
            <div className="col gap10">
              {relatedProjects.map((p) => {
                const on = !!linked[p.name];
                return (
                  <button key={p.name} className={"related-row" + (on ? " on" : "")}
                    onClick={() => setLinked((l) => ({ ...l, [p.name]: !on }))}>
                    <div className="avatar" style={{ width: 38, height: 38, background: p.color, fontSize: 12 }}>{p.initials}</div>
                    <div style={{ flex: 1, textAlign: "left" }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{p.name}</div>
                      <div className="faint" style={{ fontSize: 12.5 }}>{p.desc}</div>
                    </div>
                    <span className={"link-pill" + (on ? " on" : "")}>
                      {on ? <><span style={{ width: 13, height: 13 }}><IconCheck /></span> Linked</> : "Add project"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </>
      )}

      {/* Step 3 — Publish / Success */}
      {step === 2 && (
        <div className="card success-card">
          <Lottie animationData={published} size={180} loop={false} style={{ margin: "0 auto" }} />
          <h2 style={{ fontSize: 26, marginTop: 4 }}>Knowledge published!</h2>
          <p className="muted mt12" style={{ maxWidth: 420, marginInline: "auto" }}>
            Your entry appears instantly across the Knowledge Hub, graph, and AI search.
          </p>
          <div className="row gap12 mt24" style={{ justifyContent: "center" }}>
            <button className="btn btn-ghost" onClick={() => setStep(0)}>← Go Back</button>
            <Link to="/hub" className="btn btn-primary">View in Hub</Link>
          </div>
        </div>
      )}

      {/* Nav */}
      {step < 2 && (
        <div className="row between mt24">
          <button className="btn btn-ghost" disabled={step === 0}
            style={{ opacity: step === 0 ? 0.4 : 1 }}
            onClick={() => setStep((s) => Math.max(0, s - 1))}>← Back</button>
          <button className="btn btn-primary" onClick={() => setStep((s) => s + 1)}>
            {step === 1 ? "Publish" : "Continue"} <span style={{ width: 16, height: 16 }}><IconArrow /></span>
          </button>
        </div>
      )}
    </div>
  );
}
