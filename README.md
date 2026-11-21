# NeuroLearn AI
### An ML-Powered Neuroinclusive Adaptive Learning Platform for Students with ADHD

> **Tagline:** *Different minds. Different paths. One inclusive learning space.*  
> **Academic Context:** Machine Learning Project-Based Learning (PBL) Capstone Project  
> **Core Architecture:** Real Random Forest ML Model (100 Trees) + Flask REST API + React (Vite) Frontend + Amazon S3 Static Hosting Compatible

---

## 1. Project Vision & Core Problem

Traditional educational software adopts a one-size-fits-all approach: dense text walls, punitive countdown timers, and rigid linear progressions. When students encounter difficulty, conventional AI tutors or chatbots either declare "Wrong!" or immediately spoon-feed the solution—short-circuiting genuine cognitive consolidation.

For students with ADHD and diverse attention profiles, executive function fatigue and cognitive friction can lead to premature disengagement. Students benefit substantially from:
- **Bite-sized, 5-minute modular learning units** with real-world analogies and visual mental models.
- **Cognitive pacing without punitive timers** or high-stress countdown sirens.
- **The Signature "Think-First" Cognitive Scaffolding Protocol:** Gradually guiding students toward discovering the answer independently rather than immediately revealing solutions.
- **Real-time Machine Learning support:** Calibrated Random Forest inference that estimates cognitive friction levels (`Low`, `Medium`, `High`) to offer adaptive accommodations without intrusive surveillance.

> **Important Clinical & Ethical Disclaimer:**  
> NeuroLearn AI is an educational technology and machine learning project. The system does **not** diagnose ADHD or make clinical, psychological, or neurological claims. Machine Learning predictions are experimental estimates of learning-support categories, not verified emotional states or medical diagnoses.

---

## 2. Technology Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 18, Vite, Tailwind CSS, Lucide React Icons, Recharts, React Router (HashRouter for S3) |
| **Backend** | Python 3.11, Flask, Flask-CORS, NumPy, Pandas, Scikit-Learn, Joblib |
| **Machine Learning** | Random Forest Classifier (`n_estimators=100`, `class_weight='balanced'`, `random_state=42`) |
| **Persistence** | `localStorage` for user preferences, streak counters, and session telemetry; CSV/JSON for dataset & model artifacts |
| **Deployment** | **Frontend:** Amazon S3 Static Website Hosting (or CloudFront CDN) <br> **Backend:** Separately hosted Flask API (EC2, Render, Railway, or AWS App Runner) |

---

## 3. Machine Learning Specifications & Evaluation

### Training Dataset
- **Volume:** 5,000 simulated learning-session records across 500 unique student profiles (`data/dataset.csv`).
- **Student Profile Baselines:** Simulates individual variance in natural processing speed, focus stamina, and foundational comprehension.
- **Feature Schema (Exact 3 Input Features):**
  1. `time_spent_on_task`: Elapsed active seconds spent on task (cognitive range: `[10.0, 180.0]`).
  2. `engagement_level`: Normalized score (`[0.0, 1.0]`) derived from interaction persistence, hint queries, and reflection.
  3. `accuracy_of_responses`: Proportion of correct responses over total attempts (`[0.0, 1.0]`).
- **Target Variable:** `frustration_level` with classes `Low`, `Medium`, `High`.

### Model Evaluation (80:20 Stratified Test Partition: 1,000 Sessions)
- **Algorithm:** Scikit-Learn `RandomForestClassifier`
- **Ensemble Depth:** 100 Trees
- **Class Weighting:** Balanced
- **Random State:** 42

| Metric | Score |
|---|---|
| **Accuracy** | **95.20%** |
| **Macro Precision** | **95.34%** |
| **Macro Recall** | **95.12%** |
| **Macro F1 Score** | **95.20%** |

### Confusion Matrix (Test Partition)
```
Actual \ Predicted     High      Low     Medium
-----------------------------------------------
Actual High             284        3         17
Actual Low                5      330         11
Actual Medium             5        7        338
```

