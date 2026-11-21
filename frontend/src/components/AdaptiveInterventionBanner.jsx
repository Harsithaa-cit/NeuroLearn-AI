import React from 'react';
import { Sparkles, Coffee, ArrowRight, X, ShieldAlert, CheckCircle2, HelpCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export default function AdaptiveInterventionBanner({ predictionData, onDismiss, onAction }) {
  const navigate = useNavigate();

  if (!predictionData) return null;

  const { prediction, confidence, probabilities, recommended_intervention, interventionConfig } = predictionData;

  const colorStyles = {
    Low: 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200',
    Medium: 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 dark:border-amber-800 text-amber-900 dark:text-amber-200',
    High: 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-900 dark:text-rose-200'
  }[prediction] || 'bg-indigo-50 border-indigo-200 text-indigo-900';

  const badgeStyles = {
    Low: 'bg-emerald-100 dark:bg-emerald-900 text-emerald-800 dark:text-emerald-300',
    Medium: 'bg-amber-100 dark:bg-amber-900 text-amber-800 dark:text-amber-300',
    High: 'bg-rose-100 dark:bg-rose-900 text-rose-800 dark:text-rose-300'
  }[prediction] || 'bg-indigo-100 text-indigo-800';

  return (
    <div className={`p-4 rounded-2xl border ${colorStyles} shadow-sm my-4 transition-all animate-fadeIn`}>
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-xl bg-white dark:bg-slate-800 shadow-xs shrink-0 mt-0.5">
            {prediction === 'Low' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            {prediction === 'Medium' && <HelpCircle className="w-5 h-5 text-amber-500" />}
            {prediction === 'High' && <ShieldAlert className="w-5 h-5 text-rose-500" />}
          </div>
          <div>
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${badgeStyles}`}>
                ML Support: {prediction} Friction
              </span>
              <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
                ({Math.round(confidence * 100)}% model confidence)
              </span>
            </div>
            <p className="text-sm font-semibold text-slate-900 dark:text-slate-100 mb-1">
              {recommended_intervention}
            </p>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              {interventionConfig?.description}
            </p>
          </div>
        </div>

        {onDismiss && (
          <button
            onClick={onDismiss}
            className="p-1 rounded-lg hover:bg-black/5 dark:hover:bg-white/10 text-slate-400 hover:text-slate-600 transition"
            aria-label="Dismiss intervention suggestion"
          >
            <X className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Action buttons */}
      <div className="mt-3 pt-3 border-t border-black/5 dark:border-white/10 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
          <span>Random Forest:</span>
          <span>Low: {Math.round((probabilities?.Low || 0) * 100)}%</span>
          <span>•</span>
          <span>Med: {Math.round((probabilities?.Medium || 0) * 100)}%</span>
          <span>•</span>
          <span>High: {Math.round((probabilities?.High || 0) * 100)}%</span>
        </div>

        <div className="flex items-center gap-2">
          {prediction === 'High' && (
            <button
              onClick={() => navigate('/focus')}
              className="px-3 py-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Coffee className="w-3.5 h-3.5 text-rose-500" />
              <span>Take a 5-Min Break</span>
            </button>
          )}

          {onAction && (
            <button
              onClick={onAction}
              className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition"
            >
              <span>Explore Scaffolding</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
