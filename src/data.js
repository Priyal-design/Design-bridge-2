// ----- All fake data for Design Bridge V2 -----

import feemgt1 from "./images/Feemgt1.jpg";
import feemgt2 from "./images/Feemgt2.jpg";
import usabImg1 from "./images/Image1.png";
import usabImg2 from "./images/Image2.png";
import usabImg3 from "./images/Image3.png";
import photoAssetImg from "./images/Sameness in design UI.jpeg";
import microscopeImg from "./images/microscopy.png";

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
  Ongoing: "badge-blue",
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
    team: "Design system team",
    created: "10th May'26",
    createdISO: "2026-05-10",
    tags: ["Payments", "Workflow", "Internal Tools"],
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
    team: "Beyond team",
    created: "22nd Apr'26",
    createdISO: "2026-04-22",
    tags: ["Hardware", "Calibration", "Lab"],
    summary:
      "A configuration portal that lets lab technicians calibrate and save microscope presets across devices.",
  },
  {
    id: "photo-asset",
    name: "Photo Asset Management",
    department: "Photography",
    status: "In Development",
    owner: "Lena Ortiz",
    accessibility: 85,
    coverage: 78,
    sprint: 4,
    research: 8,
    decisions: 14,
    updated: "4 days ago",
    favorite: false,
    team: "Aurora team",
    created: "1st Jun'26",
    createdISO: "2026-06-01",
    tags: ["Assets", "Tagging", "Rights"],
    summary:
      "Centralizing photo assets with smart tagging, rights management and fast cross-team retrieval.",
  },
  {
    id: "patient-portal",
    name: "Patient Appointment Portal",
    department: "Medical",
    status: "Ongoing",
    owner: "Dr. Amara Osei",
    accessibility: 93,
    coverage: 96,
    sprint: 11,
    research: 18,
    decisions: 41,
    updated: "Today",
    favorite: true,
    team: "Aventurine team",
    created: "15th Mar'26",
    createdISO: "2026-03-15",
    tags: ["Booking", "Patients", "Reminders"],
    summary:
      "A patient-facing portal for booking, rescheduling and managing medical appointments with reminders.",
  },
  {
    id: "design-system",
    name: "Design System Components",
    department: "Finance",
    status: "Ongoing",
    owner: "Alex Kim",
    accessibility: 96,
    coverage: 98,
    sprint: 12,
    research: 10,
    decisions: 19,
    updated: "Today",
    favorite: false,
    team: "Design system team",
    created: "5th Apr'26",
    createdISO: "2026-04-05",
    tags: ["Components", "Tokens", "Documentation", "Accessibility"],
    summary:
      "Building and maintaining a unified component library with design tokens, accessibility standards, and usage guidelines.",
  },
];

// Contributors shown as avatar stacks on each Knowledge Hub card (initials, color, full name, role)
export const projectTeams = {
  "fee-management": [
    { ini: "SL", color: "#007AFF", name: "Sarah Lee", role: "Product Manager" },
    { ini: "AK", color: "#AF52DE", name: "Alex Kim", role: "UX Designer" },
    { ini: "KM", color: "#FF3B30", name: "Kai Morgan", role: "Researcher" },
  ],
  "microscope-config": [
    { ini: "MV", color: "#FF9500", name: "Marcus Vogel", role: "Lead Designer" },
    { ini: "DC", color: "#34C759", name: "David Chen", role: "Engineer" },
  ],
  "photo-asset": [
    { ini: "LO", color: "#AF52DE", name: "Lena Ortiz", role: "Product Designer" },
    { ini: "PS", color: "#e056c8", name: "Priyal Shah", role: "Product Designer" },
    { ini: "AK", color: "#007AFF", name: "Alex Kim", role: "UX Designer" },
  ],
  "patient-portal": [
    { ini: "AO", color: "#34C759", name: "Amara Osei", role: "Clinical Lead" },
    { ini: "GS", color: "#007AFF", name: "Grace Stone", role: "Researcher" },
  ],
  "design-system": [
    { ini: "AK", color: "#AF52DE", name: "Alex Kim", role: "Lead Designer" },
    { ini: "SL", color: "#007AFF", name: "Sarah Lee", role: "Product Manager" },
    { ini: "PS", color: "#e056c8", name: "Priyal Shah", role: "Design Engineer" },
    { ini: "LO", color: "#AF52DE", name: "Lena Ortiz", role: "Visual Designer" },
  ],
};

