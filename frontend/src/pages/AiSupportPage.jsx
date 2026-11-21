import React, { useState, useEffect } from 'react';
import { 
  Cpu, 
  Activity, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldAlert, 
  BarChart3, 
  RefreshCw, 
  Layers, 
  Sliders, 
  Sparkles,
  ArrowRight,
  Database,
  Info
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  Tooltip, 
  ResponsiveContainer, 
  CartesianGrid, 
  Cell 
} from 'recharts';
import { 
  checkBackendHealth, 
  fetchModelInfo, 
  sendFrustrationPrediction 
} from '../services/api';
import { getPredictionHistory, clearPredictionHistory } from '../services/predictionService';

export default function AiSupportPage() {
  // Backend & Model Metadata state
  const [healthData, setHealthData] = useState(null);
  const [modelInfo, setModelInfo] = useState(null);
  const [isLoadingHealth, setIsLoadingHealth] = useState(true);
  const [apiError, setApiError] = useState(null);

  // Interactive Live Prediction Sandbox Form
  const [timeSpent, setTimeSpent] = useState(45);
  const [engagement, setEngagement] = useState(0.65);
  const [accuracy, setAccuracy] = useState(0.70);

  // Real API Prediction result
  const [predictionResult, setPredictionResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictError, setPredictError] = useState(null);

  // Session History
  const [history, setHistory] = useState([]);

  const loadBackendStatus = async () => {
    setIsLoadingHealth(true);
    setApiError(null);

    const healthRes = await checkBackendHealth();
    if (healthRes.success) {
      setHealthData(healthRes.data);
      const infoRes = await fetchModelInfo();
      if (infoRes.success) {
        setModelInfo(infoRes.data);
      }
    } else {
      setApiError(healthRes.error);
    }
    setIsLoadingHealth(false);
    setHistory(getPredictionHistory());
  };

  useEffect(() => {
    loadBackendStatus();
  }, []);

  const handleTestPrediction = async (e) => {
    if (e) e.preventDefault();
    setIsPredicting(true);
    setPredictError(null);

    const res = await sendFrustrationPrediction({
      time_spent_on_task: timeSpent,
      engagement_level: engagement,
      accuracy_of_responses: accuracy
    });

    setIsPredicting(false);

    if (res.success) {
      setPredictionResult(res.data);
      setHistory(getPredictionHistory());
    } else {
      setPredictError(res.error || 'Inference failed on Flask API server.');
    }
  };

  const handleClearHistory = () => {
    clearPredictionHistory();
    setHistory([]);
  };

  // Format probabilities for chart
  const probChartData = predictionResult?.probabilities
    ? [
        { name: 'Low Friction', key: 'Low', prob: Math.round((predictionResult.probabilities.Low || 0) * 100), color: '#10b981' },
        { name: 'Medium Friction', key: 'Medium', prob: Math.round((predictionResult.probabilities.Medium || 0) * 100), color: '#f59e0b' },
        { name: 'High Friction', key: 'High', prob: Math.round((predictionResult.probabilities.High || 0) * 100), color: '#f43f5e' }
      ]
    : [];

  // Format feature importances for chart
  const importanceChartData = modelInfo?.feature_importances
    ? [
        { feature: 'Time Spent', importance: Math.round(modelInfo.feature_importances.time_spent_on_task * 100) },
        { feature: 'Response Accuracy', importance: Math.round(modelInfo.feature_importances.accuracy_of_responses * 100) },
        { feature: 'Engagement Level', importance: Math.round(modelInfo.feature_importances.engagement_level * 100) }
      ]
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
            <Cpu className="w-7 h-7 text-indigo-600" />
            <span>AI Learning Support Dashboard</span>
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Real Random Forest model pipeline, live inference testing sandbox, and evaluation telemetry.
          </p>
        </div>

        <button
          onClick={loadBackendStatus}
          className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 text-slate-700 dark:text-slate-300 text-xs font-semibold self-start sm:self-auto transition shadow-xs"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isLoadingHealth ? 'animate-spin' : ''}`} />
          <span>Refresh API Status</span>
        </button>
      </div>

      {/* Backend Status Card */}
      <div className={`p-5 rounded-3xl border ${
        healthData?.model_available
          ? 'bg-emerald-50/70 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200'
          : 'bg-rose-50 dark:bg-rose-950/40 border-rose-200 dark:border-rose-800 text-rose-950 dark:text-rose-200'
      }`}>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-2xl ${
              healthData?.model_available ? 'bg-emerald-500 text-white' : 'bg-rose-500 text-white'
            }`}>
              <Activity className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-sm sm:text-base">
                  Flask Backend API: {healthData?.model_available ? 'Connected & Operational' : 'API Unreachable'}
                </h3>
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold uppercase ${
                  healthData?.model_available ? 'bg-emerald-200 dark:bg-emerald-900 text-emerald-900 dark:text-emerald-200' : 'bg-rose-200 text-rose-900'
                }`}>
                  {healthData?.model_available ? 'Model Loaded' : 'Offline'}
                </span>
              </div>
              <p className="text-xs opacity-90 mt-0.5">
                {healthData?.model_available 
                  ? `Algorithm: ${healthData.model_name} (Version ${healthData.model_version}) • 100 Estimators` 
                  : `Error: ${apiError || 'Flask server is not responding at configured host.'}`}
              </p>
            </div>
          </div>

          {healthData?.evaluation_summary && (
            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-emerald-200/60 dark:border-emerald-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Test Accuracy</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                  {Math.round(healthData.evaluation_summary.accuracy * 1000) / 10}%
                </span>
              </div>
              <div className="p-2 rounded-xl bg-white/70 dark:bg-slate-900/60 border border-emerald-200/60 dark:border-emerald-800">
                <span className="text-slate-500 dark:text-slate-400 block text-[10px]">Macro F1 Score</span>
                <span className="text-emerald-600 dark:text-emerald-400 font-extrabold text-sm">
                  {Math.round(healthData.evaluation_summary.macro_f1 * 1000) / 10}%
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Visual ML Pipeline Architecture Diagram */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
          <Layers className="w-4 h-4" />
          <span>NeuroLearn AI Live Cognitive Architecture</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 text-center">
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/50 border border-slate-200 dark:border-slate-600">
            <span className="text-[10px] font-bold uppercase text-slate-400 block mb-1">Step 1</span>
            <h5 className="font-bold text-xs text-slate-800 dark:text-slate-200">Student Interaction</h5>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
              Active clicks, time elapsed, hints opened, responses.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800">
            <span className="text-[10px] font-bold uppercase text-indigo-500 block mb-1">Step 2</span>
            <h5 className="font-bold text-xs text-indigo-900 dark:text-indigo-200">Feature Extraction</h5>
            <p className="text-[11px] text-indigo-800 dark:text-indigo-300 mt-1">
              Computes Time, Engagement, and Accuracy proportion.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800">
            <span className="text-[10px] font-bold uppercase text-purple-500 block mb-1">Step 3</span>
            <h5 className="font-bold text-xs text-purple-900 dark:text-purple-200">Random Forest</h5>
            <p className="text-[11px] text-purple-800 dark:text-purple-300 mt-1">
              100 balanced decision trees evaluate the feature vector.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200 dark:border-teal-800">
            <span className="text-[10px] font-bold uppercase text-teal-500 block mb-1">Step 4</span>
            <h5 className="font-bold text-xs text-teal-900 dark:text-teal-200">Class Probabilities</h5>
            <p className="text-[11px] text-teal-800 dark:text-teal-300 mt-1">
              Outputs Low, Medium, or High confidence scores.
            </p>
          </div>

          <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800">
            <span className="text-[10px] font-bold uppercase text-amber-500 block mb-1">Step 5</span>
            <h5 className="font-bold text-xs text-amber-900 dark:text-amber-200">Adaptive Support</h5>
            <p className="text-[11px] text-amber-800 dark:text-amber-300 mt-1">
              Adjusts hints, visual models, or suggests calm breaks.
            </p>
          </div>
        </div>
      </div>

      {/* Main Grid: Live Prediction Sandbox & Prediction Output */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Interactive Prediction Sandbox Form */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Sliders className="w-5 h-5 text-indigo-600" />
              <span>Live Inference Testing Sandbox</span>
            </h2>
            <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300">
              Interactive Form
            </span>
          </div>

          <form onSubmit={handleTestPrediction} className="space-y-5">
            {/* Feature 1: Time Spent */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">1. time_spent_on_task:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">{timeSpent} seconds</span>
              </div>
              <input
                type="range"
                min="10"
                max="180"
                step="1"
                value={timeSpent}
                onChange={(e) => setTimeSpent(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>10s (Fast flow)</span>
                <span>90s (Deliberation)</span>
                <span>180s (Prolonged)</span>
              </div>
            </div>

            {/* Feature 2: Engagement Level */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">2. engagement_level:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">{engagement.toFixed(2)}</span>
              </div>
              <input
                type="range"
                min="0.10"
                max="1.00"
                step="0.05"
                value={engagement}
                onChange={(e) => setEngagement(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0.10 (Disengaged)</span>
                <span>0.55 (Moderate)</span>
                <span>1.00 (High focus)</span>
              </div>
            </div>

            {/* Feature 3: Accuracy of Responses */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-700 dark:text-slate-300">3. accuracy_of_responses:</span>
                <span className="text-indigo-600 dark:text-indigo-400 font-mono font-bold">{accuracy.toFixed(2)} ({Math.round(accuracy * 100)}%)</span>
              </div>
              <input
                type="range"
                min="0.00"
                max="1.00"
                step="0.05"
                value={accuracy}
                onChange={(e) => setAccuracy(Number(e.target.value))}
                className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              />
              <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                <span>0.00 (Challenged)</span>
                <span>0.50 (Balanced)</span>
                <span>1.00 (Flawless)</span>
              </div>
            </div>

            {/* Quick Preset Buttons */}
            <div className="space-y-1.5 pt-1">
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
                Load Typical Learning Profiles:
              </span>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => { setTimeSpent(25); setEngagement(0.85); setAccuracy(0.90); }}
                  className="px-2.5 py-1 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800 text-emerald-700 dark:text-emerald-300 text-xs font-semibold hover:bg-emerald-100"
                >
                  ⚡ Fast Flow Profile
                </button>
                <button
                  type="button"
                  onClick={() => { setTimeSpent(68); setEngagement(0.55); setAccuracy(0.55); }}
                  className="px-2.5 py-1 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-800 text-amber-700 dark:text-amber-300 text-xs font-semibold hover:bg-amber-100"
                >
                  🤔 Active Struggle Profile
                </button>
                <button
                  type="button"
                  onClick={() => { setTimeSpent(135); setEngagement(0.30); setAccuracy(0.20); }}
                  className="px-2.5 py-1 rounded-lg bg-rose-50 dark:bg-rose-950/60 border border-rose-200 dark:border-rose-800 text-rose-700 dark:text-rose-300 text-xs font-semibold hover:bg-rose-100"
                >
                  🛑 High Friction Profile
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isPredicting || !healthData?.model_available}
              className={`w-full py-3 rounded-xl font-bold text-xs sm:text-sm text-white transition flex items-center justify-center gap-2 shadow-md ${
                healthData?.model_available
                  ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer shadow-indigo-500/20'
                  : 'bg-slate-400 cursor-not-allowed'
              }`}
            >
              {isPredicting ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Calling Flask API Inference...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4" />
                  <span>Execute Random Forest Prediction</span>
                </>
              )}
            </button>
          </form>

          {predictError && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs font-medium">
              <strong>Error:</strong> {predictError}
            </div>
          )}
        </div>

        {/* Prediction Output & Probabilities */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>Real Prediction Output</span>
            </h2>
            {predictionResult && (
              <span className="text-xs font-mono text-slate-400">
                v{predictionResult.model_version}
              </span>
            )}
          </div>

          {predictionResult ? (
            <div className="space-y-6 animate-fadeIn">
              {/* Predicted Category Card */}
              <div className={`p-5 rounded-2xl border ${
                predictionResult.prediction === 'Low' ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-950 dark:text-emerald-200' :
                predictionResult.prediction === 'Medium' ? 'bg-amber-50 dark:bg-amber-950/40 border-amber-200 text-amber-950 dark:text-amber-200' :
                'bg-rose-50 dark:bg-rose-950/40 border-rose-200 text-rose-950 dark:text-rose-200'
              }`}>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-bold uppercase tracking-wider">
                    Predicted Support Level
                  </span>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-white/70 dark:bg-slate-900/60">
                    Confidence: {Math.round(predictionResult.confidence * 100)}%
                  </span>
                </div>
                <div className="text-3xl font-extrabold mb-2">
                  {predictionResult.prediction} Cognitive Friction
                </div>
                <p className="text-xs leading-relaxed font-medium">
                  {predictionResult.recommended_intervention}
                </p>
              </div>

              {/* Class Probability Distribution Chart */}
              <div className="space-y-2">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Ensemble Tree Probability Distribution:
                </span>
                <div className="h-44 w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={probChartData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                      <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" opacity={0.5} />
                      <XAxis type="number" domain={[0, 100]} stroke="#94a3b8" fontSize={11} unit="%" />
                      <YAxis type="category" dataKey="key" stroke="#94a3b8" fontSize={11} tickLine={false} />
                      <Tooltip formatter={(value) => [`${value}%`, 'Probability']} />
                      <Bar dataKey="prob" radius={[0, 6, 6, 0]}>
                        {probChartData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 text-xs text-slate-600 dark:text-slate-400 flex items-start gap-2">
                <Info className="w-4 h-4 text-indigo-500 shrink-0 mt-0.5" />
                <span>
                  {predictionResult.disclaimer}
                </span>
              </div>
            </div>
          ) : (
            <div className="p-12 text-center text-slate-400 dark:text-slate-500 space-y-2 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-2xl">
              <Cpu className="w-10 h-10 mx-auto text-slate-300 dark:text-slate-600" />
              <p className="font-semibold text-sm">No Active Prediction</p>
              <p className="text-xs">
                Adjust the sliders on the left and click "Execute Random Forest Prediction" to run live inference.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Feature Importance & Confusion Matrix Grid */}
      {modelInfo && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Feature Importance */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-indigo-600" />
              <span>Random Forest Feature Importances</span>
            </h2>
            <p className="text-xs text-slate-500">
              Contribution weight of each behavioral signal to the 100 decision trees.
            </p>

            <div className="h-52 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={importanceChartData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" opacity={0.5} />
                  <XAxis dataKey="feature" stroke="#94a3b8" fontSize={11} tickLine={false} />
                  <YAxis stroke="#94a3b8" fontSize={11} unit="%" />
                  <Tooltip formatter={(value) => [`${value}%`, 'Weight']} />
                  <Bar dataKey="importance" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Confusion Matrix Table */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
              <Database className="w-5 h-5 text-indigo-600" />
              <span>Test Set Confusion Matrix (80:20 Split)</span>
            </h2>
            <p className="text-xs text-slate-500">
              Evaluated on 1,000 held-out learning sessions across High, Low, and Medium classes.
            </p>

            <div className="overflow-x-auto">
              <table className="w-full text-xs text-center border-collapse">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-slate-700 text-slate-500">
                    <th className="p-2 text-left">Actual \ Pred</th>
                    <th className="p-2 font-bold text-rose-600">Pred High</th>
                    <th className="p-2 font-bold text-emerald-600">Pred Low</th>
                    <th className="p-2 font-bold text-amber-600">Pred Medium</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-700/60 font-mono">
                  {modelInfo.target_classes?.map((cls, rowIdx) => (
                    <tr key={cls} className="hover:bg-slate-50 dark:hover:bg-slate-700/30">
                      <td className="p-2 text-left font-sans font-bold text-slate-700 dark:text-slate-300">
                        Actual {cls}
                      </td>
                      {modelInfo.metrics?.confusion_matrix?.[rowIdx]?.map((val, colIdx) => (
                        <td 
                          key={colIdx} 
                          className={`p-2 font-bold ${
                            rowIdx === colIdx ? 'bg-indigo-50 dark:bg-indigo-950/50 text-indigo-700 dark:text-indigo-300' : 'text-slate-500'
                          }`}
                        >
                          {val}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="grid grid-cols-3 gap-2 pt-2 text-center text-xs">
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/40">
                <span className="text-[10px] text-slate-400 block">Precision (Macro)</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {Math.round(modelInfo.metrics?.precision_macro * 1000) / 10}%
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/40">
                <span className="text-[10px] text-slate-400 block">Recall (Macro)</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {Math.round(modelInfo.metrics?.recall_macro * 1000) / 10}%
                </span>
              </div>
              <div className="p-2 rounded-xl bg-slate-50 dark:bg-slate-700/40">
                <span className="text-[10px] text-slate-400 block">Macro F1 Score</span>
                <span className="font-bold text-slate-800 dark:text-slate-200">
                  {Math.round(modelInfo.metrics?.f1_macro * 1000) / 10}%
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Recent Live Prediction History Log */}
      <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">
              Student Interaction Prediction Log
            </h2>
            <p className="text-xs text-slate-500">
              Live events captured from your current learning sessions
            </p>
          </div>
          {history.length > 0 && (
            <button
              onClick={handleClearHistory}
              className="text-xs text-rose-500 hover:text-rose-700 font-semibold"
            >
              Clear Log
            </button>
          )}
        </div>

        {history.length > 0 ? (
          <div className="space-y-2">
            {history.slice(0, 5).map((rec) => (
              <div 
                key={rec.id}
                className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/30 border border-slate-200 dark:border-slate-700 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      rec.prediction === 'Low' ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300' :
                      rec.prediction === 'Medium' ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300' :
                      'bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300'
                    }`}>
                      {rec.prediction} Friction ({Math.round(rec.confidence * 100)}%)
                    </span>
                    <span className="font-semibold text-slate-800 dark:text-slate-200">
                      {rec.context?.title || 'Learning Task'}
                    </span>
                  </div>
                  <p className="text-slate-500 dark:text-slate-400">
                    {rec.recommended_intervention}
                  </p>
                </div>

                <div className="flex items-center gap-3 text-slate-400 shrink-0 font-mono text-[11px]">
                  <span>Time: {rec.features?.time_spent_on_task}s</span>
                  <span>•</span>
                  <span>Eng: {Math.round((rec.features?.engagement_level || 0) * 100)}%</span>
                  <span>•</span>
                  <span>Acc: {Math.round((rec.features?.accuracy_of_responses || 0) * 100)}%</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-xs text-slate-400 py-4 text-center">
            No live predictions recorded yet in this browser session.
          </p>
        )}
      </div>
    </div>
  );
}
