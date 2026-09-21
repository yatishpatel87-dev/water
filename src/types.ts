export type LessonStepId = 
  | 'poem'
  | 'story'
  | 'reading'
  | 'metamorphosis'
  | 'grammar'
  | 'prepositions'
  | 'vocabulary'
  | 'speaking'
  | 'glossary'
  | 'certificate';

export interface LessonStep {
  id: LessonStepId;
  number: number;
  title: string;
  titleGujarati: string;
  category: 'Listening' | 'Story' | 'Reading' | 'Writing' | 'Grammar' | 'Vocabulary' | 'Speaking' | 'Glossary & Lab' | 'Completion';
  icon: string;
  description: string;
}

export interface StanzaItem {
  id: string;
  visitor: string;
  response: string;
  isAllowed: boolean;
  imageIcon: string;
  audioText: string;
  gujaratiMeaning: string;
}

export interface TrueFalseQuestion {
  id: number;
  question: string;
  questionGujarati: string;
  correctAnswer: boolean;
  explanation: string;
}

export interface CategorizeItem {
  id: string;
  name: string;
  gujarati: string;
  category: 'Home' | 'Agriculture' | 'Industry';
}

export interface MatchPair {
  id: number;
  itemA: string;
  itemB: string;
}

export interface AnimalItem {
  id: string;
  name: string;
  category: 'Domestic' | 'Wild' | 'Water';
  icon: string;
  gujarati: string;
}

export interface GlossaryWord {
  word: string;
  gujarati: string;
  pronunciation?: string;
  partOfSpeech: string;
  exampleSentence: string;
  definition: string;
}

export interface UserProgress {
  completedSteps: LessonStepId[];
  stars: number;
  stepScores: Record<string, number>;
  customStanzasCreated: number;
  studentName: string;
}
