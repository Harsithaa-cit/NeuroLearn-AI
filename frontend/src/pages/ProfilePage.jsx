import React from 'react';
import { 
  User, 
  Award, 
  Flame, 
  Clock, 
  Brain, 
  CheckCircle2, 
  Sparkles, 
  ShieldCheck, 
  BookOpen, 
  Settings as SettingsIcon,
  Timer
} from 'lucide-react';
import { useStudentProgress } from '../context/StudentProgressContext';
import { useSettings } from '../context/SettingsContext';
import { Link } from 'react-router-dom';

export default function ProfilePage() {
  const { progress } = useStudentProgress();
  const { settings } = useSettings();

  const achievementIcons = {
    Award,
    Brain,
    Timer,
    Flame,
    Sparkles
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Profile Header Banner */}
      <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-700 via-indigo-800 to-purple-800 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white text-2xl font-extrabold border border-white/20 shadow-md">
              AR
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/15 text-indigo-100 text-[10px] font-bold uppercase tracking-wider mb-1">
                Student Profile • {progress.studentId}
              </div>
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
                {progress.studentName}
              </h1>
              <p className="text-xs text-indigo-200 mt-0.5">
                Focus Style: Visual Thinker • Self-Paced Exploration
              </p>
            </div>
          </div>

          <Link
            to="/settings"
            className="px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-semibold flex items-center gap-2 self-start sm:self-auto backdrop-blur-xs transition"
          >
            <SettingsIcon className="w-3.5 h-3.5" />
            <span>Edit Preferences</span>
          </Link>
        </div>
      </div>

      {/* Primary Telemetry Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Daily Streak</span>
          <div className="text-2xl font-extrabold text-amber-500 flex items-center justify-center gap-1">
            <Flame className="w-5 h-5 fill-amber-500" />
            <span>{progress.streakDays} Days</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Time</span>
          <div className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {progress.totalStudyMinutes} Mins
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Independent Solves</span>
          <div className="text-2xl font-extrabold text-purple-600 dark:text-purple-400">
            {progress.thinkFirstStats.independentSolves}
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs text-center">
          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Focus Sessions</span>
          <div className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">
            {progress.focusSessionsCompleted}
          </div>
        </div>
      </div>

      {/* Learning Preferences & Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Active Learning Configuration */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <span>Cognitive Preferences</span>
          </h2>

          <div className="space-y-2.5 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Preferred Mode:</span>
              <span className="font-bold text-indigo-600 dark:text-indigo-400 capitalize">
                {settings.preferredMode} Mode
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Theme:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 capitalize">
                {settings.theme} Mode
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Font Scale:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200 uppercase">
                {settings.fontSize}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 flex items-center justify-between">
              <span className="text-slate-600 dark:text-slate-300">Focus Interval:</span>
              <span className="font-bold text-teal-600 dark:text-teal-400">
                {settings.pomodoroWorkMinutes}m focus / {settings.pomodoroBreakMinutes}m break
              </span>
            </div>
          </div>
        </div>

        {/* Current Learning Goals */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Target Learning Goals</span>
          </h2>

          <div className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-1.5">
              <div className="flex justify-between font-bold">
                <span>Daily Study Target</span>
                <span>{progress.todayCompletedMinutes} / {progress.todayGoalMinutes} mins</span>
              </div>
              <div className="w-full bg-slate-200 dark:bg-slate-600 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-indigo-600 h-full rounded-full"
                  style={{ width: `${Math.min(100, Math.round((progress.todayCompletedMinutes / progress.todayGoalMinutes) * 100))}%` }}
                />
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 space-y-1.5">
              <div className="flex justify-between font-bold">
                <span>Think-First Scaffolding Target</span>
                <span>{progress.thinkFirstStats.independentSolves} solves completed</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Encourages independent thinking without immediately requesting full solutions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Badges & Achievements */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Award className="w-5 h-5 text-indigo-600" />
          <span>Unlocked Neuroinclusive Achievements</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {progress.achievements.map((ach) => {
            const Icon = achievementIcons[ach.icon] || Award;
            return (
              <div
                key={ach.id}
                className="p-4 rounded-2xl bg-indigo-50/60 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 flex items-start gap-3"
              >
                <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5">
                  <Icon className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    {ach.title}
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5 leading-snug">
                    {ach.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