### Feature Importance Breakdown
- **time_spent_on_task:** 37.63%
- **accuracy_of_responses:** 36.60%
- **engagement_level:** 25.76%

---

## 4. Flask REST API Specification

### Endpoint 1: `GET /health`
Returns server status and Random Forest model readiness.
```json
{
  "status": "healthy",
  "model_available": true,
  "model_name": "NeuroLearn Random Forest Frustration Classifier",
  "model_version": "1.0.0",
  "evaluation_summary": {
    "accuracy": 0.952,
    "macro_f1": 0.952,
    "classes": ["High", "Low", "Medium"]
  }
}
```

### Endpoint 2: `POST /predict_frustration`
Accepts student interaction features and executes real Random Forest inference.
- **Request Body:**
```json
{
  "time_spent_on_task": 25.0,
  "engagement_level": 0.85,
  "accuracy_of_responses": 0.90
}
```
- **Response Body (Real Model Output):**
```json
{
  "prediction": "Low",
  "confidence": 0.99,
  "probabilities": {
    "High": 0.00,
    "Low": 0.99,
    "Medium": 0.01
  },
  "recommended_intervention": "Continue the current lesson. Offer optional challenges. Encourage independent learning.",
  "input_features": {
    "time_spent_on_task": 25.0,
    "engagement_level": 0.85,
    "accuracy_of_responses": 0.9
  },
  "model_version": "1.0.0",
  "disclaimer": "Experimental learning-support estimate. Does not constitute a clinical assessment or diagnosis."
}
```

### Endpoint 3: `GET /model_info`
Returns complete model metadata, confusion matrix, per-class metrics, and feature importances.

### Endpoint 4: `GET /dataset_summary`
Returns dataset preview, class distribution, and feature statistical summaries.

---

## 5. Signature Innovation: Think-First Cognitive Scaffolding

Unlike standard tutoring systems that immediately give away answers when a mistake occurs, NeuroLearn AI enforces a **student-controlled discovery ladder**:

```
[ Student Attempt ]
        │
   Is Correct?
   ├── YES ──> Celebrate reasoning & prompt metacognitive reflection
   └── NO  ──> NEVER reveal answer! Initiate Stage 1:
                 │
          [ STAGE 1: Independent Thinking ]
          Take your time. No forced rush. Optional thinking timer.
                 │
                 ├── Student requests assistance ──> [ STAGE 2: Progressive 4-Tier Ladder ]
                 │                                     Tier 1: Gentle Nudge
                 │                                     Tier 2: Concept Reminder
                 │                                     Tier 3: Guided Sub-Steps
                 │                                     Tier 4: Similar Isomorphic Example
                 │
                 └── Student requests full breakdown ─> [ STAGE 3: Optional Step-by-Step Solution ]
```

### Post-Solution Reflection
Students self-report their problem-solving path:
1. *"I figured it out myself."*
2. *"A hint helped me."*
3. *"The example helped me."*
4. *"I needed a step-by-step explanation."*

---

## 6. Complete Pages Implemented

1. **Overview (Landing Page):** EdTech startup presentation, hero section, interactive cognitive loop diagram, problem/solution comparative matrix, and call to action.
2. **Student Dashboard:** Personalized greeting, daily goal progress bar, learning streak counter, 7-day study bar chart, continue learning card, and real ML prediction insights.
3. **Adaptive Learning Room:** 5 comprehensive subjects (Python Programming, Data Structures, Applied Mathematics, AI & Machine Learning, Modern Web Development) with 3 learning modes (Quick, Visual, Step-by-Step), interactive checkpoints, and live ML feedback.
4. **Think-First Learning Room:** The signature cognitive scaffolding engine featuring unpressured thinking timers, 4 progressive hint tiers, similar worked examples, and reflection logging.
5. **AI Learning Support Dashboard:** Live Flask API health indicator, interactive feature slider sandbox, real class probability distribution charts, Random Forest feature importance chart, and test set confusion matrix.
6. **Smart Hint System:** Dedicated laboratory showcasing the 4-tier cognitive ladder.
7. **Focus Zone:** Customizable interval timer (25m focus, 5m short break, 15m long break) with offline synthesized ambient soundscapes (gentle rain & 40Hz binaural focus tone) via native Web Audio API.
8. **Quiz Arena:** Interactive multi-question assessments with instant supportive feedback, Think-First hint integration, score calculations, and answer review.
9. **Learning Analytics:** Recharts interactive visualizations tracking study minutes, curriculum mastery, independent vs guided solve ratios, and historical assessment records.
10. **Personalization & Accessibility:** Light/Dark theme switch, high-contrast mode, typography font-size scaling (`sm`, `md`, `lg`, `xl`), reduced motion, distraction-free view, and sound toggles.
11. **Student Profile:** Student ID, streak, cognitive preferences summary, goal progress, and unlocked achievement badges.

