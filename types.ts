
export enum LevelStatus {
  LOCKED = 'LOCKED',
  AVAILABLE = 'AVAILABLE',
  COMPLETED = 'COMPLETED'
}

export interface Resource {
  title: string;
  url: string;
  type: 'video' | 'article' | 'book';
}

export interface VocabularyTerm {
  word: string;
  definition: string;
}

export interface SubTopic {
  title: string;
  explanation: string;
  institutionalSecret?: string; // Pro-level knowledge (The "Pro" path)
  vocabulary?: VocabularyTerm[]; // Built-in dictionary
  funnyTake?: string;
  videoEmbedId?: string;
  whyThisMatters?: string; // Practical real-world implication
}

export interface Topic {
  id: string;
  title: string;
  description: string;
  missionStrategy: string; // The "What to Learn" summary
  funnyTake: string;
  subTopics: SubTopic[];
  resources: Resource[];
  isQuizCompleted: boolean;
}

export interface Level {
  id: number;
  name: string;
  tagline: string;
  status: LevelStatus;
  topics: Topic[];
  icon: string;
}

export interface UserProgress {
  currentLevel: number;
  completedTopicIds: string[];
  totalPoints: number;
}
