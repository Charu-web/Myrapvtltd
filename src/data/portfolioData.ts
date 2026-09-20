import type {
  FeaturedProject,
  ProductionProject,
  SkillCategory,
  ExperienceItem,
} from '../types';

export const PERSONAL_INFO = {
  name: 'Charu Sonker',
  title: 'Full Stack Developer',
  headline: "Hi, I'm Charu.",
  subheadline: 'Full Stack Developer\nbuilding practical digital products.',
  supportingLine:
    'I build responsive web applications, AI-integrated products, real-time systems and production-ready digital experiences.',
  availability: 'Available for full-time & freelance projects',
  email: 'csonker04@gmail.com',
  github: 'https://github.com/Charu-web',
  linkedin: 'https://linkedin.com/in',
  location: 'Lucknow, India',
  about:
    'I’m a Full Stack Developer focused on building responsive, scalable web applications and AI-integrated digital products. I work across frontend, backend, databases and real-time systems, with a strong focus on turning ideas into practical production-ready applications.',
};

export const ALL_PROJECTS: FeaturedProject[] = [
  {
    id: 'pixel-art-transformer',
    title: 'Pixel Art Image Transformer',
    category: 'AI / Full Stack',
    filterCategory: 'Web',
    tagline: 'AI-driven image transformation application with canvas quantization & palette extraction',
    description:
      'AI-driven image transformation application that converts user-uploaded images into stylized retro pixel-art with adjustable quantization, color palette extraction, and instant export.',
    highlight:
      'Engineered an image processing pipeline with client-side canvas rasterization, server-assisted color clustering, and responsive UI controls.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs'],
    liveUrl: 'https://charu-web.github.io/pixel-art-image-transformer/',
    githubUrl: 'https://github.com/Charu-web/pixel-art-image-transformer',
    visualType: 'pixel-art',
    caseStudy: {
      overview:
        'Pixel Art Image Transformer allows users to upload high-resolution images and dynamically transform them into structured, retro-styled pixel art through algorithmic color quantization and grid sampling.',
      problem:
        'Standard pixelation tools typically produce blurry downsamples or erratic color banding without preserving edge coherence or allowing granular palette control.',
      solution:
        'Developed a hybrid image transformation architecture combining fast client-side HTML5 Canvas pixel manipulation with Node.js/Express image processing routines for palette optimization and adaptive downsampling.',
      keyFeatures: [
        'Dynamic resolution grid slider (8x8 up to 128x128 grid mapping)',
        'Custom color palette quantization with K-means color clustering algorithms',
        'Real-time split-screen side-by-side comparison before and after rendering',
        'Lossless high-res PNG and SVG pixel matrix export options',
        'Responsive drag-and-drop workspace with instant client-side feedback',
      ],
      technicalImplementation: [
        'Extracted raw ImageData buffer arrays via HTML5 Canvas 2D rendering context.',
        'Implemented spatial quantization algorithms to calculate average and dominant RGBA values per grid block.',
        'Integrated Node.js / Express REST API endpoints for batch filters and palette extraction storage.',
        'Optimized client memory footprint during large image uploads through progressive downscaling.',
      ],
      technologyStack: [
        { category: 'Frontend', tools: ['React.js', 'HTML5 Canvas', 'Tailwind CSS'] },
        { category: 'Backend & Processing', tools: ['Node.js', 'Express.js', 'REST APIs'] },
        { category: 'Database & Storage', tools: ['MongoDB', 'Mongoose', 'Binary Asset Storage'] },
      ],
      challenges: [
        'Handling high-resolution images on mobile devices without causing main-thread UI lag.',
        'Preserving critical facial and object contrast when reducing color palettes down to 8 or 16 tones.',
      ],
      outcome:
        'Delivered a responsive web tool that transforms images with high visual fidelity, predictable color output, and zero external software requirements.',
    },
  },
  {
    id: 'neon-space-shooter',
    title: 'Neon Space Shooter',
    category: 'Interactive Web / Game',
    filterCategory: 'Web',
    tagline: 'High-performance 60FPS browser arcade engine with custom collision & particle dynamics',
    description:
      'Browser-based arcade game featuring custom 60FPS game loop physics, dynamic enemy wave spawning, collision detection grids, and canvas rendering.',
    highlight:
      'HTML5 Canvas, Game mechanics, Collision detection, High-score system, and Responsive experience with zero external dependencies.',
    technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Node.js', 'REST APIs'],
    liveUrl: 'https://charu-web.github.io/neon-space-shooter/',
    githubUrl: 'https://github.com/Charu-web/neon-space-shooter',
    visualType: 'space-shooter',
    caseStudy: {
      overview:
        'Neon Space Shooter is an arcade-style interactive game built directly in vanilla JavaScript and HTML5 Canvas, showcasing front-end performance engineering, state management, and mathematical physics modeling.',
      problem:
        'Browser-based canvas games frequently suffer from frame drops during intense particle effects and garbage collection pauses when instantiating bullet entities.',
      solution:
        'Implemented memory-safe object pooling for projectiles, enemies, and particle emitters, coupled with requestAnimationFrame delta-time normalization.',
      keyFeatures: [
        'Stable 60 FPS rendering with delta-time frame compensation',
        'Spatial partition collision detection for high-density projectile counts',
        'Procedural enemy wave generation with scaling difficulty algorithms',
        'Dynamic glowing neon particle physics engine with velocity dampening',
        'Responsive input mapping supporting keyboard, mouse, and touch controls',
      ],
      technicalImplementation: [
        'Constructed custom entity-component architecture in pure JavaScript (ES6+).',
        'Implemented object pooling patterns to eliminate garbage collection spikes during high-frequency firing.',
        'Built custom circular and axis-aligned bounding box (AABB) collision algorithms.',
        'Integrated Web Audio API for synthesized retro sound effects without external audio asset lag.',
      ],
      technologyStack: [
        { category: 'Core Engine', tools: ['Vanilla JavaScript (ES6+)', 'Object Pooling Pattern'] },
        { category: 'Rendering', tools: ['HTML5 Canvas 2D', 'requestAnimationFrame Game Loop'] },
        { category: 'Backend & APIs', tools: ['Node.js', 'Express REST Endpoints', 'Leaderboard API'] },
      ],
      challenges: [
        'Maintaining a locked 60 FPS across low-power mobile devices and high-refresh desktop monitors.',
        'Fine-tuning hitboxes and collision resolution under fast projectile velocities without tunneling.',
      ],
      outcome:
        'Created a fast, engaging web game demonstrating solid mathematical fundamentals, memory optimization, and frontend performance control.',
    },
  },
  {
    id: 'doodle-duel-ai',
    title: 'Doodle Duel AI',
    category: 'AI / Real-Time / Web',
    filterCategory: 'Web',
    tagline: 'Real-time multiplayer drawing and guessing game with AI sketch classification',
    description:
      'Real-time multiplayer drawing and guessing game with AI-powered functionality. Features low-latency bidirectional room synchronization, JWT authentication, and automated AI sketch classification.',
    highlight:
      'Real-time WebSocket architecture + AI integration with sub-50ms stroke synchronization, OpenAI API integration, and MongoDB match persistence.',
    technologies: ['React.js', 'Node.js', 'Socket.io', 'MongoDB', 'OpenAI API', 'JWT'],
    liveUrl: 'https://github.com/Charu-web/sketch-duel-ai-doodle-battles',
    githubUrl: 'https://github.com/Charu-web/sketch-duel-ai-doodle-battles',
    visualType: 'doodle-duel',
    caseStudy: {
      overview:
        'Doodle Duel AI is a real-time collaborative and competitive web application where players sketch against the clock while an AI model and human opponents compete to recognize the drawing dynamically.',
      problem:
        'Multiplayer canvas interactions suffer from coordinate transmission latency, packet dropouts, and room state desync, while AI classification models require lightweight payload contracts for live recognition.',
      solution:
        'Engineered a dedicated Node.js + Socket.io backend managing synchronized lobby state, room lifecycles, and stroke broadcasting with delta-compression, paired with OpenAI API evaluation and MongoDB storage.',
      keyFeatures: [
        'Sub-50ms real-time multi-user canvas synchronization with vector smoothing',
        'AI sketch classification and prompt evaluation using OpenAI API integration',
        'Lobby and matchmaking system with private rooms and turn management',
        'Secure JWT authentication with player session tracking and match history',
        'Touch-optimized pressure and smoothing canvas for cross-device support',
      ],
      technicalImplementation: [
        'Engineered delta-compressed stroke packet broadcasts over WebSockets to minimize network overhead.',
        'Implemented Bezier vector interpolation to reconstruct smooth continuous paths between coordinate samples.',
        'Integrated OpenAI API prompt engineering pipeline for multi-stage semantic sketch evaluation.',
        'Designed MongoDB schemas for player authentication, active room lifecycles, and game analytics.',
      ],
      technologyStack: [
        { category: 'Frontend', tools: ['React.js', 'HTML5 Canvas API', 'Tailwind CSS'] },
        { category: 'Backend & Real-Time', tools: ['Node.js', 'Express.js', 'Socket.io', 'REST APIs'] },
        { category: 'AI & Authentication', tools: ['OpenAI API', 'JWT Authentication', 'Bcrypt'] },
        { category: 'Database', tools: ['MongoDB', 'Mongoose ODM', 'Indexed Queries'] },
      ],
      challenges: [
        'Eliminating stroke rendering latency and packet jitter across concurrent participants.',
        'Structuring AI evaluation prompts to return structured JSON responses within strict timeout thresholds.',
      ],
      outcome:
        'Successfully delivered a high-performance multiplayer web application demonstrating advanced proficiency in WebSockets, AI API integration, and full-stack MERN architecture.',
    },
  },
  {
    id: 'dsa-crm',
    title: 'DSA CRM',
    category: 'Business CRM / Operations',
    filterCategory: 'App',
    tagline: 'Operational CRM for lead intake, verification tracking & role-based access control',
    description:
      'An end-to-end operational CRM tailored for lead intake, verification tracking, user permission roles, and pipeline dashboards.',
    highlight:
      'Role-based access control (RBAC), multi-stage lead lifecycles, and real-time operations dashboard with secure document handling.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'JWT Auth'],
    liveUrl: 'https://github.com/Charu-web/dsa-crm',
    githubUrl: 'https://github.com/Charu-web/dsa-crm',
    visualType: 'dsa-crm',
    caseStudy: {
      overview:
        'DSA CRM is an operational customer relationship system designed for direct selling agents and operations teams to manage lead lifecycles, document audits, and payout calculations.',
      problem:
        'Fragmented lead sources and manual spreadsheets caused processing delays, duplicate entries, and lack of accountability across agent tiers.',
      solution:
        'Built a centralized full-stack CRM with role-based access tiers (Admin, Operations, Agent), live status pipelines, and automated lead distribution.',
      keyFeatures: [
        'Role-Based Access Control (Admin, Operations, Agent views)',
        'Visual lead status pipeline with quick status transitions',
        'Document verification workflows with audit logging',
        'Comprehensive search, multi-field filtering, and reporting',
      ],
      technicalImplementation: [
        'Constructed modular React dashboard components with optimistic UI updates.',
        'Implemented Express.js REST APIs with robust token-based authorization middleware.',
        'Structured MongoDB collections with compound indexing for instant query responses.',
      ],
      technologyStack: [
        { category: 'Frontend', tools: ['React.js', 'Tailwind CSS', 'Lucide Icons'] },
        { category: 'Backend', tools: ['Node.js', 'Express.js', 'JWT', 'REST APIs'] },
        { category: 'Database', tools: ['MongoDB', 'Mongoose'] },
      ],
      challenges: [
        'Maintaining granular data isolation between competing agent teams.',
        'Optimizing heavy document table queries under high concurrency.',
      ],
      outcome:
        'Delivered a streamlined operations application that drastically reduced lead turnaround times and improved pipeline visibility.',
    },
  },
  {
    id: 'hda-production',
    title: 'HDA Production',
    category: 'Commercial Web Platform',
    filterCategory: 'Web',
    tagline: 'Modern production platform supporting client inquiries & media portfolio showcases',
    description:
      'Engineered a modern web platform supporting client inquiries, media portfolio showcases, dynamic service management, and responsive layouts.',
    highlight:
      'Built responsive frontend components, optimized media delivery, and integrated structured REST API endpoints.',
    technologies: ['React.js', 'Node.js', 'Express.js', 'Tailwind CSS', 'REST APIs'],
    liveUrl: 'https://charu-web.github.io/hda-production/',
    githubUrl: 'https://github.com/Charu-web/hda-production',
    visualType: 'hda-production',
  },
  {
    id: 'yuvahub',
    title: 'YuvaHub',
    category: 'Community & Career Portal',
    filterCategory: 'Web',
    tagline: 'Career development & community platform with interactive directory filters',
    description:
      'A responsive web portal connecting users to career development resources, event listings, community discussions, and mentorship opportunities.',
    highlight:
      'Implemented clean navigation architecture, interactive directory filters, dynamic data fetching, and mobile-first layouts.',
    technologies: ['React.js', 'JavaScript', 'Node.js', 'CSS3', 'REST APIs'],
    liveUrl: 'https://charu-web.github.io/yuvahub/',
    githubUrl: 'https://github.com/Charu-web/yuvahub',
    visualType: 'yuvahub',
  },
  {
    id: 'dsa-sathi-crm',
    title: 'DSA Sathi CRM',
    category: 'Enterprise CRM / Full Stack',
    filterCategory: 'App',
    tagline: 'Business workflow management, pipeline automation & role-based dashboard',
    description:
      'A CRM-focused web application designed around business workflows, multi-stage lead lifecycles, role-based dashboards, document verification, and user management.',
    highlight:
      'Dashboard, Authentication, Business workflows, CRM functionality, and Backend integration with Role-Based Access Control (RBAC).',
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'JWT Auth'],
    liveUrl: 'https://github.com/Charu-web/dsa-sathi-crm',
    githubUrl: 'https://github.com/Charu-web/dsa-sathi-crm',
    visualType: 'dsa-sathi-crm',
  },
  {
    id: 'bubble-shooter',
    title: 'Bubble Shooter',
    category: 'Interactive Web / Game',
    filterCategory: 'Web',
    tagline: 'Physics-based canvas puzzle game with ray-cast trajectory & cluster matching',
    description:
      'An interactive browser arcade game featuring ray-cast angle trajectory projection, hexagonal bubble grid collision math, cluster matching algorithms, and fluid canvas animations.',
    highlight:
      'Implemented recursive cluster detection (flood-fill algorithm) to calculate floating bubble drop chains upon matching three or more same-color nodes.',
    technologies: ['JavaScript', 'HTML5 Canvas', 'CSS3', 'Math Physics'],
    liveUrl: 'https://github.com/Charu-web',
    githubUrl: 'https://github.com/Charu-web',
    visualType: 'bubble-shooter',
  },
];

