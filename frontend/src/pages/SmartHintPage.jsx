import React, { useState } from 'react';
import { 
  Lightbulb, 
  HelpCircle, 
  Compass, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight, 
  RotateCcw, 
  BookOpen,
  Check
} from 'lucide-react';
import { THINK_FIRST_QUESTIONS } from '../data/thinkFirstData';
import { useSettings } from '../context/SettingsContext';
import { sounds } from '../utils/soundEffects';

export default function SmartHintPage() {
  const { settings } = useSettings();
  const [activeQuestionIdx, setActiveQuestionIdx] = useState(0);
  const q = THINK_FIRST_QUESTIONS[activeQuestionIdx];

  const [hintTier, setHintTier] = useState(0); // 0 to 4
  const [showFullExplanation, setShowFullExplanation] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswerChecked, setIsAnswerChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const resetState = () => {
    setHintTier(0);
    setShowFullExplanation(false);
    setSelectedOption(null);
    setIsAnswerChecked(false);
    setIsCorrect(false);
  };

  const handleNextHint = () => {
    if (settings.soundEffects) sounds.playHintTap();
    setHintTier(prev => Math.min(4, prev + 1));
  };

  const handleCheckAnswer = () => {
    if (selectedOption === null) return;
    const correct = selectedOption === q.correctIndex;
    setIsCorrect(correct);
    setIsAnswerChecked(true);
    if (correct && settings.soundEffects) {
      sounds.playSuccess();
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400 text-xs font-semibold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>Interactive Scaffolding Sandbox</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Smart 4-Tier Hint System
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Experience how progressive cognitive scaffolding helps you uncover answers independently.
          </p>
        </div>

        {/* Question Selector */}
        <div className="flex items-center gap-2">
          {THINK_FIRST_QUESTIONS.map((item, idx) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveQuestionIdx(idx);
                resetState();
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                idx === activeQuestionIdx
                  ? 'bg-indigo-600 text-white shadow-xs'
                  : 'bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300'
              }`}
            >
              Ex {idx + 1}
            </button>
          ))}
        </div>
      </div>

      {/* Main Question Card */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400">
            {q.subject} • {q.difficulty}
          </span>
          <span className="text-xs font-semibold text-slate-500">
            Hint Level: {hintTier} of 4 Unlocked
          </span>
        </div>

        <div className="space-y-2">
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {q.title}
          </h2>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs sm:text-sm font-mono whitespace-pre-wrap leading-relaxed text-slate-800 dark:text-slate-200">
            {q.question}
          </div>
        </div>

        {/* Options */}
        <div className="space-y-2.5">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block">
            Test Your Deduction:
          </span>
          {q.options.map((opt, idx) => {
            const isSelected = selectedOption === idx;
            return (
              <button
                key={idx}
                onClick={() => setSelectedOption(idx)}
                className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${
                  isSelected
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-100 font-bold ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
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

        {/* Submission & Action Buttons */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
          <div className="flex items-center gap-2">
            <button
              onClick={handleCheckAnswer}
              disabled={selectedOption === null}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition shadow-xs ${
                selectedOption !== null ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer' : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
              }`}
            >
              Verify My Answer
            </button>

            {hintTier < 4 && (
              <button
                onClick={handleNextHint}
                className="px-4 py-2.5 rounded-xl bg-amber-50 dark:bg-amber-950/60 border border-amber-200 dark:border-amber-900/60 text-amber-800 dark:text-amber-300 text-xs sm:text-sm font-semibold hover:bg-amber-100 transition flex items-center gap-1.5"
              >
                <Lightbulb className="w-4 h-4 text-amber-500" />
                <span>{hintTier === 0 ? 'Request First Hint' : `Unlock Level ${hintTier + 1} Hint`}</span>
              </button>
            )}
          </div>

          <button
            onClick={resetState}
            className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Problem</span>
          </button>
        </div>

        {/* Feedback Banner */}
        {isAnswerChecked && (
          <div className={`p-4 rounded-2xl border text-xs sm:text-sm animate-fadeIn ${
            isCorrect
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 text-emerald-900 dark:text-emerald-200'
              : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 text-indigo-900 dark:text-indigo-200'
          }`}>
            <div className="font-bold flex items-center gap-1.5 mb-1">
              {isCorrect ? (
                <>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Correct! Your deduction was spot on.</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-indigo-600" />
                  <span>Not quite yet! Take a look at the progressive hints below.</span>
                </>
              )}
            </div>
          </div>
        )}

        {/* Progressive Scaffolding Tiers Rendered */}
        {hintTier > 0 && (
          <div className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-700">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Active Scaffolding Tiers:
            </h3>

            {hintTier >= 1 && (
              <div className="p-4 rounded-2xl bg-sky-50 dark:bg-sky-950/40 border border-sky-200 dark:border-sky-900/60 text-sky-950 dark:text-sky-200 text-xs sm:text-sm animate-fadeIn">
                <span className="text-[10px] font-bold uppercase tracking-wider text-sky-600 block mb-1">Tier 1: Gentle Nudge</span>
                {q.stages.nudge}
              </div>
            )}

            {hintTier >= 2 && (
              <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-900/60 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm animate-fadeIn">
                <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 block mb-1">Tier 2: Concept Reminder</span>
                {q.stages.conceptReminder}
              </div>
            )}

            {hintTier >= 3 && (
              <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-amber-950 dark:text-amber-200 text-xs sm:text-sm space-y-1.5 animate-fadeIn">
                <span className="text-[10px] font-bold uppercase tracking-wider text-amber-600 block">Tier 3: Guided Sub-Steps</span>
                {q.stages.guidedReasoning.map((step, i) => (
                  <div key={i} className="flex items-start gap-1.5">
                    <span className="font-bold text-amber-600">→</span>
                    <span>{step}</span>
                  </div>
                ))}
              </div>
            )}

            {hintTier >= 4 && (
              <div className="p-5 rounded-2xl bg-pink-50 dark:bg-pink-950/40 border border-pink-200 dark:border-pink-900/60 text-pink-950 dark:text-pink-200 text-xs sm:text-sm space-y-2 animate-fadeIn">
                <span className="text-[10px] font-bold uppercase tracking-wider text-pink-600 block">Tier 4: Similar Isomorphic Example</span>
                <p className="font-semibold">{q.stages.similarExample.problem}</p>
                <div className="p-3 rounded-xl bg-white/70 dark:bg-slate-900/70 border border-pink-200 dark:border-pink-800 font-mono text-xs text-slate-800 dark:text-slate-200">
                  <p>{q.stages.similarExample.breakdown}</p>
                  <p className="font-bold text-pink-600 mt-1">{q.stages.similarExample.result}</p>
                </div>
              </div>
            )}

            {hintTier >= 3 && !showFullExplanation && (
              <div className="pt-2 text-right">
                <button
                  onClick={() => setShowFullExplanation(true)}
                  className="text-xs font-semibold text-purple-600 dark:text-purple-400 hover:underline"
                >
                  Request Full Step-by-Step Explanation (Student Choice)
                </button>
              </div>
            )}

            {showFullExplanation && (
              <div className="p-5 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-purple-950 dark:text-purple-200 text-xs sm:text-sm space-y-2 animate-fadeIn">
                <div className="font-bold flex items-center gap-1.5 text-purple-700">
                  <BookOpen className="w-4 h-4" />
                  <span>Full Explanation:</span>
                </div>
                <p className="font-semibold">{q.stages.fullSolution.summary}</p>
                <div className="space-y-1">
                  {q.stages.fullSolution.steps.map((st, idx) => (
                    <div key={idx} className="flex items-start gap-1.5">
                      <span className="font-bold text-purple-600">✓</span>
                      <span>{st}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
