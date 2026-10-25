// Static content taken from the current portfolio. Edit freely.
export const profile = {
  name: 'Shivani Chouksey',
  role: 'Full Stack Engineer',
  location: 'Mumbai, India',
  intro: "I'm Shivani — a Full Stack Engineer working across modern frontend architectures, backend APIs, and data-driven applications. I enjoy turning complex requirements into reliable, performant, and maintainable software.",
  github: 'https://github.com/Shivani-Chouksey',
  linkedin: 'https://linkedin.com/in/shivani-chouksey-07b794220',
  email: 'mailto:shivanichouksey@example.com', // TODO: put your real email
  photo: '/profile.png', // put your photo at frontend/public/profile.jpg
  resume: '/resume.pdf', // put your resume at frontend/public/resume.pdf
};
export const proof = {
  note: 'Experience-based achievements from production applications I contributed to with my teams — not claims of solo platform ownership.',
  cards: [
    { id: 'load', tag: 'Performance', size: 'wide', value: 30, suffix: '%', label: 'reduction in initial page load time', hint: 'Lazy loading · code splitting · caching', viz: { type: 'bars', after: 70 } },
    { id: 'bundle', tag: 'Performance', size: 'wide', value: 25, suffix: '%', label: 'reduction in JavaScript bundle size', hint: 'Measured on First Load JS', viz: { type: 'bars', after: 75 } },
    { id: 'uptime', tag: 'Reliability', size: 'wide', value: 99.9, decimals: 1, suffix: '%', label: 'reported uptime on the relevant application', viz: { type: 'ring', pct: 99.9 } },
    { id: 'users', tag: 'Scale', value: 500, suffix: '+', label: 'concurrent users', hint: 'supported by relevant backend APIs' },
    { id: 'data', tag: 'Scale', value: 10, suffix: 'K+', label: 'daily financial data points', hint: 'handled by these applications' },
    { id: 'mfe', tag: 'Delivery', value: 4, suffix: '+', label: 'React.js / Next.js micro-frontends', hint: 'for financial-market apps' },
    { id: 'ui', tag: 'Delivery', value: 20, suffix: '+', label: 'reusable UI components', hint: 'shared across the product' },
  ],
};
export const experience = [
  { company: 'Digital Salt Technologies', role: 'Full Stack Engineer', period: 'Nov 2024 — Present', blurb: 'Financial technology and NSE Cogencis-related products.',
    points: ['Developed React.js and Next.js micro-frontends for stock-market and financial-data experiences.', 'Built and integrated Node.js / Express.js REST APIs for financial data workflows.', 'Improved performance through lazy loading, memoization, code splitting, and caching.', 'Built reusable UI components and used TypeScript to improve code quality.'] },
  { company: 'E-Innosec Consulting', role: 'Developer', period: 'Apr 2024 — Nov 2024', blurb: 'Governance, risk, and compliance (GRC) software.',
    points: ['Developed frontend modules using Next.js and Redux.', 'Implemented privacy-policy workflows, risk assessment, and threat and vulnerability management.', 'Worked with role-based access and enterprise data workflows.'] },
  { company: 'ValueX Digital', role: 'Software Developer', period: 'Mar 2023 — Mar 2024', blurb: 'Real estate, e-commerce, and document-oriented business applications.',
    points: ['Built full-stack web applications using React.js / Next.js and Node.js / Express.js.', 'Implemented property listings, user management, and administrative interfaces.', 'Improved performance and SEO using Next.js.'] },
];
export const about = {
  text: 'I work across the frontend and backend to build features that are useful, reliable, and maintainable. My experience spans financial technology, enterprise compliance software, and business applications. I care about performance, reusable architecture, secure workflows, and understanding the reasoning behind engineering decisions.',
  facts: [['3+', 'years building production software'], ['3', 'domains: fintech · GRC · real estate'], ['IN', 'Mumbai-based · remote across India']],
  principles: [
    { n: '01', title: 'Build for real users', text: 'Translate business requirements into clear workflows and dependable experiences.', tags: ['Loading, empty & error states', 'Edge cases first'] },
    { n: '02', title: 'Optimize what matters', text: 'Improve loading performance, rendering behavior, API efficiency, and maintainability.', tags: ['Lazy loading', 'Memoization', 'Code splitting', 'Caching'] },
    { n: '03', title: 'Understand the whole system', text: 'Connect the interface, APIs, data model, authorization, error handling, and deployment concerns.', tags: ['REST APIs', 'JWT / RBAC', 'MongoDB · MySQL'] },
  ],
  education: [
    { title: 'Master of Computer Applications', place: 'Barkatullah University · University first rank', years: '2021 — 2023', badge: 'Gold Medalist' },
    { title: 'B.Sc. Computer Science', place: 'Government Geetanjali Girls College', years: '2018 — 2021' },
  ],
};
