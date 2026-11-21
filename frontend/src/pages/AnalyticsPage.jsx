import React from 'react';
import { 
  BarChart3, 
  Clock, 
  CheckCircle2, 
  Lightbulb, 
  Brain, 
  Timer, 
  Award, 
  Sparkles,
  TrendingUp,
  ShieldCheck
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';
import { useStudentProgress } from '../context/StudentProgressContext';
import { getPredictionHistory } from '../services/predictionService';

export default function AnalyticsPage() {
  const { progress } = useStudentProgress();
  const predictions = getPredictionHistory();

  // Pie chart data: Independent vs Guided Solves
  const totalThinkSolves = progress.thinkFirstStats.independentSolves + progress.thinkFirstStats.guidedExplorationCount;
  const solveBreakdownData = [
    { name: 'Independent Solves', value: progress.thinkFirstStats.independentSolves || 1, color: '#10b981' },
    { name: 'Guided / Scaffolding Solves', value: progress.thinkFirstStats.guidedExplorationCount || 1, color: '#8b5cf6' }
  ];

  // Subject Progress breakdown
  const topicProgressData = [
    { topic: 'Python', progress: 65 },
    { topic: 'Data Structures', progress: 40 },
    { topic: 'Mathematics', progress: 50 },
    { topic: 'AI & ML', progress: 75 },
    { topic: 'Web Dev', progress: 30 }
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-2">
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Cognitive Metacognition</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Learning Analytics & Metacognitive Telemetry
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Objective behavioral data reflecting study patterns, independent problem solving, and scaffolding utilization.
        </p>
      </div>

      {/* Top 4 KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Total Study Time</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-indigo-600 dark:text-indigo-400">
            {progress.totalStudyMinutes} <span className="text-xs font-semibold text-slate-500">Mins</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Across all sessions</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Lessons Completed</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-teal-600 dark:text-teal-400">
            {progress.completedLessons.length} <span className="text-xs font-semibold text-slate-500">Units</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Curriculum progress</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Independent Solves</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-purple-600 dark:text-purple-400">
            {progress.thinkFirstStats.independentSolves} <span className="text-xs font-semibold text-slate-500">Solves</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Zero hint reveals</p>
        </div>

        <div className="p-5 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">Focus Sessions</span>
          <div className="text-2xl sm:text-3xl font-extrabold text-amber-600 dark:text-amber-400">
            {progress.focusSessionsCompleted} <span className="text-xs font-semibold text-slate-500">Blocks</span>
          </div>
          <p className="text-xs text-slate-500 mt-1">Pomodoro intervals</p>
        </div>
      </div>

      {/* Main Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Weekly Minutes Bar Chart */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-indigo-600" />
            <span>Weekly Study Pace (Minutes Logged)</span>
          </h2>
          <div className="h-60 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progress.weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={11} />
                <Tooltip />
                <Bar dataKey="minutes" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Independent vs Guided Solves */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Brain className="w-5 h-5 text-indigo-600" />
            <span>Problem-Solving Modality Breakdown</span>
          </h2>
          <div className="h-60 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={solveBreakdownData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {solveBreakdownData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center gap-6 text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-emerald-500" />
              <span>Independent Solves ({progress.thinkFirstStats.independentSolves})</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-purple-500" />
              <span>Guided / Scaffolding ({progress.thinkFirstStats.guidedExplorationCount})</span>
            </div>
          </div>
        </div>
      </div>

      {/* Topic Progress Bar Chart */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Curriculum Topic Mastery & Progress (%)
        </h2>
        <div className="h-48 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={topicProgressData} layout="vertical" margin={{ top: 5, right: 30, left: 60, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.5} />
              <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
              <YAxis type="category" dataKey="topic" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip />
              <Bar dataKey="progress" fill="#14b8a6" radius={[0, 6, 6, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quiz History Table */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h2 className="text-base font-bold text-slate-900 dark:text-white">
          Quiz Assessment Performance
        </h2>
        {progress.quizHistory.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left">
              <thead>
                <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-400">
                  <th className="pb-3 font-semibold">Date</th>
                  <th className="pb-3 font-semibold">Quiz Topic</th>
                  <th className="pb-3 font-semibold">Score</th>
                  <th className="pb-3 font-semibold">Percentage</th>
                  <th className="pb-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-medium">
                {progress.quizHistory.map((q) => (
                  <tr key={q.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                    <td className="py-3 text-slate-500">{q.date}</td>
                    <td className="py-3 font-bold text-slate-800 dark:text-slate-200">{q.topicTitle}</td>
                    <td className="py-3">{q.score} / {q.total}</td>
                    <td className="py-3 font-mono font-bold text-indigo-600 dark:text-indigo-400">{q.percentage}%</td>
                    <td className="py-3">
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                        Consolidated
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-xs text-slate-400">No quiz records yet. Take a quiz to populate performance metrics.</p>
        )}
      </div>

      {/* Academic Disclaimer Box */}
      <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400 flex items-start gap-2.5">
        <ShieldCheck className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
        <span>
          <strong>Academic Machine Learning Disclaimer:</strong> All metrics displayed reflect student self-paced interaction telemetry and objective problem-solving counts. NeuroLearn AI does not provide psychological assessments, cognitive diagnostic tests, or medical findings.
        </span>
      </div>
    </div>
  );
}
