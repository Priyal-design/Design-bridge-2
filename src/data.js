// ----- All fake data for Design Bridge V2 -----

export const company = "Jedi";

export const departmentColors = {
  Finance: "#007AFF",
  Microscopy: "#FF9500",
  Photography: "#AF52DE",
  Medical: "#34C759",
};

export const statusBadge = {
  "In Development": "badge-yellow",
  Released: "badge-green",
  Research: "badge-violet",
  Active: "badge-blue",
};

export const projects = [
  {
    id: "fee-management",
    name: "Fee Management System",
    department: "Finance",
    status: "In Development",
    owner: "Sarah Lee",
    accessibility: 92,
    coverage: 94,
    sprint: 14,
    research: 12,
    decisions: 27,
    updated: "2 days ago",
    favorite: true,
    summary:
      "Redesigning the internal fee management workflow to reduce processing errors and improve transparency.",
  },
  {
    id: "microscope-config",
    name: "Microscope Configuration Portal",
    department: "Microscopy",
    status: "Released",
    owner: "Marcus Vogel",
    accessibility: 89,
    coverage: 91,
    sprint: 9,
    research: 15,
    decisions: 33,
    updated: "Yesterday",
    favorite: true,
    summary:
      "A configuration portal that lets lab technicians calibrate and save microscope presets across devices.",
  },
  {
    id: "photo-asset",
    name: "Photo Asset Management",
    department: "Photography",
    status: "Research",
    owner: "Lena Ortiz",
    accessibility: 85,
    coverage: 78,
    sprint: 4,
    research: 8,
    decisions: 14,
    updated: "4 days ago",
    favorite: false,
    summary:
      "Centralizing photo assets with smart tagging, rights management and fast cross-team retrieval.",
  },
  {
    id: "patient-portal",
    name: "Patient Appointment Portal",
    department: "Medical",
    status: "Active",
    owner: "Dr. Amara Osei",
    accessibility: 93,
    coverage: 96,
    sprint: 11,
    research: 18,
    decisions: 41,
    updated: "Today",
    favorite: true,
    summary:
      "A patient-facing portal for booking, rescheduling and managing medical appointments with reminders.",
  },
];

export const kpis = [
  { label: "Projects", value: "42", trend: "+3 this month", glyph: "📁", color: "#007AFF" },
  { label: "Design Decisions", value: "1,482", trend: "+128 this month", glyph: "🧭", color: "#AF52DE" },
  { label: "Research Studies", value: "221", trend: "+19 this month", glyph: "🔬", color: "#FF9500" },
  { label: "Knowledge Coverage", value: "92%", trend: "+4% this quarter", glyph: "🧠", color: "#34C759" },
  { label: "Accessibility Avg", value: "89%", trend: "+6% this quarter", glyph: "♿", color: "#FF9500" },
];

export const knowledgeGaps = [
  { label: "Projects missing rationale", value: 8, color: "#FF3B30" },
  { label: "Projects missing research", value: 4, color: "#FF9500" },
  { label: "Projects missing metrics", value: 6, color: "#FF9500" },
];

export const activity = [
  { who: "Sarah", action: "uploaded Study #12", time: "2 hours ago", color: "#007AFF", icon: "🔬" },
  { who: "Alex", action: "approved Decision #21", time: "5 hours ago", color: "#34C759", icon: "✓" },
  { who: "System", action: "Sprint 14 completed", time: "Yesterday", color: "#AF52DE", icon: "🏁" },
  { who: "Priya", action: "added Heatmap Analysis to Fee Management", time: "Yesterday", color: "#AF52DE", icon: "📊" },
  { who: "David", action: "linked SAP Payment API spec", time: "2 days ago", color: "#FF9500", icon: "🔗" },
];

export const coverageChart = [
  { dept: "Finance", value: 94 },
  { dept: "Microscopy", value: 91 },
  { dept: "Photography", value: 78 },
  { dept: "Medical", value: 96 },
];

export const contributors = [
  { name: "Sarah Lee", role: "PM", color: "#007AFF" },
  { name: "Alex Kim", role: "UX Designer", color: "#AF52DE" },
  { name: "Priya Sharma", role: "Researcher", color: "#AF52DE" },
  { name: "David Chen", role: "Engineer", color: "#FF9500" },
];

export const projectMetrics = [
  { label: "Task Success", from: "62%", to: "89%" },
  { label: "Accessibility", from: "71", to: "92" },
  { label: "Completion Time", from: "4m 21s", to: "2m 11s" },
  { label: "Error Rate", from: "12%", to: "4%", inverse: true },
];

export const timeline = ["Research", "Design", "Validation", "Launch", "Optimization"];
export const timelineActive = 2;

export const achievements = [
  "Reduced payment errors by 42%.",
  "Reduced support tickets by 36%.",
  "Improved satisfaction score from 3.1 to 4.6.",
];

export const futureTasks = [
  "Finalize beta rollout.",
  "Improve mobile accessibility.",
  "Integrate SAP payment API.",
];

export const figmaComments = [
  { who: "Alex", text: "Move CTA above fold.", color: "#AF52DE" },
  { who: "Sarah", text: "Approved after testing.", color: "#007AFF" },
  { who: "Priya", text: "Users missed payment status.", color: "#AF52DE" },
];

