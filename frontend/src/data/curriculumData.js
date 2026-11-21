/**
 * NeuroLearn AI - Multi-Subject Curriculum Dataset
 * 5 Core Subjects with bite-sized lessons, cognitive analogies, visual schemas,
 * and adaptive learning modes (Quick, Visual, Step-by-Step).
 */

export const CURRICULUM = [
  {
    id: 'python',
    title: 'Python Programming',
    category: 'Computer Science',
    icon: 'Code2',
    color: 'indigo',
    description: 'Learn modern Python programming with visual mental models, clean code analogies, and progressive challenges.',
    lessons: [
      {
        id: 'py-1',
        title: 'Variables & Data Types',
        durationMinutes: 5,
        difficulty: 'Beginner',
        summary: 'Variables are labeled storage boxes in your computer’s memory that hold specific types of information.',
        analogy: 'Imagine labeled storage jars in your kitchen. A jar labeled "Sugar" holds sweet granules (String), while an egg tray holds count numbers (Integer).',
        modes: {
          quick: {
            title: 'Key Takeaway in 60 Seconds',
            bullets: [
              'Variables store data values: name = "Alex", age = 17, score = 98.5',
              'Python dynamically detects the data type without manual type declarations.',
              'Common types: str (text), int (whole numbers), float (decimals), bool (True/False).'
            ]
          },
          visual: {
            title: 'Memory Storage Visualization',
            mentalModel: '[ RAM Memory Matrix ]\n 📦 [name] ----> "Alex"   (Type: str)\n 📦 [age]  ----> 17       (Type: int)\n 📦 [active] -> True     (Type: bool)',
            caption: 'Variables do not contain the raw data itself; they point directly to the memory address storing the value.'
          },
          stepByStep: {
            title: 'Creating and Updating Variables',
            steps: [
              { step: 1, text: 'Choose a descriptive lowercase name with underscores: user_score' },
              { step: 2, text: 'Use the single equals sign (=) for assignment: user_score = 100' },
              { step: 3, text: 'Inspect the variable using print(user_score) or type(user_score)' }
            ]
          }
        },
        interactiveTask: {
          prompt: 'Which Python expression creates an integer variable named "streak_count" with a value of 5?',
          options: [
            'int streak_count == 5',
            'streak_count = 5',
            'streak_count := "5"',
            'var streak_count = 5'
          ],
          correctIndex: 1,
          hintNudge: 'Remember that Python uses the single equals sign for variable assignment without extra keywords like var.',
          explanation: 'In Python, variable assignment is direct: streak_count = 5. Python automatically infers that 5 is an integer.'
        }
      },
      {
        id: 'py-2',
        title: 'Conditionals & Logical Flow',
        durationMinutes: 6,
        difficulty: 'Beginner',
        summary: 'Conditionals allow programs to make decisions based on whether a condition evaluates to True or False.',
        analogy: 'Like an automated traffic light sensor: IF cars are waiting, turn green; ELIF pedestrians are crossing, turn walk signal on; ELSE stay red.',
        modes: {
          quick: {
            title: 'Conditional Branching',
            bullets: [
              'if statement evaluates a boolean expression.',
              'elif checks alternative scenarios if previous conditions fail.',
              'else executes when no earlier conditions matched.',
              'Indentation (4 spaces) is strictly required to define code blocks.'
            ]
          },
          visual: {
            title: 'Decision Tree Diagram',
            mentalModel: '           [ Condition: battery < 20? ]\n                   /          \\\n              YES /            \\ NO\n                 v              v\n      [ Low Power Mode ]    [ Standard Mode ]',
            caption: 'Python checks branch by branch from top to bottom and stops at the first True branch.'
          },
          stepByStep: {
            title: 'Writing Safe Conditions',
            steps: [
              { step: 1, text: 'Formulate the question: score >= 90' },
              { step: 2, text: 'End the if/elif line with a colon (:)' },
              { step: 3, text: 'Indent the code to execute when True by 4 spaces' }
            ]
          }
        },
        interactiveTask: {
          prompt: 'What keyword checks an alternative condition in Python if the initial if-condition was False?',
          options: ['else if', 'elseif', 'elif', 'otherwise'],
          correctIndex: 2,
          hintNudge: 'Python combines "else" and "if" into a concise 4-letter contraction.',
          explanation: 'Python uses "elif" (short for else if) for subsequent conditional branches.'
        }
      },
      {
        id: 'py-3',
        title: 'Lists & Iteration',
        durationMinutes: 7,
        difficulty: 'Intermediate',
        summary: 'Lists are ordered, mutable sequences that let you organize, filter, and loop through collections of items.',
        analogy: 'Think of a numbered playlist on your music app. Tracks have an indexed position starting at 0, and you can reorder, add, or skip songs.',
        modes: {
          quick: {
            title: 'Working with Lists',
            bullets: [
              'Square brackets create lists: tasks = ["review", "code", "break"]',
              'Zero-indexed: tasks[0] yields "review".',
              'for item in tasks: loops through each element cleanly without index counter variables.'
            ]
          },
          visual: {
            title: 'Index Mapping',
            mentalModel: 'Index:     0           1          2\nValues: ["Focus",   "Learn",   "Rest"]\nReverse:   -3         -2         -1',
            caption: 'Python allows both positive forward indices and negative backward indices.'
          },
          stepByStep: {
            title: 'Looping Through Items',
            steps: [
              { step: 1, text: 'Define the collection: habits = ["water", "stretch", "breathe"]' },
              { step: 2, text: 'Write loop header: for habit in habits:' },
              { step: 3, text: 'Process each element in the indented body' }
            ]
          }
        },
        interactiveTask: {
          prompt: 'Given habits = ["Read", "Walk", "Code"], what does habits[1] return?',
          options: ['"Read"', '"Walk"', '"Code"', 'IndexError'],
          correctIndex: 1,
          hintNudge: 'Remember that list indexing in Python starts at zero: index 0 is "Read".',
          explanation: 'Python lists are zero-indexed. Index 0 is the first item ("Read"), and index 1 is the second item ("Walk").'
        }
      }
    ]
  },
  {
    id: 'data-structures',
    title: 'Data Structures & Algorithms',
    category: 'Computer Science',
    icon: 'Layers',
    color: 'teal',
    description: 'Master foundational computational structures like Stacks, Queues, and Hash Maps with spatial mental maps.',
    lessons: [
      {
        id: 'ds-1',
        title: 'Stacks (LIFO: Last-In, First-Out)',
        durationMinutes: 6,
        difficulty: 'Beginner',
        summary: 'A stack is a linear structure where elements can only be added or removed from the top.',
        analogy: 'A stack of cafeteria trays or your browser’s "Back" button history. The last page you visited is the first page you return from.',
        modes: {
          quick: {
            title: 'Stack Operations',
            bullets: [
              'Push: Add an item to the top of the stack (O(1)).',
              'Pop: Remove and return the top item (O(1)).',
              'Peek: Inspect the top item without removing it (O(1)).',
              'Fundamental to undo operations, recursive call stacks, and syntax parsing.'
            ]
          },
          visual: {
            title: 'LIFO Mechanics',
            mentalModel: '    |  [Item C]  |  <-- TOP (Added last, removed first)\n    |  [Item B]  |\n    |  [Item A]  |  <-- BOTTOM\n    +------------+',
            caption: 'Any operation on a stack strictly interacts with the top element.'
          },
          stepByStep: {
            title: 'How a Function Call Stack Operates',
            steps: [
              { step: 1, text: 'main() is called and pushed to the bottom of the call stack.' },
              { step: 2, text: 'calculate_total() is called and pushed on top of main().' },
              { step: 3, text: 'calculate_total() completes and is popped off, returning execution to main().' }
            ]
          }
        },
        interactiveTask: {
          prompt: 'If you push 10, then push 20, then call pop(), what value is returned?',
          options: ['10', '20', 'Both 10 and 20', 'None'],
          correctIndex: 1,
          hintNudge: 'Stacks follow Last-In, First-Out (LIFO). The most recently added item comes off first.',
          explanation: '20 was pushed last onto the top of the stack, so pop() returns 20.'
        }
      },
      {
        id: 'ds-2',
        title: 'Queues (FIFO: First-In, First-Out)',
        durationMinutes: 6,
        difficulty: 'Beginner',
        summary: 'A queue is a linear structure where items enter at the rear and exit from the front in arrival order.',
        analogy: 'A line of people waiting at a movie ticket counter. The first person to join the line is the first person served.',
        modes: {
          quick: {
            title: 'Queue Mechanics',
            bullets: [
              'Enqueue: Insert an element at the back/rear.',
              'Dequeue: Remove an element from the front.',
              'Ensures fair ordering: tasks are processed in the order received.',
              'Used in print spooling, web server request buffers, and BFS graph traversal.'
            ]
          },
          visual: {
            title: 'FIFO Flow',
            mentalModel: 'Front (Exit) <-- [A] <-- [B] <-- [C] <-- Rear (Entry)\n                 ^                      ^\n             Served next            Just joined',
            caption: 'Elements flow in one direction from Rear to Front.'
          },
          stepByStep: {
            title: 'Processing Request Queues',
            steps: [
              { step: 1, text: 'New request arrives: enqueue at the rear of the buffer.' },
              { step: 2, text: 'Worker becomes free: peek at front to check priority.' },
              { step: 3, text: 'Worker dequeues request from front and initiates execution.' }
            ]
          }
        },
        interactiveTask: {
          prompt: 'What architectural principle governs standard Queues?',
          options: ['LIFO (Last-In First-Out)', 'FIFO (First-In First-Out)', 'Random Order', 'Priority Only'],
          correctIndex: 1,
          hintNudge: 'Think of standing in line at a grocery checkout: the first person in line is the first served.',
          explanation: 'Queues strictly follow FIFO (First-In, First-Out) ordering.'
        }
      }
    ]
  },
  {
    id: 'mathematics',
    title: 'Applied Mathematics',
    category: 'STEM',
    icon: 'Calculator',
    color: 'purple',
    description: 'Understand probability, statistics, and algebraic concepts through clear practical visualisations.',
    lessons: [
      {
        id: 'math-1',
        title: 'Probability & Likelihood',
        durationMinutes: 5,
        difficulty: 'Beginner',
        summary: 'Probability quantifies how likely an event is to occur, measured on a scale from 0 (impossible) to 1 (certain).',
        analogy: 'Tossing a fair coin. There are 2 equally likely outcomes, so the chance of landing on Heads is 1 out of 2 (50% or 0.50).',
        modes: {
          quick: {
            title: 'Core Probability Formula',
            bullets: [
              'P(Event) = (Number of favorable outcomes) / (Total number of possible outcomes)',
              'Always bounded between 0.0 (0%) and 1.0 (100%).',
              'Sum of probabilities of all possible mutually exclusive outcomes equals 1.0.'
            ]
          },
          visual: {
            title: 'Probability Continuum',
            mentalModel: '0.0 ------------------- 0.5 ------------------- 1.0\n[Impossible]       [Even Chance]         [Certain]\n(Rolling 7 on 6-die) (Coin flip: Heads)   (Sun rises)',
            caption: 'Every likelihood sits along this continuous spectrum.'
          },
          stepByStep: {
            title: 'Calculating Event Probability',
            steps: [
              { step: 1, text: 'Identify the total possible outcomes: a 6-sided die has 6 outcomes {1,2,3,4,5,6}' },
              { step: 2, text: 'Identify your target outcomes: even numbers are {2,4,6} = 3 outcomes' },
              { step: 3, text: 'Divide target by total: 3 / 6 = 0.5 (or 50%)' }
            ]
          }
        },
        interactiveTask: {
          prompt: 'What is the probability of rolling an odd number on a standard 6-sided die?',
          options: ['1/6', '2/6 (1/3)', '3/6 (1/2)', '4/6 (2/3)'],
          correctIndex: 2,
          hintNudge: 'Count the odd numbers on a die: 1, 3, and 5. There are 3 odd numbers out of 6 total faces.',
          explanation: 'There are 3 odd numbers (1, 3, 5) out of 6 possible numbers. 3/6 simplifies to 1/2 or 0.5.'
        }
      }
    ]
  },
  {
    id: 'ai-ml',
    title: 'Artificial Intelligence & ML',
    category: 'Computer Science',
    icon: 'BrainCircuit',
    color: 'indigo',
    description: 'Demystify Machine Learning, Decision Trees, and Ensembles with clear intuition and real applications.',
    lessons: [
      {
        id: 'ai-1',
        title: 'Decision Trees & Random Forests',
        durationMinutes: 7,
        difficulty: 'Intermediate',
        summary: 'A Decision Tree splits data based on questions. A Random Forest combines many trees to make resilient predictions.',
        analogy: 'Instead of asking one doctor their opinion, you consult a panel of 100 specialized doctors and take the majority consensus vote.',
        modes: {
          quick: {
            title: 'Why Ensembles Outperform Single Trees',
            bullets: [
              'Single Decision Trees tend to memorize training noise (overfitting).',
              'Random Forest trains 100+ trees on different subsets of data and features.',
              'Aggregating tree predictions drastically reduces error variance and improves generalization.'
            ]
          },
          visual: {
            title: 'Random Forest Architecture',
            mentalModel: '            [ Input Features: Time, Engagement, Accuracy ]\n                /               |               \\\n               v                v                v\n          [ Tree #1 ]      [ Tree #2 ]     [ Tree #100 ]\n          Vote: Medium     Vote: Medium     Vote: High\n               \\                |               /\n                v               v              v\n               [ MAJORITY ENSEMBLE VOTE: MEDIUM ]',
            caption: 'Individual trees may disagree, but their collective ensemble vote is remarkably stable.'
          },
          stepByStep: {
            title: 'How NeuroLearn Uses Random Forest',
            steps: [
              { step: 1, text: 'Extract features: time spent on task, engagement level, response accuracy.' },
              { step: 2, text: 'Pass features to our 100 trained decision trees.' },
              { step: 3, text: 'Compute class probabilities (e.g. 78% Medium, 12% Low, 10% High) and recommend adaptive support.' }
            ]
          }
        },
        interactiveTask: {
          prompt: 'What is the primary advantage of a Random Forest over a single Decision Tree?',
          options: [
            'It trains with zero data',
            'It reduces overfitting by averaging predictions across an ensemble of trees',
            'It replaces all software algorithms',
            'It only works for binary text classification'
          ],
          correctIndex: 1,
          hintNudge: 'Think of the wisdom of the crowd: combining multiple independent viewpoints reduces individual bias.',
          explanation: 'Random Forests train diverse trees on subsets of data and average their votes, significantly reducing overfitting and variance.'
        }
      }
    ]
  },
  {
    id: 'web-dev',
    title: 'Modern Web Development',
    category: 'Software Engineering',
    icon: 'Globe',
    color: 'teal',
    description: 'Understand how the web works: HTML structure, CSS styling, React components, and static S3 hosting.',
    lessons: [
      {
        id: 'web-1',
        title: 'React Component Architecture',
        durationMinutes: 6,
        difficulty: 'Beginner',
        summary: 'React apps are built from reusable, independent UI building blocks called components.',
        analogy: 'Lego bricks. Instead of molding an entire toy car from a single block of plastic, you assemble modular, snap-together pieces.',
        modes: {
          quick: {
            title: 'Component Principles',
            bullets: [
              'Components accept inputs called "props" and return JSX (visual UI description).',
              'State (useState) holds data that can change over time and trigger re-renders.',
              'Modularity keeps code maintainable, testable, and reusable across pages.'
            ]
          },
          visual: {
            title: 'Component Hierarchy',
            mentalModel: '               [ <App /> Root ]\n                /            \\\n        [ <Navbar /> ]     [ <PageContent /> ]\n                            /        |        \\\n                    [ <Card> ]  [ <Timer> ]  [ <Quiz> ]',
            caption: 'Parent components pass data down to child components via props.'
          },
          stepByStep: {
            title: 'Building a Simple Component',
            steps: [
              { step: 1, text: 'Define a JavaScript function with a capital name: function HintBadge() { ... }' },
              { step: 2, text: 'Return JSX describing what to render: return <span className="badge">Hint 1</span>' },
              { step: 3, text: 'Export the component and use it inside other components: <HintBadge />' }
            ]
          }
        },
        interactiveTask: {
          prompt: 'What React hook is used to declare reactive state that updates the UI when changed?',
          options: ['useEffect', 'useState', 'useRef', 'useCallback'],
          correctIndex: 1,
          hintNudge: 'The hook name literally tells you it is creating "State" in your component.',
          explanation: 'useState is the primary React hook for storing and updating reactive state values.'
        }
      }
    ]
  }
];
