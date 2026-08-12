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
    guideline: 8,
    evidence: 15,
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
    guideline: 12,
    evidence: 21,
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
    guideline: 5,
    evidence: 9,
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
    guideline: 14,
    evidence: 27,
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
    guideline: 18,
    evidence: 13,
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
  { who: "Sarah", action: "uploaded Study #12 Customer research", time: "2 hours ago", dept: "Microscopy", color: "#007AFF", icon: "research" },
  { who: "Alex", action: "approved comments on Homepage redesign #21", time: "5 hours ago", dept: "Medical", color: "#34C759", icon: "check" },
  { who: "Design System", action: "Sprint 14 updated with new components", time: "Yesterday", dept: "Medical", color: "#AF52DE", icon: "sprint" },
  { who: "Priya", action: "added Heatmap Analysis to Fee Management", time: "Yesterday", dept: "Finance", color: "#AF52DE", icon: "chart" },
  { who: "David", action: "linked SAP Payment API spec", time: "2 days ago", dept: "Finance", color: "#FF9500", icon: "link" },
];

export const coverageChart = [
  { dept: "Finance", value: 94 },
  { dept: "Microscopy", value: 91 },
  { dept: "Photography", value: 78 },
  { dept: "Medical", value: 96 },
];

export const contributors = [
  { ini: "SL", name: "Sarah Lee", role: "PM", color: "#007AFF" },
  { ini: "AK", name: "Alex Kim", role: "UX Designer", color: "#AF52DE" },
  { ini: "PS", name: "Priya Sharma", role: "Researcher", color: "#AF52DE" },
  { ini: "DC", name: "David Chen", role: "Engineer", color: "#FF9500" },
  { ini: "AD", name: "Adrian", role: "Researcher", color: "#AF52DE" },
  { ini: "MV", name: "Marcus", role: "Accessibility Specialist", color: "#FF9500" },
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
  { who: "Kai Morgan", text: "Move CTA above fold. Find a sim…", color: "#FF3B30" },
  { who: "Sarah Lee", text: "Approved after testing.", color: "#007AFF" },
  { who: "Alex Kim", text: "Users missed payment status.", color: "#AF52DE" },
];

export const usabilityVideos = [
  { caption: "Fee version 1 tested amongst 10 groups", author: "Kai Morgan", duration: "00:34", image: usabImg1, tag: "Usability", tag2: "V1 Testing" },
  { caption: "First time users' checkout flow", author: "Sarah Lee", duration: "01:12", image: usabImg2, tag: "Walkthrough", tag2: "First-time" },
  { caption: "Above-the-fold CTA placement A/B run", author: "Alex Kim", duration: "00:48", image: usabImg3, tag: "A/B Test", tag2: "CTA Placement" },
];

export const knowledgeStories = [
  {
    id: "primary-cta-visibility",
    projectId: "fee-management",
    chapterNumber: 1,
    title: "Making the primary CTA visible",
    summary: "Users were missing the payment action, leading the team to explore stronger placement and validate a new above-the-fold CTA.",
    brief: "Research showed users missed the primary payment action when it appeared below the first viewport. The team explored placement alternatives, moved the CTA above the fold, and validated the change with improved task success, fewer errors, and faster completion.",
    chain: ["Research", "Design exploration", "Decision", "Validation", "Reusable learning"],
    preview: [
      { type: "research", label: "Research", text: "7 of 10 participants missed the CTA" },
      { type: "decision", label: "Decision", text: "Move CTA above the fold" },
      { type: "evidence", label: "Evidence", text: "Task success improved from 62% to 89%" },
      { type: "guideline", label: "Guideline", text: "Keep critical actions visible in essential flows" },
    ],
    research: {
      finding: "7 of 10 participants missed the CTA without scrolling.",
      context: "Moderated checkout usability testing for the redesigned fee workflow.",
      sample: "10 finance operators",
      spreadsheet: {
        title: "Checkout_Usability_Test.xlsx",
        columns: ["Participant", "Found CTA", "Time", "Issue"],
        rows: [["P01", "No", "42s", "Scrolled"], ["P02", "Yes", "18s", "-"], ["P03", "No", "51s", "Missed CTA"], ["P04", "No", "46s", "Missed CTA"]],
      },
      video: { title: "Participant struggles to find payment action", meta: "Usability Test · Participant 04 · 00:42", image: usabImg3, duration: "00:42" },
    },
    exploration: {
      v1: { label: "V1 — CTA below the fold", image: feemgt1, status: "Rejected", url: "https://www.figma.com/design/dTBPmQEg0eqBIaVokBE24G/FEE-PHASE-1?node-id=88-4390&t=RcfrekGLYqs5zDIZ-1" },
      v2: { label: "V2 — CTA visible in the first viewport", image: feemgt2, status: "Approved", url: "https://www.figma.com/design/dTBPmQEg0eqBIaVokBE24G/FEE-PHASE-1?node-id=129-10716&t=RcfrekGLYqs5zDIZ-1" },
      alternatives: ["Sticky CTA footer", "Floating action button", "Above-fold CTA"],
    },
    decision: {
      title: "Move the primary CTA above the fold",
      context: "Users consistently overlooked the primary payment action during usability testing.",
      options: ["Sticky CTA footer", "Floating action button", "Above-fold CTA"],
      rationale: "The above-fold CTA matched user expectations and produced the strongest validation results.",
      tradeoff: "The first viewport becomes denser and needs responsive validation.",
    },
    evidence: {
      metrics: [{ label: "Task success", from: "62%", to: "89%" }, { label: "Error rate", from: "12%", to: "4%" }, { label: "Completion time", from: "4m 21s", to: "2m 11s" }],
      spreadsheet: { title: "Validation_S14.xlsx", columns: ["Metric", "V1", "V2"], rows: [["Task success", "62%", "89%"], ["Error rate", "12%", "4%"], ["Completion time", "4m 21s", "2m 11s"], ["Accessibility", "71", "92"]] },
    },
    guideline: { title: "Keep critical actions visible in essential task flows.", usedIn: 3 },
    sources: ["Figma design", "Usability test spreadsheet", "Usability test video", "Validation spreadsheet", "Related project documentation"],
  },
  {
    id: "fee-schedule-simplification",
    projectId: "fee-management",
    chapterNumber: 2,
    title: "Simplifying the fee schedule",
    summary: "Users struggled to understand fee categories and totals, leading to a simplified fee hierarchy.",
    brief: "The team reduced fee schedule complexity by grouping related fees, clarifying totals, and preserving the audit trail for finance operators.",
    chain: ["Research", "Design exploration", "Decision", "Validation"],
    preview: [
      { type: "research", label: "Research", text: "Operators cross-checked totals repeatedly" },
      { type: "decision", label: "Decision", text: "Group fees by category and subtotal" },
      { type: "evidence", label: "Validation", text: "Review time dropped by 30%" },
      { type: "figma", label: "Figma", text: "Simplified schedule component" },
    ],
    sources: ["Figma file", "Interview notes", "Validation metrics", "Jira implementation ticket"],
  },
  {
    id: "payment-status-visibility",
    projectId: "fee-management",
    chapterNumber: 3,
    title: "Improving payment status visibility",
    summary: "Users were uncertain whether payments were processing, completed, or failed.",
    brief: "The project introduced clearer payment status states so operators could understand progress and recover from failures without support escalation.",
    chain: ["Research", "Decision", "Evidence", "Guideline"],
    preview: [
      { type: "research", label: "Research", text: "Users lacked confidence after submitting payment" },
      { type: "decision", label: "Decision", text: "Expose processing, success, and failure states" },
      { type: "evidence", label: "Evidence", text: "Support contacts reduced" },
      { type: "guideline", label: "Guideline", text: "Explain recoverable payment states clearly" },
    ],
    sources: ["Support analysis", "Status component spec", "Validation evidence", "Project handover"],
  },
];

export const chatThread = {
  question: "Why was the CTA moved above the fold?",
  confidence: 94,
  answer: [
    {
      id: "claim-1",
      text: "Users failed to notice the CTA in the previous location.",
      sourceIds: ["study-4"],
      sourcePassages: ["7 of 10 users missed the CTA in the original layout."],
    },
    {
      id: "claim-2",
      text: "Heatmap analysis and usability testing demonstrated significantly higher visibility above the fold.",
      sourceIds: ["fee-mgt-v2", "study-4", "study-11"],
      sourcePassages: ["CTA moved above the fold in frame 3 after Study #11.", "Average task completion improved from 62% to 89% in v2.", "In-app feedback peaked after the v2 CTA placement change."],
    },
    {
      id: "claim-5",
      text: "Our team has documented this extensively, and I've pulled together insights from design files, research studies, and decision logs.",
      sourceIds: ["fee-mgt-v2", "study-4", "study-11"],
      sourcePassages: ["CTA moved above the fold in frame 3 after Study #11.", "10 moderated sessions, 5-7 min each.", "Sentiment: 58% positive, 29% neutral, 13% negative."],
    },
    {
      id: "claim-6",
      text: "Would you like me to explain any specific aspect in more detail?",
      sourceIds: [],
      sourcePassages: [],
    },
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
      { id: "fee-mgt-v2-p1", text: "8 frames covering the full checkout and fee-summary flow.", claimIds: [] },
      { id: "fee-mgt-v2-p2", text: "CTA moved above the fold in frame 3 after Study #11.", claimIds: ["claim-2", "claim-5"] },
      { id: "fee-mgt-v2-p3", text: "Last edited 2 days ago by Alex Kim.", claimIds: [] },
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
      { id: "study-4-p1", text: "10 moderated sessions, 5-7 min each.", claimIds: ["claim-5"] },
      { id: "study-4-p2", text: "7 of 10 users missed the CTA in the original layout.", claimIds: ["claim-1"] },
      { id: "study-4-p3", text: "Average task completion improved from 62% to 89% in v2.", claimIds: ["claim-2"] },
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
      { id: "study-11-p1", text: "24 total responses analysed across three channels.", claimIds: [] },
      { id: "study-11-p2", text: "Fee-breakdown clarity was the most common request.", claimIds: [] },
      { id: "study-11-p3", text: "Sentiment: 58% positive, 29% neutral, 13% negative.", claimIds: ["claim-5"] },
      { id: "study-11-p4", text: "In-app feedback peaked after the v2 CTA placement change.", claimIds: ["claim-2"] },
    ],
  },
];

