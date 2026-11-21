import React, { createContext, useContext, useState, useEffect } from 'react';

const SettingsContext = createContext();

const SETTINGS_STORAGE_KEY = 'neurolearn_user_settings';

const DEFAULT_SETTINGS = {
  theme: 'light', // 'light' | 'dark'
  highContrast: false,
  fontSize: 'md', // 'sm' | 'md' | 'lg' | 'xl'
  reducedMotion: false,
  distractionFree: false,
  soundEffects: true,
  preferredMode: 'visual', // 'quick' | 'visual' | 'stepByStep'
  pomodoroWorkMinutes: 25,
  pomodoroBreakMinutes: 5,
  pomodoroLongBreakMinutes: 15,
  breakReminders: true
};

export function SettingsProvider({ children }) {
  const [settings, setSettings] = useState(() => {
    try {
      const saved = localStorage.getItem(SETTINGS_STORAGE_KEY);
      return saved ? { ...DEFAULT_SETTINGS, ...JSON.parse(saved) } : DEFAULT_SETTINGS;
    } catch (e) {
      return DEFAULT_SETTINGS;
    }
  });

  // Apply visual settings directly to document body
  useEffect(() => {
    try {
      localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
    } catch (e) {
      console.error('Failed to save settings to localStorage', e);
    }

    const body = document.body;
    
    // Theme
    if (settings.theme === 'dark') {
      body.classList.add('dark-theme');
    } else {
      body.classList.remove('dark-theme');
    }

    // High Contrast
    if (settings.highContrast) {
      body.classList.add('high-contrast');
    } else {
      body.classList.remove('high-contrast');
    }

    // Font size
    body.classList.remove('font-sm', 'font-md', 'font-lg', 'font-xl');
    body.classList.add(`font-${settings.fontSize}`);

    // Reduced motion
    if (settings.reducedMotion) {
      body.classList.add('reduced-motion');
    } else {
      body.classList.remove('reduced-motion');
    }
  }, [settings]);

  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_SETTINGS);
  };

  return (
    <SettingsContext.Provider value={{ settings, updateSetting, resetSettings }}>
      {children}
    </SettingsContext.Provider>
  );
}

export function useSettings() {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}
