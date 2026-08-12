import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";
import "./App.css";
import Layout from "./components/Layout";

import Landing from "./pages/Landing";
import Dashboard from "./pages/Dashboard";
import KnowledgeHub from "./pages/KnowledgeHub";
import ProjectDetail from "./pages/ProjectDetail";
import ProjectDetailV2 from "./pages/ProjectDetailV2";
import ProjectDetailV3 from "./pages/ProjectDetailV3";
import ProjectDetailChapters from "./pages/ProjectDetailChapters";
import Chat from "./pages/Chat";
import DecisionDetail from "./pages/DecisionDetail";
import KnowledgeSection, { KnowledgeDetail } from "./pages/KnowledgeSection";
import KnowledgeGraph from "./pages/KnowledgeGraph";
import AddKnowledge from "./pages/AddKnowledge";
import Onboarding from "./pages/Onboarding";
import FigmaPlugin from "./pages/FigmaPlugin";

function Shell({ children }) {
  return <Layout>{children}</Layout>;
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/figma" element={<FigmaPlugin />} />
        <Route path="/dashboard" element={<Shell><Dashboard /></Shell>} />
        <Route path="/hub" element={<Shell><KnowledgeHub /></Shell>} />
        <Route path="/projects/:id/chapters" element={<Shell><ProjectDetailChapters /></Shell>} />
        <Route path="/projects/:id/v3" element={<Shell><ProjectDetailV3 /></Shell>} />
        <Route path="/projects/:id/v2" element={<Shell><ProjectDetailV2 /></Shell>} />
        <Route path="/projects/:id" element={<Shell><ProjectDetail /></Shell>} />
        <Route path="/projects/:projectId/knowledge" element={<Shell><KnowledgeSection type="all" /></Shell>} />
        <Route path="/projects/:projectId/decisions" element={<Shell><KnowledgeSection type="decisions" /></Shell>} />
        <Route path="/projects/:projectId/decisions/:decisionId" element={<Shell><KnowledgeDetail type="decisions" /></Shell>} />
        <Route path="/projects/:projectId/research" element={<Shell><KnowledgeSection type="research" /></Shell>} />
        <Route path="/projects/:projectId/research/:itemId" element={<Shell><KnowledgeDetail type="research" /></Shell>} />
        <Route path="/projects/:projectId/guidelines" element={<Shell><KnowledgeSection type="guidelines" /></Shell>} />
        <Route path="/projects/:projectId/guidelines/:itemId" element={<Shell><KnowledgeDetail type="guidelines" /></Shell>} />
        <Route path="/projects/:projectId/evidence" element={<Shell><KnowledgeSection type="evidence" /></Shell>} />
        <Route path="/projects/:projectId/evidence/:itemId" element={<Shell><KnowledgeDetail type="evidence" /></Shell>} />
        <Route path="/projects/:projectId/docs" element={<Shell><KnowledgeSection type="docs" /></Shell>} />
        <Route path="/projects/:projectId/docs/:itemId" element={<Shell><KnowledgeDetail type="docs" /></Shell>} />
        <Route path="/decisions/:id" element={<Shell><DecisionDetail /></Shell>} />
        <Route path="/chat" element={<Shell><Chat /></Shell>} />
        <Route path="/graph" element={<Shell><KnowledgeGraph /></Shell>} />
        <Route path="/add" element={<Shell><AddKnowledge /></Shell>} />
        <Route path="/onboarding" element={<Shell><Onboarding /></Shell>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
