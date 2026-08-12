import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Legend, ResponsiveContainer, Tooltip } from "recharts";

const dataByQuarter = {
  "Q1 2026": [
    { department: "Finance", designDecisions: 28, researchInsights: 14, guidelines: 10, evidence: 30, documentation: 18 },
    { department: "Microscopy", designDecisions: 25, researchInsights: 12, guidelines: 8, evidence: 28, documentation: 27 },
    { department: "Photography", designDecisions: 24, researchInsights: 10, guidelines: 7, evidence: 26, documentation: 33 },
    { department: "Medical", designDecisions: 32, researchInsights: 15, guidelines: 12, evidence: 24, documentation: 17 },
  ],
  "Q2 2026": [
    { department: "Finance", designDecisions: 35, researchInsights: 10, guidelines: 8, evidence: 25, documentation: 22 },
    { department: "Microscopy", designDecisions: 33, researchInsights: 9, guidelines: 6, evidence: 24, documentation: 28 },
    { department: "Photography", designDecisions: 30, researchInsights: 8, guidelines: 5, evidence: 22, documentation: 35 },
    { department: "Medical", designDecisions: 38, researchInsights: 12, guidelines: 10, evidence: 20, documentation: 20 },
  ],
  "Q3 2026": [
    { department: "Finance", designDecisions: 40, researchInsights: 8, guidelines: 6, evidence: 22, documentation: 24 },
    { department: "Microscopy", designDecisions: 38, researchInsights: 7, guidelines: 5, evidence: 20, documentation: 30 },
    { department: "Photography", designDecisions: 36, researchInsights: 6, guidelines: 4, evidence: 18, documentation: 36 },
    { department: "Medical", designDecisions: 42, researchInsights: 10, guidelines: 8, evidence: 18, documentation: 22 },
  ],
};

const segments = [
  { key: "designDecisions", label: "Design decisions", color: "#007AFF" },
  { key: "researchInsights", label: "Research Insights", color: "#AF52DE" },
  { key: "guidelines", label: "Guidelines", color: "#FF9500" },
  { key: "evidence", label: "Evidence", color: "#34C759" },
  { key: "documentation", label: "Documentation", color: "#4C4AFA" },
];

function CustomLegend({ payload }) {
  const segMap = Object.fromEntries(segments.map((s) => [s.key, s.label]));
  const sorted = [...payload].sort((a, b) => segments.findIndex((s) => s.key === a.value) - segments.findIndex((s) => s.key === b.value));
  return (
    <div style={{ display: "flex", flexWrap: "wrap", gap: "14px 20px", marginBottom: 16 }}>
      {sorted.map((entry) => (
        <div key={entry.value} style={{ display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 10, height: 10, borderRadius: 3, background: entry.color, flex: "none" }} />
          <span style={{ fontSize: 12, fontWeight: 500, color: "var(--text-dim)" }}>{segMap[entry.value] || entry.value}</span>
        </div>
      ))}
    </div>
  );
}

function CustomTooltip({ active, payload, label, activeKey }) {
  if (!active || !payload || !activeKey) return null;
  const segMap = Object.fromEntries(segments.map((s) => [s.key, s.label]));
  const dataKey = activeKey.split("-")[1];
  const item = payload.find((p) => p.dataKey === dataKey);
  if (!item) return null;
  return (
    <div style={{
      background: "var(--glass)",
      backdropFilter: "blur(12px)",
      border: "1px solid var(--glass-border)",
      borderRadius: "var(--radius)",
      padding: "12px 16px",
      boxShadow: "var(--shadow)",
      fontSize: 13,
    }}>
      <div style={{ fontWeight: 600, marginBottom: 6, color: "var(--text)" }}>{label}</div>
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ width: 8, height: 8, borderRadius: 2, background: item.color, flex: "none" }} />
        <span style={{ color: "var(--text-dim)" }}>{segMap[item.dataKey] || item.name}:</span>
        <span style={{ fontWeight: 600 }}>{item.value}%</span>
      </div>
    </div>
  );
}

export default function KnowledgeStackedChart({ quarter = "Q2 2026" }) {
  const [activeId, setActiveId] = useState(null);
  const data = dataByQuarter[quarter] || dataByQuarter["Q2 2026"];

  return (
    <ResponsiveContainer width="100%" height={280}>
      <BarChart
        data={data}
        layout="vertical"
        margin={{ top: 0, right: 20, left: 0, bottom: 0 }}
        barSize={28}
        barGap={0}
        barCategoryGap="30%"
      >
        <XAxis type="number" domain={[0, 100]} tickFormatter={(v) => `${v}%`}
          axisLine={false} tickLine={false}
          tick={{ fontSize: 12, fill: "var(--text-faint)" }}
          ticks={[0, 25, 50, 75, 100]}
        />
        <YAxis
          type="category"
          dataKey="department"
          axisLine={false}
          tickLine={false}
          tick={{ fontSize: 13, fontWeight: 600, fill: "var(--text-dim)" }}
          width={90}
        />
        <Tooltip content={<CustomTooltip activeKey={activeId} />} cursor={{ fill: "rgba(255,255,255,0.04)" }} />
        {segments.map((seg) => (
          <Bar
            key={seg.key}
            dataKey={seg.key}
            stackId="knowledge"
            fill={seg.color}
            isAnimationActive={true}
            animationDuration={800}
            animationBegin={200}
            shape={(props) => {
              const { x, y, width, height, index } = props;
              const id = `${index}-${seg.key}`;
              return (
                <rect x={x} y={y} width={width} height={height}
                  fill={seg.color} rx={2} ry={2}
                  onMouseEnter={() => setActiveId(id)}
                  onMouseLeave={() => setActiveId(null)}
                  style={{ cursor: "pointer", transition: "opacity 0.15s ease" }}
                  opacity={activeId && activeId !== id ? 0.3 : 1}
                />
              );
            }}
          />
        ))}
        <Legend content={<CustomLegend />} verticalAlign="top" />
      </BarChart>
    </ResponsiveContainer>
  );
}
