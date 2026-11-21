import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Flame, 
  Clock, 
  BookOpen, 
  Award, 
  Lightbulb, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles,
  Timer,
  BarChart3,
  Brain
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer,
  CartesianGrid 
} from 'recharts';
import { useStudentProgress } from '../context/StudentProgressContext';
import { CURRICULUM } from '../data/curriculumData';
import { getPredictionHistory } from '../services/predictionService';

export default function DashboardPage() {
  const { progress } = useStudentProgress();
  const predictions = getPredictionHistory();
  const recentPrediction = predictions.length > 0 ? predictions[0] : null;

  // Next recommended lesson from curriculum
  const allLessons = CURRICULUM.flatMap(s => s.lessons.map(l => ({ ...l, subjectTitle: s.title, subjectId: s.id })));
  const nextLesson = allLessons.find(l => !progress.completedLessons.includes(l.id)) || allLessons[0];

  const goalPercentage = Math.min(100, Math.round((progress.todayCompletedMinutes / progress.todayGoalMinutes) * 100));

  return (
    <div className="space-y-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Welcome Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-indigo-600 via-indigo-700 to-purple-700 text-white shadow-xl relative overflow-hidden">
        <div className="relative z-10 space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 text-indigo-100 text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Welcome back, {progress.studentName}</span>
          </div>
          <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight">
            Today's Learning Space
          </h1>
          <p className="text-indigo-100 text-sm sm:text-base leading-relaxed">
            Your focus rhythm is steady. Take your time, discover ideas step-by-step, and remember that thinking time is where true learning happens.
          </p>
        </div>

        {/* Daily Goal Mini Card */}
        <div className="relative z-10 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 min-w-[220px]">
          <div className="flex items-center justify-between text-xs font-semibold mb-2 text-indigo-100">
            <span>Daily Goal</span>
            <span>{progress.todayCompletedMinutes} / {progress.todayGoalMinutes} mins</span>
          </div>
          <div className="w-full bg-white/20 h-2.5 rounded-full overflow-hidden">
            <div 
              className="bg-emerald-400 h-full rounded-full transition-all duration-500"
              style={{ width: `${goalPercentage}%` }}
            />
          </div>
          <p className="text-[11px] text-indigo-200 mt-2 font-medium">
            {goalPercentage >= 100 ? '🎉 Goal achieved today!' : `${progress.todayGoalMinutes - progress.todayCompletedMinutes} mins remaining`}
          </p>
        </div>
      </div>

      {/* Primary KPI Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Streak</span>
            <div className="p-2 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-500">
              <Flame className="w-5 h-5 fill-amber-500" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {progress.streakDays} <span className="text-sm font-semibold text-slate-500">Days</span>
          </div>
          <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1 font-medium">Active & consistent</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Total Study</span>
            <div className="p-2 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-500">
              <Clock className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {progress.totalStudyMinutes} <span className="text-sm font-semibold text-slate-500">Mins</span>
          </div>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">Self-paced learning</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Completed</span>
            <div className="p-2 rounded-xl bg-teal-50 dark:bg-teal-950/60 text-teal-500">
              <CheckCircle2 className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {progress.completedLessons.length} <span className="text-sm font-semibold text-slate-500">Lessons</span>
          </div>
          <p className="text-xs text-teal-600 dark:text-teal-400 mt-1 font-medium">Across 5 subjects</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between mb-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">Independent</span>
            <div className="p-2 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-500">
              <Brain className="w-5 h-5" />
            </div>
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            {progress.thinkFirstStats.independentSolves} <span className="text-sm font-semibold text-slate-500">Solves</span>
          </div>
          <p className="text-xs text-purple-600 dark:text-purple-400 mt-1 font-medium">Think-First success</p>
        </div>
      </div>

      {/* Main Grid: Weekly Activity Chart & Next Lesson */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Weekly Chart */}
        <div className="lg:col-span-2 p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                Weekly Study Consistency
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Active learning minutes logged each day
              </p>
            </div>
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              Last 7 Days
            </span>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={progress.weeklyActivity} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                <XAxis dataKey="day" stroke="#94a3b8" fontSize={12} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={12} tickLine={false} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    borderRadius: '0.75rem', 
                    border: 'none', 
                    color: '#fff',
                    fontSize: '12px' 
                  }} 
                />
                <Bar dataKey="minutes" fill="#6366f1" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Continue Learning Next Lesson */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700/80 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
                Continue Learning
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {nextLesson.durationMinutes} mins
              </span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
              {nextLesson.title}
            </h3>

            <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              {nextLesson.summary}
            </p>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-700/40 text-xs text-slate-600 dark:text-slate-300 mb-6">
              <strong className="block text-slate-800 dark:text-slate-200 mb-1">Subject:</strong>
              {nextLesson.subjectTitle} • {nextLesson.difficulty}
            </div>
          </div>

          <Link
            to="/learn"
            className="w-full py-3 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-xs transition"
          >
            <span>Resume Lesson</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>

      {/* Adaptive Learning Support Insights (ML Connected) */}
      <div className="p-6 rounded-3xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/80">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="p-2 rounded-xl bg-indigo-100 dark:bg-indigo-950/80 text-indigo-600 dark:text-indigo-400">
              <Brain className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Adaptive ML Learning-Support Insights
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Estimated support level calculated by our trained Random Forest model
              </p>
            </div>
          </div>
          <Link
            to="/ai-support"
            className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
          >
            <span>View ML Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentPrediction ? (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                recentPrediction.prediction === 'Low' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                recentPrediction.prediction === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
              }`}>
                Latest Prediction: {recentPrediction.prediction} Cognitive Support
              </span>
              <span className="text-xs text-slate-400 font-mono">
                {new Date(recentPrediction.timestamp).toLocaleTimeString()}
              </span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 mb-2">
              <strong>Recommendation:</strong> {recentPrediction.recommended_intervention}
            </p>
            <div className="flex items-center gap-4 text-[11px] text-slate-500">
              <span>Time on task: {recentPrediction.features?.time_spent_on_task}s</span>
              <span>•</span>
              <span>Engagement: {Math.round((recentPrediction.features?.engagement_level || 0) * 100)}%</span>
              <span>•</span>
              <span>Accuracy: {Math.round((recentPrediction.features?.accuracy_of_responses || 0) * 100)}%</span>
            </div>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-sm text-slate-600 dark:text-slate-300 flex items-center justify-between">
            <div>
              <p className="font-semibold text-slate-800 dark:text-slate-200">
                Ready to adapt to your learning flow.
              </p>
              <p className="text-xs text-slate-500">
                Complete a lesson or quiz activity to generate calibrated Random Forest predictions.
              </p>
            </div>
            <Link
              to="/learn"
              className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold hover:bg-indigo-100 transition"
            >
              Start Lesson
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
