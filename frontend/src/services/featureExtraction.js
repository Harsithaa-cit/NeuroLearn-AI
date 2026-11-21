/**
 * NeuroLearn AI - Feature Extraction Service
 * 
 * Extracts the exact 3 input features from student application interactions:
 * 1. time_spent_on_task: Elapsed seconds spent actively engaging with current problem/lesson.
 * 2. engagement_level: Normalized [0.0, 1.0] interaction signal derived from student curiosity,
 *    step transitions, hint requests, reflections, and perseverance.
 * 3. accuracy_of_responses: Proportion [0.0, 1.0] of correct responses over total attempts.
 */

export function extractInteractionFeatures({
  startTimeMs,
  endTimeMs = Date.now(),
  attemptsCount = 1,
  correctCount = 1,
  hintsUsedCount = 0,
  maxHintsPossible = 4,
  reflectionCompleted = false,
  breakRequested = false
}) {
  // 1. Time spent on task in seconds (clamped to realistic session boundary)
  const rawElapsedSeconds = Math.max(1, Math.round((endTimeMs - startTimeMs) / 1000));
  // Bound to [10.0, 180.0] seconds as observed in model training distribution
  const time_spent_on_task = Math.min(180.0, Math.max(10.0, rawElapsedSeconds));

  // 2. Accuracy of responses
  const totalAttempts = Math.max(1, attemptsCount);
  const rawAccuracy = correctCount / totalAttempts;
  const accuracy_of_responses = Math.min(1.0, Math.max(0.0, Number(rawAccuracy.toFixed(3))));

  // 3. Normalized Engagement Level [0.0 - 1.0]
  // Combines:
  // - Participation rate (completing attempts)
  // - Hint exploration (using hints purposefully is positive cognitive engagement)
  // - Metacognitive reflection completion
  // - Penalty if student is idle or requested immediate break without attempts
  let engagementScore = 0.5; // baseline

  // Hint engagement: actively seeking scaffolding indicates positive cognitive effort
  const hintFactor = (hintsUsedCount / Math.max(1, maxHintsPossible)) * 0.25;
  engagementScore += hintFactor;

  // Reflection engagement: completing post-problem reflection shows active self-monitoring
  if (reflectionCompleted) {
    engagementScore += 0.15;
  }

  // Time-to-accuracy harmony: if accuracy is good or attempts show persistence
  if (attemptsCount > 1 && accuracy_of_responses > 0) {
    engagementScore += 0.15; // perseverance bonus
  } else if (accuracy_of_responses >= 0.8) {
    engagementScore += 0.20; // mastery focus
  }

  // Deduct if student took excessive idle time without interaction
  if (time_spent_on_task > 120 && attemptsCount <= 1 && hintsUsedCount === 0) {
    engagementScore -= 0.25;
  }

  if (breakRequested) {
    engagementScore -= 0.10;
  }

  const engagement_level = Math.min(1.0, Math.max(0.1, Number(engagementScore.toFixed(3))));

  return {
    time_spent_on_task: Number(time_spent_on_task.toFixed(2)),
    engagement_level,
    accuracy_of_responses
  };
}
