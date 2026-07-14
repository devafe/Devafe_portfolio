/* ============================================================
   DEVAFE — Fallback Project Data
   This is ONLY used until Supabase is connected (or for any
   project you haven't added to Supabase yet). Once your
   "projects" table has rows, real data takes priority.

   Edit/add objects here directly, or better — add rows in
   Supabase and this file becomes unnecessary.
   ============================================================ */

const fallbackProjectsFull = [
  {
    id: 'sample-1',
    title: 'Sample Project One',
    summary: 'A short one-line summary of what this project does.',
    category: 'Data Science',
    tags: ['Python', 'Pandas'],
    featured: true,
    github_url: '',
    live_url: '',
    image_url: '',
    problem: 'Describe the problem this project solves.',
    solution: 'Describe your approach to solving it.',
    features: ['Feature one', 'Feature two', 'Feature three'],
    technologies: ['Python', 'Pandas', 'Matplotlib'],
    screenshots: [],
    lessons_learned: 'What you learned building this.',
    future_improvements: 'What you would add or improve next.',
    created_at: '2025-01-01'
  },
  {
    id: 'sample-2',
    title: 'Sample Project Two',
    summary: 'Add rows to the "projects" table in Supabase to replace these.',
    category: 'Web Development',
    tags: ['HTML', 'CSS', 'JS'],
    featured: true,
    github_url: '',
    live_url: '',
    image_url: '',
    problem: 'Describe the problem.',
    solution: 'Describe the solution.',
    features: ['Feature one', 'Feature two'],
    technologies: ['HTML', 'CSS', 'JavaScript'],
    screenshots: [],
    lessons_learned: 'What you learned.',
    future_improvements: 'What comes next.',
    created_at: '2025-02-01'
  },
  {
    id: 'sample-3',
    title: 'Sample Project Three',
    summary: 'See README.md for the full Supabase schema.',
    category: 'Machine Learning',
    tags: ['ML', 'Scikit-learn'],
    featured: false,
    github_url: '',
    live_url: '',
    image_url: '',
    problem: 'Describe the problem.',
    solution: 'Describe the solution.',
    features: ['Feature one', 'Feature two'],
    technologies: ['Python', 'Scikit-learn'],
    screenshots: [],
    lessons_learned: 'What you learned.',
    future_improvements: 'What comes next.',
    created_at: '2025-03-01'
  }
];

const PROJECT_CATEGORIES = [
  'All',
  'Data Science',
  'Machine Learning',
  'Artificial Intelligence',
  'Python',
  'Data Analysis',
  'Web Development',
  'Automation',
  'Other'
];
