import React, { useState, useEffect } from 'react';
import { 
  Lightbulb, 
  Brain, 
  Sparkles, 
  CheckCircle2, 
  HelpCircle, 
  ArrowRight, 
  RotateCcw, 
  Compass, 
  BookOpen, 
  HeartHandshake,
  Check,
  Coffee,
  MessageSquareQuote
} from 'lucide-react';
import { THINK_FIRST_QUESTIONS } from '../data/thinkFirstData';
import ThinkingTimer from '../components/ThinkingTimer';
import { useStudentProgress } from '../context/StudentProgressContext';
import { useSettings } from '../context/SettingsContext';
import { extractInteractionFeatures } from '../services/featureExtraction';
import { processAdaptivePrediction } from '../services/predictionService';
import AdaptiveInterventionBanner from '../components/AdaptiveInterventionBanner';
import { sounds } from '../utils/soundEffects';

export default function ThinkFirstPage() {
  const { progress, recordThinkFirstSolve } = useStudentProgress();
  const { settings } = useSettings();

  // Active question state
  const [questionIndex, setQuestionIndex] = useState(0);
  const currentQ = THINK_FIRST_QUESTIONS[questionIndex] || THINK_FIRST_QUESTIONS[0];

  // Cognitive Scaffolding progression states:
  // stage: 'question' | 'independent_thinking' | 'scaffolding' | 'solved' | 'revealed'
  const [stage, setStage] = useState('question');
  const [selectedOption, setSelectedOption] = useState(null);
  const [attempts, setAttempts] = useState(0);

  // Progressive Hint Tiers unlocked: 0=none, 1=Nudge, 2=Concept, 3=Guided Reasoning, 4=Similar Example
  const [hintTier, setHintTier] = useState(0);
  const [showFullExplanation, setShowFullExplanation] = useState(false);

  // Reflection response
  const [reflectionAnswer, setReflectionAnswer] = useState(null);

  // Telemetry & Timing for feature extraction
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [thinkingSeconds, setThinkingSeconds] = useState(0);

  // ML Prediction
  const [mlPrediction, setMlPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // Reset when question changes
  useEffect(() => {
    setStage('question');
    setSelectedOption(null);
    setAttempts(0);
    setHintTier(0);
    setShowFullExplanation(false);
    setReflectionAnswer(null);
    setSessionStartTime(Date.now());
    setThinkingSeconds(0);
    setMlPrediction(null);
  }, [questionIndex]);

  // Handle student submitting an answer choice
  const handleAnswerSubmit = async () => {
    if (selectedOption === null) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);

    const isAnswerCorrect = selectedOption === currentQ.correctIndex;

    if (isAnswerCorrect) {
      if (settings.soundEffects) sounds.playSuccess();
      setStage('solved');

      // Record telemetry in student progress context
      recordThinkFirstSolve({
        independent: hintTier === 0 && newAttempts === 1,
        hintsCount: hintTier,
        usedGuided: showFullExplanation,
        reflection: null
      });

      // Run ML prediction
      runInference(newAttempts, 1);
    } else {
      // CRITICAL: NEVER REVEAL ANSWER! Transition to Stage 1 Independent Thinking
      if (settings.soundEffects) sounds.playHintTap();
      setStage('independent_thinking');

      // Run ML prediction to detect friction and prepare adaptive interventions
      runInference(newAttempts, 0);
    }
  };

  // Student selects "I don't know" or "Let Me Think"
  const handleIDontKnow = () => {
    setStage('independent_thinking');
    setAttempts(prev => prev + 1);
    runInference(attempts + 1, 0);
  };

  // Helper to extract features and send to Flask Random Forest backend
  const runInference = async (attemptsCount, correctCount) => {
    setIsPredicting(true);
    const features = extractInteractionFeatures({
      startTimeMs: sessionStartTime,
      endTimeMs: Date.now(),
      attemptsCount,
      correctCount,
      hintsUsedCount: hintTier,
      maxHintsPossible: 4,
      reflectionCompleted: Boolean(reflectionAnswer)
    });

    const res = await processAdaptivePrediction(features, {
      subject: currentQ.subject,
      activityType: 'Think-First Adaptive Reasoning',
      title: currentQ.title
    });

    setIsPredicting(false);
    if (res.success) {
      setMlPrediction(res.data);
    }
  };

  // Unlocking progressive hints step-by-step
  const handleRequestNextHint = () => {
    if (settings.soundEffects) sounds.playHintTap();
    setStage('scaffolding');
    setHintTier(prev => Math.min(4, prev + 1));
  };

  // Student requests full step-by-step explanation (explicit student choice)
  const handleRevealFullExplanation = () => {
    setShowFullExplanation(true);
    setStage('revealed');
  };

  // Student tries again
  const handleTryAgain = () => {
    setSelectedOption(null);
    setStage('question');
  };

  // Post-problem reflection selection
  const handleReflectionSelect = (optionText) => {
    setReflectionAnswer(optionText);
    recordThinkFirstSolve({
      independent: hintTier === 0 && attempts === 1,
      hintsCount: hintTier,
      usedGuided: showFullExplanation,
      reflection: optionText
    });
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Signature Feature Banner */}
      <div className="p-6 rounded-3xl bg-gradient-to-r from-indigo-900 via-indigo-800 to-purple-900 text-white shadow-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1.5 max-w-xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/30 text-indigo-200 border border-indigo-400/30 text-xs font-semibold">
              <Lightbulb className="w-3.5 h-3.5 text-amber-300" />
              <span>Signature Feature • Cognitive Scaffolding</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Think First Room
            </h1>
            <p className="text-xs sm:text-sm text-indigo-200 leading-relaxed">
              We never immediately reveal the answer. Discover it at your own rhythm through 4 guided scaffolding tiers.
            </p>
          </div>

          {/* Question Selector Carousel */}
          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-black/20 p-1.5 rounded-xl border border-white/10">
            {THINK_FIRST_QUESTIONS.map((q, idx) => (
              <button
                key={q.id}
                onClick={() => setQuestionIndex(idx)}
                className={`w-8 h-8 rounded-lg text-xs font-bold transition ${
                  idx === questionIndex
                    ? 'bg-white text-indigo-900 shadow-sm'
                    : 'text-indigo-200 hover:bg-white/10'
                }`}
                title={q.title}
              >
                Q{idx + 1}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Scaffolding Canvas */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-sm space-y-6">
        {/* Meta Header */}
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
              {currentQ.subject}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500 font-medium">{currentQ.difficulty}</span>
          </div>

          {attempts > 0 && (
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
              Attempts: {attempts} • Hints Used: {hintTier}/4
            </span>
          )}
        </div>

        {/* Question Title & Prompt */}
        <div className="space-y-3">
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white">
            {currentQ.title}
          </h2>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-sm sm:text-base font-mono whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">
            {currentQ.question}
          </div>
        </div>

        {/* ======================================================== */}
        {/* STAGE 1: INDEPENDENT THINKING (Triggered upon incorrect) */}
        {/* ======================================================== */}
        {stage === 'independent_thinking' && (
          <div className="p-6 rounded-2xl bg-indigo-50/90 dark:bg-indigo-950/50 border-2 border-indigo-200 dark:border-indigo-800 space-y-4 animate-fadeIn">
            <div className="flex items-start gap-3">
              <div className="p-2 rounded-xl bg-indigo-600 text-white shrink-0 mt-0.5">
                <Brain className="w-5 h-5" />
              </div>
              <div className="space-y-1">
                <h3 className="text-base font-bold text-indigo-950 dark:text-indigo-100">
                  Take your time. You don't need to get it immediately.
                </h3>
                <p className="text-xs sm:text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
                  {currentQ.stages.encouragement}
                </p>
              </div>
            </div>

            {/* Thinking Timer */}
            <ThinkingTimer onTimeUpdate={setThinkingSeconds} autoStart={true} />

            {/* Action options for the student */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={handleTryAgain}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-semibold shadow-xs transition"
              >
                Let Me Try Again
              </button>

              <button
                type="button"
                onClick={handleRequestNextHint}
                className="px-4 py-2 rounded-xl bg-white dark:bg-slate-800 border border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-50 text-xs sm:text-sm font-semibold transition flex items-center gap-1.5"
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>Give Me a Small Hint</span>
              </button>
            </div>
          </div>
        )}

        {/* Multiple Choice Options List */}
        {stage !== 'independent_thinking' && stage !== 'solved' && stage !== 'revealed' && (
          <div className="space-y-3">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              Choose your answer:
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {currentQ.options.map((opt, idx) => {
                const isSelected = selectedOption === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedOption(idx)}
                    className={`p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-100 font-bold ring-2 ring-indigo-500/30'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span>
                      <strong className="mr-3 text-slate-400 font-mono">{String.fromCharCode(65 + idx)}.</strong>
                      {opt}
                    </span>
                    {isSelected && <Check className="w-4 h-4 text-indigo-600" />}
                  </button>
                );
              })}
            </div>

            {/* Interaction Buttons */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleAnswerSubmit}
                  disabled={selectedOption === null}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition shadow-xs ${
                    selectedOption !== null
                      ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                      : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                  }`}
                >
                  {isPredicting ? 'Evaluating ML Flow...' : 'Submit Answer'}
                </button>

                <button
                  type="button"
                  onClick={handleIDontKnow}
                  className="px-3.5 py-2.5 rounded-xl bg-slate-100 dark:bg-slate-700/60 hover:bg-slate-200 text-slate-600 dark:text-slate-300 text-xs sm:text-sm font-medium transition"
                >
                  I'm Not Sure Yet
                </button>
              </div>

              {hintTier === 0 && (
                <button
                  type="button"
                  onClick={handleRequestNextHint}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Give Me a Small Hint</span>
                </button>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 2: PROGRESSIVE HINT TIERS (1 through 4)             */}
        {/* ======================================================== */}
        {hintTier > 0 && (
          <div className="space-y-4 pt-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <Compass className="w-4 h-4" />
                <span>Progressive Scaffolding Ladder (Level {hintTier}/4)</span>
              </h3>
              {hintTier < 4 && (
                <button
                  type="button"
                  onClick={handleRequestNextHint}
                  className="px-3 py-1.5 rounded-lg bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300 text-xs font-bold hover:bg-indigo-100 transition flex items-center gap-1"
                >
                  <span>Another Hint (Level {hintTier + 1})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Level 1: Gentle Nudge */}
            {hintTier >= 1 && (
              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-sky-900 dark:text-sky-200 animate-fadeIn">
                <span className="text-[11px] font-bold uppercase tracking-wider text-sky-700 dark:text-sky-400 block mb-1">
                  Level 1 • Gentle Nudge
                </span>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {currentQ.stages.nudge}
                </p>
              </div>
            )}

            {/* Level 2: Concept Reminder */}
            {hintTier >= 2 && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-900 dark:text-emerald-200 animate-fadeIn">
                <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 block mb-1">
                  Level 2 • Concept Reminder
                </span>
                <p className="text-xs sm:text-sm leading-relaxed">
                  {currentQ.stages.conceptReminder}
                </p>
              </div>
            )}

            {/* Level 3: Guided Reasoning */}
            {hintTier >= 3 && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-900 dark:text-amber-200 space-y-2 animate-fadeIn">
                <span className="text-[11px] font-bold uppercase tracking-wider text-amber-700 dark:text-amber-400 block">
                  Level 3 • Guided Reasoning Steps
                </span>
                <div className="space-y-1.5 text-xs sm:text-sm">
                  {currentQ.stages.guidedReasoning.map((step, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="font-mono font-bold text-amber-600">→</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Level 4: Similar Example (Isomorphic problem) */}
            {hintTier >= 4 && (
              <div className="p-5 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/60 text-pink-950 dark:text-pink-200 space-y-2 animate-fadeIn">
                <span className="text-[11px] font-bold uppercase tracking-wider text-pink-700 dark:text-pink-400 block">
                  Level 4 • Similar Worked Example (Without Answering Original)
                </span>
                <p className="text-xs sm:text-sm font-semibold">
                  {currentQ.stages.similarExample.problem}
                </p>
                <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-pink-200 dark:border-pink-800 text-xs font-mono space-y-1 text-slate-800 dark:text-slate-200">
                  <p>{currentQ.stages.similarExample.breakdown}</p>
                  <p className="text-pink-600 dark:text-pink-400 font-bold">{currentQ.stages.similarExample.result}</p>
                </div>
              </div>
            )}

            {/* Options to Try Again or Request Step-by-Step */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <button
                type="button"
                onClick={handleTryAgain}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs sm:text-sm font-bold shadow-xs transition"
              >
                I'm Ready to Try Again!
              </button>

              {hintTier >= 3 && !showFullExplanation && (
                <button
                  type="button"
                  onClick={handleRevealFullExplanation}
                  className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Explain Step by Step (Optional)
                </button>
              )}
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* STAGE 3: STUDENT-CONTROLLED STEP-BY-STEP EXPLANATION     */}
        {/* ======================================================== */}
        {showFullExplanation && (
          <div className="p-6 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200 space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-purple-700 dark:text-purple-400">
              <BookOpen className="w-4 h-4" />
              <span>Full Step-by-Step Breakdown</span>
            </div>
            <p className="text-sm font-semibold">
              {currentQ.stages.fullSolution.summary}
            </p>
            <div className="space-y-1.5 text-xs sm:text-sm">
              {currentQ.stages.fullSolution.steps.map((st, i) => (
                <div key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-purple-600 shrink-0 mt-0.5" />
                  <span>{st}</span>
                </div>
              ))}
            </div>
            <div className="pt-2">
              <button
                type="button"
                onClick={handleTryAgain}
                className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-700 text-white text-xs font-semibold shadow-xs"
              >
                Let Me Try Again Independently
              </button>
            </div>
          </div>
        )}

        {/* ======================================================== */}
        {/* CELEBRATION & REFLECTION STAGE (When correctly solved)    */}
        {/* ======================================================== */}
        {stage === 'solved' && (
          <div className="p-6 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-6 animate-fadeIn">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shadow-md">
                <Sparkles className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-emerald-950 dark:text-emerald-100">
                  Brilliant reasoning! You figured it out.
                </h3>
                <p className="text-xs sm:text-sm text-emerald-800 dark:text-emerald-300">
                  {hintTier === 0 
                    ? '🌟 Independent Solve! You worked through this without any hints.' 
                    : `💡 Guided Discovery! You purposefully utilized ${hintTier} hint tier(s) to reach understanding.`}
                </p>
              </div>
            </div>

            {/* Metacognitive Reflection Question */}
            <div className="p-5 rounded-2xl bg-white dark:bg-slate-800 border border-emerald-200 dark:border-slate-700 space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
                <MessageSquareQuote className="w-4 h-4 text-emerald-600" />
                <span>Reflection: How did you arrive at your answer?</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {[
                  'I figured it out myself.',
                  'A hint helped me.',
                  'The example helped me.',
                  'I needed a step-by-step explanation.'
                ].map((optText, i) => {
                  const isChosen = reflectionAnswer === optText;
                  return (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleReflectionSelect(optText)}
                      className={`p-3 rounded-xl text-left text-xs font-medium border transition ${
                        isChosen
                          ? 'bg-emerald-500 text-white border-emerald-600 font-bold shadow-xs'
                          : 'bg-slate-50 dark:bg-slate-700/50 border-slate-200 dark:border-slate-600 text-slate-700 dark:text-slate-200 hover:bg-slate-100'
                      }`}
                    >
                      {optText}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Next Challenge Action */}
            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-emerald-700 dark:text-emerald-400 font-semibold">
                Telemetry recorded in your Learning Profile
              </span>
              <button
                type="button"
                onClick={() => {
                  setQuestionIndex(prev => (prev + 1) % THINK_FIRST_QUESTIONS.length);
                }}
                className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition"
              >
                <span>Next Question</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Live Random Forest ML Adaptive Intervention */}
        {mlPrediction && (
          <AdaptiveInterventionBanner 
            predictionData={mlPrediction}
            onDismiss={() => setMlPrediction(null)}
            onAction={handleRequestNextHint}
          />
        )}
      </div>
    </div>
  );
}
