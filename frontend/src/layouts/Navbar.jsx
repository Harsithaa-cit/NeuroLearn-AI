import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { 
  Brain, 
  BookOpen, 
  Lightbulb, 
  Sparkles, 
  Cpu, 
  HelpCircle, 
  Timer, 
  BarChart3, 
  Settings, 
  User, 
  Menu, 
  X,
  Flame,
  Moon,
  Sun
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';
import { useStudentProgress } from '../context/StudentProgressContext';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { settings, updateSetting } = useSettings();
  const { progress } = useStudentProgress();

  const navLinks = [
    { to: '/', label: 'Overview', icon: Sparkles },
    { to: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { to: '/learn', label: 'Learn', icon: BookOpen },
    { to: '/think-first', label: 'Think First', icon: Lightbulb, highlight: true },
    { to: '/ai-support', label: 'AI Support', icon: Cpu },
    { to: '/quiz', label: 'Quiz Arena', icon: HelpCircle },
    { to: '/focus', label: 'Focus Zone', icon: Timer },
    { to: '/analytics', label: 'Analytics', icon: BarChart3 },
    { to: '/settings', label: 'Settings', icon: Settings },
    { to: '/profile', label: 'Profile', icon: User }
  ];

  const toggleTheme = () => {
    updateSetting('theme', settings.theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <header className="sticky top-0 z-40 bg-white/85 dark:bg-slate-900/90 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-teal-400 flex items-center justify-center text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
              <Brain className="w-6 h-6" />
            </div>
            <div>
              <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white flex items-center gap-1.5">
                NEUROLEARN <span className="text-indigo-600 dark:text-indigo-400 font-extrabold">AI</span>
              </span>
              <p className="text-[10px] uppercase font-semibold tracking-wider text-slate-500 dark:text-slate-400">
                Neuroinclusive Learning
              </p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `px-3 py-1.5 rounded-lg text-sm font-medium transition-all flex items-center gap-1.5 ${
                      isActive
                        ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold shadow-xs'
                        : item.highlight
                        ? 'text-indigo-600 dark:text-indigo-400 hover:bg-indigo-50/50 dark:hover:bg-indigo-950/30'
                        : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800'
                    }`
                  }
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                  {item.highlight && (
                    <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Right Action Icons & Streak */}
          <div className="flex items-center space-x-3">
            {/* Streak Counter */}
            <div 
              className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-bold"
              title="Current Learning Streak (Days)"
            >
              <Flame className="w-4 h-4 text-amber-500 fill-amber-500" />
              <span>{progress.streakDays}d Streak</span>
            </div>

            {/* Quick Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle light and dark mode"
              className="p-2 rounded-lg text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 transition"
            >
              {settings.theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Mobile Menu Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 px-4 pt-2 pb-4 space-y-1 shadow-lg">
          {navLinks.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.to}
                to={item.to}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-3 py-2 rounded-lg text-base font-medium ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-950/60 dark:text-indigo-300 font-semibold'
                      : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </div>
      )}
    </header>
  );
}
