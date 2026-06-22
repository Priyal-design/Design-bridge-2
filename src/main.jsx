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
import Chat from "./pages/Chat";
import DecisionDetail from "./pages/DecisionDetail";
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
        <Route path="/projects/:id" element={<Shell><ProjectDetail /></Shell>} />
        <Route path="/chat" element={<Shell><Chat /></Shell>} />
        <Route path="/decisions/:id" element={<Shell><DecisionDetail /></Shell>} />
        <Route path="/graph" element={<Shell><KnowledgeGraph /></Shell>} />
        <Route path="/add" element={<Shell><AddKnowledge /></Shell>} />
        <Route path="/onboarding" element={<Shell><Onboarding /></Shell>} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
