import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Footer from './layouts/Footer';

// Pages
import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import AdaptiveLearningPage from './pages/AdaptiveLearningPage';
import ThinkFirstPage from './pages/ThinkFirstPage';
import AiSupportPage from './pages/AiSupportPage';
import SmartHintPage from './pages/SmartHintPage';
import FocusZonePage from './pages/FocusZonePage';
import QuizArenaPage from './pages/QuizArenaPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';
import ProfilePage from './pages/ProfilePage';

import { SettingsProvider } from './context/SettingsContext';
import { StudentProgressProvider } from './context/StudentProgressContext';

export default function App() {
  return (
    <SettingsProvider>
      <StudentProgressProvider>
        <Router>
          <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 text-slate-800 dark:text-slate-100 transition-colors">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<LandingPage />} />
                <Route path="/dashboard" element={<DashboardPage />} />
                <Route path="/learn" element={<AdaptiveLearningPage />} />
                <Route path="/think-first" element={<ThinkFirstPage />} />
                <Route path="/ai-support" element={<AiSupportPage />} />
                <Route path="/smart-hints" element={<SmartHintPage />} />
                <Route path="/focus" element={<FocusZonePage />} />
                <Route path="/quiz" element={<QuizArenaPage />} />
                <Route path="/analytics" element={<AnalyticsPage />} />
                <Route path="/settings" element={<SettingsPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </StudentProgressProvider>
    </SettingsProvider>
  );
}