// Distinct tag + team option lists for the search filter
export const allTags = [...new Set(projects.flatMap((p) => p.tags || []))].sort();
export const allTeams = [...new Set(projects.map((p) => p.team).filter(Boolean))].sort();

export const allContributors = [
  ...new Set(
    Object.values(projectTeams).flatMap((team) => team.map((m) => m.name))
  ),
].sort();

export const emptyProjectFilter = {
  query: "",
  tags: [],
  team: "",
  status: "", // "" | "Ongoing" | "In Development" | "Released" | "Research"
  contributor: "",
  createdFrom: "",
  createdTo: "",
  sortBy: "name", // "name" | "created" | "team"
  sortDir: "asc", // "asc" | "desc"
};

export function isFilterActive(f) {
  return Boolean(
    f.query || f.tags.length || f.team || f.status || f.contributor ||
    f.createdFrom || f.createdTo ||
    f.sortBy !== "name" || f.sortDir !== "asc"
  );
}

// Shared filtering + sorting used by the Knowledge Hub grid and the global search
export function filterAndSortProjects(list, f) {
  const q = f.query.trim().toLowerCase();
  let out = list.filter((p) => {
    if (q) {
      const hay = (p.name + " " + p.summary + " " + (p.tags || []).join(" ")).toLowerCase();
      if (!hay.includes(q)) return false;
    }
    if (f.tags.length && !f.tags.every((t) => (p.tags || []).includes(t))) return false;
    if (f.team && p.team !== f.team) return false;
    if (f.status) {
      if (f.status === "Ongoing" && p.status !== "Ongoing" && p.status !== "In Development") return false;
      else if (p.status !== f.status) return false;
    }
    if (f.contributor) {
      const team = projectTeams[p.id] || [];
      const match = team.some((m) => m.name.toLowerCase().includes(f.contributor.toLowerCase()));
      if (!match) return false;
    }
    if (f.createdFrom && (p.createdISO || "") < f.createdFrom) return false;
    if (f.createdTo && (p.createdISO || "") > f.createdTo) return false;
    return true;
  });

  out = out.slice().sort((a, b) => {
    let cmp = 0;
    if (f.sortBy === "name") cmp = a.name.localeCompare(b.name);
    else if (f.sortBy === "created") cmp = (a.createdISO || "").localeCompare(b.createdISO || "");
    else if (f.sortBy === "team") cmp = (a.team || "").localeCompare(b.team || "");
    return f.sortDir === "asc" ? cmp : -cmp;
  });
  return out;
}

export const kpis = [
  { label: "Design Decisions", value: "1,482", trend: "+128 this month", glyph: "🧭", color: "#AF52DE" },
  { label: "Research Studies", value: "221", trend: "+19 this month", glyph: "🔬", color: "#FF9500" },
];

export const knowledgeGaps = [
  { label: "Projects missing rationale", value: 8, color: "#FF3B30" },
  { label: "Projects missing research", value: 4, color: "#FF9500" },
  { label: "Projects missing metrics", value: 6, color: "#FF9500" },
];

