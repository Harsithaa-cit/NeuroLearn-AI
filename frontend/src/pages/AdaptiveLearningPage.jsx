import React, { useState, useEffect, useRef } from 'react';
import { 
  BookOpen, 
  Code2, 
  Layers, 
  Calculator, 
  BrainCircuit, 
  Globe, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  Sparkles, 
  HelpCircle,
  Eye,
  Zap,
  ListOrdered,
  RotateCcw
} from 'lucide-react';
import { CURRICULUM } from '../data/curriculumData';
import { useStudentProgress } from '../context/StudentProgressContext';
import { useSettings } from '../context/SettingsContext';
import { extractInteractionFeatures } from '../services/featureExtraction';
import { processAdaptivePrediction } from '../services/predictionService';
import AdaptiveInterventionBanner from '../components/AdaptiveInterventionBanner';
import { sounds } from '../utils/soundEffects';

export default function AdaptiveLearningPage() {
  const { progress, markLessonCompleted } = useStudentProgress();
  const { settings, updateSetting } = useSettings();

  // Active Subject & Lesson selection
  const [selectedSubjectId, setSelectedSubjectId] = useState(CURRICULUM[0].id);
  const currentSubject = CURRICULUM.find(s => s.id === selectedSubjectId) || CURRICULUM[0];

  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const currentLesson = currentSubject.lessons[currentLessonIndex] || currentSubject.lessons[0];

  // Learning mode: 'quick' | 'visual' | 'stepByStep'
  const activeMode = settings.preferredMode || 'visual';

  // Interactive Task state for the lesson
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [taskSubmitted, setTaskSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);
  const [showTaskHint, setShowTaskHint] = useState(false);
  const [attempts, setAttempts] = useState(0);

  // ML Prediction state for this lesson session
  const [sessionStartTime, setSessionStartTime] = useState(Date.now());
  const [mlPrediction, setMlPrediction] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);

  // Reset task & timer when switching lessons or subjects
  useEffect(() => {
    setSelectedAnswer(null);
    setTaskSubmitted(false);
    setIsCorrect(null);
    setShowTaskHint(false);
    setAttempts(0);
    setMlPrediction(null);
    setSessionStartTime(Date.now());
  }, [selectedSubjectId, currentLessonIndex]);

  const handleModeChange = (mode) => {
    updateSetting('preferredMode', mode);
  };

  const handleNextLesson = () => {
    if (currentLessonIndex < currentSubject.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
    }
  };

  const handlePrevLesson = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
    }
  };

  const handleOptionSelect = (index) => {
    if (taskSubmitted && isCorrect) return; // already solved
    setSelectedAnswer(index);
  };

  const handleTaskSubmit = async () => {
    if (selectedAnswer === null) return;

    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    setTaskSubmitted(true);

    const correct = selectedAnswer === currentLesson.interactiveTask.correctIndex;
    setIsCorrect(correct);

    if (correct) {
      if (settings.soundEffects) sounds.playSuccess();
      markLessonCompleted(currentLesson.id, currentLesson.durationMinutes);
    }

    // Trigger genuine Feature Extraction & Random Forest ML prediction
    setIsPredicting(true);
    const features = extractInteractionFeatures({
      startTimeMs: sessionStartTime,
      endTimeMs: Date.now(),
      attemptsCount: newAttempts,
      correctCount: correct ? 1 : 0,
      hintsUsedCount: showTaskHint ? 1 : 0,
      maxHintsPossible: 2
    });

    const predResult = await processAdaptivePrediction(features, {
      subject: currentSubject.title,
      activityType: 'Interactive Lesson Task',
      title: currentLesson.title
    });

    setIsPredicting(false);
    if (predResult.success) {
      setMlPrediction(predResult.data);
    }
  };

  const isLessonCompleted = progress.completedLessons.includes(currentLesson.id);

  const subjectIcons = {
    Code2,
    Layers,
    Calculator,
    BrainCircuit,
    Globe
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header & Subject Selector Pills */}
      <div>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <BookOpen className="w-7 h-7 text-indigo-600" />
              <span>Adaptive Learning Room</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              Select a subject and discover core ideas through your preferred learning modality.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700 self-start sm:self-auto">
            <button
              onClick={() => handleModeChange('quick')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeMode === 'quick'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Quick</span>
            </button>

            <button
              onClick={() => handleModeChange('visual')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeMode === 'visual'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Visual</span>
            </button>

            <button
              onClick={() => handleModeChange('stepByStep')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition ${
                activeMode === 'stepByStep'
                  ? 'bg-white dark:bg-slate-700 text-indigo-600 dark:text-indigo-400 shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              <ListOrdered className="w-3.5 h-3.5" />
              <span>Step-by-Step</span>
            </button>
          </div>
        </div>

        {/* Subject Navigation Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {CURRICULUM.map((sub) => {
            const Icon = subjectIcons[sub.icon] || BookOpen;
            const isSelected = sub.id === selectedSubjectId;
            return (
              <button
                key={sub.id}
                onClick={() => {
                  setSelectedSubjectId(sub.id);
                  setCurrentLessonIndex(0);
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/20'
                    : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-50'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{sub.title}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area: Lesson Viewer */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Lesson Sidebar Navigation */}
        <div className="lg:col-span-1 space-y-4">
          <div className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-3">
              Lessons in {currentSubject.title}
            </h2>
            <div className="space-y-1.5">
              {currentSubject.lessons.map((lesson, idx) => {
                const isCurrent = idx === currentLessonIndex;
                const isDone = progress.completedLessons.includes(lesson.id);
                return (
                  <button
                    key={lesson.id}
                    onClick={() => setCurrentLessonIndex(idx)}
                    className={`w-full text-left px-3 py-2.5 rounded-xl text-xs font-medium transition flex items-center justify-between ${
                      isCurrent
                        ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 font-bold border border-indigo-200 dark:border-indigo-800'
                        : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700/50'
                    }`}
                  >
                    <span className="truncate">{idx + 1}. {lesson.title}</span>
                    {isDone && <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 ml-1" />}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Calming Tip Card */}
          <div className="p-4 rounded-2xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60 text-xs text-teal-900 dark:text-teal-200 space-y-1.5">
            <span className="font-bold flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              ADHD Cognitive Strategy
            </span>
            <p className="leading-relaxed text-teal-800 dark:text-teal-300">
              Switch modes anytime! If text feels overwhelming, switch to <strong>Visual Mode</strong> to anchor concepts with spatial diagrams.
            </p>
          </div>
        </div>

        {/* Lesson Body */}
        <div className="lg:col-span-3 space-y-6">
          {/* Lesson Header Card */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-100 dark:border-slate-700/60 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-300">
                  Lesson {currentLessonIndex + 1} of {currentSubject.lessons.length}
                </span>
                <span className="text-xs text-slate-500">
                  {currentLesson.durationMinutes} min read
                </span>
              </div>
              {isLessonCompleted && (
                <span className="inline-flex items-center gap-1 text-xs font-bold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2.5 py-1 rounded-full">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Completed
                </span>
              )}
            </div>

            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              {currentLesson.title}
            </h2>

            <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {currentLesson.summary}
            </p>

            {/* Real World Analogy Box */}
            <div className="p-4 rounded-2xl bg-amber-50/80 dark:bg-amber-950/30 border border-amber-200/80 dark:border-amber-900/60">
              <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-amber-800 dark:text-amber-300 mb-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Real-World Analogy</span>
              </div>
              <p className="text-xs sm:text-sm text-amber-950 dark:text-amber-200 leading-relaxed">
                {currentLesson.analogy}
              </p>
            </div>

            {/* Rendered Mode Content */}
            <div className="pt-2">
              {activeMode === 'quick' && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h3 className="text-sm font-bold text-indigo-600 dark:text-indigo-400 flex items-center gap-2">
                    <Zap className="w-4 h-4" />
                    <span>{currentLesson.modes.quick.title}</span>
                  </h3>
                  <ul className="space-y-2 text-xs sm:text-sm text-slate-700 dark:text-slate-300">
                    {currentLesson.modes.quick.bullets.map((bullet, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 mt-2 shrink-0" />
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {activeMode === 'visual' && (
                <div className="p-5 rounded-2xl bg-slate-900 text-slate-100 border border-slate-800 space-y-3 font-mono">
                  <div className="flex items-center justify-between text-xs text-indigo-400 font-bold uppercase tracking-wider font-sans">
                    <span className="flex items-center gap-1.5">
                      <Eye className="w-4 h-4" />
                      {currentLesson.modes.visual.title}
                    </span>
                    <span className="text-[10px] text-slate-500">ASCII Architecture Map</span>
                  </div>
                  <pre className="p-4 rounded-xl bg-slate-950 text-indigo-300 text-xs sm:text-sm overflow-x-auto whitespace-pre font-mono leading-relaxed border border-slate-800">
                    {currentLesson.modes.visual.mentalModel}
                  </pre>
                  <p className="text-xs text-slate-400 font-sans italic">
                    💡 {currentLesson.modes.visual.caption}
                  </p>
                </div>
              )}

              {activeMode === 'stepByStep' && (
                <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-700 space-y-3">
                  <h3 className="text-sm font-bold text-teal-600 dark:text-teal-400 flex items-center gap-2">
                    <ListOrdered className="w-4 h-4" />
                    <span>{currentLesson.modes.stepByStep.title}</span>
                  </h3>
                  <div className="space-y-2.5">
                    {currentLesson.modes.stepByStep.steps.map((st) => (
                      <div key={st.step} className="flex items-start gap-3 p-2.5 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs sm:text-sm">
                        <span className="w-5 h-5 rounded-full bg-teal-500 text-white flex items-center justify-center text-xs font-bold shrink-0">
                          {st.step}
                        </span>
                        <span className="text-slate-800 dark:text-slate-200">{st.text}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Interactive Mini Task */}
          <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 flex items-center gap-1.5">
                <HelpCircle className="w-4 h-4" />
                <span>Interactive Checkpoint</span>
              </span>
              <span className="text-xs text-slate-400">
                Tests comprehension • Calibrates ML Support
              </span>
            </div>

            <p className="text-sm sm:text-base font-semibold text-slate-900 dark:text-white">
              {currentLesson.interactiveTask.prompt}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentLesson.interactiveTask.options.map((opt, idx) => {
                const isSelected = selectedAnswer === idx;
                return (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => handleOptionSelect(idx)}
                    className={`p-3.5 rounded-xl text-left text-xs sm:text-sm font-medium border transition-all ${
                      isSelected
                        ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 text-indigo-900 dark:text-indigo-200 font-semibold ring-2 ring-indigo-500/20'
                        : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800/80 text-slate-700 dark:text-slate-300 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <span className="font-bold mr-2 text-slate-400">{String.fromCharCode(65 + idx)}.</span>
                    <span>{opt}</span>
                  </button>
                );
              })}
            </div>

            {/* Task Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleTaskSubmit}
                  disabled={selectedAnswer === null}
                  className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold text-white transition shadow-xs ${
                    selectedAnswer !== null
                      ? 'bg-indigo-600 hover:bg-indigo-700 cursor-pointer'
                      : 'bg-slate-300 dark:bg-slate-700 cursor-not-allowed'
                  }`}
                >
                  {isPredicting ? 'Calibrating ML...' : 'Check Answer'}
                </button>

                {!showTaskHint && (
                  <button
                    type="button"
                    onClick={() => {
                      setShowTaskHint(true);
                      if (settings.soundEffects) sounds.playHintTap();
                    }}
                    className="px-3 py-2 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                  >
                    💡 Small Hint
                  </button>
                )}
              </div>

              {taskSubmitted && (
                <button
                  type="button"
                  onClick={() => {
                    setSelectedAnswer(null);
                    setTaskSubmitted(false);
                    setIsCorrect(null);
                  }}
                  className="text-xs text-slate-500 hover:text-slate-800 flex items-center gap-1"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Try Again</span>
                </button>
              )}
            </div>

            {/* Hint Box if requested */}
            {showTaskHint && (
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-900/60 text-xs text-amber-900 dark:text-amber-200 animate-fadeIn">
                <strong>Hint:</strong> {currentLesson.interactiveTask.hintNudge}
              </div>
            )}

            {/* Feedback Box */}
            {taskSubmitted && (
              <div className={`p-4 rounded-xl border text-xs sm:text-sm animate-fadeIn ${
                isCorrect
                  ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-200 dark:border-emerald-800 text-emerald-900 dark:text-emerald-200'
                  : 'bg-indigo-50 dark:bg-indigo-950/40 border-indigo-200 dark:border-indigo-800 text-indigo-900 dark:text-indigo-200'
              }`}>
                <div className="font-bold mb-1 flex items-center gap-1.5">
                  {isCorrect ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Spot on! Great reasoning.</span>
                    </>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-indigo-600" />
                      <span>Almost there! Consider this perspective:</span>
                    </>
                  )}
                </div>
                <p className="leading-relaxed">
                  {currentLesson.interactiveTask.explanation}
                </p>
              </div>
            )}
          </div>

          {/* Real Random Forest Adaptive Intervention Banner */}
          {mlPrediction && (
            <AdaptiveInterventionBanner 
              predictionData={mlPrediction}
              onDismiss={() => setMlPrediction(null)}
            />
          )}

          {/* Navigation Footer */}
          <div className="flex items-center justify-between pt-4">
            <button
              onClick={handlePrevLesson}
              disabled={currentLessonIndex === 0}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border ${
                currentLessonIndex > 0
                  ? 'border-slate-300 dark:border-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300'
                  : 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous Lesson</span>
            </button>

            <button
              onClick={handleNextLesson}
              disabled={currentLessonIndex >= currentSubject.lessons.length - 1}
              className={`flex items-center gap-1.5 px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold border ${
                currentLessonIndex < currentSubject.lessons.length - 1
                  ? 'bg-indigo-600 hover:bg-indigo-700 text-white shadow-xs'
                  : 'border-slate-200 dark:border-slate-800 text-slate-300 dark:text-slate-600 cursor-not-allowed'
              }`}
            >
              <span>Next Lesson</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
