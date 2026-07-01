import { Link } from "react-router-dom";
import { features, teamTags } from "../data";
import { IconSparkle, IconPlay, IconArrow } from "../components/Icons";
import Wordmark from "../components/Wordmark";

const netNodes = [
  { label: "Research", x: 50, y: 10, c: "#007AFF", d: 0 },
  { label: "Design", x: 84, y: 35, c: "#AF52DE", d: 1 },
  { label: "Decision", x: 70, y: 72, c: "#FF9500", d: 2 },
  { label: "Evidence", x: 28, y: 72, c: "#AF52DE", d: 1.5 },
  { label: "Outcome", x: 14, y: 35, c: "#34C759", d: 0.5 },
];
const links = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 0], [0, 2], [1, 3]];

export default function Landing() {
  return (
    <div className="landing">
      <div className="landing-bg" />
      <div className="landing-inner">
        <nav className="land-nav">
          <div className="brand" style={{ padding: 0 }}>
            <Wordmark size={32} style={{ marginTop: 6 }} />
          </div>
          <div className="links">
            <a href="#features">Features</a>
            <a href="#teams">Teams</a>
            <Link to="/figma">Figma Plugin</Link>
            <Link to="/dashboard" className="btn btn-ghost btn-sm">Open App</Link>
          </div>
        </nav>

        {/* Hero */}
        <section className="hero-wrap">
          <div>
            <span className="hero-eyebrow">
              <span style={{ width: 14, height: 14 }}><IconSparkle /></span>
              The future of design knowledge is here
            </span>
            <h1 className="hero-h1">
              Never lose<br /><span className="grad">design knowledge</span><br />again.
            </h1>
            <p className="hero-sub">
              Capture decisions, research, metrics, and rationale directly from your
              design workflow — searchable, traceable, and always in context.
            </p>
            <div className="hero-cta">
              <Link to="/dashboard" className="btn btn-primary">
                Let's start <span style={{ width: 16, height: 16 }}><IconArrow /></span>
              </Link>
              <button className="btn btn-ghost">
                <span style={{ width: 16, height: 16 }}><IconPlay /></span> Watch Walkthrough
              </button>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><div className="l">Decisions captured</div></div>
              <div className="hero-stat"><div className="l">Research studies</div></div>
              <div className="hero-stat"><div className="l">Knowledge coverage</div></div>
            </div>
          </div>

          {/* Animated floating network */}
          <div className="network">
            <svg className="net-svg" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <linearGradient id="netgrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#007AFF" />
                  <stop offset="100%" stopColor="#AF52DE" />
                </linearGradient>
              </defs>
              {links.map(([a, b], i) => (
                <line key={i} className="net-line"
                  x1={netNodes[a].x} y1={netNodes[a].y}
                  x2={netNodes[b].x} y2={netNodes[b].y} />
              ))}
              {netNodes.map((n, i) => (
                <circle key={i} className="net-pulse" cx={n.x} cy={n.y} r="3" fill={n.c}
                  style={{ animationDelay: `${i * 0.4}s` }} />
              ))}
            </svg>
            {netNodes.map((n, i) => (
              <div key={i} className="net-node"
                style={{ left: `${n.x}%`, top: `${n.y}%`, animationDelay: `${n.d}s` }}>
                <span className="ic" style={{ background: n.c }} />
                {n.label}
              </div>
            ))}
          </div>
        </section>

        {/* Features */}
        <section className="land-section" id="features">
          <h2>Every decision has a trail.</h2>
          <p className="sub">Five core capabilities that turn scattered design knowledge into a living, searchable system.</p>
          <div className="feature-grid">
            {features.map((f) => (
              <div key={f.title} className="feature-card">
                <div className="feature-ic" style={{ background: `${f.color}22`, color: f.color }}>{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Teams */}
        <section className="land-section" id="teams">
          <h2>Trusted across teams</h2>
          <p className="sub">Capture decisions, research, metrics, and rationale directly from your design workflow — searchable, traceable, and always in context.</p>
          <div className="logos">
            {teamTags.map((l) => (
              <div key={l} className="logo-chip"><span className="lm" />{l}</div>
            ))}
          </div>
        </section>

        <section className="land-section" style={{ textAlign: "center", paddingBottom: 80 }}>
          <div className="glass-strong" style={{ padding: "56px 50px", borderRadius: "var(--radius-lg)" }}>
            <h2 style={{ marginBottom: 10 }}>Ready to preserve your design rationale?</h2>
            <p className="sub" style={{ marginBottom: 28 }}>Design intelligence for teams — no signup required.</p>
            <Link to="/dashboard" className="btn btn-primary" style={{ margin: "0 auto" }}>
              Try Design Bridge <span style={{ width: 16, height: 16 }}><IconArrow /></span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
