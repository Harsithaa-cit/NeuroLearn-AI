import React, { useState } from 'react';
import { 
  HelpCircle, 
  Code2, 
  Layers, 
  BrainCircuit, 
  CheckCircle2, 
  RotateCcw, 
  Lightbulb, 
  Award, 
  ArrowRight,
  Sparkles,
  Check
} from 'lucide-react';
import { QUIZ_TOPICS } from '../data/quizData';
import { useStudentProgress } from '../context/StudentProgressContext';
import { useSettings } from '../context/SettingsContext';
import { sounds } from '../utils/soundEffects';

export default function QuizArenaPage() {
  const { recordQuizResult } = useStudentProgress();
  const { settings } = useSettings();

  // Active quiz state
  const [selectedTopicId, setSelectedTopicId] = useState(QUIZ_TOPICS[0].id);
  const currentTopic = QUIZ_TOPICS.find(t => t.id === selectedTopicId) || QUIZ_TOPICS[0];

  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const currentQ = currentTopic.questions[currentQuestionIdx];

  // User selections & state
  const [selectedAnswers, setSelectedAnswers] = useState({}); // { [qIndex]: optionIndex }
  const [showHintForQ, setShowHintForQ] = useState(false);
  const [isQuizSubmitted, setIsQuizSubmitted] = useState(false);

  // Switch topics
  const handleSelectTopic = (topicId) => {
    setSelectedTopicId(topicId);
    setCurrentQuestionIdx(0);
    setSelectedAnswers({});
    setShowHintForQ(false);
    setIsQuizSubmitted(false);
  };

  const handleOptionSelect = (optionIdx) => {
    if (isQuizSubmitted) return;
    setSelectedAnswers(prev => ({
      ...prev,
      [currentQuestionIdx]: optionIdx
    }));
  };

  const handleNext = () => {
    setShowHintForQ(false);
    if (currentQuestionIdx < currentTopic.questions.length - 1) {
      setCurrentQuestionIdx(prev => prev + 1);
    }
  };

  const handlePrev = () => {
    setShowHintForQ(false);
    if (currentQuestionIdx > 0) {
      setCurrentQuestionIdx(prev => prev - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setIsQuizSubmitted(true);
    let score = 0;
    currentTopic.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) {
        score += 1;
      }
    });

    if (settings.soundEffects) sounds.playSuccess();

    recordQuizResult({
      id: `quiz-${Date.now()}`,
      topicId: currentTopic.id,
      topicTitle: currentTopic.title,
      score,
      total: currentTopic.questions.length,
      percentage: Math.round((score / currentTopic.questions.length) * 100),
      date: new Date().toLocaleDateString()
    });
  };

  const handleRestartQuiz = () => {
    setSelectedAnswers({});
    setCurrentQuestionIdx(0);
    setShowHintForQ(false);
    setIsQuizSubmitted(false);
  };

  // Calculate score
  let totalScore = 0;
  if (isQuizSubmitted) {
    currentTopic.questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correctIndex) totalScore += 1;
    });
  }

  const answeredCount = Object.keys(selectedAnswers).length;
  const isSelected = selectedAnswers[currentQuestionIdx] !== undefined;

  const topicIcons = {
    Code2,
    Layers,
    BrainCircuit
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-2">
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Supportive Mastery Quizzes</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
            Interactive Quiz Arena
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Gentle self-assessments designed to consolidate your learning with hints on every step.
          </p>
        </div>

        {/* Topic Selector Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1">
          {QUIZ_TOPICS.map((topic) => {
            const Icon = topicIcons[topic.icon] || HelpCircle;
            const isCurrent = topic.id === selectedTopicId;
            return (
              <button
                key={topic.id}
                onClick={() => handleSelectTopic(topic.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition ${
                  isCurrent
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{topic.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Quiz Progress & Question Tracker */}
      <div className="p-6 sm:p-8 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
          <div className="flex items-center gap-2 text-xs">
            <span className="font-bold text-indigo-600 dark:text-indigo-400">
              Question {currentQuestionIdx + 1} of {currentTopic.questions.length}
            </span>
            <span className="text-slate-400">•</span>
            <span className="text-slate-500">
              {answeredCount} of {currentTopic.questions.length} answered
            </span>
          </div>

          {/* Mini Question Jump Dots */}
          <div className="flex items-center gap-1.5">
            {currentTopic.questions.map((_, idx) => {
              const isAnswered = selectedAnswers[idx] !== undefined;
              const isCurrent = idx === currentQuestionIdx;
              return (
                <button
                  key={idx}
                  onClick={() => {
                    setCurrentQuestionIdx(idx);
                    setShowHintForQ(false);
                  }}
                  className={`w-6 h-6 rounded-lg text-[10px] font-bold transition flex items-center justify-center ${
                    isCurrent
                      ? 'bg-indigo-600 text-white ring-2 ring-indigo-500/20'
                      : isAnswered
                      ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                      : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
                  }`}
                >
                  {idx + 1}
                </button>
              );
            })}
          </div>
        </div>

        {/* Current Question */}
        <div className="space-y-4">
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white leading-snug">
            {currentQ.prompt}
          </h2>

          {/* Options */}
          <div className="space-y-2.5">
            {currentQ.options.map((opt, idx) => {
              const isThisSelected = selectedAnswers[currentQuestionIdx] === idx;
              let optionStyles = 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:bg-slate-50';

              if (isQuizSubmitted) {
                if (idx === currentQ.correctIndex) {
                  optionStyles = 'border-emerald-500 bg-emerald-50 dark:bg-emerald-950 text-emerald-900 dark:text-emerald-200 font-bold';
                } else if (isThisSelected && idx !== currentQ.correctIndex) {
                  optionStyles = 'border-rose-300 bg-rose-50 dark:bg-rose-950/60 text-rose-900 dark:text-rose-200';
                }
              } else if (isThisSelected) {
                optionStyles = 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/70 text-indigo-900 dark:text-indigo-100 font-bold ring-2 ring-indigo-500/20';
              }

              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleOptionSelect(idx)}
                  disabled={isQuizSubmitted}
                  className={`w-full p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all flex items-center justify-between ${optionStyles}`}
                >
                  <span>
                    <strong className="mr-3 text-slate-400 font-mono">{String.fromCharCode(65 + idx)}.</strong>
                    {opt}
                  </span>
                  {isThisSelected && <Check className="w-4 h-4 text-indigo-600" />}
                </button>
              );
            })}
          </div>

          {/* Hint Trigger & Display */}
          {!isQuizSubmitted && (
            <div className="pt-2">
              {!showHintForQ ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowHintForQ(true);
                    if (settings.soundEffects) sounds.playHintTap();
                  }}
                  className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline flex items-center gap-1.5"
                >
                  <Lightbulb className="w-3.5 h-3.5 text-amber-500" />
                  <span>Think-First Hint for this Question</span>
                </button>
              ) : (
                <div className="p-3.5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-950 dark:text-amber-200 animate-fadeIn">
                  <strong className="text-amber-700 dark:text-amber-400 block mb-0.5">Scaffolding Hint:</strong>
                  {currentQ.hint}
                </div>
              )}
            </div>
          )}

          {/* Post-Submission Supportive Explanation */}
          {isQuizSubmitted && (
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 text-xs sm:text-sm space-y-1 animate-fadeIn">
              <strong className="text-slate-800 dark:text-slate-200 block">Supportive Concept Breakdown:</strong>
              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {currentQ.supportiveFeedback}
              </p>
            </div>
          )}
        </div>

        {/* Navigation & Submission Controls */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-slate-100 dark:border-slate-700/60">
          <button
            type="button"
            onClick={handlePrev}
            disabled={currentQuestionIdx === 0}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold border ${
              currentQuestionIdx > 0
                ? 'border-slate-300 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                : 'border-slate-200 text-slate-300 dark:text-slate-700 cursor-not-allowed'
            }`}
          >
            Previous
          </button>

          <div className="flex items-center gap-2">
            {!isQuizSubmitted ? (
              currentQuestionIdx === currentTopic.questions.length - 1 ? (
                <button
                  type="button"
                  onClick={handleSubmitQuiz}
                  className="px-6 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm shadow-xs transition"
                >
                  Submit Quiz & Review
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm shadow-xs transition flex items-center gap-1"
                >
                  <span>Next Question</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )
            ) : (
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs sm:text-sm flex items-center gap-1.5 shadow-xs transition"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Retry Topic</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Quiz Score Summary Banner */}
      {isQuizSubmitted && (
        <div className="p-6 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-200 dark:border-indigo-800 text-center space-y-2 animate-fadeIn">
          <div className="w-12 h-12 rounded-2xl bg-indigo-600 text-white flex items-center justify-center mx-auto shadow-md">
            <Award className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-bold text-slate-900 dark:text-white">
            Quiz Complete: {totalScore} / {currentTopic.questions.length} Correct
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto">
            {totalScore === currentTopic.questions.length 
              ? 'Outstanding performance! You have mastered these foundational concepts.'
              : 'Great effort! Take your time reviewing the concept breakdowns above to strengthen understanding.'}
          </p>
        </div>
      )}
    </div>
  );
}
