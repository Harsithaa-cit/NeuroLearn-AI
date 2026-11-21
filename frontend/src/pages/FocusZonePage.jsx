import React, { useState, useEffect } from 'react';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Coffee, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  CheckCircle2, 
  Sliders,
  Flame
} from 'lucide-react';
import { useStudentProgress } from '../context/StudentProgressContext';
import { useSettings } from '../context/SettingsContext';
import { sounds } from '../utils/soundEffects';

export default function FocusZonePage() {
  const { progress, recordFocusSession } = useStudentProgress();
  const { settings } = useSettings();

  // Mode: 'work' (25m) | 'shortBreak' (5m) | 'longBreak' (15m)
  const [timerMode, setTimerMode] = useState('work');
  
  // Custom durations in minutes
  const [workMinutes, setWorkMinutes] = useState(settings.pomodoroWorkMinutes || 25);
  const [breakMinutes, setBreakMinutes] = useState(settings.pomodoroBreakMinutes || 5);
  const [longBreakMinutes, setLongBreakMinutes] = useState(settings.pomodoroLongBreakMinutes || 15);

  const getDurationForMode = (mode) => {
    if (mode === 'work') return workMinutes * 60;
    if (mode === 'shortBreak') return breakMinutes * 60;
    return longBreakMinutes * 60;
  };

  const [timeLeft, setTimeLeft] = useState(getDurationForMode('work'));
  const [isActive, setIsActive] = useState(false);
  const [sessionCompletedNotice, setSessionCompletedNotice] = useState(false);

  // Ambient sound generator toggle
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);
  const [ambientType, setAmbientType] = useState('calm_rain'); // 'calm_rain' | 'binaural'

  // Sync timeLeft when durations or mode change while inactive
  useEffect(() => {
    if (!isActive) {
      setTimeLeft(getDurationForMode(timerMode));
    }
  }, [timerMode, workMinutes, breakMinutes, longBreakMinutes]);

  // Main countdown ticker
  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      // Completed!
      setIsActive(false);
      setSessionCompletedNotice(true);
      if (settings.soundEffects) sounds.playTimerComplete();

      if (timerMode === 'work') {
        recordFocusSession(workMinutes);
        setTimerMode('shortBreak');
      } else {
        setTimerMode('work');
      }
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, timerMode, workMinutes, recordFocusSession, settings.soundEffects]);

  const toggleTimer = () => {
    setIsActive(!isActive);
    setSessionCompletedNotice(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getDurationForMode(timerMode));
    setSessionCompletedNotice(false);
  };

  const toggleAmbientSound = () => {
    if (isAmbientPlaying) {
      sounds.stopAmbient();
      setIsAmbientPlaying(false);
    } else {
      sounds.startAmbientFocus(ambientType);
      setIsAmbientPlaying(true);
    }
  };

  // Format MM:SS
  const mins = Math.floor(timeLeft / 60);
  const secs = timeLeft % 60;
  const formattedTime = `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;

  const totalCurrentDuration = getDurationForMode(timerMode);
  const progressPercent = Math.round(((totalCurrentDuration - timeLeft) / totalCurrentDuration) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div className="text-center max-w-xl mx-auto space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-xs font-semibold">
          <Timer className="w-3.5 h-3.5" />
          <span>Calm Neuro-Pacing Studio</span>
        </div>
        <h1 className="text-3xl font-extrabold text-slate-900 dark:text-white">
          Focus & Rest Zone
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Unpressured interval focus with built-in gentle breaks and soothing ambient soundscapes.
        </p>
      </div>

      {/* Main Timer Display */}
      <div className="p-8 sm:p-12 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-md text-center space-y-8 relative overflow-hidden">
        {/* Mode Selector Tabs */}
        <div className="inline-flex items-center gap-1 p-1.5 bg-slate-100 dark:bg-slate-700/60 rounded-2xl border border-slate-200 dark:border-slate-600">
          <button
            onClick={() => { setTimerMode('work'); setIsActive(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              timerMode === 'work'
                ? 'bg-indigo-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            Focus Session ({workMinutes}m)
          </button>

          <button
            onClick={() => { setTimerMode('shortBreak'); setIsActive(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              timerMode === 'shortBreak'
                ? 'bg-teal-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Coffee className="w-3.5 h-3.5" />
            <span>Short Break ({breakMinutes}m)</span>
          </button>

          <button
            onClick={() => { setTimerMode('longBreak'); setIsActive(false); }}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition flex items-center gap-1.5 ${
              timerMode === 'longBreak'
                ? 'bg-purple-600 text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-300 hover:text-slate-900'
            }`}
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Long Break ({longBreakMinutes}m)</span>
          </button>
        </div>

        {/* Big Digital Clock Display */}
        <div className="py-4">
          <div className="text-6xl sm:text-8xl font-extrabold tracking-tight font-mono text-slate-900 dark:text-white">
            {formattedTime}
          </div>
          <p className="text-xs text-slate-400 mt-2 font-medium">
            {timerMode === 'work' ? '🌿 Deep, unhurried study block' : '☕ Rest your eyes and stretch your shoulders'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="max-w-md mx-auto w-full bg-slate-100 dark:bg-slate-700 h-2.5 rounded-full overflow-hidden">
          <div 
            className={`h-full transition-all duration-300 ${
              timerMode === 'work' ? 'bg-indigo-600' : 'bg-teal-500'
            }`}
            style={{ width: `${progressPercent}%` }}
          />
        </div>

        {/* Timer Control Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={toggleTimer}
            className={`px-8 py-3.5 rounded-2xl text-white font-bold text-base shadow-lg transition-all flex items-center gap-2 ${
              isActive
                ? 'bg-amber-600 hover:bg-amber-700 shadow-amber-500/20'
                : 'bg-indigo-600 hover:bg-indigo-700 shadow-indigo-500/20'
            }`}
          >
            {isActive ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            <span>{isActive ? 'Pause Flow' : 'Start Focus'}</span>
          </button>

          <button
            onClick={resetTimer}
            className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 text-slate-700 dark:text-slate-300 font-semibold text-sm transition shadow-xs"
            title="Reset timer"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Ambient Sound Controller */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-700/60 max-w-md mx-auto flex items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-300">
            <button
              onClick={toggleAmbientSound}
              className={`p-2 rounded-xl transition ${
                isAmbientPlaying
                  ? 'bg-teal-500 text-white shadow-xs'
                  : 'bg-slate-100 dark:bg-slate-700 text-slate-500'
              }`}
            >
              {isAmbientPlaying ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <span className="font-semibold">
              {isAmbientPlaying ? 'Ambient Noise: Active' : 'Calm Ambient Audio'}
            </span>
          </div>

          <select
            value={ambientType}
            onChange={(e) => {
              setAmbientType(e.target.value);
              if (isAmbientPlaying) {
                sounds.startAmbientFocus(e.target.value);
              }
            }}
            className="bg-slate-50 dark:bg-slate-700 border border-slate-200 dark:border-slate-600 rounded-lg px-2 py-1 text-slate-700 dark:text-slate-200 font-medium"
          >
            <option value="calm_rain">Gentle Rain Shower</option>
            <option value="binaural">Calm 40Hz Tone</option>
          </select>
        </div>

        {/* Notification when session finishes */}
        {sessionCompletedNotice && (
          <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-emerald-950 dark:text-emerald-200 text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 animate-fadeIn">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>Well done! Interval finished smoothly. Session recorded to your streak.</span>
          </div>
        )}
      </div>

      {/* Focus Stats & Custom Duration Form */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Statistics Card */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Flame className="w-4 h-4 text-amber-500" />
            <span>Focus Telemetry</span>
          </h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Completed Today</span>
              <span className="text-2xl font-extrabold text-indigo-600 dark:text-indigo-400">
                {progress.focusSessionsCompleted}
              </span>
              <span className="text-xs text-slate-500 block">Sessions</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-700/40 text-center">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Total Focus Time</span>
              <span className="text-2xl font-extrabold text-teal-600 dark:text-teal-400">
                {progress.totalStudyMinutes}
              </span>
              <span className="text-xs text-slate-500 block">Minutes</span>
            </div>
          </div>
        </div>

        {/* Custom Duration Settings */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sliders className="w-4 h-4 text-indigo-600" />
            <span>Personalize Timer Lengths</span>
          </h3>

          <div className="space-y-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Focus Duration:</span>
              <input
                type="number"
                min="5"
                max="60"
                value={workMinutes}
                onChange={(e) => setWorkMinutes(Math.max(1, Number(e.target.value)))}
                className="w-16 p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-center font-bold"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Short Break:</span>
              <input
                type="number"
                min="1"
                max="30"
                value={breakMinutes}
                onChange={(e) => setBreakMinutes(Math.max(1, Number(e.target.value)))}
                className="w-16 p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-center font-bold"
              />
            </div>

            <div className="flex items-center justify-between">
              <span className="font-semibold text-slate-700 dark:text-slate-300">Long Break:</span>
              <input
                type="number"
                min="5"
                max="60"
                value={longBreakMinutes}
                onChange={(e) => setLongBreakMinutes(Math.max(1, Number(e.target.value)))}
                className="w-16 p-1.5 rounded-lg border border-slate-200 dark:border-slate-600 bg-slate-50 dark:bg-slate-700 text-center font-bold"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
