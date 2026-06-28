import { useState } from "react";
import { Link } from "react-router-dom";
import { guidelines } from "../data";
import { IconClose, IconSparkle, IconArrow, IconCheck } from "../components/Icons";
import Wordmark from "../components/Wordmark";

export default function FigmaPlugin() {
  const [tab, setTab] = useState("ask");      // ask | add
  const [example, setExample] = useState(1);  // 1 = CTA decision, 2 = guidelines
  const [showCard, setShowCard] = useState(true);

  return (
    <div className="figma-stage">
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

          {/* mock UI inside */}
          <div style={{ padding: 30 }}>
            <div style={{ height: 14, width: "55%", background: "var(--panel-3)", borderRadius: 5, marginBottom: 24 }} />
            <div className="card" style={{ padding: 16, marginBottom: 16 }}>
              <div style={{ height: 10, width: "40%", background: "var(--border-2)", borderRadius: 4, marginBottom: 10 }} />
              <div style={{ height: 10, width: "70%", background: "var(--panel-3)", borderRadius: 4 }} />
            </div>

            {/* selected CTA */}
            <div style={{ position: "relative", marginTop: 30 }}>
              <button className="btn btn-primary" style={{ width: "100%" }}>Pay Now — $1,240.00</button>
              <div className="selection-frame" style={{ inset: -8 }}>
                <span className="sel-handle" style={{ top: -5, left: -5 }} />
                <span className="sel-handle" style={{ top: -5, right: -5 }} />
                <span className="sel-handle" style={{ bottom: -5, left: -5 }} />
                <span className="sel-handle" style={{ bottom: -5, right: -5 }} />
                <span style={{ position: "absolute", top: -24, left: 0, fontSize: 11, color: "var(--accent)", fontWeight: 600 }}>Primary CTA</span>
              </div>
            </div>

            <div className="card" style={{ padding: 16, marginTop: 40 }}>
              <div style={{ height: 10, width: "60%", background: "var(--panel-3)", borderRadius: 4, marginBottom: 10 }} />
              <div style={{ height: 10, width: "45%", background: "var(--panel-3)", borderRadius: 4 }} />
            </div>
          </div>
        </div>

        {/* Plugin panel — 380px */}
        <div className="plugin-panel" style={{ width: 380 }}>
          <div className="plugin-head">
            <div style={{ flex: 1 }}>
              <Wordmark size={15} />
              <div className="faint" style={{ fontSize: 11, marginTop: 3 }}>1 frame selected · Primary CTA</div>
            </div>
            <button className="del-btn" style={{ position: "static" }}><span style={{ width: 14, height: 14 }}><IconClose /></span></button>
          </div>

          <div className="plugin-body">
            <div className="faint mb12" style={{ fontSize: 12.5 }}>What would you like to do?</div>
            <div className="plugin-tabs mb16">
              <button className={"plugin-tab" + (tab === "ask" ? " active" : "")} onClick={() => setTab("ask")}>Ask a Question</button>
              <button className={"plugin-tab" + (tab === "add" ? " active" : "")} onClick={() => setTab("add")}>Add Knowledge</button>
            </div>

            {tab === "ask" && (
              <>
                {/* example switch */}
                <div className="row gap8 mb16">
                  <button className={"chip" + (example === 1 ? " active" : "")} style={{ fontSize: 11.5, padding: "5px 10px" }} onClick={() => { setExample(1); setShowCard(true); }}>Ex 1 · Why above fold?</button>
                  <button className={"chip" + (example === 2 ? " active" : "")} style={{ fontSize: 11.5, padding: "5px 10px" }} onClick={() => setExample(2)}>Ex 2 · Guidelines</button>
                </div>

                {/* Example 1 */}
                {example === 1 && (
                  <>
                    <div className="ai-bubble user mb12">Why is the CTA above the fold?</div>
                    {showCard && (
                      <div className="ai-result-card">
                        <button className="del-btn" onClick={() => setShowCard(false)}><span style={{ width: 13, height: 13 }}><IconClose /></span></button>
                        <div className="badge badge-violet mb8">Decision</div>
                        <div style={{ fontWeight: 700, fontSize: 15 }}>Move CTA Above Fold</div>
                        <div className="row gap8 mt8 mb12" style={{ alignItems: "center" }}>
                          <span className="badge badge-green"><span className="dot" style={{ background: "var(--green)" }} />94% confidence</span>
                        </div>
                        <div className="faint" style={{ fontSize: 11.5 }}>Reason</div>
                        <p style={{ fontSize: 13.5, marginBottom: 12 }}>Users missed the CTA during testing.</p>
                        <div className="faint" style={{ fontSize: 11.5 }}>Metrics</div>
                        <div className="metric-arrow mt8 mb12">
                          <span className="metric-from" style={{ fontSize: 14 }}>62%</span>
                          <span className="arrow" style={{ width: 14, height: 14 }}><IconArrow /></span>
                          <span className="metric-to" style={{ fontSize: 18 }}>89%</span>
                          <span className="faint" style={{ fontSize: 11 }}>Task success</span>
                        </div>
                        <div className="faint" style={{ fontSize: 11.5, marginBottom: 6 }}>Evidence</div>
                        <div className="row gap8 wrap">
                          <span className="tag">🔬 Research Study #11</span>
                          <span className="tag">📊 Heatmaps</span>
                          <span className="tag">♿ Accessibility Audit</span>
                        </div>
                      </div>
                    )}
                    {!showCard && (
                      <button className="btn btn-ghost btn-sm" style={{ width: "100%" }} onClick={() => setShowCard(true)}>Card dismissed — restore</button>
                    )}
                  </>
                )}

                {/* Example 2 */}
                {example === 2 && (
                  <>
                    <div className="ai-bubble user mb12">What CTA guidelines should I follow?</div>
                    <div className="ai-result-card">
                      <div className="row between mb12" style={{ alignItems: "center" }}>
                        <strong style={{ fontSize: 14.5 }}>{guidelines.title}</strong>
                        <span className="badge badge-green" style={{ fontSize: 11 }}>{guidelines.confidence}%</span>
                      </div>
                      <div className="col gap8">
                        {guidelines.rules.map((r) => (
                          <div key={r} className="row gap8" style={{ alignItems: "flex-start" }}>
                            <span style={{ width: 15, height: 15, color: "var(--green)", flex: "none", marginTop: 2 }}><IconCheck /></span>
                            <span style={{ fontSize: 13.5 }}>{r}</span>
                          </div>
                        ))}
                      </div>
                      <div className="faint mt16" style={{ fontSize: 11.5, marginBottom: 6 }}>Based on</div>
                      <div className="row gap8 wrap">
                        {guidelines.based.map((b) => <span key={b} className="tag">{b}</span>)}
                      </div>
                    </div>
                  </>
                )}

                <div className="ai-input mt16">
                  <input placeholder="Ask about the selection…" />
                  <button className="btn btn-primary btn-sm"><span style={{ width: 14, height: 14 }}><IconSparkle /></span></button>
                </div>
              </>
            )}

            {tab === "add" && (
              <div className="col gap0">
                <div className="faint mb12" style={{ fontSize: 12.5 }}>Add Knowledge Flow</div>
                {["Title", "Problem", "Evidence", "Metrics", "Alternatives", "Outcome"].map((f) => (
                  <div key={f} className="field" style={{ marginBottom: 12 }}>
                    <label>{f}</label>
                    {f === "Problem" || f === "Outcome"
                      ? <textarea rows="2" placeholder={`Enter ${f.toLowerCase()}…`} />
                      : <input placeholder={`Enter ${f.toLowerCase()}…`} />}
                  </div>
                ))}
                <button className="btn btn-primary" style={{ width: "100%", marginTop: 4 }}>
                  Submit to Design Bridge <span style={{ width: 16, height: 16 }}><IconArrow /></span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
