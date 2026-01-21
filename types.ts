
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

export interface SubTopic {
  title: string;
  explanation: string;
  videoEmbedId?: string; // YouTube or Vimeo ID for explainer video
}

export interface Topic {
  id: string;
  title: string;
  description: string;
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
