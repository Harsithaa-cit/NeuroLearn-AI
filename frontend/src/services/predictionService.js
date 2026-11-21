/**
 * NeuroLearn AI - Adaptive Prediction Coordinator
 * 
 * Coordinates feature extraction, real Flask API calls,
 * adaptive intervention recommendations, and history persistence in localStorage.
 */

import { sendFrustrationPrediction } from './api.js';

const STORAGE_KEY = 'neurolearn_prediction_history';

export const ADAPTIVE_INTERVENTIONS = {
  Low: {
    category: 'Low Support Need (Flow State)',
    theme: 'emerald',
    badge: 'Flow State',
    description: 'The student demonstrates strong comprehension and smooth problem-solving flow.',
    actions: [
      'Continue with current lesson pace and objectives.',
      'Offer optional advanced extension challenges.',
      'Encourage self-directed exploration and reflection.'
    ],
    showBreakOffer: false
  },
  Medium: {
    category: 'Medium Support Need (Emerging Friction)',
    theme: 'amber',
    badge: 'Moderate Cognitive Load',
    description: 'The student is actively wrestling with concepts and would benefit from light cognitive scaffolding.',
    actions: [
      'Present a simplified visual analogy or real-world mental model.',
      'Provide an isomorphic example without revealing the original solution.',
      'Highlight key conceptual distinctions.'
    ],
    showBreakOffer: false
  },
  High: {
    category: 'High Support Need (Elevated Friction)',
    theme: 'rose',
    badge: 'High Cognitive Friction',
    description: 'The student is experiencing high difficulty or prolonged friction. Scaffolding and pacing adjustments recommended.',
    actions: [
      'Deconstruct the task into smaller bite-sized logical steps.',
      'Provide guided step-by-step reasoning with supportive feedback.',
      'Suggest an optional gentle 3-5 minute mind break or stretch.'
    ],
    showBreakOffer: true
  }
};

export async function processAdaptivePrediction(features, contextData = {}) {
  const result = await sendFrustrationPrediction(features);

  if (!result.success) {
    return {
      success: false,
      error: result.error,
      features,
      intervention: null
    };
  }

  const { prediction, confidence, probabilities, recommended_intervention } = result.data;
  const interventionConfig = ADAPTIVE_INTERVENTIONS[prediction] || ADAPTIVE_INTERVENTIONS.Medium;

  const predictionRecord = {
    id: `PRED_${Date.now()}`,
    timestamp: new Date().toISOString(),
    features,
    prediction,
    confidence,
    probabilities,
    recommended_intervention,
    interventionConfig,
    context: {
      subject: contextData.subject || 'General Learning',
      activityType: contextData.activityType || 'Interactive Lesson',
      title: contextData.title || 'Practice Session'
    }
  };

  // Persist to localStorage
  savePredictionToHistory(predictionRecord);

  return {
    success: true,
    data: predictionRecord
  };
}

export function getPredictionHistory() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error('Error reading prediction history:', e);
    return [];
  }
}

export function savePredictionToHistory(record) {
  try {
    const current = getPredictionHistory();
    // Keep most recent 50 predictions
    const updated = [record, ...current].slice(0, 50);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error('Error persisting prediction history:', e);
  }
}

export function clearPredictionHistory() {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (e) {
    console.error('Error clearing prediction history:', e);
  }
}
