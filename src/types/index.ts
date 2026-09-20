export interface CaseStudyData {
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  technicalImplementation: string[];
  technologyStack: { category: string; tools: string[] }[];
  challenges: string[];
  outcome: string;
}

export interface FeaturedProject {
  id: string;
  title: string;
  category: string;
  filterCategory: 'Web' | 'App';
  tagline: string;
  description: string;
  highlight: string;
  technologies: string[];
  liveUrl?: string;
  githubUrl?: string;
  caseStudy?: CaseStudyData;
  visualType: 'pixel-art' | 'space-shooter' | 'doodle-duel' | 'dsa-crm' | 'hda-production' | 'yuvahub' | 'dsa-sathi-crm' | 'bubble-shooter';
}

export interface ProductionProject {
  id: string;
  title: string;
  role: string;
  type: string;
  technologies: string[];
  whatWasBuilt: string;
  keyContribution: string;
}

export interface ExperimentProject {
  id: string;
  title: string;
  category: string;
  description: string;
  highlight: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
}

export interface SkillCategory {
  id: string;
  number: string;
  title: string;
  skills: string[];
  description: string;
}

export interface EngineeringStep {
  number: string;
  title: string;
  summary: string;
  keyPoints: string[];
}

export interface ExperienceItem {
  id: string;
  company: string;
  role: string;
  period: string;
  status: string;
  responsibilities: string[];
  technologies: string[];
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  technologies: string[];
}

export interface LeadershipActivity {
  role: string;
  organization: string;
  description: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  projectType: string;
  message: string;
}
