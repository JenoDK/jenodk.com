export type SkillCategory = 'backend' | 'frontend' | 'cloud' | 'tools';

export interface Skill {
  name: string;
  category: SkillCategory;
  level: 'expert' | 'advanced' | 'intermediate' | 'beginner';
}

export const skills: Skill[] = [
  // Backend
  { name: 'Java', category: 'backend', level: 'expert' },
  { name: 'Spring Boot', category: 'backend', level: 'expert' },
  { name: 'Spring Security', category: 'backend', level: 'expert' },
  { name: 'Hibernate', category: 'backend', level: 'expert' },
  { name: 'JPA', category: 'backend', level: 'expert' },
  { name: 'Python', category: 'backend', level: 'advanced' },
  { name: 'FastAPI', category: 'backend', level: 'advanced' },
  { name: 'Kotlin', category: 'backend', level: 'intermediate' },
  { name: 'PostgreSQL', category: 'backend', level: 'expert' },
  { name: 'MySQL', category: 'backend', level: 'advanced' },
  { name: 'MSSQL', category: 'backend', level: 'intermediate' },
  { name: 'Sqitch', category: 'backend', level: 'advanced' },
  { name: 'Liquibase', category: 'backend', level: 'advanced' },
  { name: 'Flyway', category: 'backend', level: 'intermediate' },

  // Frontend
  { name: 'TypeScript', category: 'frontend', level: 'expert' },
  { name: 'JavaScript', category: 'frontend', level: 'expert' },
  { name: 'Angular', category: 'frontend', level: 'expert' },
  { name: 'React', category: 'frontend', level: 'advanced' },
  { name: 'Next.js', category: 'frontend', level: 'advanced' },
  { name: 'Tailwind CSS', category: 'frontend', level: 'advanced' },
  { name: 'PrimeNG', category: 'frontend', level: 'advanced' },
  { name: 'Vaadin', category: 'frontend', level: 'advanced' },
  { name: 'Cypress', category: 'frontend', level: 'intermediate' },

  // Cloud
  { name: 'AWS', category: 'cloud', level: 'advanced' },
  { name: 'ECS Fargate', category: 'cloud', level: 'advanced' },
  { name: 'RDS Aurora', category: 'cloud', level: 'advanced' },
  { name: 'Cognito', category: 'cloud', level: 'intermediate' },
  { name: 'S3', category: 'cloud', level: 'advanced' },
  { name: 'SES', category: 'cloud', level: 'intermediate' },
  { name: 'CloudFormation', category: 'cloud', level: 'intermediate' },
  { name: 'Azure', category: 'cloud', level: 'beginner' },
  { name: 'Google Cloud', category: 'cloud', level: 'beginner' },

  // Tools
  { name: 'Docker', category: 'tools', level: 'advanced' },
  { name: 'Git', category: 'tools', level: 'expert' },
  { name: 'GitHub Actions', category: 'tools', level: 'advanced' },
  { name: 'Jenkins', category: 'tools', level: 'intermediate' },
  { name: 'Gradle', category: 'tools', level: 'expert' },
  { name: 'Maven', category: 'tools', level: 'expert' },
  { name: 'Poetry', category: 'tools', level: 'advanced' },
  { name: 'Kafka', category: 'tools', level: 'intermediate' },
  { name: 'RabbitMQ', category: 'tools', level: 'intermediate' },
];

