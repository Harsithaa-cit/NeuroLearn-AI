import React, { useState, useEffect } from 'react';
import { Timer, Play, Pause, RotateCcw, Sparkles } from 'lucide-react';

export default function ThinkingTimer({ onTimeUpdate, autoStart = true }) {
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(autoStart);

  useEffect(() => {
    let interval = null;
    if (isActive) {
      interval = setInterval(() => {
        setSeconds(prev => {
          const next = prev + 1;
          if (onTimeUpdate) onTimeUpdate(next);
          return next;
        });
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [isActive, onTimeUpdate]);

  const toggle = () => setIsActive(!isActive);
  const reset = () => {
    setIsActive(false);
    setSeconds(0);
    if (onTimeUpdate) onTimeUpdate(0);
  };

  const formatTime = (totalSecs) => {
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <div className="flex flex-wrap items-center justify-between gap-3 p-3 rounded-xl bg-indigo-50/70 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60 text-indigo-900 dark:text-indigo-200">
      <div className="flex items-center gap-2">
        <div className="p-1.5 rounded-lg bg-indigo-100 dark:bg-indigo-900/80 text-indigo-600 dark:text-indigo-300">
          <Timer className="w-4 h-4" />
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 block">
            Independent Thinking Timer
          </span>
          <span className="text-sm font-bold text-slate-800 dark:text-slate-100 flex items-center gap-1.5">
            {formatTime(seconds)} <span className="text-xs font-normal text-slate-500 dark:text-slate-400">(no forced rush)</span>
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1.5">
        <button
          type="button"
          onClick={toggle}
          className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-medium flex items-center gap-1 shadow-xs"
          title={isActive ? "Pause thinking timer" : "Resume thinking timer"}
        >
          {isActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          <span>{isActive ? 'Pause' : 'Resume'}</span>
        </button>

        <button
          type="button"
          onClick={reset}
          className="p-1.5 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-700 text-xs font-medium shadow-xs"
          title="Reset timer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
