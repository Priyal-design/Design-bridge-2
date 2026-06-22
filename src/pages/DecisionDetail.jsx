import { Link } from "react-router-dom";
import { decision } from "../data";
import { IconCheck, IconClose } from "../components/Icons";

export default function DecisionDetail() {
  return (
    <div className="page" style={{ maxWidth: 980 }}>
      <Link to="/chat" className="faint" style={{ fontSize: 13 }}>← Back to conversation</Link>

      <div className="page-head mt12">
        <div className="badge badge-violet mb12">Decision #{decision.id}</div>
        <h2>{decision.title}</h2>
      </div>

      <div className="grid mb24" style={{ gridTemplateColumns: "1fr 1fr" }}>
        <div className="card">
          <div className="section-title">Problem</div>
          <p style={{ fontSize: 15.5 }}>{decision.problem}</p>
        </div>
        <div className="card">
          <div className="section-title">Evidence</div>
          <div className="row gap8 wrap">
            {decision.evidence.map((e) => (
              <span key={e} className="badge badge-blue">{e}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="section-title">Alternatives Considered</div>
      <div className="grid mb24" style={{ gridTemplateColumns: "repeat(3, 1fr)" }}>
        {decision.alternatives.map((a) => (
          <div key={a.name} className={"alt-card" + (a.selected ? " selected" : "")}>
            <div className="row between mb12" style={{ alignItems: "center" }}>
              <strong style={{ fontSize: 15.5 }}>{a.name}</strong>
              <span className={"badge " + (a.selected ? "badge-green" : "badge-gray")}>
                <span style={{ width: 13, height: 13 }}>{a.selected ? <IconCheck /> : <IconClose />}</span>
                {a.verdict}
              </span>
            </div>
            <p className="muted" style={{ fontSize: 14 }}>{a.reason}</p>
          </div>
        ))}
      </div>

      <div className="card" style={{ background: "linear-gradient(135deg, rgba(52,211,153,0.08), var(--bg-2))", borderColor: "rgba(52,211,153,0.25)" }}>
        <div className="section-title" style={{ color: "var(--green)" }}>Outcome</div>
        <div className="grid" style={{ gridTemplateColumns: "1fr 1fr" }}>
          {decision.outcome.map((o) => (
            <div key={o} className="row gap10" style={{ alignItems: "center" }}>
              <span style={{ width: 22, height: 22, color: "var(--green)" }}><IconCheck /></span>
              <span style={{ fontSize: 15 }}>{o}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
