export interface ExperienceItem {
  company: string;
  role: string;
  period: string;
  location?: string;
  description: string;
  highlights?: string[];
  techStack?: string[];
  url?: string;
  current?: boolean;
}

export const experiences: ExperienceItem[] = [
  {
    company: 'Practle',
    role: 'Partner & Lead Full-stack Developer',
    period: 'May 2024 - Present',
    location: 'Remote',
    url: 'https://practle.io/',
    current: true,
    description:
      'Scalable, multi-tenant educational platform focused on personalized language learning, combining modular curriculum design, AI-driven feedback, and instructor-guided learning paths. Currently serving 2,600+ users across two major educational institutions.',
    highlights: [
      'Built entire Angular/TypeScript/PrimeNG frontend (100%)',
      'Designed and implemented FastAPI backend with Python (~90%)',
      'Developed Next.js marketing site with Sanity CMS (100%)',
      'Collaborated on PostgreSQL schema design and Sqitch migrations (50%)',
      'Contributed to AWS infrastructure (ECS Fargate, Aurora RDS, Cognito, S3, SES)',
      'Implemented CI/CD pipelines with GitHub Actions and Docker',
    ],
    techStack: [
      'Python',
      'FastAPI',
      'Angular',
      'TypeScript',
      'PrimeNG',
      'PostgreSQL',
      'AWS',
      'Docker',
      'Next.js',
      'Tailwind CSS',
    ],
  },
  {
    company: 'Liantis',
    role: 'Freelance Full-stack Developer',
    period: 'May 2023 - Present',
    location: 'Bruges',
    url: 'https://www.liantis.be/',
    current: true,
    description:
      'Helped create new applications from the ground up, introduced modern development practices, and shared experience with the team(s). Gained deeper expertise in modern Angular projects for the frontend and microservices architecture in the backend.',
    highlights: [
      'Created internal tools for customer advisors to improve efficiency and reduce errors',
      'Assisted multiple teams requiring additional capacity',
      'Contributed to their new mobile app LIA',
      'Introduced Docker for local development',
      'Modernized testing phases in their GitHub CI pipeline by implementing Cypress',
      'Made critical adjustments to reporting systems to ensure legal compliance using Jasper',
    ],
  },
  {
    company: 'Agilent Technologies',
    role: 'Senior Full-stack Developer',
    period: 'October 2018 - May 2023',
    location: 'Ghent',
    url: 'https://www.agilent.com/',
    description:
      'Worked on a LIMS system called SLIMS in a senior capacity after Genohm was officially acquired by Agilent.',
    highlights: [
      'Worked with the team in an agile manner to maintain high code quality standards',
      'Conducted extensive code reviews',
      'Mentored junior developers',
      'Took ownership of features during major version development cycles',
      'Tackled complex tasks and bugs',
      'Provided R&D support to customers requiring technical assistance',
      'Performed DevOps work in the early days before having a dedicated team',
      'Served on the Cross-Functional Committee that prioritizes incoming defects',
    ],
  },
  {
    company: 'Genohm',
    role: 'Senior Full-stack Java Developer',
    period: 'October 2015 - October 2018',
    location: 'Ghent',
    url: 'https://www.genohm.com/',
    description:
      'Started at Genohm right after finishing VDAB course. Genohm was still in the startup phase, which allowed quick growth in both knowledge and responsibilities. Worked on LIMS system called SLIMS, primarily fixing defects and working on new features. Later assigned to another project for a specific customer, where I had the opportunity to take on the role of lead developer.',
  },
];

