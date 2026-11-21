/**
 * NeuroLearn AI - Think-First Cognitive Scaffolding Dataset
 * 
 * Signature feature designed to scaffold independent thinking for ADHD and neurodivergent learners.
 * The system NEVER immediately reveals the solution upon an incorrect answer.
 * 
 * Levels:
 * 1. Gentle Nudge (small clue)
 * 2. Concept Reminder (underlying rule/pattern)
 * 3. Guided Reasoning (logical sub-steps)
 * 4. Similar Example (isomorphic problem worked out with different numbers/variables)
 * 5. Full Step-by-Step Solution (student-requested only)
 */

export const THINK_FIRST_QUESTIONS = [
  {
    id: 'tf-1',
    subject: 'Python Programming',
    difficulty: 'Foundational',
    title: 'List Slicing & Index Boundaries',
    question: 'What is the output of the following Python snippet?\n\nnumbers = [10, 20, 30, 40, 50]\nprint(numbers[1:4])',
    options: [
      '[20, 30, 40]',
      '[10, 20, 30]',
      '[20, 30, 40, 50]',
      '[10, 20, 30, 40]'
    ],
    correctIndex: 0,
    stages: {
      encouragement: "Take your time. You don't need to get it immediately. Think about what you have learned about Python zero-indexing and slice endpoints.",
      nudge: "Notice two things: where does the slice start, and how does Python treat the second stop index?",
      conceptReminder: "Python slices work like [start : stop]. The 'start' index is INCLUSIVE (included), but the 'stop' index is EXCLUSIVE (not included). Also, indices begin at 0.",
      guidedReasoning: [
        "Step A: Find index 0 -> numbers[0] is 10.",
        "Step B: Find index 1 -> numbers[1] is 20. This is our starting element.",
        "Step C: Now look at the stop index 4 -> numbers[4] is 50. But in slicing, stop index 4 is NOT included!",
        "Step D: The slice stops just before index 4. So it gathers elements at index 1, index 2, and index 3."
      ],
      similarExample: {
        problem: "Consider letters = ['a', 'b', 'c', 'd', 'e']. What is letters[0:3]?",
        breakdown: "Index 0 is 'a', index 1 is 'b', index 2 is 'c'. Stop index 3 ('d') is excluded.",
        result: "Result: ['a', 'b', 'c']. Notice that 3 - 0 = 3 items were selected!"
      },
      fullSolution: {
        summary: "The expression numbers[1:4] extracts elements from index 1 up to (but not including) index 4.",
        steps: [
          "Index 0: 10 (skipped, slice starts at 1)",
          "Index 1: 20 (included)",
          "Index 2: 30 (included)",
          "Index 3: 40 (included)",
          "Index 4: 50 (excluded by the upper bound rule)",
          "Final slice returned: [20, 30, 40]"
        ]
      }
    }
  },
  {
    id: 'tf-2',
    subject: 'Data Structures',
    difficulty: 'Intermediate',
    title: 'Stack vs Queue State Evolution',
    question: 'Starting with an empty Queue, we perform the following operations in sequence:\n1. enqueue(5)\n2. enqueue(15)\n3. dequeue()\n4. enqueue(25)\n5. dequeue()\n\nWhich item was returned by the second dequeue() call?',
    options: ['5', '15', '25', 'Queue is empty'],
    correctIndex: 1,
    stages: {
      encouragement: "No rush! Draw or picture the line of numbers step-by-step. Remember that Queues operate like a friendly grocery store checkout.",
      nudge: "Queues are First-In, First-Out (FIFO). Items are removed from the front in the exact order they entered.",
      conceptReminder: "In FIFO queues: Enqueue adds to the back of the line. Dequeue removes from the front. The element that has been waiting the longest gets served first.",
      guidedReasoning: [
        "Step A: enqueue(5) -> Line is: [5] (5 is at front)",
        "Step B: enqueue(15) -> Line is: [5, 15] (5 is front, 15 is back)",
        "Step C: First dequeue() -> Removes 5 from front. Line becomes: [15]",
        "Step D: enqueue(25) -> Line becomes: [15, 25] (15 is front, 25 is back)",
        "Step E: Second dequeue() -> Removes whatever is at front right now!"
      ],
      similarExample: {
        problem: "Line with items [Apple, Banana]. Add Cherry -> [Apple, Banana, Cherry]. Remove one -> returns Apple. Who is next?",
        breakdown: "After Apple leaves, Banana is now at the front.",
        result: "The next remove operation will return Banana!"
      },
      fullSolution: {
        summary: "Following the FIFO queue line step-by-step shows that 15 is returned on the second dequeue.",
        steps: [
          "After step 2: Queue contains [5, 15]",
          "Step 3 (first dequeue) removes 5. Queue now holds [15]",
          "Step 4 adds 25 to the back: Queue now holds [15, 25]",
          "Step 5 (second dequeue) takes the front element: 15 is removed and returned!"
        ]
      }
    }
  },
  {
    id: 'tf-3',
    subject: 'Applied Mathematics',
    difficulty: 'Intermediate',
    title: 'Conditional Likelihood & Probabilities',
    question: 'A bag contains 4 Red marbles and 6 Blue marbles. You draw one marble, notice it is Red, and set it aside (without replacement). What is the probability that your second draw is also Red?',
    options: ['4/10 (40%)', '3/9 (1/3 or 33.3%)', '3/10 (30%)', '4/9 (44.4%)'],
    correctIndex: 1,
    stages: {
      encouragement: "Take a deep breath. Think about what physically happened to the bag after that first red marble was taken out.",
      nudge: "Ask yourself: How many RED marbles are left now? And how many TOTAL marbles are left in the bag?",
      conceptReminder: "Without replacement means the drawn marble is not put back. Both the numerator (favorable red marbles) and the denominator (total marbles) decrease by 1.",
      guidedReasoning: [
        "Step A: Initially, there were 4 Red + 6 Blue = 10 total marbles.",
        "Step B: You removed 1 Red marble.",
        "Step C: Remaining Red marbles = 4 - 1 = 3 Red marbles left.",
        "Step D: Remaining Total marbles = 10 - 1 = 9 marbles left in the bag.",
        "Step E: Compute: (Remaining Red) / (Remaining Total)."
      ],
      similarExample: {
        problem: "You have 5 green cards and 5 yellow cards (10 total). You draw 1 green card without replacement. Probability of a 2nd green card?",
        breakdown: "Remaining green: 4. Remaining total: 9. Fraction: 4/9.",
        result: "Result: 4/9 (~44.4%)."
      },
      fullSolution: {
        summary: "After removing one red marble without putting it back, 3 red marbles remain out of 9 total marbles.",
        steps: [
          "Original count: 4 Red, 6 Blue (10 Total)",
          "First draw: 1 Red marble removed and held aside",
          "Updated bag state: 3 Red, 6 Blue (9 Total marbles)",
          "Probability of second red: 3 / 9 = 1/3 (approx 33.33%)"
        ]
      }
    }
  },
  {
    id: 'tf-4',
    subject: 'Artificial Intelligence & ML',
    difficulty: 'Advanced',
    title: 'Confusion Matrix & Precision vs Recall',
    question: 'A medical ML classifier evaluated 100 patient scans. It predicted "Condition Present" for 20 patients. Upon doctor inspection, 16 of those 20 actually had the condition. What is the Precision of this model?',
    options: ['16/20 (80%)', '16/100 (16%)', '20/100 (20%)', '4/20 (20%)'],
    correctIndex: 0,
    stages: {
      encouragement: "Statistical terms can sound tricky, but the intuition is straightforward. Think of Precision as: 'When the model calls wolf, how often is it actually a wolf?'",
      nudge: "Look specifically at what the model PREDICTED as positive (the 20 cases). How many of those predictions were accurate?",
      conceptReminder: "Precision = True Positives / (True Positives + False Positives). In other words: True Positives / Total Positive Predictions.",
      guidedReasoning: [
        "Step A: Identify Total Positive Predictions: the model predicted condition for 20 patients.",
        "Step B: Identify True Positives: 16 of those 20 were confirmed accurate.",
        "Step C: False Positives: 4 were false alarms (20 - 16 = 4).",
        "Step D: Precision focuses exclusively on the quality of positive alarms: 16 correct / 20 claimed."
      ],
      similarExample: {
        problem: "A spam detector flags 10 emails as spam. 9 of them are actual spam, but 1 is an important email. What is its precision?",
        breakdown: "True spam caught: 9. Total emails flagged as spam: 10. Precision: 9/10.",
        result: "Precision = 90% (9/10)."
      },
      fullSolution: {
        summary: "Precision measures the accuracy of positive predictions: 16 true positives divided by 20 total positive predictions.",
        steps: [
          "Total predicted positives (TP + FP) = 20",
          "True positive matches (TP) = 16",
          "Formula: Precision = TP / (TP + FP)",
          "Calculation: 16 / 20 = 0.80 (80%)"
        ]
      }
    }
  }
];