export const activity = [
  { who: "Sarah", action: "uploaded Study #12 Customer research", time: "2 hours ago", dept: "Microscopy", color: "#007AFF", icon: "🔬" },
  { who: "Alex", action: "approved comments on Homepage redesign #21", time: "5 hours ago", dept: "Medical", color: "#34C759", icon: "✓" },
  { who: "Design System", action: "Sprint 14 updated with new components", time: "Yesterday", dept: "Medical", color: "#AF52DE", icon: "🏁" },
  { who: "Priya", action: "added Heatmap Analysis to Fee Management", time: "Yesterday", dept: "Finance", color: "#AF52DE", icon: "📊" },
  { who: "David", action: "linked SAP Payment API spec", time: "2 days ago", dept: "Finance", color: "#FF9500", icon: "🔗" },
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
  { name: "Adrian", role: "Researcher", color: "#AF52DE" },
  { name: "Marcus", role: "Accessibility Specialist", color: "#FF9500" },
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

// Figma file previews shown in the Project Detail center column
export const figmaFiles = {
  "fee-management": [
    { name: "Fee mgt v1 design", status: "Rejected", badge: "badge-pink", image: feemgt1, url: "https://www.figma.com/design/dTBPmQEg0eqBIaVokBE24G/FEE-PHASE-1?node-id=88-4390&t=RcfrekGLYqs5zDIZ-1" },
    { name: "Fee mgt v2 design", status: "Final design", badge: "badge-green", image: feemgt2, url: "https://www.figma.com/design/dTBPmQEg0eqBIaVokBE24G/FEE-PHASE-1?node-id=129-10716&t=RcfrekGLYqs5zDIZ-1" },
  ],
  "photo-asset": [
    { name: "Photo Asset v1 design", status: "In Review", badge: "badge-yellow", image: photoAssetImg, url: "#" },
    { name: "Photo Asset v2 design", status: "Final design", badge: "badge-green", image: photoAssetImg, url: "#" },
  ],
  "microscope-config": [
    { name: "Microscope v1 design", status: "Released", badge: "badge-green", image: microscopeImg, url: "#" },
  ],
};

// Feedback Analysis study (donut) shown in the center column
export const feedbackAnalysis = {
  eyebrow: "Feedback Analysis",
  study: "#11 Study",
  title: "Customer feedback analysis - Q2",
  desc: "Feedback from customers and partners during April–June 2026 through these channels: in-app feedback, support, and sales calls. Most feedback came in from customer support and in-app feedback.",
  segments: [
    { label: "Customer Support", value: 13, color: "#0fb5a8" },
    { label: "In-app feedback", value: 9, color: "#34c759" },
    { label: "Sales", value: 2, color: "#007aff" },
  ],
  // Extra detail revealed by "Show more"
  period: "April – June 2026",
  sample: 24,
  insights: [
    "Most friction reported around fee breakdown clarity before checkout.",
    "Customers requested a single summary of all charges on one screen.",
    "Sales flagged enterprise clients wanting exportable fee statements.",
    "In-app feedback peaked after the v2 CTA placement change.",
  ],
  sentiment: [
    { label: "Positive", value: 58, color: "#34c759" },
    { label: "Neutral", value: 29, color: "#94a3b8" },
    { label: "Negative", value: 13, color: "#ff3b30" },
  ],
};

// Right-column cards for Project Detail
export const projectIssues = [
  { count: 1, label: "File missing metrics" },
  { count: 2, label: "Changes pending" },
  { count: 1, label: "Missing post testing updates" },
];

export const projectComments = [
  { who: "Adrian", text: "Move CTA above fold. Find a sim…", color: "#AF52DE" },
  { who: "Sarah", text: "Approved after testing.", color: "#007AFF" },
  { who: "Priya", text: "Users missed payment status.", color: "#AF52DE" },
];

export const usabilityVideos = [
  { caption: "Fee version 1 tested amongst 10 groups", author: "Adrian", duration: "00:34", image: usabImg1, tag: "Usability", tag2: "V1 Testing" },
  { caption: "First time users' checkout flow", author: "Sarah", duration: "01:12", image: usabImg2, tag: "Walkthrough", tag2: "First-time" },
  { caption: "Above-the-fold CTA placement A/B run", author: "Priya", duration: "00:48", image: usabImg3, tag: "A/B Test", tag2: "CTA Placement" },
];

export const chatThread = {
  question: "Why was the CTA moved above the fold?",
  confidence: 94,
  answer: [
    "Users failed to notice the CTA in the previous location. Heatmap analysis and usability testing demonstrated significantly higher visibility above the fold. I've found several relevant sources related to your question. The information is verified against our design documentation, research findings, and decision logs.",
    "Our team has documented this extensively, and I've pulled together insights from 5 different sources including design files, research studies, and decision logs.",
    "Would you like me to explain any specific aspect in more detail?",
  ],
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

// Tabs for the "Response Sources" rail next to a Design Bridge answer.
// Counts are derived from responseSources; order is fixed to match the design.
export const sourceTabs = ["All", "Figma", "Research", "Decisions", "Docs"];

// Each source belongs to one tab category and renders one of a few card kinds.
export const responseSources = [
  {
    id: "fee-mgt-v2",
    category: "Figma",
    kind: "figma",
    eyebrow: "Figma File",
    title: "Fee Mgt V2 Design",
    badge: "Final design",
    image: feemgt2,
    details: [
      "8 frames covering the full checkout and fee-summary flow.",
      "CTA moved above the fold in frame 3 after Study #11.",
      "Last edited 2 days ago by Alex Kim.",
    ],
  },
  {
    id: "study-4",
    category: "Research",
    kind: "video",
    eyebrow: "Usability Testing",
    duration: "00:34",
    caption: "Fee version 1 tested amongst 10 groups",
    author: "Adrian",
    image: usabImg1,
    tag: "Usability",
    tag2: "V1 Testing",
    details: [
      "10 moderated sessions, 5–7 min each.",
      "7 of 10 users missed the CTA in the original layout.",
      "Average task completion improved from 62% to 89% in v2.",
    ],
  },
  {
    id: "study-11",
    category: "Research",
    kind: "chart",
    eyebrow: "Feedback Analysis",
    title: "Customer feedback analysis - Q2",
    desc: "Analysis of incoming feedback from customers and partners during April–June 2026 across in-app feedback, support, and sales calls. Most feedback came in from customer support and in-app feedback.",
    segments: [
      { label: "In-app feedback", value: 9, color: "#34c759" },
      { label: "Customer Support", value: 13, color: "#0fb5a8" },
      { label: "Sales", value: 2, color: "#007aff" },
    ],
    details: [
      "24 total responses analysed across three channels.",
      "Fee-breakdown clarity was the most common request.",
      "Sentiment: 58% positive, 29% neutral, 13% negative.",
    ],
  },
];

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
  { key: "decision", label: "Design Decision", icon: "🧭", desc: "Design choices with rationale ('know-why')." },
  { key: "research", label: "Research Insight", icon: "🔬", desc: "Findings from research, tests, or analytics." },
  { key: "guideline", label: "Guideline", icon: "📐", desc: "Reusable principles, patterns, or standards." },
  { key: "evidence", label: "Evidence", icon: "📊", desc: "Data, metrics, or validation results supporting decisions." },
  { key: "documentation", label: "Project Documentation", icon: "📄", desc: "Raw artefacts like notes, workshops, or specs." },
  { key: "private", label: "Private Notes", icon: "🔒", desc: "Personal thoughts or early ideas not ready to share." },
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

// Per-project onboarding workspaces — the tree on the right selects one of these,
// and the responsibilities table + active-project workspace update to match.
export const onboardingWorkspaces = [
  {
    id: "fee-management",
    name: "Fee Management",
    children: ["Checkout flow", "Fee schedule", "Refund policy"],
    manager: { name: "John Chen", role: "Design Manager / PM" },
    responsibilities: [
      { area: "Contracting", owner: "Sarah Lee", cat: "Finance Owner", color: "#007AFF" },
      { area: "Design", owner: "Alex Kim", cat: "UX Owner", color: "#AF52DE" },
      { area: "Engineering", owner: "David Chen", cat: "Eng. Owner", color: "#FF9500" },
      { area: "Manager", owner: "John Chen", cat: "PM Owner", color: "#34C759" },
    ],
    deadlines: [
      { t: "Validate Prototype", due: "Nov 6", badge: "badge-blue", state: "Queued" },
      { t: "Finalize Design Costs", due: "Nov 7", badge: "badge-pink", state: "Blocked" },
    ],
    tasks: [
      { t: "Validate UI Prototype", badge: "badge-blue", state: "In Review" },
      { t: "Publish Fee Schedule", badge: "badge-green", state: "Done" },
    ],
    quickActions: ["Propose Fee Agreement", "Review PM Actions", "Configure Workflow"],
    updates: [
      { who: "David Chen", text: "updated the doc-fee scope timeline", time: "2h" },
      { who: "Sarah Lee", text: "approved the refund policy decision", time: "5h" },
      { who: "Alex Kim", text: "added 3 prototypes to Checkout flow", time: "1d" },
    ],
  },
  {
    id: "patient-portal",
    name: "Patient Portal Workspace",
    children: ["Booking calendar", "Reminders", "Visit history"],
    manager: { name: "Dr. Amara Osei", role: "Clinical Product Manager" },
    responsibilities: [
      { area: "Scheduling", owner: "Grace Stone", cat: "Care Owner", color: "#007AFF" },
      { area: "Design", owner: "Lena Ortiz", cat: "UX Owner", color: "#AF52DE" },
      { area: "Engineering", owner: "David Chen", cat: "Eng. Owner", color: "#FF9500" },
      { area: "Manager", owner: "Dr. Amara Osei", cat: "PM Owner", color: "#34C759" },
    ],
    deadlines: [
      { t: "Reminder Flow QA", due: "Nov 9", badge: "badge-yellow", state: "In progress" },
      { t: "Booking Launch", due: "Nov 14", badge: "badge-blue", state: "Queued" },
    ],
    tasks: [
      { t: "Draft Reminder Copy", badge: "badge-yellow", state: "In progress" },
      { t: "Accessibility Audit", badge: "badge-green", state: "Done" },
    ],
    quickActions: ["Request Clinical Sign-off", "Review PM Actions", "Schedule User Test"],
    updates: [
      { who: "Grace Stone", text: "logged 4 new booking-flow findings", time: "3h" },
      { who: "Dr. Amara Osei", text: "approved the reminder cadence", time: "6h" },
      { who: "Lena Ortiz", text: "shared the visit-history wireframes", time: "2d" },
    ],
  },
  {
    id: "microscope-config",
    name: "Microscopy Dashboard Redesign",
    children: ["Presets", "Calibration", "Device sync"],
    manager: { name: "Marcus Vogel", role: "Lead Product Manager" },
    responsibilities: [
      { area: "Calibration", owner: "Marcus Vogel", cat: "Lab Owner", color: "#007AFF" },
      { area: "Design", owner: "Priyal Shah", cat: "UX Owner", color: "#AF52DE" },
      { area: "Engineering", owner: "David Chen", cat: "Eng. Owner", color: "#FF9500" },
      { area: "Manager", owner: "Marcus Vogel", cat: "PM Owner", color: "#34C759" },
    ],
    deadlines: [
      { t: "Preset Schema Review", due: "Nov 4", badge: "badge-yellow", state: "In progress" },
      { t: "Calibration Test Run", due: "Nov 10", badge: "badge-blue", state: "Queued" },
    ],
    tasks: [
      { t: "Validate Calibration UI", badge: "badge-yellow", state: "In progress" },
      { t: "Document Device Presets", badge: "badge-green", state: "Done" },
    ],
    quickActions: ["Propose Preset Standard", "Review PM Actions", "Sync Lab Devices"],
    updates: [
      { who: "Marcus Vogel", text: "updated the calibration tolerance spec", time: "1h" },
      { who: "Priyal Shah", text: "added preset manager mockups", time: "4h" },
      { who: "David Chen", text: "linked the device-sync API doc", time: "1d" },
    ],
  },
];

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
