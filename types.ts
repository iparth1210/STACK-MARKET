
export enum LevelStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  COMPLETED = 'COMPLETED'
}

export interface Resource {
  title: string;
  url: string;
  type: 'video' | 'article' | 'book' | 'paper' | 'whitepaper';
  provider?: string;
  fallbackSummary?: string;
}

export interface VocabularyTerm {
  word: string;
  streetAnalogy: string;
  boardroomDefinition: string;
}

export interface JurisdictionalNode {
  nation: string;
  taxRate: string;
  assetProtection: string;
  sovereignRisk: 'Low' | 'Medium' | 'High';
  keyAdvantage: string;
}

export interface SubTopic {
  title: string;
  streetExplanation: string;
  boardroomExplanation: string;
  institutionalSecret?: string; 
  technicalBriefing?: string; // LaTeX enabled
  imagePrompt?: string; // For AI generation
  explainerVideoId?: string; // YouTube/Vimeo ID
  animePlaceholder?: string; // Description for the anime-style conceptual motion
  vocabulary?: VocabularyTerm[]; 
  isShadow?: boolean;
  jurisdictionalMatrix?: JurisdictionalNode[];
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  missionStrategy: string; 
  funnyTake: string;
  subTopics: SubTopic[];
  institutionalBriefing?: string; 
  resources: Resource[];
  isQuizCompleted: boolean;
  category: 'TRADER' | 'BUILDER' | 'SOVEREIGN' | 'CORE' | 'MACRO' | 'COMMODITIES' | 'FIXED_INCOME' | 'EQUITIES' | 'DERIVATIVES' | 'PORTFOLIO';
}

export interface Level {
  id: number;
  name: string;
  tagline: string;
  status: LevelStatus;
  topics: Topic[];
  icon: string;
  personaVideoId?: string; 
}

export interface PsychologyProfile {
  trait: string;
  fomoResistance: number;
  analyticalPatience: number;
  riskAppetite: number;
}

export interface UserProgress {
  userName?: string;
  currentLevel: number;
  completedTopicIds: string[];
  totalPoints: number;
  streak: number;
  lastActiveDate: string;
  psychology: PsychologyProfile;
  notepad: string[];
  interestScores: {
    TRADER: number;
    BUILDER: number;
  };
  blackSwanDecisions: { event: string; choice: string; impact: number }[];
  isCertified: boolean;
  hasCompletedOnboarding?: boolean;
}