---

## 7. Project Structure

```
neurolearn-ai/
│
├── backend/
│   ├── app.py                      # Flask REST API with CORS & error handling
│   ├── train_model.py              # Reproducible dataset generator & RF training script
│   ├── predict.py                  # Real ML inference module & input validator
│   ├── test_api.py                 # Comprehensive backend test suite (27 passing tests)
│   ├── requirements.txt            # Python dependencies
│   ├── data/
│   │   └── dataset.csv             # 5,000 session records across 500 student profiles
│   └── models/
│       ├── random_forest_model.pkl # Trained Random Forest model (100 estimators)
│       └── model_metadata.json     # Evaluation metrics, confusion matrix, feature weights
│
├── frontend/
│   ├── public/                     # Static public assets
│   ├── src/
│   │   ├── components/             # Reusable UI components (ThinkingTimer, Banners)
│   │   ├── pages/                  # 11 complete website pages
│   │   ├── layouts/                # Sticky responsive Navbar & comprehensive Footer
│   │   ├── context/                # SettingsContext & StudentProgressContext
│   │   ├── services/
│   │   │   ├── api.js              # Configurable Flask API client
│   │   │   ├── featureExtraction.js# Real interaction signal extractor (Time, Eng, Acc)
│   │   │   └── predictionService.js# ML coordinator & localStorage persistence
│   │   ├── data/
│   │   │   ├── curriculumData.js   # 5 subjects with Quick, Visual, and Step modes
│   │   │   ├── thinkFirstData.js   # 4-tier scaffolding questions
│   │   │   └── quizData.js         # Topic quizzes with hints
│   │   ├── utils/
│   │   │   └── soundEffects.js     # Native Web Audio ambient & chime synthesizer
│   │   ├── App.jsx                 # HashRouter setup for Amazon S3 compatibility
│   │   ├── main.jsx                # React root mount
│   │   └── index.css               # Tailwind CSS & accessible design tokens
│   ├── dist/                       # Production build generated via npm run build
│   ├── index.html                  # HTML entry point with accessible typography
│   ├── package.json                # Frontend dependencies & scripts
│   └── vite.config.js              # Vite configuration (base: './' for S3)
│
└── README.md                       # Master project documentation & S3 guide
```

---

## 8. Local Setup & Execution Guide

### Prerequisites
- Python 3.10+
- Node.js 18+ and npm

### 1. Backend Setup & Model Training
```bash
# Navigate to backend directory
cd backend

# (Optional) Create and activate virtual environment
python -m venv venv
# Windows:
.\venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt

# Run the training script (generates dataset.csv, model.pkl, and metadata.json)
python train_model.py

# Run the backend test suite
python test_api.py

# Start the Flask API server (runs on port 5000)
python app.py
```

### 2. Frontend Setup & Development Server
```bash
# In a new terminal, navigate to the frontend directory
cd frontend

# Install dependencies (if not already installed)
npm install

# Start the Vite development server
npm run dev
```
Open your browser at `http://localhost:3000` (or the port output by Vite).

---

## 9. Amazon S3 Static Website Deployment Guide

Amazon S3 hosts **static client assets** (HTML, CSS, JavaScript, media). The Python Flask API must be hosted on a live server (such as AWS EC2, AWS App Runner, Elastic Beanstalk, Render, or Railway) and connected to the frontend via an environment variable.