export const decisionById = {
  "DD-001": {
    id: "DD-001", title: "Move Primary CTA Above the Fold",
    problem: "Users consistently overlooked the primary payment action during usability testing. Heatmap analysis showed that the CTA was below the visible viewport for 73% of users on desktop and 91% on mobile. This caused a significant drop in task completion rates during the payment flow. The original layout placed the CTA after a lengthy fee summary section, forcing users to scroll before taking action.",
    context: { why: "The original layout buried the CTA below a verbose fee breakdown that expanded to 3x the viewport height on mobile.", who: "Reported by Adrian during usability testing Session #4 on 2 Mar 2026.", biz: "Estimated 18% drop in payment conversion directly attributed to CTA visibility.", user: "Users expressed frustration at having to 'hunt' for the pay button in post-test surveys.", tech: "The layout used a single-column scroll container with no sticky positioning available in the legacy CSS framework." },
    summary: "Relocated the primary CTA above the fold on desktop and mobile layouts so it appears without scrolling.",
    status: "Approved", impact: "High", confidence: 94, owner: "Sarah Lee",
    research: "RS-006 Heatmap Analysis", evidence: "EV-001 Heatmap Study #11",
    guideline: "Primary CTA should always remain visible without scrolling during financial workflows.",
    figmaFiles: [
      { name: "Fee Management V1", url: "#" },
      { name: "Fee Management V2", url: "#" },
      { name: "Final Design", url: "#" },
      { name: "Prototype", url: "#" },
    ],
    jira: { epic: "Payment Flow Redesign", sprint: 12, developer: "David Chen", status: "Done", completion: "12 May 2026" },
    alternatives: [
      { name: "Sticky CTA Footer", pros: "Always visible regardless of scroll position.", cons: "Takes up 12% of viewport on mobile; users reported feeling 'crowded'.", selected: false, verdict: "Rejected", reason: "Too intrusive on mobile." },
      { name: "Floating Action Button", pros: "Modern UI pattern; minimal footprint.", cons: "Confused users who expected a standard button location; accessibility concerns.", selected: false, verdict: "Rejected", reason: "Accessibility concerns." },
      { name: "Above Fold CTA", pros: "Matches mental model; immediately visible; tested 89% task success.", cons: "Requires content reorganisation above the fold.", selected: true, verdict: "Selected", reason: "Highest success rate across all metrics." },
    ],
    researchCards: [
      { title: "Heatmap Analysis #11", method: "Session Recording", participants: 24, findings: "73% of users never scrolled past the fee summary on desktop. CTA received 0 clicks in the first 15 seconds for 68% of sessions.", confidence: 94 },
    ],
    evidenceCards: [
      { type: "Heatmap", title: "Study #11 Heatmap Data", detail: "/evidence/EV-001" },
      { type: "Usability Video", title: "Session 4 — User missed CTA", detail: "/evidence/EV-002" },
    ],
    outcome: [
      { label: "Task Success", from: "62%", to: "89%" },
      { label: "Completion Time", from: "4m 21s", to: "2m 11s" },
      { label: "Error Rate", from: "12%", to: "4%" },
      { label: "Accessibility", from: "71", to: "92" },
    ],
    aiSummary: "This decision was made because heatmap analysis and usability testing revealed that the primary payment CTA was below the visible viewport for the majority of users. By moving the CTA above the fold, we eliminated the need to scroll before taking action. The change was supported by Study #11 (24 participants, 94% confidence) and resulted in a 27% improvement in task completion. Source references: Heatmap Study #11, Usability Session #4.",
    relatedDecisions: ["DD-003", "DD-007", "DD-012", "DD-019"],
    tags: ["CTA", "Above-fold", "Conversion", "Mobile", "Payment"],
    created: "10 May 2026", updated: "12 May 2026", sprint: 12,
    comments: [
      { who: "Sarah Lee", text: "Approved after usability testing." },
      { who: "Alex Kim", text: "Updated copy based on finance feedback." },
      { who: "Priya Sharma", text: "Validated with participants." },
      { who: "Adrian", text: "Linked supporting analytics." },
    ],
  },
  "DD-002": {
    id: "DD-002", title: "Rename Submit to Confirm Payment",
    problem: "Users misunderstood what the 'Submit' button would do during payment. 34% of users in testing hesitated before clicking, and 12% reported they expected another confirmation screen. Financial terminology audits showed that 'Submit' is ambiguous in a banking context.",
    context: { why: "The term 'Submit' was inherited from a generic template and never localised for financial workflows.", who: "Identified by Alex Kim during UX copy audit on 8 Apr 2026.", biz: "Hesitation at the final step correlated with a 7% cart abandonment rate.", user: "Users expected explicit confirmation of what action would be taken with their payment data.", tech: "Button label was hardcoded in the shared component library; required a design token update." },
    summary: "Changed button copy from 'Submit' to 'Confirm Payment' to reduce user hesitation and clarify the action.",
    status: "Approved", impact: "Medium", confidence: 91, owner: "Alex Kim",
    research: "RS-001 Payment Flow Usability", evidence: "EV-004 Session Recording",
    guideline: "Financial CTAs must use action-oriented, specific language that describes the exact outcome.",
    figmaFiles: [
      { name: "Payment Screen V2", url: "#" },
      { name: "Button Component", url: "#" },
    ],
    jira: { epic: "Payment Flow Redesign", sprint: 12, developer: "David Chen", status: "Done", completion: "14 May 2026" },
    alternatives: [
      { name: "Pay Now", pros: "Direct and action-oriented.", cons: "May imply immediate charge without review opportunity.", selected: false, verdict: "Rejected", reason: "Too aggressive for users who wanted to review." },
      { name: "Submit Payment", pros: "More specific than Submit alone.", cons: "Still ambiguous — submit to whom?", selected: false, verdict: "Rejected", reason: "Did not fully address user confusion." },
      { name: "Confirm Payment", pros: "Explicit confirmation; sets clear expectation.", cons: "Longer label requires responsive handling on mobile.", selected: true, verdict: "Selected", reason: "Highest clarity score in copy testing (91% confidence)." },
    ],
    researchCards: [
      { title: "Payment Flow Usability", method: "Moderated Testing", participants: 18, findings: "34% of users hesitated at the Submit button. 12% expected an additional confirmation dialog.", confidence: 91 },
    ],
    evidenceCards: [
      { type: "Session Recording", title: "User hesitation at Submit", detail: "/evidence/EV-004" },
    ],
    outcome: [
      { label: "Button Hesitation", from: "34%", to: "6%" },
      { label: "Task Confidence", from: "74%", to: "96%" },
    ],
    aiSummary: "UX copy testing revealed that the generic 'Submit' label caused hesitation in over a third of users. By changing to 'Confirm Payment', we provided explicit confirmation of the action. The change was validated with 18 participants and resulted in a 28-point increase in user confidence at the final payment step.",
    relatedDecisions: ["DD-001", "DD-005", "DD-014", "DD-021"],
    tags: ["Copy", "Button", "Confirmation", "Payment", "Terminology"],
    created: "10 May 2026", updated: "14 May 2026", sprint: 12,
    comments: [
      { who: "Alex Kim", text: "Recommended based on copy audit." },
      { who: "Sarah Lee", text: "Approved for implementation." },
      { who: "Priya Sharma", text: "Validated in usability test." },
    ],
  },
  "DD-003": {
    id: "DD-003", title: "Introduce Progress Stepper",
    problem: "Users did not know how many steps remained in the payment process, leading to uncertainty and drop-off. Analytics showed a 23% exit rate at step 3 of 4, with users reporting they thought the process was near completion when it was only halfway.",
    context: { why: "The multi-step payment flow had no visible progress indicator, making it feel infinite.", who: "Identified through journey mapping session led by Sarah Lee.", biz: "23% drop-off at step 3 represented approximately 1,200 abandoned payments per month.", user: "Users reported anxiety about committing to a long process without knowing the endpoint.", tech: "The frontend router supported step state management but had no UI component for progress display." },
    summary: "Added a four-step progress indicator throughout the payment process showing current position and remaining steps.",
    status: "Approved", impact: "High", confidence: 96, owner: "Sarah Lee",
    research: "RS-003 Journey Mapping", evidence: "EV-006 Analytics Report",
    guideline: "Multi-step flows must display a progress indicator showing current step, total steps, and completed steps.",
    figmaFiles: [
      { name: "Checkout Flow V2", url: "#" },
      { name: "Progress Component", url: "#" },
    ],
    jira: { epic: "Payment Flow Redesign", sprint: 13, developer: "David Chen", status: "Done", completion: "18 May 2026" },
    alternatives: [
      { name: "Percentage bar", pros: "Simple visual of completion.", cons: "Doesn't indicate what each step entails.", selected: false, verdict: "Rejected", reason: "Too abstract." },
      { name: "Step numbers only", pros: "Minimal UI footprint.", cons: "Lacks labels; users still uncertain about content.", selected: false, verdict: "Rejected", reason: "Insufficient information." },
      { name: "Labeled step stepper", pros: "Shows step names, current position, and total; matches mental model.", cons: "Takes more horizontal space on mobile.", selected: true, verdict: "Selected", reason: "Highest clarity and satisfaction." },
    ],
    researchCards: [
      { title: "Journey Mapping Workshop", method: "Collaborative Workshop", participants: 8, findings: "Users consistently expressed uncertainty about process length. Journey maps revealed the 'infinite tunnel' perception.", confidence: 96 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Step 3 Exit Rate Analysis", detail: "/evidence/EV-006" },
    ],
    outcome: [
      { label: "Step 3 Drop-off", from: "23%", to: "4%" },
      { label: "User Satisfaction", from: "3.2", to: "4.5" },
    ],
    aiSummary: "Journey mapping revealed that users perceived the payment process as an 'infinite tunnel' without a progress indicator. Adding a four-step labeled stepper reduced step 3 drop-off from 23% to 4% and improved satisfaction scores by 1.3 points. The component was designed to collapse to numbered dots on mobile.",
    relatedDecisions: ["DD-001", "DD-007", "DD-015", "DD-022"],
    tags: ["Navigation", "Progress", "Multi-step", "Onboarding", "Mobile"],
    created: "14 May 2026", updated: "18 May 2026", sprint: 13,
    comments: [
      { who: "Adrian", text: "Validated with 8 participants in workshop." },
      { who: "Sarah Lee", text: "Approved the mobile responsive variant." },
    ],
  },
  "DD-004": {
    id: "DD-004", title: "Add Payment Status Visibility on Dashboard",
    problem: "Finance operators could not see real-time payment status on the dashboard, requiring them to open individual records. This caused inefficiency and delayed responses to failed payments.",
    context: { why: "Dashboard only showed generic 'processing' state without granular payment status breakdowns.", who: "Escalated by finance operations team through Sarah Lee.", biz: "Operators spent an average of 4 minutes per payment to check status through multiple screens.", user: "Power users wanted at-a-glance status indicators for batch monitoring.", tech: "Backend exposed payment status via API but frontend dashboard widgets were not consuming the data." },
    summary: "Added real-time payment status indicators to the dashboard showing pending, processing, completed, and failed counts.",
    status: "Approved", impact: "High", confidence: 93, owner: "Sarah Lee",
    research: "RS-002 Operator Workflow Study", evidence: "EV-003 Analytics Dashboard",
    guideline: "Dashboard widgets must surface real-time status counts for key operational metrics.",
    figmaFiles: [
      { name: "Dashboard V3", url: "#" },
      { name: "Status Widget", url: "#" },
    ],
    jira: { epic: "Operator Dashboard", sprint: 11, developer: "David Chen", status: "Done", completion: "8 May 2026" },
    alternatives: [
      { name: "Separate status page", pros: "Dedicated space for details.", cons: "Requires navigation away from dashboard; slower.", selected: false, verdict: "Rejected", reason: "Adds friction." },
      { name: "Inline status badges", pros: "Minimal change; quick to implement.", cons: "Not scannable for batch monitoring.", selected: true, verdict: "Selected", reason: "Best balance of visibility and implementation effort." },
    ],
    researchCards: [
      { title: "Operator Workflow Study", method: "Time-motion Analysis", participants: 12, findings: "Operators spent 68% of their payment-related time navigating between screens to check status. Consolidated view reduced this to 22%.", confidence: 93 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Pre/post implementation time savings", detail: "/evidence/EV-003" },
    ],
    outcome: [
      { label: "Status Check Time", from: "4 min", to: "45 sec" },
      { label: "Operator Satisfaction", from: "2.8", to: "4.3" },
    ],
    aiSummary: "Time-motion analysis revealed operators spent 68% of payment-related time navigating screens. Adding inline status badges to the dashboard reduced check time from 4 minutes to 45 seconds and improved satisfaction from 2.8 to 4.3.",
    relatedDecisions: ["DD-008", "DD-011", "DD-016", "DD-023"],
    tags: ["Dashboard", "Status", "Payments", "Operations", "Real-time"],
    created: "5 May 2026", updated: "8 May 2026", sprint: 11,
    comments: [
      { who: "Sarah Lee", text: "Finance team confirmed the requirements." },
      { who: "David Chen", text: "API integration completed." },
    ],
  },
  "DD-005": {
    id: "DD-005", title: "Implement Approval Workflow for Fee Overrides",
    problem: "Fee overrides could be applied without managerial approval, leading to inconsistent pricing and revenue leakage. Audit logs showed 14 unauthorised overrides in Q1 2026.",
    context: { why: "The override function was available to all operators without role-based approval gates.", who: "Identified during quarterly audit by compliance team.", biz: "Revenue leakage estimated at $42,000 from unauthorised overrides in Q1.", user: "Managers wanted visibility into all override activity without micromanaging.", tech: "Backend had role management APIs but the frontend never implemented approval routing." },
    summary: "Implemented a two-stage approval workflow where fee overrides above $500 require manager sign-off.",
    status: "Approved", impact: "High", confidence: 97, owner: "Sarah Lee",
    research: "RS-004 Compliance Audit Review", evidence: "EV-008 Audit Log Analysis",
    guideline: "Financial overrides must follow a documented approval workflow with role-based access control.",
    figmaFiles: [
      { name: "Approval Flow V1", url: "#" },
      { name: "Override Dialog", url: "#" },
    ],
    jira: { epic: "Compliance & Approvals", sprint: 11, developer: "David Chen", status: "Done", completion: "6 May 2026" },
    alternatives: [
      { name: "Remove override entirely", pros: "Eliminates risk completely.", cons: "Too rigid; legitimate overrides would be blocked.", selected: false, verdict: "Rejected", reason: "Too restrictive." },
      { name: "Post-facto audit notification", pros: "Easy to implement.", cons: "Doesn't prevent revenue loss; only detects it.", selected: false, verdict: "Rejected", reason: "Reactive, not preventive." },
      { name: "Approval workflow", pros: "Prevents unauthorised overrides while allowing legitimate ones.", cons: "Requires UI changes and backend logic.", selected: true, verdict: "Selected", reason: "Balances control with flexibility." },
    ],
    researchCards: [
      { title: "Compliance Audit Q1 2026", method: "Audit Log Review", participants: 14, findings: "14 unauthorised overrides totalling $42,000. All were made by operators without malicious intent but without proper authorisation.", confidence: 97 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Q1 Override Audit Report", detail: "/evidence/EV-008" },
    ],
    outcome: [
      { label: "Unauthorised Overrides", from: "14", to: "0" },
      { label: "Revenue Leakage", from: "$42K", to: "$0" },
    ],
    aiSummary: "A compliance audit revealed 14 unauthorised fee overrides in Q1 2026, causing $42,000 in revenue leakage. Implementing a two-stage approval workflow eliminated unauthorised overrides while maintaining operational flexibility for legitimate cases.",
    relatedDecisions: ["DD-008", "DD-013", "DD-017", "DD-024"],
    tags: ["Approval", "Compliance", "Overrides", "Finance", "Workflow"],
    created: "3 May 2026", updated: "6 May 2026", sprint: 11,
    comments: [
      { who: "Sarah Lee", text: "Compliance team approved the workflow design." },
      { who: "David Chen", text: "Backend approval routing implemented." },
    ],
  },
  "DD-006": {
    id: "DD-006", title: "Redesign Invoice Search with Filters",
    problem: "Invoice search was slow and inaccurate, returning too many irrelevant results. Users could only search by invoice number, not by date range, amount, or status.",
    context: { why: "Search was a simple full-text query against a single index with no faceted filtering.", who: "Reported by accounts payable team during retrospective.", biz: "AP team spent 6 hours per week manually filtering through search results.", user: "Users wanted to search by multiple criteria simultaneously — date, amount, status, vendor.", tech: "The search API supported filtering but the UI never exposed the parameters." },
    summary: "Redesigned the invoice search with faceted filters including date range, amount, status, and vendor.",
    status: "Approved", impact: "Medium", confidence: 90, owner: "Alex Kim",
    research: "RS-005 Search Usability Study", evidence: "EV-009 Search Analytics",
    guideline: "Enterprise search interfaces must provide faceted filtering with clear result counts per filter.",
    figmaFiles: [
      { name: "Search Redesign V2", url: "#" },
      { name: "Filter Components", url: "#" },
    ],
    jira: { epic: "Invoice Management", sprint: 10, developer: "David Chen", status: "Done", completion: "28 Apr 2026" },
    alternatives: [
      { name: "Full-text search only", pros: "No changes needed.", cons: "Poor accuracy; returns irrelevant results.", selected: false, verdict: "Rejected", reason: "Doesn't solve the problem." },
      { name: "Advanced search page", pros: "Powerful query capabilities.", cons: "Over-engineered; most users need simple filters.", selected: false, verdict: "Rejected", reason: "Too complex." },
      { name: "Faceted filter sidebar", pros: "Intuitive; shows available options; real-time filtering.", cons: "Requires UI redesign and API updates.", selected: true, verdict: "Selected", reason: "Best balance of power and simplicity." },
    ],
    researchCards: [
      { title: "Search Usability Study", method: "Task-based Testing", participants: 20, findings: "Users took an average of 3.2 minutes to find an invoice. With faceted filters, time reduced to 0.8 minutes.", confidence: 90 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Search Performance Metrics", detail: "/evidence/EV-009" },
    ],
    outcome: [
      { label: "Search Time", from: "3.2 min", to: "0.8 min" },
      { label: "Search Accuracy", from: "62%", to: "94%" },
    ],
    aiSummary: "A search usability study found users took 3.2 minutes on average to locate an invoice. Adding faceted filters (date, amount, status, vendor) reduced search time to 0.8 minutes and improved accuracy from 62% to 94%.",
    relatedDecisions: ["DD-011", "DD-016", "DD-020", "DD-025"],
    tags: ["Search", "Filters", "Invoices", "Usability", "Enterprise"],
    created: "24 Apr 2026", updated: "28 Apr 2026", sprint: 10,
    comments: [
      { who: "Alex Kim", text: "Designed the filter component library." },
      { who: "Adrian", text: "Tested with 20 participants." },
    ],
  },
  "DD-007": {
    id: "DD-007", title: "Improve Keyboard Navigation for Payment Form",
    problem: "The payment form had poor keyboard navigation — Tab order was incorrect, focus indicators were missing, and users could not complete the form using only the keyboard.",
    context: { why: "The form was built with a visual-first approach without considering keyboard accessibility.", who: "Raised by accessibility audit conducted by Marcus.", biz: "Non-compliance with WCAG 2.1 AA exposed the company to legal risk.", user: "Keyboard-only users (including power users and accessibility tool users) could not complete payment.", tech: "Form elements were rendered in DOM order that didn't match visual order due to CSS grid reordering." },
    summary: "Fixed Tab order, added visible focus indicators, and ensured full keyboard operability of the payment form.",
    status: "Approved", impact: "High", confidence: 95, owner: "Alex Kim",
    research: "RS-007 Accessibility Audit", evidence: "EV-010 WCAG Compliance Report",
    guideline: "All forms must be fully operable with keyboard only and follow a logical Tab order matching visual layout.",
    figmaFiles: [
      { name: "Payment Form Accessibility", url: "#" },
      { name: "Focus Indicator Spec", url: "#" },
    ],
    jira: { epic: "Accessibility Compliance", sprint: 13, developer: "David Chen", status: "Done", completion: "20 May 2026" },
    alternatives: [
      { name: "Skip navigation links only", pros: "Quick to implement.", cons: "Doesn't fix Tab order or focus visibility.", selected: false, verdict: "Rejected", reason: "Doesn't address core issues." },
      { name: "Full keyboard overhaul", pros: "Complete solution; WCAG compliant.", cons: "Requires form component library rewrite.", selected: true, verdict: "Selected", reason: "Only option that achieves compliance." },
    ],
    researchCards: [
      { title: "Accessibility Audit", method: "WCAG 2.1 AA Evaluation", participants: 3, findings: "14 accessibility violations found in payment form. 3 were critical: no focus indicators, broken Tab order, and missing ARIA labels.", confidence: 95 },
    ],
    evidenceCards: [
      { type: "Accessibility Audit", title: "WCAG Compliance Report", detail: "/evidence/EV-010" },
    ],
    outcome: [
      { label: "WCAG Violations", from: "14", to: "0" },
      { label: "Keyboard Completion Rate", from: "0%", to: "100%" },
    ],
    aiSummary: "An accessibility audit found 14 WCAG violations in the payment form, including missing focus indicators and broken Tab order. A full keyboard operability overhaul achieved WCAG 2.1 AA compliance and enabled keyboard-only completion.",
    relatedDecisions: ["DD-001", "DD-003", "DD-014", "DD-019"],
    tags: ["Accessibility", "Keyboard", "WCAG", "Forms", "Compliance"],
    created: "15 May 2026", updated: "20 May 2026", sprint: 13,
    comments: [
      { who: "Marcus", text: "Audit findings documented and tracked." },
      { who: "Alex Kim", text: "Redesigned focus indicators with 3:1 contrast ratio." },
    ],
  },
  "DD-008": {
    id: "DD-008", title: "Add Confirmation Dialog for Payment Submission",
    problem: "Users accidentally submitted payments multiple times because there was no confirmation dialog. Support tickets showed 47 duplicate payment incidents in Q1.",
    context: { why: "The submit button had no debounce or confirmation step before processing payment.", who: "Reported by support team through David Chen.", biz: "47 duplicate payments required $28,000 in manual refund processing.", user: "Users expected a review step before final submission.", tech: "No client-side or server-side duplicate submission prevention existed." },
    summary: "Added a confirmation dialog before payment submission that shows payment summary and requires explicit confirmation.",
    status: "Approved", impact: "High", confidence: 96, owner: "Alex Kim",
    research: "RS-008 Payment Error Analysis", evidence: "EV-012 Support Ticket Analysis",
    guideline: "Payment submission must include a confirmation dialog showing a summary of charges before processing.",
    figmaFiles: [
      { name: "Confirmation Dialog V1", url: "#" },
      { name: "Payment Summary Component", url: "#" },
    ],
    jira: { epic: "Payment Flow Redesign", sprint: 13, developer: "David Chen", status: "Done", completion: "22 May 2026" },
    alternatives: [
      { name: "Button debounce only", pros: "Quick technical fix.", cons: "Doesn't prevent intentional double-clicks or user confusion.", selected: false, verdict: "Rejected", reason: "Insufficient." },
      { name: "Confirmation dialog", pros: "Shows payment summary; user must confirm; prevents duplicates.", cons: "Adds one extra step to flow.", selected: true, verdict: "Selected", reason: "Most comprehensive solution." },
    ],
    researchCards: [
      { title: "Payment Error Analysis", method: "Support Ticket Review", participants: 47, findings: "47 duplicate payment incidents. 82% occurred when users clicked Submit multiple times due to no visual feedback.", confidence: 96 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Duplicate Payment Incidents", detail: "/evidence/EV-012" },
    ],
    outcome: [
      { label: "Duplicate Payments", from: "47", to: "0" },
      { label: "Refund Processing Cost", from: "$28K", to: "$0" },
    ],
    aiSummary: "Support ticket analysis revealed 47 duplicate payment incidents in Q1 caused by users clicking Submit multiple times. Adding a confirmation dialog with payment summary eliminated duplicates entirely and saved $28,000 in refund processing.",
    relatedDecisions: ["DD-001", "DD-002", "DD-005", "DD-017"],
    tags: ["Confirmation", "Payments", "Error Prevention", "Dialog", "Support"],
    created: "18 May 2026", updated: "22 May 2026", sprint: 13,
    comments: [
      { who: "Alex Kim", text: "Dialog designed with payment summary layout." },
      { who: "Sarah Lee", text: "Approved the flow." },
    ],
  },
  "DD-009": {
    id: "DD-009", title: "Implement SAP Integration for Payment Sync",
    problem: "Payments processed in the system were not automatically synced to SAP, requiring manual reconciliation. The nightly batch sync had a 6-hour delay, causing reporting discrepancies.",
    context: { why: "The legacy integration used flat-file export/import with overnight batch processing.", who: "Escalated by finance operations due to daily reconciliation overhead.", biz: "Manual reconciliation cost 20 hours per week and caused 2-day delays in financial reporting.", user: "Finance team wanted real-time payment visibility in SAP.", tech: "SAP exposed RFC endpoints but the existing integration was never upgraded to use them." },
    summary: "Implemented real-time SAP integration using RFC endpoints to sync payments immediately upon processing.",
    status: "Approved", impact: "High", confidence: 92, owner: "Sarah Lee",
    research: "RS-009 Integration Architecture Review", evidence: "EV-013 Reconciliation Report",
    guideline: "Financial systems must sync in real-time with SAP using direct RFC integration rather than batch file processing.",
    figmaFiles: [
      { name: "SAP Sync Dashboard", url: "#" },
    ],
    jira: { epic: "SAP Integration", sprint: 14, developer: "David Chen", status: "In Progress", completion: "—" },
    alternatives: [
      { name: "Optimise batch to 1-hour cycles", pros: "Low effort.", cons: "Still not real-time; data window still exists.", selected: false, verdict: "Rejected", reason: "Doesn't solve real-time requirement." },
      { name: "Real-time RFC integration", pros: "Immediate sync; zero data lag.", cons: "Requires significant backend changes and SAP configuration.", selected: true, verdict: "Selected", reason: "Only solution meeting real-time requirement." },
    ],
    researchCards: [
      { title: "Integration Architecture Review", method: "Systems Analysis", participants: 5, findings: "Current batch process causes 6-hour data lag. RFC endpoints are available but unused. Migration effort estimated at 4 weeks.", confidence: 92 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Reconciliation Time Analysis", detail: "/evidence/EV-013" },
    ],
    outcome: [
      { label: "Sync Delay", from: "6 hours", to: "Real-time" },
      { label: "Reconciliation Time", from: "20 hrs/wk", to: "2 hrs/wk" },
    ],
    aiSummary: "The legacy batch sync caused a 6-hour data lag between payments and SAP, requiring 20 hours of manual reconciliation per week. Real-time RFC integration eliminated the delay and reduced reconciliation to 2 hours weekly.",
    relatedDecisions: ["DD-004", "DD-013", "DD-018", "DD-024"],
    tags: ["SAP", "Integration", "Payments", "Real-time", "Backend"],
    created: "20 May 2026", updated: "—", sprint: 14,
    comments: [
      { who: "David Chen", text: "RFC endpoints tested in staging." },
      { who: "Sarah Lee", text: "Finance team confirmed requirements." },
    ],
  },
  "DD-010": {
    id: "DD-010", title: "Add Audit Trail Visibility for Fee Changes",
    problem: "Fee changes were applied without a visible audit trail, making it impossible for operators to see who changed what and when.",
    context: { why: "Fee updates directly modified the database record with no history table or frontend audit log.", who: "Requested by compliance team and finance operations.", biz: "Auditors required a 12-month change history for SOX compliance.", user: "Operators wanted to see change history without leaving the fee management screen.", tech: "Database had no trigger-based audit logging; required schema changes." },
    summary: "Added a visible audit trail panel to the fee detail view showing all changes with timestamps and operator names.",
    status: "Approved", impact: "Medium", confidence: 94, owner: "Sarah Lee",
    research: "RS-010 Compliance Requirements Analysis", evidence: "EV-014 SOX Audit Prep",
    guideline: "All financial data modifications must have a visible, immutable audit trail accessible from the detail view.",
    figmaFiles: [
      { name: "Audit Trail Component", url: "#" },
      { name: "Fee Detail V3", url: "#" },
    ],
    jira: { epic: "Compliance & Approvals", sprint: 12, developer: "David Chen", status: "Done", completion: "15 May 2026" },
    alternatives: [
      { name: "Separate audit log page", pros: "Simple implementation.", cons: "Requires navigation away from context.", selected: false, verdict: "Rejected", reason: "Adds friction." },
      { name: "Inline audit panel", pros: "Shows history in context; user stays on fee detail.", cons: "Takes vertical space in the card.", selected: true, verdict: "Selected", reason: "Keeps audit trail accessible." },
    ],
    researchCards: [
      { title: "SOX Compliance Requirements", method: "Regulatory Review", participants: 3, findings: "SOX requires 12-month audit trail for all financial data changes. Current system had zero audit capability.", confidence: 94 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Audit Readiness Assessment", detail: "/evidence/EV-014" },
    ],
    outcome: [
      { label: "Audit Readiness", from: "Non-compliant", to: "SOX Compliant" },
      { label: "Change Lookup Time", from: "N/A", to: "15 seconds" },
    ],
    aiSummary: "A compliance review found the system had no audit trail for fee changes, violating SOX requirements. An inline audit panel was added to the fee detail view, achieving SOX compliance and enabling 15-second change lookups.",
    relatedDecisions: ["DD-005", "DD-008", "DD-013", "DD-017"],
    tags: ["Audit", "Compliance", "SOX", "Fee", "History"],
    created: "10 May 2026", updated: "15 May 2026", sprint: 12,
    comments: [
      { who: "David Chen", text: "Database triggers implemented for audit logging." },
      { who: "Sarah Lee", text: "Compliance team approved the UI design." },
    ],
  },
  "DD-011": {
    id: "DD-011", title: "Design Empty States for All Data Tables",
    problem: "Empty data tables showed a blank white area with no guidance, leaving users confused about whether the system was broken or there was genuinely no data.",
    context: { why: "Tables were built with zero-state handling — no empty illustration, message, or call to action.", who: "Identified during onboarding sessions with new finance operators.", biz: "New operators took 2x longer to become productive due to confusion around empty states.", user: "Users reported uncertainty — 'Is it loading? Is it empty? Is it broken?'", tech: "The table component had no empty state slot; required component library update." },
    summary: "Designed and implemented contextual empty states for all data tables with illustrations, messages, and CTAs.",
    status: "Approved", impact: "Medium", confidence: 89, owner: "Alex Kim",
    research: "RS-011 Onboarding Effectiveness Study", evidence: "EV-015 User Feedback Analysis",
    guideline: "Every data table must display a contextual empty state with an illustration, explanation, and primary action.",
    figmaFiles: [
      { name: "Empty State Library", url: "#" },
      { name: "Table Component V2", url: "#" },
    ],
    jira: { epic: "UI Polish", sprint: 10, developer: "David Chen", status: "Done", completion: "25 Apr 2026" },
    alternatives: [
      { name: "Simple text message only", pros: "Quick to implement.", cons: "Feels incomplete; no visual guidance.", selected: false, verdict: "Rejected", reason: "Too minimal." },
      { name: "Illustration + message + CTA", pros: "Delightful; guides user to next action.", cons: "Requires illustration assets and copywriting.", selected: true, verdict: "Selected", reason: "Best user experience." },
    ],
    researchCards: [
      { title: "Onboarding Effectiveness Study", method: "Time-to-productivity Tracking", participants: 15, findings: "New operators took 8 days to reach productivity vs 4-day target. Empty state confusion was a top contributor.", confidence: 89 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "User Feedback Analysis", detail: "/evidence/EV-015" },
    ],
    outcome: [
      { label: "Time to Productivity", from: "8 days", to: "4 days" },
      { label: "User Confusion Score", from: "4.2", to: "1.8" },
    ],
    aiSummary: "New operators took twice as long to become productive partly due to confusing empty data tables. Contextual empty states with illustrations, messages, and CTAs reduced time-to-productivity from 8 to 4 days.",
    relatedDecisions: ["DD-006", "DD-012", "DD-015", "DD-020"],
    tags: ["Empty States", "Onboarding", "UX", "Illustration", "Tables"],
    created: "21 Apr 2026", updated: "25 Apr 2026", sprint: 10,
    comments: [
      { who: "Alex Kim", text: "Illustrations created for 8 table variants." },
      { who: "Adrian", text: "Tested with new operators." },
    ],
  },
  "DD-012": {
    id: "DD-012", title: "Add Loading Indicators for Slow API Calls",
    problem: "Slow API calls showed no loading indicator, making users think the system had frozen. Support tickets about 'system freezing' increased 40% month over month.",
    context: { why: "The app had no global loading state management — API calls were made without any UI feedback.", who: "Flagged by support team and confirmed by David Chen through performance monitoring.", biz: "40% increase in 'system freeze' support tickets costing $3,200/month in triage.", user: "Users reported clicking multiple times out of frustration, causing duplicate submissions.", tech: "No API interceptors or loading state hooks existed in the frontend architecture." },
    summary: "Added skeleton loading states and spinner indicators for all API-driven components and data tables.",
    status: "Approved", impact: "High", confidence: 93, owner: "Alex Kim",
    research: "RS-012 Performance Monitoring Review", evidence: "EV-016 Support Ticket Analysis",
    guideline: "All API-driven components must display a loading state — either skeleton placeholder or spinner — within 200ms of request.",
    figmaFiles: [
      { name: "Loading States Library", url: "#" },
      { name: "Skeleton Components", url: "#" },
    ],
    jira: { epic: "Performance & Reliability", sprint: 11, developer: "David Chen", status: "Done", completion: "5 May 2026" },
    alternatives: [
      { name: "Full-page spinner", pros: "Simple to implement.", cons: "Blocks all interaction; poor UX.", selected: false, verdict: "Rejected", reason: "Too disruptive." },
      { name: "Component-level skeletons", pros: "Shows structure; feels faster; allows interaction.", cons: "Requires per-component implementation.", selected: true, verdict: "Selected", reason: "Best perceived performance." },
    ],
    researchCards: [
      { title: "Performance Monitoring Review", method: "RUM Analysis", participants: 1000, findings: "P95 API response time was 4.2 seconds. 40% of 'system freeze' tickets correlated with calls >3 seconds with no loading UI.", confidence: 93 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Support Ticket Trend Analysis", detail: "/evidence/EV-016" },
    ],
    outcome: [
      { label: "System Freeze Tickets", from: "+40% MoM", to: "— 12%" },
      { label: "Perceived Load Time", from: "4.2s", to: "1.1s (perceived)" },
    ],
    aiSummary: "Performance monitoring revealed P95 API response times of 4.2 seconds with no loading feedback, causing a 40% increase in 'system freeze' tickets. Component-level skeleton states reduced support tickets by 12% and improved perceived performance to 1.1 seconds.",
    relatedDecisions: ["DD-003", "DD-006", "DD-011", "DD-016"],
    tags: ["Loading", "Performance", "Skeleton", "UX", "API"],
    created: "2 May 2026", updated: "5 May 2026", sprint: 11,
    comments: [
      { who: "David Chen", text: "API interceptor added for loading state management." },
      { who: "Alex Kim", text: "Skeleton components built for all table variants." },
    ],
  },
  "DD-013": {
    id: "DD-013", title: "Add Validation for Payment Amount Limits",
    problem: "Users could enter any payment amount without validation, leading to transactions that exceeded daily limits or account balances. Support handled 23 'failed payment' incidents weekly due to insufficient funds or limit breaches.",
    context: { why: "The amount field had no client-side validation for minimum, maximum, or balance checks.", who: "Reported by support team through analysis of failed payment incidents.", biz: "23 weekly incidents cost $1,800 in support handling and damaged merchant relationships.", user: "Users received generic 'payment failed' errors with no explanation of why.", tech: "Backend enforced limits but returned generic error codes that the frontend didn't translate." },
    summary: "Added client-side validation for payment amounts including minimum/maximum limits and balance checks with clear error messages.",
    status: "Approved", impact: "High", confidence: 95, owner: "Alex Kim",
    research: "RS-013 Payment Failure Analysis", evidence: "EV-017 Transaction Log Analysis",
    guideline: "Payment amount fields must validate against account limits on input and show specific error messages before submission.",
    figmaFiles: [
      { name: "Validation Patterns V2", url: "#" },
      { name: "Error State Components", url: "#" },
    ],
    jira: { epic: "Payment Flow Redesign", sprint: 13, developer: "David Chen", status: "Done", completion: "24 May 2026" },
    alternatives: [
      { name: "Backend validation only", pros: "Already partially implemented.", cons: "Generic errors; poor user experience; no real-time feedback.", selected: false, verdict: "Rejected", reason: "Doesn't improve UX." },
      { name: "Client-side validation + specific errors", pros: "Real-time feedback; prevents submission; clear guidance.", cons: "Requires balance API integration.", selected: true, verdict: "Selected", reason: "Best user experience." },
    ],
    researchCards: [
      { title: "Payment Failure Analysis", method: "Transaction Log Review", participants: 23, findings: "23 weekly failures — 14 from daily limit exceeded, 6 from insufficient balance, 3 from minimum amount not met.", confidence: 95 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Transaction Failure Breakdown", detail: "/evidence/EV-017" },
    ],
    outcome: [
      { label: "Failed Payments", from: "23/wk", to: "2/wk" },
      { label: "Support Tickets", from: "$1,800/wk", to: "$150/wk" },
    ],
    aiSummary: "Transaction log analysis revealed 23 weekly payment failures due to limit and balance issues with no clear user feedback. Client-side validation with specific error messages reduced failures to 2 per week and support costs by 92%.",
    relatedDecisions: ["DD-001", "DD-005", "DD-008", "DD-018"],
    tags: ["Validation", "Payments", "Limits", "Errors", "Forms"],
    created: "20 May 2026", updated: "24 May 2026", sprint: 13,
    comments: [
      { who: "David Chen", text: "Balance API integrated." },
      { who: "Alex Kim", text: "Error message copy reviewed with support team." },
    ],
  },
  "DD-014": {
    id: "DD-014", title: "Redesign Notification Preferences Panel",
    problem: "Users could not easily configure which payment notifications they received, leading to notification fatigue and missed important alerts.",
    context: { why: "Notification settings were buried in a generic account page with binary on/off toggles only.", who: "Identified through user feedback survey conducted by Priya Sharma.", biz: "38% of users disabled all notifications due to fatigue, including critical payment alerts.", user: "Users wanted granular control — by notification type, channel, and frequency.", tech: "Backend supported granular notification preferences but the frontend only exposed a simple toggle." },
    summary: "Redesigned notification preferences with granular controls by event type, delivery channel, and digest frequency.",
    status: "Approved", impact: "Medium", confidence: 88, owner: "Alex Kim",
    research: "RS-014 Notification UX Study", evidence: "EV-018 User Survey Results",
    guideline: "Notification settings must allow granular control by event type, channel, and frequency with clear previews.",
    figmaFiles: [
      { name: "Notification Settings V2", url: "#" },
      { name: "Preference Toggle Components", url: "#" },
    ],
    jira: { epic: "User Preferences", sprint: 10, developer: "David Chen", status: "Done", completion: "26 Apr 2026" },
    alternatives: [
      { name: "Add more categories to existing toggle", pros: "Quick change.", cons: "Still limited; no channel or frequency control.", selected: false, verdict: "Rejected", reason: "Incremental improvement, not a solution." },
      { name: "Full redesign with channel + frequency", pros: "Complete control; high satisfaction.", cons: "Requires full UI redesign.", selected: true, verdict: "Selected", reason: "Only option that meets user needs." },
    ],
    researchCards: [
      { title: "Notification UX Study", method: "Survey + Diary Study", participants: 120, findings: "38% disabled all notifications. Top request: channel-specific controls (email vs in-app vs SMS) and digest options.", confidence: 88 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Notification Survey Results", detail: "/evidence/EV-018" },
    ],
    outcome: [
      { label: "Notifications Disabled", from: "38%", to: "6%" },
      { label: "User Satisfaction", from: "2.5", to: "4.2" },
    ],
    aiSummary: "A user survey revealed 38% of users disabled all notifications due to lack of granular control. The redesigned preferences panel with event type, channel, and frequency controls reduced disabled rates to 6% and improved satisfaction to 4.2.",
    relatedDecisions: ["DD-004", "DD-011", "DD-019", "DD-022"],
    tags: ["Notifications", "Preferences", "Settings", "UX", "Survey"],
    created: "22 Apr 2026", updated: "26 Apr 2026", sprint: 10,
    comments: [
      { who: "Priya Sharma", text: "Survey designed and analysed." },
      { who: "Alex Kim", text: "Redesigned preference panel." },
    ],
  },
  "DD-015": {
    id: "DD-015", title: "Add Bulk Approval for Fee Overrides",
    problem: "Managers had to approve fee overrides one at a time, which was inefficient during peak periods when 20+ overrides needed review daily.",
    context: { why: "The approval workflow was designed for single-item processing with no batch operations.", who: "Requested by managers during feedback session with Sarah Lee.", biz: "Managers spent 45 minutes daily on individual approvals during peak times.", user: "Managers wanted to review and approve multiple overrides in a single action.", tech: "Backend API supported batch approval but the frontend only exposed single-item approval." },
    summary: "Added bulk selection and batch approval capability to the override approval queue.",
    status: "Approved", impact: "Medium", confidence: 91, owner: "Sarah Lee",
    research: "RS-015 Manager Workflow Study", evidence: "EV-019 Time Analysis Report",
    guideline: "Approval queues must support bulk selection and batch operations for efficient review.",
    figmaFiles: [
      { name: "Bulk Approval UI", url: "#" },
      { name: "Approval Queue V2", url: "#" },
    ],
    jira: { epic: "Compliance & Approvals", sprint: 12, developer: "David Chen", status: "Done", completion: "16 May 2026" },
    alternatives: [
      { name: "Keyboard shortcuts for faster single approval", pros: "Low effort.", cons: "Still processes one at a time.", selected: false, verdict: "Rejected", reason: "Incremental, not transformative." },
      { name: "Bulk select + batch approve", pros: "Process 20+ items in one action.", cons: "Requires select-all UI and batch API integration.", selected: true, verdict: "Selected", reason: "Significant time savings." },
    ],
    researchCards: [
      { title: "Manager Workflow Study", method: "Time-motion Analysis", participants: 8, findings: "Managers spent 45 min/day on individual approvals during peak periods. Bulk approval estimated to reduce this to 5 min.", confidence: 91 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Approval Time Analysis", detail: "/evidence/EV-019" },
    ],
    outcome: [
      { label: "Approval Time", from: "45 min/day", to: "5 min/day" },
      { label: "Manager Satisfaction", from: "2.9", to: "4.4" },
    ],
    aiSummary: "Time-motion analysis showed managers spent 45 minutes daily on individual approvals. Adding bulk selection and batch approval reduced this to 5 minutes and improved manager satisfaction from 2.9 to 4.4.",
    relatedDecisions: ["DD-005", "DD-008", "DD-010", "DD-017"],
    tags: ["Bulk", "Approval", "Workflow", "Efficiency", "Managers"],
    created: "12 May 2026", updated: "16 May 2026", sprint: 12,
    comments: [
      { who: "Sarah Lee", text: "Confirmed workflow requirements with managers." },
      { who: "David Chen", text: "Batch API endpoint built." },
    ],
  },
  "DD-016": {
    id: "DD-016", title: "Improve Invoice Sorting by Multiple Columns",
    problem: "Invoice tables could only be sorted by a single column, forcing users to re-sort repeatedly when analysing data across different dimensions.",
    context: { why: "The table component had single-column sorting inherited from a basic data-grid library.", who: "Raised by accounts payable team during retrospective.", biz: "AP team spent 3 hours weekly manually cross-referencing unsorted data.", user: "Users wanted multi-column sort — e.g., sort by status then date then amount.", tech: "The data-grid library supported multi-sort but it was never configured." },
    summary: "Enabled multi-column sorting on invoice tables with visual indicators for sort priority.",
    status: "Approved", impact: "Low", confidence: 87, owner: "Alex Kim",
    research: "RS-016 Table Usability Feedback", evidence: "EV-020 AP Workflow Analysis",
    guideline: "Data tables should support multi-column sorting with visual indicators showing sort order and priority.",
    figmaFiles: [
      { name: "Table Sorting V2", url: "#" },
    ],
    jira: { epic: "Invoice Management", sprint: 10, developer: "David Chen", status: "Done", completion: "27 Apr 2026" },
    alternatives: [
      { name: "Single-column sort (existing)", pros: "No work needed.", cons: "Doesn't meet user needs.", selected: false, verdict: "Rejected", reason: "Status quo." },
      { name: "Multi-column sort", pros: "Power users can sort by multiple dimensions.", cons: "Requires UI for sort priority indicators.", selected: true, verdict: "Selected", reason: "Matches enterprise expectations." },
    ],
    researchCards: [
      { title: "Table Usability Feedback", method: "User Interviews", participants: 10, findings: "7 of 10 AP users mentioned sorting as a pain point. Multi-column sort was the #1 table feature request.", confidence: 87 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "AP Workflow Analysis", detail: "/evidence/EV-020" },
    ],
    outcome: [
      { label: "Sort-related Tasks", from: "3 hrs/wk", to: "0.5 hrs/wk" },
      { label: "User Satisfaction", from: "3.0", to: "4.1" },
    ],
    aiSummary: "User interviews with the AP team revealed single-column sorting was a top pain point. Enabling multi-column sort with priority indicators reduced sort-related task time from 3 hours to 30 minutes weekly.",
    relatedDecisions: ["DD-006", "DD-011", "DD-020", "DD-025"],
    tags: ["Sorting", "Tables", "Invoices", "Enterprise", "Data"],
    created: "23 Apr 2026", updated: "27 Apr 2026", sprint: 10,
    comments: [
      { who: "Alex Kim", text: "Sort priority indicators designed." },
      { who: "David Chen", text: "Data-grid multi-sort configured." },
    ],
  },
  "DD-017": {
    id: "DD-017", title: "Add Success Confirmation After Payment",
    problem: "After successful payment, users saw a generic 'Processing' message with no clear confirmation. Many users left the page unsure if payment was actually completed.",
    context: { why: "The success state showed a generic spinner message while waiting for backend confirmation, then immediately redirected.", who: "Identified through user testing session with Adrian.", biz: "12% of users called support after payment to confirm it went through.", user: "Users wanted a clear success page with transaction details and a confirmation number.", tech: "The payment flow had no dedicated success screen — it redirected to the dashboard after processing." },
    summary: "Designed a dedicated payment success confirmation screen with transaction details, confirmation number, and next steps.",
    status: "Approved", impact: "Medium", confidence: 92, owner: "Alex Kim",
    research: "RS-017 Post-payment UX Study", evidence: "EV-021 Support Call Analysis",
    guideline: "Payment flows must end with a dedicated success confirmation screen showing transaction details and confirmation ID.",
    figmaFiles: [
      { name: "Payment Success Screen", url: "#" },
      { name: "Confirmation Receipt", url: "#" },
    ],
    jira: { epic: "Payment Flow Redesign", sprint: 12, developer: "David Chen", status: "Done", completion: "13 May 2026" },
    alternatives: [
      { name: "Toast notification only", pros: "Quick to implement.", cons: "Dismissable; no permanent record.", selected: false, verdict: "Rejected", reason: "Not persistent enough." },
      { name: "Dedicated success screen", pros: "Clear confirmation; shows receipt; permanent.", cons: "Adds an extra screen to the flow.", selected: true, verdict: "Selected", reason: "Best for user confidence." },
    ],
    researchCards: [
      { title: "Post-payment UX Study", method: "Usability Testing", participants: 16, findings: "12% of users called support after payment. Users expected a confirmation screen with receipt details.", confidence: 92 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Support Call Analysis", detail: "/evidence/EV-021" },
    ],
    outcome: [
      { label: "Post-payment Support Calls", from: "12%", to: "1%" },
      { label: "User Confidence Score", from: "3.1", to: "4.7" },
    ],
    aiSummary: "Usability testing revealed 12% of users called support after payment because they were unsure it succeeded. A dedicated success screen with transaction details and confirmation number reduced support calls to 1% and improved confidence to 4.7.",
    relatedDecisions: ["DD-001", "DD-002", "DD-008", "DD-013"],
    tags: ["Confirmation", "Success", "Payment", "Receipt", "Trust"],
    created: "9 May 2026", updated: "13 May 2026", sprint: 12,
    comments: [
      { who: "Adrian", text: "Tested with 16 participants." },
      { who: "Alex Kim", text: "Receipt component designed." },
    ],
  },
  "DD-018": {
    id: "DD-018", title: "Implement File Upload for Payment Attachments",
    problem: "Users could not attach supporting documents to payments, requiring them to send files separately via email. This caused delays and lost documents.",
    context: { why: "The payment form had no file upload capability — attachments had to be emailed separately.", who: "Repeatedly requested by finance operations and support team.", biz: "45% of manual payment processing delays were caused by missing or emailed attachments.", user: "Users wanted to upload invoices, approvals, and supporting docs inline with the payment.", tech: "Backend had a document management API but the frontend never integrated file upload into payment flow." },
    summary: "Added inline file upload component to the payment form supporting PDF, image, and spreadsheet attachments.",
    status: "Approved", impact: "High", confidence: 93, owner: "Alex Kim",
    research: "RS-018 Document Workflow Study", evidence: "EV-022 Processing Delay Analysis",
    guideline: "Payment forms must support inline file upload for supporting documents with drag-and-drop and progress indication.",
    figmaFiles: [
      { name: "File Upload Component", url: "#" },
      { name: "Payment Form V3", url: "#" },
    ],
    jira: { epic: "Payment Flow Redesign", sprint: 14, developer: "David Chen", status: "In Progress", completion: "—" },
    alternatives: [
      { name: "Email-to-system integration", pros: "No UI changes.", cons: "Still requires separate email step; documents still lost.", selected: false, verdict: "Rejected", reason: "Doesn't solve core problem." },
      { name: "Inline file upload", pros: "Documents attached directly; no separate step; progress feedback.", cons: "Requires upload component and document API integration.", selected: true, verdict: "Selected", reason: "Directly solves the problem." },
    ],
    researchCards: [
      { title: "Document Workflow Study", method: "Process Mapping", participants: 10, findings: "45% of payment processing delays traced to missing or emailed attachments. Average 2.3-day delay per attachment-related payment.", confidence: 93 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Payment Processing Delays", detail: "/evidence/EV-022" },
    ],
    outcome: [
      { label: "Attachment-related Delays", from: "2.3 days", to: "0 days" },
      { label: "Missing Documents", from: "18%", to: "0%" },
    ],
    aiSummary: "Process mapping revealed 45% of payment delays were caused by missing or emailed attachments, averaging 2.3 days per payment. Inline file upload eliminated attachment-related delays and missing documents entirely.",
    relatedDecisions: ["DD-001", "DD-009", "DD-013", "DD-017"],
    tags: ["Upload", "Documents", "Attachments", "Payments", "Forms"],
    created: "22 May 2026", updated: "—", sprint: 14,
    comments: [
      { who: "Alex Kim", text: "Upload component with drag-and-drop designed." },
      { who: "David Chen", text: "Document API integration in progress." },
    ],
  },
  "DD-019": {
    id: "DD-019", title: "Add Payment History View",
    problem: "Users could not view their payment history within the app — they had to request reports from support or check SAP separately.",
    context: { why: "The app focused on processing payments but had no history view for completed transactions.", who: "Requested by finance operations and end users through feature requests.", biz: "Support team handled 35 weekly requests for payment history lookups.", user: "Users wanted a searchable, filterable history of all payments with status and details.", tech: "Payment data existed in the database but no frontend view was built to display it." },
    summary: "Designed and implemented a payment history page with search, filters, and export capability.",
    status: "Approved", impact: "Medium", confidence: 90, owner: "Alex Kim",
    research: "RS-019 Feature Request Analysis", evidence: "EV-023 Support Request Log",
    guideline: "Payment systems must include a searchable, filterable payment history view accessible to users.",
    figmaFiles: [
      { name: "Payment History V1", url: "#" },
      { name: "Export Component", url: "#" },
    ],
    jira: { epic: "Payment Management", sprint: 11, developer: "David Chen", status: "Done", completion: "8 May 2026" },
    alternatives: [
      { name: "Email report on demand", pros: "Easy to implement.", cons: "Not real-time; requires support intervention.", selected: false, verdict: "Rejected", reason: "Still requires support." },
      { name: "In-app history page", pros: "Self-service; real-time; searchable.", cons: "Requires new page development.", selected: true, verdict: "Selected", reason: "Eliminates support dependency." },
    ],
    researchCards: [
      { title: "Feature Request Analysis", method: "Request Log Review", participants: 35, findings: "35 weekly support requests for payment history. Top requested features: search by date range, status filter, CSV export.", confidence: 90 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Support Request Log Analysis", detail: "/evidence/EV-023" },
    ],
    outcome: [
      { label: "History Support Requests", from: "35/wk", to: "2/wk" },
      { label: "Self-service Rate", from: "0%", to: "94%" },
    ],
    aiSummary: "Support handled 35 weekly requests for payment history lookups. An in-app history page with search, filters, and export reduced support requests to 2 per week and achieved 94% self-service rate.",
    relatedDecisions: ["DD-004", "DD-006", "DD-016", "DD-023"],
    tags: ["History", "Payments", "Self-service", "Search", "Export"],
    created: "5 May 2026", updated: "8 May 2026", sprint: 11,
    comments: [
      { who: "Alex Kim", text: "History page with filters designed." },
      { who: "David Chen", text: "Payment data API built." },
    ],
  },
  "DD-020": {
    id: "DD-020", title: "Design Responsive Layout for Mobile Operators",
    problem: "Finance operators accessing the system from tablets and phones experienced broken layouts, overlapping elements, and unclickable buttons.",
    context: { why: "The entire UI was built desktop-first with fixed-width layouts and no responsive breakpoints.", who: "Flagged by field operators who use tablets for on-the-go approvals.", biz: "34% of operators used mobile devices but reported 70% task failure rate on phones.", user: "Operators needed to approve overrides, check status, and search invoices on mobile.", tech: "The CSS used fixed pixel widths and no media queries. Components had no mobile variants." },
    summary: "Implemented responsive breakpoints and mobile-optimised layouts for all key operator workflows.",
    status: "Approved", impact: "High", confidence: 91, owner: "Alex Kim",
    research: "RS-020 Mobile Usage Study", evidence: "EV-024 Device Analytics",
    guideline: "All operator workflows must be fully functional on tablet and mobile devices with touch-optimised targets of minimum 44px.",
    figmaFiles: [
      { name: "Mobile Layouts V1", url: "#" },
      { name: "Responsive Components", url: "#" },
    ],
    jira: { epic: "Mobile Support", sprint: 14, developer: "David Chen", status: "In Progress", completion: "—" },
    alternatives: [
      { name: "Native mobile app", pros: "Best mobile experience.", cons: "High development cost; separate codebase.", selected: false, verdict: "Rejected", reason: "Too expensive and slow." },
      { name: "Responsive web redesign", pros: "Single codebase; progressive enhancement.", cons: "Requires CSS overhaul and component updates.", selected: true, verdict: "Selected", reason: "Best cost-benefit ratio." },
    ],
    researchCards: [
      { title: "Mobile Usage Study", method: "Device Analytics + Survey", participants: 80, findings: "34% of operators use mobile devices. 70% task failure rate on phones vs 12% on desktop. Top issues: tiny tap targets, overlapping text, unresponsive tables.", confidence: 91 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Device Usage Analytics", detail: "/evidence/EV-024" },
    ],
    outcome: [
      { label: "Mobile Task Success", from: "30%", to: "88%" },
      { label: "Operator Satisfaction", from: "2.1", to: "4.0" },
    ],
    aiSummary: "Device analytics revealed 34% of operators used mobile devices with a 70% task failure rate. Responsive redesign with touch-optimised targets improved mobile task success to 88% and satisfaction from 2.1 to 4.0.",
    relatedDecisions: ["DD-001", "DD-003", "DD-007", "DD-014"],
    tags: ["Responsive", "Mobile", "Layout", "Touch", "Operators"],
    created: "25 May 2026", updated: "—", sprint: 14,
    comments: [
      { who: "Alex Kim", text: "Mobile layouts designed for key workflows." },
      { who: "David Chen", text: "CSS media query framework implemented." },
    ],
  },
  "DD-021": {
    id: "DD-021", title: "Standardise Financial Terminology Across UI",
    problem: "Different screens used inconsistent financial terminology — 'fee', 'charge', 'surcharge', and 'cost' were used interchangeably, confusing users.",
    context: { why: "No terminology standard existed; different teams developed screens independently.", who: "Raised by content designer Alex Kim after copy audit.", biz: "Inconsistent terminology caused 5% of support calls related to fee confusion.", user: "Users needed clear, consistent financial language to make informed decisions.", tech: "No design token or i18n system existed for copy — labels were hardcoded per component." },
    summary: "Created a financial terminology standard and audit all screens for consistent terminology usage.",
    status: "Approved", impact: "Low", confidence: 89, owner: "Alex Kim",
    research: "RS-021 Terminology Audit", evidence: "EV-025 Support Call Analysis",
    guideline: "Financial interfaces must use consistent terminology defined in a shared glossary with design token integration.",
    figmaFiles: [
      { name: "Terminology Guidelines", url: "#" },
      { name: "Content Design Tokens", url: "#" },
    ],
    jira: { epic: "UI Polish", sprint: 10, developer: "David Chen", status: "Done", completion: "29 Apr 2026" },
    alternatives: [
      { name: "Ad-hoc fixes per screen", pros: "Quick individual fixes.", cons: "No consistency guarantee; reinvents per screen.", selected: false, verdict: "Rejected", reason: "Doesn't solve root cause." },
      { name: "Standard + audit + tokens", pros: "Systematic; consistent; future-proof.", cons: "Requires upfront investment in standard creation.", selected: true, verdict: "Selected", reason: "Only systematic solution." },
    ],
    researchCards: [
      { title: "Terminology Audit", method: "Screen-by-screen Review", participants: 24, findings: "4 different terms used for the same concept across 24 screens. 5% of support calls traced to terminology confusion.", confidence: 89 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Fee Confusion Support Calls", detail: "/evidence/EV-025" },
    ],
    outcome: [
      { label: "Term Consistency", from: "32%", to: "100%" },
      { label: "Terminology Confusion Calls", from: "5%", to: "0.5%" },
    ],
    aiSummary: "A screen-by-screen audit found 4 different terms for the same financial concept across 24 screens, causing 5% of support calls. A terminology standard with design tokens achieved 100% consistency and reduced confusion calls to 0.5%.",
    relatedDecisions: ["DD-002", "DD-010", "DD-014", "DD-022"],
    tags: ["Terminology", "Copy", "Standards", "Content", "Design Tokens"],
    created: "25 Apr 2026", updated: "29 Apr 2026", sprint: 10,
    comments: [
      { who: "Alex Kim", text: "Terminology standard documented." },
      { who: "Sarah Lee", text: "Approved by finance stakeholders." },
    ],
  },
  "DD-022": {
    id: "DD-022", title: "Improve Payment Error Messages with Specific Guidance",
    problem: "Payment errors showed generic messages like 'An error occurred' with no explanation of what went wrong or how to fix it.",
    context: { why: "Error handling was generic — all API errors mapped to a single fallback message.", who: "Raised by support team and confirmed through user feedback.", biz: "52% of payment failure support calls were users asking 'what does this error mean?'", user: "Users wanted specific, actionable error messages that told them what happened and what to do next.", tech: "Backend returned error codes but the frontend had no error code-to-message mapping." },
    summary: "Implemented specific, actionable error messages for all known payment failure scenarios.",
    status: "Approved", impact: "Medium", confidence: 94, owner: "Alex Kim",
    research: "RS-022 Error Message Study", evidence: "EV-026 Error Support Analysis",
    guideline: "Error messages must explain what happened, why it happened, and what the user can do to resolve it.",
    figmaFiles: [
      { name: "Error Message Library", url: "#" },
    ],
    jira: { epic: "Payment Flow Redesign", sprint: 13, developer: "David Chen", status: "Done", completion: "23 May 2026" },
    alternatives: [
      { name: "Keep generic messages", pros: "No work needed.", cons: "Zero guidance; users remain confused.", selected: false, verdict: "Rejected", reason: "Status quo doesn't work." },
      { name: "Specific error messages with recovery actions", pros: "Users understand and can fix issues.", cons: "Requires error code mapping and copywriting.", selected: true, verdict: "Selected", reason: "Dramatically reduces support calls." },
    ],
    researchCards: [
      { title: "Error Message Study", method: "Support Call Analysis", participants: 52, findings: "52% of payment failure calls were 'what does this mean?' Users wanted to know what specifically failed and how to resolve it.", confidence: 94 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Error Support Call Breakdown", detail: "/evidence/EV-026" },
    ],
    outcome: [
      { label: "Error Type Support Calls", from: "52%", to: "8%" },
      { label: "Self-resolution Rate", from: "12%", to: "78%" },
    ],
    aiSummary: "Support call analysis revealed 52% of payment failure calls were users asking what the generic error meant. Specific, actionable error messages reduced these calls to 8% and improved self-resolution from 12% to 78%.",
    relatedDecisions: ["DD-002", "DD-008", "DD-013", "DD-021"],
    tags: ["Errors", "Messages", "Payments", "Support", "UX Writing"],
    created: "19 May 2026", updated: "23 May 2026", sprint: 13,
    comments: [
      { who: "David Chen", text: "Error code mapping implemented." },
      { who: "Alex Kim", text: "12 error message variants written and tested." },
    ],
  },
  "DD-023": {
    id: "DD-023", title: "Add Payment Dashboard Widgets",
    problem: "The dashboard showed generic project metrics but no payment-specific widgets for monitoring daily transaction volumes, success rates, and pending items.",
    context: { why: "The dashboard was built for project overview, not payment operations monitoring.", who: "Requested by finance operations during dashboard feedback session.", biz: "Operators opened 3-4 different screens to get a complete payment status picture.", user: "Users wanted at-a-glance widgets showing today's payment volume, success rate, pending approvals, and failed transactions.", tech: "Payment data was available via API but no dashboard widgets consumed it." },
    summary: "Added payment operations widgets to the dashboard showing daily volume, success rate, pending approvals, and failures.",
    status: "Approved", impact: "Medium", confidence: 90, owner: "Sarah Lee",
    research: "RS-023 Dashboard Needs Analysis", evidence: "EV-027 Operator Screen Analysis",
    guideline: "Financial dashboards must include payment operations widgets showing volume, success rate, pending items, and failures.",
    figmaFiles: [
      { name: "Dashboard Payment Widgets", url: "#" },
    ],
    jira: { epic: "Operator Dashboard", sprint: 11, developer: "David Chen", status: "Done", completion: "9 May 2026" },
    alternatives: [
      { name: "Separate payments dashboard page", pros: "Dedicated space for payments.", cons: "Requires navigation; operators wanted central view.", selected: false, verdict: "Rejected", reason: "Fragments the experience." },
      { name: "Widgets on main dashboard", pros: "All info in one place; configurable.", cons: "Dashboard becomes busier.", selected: true, verdict: "Selected", reason: "Single-pane-of-glass approach." },
    ],
    researchCards: [
      { title: "Dashboard Needs Analysis", method: "User Interviews + Screen Tracking", participants: 12, findings: "Operators switched between 3-4 screens to monitor payments. Top requested widgets: today's volume, success rate %, pending approvals, recent failures.", confidence: 90 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Screen Switching Analysis", detail: "/evidence/EV-027" },
    ],
    outcome: [
      { label: "Screen Switching", from: "3.5 screens", to: "1 screen" },
      { label: "Monitoring Time", from: "12 min/hr", to: "3 min/hr" },
    ],
    aiSummary: "Operators switched between 3-4 screens to monitor payment status. Adding payment widgets to the main dashboard reduced screen switching to a single view and monitoring time from 12 to 3 minutes per hour.",
    relatedDecisions: ["DD-004", "DD-008", "DD-012", "DD-019"],
    tags: ["Dashboard", "Widgets", "Payments", "Monitoring", "Operations"],
    created: "6 May 2026", updated: "9 May 2026", sprint: 11,
    comments: [
      { who: "Sarah Lee", text: "Widget requirements gathered from operators." },
      { who: "David Chen", text: "Payment data API integrated." },
    ],
  },
  "DD-024": {
    id: "DD-024", title: "Implement Pagination for Large Invoice Lists",
    problem: "Invoice lists loaded all records at once, causing browser slowdown and crashes when users had thousands of invoices.",
    context: { why: "The invoice table loaded all results without pagination or virtual scrolling.", who: "Reported by AP team when the invoice count exceeded 5,000 records.", biz: "Pages with >2,000 invoices took 8+ seconds to load and sometimes crashed the browser.", user: "Users wanted fast, incremental loading with page navigation controls.", tech: "The API supported pagination (page/limit parameters) but the frontend ignored them." },
    summary: "Implemented server-side pagination for invoice lists with page navigation and configurable page size.",
    status: "Approved", impact: "Medium", confidence: 95, owner: "David Chen",
    research: "RS-024 Performance Benchmarking", evidence: "EV-028 Load Time Analysis",
    guideline: "Tables with potentially large datasets must use server-side pagination with configurable page size.",
    figmaFiles: [
      { name: "Pagination Component", url: "#" },
    ],
    jira: { epic: "Invoice Management", sprint: 10, developer: "David Chen", status: "Done", completion: "30 Apr 2026" },
    alternatives: [
      { name: "Virtual scrolling", pros: "Infinite scroll feel.", cons: "Complex implementation; users can't bookmark specific pages.", selected: false, verdict: "Rejected", reason: "Enterprise users expect page-based navigation." },
      { name: "Server-side pagination", pros: "Fast; predictable; bookmarkable.", cons: "Requires API integration.", selected: true, verdict: "Selected", reason: "Enterprise standard pattern." },
    ],
    researchCards: [
      { title: "Performance Benchmarking", method: "Load Testing", participants: 5000, findings: "Lists with >2,000 invoices loaded in 8.2 seconds. Browser tab crashed at 8,000 records.", confidence: 95 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Load Time Analysis Report", detail: "/evidence/EV-028" },
    ],
    outcome: [
      { label: "Page Load Time", from: "8.2 sec", to: "0.4 sec" },
      { label: "Browser Crashes", from: "12/wk", to: "0" },
    ],
    aiSummary: "Performance benchmarking showed invoice lists with >2,000 records loaded in 8.2 seconds and crashed at 8,000 records. Server-side pagination reduced load time to 0.4 seconds and eliminated browser crashes.",
    relatedDecisions: ["DD-006", "DD-011", "DD-016", "DD-020"],
    tags: ["Pagination", "Performance", "Invoices", "Tables", "Enterprise"],
    created: "26 Apr 2026", updated: "30 Apr 2026", sprint: 10,
    comments: [
      { who: "David Chen", text: "Pagination API integrated." },
      { who: "Alex Kim", text: "Page navigation component designed." },
    ],
  },
  "DD-025": {
    id: "DD-025", title: "Improve Invoice Search Relevance Ranking",
    problem: "Invoice search returned results sorted by date only, not by relevance. Users had to page through hundreds of results to find the most relevant match.",
    context: { why: "Search results were sorted by invoice date descending regardless of search query relevance.", who: "Raised by AP team after faceted filter implementation — relevance was the next pain point.", biz: "Users spent 40% of search time scanning irrelevant results.", user: "Users expected Google-like relevance sorting where best matches appear first.", tech: "The search API used simple SQL ORDER BY with no relevance scoring." },
    summary: "Implemented full-text search ranking with relevance scoring for invoice search results.",
    status: "Approved", impact: "Medium", confidence: 88, owner: "David Chen",
    research: "RS-025 Search Quality Study", evidence: "EV-029 Search Log Analysis",
    guideline: "Enterprise search must rank results by relevance using full-text scoring with configurable factors.",
    figmaFiles: [
      { name: "Search Results V2", url: "#" },
    ],
    jira: { epic: "Invoice Management", sprint: 12, developer: "David Chen", status: "Done", completion: "14 May 2026" },
    alternatives: [
      { name: "Date sorting only (existing)", pros: "Simple.", cons: "Not relevant to search queries.", selected: false, verdict: "Rejected", reason: "Doesn't address the problem." },
      { name: "Full-text relevance scoring", pros: "Best results first; fast find.", cons: "Requires PostgreSQL full-text search configuration.", selected: true, verdict: "Selected", reason: "Matches user expectations." },
    ],
    researchCards: [
      { title: "Search Quality Study", method: "Search Log Analysis", participants: 500, findings: "Users viewed an average of 3.2 pages of results before finding the right invoice. Top result was relevant only 28% of the time.", confidence: 88 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Search Log Analysis", detail: "/evidence/EV-029" },
    ],
    outcome: [
      { label: "Top Result Relevance", from: "28%", to: "82%" },
      { label: "Search Result Pages Viewed", from: "3.2", to: "1.1" },
    ],
    aiSummary: "Search log analysis showed the top result was relevant only 28% of the time — results were sorted by date, not relevance. Full-text relevance scoring improved top result relevance to 82% and reduced pages viewed from 3.2 to 1.1.",
    relatedDecisions: ["DD-006", "DD-016", "DD-020", "DD-024"],
    tags: ["Search", "Relevance", "Ranking", "Full-text", "Invoices"],
    created: "10 May 2026", updated: "14 May 2026", sprint: 12,
    comments: [
      { who: "David Chen", text: "PostgreSQL full-text search configured." },
      { who: "Alex Kim", text: "Search result UI updated for relevance display." },
    ],
  },
  "DD-026": {
    id: "DD-026", title: "Add AI Explanation of Payment Failures",
    problem: "When payments failed, users received an error code but no explanation of the underlying cause. Support had to manually investigate each failure.",
    context: { why: "Payment failures returned cryptic codes like ERR-4032 with no user-facing explanation.", who: "Proposed by Sarah Lee after seeing support investigation volumes.", biz: "Support spent 15 hours weekly investigating payment failures and explaining causes to users.", user: "Users wanted plain-English explanations of why their payment failed and how to resolve it.", tech: "Backend had detailed failure reason data but it was never surfaced to users." },
    summary: "Integrated AI-powered failure explanations that translate error codes into plain-English reasons and recovery steps.",
    status: "Approved", impact: "High", confidence: 87, owner: "Sarah Lee",
    research: "RS-026 Support Investigation Analysis", evidence: "EV-030 Failure Cause Data",
    guideline: "Payment failure screens must display AI-generated plain-English explanations with specific recovery actions.",
    figmaFiles: [
      { name: "AI Failure Explanation", url: "#" },
      { name: "Error Details Panel", url: "#" },
    ],
    jira: { epic: "AI Features", sprint: 14, developer: "David Chen", status: "In Progress", completion: "—" },
    alternatives: [
      { name: "Manual error code lookup table", pros: "Simple; no AI dependency.", cons: "Static; doesn't cover edge cases; requires maintenance.", selected: false, verdict: "Rejected", reason: "Less scalable than AI approach." },
      { name: "AI-powered explanation generator", pros: "Dynamic; covers all error scenarios; learns from new failures.", cons: "Requires AI API integration and prompt engineering.", selected: true, verdict: "Selected", reason: "Scalable and intelligent." },
    ],
    researchCards: [
      { title: "Support Investigation Analysis", method: "Time Tracking", participants: 15, findings: "Support spent 15 hours/week investigating payment failures. 70% of cases followed the same pattern — look up error code, check transaction logs, call user.", confidence: 87 },
    ],
    evidenceCards: [
      { type: "Analytics", title: "Failure Cause Data Analysis", detail: "/evidence/EV-030" },
    ],
    outcome: [
      { label: "Support Investigation Time", from: "15 hrs/wk", to: "3 hrs/wk" },
      { label: "User Self-resolution Rate", from: "5%", to: "62%" },
    ],
    aiSummary: "Support spent 15 hours weekly investigating payment failures with no user-facing explanations. AI-powered failure explanations reduced investigation time to 3 hours and enabled 62% user self-resolution with plain-English explanations.",
    relatedDecisions: ["DD-013", "DD-017", "DD-022", "DD-023"],
    tags: ["AI", "Payments", "Errors", "Explanations", "Support"],
    created: "26 May 2026", updated: "—", sprint: 14,
    comments: [
      { who: "Sarah Lee", text: "AI explanation concept validated with support team." },
      { who: "David Chen", text: "AI API integration in progress." },
    ],
  },
  "DD-027": {
    id: "DD-027", title: "Add Accessibility Labels to Payment Form Fields",
    problem: "Screen reader users could not complete the payment form because form fields lacked proper ARIA labels and accessible error associations.",
    context: { why: "Form fields were built with visual labels only — no ARIA attributes or semantic HTML associations.", who: "Identified during accessibility audit by Marcus.", biz: "Non-compliance with WCAG 4.1.2 (Name, Role, Value) exposed legal risk and excluded users with disabilities.", user: "Screen reader users reported the form was 'impossible to complete' independently.", tech: "Form inputs were wrapped in divs without proper label-element associations or aria-labelledby attributes." },
    summary: "Added comprehensive ARIA labels, error associations, and semantic HTML to all payment form fields.",
    status: "Approved", impact: "High", confidence: 96, owner: "Alex Kim",
    research: "RS-027 Screen Reader Usability Test", evidence: "EV-031 Accessibility Audit V2",
    guideline: "All form fields must have programmatically associated labels, ARIA error messages, and semantic HTML structure.",
    figmaFiles: [
      { name: "Accessible Form Components", url: "#" },
      { name: "ARIA Implementation Guide", url: "#" },
    ],
    jira: { epic: "Accessibility Compliance", sprint: 13, developer: "David Chen", status: "Done", completion: "21 May 2026" },
    alternatives: [
      { name: "Quick ARIA label fix only", pros: "Fast implementation.", cons: "Misses error associations and semantic structure.", selected: false, verdict: "Rejected", reason: "Partial fix." },
      { name: "Full semantic + ARIA overhaul", pros: "Complete WCAG 4.1.2 compliance; screen reader compatible.", cons: "Requires form component library update.", selected: true, verdict: "Selected", reason: "Only option achieving full compliance." },
    ],
    researchCards: [
      { title: "Screen Reader Usability Test", method: "Assistive Technology Testing", participants: 5, findings: "0 of 5 screen reader users could complete the payment form. All failed at the first input field with no accessible label.", confidence: 96 },
    ],
    evidenceCards: [
      { type: "Accessibility Audit", title: "Post-fix Accessibility Audit", detail: "/evidence/EV-031" },
    ],
    outcome: [
      { label: "Screen Reader Completion", from: "0%", to: "100%" },
      { label: "WCAG 4.1.2 Compliance", from: "Failed", to: "Passed" },
    ],
    aiSummary: "Screen reader testing found 0 of 5 users could complete the payment form due to missing ARIA labels and semantic structure. A full form accessibility overhaul achieved WCAG 4.1.2 compliance and 100% screen reader completion rate.",
    relatedDecisions: ["DD-007", "DD-014", "DD-020", "DD-022"],
    tags: ["Accessibility", "ARIA", "Screen Reader", "Forms", "WCAG"],
    created: "16 May 2026", updated: "21 May 2026", sprint: 13,
    comments: [
      { who: "Marcus", text: "Conducted pre and post-fix accessibility testing." },
      { who: "Alex Kim", text: "Form components rebuilt with semantic HTML." },
    ],
  },
};

export const decisions = Object.values(decisionById);

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
  { key: "evidence", label: "Evidence", icon: "📊", desc: "Data, metrics, or validation results supporting decisions." },
  { key: "guideline", label: "Guideline", icon: "📐", desc: "Reusable principles, patterns, or standards." },
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