export const FEATURED_PROJECTS = ALL_PROJECTS;

export const EXPERIENCE_ITEMS: ExperienceItem[] = [
  {
    id: 'empire-it-xpert',
    company: 'Empire IT Xpert',
    role: 'Web & Mobile App Developer',
    period: 'Current',
    status: 'CURRENT',
    responsibilities: [
      'Building and maintaining production-ready web and mobile applications using modern JavaScript frameworks.',
      'Implementing responsive user interfaces, RESTful API integrations, and client-side performance optimizations.',
      'Collaborating on client requirements, debugging complex workflows, and deploying scalable digital features.',
    ],
    technologies: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
  },
  {
    id: 'hi-tech-engineering',
    company: 'Hi-Tech Engineering',
    role: 'Web Developer Intern',
    period: 'Jun 2024 – Aug 2024',
    status: 'PREVIOUS',
    responsibilities: [
      'Developed responsive frontend layouts, interactive user components, and cross-browser styling.',
      'Assisted in backend API consumption, form validation logic, and client-side data handling.',
      'Participated in code reviews, bug fixes, and testing across diverse viewport resolutions.',
    ],
    technologies: ['JavaScript', 'HTML5', 'CSS3', 'Bootstrap', 'REST APIs', 'Git'],
  },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: 'languages',
    number: '01',
    title: 'Languages',
    description: 'Core programming languages',
    skills: ['JavaScript', 'C++', 'SQL', 'Python'],
  },
  {
    id: 'frontend',
    number: '02',
    title: 'Frontend',
    description: 'Client-side web development',
    skills: ['React.js', 'Redux', 'HTML5', 'CSS3', 'Tailwind CSS', 'Bootstrap'],
  },
  {
    id: 'backend',
    number: '03',
    title: 'Backend',
    description: 'Server architecture & APIs',
    skills: ['Node.js', 'Express.js', 'REST APIs', 'Socket.io', 'JWT'],
  },
  {
    id: 'ai-ml',
    number: '04',
    title: 'AI / ML',
    description: 'Machine learning & AI integration',
    skills: ['OpenAI GPT-4 API', 'Prompt Engineering', 'TensorFlow.js', 'Generative AI Integration'],
  },
  {
    id: 'database',
    number: '05',
    title: 'Database',
    description: 'Data storage & querying',
    skills: ['MongoDB', 'Mongoose', 'SQL'],
  },
  {
    id: 'tools',
    number: '06',
    title: 'Tools',
    description: 'Developer tooling & DevOps',
    skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Netlify', 'Render'],
  },
];