### Step 1: Generate the Production Build
In the `frontend/` directory, run:
```bash
npm run build
```
This produces an optimized, self-contained `dist/` directory with relative asset paths (`./assets/...`) and hash-based routing.

### Step 2: Create an S3 Bucket in AWS
1. Open the [AWS Management Console](https://aws.amazon.com/console/) and navigate to **Amazon S3**.
2. Click **Create bucket**.
3. Enter a unique **Bucket name** (e.g. `neurolearn-ai-frontend`).
4. Select your preferred **AWS Region** (e.g. `us-east-1` or `ap-south-1`).
5. Under **Block Public Access settings for this bucket**:
   - Uncheck *"Block all public access"*.
   - Acknowledge that the bucket will become public (required for S3 Static Website Hosting).
6. Click **Create bucket**.

### Step 3: Enable Static Website Hosting
1. Click on your newly created bucket and navigate to the **Properties** tab.
2. Scroll to the bottom to **Static website hosting** and click **Edit**.
3. Select **Enable**.
4. In **Index document**, enter: `index.html`.
5. In **Error document**, enter: `index.html` (because NeuroLearn AI utilizes `HashRouter`, routing is handled entirely client-side).
6. Click **Save changes**.
7. Note down the **Bucket website endpoint** URL (e.g., `http://neurolearn-ai-frontend.s3-website.us-east-1.amazonaws.com`).

### Step 4: Configure the Bucket Policy (Public Read)
1. Go to the **Permissions** tab of the bucket.
2. Under **Bucket policy**, click **Edit** and paste the following JSON policy (replace `YOUR-BUCKET-NAME` with your actual bucket name):
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::YOUR-BUCKET-NAME/*"
        }
    ]
}
```
3. Click **Save changes**.

### Step 5: Upload the `dist/` Folder Contents
1. In the bucket, go to the **Objects** tab.
2. Click **Upload**.
3. Upload all files and folders directly from your local `frontend/dist/` directory:
   - `index.html` (must be placed at the root of the bucket)
   - `assets/` folder (containing the CSS and JS bundles)
4. Click **Upload**.

### Step 6: Connecting Deployed Frontend to Hosted Flask Backend
1. When deploying the frontend for production, set the environment variable pointing to your hosted Flask backend:
   ```bash
   # In frontend/.env.production
   VITE_API_URL=https://your-flask-api.onrender.com
   ```
2. Re-run `npm run build` and upload the updated `dist/` files to S3.

### Important Note on HTTPS and AWS CloudFront
- **Amazon S3 Website Endpoints use HTTP by default** (`http://bucket.s3-website...`).
- Modern browsers may block requests from an HTTP frontend to an HTTPS backend due to Mixed Content security rules.
- **Recommended Production Best Practice:** Create an **Amazon CloudFront Distribution** pointing to your S3 bucket website endpoint. CloudFront provides free SSL/HTTPS, edge caching, and global low-latency CDN distribution.

---

## 10. Summary of Accomplishments

- [x] **Complete React frontend** with modern UI/UX and accessible design system.
- [x] **Python Flask backend** with native CORS, robust error handling, and test client coverage.
- [x] **Actual trained Random Forest classifier** with 100 trees, 95.2% accuracy, and 95.2% macro F1 score.
- [x] **Real ML prediction REST API** with probability distributions and input validation.
- [x] **Dynamic adaptive intervention engine** mapping predictions to neuroinclusive accommodations.
- [x] **Think-First signature cognitive scaffolding engine** with 4 progressive hint tiers, unhurried timers, and reflection logging.
- [x] **Interactive curriculum & quizzes** across 5 STEM topics with instant supportive feedback.
- [x] **Student Dashboard & Learning Analytics** with interactive Recharts visualizations.
- [x] **ADHD-friendly accessibility features** (light/dark mode, high contrast, font scaling, reduced motion, distraction-free mode, and native Web Audio ambient sounds).
- [x] **Production-ready static bundle** generated in `frontend/dist/` ready for Amazon S3 Static Website Hosting.
