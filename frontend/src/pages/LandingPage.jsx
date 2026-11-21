import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  Lightbulb, 
  Sparkles, 
  ArrowRight, 
  Layers, 
  Cpu, 
  Clock, 
  ShieldCheck, 
  BarChart3, 
  Heart,
  CheckCircle2,
  BookOpen,
  Award
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="space-y-24 pb-16">
      {/* Hero Section */}
      <section className="relative pt-12 md:pt-20 overflow-hidden">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-100/60 via-purple-50/30 to-transparent dark:from-indigo-950/30 dark:via-transparent dark:to-transparent" />
        
        <div className="max-w-5xl mx-auto text-center px-4 sm:px-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-indigo-700 dark:text-indigo-300 text-xs font-semibold mb-6 shadow-xs animate-fadeIn">
            <Sparkles className="w-4 h-4 text-indigo-500" />
            <span>Academic Machine Learning PBL Project • Random Forest Classifier</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] mb-6">
            Learning That <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-teal-500 bg-clip-text text-transparent">Adapts to You</span>.
          </h1>

          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-normal">
            An inclusive learning experience designed around your pace, preferences and progress. Powered by genuine behavioral feature extraction and a trained Random Forest model that scaffolds independent thinking instead of instantly giving away answers.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/learn"
              className="px-6 py-3.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-base shadow-lg shadow-indigo-500/25 transition-all flex items-center gap-2 group hover:-translate-y-0.5"
            >
              <span>Get Started with Learning</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              to="/think-first"
              className="px-6 py-3.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-800 dark:text-slate-100 font-semibold text-base border border-slate-200 dark:border-slate-700 shadow-sm transition-all flex items-center gap-2"
            >
              <Lightbulb className="w-4 h-4 text-amber-500" />
              <span>Explore Think-First Engine</span>
            </Link>

            <Link
              to="/ai-support"
              className="px-5 py-3.5 rounded-xl bg-slate-100 dark:bg-slate-800/80 hover:bg-slate-200 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-300 font-medium text-sm border border-slate-200 dark:border-slate-700 transition"
            >
              <Cpu className="w-4 h-4 inline mr-1 text-indigo-500" />
              <span>Inspect ML Pipeline</span>
            </Link>
          </div>

          {/* Interactive Hero Preview Card */}
          <div className="mt-14 p-4 sm:p-6 rounded-2xl bg-white/80 dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xl backdrop-blur-md max-w-4xl mx-auto text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-400" />
                <div className="w-3 h-3 rounded-full bg-amber-400" />
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <span className="text-xs font-mono text-slate-400 ml-2">neurolearn_cognitive_loop.py</span>
              </div>
              <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md">
                100 Trees Active • 95.2% Accuracy
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-700/60">
                <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  1. Observe Student Actions
                </div>
                <p className="text-xs text-slate-700 dark:text-slate-300">
                  Tracks time elapsed, response accuracy, and active interaction signals without intrusive surveillance.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
                <div className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 uppercase tracking-wider mb-1">
                  2. Random Forest Model
                </div>
                <p className="text-xs text-indigo-900 dark:text-indigo-200">
                  Evaluates 3 calibrated features against 100 decision trees to estimate support levels: Low, Medium, or High.
                </p>
              </div>

              <div className="p-3 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-100 dark:border-teal-900/60">
                <div className="text-xs font-semibold text-teal-600 dark:text-teal-400 uppercase tracking-wider mb-1">
                  3. Scaffold Independent Thinking
                </div>
                <p className="text-xs text-teal-900 dark:text-teal-200">
                  Never exposes the solution right away. Provides 4 progressive hints and optional breaks based on need.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Problem & Proposed Solution Section */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            Why Neurodiversity In EdTech Matters
          </h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            Traditional Platforms Treat Everyone Identically.
          </h3>
          <p className="mt-3 text-slate-600 dark:text-slate-300">
            Students with ADHD and diverse attention profiles face cognitive friction when confronted with dense text walls, punitive timers, or chatbots that simply dump the final answer.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Traditional Challenges */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-rose-100 dark:border-rose-950/50 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-rose-50 dark:bg-rose-950/50 flex items-center justify-center text-rose-500 mb-4">
              <Clock className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              The Friction with Traditional Learning
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Rigid, lengthy lectures that overload executive functioning.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Punitive countdown timers that induce high cognitive panic.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-rose-500 font-bold shrink-0">✕</span>
                <span>Tutors that either say "Wrong!" or immediately reveal the answer, stealing the learning moment.</span>
              </li>
            </ul>
          </div>

          {/* NeuroLearn AI Solution */}
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-teal-100 dark:border-teal-950/50 shadow-sm">
            <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/50 flex items-center justify-center text-teal-500 mb-4">
              <Brain className="w-5 h-5" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
              The NeuroLearn AI Adaptive Solution
            </h4>
            <ul className="space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span>Bite-sized, 5-minute modules with real-world analogies and visual mental models.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span><strong>Think-First Scaffolding:</strong> 4 gentle hint tiers guide discovery without giving away the answer.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle2 className="w-4 h-4 text-teal-500 shrink-0 mt-0.5" />
                <span>Trained Random Forest ML continuously calibrates support to student cognitive flow.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Think-First Feature Spotlight */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="rounded-3xl bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 text-white p-8 sm:p-12 shadow-2xl relative overflow-hidden">
          <div className="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <Lightbulb className="w-96 h-96 -mr-16 -mb-16" />
          </div>

          <div className="max-w-3xl relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/20 text-indigo-300 border border-indigo-400/30 text-xs font-semibold mb-4">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Signature Innovation</span>
            </div>

            <h3 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4">
              Discover the Answer. Don't Just Receive It.
            </h3>

            <p className="text-slate-300 text-base sm:text-lg mb-8 leading-relaxed">
              When a student answers incorrectly, conventional platforms often rob them of the discovery journey. NeuroLearn AI introduces a multi-tier scaffolding protocol that honors the thinking process:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-indigo-300 block mb-1">Stage 1</span>
                <h5 className="font-semibold text-white mb-1">Independent Thinking Time</h5>
                <p className="text-xs text-slate-300">Encouraging message with optional unhurried timer. No forced countdowns.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300 block mb-1">Stage 2</span>
                <h5 className="font-semibold text-white mb-1">4 Progressive Hints</h5>
                <p className="text-xs text-slate-300">Gentle Nudge → Concept Reminder → Guided Reasoning → Similar Example.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-purple-300 block mb-1">Stage 3</span>
                <h5 className="font-semibold text-white mb-1">Student-Controlled Solution</h5>
                <p className="text-xs text-slate-300">Full step-by-step breakdown is offered only when requested by the learner.</p>
              </div>

              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10">
                <span className="text-xs font-bold uppercase tracking-wider text-amber-300 block mb-1">Stage 4</span>
                <h5 className="font-semibold text-white mb-1">Metacognitive Reflection</h5>
                <p className="text-xs text-slate-300">"How did you arrive at your answer?" reinforces positive learning habits.</p>
              </div>
            </div>

            <Link
              to="/think-first"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-indigo-900 font-bold hover:bg-indigo-50 transition shadow-md"
            >
              <span>Try Think-First in Action</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Machine Learning Architecture Highlights */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs font-bold uppercase tracking-wider text-indigo-600 dark:text-indigo-400 mb-2">
            Real Machine Learning Integration
          </h2>
          <h3 className="text-3xl font-bold text-slate-900 dark:text-white">
            Calibrated Random Forest Classifier
          </h3>
          <p className="mt-2 text-slate-600 dark:text-slate-300">
            Trained on 5,000 learning sessions across 500 student profiles with 80:20 stratified validation.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-extrabold text-indigo-600 dark:text-indigo-400 mb-1">3 Features</div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Non-Intrusive Behavioral Signals</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              1. time_spent_on_task (seconds)<br />
              2. engagement_level (normalized [0-1])<br />
              3. accuracy_of_responses (proportion [0-1])
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-extrabold text-teal-600 dark:text-teal-400 mb-1">100 Trees</div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Random Forest Ensemble</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Balanced class weights, 80:20 stratified split, producing 95.2% test accuracy and robust generalization without overfitting.
            </p>
          </div>

          <div className="p-6 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700">
            <div className="text-3xl font-extrabold text-purple-600 dark:text-purple-400 mb-1">3 Classes</div>
            <div className="text-sm font-semibold text-slate-800 dark:text-slate-200 mb-2">Adaptive Support Needs</div>
            <p className="text-xs text-slate-600 dark:text-slate-400 leading-relaxed">
              Estimates Low, Medium, or High friction to dynamically recommend pacing, conceptual hints, visual analogies, or gentle rest breaks.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-indigo-50 dark:bg-indigo-950/40 border border-indigo-100 dark:border-indigo-900/60">
          <h3 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-white mb-4">
            Ready to Experience Adaptive Neuroinclusive Learning?
          </h3>
          <p className="text-slate-600 dark:text-slate-300 max-w-xl mx-auto mb-8 text-sm sm:text-base">
            Explore our curriculum across Python, Data Structures, Math, and AI, or practice with the Think-First reasoning engine.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              to="/learn"
              className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm shadow-md transition"
            >
              Enter Learning Room
            </Link>
            <Link
              to="/quiz"
              className="px-6 py-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-300 dark:border-slate-700 text-slate-800 dark:text-slate-200 font-semibold text-sm hover:bg-slate-50 transition"
            >
              Take an Interactive Quiz
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
