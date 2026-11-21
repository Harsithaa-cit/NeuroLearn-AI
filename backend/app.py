"""
NeuroLearn AI - Flask Machine Learning REST API
Serves real-time inference using the trained Random Forest classifier.
"""

import os
import json
from flask import Flask, request, jsonify, make_response
from predict import predict_frustration, get_model, METADATA_PATH, MODEL_PATH

app = Flask(__name__)

# Resilient CORS handling: Works natively or with flask_cors if installed
try:
    from flask_cors import CORS
    CORS(app, resources={r"/*": {"origins": "*"}})
except ImportError:
    pass

@app.after_request
def apply_cors_headers(response):
    response.headers["Access-Control-Allow-Origin"] = "*"
    response.headers["Access-Control-Allow-Headers"] = "Content-Type,Authorization,X-Requested-With"
    response.headers["Access-Control-Allow-Methods"] = "GET,POST,OPTIONS,HEAD"
    return response

@app.route("/", methods=["GET"])
def index():
    return jsonify({
        "service": "NeuroLearn AI Adaptive Learning ML API",
        "status": "online",
        "endpoints": {
            "health": "/health",
            "predict": "/predict_frustration",
            "model_info": "/model_info",
            "dataset_summary": "/dataset_summary"
        }
    })

@app.route("/health", methods=["GET"])
def health():
    """Health check endpoint indicating model readiness and metadata."""
    model_exists = os.path.exists(MODEL_PATH)
    meta = None
    if os.path.exists(METADATA_PATH):
        try:
            with open(METADATA_PATH, "r", encoding="utf-8") as f:
                meta = json.load(f)
        except Exception:
            pass

    return jsonify({
        "status": "healthy" if model_exists else "degraded",
        "model_available": model_exists,
        "model_version": meta.get("version", "1.0.0") if meta else "unknown",
        "model_name": meta.get("model_name", "Random Forest Frustration Classifier") if meta else "unknown",
        "evaluation_summary": {
            "accuracy": meta.get("metrics", {}).get("accuracy") if meta else None,
            "macro_f1": meta.get("metrics", {}).get("f1_macro") if meta else None,
            "classes": meta.get("target_classes") if meta else ["High", "Low", "Medium"]
        } if meta else None
    }), 200

@app.route("/model_info", methods=["GET"])
def model_info():
    """Returns detailed training metadata, confusion matrix, and feature importances."""
    if not os.path.exists(METADATA_PATH):
        return jsonify({"error": "Model metadata not found"}), 404

    with open(METADATA_PATH, "r", encoding="utf-8") as f:
        meta = json.load(f)

    return jsonify(meta), 200

@app.route("/dataset_summary", methods=["GET"])
def dataset_summary():
    """Returns dataset summary and preview records."""
    data_csv = os.path.join(os.path.dirname(os.path.abspath(__file__)), "data", "dataset.csv")
    if not os.path.exists(data_csv):
        return jsonify({"error": "Dataset file not found"}), 404

    import pandas as pd
    df = pd.read_csv(data_csv)
    sample_records = df.head(10).to_dict(orient="records")
    class_distribution = df["frustration_level"].value_counts().to_dict()

    return jsonify({
        "total_records": len(df),
        "total_students": int(df["student_id"].nunique()),
        "class_distribution": class_distribution,
        "sample_records": sample_records,
        "feature_summary": {
            "time_spent_on_task": {
                "mean": round(float(df["time_spent_on_task"].mean()), 2),
                "min": round(float(df["time_spent_on_task"].min()), 2),
                "max": round(float(df["time_spent_on_task"].max()), 2)
            },
            "engagement_level": {
                "mean": round(float(df["engagement_level"].mean()), 3),
                "min": round(float(df["engagement_level"].min()), 3),
                "max": round(float(df["engagement_level"].max()), 3)
            },
            "accuracy_of_responses": {
                "mean": round(float(df["accuracy_of_responses"].mean()), 3),
                "min": round(float(df["accuracy_of_responses"].min()), 3),
                "max": round(float(df["accuracy_of_responses"].max()), 3)
            }
        }
    }), 200

@app.route("/predict_frustration", methods=["POST", "OPTIONS"])
def predict():
    """
    POST endpoint for real ML frustration estimation.
    Accepts JSON:
    {
      "time_spent_on_task": float,
      "engagement_level": float,
      "accuracy_of_responses": float
    }
    """
    if request.method == "OPTIONS":
        return make_response("", 200)

    if not os.path.exists(MODEL_PATH):
        return jsonify({
            "error": "Random Forest model is not available on this server.",
            "status_code": 503
        }), 503

    payload = request.get_json(silent=True)
    if payload is None:
        return jsonify({
            "error": "Invalid or missing JSON payload in request body",
            "status_code": 400
        }), 400

    try:
        result = predict_frustration(payload)
        if "error" in result:
            return jsonify(result), result.get("status_code", 400)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({
            "error": f"Internal inference error: {str(e)}",
            "status_code": 500
        }), 500

if __name__ == "__main__":
    # Host on 0.0.0.0:5000
    port = int(os.environ.get("PORT", 5000))
    print(f"Starting NeuroLearn Flask ML API on port {port}...")
    app.run(host="0.0.0.0", port=port, debug=False)
