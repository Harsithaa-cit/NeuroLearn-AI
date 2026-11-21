"""
NeuroLearn AI - Model Training and Dataset Generation Pipeline
Academic Machine Learning PBL Project

This script:
1. Generates a reproducible dataset of 5,000 simulated learning-session records across 500 student profiles.
2. Formats and persists the dataset to backend/data/dataset.csv.
3. Performs Stratified 80:20 train-test splitting.
4. Trains a scikit-learn RandomForestClassifier (n_estimators=100, class_weight='balanced', random_state=42).
5. Computes realistic, rigorous evaluation metrics (Accuracy, Precision, Recall, Macro F1, Confusion Matrix, Feature Importances).
6. Persists the trained model to backend/models/random_forest_model.pkl and metadata to backend/models/model_metadata.json.
"""

import os
import json
import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestClassifier
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix,
    classification_report
)
import joblib

RANDOM_SEED = 42
np.random.seed(RANDOM_SEED)

def generate_reproducible_dataset(n_samples=5000, n_students=500):
    """
    Generate 5,000 learning-session records across 500 student profiles.
    
    Features:
      - time_spent_on_task: Float (seconds), realistic cognitive activity range [10.0, 180.0]
      - engagement_level: Float [0.0, 1.0], derived from interaction consistency and focus signals
      - accuracy_of_responses: Float [0.0, 1.0], proportion of successful responses in task
      
    Target:
      - frustration_level: Categorical ['Low', 'Medium', 'High']
    """
    print(f"Generating {n_samples} simulated learning sessions across {n_students} student profiles...")

    # Assign student baselines (individual traits for pacing and perseverance)
    student_ids = np.repeat(np.arange(1, n_students + 1), n_samples // n_students)
    student_pace_bias = np.random.normal(loc=0.0, scale=8.0, size=n_students)
    student_focus_bias = np.random.normal(loc=0.0, scale=0.08, size=n_students)
    student_ability_bias = np.random.normal(loc=0.0, scale=0.10, size=n_students)

    time_spent = []
    engagement = []
    accuracy = []
    frustration_labels = []

    # Target class distributions approximately balanced across the 3 categories
    for i, s_id in enumerate(student_ids):
        pace = student_pace_bias[s_id - 1]
        focus = student_focus_bias[s_id - 1]
        ability = student_ability_bias[s_id - 1]

        # Random archetype for current session:
        # 0: Smooth flow session (Low frustration)
        # 1: Moderate cognitive struggle (Medium frustration)
        # 2: High friction / disorientation (High frustration)
        session_type = np.random.choice([0, 1, 2], p=[0.35, 0.35, 0.30])

        if session_type == 0:
            # Low frustration: high accuracy, low-to-moderate time, high engagement
            acc = np.clip(np.random.normal(0.85 + ability, 0.08), 0.65, 1.0)
            t = np.clip(np.random.normal(28.0 + pace, 10.0), 10.0, 65.0)
            eng = np.clip(np.random.normal(0.82 + focus, 0.09), 0.55, 1.0)
            label = "Low"
        elif session_type == 1:
            # Medium frustration: moderate accuracy, moderate time, variable engagement
            acc = np.clip(np.random.normal(0.58 + ability, 0.12), 0.35, 0.80)
            t = np.clip(np.random.normal(68.0 + pace, 20.0), 35.0, 115.0)
            eng = np.clip(np.random.normal(0.58 + focus, 0.14), 0.30, 0.85)
            label = "Medium"
        else:
            # High frustration: low accuracy, prolonged time spent or rapid disengagement, low-moderate engagement
            acc = np.clip(np.random.normal(0.28 + ability, 0.12), 0.0, 0.50)
            t = np.clip(np.random.normal(118.0 + pace, 26.0), 60.0, 180.0)
            eng = np.clip(np.random.normal(0.38 + focus, 0.15), 0.10, 0.65)
            label = "High"

        # Introduce realistic realistic boundary overlap / noise (5% label flip to model human variability)
        if np.random.rand() < 0.04:
            label = np.random.choice(["Low", "Medium", "High"])

        time_spent.append(round(float(t), 2))
        engagement.append(round(float(eng), 3))
        accuracy.append(round(float(acc), 3))
        frustration_labels.append(label)

    df = pd.DataFrame({
        "student_id": student_ids,
        "session_id": [f"SESS_{i+1:05d}" for i in range(n_samples)],
        "time_spent_on_task": time_spent,
        "engagement_level": engagement,
        "accuracy_of_responses": accuracy,
        "frustration_level": frustration_labels
    })

    return df

def train_and_evaluate():
    backend_dir = os.path.dirname(os.path.abspath(__file__))
    data_dir = os.path.join(backend_dir, "data")
    models_dir = os.path.join(backend_dir, "models")
    os.makedirs(data_dir, exist_ok=True)
    os.makedirs(models_dir, exist_ok=True)

    dataset_path = os.path.join(data_dir, "dataset.csv")
    model_path = os.path.join(models_dir, "random_forest_model.pkl")
    metadata_path = os.path.join(models_dir, "model_metadata.json")

    # Generate or load dataset
    df = generate_reproducible_dataset(n_samples=5000, n_students=500)
    df.to_csv(dataset_path, index=False)
    print(f"Dataset successfully created and saved to: {dataset_path}")
    print(f"Dataset shape: {df.shape}")
    print("Class distribution:")
    print(df['frustration_level'].value_counts())

    # Exact 3 input features specified in project requirements
    feature_cols = ["time_spent_on_task", "engagement_level", "accuracy_of_responses"]
    target_col = "frustration_level"

    X = df[feature_cols]
    y = df[target_col]

    # Stratified 80:20 Train-Test split
    X_train, X_test, y_train, y_test = train_test_split(
        X, y,
        test_size=0.20,
        random_state=RANDOM_SEED,
        stratify=y
    )

    print(f"\nTraining set size: {len(X_train)} sessions")
    print(f"Testing set size: {len(X_test)} sessions")

    # Random Forest Classifier with exact specifications:
    # 100 estimators, class_weight='balanced', random_state=42
    rf = RandomForestClassifier(
        n_estimators=100,
        class_weight='balanced',
        random_state=RANDOM_SEED,
        n_jobs=-1
    )

    print("\nTraining Random Forest Classifier (n_estimators=100, class_weight='balanced')...")
    rf.fit(X_train, y_train)

    # Evaluate on test set
    y_pred = rf.predict(X_test)
    y_proba = rf.predict_proba(X_test)

    classes = list(rf.classes_)
    acc = accuracy_score(y_test, y_pred)
    prec_macro = precision_score(y_test, y_pred, average='macro')
    rec_macro = recall_score(y_test, y_pred, average='macro')
    f1_macro = f1_score(y_test, y_pred, average='macro')
    cm = confusion_matrix(y_test, y_pred, labels=classes)

    # Per-class metrics
    prec_per_class = precision_score(y_test, y_pred, average=None, labels=classes)
    rec_per_class = recall_score(y_test, y_pred, average=None, labels=classes)
    f1_per_class = f1_score(y_test, y_pred, average=None, labels=classes)

    feature_importances = dict(zip(feature_cols, [round(float(v), 4) for v in rf.feature_importances_]))

    print("\n" + "="*50)
    print("MODEL EVALUATION RESULTS (80:20 Stratified Test Set)")
    print("="*50)
    print(f"Accuracy:       {acc * 100:.2f}%")
    print(f"Precision (M):  {prec_macro * 100:.2f}%")
    print(f"Recall (M):     {rec_macro * 100:.2f}%")
    print(f"Macro F1 Score: {f1_macro * 100:.2f}%")
    print("\nConfusion Matrix (Classes: " + ", ".join(classes) + "):")
    print(cm)
    print("\nFeature Importances:")
    for k, v in feature_importances.items():
        print(f"  - {k}: {v * 100:.2f}%")
    print("\nDetailed Classification Report:")
    print(classification_report(y_test, y_pred, digits=4))

    # Persist model
    joblib.dump(rf, model_path)
    print(f"\nTrained Random Forest model successfully saved to: {model_path}")

    # Prepare metadata
    metadata = {
        "model_name": "NeuroLearn Random Forest Frustration Classifier",
        "algorithm": "RandomForestClassifier",
        "version": "1.0.0",
        "random_state": RANDOM_SEED,
        "n_estimators": 100,
        "class_weight": "balanced",
        "training_samples": len(X_train),
        "test_samples": len(X_test),
        "total_samples": len(df),
        "student_profiles": 500,
        "input_features": feature_cols,
        "feature_ranges": {
            "time_spent_on_task": {"min": float(df["time_spent_on_task"].min()), "max": float(df["time_spent_on_task"].max()), "unit": "seconds"},
            "engagement_level": {"min": float(df["engagement_level"].min()), "max": float(df["engagement_level"].max()), "unit": "normalized [0-1]"},
            "accuracy_of_responses": {"min": float(df["accuracy_of_responses"].min()), "max": float(df["accuracy_of_responses"].max()), "unit": "proportion [0-1]"}
        },
        "target_classes": classes,
        "metrics": {
            "accuracy": round(float(acc), 4),
            "precision_macro": round(float(prec_macro), 4),
            "recall_macro": round(float(rec_macro), 4),
            "f1_macro": round(float(f1_macro), 4),
            "per_class": {
                cls: {
                    "precision": round(float(prec_per_class[idx]), 4),
                    "recall": round(float(rec_per_class[idx]), 4),
                    "f1_score": round(float(f1_per_class[idx]), 4)
                }
                for idx, cls in enumerate(classes)
            },
            "confusion_matrix": cm.tolist()
        },
        "feature_importances": feature_importances,
        "interventions_map": {
            "Low": "Continue the current lesson. Offer optional challenges. Encourage independent learning.",
            "Medium": "Offer a simpler explanation. Provide another example. Offer a conceptual hint.",
            "High": "Divide the activity into smaller tasks. Offer guided reasoning. Provide a similar example. Suggest an optional short break."
        },
        "disclaimer": "This ML model provides experimental learning-support estimates. It does NOT diagnose ADHD or any clinical or psychological conditions."
    }

    with open(metadata_path, "w", encoding="utf-8") as f:
        json.dump(metadata, f, indent=2)
    print(f"Model metadata successfully saved to: {metadata_path}")

    return metadata

if __name__ == "__main__":
    train_and_evaluate()
