/**
 * NeuroLearn AI - API Service Layer
 * Interfaces with the Python Flask Backend running the trained Random Forest model.
 */

// Use environment variable VITE_API_URL, fallback to localhost:5000
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const API_ENDPOINTS = {
  HEALTH: `${API_BASE_URL}/health`,
  PREDICT: `${API_BASE_URL}/predict_frustration`,
  MODEL_INFO: `${API_BASE_URL}/model_info`,
  DATASET_SUMMARY: `${API_BASE_URL}/dataset_summary`
};

export async function checkBackendHealth() {
  try {
    const res = await fetch(API_ENDPOINTS.HEALTH, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });
    if (!res.ok) {
      throw new Error(`Backend responded with status: ${res.status}`);
    }
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err.message || 'Unable to connect to Flask API server'
    };
  }
}

export async function fetchModelInfo() {
  try {
    const res = await fetch(API_ENDPOINTS.MODEL_INFO);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

export async function fetchDatasetSummary() {
  try {
    const res = await fetch(API_ENDPOINTS.DATASET_SUMMARY);
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`);
    }
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err.message };
  }
}

/**
 * Call real Flask prediction endpoint with the exact 3 features.
 * @param {Object} features - { time_spent_on_task, engagement_level, accuracy_of_responses }
 */
export async function sendFrustrationPrediction(features) {
  try {
    const res = await fetch(API_ENDPOINTS.PREDICT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        time_spent_on_task: Number(features.time_spent_on_task),
        engagement_level: Number(features.engagement_level),
        accuracy_of_responses: Number(features.accuracy_of_responses)
      })
    });

    const data = await res.json();
    if (!res.ok) {
      return {
        success: false,
        status: res.status,
        error: data.error || `HTTP error ${res.status}`
      };
    }

    return {
      success: true,
      data
    };
  } catch (err) {
    return {
      success: false,
      status: 0,
      error: 'Backend API is unreachable. Please verify that the Flask server is running.'
    };
  }
}
