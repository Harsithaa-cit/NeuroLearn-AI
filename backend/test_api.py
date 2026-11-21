"""
NeuroLearn AI - Backend & ML Model Test Suite
Verifies:
1. Health endpoint status and model availability
2. Model info and dataset summary endpoints
3. Predict endpoint with valid inputs across low/medium/high profiles
4. Predict endpoint input validation (missing fields, out of range, bad types)
5. Model prediction probabilities sum to 1.0
"""

import json
from app import app

def run_tests():
    client = app.test_client()
    passed = 0
    failed = 0

    def assert_test(name, condition, details=""):
        nonlocal passed, failed
        if condition:
            print(f"  [PASS] {name}")
            passed += 1
        else:
            print(f"  [FAIL] {name} - {details}")
            failed += 1

    print("\n--- 1. Testing GET /health ---")
    res = client.get("/health")
    assert_test("Health endpoint returns 200", res.status_code == 200)
    data = res.get_json()
    assert_test("Status is healthy", data.get("status") == "healthy")
    assert_test("Model is available", data.get("model_available") is True)
    assert_test("Model version is present", bool(data.get("model_version")))

    print("\n--- 2. Testing GET /model_info ---")
    res = client.get("/model_info")
    assert_test("Model info returns 200", res.status_code == 200)
    meta = res.get_json()
    assert_test("Accuracy > 90%", meta.get("metrics", {}).get("accuracy", 0) > 0.90)
    assert_test("3 features present", len(meta.get("input_features", [])) == 3)
    assert_test("3 classes present", len(meta.get("target_classes", [])) == 3)

    print("\n--- 3. Testing POST /predict_frustration (Valid Cases) ---")
    test_cases = [
        {"input": {"time_spent_on_task": 20, "engagement_level": 0.9, "accuracy_of_responses": 0.95}, "expected": "Low"},
        {"input": {"time_spent_on_task": 65, "engagement_level": 0.55, "accuracy_of_responses": 0.55}, "expected": "Medium"},
        {"input": {"time_spent_on_task": 140, "engagement_level": 0.25, "accuracy_of_responses": 0.15}, "expected": "High"}
    ]

    for tc in test_cases:
        res = client.post("/predict_frustration", json=tc["input"])
        assert_test(f"Prediction for {tc['expected']} scenario returns 200", res.status_code == 200)
        body = res.get_json()
        assert_test(f"Prediction result is {tc['expected']}", body.get("prediction") == tc["expected"], f"Got: {body.get('prediction')}")
        assert_test(f"Confidence is float >= 0.5", isinstance(body.get("confidence"), float) and body["confidence"] >= 0.5)
        probs = body.get("probabilities", {})
        prob_sum = round(sum(probs.values()), 2)
        assert_test(f"Probabilities sum to 1.0 (got {prob_sum})", abs(prob_sum - 1.0) < 0.05)
        assert_test("Intervention recommendation present", bool(body.get("recommended_intervention")))

    print("\n--- 4. Testing POST /predict_frustration (Edge Cases & Errors) ---")
    # Missing feature
    res = client.post("/predict_frustration", json={"time_spent_on_task": 30, "engagement_level": 0.8})
    assert_test("Missing feature rejected with 400", res.status_code == 400)

    # Invalid range: engagement > 1.0
    res = client.post("/predict_frustration", json={"time_spent_on_task": 30, "engagement_level": 1.5, "accuracy_of_responses": 0.8})
    assert_test("Out of range engagement rejected with 400", res.status_code == 400)

    # Invalid types
    res = client.post("/predict_frustration", json={"time_spent_on_task": "lots", "engagement_level": 0.8, "accuracy_of_responses": 0.8})
    assert_test("Non-numeric feature rejected with 400", res.status_code == 400)

    # Empty payload
    res = client.post("/predict_frustration", json={})
    assert_test("Empty JSON payload rejected with 400", res.status_code == 400)

    print("\n" + "="*50)
    print(f"TEST SUMMARY: {passed} PASSED, {failed} FAILED")
    print("="*50)

    return failed == 0

if __name__ == "__main__":
    success = run_tests()
    exit(0 if success else 1)
