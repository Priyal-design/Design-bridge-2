import { useState } from "react";
import { Link } from "react-router-dom";
import { chatThread } from "../data";
import { IconArrow, IconLink } from "../components/Icons";

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

  const ask = () => {
    setThinking(true);
    setAsked(false);
    setTimeout(() => { setThinking(false); setAsked(true); }, 1400);
  };

  return (
    <div className="page chat-page">
      {/* Orb */}
      <div style={{ position: "relative", height: 180, marginBottom: 10 }}>
        <div className="orb-big">
          <div className="orb-ring" />
          <div className="orb-ring r2" />
          {[...Array(6)].map((_, i) => (
            <span key={i} className="particle"
              style={{
                left: `${20 + i * 12}%`, top: `${30 + (i % 3) * 18}%`,
                animationDelay: `${i * 0.5}s`,
                background: ["#FF9500", "#007AFF", "#AF52DE"][i % 3],
              }} />
          ))}
        </div>
      </div>

      <div className="col gap20">
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
                  <div className="ai-orb-sm" />
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
              <p style={{ fontSize: 15.5, lineHeight: 1.6 }}>{chatThread.answer}</p>

              {/* Metrics */}
              <div className="row gap16 mt16 wrap">
                {chatThread.metrics.map((m) => (
                  <div key={m.label} className="card" style={{ padding: "12px 16px", flex: 1, minWidth: 160 }}>
                    <div className="faint" style={{ fontSize: 12 }}>{m.label}</div>
                    <div className="metric-arrow mt8">
                      <span className="metric-from" style={{ fontSize: 15 }}>{m.from}</span>
                      <span className="arrow" style={{ width: 15, height: 15 }}><IconArrow /></span>
                      <span className="metric-to" style={{ fontSize: 20 }}>{m.to}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Evidence */}
            <div className="card">
              <div className="section-title row gap8" style={{ alignItems: "center" }}>
                <span style={{ width: 15, height: 15 }}><IconLink /></span> Evidence
              </div>
              <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
                {chatThread.evidence.map((e) => (
                  <Link key={e.title} to="/decisions/21" className="evidence-chip">
                    <span style={{ fontSize: 18 }}>{e.icon}</span>
                    <div>
                      <div style={{ fontWeight: 600 }}>{e.title}</div>
                      <div className="faint" style={{ fontSize: 11.5 }}>{e.type}</div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Related questions */}
            <div>
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

        {/* Input */}
        <div className="ai-input" style={{ padding: "8px 8px 8px 16px", position: "sticky", bottom: 20 }}>
          <input value={input} onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && ask()}
            placeholder="Ask Design Bridge anything…" />
          <button className="btn btn-primary btn-sm" onClick={ask}>
            Send <span style={{ width: 14, height: 14 }}><IconArrow /></span>
          </button>
        </div>
      </div>
    </div>
  );
}
