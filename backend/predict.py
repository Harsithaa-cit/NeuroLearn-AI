"""
NeuroLearn AI - Prediction Engine
Inference module for Random Forest frustration classification.
"""

import os
import json
import joblib
import numpy as np

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
MODEL_PATH = os.path.join(BASE_DIR, "models", "random_forest_model.pkl")
METADATA_PATH = os.path.join(BASE_DIR, "models", "model_metadata.json")

FEATURE_ORDER = ["time_spent_on_task", "engagement_level", "accuracy_of_responses"]

INTERVENTIONS = {
    "Low": "Continue the current lesson. Offer optional challenges. Encourage independent learning.",
    "Medium": "Offer a simpler explanation. Provide another example. Offer a conceptual hint.",
    "High": "Divide the activity into smaller tasks. Offer guided reasoning. Provide a similar example. Suggest an optional short break."
}

_model = None
_metadata = None

def get_model():
    """Lazy load and cache the Random Forest model."""
    global _model, _metadata
    if _model is None:
        if not os.path.exists(MODEL_PATH):
            raise FileNotFoundError(f"Trained model not found at: {MODEL_PATH}")
        _model = joblib.load(MODEL_PATH)
    if _metadata is None and os.path.exists(METADATA_PATH):
        with open(METADATA_PATH, "r", encoding="utf-8") as f:
            _metadata = json.load(f)
    return _model, _metadata

def validate_features(data):
    """
    Validate incoming feature dictionary.
    Returns (cleaned_feature_dict, error_message).
    """
    if not isinstance(data, dict):
        return None, "Input payload must be a JSON object"

    cleaned = {}
    missing = []
    for f in FEATURE_ORDER:
        if f not in data:
            missing.append(f)
    if missing:
        return None, f"Missing required features: {', '.join(missing)}"

    try:
        time_spent = float(data["time_spent_on_task"])
        engagement = float(data["engagement_level"])
        accuracy = float(data["accuracy_of_responses"])
    except (ValueError, TypeError):
        return None, "All feature values must be numeric (float or integer)"

    # Validate logical boundaries
    if time_spent < 0 or time_spent > 3600:
        return None, "time_spent_on_task must be between 0 and 3600 seconds"

    if engagement < 0.0 or engagement > 1.0:
        return None, "engagement_level must be between 0.0 and 1.0"

    if accuracy < 0.0 or accuracy > 1.0:
        return None, "accuracy_of_responses must be between 0.0 and 1.0"

    cleaned["time_spent_on_task"] = time_spent
    cleaned["engagement_level"] = engagement
    cleaned["accuracy_of_responses"] = accuracy

    return cleaned, None

def predict_frustration(features_dict):
    """
    Execute real inference using the Random Forest classifier.
    """
    cleaned, err = validate_features(features_dict)
    if err:
        return {"error": err, "status_code": 400}

    model, metadata = get_model()
    
    # Ensure exact feature ordering with explicit feature names
    import pandas as pd
    X = pd.DataFrame([{f: cleaned[f] for f in FEATURE_ORDER}])

    # Real model prediction
    prediction_raw = model.predict(X)[0]
    probabilities_raw = model.predict_proba(X)[0]
    classes = list(model.classes_)

    # Map probabilities to class names
    prob_dict = {
        cls_name: round(float(prob), 4)
        for cls_name, prob in zip(classes, probabilities_raw)
    }

    # Confidence is the probability of the predicted class
    confidence = prob_dict.get(str(prediction_raw), round(float(np.max(probabilities_raw)), 4))
    recommended = INTERVENTIONS.get(
        str(prediction_raw),
        "Provide adaptive learning support tailored to current engagement."
    )

    return {
        "prediction": str(prediction_raw),
        "confidence": confidence,
        "probabilities": prob_dict,
        "recommended_intervention": recommended,
        "input_features": cleaned,
        "model_version": metadata.get("version", "1.0.0") if metadata else "1.0.0",
        "disclaimer": "Experimental learning-support estimate. Does not constitute a clinical assessment or diagnosis."
    }

if __name__ == "__main__":
    # Self-test
    print("Testing prediction on sample cases:")
    samples = [
        {"time_spent_on_task": 25, "engagement_level": 0.85, "accuracy_of_responses": 0.90},
        {"time_spent_on_task": 65, "engagement_level": 0.55, "accuracy_of_responses": 0.55},
        {"time_spent_on_task": 130, "engagement_level": 0.30, "accuracy_of_responses": 0.20}
    ]
    for s in samples:
        res = predict_frustration(s)
        print(f"Input: {s} -> Prediction: {res['prediction']} (Confidence: {res['confidence']})")
