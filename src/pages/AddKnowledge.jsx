import { useState } from "react";
import { Link } from "react-router-dom";
import { knowledgeTypes } from "../data";
import { IconCheck, IconArrow, IconSparkle, IconLink, IconPlay, IconClose } from "../components/Icons";
import Lottie from "../components/Lottie";
import published from "../assets/published.json";

const steps = ["Choose", "Details", "Publish"];

// Tags Design Bridge suggests after reading the title & description
const suggestedTags = ["cta", "accessibility", "conversion", "above-the-fold", "checkout", "usability", "mobile", "heatmap"];

const relatedProjects = [
  { id: "fee-management", name: "Fee Management System", dept: "Finance", updated: "3 days ago", desc: "Shares the checkout CTA pattern and above-the-fold action study.", color: "#007AFF" },
  { id: "photo-asset", name: "Photo Asset Management", dept: "Photography", updated: "1 week ago", desc: "Referenced the same heatmap method to validate the primary action.", color: "#AF52DE" },
  { id: "microscope-config", name: "Microscope Configuration Portal", dept: "Microscopy", updated: "2 weeks ago", desc: "Similar layout reshuffle to surface the key task above the fold.", color: "#34C759" },
];

export default function AddKnowledge() {
  const [step, setStep] = useState(0);
  const [type, setType] = useState("decision");
  const [linked, setLinked] = useState({ "Fee Management System": true });
  const [tags, setTags] = useState(["cta", "accessibility", "conversion"]);

  const toggleTag = (t) =>
    setTags((prev) => (prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]));

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
              {/* Upper box — selected tags; click ✕ to remove */}
              <div className="tag-input-box">
                {tags.length === 0 && <span className="tag-empty">No tags yet — pick from suggestions below.</span>}
                {tags.map((t) => (
                  <span key={t} className="tag-chip">
                    #{t}
                    <button type="button" className="tag-chip-x" aria-label={`Remove ${t}`} onClick={() => toggleTag(t)}>
                      <span style={{ width: 12, height: 12, display: "grid" }}><IconClose /></span>
                    </button>
                  </span>
                ))}
              </div>

              {/* Generate-tags suggestion box — click a tag to select / deselect it above */}
              <div className="gen-tags">
                <div className="gen-tags-head">
                  <span className="gen-tags-ic"><IconSparkle /></span>
                  <div>
                    <div className="gen-tags-title">Generate tags</div>
                    <div className="gen-tags-sub">Create tags for the project as per the information given</div>
                  </div>
                </div>
                <div className="gen-tags-pills">
                  {suggestedTags.map((t) => {
                    const on = tags.includes(t);
                    return (
                      <button type="button" key={t} className={"suggest-pill" + (on ? " on" : "")} onClick={() => toggleTag(t)}>
                        <span className="sp-ic">{on ? <IconCheck /> : <span className="sp-plus">+</span>}</span>
                        {t}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Link related projects */}
          <div className="card">
            <div className="row between mb16" style={{ alignItems: "flex-start" }}>
              <div>
                <div className="section-title" style={{ margin: 0 }}>Link related projects</div>
                <div className="faint" style={{ fontSize: 12.5, marginTop: 4 }}>
                  We found {relatedProjects.length} projects that might be relevant — view or link them.
                </div>
              </div>
              <span className="badge badge-violet">{relatedProjects.length} suggestions</span>
            </div>
            <div className="col gap12">
              {relatedProjects.map((p) => {
                const on = !!linked[p.name];
                return (
                  <div key={p.name} className={"linkproj-row" + (on ? " on" : "")}>
                    {/* UI screen of the project */}
                    <div className="linkproj-screen" style={{ "--sc": p.color }}>
                      <div className="sc-bar"><span /><span /><span /></div>
                      <div className="sc-body">
                        <div className="sc-line w70" />
                        <div className="sc-block" />
                        <div className="sc-line w50" />
                        <div className="sc-line w40" />
                      </div>
                    </div>
                    {/* Header + info */}
                    <div className="linkproj-info">
                      <div className="linkproj-name">{p.name}</div>
                      <div className="linkproj-meta">
                        <span className="dept-dot" style={{ background: p.color }} />{p.dept} · Updated {p.updated}
                      </div>
                      <div className="linkproj-desc">{p.desc}</div>
                    </div>
                    {/* View + Link buttons on the right */}
                    <div className="linkproj-actions">
                      <Link to={`/projects/${p.id}`} className="btn btn-ghost btn-sm linkproj-btn">
                        <span style={{ width: 15, height: 15, display: "grid" }}><IconPlay /></span> View
                      </Link>
                      <button
                        type="button"
                        className={"btn btn-sm linkproj-btn " + (on ? "btn-green" : "btn-primary")}
                        onClick={() => setLinked((l) => ({ ...l, [p.name]: !on }))}>
                        {on
                          ? <><span style={{ width: 15, height: 15, display: "grid" }}><IconCheck /></span> Linked</>
                          : <><span style={{ width: 15, height: 15, display: "grid" }}><IconLink /></span> Link</>}
                      </button>
                    </div>
                  </div>
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
            <button className="btn btn-ghost" onClick={() => setStep(1)}>← Go Back</button>
            <Link to="/hub" className="btn btn-primary">View in Hub</Link>
          </div>
        </div>
      )}

      {/* Nav */}
      {step < 2 && (
        <div className="row between mt24" style={{ justifyContent: step === 0 ? "flex-end" : "space-between" }}>
          {step > 0 && (
            <button className="btn btn-ghost" onClick={() => setStep((s) => Math.max(0, s - 1))}>← Back</button>
          )}
          <button className="btn btn-primary" onClick={() => setStep((s) => s + 1)}>
            {step === 1 ? "Publish" : "Continue"} <span style={{ width: 16, height: 16 }}><IconArrow /></span>
          </button>
        </div>
      )}
    </div>
  );
}
