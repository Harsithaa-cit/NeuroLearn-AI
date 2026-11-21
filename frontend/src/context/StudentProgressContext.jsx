import React, { createContext, useContext, useState, useEffect } from 'react';

const StudentProgressContext = createContext();

const PROGRESS_STORAGE_KEY = 'neurolearn_student_progress';

const INITIAL_PROGRESS = {
  studentName: 'Alex Rivera',
  studentId: 'STU-4821',
  streakDays: 4,
  totalStudyMinutes: 78,
  todayGoalMinutes: 30,
  todayCompletedMinutes: 20,
  completedLessons: ['py-1'], // Pre-seeded with 1 completed lesson for realistic initial state
  quizHistory: [
    {
      id: 'quiz-init-1',
      topicId: 'python-basics',
      topicTitle: 'Python Core Concepts',
      score: 4,
      total: 5,
      date: new Date(Date.now() - 86400000 * 2).toLocaleDateString(),
      percentage: 80
    }
  ],
  thinkFirstStats: {
    totalAttempted: 3,
    independentSolves: 2,
    hintsRequested: 4,
    guidedExplorationCount: 1,
    reflectionsCompleted: 3
  },
  focusSessionsCompleted: 2,
  weeklyActivity: [
    { day: 'Mon', minutes: 25, questions: 8 },
    { day: 'Tue', minutes: 15, questions: 5 },
    { day: 'Wed', minutes: 30, questions: 12 },
    { day: 'Thu', minutes: 20, questions: 7 },
    { day: 'Fri', minutes: 18, questions: 6 },
    { day: 'Sat', minutes: 25, questions: 9 },
    { day: 'Sun', minutes: 10, questions: 3 }
  ],
  achievements: [
    { id: 'first_code', title: 'Code Explorer', desc: 'Completed first Python programming module', unlocked: true, icon: 'Award' },
    { id: 'think_deep', title: 'Independent Thinker', desc: 'Solved a complex question without revealing the answer', unlocked: true, icon: 'Brain' },
    { id: 'focus_champ', title: 'Focus Flow', desc: 'Completed a full 25-minute calm focus session', unlocked: true, icon: 'Timer' },
    { id: 'streak_3', title: 'Consistency Champion', desc: 'Maintained a 3-day learning streak', unlocked: true, icon: 'Flame' },
    { id: 'scaffold_master', title: 'Metacognitive Mindset', desc: 'Reflected on how you solved a challenging problem', unlocked: true, icon: 'Sparkles' }
  ]
};

export function StudentProgressProvider({ children }) {
  const [progress, setProgress] = useState(() => {
    try {
      const saved = localStorage.getItem(PROGRESS_STORAGE_KEY);
      return saved ? { ...INITIAL_PROGRESS, ...JSON.parse(saved) } : INITIAL_PROGRESS;
    } catch (e) {
      return INITIAL_PROGRESS;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(PROGRESS_STORAGE_KEY, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save progress to localStorage', e);
    }
  }, [progress]);

  const markLessonCompleted = (lessonId, durationMinutes = 5) => {
    setProgress(prev => {
      if (prev.completedLessons.includes(lessonId)) return prev;
      return {
        ...prev,
        completedLessons: [...prev.completedLessons, lessonId],
        totalStudyMinutes: prev.totalStudyMinutes + durationMinutes,
        todayCompletedMinutes: prev.todayCompletedMinutes + durationMinutes
      };
    });
  };

  const recordQuizResult = (result) => {
    setProgress(prev => ({
      ...prev,
      quizHistory: [result, ...prev.quizHistory]
    }));
  };

  const recordThinkFirstSolve = ({ independent = false, hintsCount = 0, reflection = null, usedGuided = false }) => {
    setProgress(prev => {
      const current = prev.thinkFirstStats;
      return {
        ...prev,
        thinkFirstStats: {
          totalAttempted: current.totalAttempted + 1,
          independentSolves: independent ? current.independentSolves + 1 : current.independentSolves,
          hintsRequested: current.hintsRequested + hintsCount,
          guidedExplorationCount: usedGuided ? current.guidedExplorationCount + 1 : current.guidedExplorationCount,
          reflectionsCompleted: reflection ? current.reflectionsCompleted + 1 : current.reflectionsCompleted
        }
      };
    });
  };

  const recordFocusSession = (durationMinutes = 25) => {
    setProgress(prev => ({
      ...prev,
      focusSessionsCompleted: prev.focusSessionsCompleted + 1,
      totalStudyMinutes: prev.totalStudyMinutes + durationMinutes,
      todayCompletedMinutes: prev.todayCompletedMinutes + durationMinutes
    }));
  };

  const resetAllProgress = () => {
    setProgress(INITIAL_PROGRESS);
  };

  return (
    <StudentProgressContext.Provider value={{
      progress,
      markLessonCompleted,
      recordQuizResult,
      recordThinkFirstSolve,
      recordFocusSession,
      resetAllProgress
    }}>
      {children}
    </StudentProgressContext.Provider>
  );
}

export function useStudentProgress() {
  const context = useContext(StudentProgressContext);
  if (!context) {
    throw new Error('useStudentProgress must be used within a StudentProgressProvider');
  }
  return context;
}
