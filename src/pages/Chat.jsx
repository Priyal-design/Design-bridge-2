import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { chatThread, responseSources, sourceTabs } from "../data";
import { IconArrow, IconLink, IconAttach } from "../components/Icons";
import MagicWand from "../components/MagicWand";
import SourceCard from "../components/SourceCard";
import yodaMain from "../assets/yoda-main.svg";
import yodaMainAnimationBlink from "../assets/yoda-main-animation-blink.svg";

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
  const location = useLocation();
  const sourceRequest = useMemo(() => {
    const params = new URLSearchParams(location.search);
    return {
      openSources: location.state?.openSources ?? params.get("openSources") === "true",
      activeClaimId: location.state?.activeClaimId || params.get("activeClaimId") || null,
    };
  }, [location.search, location.state]);
  const [asked, setAsked] = useState(sourceRequest.openSources ? true : false);
  const [thinking, setThinking] = useState(false);
  const [input, setInput] = useState("");
  const [tab, setTab] = useState("All");
  const [showSources, setShowSources] = useState(sourceRequest.openSources);
  const [yodaAnimating, setYodaAnimating] = useState(false);
  const [activeClaimId, setActiveClaimId] = useState(sourceRequest.activeClaimId);
  const [pinnedClaimId, setPinnedClaimId] = useState(sourceRequest.activeClaimId);
  const yodaTimer = useRef(null);

  const ask = () => {
    if (!input.trim() && asked) return;
    setThinking(true);
    setAsked(false);
    setShowSources(false);
    setTimeout(() => { setThinking(false); setAsked(true); setInput(""); }, 3000);
  };

  const counts = useMemo(() => {
    const c = { All: responseSources.length };
    for (const t of sourceTabs.slice(1)) c[t] = responseSources.filter((s) => s.category === t).length;
    return c;
  }, []);

  useEffect(() => () => {
    if (yodaTimer.current) clearTimeout(yodaTimer.current);
  }, []);

  useEffect(() => {
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setPinnedClaimId(null);
        setActiveClaimId(null);
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  const shown = tab === "All" ? responseSources : responseSources.filter((s) => s.category === tab);
  const citationNumbers = useMemo(() => {
    let next = 1;
    return chatThread.answer.reduce((acc, claim) => {
      if (claim.sourceIds.length) acc[claim.id] = next++;
      return acc;
    }, {});
  }, []);
  const activeClaim = chatThread.answer.find((claim) => claim.id === (pinnedClaimId || activeClaimId));
  const activeSourceIds = activeClaim?.sourceIds || [];
  const activePassagesBySource = useMemo(() => {
    if (!activeClaim) return {};
    return responseSources.reduce((acc, src) => {
      acc[src.id] = (src.details || []).filter((detail) => activeClaim.sourcePassages.includes(detail.text || detail));
      return acc;
    }, {});
  }, [activeClaim]);

  const activateClaim = (claimId) => {
    setActiveClaimId(claimId);
    setShowSources(true);
    setTab("All");
  };

  const clearActiveClaim = () => {
    if (!pinnedClaimId) setActiveClaimId(null);
  };

  const togglePinnedClaim = (claimId) => {
    const next = pinnedClaimId === claimId ? null : claimId;
    setPinnedClaimId(next);
    setActiveClaimId(next);
    if (next) setShowSources(true);
  };

  const playYodaAnimation = () => {
    if (yodaTimer.current) clearTimeout(yodaTimer.current);
    setYodaAnimating(true);
    yodaTimer.current = setTimeout(() => setYodaAnimating(false), 5000);
  };

  return (
    <>
    <div className={"page chat-layout" + (showSources ? " with-sources" : "")}>
      {/* ---------- Conversation ---------- */}
      <div className="chat-col">
        {!asked && !thinking && (
          <div className="jedi-page chat-home">
            <div className="jedi-blink-wrap" onMouseEnter={playYodaAnimation}>
              <span className="jedi-home-avatar-frame">
                <img className="jedi-home-avatar jedi-home-avatar-static" src={yodaMain} alt="" />
                {yodaAnimating && (
                  <img className="jedi-home-avatar jedi-home-avatar-animation" src={yodaMainAnimationBlink} alt="" />
                )}
              </span>
            </div>

            <div className="jedi-welcome card">
              <div className="jedi-welcome-title">Hi, I’m Jedi</div>
              <p className="jedi-welcome-text">
                You can ask me anything related to design decisions, research, metrics, meeting notes to guidelines.
                <br />
                I also give a confidence score to my answers.
              </p>
              <p className="jedi-welcome-text" style={{ marginTop: 12 }}>Would you ask me something?</p>
            </div>

            <div className="jedi-input-bar">
              <button type="button" className="attach-btn" aria-label="Attach file">
                <IconAttach />
              </button>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && input.trim() && ask()}
                placeholder="Ask Jedi Bot anything..."
              />
              <button className="jedi-send-btn" onClick={ask} disabled={!input.trim()}>
                Send <span style={{ width: 14, height: 14 }}><IconArrow /></span>
              </button>
            </div>

            <div className="jedi-faq">
              <div className="jedi-faq-title">Related Questions</div>
              {["How does Jedi work?", "Privacy policy", "How to invite users"].map((q) => (
                <button key={q} type="button" className="jedi-faq-row" onClick={() => { setInput(q); ask(); }}>
                  <span className="faint">↳</span> {q}
                </button>
              ))}
            </div>
          </div>
        )}

        {thinking && (
          <div className="chat-bubble chat-ai chat-loader">
            <span className="muted">Searching evidence and design memory…</span>
            <MagicWand size={384} />
          </div>
        )}

        {asked && (
          <>
            {/* User question */}
            <div className="chat-bubble chat-user">{chatThread.question}</div>

            {/* AI answer */}
            <div className="chat-bubble chat-ai" style={{ maxWidth: "100%" }}>
              <div className="row between mb12" style={{ alignItems: "center" }}>
                <div className="row gap10" style={{ alignItems: "center" }}>
                  <img className="jedi-answer-avatar" src={yodaMain} alt="" />
                  <strong className="jedi-answer-name">Jedi thinks</strong>
                </div>
                <div className="row gap8" style={{ alignItems: "center" }}>
                  <ConfRing value={chatThread.confidence} />
                  <div>
                    <div className="faint" style={{ fontSize: 11 }}>Confidence</div>
                    <div style={{ fontWeight: 700, color: "var(--green)" }}>High</div>
                  </div>
                </div>
              </div>

              <div className="cited-answer">
                {chatThread.answer.map((claim) => (
                  claim.sourceIds.length ? (
                    <span
                      key={claim.id}
                      id={claim.id}
                      className={"cited-claim" + ((pinnedClaimId || activeClaimId) === claim.id ? " active" : "") + (pinnedClaimId === claim.id ? " pinned" : "")}
                      tabIndex={0}
                      role="button"
                      aria-describedby={claim.sourceIds.map((id) => `source-${id}`).join(" ")}
                      onMouseEnter={() => activateClaim(claim.id)}
                      onMouseLeave={clearActiveClaim}
                      onFocus={() => activateClaim(claim.id)}
                      onBlur={clearActiveClaim}
                      onClick={() => togglePinnedClaim(claim.id)}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          togglePinnedClaim(claim.id);
                        }
                      }}
                    >
                      {claim.text}<sup className="citation-marker">[{citationNumbers[claim.id]}]</sup>
                    </span>
                  ) : <span key={claim.id}>{claim.text}</span>
                ))}
              </div>

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
              <button type="button" className="attach-btn" aria-label="Attach file">
                <IconAttach />
              </button>
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
        <div className="source-helper-note">Hover a sentence to see the evidence behind it.</div>

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
          {shown.map((src) => (
            <SourceCard
              key={src.id}
              src={src}
              isActive={activeSourceIds.includes(src.id)}
              isDimmed={!!activeClaim && !activeSourceIds.includes(src.id)}
              activePassages={activePassagesBySource[src.id] || []}
              onMouseEnter={() => {
                if (!activeClaim && src.details?.[0]?.claimIds?.[0]) activateClaim(src.details[0].claimIds[0]);
              }}
              onMouseLeave={clearActiveClaim}
              onPassageMouseEnter={activateClaim}
            />
          ))}
        </div>
      </aside>
      )}
    </>
  );
}
