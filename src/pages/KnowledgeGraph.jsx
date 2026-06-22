import { useState } from "react";
import { graphNodes } from "../data";

const typeColor = {
  center: "#007AFF",
  research: "#34C759",
  decision: "#AF52DE",
  audit: "#FF9500",
  sprint: "#AF52DE",
  release: "#34C759",
  outcome: "#FF9500",
};

const detail = {
  center: "The central project. All knowledge connects back here.",
  research: "Usability study with 24 participants. Drove the CTA decision.",
  decision: "Move CTA above the fold — selected over sticky & floating options.",
  audit: "WCAG AA review. Contrast and touch targets validated.",
  sprint: "Sprint 14 — beta validation cycle, completed yesterday.",
  release: "Beta release shipped to 12% of finance users.",
  outcome: "Visibility +41%, task completion +27%.",
};

export default function KnowledgeGraph() {
  const [selected, setSelected] = useState("center");
  const center = graphNodes[0];

  return (
    <div className="page">
      <div className="page-head">
        <h2>Knowledge Graph</h2>
        <p>Every node is connected — research, decisions, audits, and outcomes traced to one project.</p>
      </div>

      <div className="grid" style={{ gridTemplateColumns: "1fr 320px" }}>
        <div className="graph-canvas">
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox="0 0 100 100" preserveAspectRatio="none">
            <defs>
              <linearGradient id="gline" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#1e293b" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#1e293b" stopOpacity="0.25" />
              </linearGradient>
            </defs>
            {graphNodes.slice(1).map((n) => (
              <line key={n.id} x1={center.x} y1={center.y} x2={n.x} y2={n.y}
                stroke="url(#gline)" strokeWidth={selected === n.id ? 0.7 : 0.35}
                strokeDasharray="2 2"
                style={{ transition: "stroke-width 0.2s" }}>
                <animate attributeName="stroke-dashoffset" from="0" to="-8" dur="2s" repeatCount="indefinite" />
              </line>
            ))}
          </svg>

          {graphNodes.map((n) => {
            const c = typeColor[n.type];
            return (
              <div key={n.id}
                className={"gnode" + (n.type === "center" ? " center" : "")}
                style={{
                  left: `${n.x}%`, top: `${n.y}%`,
                  ...(selected === n.id && n.type !== "center" ? { borderColor: c, boxShadow: `0 0 24px ${c}66` } : {}),
                }}
                onClick={() => setSelected(n.id)}>
                {n.type !== "center" && <span className="gdot" style={{ background: c }} />}
                {n.label}
              </div>
            );
          })}
        </div>

        <div className="card" style={{ height: "fit-content" }}>
          <div className="section-title">Node Details</div>
          {(() => {
            const node = graphNodes.find((n) => n.id === selected);
            const c = typeColor[node.type];
            return (
              <>
                <div className="badge mb12" style={{ background: `${c}22`, color: c }}>
                  <span className="dot" style={{ background: c }} />{node.type}
                </div>
                <h3 style={{ fontSize: 18, fontWeight: 700 }}>{node.label}</h3>
                <p className="muted mt12" style={{ fontSize: 14 }}>{detail[node.type]}</p>
                <div className="faint mt20" style={{ fontSize: 12 }}>Connected to</div>
                <div className="row gap8 wrap mt8">
                  {graphNodes.filter((g) => g.id !== node.id).slice(0, 4).map((g) => (
                    <button key={g.id} className="tag" onClick={() => setSelected(g.id)}>{g.label}</button>
                  ))}
                </div>
              </>
            );
          })()}
        </div>
      </div>
    </div>
  );
}
