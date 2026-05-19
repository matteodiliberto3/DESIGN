import { useState } from 'react';
import LabShell from './layout/LabShell';
import type { LabView } from './types';
import DashboardPage from './pages/DashboardPage';
import OnboardingPage from './pages/OnboardingPage';
import WorkspacePage from './pages/WorkspacePage';
import FeaturesPage from './pages/FeaturesPage';
import PlaybookPage from './pages/PlaybookPage';
import FlowsPage from './pages/FlowsPage';
import SpeedWavePage from './pages/SpeedWavePage';

export default function LabApp() {
    const [view, setView] = useState<LabView>('dashboard');

    return (
        <LabShell current={view} onNavigate={setView}>
            {view === 'dashboard' && <DashboardPage onNavigate={setView} />}
            {view === 'onboarding' && <OnboardingPage />}
            {view === 'workspace' && <WorkspacePage />}
            {view === 'features' && <FeaturesPage />}
            {view === 'playbook' && <PlaybookPage />}
            {view === 'flows' && <FlowsPage />}
            {view === 'speedwave' && <SpeedWavePage />}
        </LabShell>
    );
}
