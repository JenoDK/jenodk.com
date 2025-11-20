export type ProjectType = 'professional' | 'personal' | 'opensource';

export interface Project {
  id: string;
  title: string;
  description: string;
  type: ProjectType;
  url?: string;
  githubUrl?: string;
  techStack: string[];
  highlights?: string[];
  featured?: boolean;
  wip?: boolean;
  stats?: {
    label: string;
    value: string | number;
  }[];
}

export const projects: Project[] = [
  {
    id: 'practle',
    title: 'Practle',
    description:
      'Scalable, multi-tenant educational platform focused on personalized language learning with AI-driven feedback. Currently serving 2,600+ users across major educational institutions.',
    type: 'professional',
    url: 'https://practle.io/',
    featured: true,
    techStack: ['Python', 'FastAPI', 'Angular', 'TypeScript', 'PostgreSQL', 'AWS'],
    stats: [{ label: 'Users', value: '2,600+' }],
  },
  {
    id: 'fantasy-league',
    title: 'Fantasy League',
    description:
      'Full-blown web application for football tournament predictions. Served around 60-80 users (colleagues, friends) and maintained throughout multiple competitions (World Cup 2018, Euro 2020, World Cup 2022, Euro 2024).',
    type: 'personal',
    githubUrl: 'https://github.com/JenoDK/fantasy-league-app',
    techStack: ['Java', 'Vaadin', 'AWS', 'Hetzner'],
    highlights: [
      'FIFA World Cup 2018: Java 8 with Vaadin 8',
      'UEFA Euro 2020: Java 11 with Vaadin 14 on AWS',
      'FIFA World Cup 2022: Java 11 with Vaadin 14 on OVH',
      'UEFA Euro 2024: Same stack on Hetzner Cloud',
    ],
  },
  {
    id: 'portfolio-website',
    title: 'Personal Portfolio Website',
    description:
      'Modern, bilingual (Dutch/English) portfolio website featuring dark/light mode, live Strava statistics integration, animated components, and fully responsive design. Deployed on Hetzner Cloud with Docker and automated CI/CD.',
    type: 'personal',
    url: 'https://jenodk.com/',
    githubUrl: 'https://github.com/JenoDK/jenodk.com',
    techStack: ['Next.js', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Docker', 'Hetzner'],
    featured: true,
  },
  {
    id: 'bracket-selection',
    title: 'Bracket Selection',
    description:
      'IntelliJ plugin for bracket selection functionality. Maintained with approximately 3,500 downloads on JetBrains Marketplace.',
    type: 'opensource',
    githubUrl: 'https://github.com/JenoDK/bracket-selection',
    techStack: ['Java', 'IntelliJ Platform'],
    stats: [{ label: 'Downloads', value: '3,500+' }],
  },
  {
    id: 'jbehave-support',
    title: 'JBehave Support',
    description:
      'Widely used plugin for IntelliJ IDE with 160,000 total downloads. Became a maintainer after fixing issues and offering assistance to the repository owner.',
    type: 'opensource',
    githubUrl: 'https://github.com/witspirit/IntelliJBehave',
    techStack: ['Java', 'IntelliJ Platform'],
    stats: [{ label: 'Downloads', value: '160,000+' }],
  },
  {
    id: 'strava-stats',
    title: 'Strava Stats',
    description:
      'Enhanced way of filtering through Strava activities with location-based search, allowing users to find activities within a specific radius of a location on the map.',
    type: 'personal',
    githubUrl: 'https://github.com/JenoDK/strava-stats-jeno',
    techStack: ['React', 'Strava API'],
    wip: true,
  },
  {
    id: 'jdump',
    title: 'jdump',
    description:
      'A small CLI written in Python to easily handle SQL dumps across different projects.',
    type: 'personal',
    githubUrl: 'https://github.com/JenoDK/jdump',
    techStack: ['Python'],
  },
  {
    id: 'slims',
    title: 'SLIMS',
    description:
      'Very extensive LIMS web application worked on for 5 years while working at Genohm and then Agilent Technologies.',
    type: 'professional',
    url: 'https://explore.agilent.com/Agilentslims',
    techStack: ['Java', 'Spring', 'Hibernate', 'PostgreSQL'],
  },
  {
    id: 'slims-api',
    title: 'SLIMS API',
    description:
      'API that allows developing plugins for SLIMS. These plugins allow customers to tailor to specific needs like integrations with machines or custom behavior.',
    type: 'opensource',
    githubUrl: 'https://github.com/genohm/slims-api',
    techStack: ['Java', 'REST API'],
  },
];

