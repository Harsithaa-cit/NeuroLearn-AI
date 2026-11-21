import React from 'react';
import { 
  Settings as SettingsIcon, 
  Moon, 
  Sun, 
  Eye, 
  Volume2, 
  VolumeX, 
  Zap, 
  Sliders, 
  RotateCcw, 
  Check, 
  Sparkles,
  Shield,
  Type
} from 'lucide-react';
import { useSettings } from '../context/SettingsContext';

export default function SettingsPage() {
  const { settings, updateSetting, resetSettings } = useSettings();

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950 text-indigo-700 dark:text-indigo-400 text-xs font-semibold mb-2">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>Neuroinclusive Accessibility</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
          Personalization & Preferences
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Customize sensory comfort, typography, and study pacing to fit your individual cognitive style.
        </p>
      </div>

      <div className="space-y-6">
        {/* Visual Appearance & Theme */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Eye className="w-5 h-5 text-indigo-600" />
            <span>Visual Theme & Contrast</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Theme Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 block">
                  Color Theme
                </span>
                <span className="text-xs text-slate-500">
                  {settings.theme === 'dark' ? 'Deep Navy Dark Mode' : 'Warm White Light Mode'}
                </span>
              </div>
              <div className="flex items-center gap-1 p-1 bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
                <button
                  type="button"
                  onClick={() => updateSetting('theme', 'light')}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                    settings.theme === 'light' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
                  }`}
                  title="Light mode"
                >
                  <Sun className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => updateSetting('theme', 'dark')}
                  className={`p-1.5 rounded-lg text-xs font-semibold transition ${
                    settings.theme === 'dark' ? 'bg-indigo-600 text-white shadow-xs' : 'text-slate-500'
                  }`}
                  title="Dark mode"
                >
                  <Moon className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* High Contrast Mode */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 flex items-center justify-between">
              <div>
                <span className="font-bold text-xs sm:text-sm text-slate-800 dark:text-slate-200 block">
                  High Contrast
                </span>
                <span className="text-xs text-slate-500">
                  Enhanced text and border contrast
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateSetting('highContrast', !settings.highContrast)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.highContrast ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.highContrast ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Typography & Readability */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Type className="w-5 h-5 text-indigo-600" />
            <span>Typography & Font Size</span>
          </h2>

          <div className="space-y-3">
            <span className="text-xs text-slate-500 block">
              Scale text size across all lessons, questions, and hints:
            </span>
            <div className="grid grid-cols-4 gap-2">
              {[
                { size: 'sm', label: 'Compact', px: '14px' },
                { size: 'md', label: 'Standard', px: '16px' },
                { size: 'lg', label: 'Comfortable', px: '18px' },
                { size: 'xl', label: 'Expanded', px: '20px' }
              ].map((item) => (
                <button
                  key={item.size}
                  type="button"
                  onClick={() => updateSetting('fontSize', item.size)}
                  className={`p-3 rounded-2xl border text-center transition ${
                    settings.fontSize === item.size
                      ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 font-bold text-indigo-900 dark:text-indigo-200 ring-2 ring-indigo-500/20'
                      : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30 text-slate-700 dark:text-slate-300'
                  }`}
                >
                  <span className="text-xs block font-bold">{item.label}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{item.px}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Sensory & Motion Controls */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-indigo-600" />
            <span>Sensory Comfort & Reduced Motion</span>
          </h2>

          <div className="space-y-3 text-xs sm:text-sm">
            {/* Reduced Motion Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Reduced Motion
                </span>
                <span className="text-xs text-slate-500">
                  Disables page slide transitions and bouncing badges
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateSetting('reducedMotion', !settings.reducedMotion)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.reducedMotion ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.reducedMotion ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Sound Effects Toggle */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Gentle Sound Effects
                </span>
                <span className="text-xs text-slate-500">
                  Calm chimes for problem solves and hint openings
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateSetting('soundEffects', !settings.soundEffects)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.soundEffects ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.soundEffects ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>

            {/* Distraction Free Mode */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-700/40 border border-slate-200 dark:border-slate-600 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-800 dark:text-slate-200 block">
                  Distraction-Free Mode
                </span>
                <span className="text-xs text-slate-500">
                  Focus purely on the current task without ancillary telemetry
                </span>
              </div>
              <button
                type="button"
                onClick={() => updateSetting('distractionFree', !settings.distractionFree)}
                className={`w-12 h-6 rounded-full transition-colors relative ${
                  settings.distractionFree ? 'bg-indigo-600' : 'bg-slate-300 dark:bg-slate-600'
                }`}
              >
                <span className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                  settings.distractionFree ? 'translate-x-7' : 'translate-x-1'
                }`} />
              </button>
            </div>
          </div>
        </div>

        {/* Preferred Learning Modality */}
        <div className="p-6 rounded-3xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs space-y-4">
          <h2 className="text-base font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Zap className="w-5 h-5 text-indigo-600" />
            <span>Default Learning Mode</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {[
              { id: 'quick', title: 'Quick Learning', desc: 'Bite-sized bullets and rapid takeaways' },
              { id: 'visual', title: 'Visual Learning', desc: 'ASCII mental models and spatial maps' },
              { id: 'stepByStep', title: 'Step-by-Step', desc: 'Numbered incremental logical sequences' }
            ].map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => updateSetting('preferredMode', m.id)}
                className={`p-4 rounded-2xl border text-left transition ${
                  settings.preferredMode === m.id
                    ? 'border-indigo-600 bg-indigo-50 dark:bg-indigo-950/60 ring-2 ring-indigo-500/20'
                    : 'border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-700/30'
                }`}
              >
                <span className="text-xs font-bold text-slate-900 dark:text-white block mb-1">
                  {m.title}
                </span>
                <span className="text-[11px] text-slate-500 leading-snug block">
                  {m.desc}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Reset Actions */}
        <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-100 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs">
          <span className="text-slate-500">
            All preferences are saved securely in your browser's local storage.
          </span>
          <button
            type="button"
            onClick={resetSettings}
            className="px-3.5 py-1.5 rounded-xl bg-white dark:bg-slate-700 border border-slate-200 dark:border-slate-600 text-rose-600 dark:text-rose-400 font-bold hover:bg-rose-50 transition flex items-center gap-1.5 shadow-xs"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Defaults</span>
          </button>
        </div>
      </div>
    </div>
  );
}
