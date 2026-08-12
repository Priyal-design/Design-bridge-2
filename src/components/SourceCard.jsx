import { useEffect, useState } from "react";
import { contributors } from "../data";
import { IconPlay } from "./Icons";

function Donut({ segments }) {
  const total = segments.reduce((s, x) => s + x.value, 0) || 1;
  const r = 38, c = 2 * Math.PI * r;
  let acc = 0;
  return (
    <svg width="120" height="120" viewBox="0 0 100 100" style={{ transform: "rotate(-90deg)" }}>
      <circle cx="50" cy="50" r={r} fill="none" stroke="var(--panel-3)" strokeWidth="12" />
      {segments.map((seg) => {
        const len = (seg.value / total) * c;
        const dash = `${len} ${c - len}`;
        const off = -acc;
        acc += len;
        return (
          <circle key={seg.label} cx="50" cy="50" r={r} fill="none"
            stroke={seg.color} strokeWidth="12"
            strokeDasharray={dash} strokeDashoffset={off} />
        );
      })}
    </svg>
  );
}

export default function SourceCard({ src, isActive = false, isDimmed = false, activePassages = [], onMouseEnter, onMouseLeave, onPassageMouseEnter }) {
  const [open, setOpen] = useState(false);
  const activePassageTexts = activePassages.map((p) => typeof p === "string" ? p : p.text);

  useEffect(() => {
    if (isActive) setOpen(true);
  }, [isActive]);

  return (
    <div
      className={"src-card" + (isActive ? " src-card--active" : "") + (isDimmed ? " src-card--dimmed" : "")}
      id={`source-${src.id}`}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
    >
      <div className="src-eyebrow">{src.eyebrow}</div>

      {src.kind === "figma" && (
        <>
          <div className="row between" style={{ alignItems: "center", marginTop: 6 }}>
            <strong style={{ fontSize: 16 }}>{src.title}</strong>
            <span className="badge badge-green">{src.badge}</span>
          </div>
          {src.image
            ? <img src={src.image} alt={src.title} className="src-thumb src-thumb-img" />
            : (
              <div className="src-thumb src-thumb-figma">
                {[...Array(8)].map((_, i) => <span key={i} className="frame-chip" />)}
              </div>
            )}
        </>
      )}

      {src.kind === "video" && (
        <>
          <div className="usab-video" style={{ background: `url(${src.image}) center/cover no-repeat`, borderRadius: "var(--radius)", overflow: "hidden", position: "relative", marginTop: 10 }}>
            <span className="usab-play"><span style={{ width: 16, height: 16 }}><IconPlay /></span></span>
            <span className="usab-dur">{src.duration}</span>
          </div>
          <div className="src-caption" style={{ fontSize: 13, fontWeight: 600, marginTop: 10 }}>{src.caption}</div>
          <div className="row between" style={{ marginTop: 8, alignItems: "center" }}>
            <div className="row" style={{ gap: 4 }}>
              <span className="tag" style={{ fontSize: 11, padding: "3px 9px" }}>{src.tag}</span>
              <span className="tag" style={{ fontSize: 11, padding: "3px 9px" }}>{src.tag2}</span>
            </div>
            <span className="stack-av" style={{ background: (contributors.find(c => c.name.startsWith(src.author)) || {}).color || "#888", width: 26, height: 26, fontSize: 10, marginLeft: 0 }}>
              {(contributors.find(c => c.name.startsWith(src.author)) || {}).ini || src.author[0]}
              <span className="av-tip">{src.author}</span>
            </span>
          </div>
        </>
      )}

      {src.kind === "chart" && (
        <>
          <div style={{ display: "grid", placeItems: "center", padding: "8px 0 4px" }}>
            <Donut segments={src.segments} />
          </div>
          <strong style={{ fontSize: 15 }}>{src.title}</strong>
          <p className="faint" style={{ fontSize: 12.5, lineHeight: 1.55, marginTop: 6 }}>{src.desc}</p>
        </>
      )}

      {open && src.details && (
        <div className="src-details">
          {src.details.map((d) => (
            <div
              key={d.id || d}
              className={"list-item source-passage" + (activePassageTexts.includes(d.text || d) ? " source-passage--active" : "")}
              id={d.id ? `passage-${d.id}` : undefined}
              onMouseEnter={() => d.claimIds?.[0] && onPassageMouseEnter?.(d.claimIds[0])}
              onFocus={() => d.claimIds?.[0] && onPassageMouseEnter?.(d.claimIds[0])}
              tabIndex={d.claimIds?.length ? 0 : undefined}
            >
              <span className="list-bullet" style={{ background: "var(--accent)" }} />
              <span style={{ fontSize: 12.5 }}>{d.text || d}</span>
            </div>
          ))}
        </div>
      )}

      <button className="src-more" onClick={(e) => { e.stopPropagation(); setOpen((o) => !o); }}>
        {open ? "Show less" : "Show more"}
      </button>
    </div>
  );
}
