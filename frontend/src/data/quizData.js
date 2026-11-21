/**
 * NeuroLearn AI - Comprehensive Quiz Arena Dataset
 * 
 * At least 5 questions per topic with supportive, non-punitive explanations
 * and progressive hints integrated into every question.
 */

export const QUIZ_TOPICS = [
  {
    id: 'python-basics',
    title: 'Python Core Concepts',
    icon: 'Code2',
    color: 'indigo',
    description: 'Variables, loops, conditionals, list comprehension, and syntax patterns.',
    questions: [
      {
        id: 'q-py-1',
        prompt: 'Which data type in Python is immutable (cannot be altered after creation)?',
        options: ['List [1, 2]', 'Dictionary {"a": 1}', 'Tuple (1, 2)', 'Set {1, 2}'],
        correctIndex: 2,
        hint: 'Think about round parentheses versus square brackets. One of these freezes its elements permanently.',
        supportiveFeedback: 'Tuples are immutable in Python! Once defined using parentheses like (1, 2), their elements cannot be appended or modified, ensuring data integrity.'
      },
      {
        id: 'q-py-2',
        prompt: 'What is the outcome of the expression: bool("False") in Python?',
        options: ['False', 'True', 'TypeError', 'None'],
        correctIndex: 1,
        hint: 'In Python, any non-empty string evaluates to a truthy value, regardless of what words are written inside.',
        supportiveFeedback: 'Any non-empty string in Python evaluates to True. Only an empty string ("") evaluates to False!'
      },
      {
        id: 'q-py-3',
        prompt: 'What does the range(2, 8, 2) generator produce when converted to a list?',
        options: ['[2, 4, 6, 8]', '[2, 4, 6]', '[2, 3, 4, 5, 6, 7]', '[4, 6, 8]'],
        correctIndex: 1,
        hint: 'range(start, stop, step) starts at 2, steps forward by 2, and stops strictly before reaching 8.',
        supportiveFeedback: 'Starting at 2 and stepping by +2 gives 2, 4, and 6. The stop value 8 is exclusive!'
      },
      {
        id: 'q-py-4',
        prompt: 'Which keyword is used to handle exceptions gracefully in Python?',
        options: ['catch', 'rescue', 'except', 'handle'],
        correctIndex: 2,
        hint: 'Python pairs the "try" block with this specific keyword to intercept errors.',
        supportiveFeedback: 'Python uses the try/except statement structure to catch and manage runtime exceptions safely.'
      },
      {
        id: 'q-py-5',
        prompt: 'What will print(type([]) is list) evaluate to?',
        options: ['True', 'False', 'SyntaxError', 'None'],
        correctIndex: 0,
        hint: 'Square brackets [] represent an empty list literal.',
        supportiveFeedback: 'Square brackets [] define a Python list, so type([]) is indeed list, evaluating to True.'
      }
    ]
  },
  {
    id: 'data-structures-quiz',
    title: 'Data Structures & Algorithms',
    icon: 'Layers',
    color: 'teal',
    description: 'Arrays, Stacks, Queues, Binary Trees, and Time Complexity.',
    questions: [
      {
        id: 'q-ds-1',
        prompt: 'What is the average time complexity to look up a key in a well-balanced Hash Map?',
        options: ['O(1)', 'O(log n)', 'O(n)', 'O(n^2)'],
        correctIndex: 0,
        hint: 'Hash functions calculate the array index directly from the key without sequential searching.',
        supportiveFeedback: 'Hash maps provide O(1) constant time average lookup because the hash code directly points to the memory bucket.'
      },
      {
        id: 'q-ds-2',
        prompt: 'Which data structure is ideal for implementing an "Undo" feature in an editor?',
        options: ['Queue', 'Stack', 'Linked List', 'Graph'],
        correctIndex: 1,
        hint: 'The most recent edit action needs to be undone first (Last-In, First-Out).',
        supportiveFeedback: 'A Stack uses LIFO (Last-In, First-Out), which allows you to pop the most recent user action immediately!'
      },
      {
        id: 'q-ds-3',
        prompt: 'In a Binary Search Tree (BST), where are values smaller than the root node stored?',
        options: ['In the right subtree', 'In the left subtree', 'At the leaf nodes only', 'Randomly placed'],
        correctIndex: 1,
        hint: 'Remember the spatial mnemonic: smaller values go to the left, larger values to the right.',
        supportiveFeedback: 'In any BST, all nodes in the left subtree hold values strictly less than the parent node.'
      },
      {
        id: 'q-ds-4',
        prompt: 'Which sorting algorithm has a guaranteed worst-case time complexity of O(n log n)?',
        options: ['Quick Sort', 'Bubble Sort', 'Merge Sort', 'Insertion Sort'],
        correctIndex: 2,
        hint: 'This divide-and-conquer algorithm repeatedly halves lists and merges them without worst-case pivot degradation.',
        supportiveFeedback: 'Merge Sort consistently divides the list in half and merges, guaranteeing O(n log n) even in the worst case.'
      },
      {
        id: 'q-ds-5',
        prompt: 'What traversal algorithm searches level-by-level using a FIFO Queue?',
        options: ['Breadth-First Search (BFS)', 'Depth-First Search (DFS)', 'In-Order Traversal', 'Post-Order Traversal'],
        correctIndex: 0,
        hint: 'Think of widening ripples in a pond: exploring all neighbors at distance 1 before moving to distance 2.',
        supportiveFeedback: 'Breadth-First Search (BFS) visits nodes layer by layer using a Queue to maintain arrival order.'
      }
    ]
  },
  {
    id: 'ai-ml-quiz',
    title: 'Machine Learning & AI',
    icon: 'BrainCircuit',
    color: 'purple',
    description: 'Supervised learning, Random Forests, model evaluation, and features.',
    questions: [
      {
        id: 'q-ai-1',
        prompt: 'What type of machine learning task is predicting frustration levels into Low, Medium, and High?',
        options: ['Unsupervised Clustering', 'Classification', 'Regression', 'Reinforcement Learning'],
        correctIndex: 1,
        hint: 'The target variable consists of distinct discrete categories rather than a continuous numerical score.',
        supportiveFeedback: 'Predicting discrete categories (Low, Medium, High) is a multiclass Classification problem!'
      },
      {
        id: 'q-ai-2',
        prompt: 'What does "class_weight=\'balanced\'" accomplish in a Scikit-Learn Random Forest?',
        options: [
          'Forces all trees to have identical depths',
          'Adjusts weights inversely proportional to class frequencies to prevent majority class bias',
          'Eliminates the need for a test dataset',
          'Randomly deletes majority class samples'
        ],
        correctIndex: 1,
        hint: 'If one class has fewer training examples, this setting ensures the algorithm penalizes mistakes on it fairly.',
        supportiveFeedback: 'Balanced class weighting assigns higher loss penalties to underrepresented classes, ensuring fair predictions.'
      },
      {
        id: 'q-ai-3',
        prompt: 'Why do we use Stratified splitting when creating train-test sets for classification?',
        options: [
          'To ensure all features are normalized to zero mean',
          'To preserve the exact percentage ratio of each target class in both train and test splits',
          'To speed up GPU training times',
          'To remove outliers automatically'
        ],
        correctIndex: 1,
        hint: 'Stratified means layers: keeping the demographic proportion of High, Medium, and Low identical in both subsets.',
        supportiveFeedback: 'Stratified splitting guarantees that both train and test partitions represent the exact real-world class distributions.'
      },
      {
        id: 'q-ai-4',
        prompt: 'Which metric is calculated as: True Positives / (True Positives + False Negatives)?',
        options: ['Precision', 'Recall (Sensitivity)', 'Accuracy', 'Specificity'],
        correctIndex: 1,
        hint: 'This metric answers: "Out of all actual positive cases in reality, how many did the model successfully catch?"',
        supportiveFeedback: 'Recall measures completeness: the proportion of actual true cases that were successfully identified.'
      },
      {
        id: 'q-ai-5',
        prompt: 'In NeuroLearn AI, which three behavioral features are fed to the Random Forest model?',
        options: [
          'Heart rate, eye movement, and typing speed',
          'time_spent_on_task, engagement_level, and accuracy_of_responses',
          'Student age, grade level, and IQ score',
          'Mouse clicks, scroll depth, and webcam emotion'
        ],
        correctIndex: 1,
        hint: 'NeuroLearn AI uses strictly observable, non-intrusive learning interaction metrics.',
        supportiveFeedback: 'NeuroLearn AI preserves student privacy by utilizing only objective interaction signals: time spent, engagement, and accuracy.'
      }
    ]
  }
];