export const PRODUCTION_PROJECTS: ProductionProject[] = [
  {
    id: 'hda-production',
    title: 'HDA PRODUCTION',
    role: 'Full Stack Web Developer',
    type: 'Production Website',
    technologies: ['React', 'Node.js', 'Express', 'Tailwind CSS', 'REST APIs'],
    whatWasBuilt:
      'Engineered a modern web platform supporting client inquiries, media portfolio showcases, and dynamic service management.',
    keyContribution:
      'Built responsive frontend components, optimized media delivery, integrated structured REST API endpoints, and ensured cross-device accessibility.',
  },
];

export const OTHER_EXPERIMENTS = [
  {
    id: 'bubble-shooter',
    title: 'Bubble Shooter Game',
    category: 'Interactive Web / Physics',
    description:
      'An interactive browser arcade game featuring ray-cast angle trajectory projection, hexagonal bubble grid collision math, cluster matching algorithms, and fluid canvas animations.',
    highlight:
      'Implemented recursive cluster detection to calculate floating bubble drop chains upon matching three or more same-color nodes.',
    technologies: ['HTML5 Canvas', 'JavaScript', 'CSS3', 'Math Physics'],
    githubUrl: 'https://github.com',
    liveUrl: 'https://github.com',
  },
];

export const ENGINEERING_STEPS = [
  {
    number: '01',
    title: 'Architecture & System Design',
    summary: 'Designing modular schemas and data contracts.',
    keyPoints: ['State boundaries', 'API schema definition', 'Database index strategy'],
  },
];

export const SERVICES = [
  {
    id: 'full-stack-web-apps',
    title: 'Full Stack Web Applications',
    description: 'Custom web apps built with React, Node.js, Express, and MongoDB.',
    technologies: ['React', 'Node.js', 'Express', 'MongoDB'],
  },
];

