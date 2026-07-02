import { useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { chatThread, responseSources, sourceTabs } from "../data";
import { IconArrow, IconLink } from "../components/Icons";
import MagicWand from "../components/MagicWand";
import SourceCard from "../components/SourceCard";

function ConfRing({ value }) {
  const r = 24, c = 2 * Math.PI * r;
  const off = c - (value / 100) * c;
  return (
    <div className="conf-ring">
      <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)" }}>
        <circle cx="28" cy="28" r={r} fill="none" stroke="var(--panel-3)" strokeWidth="5" />
        <circle cx="28" cy="28" r={r} fill="none" stroke="var(--green)" strokeWidth="5"
          strokeLinecap="round" strokeDasharray={c} strokeDashoffset={off} />
      </svg>
      <div style={{ position: "absolute", inset: 0, display: "grid", placeItems: "center", fontSize: 12.5, fontWeight: 800 }}>
        {value}%
      </div>
    </div>
  );
}

export default function Chat() {
  const [asked, setAsked] = useState(true);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("All");
  const location = useLocation();
  const [showSources, setShowSources] = useState(location.state?.openSources ?? false);

  const ask = () => {
    setThinking(true);
    setAsked(false);
    setTimeout(() => { setThinking(false); setAsked(true); }, 1400);
  };

  const counts = useMemo(() => {
    const c = { All: responseSources.length };
    for (const t of sourceTabs.slice(1)) c[t] = responseSources.filter((s) => s.category === t).length;
    return c;
  }, []);

  const shown = tab === "All" ? responseSources : responseSources.filter((s) => s.category === tab);

  return (
    <>
    <div className={"page chat-layout" + (showSources ? " with-sources" : "")}>
      {/* ---------- Conversation ---------- */}
      <div className="chat-col">
        {/* User question */}
        <div className="chat-bubble chat-user">{chatThread.question}</div>

        {thinking && (
          <div className="chat-bubble chat-ai">
            <span className="muted">Searching evidence and design memory…</span>
          </div>
        )}

        {asked && (
          <>
            {/* AI answer */}
            <div className="chat-bubble chat-ai" style={{ maxWidth: "100%" }}>
              <div className="row between mb12" style={{ alignItems: "center" }}>
                <div className="row gap10" style={{ alignItems: "center" }}>
                  <MagicWand size={42} />
                  <strong>Design Bridge</strong>
                </div>
                <div className="row gap8" style={{ alignItems: "center" }}>
                  <ConfRing value={chatThread.confidence} />
                  <div>
                    <div className="faint" style={{ fontSize: 11 }}>Confidence</div>
                    <div style={{ fontWeight: 700, color: "var(--green)" }}>High</div>
                  </div>
                </div>
              </div>

              {chatThread.answer.map((para, i) => (
                <p key={i} style={{ fontSize: 15.5, lineHeight: 1.6, marginTop: i ? 14 : 0 }}>{para}</p>
              ))}

              {/* Metrics */}
              <div className="row gap16 mt24 wrap">
                {chatThread.metrics.map((m) => (
                  <div key={m.label} className="metric-panel">
                    <div className="faint" style={{ fontSize: 12.5 }}>{m.label}</div>
                    <div className="metric-arrow mt8">
                      <span className="metric-from" style={{ fontSize: 15 }}>{m.from}</span>
                      <span className="arrow" style={{ width: 15, height: 15 }}><IconArrow /></span>
                      <span className="metric-to" style={{ fontSize: 20 }}>{m.to}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Toggle the Response Sources rail */}
              <button className="btn btn-ghost btn-sm open-sources-btn" onClick={() => setShowSources((s) => !s)}>
                <span style={{ width: 15, height: 15 }}><IconLink /></span>
                {showSources ? "Hide Sources" : "Open Sources"}
              </button>
            </div>

            {/* Input */}
            <div className="ai-input" style={{ padding: "8px 8px 8px 16px" }}>
              <input value={input} onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && ask()}
                placeholder="Ask Jedi Bot anything…" />
              <button className="btn btn-primary btn-sm" onClick={ask}>
                Send <span style={{ width: 14, height: 14 }}><IconArrow /></span>
              </button>
            </div>

            {/* Related questions */}
            <div className="mt8">
              <div className="section-title">Related Questions</div>
              <div className="col gap8">
                {chatThread.related.map((q) => (
                  <div key={q} className="related-q" onClick={ask}>
                    <span className="faint">↳</span> {q}
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      </div>

      {/* ---------- Response Sources rail ---------- */}
      {showSources && (
      <aside className="sources-panel">
        <div className="sources-head">
          <span className="src-badge"><span style={{ width: 17, height: 17 }}><IconLink /></span></span>
          <h3>Response Sources</h3>
        </div>
        <div className="faint" style={{ fontSize: 13, marginBottom: 16 }}>
          {responseSources.length} verified sources
        </div>

        <div className="src-tabs">
          {sourceTabs.map((t) => {
            const n = counts[t] || 0;
            const disabled = t !== "All" && n === 0;
            return (
              <button
                key={t}
                className={"src-tab" + (tab === t ? " active" : "") + (disabled ? " disabled" : "")}
                onClick={() => !disabled && setTab(t)}
              >
                {t}
                {n > 0 && <span className="src-count">{n}</span>}
              </button>
            );
          })}
        </div>

        <div className="col gap16">
          {shown.map((src) => <SourceCard key={src.id} src={src} />)}
        </div>
      </aside>
      )}
    </>
  );
}
