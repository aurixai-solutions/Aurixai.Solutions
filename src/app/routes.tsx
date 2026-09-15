import React from "react";
import { createHashRouter, Outlet } from "react-router";
import { Layout } from "./components/Layout";
import { PasswordGate } from "./components/auth/PasswordGate";
import { Home } from "./pages/Home";
import { Solutions } from "./pages/Solutions";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { PolicyManagement } from "./pages/PolicyManagement";
import { DynamicPage } from "./pages/DynamicPage";
import { IndustryPage } from "./pages/IndustryPage";
import { CompliancePage } from "./pages/CompliancePage";
import { NavTraxPage } from "./pages/NavTraxPage";
import { DefogFluidityPage } from "./pages/DefogFluidityPage";
import { DefogShieldPage } from "./pages/DefogShieldPage";
import { SkylaneOneEngineeringPage } from "./pages/SkylaneOneEngineeringPage";
import { Explainability } from "./pages/Explainability";
import { IndustriesHubPage } from "./pages/IndustriesHubPage";
import { StartHerePage } from "./pages/StartHerePage";
import { StepByStepLearningPage } from "./pages/StepByStepLearningPage";
import { RealTimeMonitoringPage } from "./pages/RealTimeMonitoringPage";
import { SecurityProfilesPage } from "./pages/SecurityProfilesPage";
import { SolutionDemosPage } from "./pages/SolutionDemosPage";
import { DecisionScapePage } from "./pages/DecisionScapePage";
import { ComingSoonPage } from "./pages/ComingSoonPage";
import { DeveloperEcosystemPage } from "./pages/DeveloperEcosystemPage";
import { ApiDocsPage } from "./pages/ApiDocsPage";
import { CareersPage } from "./pages/CareersPage";
import { CaseStudiesPage } from "./pages/CaseStudiesPage";
import { PatentPortfolioPage } from "./pages/PatentPortfolioPage";
import { AdvertisementsPage } from "./pages/AdvertisementsPage";
import { VideoShowcasePage } from "./pages/VideoShowcasePage";
import { RegulatoryCompliancePage } from "./pages/RegulatoryCompliancePage";
import { RegulatoryComplianceLearningPage } from "./pages/RegulatoryComplianceLearningPage";
import { DataSovereigntyPage } from "./pages/DataSovereigntyPage";
import { HallucinationMitigationPage } from "./pages/HallucinationMitigationPage";
import { LearnDataLandscapePage } from "./pages/learn/LearnDataLandscapePage";
import { LearnWhatIsDataGovernancePage } from "./pages/learn/LearnWhatIsDataGovernancePage";
import { LearnWhatIsDataQualityPage } from "./pages/learn/LearnWhatIsDataQualityPage";

export const router = createHashRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      { index: true, element: <Home /> },
      { path: "solutions", element: <Solutions /> },
      { path: "solutions/navtrax", element: <NavTraxPage /> },
      { path: "solutions/defog-fluidity", element: <DefogFluidityPage /> },
      { path: "solutions/defog-shield", element: <DefogShieldPage /> },
      { path: "solutions/skylane-one", element: <SkylaneOneEngineeringPage /> },
      { path: "solutions/agenta", element: <AgentaBlankPage /> },
      { path: "about", element: <About /> },
      { path: "about/explainability", element: <Explainability /> },
      { path: "about/team/:memberId", lazy: async () => { const { TeamMemberPage } = await import("./pages/TeamMemberPage"); return { Component: TeamMemberPage }; } },
      { path: "contact", element: <Contact /> },
      { path: "policy-management", element: <PolicyManagement /> },
      { path: "industries", element: <IndustriesHubPage /> },
      { path: "industries/:slug", element: <IndustryPage /> },
      { path: "compliance/:slug", element: <CompliancePage /> },
      { path: "start-here", element: <StartHerePage /> },
      { path: "solutions/data-sovereignty", element: <DataSovereigntyPage /> },
      { path: "solutions/hallucination-mitigation", element: <HallucinationMitigationPage /> },
      { path: "solutions/real-time-monitoring", element: <RealTimeMonitoringPage /> },
      { path: "solutions/security-profiles", element: <SecurityProfilesPage /> },
      { path: "solutions/demos", element: <SolutionDemosPage /> },
      { path: "decisionscape", element: <DecisionScapePage /> },
      { path: "solutions/data-governance", element: <ComingSoonPage /> },
      { path: "solutions/data-quality", element: <ComingSoonPage /> },
      { path: "solutions/marketing-intelligence", element: <ComingSoonPage /> },
      { path: "solutions/agentic-frameworks", element: <DeveloperEcosystemPage /> },
      { path: "solutions/cybersecurity", element: <SecurityProfilesPage /> },
      { path: "solutions/industries", element: <IndustriesHubPage /> },
      { path: "learn", element: <StepByStepLearningPage /> },
      { path: "learn/data-landscape", element: <LearnDataLandscapePage /> },
      { path: "learn/what-is-data-governance", element: <LearnWhatIsDataGovernancePage /> },
      { path: "learn/what-is-data-quality", element: <LearnWhatIsDataQualityPage /> },
      { path: "learn/regulatory-compliance", element: <RegulatoryComplianceLearningPage /> },
      { path: "learn/step-by-step", element: <StepByStepLearningPage /> },
      { path: "developer-ecosystem", element: <DeveloperEcosystemPage /> },
      { path: "api-docs", element: <ApiDocsPage /> },
      { path: "careers", element: <CareersPage /> },
      { path: "case-studies", element: <CaseStudiesPage /> },
      { path: "patents", element: <PatentPortfolioPage /> },
      { path: "media", element: <AdvertisementsPage /> },
      { path: "video-showcase", element: <VideoShowcasePage /> },
      { path: "coming-soon", element: <ComingSoonPage /> },
      { path: "regulatory-compliance", element: <RegulatoryCompliancePage /> },
      { path: "page/:slug", element: <DynamicPage /> },
      { path: "solutions/*", element: <DynamicPage /> },
      { path: "*", element: <DynamicPage /> },
    ],
  },
]);

function Root() {
  return (
    <PasswordGate>
      <Layout>
        <Outlet />
      </Layout>
    </PasswordGate>
  );
}

function AgentaBlankPage() {
  return <div className="min-h-screen bg-slate-900 text-slate-300 p-12 text-center">
    <h1 className="text-3xl font-bold text-white mb-4">Agenta.Red</h1>
    <p>This page is being rebuilt.</p>
  </div>;
}