export const jira = {
  epic: "Fee Management Redesign",
  sprint: 14,
  tasks: [
    { label: "Research", state: "done" },
    { label: "Wireframes", state: "done" },
    { label: "Accessibility Review", state: "done" },
    { label: "Validation", state: "progress" },
    { label: "Rollout", state: "todo" },
  ],
};

export const chatThread = {
  question: "Why was the CTA moved above the fold?",
  confidence: 94,
  answer:
    "Users failed to notice the CTA in the previous location. Heatmap analysis and usability testing demonstrated significantly higher visibility above the fold.",
  evidence: [
    { title: "Research Study #11", type: "Study", icon: "🔬" },
    { title: "Heatmap Analysis", type: "Analysis", icon: "📊" },
    { title: "Accessibility Audit", type: "Audit", icon: "♿" },
    { title: "Design Review", type: "Review", icon: "🎨" },
  ],
  metrics: [
    { label: "Visibility", from: "38%", to: "79%" },
    { label: "Task Success", from: "62%", to: "89%" },
  ],
  related: [
    "Why wasn't a sticky CTA used?",
    "What alternatives were tested?",
    "Who approved this?",
  ],
};

export const decision = {
  id: 21,
  title: "Move CTA Above Fold",
  problem: "Users overlooked payment action.",
  evidence: ["Heatmaps", "Research Study #11", "Accessibility Review"],
  alternatives: [
    { name: "Sticky CTA", verdict: "Rejected", reason: "Too intrusive.", selected: false },
    { name: "Floating CTA", verdict: "Rejected", reason: "Accessibility concerns.", selected: false },
    { name: "Above Fold CTA", verdict: "Selected", reason: "Highest success rate.", selected: true },
  ],
  outcome: ["Visibility increased 41%.", "Task completion improved 27%."],
};

export const graphNodes = [
  { id: "center", label: "Fee Management", type: "center", x: 50, y: 50 },
  { id: "study", label: "Research Study #11", type: "research", x: 50, y: 12 },
  { id: "decision", label: "Decision #21", type: "decision", x: 84, y: 32 },
  { id: "audit", label: "Accessibility Audit", type: "audit", x: 86, y: 72 },
  { id: "sprint", label: "Sprint 14", type: "sprint", x: 50, y: 90 },
  { id: "beta", label: "Beta Release", type: "release", x: 16, y: 72 },
  { id: "outcome", label: "Outcome Metrics", type: "outcome", x: 14, y: 32 },
];

export const knowledgeTypes = [
  { key: "decision", label: "Decision", icon: "🧭", desc: "A design choice with rationale" },
  { key: "research", label: "Research", icon: "🔬", desc: "A study, test, or interview" },
  { key: "feedback", label: "Feedback", icon: "💬", desc: "User or stakeholder input" },
  { key: "metric", label: "Metric", icon: "📈", desc: "A measured outcome" },
  { key: "guideline", label: "Guideline", icon: "📐", desc: "A reusable design standard" },
  { key: "meeting", label: "Meeting Notes", icon: "📝", desc: "Summary of a discussion" },
];

export const onboarding = {
  name: "Priyal",
  sprint: 14,
  goal: "Beta Validation",
  relevantProjects: ["Fee Management", "Patient Portal", "Microscopy Dashboard"],
  relationshipGraph: ["Fee Management", "SAP Payments", "Finance Dashboard", "Billing Analytics"],
  owners: [
    { name: "Sarah Lee", area: "Finance", color: "#007AFF" },
    { name: "Alex Kim", area: "UX", color: "#AF52DE" },
    { name: "David Chen", area: "Engineering", color: "#FF9500" },
  ],
  reading: ["Research Study #11", "Decision #21", "Accessibility Audit", "Sprint Retrospective"],
  summary: [
    "The Fee Management project aims to reduce processing errors and improve transparency.",
    "The redesign improved task completion from 62% to 89%.",
    "The most important decision was moving the primary payment CTA above the fold.",
    "The team is currently validating the beta release.",
  ],
};

export const features = [
  { title: "Design Memory", desc: "Preserve the rationale behind every design decision.", icon: "🧠", color: "#007AFF" },
  { title: "AI with context", desc: "Ask your projects anything and get sourced answers.", icon: "🔎", color: "#AF52DE" },
  { title: "Figma Plugin", desc: "Capture knowledge without leaving Figma.", icon: "🎨", color: "#FF9500" },
  { title: "Onboard-Day Assistant", desc: "Understand any project instantly on day one.", icon: "🚀", color: "#34C759" },
  { title: "Evidence Linking", desc: "Every answer traces back to its source.", icon: "🔗", color: "#AF52DE" },
];

export const teamTags = ["Product Management", "Marketing", "Engineering", "Design"];
export const customerLogos = ["Jedi Finance", "Jedi Medical", "Jedi Microscopy", "Jedi Photography"];

export const guidelines = {
  title: "Jedi Design Guidelines",
  rules: [
    "Primary CTA visible without scrolling.",
    "One dominant CTA per page.",
    "Minimum touch target 44px.",
    "WCAG AA contrast.",
    "Action-oriented labels.",
  ],
  based: ["Nielsen Norman Group", "Internal Accessibility Standards", "Design System v3.2"],
  confidence: 98,
};
