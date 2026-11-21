import React from 'react';
import { Brain, ShieldCheck, Cpu, Cloud, Heart } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-200 dark:border-slate-800 bg-white/50 dark:bg-slate-900/50 backdrop-blur-sm text-slate-600 dark:text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand Info */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center text-white">
                <Brain className="w-5 h-5" />
              </div>
              <span className="font-bold text-slate-900 dark:text-white tracking-tight">NEUROLEARN AI</span>
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-300 max-w-md">
              Different minds. Different paths. One inclusive learning space. An adaptive platform designed to empower students with ADHD through cognitive scaffolding, progressive hints, and machine learning.
            </p>
            <div className="flex items-center gap-3 pt-2 text-xs text-slate-500 dark:text-slate-400">
              <span className="inline-flex items-center gap-1">
                <Cpu className="w-3.5 h-3.5 text-indigo-500" />
                Random Forest ML (100 Trees)
              </span>
              <span>•</span>
              <span className="inline-flex items-center gap-1">
                <Cloud className="w-3.5 h-3.5 text-teal-500" />
                Amazon S3 Deployable
              </span>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Learning Modules
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/learn" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Adaptive Learning Room</Link></li>
              <li><Link to="/think-first" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition font-medium text-indigo-600 dark:text-indigo-400">Think First Engine</Link></li>
              <li><Link to="/quiz" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Interactive Quiz Arena</Link></li>
              <li><Link to="/focus" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Focus Zone & Pomodoro</Link></li>
            </ul>
          </div>

          {/* Academic & Compliance */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white mb-3">
              Transparency
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/ai-support" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">ML Pipeline & Metrics</Link></li>
              <li><Link to="/analytics" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Student Learning Analytics</Link></li>
              <li><Link to="/settings" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Accessibility Preferences</Link></li>
              <li><Link to="/profile" className="hover:text-indigo-600 dark:hover:text-indigo-400 transition">Student Profile & Badges</Link></li>
            </ul>
          </div>
        </div>

        {/* Ethical Academic Disclaimer Banner */}
        <div className="p-4 rounded-xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700/60 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-3">
          <ShieldCheck className="w-5 h-5 text-indigo-500 shrink-0 mt-0.5" />
          <div>
            <strong className="text-slate-700 dark:text-slate-300">Ethical PBL Project & Clinical Disclaimer:</strong>{' '}
            NeuroLearn AI is an educational technology demonstration for academic project-based learning. Machine Learning predictions are experimental estimates of learning-support categories, not diagnoses, psychological evaluations, or clinical measurements. The system is designed to provide cognitive scaffolding and encourage independent problem-solving.
          </div>
        </div>

        <div className="mt-6 pt-6 border-t border-slate-200 dark:border-slate-800 text-center text-xs text-slate-400 dark:text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p>© {new Date().getFullYear()} NeuroLearn AI. Academic Machine Learning PBL Project.</p>
          <p className="flex items-center gap-1">
            Built with care for neurodivergent minds <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
          </p>
        </div>
      </div>
    </footer>
  );
}
